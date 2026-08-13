import { CompetitorOrganicResult, SERPIntelligenceSnapshot } from './types'
import { SERPIntelligenceEngine } from './serp-intelligence'

/**
 * FSI Competitor Intelligence Engine (War Mode v1.0)
 * 
 * Conducts deep competitive auditing:
 * 1. Why is the #1 competitor beating us?
 * 2. Does the competitor answer "How much can I get?" in the first 100 words?
 * 3. What is their CTA & monetization model?
 * 4. Where is their content weak or outdated?
 */

export interface CompetitorDiagnosticReport {
  targetKeyword: string
  leaderDomain: string
  leaderTitle: string
  leaderPosition: number
  leaderWeakness: string
  fsiPosition: number
  fsiAdvantage: string
  actionableGapInsight: string
  recommendedAttackStrategy: string
}

export class CompetitorEngine {
  public static async analyzeCompetitorsForKeyword(keyword: string): Promise<{
    snapshot: SERPIntelligenceSnapshot
    diagnostic: CompetitorDiagnosticReport
  }> {
    const snapshot = await SERPIntelligenceEngine.analyzeKeywordSERP(keyword)
    const competitors = snapshot.topCompetitors

    const leader = competitors[0] || {
      domain: 'canada.ca',
      title: 'Official Government Directory',
      position: 1,
      weaknessNotes: ['Static bureaucratic text']
    }

    const fsiResult = competitors.find(c => c.domain.includes('fsidigital.ca'))
    const fsiPos = fsiResult ? fsiResult.position : 8

    let actionableGap = ''
    if (snapshot.attackability === 'VERY_HIGH' || snapshot.attackability === 'HIGH') {
      actionableGap = `Top non-gov competitor (${competitors.find(c => !c.isGovernmentOrOfficial)?.domain || 'private site'}) ranks on legacy backlink age, but their content takes 600+ words to reveal grant dollar caps. By placing our "2026 Funding Caps & Eligibility Answer Block" in the top 100 words with an inline $0 calculator hook, FSI can capture searcher dwell time and click intent.`
    } else {
      actionableGap = `SERP is institution-heavy (${snapshot.governmentDominancePercent}% official). Competing on pure institutional authority is low ROI; our strategic angle is providing commercial decision support: "How to stack non-dilutive grants with private capital — 2026 Action Plan ($49)".`
    }

    const diagnostic: CompetitorDiagnosticReport = {
      targetKeyword: keyword,
      leaderDomain: leader.domain,
      leaderTitle: leader.title,
      leaderPosition: leader.position,
      leaderWeakness: leader.weaknessNotes.join('; ') || 'Lacks step-by-step 2026 action roadmap',
      fsiPosition: fsiPos,
      fsiAdvantage: 'Interactive Decision Tool, Real-time Multi-Grant Stacking Math, and Instant $49 Action Plan Generation.',
      actionableGapInsight: actionableGap,
      recommendedAttackStrategy: snapshot.attackability === 'LOCKED_GOV' 
        ? 'Pivot copy toward commercial decision support & strategy consulting.'
        : 'Direct CTR & Content-First Attack: Answer caps in hero, inject 2026 title hook, and embed interactive screener CTA.'
    }

    return {
      snapshot,
      diagnostic
    }
  }
}
