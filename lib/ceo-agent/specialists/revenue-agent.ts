import { RevenueTools } from '../tools/revenue-tools'
import { CEOActionLedger } from '../ledger/ceo-action-ledger'

export interface HistoricalTransactionRecord {
  orderId: string
  customer: string
  product: string
  amountUSD: number
  paymentTimestamp: string
  ceoDeploymentTimestamp: string
  isPreCEODeployment: boolean
  fulfillmentStatus: 'DELIVERED' | 'PENDING_RETRY'
}

export interface RevenueAgentAudit {
  // Historical & Total Accounting
  verifiedTotalRevenueUSD: number
  historicalPreCEODeploymentUSD: number
  postCEODeploymentRevenueUSD: number
  directlyAttributedToCEOUSD: number
  recoveredByCEOUSD: number
  
  // Detailed Transactions
  historicalTransactions: HistoricalTransactionRecord[]
  unverifiedCandidateUSD: number
  excludedTestDataUSD: number
  primaryLeakageSource: string
  recommendation: string
}

export class RevenueAgent {
  public static async auditRevenue(): Promise<RevenueAgentAudit> {
    const ledger = await RevenueTools.getRevenueLedger()
    const ledgerSummary = await CEOActionLedger.getLedgerSummary()

    const ceoDeploymentTimestamp = '2026-08-08T00:00:00.000Z'

    const historicalTransactions: HistoricalTransactionRecord[] = [
      {
        orderId: '6LU31970NG3464453',
        customer: 'Jessica Gould (jgould@upei.ca)',
        product: 'Funding Match Report ($19)',
        amountUSD: 19,
        paymentTimestamp: '2026-07-31T07:11:47.598Z',
        ceoDeploymentTimestamp,
        isPreCEODeployment: true,
        fulfillmentStatus: 'DELIVERED'
      },
      {
        orderId: '0U3930093L744772K',
        customer: 'Jessica Gould (jgould@upei.ca)',
        product: 'Funding Match Report ($19)',
        amountUSD: 19,
        paymentTimestamp: '2026-07-31T07:11:53.333Z',
        ceoDeploymentTimestamp,
        isPreCEODeployment: true,
        fulfillmentStatus: 'DELIVERED'
      },
      {
        orderId: '6B784594LT354905D',
        customer: 'Chintan Kakani (chintankakani@gmail.com)',
        product: 'Funding Match Report ($19)',
        amountUSD: 19,
        paymentTimestamp: '2026-08-05T13:40:40.690Z',
        ceoDeploymentTimestamp,
        isPreCEODeployment: true,
        fulfillmentStatus: 'DELIVERED'
      },
      {
        orderId: 'ORDER_HISTORICAL_C4_ROADMAP',
        customer: 'Chintan Patel / C1 Historical',
        product: 'Comprehensive Funding Roadmap ($49)',
        amountUSD: 49,
        paymentTimestamp: '2026-08-07T16:16:10.092Z',
        ceoDeploymentTimestamp,
        isPreCEODeployment: true,
        fulfillmentStatus: 'DELIVERED'
      }
    ]

    const historicalPreCEODeploymentUSD = historicalTransactions.reduce((sum, t) => sum + t.amountUSD, 0) // $106.00
    const postCEODeploymentRevenueUSD = ledgerSummary.totalRevenueRecoveredUSD // $0.00 until verified downstream payment
    const directlyAttributedToCEOUSD = ledgerSummary.totalRevenueRecoveredUSD

    return {
      verifiedTotalRevenueUSD: historicalPreCEODeploymentUSD + postCEODeploymentRevenueUSD,
      historicalPreCEODeploymentUSD,
      postCEODeploymentRevenueUSD,
      directlyAttributedToCEOUSD,
      recoveredByCEOUSD: directlyAttributedToCEOUSD,
      historicalTransactions,
      unverifiedCandidateUSD: ledger.unverifiedCandidateUSD,
      excludedTestDataUSD: ledger.excludedTestDataUSD,
      primaryLeakageSource: 'Zero proactive outreach to 466 qualified pipeline leads sitting in database',
      recommendation: 'Differentiate Pre-CEO historical revenue ($106) from live CEO performance ($0) and measure downstream conversion from Action Ledger.'
    }
  }
}
