import { type NextRequest, NextResponse } from 'next/server';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import {
  sendCalculatorRecoveryEmail1,
  sendCalculatorRecoveryEmail2,
  sendCalculatorRecoveryEmail3,
} from '@/lib/emails/calculator-recovery';
import { generateFundingRecommendationPlatform } from '@/lib/products/report-generator';
import { isValidCronRequest } from '@/lib/admin/auth';
import { acquireOperationLease, finishOperationLease } from '@/lib/growth-os/operations-store';
import { getAllPurchases } from '@/lib/products/purchase-store';
import { isProviderVerifiedPurchase } from '@/lib/growth-os/evidence-metrics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;

function parseActivity(value?: string) {
  try { return JSON.parse(value || '{}'); } catch { return {}; }
}

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized calculator recovery cron execution.' }, { status: 401 });
  }

  const force = request.nextUrl.searchParams.get('force') === 'true';
  if (force && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Forced calculator outreach is disabled in production.' }, { status: 403 });
  }

  const lease = await acquireOperationLease('calculator-recovery', 45 * 60 * 1000);
  if (!lease.acquired) return NextResponse.json({ success: true, skipped: true, reason: lease.reason });

  try {
    const limit = Math.min(Math.max(Number(request.nextUrl.searchParams.get('limit') || 10), 1), 25);
    const [subscribers, purchases] = await Promise.all([
      SubscriberRepository.getAllSubscribers(true),
      getAllPurchases(),
    ]);
    const paidEmails = new Set(purchases
      .filter(isProviderVerifiedPurchase)
      .map((purchase) => purchase.email.toLowerCase().trim()));
    const now = Date.now();
    const outcomes: Array<{ email: string; stage: number; providerAccepted: boolean; providerMessageId?: string; error?: string }> = [];

    for (const subscriber of subscribers) {
      if (outcomes.length >= limit) break;
      const email = subscriber.email.toLowerCase().trim();
      if (!subscriber.isSubscribed || !email.includes('@') || paidEmails.has(email)) continue;

      const activity = parseActivity(subscriber.leadActivity);
      if (activity.checkoutStartedAt) continue;
      // Never substitute the generic lead timestamp. Recovery requires explicit calculator evidence.
      const completedAt = activity.calculatorCompletedAt;
      const completedMs = completedAt ? new Date(completedAt).getTime() : Number.NaN;
      if (!Number.isFinite(completedMs)) continue;
      const elapsedMs = now - completedMs;
      if (elapsedMs < 0 || elapsedMs > 30 * 24 * 60 * 60 * 1000) continue;

      let stage = 0;
      let result: Awaited<ReturnType<typeof sendCalculatorRecoveryEmail1>> | null = null;
      if ((elapsedMs >= 72 * 60 * 60 * 1000 || force) && activity.calcRecoveryEmail2AcceptedAt && !activity.calcRecoveryEmail3AcceptedAt) {
        stage = 3;
        result = await sendCalculatorRecoveryEmail3({
          to: email,
          name: subscriber.name,
          loginToken: subscriber.loginToken || '',
          provinceCode: subscriber.region || 'on',
          industryCode: subscriber.industry || 'technology',
          revenueCode: subscriber.businessStage || 'pre-revenue',
          goalCode: subscriber.fundingPurpose || 'hiring',
        });
      } else if ((elapsedMs >= 24 * 60 * 60 * 1000 || force) && activity.calcRecoveryEmail1AcceptedAt && !activity.calcRecoveryEmail2AcceptedAt) {
        stage = 2;
        const recommendation = generateFundingRecommendationPlatform({
          province: subscriber.region || 'on',
          industry: subscriber.industry || 'technology',
          revenue: subscriber.businessStage || 'pre-revenue',
          goal: subscriber.fundingPurpose || 'hiring',
        });
        result = await sendCalculatorRecoveryEmail2({
          to: email,
          name: subscriber.name,
          loginToken: subscriber.loginToken || '',
          province: recommendation.profile.provinceName,
          industry: recommendation.profile.industryName,
          revenue: recommendation.profile.revenueName,
          goal: recommendation.profile.goalName,
          estimatedMin: recommendation.executiveRecommendation.totalEstimatedFundingMin,
          estimatedMax: recommendation.executiveRecommendation.totalEstimatedFundingMax,
        });
      } else if ((elapsedMs >= 4 * 60 * 60 * 1000 || force) && !activity.calcRecoveryEmail1AcceptedAt) {
        stage = 1;
        result = await sendCalculatorRecoveryEmail1({
          to: email,
          name: subscriber.name,
          loginToken: subscriber.loginToken || '',
        });
      }

      if (!stage || !result) continue;
      if (!result.success || !result.providerMessageId) {
        outcomes.push({ email, stage, providerAccepted: false, error: result.error || 'Provider message ID missing.' });
        continue;
      }

      activity[`calcRecoveryEmail${stage}AcceptedAt`] = new Date().toISOString();
      activity[`calcRecoveryEmail${stage}Provider`] = result.provider;
      activity[`calcRecoveryEmail${stage}ProviderMessageId`] = result.providerMessageId;
      const saved = await SubscriberRepository.updateSubscriberPreferences(email, { leadActivity: JSON.stringify(activity) });
      outcomes.push({
        email,
        stage,
        providerAccepted: saved.success,
        providerMessageId: result.providerMessageId,
        error: saved.success ? undefined : 'Provider accepted, but CRM receipt persistence failed.',
      });
    }

    const failed = outcomes.filter((outcome) => !outcome.providerAccepted);
    const summary = { candidatesSent: outcomes.length, providerAccepted: outcomes.length - failed.length, failed: failed.length, outcomes };
    await finishOperationLease(lease, failed.length ? 'PARTIAL' : 'SUCCEEDED', summary);
    return NextResponse.json({ success: failed.length === 0, ...summary }, { status: failed.length ? 502 : 200 });
  } catch (error: any) {
    await finishOperationLease(lease, 'FAILED', { error: error.message || String(error) });
    return NextResponse.json({ success: false, error: error.message || 'Calculator recovery failed.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) { return GET(request); }
