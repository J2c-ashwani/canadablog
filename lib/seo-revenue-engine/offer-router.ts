import { ProductOfferDefinition, PRODUCT_OFFERS, ExpectedRevenueModel } from '../revenue-hunter/models/expected-revenue'
import { KeywordClassification } from './types'

/**
 * FSI Offer Router (War Mode v1.0)
 * 
 * Routes organic search visitors and newly captured leads to their optimal paid offer tier:
 * $0 Free Diagnostic ──► $19 Report ──► $49 Action Plan ──► $79 Bundle ──► $199 Strategy ──► $2,500 Filing
 */
export class OfferRouter {
  public static routeOrganicLeadToOffer(input: {
    keywordClassification: KeywordClassification
    fundingRequirementUSD?: number
    companySize?: string
    readinessScore?: number
  }): ProductOfferDefinition {
    const { keywordClassification, fundingRequirementUSD = 50000, companySize = '1-9', readinessScore = 50 } = input

    // 1. Enterprise / Large Capital
    if (fundingRequirementUSD >= 250000 && companySize !== '1-9' && readinessScore >= 65) {
      return PRODUCT_OFFERS.TIER_FILING_2500
    }

    // 2. High-Intent / Strategy Session
    if (keywordClassification.recommendedOfferPriceUSD === 199 || readinessScore >= 60) {
      return PRODUCT_OFFERS.TIER_STRATEGY_199
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
