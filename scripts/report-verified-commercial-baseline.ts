import { getActionPerformanceScorecard } from '../lib/growth-os/action-scorecard';
import { collectGrowthOSEvidence } from '../lib/growth-os/evidence-metrics';
import { CEOMemory } from '../lib/ceo-agent/ceo-memory';

async function main() {
  const [evidence, scorecard, goalState] = await Promise.all([
    collectGrowthOSEvidence({ forceRefresh: true }),
    getActionPerformanceScorecard(30),
    CEOMemory.getGoalState(),
  ]);

  const actions = scorecard.actions
    .filter((action) => action.providerAccepted > 0
      || action.clicks > 0
      || action.checkouts > 0
      || action.purchases > 0
      || action.paypalFailures > 0)
    .map((action) => ({
    actionId: action.actionId,
    channel: action.channel,
    campaign: action.campaign,
    qualifiedLeadsAffected: action.qualifiedLeadsAffected,
    providerAccepted: action.providerAccepted,
    delivered: action.delivered,
    clicks: action.clicks,
    productCheckoutViews: action.productCheckoutViews,
    deliveryEmailsReady: action.deliveryEmailsReady,
    paypalButtonsRendered: action.paypalButtonsRendered,
    paypalButtonClicks: action.paypalButtonClicks,
    paypalApprovals: action.paypalApprovals,
    paypalFailures: action.paypalFailures,
    checkouts: action.checkouts,
    purchases: action.purchases,
    activeSubscriptions: action.activeSubscriptions,
    revenueUSD: action.revenueUSD,
    revenueCAD: action.revenueCAD,
    mrrUSD: action.mrrUSD,
    decision: action.decision,
    decisionReason: action.decisionReason,
    }));

  console.log(JSON.stringify({
    goal: {
      targetUSD: goalState.monthly_revenue_target_usd,
      sprintStartedAt: goalState.sprint_started_at,
      sprintEndsAt: goalState.sprint_ends_at,
      baselineVerifiedRevenueUSD: goalState.sprint_baseline_verified_revenue_usd,
      baselineInitializedAt: goalState.sprint_baseline_initialized_at,
      recordedSprintRevenueUSD: goalState.current_mtd_verified_revenue_usd,
      recordedMRRUSD: goalState.current_mtd_mrr_usd,
      primaryBottleneck: goalState.primary_bottleneck,
    },
    evidence,
    scorecard: {
      ...scorecard,
      actions,
    },
  }, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
