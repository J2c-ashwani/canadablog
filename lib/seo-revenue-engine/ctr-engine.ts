import { CTRAttackRecommendation } from './types'

/**
 * FSI CTR Attack Engine (War Mode v1.0)
 * 
 * Rules for CTR Attack Queue:
 * Impressions > 500 AND Position 5–30 AND CTR < expected CTR for position
 * 
 * Generates exact high-CTR title and meta copy using tested conversion hooks:
 * 1. Current Year Bracket [2026]
 * 2. Exact Dollar Cap Numbers ($50K-$250K)
 * 3. Urgent Direct Action (How to Apply, Eligibility Screener, Active Intakes)
 * 4. Authority Proof (Canada Approved, Step-by-Step)
 */

export class CTREngine {
  // Expected industry baseline CTR curve by Google ranking position
  private static readonly POSITION_CTR_BASELINE: Record<number, number> = {
    1: 0.28,
    2: 0.15,
    3: 0.11,
    4: 0.08,
    5: 0.06,
    6: 0.045,
    7: 0.035,
    8: 0.028,
    9: 0.022,
    10: 0.018,
    11: 0.014,
    12: 0.012,
    13: 0.010,
    14: 0.009,
    15: 0.008,
    20: 0.005,
    30: 0.002
  }

  public static getExpectedBaselineCTR(position: number): number {
    const roundedPos = Math.min(30, Math.max(1, Math.round(position)))
    if (this.POSITION_CTR_BASELINE[roundedPos]) {
      return this.POSITION_CTR_BASELINE[roundedPos]
    }
    // Interpolate
    if (roundedPos > 15 && roundedPos <= 20) return 0.006
    if (roundedPos > 20 && roundedPos <= 30) return 0.003
    return 0.001
  }

  public static isEligibleForCTRAttack(impressions: number, position: number, currentCTR: number): boolean {
    const expected = this.getExpectedBaselineCTR(position)
    return impressions >= 250 && position >= 3 && position <= 35 && currentCTR < (expected * 0.85)
  }

  public static generateCTRAttackPlan(
    keyword: string,
    urlPath: string,
    currentTitle: string,
    currentMeta: string,
    currentPosition: number,
    impressions: number,
    currentCTR: number
  ): CTRAttackRecommendation {
    const cleanKw = keyword.trim()
    const cleanKwTitle = this.toTitleCase(cleanKw)

    const expectedCTR = this.getExpectedBaselineCTR(currentPosition)
    // Target a 1.8x to 2.5x multiplier on suppressed CTRs
    const targetCTR = Math.min(0.12, Math.max(currentCTR * 2.2, expectedCTR * 1.15))
    const ctrDelta = targetCTR - currentCTR
    const additionalClicks = Math.round(impressions * ctrDelta)

    // Variant 1: Dollar Amount + Recency Hook
    const title1 = `${cleanKwTitle} [2026 Guide]: Up to $250K in Non-Dilutive Funding`
    
    // Variant 2: Eligibility & Program Checklist Hook
    const title2 = `${cleanKwTitle} (2026): Who Qualifies, Deadlines & Application Steps`

    // High-Converting Meta Description
    const meta = `Explore active 2026 ${cleanKw} programs in Canada. Calculate your eligibility in 60 seconds, view max funding caps ($25K–$500K), and download the step-by-step application roadmap.`

    return {
      currentTitle: currentTitle || `${cleanKwTitle} | FSI Digital`,
      currentMetaDescription: currentMeta || `Learn about ${cleanKw} in Canada and discover how your business can qualify.`,
      competitorBenchmarkTitles: [
        `Government of Canada — ${cleanKwTitle} Programs`,
        `Top Canadian Grants for ${cleanKwTitle} (Guide)`
      ],
      recommendedTitle1: title1,
      recommendedTitle2: title2,
      recommendedMetaDescription: meta,
      psychologicalTrigger: 'Curiosity Gap + Clear 2026 Recency + Explicit Dollar Cap Benefit ($250K)',
      expectedCTRDeltaPercent: Number((ctrDelta * 100).toFixed(2)),
      projectedAdditionalMonthlyClicks: additionalClicks
    }
  }

  private static toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
  }
}
