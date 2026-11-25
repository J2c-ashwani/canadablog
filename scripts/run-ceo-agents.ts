/**
 * FSI Digital — Daily CEO Revenue Agent CLI Runner
 *
 * Safe dry-run by default:
 *   npx tsx scripts/run-ceo-agents.ts
 *   npx tsx scripts/run-ceo-agents.ts --agents=partner,upgrade --max=12
 *
 * Live dispatch (only sends external emails / updates CRM tracking columns):
 *   npx tsx scripts/run-ceo-agents.ts --live --confirm=EXECUTE_REVENUE_AGENTS
 */

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

import { CEOActionRunner, type RevenueAgentKey } from '../lib/agents/ceo-action-runner';
import { CEOAgent } from '../lib/ceo-agent/ceo-agent';
import { acquireOperationLease, finishOperationLease, readOperationalRows } from '../lib/growth-os/operations-store';

const VALID_AGENTS = new Set<RevenueAgentKey>(['partner', 'upgrade', 'media', 'watch']);
const RUN_HEADERS = ['Attempt ID', 'Operation', 'Started At', 'Status', 'Completed At', 'Summary'];

function getArg(flag: string): string | undefined {
  const prefix = `--${flag}=`;
  const found = process.argv.find((a) => a.startsWith(prefix));
  return found ? found.slice(prefix.length) : undefined;
}

async function main() {
  const wantLive = process.argv.includes('--live');
  const confirm = getArg('confirm');
  if (wantLive && confirm !== 'EXECUTE_REVENUE_AGENTS') {
    console.error('❌ Live mode blocked: pass --live --confirm=EXECUTE_REVENUE_AGENTS to authorize outbound sends.');
    process.exit(1);
  }

  const mode = wantLive ? 'live' : 'dry-run';
  const windowArg = (getArg('window') || '').toLowerCase().trim();
  const isNAMorning = windowArg === 'na-morning';
  const isNAAfternoon = windowArg === 'na-afternoon';
  const openerPush = process.argv.includes('--opener-push') || isNAMorning || isNAAfternoon;
  const withBrief = process.argv.includes('--with-brief');
  const maxTotalEmails = Math.min(25, Math.max(1, Number(getArg('max') || (isNAAfternoon ? 10 : 25)) || 25));
  const rawAgents = (getArg('agents') || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter((s): s is RevenueAgentKey => VALID_AGENTS.has(s as RevenueAgentKey));
  const effectiveAgents = isNAAfternoon ? ([] as RevenueAgentKey[]) : (rawAgents.length > 0 ? rawAgents : undefined);

  const utcDateKey = new Date().toISOString().slice(0, 10);
  const leaseOpName = isNAMorning
    ? `ceo-na-morning-push:${utcDateKey}`
    : isNAAfternoon
      ? `ceo-na-afternoon-push:${utcDateKey}`
      : 'ceo-daily-agents:live';

  let lease: Awaited<ReturnType<typeof acquireOperationLease>> | null = null;
  if (mode === 'live') {
    lease = await acquireOperationLease(leaseOpName, 20 * 60 * 60 * 1000);
    if (!lease.acquired) {
      console.log(`⏭️  Skipped live wave [${leaseOpName}]: ${lease.reason}`);
      if (!withBrief) process.exit(0);
    }
  }

  console.log(`\n🚀 Running CEO Action Agents [mode=${mode.toUpperCase()}, window=${windowArg || 'default'}, cap=${maxTotalEmails}, openerPush=${openerPush}]...\n`);
  try {
    if (mode === 'dry-run' || lease?.acquired) {
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

      console.log('=== INFRASTRUCTURE & HYGIENE ===');
      console.log(`- Redis: ${report.infraHygiene.redisStatus} (${report.infraHygiene.redisDetail})`);
      console.log(
        `- Providers: Resend=${report.infraHygiene.resendConfigured} | Brevo=${report.infraHygiene.brevoConfigured} | PayPal=${report.infraHygiene.paypalConfigured} | Stripe=${report.infraHygiene.stripeConfigured}`
      );
      console.log(
        `- Programs: ${report.infraHygiene.openProgramsCount}/${report.infraHygiene.totalProgramsCount} Open | Suppressed Bounces/Complaints: ${report.infraHygiene.suppressedEmailsCount}`
      );
      if (report.infraHygiene.recommendedEnvActions.length > 0) {
        console.log('- Env Recommendations:');
        for (const rec of report.infraHygiene.recommendedEnvActions) {
          console.log(`  * ${rec}`);
        }
      }

      console.log('\n=== REVENUE WORKFORCE EXECUTION REPORT ===');
      for (const res of report.agentResults) {
        console.log(
          `\n[${res.agentName}] scanned=${res.scannedCount} | eligible=${res.eligibleCount} | actions=${res.actions.length} | skipped=${res.skippedCount} | blocked=${res.blockedCount} | failed=${res.failedCount} | pipeline=$${res.estimatedPipelineUSD}`
        );
        for (const note of res.notes) {
          console.log(`  Note: ${note}`);
        }
        for (const a of res.actions) {
          console.log(
            `  - [${a.status}] ${a.actionType} -> ${a.recipientEmail} | ${a.targetOffer} ($${a.expectedValueUSD})` +
              (a.providerMessageId ? ` | msgId=${a.providerMessageId}` : '') +
              (a.reason ? ` | reason=${a.reason}` : '')
          );
          if (a.consentProof) console.log(`    Consent: ${a.consentProof}`);
          if (a.checkoutUrl) console.log(`    URL: ${a.checkoutUrl}`);
        }
      }

      console.log('\n=== CLOSED-LOOP REPLY & ENGAGEMENT REVIEW ===');
      const cl = report.closedLoopReview;
      console.log(
        `- Replies: detected=${cl.repliesDetected} | handled=${cl.repliesHandledCount} | optOuts=${cl.unsubscribesProcessed} | engagedOpeners=${cl.engagedOpenersEvaluated} | adaptiveFollowUps=${cl.adaptiveFollowUpsSent}`
      );
      for (const a of cl.actions) {
        console.log(
          `  - [${a.status}] ${a.actionType} -> ${a.recipientEmail} | ${a.targetOffer} ($${a.expectedValueUSD})` +
            (a.providerMessageId ? ` | msgId=${a.providerMessageId}` : '') +
            (a.reason ? ` | reason=${a.reason}` : '')
        );
        if (a.subject) console.log(`    Subject: ${a.subject}`);
        if (a.consentProof) console.log(`    Match: ${a.consentProof}`);
        if (a.checkoutUrl) console.log(`    URL: ${a.checkoutUrl}`);
      }
      for (const note of cl.notes) console.log(`  Note: ${note}`);
      for (const alert of cl.founderHotAlerts) console.log(`  Alert: ${alert}`);

      console.log('\n=== CAMPAIGN MONITORING & TELEMETRY ===');
      const cm = report.campaignMonitor;
      console.log(
        `- Email Events (Resend+Brevo): delivered=${cm.emailTelemetry.delivered} | opened=${cm.emailTelemetry.opened} (${cm.emailTelemetry.openRatePct}%) | clicked=${cm.emailTelemetry.clicked} (${cm.emailTelemetry.clickRatePct}%) | bounced=${cm.emailTelemetry.bounced} (${cm.emailTelemetry.bounceRatePct}%) | brevoSynced=${cm.emailTelemetry.brevoSyncedNewEvents}`
      );
      console.log(
        `- Sponsor Campaign: total=${cm.sponsorCampaign.totalProspects} | untouched=${cm.sponsorCampaign.untouchedReady} | T1=${cm.sponsorCampaign.touch1Active} | T2=${cm.sponsorCampaign.touch2Active} | T3=${cm.sponsorCampaign.touch3Complete} | repliedOrPaid=${cm.sponsorCampaign.repliedOrConverted} | autoSuppressed=${cm.sponsorCampaign.bouncedRowsAutoSuppressed} | pubInquiries=${cm.sponsorCampaign.publishingInquiriesCount} | pubOrders=${cm.sponsorCampaign.publishingOrdersCount}`
      );
      console.log(
        `- Partner Campaign: inquiries=${cm.partnerCampaign.totalInquiries} | untouched=${cm.partnerCampaign.untouched} | followUp=${cm.partnerCampaign.inFollowUp} | won=${cm.partnerCampaign.wonOrActive}`
      );
      console.log(
        `- Verified Storefront Revenue: ${cm.verifiedRevenue.completedPurchasesCount} completed orders ($${cm.verifiedRevenue.allTimeUsdGross} USD gross)`
      );
      if (cm.alerts.length > 0) {
        console.log('- Monitor Alerts:');
        for (const al of cm.alerts) console.log(`  * ${al}`);
      }

      console.log('\n=== DAILY TOTALS ===');
      console.log(JSON.stringify(report.totals, null, 2));

      if (lease?.acquired) {
        await finishOperationLease(lease, 'SUCCEEDED', report.totals);
      }
    }

    if (mode === 'live' && withBrief) {
      const now = new Date();
      const inBriefWindow = (now.getUTCHours() === 13 && now.getUTCMinutes() >= 35) || (now.getUTCHours() >= 14 && now.getUTCHours() <= 18);
      if (inBriefWindow) {
        const runs = await readOperationalRows('GrowthOS Runs', RUN_HEADERS).catch(() => []);
        const latestBriefMs = runs.reduce((max, r) => {
          if (r[1] !== 'ceo-evidence-loop' || (r[3] !== 'SUCCEEDED' && r[3] !== 'RUNNING')) return max;
          const t = new Date(r[2] || '').getTime();
          return Number.isFinite(t) && t > max ? t : max;
        }, 0);
        if (now.getTime() - latestBriefMs >= 18 * 60 * 60 * 1000) {
          console.log('\n📧 Triggering Consolidated Evening CEO Brief...');
          const briefRes = await CEOAgent.runCEOLoop('cron');
          console.log(`CEO Brief result: skipped=${Boolean(briefRes.skipped)} runId=${briefRes.runId}`);
        } else {
          console.log('\n⏭️ Consolidated Evening Brief already executed today.');
        }
      }
    }
  } catch (err: any) {
    console.error('💥 CEO Agent Runner failed:', err?.message || err);
    if (lease?.acquired) {
      await finishOperationLease(lease, 'FAILED', { error: err?.message || String(err) }).catch(() => {});
    }
    process.exit(1);
  }
}

main();
