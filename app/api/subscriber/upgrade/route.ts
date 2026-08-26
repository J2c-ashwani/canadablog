import { NextResponse, type NextRequest } from 'next/server';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { verifyPayPalSubscription } from '@/lib/payments/paypal';
import { isLoginToken } from '@/lib/auth/subscriber-tokens';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, action, subscriptionId, token } = body;

    if (!email || !action || !token) {
      return NextResponse.json({ error: 'Email, action, and token are required.' }, { status: 400 });
    }

    if (action !== 'trial' && action !== 'active') {
      return NextResponse.json({ error: 'Invalid upgrade action.' }, { status: 400 });
    }

    const subscriber = await SubscriberRepository.getSubscriberByEmail(email);
    if (!subscriber) {
      return NextResponse.json({ error: 'Subscriber not found.' }, { status: 404 });
    }

    if (!isLoginToken(token, subscriber.loginToken)) {
      return NextResponse.json({ error: 'Unauthorized. Invalid token.' }, { status: 401 });
    }

    const updates: any = {};
    const membershipPlanId = process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID || '';
    if (action === 'trial') {
      updates.subscriptionStatus = 'trial';
      updates.trialStartedAt = new Date().toISOString();
    } else {
      // Secure server-side PayPal subscription order validation
      if (!subscriptionId) {
        return NextResponse.json({ error: 'Subscription ID is required for active status upgrade.' }, { status: 400 });
      }
      if (!membershipPlanId && process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'PayPal membership plan is not configured.' }, { status: 503 });
      }
      const verification = await verifyPayPalSubscription(subscriptionId, {
        email,
        planId: membershipPlanId,
        requireActive: true,
      });
      if (!verification.verified) {
        return NextResponse.json({ error: `Subscription verification failed: ${verification.error}` }, { status: 400 });
      }
      updates.subscriptionStatus = 'ACTIVE';
      updates.subscriptionId = subscriptionId;
      let activity: any = {};
      try { activity = JSON.parse(subscriber.leadActivity || '{}'); } catch {}
      activity.membershipVerifiedAt = new Date().toISOString();
      activity.paypalSubscriptionVerifiedAt = activity.membershipVerifiedAt;
      updates.leadActivity = JSON.stringify(activity);
    }

    const res = await SubscriberRepository.updateSubscriberPreferences(email, updates);
    if (!res.success) {
      return NextResponse.json({ error: res.error || 'Failed to update database.' }, { status: 500 });
    }

    if (action === 'active') {
      const { recordMembershipSubscription } = await import('@/lib/membership/membership-store');
      await recordMembershipSubscription({
        subscriptionId,
        email,
        planId: membershipPlanId,
        status: 'ACTIVE',
        amountUSD: 29,
        providerVerifiedAt: new Date().toISOString(),
        lastPaymentId: '',
        lastPaymentAt: '',
        cancelledAt: '',
        evidenceSource: 'paypal_api_verification_portfolio_upgrade',
      });
    }

    return NextResponse.json({
      success: true,
      subscriptionStatus: updates.subscriptionStatus,
      subscriptionId: updates.subscriptionId || subscriber.subscriptionId || '',
      trialStartedAt: updates.trialStartedAt || subscriber.trialStartedAt || '',
    });
  } catch (err: any) {
    console.error('Upgrade subscriber endpoint error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
