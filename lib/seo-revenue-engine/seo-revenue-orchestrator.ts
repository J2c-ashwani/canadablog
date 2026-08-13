import { OpportunityEngine } from './opportunity-engine'
import { CompetitorEngine } from './competitor-engine'
import { SEOExperimentEngine } from './experiment-engine'
import { SEOExecutionEngine } from './execution-engine'
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
 * FSI SEO Revenue Orchestrator (War Mode v2.0 Execution Grade)
 * 
 * Coordinates the full organic revenue stack:
 * GSC Data ──► Intent Engine (Confidence & Gate) ──► RTE 8-Dimension Scoring ──►
 * Competitor Forensics (Parity + Differentiation) ──► Structured Patch Generation ──►
 * Execution Engine ──► Multi-Stage Clocks ──► Revenue Hunter Monetization
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

      // Deep Competitor Forensics
      try {
        const forensics = await CompetitorEngine.analyzeCompetitorsForKeyword(opp.targetKeyword)
        opp.competitorForensics = forensics
      } catch (err) {
        console.warn(`[SEORevenueOrchestrator] Competitor forensics skipped for ${opp.targetKeyword}`)
      }

      // Generate structured patch & register experiment
      opp.generatedPatch = SEOExecutionEngine.generateStructuredPatch(opp)
      const exp = SEOExperimentEngine.createExperimentFromOpportunity(opp)

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
    lines.push('🎯 FSI DIGITAL — SEO REVENUE COMMAND (WAR MODE v2.0 EXECUTION GRADE)')
    lines.push('====================================================')
    lines.push('Revenue MTD (Historical):       $106.00 USD')
    lines.push('Post-CEO Incremental Revenue:   $0.00 USD (Active cohort observation)')
    lines.push('Incremental Revenue Target:     $2,000.00 USD / Month')
    lines.push(`Projected SEO Pipeline Gain:    +$${totalProjectedGain.toFixed(2)} USD / Month (Modelled Opportunity)\n`)

    if (topExecutable.length > 0) {
      const top = topExecutable[0]
      const opp = top.opportunity
      const rte = opp.rteScore
      const intent = opp.intentConfidence
      const diffs = opp.competitorForensics?.fsiDifferentiators || []

      lines.push('TOP SEO REVENUE OPPORTUNITY')
      lines.push('----------------------------------------------------')
      lines.push(`URL:                      https://www.fsidigital.ca${opp.urlPath}`)
      lines.push(`Keyword:                  ${opp.targetKeyword}`)
      lines.push(`Current Position:         #${opp.currentPosition.toFixed(1)}`)
      lines.push(`Impressions:              ${opp.impressions.toLocaleString()} / month`)
      lines.push(`Current CTR:              ${opp.currentCTR}% (Target: ${opp.targetCTR}%)`)
      lines.push(`Query Intent Category:    ${intent.primaryIntentCategory} (Commercial: ${intent.commercialIntentPercent}%, Confidence: ${intent.confidenceBand})`)
      lines.push(`SERP Weakness:            ${opp.serpAttackability}`)
      lines.push(`Competitor Difficulty:    ${opp.competitorDifficulty}`)
      lines.push(`Current Expected Revenue: $${opp.currentMonthlyExpectedRevenueUSD.toFixed(2)} USD / month`)
      lines.push(`Projected Monthly Gain:   +$${opp.incrementalMonthlyGainUSD.toFixed(2)} USD / month`)
      
      lines.push(`\n📊 8-DIMENSION RTE SCORE: ${rte.overallRTEScore}/100`)
      lines.push(`   • Search Intent (Speed):      ${rte.searchIntentScore}/100`)
      lines.push(`   • Competitor Coverage (Caps): ${rte.competitorCoverageScore}/100`)
      lines.push(`   • FSI Differentiation (Tools):${rte.differentiationScore}/100`)
      lines.push(`   • Freshness (2026 Status):    ${rte.freshnessScore}/100`)
      lines.push(`   • Commercial Alignment (CTA): ${rte.commercialAlignmentScore}/100`)
      lines.push(`   • Internal Authority Flow:    ${rte.internalAuthorityScore}/100`)
      lines.push(`   • Weakest Dimensions:         ${rte.weakestDimensions.join(' | ')}`)

      lines.push(`\n⚔️ COMPETITOR FORENSICS & DIFFERENTIATION:`)
      lines.push(`   • Competitor Consensus:  Standard eligibility & federal directory links`)
      lines.push(`   • Competitor Weaknesses: Bureaucratic delay (600+ words to caps), zero interactive diagnostics`)
      lines.push(`   • FSI Differentiators:   ${diffs.slice(0, 3).join('; ')}`)

      lines.push('\n🛠️ STRUCTURED EXECUTION PATCH (READY TO APPLY):')
      lines.push(`   [✓] Title: "${opp.titleMetaAttackPlan?.recommendedTitle1}"`)
      lines.push(`   [✓] Meta:  "${opp.titleMetaAttackPlan?.recommendedMetaDescription.slice(0, 95)}..."`)
      lines.push(`   [✓] Hero Answer Block: "${opp.contentAttackPlan?.answerFirstBlock100Words.slice(0, 95)}..."`)
      lines.push(`   [✓] Commercial CTAs: Hero Free Diagnostic ($0) ──► Mid-Page Action Plan ($49) ──► Strategy Session ($199)`)
      lines.push(`   [✓] Authority Routing: ${opp.internalLinkPlan?.length || 0} server-rendered contextual links configured`)
      lines.push(`   EXPERIMENT ID:    ${top.experiment.experimentId}`)
      lines.push(`   OBSERVATION CLOCK: Stage 1 (24-72h Technical) ──► Stage 2 (7d Search) ──► Stage 3 (14d Rank) ──► Stage 4 (21-28d Revenue)\n`)
    }

    if (topExecutable.length > 1) {
      lines.push('----------------------------------------------------')
      lines.push(`SECOND BEST: ${topExecutable[1].opportunity.targetKeyword} (RTE: ${topExecutable[1].opportunity.rteScore.overallRTEScore}/100 | #${topExecutable[1].opportunity.currentPosition.toFixed(1)} | ${topExecutable[1].opportunity.impressions.toLocaleString()} imp | +$${topExecutable[1].opportunity.incrementalMonthlyGainUSD.toFixed(2)}/mo) ──► https://www.fsidigital.ca${topExecutable[1].opportunity.urlPath}`)
    }
    if (topExecutable.length > 2) {
      lines.push(`THIRD BEST:  ${topExecutable[2].opportunity.targetKeyword} (RTE: ${topExecutable[2].opportunity.rteScore.overallRTEScore}/100 | #${topExecutable[2].opportunity.currentPosition.toFixed(1)} | ${topExecutable[2].opportunity.impressions.toLocaleString()} imp | +$${topExecutable[2].opportunity.incrementalMonthlyGainUSD.toFixed(2)}/mo) ──► https://www.fsidigital.ca${topExecutable[2].opportunity.urlPath}`)
    }

    lines.push('\n====================================================')
    lines.push('CEO DECISION:')
    lines.push('EXECUTE:')
    topExecutable.slice(0, 3).forEach((item, idx) => {
      lines.push(`${idx + 1}. Apply Structured Patch [${item.experiment.experimentId}] on "${item.opportunity.targetKeyword}" (+${item.opportunity.incrementalMonthlyGainUSD.toFixed(2)}/mo gain)`)
    })
    lines.push('\nDO NOT DO (GATE ENFORCED):')
    lines.push('❌ New PSEO pages (Portfolio Frozen)')
    lines.push('❌ News query hard monetization (Intent Confidence Gated)')
    lines.push('❌ Government-locked SERP attacks (NO_ACTION Gated)')
    lines.push('❌ Unmeasured SEO modifications (Experiment ID Required)')
    lines.push('====================================================')

    return lines.join('\n')
  }
}
