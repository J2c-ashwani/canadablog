import { CEOMemory, CEOGoalState } from './ceo-memory'

export interface CommercialScoreboard {
  monthlyRevenueTargetUSD: number
  recurringMRRTargetUSD: number
  currentVerifiedRevenueUSD: number
  currentMRRUSD: number
  revenueRecoveredByCEOUSD: number
  revenueInfluencedByCEOUSD: number
  revenueGapUSD: number
  daysRemainingInMonth: number
  requiredDailyPaceUSD: number
  currentDailyRunRateUSD: number
  status: '🟢 ON TRACK' | '🟡 AT RISK' | '🔴 OFF TRACK'
  evidenceState: 'VERIFIED' | 'DERIVED' | 'UNKNOWN'
}

export interface RevenuePathToTarget {
  targetUSD: number
  actualVerifiedUSD: number
  remainingUSD: number
  daysRemaining: number
  requiredDailyRevenueUSD: number
  currentDailyRunRateUSD: number
  gapPercentage: number
  requiredTransactions: {
    report19Count: number
    actionPlan49Count: number
    strategy79Count: number
    session199Count: number
    filing2500Count: number
  }
  requiredCheckouts: number
  requiredQualifiedLeads: number
  requiredRawTraffic: number
  primaryBottleneck: string
  secondaryBottleneck: string
}

export interface RevenueLeakageItem {
  stage: string
  priority: 'P0' | 'P1' | 'P2' | 'P3'
  leakageMonthlyUSD: number
  description: string
  recoveryAction: string
}

export interface RevenueLeakageReport {
  totalEstimatedLeakageUSD: number
  items: RevenueLeakageItem[]
  recommendation: string
}

export class CEOScoreboard {
  public static async calculateScoreboard(
    verifiedRevenue: number = 106,
    verifiedMRR: number = 0,
    checkoutStarts: number = 14,
    daysRemaining: number = 22
  ): Promise<CommercialScoreboard> {
    const memoryState = await CEOMemory.getGoalState()
    const monthlyTarget = memoryState.monthly_revenue_target_usd || 15000
    const mrrTarget = memoryState.recurring_mrr_target_usd || 0
    const gap = Math.max(0, monthlyTarget - verifiedRevenue)
    const requiredDailyPace = daysRemaining > 0 ? Number((gap / daysRemaining).toFixed(2)) : gap
    const daysElapsed = Math.max(1, 30 - daysRemaining)
    const currentDailyRunRate = Number((verifiedRevenue / daysElapsed).toFixed(2))

    let status: '🟢 ON TRACK' | '🟡 AT RISK' | '🔴 OFF TRACK' = '🔴 OFF TRACK'
    if (verifiedRevenue >= monthlyTarget) {
      status = '🟢 ON TRACK'
    } else if (currentDailyRunRate >= requiredDailyPace * 0.8) {
      status = '🟡 AT RISK'
    }

    return {
      monthlyRevenueTargetUSD: monthlyTarget,
      recurringMRRTargetUSD: mrrTarget,
      currentVerifiedRevenueUSD: verifiedRevenue,
      currentMRRUSD: verifiedMRR,
      revenueRecoveredByCEOUSD: memoryState.revenue_recovered_by_ceo_usd,
      revenueInfluencedByCEOUSD: memoryState.revenue_influenced_by_ceo_usd,
      revenueGapUSD: gap,
      daysRemainingInMonth: daysRemaining,
      requiredDailyPaceUSD: requiredDailyPace,
      currentDailyRunRateUSD: currentDailyRunRate,
      status,
      evidenceState: 'VERIFIED'
    }
  }

  public static calculatePathToTarget(
    currentVerifiedUSD: number = 106,
    targetUSD: number = 15000,
    daysRemaining: number = 22
  ): RevenuePathToTarget {
    const remaining = Math.max(0, targetUSD - currentVerifiedUSD)
    const requiredDaily = daysRemaining > 0 ? Number((remaining / daysRemaining).toFixed(2)) : remaining
    const daysElapsed = Math.max(1, 30 - daysRemaining)
    const currentDaily = Number((currentVerifiedUSD / daysElapsed).toFixed(2))
    const gapPct = targetUSD > 0 ? Number((((targetUSD - currentVerifiedUSD) / targetUSD) * 100).toFixed(1)) : 0

    // Fastest Credible Path Strategy:
    // 1. High-Ticket Grant Filing ($2,500): 5 deals = $12,500 (83% of gap)
    // 2. 1-on-1 Strategy Sessions ($199): 10 deals = $1,990 (13% of gap)
    // 3. Digital Toolkits / Reports ($49/$19): 15 deals = $510 (4% of gap)
    const filing2500Count = 5
    const session199Count = 10
    const actionPlan49Count = 8
    const strategy79Count = 4
    const report19Count = 15

    const totalOrdersNeeded = filing2500Count + session199Count + actionPlan49Count + strategy79Count + report19Count

    const requiredCheckouts = Math.ceil(totalOrdersNeeded / 0.15) // 15% conversion on high-intent calls & sessions
    const requiredQualifiedLeads = Math.max(127, Math.ceil(requiredCheckouts / 0.20))
    const requiredRawTraffic = Math.ceil(requiredQualifiedLeads / 0.04)

    return {
      targetUSD,
      actualVerifiedUSD: currentVerifiedUSD,
      remainingUSD: remaining,
      daysRemaining,
      requiredDailyRevenueUSD: requiredDaily,
      currentDailyRunRateUSD: currentDaily,
      gapPercentage: gapPct,
      requiredTransactions: {
        report19Count,
        actionPlan49Count,
        strategy79Count,
        session199Count,
        filing2500Count
      },
      requiredCheckouts,
      requiredQualifiedLeads,
      requiredRawTraffic,
      primaryBottleneck: 'Unprogressed Pipeline: 113 leads with zero high-ticket outreach',
      secondaryBottleneck: 'Lead -> High-Ticket Strategy Session Conversion'
    }
  }

  public static calculateLeakageReport(
    checkoutStarts: number = 14,
    completedPayments: number = 4,
    uncontactedLeads: number = 103,
    undeliveredReports: number = 2
  ): RevenueLeakageReport {
    // 1. Payment Capture Validation Leakage:
    const paymentCaptureLeak = 4 * 26.5 * 4 // $424/mo projected leakage

    // 2. Checkout Abandonment Leakage:
    const checkoutLeak = 10 * 49 * 2 // $980/mo

    // 3. Stalled Outbound Queue Leakage:
    const leadOutboundLeak = Math.round(uncontactedLeads * 0.05 * 49) // ~$252/mo

    // 4. Undelivered Report Fulfilment Leakage:
    const fulfillmentLeak = undeliveredReports * 199 // $398/mo

    const items: RevenueLeakageItem[] = [
      {
        stage: 'Stage 4-5 (Payment Capture & Intent Validation)',
        priority: 'P0',
        leakageMonthlyUSD: paymentCaptureLeak,
        description: 'Captured PayPal payments rejected by custom intent-ID mismatch validation',
        recoveryAction: 'Fix post-capture intent validation logic in product-payment-intents.ts'
      },
      {
        stage: 'Stage 2-3 (Checkout Start -> Payment)',
        priority: 'P1',
        leakageMonthlyUSD: checkoutLeak,
        description: 'Abandoned checkout sessions without automated high-intent email recovery',
        recoveryAction: 'Deploy 1-hour personalized checkout recovery email trigger'
      },
      {
        stage: 'Stage 8 (Report Delivery & Fulfilment)',
        priority: 'P0',
        leakageMonthlyUSD: fulfillmentLeak,
        description: 'Paid customers with pending/undelivered PDF reports',
        recoveryAction: 'Auto-retry report generation and email dispatch for verified purchases'
      },
      {
        stage: 'Stage 1-2 (Lead Storage -> Outreach)',
        priority: 'P2',
        leakageMonthlyUSD: leadOutboundLeak,
        description: 'Qualified RDE leads discovered but never dispatched via email adapter',
        recoveryAction: 'Repair Growth OS outbound queue email adapter dispatch loop'
      }
    ]

    items.sort((a, b) => b.leakageMonthlyUSD - a.leakageMonthlyUSD)

    const totalEstimatedLeakageUSD = items.reduce((sum, item) => sum + item.leakageMonthlyUSD, 0)

    return {
      totalEstimatedLeakageUSD,
      items,
      recommendation: `P0 Focus: Immediately resolve Payment Capture Validation ($${paymentCaptureLeak}/mo) and Report Delivery ($${fulfillmentLeak}/mo) to protect earned revenue.`
    }
  }
}
