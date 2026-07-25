/**
 * Growth OS — Distribution Intelligence Engine
 * Evaluates distribution opportunities with predicted impact metrics.
 */

import { RevenueOpportunity } from "../types"

export interface PredictedDistributionImpact {
  predictedReach: number
  predictedTraffic: number
  predictedLeadGeneration: number
  predictedRevenue: number
  confidence: number
}

export interface DistributionOpportunity {
  id: string
  title: string
  audience: string
  objective: "Traffic" | "Leads" | "Partnership" | "Brand"
  channels: ("Blog" | "LinkedIn" | "Newsletter" | "PartnerBlock" | "SocialCarousel" | "VideoScript")[]
  predictedImpact: PredictedDistributionImpact
  priorityScore: number
  evidence: string[]
  createdAt: string
}

export class DistributionIntelligenceEngine {
  public static evaluateDistributionOpportunity(opportunity: RevenueOpportunity): DistributionOpportunity {
    const isTech = opportunity.buyerSegment.includes("Tech") || opportunity.buyerSegment.includes("SaaS")
    const isWomen = opportunity.buyerSegment.includes("Women")
    const isManufacturing = opportunity.buyerSegment.includes("Manufacturing")

    let predictedReach = 2500
    let predictedTraffic = 120
    let predictedLeads = 18
    let objective: DistributionOpportunity["objective"] = "Traffic"

    if (isTech) {
      predictedReach = 8500
      predictedTraffic = 340
      predictedLeads = 42
      objective = "Leads"
    } else if (isWomen) {
      predictedReach = 4500
      predictedTraffic = 210
      predictedLeads = 28
      objective = "Traffic"
    } else if (isManufacturing) {
      predictedReach = 3200
      predictedTraffic = 150
      predictedLeads = 22
      objective = "Partnership"
    }

    const predictedRevenue = Math.round(predictedLeads * 0.12 * 79) // 12% conv to $79 Bundle

    return {
      id: `dist_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: `Multi-Channel Distribution: ${opportunity.trigger}`,
      audience: opportunity.buyerSegment,
      objective,
      channels: ["Blog", "LinkedIn", "Newsletter", "PartnerBlock", "SocialCarousel", "VideoScript"],
      predictedImpact: {
        predictedReach,
        predictedTraffic,
        predictedLeadGeneration: predictedLeads,
        predictedRevenue,
        confidence: 90,
      },
      priorityScore: opportunity.priorityScore,
      evidence: opportunity.evidence.map((e) => e.sourceUrl),
      createdAt: new Date().toISOString(),
    }
  }
}
