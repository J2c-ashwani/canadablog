import { type NextRequest, NextResponse } from 'next/server';
import { isValidCronRequest } from '@/lib/admin/auth';
import { NewsletterEngine } from '@/lib/leads/NewsletterEngine';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { acquireOperationLease, finishOperationLease } from '@/lib/growth-os/operations-store';
import {
  hasRecentCommercialProviderAcceptance,
  isTestOrInternalContact,
} from '@/lib/leads/commercial-eligibility';
import { buildEmailActionContext, getGrowthActionEvents } from '@/lib/growth-os/action-attribution';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;
const CONTROLLED_COHORT_CAP = 20;

function getYearWeekString() {
  const now = new Date();
  const yearStart = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
  const day = Math.floor((Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - yearStart.getTime()) / 86400000);
  return `${now.getUTCFullYear()}_W${Math.ceil((day + yearStart.getUTCDay() + 1) / 7)}`;
}

function parseActivity(value?: string) {
  try { return JSON.parse(value || '{}'); } catch { return {}; }
}

function campaignTag(campaignType: 'new_funding' | 'match_update' | 'missing_funding') {
  if (campaignType === 'new_funding') return 'newsletter-new-funding';
  if (campaignType === 'missing_funding') return 'newsletter-missing-funding';
  return 'newsletter-match-update';
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

    const remainingCohortCapacity = Math.max(0, CONTROLLED_COHORT_CAP - config.sentCount);
    if (remainingCohortCapacity === 0) {
      config.status = 'completed';
      await NewsletterEngine.saveCampaignConfig(config);
      const summary = {
        campaignId: config.campaignId,
        providerAccepted: 0,
        controlledCohortCap: CONTROLLED_COHORT_CAP,
        reason: 'Controlled cohort cap reached; await checkout and provider-verified payment evidence before scaling.',
      };
      await finishOperationLease(lease, 'SUCCEEDED', summary);
      return NextResponse.json({ success: true, ...summary });
    }

    const [allSubscribers, actionEvents] = await Promise.all([
      SubscriberRepository.getAllSubscribers(true),
      getGrowthActionEvents(),
    ]);
    const tagType = campaignTag(config.campaignType);
    const providerAcceptanceCutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentlyAcceptedRecipientIds = new Set(actionEvents
      .filter((event) => event.eventType === 'provider_accepted' && event.campaign === tagType)
      .filter((event) => new Date(event.occurredAt).getTime() >= providerAcceptanceCutoff)
      .map((event) => event.recipientId)
      .filter(Boolean));
    const targets = (await NewsletterEngine.getTargetLeadsForCampaign(config, allSubscribers))
      .filter((subscriber) => subscriber.isSubscribed)
      .filter((subscriber) => !isTestOrInternalContact(subscriber))
      .filter((subscriber) => {
        const activity = parseActivity(subscriber.leadActivity);
        return activity.lastNewsletterCampaignId !== config.campaignId
          || !activity.lastNewsletterProviderMessageId;
      })
      .filter((subscriber) => !hasRecentCommercialProviderAcceptance(subscriber))
      .filter((subscriber) => !recentlyAcceptedRecipientIds.has(buildEmailActionContext(tagType, subscriber.email).recipientId))
      .slice(0, Math.min(20, remainingCohortCapacity));
    const outcomes: Array<{ email: string; providerAccepted: boolean; crmReceiptPersisted?: boolean; providerMessageId?: string; error?: string }> = [];

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
        providerAccepted: true,
        crmReceiptPersisted: saved.success,
        providerMessageId: result.providerMessageId,
        error: saved.success ? undefined : 'Provider accepted, but CRM receipt persistence failed.',
      });
    }

    const failures = outcomes.filter((outcome) => !outcome.providerAccepted);
    const persistenceFailures = outcomes.filter((outcome) => outcome.providerAccepted && outcome.crmReceiptPersisted === false);
    const acceptedCount = outcomes.length - failures.length;
    config.sentCount += acceptedCount;
    if (config.sentCount >= CONTROLLED_COHORT_CAP || (targets.length < remainingCohortCapacity && failures.length === 0)) {
      config.status = 'completed';
    }
    await NewsletterEngine.saveCampaignConfig(config);
    const summary = {
      campaignId: config.campaignId,
      targets: targets.length,
      providerAccepted: acceptedCount,
      failed: failures.length,
      crmPersistenceFailed: persistenceFailures.length,
      controlledCohortCap: CONTROLLED_COHORT_CAP,
      cohortProviderAccepted: config.sentCount,
      outcomes,
    };
    const partial = failures.length > 0 || persistenceFailures.length > 0;
    await finishOperationLease(lease, partial ? 'PARTIAL' : 'SUCCEEDED', summary);
    return NextResponse.json({ success: !partial, ...summary }, { status: partial ? 502 : 200 });
  } catch (error: any) {
    await finishOperationLease(lease, 'FAILED', { error: error.message || String(error) });
    return NextResponse.json({ success: false, error: error.message || 'Newsletter cron failed.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) { return GET(request); }
