import { SubscriberRepository, SubscriberProfile } from '@/lib/leads/SubscriberRepository'
import { ExpectedRevenueModel, ExpectedRevenueCalculation, ProductOfferTier } from '../models/expected-revenue'

export interface ProspectGraphSummary {
  totalLeadsAudited: number
  totalPipelineExpectedValueUSD: number
  tierBreakdown: {
    tierFiling2500Count: number
    tierFiling2500EV: number
    tierStrategy199Count: number
    tierStrategy199EV: number
    tierBundle79Count: number
    tierBundle79EV: number
    tierActionPlan49Count: number
    tierActionPlan49EV: number
    tierReport19Count: number
    tierReport19EV: number
  }
  topCashOpportunities: ExpectedRevenueCalculation[]
}

export function isTestOrInternalLead(email: string, name?: string): boolean {
  const e = (email || '').toLowerCase().trim()
  const n = (name || '').toLowerCase().trim()
  
  if (e.endsWith('@fsidigital.ca')) return true
  if (e.endsWith('@example.com')) return true
  if (e.endsWith('@test.com')) return true
  if (e.includes('test-') || e.startsWith('test.') || e.includes('audit-test') || e.includes('alert-nurture-test')) return true
  if (e.includes('sukashwanikumar') || e.includes('ashwani')) return true
  if (n.includes('test lead') || n.includes('audit test') || n.includes('ashwani kumar')) return true
  
  return false
}

export class ProspectIntelligenceEngine {
  public static async buildCommercialGraph(): Promise<{
    rankedProspects: ExpectedRevenueCalculation[]
    summary: ProspectGraphSummary
  }> {
    let subscribers: SubscriberProfile[] = []
    try {
      // Commercial ranking is restricted to explicitly subscribed contacts.
      subscribers = await SubscriberRepository.getAllSubscribers(false)
    } catch (err) {
      console.warn('[ProspectIntelligenceEngine] Failed to load subscribers:', err)
    }

    if (!subscribers || subscribers.length === 0) {
      return {
        rankedProspects: [],
        summary: {
          totalLeadsAudited: 0,
          totalPipelineExpectedValueUSD: 0,
          tierBreakdown: {
            tierFiling2500Count: 0, tierFiling2500EV: 0,
            tierStrategy199Count: 0, tierStrategy199EV: 0,
            tierBundle79Count: 0, tierBundle79EV: 0,
            tierActionPlan49Count: 0, tierActionPlan49EV: 0,
            tierReport19Count: 0, tierReport19EV: 0
          },
          topCashOpportunities: []
        }
      }
    }

    const calculatedProspects: ExpectedRevenueCalculation[] = []

    for (const sub of subscribers) {
      if (!sub.email || !sub.email.includes('@')) continue
      
      // Strict Data Hygiene: Exclude internal, test, and self accounts
      if (isTestOrInternalLead(sub.email, sub.name)) {
        continue
      }

      const calc = ExpectedRevenueModel.calculateExpectedRevenue({
        email: sub.email,
        name: sub.name,
        companyName: sub.companyName,
        industry: sub.industry,
        region: sub.region,
        fundingAmount: sub.fundingAmount,
        readinessScore: sub.readinessScore,
        engagementScore: sub.engagementScore,
        leadActivity: sub.leadActivity,
        timestamp: sub.timestamp,
        companySize: sub.companySize
      })
      calculatedProspects.push(calc)
    }

    // Rank strictly by Expected Value & Priority Score descending
    calculatedProspects.sort((a, b) => b.priorityRankScore - a.priorityRankScore || b.expectedValueUSD - a.expectedValueUSD)

    let totalEV = 0
    let filing2500Count = 0, filing2500EV = 0
    let strat199Count = 0, strat199EV = 0
    let bundle79Count = 0, bundle79EV = 0
    let plan49Count = 0, plan49EV = 0
    let rep19Count = 0, rep19EV = 0

    for (const p of calculatedProspects) {
      totalEV += p.expectedValueUSD
      switch (p.recommendedOffer.tier) {
        case 'TIER_FILING_2500':
          filing2500Count++
          filing2500EV += p.expectedValueUSD
          break
        case 'TIER_STRATEGY_199':
          strat199Count++
          strat199EV += p.expectedValueUSD
          break
        case 'TIER_BUNDLE_79':
          bundle79Count++
          bundle79EV += p.expectedValueUSD
          break
        case 'TIER_ACTION_PLAN_49':
          plan49Count++
          plan49EV += p.expectedValueUSD
          break
        case 'TIER_REPORT_19':
          rep19Count++
          rep19EV += p.expectedValueUSD
          break
      }
    }

    const summary: ProspectGraphSummary = {
      totalLeadsAudited: calculatedProspects.length,
      totalPipelineExpectedValueUSD: Number(totalEV.toFixed(2)),
      tierBreakdown: {
        tierFiling2500Count: filing2500Count,
        tierFiling2500EV: Number(filing2500EV.toFixed(2)),
        tierStrategy199Count: strat199Count,
        tierStrategy199EV: Number(strat199EV.toFixed(2)),
        tierBundle79Count: bundle79Count,
        tierBundle79EV: Number(bundle79EV.toFixed(2)),
        tierActionPlan49Count: plan49Count,
        tierActionPlan49EV: Number(plan49EV.toFixed(2)),
        tierReport19Count: rep19Count,
        tierReport19EV: Number(rep19EV.toFixed(2))
      },
      topCashOpportunities: calculatedProspects.slice(0, 10)
    }

    return {
      rankedProspects: calculatedProspects,
      summary
    }
  }

  /**
   * Extract a targeted micro-cohort for autonomous commercial testing
   */
  public static async getTargetedCohort(
    limit = 5,
    filterTier?: ProductOfferTier
  ): Promise<ExpectedRevenueCalculation[]> {
    const { rankedProspects } = await this.buildCommercialGraph()
    if (!filterTier) {
      return rankedProspects.slice(0, limit)
    }
    return rankedProspects.filter(p => p.recommendedOffer.tier === filterTier).slice(0, limit)
  }
}
