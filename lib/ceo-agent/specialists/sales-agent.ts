import { SubscriberRepository, type SubscriberProfile } from '@/lib/leads/SubscriberRepository'
import { collectGrowthOSEvidence } from '@/lib/growth-os/evidence-metrics'
import { ProspectIntelligenceEngine } from '@/lib/revenue-hunter/intelligence/prospect-graph'
import { RevenueHunterEngine, type RevenueHunterStatus } from '@/lib/revenue-hunter/hunter-engine'

export interface RankedLeadOpportunity {
  email: string
  name: string
  company: string
  tier: 'TIER_1_BUNDLE_79' | 'TIER_2_MEMBERSHIP_29' | 'TIER_3_ACTION_PLAN_49' | 'TIER_4_REPORT_19'
  estimatedDealValueUSD: number
  expectedValueUSD: number
  industry: string
  region: string
  readinessScore: number
  source: string
  actionableReason: string
}

export interface PipelineStageMetrics {
  totalIntakeLeads: number
  consentedLeads: number
  newLeads24h: number
  uniqueSessions30d: number
  paidOfferImpressions30d: number
  productVisitors30d: number
  unprogressedLeads: number
  membershipCandidatesCount: number
  tier1BundleCount: number
  tier2MembershipCount: number
  tier3ActionPlanCount: number
  tier4ReportCount: number
  totalPipelineExpectedValueUSD: number
  contactedCount: number
  deliveredCount: number
  repliedCount: number
  callsBookedCount: number
  checkoutStartsCount: number
  completedPurchasesCount: number
  topActionableLeads: RankedLeadOpportunity[]
  acquisitionSources: Record<string, number>
}

export interface SalesAgentAudit {
  leadIntakeCount: number
  consentedLeadCount: number
  uncontactedHighIntentLeads: number
  checkoutAbandonmentRate: number
  pipeline: PipelineStageMetrics
  hunterStatus: RevenueHunterStatus
  primaryBottleneck: string
  recommendation: string
}

function sourceOf(subscriber: SubscriberProfile) {
  const source = `${subscriber.utmSource || ''} ${subscriber.referralSource || ''} ${subscriber.source || ''} ${subscriber.pagePath || ''}`.toLowerCase()
  if (source.includes('google')) return 'Google organic/search'
  if (source.includes('chatgpt') || source.includes('copilot')) return 'AI referral'
  if (source.includes('calculator')) return 'Calculator'
  if (source.includes('newsletter')) return 'Newsletter'
  if (source.includes('gmail')) return 'Email return visit'
  return 'Direct / unattributed'
}

export class SalesAgent {
  public static async auditSales(): Promise<SalesAgentAudit> {
    const [{ rankedProspects, summary }, hunterStatus, allSubscribers, consentedSubscribers, evidence] = await Promise.all([
      ProspectIntelligenceEngine.buildCommercialGraph(),
      RevenueHunterEngine.getHunterStatus(),
      SubscriberRepository.getAllSubscribers(true),
      SubscriberRepository.getAllSubscribers(false),
      collectGrowthOSEvidence(),
    ])
    const acquisitionSources: Record<string, number> = {}
    allSubscribers.forEach((subscriber) => {
      const source = sourceOf(subscriber)
      acquisitionSources[source] = (acquisitionSources[source] || 0) + 1
    })
    const rankedLeads: RankedLeadOpportunity[] = rankedProspects.slice(0, 10).map((prospect) => ({
      email: prospect.leadEmail,
      name: prospect.leadName,
      company: prospect.companyName,
      tier: prospect.recommendedOffer.tier === 'TIER_BUNDLE_79'
        ? 'TIER_1_BUNDLE_79'
        : prospect.recommendedOffer.tier === 'TIER_MEMBERSHIP_29'
          ? 'TIER_2_MEMBERSHIP_29'
          : prospect.recommendedOffer.tier === 'TIER_ACTION_PLAN_49'
            ? 'TIER_3_ACTION_PLAN_49'
            : 'TIER_4_REPORT_19',
      estimatedDealValueUSD: prospect.recommendedOffer.priceUSD,
      expectedValueUSD: prospect.expectedValueUSD,
      industry: prospect.industry,
      region: prospect.province,
      readinessScore: Math.round(prospect.confidenceScore * 100),
      source: prospect.primaryIntentDriver,
      actionableReason: `${prospect.primaryIntentDriver} (modelled EV: $${prospect.expectedValueUSD})`,
    }))
    const contacted = evidence.outreach.b2bProviderAccepted + evidence.outreach.authorityProviderAccepted
    const completedPurchases = evidence.funnel.providerVerifiedPurchases30d
    const checkoutStarts = evidence.funnel.checkoutStarts30d
    const unprogressed = Math.max(0, consentedSubscribers.length - contacted - completedPurchases)
    const pipeline: PipelineStageMetrics = {
      totalIntakeLeads: allSubscribers.length,
      consentedLeads: consentedSubscribers.length,
      newLeads24h: evidence.funnel.newLeads24h,
      uniqueSessions30d: evidence.funnel.uniqueSessions30d,
      paidOfferImpressions30d: evidence.funnel.paidOfferImpressions30d,
      productVisitors30d: evidence.funnel.productVisitors30d,
      unprogressedLeads: unprogressed,
      membershipCandidatesCount: consentedSubscribers.filter((subscriber) => String(subscriber.subscriptionStatus || '').toUpperCase() !== 'ACTIVE').length,
      tier1BundleCount: summary.tierBreakdown.tierBundle79Count,
      tier2MembershipCount: summary.tierBreakdown.tierMembership29Count,
      tier3ActionPlanCount: summary.tierBreakdown.tierActionPlan49Count,
      tier4ReportCount: summary.tierBreakdown.tierReport19Count,
      totalPipelineExpectedValueUSD: summary.totalPipelineExpectedValueUSD,
      contactedCount: contacted,
      deliveredCount: evidence.outreach.emailDelivered,
      repliedCount: evidence.outreach.authorityReplies,
      callsBookedCount: 0,
      checkoutStartsCount: checkoutStarts,
      completedPurchasesCount: completedPurchases,
      topActionableLeads: rankedLeads,
      acquisitionSources,
    }
    return {
      leadIntakeCount: allSubscribers.length,
      consentedLeadCount: consentedSubscribers.length,
      uncontactedHighIntentLeads: unprogressed,
      checkoutAbandonmentRate: checkoutStarts > 0 ? Number(((checkoutStarts - completedPurchases) / checkoutStarts).toFixed(4)) : 0,
      pipeline,
      hunterStatus,
      primaryBottleneck: evidence.revenue.activeMemberships === 0
        ? 'Zero provider-verified membership activations'
        : `${unprogressed} consented leads have no verified commercial progression.`,
      recommendation: 'Distribute the current $19/$29/$49/$79 self-serve offers in controlled cohorts and scale only provider-verified winners.',
    }
  }
}
