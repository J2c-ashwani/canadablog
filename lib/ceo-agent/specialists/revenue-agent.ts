import { RevenueTools } from '../tools/revenue-tools'
import { getActionPerformanceScorecard, type ActionPerformanceScorecard } from '@/lib/growth-os/action-scorecard'

export interface HistoricalTransactionRecord {
  orderId: string
  customer: string
  product: string
  amountUSD: number
  paymentTimestamp: string
  ceoDeploymentTimestamp: string
  isPreCEODeployment: boolean
  fulfillmentStatus: 'DELIVERED' | 'PROVIDER_ACCEPTED' | 'PENDING_RETRY'
}

export interface RevenueAgentAudit {
  verifiedTotalRevenueUSD: number
  verifiedTotalRevenueCAD: number
  verifiedRevenueUSD: number
  verifiedMTDRevenueUSD: number
  verifiedMTDRevenueCAD: number
  verified30DayRevenueUSD: number
  verified30DayRevenueCAD: number
  verifiedMRRUSD: number
  activeMemberships: number
  historicalPreCEODeploymentUSD: number
  postCEODeploymentRevenueUSD: number
  directlyAttributedToCEOUSD: number
  recoveredByCEOUSD: number
  historicalTransactions: HistoricalTransactionRecord[]
  unverifiedCandidateUSD: number
  excludedTestDataUSD: number
  evidenceState: 'VERIFIED' | 'PARTIAL' | 'UNKNOWN'
  sourceErrors: string[]
  primaryLeakageSource: string
  recommendation: string
  actionPerformance: ActionPerformanceScorecard
}

export class RevenueAgent {
  public static async auditRevenue(): Promise<RevenueAgentAudit> {
    const [ledger, actionPerformance] = await Promise.all([
      RevenueTools.getRevenueLedger(),
      getActionPerformanceScorecard(),
    ])
    const ceoDeploymentTimestamp = process.env.CEO_DEPLOYMENT_TIMESTAMP || '2026-08-08T00:00:00.000Z'
    const deploymentMs = new Date(ceoDeploymentTimestamp).getTime()
    const historicalTransactions = ledger.historicalCapturedOrders.map((order, index) => ({
      orderId: `provider-capture-${index + 1}`,
      customer: order.customer,
      product: order.product,
      amountUSD: order.amountUSD,
      paymentTimestamp: order.capturedAt,
      ceoDeploymentTimestamp,
      isPreCEODeployment: new Date(order.capturedAt).getTime() < deploymentMs,
      fulfillmentStatus: String(order.deliveryStatus).toLowerCase() === 'delivered'
        ? 'DELIVERED' as const
        : ['provider_accepted', 'accepted', 'api_accepted'].includes(String(order.deliveryStatus).toLowerCase())
          ? 'PROVIDER_ACCEPTED' as const
          : 'PENDING_RETRY' as const,
    }))
    const historicalPreCEODeploymentUSD = historicalTransactions
      .filter((order) => order.isPreCEODeployment)
      .reduce((sum, order) => sum + order.amountUSD, 0)
    const postCEODeploymentRevenueUSD = historicalTransactions
      .filter((order) => !order.isPreCEODeployment)
      .reduce((sum, order) => sum + order.amountUSD, 0)

    return {
      verifiedTotalRevenueUSD: ledger.verifiedRevenueUSD,
      verifiedTotalRevenueCAD: ledger.verifiedRevenueCAD,
      verifiedRevenueUSD: ledger.verifiedRevenueUSD,
      verifiedMTDRevenueUSD: ledger.verifiedMTDRevenueUSD,
      verifiedMTDRevenueCAD: ledger.verifiedMTDRevenueCAD,
      verified30DayRevenueUSD: ledger.verified30DayRevenueUSD,
      verified30DayRevenueCAD: ledger.verified30DayRevenueCAD,
      verifiedMRRUSD: ledger.verifiedMRRUSD,
      activeMemberships: ledger.activeMemberships,
      historicalPreCEODeploymentUSD: Number(historicalPreCEODeploymentUSD.toFixed(2)),
      postCEODeploymentRevenueUSD: Number(postCEODeploymentRevenueUSD.toFixed(2)),
      directlyAttributedToCEOUSD: actionPerformance.totalRevenueUSD,
      recoveredByCEOUSD: actionPerformance.totalRevenueUSD,
      historicalTransactions,
      unverifiedCandidateUSD: ledger.unverifiedCandidateUSD,
      excludedTestDataUSD: ledger.excludedTestDataUSD,
      evidenceState: ledger.evidenceState,
      sourceErrors: ledger.sourceErrors,
      primaryLeakageSource: ledger.activeMemberships === 0
        ? 'No provider-verified $29 membership subscriptions'
        : 'Insufficient provider-verified product distribution volume',
      recommendation: 'Measure each consented cohort from provider acceptance through delivery, click, checkout, capture, and revenue.',
      actionPerformance,
    }
  }
}
