/**
 * FSI Digital — Autonomous Continuous CEO Daemon
 *
 * Sleep-Resilient Wall-Clock Cadence:
 *   - Evaluates a lightweight watchdog tick every 3 minutes using real wall-clock `Date.now()`
 *     (never relying on monotonic 60m sleep intervals that drift across macOS lid sleep).
 *   - Runs Cycle immediately on startup and whenever >=60m wall-clock elapsed OR a target window opens:
 *     1. Monitor Results (`CampaignMonitorAgent`: live Resend + Brevo events, auto-suppress bounces/unsubs).
 *     2. Reactive Inbound Replies (`ClosedLoopReplyAgent` with `allowProactiveOpenerFollowUps=false`
 *        on hourly ticks -> replies & opt-outs handled immediately without exceeding <=25/day proactive budget).
 *     3. Window A — NA Business Morning Opener Push + Cart Recovery + Daily Wave
 *        (13:30–17:59 UTC / 7:00 PM–11:29 PM IST / 8:30 AM–12:59 PM EST):
 *        runs full 5-agent wave + thread-matched opener follow-ups + <30d CartRecovery
 *        guarded by date-scoped durable Sheet lease (`<=25` emails total).
 *     4. Window B — Evening Daily CEO Brief (13:35–18:59 UTC / 7:05 PM–12:29 AM IST):
 *        guarantees consolidated `CEOAgent.runCEOLoop('cron')` daily brief email once/day.
 *     5. Window C — Afternoon Second-Look Opener & Cart Catch-Up
 *        (18:00–22:59 UTC / 11:30 PM+ IST / 1:00 PM+ EST, `<=10` emails).
 *
 * Usage:
 *   npx tsx scripts/ceo-autonomous-daemon.ts          # Continuous wall-clock background daemon
 *   npx tsx scripts/ceo-autonomous-daemon.ts --once   # Single pass verification and exit
 */

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

import { CEOActionRunner } from '../lib/agents/ceo-action-runner';
import { CampaignMonitorAgent } from '../lib/agents/campaign-monitor-agent';
import { ClosedLoopReplyAgent } from '../lib/agents/closed-loop-reply-agent';
import { InfraHygieneAgent } from '../lib/agents/infra-hygiene-agent';
import { CEOAgent } from '../lib/ceo-agent/ceo-agent';
import {
  acquireOperationLease,
  finishOperationLease,
  readOperationalRows,
  setOperationalState,
} from '../lib/growth-os/operations-store';
import type { SharedAgentContext } from '../lib/agents/types';

const RUN_HEADERS = ['Attempt ID', 'Operation', 'Started At', 'Status', 'Completed At', 'Summary'];
const WATCHDOG_TICK_MS = 3 * 60 * 1000; // Check wall clock every 3m so Mac wake-ups catch up promptly
const MONITOR_INTERVAL_MS = 60 * 60 * 1000; // Minimum 60m between routine hourly monitor cycles
const DAILY_LEASE_WINDOW_MS = 20 * 60 * 60 * 1000;
const DAILY_BRIEF_WINDOW_MS = 18 * 60 * 60 * 1000;
const NA_MORNING_UTC_HOUR = 13; // 13:30 UTC (7:00 PM IST / 8:30 AM EST)
const NA_MORNING_UTC_MIN = 30;
const NA_AFTERNOON_UTC_HOUR = 18; // 18:00 UTC (11:30 PM IST / 1:00 PM EST)

let cycleNumber = 0;
let isRunningCycle = false;
let lastCycleCompletedMs = 0;
let prevMonitorSignature = '';

async function getLatestOperationTimeMs(targetOps: string[]): Promise<number> {
  const rows = await readOperationalRows('GrowthOS Runs', RUN_HEADERS).catch(() => []);
  let latestMs = 0;
  for (const row of rows) {
    const operation = String(row[1] || '');
    const status = String(row[3] || '');
    if (!targetOps.includes(operation)) continue;
    if (status !== 'SUCCEEDED' && status !== 'RUNNING' && status !== 'PARTIAL') continue;
    const ts = new Date(String(row[2] || '')).getTime();
    if (Number.isFinite(ts) && ts > latestMs) {
      latestMs = ts;
    }
  }
  return latestMs;
}

function isInNAMorningPushWindow(date: Date): boolean {
  const utcHour = date.getUTCHours();
  const utcMin = date.getUTCMinutes();
  const inWindow = (utcHour === NA_MORNING_UTC_HOUR && utcMin >= NA_MORNING_UTC_MIN) || (utcHour >= 14 && utcHour <= 17);
  return inWindow;
}

function isInNAAfternoonWindow(date: Date): boolean {
  const utcHour = date.getUTCHours();
  return utcHour >= NA_AFTERNOON_UTC_HOUR && utcHour <= 22;
}

function isInEveningBriefWindow(date: Date): boolean {
  const utcHour = date.getUTCHours();
  const utcMin = date.getUTCMinutes();
  return (utcHour === 13 && utcMin >= 35) || (utcHour >= 14 && utcHour <= 18);
}

async function runCycle(triggerReason = 'hourly_schedule'): Promise<void> {
  if (isRunningCycle) {
    console.log(`[${new Date().toISOString()}] Skipping overlapping daemon tick (previous cycle still active).`);
    return;
  }

  isRunningCycle = true;
  cycleNumber++;
  const startedIso = new Date().toISOString();
  console.log(`\n==================== CEO DAEMON CYCLE #${cycleNumber} [${startedIso}] (${triggerReason}) ====================`);

  try {
    // 1. Review Results (Resend + Brevo live events, inbound replies, bounce/unsub auto-suppression)
    const monitor = await CampaignMonitorAgent.run('live', cycleNumber === 1);
    const currentSignature = [
      monitor.emailTelemetry.delivered,
      monitor.emailTelemetry.opened,
      monitor.emailTelemetry.clicked,
      monitor.emailTelemetry.bounced,
      monitor.emailTelemetry.unsubscribed,
      monitor.sponsorCampaign.touch1Active,
      monitor.sponsorCampaign.touch2Active,
      monitor.sponsorCampaign.touch3Complete,
      monitor.sponsorCampaign.publishingInquiriesCount,
      monitor.sponsorCampaign.publishingOrdersCount,
      monitor.verifiedRevenue.completedPurchasesCount,
    ].join('|');
    if (cycleNumber > 1 && prevMonitorSignature && currentSignature !== prevMonitorSignature) {
      await setOperationalState('ceo_campaign_monitor_latest', monitor).catch(() => {});
    }
    prevMonitorSignature = currentSignature;

    console.log(
      `[Monitor] Combined Events (Resend+Brevo): delivered=${monitor.emailTelemetry.delivered} | opened=${monitor.emailTelemetry.opened} (${monitor.emailTelemetry.openRatePct}%) | clicked=${monitor.emailTelemetry.clicked} (${monitor.emailTelemetry.clickRatePct}%) | bounced=${monitor.emailTelemetry.bounced} (${monitor.emailTelemetry.bounceRatePct}%) | brevoSynced=${monitor.emailTelemetry.brevoSyncedNewEvents}`
    );
    console.log(
      `[Monitor] Sponsor Pipeline: total=${monitor.sponsorCampaign.totalProspects} | untouched=${monitor.sponsorCampaign.untouchedReady} | T1=${monitor.sponsorCampaign.touch1Active} | T2=${monitor.sponsorCampaign.touch2Active} | T3=${monitor.sponsorCampaign.touch3Complete} | autoSuppressed=${monitor.sponsorCampaign.bouncedRowsAutoSuppressed} | pubInq=${monitor.sponsorCampaign.publishingInquiriesCount} | pubOrders=${monitor.sponsorCampaign.publishingOrdersCount}`
    );
    console.log(
      `[Monitor] Partner Pipeline: total=${monitor.partnerCampaign.totalInquiries} | untouched=${monitor.partnerCampaign.untouched} | followUp=${monitor.partnerCampaign.inFollowUp} | won=${monitor.partnerCampaign.wonOrActive}`
    );
    console.log(
      `[Monitor] Storefront Verified Revenue: ${monitor.verifiedRevenue.completedPurchasesCount} orders ($${monitor.verifiedRevenue.allTimeUsdGross} USD gross)`
    );

    // 2. Reactive Inbound Replies & Opt-Outs Only (proactive opener follow-ups stay inside <=25/day wave)
    const hygiene = await InfraHygieneAgent.runHealthAudit();
    const engagedUnion = new Set<string>(hygiene.engagedEmails);
    for (const eng of monitor.recentEngagements) engagedUnion.add(eng.email);

    const closedLoopCtx: SharedAgentContext = {
      mode: 'live',
      nowMs: Date.now(),
      bouncedEmails: hygiene.bouncedEmails,
      engagedEmails: engagedUnion,
      sameDayClaimedEmails: new Set<string>(),
      remainingGlobalEmails: 5,
      redisStatus: hygiene.redisStatus,
      brevoConfigured: hygiene.brevoConfigured,
      resendConfigured: hygiene.resendConfigured,
    };

    const closedLoop = await ClosedLoopReplyAgent.run(monitor, closedLoopCtx, 5, false);
    console.log(
      `[ClosedLoop] Reactive replies=${closedLoop.repliesDetected} handled=${closedLoop.repliesHandledCount} | optOuts=${closedLoop.unsubscribesProcessed} | engagedTracked=${closedLoop.engagedOpenersEvaluated}`
    );

    // 3. Window A — North America Business Morning Opener Push + Cart Recovery + Daily Wave (13:30-17:59 UTC / 7:00 PM+ IST / 8:30 AM+ EST)
    // Runs BEFORE the 13:35+ UTC Consolidated Brief so every tonight's opener & recovery action appears in your 7:05 PM IST email.
    const now = new Date();
    const utcDateKey = now.toISOString().slice(0, 10);
    const utcHour = now.getUTCHours();
    const utcMin = now.getUTCMinutes();

    const morningOpKey = `ceo-na-morning-push:${utcDateKey}`;
    const lastMorningMs = await getLatestOperationTimeMs([morningOpKey]);
    if (isInNAMorningPushWindow(now) && lastMorningMs === 0) {
      console.log(`[WindowA:NAMorning] Window open (UTC ${utcHour}:${String(utcMin).padStart(2, '0')} = 8:30 AM+ EST). Acquiring lease ${morningOpKey}...`);
      const lease = await acquireOperationLease(morningOpKey, DAILY_LEASE_WINDOW_MS);
      if (!lease.acquired) {
        console.log(`[WindowA:NAMorning] Lease held elsewhere (${lease.reason}). Skipping.`);
      } else {
        try {
          const report = await CEOActionRunner.runDailyOperatingPlan({
            mode: 'live',
            maxTotalEmails: 25,
            closedLoopCap: 15,
            includeCartRecovery: true,
            cartRecoveryMax: 5,
            closedLoopOptions: {
              minOpenerWaitHours: 4,
              allowFreshReopenFollowUp: true,
              minReopenSpacingHours: 11,
              maxFollowUpsIn7d: 2,
            },
          });
          await finishOperationLease(lease, 'SUCCEEDED', report.totals);
          console.log(
            `[WindowA Complete] executed=${report.totals.executedEmails} | openersFollowedUp=${report.closedLoopReview.adaptiveFollowUpsSent} | pipeline=$${report.totals.estimatedPipelineUSD}`
          );
        } catch (waveErr: any) {
          await finishOperationLease(lease, 'FAILED', { error: waveErr?.message || String(waveErr) }).catch(() => {});
          throw waveErr;
        }
      }
    } else {
      console.log(
        `[WindowA:NAMorning] ${lastMorningMs > 0 ? `Completed today (${utcDateKey})` : `Queued for 13:30 UTC (7:00 PM IST / 8:30 AM EST; now ${utcHour}:${String(utcMin).padStart(2, '0')} UTC)`}.`
      );
    }

    // 4. Window B — Guaranteed Consolidated Post-7:00 PM IST Daily Brief (13:35-18:59 UTC / 7:05 PM - 12:29 AM IST)
    const inEveningBriefWindow = isInEveningBriefWindow(now);
    const lastBriefMs = await getLatestOperationTimeMs(['ceo-evidence-loop']);
    const briefNeedsRun = inEveningBriefWindow && now.getTime() - lastBriefMs >= DAILY_BRIEF_WINDOW_MS;

    if (briefNeedsRun) {
      console.log('[WindowB:EveningBrief] Inside post-7:00 PM IST window & brief not sent today -> triggering CEOAgent consolidated brief...');
      const ceoRes = await CEOAgent.runCEOLoop('cron');
      console.log(`[WindowB:EveningBrief] CEOAgent brief result: skipped=${Boolean(ceoRes.skipped)} runId=${ceoRes.runId}`);
    }

    // 5. Window C — Afternoon Second-Look Opener & Cart Recovery Push (18:00-22:59 UTC / 11:30 PM+ IST / 1:00 PM+ EST)
    // Strictly <=10 emails targeting ONLY new post-morning opens (>=4h wait, >=11h spacing, max 2/7d) + <30d cart recovery reminders.
    const afternoonOpKey = `ceo-na-afternoon-push:${utcDateKey}`;
    const lastAfternoonMs = await getLatestOperationTimeMs([afternoonOpKey]);
    if (isInNAAfternoonWindow(now) && lastAfternoonMs === 0) {
      console.log(`[WindowC:NAAfternoon] Window open (UTC ${utcHour}:${String(utcMin).padStart(2, '0')}). Acquiring lease ${afternoonOpKey}...`);
      const lease = await acquireOperationLease(afternoonOpKey, DAILY_LEASE_WINDOW_MS);
      if (!lease.acquired) {
        console.log(`[WindowC:NAAfternoon] Lease held elsewhere (${lease.reason}). Skipping.`);
      } else {
        try {
          const report = await CEOActionRunner.runDailyOperatingPlan({
            mode: 'live',
            maxTotalEmails: 10,
            agents: [],
            closedLoopCap: 6,
            includeCartRecovery: true,
            cartRecoveryMax: 5,
            closedLoopOptions: {
              minOpenerWaitHours: 4,
              allowFreshReopenFollowUp: true,
              minReopenSpacingHours: 11,
              maxFollowUpsIn7d: 2,
            },
          });
          await finishOperationLease(lease, 'SUCCEEDED', report.totals);
          console.log(
            `[WindowC Complete] executed=${report.totals.executedEmails} | openersFollowedUp=${report.closedLoopReview.adaptiveFollowUpsSent} | pipeline=$${report.totals.estimatedPipelineUSD}`
          );
        } catch (afErr: any) {
          await finishOperationLease(lease, 'FAILED', { error: afErr?.message || String(afErr) }).catch(() => {});
          throw afErr;
        }
      }
    }
  } catch (err: any) {
    console.error(`[CEO Daemon Error]: ${err?.message || err}`);
  } finally {
    lastCycleCompletedMs = Date.now();
    isRunningCycle = false;
    console.log(`[CEO Daemon] Cycle #${cycleNumber} complete at ${new Date().toISOString()}.`);
  }
}

async function watchdogCheck(): Promise<void> {
  if (isRunningCycle) return;
  const now = new Date();
  const wallElapsedMs = now.getTime() - lastCycleCompletedMs;

  if (wallElapsedMs >= MONITOR_INTERVAL_MS) {
    await runCycle('wall_clock_60m_elapsed');
    return;
  }

  const utcDateKey = now.toISOString().slice(0, 10);
  if (isInNAMorningPushWindow(now)) {
    const lastMorningMs = await getLatestOperationTimeMs([`ceo-na-morning-push:${utcDateKey}`]);
    if (lastMorningMs === 0) {
      await runCycle('na_morning_window_catchup');
      return;
    }
  }

  // Also catch brief or afternoon window immediately after sleep even inside 60m interval
  if (isInEveningBriefWindow(now)) {
    const lastBriefMs = await getLatestOperationTimeMs(['ceo-evidence-loop']);
    if (now.getTime() - lastBriefMs >= DAILY_BRIEF_WINDOW_MS) {
      await runCycle('evening_brief_window_catchup');
      return;
    }
  }

  if (isInNAAfternoonWindow(now)) {
    const lastAfternoonMs = await getLatestOperationTimeMs([`ceo-na-afternoon-push:${utcDateKey}`]);
    if (lastAfternoonMs === 0) {
      await runCycle('na_afternoon_window_catchup');
    }
  }
}

async function main() {
  const once = process.argv.includes('--once');
  console.log(`🚀 Starting FSI Digital Autonomous CEO Daemon [mode=${once ? 'SINGLE_PASS' : 'CONTINUOUS_WALLCLOCK_WATCHDOG'}, watchdog=3m, cycle=60m, naMorning=13:30 UTC (7:00 PM IST), briefWindow=13:35-18:59 UTC (7:05 PM+ IST), naAfternoon=18:00 UTC]`);

  await runCycle('startup');

  if (once) {
    process.exit(0);
  }

  const timer = setInterval(() => {
    watchdogCheck().catch((err) => console.error('Daemon watchdog error:', err));
  }, WATCHDOG_TICK_MS);

  const shutdown = (signal: string) => {
    console.log(`\n🛑 CEO Daemon received ${signal}, shutting down cleanly.`);
    clearInterval(timer);
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

main().catch((err) => {
  console.error('Fatal CEO Daemon error:', err);
  process.exit(1);
});
