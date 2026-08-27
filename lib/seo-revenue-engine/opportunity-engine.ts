import fs from 'fs'
import path from 'path'
import { SEORevenueOpportunity, RevenueOpportunityScoreBreakdown, KeywordTier, CommercialIntentLevel, SERPAttackability } from './types'
import { IntentEngine } from './intent-engine'
import { CTREngine } from './ctr-engine'
import { ContentGapEngine } from './content-gap-engine'
import { InternalLinkEngine } from './internal-link-engine'
import { RTEScoringEngine } from './rte-scoring-engine'
import { SEOExecutionEngine } from './execution-engine'

/**
 * FSI Opportunity Engine (War Mode v2.0 Execution Grade)
 * 
 * Ingests GSC performance data, filters through the NO_ACTION gate,
 * calculates 8-dimension RTE Scores, computes expected revenue,
 * and generates ready-to-deploy structured patches.
 */

export class OpportunityEngine {
  public static async getScoredOpportunities(): Promise<SEORevenueOpportunity[]> {
    const rawData = this.loadGSCData()
    const opportunities: SEORevenueOpportunity[] = []

    for (const item of rawData) {
      const classification = IntentEngine.classifyKeyword(item.query)
      
      // Strict War Mode: Deprioritize Tier D Garbage completely
      if (classification.tier === 'TIER_D_GARBAGE') continue

      const position = item.position || 15
      const impressions = item.impressions || 100
      const clicks = item.clicks || 0
      const currentCTR = impressions > 0 ? clicks / impressions : 0.005
      const expectedBaselineCTR = CTREngine.getExpectedBaselineCTR(position)
      const targetCTR = Math.min(0.12, Math.max(currentCTR * 2.2, expectedBaselineCTR * 1.15))

      const serpAttackability: SERPAttackability = position <= 15 ? 'VERY_HIGH' : (position <= 30 ? 'HIGH' : 'MEDIUM')

      // NO_ACTION Gate Evaluation
      const gateResult = IntentEngine.evaluateNoActionGate({
        keyword: item.query,
        impressions,
        position,
        attackability: serpAttackability,
        confidenceBand: classification.intentConfidence.confidenceBand
      })

      if (gateResult.actionBlocked) {
        continue // Gate blocked
      }

      // Commercial Offer & Conversion Modeling (Conditioned on Intent Category)
      let offerPrice = classification.recommendedOfferPriceUSD || 49
      if (classification.intentConfidence.primaryIntentCategory === 'NEWS') {
        offerPrice = 19 // Downgrade news queries to soft $19 / $0 diagnostic
      }
      offerPrice = offerPrice >= 79 ? 79 : offerPrice >= 49 ? 49 : 19

      const offerTier = offerPrice === 79 ? 'TIER_BUNDLE_79' : (offerPrice === 49 ? 'TIER_ACTION_PLAN_49' : 'TIER_REPORT_19')
      
      // Expected Conversion Rate:
      // Current self-serve planning assumptions: $19 ~2.5%, $49 ~1.8%, $79 ~1.2%.
      const convRate = offerPrice === 79 ? 0.012 : (offerPrice === 49 ? 0.018 : 0.025)

      const currentMonthlyExpectedRevenueUSD = Number((impressions * currentCTR * convRate * offerPrice).toFixed(2))
      const projectedMonthlyExpectedRevenueUSD = Number((impressions * targetCTR * convRate * offerPrice).toFixed(2))
      const incrementalMonthlyGainUSD = Number(Math.max(0, projectedMonthlyExpectedRevenueUSD - currentMonthlyExpectedRevenueUSD).toFixed(2))

      // 1. Calculate Revenue Opportunity Score (0 to 100)
      const demandScore = Math.min(100, (impressions / 2000) * 100)
      const rankProbScore = position <= 10 ? 90 : (position <= 20 ? 70 : 45)
      const ctrOppScore = CTREngine.isEligibleForCTRAttack(impressions, position, currentCTR) ? 95 : 50
      const commercialIntentScore = classification.intentConfidence.commercialIntentPercent
      const serpWeaknessScore = item.urlPath.includes('/grants/') || item.urlPath.includes('/topics/') ? 85 : 65
      const conversionPotentialScore = offerPrice >= 49 ? 90 : 60
      const competitiveFeasibilityScore = position <= 25 ? 80 : 50

      const compositeScore = Number((
        demandScore * 0.20 +
        rankProbScore * 0.15 +
        ctrOppScore * 0.15 +
        commercialIntentScore * 0.20 +
        serpWeaknessScore * 0.10 +
        conversionPotentialScore * 0.10 +
        competitiveFeasibilityScore * 0.10
      ).toFixed(1))

      const scoreBreakdown: RevenueOpportunityScoreBreakdown = {
        searchDemandScore: demandScore,
        rankingProbabilityScore: rankProbScore,
        ctrOpportunityScore: ctrOppScore,
        commercialIntentScore,
        serpWeaknessScore,
        conversionPotentialScore,
        competitiveFeasibilityScore,
        compositeScore
      }

      // 2. Calculate 8-Dimension RTE Score
      const rteScore = RTEScoringEngine.calculateRTEScore({
        keyword: item.query,
        urlPath: item.urlPath,
        currentPosition: position,
        impressions,
        currentCTR,
        commercialIntent: classification.commercialIntent,
        serpAttackability,
        hasAnswerFirstBlock: false,
        hasInteractiveTool: true,
        hasInternalLinks: false,
        hasPricingAndDeadlines: false
      })

      // 3. Generate Plans & Patch
      const titleMetaPlan = CTREngine.generateCTRAttackPlan(
        item.query,
        item.urlPath,
        '',
        '',
        position,
        impressions,
        currentCTR
      )

      const contentAttackPlan = ContentGapEngine.generateContentAttackPlan(item.query)
      const internalLinkPlan = InternalLinkEngine.generateInternalLinkPlan(item.urlPath, item.query)

      const opportunityObj: SEORevenueOpportunity = {
        id: `opp_${opportunities.length + 1}_${item.query.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 20)}`,
        urlPath: item.urlPath,
        targetKeyword: item.query,
        keywordTier: classification.tier,
        currentPosition: position,
        impressions,
        clicks,
        currentCTR: Number((currentCTR * 100).toFixed(2)),
        expectedBaselineCTR: Number((expectedBaselineCTR * 100).toFixed(2)),
        targetCTR: Number((targetCTR * 100).toFixed(2)),
        commercialIntent: classification.commercialIntent,
        intentConfidence: classification.intentConfidence,
        serpAttackability,
        competitorDifficulty: position <= 10 ? 'LOW' : (position <= 25 ? 'MEDIUM' : 'HIGH'),
        recommendedOfferTier: offerTier,
        offerPriceUSD: offerPrice,
        currentMonthlyExpectedRevenueUSD,
        projectedMonthlyExpectedRevenueUSD,
        incrementalMonthlyGainUSD,
        revenueScore: scoreBreakdown,
        rteScore,
        titleMetaAttackPlan: titleMetaPlan,
        contentAttackPlan,
        internalLinkPlan
      }

      // Generate Structured Patch
      opportunityObj.generatedPatch = SEOExecutionEngine.generateStructuredPatch(opportunityObj)

      opportunities.push(opportunityObj)
    }

    // Rank strictly by Revenue Opportunity Score & Incremental Gain
    opportunities.sort((a, b) => b.revenueScore.compositeScore - a.revenueScore.compositeScore || b.incrementalMonthlyGainUSD - a.incrementalMonthlyGainUSD)

    return opportunities
  }

  private static loadGSCData(): Array<{ query: string; urlPath: string; impressions: number; clicks: number; position: number }> {
    const defaultData = [
      { query: 'ontario small business grants 2026', urlPath: '/topics/ontario-small-business-grants', impressions: 4800, clicks: 22, position: 7.4 },
      { query: 'alberta business grants funding programs', urlPath: '/topics/alberta-innovates-grant', impressions: 4100, clicks: 18, position: 8.9 },
      { query: 'women entrepreneurship grant application', urlPath: '/topics/women-entrepreneur-grants-canada', impressions: 3600, clicks: 15, position: 6.8 },
      { query: 'manufacturing grants alberta', urlPath: '/grants/ab/calgary/manufacturing', impressions: 3200, clicks: 14, position: 8.2 },
      { query: 'bc tech grant funding eligibility', urlPath: '/topics/bc-tech-grant', impressions: 2900, clicks: 11, position: 9.1 },
      { query: 'canada small business financing program csbfp', urlPath: '/topics/csbfp-loans-canada', impressions: 5100, clicks: 19, position: 11.5 },
      { query: 'clean tech government grants canada', urlPath: '/topics/clean-tech-grants-canada', impressions: 2400, clicks: 9, position: 12.3 },
      { query: 'hiring wage subsidies canada small business', urlPath: '/topics/hiring-wage-subsidies-canada', impressions: 3100, clicks: 12, position: 10.4 },
      { query: 'sred tax credit application guide', urlPath: '/programs/sred-tax-credit', impressions: 3800, clicks: 16, position: 13.0 },
      { query: 'irap grant funding eligibility consultant', urlPath: '/programs/irap-grant', impressions: 2200, clicks: 8, position: 14.1 }
    ]

    try {
      const gscQueriesPath = path.join(process.cwd(), '3monthGSCdata', 'Queries.csv')
      if (fs.existsSync(gscQueriesPath)) {
        const content = fs.readFileSync(gscQueriesPath, 'utf8')
        const lines = content.split('\n').filter(Boolean)
        const parsed: Array<{ query: string; urlPath: string; impressions: number; clicks: number; position: number }> = []

        for (let i = 1; i < lines.length && parsed.length < 165; i++) {
          const parts = lines[i].split(',')
          if (parts.length >= 5) {
            const query = parts[0].trim().replace(/^"|"$/g, '')
            const clicks = parseInt(parts[1], 10) || 0
            const impressions = parseInt(parts[2], 10) || 0
            const position = parseFloat(parts[4]) || 15

            if (query && impressions > 100) {
              const urlPath = this.inferUrlPathForQuery(query)
              parsed.push({ query, urlPath, impressions, clicks, position })
            }
          }
        }

        if (parsed.length > 0) return parsed
      }
    } catch (e) {
      console.warn('[OpportunityEngine] Could not read GSC CSV files, using canonical dataset:', e)
    }

    return defaultData
  }

  private static inferUrlPathForQuery(query: string): string {
    const q = query.toLowerCase()
    if (q.includes('ontario')) return '/topics/ontario-small-business-grants'
    if (q.includes('alberta')) return '/topics/alberta-innovates-grant'
    if (q.includes('bc') || q.includes('british columbia')) return '/topics/bc-tech-grant'
    if (q.includes('women')) return '/topics/women-entrepreneur-grants-canada'
    if (q.includes('clean tech')) return '/topics/clean-tech-grants-canada'
    if (q.includes('irap')) return '/programs/irap-grant'
    if (q.includes('sred')) return '/programs/sred-tax-credit'
    if (q.includes('csbfp') || q.includes('loan')) return '/topics/csbfp-loans-canada'
    if (q.includes('hiring') || q.includes('wage')) return '/topics/hiring-wage-subsidies-canada'
    return `/grants/${q.replace(/\s+/g, '-').slice(0, 30)}`
  }
}
