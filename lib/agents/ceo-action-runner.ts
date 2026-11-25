import { InfraHygieneAgent, type InfraHygieneReport } from './infra-hygiene-agent';
import { PartnerBrokerAgent } from './partner-broker-agent';
import { CustomerUpgradeAgent } from './customer-upgrade-agent';
import { SponsoredMediaAgent } from './sponsored-media-agent';
import { FundingWatchMRRAgent } from './funding-watch-agent';
import { CampaignMonitorAgent, type CampaignMonitorReport } from './campaign-monitor-agent';
import {
  ClosedLoopReplyAgent,
  type ClosedLoopOpenerOptions,
  type ClosedLoopReviewReport,
} from './closed-loop-reply-agent';
import { CartRecoveryService } from '@/lib/leads/cart-recovery-service';
import { setOperationalState } from '@/lib/growth-os/operations-store';
import type { AgentExecutionMode, AgentRunResult, SharedAgentContext } from './types';

export type RevenueAgentKey = 'partner' | 'upgrade' | 'media' | 'watch';

export interface CEOActionRunnerOptions {
  mode?: AgentExecutionMode;
  maxTotalEmails?: number;
  agents?: RevenueAgentKey[];
  closedLoopCap?: number;
  closedLoopOptions?: ClosedLoopOpenerOptions;
  includeCartRecovery?: boolean;
  cartRecoveryMax?: number;
}

export interface CEOActionRunnerReport {
  executedAt: string;
  mode: AgentExecutionMode;
  maxTotalEmails: number;
  infraHygiene: Omit<InfraHygieneReport, 'bouncedEmails' | 'engagedEmails'>;
  closedLoopReview: ClosedLoopReviewReport;
  agentResults: AgentRunResult[];
  campaignMonitor: CampaignMonitorReport;
  totals: {
    scannedCount: number;
    eligibleCount: number;
    plannedActions: number;
    executedEmails: number;
    skippedCount: number;
    blockedCount: number;
    failedCount: number;
    estimatedPipelineUSD: number;
    uniqueRecipientsClaimed: number;
    remainingGlobalBudget: number;
  };
}

const DEFAULT_AGENT_ORDER: RevenueAgentKey[] = ['partner', 'upgrade', 'media', 'watch'];

const AGENT_CAPS: Record<RevenueAgentKey, number> = {
  partner: 4,
  upgrade: 8,
  media: 8,
  watch: 5,
};

export class CEOActionRunner {
  static async runDailyOperatingPlan(options: CEOActionRunnerOptions = {}): Promise<CEOActionRunnerReport> {
    const mode: AgentExecutionMode = options.mode === 'live' ? 'live' : 'dry-run';
    const maxTotalEmails = Math.min(25, Math.max(1, Number(options.maxTotalEmails) || 25));
    const requestedAgents = options.agents !== undefined ? options.agents : DEFAULT_AGENT_ORDER;

    const hygiene = await InfraHygieneAgent.runHealthAudit();
    const preMonitor = await CampaignMonitorAgent.run(mode, false);

    const engagedUnion = new Set<string>(hygiene.engagedEmails);
    for (const eng of preMonitor.recentEngagements) engagedUnion.add(eng.email);

    const ctx: SharedAgentContext = {
      mode,
      nowMs: Date.now(),
      bouncedEmails: hygiene.bouncedEmails,
      engagedEmails: engagedUnion,
      sameDayClaimedEmails: new Set<string>(),
      remainingGlobalEmails: maxTotalEmails,
      redisStatus: hygiene.redisStatus,
      brevoConfigured: hygiene.brevoConfigured,
      resendConfigured: hygiene.resendConfigured,
    };

    // Review Replies & Engagement Results FIRST before allocating new Wave touches
    const closedLoopBudget = Math.min(options.closedLoopCap ?? 5, maxTotalEmails);
    const closedLoopReview = await ClosedLoopReplyAgent.run(
      preMonitor,
      ctx,
      closedLoopBudget,
      true,
      options.closedLoopOptions || {}
    );

    const agentResults: AgentRunResult[] = [];

    if (options.includeCartRecovery && ctx.remainingGlobalEmails > 0) {
      const cartSliceCap = Math.min(options.cartRecoveryMax ?? 5, ctx.remainingGlobalEmails);
      const cartSummary = await CartRecoveryService.processCartRecoveryBatch(
        cartSliceCap,
        false,
        mode === 'dry-run'
      ).catch((err) => ({
        processedCount: 0,
        attemptedCount: 0,
        eligibleCheckoutCount: 0,
        paymentIntentEvidenceCount: 0,
        skippedPurchasedCount: 0,
        recoveredCandidates: [] as string[],
        receipts: [] as Array<{ email: string; stage: string; provider: string; providerMessageId: string; actionId: string }>,
        errors: [String(err?.message || err)],
        timestamp: new Date().toISOString(),
      }));

      const cartActions: AgentRunResult['actions'] = [];
      let cartExecuted = 0;
      let cartPipeline = 0;
      if (mode === 'dry-run') {
        for (const cand of cartSummary.recoveredCandidates) {
          const candEmail = cand.split(' ')[0].toLowerCase().trim();
          if (candEmail && !ctx.sameDayClaimedEmails.has(candEmail) && ctx.remainingGlobalEmails > 0) {
            ctx.sameDayClaimedEmails.add(candEmail);
            ctx.remainingGlobalEmails--;
            cartExecuted++;
            cartPipeline += 19;
            cartActions.push({
              agent: 'CartRecoveryService',
              recipientKey: candEmail,
              recipientEmail: candEmail,
              actionType: 'CART_RECOVERY_TXN',
              targetOffer: cand,
              expectedValueUSD: 19,
              status: 'PLANNED',
              consentProof: '<30d open Payment Intent / checkout recovery',
            });
          }
        }
      } else {
        for (const r of cartSummary.receipts) {
          const rEmail = r.email.toLowerCase().trim();
          if (rEmail) ctx.sameDayClaimedEmails.add(rEmail);
          if (ctx.remainingGlobalEmails > 0) ctx.remainingGlobalEmails--;
          cartExecuted++;
          cartPipeline += 19;
          cartActions.push({
            agent: 'CartRecoveryService',
            recipientKey: rEmail || r.actionId,
            recipientEmail: rEmail,
            actionType: `CART_RECOVERY_${r.stage.replace(/\s+/g, '_').toUpperCase()}`,
            targetOffer: `Checkout Recovery ${r.stage}`,
            expectedValueUSD: 19,
            status: 'EXECUTED',
            provider: r.provider,
            providerMessageId: r.providerMessageId,
            consentProof: '<30d transactional cart recovery',
          });
        }
      }

      agentResults.push({
        agentName: 'CartRecoveryService',
        mode,
        scannedCount: cartSummary.eligibleCheckoutCount,
        eligibleCount: cartSummary.eligibleCheckoutCount,
        executedCount: cartExecuted,
        skippedCount: cartSummary.skippedPurchasedCount,
        blockedCount: 0,
        failedCount: cartSummary.errors.length,
        estimatedPipelineUSD: cartPipeline,
        actions: cartActions,
        notes: [
          `Evaluated ${cartSummary.eligibleCheckoutCount} open <30d checkouts (${cartSummary.paymentIntentEvidenceCount} PayPal intent-backed); ${cartSummary.errors.length ? `errors=${cartSummary.errors.join('; ')}` : 'clean.'}`,
        ],
      });
    }

    for (const key of requestedAgents) {
      const sliceCap = Math.min(AGENT_CAPS[key] || 5, ctx.remainingGlobalEmails);
      if (sliceCap <= 0) {
        agentResults.push({
          agentName: key,
          mode,
          scannedCount: 0,
          eligibleCount: 0,
          executedCount: 0,
          skippedCount: 0,
          blockedCount: 1,
          failedCount: 0,
          estimatedPipelineUSD: 0,
          actions: [],
          notes: ['Skipped because global daily outbound budget was exhausted by higher-priority revenue channels.'],
        });
        continue;
      }

      if (key === 'partner') {
        agentResults.push(await PartnerBrokerAgent.run(ctx, sliceCap));
      } else if (key === 'upgrade') {
        agentResults.push(await CustomerUpgradeAgent.run(ctx, sliceCap));
      } else if (key === 'media') {
        agentResults.push(await SponsoredMediaAgent.run(ctx, sliceCap));
      } else if (key === 'watch') {
        agentResults.push(await FundingWatchMRRAgent.run(ctx, sliceCap));
      }
    }

    let scannedCount = 0;
    let eligibleCount = 0;
    let plannedActions = 0;
    let executedEmails = 0;
    let skippedCount = 0;
    let blockedCount = 0;
    let failedCount = 0;
    let estimatedPipelineUSD = 0;

    for (const clAction of closedLoopReview.actions) {
      if (clAction.status === 'PLANNED') plannedActions++;
      if (clAction.status === 'EXECUTED') executedEmails++;
      estimatedPipelineUSD += clAction.expectedValueUSD || 0;
    }

    for (const res of agentResults) {
      scannedCount += res.scannedCount;
      eligibleCount += res.eligibleCount;
      skippedCount += res.skippedCount;
      blockedCount += res.blockedCount;
      failedCount += res.failedCount;
      estimatedPipelineUSD += res.estimatedPipelineUSD;
      for (const action of res.actions) {
        if (action.status === 'PLANNED') plannedActions++;
        if (action.status === 'EXECUTED') executedEmails++;
      }
    }

    const campaignMonitor = await CampaignMonitorAgent.run(mode, mode === 'live');
    const { bouncedEmails: _bounced, engagedEmails: _engaged, ...hygieneSummary } = hygiene;

    const finalReport: CEOActionRunnerReport = {
      executedAt: new Date().toISOString(),
      mode,
      maxTotalEmails,
      infraHygiene: hygieneSummary,
      closedLoopReview,
      agentResults,
      campaignMonitor,
      totals: {
        scannedCount,
        eligibleCount,
        plannedActions,
        executedEmails,
        skippedCount,
        blockedCount,
        failedCount,
        estimatedPipelineUSD,
        uniqueRecipientsClaimed: ctx.sameDayClaimedEmails.size,
        remainingGlobalBudget: ctx.remainingGlobalEmails,
      },
    };

    if (mode === 'live') {
      const perLeadActions = [
        ...closedLoopReview.actions,
        ...agentResults.flatMap((r) => r.actions),
      ]
        .slice(0, 40)
        .map((a) => ({
          agent: a.agent,
          email: a.recipientEmail,
          actionType: a.actionType,
          targetOffer: a.targetOffer,
          expectedValueUSD: a.expectedValueUSD,
          status: a.status,
          provider: a.provider || '',
          providerMessageId: a.providerMessageId || '',
          reason: a.reason || '',
        }));

      await setOperationalState('ceo_workforce_last_wave', {
        executedAt: finalReport.executedAt,
        totals: finalReport.totals,
        channels: agentResults.map((r) => ({
          agentName: r.agentName,
          executed: r.actions.filter((a) => a.status === 'EXECUTED').length,
          pipelineUSD: r.estimatedPipelineUSD,
        })),
        perLeadActions,
        closedLoop: {
          repliesDetected: closedLoopReview.repliesDetected,
          repliesHandledCount: closedLoopReview.repliesHandledCount,
          adaptiveFollowUpsSent: closedLoopReview.adaptiveFollowUpsSent,
          founderHotAlerts: closedLoopReview.founderHotAlerts,
        },
      }).catch(() => {});
    }

    return finalReport;
  }
}
