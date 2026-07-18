import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { stripe } from '@/lib/payments/stripe';
import { refundPayPalOrder } from '@/lib/payments/paypal';
import { updatePurchaseStatusByOrder } from '@/lib/products/purchase-store';
import { revokeEntitlementsForOrder } from '@/lib/products/entitlements';
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from '@/lib/admin/auth';

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

    if (provider === 'stripe' || (!provider && normalizedOrderId.startsWith('cs_'))) {
      const session = await stripe.checkout.sessions.retrieve(normalizedOrderId);
      const paymentIntent = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id;
      if (!paymentIntent) throw new Error('Stripe payment intent is missing.');
      await stripe.refunds.create({ payment_intent: paymentIntent, reason: 'requested_by_customer' });
    } else {
      await refundPayPalOrder(normalizedOrderId);
    }

    await updatePurchaseStatusByOrder(normalizedOrderId, 'refunded');
    return NextResponse.json({ success: true, revokedEntitlements: revoked });
  } catch (error: any) {
    console.error('Refund failed after entitlement revocation:', error);
    return NextResponse.json({
      error: error.message || 'Refund failed. Access remains revoked; resolve the payment processor failure before restoring it.',
    }, { status: 502 });
  }
}
