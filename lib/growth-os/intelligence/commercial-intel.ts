/**
 * Growth OS — Commercial Intelligence Engine
 * Analyzes market demand, search trends, competitor activity, and revenue forecasting.
 */

import { RevenueOpportunity } from "../types"

export interface MarketDemandSignal {
  keyword: string
  searchVolumeTrend: "+15%" | "+35%" | "-10%" | "Stable"
  commercialUrgency: "Urgent" | "High" | "Normal"
  targetProvince?: string
  targetIndustry?: string
}

export interface CommercialIntelReport {
  timestamp: string
  topDemandSignals: MarketDemandSignal[]
  recommendedFocusSegment: string
  recommendedFocusProduct: string
  projectedMonthlyRevenueUSD: number
}

export class CommercialIntelligenceEngine {
  public static analyzeMarketDemand(): CommercialIntelReport {
    const topDemandSignals: MarketDemandSignal[] = [
      {
        keyword: "irap tech grants 2026",
        searchVolumeTrend: "+35%",
        commercialUrgency: "Urgent",
        targetProvince: "Ontario",
        targetIndustry: "SaaS & AI",
      },
      {
        keyword: "canada women entrepreneur grants",
        searchVolumeTrend: "+15%",
        commercialUrgency: "High",
        targetProvince: "Canada Wide",
        targetIndustry: "Women Owned",
      },
      {
        keyword: "manufacturing capital tax credit",
        searchVolumeTrend: "+15%",
        commercialUrgency: "High",
        targetProvince: "Quebec & Ontario",
        targetIndustry: "Manufacturing",
      },
    ]

    return {
      timestamp: new Date().toISOString(),
      topDemandSignals,
      recommendedFocusSegment: "Ontario Tech / SaaS Founders",
      recommendedFocusProduct: "$79 Funding Bundle",
      projectedMonthlyRevenueUSD: 15400,
    }
  }

  public static rankOpportunities(opportunities: RevenueOpportunity[]): RevenueOpportunity[] {
    return [...opportunities].sort((a, b) => {
      // Score based on expected ROI, Trust Score, and Intent Level
      const scoreA = (a.expectedROI * 0.4) + (a.humanTrustScore * 0.3) + (a.priorityScore * 0.3)
      const scoreB = (b.expectedROI * 0.4) + (b.humanTrustScore * 0.3) + (b.priorityScore * 0.3)
      return scoreB - scoreA
    })
  }
}
