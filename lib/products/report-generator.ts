// lib/products/report-generator.ts

import { getAllPrograms, type ProgramDetails } from '@/lib/data/programs';
import { analyzeFundingIntelligence, IntelligentlyMappedProfile } from '@/lib/engine/intelligence-engine';
import { scoreAndRankPrograms } from '@/lib/engine/recommendation-engine';
import {
  buildMilestoneRoadmap,
  buildExecutiveDashboard,
  buildFundingDependencyGraph,
  evaluateApprovalProbabilityKillers,
  buildDocumentReadinessMatrix,
  buildFundingTimeline,
  buildFundingKnowledgeGraph,
  buildRecommendationSnapshot,
} from '@/lib/engine/strategy-engine';
import {
  FundingRecommendationResult,
  EvaluatedRecommendation,
  SkippedProgramResult,
} from '@/lib/engine/types';

// ── Legacy Input / Output Interfaces ──
// WARNING: These types are DEPRECATED. New code should use FundingRecommendationResult
// from '@/lib/engine/types' directly. These types exist only for backward compatibility
// with GrantCalculator, recovery emails, and PDF renderer fallback.

export interface ReportInput {
  province: string;  // e.g., 'on', 'bc', 'qc', 'ca', 'tx'
  industry: string;  // e.g., 'technology', 'manufacturing', 'agriculture'
  revenue: string;   // e.g., 'pre-revenue', 'under-100k', '100k-500k', '500k-1m', 'over-1m'
  goal: string;      // e.g., 'hiring', 'research', 'expansion', 'export'
}

/**
 * @deprecated Use EvaluatedRecommendation from '@/lib/engine/types' instead.
 * This legacy type maps enterprise recommendations back to a flat card structure.
 * Retained only for GrantCalculator and recovery email backward compatibility.
 */
export interface ReportProgram {
  id: string;
  name: string;
  agency: string;
  fundingAmount: string;
  fundingType: string;
  difficulty: string;
  matchStrength: 'Strong Match' | 'Good Match' | 'Potential Match';
  matchReason: string;
  estimatedRange: string;
  requiredDocuments: string[];
  applicationSteps: string[];
  status: string;
  deadline: string;
  // Enhanced platform properties
  sequenceTier?: 'Apply First' | 'Apply Second' | 'Apply Later';
  recommendationType?: string;
  recommendationConfidence?: string;
  readinessStars?: string;
  preparationTime?: string;
  reviewTime?: string;
  documentsRequiredCount?: number;
  whyRecommended?: string;
  whyRankedHere?: string;
  typicalRejectionReason?: string;
  howToImproveSuccess?: string[];
}

/**
 * @deprecated Use FundingRecommendationResult from '@/lib/engine/types' instead.
 * This legacy wrapper exists only for backward compatibility with GrantCalculator,
 * recovery emails, and PDF renderer fallback. The web report reads platformResult directly.
 */
export interface FundingMatchReport {
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
  };
  summary: {
    totalPrograms: number;
    estimatedTotalMin: number;
    estimatedTotalMax: number;
    readinessScore: number;
    advisoryText?: string;
  };
  programs: ReportProgram[];
  // Central platform result attachment
  platformResult?: FundingRecommendationResult;
}

// ── MAIN CORE PLATFORM ORCHESTRATOR ──

/**
  Main Entrypoint for FSI Digital Funding Intelligence Platform.
  Executes Stage 1 (Intelligence), Stage 2 (Eligibility), and Stage 3 (Recommendation).
 */
export function generateFundingRecommendationPlatform(input: ReportInput): FundingRecommendationResult {
  // Stage 1: Intelligence Engine (Problem-First Intent Mapping)
  const profile = analyzeFundingIntelligence(input);

  // Load Master Programs Database (117 programs)
  const allPrograms = getAllPrograms();

  // Stage 2 & Stage 3: Eligibility & Commercial Recommendation Scoring
  const { primary, conditional, skipped, exclusionAuditTrail } = scoreAndRankPrograms(allPrograms, profile);

  // Compute aggregate funding potential across primary recommendations
  let estimatedTotalMin = 0;
  let estimatedTotalMax = 0;

  primary.forEach((rec) => {
    const range = parseFundingRange(rec.fundingAmount);
    if (range) {
      const scaled = scaleFundingByRevenue(range, profile.revenue);
      estimatedTotalMin += scaled[0];
      estimatedTotalMax += scaled[1];
    }
  });

  // Calculate overall profile readiness score (0–100)
  let readinessScore = 40;
  if (profile.industry && profile.industry !== 'other') readinessScore += 15;
  if (profile.revenue && profile.revenue !== 'pre-revenue') readinessScore += 15;
  if (profile.goal) readinessScore += 15;
  if (primary.some((p) => p.readinessStars === '★★★★★')) readinessScore += 15;

  const totalEvaluated = allPrograms.length;
  const recommendedCount = primary.length;
  const conditionalCount = conditional.length;
  const excludedCount = totalEvaluated - (recommendedCount + conditionalCount);

  const advisoryText = `After evaluating ${totalEvaluated} funding opportunities across ${profile.provinceName}, I recommend focusing on ${recommendedCount} primary opportunities that best match your current ${profile.revenueName.toLowerCase()} business stage. Pursuing every available grant risks diluting execution quality. Excluded: ${excludedCount} programs; Conditional: ${conditionalCount} programs.`;

  // Derived Monday Morning Action Items (Next 30 Days)
  const next30DaysTasks: string[] = [
    `Retrieve corporate incorporation certificates and tax returns (T2 Schedule 31 / payroll logs).`,
    `Establish contemporaneous project expense and developer activity tracking system.`,
    `Book an initial advisor consultation to review matching funds authorization before formal submission.`,
  ];

  if (primary.length > 0) {
    const topProgName = primary[0].programName;
    next30DaysTasks.unshift(`Prepare project description scope and budget breakdown for ${topProgName}.`);
  }

  const executiveDashboard = buildExecutiveDashboard(primary, skipped, profile, readinessScore);
  const dependencyGraphs = buildFundingDependencyGraph(primary, profile);
  const approvalKillers = evaluateApprovalProbabilityKillers(primary, profile);
  const documentReadinessMatrix = buildDocumentReadinessMatrix(primary, profile);
  const fundingTimeline = buildFundingTimeline(primary, conditional);
  const milestoneRoadmap = buildMilestoneRoadmap(primary);
  const knowledgeGraph = buildFundingKnowledgeGraph(primary, profile);
  const snapshot = buildRecommendationSnapshot(primary, profile);

  return {
    generatedAt: new Date().toISOString(),
    profile: {
      province: profile.province,
      provinceName: profile.provinceName,
      industry: profile.industry,
      industryName: profile.industryName,
      revenue: profile.revenue,
      revenueName: profile.revenueName,
      goal: profile.goal,
      goalName: profile.goalName,
      businessObjective: profile.businessObjective,
    },
    snapshot,
    executiveDashboard,
    executiveRecommendation: {
      evaluatedCount: totalEvaluated,
      excludedCount,
      conditionalCount,
      recommendedCount,
      totalEstimatedFundingMin: estimatedTotalMin,
      totalEstimatedFundingMax: estimatedTotalMax,
      advisoryText,
    },
    primaryRecommendations: primary,
    conditionalRecommendations: conditional,
    skippedPrograms: skipped,
    exclusionAuditTrail,
    knowledgeGraph,
    dependencyGraphs,
    approvalKillers,
    documentReadinessMatrix,
    fundingTimeline,
    milestoneRoadmap,
    next30DaysTasks,
  };
}

// ── Backward-Compatible Wrappers ──

/**
 * @deprecated Use generateFundingRecommendationPlatform() instead.
 * This function wraps the enterprise result in a legacy FundingMatchReport adapter.
 * Retained only for backward compatibility with GrantCalculator, recovery emails,
 * and the PDF renderer's legacy fallback path.
 */
export function generateFundingMatchReport(input: ReportInput): FundingMatchReport {
  const platformResult = generateFundingRecommendationPlatform(input);

  const mappedPrograms: ReportProgram[] = platformResult.primaryRecommendations.map((rec) => {
    const parsed = parseFundingRange(rec.fundingAmount);
    let estimatedRange = rec.fundingAmount;
    if (parsed) {
      const scaled = scaleFundingByRevenue(parsed, input.revenue);
      estimatedRange = `${formatDollar(scaled[0])} – ${formatDollar(scaled[1])}`;
    }

    return {
      id: rec.programId,
      name: rec.programName,
      agency: rec.agency,
      fundingAmount: rec.fundingAmount,
      fundingType: rec.fundingType,
      difficulty: rec.difficulty,
      matchStrength: rec.commercialScore >= 75 ? 'Strong Match' : rec.commercialScore >= 60 ? 'Good Match' : 'Potential Match',
      matchReason: rec.whyRecommended,
      estimatedRange,
      requiredDocuments: rec.requiredDocuments,
      applicationSteps: rec.applicationSteps,
      status: 'Open',
      deadline: 'Rolling Intake',
      sequenceTier: rec.sequenceTier,
      recommendationType: rec.recommendationType,
      recommendationConfidence: rec.recommendationConfidence,
      readinessStars: rec.readinessStars,
      preparationTime: rec.preparationTime,
      reviewTime: rec.reviewTime,
      documentsRequiredCount: rec.documentsRequiredCount,
      whyRecommended: rec.whyRecommended,
      whyRankedHere: rec.whyRankedHere,
      typicalRejectionReason: rec.typicalRejectionReason,
      howToImproveSuccess: rec.howToImproveSuccess,
    };
  });

  return {
    generatedAt: platformResult.generatedAt,
    profile: {
      province: platformResult.profile.province,
      provinceName: platformResult.profile.provinceName,
      industry: platformResult.profile.industry,
      industryName: platformResult.profile.industryName,
      revenue: platformResult.profile.revenue,
      revenueName: platformResult.profile.revenueName,
      goal: platformResult.profile.goal,
      goalName: platformResult.profile.goalName,
    },
    summary: {
      totalPrograms: mappedPrograms.length,
      estimatedTotalMin: platformResult.executiveRecommendation.totalEstimatedFundingMin,
      estimatedTotalMax: platformResult.executiveRecommendation.totalEstimatedFundingMax,
      readinessScore: 85,
      advisoryText: platformResult.executiveRecommendation.advisoryText,
    },
    programs: mappedPrograms,
    platformResult,
  };
}

// ── Helpers ──

function parseFundingRange(fundingAmount: string): [number, number] | null {
  const normalized = fundingAmount
    .replace(/,/g, '')
    .replace(/K/gi, '000')
    .replace(/M/gi, '000000');

  const matches = normalized.match(/\$([0-9]+(?:\.[0-9]+)?)/g);
  if (!matches || matches.length === 0) return null;

  const values = matches.map((m) => parseFloat(m.replace('$', '')));
  if (values.length === 1) return [0, values[0]];

  const sorted = values.sort((a, b) => a - b);
  return [sorted[0], sorted[sorted.length - 1]];
}

function scaleFundingByRevenue(range: [number, number], revenue: string): [number, number] {
  switch (revenue) {
    case 'pre-revenue':
      return [0, Math.round(range[1] * 0.3)];
    case 'under-100k':
      return [0, Math.round(range[1] * 0.5)];
    case '100k-500k':
      return [Math.round(range[1] * 0.5), Math.round(range[1] * 0.75)];
    case '500k-1m':
      return [Math.round(range[1] * 0.75), range[1]];
    case 'over-1m':
      return [range[0], range[1]];
    default:
      return range;
  }
}

function formatDollar(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toLocaleString()}`;
}

// ── Funding Action Plan Types & Generator ──

export interface PriorityRankingItem {
  id: string;
  name: string;
  agency: string;
  rank: number;
  matchReason: string;
  fundingAmount: string;
  difficulty: string;
}

export interface StrategyTimelineItem {
  programId: string;
  programName: string;
  agency: string;
  targetMonth: string;
  actionRequired: string;
}

export interface ProgramRiskWarning {
  programId: string;
  programName: string;
  riskLevel: 'Low' | 'Moderate' | 'High';
  riskDescription: string;
}

export interface FundingActionPlanData {
  priorityRanking: PriorityRankingItem[];
  timeline: StrategyTimelineItem[];
  sequence: string[];
  docChecklist: string[];
  riskWarnings: ProgramRiskWarning[];
  actionPlan: {
    thisWeek: string[];
    thisMonth: string[];
    beforeApplying: string[];
  };
}

export function generateFundingActionPlan(report: FundingMatchReport): FundingActionPlanData {
  const topPrograms = report.programs.slice(0, 3);

  const priorityRanking: PriorityRankingItem[] = topPrograms.map((p, idx) => ({
    id: p.id,
    name: p.name,
    agency: p.agency,
    rank: idx + 1,
    matchReason: p.matchReason,
    fundingAmount: p.estimatedRange || p.fundingAmount,
    difficulty: p.difficulty,
  }));

  const timeline: StrategyTimelineItem[] = report.programs.map((p, idx) => {
    let targetMonth = 'Stage 4: Post-Approval Claim';
    let actionRequired = 'Monitor program status and verify eligibility credentials.';

    if (idx === 0) {
      targetMonth = 'Stage 1: Immediate Preparation';
      actionRequired = 'Complete project draft scope and compile initial payroll/expense logs for immediate filing.';
    } else if (idx === 1) {
      targetMonth = 'Stage 2: Eligibility Readiness';
      actionRequired = 'Draft project timeline and coordinate with your accounting team for matching funds authorization.';
    } else if (idx === 2) {
      targetMonth = 'Stage 3: Formal Submission';
      actionRequired = 'Compile corporate tax records and finalize your partner/vendor quotes.';
    }

    return {
      programId: p.id,
      programName: p.name,
      agency: p.agency,
      targetMonth,
      actionRequired,
    };
  });

  const sequence: string[] = [
    'Stage 1: Submit training & hiring grant applications first to lower ongoing payroll liability before starting projects.',
    'Stage 2: Align and claim R&D tax credits simultaneously (e.g., SR&ED) to recover up to 60-70% of technical development expenses.',
    'Stage 3: Apply for large-scale business expansion grants or regional loans once hiring and initial project milestones are locked in.',
  ];

  const uniqueDocs = new Set<string>();
  report.programs.forEach((p) => {
    (p.requiredDocuments || []).forEach((doc) => {
      if (doc && doc !== 'N/A') uniqueDocs.add(doc);
    });
  });

  if (uniqueDocs.size < 3) {
    uniqueDocs.add('Articles of Incorporation (Federal or Provincial)');
    uniqueDocs.add('Corporate Tax Returns (T2) for the last 2 fiscal years');
    uniqueDocs.add('Detailed project budget breakdown (Labor, Materials, Subcontractors)');
    uniqueDocs.add('Current employee payroll log (T4 summaries)');
  }

  const riskWarnings: ProgramRiskWarning[] = report.programs.map((p) => {
    let riskLevel: 'Low' | 'Moderate' | 'High' = 'Moderate';
    let riskDescription = 'Intake pool exhaustion: Government budgets are subject to quarterly caps. Submit early to secure allocation.';

    if (p.difficulty === 'High' || p.difficulty === 'Competitive') {
      riskLevel = 'High';
      riskDescription = 'Rigorous audit compliance: Requires detailed time-tracking logs and project-specific accounting.';
    } else if (p.difficulty === 'Low') {
      riskLevel = 'Low';
      riskDescription = 'Standard administrative checklist: Low risk of audit, but requires timely registration filings.';
    }

    return {
      programId: p.id,
      programName: p.name,
      riskLevel,
      riskDescription,
    };
  });

  const thisWeek = [
    'Assign a project coordinator to lead application document collection.',
    'Draft a 1-page summary detailing project objectives and key milestones.',
    'Retrieve copies of incorporation certificates and locate historical tax returns.',
  ];

  const thisMonth = [
    'Setup a project-specific cost-tracking spreadsheet for payroll and contractors.',
    'Verify that upcoming hiring needs align with targeted wage subsidy profiles.',
    'Schedule a pre-screening call to verify core eligibility limits.',
  ];

  const beforeApplying = [
    'Run a manual pre-audit eligibility review on corporate structures.',
    'Ensure project start dates do not precede program registration dates.',
    'Confirm that matching funds/deposits are verified and accessible.',
  ];

  return {
    priorityRanking,
    timeline,
    sequence,
    docChecklist: Array.from(uniqueDocs),
    riskWarnings,
    actionPlan: {
      thisWeek,
      thisMonth,
      beforeApplying,
    },
  };
}
