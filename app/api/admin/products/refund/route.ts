import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { stripe } from '@/lib/payments/stripe';
import { refundPayPalOrder } from '@/lib/payments/paypal';
import { updatePurchaseStatusByOrder } from '@/lib/products/purchase-store';
import { revokeEntitlementsForOrder } from '@/lib/products/entitlements';
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from '@/lib/admin/auth';
import {
  getProductPaymentIntent,
  markProductPaymentIntentRefunded,
} from '@/lib/payments/product-payment-intents';
import { reverseAffiliateCommissionForSource } from '@/lib/affiliates/store';

export const runtime = 'nodejs';

async function requireAdmin() {
  const secret = process.env.LEAD_DASHBOARD_SECRET;
  const cookieStore = await cookies();
  return !!secret && isValidAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value, secret);
}

export async function POST(request: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { orderId, provider, reason } = await request.json();
    const normalizedOrderId = String(orderId || '').trim();
    if (!normalizedOrderId) return NextResponse.json({ error: 'Order ID is required.' }, { status: 400 });

    // This is deliberately first: an external refund must never leave an active entitlement behind.
    const revoked = await revokeEntitlementsForOrder(normalizedOrderId, String(reason || 'refund'));
    const purchases = await updatePurchaseStatusByOrder(normalizedOrderId, 'refund_pending');
    if (purchases.length === 0) return NextResponse.json({ error: 'Purchase not found.' }, { status: 404 });

    const isStripe = provider === 'stripe' || (!provider && normalizedOrderId.startsWith('cs_'));
    let providerPaymentId = purchases.find((purchase) => purchase.paypalCaptureId)?.paypalCaptureId || '';
    if (isStripe) {
      const session = await stripe.checkout.sessions.retrieve(normalizedOrderId);
      const paymentIntent = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id;
      if (!paymentIntent) throw new Error('Stripe payment intent is missing.');
      providerPaymentId = paymentIntent;
      await stripe.refunds.create({ payment_intent: paymentIntent, reason: 'requested_by_customer' });
    } else {
      await refundPayPalOrder(normalizedOrderId);
    }

    const reconciliationWarnings: string[] = [];
    try {
      const paymentIntent = await getProductPaymentIntent(normalizedOrderId);
      if (paymentIntent) await markProductPaymentIntentRefunded(paymentIntent.intentId);
    } catch (error: any) {
      reconciliationWarnings.push(`payment_intent:${error?.message || 'update_failed'}`);
    }
    try {
      await updatePurchaseStatusByOrder(normalizedOrderId, 'refunded');
    } catch (error: any) {
      reconciliationWarnings.push(`purchase_ledger:${error?.message || 'update_failed'}`);
    }
    if (providerPaymentId) {
      try {
        await reverseAffiliateCommissionForSource({
          provider: isStripe ? 'stripe' : 'paypal',
          sourceId: providerPaymentId,
          reviewedBy: 'authenticated_admin_refund',
          reason: `Administrator completed a provider refund for order ${normalizedOrderId}.`,
        });
      } catch (error: any) {
        reconciliationWarnings.push(`affiliate_commission:${error?.message || 'reversal_failed'}`);
      }
    }
    return NextResponse.json({ success: true, revokedEntitlements: revoked, reconciliationWarnings });
  } catch (error: any) {
    console.error('Refund failed after entitlement revocation:', error);
    return NextResponse.json({
      error: error.message || 'Refund failed. Access remains revoked; resolve the payment processor failure before restoring it.',
    }, { status: 502 });
  }
}
