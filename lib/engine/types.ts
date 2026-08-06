// lib/engine/types.ts

export type BusinessObjective =
  | 'Launch MVP'
  | 'Acquire Customers'
  | 'Hire Team'
  | 'Increase Production'
  | 'Enter USA'
  | 'Export'
  | 'Commercialize IP'
  | 'Automate Operations';

export type RecommendationType =
  | 'Immediate Opportunity'
  | 'Near-Term Opportunity'
  | 'Future Opportunity';

export type HistoricalEffectiveness = 'High' | 'Medium' | 'Low';

export type RuleID =
  | 'RULE-001' // HardExclusion_CanadianResidency
  | 'RULE-002' // HardExclusion_StatusPaused
  | 'RULE-014' // HardExclusion_SIF_RevenueThreshold
  | 'RULE-018' // HardExclusion_SectorMismatch
  | 'RULE-021';// StackingCap_75PctWageReimbursement

// ── PHASE 4 OUTCOME INTELLIGENCE DOMAIN TYPES ──

export type ClientLifecycleStage =
  | 'LEAD'
  | 'REPORT_PURCHASED'
  | 'ACTION_PLAN_UNLOCKED'
  | 'BLUEPRINT_UNLOCKED'
  | 'STRATEGY_SESSION_BOOKED'
  | 'ACTIVE_FILING_CLIENT'
  | 'FUNDING_WON'
  | 'RETURNING_CLIENT';

export interface LifecycleEvent {
  stage: ClientLifecycleStage;
  enteredAt: string;
  exitedAt?: string;
  actor: 'SYSTEM' | 'CLIENT' | 'ADVISOR';
}

export type OutcomeSource =
  | 'ADVISOR'
  | 'CLIENT'
  | 'GOVERNMENT_PORTAL'
  | 'SYSTEM_IMPORT';

export type ClientFilingStatus =
  | 'PREPARING'
  | 'DRAFT_READY'
  | 'SUBMITTED'
  | 'ADDITIONAL_DOCS_REQUESTED'
  | 'REVISION_REQUESTED'
  | 'APPROVED'
  | 'COMMITTED'
  | 'PAID'
  | 'COMPLETED'
  | 'REJECTED';

export type ReasonNotApplied =
  | 'NOT_INTERESTED'
  | 'PROGRAM_CLOSED'
  | 'INSUFFICIENT_CASH_MATCH'
  | 'ADVISOR_CHANGED_STRATEGY'
  | 'DID_NOT_QUALIFY'
  | 'CLIENT_INACTIVE';

export interface OutcomeTimeline {
  reportGeneratedAt: string;
  reportOpenedAt?: string;
  upgradePurchasedAt?: string;
  strategySessionBookedAt?: string;
  applicationSubmittedAt?: string;
  additionalDocsRequestedAt?: string;
  approvalNoticeReceivedAt?: string;
  fundsDepositedAt?: string;
  daysToSubmit?: number;
  daysToApproval?: number;
  totalCycleTimeDays?: number;
}

export interface ClientFilingOutcome {
  outcomeId: string;
  clientId: string;
  clientEmail: string;
  programId: string;
  programName: string;
  status: ClientFilingStatus;
  outcomeSource: OutcomeSource;
  grantAmountRequested: number;
  grantAmountCommitted?: number;
  grantAmountPaid?: number;
  timeline: OutcomeTimeline;
  lifecycleStage: ClientLifecycleStage;
  lifecycleHistory: LifecycleEvent[];
  assignedAdvisorId?: string;
  notes?: string;
}

export interface RecommendationValidation {
  recommendationId: string;
  programId: string;
  programName: string;
  recommendedRank: number;
  didClientApply: boolean;
  reasonNotApplied?: ReasonNotApplied;
  wasClientEligible: boolean;
  wasApproved: boolean;
  fundingWonAmount: number;
  validationScore: number; // 0 - 100
}

export interface ExecutiveOutcomeDashboard {
  totalReportsGenerated: number;
  totalApplicationsStarted: number;
  totalApplicationsSubmitted: number;
  overallApprovalRatePct: number;          // e.g. 84%
  approvalRateTrendPct: number;            // e.g. +6% vs 90d
  totalClientGrantFundingWon: number;      // e.g. $4,250,000 (Client Capital)
  fundingWonTrendPct: number;              // e.g. +12% vs 90d
  expectedServiceRevenueDollars: number;  // FSI Digital product & retainer revenue
  expectedClientFundingDollars: number;   // Total pipeline client grant capital
  averageCustomerLTV: number;              // e.g. $1,450
  averageApprovalTimeDays: number;         // e.g. 42 days
  recommendationAccuracyPct: number;       // Formula: (Approved Recs / Applied Recs) * 100
}

export interface AdvisorPerformanceMetrics {
  advisorId: string;
  advisorName: string;
  activeClientsCount: number;
  approvalRatePct: number;
  totalFundingWonDollars: number;
  averageCycleTimeDays: number;
  revenueGeneratedDollars: number;
  firstResponseTimeHours: number;
  customerSatisfactionScore: number;       // e.g. 4.9 / 5.0
  clientRetentionRatePct: number;          // e.g. 88%
  repeatBusinessRatePct: number;           // e.g. 42%
}

export interface CustomerJourneyLeakageReport {
  stageLeakages: {
    fromStage: ClientLifecycleStage;
    toStage: ClientLifecycleStage;
    conversionRatePct: number;
    dropoffCount: number;
    dropoffReasonSummary: string;
  }[];
  primaryLeakagePoint: string;
  recommendedFixAction: string;
}

// ── EXISTING DECISION ENGINE SCHEMAS ──

export interface MilestoneStage {
  stageName: string;
  action: string;
  milestoneToUnlock: string;
}

export interface DependencyNode {
  id: string;
  label: string;
  status: 'Met' | 'Pending' | 'Missing';
  prerequisiteIds: string[];
}

export interface DependencyDAG {
  targetProgramId: string;
  targetProgramName: string;
  nodes: DependencyNode[];
  rootPrerequisitesMet: boolean;
}

export interface KnowledgeGraphEdge {
  sourceProgramId: string;
  targetProgramId: string;
  relationshipType: 'prerequisiteOf' | 'stacksWith' | 'coFundingRule' | 'unlocksAfter';
  stackingCapPct?: number;
  interactionSummary: string;
}

export interface FundingKnowledgeGraph {
  nodes: string[];
  edges: KnowledgeGraphEdge[];
  netCoFundingSummary: string;
}

export interface ApprovalKiller {
  id: string;
  riskTitle: string;
  severity: 'HIGH RISK' | 'MEDIUM RISK' | 'LOW RISK';
  description: string;
  mitigationAction: string;
}

export interface DocumentReadinessMatrix {
  alreadyReady: string[];
  needsPreparation: string[];
  missingCritical: string[];
}

export interface OpportunityCost {
  missedRecoveryEstimate: string;
  missedRecoveryReason: string;
  unlockedBySingleAction: string;
}

export interface ExecutiveDashboard {
  overallReadiness: number;
  immediateOpportunities: number;
  blockedOpportunities: number;
  criticalRisks: number;
  missingDocuments: number;
  fastestWin: {
    programName: string;
    prepTime: string;
    decisionWindow: string;
  };
  highestROI: {
    programName: string;
    reason: string;
  };
  opportunityCost: OpportunityCost;
}

export interface ScoreBreakdown {
  industryFit: number;
  objectiveFit: number;
  stageFit: number;
  provinceMatch: number;
  statusAccessibility: number;
  commercialRoiValue: number;
  totalScore: number;
}

export interface ExclusionAuditLogEntry {
  programId: string;
  programName: string;
  ruleId: RuleID;
  ruleDescription: string;
  thresholdValue: string;
  unlockCriteria: string;
  reEvaluateStage: string;
  owner: string;
  effectiveDate: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface RecommendationSnapshot {
  snapshotId: string;
  generatedTimestamp: string;
  metadataVersion: string;
  scoringVersion: string;
  ruleEngineVersion: string;
  recommendationIntegrityHash: string;
  inputProfileSnapshot: {
    province: string;
    industry: string;
    revenue: string;
    goal: string;
    businessObjective: BusinessObjective;
  };
}

export interface EvaluatedRecommendation {
  programId: string;
  programName: string;
  agency: string;
  fundingAmount: string;
  fundingType: string;
  difficulty: 'Low' | 'Moderate' | 'Competitive';
  
  recommendationType: RecommendationType;
  recommendationConfidence: string;
  dataFreshness: string;
  readinessStars: string;
  commercialScore: number;
  scoreBreakdown: ScoreBreakdown;
  historicalEffectiveness: HistoricalEffectiveness;
  sequenceTier: 'Apply First' | 'Apply Second' | 'Apply Later';
  
  evidenceRating: {
    governmentAuthority: string;
    eligibilityFit: string;
    documentationCompleteness: string;
  };
  
  preparationTime: string;
  reviewTime: string;
  documentsRequiredCount: number;
  
  whyRecommended: string;
  whyNumberOne?: string[];
  whyNotNumberOne?: string[];
  whyRankedHere: string;
  typicalRejectionReason: string;
  howToImproveSuccess: string[];
  
  requiredDocuments: string[];
  applicationSteps: string[];
  officialWebsite: string;
}

export interface SkippedProgramResult {
  programId: string;
  programName: string;
  agency: string;
  reasonNotRecommended: string;
  unlockCriteria: string;
}

export interface FundingProgressionTimeline {
  immediate0to30Days: EvaluatedRecommendation[];
  nearTerm1to6Months: EvaluatedRecommendation[];
  strategic6to24Months: EvaluatedRecommendation[];
}

export interface FundingRecommendationResult {
  generatedAt: string;
  profile: {
    province: string;
    provinceName: string;
    industry: string;
    industryName: string;
    revenue: string;
    revenueName: string;
    goal: string;
    goalName: string;
    businessObjective: BusinessObjective;
  };

  snapshot: RecommendationSnapshot;
  executiveDashboard: ExecutiveDashboard;

  executiveRecommendation: {
    evaluatedCount: number;
    excludedCount: number;
    conditionalCount: number;
    recommendedCount: number;
    totalEstimatedFundingMin: number;
    totalEstimatedFundingMax: number;
    advisoryText: string;
  };

  primaryRecommendations: EvaluatedRecommendation[];
  conditionalRecommendations: EvaluatedRecommendation[];
  skippedPrograms: SkippedProgramResult[];

  exclusionAuditTrail: ExclusionAuditLogEntry[];
  knowledgeGraph: FundingKnowledgeGraph;
  
  dependencyGraphs: DependencyDAG[];
  approvalKillers: ApprovalKiller[];
  documentReadinessMatrix: DocumentReadinessMatrix;
  fundingTimeline: FundingProgressionTimeline;
  milestoneRoadmap: MilestoneStage[];
  next30DaysTasks: string[];
}

export const REPORT_CONFIG = {
  primaryRecommendations: 3,
  conditionalRecommendations: 3,
  excludedPrograms: 3,
};
