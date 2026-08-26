import { type NextRequest, NextResponse } from 'next/server';
import { verifyPayPalSubscription } from '@/lib/payments/paypal';
import { ensureScopedSubscriberTokens, SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { recordMembershipSubscription } from '@/lib/membership/membership-store';
import { parseTrackedGrowthToken, recordGrowthActionEvent } from '@/lib/growth-os/action-attribution';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function parseActivity(value?: string) {
  try { return JSON.parse(value || '{}'); } catch { return {}; }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const subscriptionId = String(body.subscriptionId || '').trim();
    const cleanEmail = String(body.email || '').toLowerCase().trim();
    const trustedAction = parseTrackedGrowthToken(request.cookies.get('fsi_growth_action_token')?.value || '');
    const action = trustedAction ? {
          actionId: trustedAction.actionId,
          channel: trustedAction.channel,
          campaign: trustedAction.campaign,
          recipientId: trustedAction.recipientId,
        } : null;
    const planId = process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID || '';
    if (!subscriptionId || !cleanEmail.includes('@')) {
      return NextResponse.json({ error: 'A valid subscription ID and email are required.' }, { status: 400 });
    }
    if (!planId && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'PayPal membership plan is not configured.' }, { status: 503 });
    }

    const verification = await verifyPayPalSubscription(subscriptionId, {
      email: cleanEmail,
      planId,
      requireActive: true,
    });
    if (!verification.verified || !verification.subscriptionData) {
      return NextResponse.json({ error: verification.error || 'Subscription verification failed.' }, { status: 400 });
    }

    const providerData = verification.subscriptionData;
    const verifiedAt = new Date().toISOString();
    const existing = await SubscriberRepository.getSubscriberByEmail(cleanEmail);
    const activity = parseActivity(existing?.leadActivity);
    activity.membershipVerifiedAt = verifiedAt;
    activity.paypalSubscriptionVerifiedAt = verifiedAt;
    activity.membershipPlanId = providerData.plan_id || planId;
    activity.membershipStatus = 'ACTIVE';

    const writeResult = existing
      ? await SubscriberRepository.updateSubscriberPreferences(cleanEmail, {
          isSubscribed: true,
          subscriptionStatus: 'ACTIVE',
          subscriptionId,
          leadActivity: JSON.stringify(activity),
        })
      : await SubscriberRepository.saveSubscriber({
          email: cleanEmail,
          name: String(providerData.subscriber?.name?.given_name || ''),
          country: 'Canada',
          region: 'ON',
          industry: 'other',
          companySize: '1-9',
          fundingInterests: ['Grants'],
          source: 'Founding Member PayPal Subscription',
          subscriptionStatus: 'ACTIVE',
          subscriptionId,
          leadActivity: JSON.stringify(activity),
        });
    if (!writeResult.success) {
      throw new Error('The verified subscription could not be durably attached to the member account.');
    }

    await recordMembershipSubscription({
      subscriptionId,
      email: cleanEmail,
      planId: providerData.plan_id || planId,
      status: 'ACTIVE',
      amountUSD: 29,
      providerVerifiedAt: verifiedAt,
      lastPaymentId: '',
      lastPaymentAt: '',
      cancelledAt: '',
      evidenceSource: 'paypal_api_verification',
      actionId: action?.actionId,
      actionChannel: action?.channel,
      actionCampaign: action?.campaign,
      actionRecipientId: action?.recipientId,
    });
    if (action) {
      await recordGrowthActionEvent({
        eventId: `subscription:paypal:${subscriptionId}`,
        ...action,
        eventType: 'subscription_verified',
        provider: 'paypal',
        providerMessageId: '',
        productId: 'funding-membership',
        revenueUSD: 0,
        revenueCAD: 0,
        mrrUSD: 29,
        referenceId: subscriptionId,
        metadata: { planId: providerData.plan_id || planId, status: 'ACTIVE' },
      }).catch((error) => console.error('Membership action attribution write failed:', error));
    }

    const tokens = await ensureScopedSubscriberTokens(cleanEmail);
    if (!tokens?.loginToken) throw new Error('Secure member login token could not be created.');
    return NextResponse.json({
      success: true,
      subscriptionId,
      redirectUrl: `/membership/onboarding?token=${encodeURIComponent(tokens.loginToken)}`,
    });
  } catch (error: any) {
    console.error('Failed to activate PayPal membership:', error);
    return NextResponse.json({ error: error.message || 'Membership activation failed.' }, { status: 500 });
  }
}
