/**
 * FSI Digital — SEO Revenue Engine Core Type Definitions
 * 
 * Defines data contracts for:
 * 1. SERP Intelligence & Live Competitor Audit
 * 2. Keyword Classification (Tiers A-D)
 * 3. Revenue Opportunity Score & Expected Monthly Revenue ($EV)
 * 4. CTR Attack Queue & Content Gap Plan
 * 5. Server-rendered Internal Link Graph
 * 6. SEO Revenue Experiment Tracker
 */

export type KeywordTier = 'TIER_A_MONEY' | 'TIER_B_COMMERCIAL_RESEARCH' | 'TIER_C_INFORMATIONAL' | 'TIER_D_GARBAGE'

export type SERPAttackability = 'VERY_HIGH' | 'HIGH' | 'MEDIUM' | 'LOW' | 'LOCKED_GOV'

export type CommercialIntentLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE'

export interface CompetitorOrganicResult {
  position: number
  title: string
  link: string
  domain: string
  snippet: string
  isGovernmentOrOfficial: boolean
  isThinOrOutdated: boolean
  estimatedWordCount?: number
  hasPricingOrAmounts?: boolean
  hasFaqSchema?: boolean
  hasCommercialCTA?: boolean
  weaknessNotes: string[]
}

export interface SERPIntelligenceSnapshot {
  keyword: string
  totalResultsCount?: number
  topCompetitors: CompetitorOrganicResult[]
  serpFeatures: string[]
  attackability: SERPAttackability
  governmentDominancePercent: number // e.g. 80% if 8/10 are gov
  winnerAdvantageSummary: string
  primaryContentGaps: string[]
  capturedAt: string
}

export interface KeywordClassification {
  keyword: string
  tier: KeywordTier
  commercialIntent: CommercialIntentLevel
  recommendedOfferPriceUSD: number
  offerName: string
  reason: string
}

export interface RevenueOpportunityScoreBreakdown {
  searchDemandScore: number // 20%
  rankingProbabilityScore: number // 15%
  ctrOpportunityScore: number // 15%
  commercialIntentScore: number // 20%
  serpWeaknessScore: number // 10%
  conversionPotentialScore: number // 10%
  competitiveFeasibilityScore: number // 10%
  compositeScore: number // 0 to 100
}

export interface SEORevenueOpportunity {
  id: string
  urlPath: string
  targetKeyword: string
  keywordTier: KeywordTier
  currentPosition: number
  impressions: number
  clicks: number
  currentCTR: number
  expectedBaselineCTR: number
  targetCTR: number
  commercialIntent: CommercialIntentLevel
  serpAttackability: SERPAttackability
  competitorDifficulty: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME'
  recommendedOfferTier: 'TIER_REPORT_19' | 'TIER_ACTION_PLAN_49' | 'TIER_BUNDLE_79' | 'TIER_STRATEGY_199' | 'TIER_FILING_2500'
  offerPriceUSD: number
  currentMonthlyExpectedRevenueUSD: number
  projectedMonthlyExpectedRevenueUSD: number
  incrementalMonthlyGainUSD: number
  revenueScore: RevenueOpportunityScoreBreakdown
  serpSnapshot?: SERPIntelligenceSnapshot
  titleMetaAttackPlan?: CTRAttackRecommendation
  contentAttackPlan?: ContentAttackPlan
  internalLinkPlan?: InternalLinkRecommendation[]
}

export interface CTRAttackRecommendation {
  currentTitle: string
  currentMetaDescription: string
  competitorBenchmarkTitles: string[]
  recommendedTitle1: string
  recommendedTitle2: string
  recommendedMetaDescription: string
  psychologicalTrigger: string
  expectedCTRDeltaPercent: number
  projectedAdditionalMonthlyClicks: number
}

export interface ContentAttackPlan {
  currentH1: string
  recommendedH1: string
  answerFirstBlock100Words: string
  mustIncludeSections: string[]
  missingTopics: string[]
  commercialCTABlocks: {
    heroCTA: string
    midPageCTA: string
    bottomStrategyCTA: string
    highTicketFilingCTA: string
  }
}

export interface InternalLinkRecommendation {
  sourceUrlPath: string
  destinationUrlPath: string
  recommendedAnchorText: string
  contextSnippet: string
  authorityGainPotential: 'HIGH' | 'MEDIUM' | 'LOW'
}

export interface SEORevenueExperiment {
  experimentId: string // e.g. SEO-2026-08-14-001
  urlPath: string
  targetKeyword: string
  targetOfferTier: string
  status: 'PROPOSED' | 'DEPLOYED' | 'OBSERVING' | 'SCALED' | 'KILLED'
  deployedAt?: string
  measurementWindowDays: number
  baselineMetrics: {
    impressions: number
    clicks: number
    ctr: number
    position: number
    leadsCaptured: number
    checkoutsStarted: number
    revenueCollectedUSD: number
  }
  projectedMetrics: {
    targetCTR: number
    targetClicks: number
    targetRevenueUSD: number
  }
  actualMetrics?: {
    impressions: number
    clicks: number
    ctr: number
    position: number
    leadsCaptured: number
    checkoutsStarted: number
    revenueCollectedUSD: number
  }
  appliedChanges: {
    title: string
    metaDescription: string
    h1: string
    injectedCTAs: string[]
    internalLinksAdded: string[]
  }
}
