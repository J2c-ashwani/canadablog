import { NextResponse } from 'next/server';
import { cancelPayPalSubscription } from '@/lib/payments/paypal';
import { isLoginToken } from '@/lib/auth/subscriber-tokens';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { getMembershipSubscription, recordMembershipSubscription } from '@/lib/membership/membership-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = String(body.token || '');
    const reason = String(body.reason || 'Cancelled by member from dashboard').slice(0, 500);
    if (!token) return NextResponse.json({ error: 'Secure member token is required.' }, { status: 401 });

    const subscribers = await SubscriberRepository.getAllSubscribers(true);
    const subscriber = subscribers.find((candidate) => isLoginToken(token, candidate.loginToken));
    if (!subscriber) return NextResponse.json({ error: 'Invalid secure member token.' }, { status: 401 });
    const subscriptionId = String(subscriber.subscriptionId || '');
    if (!subscriptionId.startsWith('I-')) {
      return NextResponse.json({ error: 'No PayPal subscription is attached to this account.' }, { status: 409 });
    }

    await cancelPayPalSubscription(subscriptionId, reason);
    const cancelledAt = new Date().toISOString();
    const updated = await SubscriberRepository.updateSubscriberPreferences(subscriber.email, {
      subscriptionStatus: 'CANCELLED',
      cancellationReason: reason,
      subscriptionCancelledAt: cancelledAt,
    });
    if (!updated.success) throw new Error('PayPal cancelled the subscription, but the account status could not be durably updated.');

    const existing = await getMembershipSubscription(subscriptionId);
    await recordMembershipSubscription({
      subscriptionId,
      email: subscriber.email,
      planId: existing?.planId || process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID || '',
      status: 'CANCELLED',
      amountUSD: existing?.amountUSD || 29,
      providerVerifiedAt: existing?.providerVerifiedAt || cancelledAt,
      lastPaymentId: existing?.lastPaymentId || '',
      lastPaymentAt: existing?.lastPaymentAt || '',
      cancelledAt,
      evidenceSource: 'member_requested_paypal_api_cancellation',
    });
    return NextResponse.json({ success: true, message: 'Subscription cancelled successfully.' });
  } catch (error: any) {
    console.error('Membership cancellation failed:', error);
    return NextResponse.json({ error: error.message || 'Cancellation failed.' }, { status: 502 });
  }
}
