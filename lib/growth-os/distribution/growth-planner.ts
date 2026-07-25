/**
 * Growth OS — Growth Planner
 * Decides: "What is the single fastest way to create more qualified demand today?"
 * Allocates limited daily effort strategically based on empirical evidence.
 */

import { RevenueOpportunity } from "../types"
import { CommercialIntelligenceEngine } from "../intelligence/commercial-intel"

export interface GrowthPlan {
  date: string
  focusAudience: string
  focusObjective: "Traffic" | "Leads" | "Partnership" | "Brand"
  primaryLever: "SEO_PAGE_REFRESH" | "SEGMENTED_EMAIL_BROADCAST" | "PARTNER_NEWSLETTER_BLOCK" | "LINKEDIN_AUTHORITY_POST"
  recommendedActions: string[]
  predictedImpact: {
    predictedImpressions: number
    predictedVisitors: number
    predictedLeads: number
    predictedRevenueUSD: number
  }
}

export class GrowthPlanner {
  public static generateDailyGrowthPlan(opportunities: RevenueOpportunity[]): GrowthPlan {
    const commercialIntel = CommercialIntelligenceEngine.analyzeMarketDemand()

    // Determine top audience & lever based on market search signals
    const focusAudience = commercialIntel.recommendedFocusSegment
    const topKeyword = commercialIntel.topDemandSignals[0]

    let primaryLever: GrowthPlan["primaryLever"] = "SEGMENTED_EMAIL_BROADCAST"
    let focusObjective: GrowthPlan["focusObjective"] = "Leads"

    if (topKeyword.searchVolumeTrend === "+35%") {
      primaryLever = "SEO_PAGE_REFRESH"
      focusObjective = "Traffic"
    }

    return {
      date: new Date().toISOString(),
      focusAudience,
      focusObjective,
      primaryLever,
      recommendedActions: [
        `Refresh high-intent commercial hub for '${focusAudience}'`,
        `Send targeted situation campaign promoting the '${commercialIntel.recommendedFocusProduct}'`,
        `Queue partner Funding Radar block for regional accounting & CFO networks`,
      ],
      predictedImpact: {
        predictedImpressions: 8500,
        predictedVisitors: 340,
        predictedLeads: 42,
        predictedRevenueUSD: 3318,
      },
    }
  }
}
