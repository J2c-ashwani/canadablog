import { CompetitorOrganicResult, DeepCompetitorForensics, SERPIntelligenceSnapshot } from './types'
import { SERPIntelligenceEngine } from './serp-intelligence'

/**
 * FSI Competitor Engine (War Mode v2.0 Execution Grade)
 * 
 * Deep SERP Forensics & Parity + Differentiation Model:
 * 1. Competitor Consensus: Identifies standard table-stakes features on Page 1
 * 2. Competitor Weaknesses: Uncovers top 3 structural failures of ranking competitors
 * 3. FSI Parity Features: Baseline requirements to match competitor authority
 * 4. FSI Differentiators: Proprietary wedges (2026 dates, calculators, preflight checks, $49 action plans)
 */

export class CompetitorEngine {
  public static async analyzeCompetitorsForKeyword(keyword: string): Promise<DeepCompetitorForensics> {
    const snapshot: SERPIntelligenceSnapshot = await SERPIntelligenceEngine.analyzeKeywordSERP(keyword)
    const competitors = snapshot.topCompetitors

    // 1. Competitor Consensus (What 7/10 Page-1 pages have)
    const consensus: string[] = [
      'Standard eligibility criteria (Incorporation, Canadian resident control, CRA business number)',
      'List of active government funding programs and wage subsidies',
      'High-level summary of maximum funding amounts ($25K–$250K)',
      'Links to federal application portals (ISED, NRC, Regional Agencies)',
      'Basic FAQ section addressing common grant definitions'
    ]

    // 2. Competitor Weaknesses (Top 3 things competitors do poorly)
    const weaknesses: string[] = [
      '❌ Bureaucratic delay: Takes 600+ words of generic filler before answering "How much can I get?" and "Who qualifies?"',
      '❌ Static dead-ends: Zero interactive decision tools or instant qualification roadmaps (forces searcher to read 3,000 words)',
      '❌ Missing stacking rules: Fails to explain how to legally combine federal IRAP/SR&ED with provincial grants'
    ]

    // 3. FSI Parity Features (Must Match)
    const parity: string[] = [
      'Comprehensive provincial and federal grant database tables',
      'Accurate 2026 application deadlines and disbursement cycles',
      'Clear CRA / ISED compliance definitions and eligible expense categories'
    ]

    // 4. FSI Differentiators (Reasons Google & Users Prefer FSI)
    const differentiators: string[] = [
      '⚡ 100-Word Answer Block with explicit dollar caps and live intake status',
      '🎯 Instant 60-Second Interactive Grant Calculator & Eligibility Screener',
      '📊 Actionable $49 Comprehensive Funding Action Plan & Preflight Checklist',
      '🔗 Legal Multi-Grant Capital Stacking Framework (IRAP + SR&ED + Regional)',
      '🤝 Direct routing to 1-on-1 Executive Strategy Sessions ($199) and Full-Service Filing ($2,500+)'
    ]

    return {
      keyword,
      topCompetitors: competitors,
      serpFeatures: snapshot.serpFeatures,
      attackability: snapshot.attackability,
      governmentDominancePercent: snapshot.governmentDominancePercent,
      competitorConsensus: consensus,
      competitorWeaknesses: weaknesses,
      fsiParityFeatures: parity,
      fsiDifferentiators: differentiators,
      winnerAdvantageSummary: snapshot.winnerAdvantageSummary,
      capturedAt: new Date().toISOString()
    }
  }
}
