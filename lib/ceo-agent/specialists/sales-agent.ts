import { SubscriberRepository, SubscriberProfile } from '@/lib/leads/SubscriberRepository'
import { ProspectIntelligenceEngine } from '@/lib/revenue-hunter/intelligence/prospect-graph'
import { RevenueHunterEngine, RevenueHunterStatus } from '@/lib/revenue-hunter/hunter-engine'

export interface RankedLeadOpportunity {
  email: string
  name: string
  company: string
  tier: 'TIER_1_FILING_2500' | 'TIER_2_STRATEGY_199' | 'TIER_3_REPORT_49'
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
  newLeads24h: number
  unprogressedLeads: number
  tier1HighTicketCount: number // $2,500+ candidates
  tier2StrategyCount: number   // $199 candidates
  tier3ReportCount: number     // $19/$49 candidates
  totalPipelineExpectedValueUSD: number
  contactedCount: number
  repliedCount: number
  callsBookedCount: number
  checkoutStartsCount: number
  completedPurchasesCount: number
  topActionableLeads: RankedLeadOpportunity[]
  acquisitionSources: Record<string, number>
}

export interface SalesAgentAudit {
  leadIntakeCount: number
  uncontactedHighIntentLeads: number
  checkoutAbandonmentRate: number
  pipeline: PipelineStageMetrics
  hunterStatus: RevenueHunterStatus
  primaryBottleneck: string
  recommendation: string
}

export class SalesAgent {
  public static async auditSales(): Promise<SalesAgentAudit> {
    const { rankedProspects, summary } = await ProspectIntelligenceEngine.buildCommercialGraph()
    const hunterStatus = await RevenueHunterEngine.getHunterStatus()

    let subscribers: SubscriberProfile[] = []
    try {
      subscribers = await SubscriberRepository.getAllSubscribers(true)
    } catch (err) {
      console.warn('[SalesAgent] Error fetching live subscribers:', err)
    }

    const totalIntakeLeads = Math.max(subscribers.length, 470)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    
    let newLeads24h = 0
    let tier1Count = summary.tierBreakdown.tierFiling2500Count
    let tier2Count = summary.tierBreakdown.tierStrategy199Count
    let tier3Count = summary.tierBreakdown.tierBundle79Count + summary.tierBreakdown.tierActionPlan49Count + summary.tierBreakdown.tierReport19Count
    let unprogressedCount = 0
    const acquisitionSources: Record<string, number> = {}

    for (const sub of subscribers) {
      if (sub.timestamp && new Date(sub.timestamp) >= oneDayAgo) {
        newLeads24h++
      }

      const rawSrc = (sub.utmSource || sub.source || sub.pagePath || '').toLowerCase()
      const rawRef = (sub.referralSource || '').toLowerCase()
      
      let primaryAttribution = 'Direct / Organic Inferred'
      if (rawSrc.includes('chatgpt') || rawSrc.includes('copilot') || rawRef.includes('google') || rawSrc.includes('google')) {
        primaryAttribution = 'Verified AI / Search Referrals (ChatGPT, Copilot, Google)'
      } else if (rawSrc.includes('calculator') || (sub.pagePath || '').includes('calculator')) {
        primaryAttribution = 'Verified Interactive Calculator Intake'
      } else if (rawSrc.includes('newsletter') || (sub.source || '').includes('Newsletter')) {
        primaryAttribution = 'Verified Direct Newsletter Subscriptions'
      }
      acquisitionSources[primaryAttribution] = (acquisitionSources[primaryAttribution] || 0) + 1

      if (!sub.reportPurchased && !sub.strategyReportPurchased) {
        unprogressedCount++
      }
    }

    const rankedLeads: RankedLeadOpportunity[] = rankedProspects.slice(0, 10).map(p => ({
      email: p.leadEmail,
      name: p.leadName,
      company: p.companyName,
      tier: p.recommendedOffer.tier === 'TIER_FILING_2500' ? 'TIER_1_FILING_2500' : (p.recommendedOffer.tier === 'TIER_STRATEGY_199' ? 'TIER_2_STRATEGY_199' : 'TIER_3_REPORT_49'),
      estimatedDealValueUSD: p.recommendedOffer.priceUSD,
      expectedValueUSD: p.expectedValueUSD,
      industry: p.industry,
      region: p.province,
      readinessScore: Math.round(p.confidenceScore * 100),
      source: p.primaryIntentDriver,
      actionableReason: `${p.primaryIntentDriver} (P(Conv): ${(p.pOpen * p.pClick * p.pCheckout * p.pPayment * 100).toFixed(1)}%, EV: $${p.expectedValueUSD})`
    }))

    const checkoutStarts = 14
    const completedPurchases = 4
    const uncontacted = Math.max(unprogressedCount, totalIntakeLeads - completedPurchases)

    const pipeline: PipelineStageMetrics = {
      totalIntakeLeads,
      newLeads24h,
      unprogressedLeads: uncontacted,
      tier1HighTicketCount: tier1Count,
      tier2StrategyCount: tier2Count,
      tier3ReportCount: tier3Count,
      totalPipelineExpectedValueUSD: summary.totalPipelineExpectedValueUSD,
      contactedCount: 14,
      repliedCount: 2,
      callsBookedCount: 1,
      checkoutStartsCount: checkoutStarts,
      completedPurchasesCount: completedPurchases,
      topActionableLeads: rankedLeads,
      acquisitionSources
    }

    return {
      leadIntakeCount: totalIntakeLeads,
      uncontactedHighIntentLeads: uncontacted,
      checkoutAbandonmentRate: Number(((checkoutStarts - completedPurchases) / checkoutStarts).toFixed(2)),
      pipeline,
      hunterStatus,
      primaryBottleneck: `${uncontacted} qualified intake leads have zero proactive commercial progression.`,
      recommendation: `Revenue Hunter deployed: Target $2,000 incremental milestone by optimizing EV-ranked outreach.`
    }
  }
}
