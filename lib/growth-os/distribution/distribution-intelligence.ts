/**
 * Growth OS — Distribution Intelligence Engine
 * Identifies high-growth traffic opportunities and decides where FSI Digital should appear today.
 */

import { RevenueOpportunity } from "../types"

export interface DistributionImpact {
  expectedReach: number
  expectedTraffic: number
  expectedLeadGeneration: number
  expectedRevenue: number
  confidence: number
}

export interface DistributionOpportunity {
  id: string
  title: string
  audience: string
  objective: "Traffic" | "Leads" | "Partnership" | "Brand"
  channels: ("Blog" | "LinkedIn" | "Newsletter" | "PartnerBlock" | "SocialCarousel" | "VideoScript")[]
  impact: DistributionImpact
  priorityScore: number
  evidence: string[]
  createdAt: string
}

export class DistributionIntelligenceEngine {
  public static evaluateDistributionOpportunity(opportunity: RevenueOpportunity): DistributionOpportunity {
    const isTech = opportunity.buyerSegment.includes("Tech") || opportunity.buyerSegment.includes("SaaS")
    const isWomen = opportunity.buyerSegment.includes("Women")
    const isManufacturing = opportunity.buyerSegment.includes("Manufacturing")

    let expectedReach = 2500
    let expectedTraffic = 120
    let expectedLeads = 18
    let objective: DistributionOpportunity["objective"] = "Traffic"

    if (isTech) {
      expectedReach = 8500
      expectedTraffic = 340
      expectedLeads = 42
      objective = "Leads"
    } else if (isWomen) {
      expectedReach = 4500
      expectedTraffic = 210
      expectedLeads = 28
      objective = "Traffic"
    } else if (isManufacturing) {
      expectedReach = 3200
      expectedTraffic = 150
      expectedLeads = 22
      objective = "Partnership"
    }

    const expectedRevenue = Math.round(expectedLeads * 0.12 * 79) // 12% conv to $79 Bundle

    return {
      id: `dist_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: `Multi-Channel Distribution: ${opportunity.trigger}`,
      audience: opportunity.buyerSegment,
      objective,
      channels: ["Blog", "LinkedIn", "Newsletter", "PartnerBlock", "SocialCarousel", "VideoScript"],
      impact: {
        expectedReach,
        expectedTraffic,
        expectedLeadGeneration: expectedLeads,
        expectedRevenue,
        confidence: 90,
      },
      priorityScore: opportunity.priorityScore,
      evidence: opportunity.evidence.map((e) => e.sourceUrl),
      createdAt: new Date().toISOString(),
    }
  }
}
