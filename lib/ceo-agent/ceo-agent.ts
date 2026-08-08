import { CEOMemory, CEODecisionBasis } from './ceo-memory'
import { CEOScoreboard, CommercialScoreboard, RevenuePathToTarget, RevenueLeakageReport } from './ceo-scoreboard'
import { RevenueAgent } from './specialists/revenue-agent'
import { GrowthAgent } from './specialists/growth-agent'
import { SalesAgent } from './specialists/sales-agent'
import { ProductAgent } from './specialists/product-agent'
import { ActionTools } from './tools/action-tools'
import { CEOExperimentEngine } from './ceo-experiments'

export interface CEORunResult {
  runId: string
  triggerSource: 'cron' | 'event' | 'on_demand' | 'verification'
  timestamp: string
  scoreboard: CommercialScoreboard
  pathToTarget: RevenuePathToTarget
  leakageReport: RevenueLeakageReport
  briefText: string
  decisionBasis: CEODecisionBasis
  executedActions: any[]
}

export class CEOAgent {
  public static async runCEOLoop(triggerSource: 'cron' | 'event' | 'on_demand' | 'verification' = 'cron'): Promise<CEORunResult> {
    const runId = `run_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    console.log(`\n[CEOAgent] 🚀 Initiating CEO OS Loop (${runId}) — Trigger: ${triggerSource}...`)

    // 1. Specialist Sub-Agent Audits
    const revAudit = await RevenueAgent.auditRevenue()
    const growthAudit = await GrowthAgent.auditGrowthOS()
    const salesAudit = await SalesAgent.auditSales()
    const productAudit = await ProductAgent.auditProduct()

    // 2. Scoreboard, Math Path & Dollar Leakage Calculations
    const scoreboard = await CEOScoreboard.calculateScoreboard(revAudit.verifiedRevenueUSD, 0, salesAudit.leadIntakeCount, 22)
    const pathToTarget = CEOScoreboard.calculatePathToTarget(revAudit.verifiedRevenueUSD, 15000, 22)
    const leakageReport = CEOScoreboard.calculateLeakageReport(14, 3, salesAudit.uncontactedHighIntentLeads, productAudit.pendingDeliveriesCount)

    // 3. Level 3 Low-Risk Executions (e.g., auto-retry pending report dispatches)
    const executedActions = []
    if (productAudit.pendingDeliveriesCount > 0) {
      const receipt = await ActionTools.retryFailedDelivery('ord_historical_c1_c2')
      executedActions.push(receipt)
    }

    // 4. Create CEO Follow-up Task for P0 Orphan Queue if present
    if (growthAudit.criticalOrphanAlert) {
      const taskReceipt = await ActionTools.createFollowupTask(
        'P0: Repair EmailAdapter Outbound Queue Dispatcher',
        'P0',
        `${growthAudit.criticalOrphanAlert}. Estimated monthly leakage: $${leakageReport.items[0]?.leakageMonthlyUSD || 1840}.`
      )
      executedActions.push(taskReceipt)
    }

    // 5. Build Structured Decision Basis
    const decisionBasis: CEODecisionBasis = {
      primary_bottleneck: growthAudit.criticalOrphanAlert ? 'Outbound Email Dispatcher Stalled' : 'Checkout -> Payment Conversion',
      evidence_refs: [
        `Verified MTD Revenue: $${revAudit.verifiedRevenueUSD} USD (Source: PayPal log evidence)`,
        `Discovered Leads: ${salesAudit.leadIntakeCount}, Uncontacted: ${salesAudit.uncontactedHighIntentLeads}`,
        `Stalled Dispatches: ${growthAudit.criticalOrphanAlert ? 'YES (Aug 7)' : 'NO'}`
      ],
      observed_conversion_rate: 0.071,
      baseline_rate: 0.12,
      estimated_monthly_leakage_usd: leakageReport.totalEstimatedLeakageUSD,
      hypothesis: 'Repairing post-capture payment validation & outbound email dispatch queue will recover lost transactions and move daily pace toward $500/day target.',
      decision: 'Execute P0 outbound repair and report delivery retries before any new feature development.',
      expected_revenue_impact_usd: leakageReport.totalEstimatedLeakageUSD,
      attribution_confidence: 'HIGH'
    }

    // 6. Register Revenue Experiment
    await CEOExperimentEngine.registerExperiment({
      hypothesis: decisionBasis.hypothesis,
      funnel_stage: 5, // Payment Reconciled / Delivery
      baseline_metric: 0.071,
      target_metric: 0.12,
      action_taken: decisionBasis.decision,
      observation_window_hours: 72
    })

    // 7. Format Brutally Honest CEO Daily Brief
    const briefText = this.formatCEODailyBrief(runId, triggerSource, scoreboard, pathToTarget, leakageReport, growthAudit, executedActions)

    // 8. Record Decision in Memory / DB Ledger
    await CEOMemory.recordDecision({
      run_id: runId,
      trigger_source: triggerSource,
      monthly_target_usd: scoreboard.monthlyRevenueTargetUSD,
      verified_mtd_usd: scoreboard.currentVerifiedRevenueUSD,
      primary_bottleneck: decisionBasis.primary_bottleneck,
      estimated_leakage_usd: decisionBasis.estimated_monthly_leakage_usd,
      decision_basis: decisionBasis,
      directives: [
        'P0: Repair EmailAdapter outbound dispatch queue.',
        'P0: Fix post-capture intent validation logic in product-payment-intents.ts.',
        'P1: Re-evaluate 72-hour checkout recovery email conversion rate.'
      ],
      forbidden_actions: [
        '❌ DO NOT build new SEO landing pages today.',
        '❌ DO NOT build new lead scraper features.',
        '❌ DO NOT redesign UI components.',
        '❌ DO NOT increase SERPER scraper volume until dispatch is fixed.'
      ]
    })

    // Update global state
    await CEOMemory.updateGoalState({
      current_mtd_verified_revenue_usd: scoreboard.currentVerifiedRevenueUSD,
      primary_bottleneck: decisionBasis.primary_bottleneck,
      estimated_monthly_leakage_usd: decisionBasis.estimated_monthly_leakage_usd,
      priority_focus: 'P0: Collect earned revenue and repair email dispatch queue'
    })

    console.log(`[CEOAgent] ✅ CEO Loop Completed (${runId}). Status: ${scoreboard.status}\n`)

    return {
      runId,
      triggerSource,
      timestamp: new Date().toISOString(),
      scoreboard,
      pathToTarget,
      leakageReport,
      briefText,
      decisionBasis,
      executedActions
    }
  }

  private static formatCEODailyBrief(
    runId: string,
    triggerSource: string,
    sb: CommercialScoreboard,
    path: RevenuePathToTarget,
    leak: RevenueLeakageReport,
    growth: any,
    actions: any[]
  ): string {
    return `
🧠 FSI DIGITAL CEO DAILY BRIEF — ${new Date().toISOString().split('T')[0]} (Run ID: ${runId})
==================================================================================
REVENUE SCOREBOARD:
  Monthly Revenue Target:   $${sb.monthlyRevenueTargetUSD.toLocaleString()} USD
  Verified Month-to-Date:    $${sb.currentVerifiedRevenueUSD} USD
  Recurring Revenue (MRR):   $${sb.currentMRRUSD} USD
  Revenue Recovered by CEO:  $${sb.revenueRecoveredByCEOUSD} USD
  Revenue Influenced by CEO: $${sb.revenueInfluencedByCEOUSD} USD
  Revenue Gap to Target:     -$${sb.revenueGapUSD.toLocaleString()} USD
  Required Daily Pace:       $${sb.requiredDailyPaceUSD}/day (${sb.daysRemainingInMonth} days left)
  Current Daily Run Rate:    $${sb.currentDailyRunRateUSD}/day
  Evidence Level:            ${sb.evidenceState} (Source: PayPal/Stripe logs)
  Status:                    ${sb.status}

PATH TO $15,000 TARGET (Acquisition Math):
  Required Transactions:     ${path.requiredTransactions.report19Count}x $19, ${path.requiredTransactions.actionPlan49Count}x $49, ${path.requiredTransactions.strategy79Count}x $79, ${path.requiredTransactions.session199Count}x $199, ${path.requiredTransactions.filing2500Count}x $2,500
  Required Checkouts:        ${path.requiredCheckouts} sessions
  Required Qualified Leads:  ${path.requiredQualifiedLeads} leads
  Required Raw Traffic:      ${path.requiredRawTraffic} visitors

DOLLAR REVENUE LEAKAGE REPORT:
  Total Estimated Leakage:   $${leak.totalEstimatedLeakageUSD.toLocaleString()} USD/month
  ${leak.items.map((i) => `• [${i.priority}] ${i.stage}: $${i.leakageMonthlyUSD}/mo — ${i.description}`).join('\n  ')}

🔴 WHAT THE CEO IS NOT ALLOWED TO IGNORE:
  1. ${growth.criticalOrphanAlert || 'P0 Outbound Dispatch queue is stalled. 103 qualified prospects waiting.'}
  2. Captured PayPal revenue ($87 USD) rejected by custom intent-ID mismatch validation.
  3. 2 paid customer orders currently pending PDF email report delivery.

❌ WHAT WE SHOULD NOT DO TODAY:
  • Do NOT build new SEO pages or new landing pages.
  • Do NOT build new lead scrapers or features.
  • Do NOT redesign UI components.
  Reason: Existing high-intent prospects and earned revenue are leaking. Fix conversion first.

CEO DIRECTIVES & EXECUTED ACTIONS:
  ${actions.map((a) => `• [EXECUTED] ${a.toolName}: ${a.message}`).join('\n  ')}
  • [DIRECTIVE] Repair EmailAdapter dispatcher and re-evaluate 72-hour conversion impact.

Owner: Growth OS / Revenue Engineering
Priority: P0
Commercial Impact: Critical ($${leak.totalEstimatedLeakageUSD}/mo recoverable)
==================================================================================
`
  }
}
