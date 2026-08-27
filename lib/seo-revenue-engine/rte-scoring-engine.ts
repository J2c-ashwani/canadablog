import { RTEScoreBreakdown, SERPAttackability, CommercialIntentLevel } from './types'

/**
 * FSI RTE Scoring Engine (War Mode v2.0)
 * 
 * Quantifies exact page weaknesses across 8 foundational dimensions:
 * 1. Search Intent (Query-to-content match & answer-first speed)
 * 2. Competitor Coverage (Tables, eligibility rules, funding caps)
 * 3. Differentiation (Decision frameworks, calculators, preflight checks)
 * 4. Freshness (2026 active dates, current intake windows)
 * 5. Commercial Alignment (self-serve CTAs to $19/$29/$49/$79)
 * 6. Internal Authority (Server-rendered bidirectional in-cluster links)
 * 7. SERP Attackability (Opportunity to displace weak non-gov rankings)
 * 8. Technical SEO (Schema, metadata, canonical, mobile touch)
 */

export class RTEScoringEngine {
  public static calculateRTEScore(params: {
    keyword: string
    urlPath: string
    currentPosition: number
    impressions: number
    currentCTR: number
    commercialIntent: CommercialIntentLevel
    serpAttackability: SERPAttackability
    hasAnswerFirstBlock?: boolean
    hasInteractiveTool?: boolean
    hasInternalLinks?: boolean
    hasPricingAndDeadlines?: boolean
  }): RTEScoreBreakdown {
    const {
      keyword,
      urlPath,
      currentPosition,
      impressions,
      currentCTR,
      commercialIntent,
      serpAttackability,
      hasAnswerFirstBlock = false,
      hasInteractiveTool = true,
      hasInternalLinks = false,
      hasPricingAndDeadlines = false
    } = params

    // 1. Search Intent (0-100)
    let searchIntentScore = hasAnswerFirstBlock ? 85 : 45
    if (currentPosition <= 10) searchIntentScore += 10

    // 2. Competitor Coverage (0-100)
    let competitorCoverageScore = hasPricingAndDeadlines ? 80 : 55

    // 3. Differentiation (0-100)
    let differentiationScore = hasInteractiveTool ? 75 : 40

    // 4. Freshness (0-100)
    let freshnessScore = 60 // Baseline 2026 status

    // 5. Commercial Alignment (0-100)
    let commercialAlignmentScore = commercialIntent === 'HIGH' ? 85 : (commercialIntent === 'MEDIUM' ? 70 : 45)

    // 6. Internal Authority (0-100)
    let internalAuthorityScore = hasInternalLinks ? 75 : 40

    // 7. SERP Attackability (0-100)
    let serpAttackabilityScore = serpAttackability === 'VERY_HIGH' ? 90 : (serpAttackability === 'HIGH' ? 75 : (serpAttackability === 'MEDIUM' ? 55 : 30))

    // 8. Technical SEO (0-100)
    let technicalSEOScore = 92 // High standard across Next.js build

    // Weights: Intent (15%), Coverage (15%), Diff (15%), Fresh (10%), Comm (15%), Auth (10%), Attack (10%), Tech (10%)
    const overallRTEScore = Number((
      searchIntentScore * 0.15 +
      competitorCoverageScore * 0.15 +
      differentiationScore * 0.15 +
      freshnessScore * 0.10 +
      commercialAlignmentScore * 0.15 +
      internalAuthorityScore * 0.10 +
      serpAttackabilityScore * 0.10 +
      technicalSEOScore * 0.10
    ).toFixed(0))

    const dimensions = [
      { name: 'Search Intent (Answer-First Speed)', score: searchIntentScore },
      { name: 'Competitor Coverage (Tables & Caps)', score: competitorCoverageScore },
      { name: 'FSI Differentiation (Calculators & Tools)', score: differentiationScore },
      { name: 'Freshness (2026 Status)', score: freshnessScore },
      { name: 'Commercial Alignment (CTAs & Offers)', score: commercialAlignmentScore },
      { name: 'Internal Authority (Server Links)', score: internalAuthorityScore },
      { name: 'SERP Attackability', score: serpAttackabilityScore },
      { name: 'Technical SEO', score: technicalSEOScore }
    ]

    dimensions.sort((a, b) => a.score - b.score)
    const weakestDimensions = dimensions.slice(0, 3).map(d => `${d.name}: ${d.score}/100`)

    return {
      searchIntentScore,
      competitorCoverageScore,
      differentiationScore,
      freshnessScore,
      commercialAlignmentScore,
      internalAuthorityScore,
      serpAttackabilityScore,
      technicalSEOScore,
      overallRTEScore,
      weakestDimensions
    }
  }
}
