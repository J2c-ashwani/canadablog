import { getLeadsFromSheet } from '../lib/google-sheets';
import { getAllPurchases } from '../lib/products/purchase-store';
import { isProviderVerifiedPurchase } from '../lib/growth-os/evidence-metrics';
import { getAllProductPaymentIntents } from '../lib/payments/product-payment-intents';
import {
  hasRecentCommercialProviderAcceptance,
  isTestOrInternalContact,
  parseCommercialActivity,
} from '../lib/leads/commercial-eligibility';
import { buildEmailActionContext, getGrowthActionEvents } from '../lib/growth-os/action-attribution';

const RECOVERABLE_PRODUCTS = new Set([
  'funding-match-report',
  'funding-roadmap',
  'funding-bundle',
  'funding-toolkit',
  'funding-approval-library',
]);

function acceptedAt(value: unknown) {
  const parsed = new Date(String(value || '')).getTime();
  return Number.isFinite(parsed) ? parsed : 0;
}

function hasPaymentEvidence(activity: Record<string, any>) {
  return Boolean(
    activity.paymentCompletedAt
    || activity.paymentCapturedAt
    || activity.providerCaptureVerifiedAt
    || activity.purchaseCompletedAt
  );
}

async function main() {
  const now = Date.now();
  const intentCutoff = now - 30 * 24 * 60 * 60 * 1000;
  const recentAcceptanceCutoff = now - 48 * 60 * 60 * 1000;
  const [leads, purchases, paymentIntents, actionEvents] = await Promise.all([
    getLeadsFromSheet(1000),
    getAllPurchases(),
    getAllProductPaymentIntents(),
    getGrowthActionEvents(),
  ]);

  const verifiedBuyerEmails = new Set(
    purchases
      .filter(isProviderVerifiedPurchase)
      .map((purchase) => purchase.email.toLowerCase().trim()),
  );
  const recentlyAcceptedRecipientIds = new Set(
    actionEvents
      .filter((event) => event.eventType === 'provider_accepted')
      .filter((event) => new Date(event.occurredAt).getTime() >= recentAcceptanceCutoff)
      .map((event) => event.recipientId)
      .filter(Boolean),
  );
  const leadByEmail = new Map(
    leads
      .map((lead) => [String(lead.email || '').toLowerCase().trim(), lead] as const)
      .filter(([email]) => email.includes('@')),
  );
  const latestIntentByEmail = new Map<string, (typeof paymentIntents)[number]>();
  const productBreakdown: Record<string, { intents: number; potentialRevenue: number; currency: string }> = {};

  for (const intent of paymentIntents
    .filter((candidate) => candidate.status === 'created' && Boolean(candidate.paypalOrderId))
    .filter((candidate) => RECOVERABLE_PRODUCTS.has(candidate.productId))
    .filter((candidate) => {
      const createdAt = new Date(candidate.createdAt).getTime();
      return Number.isFinite(createdAt) && createdAt >= intentCutoff && createdAt <= now;
    })
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())) {
    const email = intent.email.toLowerCase().trim();
    if (!email || latestIntentByEmail.has(email)) continue;
    latestIntentByEmail.set(email, intent);
    const entry = productBreakdown[intent.productId] || {
      intents: 0,
      potentialRevenue: 0,
      currency: intent.currency || 'USD',
    };
    entry.intents++;
    entry.potentialRevenue += Number.parseFloat(intent.expectedAmount || '0') || 0;
    productBreakdown[intent.productId] = entry;
  }

  const exclusionReasons: Record<string, number> = {
    missingLead: 0,
    notOptedIn: 0,
    testOrInternal: 0,
    verifiedBuyerOrPaymentEvidence: 0,
    recentCommercialAcceptance: 0,
    invalidTimestamp: 0,
  };
  const stageCounts: Record<string, number> = {
    email1Due: 0,
    email2Due: 0,
    email3Due: 0,
    waitingForDelay: 0,
    sequenceComplete: 0,
  };
  let eligibleNow = 0;
  let eligiblePotentialRevenue = 0;

  for (const [email, intent] of latestIntentByEmail.entries()) {
    const lead = leadByEmail.get(email);
    if (!lead) {
      exclusionReasons.missingLead++;
      continue;
    }
    if (lead.isSubscribed !== true) {
      exclusionReasons.notOptedIn++;
      continue;
    }
    if (isTestOrInternalContact(lead)) {
      exclusionReasons.testOrInternal++;
      continue;
    }
    const activity = parseCommercialActivity(lead.leadActivity);
    if (verifiedBuyerEmails.has(email) || hasPaymentEvidence(activity)) {
      exclusionReasons.verifiedBuyerOrPaymentEvidence++;
      continue;
    }
    if (
      hasRecentCommercialProviderAcceptance(lead)
      || recentlyAcceptedRecipientIds.has(buildEmailActionContext('cart-recovery-1', email).recipientId)
    ) {
      exclusionReasons.recentCommercialAcceptance++;
      continue;
    }

    const checkoutStartMs = new Date(intent.createdAt).getTime();
    if (!Number.isFinite(checkoutStartMs) || checkoutStartMs > now) {
      exclusionReasons.invalidTimestamp++;
      continue;
    }
    const elapsedMs = now - checkoutStartMs;
    const checkoutEvidenceId = `intent:${intent.intentId}`;
    const sameRecoverySequence = activity.cartRecoveryEvidenceId === checkoutEvidenceId;
    const hasEmail1 = sameRecoverySequence && Boolean(activity.cartRecoveryEmail1ProviderMessageId);
    const hasEmail2 = sameRecoverySequence && Boolean(activity.cartRecoveryEmail2ProviderMessageId);
    const hasEmail3 = sameRecoverySequence && Boolean(activity.cartRecoveryEmail3ProviderMessageId);

    let due = false;
    if (hasEmail2 && now - acceptedAt(activity.cartRecoveryEmail2AcceptedAt) >= 48 * 60 * 60 * 1000 && !hasEmail3) {
      stageCounts.email3Due++;
      due = true;
    } else if (hasEmail1 && now - acceptedAt(activity.cartRecoveryEmail1AcceptedAt) >= 24 * 60 * 60 * 1000 && !hasEmail2) {
      stageCounts.email2Due++;
      due = true;
    } else if (elapsedMs >= 45 * 60 * 1000 && !hasEmail1) {
      stageCounts.email1Due++;
      due = true;
    } else if (hasEmail3) {
      stageCounts.sequenceComplete++;
    } else {
      stageCounts.waitingForDelay++;
    }

    if (due) {
      eligibleNow++;
      eligiblePotentialRevenue += Number.parseFloat(intent.expectedAmount || '0') || 0;
    }
  }

  console.log(JSON.stringify({
    generatedAt: new Date().toISOString(),
    dryRun: true,
    sendsTriggered: 0,
    totalPaymentIntents: paymentIntents.length,
    uniqueRecentOpenCheckoutIntents: latestIntentByEmail.size,
    productBreakdown,
    exclusionReasons,
    stageCounts,
    eligibleNow,
    eligiblePotentialRevenue,
    note: 'Potential revenue is inventory value, not forecast or verified revenue.',
  }, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
