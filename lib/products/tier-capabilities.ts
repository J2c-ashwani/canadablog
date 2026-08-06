// lib/products/tier-capabilities.ts
// Pure zero-dependency tier capability helper safe for client-side bundling.

export interface TierCapability {
  /** Outcome-driven product name shown in reports and headers */
  tierName: string;
  /** The primary question this product tier answers for the founder */
  questionAnswered: string;
  // ── Awareness (all tiers) ───────────────────────────────────────
  canViewDashboard: boolean;
  canViewRecommendations: boolean;
  canViewExclusionsSummary: boolean;
  canViewRiskAlerts: boolean;       // Awareness-level (title + brief)
  // ── Preparation & Sequence ($49+) ──────────────────────────────
  canViewPreparationChecklist: boolean;
  canViewDocumentMatrix: boolean;
  canViewDependencies: boolean;
  canViewRiskMitigations: boolean;  // Full prep + checklist level
  // ── Strategy & Governance ($79+) ───────────────────────────────
  canViewMilestoneRoadmap: boolean;
  canViewAuditEvidenceGuidelines: boolean;
  canViewGovernanceTrail: boolean;
}

const TIER_CAPABILITIES: Record<string, TierCapability> = {
  // $19 — Funding Recommendation Report
  'funding-match-report': {
    tierName: 'Funding Recommendation Report',
    questionAnswered: 'Where should I apply, and what should I avoid?',
    canViewDashboard: true,
    canViewRecommendations: true,
    canViewExclusionsSummary: true,
    canViewRiskAlerts: true,
    canViewPreparationChecklist: false,
    canViewDocumentMatrix: false,
    canViewDependencies: false,
    canViewRiskMitigations: false,
    canViewMilestoneRoadmap: false,
    canViewAuditEvidenceGuidelines: false,
    canViewGovernanceTrail: false,
  },
  // $49 — Funding Action Plan
  'funding-roadmap': {
    tierName: 'Funding Action Plan',
    questionAnswered: 'What should I prepare before applying, and in what order?',
    canViewDashboard: true,
    canViewRecommendations: true,
    canViewExclusionsSummary: true,
    canViewRiskAlerts: true,
    canViewPreparationChecklist: true,
    canViewDocumentMatrix: true,
    canViewDependencies: true,
    canViewRiskMitigations: true,
    canViewMilestoneRoadmap: false,
    canViewAuditEvidenceGuidelines: false,
    canViewGovernanceTrail: false,
  },
  // $79 — Executive Funding Strategy Dossier
  'funding-bundle': {
    tierName: 'Executive Funding Strategy Dossier',
    questionAnswered: 'How should I build my 12-24 month funding capital strategy?',
    canViewDashboard: true,
    canViewRecommendations: true,
    canViewExclusionsSummary: true,
    canViewRiskAlerts: true,
    canViewPreparationChecklist: true,
    canViewDocumentMatrix: true,
    canViewDependencies: true,
    canViewRiskMitigations: true,
    canViewMilestoneRoadmap: true,
    canViewAuditEvidenceGuidelines: true,
    canViewGovernanceTrail: true,
  },
};

// Fallback for products that don't map to a report tier
const DEFAULT_TIER: TierCapability = {
  tierName: 'Funding Recommendation Report',
  questionAnswered: 'Where should I apply?',
  canViewDashboard: true,
  canViewRecommendations: true,
  canViewExclusionsSummary: true,
  canViewRiskAlerts: true,
  canViewPreparationChecklist: false,
  canViewDocumentMatrix: false,
  canViewDependencies: false,
  canViewRiskMitigations: false,
  canViewMilestoneRoadmap: false,
  canViewAuditEvidenceGuidelines: false,
  canViewGovernanceTrail: false,
};

/**
 * Returns the machine-readable capability flags for a given product.
 * All UI rendering logic MUST call this instead of comparing productId strings inline.
 */
export function getTierCapabilities(productId?: string): TierCapability {
  if (!productId) return DEFAULT_TIER;
  return TIER_CAPABILITIES[productId] ?? DEFAULT_TIER;
}
