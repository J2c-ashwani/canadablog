/**
 * Growth OS — Master Type Definitions
 * Enterprise domain models, events, capabilities, and configurations.
 */

export type IntentLevel = "High" | "Medium" | "Low"
export type OpportunityStatus = "Discovered" | "Evaluated" | "Approved" | "Dispatched" | "ExceptionRaised" | "ObservedAndWaiting"
export type SourceType = "Government" | "SEO" | "Partner" | "Community"
export type MaturityLevel = "L1_Monitoring" | "L2_Prediction" | "L3_AutonomousPrioritization" | "L4_SelfOptimization"

export interface BusinessImpactScore {
  revenueImpactUSD: number
  founderTimeSavedMinutes: number
  customerTrustAddedScore: number
  knowledgeAddedScore: number
  competitiveAdvantageScore: number
  compositeImpactRating: number
}

export interface EvidenceItem {
  id: string
  sourceUrl: string
  title: string
  extractedFact: string
  verifiedTimestamp: string
  reliabilityScore: number // 0 - 100
}

export interface RevenueOpportunity {
  id: string
  brandId: string
  trigger: string
  buyerSegment: string
  intentLevel: IntentLevel
  recommendedProduct: string
  targetLandingPage: string
  
  // Financial Economics & Budgeting
  expectedRevenue: number
  expectedCost: number
  expectedROI: number
  estimatedExecutionTime: number
  priorityScore: number
  
  // Trust & Verification
  humanTrustScore: number
  confidenceScore: number
  
  sourceType: SourceType
  expiresAt: string
  evidence: EvidenceItem[]
  status: OpportunityStatus
  createdAt: string
  updatedAt: string
}

export interface GrowthGoal {
  id: string
  period: string
  revenueTargetUSD: number
  priorityMarkets: string[]
  priorityProducts: string[]
  constraints: {
    maxMonthlyComputeBudgetUSD: number
    maxDailyEmailVolume: number
    minRequiredROI: number
  }
}

export interface BrandConfig {
  id: string
  name: string
  domain: string
  products: {
    name: string
    priceUSD: number
    targetSituation: string
  }[]
  markets: string[]
  toneStandards: string[]
  complianceRules: string[]
}

export interface DomainEvent<T = any> {
  id: string
  name: string
  timestamp: string
  payload: T
}

export type EventHandler<T = any> = (event: DomainEvent<T>) => Promise<void>

// ─── Phase 3: Authority Engine Re-exports ───────────────────────────────────
export type {
  AuthorityCategory,
  AuthorityTier,
  AuthorityScore,
  AuthorityOpportunity,
  QualifiedOpportunity,
  FSIAsset,
  OutreachDraft,
  OutreachAngle,
  GuardrailResult,
  GuardrailCheck,
  KillSwitchThresholds,
  KillSwitchState,
  KillSwitchStatus,
  ExceptionQueueItem,
  AuthoritySendConfig,
  SendSchedulerState,
  BacklinkVerification,
  BacklinkRevenueAttribution,
  CategoryPerformance,
  AuthorityFlywheelScore,
  AuthorityPipelineResult,
  AuthorityPipelineStage,
} from './authority/types'

export { AUTHORITY_EVENTS } from './authority/types'
