import { recordAffiliateCommissionForVerifiedCheckout } from '@/lib/affiliates/payment-integration';
import {
  listAffiliateCommissions,
  parseAffiliateAttribution,
  recordAffiliateMembershipCommission,
  reverseAffiliateCommissionForSource,
} from '@/lib/affiliates/store';
import { getAllProductPaymentIntents } from '@/lib/payments/product-payment-intents';
import { getAllPurchases } from '@/lib/products/purchase-store';
import {
  getLatestMembershipSubscriptions,
  getMembershipPayments,
  getMembershipPaymentSequenceNumber,
} from '@/lib/membership/membership-store';
import { stripe } from '@/lib/payments/stripe';

const NEGATIVE_STATUSES = new Set([
  'refund_pending', 'refunded', 'reversal_pending', 'reversed',
  'disputed', 'chargeback', 'revoked', 'failed', 'cancelled',
]);

function parseJson(value: unknown) {
  if (value && typeof value === 'object') return value as Record<string, unknown>;
  try { return JSON.parse(String(value || '{}')) as Record<string, unknown>; } catch { return {}; }
}

export async function reconcileAffiliateCommissions(limit = 100) {
  const safeLimit = Math.max(1, Math.min(250, Math.floor(limit)));
  const summary = { processed: 0, alreadyRecorded: 0, reversed: 0, skipped: 0, errors: [] as string[] };
  const [paymentIntents, purchases, membershipPayments, subscriptions, initialCommissions] = await Promise.all([
    getAllProductPaymentIntents(),
    getAllPurchases({ strict: true }),
    getMembershipPayments(),
    getLatestMembershipSubscriptions(),
    listAffiliateCommissions(),
  ]);
  const knownSources = new Set(initialCommissions.map((commission) => `${commission.provider}:${commission.sourceId}`));

  for (const intent of paymentIntents.filter((candidate) =>
    ['captured', 'completed'].includes(candidate.status)
    && candidate.captureId
    && parseAffiliateAttribution(candidate.attribution)
    && !knownSources.has(`paypal:${candidate.captureId}`)
  ).slice(0, safeLimit)) {
    const key = `paypal:${intent.captureId}`;
    if (knownSources.has(key)) { summary.alreadyRecorded++; continue; }
    try {
      const result = await recordAffiliateCommissionForVerifiedCheckout({
        provider: 'paypal',
        providerPaymentId: intent.captureId || '',
        providerReference: intent.paypalOrderId,
        productId: intent.productId,
        totalAmount: Number(intent.expectedAmount),
        currency: intent.currency,
        addons: intent.addons,
        buyerEmail: intent.email,
        providerVerifiedAt: intent.captureVerifiedAt || intent.completedAt || intent.createdAt,
        attribution: intent.attribution,
      });
      if (result.eligible) { summary.processed++; knownSources.add(key); } else summary.skipped++;
    } catch (error: any) {
      summary.errors.push(`paypal:${intent.intentId}:${error?.message || 'commission_failed'}`);
    }
  }

  const stripeGroups = new Map<string, (typeof purchases)[number]>();
  purchases.forEach((purchase) => {
    if (purchase.paymentStatus !== 'stripe_payment_verified'
      || purchase.actionChannel !== 'affiliate'
      || !purchase.paypalOrderId.startsWith('cs_')
      || !purchase.paypalCaptureId
      || NEGATIVE_STATUSES.has(String(purchase.status || '').toLowerCase())) return;
    if (!stripeGroups.has(purchase.paypalOrderId)) stripeGroups.set(purchase.paypalOrderId, purchase);
  });
  for (const purchase of [...stripeGroups.values()].filter((candidate) =>
    !knownSources.has(`stripe:${candidate.paypalCaptureId}`)
  ).slice(0, safeLimit)) {
    const key = `stripe:${purchase.paypalCaptureId}`;
    if (knownSources.has(key)) { summary.alreadyRecorded++; continue; }
    try {
      const session = await stripe.checkout.sessions.retrieve(purchase.paypalOrderId);
      const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id || '';
      if (session.payment_status !== 'paid' || paymentIntentId !== purchase.paypalCaptureId) {
        throw new Error('Stripe no longer confirms the recorded paid session terms.');
      }
      const metadata = session.metadata || {};
      const attribution = parseJson(metadata.attribution);
      const addons = parseJson(metadata.addons) as Record<string, boolean>;
      const serverAmount = Number(metadata.expectedAmount);
      const currency = String(metadata.currency || session.currency || '').toUpperCase();
      if (!Number.isFinite(serverAmount) || session.amount_total !== Math.round(serverAmount * 100)) {
        throw new Error('Stripe session amount no longer matches server-owned metadata.');
      }
      const result = await recordAffiliateCommissionForVerifiedCheckout({
        provider: 'stripe',
        providerPaymentId: purchase.paypalCaptureId,
        providerReference: purchase.paypalOrderId,
        productId: String(metadata.productId || purchase.productId),
        totalAmount: serverAmount,
        currency,
        addons,
        buyerEmail: String(metadata.email || purchase.email),
        providerVerifiedAt: new Date(session.created * 1000).toISOString(),
        attribution,
      });
      if (result.eligible) { summary.processed++; knownSources.add(key); } else summary.skipped++;
    } catch (error: any) {
      summary.errors.push(`stripe:${purchase.paypalOrderId}:${error?.message || 'commission_failed'}`);
    }
  }

  const subscriptionById = new Map(subscriptions.map((subscription) => [subscription.subscriptionId, subscription]));
  for (const payment of membershipPayments.filter((candidate) =>
    candidate.status.toLowerCase() === 'completed'
    && candidate.currency.toUpperCase() === 'USD'
    && !knownSources.has(`paypal:${candidate.paymentId}`)
    && subscriptionById.get(candidate.subscriptionId)?.actionChannel === 'affiliate'
  ).slice(0, safeLimit)) {
    const key = `paypal:${payment.paymentId}`;
    if (knownSources.has(key)) { summary.alreadyRecorded++; continue; }
    const subscription = subscriptionById.get(payment.subscriptionId);
    if (!subscription || subscription.actionChannel !== 'affiliate' || !subscription.activatedAt) {
      summary.skipped++;
      continue;
    }
    try {
      const paymentNumber = await getMembershipPaymentSequenceNumber(payment.subscriptionId, payment.paymentId);
      if (paymentNumber < 1 || paymentNumber > 3) { summary.skipped++; continue; }
      await recordAffiliateMembershipCommission({
        sourceId: payment.paymentId,
        provider: 'paypal',
        providerReference: payment.paymentId,
        productId: 'funding-membership',
        amount: payment.amount,
        currency: payment.currency,
        buyerEmail: payment.email,
        providerVerified: true,
        providerVerifiedAt: payment.occurredAt,
        attributionQualifiedAt: subscription.activatedAt,
        attribution: {
          actionId: subscription.actionId,
          actionChannel: subscription.actionChannel,
          actionCampaign: subscription.actionCampaign,
          actionRecipientId: subscription.actionRecipientId,
          actionIssuedAt: subscription.actionIssuedAt,
        },
        membershipSubscriptionId: subscription.subscriptionId,
        membershipPaymentNumber: paymentNumber,
      });
      summary.processed++;
      knownSources.add(key);
    } catch (error: any) {
      summary.errors.push(`membership:${payment.paymentId}:${error?.message || 'commission_failed'}`);
    }
  }

  const latestPayments = new Map(membershipPayments.map((payment) => [payment.paymentId, payment]));
  for (const commission of initialCommissions.filter((candidate) => !['reversed', 'clawback_due'].includes(candidate.status))) {
    const shouldReverse = commission.sourceType === 'membership_payment'
      ? latestPayments.has(commission.sourceId) && latestPayments.get(commission.sourceId)?.status.toLowerCase() !== 'completed'
      : purchases.some((purchase) =>
          purchase.paypalCaptureId === commission.sourceId
          && NEGATIVE_STATUSES.has(String(purchase.status || '').toLowerCase())
        );
    if (!shouldReverse) continue;
    try {
      await reverseAffiliateCommissionForSource({
        provider: commission.provider,
        sourceId: commission.sourceId,
        reviewedBy: 'affiliate_reconciliation',
        reason: 'Underlying commercial ledger records a refund, reversal, dispute, or chargeback.',
      });
      summary.reversed++;
    } catch (error: any) {
      summary.errors.push(`reverse:${commission.commissionId}:${error?.message || 'reversal_failed'}`);
    }
  }
  return summary;
}
