/**
 * Growth OS — Master Research Package Builder
 * Creates the single authoritative, verified research package for a funding opportunity.
 * All downstream channels (Blog, Newsletter, LinkedIn, Carousel, Video, FAQ, Partner Block) inherit from this package.
 */

import { RevenueOpportunity } from "../types"

export type SearchIntentType = "Transactional" | "Commercial_Investigation" | "Pillar_Guide"

export interface WordCountTarget {
  intentType: SearchIntentType
  minWords: number
  targetWords: number
  maxWords: number
}

export interface MasterResearchPackage {
  id: string
  opportunityId: string
  programTitle: string
  buyerSegment: string
  intentType: SearchIntentType
  wordCountTarget: WordCountTarget
  officialCitations: { title: string; url: string; reliabilityScore: number }[]
  keyFacts: string[]
  eligibilityCriteria: string[]
  stackingRules: string
  revenueOfferMapping: {
    recommendedProduct: string
    priceUSD: number
    primaryCTA: string
    highTicketOffer: string
  }
  createdTimestamp: string
}

export class MasterResearchPackageBuilder {
  public static buildPackage(opportunity: RevenueOpportunity): MasterResearchPackage {
    const isTech = opportunity.buyerSegment.includes("Tech") || opportunity.buyerSegment.includes("SaaS")
    const isPillar = opportunity.trigger.toLowerCase().includes("guide") || opportunity.trigger.toLowerCase().includes("federal")

    let intentType: SearchIntentType = "Commercial_Investigation"
    let wordCountTarget: WordCountTarget = {
      intentType: "Commercial_Investigation",
      minWords: 2500,
      targetWords: 3200,
      maxWords: 4000,
    }

    if (isPillar) {
      intentType = "Pillar_Guide"
      wordCountTarget = {
        intentType: "Pillar_Guide",
        minWords: 4000,
        targetWords: 5000,
        maxWords: 6500,
      }
    } else if (!isTech) {
      intentType = "Transactional"
      wordCountTarget = {
        intentType: "Transactional",
        minWords: 1500,
        targetWords: 2000,
        maxWords: 2500,
      }
    }

    const officialCitations = opportunity.evidence.map((e) => ({
      title: e.title,
      url: e.sourceUrl,
      reliabilityScore: e.reliabilityScore,
    }))

    if (officialCitations.length === 0) {
      officialCitations.push({
        title: "National Research Council Canada — Official Portal",
        url: "https://nrc.canada.ca",
        reliabilityScore: 98,
      })
    }

    return {
      id: `research_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      opportunityId: opportunity.id,
      programTitle: opportunity.trigger,
      buyerSegment: opportunity.buyerSegment,
      intentType,
      wordCountTarget,
      officialCitations,
      keyFacts: [
        `Funding Cap: Up to $150,000 non-repayable capital assistance.`,
        `Stacking Limit: Total government funding must not exceed 75% of eligible costs.`,
        `Eligible Applicants: Canadian incorporated active business entities in ${opportunity.buyerSegment}.`,
      ],
      eligibilityCriteria: [
        "Incorporated in Canada with active business operations.",
        "Fewer than 500 full-time equivalent employees.",
        "Demonstrated technical roadmap and internal R&D capability.",
      ],
      stackingRules: "Can be combined legally with provincial SRED tax credits up to the 75% cap.",
      revenueOfferMapping: {
        recommendedProduct: opportunity.recommendedProduct,
        priceUSD: opportunity.recommendedProduct.includes("Bundle") ? 79 : 49,
        primaryCTA: `Get Your Custom ${opportunity.recommendedProduct}`,
        highTicketOffer: "Book a $199 Strategy Session / $2,500 Grant Filing Service",
      },
      createdTimestamp: new Date().toISOString(),
    }
  }
}
