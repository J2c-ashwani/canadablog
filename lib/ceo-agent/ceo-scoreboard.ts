import { CEOMemory } from './ceo-memory'

export interface CommercialScoreboard {
  monthlyRevenueTargetUSD: number
  recurringMRRTargetUSD: number
  currentVerifiedRevenueUSD: number
  currentMRRUSD: number
  revenueRecoveredByCEOUSD: number
  revenueInfluencedByCEOUSD: number
  revenueGapUSD: number
  mrrGapUSD: number
  daysRemainingInMonth: number
  requiredDailyPaceUSD: number
  currentDailyRunRateUSD: number
  activeMemberships: number
  membershipsRequiredForMRRTarget: number
  status: '🟢 ON TRACK' | '🟡 AT RISK' | '🔴 OFF TRACK'
  evidenceState: 'VERIFIED' | 'PARTIAL' | 'UNKNOWN'
  targetWindowEndsAt: string
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
    membership29Count: number
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
  assumptions: string[]
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

function utcMonthTiming() {
  const now = new Date()
  const daysInMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)).getUTCDate()
  const day = now.getUTCDate()
  return { daysInMonth, daysElapsed: Math.max(1, day), daysRemaining: Math.max(0, daysInMonth - day + 1) }
}

function sprintTiming(startValue: string, endValue: string) {
  const now = Date.now();
  const start = new Date(startValue).getTime();
  const end = new Date(endValue).getTime();
  const validStart = Number.isFinite(start) ? start : now;
  const validEnd = Number.isFinite(end) && end > validStart ? end : validStart + 30 * 24 * 60 * 60 * 1000;
  return {
    daysElapsed: Math.max(1, Math.ceil((now - validStart) / (24 * 60 * 60 * 1000))),
    daysRemaining: Math.max(0, Math.ceil((validEnd - now) / (24 * 60 * 60 * 1000))),
    targetWindowEndsAt: new Date(validEnd).toISOString(),
  };
}

export class CEOScoreboard {
  public static async calculateScoreboard(
    verifiedRevenue = 0,
    verifiedMRR = 0,
    activeMemberships = 0,
    evidenceState: CommercialScoreboard['evidenceState'] = 'UNKNOWN'
  ): Promise<CommercialScoreboard> {
    const memoryState = await CEOMemory.getGoalState()
    const monthlyTarget = memoryState.monthly_revenue_target_usd
    const mrrTarget = memoryState.recurring_mrr_target_usd
    const timing = sprintTiming(memoryState.sprint_started_at, memoryState.sprint_ends_at)
    const gap = Math.max(0, monthlyTarget - verifiedRevenue)
    const mrrGap = Math.max(0, mrrTarget - verifiedMRR)
    const requiredDailyPace = timing.daysRemaining > 0 ? Number((gap / timing.daysRemaining).toFixed(2)) : gap
    const currentDailyRunRate = Number((verifiedRevenue / timing.daysElapsed).toFixed(2))
    const projectedMonthRevenue = currentDailyRunRate * 30

    let status: CommercialScoreboard['status'] = '🔴 OFF TRACK'
    if (verifiedRevenue >= monthlyTarget) status = '🟢 ON TRACK'
    else if (projectedMonthRevenue >= monthlyTarget * 0.8) status = '🟡 AT RISK'

    return {
      monthlyRevenueTargetUSD: monthlyTarget,
      recurringMRRTargetUSD: mrrTarget,
      currentVerifiedRevenueUSD: verifiedRevenue,
      currentMRRUSD: verifiedMRR,
      revenueRecoveredByCEOUSD: memoryState.revenue_recovered_by_ceo_usd,
      revenueInfluencedByCEOUSD: memoryState.revenue_influenced_by_ceo_usd,
      revenueGapUSD: gap,
      mrrGapUSD: mrrGap,
      daysRemainingInMonth: timing.daysRemaining,
      requiredDailyPaceUSD: requiredDailyPace,
      currentDailyRunRateUSD: currentDailyRunRate,
      activeMemberships,
      membershipsRequiredForMRRTarget: Math.ceil(mrrGap / 29),
      status,
      evidenceState,
      targetWindowEndsAt: timing.targetWindowEndsAt,
    }
  }

  public static calculatePathToTarget(
    currentVerifiedUSD = 0,
    targetUSD = 10000,
    daysRemaining = utcMonthTiming().daysRemaining
  ): RevenuePathToTarget {
    const remaining = Math.max(0, targetUSD - currentVerifiedUSD)
    const requiredDaily = daysRemaining > 0 ? Number((remaining / daysRemaining).toFixed(2)) : remaining
    const daysElapsed = Math.max(1, 31 - Math.max(0, daysRemaining))
    const currentDaily = Number((currentVerifiedUSD / daysElapsed).toFixed(2))
    const gapPct = targetUSD > 0 ? Number(((remaining / targetUSD) * 100).toFixed(1)) : 0

    const membership29Count = Math.ceil((remaining * 0.30) / 29)
    const strategy79Count = Math.ceil((remaining * 0.30) / 79)
    const actionPlan49Count = Math.ceil((remaining * 0.25) / 49)
    const session199Count = 0
    const report19Count = Math.ceil((remaining * 0.15) / 19)
    const totalOrdersNeeded = membership29Count + strategy79Count + actionPlan49Count + session199Count + report19Count
    const assumedCheckoutConversion = 0.10
    const assumedLeadToCheckout = 0.08
    const assumedVisitorToLead = 0.04
    const requiredCheckouts = Math.ceil(totalOrdersNeeded / assumedCheckoutConversion)
    const requiredQualifiedLeads = Math.ceil(requiredCheckouts / assumedLeadToCheckout)
    const requiredRawTraffic = Math.ceil(requiredQualifiedLeads / assumedVisitorToLead)

    return {
      targetUSD,
      actualVerifiedUSD: currentVerifiedUSD,
      remainingUSD: remaining,
      daysRemaining,
      requiredDailyRevenueUSD: requiredDaily,
      currentDailyRunRateUSD: currentDaily,
      gapPercentage: gapPct,
      requiredTransactions: {
        membership29Count,
        report19Count,
        actionPlan49Count,
        strategy79Count,
        session199Count,
        filing2500Count: 0,
      },
      requiredCheckouts,
      requiredQualifiedLeads,
      requiredRawTraffic,
      primaryBottleneck: 'Insufficient provider-verified checkouts and subscription activations',
      secondaryBottleneck: 'Insufficient measurable distribution to consented, product-matched cohorts',
      assumptions: [
        'Illustrative self-serve mix: 30% $29 membership, 30% $79 bundle, 25% $49 plan, 15% $19 report.',
        '$199 1-on-1 strategy products are excluded from automated distribution because the solo operator cannot deliver calls.',
        'Planning assumptions only: 10% checkout-to-payment, 8% qualified-lead-to-checkout, 4% visitor-to-lead.',
        'Strict $10K MRR requires 345 active $29 memberships; one-time products count toward 30-day cash, not MRR.',
      ],
    }
  }

  public static calculateLeakageReport(
    checkoutStarts = 0,
    completedPayments = 0,
    consentedUnprogressedLeads = 0,
    undeliveredReports = 0
  ): RevenueLeakageReport {
    const abandonedCheckouts = Math.max(0, checkoutStarts - completedPayments)
    const items: RevenueLeakageItem[] = []
    if (abandonedCheckouts > 0) {
      items.push({
        stage: 'Checkout Start → Provider Capture',
        priority: 'P0',
        leakageMonthlyUSD: abandonedCheckouts * 49,
        description: `${abandonedCheckouts} measured checkout starts have no matching provider-verified purchase in the reporting window.`,
        recoveryAction: 'Recover only consented leads with an explicit checkout timestamp and stop on any verified purchase.',
      })
    }
    if (undeliveredReports > 0) {
      items.push({
        stage: 'Provider Capture → Product Delivery',
        priority: 'P0',
        leakageMonthlyUSD: undeliveredReports * 49,
        description: `${undeliveredReports} verified purchases are pending or failed delivery.`,
        recoveryAction: 'Replay the real fulfilment pipeline and retain provider acceptance/delivery evidence.',
      })
    }
    if (consentedUnprogressedLeads > 0) {
      items.push({
        stage: 'Consented Lead → Product-Matched Distribution',
        priority: 'P1',
        leakageMonthlyUSD: Math.round(consentedUnprogressedLeads * 0.02 * 49),
        description: `${consentedUnprogressedLeads} consented leads have no measurable commercial progression.`,
        recoveryAction: 'Run controlled product cohorts and retain provider IDs, clicks, checkouts, captures, and revenue attribution.',
      })
    }
    items.sort((a, b) => b.leakageMonthlyUSD - a.leakageMonthlyUSD)
    return {
      totalEstimatedLeakageUSD: items.reduce((sum, item) => sum + item.leakageMonthlyUSD, 0),
      items,
      recommendation: items[0]?.recoveryAction || 'No leakage estimate is justified by the current evidence window.',
    }
  }
}
