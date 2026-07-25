/**
 * Growth OS — Signal Detection Engine
 * Filters raw scrape/update data to extract validated commercial signals.
 */

import { RevenueOpportunity, EvidenceItem } from "../types"
import { EvidenceRegistry } from "../knowledge/evidence-registry"

export interface RawScrapeItem {
  sourceUrl: string
  title: string
  rawText: string
  detectedProgram: string
  province?: string
  industry?: string
  deadlineDate?: string
}

export class SignalEngine {
  public static processRawScrape(scrape: RawScrapeItem): RevenueOpportunity | null {
    // 1. Noise Filter: Must contain commercial funding keywords
    const commercialKeywords = ["grant", "funding", "loan", "tax credit", "irap", "sr&ed", "canexport", "subsidy"]
    const textLower = `${scrape.title} ${scrape.rawText}`.toLowerCase()
    
    const matchesKeyword = commercialKeywords.some((kw) => textLower.includes(kw))
    if (!matchesKeyword) {
      console.log(`[SignalEngine] Noise filtered: '${scrape.title}' does not contain commercial funding intent.`)
      return null
    }

    // 2. Register Evidence
    const evidence: EvidenceItem = EvidenceRegistry.registerEvidence(
      scrape.sourceUrl,
      scrape.title,
      scrape.rawText.substring(0, 200),
      EvidenceRegistry.verifyUrlOfficiality(scrape.sourceUrl) ? 95 : 70
    )

    // 3. Map Buyer Segment & Product Situation
    let buyerSegment = "Canadian Business Owner"
    let recommendedProduct = "$19 Match Report"
    let targetLandingPage = "/canada/small-business-grants"
    let expectedRevenue = 150

    if (textLower.includes("irap") || textLower.includes("technology") || textLower.includes("tech")) {
      buyerSegment = `${scrape.province || "Canada"} Tech / SaaS Founder`
      recommendedProduct = "$79 Funding Bundle"
      targetLandingPage = "/blog/technology-startup-grants-2026"
      expectedRevenue = 316 // 4 sales * $79
    } else if (textLower.includes("women") || textLower.includes("female")) {
      buyerSegment = `${scrape.province || "Canada"} Women Entrepreneur`
      recommendedProduct = "$49 Action Plan"
      targetLandingPage = "/canada/women-business-grants"
      expectedRevenue = 196
    } else if (textLower.includes("manufacturing") || textLower.includes("capital")) {
      buyerSegment = `${scrape.province || "Canada"} Manufacturing Business`
      recommendedProduct = "$49 Action Plan"
      targetLandingPage = "/blog/manufacturing-grants-2026"
      expectedRevenue = 245
    }

    // 4. Construct RevenueOpportunity
    const opportunity: RevenueOpportunity = {
      id: `opp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      brandId: "fsi-digital",
      trigger: `${scrape.detectedProgram} Update: ${scrape.title}`,
      buyerSegment,
      intentLevel: "High",
      recommendedProduct,
      targetLandingPage,
      expectedRevenue,
      expectedCost: 1.5, // $1.50 compute/API cost
      expectedROI: 0,
      estimatedExecutionTime: 1200,
      priorityScore: 88,
      humanTrustScore: evidence.reliabilityScore,
      confidenceScore: 92,
      sourceType: "Government",
      expiresAt: scrape.deadlineDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      evidence: [evidence],
      status: "Discovered",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return opportunity
  }
}
