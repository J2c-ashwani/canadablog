import { NextResponse } from 'next/server';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { isLoginToken } from '@/lib/auth/subscriber-tokens';
import { verifyPayPalSubscription } from '@/lib/payments/paypal';
import { sendEmail } from '@/lib/emails/mailer';
import { buildMembershipBriefingHtml } from '@/lib/emails/membership-briefing';
import { buildMemberProgramMatches } from '@/lib/membership/member-matches';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function parseActivity(value?: string) {
  try { return JSON.parse(value || '{}'); } catch { return {}; }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const token = String(data.token || '');
    if (!token) return NextResponse.json({ error: 'Secure member token is required.' }, { status: 401 });

    const subscribers = await SubscriberRepository.getAllSubscribers(true);
    const subscriber = subscribers.find((candidate) => isLoginToken(token, candidate.loginToken));
    if (!subscriber) return NextResponse.json({ error: 'Secure member token is invalid or expired.' }, { status: 401 });
    if (String(subscriber.subscriptionStatus || '').toUpperCase() !== 'ACTIVE' || !subscriber.subscriptionId?.startsWith('I-')) {
      return NextResponse.json({ error: 'An active PayPal membership is required.' }, { status: 403 });
    }

    const verification = await verifyPayPalSubscription(subscriber.subscriptionId, {
      email: subscriber.email,
      planId: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID || '',
      requireActive: true,
    });
    if (!verification.verified) {
      return NextResponse.json({ error: verification.error || 'PayPal membership is not active.' }, { status: 403 });
    }

    const activity = parseActivity(subscriber.leadActivity);
    const companySize = data.employees === '50+'
      ? '50-99'
      : data.employees === '21-50' || data.employees === '6-20'
        ? '10-49'
        : '1-9';
    Object.assign(activity, {
      onboardedAt: activity.onboardedAt || new Date().toISOString(),
      companyName: data.companyName,
      province: data.province,
      industry: data.industry,
      stage: data.stage,
      revenueBand: data.revenueBand,
      employees: data.employees,
      preference: data.preference,
      growthObjective: data.growthObjective,
    });
    const updated = await SubscriberRepository.updateSubscriberPreferences(subscriber.email, {
      name: data.name || subscriber.name,
      companyName: data.companyName || subscriber.companyName,
      region: data.province || subscriber.region,
      industry: data.industry || subscriber.industry,
      companySize,
      leadActivity: JSON.stringify(activity),
    });
    if (!updated.success) throw new Error('Member profile could not be durably saved.');

    if (!activity.membershipBriefing1ProviderMessageId) {
      const matches = buildMemberProgramMatches({
        ...subscriber,
        region: data.province || subscriber.region,
        industry: data.industry || subscriber.industry,
        companySize,
      }, 5);
      const html = buildMembershipBriefingHtml({
        email: subscriber.email,
        name: data.name,
        companyName: data.companyName,
        province: data.province,
        industry: data.industry,
        stage: data.stage,
        revenueBand: data.revenueBand,
        employees: data.employees,
        preference: data.preference,
        growthObjective: data.growthObjective,
        loginToken: token,
        briefingLabel: 'Welcome Briefing',
        matches,
      });
      const mail = await sendEmail({
        to: subscriber.email,
        subject: `Your Funding Watch welcome briefing — ${data.province || 'business funding'}`,
        html,
        text: `Your Funding Watch profile is ready. Dashboard: https://www.fsidigital.ca/membership/dashboard?token=${encodeURIComponent(token)}`,
        tagType: 'membership-welcome-briefing',
      });
      if (!mail.success || !mail.providerMessageId) {
        return NextResponse.json({ error: mail.error || 'Profile saved, but the welcome briefing was not accepted by an email provider.' }, { status: 502 });
      }
      activity.membershipBriefing1Provider = mail.provider;
      activity.membershipBriefing1ProviderMessageId = mail.providerMessageId;
      activity.membershipBriefing1AcceptedAt = new Date().toISOString();
      const receiptSaved = await SubscriberRepository.updateSubscriberPreferences(subscriber.email, {
        leadActivity: JSON.stringify(activity),
      });
      if (!receiptSaved.success) throw new Error('Welcome briefing was accepted, but its receipt could not be durably saved.');
    }

    return NextResponse.json({ success: true, email: subscriber.email });
  } catch (error: any) {
    console.error('Membership onboarding failed:', error);
    return NextResponse.json({ error: error.message || 'Onboarding failed.' }, { status: 500 });
  }
}
