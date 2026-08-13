import { OpportunityEngine } from './opportunity-engine'
import { SERPIntelligenceEngine } from './serp-intelligence'
import { CompetitorEngine } from './competitor-engine'
import { SEOExperimentEngine } from './experiment-engine'
import { SEORevenueOpportunity, SEORevenueExperiment } from './types'

export interface SEORevenueOrchestrationResult {
  totalOpportunitiesAudited: number
  top20CommercialOpportunities: SEORevenueOpportunity[]
  top5ExecutableExperiments: Array<{
    opportunity: SEORevenueOpportunity
    experiment: SEORevenueExperiment
  }>
  totalPipelineProjectedMonthlyGainUSD: number
  executiveBriefText: string
}

/**
 * FSI SEO Revenue Orchestrator (War Mode v1.0)
 * 
 * Coordinates the full organic revenue stack:
 * GSC Data ──► Intent Classifier ──► Revenue Opportunity Scoring ──►
 * SERP Competitor Intelligence ──► Content/CTR Attack Plan ──►
 * SEO Revenue Experiments ──► Revenue Hunter Monetization Pipeline
 */

export class SEORevenueOrchestrator {
  public static async runWarModeAnalysis(): Promise<SEORevenueOrchestrationResult> {
    const allOpportunities = await OpportunityEngine.getScoredOpportunities()
    const top20 = allOpportunities.slice(0, 20)
    const top5 = top20.slice(0, 5)

    const top5Executable: Array<{
      opportunity: SEORevenueOpportunity
      experiment: SEORevenueExperiment
    }> = []

    let totalProjectedGain = 0

    for (let i = 0; i < top5.length; i++) {
      const opp = top5[i]
      totalProjectedGain += opp.incrementalMonthlyGainUSD

      // Enrich top opportunities with live SERP competitor intelligence
      try {
        const serp = await SERPIntelligenceEngine.analyzeKeywordSERP(opp.targetKeyword)
        opp.serpSnapshot = serp
      } catch (err) {
        console.warn(`[SEORevenueOrchestrator] SERP fetch skipped for ${opp.targetKeyword}`)
      }

      const exp = SEOExperimentEngine.createExperimentFromOpportunity(
        opp,
        opp.titleMetaAttackPlan?.recommendedTitle1 || `${opp.targetKeyword} [2026 Guide]`,
        opp.titleMetaAttackPlan?.recommendedMetaDescription || '',
        opp.contentAttackPlan?.recommendedH1 || ''
      )

      top5Executable.push({
        opportunity: opp,
        experiment: exp
      })
    }

    const executiveBriefText = this.formatSEORevenueCommand(top5Executable, totalProjectedGain)

    return {
      totalOpportunitiesAudited: allOpportunities.length,
      top20CommercialOpportunities: top20,
      top5ExecutableExperiments: top5Executable,
      totalPipelineProjectedMonthlyGainUSD: Number(totalProjectedGain.toFixed(2)),
      executiveBriefText
    }
  }

  private static formatSEORevenueCommand(
    topExecutable: Array<{ opportunity: SEORevenueOpportunity; experiment: SEORevenueExperiment }>,
    totalProjectedGain: number
  ): string {
    const lines: string[] = []
    lines.push('====================================================')
    lines.push('🎯 FSI DIGITAL — SEO REVENUE COMMAND (WAR MODE v1.0)')
    lines.push('====================================================')
    lines.push('Revenue MTD (Historical):       $106.00 USD')
    lines.push('Post-CEO Incremental Revenue:   $0.00 USD (Active cohort observation)')
    lines.push('Incremental Revenue Target:     $2,000.00 USD / Month')
    lines.push(`Projected SEO Pipeline Gain:    +$${totalProjectedGain.toFixed(2)} USD / Month\n`)

    if (topExecutable.length > 0) {
      const top = topExecutable[0]
      lines.push('TOP SEO REVENUE OPPORTUNITY')
      lines.push('----------------------------------------------------')
      lines.push(`URL:                      https://www.fsidigital.ca${top.opportunity.urlPath}`)
      lines.push(`Keyword:                  ${top.opportunity.targetKeyword}`)
      lines.push(`Current Position:         #${top.opportunity.currentPosition.toFixed(1)}`)
      lines.push(`Impressions:              ${top.opportunity.impressions.toLocaleString()} / month`)
      lines.push(`Current CTR:              ${top.opportunity.currentCTR}% (Expected: ${top.opportunity.expectedBaselineCTR}%)`)
      lines.push(`Commercial Intent:        ${top.opportunity.commercialIntent}`)
      lines.push(`SERP Weakness:            ${top.opportunity.serpAttackability}`)
      lines.push(`Competitor Difficulty:    ${top.opportunity.competitorDifficulty}`)
      lines.push(`Current Expected Revenue: $${top.opportunity.currentMonthlyExpectedRevenueUSD.toFixed(2)} USD / month`)
      lines.push(`Projected Revenue:        $${top.opportunity.projectedMonthlyExpectedRevenueUSD.toFixed(2)} USD / month (+${top.opportunity.incrementalMonthlyGainUSD.toFixed(2)} gain)`)
      lines.push('ACTION:')
      lines.push(`[ ] Rewrite title ──► "${top.opportunity.titleMetaAttackPlan?.recommendedTitle1}"`)
      lines.push(`[ ] Rewrite meta ──► "${top.opportunity.titleMetaAttackPlan?.recommendedMetaDescription.slice(0, 110)}..."`)
      lines.push(`[ ] Inject Answer Block (top 100 words) ──► "${top.opportunity.contentAttackPlan?.answerFirstBlock100Words.slice(0, 110)}..."`)
      lines.push(`[ ] Inject Hero & Mid-Page CTAs ──► Free Check ($0) & Action Plan ($49)`)
      lines.push(`[ ] Add Server-Rendered Internal Links ──► ${top.opportunity.internalLinkPlan?.length || 0} links configured`)
      lines.push(`[ ] Request Google Search Console Reindexing`)
      lines.push(`EXPERIMENT:               ${top.experiment.experimentId}`)
      lines.push('STATUS:                   READY TO DEPLOY\n')
    }

    if (topExecutable.length > 1) {
      lines.push('----------------------------------------------------')
      lines.push(`SECOND BEST: ${topExecutable[1].opportunity.targetKeyword} (#${topExecutable[1].opportunity.currentPosition.toFixed(1)} | ${topExecutable[1].opportunity.impressions.toLocaleString()} imp | +$${topExecutable[1].opportunity.incrementalMonthlyGainUSD.toFixed(2)}/mo) ──► https://www.fsidigital.ca${topExecutable[1].opportunity.urlPath}`)
    }
    if (topExecutable.length > 2) {
      lines.push(`THIRD BEST:  ${topExecutable[2].opportunity.targetKeyword} (#${topExecutable[2].opportunity.currentPosition.toFixed(1)} | ${topExecutable[2].opportunity.impressions.toLocaleString()} imp | +$${topExecutable[2].opportunity.incrementalMonthlyGainUSD.toFixed(2)}/mo) ──► https://www.fsidigital.ca${topExecutable[2].opportunity.urlPath}`)
    }

    lines.push('\n====================================================')
    lines.push('CEO DECISION:')
    lines.push('EXECUTE:')
    topExecutable.slice(0, 3).forEach((item, idx) => {
      lines.push(`${idx + 1}. Deploy [${item.experiment.experimentId}] on "${item.opportunity.targetKeyword}" (+${item.opportunity.incrementalMonthlyGainUSD.toFixed(2)}/mo target)`)
    })
    lines.push('\nDO NOT DO:')
    lines.push('❌ New PSEO pages')
    lines.push('❌ Generic blog production')
    lines.push('❌ Cosmetic redesign')
    lines.push('❌ Unmeasured SEO work')
    lines.push('====================================================')

    return lines.join('\n')
  }
}
