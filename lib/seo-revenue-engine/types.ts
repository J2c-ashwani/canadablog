/**
 * FSI Digital — SEO Revenue War Engine Core Type Definitions (v2.0 Execution Grade)
 */

export type KeywordTier = 'TIER_A_MONEY' | 'TIER_B_COMMERCIAL_RESEARCH' | 'TIER_C_INFORMATIONAL' | 'TIER_D_GARBAGE'

export type SERPAttackability = 'VERY_HIGH' | 'HIGH' | 'MEDIUM' | 'LOW' | 'LOCKED_GOV'

export type CommercialIntentLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE'

export type NoActionReason = 
  | 'GOV_DOMINATED_SERP'
  | 'QUERY_INTENT_MISMATCH'
  | 'NEGLIGIBLE_DEMAND'
  | 'IMPOSSIBLE_AUTHORITY_GAP'
  | 'PAGE_CANNIBALIZATION'
  | 'OUTDATED_INVALID_PROGRAM'
  | 'INSUFFICIENT_COMMERCIAL_VALUE'

export interface CompetitorOrganicResult {
  position: number
  title: string
  link: string
  domain: string
  snippet: string
  isGovernmentOrOfficial: boolean
  isThinOrOutdated: boolean
  estimatedWordCount?: number
  h1?: string
  h2h3Structure?: string[]
  hasAnswerFirstBlock?: boolean
  hasPricingOrAmounts?: boolean
  hasFaqSchema?: boolean
  hasCommercialCTA?: boolean
  hasInteractiveTools?: boolean
  provinceSpecificity?: boolean
  trustSignals?: string[]
  weaknessNotes: string[]
}

export interface DeepCompetitorForensics {
  keyword: string
  totalResultsCount?: number
  topCompetitors: CompetitorOrganicResult[]
  serpFeatures: string[]
  attackability: SERPAttackability
  governmentDominancePercent: number
  competitorConsensus: string[] // What 7/10 Page-1 pages have
  competitorWeaknesses: string[] // Top 3 things Page-1 competitors do poorly
  fsiParityFeatures: string[] // Baseline items needed to match
  fsiDifferentiators: string[] // Unique reasons to choose FSI
  winnerAdvantageSummary: string
  capturedAt: string
}

export type SERPIntelligenceSnapshot = DeepCompetitorForensics

export interface QueryIntentConfidence {
  commercialIntentPercent: number // e.g. 85%
  informationalIntentPercent: number // e.g. 15%
  newsIntentPercent: number // e.g. 0%
  confidenceBand: 'HIGH' | 'MEDIUM' | 'LOW'
  primaryIntentCategory: 'APPLICATION' | 'ELIGIBILITY' | 'PROGRAMS' | 'CALCULATOR' | 'NEWS' | 'INFORMATIONAL'
  isEligibleForAggressiveMonetization: boolean
}

export interface KeywordClassification {
  keyword: string
  tier: KeywordTier
  commercialIntent: CommercialIntentLevel
  intentConfidence: QueryIntentConfidence
  recommendedOfferPriceUSD: number
  offerName: string
  reason: string
}

export interface RTEScoreBreakdown {
  searchIntentScore: number // 0 to 100
  competitorCoverageScore: number // 0 to 100
  differentiationScore: number // 0 to 100
  freshnessScore: number // 0 to 100
  commercialAlignmentScore: number // 0 to 100
  internalAuthorityScore: number // 0 to 100
  serpAttackabilityScore: number // 0 to 100
  technicalSEOScore: number // 0 to 100
  overallRTEScore: number // 0 to 100 (Weighted Composite)
  weakestDimensions: string[]
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
  fsiDifferentiators: string[]
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

export interface StructuredSEOPatch {
  experimentId: string
  urlPath: string
  targetKeyword: string
  titleBefore: string
  titleAfter: string
  metaBefore: string
  metaAfter: string
  h1Before: string
  h1After: string
  sectionsToAdd: Array<{ heading: string; content: string }>
  sectionsToModify: Array<{ targetSection: string; updatedContent: string }>
  internalLinksToAdd: InternalLinkRecommendation[]
  ctaChanges: Array<{ placement: string; ctaText: string; targetUrl: string; priceUSD: number }>
  schemaChanges: Array<{ schemaType: string; payload: any }>
  competitorGapsResolved: string[]
  fsiDifferentiatorsDeployed: string[]
  status: 'PENDING_APPROVAL' | 'APPLIED' | 'FAILED'
  appliedAt?: string
}

export interface MultiStageObservationClock {
  stage1_24h_72h_TechnicalVerification: {
    status: 'PENDING' | 'PASSED' | 'FAILED'
    pageDeployed: boolean
    canonicalCorrect: boolean
    indexable: boolean
    linksPresent: boolean
    ctaActive: boolean
    ga4EventTriggering: boolean
  }
  stage2_7d_EarlySearchSignals: {
    status: 'PENDING' | 'OBSERVING' | 'EVALUATED'
    impressionsBaseline: number
    impressionsCurrent: number
    positionBaseline: number
    positionCurrent: number
    ctrBaseline: number
    ctrCurrent: number
    queryExpansionCount: number
  }
  stage3_14d_RankingMovement: {
    status: 'PENDING' | 'OBSERVING' | 'EVALUATED'
    rankDelta: number
    serpFeatureGained?: string
  }
  stage4_21d_28d_CommercialOutcome: {
    status: 'PENDING' | 'OBSERVING' | 'EVALUATED'
    clicksGained: number
    leadsCaptured: number
    checkoutsStarted: number
    purchasesCompleted: number
    incrementalRevenueCollectedUSD: number
    verdict: 'SCALE' | 'ITERATE' | 'DIAGNOSE' | 'KILL'
  }
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
  intentConfidence: QueryIntentConfidence
  serpAttackability: SERPAttackability
  competitorDifficulty: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME'
  recommendedOfferTier: 'TIER_REPORT_19' | 'TIER_ACTION_PLAN_49' | 'TIER_BUNDLE_79' | 'TIER_STRATEGY_199' | 'TIER_FILING_2500'
  offerPriceUSD: number
  currentMonthlyExpectedRevenueUSD: number
  projectedMonthlyExpectedRevenueUSD: number
  incrementalMonthlyGainUSD: number
  revenueScore: RevenueOpportunityScoreBreakdown
  rteScore: RTEScoreBreakdown
  competitorForensics?: DeepCompetitorForensics
  titleMetaAttackPlan?: CTRAttackRecommendation
  contentAttackPlan?: ContentAttackPlan
  internalLinkPlan?: InternalLinkRecommendation[]
  generatedPatch?: StructuredSEOPatch
  noActionGate?: {
    actionBlocked: boolean
    reason?: NoActionReason
    details?: string
  }
}

export interface SEORevenueExperiment {
  experimentId: string // e.g. SEO-2026-08-14-001
  urlPath: string
  targetKeyword: string
  targetOfferTier: string
  status: 'PROPOSED' | 'DEPLOYED' | 'OBSERVING' | 'SCALED' | 'KILLED'
  deployedAt?: string
  measurementWindowDays: number
  clocks: MultiStageObservationClock
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
  appliedPatch?: StructuredSEOPatch
}
