import { collectGrowthOSEvidence } from '@/lib/growth-os/evidence-metrics'

export interface ProductAgentAudit {
  generatedReportsCount: number
  deliveredReportsCount: number
  providerAcceptedDeliveriesCount: number
  pendingDeliveriesCount: number
  failedDeliveriesCount: number
  recommendation: string
}

export class ProductAgent {
  public static async auditProduct(): Promise<ProductAgentAudit> {
    const evidence = await collectGrowthOSEvidence()
    const pending = evidence.fulfillment.pending
    const failed = evidence.fulfillment.failed
    return {
      generatedReportsCount: evidence.fulfillment.verifiedPurchases,
      deliveredReportsCount: evidence.fulfillment.delivered,
      providerAcceptedDeliveriesCount: evidence.fulfillment.providerAccepted,
      pendingDeliveriesCount: pending,
      failedDeliveriesCount: failed,
      recommendation: pending + failed > 0
        ? `Replay fulfilment for ${pending + failed} provider-verified purchases; never claim delivery from provider acceptance alone.`
        : 'No provider-verified purchase currently requires fulfilment recovery.',
    }
  }
}
