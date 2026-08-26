import { NextResponse, type NextRequest } from 'next/server';
import { isValidCronRequest } from '@/lib/admin/auth';
import { acquireOperationLease, finishOperationLease } from '@/lib/growth-os/operations-store';
import { getLatestMembershipSubscriptions } from '@/lib/membership/membership-store';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { buildMemberProgramMatches } from '@/lib/membership/member-matches';
import { buildMembershipBriefingHtml } from '@/lib/emails/membership-briefing';
import { sendEmail } from '@/lib/emails/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;

function isoWeekKey(date = new Date()) {
  const utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((utc.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${utc.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

function parseActivity(value?: string) {
  try { return JSON.parse(value || '{}'); } catch { return {}; }
}

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) return NextResponse.json({ error: 'Unauthorized membership briefing cron.' }, { status: 401 });
  const today = new Date().toISOString().slice(0, 10);
  const lease = await acquireOperationLease(`membership-briefings:${today}`, 30 * 60 * 1000);
  if (!lease.acquired) return NextResponse.json({ success: true, skipped: true, reason: lease.reason });

  try {
    const limit = Math.min(Math.max(Number(request.nextUrl.searchParams.get('limit') || 35), 1), 40);
    const weekKey = isoWeekKey();
    const [subscriptions, subscribers] = await Promise.all([
      getLatestMembershipSubscriptions(),
      SubscriberRepository.getAllSubscribers(true),
    ]);
    const activeEmails = new Set(subscriptions
      .filter((subscription) => subscription.status === 'ACTIVE' && Boolean(subscription.providerVerifiedAt))
      .map((subscription) => subscription.email.toLowerCase()));
    const candidates = subscribers.filter((subscriber) => activeEmails.has(subscriber.email.toLowerCase()));
    const outcomes: Array<{ email: string; providerAccepted: boolean; providerMessageId?: string; error?: string }> = [];

    for (const subscriber of candidates) {
      if (outcomes.length >= limit) break;
      const activity = parseActivity(subscriber.leadActivity);
      if (activity.membershipRadarWeek === weekKey) continue;
      if (!subscriber.loginToken) {
        outcomes.push({ email: subscriber.email, providerAccepted: false, error: 'Secure login token missing.' });
        continue;
      }
      const matches = buildMemberProgramMatches(subscriber, 5);
      const mail = await sendEmail({
        to: subscriber.email,
        subject: `Funding Watch weekly radar — ${weekKey}`,
        html: buildMembershipBriefingHtml({
          email: subscriber.email,
          name: subscriber.name,
          companyName: subscriber.companyName,
          province: subscriber.region,
          industry: subscriber.industry,
          revenueBand: activity.revenueBand,
          employees: activity.employees,
          preference: activity.preference,
          growthObjective: activity.growthObjective,
          loginToken: subscriber.loginToken,
          briefingLabel: `Weekly Radar ${weekKey}`,
          matches,
        }),
        text: `Your ${weekKey} Funding Watch radar is ready: https://www.fsidigital.ca/membership/dashboard?token=${encodeURIComponent(subscriber.loginToken)}`,
        tagType: 'membership-weekly-radar',
      });
      if (!mail.success || !mail.providerMessageId) {
        outcomes.push({ email: subscriber.email, providerAccepted: false, error: mail.error || 'Provider message ID missing.' });
        continue;
      }
      activity.membershipRadarWeek = weekKey;
      activity.membershipRadarAcceptedAt = new Date().toISOString();
      activity.membershipRadarProvider = mail.provider;
      activity.membershipRadarProviderMessageId = mail.providerMessageId;
      const saved = await SubscriberRepository.updateSubscriberPreferences(subscriber.email, { leadActivity: JSON.stringify(activity) });
      if (!saved.success) {
        outcomes.push({ email: subscriber.email, providerAccepted: false, providerMessageId: mail.providerMessageId, error: 'Provider accepted, but CRM receipt persistence failed.' });
        continue;
      }
      outcomes.push({ email: subscriber.email, providerAccepted: true, providerMessageId: mail.providerMessageId });
    }

    const failures = outcomes.filter((outcome) => !outcome.providerAccepted);
    const summary = { weekKey, activeMembers: activeEmails.size, candidates: candidates.length, outcomes };
    await finishOperationLease(lease, failures.length > 0 ? 'PARTIAL' : 'SUCCEEDED', summary);
    return NextResponse.json({ success: failures.length === 0, ...summary }, { status: failures.length > 0 ? 502 : 200 });
  } catch (error: any) {
    await finishOperationLease(lease, 'FAILED', { error: error.message || String(error) });
    return NextResponse.json({ success: false, error: error.message || 'Membership briefing cron failed.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) { return GET(request); }
