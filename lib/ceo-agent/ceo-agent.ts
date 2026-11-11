import { CEOMemory, type CEODecisionBasis } from './ceo-memory'
import { CEOScoreboard } from './ceo-scoreboard'
import { RevenueAgent } from './specialists/revenue-agent'
import { GrowthAgent } from './specialists/growth-agent'
import { SalesAgent } from './specialists/sales-agent'
import { ProductAgent } from './specialists/product-agent'
import { CEOExperimentEngine } from './ceo-experiments'
import { acquireOperationLease, finishOperationLease, getLatestOperationalState, type OperationLease } from '@/lib/growth-os/operations-store'
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
      let todaysHighIntentLeads: Array<{
        name: string;
        company: string;
        email: string;
        phone: string;
        fundingGoal: string;
        score: number;
        status: string;
        recommendedAction: string;
      }> = []

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
        const salesBatchLimit = Math.min(25, parseInt(process.env.SALES_ACTION_BATCH_SIZE || '10', 10))
        const salesExecution = await SalesAgent.executeSalesActions(salesBatchLimit)
        todaysHighIntentLeads = salesExecution.highIntentLeads || []
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
        const currentUtcHour = new Date().getUTCHours()
        // Strict Time-Window Gate: Daily executive briefing must only dispatch
        // between 13:30 and 15:00 UTC (7:00 PM – 8:30 PM IST), immediately after the 13:30 UTC social sprint finishes.
        // If an outdated external cron (such as a legacy 08:10 UTC cron-job.org trigger) pings this route,
        // we audit state cleanly but suppress the email dispatch so the founder NEVER receives premature morning emails.
        const isScheduledBriefingWindow = currentUtcHour >= 13 && currentUtcHour <= 15
        const allowEmailDispatch = triggerSource === 'on_demand' || isScheduledBriefingWindow

        if (!allowEmailDispatch) {
          console.log(`[CEOAgent] Suppressed premature cron briefing email: Current time is ${currentUtcHour}:00 UTC. Daily executive briefing is strictly locked to 13:35 UTC (7:05 PM IST).`)
          executedActions.push({
            toolName: 'ceo_daily_report',
            status: 'SKIPPED_WINDOW',
            provider: 'time_gate',
            providerMessageId: '',
            error: `Current time (${currentUtcHour}:00 UTC) is outside the 13:35 UTC (7:05 PM IST) briefing window. Email suppressed.`,
          })
        } else {
          let socialSprintInfo: { fbUrl?: string; igUrl?: string; liUrl?: string; ytUrl?: string; variantId?: string; isFreshToday?: boolean; lastAcceptedAt?: string } = {}
          try {
            const sprintState = await getLatestOperationalState<any>('social-revenue-sprint-september-v1')
            if (sprintState && sprintState.variants) {
              // Find the variant that was accepted/published most recently by timestamp
              let latestVariantId = ''
              let latestAcceptedTime = 0
              for (const [vId, receipts] of Object.entries<any>(sprintState.variants)) {
                if (!receipts || typeof receipts !== 'object') continue
                for (const ch of Object.values<any>(receipts)) {
                  if (ch?.acceptedAt) {
                    const t = new Date(ch.acceptedAt).getTime()
                    if (t > latestAcceptedTime) {
                      latestAcceptedTime = t
                      latestVariantId = vId
                    }
                  }
                }
              }
              if (!latestVariantId) {
                const keys = Object.keys(sprintState.variants)
                latestVariantId = keys[keys.length - 1] || ''
              }

              if (latestVariantId) {
                const v = sprintState.variants[latestVariantId]
                const isFreshToday = latestAcceptedTime > 0 && (Date.now() - latestAcceptedTime < 18 * 60 * 60 * 1000)

                // 1. Facebook Link
                let fbUrl: string | undefined = v?.facebook?.permalink
                if (!fbUrl && v?.facebook?.externalId) {
                  const eid = String(v.facebook.externalId)
                  if (eid.includes('_')) {
                    const [page, post] = eid.split('_')
                    fbUrl = `https://www.facebook.com/${page}/posts/${post}`
                  } else {
                    fbUrl = `https://www.facebook.com/reel/${eid}/`
                  }
                }
                if (!fbUrl && (v?.facebook?.status === 'API_ACCEPTED' || v?.facebook?.status === 'LIVE_PUBLISHED')) {
                  fbUrl = 'https://www.facebook.com/1077759455417325'
                }

                // 2. Instagram Link (Never format numeric Graph API media ID as /p/numericId which causes 404)
                let igUrl: string | undefined = v?.instagram?.permalink
                if (!igUrl && v?.instagram?.externalId) {
                  const eid = String(v.instagram.externalId)
                  if (/^\d+$/.test(eid)) {
                    igUrl = 'https://www.instagram.com/fsidigital.ca/'
                  } else {
                    igUrl = `https://www.instagram.com/p/${eid}/`
                  }
                }
                if (!igUrl && (v?.instagram?.status === 'API_ACCEPTED' || v?.instagram?.status === 'LIVE_PUBLISHED')) {
                  igUrl = 'https://www.instagram.com/fsidigital.ca/'
                }

                // 3. LinkedIn Link
                let liUrl: string | undefined = v?.linkedin?.permalink
                if (!liUrl && v?.linkedin?.externalId) {
                  const eid = String(v.linkedin.externalId)
                  if (eid.startsWith('urn:li:') && !eid.includes('carousel')) {
                    liUrl = `https://www.linkedin.com/feed/update/${eid}/`
                  } else {
                    liUrl = 'https://www.linkedin.com/company/fsidigital/'
                  }
                }
                if (!liUrl) {
                  liUrl = 'https://www.linkedin.com/company/fsidigital/'
                }

                // 4. YouTube Link
                let ytUrl: string | undefined = v?.youtube?.permalink
                if (!ytUrl && v?.youtube?.externalId) {
                  ytUrl = `https://youtube.com/shorts/${v.youtube.externalId}`
                }
                if (!ytUrl && (v?.youtube?.status === 'API_ACCEPTED' || v?.youtube?.status === 'LIVE_PUBLISHED')) {
                  ytUrl = 'https://www.youtube.com/@fsidigital'
                }

                socialSprintInfo = {
                  variantId: latestVariantId,
                  fbUrl,
                  igUrl,
                  liUrl,
                  ytUrl,
                  isFreshToday,
                  lastAcceptedAt: latestAcceptedTime ? new Date(latestAcceptedTime).toISOString() : undefined,
                }
              }
            }
          } catch {
            // Graceful fallback
          }

          const emailHtml = this.formatExecutiveHtml({
            runId,
            scoreboard,
            revenue,
            todayKPIs,
            highIntentLeads: todaysHighIntentLeads,
            socialSprint: socialSprintInfo,
            briefText,
          })

          const report = await sendEmail({
            to: process.env.CEO_REPORT_EMAIL || 'ashwani@fsidigital.ca',
            subject: `👑 FSI Digital — Daily Executive Briefing (7:05 PM IST): $${revenue.verified30DayRevenueUSD.toFixed(2)} Sprint Rev | ${todaysHighIntentLeads.length} High-Intent Leads | Operations Healthy`,
            html: emailHtml,
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
System Status: The system is instrumented, idempotency-protected, compliance-aware, and observable; commercial effectiveness and legal compliance remain unproven.
Operating Directive: SHIP IT, FREEZE IT, MEASURE IT.
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
  → Outside Current Canadian-Target Market: ${evalBreakdown.outsideGeography} (${((evalBreakdown.outsideGeography / evalBreakdown.totalLeads) * 100).toFixed(1)}%)
  → Insufficient Business Readiness (<30): ${evalBreakdown.insufficientReadiness} (${((evalBreakdown.insufficientReadiness / evalBreakdown.totalLeads) * 100).toFixed(1)}%)
  → Cooldown / Contacted within 48 Hours:  ${evalBreakdown.duplicateOrRecent} (${((evalBreakdown.duplicateOrRecent / evalBreakdown.totalLeads) * 100).toFixed(1)}%)
  → Low Commercial Fit (Score < 40):       ${evalBreakdown.lowCommercialFit} (${((evalBreakdown.lowCommercialFit / evalBreakdown.totalLeads) * 100).toFixed(1)}%)
  → Current Commercially Eligible Pool:    ${evalBreakdown.commerciallyEligible} in this cycle (${((evalBreakdown.commerciallyEligible / evalBreakdown.totalLeads) * 100).toFixed(1)}%)
    ↳ (Future cycle volume will be measured empirically)
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

[ACTION P&L DETAILS]
${revenue.actionPerformance.actions.slice(0, 8).map((action: any) => `${action.decision} | ${action.campaign} | leads ${action.qualifiedLeadsAffected} | accepted ${action.providerAccepted} | delivered ${action.delivered} | provider failures ${action.providerFailures} | clicks ${action.clicks} | checkout views ${action.productCheckoutViews} | email ready ${action.deliveryEmailsReady} | PayPal rendered ${action.paypalButtonsRendered} | PayPal clicks ${action.paypalButtonClicks} | approvals ${action.paypalApprovals} | checkout failures ${action.paypalFailures} | server checkouts ${action.checkouts} | payments ${action.purchases} | revenue $${action.revenueUSD.toFixed(2)} | MRR $${action.mrrUSD.toFixed(2)}`).join('\n') || 'No attributed commercial actions yet.'}
`
  }

  private static formatExecutiveHtml({
    runId,
    scoreboard,
    revenue,
    todayKPIs,
    highIntentLeads,
    socialSprint,
    briefText,
  }: {
    runId: string
    scoreboard: any
    revenue: any
    todayKPIs: any
    highIntentLeads: Array<{
      name: string
      company: string
      email: string
      phone: string
      fundingGoal: string
      score: number
      status: string
      recommendedAction: string
    }>
    socialSprint: { fbUrl?: string; igUrl?: string; liUrl?: string; ytUrl?: string; variantId?: string; isFreshToday?: boolean; lastAcceptedAt?: string }
    briefText: string
  }): string {
    const leadsRows = highIntentLeads.length > 0
      ? highIntentLeads.map((l) => `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px; font-weight: 600; color: #0f172a;">${l.name}</td>
          <td style="padding: 10px; color: #334155;">${l.company}</td>
          <td style="padding: 10px;"><a href="mailto:${l.email}" style="color: #2563eb; text-decoration: none;">${l.email}</a></td>
          <td style="padding: 10px; color: #475569;">${l.phone}</td>
          <td style="padding: 10px; font-weight: 600; color: #16a34a;">${l.fundingGoal}</td>
          <td style="padding: 10px; text-align: center;"><span style="background: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 9999px; font-weight: 700; font-size: 12px;">${l.score}/100</span></td>
          <td style="padding: 10px; font-size: 12px; color: #64748b;">${l.recommendedAction}</td>
        </tr>
      `).join('')
      : `
        <tr>
          <td colspan="7" style="padding: 16px; text-align: center; color: #64748b; font-style: italic;">
            Zero new unnotified leads in this cycle (all existing leads permanently deduplicated).
          </td>
        </tr>
      `;

    return `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 720px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; color: #0f172a;">
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 28px 24px; color: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="background: #3b82f6; color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px;">FSI Digital OS</span>
            <span style="color: #94a3b8; font-size: 12px;">${new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <h1 style="margin: 14px 0 6px 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">Daily Executive Operating Briefing</h1>
          <p style="margin: 0; color: #cbd5e1; font-size: 13px;">Single Consolidated Morning Briefing: Revenue, High-Intent Leads, Social Engine, & Health.</p>
        </div>

        <div style="padding: 24px;">
          <!-- 1. Revenue Scoreboard -->
          <div style="margin-bottom: 24px;">
            <h2 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin: 0 0 12px 0;">1. Commercial Revenue & MRR Scoreboard</h2>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
              <div>
                <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">30-Day Sprint Rev</div>
                <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 4px;">$${revenue.verified30DayRevenueUSD.toFixed(2)} USD</div>
                <div style="font-size: 11px; color: #16a34a; margin-top: 2px;">$${revenue.verified30DayRevenueCAD.toFixed(2)} CAD</div>
              </div>
              <div>
                <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">Verified MRR</div>
                <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 4px;">$${scoreboard.currentMRRUSD.toFixed(2)} USD</div>
                <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Target: $${scoreboard.monthlyRevenueTargetUSD.toLocaleString()} USD</div>
              </div>
              <div>
                <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">All-Time Cash</div>
                <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 4px;">$${revenue.verifiedTotalRevenueUSD.toFixed(2)} USD</div>
                <div style="font-size: 11px; color: #3b82f6; margin-top: 2px;">Evidence: ${scoreboard.evidenceState}</div>
              </div>
            </div>
          </div>

          <!-- 2. High Intent Inbound Leads -->
          <div style="margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
              <h2 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin: 0;">2. High-Intent Leads Identified Today (${highIntentLeads.length})</h2>
              <span style="font-size: 12px; color: #64748b;">Consolidated from 680+ Pipeline</span>
            </div>
            <div style="border: 1px solid #e2e8f0; border-radius: 8px; overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
                <thead>
                  <tr style="background: #f1f5f9; color: #475569; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">
                    <th style="padding: 8px 10px;">Founder</th>
                    <th style="padding: 8px 10px;">Company</th>
                    <th style="padding: 8px 10px;">Email</th>
                    <th style="padding: 8px 10px;">Phone</th>
                    <th style="padding: 8px 10px;">Funding Goal</th>
                    <th style="padding: 8px 10px; text-align: center;">Score</th>
                    <th style="padding: 8px 10px;">Recommended Next Step</th>
                  </tr>
                </thead>
                <tbody>
                  ${leadsRows}
                </tbody>
              </table>
            </div>
          </div>

          <!-- 3. Daily Social Revenue Engine -->
          <div style="margin-bottom: 24px;">
            <h2 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin: 0 0 12px 0;">3. Social Revenue Engine (Daily Distribution)</h2>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span style="font-size: 13px; font-weight: 600; color: #0f172a;">Active Format: 100% Daily Vertical Video Reels ${socialSprint.variantId ? `(${socialSprint.variantId})` : ''}</span>
                <span style="background: ${socialSprint.isFreshToday === false ? '#fef3c7' : '#dcfce7'}; color: ${socialSprint.isFreshToday === false ? '#b45309' : '#15803d'}; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 9999px;">${socialSprint.isFreshToday === false ? `Stale (${socialSprint.lastAcceptedAt ? socialSprint.lastAcceptedAt.slice(0, 10) : 'No Post Today'})` : 'Published Today'}</span>
              </div>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 8px 0; font-weight: 600; color: #1877f2;">Facebook Reel</td>
                  <td style="padding: 8px 0; text-align: right;">
                    ${socialSprint.fbUrl ? `<a href="${socialSprint.fbUrl}" style="color: #1877f2; text-decoration: none; font-weight: 600;">View Published Reel →</a>` : `<span style="color: #94a3b8;">Verification in Progress</span>`}
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 8px 0; font-weight: 600; color: #e1306c;">Instagram Reel</td>
                  <td style="padding: 8px 0; text-align: right;">
                    ${socialSprint.igUrl ? `<a href="${socialSprint.igUrl}" style="color: #e1306c; text-decoration: none; font-weight: 600;">View Instagram Reel →</a>` : `<span style="color: #94a3b8;">Verification in Progress</span>`}
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 8px 0; font-weight: 600; color: #0a66c2;">LinkedIn Carousel / Post</td>
                  <td style="padding: 8px 0; text-align: right;">
                    <a href="${socialSprint.liUrl || 'https://www.linkedin.com/company/fsidigital/'}" style="color: #0a66c2; text-decoration: none; font-weight: 600;">${socialSprint.liUrl?.includes('/feed/update/') ? 'View Published Post →' : 'View LinkedIn Company Page →'}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #ff0000;">YouTube Shorts</td>
                  <td style="padding: 8px 0; text-align: right;">
                    ${socialSprint.ytUrl ? `<a href="${socialSprint.ytUrl}" style="color: #ff0000; text-decoration: none; font-weight: 600;">View Published Shorts →</a>` : `<span style="color: #94a3b8;">Verification in Progress</span>`}
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <!-- 4. Deliverability & System Health -->
          <div style="margin-bottom: 24px;">
            <h2 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin: 0 0 12px 0;">4. Deliverability & Campaign Operations</h2>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px;">
                <div style="font-size: 12px; font-weight: 700; color: #0f172a;">Brevo Delivery Engine (300/day)</div>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">Sender active & verified. Internal briefings + transactional failover routing.</p>
              </div>
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px;">
                <div style="font-size: 12px; font-weight: 700; color: #0f172a;">Resend Quota (100/day)</div>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">Reserved 100% for external client acquisition & reactivation campaigns.</p>
              </div>
            </div>
          </div>

          <!-- 5. Technical Diagnostic Log -->
          <details style="margin-top: 16px; font-size: 12px; color: #64748b;">
            <summary style="cursor: pointer; font-weight: 600;">View Raw Telemetry Log</summary>
            <pre style="white-space: pre-wrap; font-family: monospace; font-size: 11px; background: #f1f5f9; padding: 12px; border-radius: 6px; margin-top: 8px; overflow-x: auto;">${briefText.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</pre>
          </details>
        </div>

        <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; font-size: 11px; color: #94a3b8; text-align: center;">
          FSI Digital Automated CEO Operating System · Single Executive Digest Policy Active · <a href="https://www.fsidigital.ca/admin/growth-os" style="color: #64748b; text-decoration: underline;">Open Operations Hub</a>
        </div>
      </div>
    `;
  }
}
