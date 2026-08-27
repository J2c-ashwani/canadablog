import { CEOMemory, type CEODecisionBasis } from './ceo-memory'
import { CEOScoreboard } from './ceo-scoreboard'
import { RevenueAgent } from './specialists/revenue-agent'
import { GrowthAgent } from './specialists/growth-agent'
import { SalesAgent } from './specialists/sales-agent'
import { ProductAgent } from './specialists/product-agent'
import { CEOExperimentEngine } from './ceo-experiments'
import { acquireOperationLease, finishOperationLease, type OperationLease } from '@/lib/growth-os/operations-store'
import { sendEmail } from '@/lib/emails/mailer'
import { getQueuedGrowthOSEvents, markGrowthOSEventsReviewed } from '@/lib/growth-os/core/event-bus'

export interface CEORunResult {
  runId: string
  triggerSource: 'cron' | 'event' | 'on_demand' | 'verification'
  timestamp: string
  skipped?: boolean
  skipReason?: string
  scoreboard: any
  pathToTarget: any
  leakageReport: any
  briefText: string
  decisionBasis: CEODecisionBasis
  executedActions: any[]
  specialistReports: Record<string, any>
}

function hasSheetsConfiguration() {
  return Boolean(process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID)
}

function defaultDecisionBasis(): CEODecisionBasis {
  return {
    primary_bottleneck: 'Duplicate execution suppressed',
    evidence_refs: [],
    observed_conversion_rate: 0,
    baseline_rate: 0,
    estimated_monthly_leakage_usd: 0,
    hypothesis: 'No new decision was required.',
    decision: 'Use the earlier run in the active lease window.',
    expected_revenue_impact_usd: 0,
    attribution_confidence: 'LOW',
  }
}

export class CEOAgent {
  public static async runCEOLoop(
    triggerSource: 'cron' | 'event' | 'on_demand' | 'verification' = 'cron'
  ): Promise<CEORunResult> {
    const runId = `run_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    let lease: OperationLease | null = null
    if (triggerSource !== 'verification' && hasSheetsConfiguration()) {
      lease = await acquireOperationLease('ceo-evidence-loop', 30 * 60 * 1000)
      if (!lease.acquired) {
        return {
          runId,
          triggerSource,
          timestamp: new Date().toISOString(),
          skipped: true,
          skipReason: lease.reason,
          scoreboard: null,
          pathToTarget: null,
          leakageReport: null,
          briefText: `CEO run skipped: ${lease.reason}`,
          decisionBasis: defaultDecisionBasis(),
          executedActions: [],
          specialistReports: {},
        }
      }
    }

    try {
      const [revenue, growth, sales, product, queuedSignals] = await Promise.all([
        RevenueAgent.auditRevenue(),
        GrowthAgent.auditGrowthOS(),
        SalesAgent.auditSales(),
        ProductAgent.auditProduct(),
        getQueuedGrowthOSEvents(),
      ])
      const goalState = await CEOMemory.getGoalState()
      const sprintBaseline = goalState.sprint_baseline_initialized_at
        ? goalState.sprint_baseline_verified_revenue_usd
        : revenue.verifiedTotalRevenueUSD
      const verifiedSprintRevenueUSD = Number(Math.max(0, revenue.verifiedTotalRevenueUSD - sprintBaseline).toFixed(2))
      if (triggerSource !== 'verification' && !goalState.sprint_baseline_initialized_at) {
        await CEOMemory.updateGoalState({
          sprint_started_at: new Date().toISOString(),
          sprint_ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          sprint_baseline_verified_revenue_usd: revenue.verifiedTotalRevenueUSD,
          sprint_baseline_initialized_at: new Date().toISOString(),
        })
      }
      const scoreboard = await CEOScoreboard.calculateScoreboard(
        verifiedSprintRevenueUSD,
        revenue.verifiedMRRUSD,
        revenue.activeMemberships,
        revenue.evidenceState
      )
      const pathToTarget = CEOScoreboard.calculatePathToTarget(
        verifiedSprintRevenueUSD,
        scoreboard.monthlyRevenueTargetUSD,
        scoreboard.daysRemainingInMonth
      )
      const leakageReport = CEOScoreboard.calculateLeakageReport(
        sales.pipeline.checkoutStartsCount,
        sales.pipeline.completedPurchasesCount,
        sales.pipeline.unprogressedLeads,
        product.pendingDeliveriesCount + product.failedDeliveriesCount
      )

      let primaryBottleneck = sales.primaryBottleneck
      if (product.pendingDeliveriesCount + product.failedDeliveriesCount > 0) {
        primaryBottleneck = 'Provider-verified purchases are awaiting fulfilment'
      } else if (revenue.activeMemberships === 0) {
        primaryBottleneck = 'Zero provider-verified $29 membership subscriptions'
      } else if (growth.criticalOrphanAlert) {
        primaryBottleneck = growth.criticalOrphanAlert
      }
      const conversionRate = sales.pipeline.checkoutStartsCount > 0
        ? sales.pipeline.completedPurchasesCount / sales.pipeline.checkoutStartsCount
        : 0
      const decisionBasis: CEODecisionBasis = {
        primary_bottleneck: primaryBottleneck,
        evidence_refs: [
          `30-day sprint: $${verifiedSprintRevenueUSD.toFixed(2)} provider-verified cash above the launch baseline of $${sprintBaseline.toFixed(2)}`,
          `Membership Subscriptions: ${revenue.activeMemberships} active / $${revenue.verifiedMRRUSD.toFixed(2)} verified MRR`,
          `Funnel Events: ${sales.pipeline.checkoutStartsCount} checkout starts in the evidence window`,
          `Email Events: ${sales.pipeline.deliveredCount} signed provider deliveries`,
          `Fulfilment: ${product.pendingDeliveriesCount + product.failedDeliveriesCount} verified purchases pending or failed`,
          `GrowthOS Events: ${queuedSignals.length} durable signals queued for this run`,
        ],
        observed_conversion_rate: Number(conversionRate.toFixed(4)),
        baseline_rate: 0.10,
        estimated_monthly_leakage_usd: leakageReport.totalEstimatedLeakageUSD,
        hypothesis: revenue.activeMemberships === 0
          ? 'A real PayPal subscription funnel plus controlled distribution to consented leads can establish the first verified MRR cohort.'
          : 'Scaling only cohorts with verified delivery-to-capture evidence will improve monthly revenue without adding products.',
        decision: 'Run the current product ladder through dedicated, idempotent distribution crons; do not create new products, pages, or unmeasured campaigns.',
        expected_revenue_impact_usd: leakageReport.totalEstimatedLeakageUSD,
        attribution_confidence: revenue.evidenceState === 'VERIFIED' ? 'HIGH' : revenue.evidenceState === 'PARTIAL' ? 'MEDIUM' : 'LOW',
      }

      if (triggerSource !== 'verification') {
        const pendingExperiments = await CEOExperimentEngine.getExperimentsAwaitingEvaluation()
        const now = Date.now()
        for (const experiment of pendingExperiments) {
          const observationEndsAt = new Date(experiment.created_at).getTime() + experiment.observation_window_hours * 60 * 60 * 1000
          if (Number.isFinite(observationEndsAt) && observationEndsAt <= now) {
            await CEOExperimentEngine.evaluateExperimentOutcome(
              experiment.id,
              decisionBasis.observed_conversion_rate,
              revenue.directlyAttributedToCEOUSD
            )
          }
        }
        const activeExperiments = await CEOExperimentEngine.getActiveExperiments()
        if (activeExperiments.length === 0) {
          await CEOExperimentEngine.registerExperiment({
            hypothesis: decisionBasis.hypothesis,
            funnel_stage: revenue.activeMemberships === 0 ? 4 : 3,
            baseline_metric: decisionBasis.observed_conversion_rate,
            target_metric: Math.max(0.03, decisionBasis.observed_conversion_rate * 1.2),
            action_taken: decisionBasis.decision,
            observation_window_hours: 168,
          })
        }
      }

      const briefText = this.formatBrief(runId, scoreboard, pathToTarget, leakageReport, revenue, growth, sales, product, decisionBasis)
      if (triggerSource !== 'verification') await CEOMemory.recordDecision({
        run_id: runId,
        trigger_source: triggerSource,
        monthly_target_usd: scoreboard.monthlyRevenueTargetUSD,
        verified_mtd_usd: scoreboard.currentVerifiedRevenueUSD,
        primary_bottleneck: decisionBasis.primary_bottleneck,
        estimated_leakage_usd: decisionBasis.estimated_monthly_leakage_usd,
        decision_basis: decisionBasis,
        directives: [
          'Distribute the self-serve $19/$29/$49/$79 grant products and $49 CAD MCA product; do not automate call-dependent $199 sales.',
          'Scale only cohorts with provider message IDs and verified downstream captures.',
          'Prioritize the first 10 provider-verified customers before broader strategy changes.',
        ],
        forbidden_actions: [
          'No fabricated delivered, reply, checkout, payment, or revenue states.',
          'No outreach to contacts without explicit subscription consent.',
          'No forced recovery and no new positioning or product work.',
        ],
      })
      if (triggerSource !== 'verification') await CEOMemory.updateGoalState({
        current_mtd_verified_revenue_usd: scoreboard.currentVerifiedRevenueUSD,
        current_mtd_mrr_usd: scoreboard.currentMRRUSD,
        primary_bottleneck: decisionBasis.primary_bottleneck,
        estimated_monthly_leakage_usd: decisionBasis.estimated_monthly_leakage_usd,
        priority_focus: 'First 10 provider-verified customers from the existing product ladder',
      })
      if (triggerSource !== 'verification' && queuedSignals.length > 0) {
        await markGrowthOSEventsReviewed(queuedSignals, runId)
      }

      const executedActions: any[] = []
      if (triggerSource === 'cron') {
        const report = await sendEmail({
          to: process.env.CEO_REPORT_EMAIL || 'ashwani@fsidigital.ca',
          subject: `CEO report ${scoreboard.status} — MRR $${scoreboard.currentMRRUSD.toFixed(2)} / $${scoreboard.recurringMRRTargetUSD.toLocaleString()}`,
          html: `<pre style="white-space:pre-wrap;font-family:Arial,sans-serif">${briefText.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</pre>`,
          text: briefText,
          tagType: 'ceo-daily-report',
        })
        executedActions.push({
          toolName: 'ceo_daily_report',
          status: report.success && report.providerMessageId ? 'PROVIDER_ACCEPTED' : 'FAILED',
          provider: report.provider || '',
          providerMessageId: report.providerMessageId || '',
          error: report.error || '',
        })
      }

      const specialistReports = { revenue, growth, sales, product, queuedSignals }
      const result: CEORunResult = {
        runId,
        triggerSource,
        timestamp: new Date().toISOString(),
        scoreboard,
        pathToTarget,
        leakageReport,
        briefText,
        decisionBasis,
        executedActions,
        specialistReports,
      }
      if (lease) await finishOperationLease(lease, revenue.evidenceState === 'VERIFIED' ? 'SUCCEEDED' : 'PARTIAL', {
        runId,
        status: scoreboard.status,
        evidenceState: revenue.evidenceState,
        verifiedSprintRevenueUSD,
        sprintBaselineUSD: sprintBaseline,
        verifiedMRRUSD: revenue.verifiedMRRUSD,
      })
      return result
    } catch (error: any) {
      if (lease?.acquired) await finishOperationLease(lease, 'FAILED', { error: error.message || String(error) })
      throw error
    }
  }

  private static formatBrief(
    runId: string,
    scoreboard: any,
    path: any,
    leakage: any,
    revenue: any,
    growth: any,
    sales: any,
    product: any,
    decision: CEODecisionBasis
  ) {
    const productMix = path.requiredTransactions
    return `FSI DIGITAL CEO EVIDENCE REPORT — ${new Date().toISOString().slice(0, 10)}
Run: ${runId}

STATUS
${scoreboard.status} · Evidence: ${scoreboard.evidenceState}
Verified 30-day sprint cash: $${scoreboard.currentVerifiedRevenueUSD.toFixed(2)} / $${scoreboard.monthlyRevenueTargetUSD.toLocaleString()} by ${new Date(scoreboard.targetWindowEndsAt).toISOString().slice(0, 10)}
Verified CAD cash (reported separately, never converted silently): $${revenue.verified30DayRevenueCAD.toFixed(2)} CAD in the last 30 days; $${revenue.verifiedTotalRevenueCAD.toFixed(2)} CAD all time
Verified MRR: $${scoreboard.currentMRRUSD.toFixed(2)} / $${scoreboard.recurringMRRTargetUSD.toLocaleString()}
Active $29 memberships: ${scoreboard.activeMemberships}; additional memberships required for strict MRR target: ${scoreboard.membershipsRequiredForMRRTarget}

LIVE FUNNEL
Leads: ${sales.pipeline.totalIntakeLeads} total; ${sales.pipeline.consentedLeads} explicitly consented; ${sales.pipeline.newLeads24h} new in 24h
Provider-accepted outreach: ${sales.pipeline.contactedCount}; signed deliveries: ${sales.pipeline.deliveredCount}; replies: ${sales.pipeline.repliedCount}
Checkout starts: ${sales.pipeline.checkoutStartsCount}; provider-verified purchases: ${sales.pipeline.completedPurchasesCount}
Verified product records: ${product.generatedReportsCount}; delivered: ${product.deliveredReportsCount}; provider-accepted only: ${product.providerAcceptedDeliveriesCount}; pending/failed: ${product.pendingDeliveriesCount + product.failedDeliveriesCount}

PRIMARY BOTTLENECK
${decision.primary_bottleneck}

CEO DECISION
${decision.decision}

CURRENT-PRODUCT PLANNING MIX FOR THE MONTHLY REVENUE GAP
$29 membership: ${productMix.membership29Count}; $79 bundle: ${productMix.strategy79Count}; $49 plan: ${productMix.actionPlan49Count}; $19 report: ${productMix.report19Count}; call-dependent $199 product: 0; $2,500 services: 0
This is a planning model, not a forecast. Strict $10K MRR still requires 345 active $29 memberships.

ACTION P&L — LAST 30 DAYS
Qualified leads affected: ${revenue.actionPerformance.totalQualifiedLeadsAffected}; attributed payments: ${revenue.actionPerformance.totalPurchases}
Attributed verified cash: $${revenue.actionPerformance.totalRevenueUSD.toFixed(2)} USD + $${revenue.actionPerformance.totalRevenueCAD.toFixed(2)} CAD; attributed active MRR: $${revenue.actionPerformance.totalAttributedMRRUSD.toFixed(2)}
Verified revenue per qualified lead: $${revenue.actionPerformance.verifiedRevenuePerQualifiedLeadUSD.toFixed(2)}
${revenue.actionPerformance.actions.slice(0, 8).map((action: any) => `${action.decision} | ${action.campaign} | leads ${action.qualifiedLeadsAffected} | accepted ${action.providerAccepted} | delivered ${action.delivered} | clicks ${action.clicks} | checkouts ${action.checkouts} | payments ${action.purchases} | revenue $${action.revenueUSD.toFixed(2)} | MRR $${action.mrrUSD.toFixed(2)}`).join('\n') || 'No attributed commercial actions yet.'}

AGENT HEALTH
Revenue Agent: ${revenue.evidenceState}; Growth Agent: ${growth.pipelineStatus}; Sales Agent: live evidence; Product Agent: live purchase/delivery ledger
Estimated evidence-backed leakage: $${leakage.totalEstimatedLeakageUSD.toFixed(2)}
`
  }
}
