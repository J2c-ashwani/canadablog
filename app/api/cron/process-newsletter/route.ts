import { type NextRequest, NextResponse } from 'next/server';
import { isValidCronRequest } from '@/lib/admin/auth';
import { NewsletterEngine } from '@/lib/leads/NewsletterEngine';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { acquireOperationLease, finishOperationLease } from '@/lib/growth-os/operations-store';
import {
  hasRecentCommercialProviderAcceptance,
  isTestOrInternalContact,
} from '@/lib/leads/commercial-eligibility';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;

function getYearWeekString() {
  const now = new Date();
  const yearStart = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
  const day = Math.floor((Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - yearStart.getTime()) / 86400000);
  return `${now.getUTCFullYear()}_W${Math.ceil((day + yearStart.getUTCDay() + 1) / 7)}`;
}

function parseActivity(value?: string) {
  try { return JSON.parse(value || '{}'); } catch { return {}; }
}

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) return NextResponse.json({ error: 'Unauthorized newsletter cron execution.' }, { status: 401 });
  const weekId = getYearWeekString();
  const lease = await acquireOperationLease(`newsletter:${weekId}`, 45 * 60 * 1000);
  if (!lease.acquired) return NextResponse.json({ success: true, skipped: true, reason: lease.reason });

  try {
    let config = await NewsletterEngine.getCampaignConfig();
    const targetCampaignId = `autopilot_campaign_${weekId}`;
    if (config.campaignId !== targetCampaignId) config = await NewsletterEngine.autoInitializeWeeklyCampaign(weekId);
    if (config.status !== 'running') {
      const summary = { campaignId: config.campaignId, providerAccepted: 0, reason: 'No verified open programs were available for a weekly update.' };
      await finishOperationLease(lease, 'SUCCEEDED', summary);
      return NextResponse.json({ success: true, ...summary });
    }

    const allSubscribers = await SubscriberRepository.getAllSubscribers(true);
    const targets = (await NewsletterEngine.getTargetLeadsForCampaign(config, allSubscribers))
      .filter((subscriber) => subscriber.isSubscribed)
      .filter((subscriber) => !isTestOrInternalContact(subscriber))
      .filter((subscriber) => {
        const activity = parseActivity(subscriber.leadActivity);
        return activity.lastNewsletterCampaignId !== config.campaignId
          || !activity.lastNewsletterProviderMessageId;
      })
      .filter((subscriber) => !hasRecentCommercialProviderAcceptance(subscriber))
      .slice(0, 20);
    const outcomes: Array<{ email: string; providerAccepted: boolean; providerMessageId?: string; error?: string }> = [];

    for (const subscriber of targets) {
      const result = await NewsletterEngine.sendNewsletterToLead(config, subscriber);
      if (!result.success || !result.providerMessageId) {
        outcomes.push({ email: subscriber.email, providerAccepted: false, error: result.error || 'Provider message ID missing.' });
        continue;
      }
      const activity = parseActivity(subscriber.leadActivity);
      activity.lastNewsletterCampaignId = config.campaignId;
      activity.lastNewsletterAcceptedAt = new Date().toISOString();
      activity.lastNewsletterProvider = result.provider;
      activity.lastNewsletterProviderMessageId = result.providerMessageId;
      const saved = await SubscriberRepository.updateSubscriberPreferences(subscriber.email, { leadActivity: JSON.stringify(activity) });
      outcomes.push({
        email: subscriber.email,
        providerAccepted: saved.success,
        providerMessageId: result.providerMessageId,
        error: saved.success ? undefined : 'Provider accepted, but CRM receipt persistence failed.',
      });
    }

    const failures = outcomes.filter((outcome) => !outcome.providerAccepted);
    config.sentCount += outcomes.length - failures.length;
    if (targets.length < 20 && failures.length === 0) config.status = 'completed';
    await NewsletterEngine.saveCampaignConfig(config);
    const summary = { campaignId: config.campaignId, targets: targets.length, providerAccepted: outcomes.length - failures.length, failed: failures.length, outcomes };
    await finishOperationLease(lease, failures.length ? 'PARTIAL' : 'SUCCEEDED', summary);
    return NextResponse.json({ success: failures.length === 0, ...summary }, { status: failures.length ? 502 : 200 });
  } catch (error: any) {
    await finishOperationLease(lease, 'FAILED', { error: error.message || String(error) });
    return NextResponse.json({ success: false, error: error.message || 'Newsletter cron failed.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) { return GET(request); }
