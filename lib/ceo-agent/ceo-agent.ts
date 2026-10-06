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
import { CommercialActionTracker } from './ledger/action-tracker'

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
  todayExecutionKPIs: ReturnType<typeof CommercialActionTracker.getTodayMetrics>
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
          todayExecutionKPIs: CommercialActionTracker.getTodayMetrics(),
        }
      }
    }

    try {
      // 1. Audit Phase: Concurrently run all specialist diagnostics
      const [revenue, growth, sales, product, queuedSignals] = await Promise.all([
        RevenueAgent.auditRevenue(),
        GrowthAgent.auditGrowthOS(),
        SalesAgent.auditSales(),
        ProductAgent.auditProduct(),
        getQueuedGrowthOSEvents(),
      ])

      // 2. Execution Phase (L3 Low-Risk Bounded Operations)
      // Every agent performs real commercial work under CASL consent & safety rules
      const executedActions: any[] = []
      if (triggerSource !== 'verification') {
        // Priority 1: Revenue Agent recovers open checkout intents under CASL
        const revRecovery = await RevenueAgent.executeRevenueRecovery(5)
        if (revRecovery.executedCount > 0) {
          executedActions.push({
            agent: 'Revenue',
            action: 'CASL Checkout Recovery',
            count: revRecovery.executedCount,
            candidates: revRecovery.recoveredCandidates,
          })
        }

        // Priority 2: Sales Agent delivers intent-matched offers & founder alerts
        const salesExecution = await SalesAgent.executeSalesActions(3)
        if (salesExecution.dispatchedCount > 0 || salesExecution.founderAlertsSent > 0) {
          executedActions.push({
            agent: 'Sales',
            action: 'Intent-Driven Commercial Outreach',
            dispatched: salesExecution.dispatchedCount,
            founderAlerts: salesExecution.founderAlertsSent,
            actions: salesExecution.actions,
          })
        }

        // Priority 3: Product Agent replays any failed deliveries for paid orders
        const prodRecovery = await ProductAgent.executeDeliveryRecovery()
        if (prodRecovery.replayedCount > 0) {
          executedActions.push({
            agent: 'Product',
            action: 'Paid Delivery Fulfillment Replay',
            count: prodRecovery.replayedCount,
          })
        }

        // Priority 4: Growth Agent verifies social educational distribution
        const growthExecution = await GrowthAgent.executeGrowthActions()
        if (growthExecution.executedCount > 0) {
          executedActions.push({
            agent: 'Growth',
            action: 'Social Educational Distribution',
            count: growthExecution.executedCount,
          })
        }
      }

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
        baseline_rate: 0.20,
        estimated_monthly_leakage_usd: leakageReport.totalEstimatedLeakageUSD,
        hypothesis: revenue.activeMemberships === 0
          ? 'A real PayPal subscription funnel plus controlled distribution to consented leads can establish the first verified MRR cohort.'
          : 'Scaling only cohorts with verified delivery-to-capture evidence will improve monthly revenue without adding products.',
        decision: 'Route engaged organic traffic into intent-matched self-serve products, run approved consented cohorts through isolated leases, and scale only surfaces with provider-verified checkout and cash evidence.',
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

      const todayKPIs = CommercialActionTracker.getTodayMetrics()
      const briefText = this.formatBrief(runId, scoreboard, pathToTarget, leakageReport, revenue, growth, sales, product, decisionBasis, todayKPIs, executedActions)

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
          'Execute bounded CASL-compliant recovery on all open checkout intents.',
          'Deliver immediate founder hot alerts when prospects submit phone numbers or $100k+ funding requests.',
        ],
        forbidden_actions: [
          'No fabricated delivered, reply, checkout, payment, or revenue states.',
          'No outreach to contacts without explicit subscription or transactional checkout consent.',
          'No unconsented robotic voice calling.',
        ],
      })

      if (triggerSource !== 'verification') await CEOMemory.updateGoalState({
        current_mtd_verified_revenue_usd: scoreboard.currentVerifiedRevenueUSD,
        current_mtd_mrr_usd: scoreboard.currentMRRUSD,
        primary_bottleneck: decisionBasis.primary_bottleneck,
        estimated_monthly_leakage_usd: decisionBasis.estimated_monthly_leakage_usd,
        priority_focus: '190 provider-verified orders from the existing product ladder; first checkpoint 19 customers',
      })
      if (triggerSource !== 'verification' && queuedSignals.length > 0) {
        await markGrowthOSEventsReviewed(queuedSignals, runId)
      }

      if (triggerSource === 'cron' || triggerSource === 'on_demand') {
        const report = await sendEmail({
          to: process.env.CEO_REPORT_EMAIL || 'ashwani@fsidigital.ca',
          subject: `CEO Commercial Operating Report [${scoreboard.status}] — Revenue: $${revenue.verifiedTotalRevenueUSD.toFixed(2)} | Actions Executed: ${todayKPIs.totalExecuted}`,
          html: `<pre style="white-space:pre-wrap;font-family:Arial,sans-serif;font-size:13px;line-height:1.5;background:#f8fafc;padding:16px;border:1px solid #e2e8f0;border-radius:6px;">${briefText.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</pre>`,
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
        todayExecutionKPIs: todayKPIs,
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
    decision: CEODecisionBasis,
    todayKPIs: ReturnType<typeof CommercialActionTracker.getTodayMetrics>,
    executedActions: any[]
  ) {
    const productMix = path.requiredTransactions
    const blocked = todayKPIs.blockedByReason
    const evalBreakdown = todayKPIs.evaluationBreakdown
    const attr = todayKPIs.agentAttribution

    return `================================================================================
FSI DIGITAL — CEO COMMERCIAL OPERATING SYSTEM REPORT
================================================================================
Run ID: ${runId} | Timestamp: ${new Date().toISOString()}
Data Integrity: Authenticated GA4, GSC, PayPal API, and CRM backend telemetry.
Note: Automated test status is a software correctness indicator, not a commercial outcome indicator.

[1. COMMERCIAL EXECUTION]
+------------------------------------+--------------------------+
| Metric                             | Today's Value            |
+------------------------------------+--------------------------+
| Leads evaluated                    | ${evalBreakdown.totalLeads.toString().padStart(24, ' ')} |
| Commercially eligible              | ${evalBreakdown.commerciallyEligible.toString().padStart(24, ' ')} |
| Approved for outreach              | ${todayKPIs.funnel.approvedForOutreach.toString().padStart(24, ' ')} |
| Dispatched                         | ${todayKPIs.totalExecuted.toString().padStart(24, ' ')} |
| Blocked (pacing/consent/rules)     | ${todayKPIs.actionsBlocked.toString().padStart(24, ' ')} |
| Delivered                          | ${todayKPIs.funnel.delivered.toString().padStart(24, ' ')} |
| Opened                             | ${todayKPIs.funnel.opened.toString().padStart(24, ' ')} |
| Clicked                            | ${todayKPIs.recoveryClicks.toString().padStart(24, ' ')} |
| Checkout restarted                 | ${todayKPIs.checkoutRestarts.toString().padStart(24, ' ')} |
| Purchases                          | ${sales.pipeline.completedPurchasesCount.toString().padStart(24, ' ')} |
| Revenue Generated by Agents        | $${todayKPIs.revenueGeneratedUSD.toFixed(2).padStart(20, ' ')} USD |
+------------------------------------+--------------------------+

[2. BLOCKED ACTIONS BREAKDOWN]
+------------------------------------+--------------------------+
| Reason                             | Count                    |
+------------------------------------+--------------------------+
| Frequency protection / 48h cooldown| ${blocked.cooldown.toString().padStart(24, ' ')} |
| Missing / unverified consent (CASL)| ${blocked.consent.toString().padStart(24, ' ')} |
| Batch cap pacing (queued)          | ${blocked.batchCapPacing.toString().padStart(24, ' ')} |
| Duplicate / sequence active        | ${blocked.duplicate.toString().padStart(24, ' ')} |
| Missing contact data / token error | ${blocked.missingData.toString().padStart(24, ' ')} |
| Risk rule / product suppression    | ${blocked.riskRule.toString().padStart(24, ' ')} |
| Total Blocked / Deferred           | ${blocked.total.toString().padStart(24, ' ')} |
+------------------------------------+--------------------------+

[3. LEAD EVALUATION BREAKDOWN (Pipeline Second Layer)]
Total Leads Evaluated: ${evalBreakdown.totalLeads}
  → No CASL Express/Transactional Consent: ${evalBreakdown.noConsent} (${((evalBreakdown.noConsent / evalBreakdown.totalLeads) * 100).toFixed(1)}%)
  → Outside Target Geography (Non-Canada): ${evalBreakdown.outsideGeography} (${((evalBreakdown.outsideGeography / evalBreakdown.totalLeads) * 100).toFixed(1)}%)
  → Insufficient Business Readiness (<30): ${evalBreakdown.insufficientReadiness} (${((evalBreakdown.insufficientReadiness / evalBreakdown.totalLeads) * 100).toFixed(1)}%)
  → Cooldown / Contacted within 48 Hours:  ${evalBreakdown.duplicateOrRecent} (${((evalBreakdown.duplicateOrRecent / evalBreakdown.totalLeads) * 100).toFixed(1)}%)
  → Low Commercial Fit (Score < 40):       ${evalBreakdown.lowCommercialFit} (${((evalBreakdown.lowCommercialFit / evalBreakdown.totalLeads) * 100).toFixed(1)}%)
  → Commercially Eligible Leads:           ${evalBreakdown.commerciallyEligible} (${((evalBreakdown.commerciallyEligible / evalBreakdown.totalLeads) * 100).toFixed(1)}%)
    ↳ Approved for Outreach:               ${todayKPIs.funnel.approvedForOutreach}
    ↳ Dispatched in this Cycle:            ${todayKPIs.totalExecuted}
    ↳ Blocked / Paced for Next Cycle:      ${todayKPIs.actionsBlocked}

[4. AGENT ATTRIBUTION]
+----------+---------+-----------+--------+----------+-----------+------------+
| Agent    | Actions | Delivered | Clicks | Checkout | Purchases | Revenue    |
+----------+---------+-----------+--------+----------+-----------+------------+
| Revenue  | ${attr.Revenue.actions.toString().padStart(7, ' ')} | ${attr.Revenue.delivered.toString().padStart(9, ' ')} | ${attr.Revenue.clicks.toString().padStart(6, ' ')} | ${attr.Revenue.checkout.toString().padStart(8, ' ')} | ${attr.Revenue.purchases.toString().padStart(9, ' ')} | $${attr.Revenue.revenueUSD.toFixed(2).padStart(8, ' ')} |
| Sales    | ${attr.Sales.actions.toString().padStart(7, ' ')} | ${attr.Sales.delivered.toString().padStart(9, ' ')} | ${attr.Sales.clicks.toString().padStart(6, ' ')} | ${attr.Sales.checkout.toString().padStart(8, ' ')} | ${attr.Sales.purchases.toString().padStart(9, ' ')} | $${attr.Sales.revenueUSD.toFixed(2).padStart(8, ' ')} |
| Growth   | ${attr.Growth.actions.toString().padStart(7, ' ')} | ${attr.Growth.delivered.toString().padStart(9, ' ')} | ${attr.Growth.clicks.toString().padStart(6, ' ')} | ${attr.Growth.checkout.toString().padStart(8, ' ')} | ${attr.Growth.purchases.toString().padStart(9, ' ')} | $${attr.Growth.revenueUSD.toFixed(2).padStart(8, ' ')} |
| Product  | ${attr.Product.actions.toString().padStart(7, ' ')} | ${attr.Product.delivered.toString().padStart(9, ' ')} | ${attr.Product.clicks.toString().padStart(6, ' ')} | ${attr.Product.checkout.toString().padStart(8, ' ')} | ${attr.Product.purchases.toString().padStart(9, ' ')} | $${attr.Product.revenueUSD.toFixed(2).padStart(8, ' ')} |
+----------+---------+-----------+--------+----------+-----------+------------+

[5. STAGE-BY-STAGE COMMERCIAL FUNNEL]
+-------------------------+--------+-----------------+------------+
| Stage                   |  Count | Conversion Rate |  Benchmark |
+-------------------------+--------+-----------------+------------+
${todayKPIs.funnel.stages.map((s) => {
  const name = s.stage.padEnd(23, ' ');
  const countVal = s.stage === 'Revenue Attributed' ? `$${s.count.toFixed(2)}` : String(s.count);
  const count = countVal.padStart(6, ' ');
  const rate = s.conversionRate.padStart(15, ' ');
  const bench = s.benchmark.padStart(10, ' ');
  return `| ${name} | ${count} | ${rate} | ${bench} |`;
}).join('\n')}
+-------------------------+--------+-----------------+------------+
Top Failed Stage: ${todayKPIs.funnel.topFailedStage}
Root Cause Hypothesis: ${todayKPIs.funnel.rootCauseHypothesis}
Next Automated Experiment: ${todayKPIs.funnel.nextAutomatedExperiment}

[STATUS & REVENUE TARGET]
Status: ${scoreboard.status} · Evidence State: ${scoreboard.evidenceState}
Verified 30-Day Sprint Cash: $${scoreboard.currentVerifiedRevenueUSD.toFixed(2)} / $${scoreboard.monthlyRevenueTargetUSD.toLocaleString()} USD
Verified Canadian CAD Cash: $${revenue.verified30DayRevenueCAD.toFixed(2)} CAD
Verified MRR: $${scoreboard.currentMRRUSD.toFixed(2)} / $${scoreboard.recurringMRRTargetUSD.toLocaleString()} USD
Active $29 Memberships: ${scoreboard.activeMemberships} (Need ${scoreboard.membershipsRequiredForMRRTarget} more for $10K MRR)

[LIVE FUNNEL REALITY]
Total Intake Leads: ${sales.pipeline.totalIntakeLeads} (${sales.pipeline.consentedLeads} CASL consented)
Unique Sessions (30d): ${sales.pipeline.uniqueSessions30d} (~${Math.round(sales.pipeline.uniqueSessions30d / 30)}/day)
Checkout Starts: ${sales.pipeline.checkoutStartsCount} | Completed Purchases: ${sales.pipeline.completedPurchasesCount}
Checkout Abandonment Drop-off: ${(sales.checkoutAbandonmentRate * 100).toFixed(1)}%

[ACTIONS EXECUTED IN THIS CYCLE]
${executedActions.map((ea: any) => `* [${ea.agent || 'SYSTEM'}] ${ea.action || ea.toolName}: ${JSON.stringify(ea)}`).join('\n') || 'No autonomous operations executed.'}

[RECENT ACTION IDs]
${todayKPIs.recentActions.slice(0, 10).map((a) => `${a.actionId} | ${a.agent} | ${a.product} | ${a.status} | $${a.revenueUSD}`).join('\n') || 'None recorded yet today.'}

[PRIMARY BOTTLENECK]
${decision.primary_bottleneck}

[GROWTH BACKLOG (TOP PRIORITIES)]
${growth.backlog?.slice(0, 3).map((item: any) => `[${item.priority}] ${item.title}: ${item.actionableStep} (+$${item.predictedImpactUSD})`).join('\n') || 'Backlog clean.'}

[PRODUCT & CHECKOUT FRICTION]
${product.checkoutFrictionFindings?.primaryFrictionPoint}
Fix: ${product.checkoutFrictionFindings?.recommendedFix}
`
  }
}
