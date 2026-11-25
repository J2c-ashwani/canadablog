import { type NextRequest, NextResponse } from 'next/server';
import { isValidCronRequest } from '@/lib/admin/auth';
import { CEOActionRunner, type RevenueAgentKey } from '@/lib/agents/ceo-action-runner';
import { acquireOperationLease, finishOperationLease } from '@/lib/growth-os/operations-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;

const LIVE_CONFIRM_TOKEN = 'EXECUTE_REVENUE_AGENTS';
const VALID_AGENTS = new Set<RevenueAgentKey>(['partner', 'upgrade', 'media', 'watch']);

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized daily CEO agent cron execution.' }, { status: 401 });
  }

  const sp = request.nextUrl.searchParams;
  const wantLive = sp.get('live') === 'true';
  const confirmed = sp.get('confirm') === LIVE_CONFIRM_TOKEN;

  if (wantLive && !confirmed) {
    return NextResponse.json(
      { error: `Live agent execution requires confirm=${LIVE_CONFIRM_TOKEN}.` },
      { status: 400 }
    );
  }

  const mode = wantLive && confirmed ? 'live' : 'dry-run';
  const windowParam = (sp.get('window') || '').toLowerCase().trim();
  const isNAMorning = windowParam === 'na-morning';
  const isNAAfternoon = windowParam === 'na-afternoon';
  const openerPush = sp.get('openerPush') === 'true' || isNAMorning || isNAAfternoon;
  const maxTotalEmails = Math.min(25, Math.max(1, Number(sp.get('max') || (isNAAfternoon ? 10 : 25)) || 25));
  const rawAgents = (sp.get('agents') || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter((s): s is RevenueAgentKey => VALID_AGENTS.has(s as RevenueAgentKey));
  const effectiveAgents = isNAAfternoon ? ([] as RevenueAgentKey[]) : (rawAgents.length > 0 ? rawAgents : undefined);

  const utcDateKey = new Date().toISOString().slice(0, 10);
  const leaseOpName = mode === 'live'
    ? isNAMorning
      ? `ceo-na-morning-push:${utcDateKey}`
      : isNAAfternoon
        ? `ceo-na-afternoon-push:${utcDateKey}`
        : 'ceo-daily-agents:live'
    : `ceo-daily-agents:${mode}`;
  const leaseWindowMs = mode === 'live' ? 20 * 60 * 60 * 1000 : 60 * 1000;
  const lease = await acquireOperationLease(leaseOpName, leaseWindowMs);
  if (!lease.acquired) {
    return NextResponse.json({ success: true, skipped: true, reason: lease.reason });
  }

  try {
    const report = await CEOActionRunner.runDailyOperatingPlan({
      mode,
      maxTotalEmails,
      agents: effectiveAgents,
      closedLoopCap: isNAAfternoon ? 6 : openerPush ? 15 : 5,
      includeCartRecovery: openerPush,
      cartRecoveryMax: 5,
      closedLoopOptions: openerPush
        ? {
            minOpenerWaitHours: 4,
            allowFreshReopenFollowUp: true,
            minReopenSpacingHours: 11,
            maxFollowUpsIn7d: 2,
          }
        : undefined,
    });

    const compactSummary = {
      mode: report.mode,
      plannedActions: report.totals.plannedActions,
      executedEmails: report.totals.executedEmails,
      failedCount: report.totals.failedCount,
      estimatedPipelineUSD: report.totals.estimatedPipelineUSD,
      openRatePct: report.campaignMonitor.emailTelemetry.openRatePct,
      clickRatePct: report.campaignMonitor.emailTelemetry.clickRatePct,
      verifiedRevenueUSD: report.campaignMonitor.verifiedRevenue.allTimeUsdGross,
      redisStatus: report.infraHygiene.redisStatus,
    };

    await finishOperationLease(lease, 'SUCCEEDED', compactSummary);
    return NextResponse.json({ success: true, ...report });
  } catch (error: any) {
    console.error('Daily CEO agents execution failed:', error);
    await finishOperationLease(lease, 'FAILED', { error: error?.message || String(error) }).catch(() => {});
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
