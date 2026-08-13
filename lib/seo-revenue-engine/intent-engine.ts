import { KeywordClassification, KeywordTier, CommercialIntentLevel } from './types'

/**
 * FSI Intent Engine (War Mode v1.0)
 * 
 * Classifies search queries into strictly separated commercial tiers:
 * Tier A — Money Keywords (High purchase/filing intent: funding eligibility, grant application, [industry] grants, [province] grants)
 * Tier B — Commercial Research (Comparison & evaluation: best grants, how to get grants, funding options)
 * Tier C — Informational (Broad definitions: what is irap, what is sred)
 * Tier D — Garbage / Deprioritized (Zero-commercial, news, queries dominated by untargetable government portals)
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
        recommendedOfferPriceUSD: 0,
        offerName: 'None (Deprioritized)',
        reason: 'Zero commercial value or pure navigational query'
      }
    }

    // 2. Check Tier A Money Keywords
    const isMoney = this.MONEY_PATTERNS.some(p => q.includes(p))
    const hasProvince = ['ontario', 'alberta', 'bc', 'quebec', 'calgary', 'toronto', 'vancouver', 'edmonton', 'montreal', 'pe', 'ns', 'nb', 'sk', 'mb'].some(prov => q.includes(prov))
    const hasIndustry = ['manufacturing', 'tech', 'software', 'agriculture', 'restaurant', 'retail', 'clean tech', 'biotech', 'health'].some(ind => q.includes(ind))

    if (isMoney || (hasProvince && q.includes('grant')) || (hasIndustry && q.includes('funding'))) {
      if (q.includes('application') || q.includes('writer') || q.includes('consultant') || (hasIndustry && isMoney)) {
        return {
          keyword: query,
          tier: 'TIER_A_MONEY',
          commercialIntent: 'HIGH',
          recommendedOfferPriceUSD: 199,
          offerName: '1-on-1 Executive Grant Strategy & Filing Assessment',
          reason: 'High transaction intent for direct capital execution'
        }
      }

      return {
        keyword: query,
        tier: 'TIER_A_MONEY',
        commercialIntent: 'HIGH',
        recommendedOfferPriceUSD: 49,
        offerName: 'Comprehensive Funding Action Plan & Roadmap',
        reason: 'Commercial intent targeting specific Canadian funding program/region'
      }
    }

    // 3. Check Tier B Commercial Research
    if (this.RESEARCH_PATTERNS.some(p => q.includes(p)) || q.includes('how to get') || q.includes('options')) {
      return {
        keyword: query,
        tier: 'TIER_B_COMMERCIAL_RESEARCH',
        commercialIntent: 'MEDIUM',
        recommendedOfferPriceUSD: 19,
        offerName: 'Custom Funding Match Report',
        reason: 'Evaluating options and qualifying programs'
      }
    }

    // 4. Check Tier C Informational
    if (this.INFO_PATTERNS.some(p => q.includes(p)) || q.startsWith('what is') || q.startsWith('why')) {
      return {
        keyword: query,
        tier: 'TIER_C_INFORMATIONAL',
        commercialIntent: 'LOW',
        recommendedOfferPriceUSD: 19,
        offerName: 'Free Interactive Eligibility Screener ($0 Lead Capture -> $19 Downsell)',
        reason: 'Informational search requiring decision-support tool conversion hook'
      }
    }

    // Default to Tier B if containing funding/grant
    if (q.includes('grant') || q.includes('funding') || q.includes('loan') || q.includes('subsidy')) {
      return {
        keyword: query,
        tier: 'TIER_B_COMMERCIAL_RESEARCH',
        commercialIntent: 'MEDIUM',
        recommendedOfferPriceUSD: 49,
        offerName: 'Comprehensive Funding Action Plan',
        reason: 'Broad grant/funding search query with commercial upside'
      }
    }

    return {
      keyword: query,
      tier: 'TIER_C_INFORMATIONAL',
      commercialIntent: 'LOW',
      recommendedOfferPriceUSD: 19,
      offerName: 'Interactive Funding Screener',
      reason: 'General informational query'
    }
  }
}
