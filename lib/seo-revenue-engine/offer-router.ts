import { ProductOfferDefinition, PRODUCT_OFFERS, ExpectedRevenueModel } from '../revenue-hunter/models/expected-revenue'
import { KeywordClassification } from './types'

/**
 * FSI Offer Router (War Mode v1.0)
 * 
 * Routes organic search visitors and newly captured leads to their optimal paid offer tier:
 * $0 Free Diagnostic ──► $19 Report ──► $49 Action Plan ──► $79 Self-Serve Bundle
 */
export class OfferRouter {
  public static routeOrganicLeadToOffer(input: {
    keywordClassification: KeywordClassification
    fundingRequirementUSD?: number
    companySize?: string
    readinessScore?: number
  }): ProductOfferDefinition {
    const { keywordClassification, fundingRequirementUSD = 50000, companySize = '1-9', readinessScore = 50 } = input

    // 1. Enterprise / large-capital intent still routes to the highest self-serve offer.
    if (fundingRequirementUSD >= 250000 && companySize !== '1-9' && readinessScore >= 65) {
      return PRODUCT_OFFERS.TIER_BUNDLE_79
    }

    // 2. High intent must remain self-serve for solo-operator fulfillment.
    if (keywordClassification.recommendedOfferPriceUSD === 79 || readinessScore >= 60) {
      return PRODUCT_OFFERS.TIER_BUNDLE_79
    }

    // 3. Action Plan ($49) — Best general conversion sweet spot
    if (keywordClassification.tier === 'TIER_A_MONEY' || keywordClassification.recommendedOfferPriceUSD === 49) {
      return PRODUCT_OFFERS.TIER_ACTION_PLAN_49
    }

    // 4. Multi-Program Stacking ($79)
    if (keywordClassification.tier === 'TIER_B_COMMERCIAL_RESEARCH' && fundingRequirementUSD >= 100000) {
      return PRODUCT_OFFERS.TIER_BUNDLE_79
    }

    // 5. Entry-level Match Report ($19)
    return PRODUCT_OFFERS.TIER_REPORT_19
  }
}
