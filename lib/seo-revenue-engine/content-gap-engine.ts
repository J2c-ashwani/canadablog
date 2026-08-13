import { ContentAttackPlan } from './types'

/**
 * FSI Content Gap Engine (War Mode v1.0)
 * 
 * Generates exact copy upgrades that win SERPs by placing direct answers
 * in the first 100 words, embedding interactive qualification hooks,
 * and deploying high-conversion commercial CTAs.
 */

export class ContentGapEngine {
  public static generateContentAttackPlan(keyword: string, currentH1?: string): ContentAttackPlan {
    const cleanKw = keyword.trim()
    const titleKw = this.toTitleCase(cleanKw)

    const recH1 = `${titleKw} (2026): Eligibility, Active Programs & Funding Caps`

    const answerFirstBlock = `Canadian businesses pursuing ${cleanKw} can secure between $25,000 and $500,000 in non-dilutive capital and wage subsidies across federal and provincial programs in 2026. Eligibility requires active incorporation in Canada, at least 1–3 full-time staff (or verified R&D activity), and minimum co-funding capacity of 25%–50%. Applications for major Q3/Q4 2026 intake windows are currently open with continuous rolling intakes across regional development agencies.`

    const mustInclude = [
      '⚡ 2026 Funding Snapshot (Max caps, co-pay %, disbursement speed)',
      '🎯 Core Eligibility Screener (Incorporation, team size, eligible expenses)',
      '🏆 Top Active Programs (Federal, Provincial & Sector-Specific)',
      '🔗 Multi-Program Stacking Rules (How to combine with IRAP / SR&ED legally)',
      '⚠️ 5 Critical Application Rejection Pitfalls and How to Avoid Them',
      '📋 Step-by-Step Document Preflight Checklist'
    ]

    const missingTopics = [
      'Specific dollar caps broken down by technology readiness level (TRL)',
      'Exact deadline dates for the 2026 fiscal cycle',
      'Tax credit stacking interactions with non-repayable grants',
      'Direct contact routing to program delivery officers'
    ]

    const commercialCTAs = {
      heroCTA: `🔎 Check Your 2026 ${titleKw} Eligibility (Free 60-Second Diagnostic) ──► Instant Funding Report ($0)`,
      midPageCTA: `📊 Accelerate Your Application: Download the Comprehensive ${titleKw} Action Plan & Preflight Checklist ($49 USD) ──► https://www.fsidigital.ca/checkout?product=action_plan_49`,
      bottomStrategyCTA: `🎯 Book a 1-on-1 Executive Funding Strategy Session ($199 USD) with an FSI Capital Specialist ──► https://www.fsidigital.ca/checkout?product=strategy_session_199`,
      highTicketFilingCTA: `💼 Full-Service Grant Filing & Technical Writing Engagement ($2,500+ USD) ──► https://www.fsidigital.ca/contact?service=grant_filing_2500`
    }

    return {
      currentH1: currentH1 || `${titleKw} Overview`,
      recommendedH1: recH1,
      answerFirstBlock100Words: answerFirstBlock,
      mustIncludeSections: mustInclude,
      missingTopics,
      commercialCTABlocks: commercialCTAs
    }
  }

  private static toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
  }
}
