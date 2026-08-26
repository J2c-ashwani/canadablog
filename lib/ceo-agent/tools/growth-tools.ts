import { collectGrowthOSEvidence } from '@/lib/growth-os/evidence-metrics'

export interface GrowthOSPipelineAudit {
  serperTrafficActive: boolean
  discoveredProspectsCount: number
  qualifiedLeadsCount: number
  queuedOutreachCount: number
  dispatchedEmailsCount: number
  deliveredEmailsCount: number
  repliesCount: number
  checkoutStartsCount: number
  capturedPaymentsCount: number
  reportsDeliveredCount: number
  activeMembershipsCount: number
  verifiedMRRUSD: number
  evidenceState: 'VERIFIED' | 'PARTIAL' | 'UNKNOWN'
  sourceErrors: string[]
  orphanedStagesDetected: Array<{ stage: string; severity: 'P0' | 'P1' | 'P2'; issue: string; impact: string }>
}

export class GrowthTools {
  public static async getGrowthOSStatus(): Promise<GrowthOSPipelineAudit> {
    const evidence = await collectGrowthOSEvidence()
    const orphanedStages: GrowthOSPipelineAudit['orphanedStagesDetected'] = []
    const discovered = evidence.outreach.authorityProspects
    const queued = evidence.outreach.authorityQueued
    const accepted = evidence.outreach.authorityProviderAccepted + evidence.outreach.b2bProviderAccepted
    const delivered = Math.max(evidence.outreach.authorityDelivered, evidence.outreach.emailDelivered)

    if (queued > 0 && accepted === 0) {
      orphanedStages.push({
        stage: 'Qualified Outreach → Provider Acceptance',
        severity: 'P0',
        issue: `${queued} queued prospects have zero provider-accepted messages.`,
        impact: 'Distribution is not reaching an email provider, so it cannot create measurable demand.',
      })
    }
    if (accepted > 0 && delivered === 0) {
      orphanedStages.push({
        stage: 'Provider Acceptance → Verified Delivery',
        severity: 'P1',
        issue: `${accepted} messages were provider-accepted but no signed delivery events are available.`,
        impact: 'The system cannot distinguish accepted API requests from inbox delivery.',
      })
    }
    if (evidence.fulfillment.pending + evidence.fulfillment.failed > 0) {
      orphanedStages.push({
        stage: 'Provider Capture → Product Fulfilment',
        severity: 'P0',
        issue: `${evidence.fulfillment.pending + evidence.fulfillment.failed} verified purchases are pending or failed fulfilment.`,
        impact: 'Earned revenue is at risk until entitlement and delivery are completed.',
      })
    }
    if (evidence.sourceErrors.length > 0) {
      orphanedStages.push({
        stage: 'Evidence Collection',
        severity: 'P1',
        issue: evidence.sourceErrors.join(' | '),
        impact: 'CEO conclusions are partial until every critical source is readable.',
      })
    }

    return {
      serperTrafficActive: evidence.outreach.authorityProspects > 0,
      discoveredProspectsCount: discovered,
      qualifiedLeadsCount: evidence.funnel.totalLeads,
      queuedOutreachCount: queued,
      dispatchedEmailsCount: accepted,
      deliveredEmailsCount: delivered,
      repliesCount: evidence.outreach.authorityReplies,
      checkoutStartsCount: evidence.funnel.checkoutStarts30d,
      capturedPaymentsCount: evidence.revenue.uniqueProviderCaptures,
      reportsDeliveredCount: evidence.fulfillment.delivered,
      activeMembershipsCount: evidence.revenue.activeMemberships,
      verifiedMRRUSD: evidence.revenue.verifiedMRRUSD,
      evidenceState: evidence.evidenceState,
      sourceErrors: evidence.sourceErrors,
      orphanedStagesDetected: orphanedStages,
    }
  }
}
