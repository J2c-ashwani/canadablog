import { type NextRequest, NextResponse } from 'next/server';
import { verifyPayPalSubscription } from '@/lib/payments/paypal';
import { ensureScopedSubscriberTokens, SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { getMembershipSubscription, recordMembershipSubscription } from '@/lib/membership/membership-store';
import { parseTrackedGrowthToken, recordGrowthActionEvent } from '@/lib/growth-os/action-attribution';
import {
  attributionFromAffiliateIntent,
  consumeAffiliateAttributionIntent,
} from '@/lib/affiliates/store';

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
    let action = trustedAction ? {
          actionId: trustedAction.actionId,
          channel: trustedAction.channel,
          campaign: trustedAction.campaign,
          recipientId: trustedAction.recipientId,
          issuedAt: trustedAction.issuedAt,
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
    const existingMembership = await getMembershipSubscription(subscriptionId);
    // Repeated browser callbacks cannot reassign an existing subscription to a
    // new referral cookie or reset its original activation/payment history.
    if (existingMembership) {
      action = existingMembership.actionId ? {
        actionId: existingMembership.actionId,
        channel: existingMembership.actionChannel,
        campaign: existingMembership.actionCampaign,
        recipientId: existingMembership.actionRecipientId,
        issuedAt: existingMembership.actionIssuedAt,
      } : null;
    }
    const providerCustomId = String(providerData.custom_id || '');
    if (providerCustomId.startsWith('afi_')) {
      try {
        const intent = await consumeAffiliateAttributionIntent({
          intentId: providerCustomId,
          subscriptionId,
          buyerEmail: cleanEmail,
        });
        const restored = attributionFromAffiliateIntent(intent);
        action = {
          actionId: restored.actionId,
          channel: restored.actionChannel,
          campaign: restored.actionCampaign,
          recipientId: restored.actionRecipientId,
          issuedAt: restored.affiliateAttributedAt,
        };
      } catch (attributionError) {
        console.error('Membership affiliate attribution intent could not be restored:', attributionError);
      }
    }
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
      lastPaymentId: existingMembership?.lastPaymentId || '',
      lastPaymentAt: existingMembership?.lastPaymentAt || '',
      cancelledAt: '',
      evidenceSource: 'paypal_api_verification',
      actionId: action?.actionId,
      actionChannel: action?.channel,
      actionCampaign: action?.campaign,
      actionRecipientId: action?.recipientId,
      actionIssuedAt: action?.issuedAt,
      activatedAt: existingMembership?.activatedAt || String(providerData.create_time || verifiedAt),
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
