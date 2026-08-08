/**
 * Growth OS — Phase 3: Authority Engine Type Definitions
 * 
 * All domain models, interfaces, and configuration types for the Authority Engine.
 * Designed for fully autonomous backlink outreach with guardrail-based quality control.
 */

// ─── Discovery & Qualification ─────────────────────────────────────────────────

export type AuthorityCategory =
  | 'startup_directory'
  | 'incubator'
  | 'accelerator'
  | 'industry_blog'
  | 'resource_page'
  // Phase 2 expansion categories (after 50-100 earned backlinks)
  | 'podcast'
  | 'newsletter'
  | 'business_association'
  | 'grant_directory'
  | 'saas_directory'
  | 'journalist'
  | 'youtube_creator'
  | 'linkedin_creator'
  | 'university'
  | 'government_resource'

export type AuthorityTier = 'A' | 'B' | 'C' | 'D'

export type OpportunityAction = 'auto_outreach' | 'batch_review' | 'skip'

export interface AuthorityOpportunity {
  id: string
  website: string
  prospectName: string
  email: string
  category: AuthorityCategory
  targetPage: string                    // The page on their site where our link would appear
  discoveredAt: string
  sourceQuery: string
  metadata: {
    siteTitle: string
    siteDescription: string
    recentArticles: string[]
    aboutSummary: string
  }
}

export interface AuthorityScore {
  authorityScore: number               // 0-100: Link quality & domain strength
  commercialScore: number              // 0-100: Revenue relevance to FSI Digital
  estimatedROI: number                 // 0-100: Weighted composite (authority × 0.4 + commercial × 0.6)
  breakdown: {
    topicalRelevance: number           // 0-25
    domainQuality: number              // 0-20
    indexingStatus: number             // 0-15
    estimatedTraffic: number           // 0-15
    outboundLinkQuality: number        // 0-10
    categoryAcceptance: number         // 0-15
    audienceOverlap: number            // 0-35 (commercial)
    fundingTopicCoverage: number       // 0-25 (commercial)
    commercialTrafficIntent: number    // 0-25 (commercial)
    referralPotential: number          // 0-15 (commercial)
  }
  tier: AuthorityTier
  recommendedAction: OpportunityAction
}

export interface QualifiedOpportunity extends AuthorityOpportunity {
  score: AuthorityScore
}

// ─── FSI Digital Asset Scanner ──────────────────────────────────────────────────

export type FSIAssetType = 'guide' | 'tool' | 'calculator' | 'screener' | 'report' | 'comparison'

export interface FSIAsset {
  url: string                           // e.g., "/canada/small-business-grants"
  title: string
  type: FSIAssetType
  conversionRate: number                // 0-100 (based on lead capture data)
  organicTraffic: number                // Estimated monthly traffic
  lastUpdated: string
  topicCluster: string                  // e.g., "IRAP", "SR&ED", "women-grants"
  assetScore: number                    // 0-100 composite
  bestOutreachAngle: string             // AI-suggested pitch angle
}

// ─── Outreach Generation ────────────────────────────────────────────────────────

export type OutreachAngle =
  | 'resource_suggestion'
  | 'data_contribution'
  | 'expert_quote'
  | 'content_collaboration'
  | 'broken_link'
  | 'podcast_guest'

export interface OutreachDraft {
  prospectId: string
  prospectEmail?: string
  prospectName?: string
  category: AuthorityCategory
  angle: OutreachAngle
  subject: string
  subjectVariants: string[]             // For A/B testing
  body: string
  fsiAssetUsed: string                  // URL of FSI Digital resource promoted
  personalizationTokens: {
    websiteName: string
    specificReference: string           // Exact article/page referenced
    relevantResource: string            // FSI Digital resource offered
  }
  aiQualityScore: number                // Stored for analytics ONLY — NOT a send gate
  generatedAt: string
}

// ─── Guardrail Engine ───────────────────────────────────────────────────────────

export type GuardrailAction = 'auto_send' | 'exception_queue' | 'auto_reject' | 'requeue'

export interface GuardrailCheck {
  name: string
  passed: boolean
  reason?: string
}

export interface GuardrailResult {
  passed: boolean
  checks: GuardrailCheck[]
  action: GuardrailAction
  failedChecks: string[]
}

export interface KillSwitchThresholds {
  maxBounceRatePercent: number          // Pause if bounce rate exceeds this (default: 5%)
  maxSpamComplaintRatePercent: number   // Pause if spam complaints exceed this (default: 0.1%)
  minReplyRatePercent: number           // Pause if reply rate drops below this (default: 2%)
  maxConsecutiveBounces: number         // Pause after N consecutive bounces (default: 10)
  evaluationWindowDays: number          // Rolling window for rate calculations (default: 7)
}

export type KillSwitchStatus = 'active' | 'paused' | 'warming_up'

export interface KillSwitchState {
  status: KillSwitchStatus
  pausedAt?: string
  pauseReason?: string
  lastEvaluatedAt: string
  metrics: {
    totalSent: number
    totalBounced: number
    totalSpamComplaints: number
    totalReplied: number
    consecutiveBounces: number
    bounceRatePercent: number
    spamComplaintRatePercent: number
    replyRatePercent: number
  }
}

// ─── Exception Queue ────────────────────────────────────────────────────────────

export type ExceptionStatus = 'pending' | 'resolved' | 'dismissed' | 'blocked'

export interface ExceptionQueueItem {
  id: string
  prospectEmail: string
  prospectName: string
  website: string
  draftSubject: string
  draftBody: string
  failedChecks: string[]
  status: ExceptionStatus
  ceoNotes: string
  createdAt: string
  resolvedAt?: string
}

// ─── Send Scheduler ─────────────────────────────────────────────────────────────

export interface AuthoritySendConfig {
  dailyCap: number                      // Configurable maximum (default: 50)
  hourlyMax: number                     // Natural pacing (default: 8)
  minIntervalMinutes: number            // Minimum gap between sends (default: 5)
  maxIntervalMinutes: number            // Maximum gap, randomized (default: 12)
  businessHoursOnly: boolean            // Mon-Fri 9am-5pm EST (default: true)
  warmUp: {
    enabled: boolean
    schedule: Record<string, number>    // e.g., { week1: 5, week2: 15, week3: 30, week4: 50 }
  }
}

export interface SendSchedulerState {
  dailySentCount: number
  effectiveDailyCap: number             // Adjusted for warm-up
  warmUpWeek: number                    // Current warm-up week (0 = complete)
  queuedCount: number
  lastSentAt: string | null
  nextAvailableAt: string | null
}

// ─── Backlink Verification ──────────────────────────────────────────────────────

export type BacklinkLinkType = 'dofollow' | 'nofollow' | 'unknown'

export interface BacklinkVerification {
  prospectId: string
  sourceUrl: string                     // Page containing our link
  targetUrl: string                     // Our page being linked to
  anchorText: string | null
  linkType: BacklinkLinkType
  firstDetected: string
  lastChecked: string
  httpStatus: number
  isLive: boolean
  consecutiveFailures: number           // Alert after 3 consecutive failures
  checkHistory: Array<{
    date: string
    live: boolean
    status: number
    linkType: string
  }>
}

// ─── Revenue Attribution ────────────────────────────────────────────────────────

export interface BacklinkRevenueAttribution {
  backlinkId: string
  sourceUrl: string                     // The page linking to us
  targetUrl: string                     // Our page being linked
  indexed: boolean                      // Is the linking page indexed?
  referralVisits: number                // Tracked via UTM or referrer
  leadsGenerated: number                // Leads with this referral source
  salesGenerated: number                // Purchases from these leads
  revenueAttributed: number             // $ total
  roi: number                           // Revenue / effort cost
  firstIndexed: string
  lastChecked: string
}

// ─── AI Learning Loop ───────────────────────────────────────────────────────────

export interface CategoryPerformance {
  category: AuthorityCategory
  totalSent: number
  opened: number
  replied: number
  positiveReplies: number
  backlinksEarned: number
  revenueAttributed: number
  openRate: number
  replyRate: number
  positiveRate: number
  backlinkRate: number
  revenuePerBacklink: number
  bestPerformingAngle: OutreachAngle | null
  bestPerformingSubject: string | null
  lastUpdated: string
}

// ─── Authority Flywheel Score ───────────────────────────────────────────────────

export type AuthorityTrend = 'growing' | 'stable' | 'declining'

export interface AuthorityFlywheelScore {
  date: string
  components: {
    backlinksEarned: { value: number; weight: number; weighted: number }
    referringDomains: { value: number; weight: number; weighted: number }
    brandMentions: { value: number; weight: number; weighted: number }
    organicClicks: { value: number; weight: number; weighted: number }
    commercialTraffic: { value: number; weight: number; weighted: number }
    revenueInfluence: { value: number; weight: number; weighted: number }
  }
  totalScore: number                    // 0-100 composite
  weekOverWeekChange: number            // +/- from last week
  trend: AuthorityTrend
  insight: string                       // AI-generated one-liner
}

// ─── Authority Engine Pipeline ──────────────────────────────────────────────────

export type AuthorityPipelineStage =
  | 'discovered'
  | 'qualified'
  | 'draft_generated'
  | 'guardrail_passed'
  | 'scheduled'
  | 'sent'
  | 'opened'
  | 'replied'
  | 'positive_reply'
  | 'backlink_earned'
  | 'verified'
  | 'guardrail_failed'
  | 'exception_queued'
  | 'rejected'

export interface AuthorityPipelineResult {
  discoveredCount: number
  qualifiedCount: number
  draftsGenerated: number
  guardrailsPassed: number
  guardrailsFailed: number
  exceptionsQueued: number
  scheduled: number
  sent: number
  errors: Array<{ prospectId: string; stage: AuthorityPipelineStage; error: string }>
  executionTimeMs: number
  timestamp: string
}

// ─── Authority Engine Events (for Event Bus) ────────────────────────────────────

export const AUTHORITY_EVENTS = {
  OPPORTUNITY_DISCOVERED: 'authority.opportunity.discovered',
  OPPORTUNITY_QUALIFIED: 'authority.opportunity.qualified',
  OUTREACH_DRAFTED: 'authority.outreach.drafted',
  GUARDRAIL_PASSED: 'authority.guardrail.passed',
  GUARDRAIL_FAILED: 'authority.guardrail.failed',
  OUTREACH_SENT: 'authority.outreach.sent',
  OUTREACH_OPENED: 'authority.outreach.opened',
  OUTREACH_CLICKED: 'authority.outreach.clicked',
  OUTREACH_REPLIED: 'authority.outreach.replied',
  BACKLINK_EARNED: 'authority.backlink.earned',
  BACKLINK_LOST: 'authority.backlink.lost',
  BACKLINK_VERIFIED: 'authority.backlink.verified',
  KILL_SWITCH_TRIGGERED: 'authority.killswitch.triggered',
  KILL_SWITCH_RESUMED: 'authority.killswitch.resumed',
  EXCEPTION_QUEUED: 'authority.exception.queued',
  FLYWHEEL_SCORE_UPDATED: 'authority.flywheel.updated',
} as const
