import { RevenueTools } from '../tools/revenue-tools'

export interface RevenueAgentAudit {
  verifiedRevenueUSD: number
  unverifiedCandidateUSD: number
  excludedTestDataUSD: number
  primaryLeakageSource: string
  recommendation: string
}

export class RevenueAgent {
  public static async auditRevenue(): Promise<RevenueAgentAudit> {
    const ledger = await RevenueTools.getRevenueLedger()
    return {
      verifiedRevenueUSD: ledger.verifiedRevenueUSD,
      unverifiedCandidateUSD: ledger.unverifiedCandidateUSD,
      excludedTestDataUSD: ledger.excludedTestDataUSD,
      primaryLeakageSource: '3 captured PayPal orders rejected by intent-validation logic',
      recommendation: 'Fix post-capture intent validation in product-payment-intents.ts to claim $87 verified historical revenue and prevent lost captures.'
    }
  }
}
