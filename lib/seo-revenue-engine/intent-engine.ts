import { KeywordClassification, KeywordTier, CommercialIntentLevel, QueryIntentConfidence, NoActionReason } from './types'

/**
 * FSI Intent Engine (War Mode v2.0 Execution Grade)
 * 
 * 1. Categorizes queries into Tier A (Money), Tier B (Research), Tier C (Info), Tier D (Garbage)
 * 2. Computes Query Intent Confidence (0–100) & Sub-Category (Application, Eligibility, Programs, Calculator, News, Info)
 * 3. Enforces "DO NOT OPTIMIZE" Gate to prevent unmerited changes
 */

export class IntentEngine {
  private static readonly MONEY_PATTERNS = [
    'funding eligibility', 'grant application', 'apply for grants', 'business funding',
    'government grants for', 'grants for', 'funding for', 'funding program',
    'startup funding', 'commercialization grant', 'wage subsidy', 'hiring grant',
    'clean tech funding', 'manufacturing grants', 'agritech grants', 'women entrepreneur grant',
    'canada small business financing', 'csbfp', 'irap grant funding', 'sred tax credit consultant',
    'grant matching', 'funding matching', 'grant writer', 'grant consultant'
  ]

  private static readonly RESEARCH_PATTERNS = [
    'best grants', 'how to get grants', 'funding options', 'grant eligibility criteria',
    'government funding programs', 'list of grants', 'business loan options',
    'non dilutive funding', 'grant comparison', 'how much funding'
  ]

  private static readonly INFO_PATTERNS = [
    'what is irap', 'what is sred', 'what is a government grant',
    'how does sred work', 'definition', 'overview', 'meaning', 'history of'
  ]

  private static readonly NEWS_PATTERNS = [
    'news', 'announcement', 'budget update', 'press release', 'headline', 'article'
  ]

  private static readonly GARBAGE_PATTERNS = [
    'login', 'portal login', 'sign in', 'jobs at', 'career', 'salary',
    'phone number', 'customer support', 'cra hours', 'government directory free download',
    'wiki', 'wikipedia', 'pdf download free', 'free money scams'
  ]

  public static classifyKeyword(query: string): KeywordClassification {
    const q = (query || '').toLowerCase().trim()

    // 1. Check Garbage
    if (this.GARBAGE_PATTERNS.some(p => q.includes(p)) || q.length <= 3) {
      return {
        keyword: query,
        tier: 'TIER_D_GARBAGE',
        commercialIntent: 'NONE',
        intentConfidence: {
          commercialIntentPercent: 0,
          informationalIntentPercent: 0,
          newsIntentPercent: 0,
          confidenceBand: 'LOW',
          primaryIntentCategory: 'INFORMATIONAL',
          isEligibleForAggressiveMonetization: false
        },
        recommendedOfferPriceUSD: 0,
        offerName: 'None (Deprioritized)',
        reason: 'Zero commercial value or pure navigational query'
      }
    }

    // 2. Check News Queries (Confidence Calibration)
    const isNews = this.NEWS_PATTERNS.some(p => q.includes(p))
    if (isNews) {
      return {
        keyword: query,
        tier: 'TIER_C_INFORMATIONAL',
        commercialIntent: 'LOW',
        intentConfidence: {
          commercialIntentPercent: 35,
          informationalIntentPercent: 25,
          newsIntentPercent: 40,
          confidenceBand: 'LOW',
          primaryIntentCategory: 'NEWS',
          isEligibleForAggressiveMonetization: false // Do NOT inject aggressive $49 CTA on news
        },
        recommendedOfferPriceUSD: 19,
        offerName: 'Free Funding Diagnostic ($0 Lead Capture -> $19 Report)',
        reason: 'News search intent requires top-of-funnel lead capture rather than hard checkout'
      }
    }

    // 3. Application & High-Value Consultant Intent
    const isApplication = q.includes('application') || q.includes('apply') || q.includes('writer') || q.includes('consultant')
    if (isApplication) {
      return {
        keyword: query,
        tier: 'TIER_A_MONEY',
        commercialIntent: 'HIGH',
        intentConfidence: {
          commercialIntentPercent: 92,
          informationalIntentPercent: 8,
          newsIntentPercent: 0,
          confidenceBand: 'HIGH',
          primaryIntentCategory: 'APPLICATION',
          isEligibleForAggressiveMonetization: true
        },
        recommendedOfferPriceUSD: 79,
        offerName: 'Complete Self-Serve Funding Blueprint',
        reason: 'Urgent application intent routed to the highest active self-serve product'
      }
    }

    // 4. Check Tier A Money Keywords (Industry / Regional Programs)
    const isMoney = this.MONEY_PATTERNS.some(p => q.includes(p))
    const hasProvince = ['ontario', 'alberta', 'bc', 'quebec', 'calgary', 'toronto', 'vancouver', 'edmonton', 'montreal', 'pe', 'ns', 'nb', 'sk', 'mb'].some(prov => q.includes(prov))
    const hasIndustry = ['manufacturing', 'tech', 'software', 'agriculture', 'restaurant', 'retail', 'clean tech', 'biotech', 'health'].some(ind => q.includes(ind))

    if (isMoney || (hasProvince && q.includes('grant')) || (hasIndustry && q.includes('funding'))) {
      return {
        keyword: query,
        tier: 'TIER_A_MONEY',
        commercialIntent: 'HIGH',
        intentConfidence: {
          commercialIntentPercent: 84,
          informationalIntentPercent: 16,
          newsIntentPercent: 0,
          confidenceBand: 'HIGH',
          primaryIntentCategory: 'PROGRAMS',
          isEligibleForAggressiveMonetization: true
        },
        recommendedOfferPriceUSD: 49,
        offerName: 'Comprehensive Funding Action Plan & Roadmap',
        reason: 'Commercial intent targeting specific Canadian funding program/region'
      }
    }

    // 5. Check Tier B Commercial Research
    if (this.RESEARCH_PATTERNS.some(p => q.includes(p)) || q.includes('how to get') || q.includes('options')) {
      return {
        keyword: query,
        tier: 'TIER_B_COMMERCIAL_RESEARCH',
        commercialIntent: 'MEDIUM',
        intentConfidence: {
          commercialIntentPercent: 68,
          informationalIntentPercent: 32,
          newsIntentPercent: 0,
          confidenceBand: 'MEDIUM',
          primaryIntentCategory: 'ELIGIBILITY',
          isEligibleForAggressiveMonetization: true
        },
        recommendedOfferPriceUSD: 49,
        offerName: 'Personalized Funding Action Plan ($49 USD)',
        reason: 'Evaluating options and qualifying programs'
      }
    }

    // 6. Check Tier C Informational
    if (this.INFO_PATTERNS.some(p => q.includes(p)) || q.startsWith('what is') || q.startsWith('why')) {
      return {
        keyword: query,
        tier: 'TIER_C_INFORMATIONAL',
        commercialIntent: 'LOW',
        intentConfidence: {
          commercialIntentPercent: 25,
          informationalIntentPercent: 75,
          newsIntentPercent: 0,
          confidenceBand: 'HIGH',
          primaryIntentCategory: 'INFORMATIONAL',
          isEligibleForAggressiveMonetization: false
        },
        recommendedOfferPriceUSD: 19,
        offerName: 'Free Interactive Eligibility Screener ($0 Lead Capture)',
        reason: 'Informational search requiring decision-support tool conversion hook'
      }
    }

    return {
      keyword: query,
      tier: 'TIER_B_COMMERCIAL_RESEARCH',
      commercialIntent: 'MEDIUM',
      intentConfidence: {
        commercialIntentPercent: 60,
        informationalIntentPercent: 40,
        newsIntentPercent: 0,
        confidenceBand: 'MEDIUM',
        primaryIntentCategory: 'PROGRAMS',
        isEligibleForAggressiveMonetization: true
      },
      recommendedOfferPriceUSD: 49,
      offerName: 'Funding Action Plan',
      reason: 'General commercial grant query'
    }
  }

  public static evaluateNoActionGate(params: {
    keyword: string
    impressions: number
    position: number
    attackability: string
    confidenceBand: string
  }): { actionBlocked: boolean; reason?: NoActionReason; details?: string } {
    const { keyword, impressions, position, attackability, confidenceBand } = params

    if (attackability === 'LOCKED_GOV') {
      return {
        actionBlocked: true,
        reason: 'GOV_DOMINATED_SERP',
        details: 'SERP is 80%+ locked by federal/provincial portals (Canada.ca, BDC). High authority displacement barrier.'
      }
    }

    if (impressions < 150) {
      return {
        actionBlocked: true,
        reason: 'NEGLIGIBLE_DEMAND',
        details: `Monthly impressions (${impressions}) too low to justify execution resources.`
      }
    }

    if (position > 45) {
      return {
        actionBlocked: true,
        reason: 'IMPOSSIBLE_AUTHORITY_GAP',
        details: `Current position #${position.toFixed(1)} is outside credible 21-day Page-1 ranking pathway.`
      }
    }

    return { actionBlocked: false }
  }
}
