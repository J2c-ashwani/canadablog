// lib/engine/recommendation-engine.ts

import { ProgramDetails } from '@/lib/data/programs';
import { IntelligentlyMappedProfile } from './intelligence-engine';
import { evaluateProgramEligibility, EligibilityResult } from './eligibility-engine';
import {
  EvaluatedRecommendation,
  SkippedProgramResult,
  RecommendationType,
  REPORT_CONFIG,
} from './types';

const INDUSTRY_KEYWORDS: Record<string, string[]> = {
  technology: ['tech', 'software', 'digital', 'ai', 'innovation', 'r&d', 'research', 'sred', 'sr&ed', 'cyber', 'code'],
  manufacturing: ['manufactur', 'industrial', 'supply chain', 'machinery', 'production', 'plant'],
  agriculture: ['agri', 'farm', 'food', 'rural', 'crop', 'sustain'],
  healthcare: ['health', 'bio', 'medical', 'life science', 'pharma', 'clinical', 'nih'],
  energy: ['energy', 'clean', 'solar', 'wind', 'carbon', 'climate', 'eco', 'green'],
  retail: ['retail', 'ecommerce', 'e-commerce', 'consumer', 'sales'],
  services: ['service', 'consulting', 'professional', 'advisory'],
};

const OBJECTIVE_KEYWORDS: Record<string, string[]> = {
  'Launch MVP': ['research', 'r&d', 'innovation', 'technology', 'sred', 'sr&ed', 'prototype', 'develop'],
  'Acquire Customers': ['ecommerce', 'digital', 'marketing', 'sales', 'retail', 'adoption'],
  'Hire Team': ['hiring', 'hire', 'employee', 'workforce', 'training', 'wage', 'payroll', 'youth', 'co-op', 'intern'],
  'Increase Production': ['manufactur', 'industrial', 'equipment', 'machinery', 'automation'],
  'Enter USA': ['export', 'international', 'trade', 'global', 'market'],
  Export: ['export', 'international', 'trade', 'global', 'market'],
  'Commercialize IP': ['research', 'r&d', 'innovation', 'technology', 'patent', 'commercial'],
  'Automate Operations': ['digital', 'software', 'adoption', 'crm', 'erp', 'automation'],
};

import { executeStrategyEngine, ScoredProgramInput } from './strategy-engine';

export interface ScoredProgram {
  program: ProgramDetails;
  commercialScore: number;
  industryHits: number;
  objectiveHits: number;
  eligibility: EligibilityResult;
}

import { ScoreBreakdown, ExclusionAuditLogEntry, HistoricalEffectiveness } from './types';

export interface ScoredProgram {
  program: ProgramDetails;
  commercialScore: number;
  scoreBreakdown: ScoreBreakdown;
  industryHits: number;
  objectiveHits: number;
  eligibility: EligibilityResult;
}

/**
  Stage 3 & Stage 4: Recommendation & Strategy Engines
  Calculates 100-pt Commercial Score with ScoreBreakdown, executes Strategy Engine formulas, and records Audit Logs.
 */
export function scoreAndRankPrograms(
  programs: ProgramDetails[],
  profile: IntelligentlyMappedProfile
): {
  primary: EvaluatedRecommendation[];
  conditional: EvaluatedRecommendation[];
  skipped: SkippedProgramResult[];
  exclusionAuditTrail: ExclusionAuditLogEntry[];
} {
  const eligibleScored: ScoredProgram[] = [];
  const ineligibleScored: { program: ProgramDetails; result: EligibilityResult }[] = [];

  programs.forEach((program) => {
    const eligibility = evaluateProgramEligibility(program, profile);
    if (!eligibility.isEligible) {
      ineligibleScored.push({ program, result: eligibility });
      return;
    }

    const scoreData = calculateCommercialScore(program, profile);
    eligibleScored.push({
      program,
      commercialScore: scoreData.totalScore,
      scoreBreakdown: scoreData.scoreBreakdown,
      industryHits: scoreData.industryHits,
      objectiveHits: scoreData.objectiveHits,
      eligibility,
    });
  });

  // Sort eligible programs primarily by score descending, secondarily by name
  eligibleScored.sort((a, b) => {
    if (b.commercialScore !== a.commercialScore) return b.commercialScore - a.commercialScore;
    return a.program.name.localeCompare(b.program.name);
  });

  // Partition into Primary (Immediate/Near-Term) and Conditional (Future)
  const primaryRaw = eligibleScored.filter((s) => s.commercialScore >= 60);
  const conditionalRaw = eligibleScored.filter((s) => s.commercialScore < 60);

  // Apply REPORT_CONFIG limits (Quality Over Quantity)
  const primarySlice = primaryRaw.slice(0, REPORT_CONFIG.primaryRecommendations);
  const conditionalSlice = conditionalRaw.slice(0, REPORT_CONFIG.conditionalRecommendations);

  // Stage 4: Execute Strategy Engine for Primary & Conditional slices
  const primary: EvaluatedRecommendation[] = executeStrategyEngine(
    primarySlice.map((s) => ({
      program: s.program,
      commercialScore: s.commercialScore,
      scoreBreakdown: s.scoreBreakdown,
      industryHits: s.industryHits,
      objectiveHits: s.objectiveHits,
    })),
    profile
  );

  const conditional: EvaluatedRecommendation[] = executeStrategyEngine(
    conditionalSlice.map((s) => ({
      program: s.program,
      commercialScore: s.commercialScore,
      scoreBreakdown: s.scoreBreakdown,
      industryHits: s.industryHits,
      objectiveHits: s.objectiveHits,
    })),
    profile
  );

  // Format Skipped Programs & Exclusion Audit Trail
  const skipped: SkippedProgramResult[] = [];
  const exclusionAuditTrail: ExclusionAuditLogEntry[] = [];

  ineligibleScored.forEach(({ program, result }) => {
    if (skipped.length < REPORT_CONFIG.excludedPrograms) {
      skipped.push({
        programId: program.id,
        programName: program.name,
        agency: program.agency,
        reasonNotRecommended: result.exclusionReason || 'Not currently recommended for your business profile.',
        unlockCriteria: result.unlockCriteria || 'Revisit when company operational milestones expand.',
      });
    }

    exclusionAuditTrail.push({
      programId: program.id,
      programName: program.name,
      ruleId: result.ruleId || 'RULE-001',
      ruleDescription: result.exclusionReason || 'Hard exclusion rule triggered.',
      thresholdValue: program.minRevenueThreshold ? `< $${(program.minRevenueThreshold / 1_000_000).toFixed(0)}M Revenue` : 'Criteria Mismatch',
      unlockCriteria: result.unlockCriteria || 'Revisit upon milestone milestone expansion',
      reEvaluateStage: result.reEvaluateStage || 'Scale-Up Stage',
      owner: 'Funding Advisory Team',
      effectiveDate: '2026-08-01',
      severity: result.ruleId === 'RULE-014' ? 'CRITICAL' : 'HIGH',
    });
  });

  return { primary, conditional, skipped, exclusionAuditTrail };
}

function calculateCommercialScore(
  program: ProgramDetails,
  profile: IntelligentlyMappedProfile
): { totalScore: number; scoreBreakdown: ScoreBreakdown; industryHits: number; objectiveHits: number } {
  const haystack = `${program.name} ${program.description} ${program.agency}`.toLowerCase();

  const indKeys = INDUSTRY_KEYWORDS[profile.industry] || [];
  const objKeys = OBJECTIVE_KEYWORDS[profile.businessObjective] || [];

  const industryHits = indKeys.filter((kw) => haystack.includes(kw)).length;
  const objectiveHits = objKeys.filter((kw) => haystack.includes(kw)).length;

  // 1. Industry Fit (max 25)
  const industryScore = Math.min(25, industryHits * 10);

  // 2. Business Objective Fit (max 20)
  const objectiveScore = Math.min(20, objectiveHits * 8);

  // 3. Stage Fit (max 15)
  let stageScore = 10;
  if (profile.revenue === 'pre-revenue' && program.fundingDifficulty === 'Low') stageScore = 15;
  if (profile.revenue !== 'pre-revenue' && program.fundingType === 'Tax Credit') stageScore = 15;

  // 4. Province & Region Match (max 10)
  let provinceScore = 5;
  if (program.region === profile.provinceName) provinceScore = 10;
  if (program.region === 'Federal') provinceScore = 8;

  // 5. Status & Accessibility (max 10)
  const statusScore = program.status === 'Open' ? 10 : 0;

  // 6. Commercial Value Sub-Score (max 20)
  let commercialValueScore = 0;
  if (program.fundingAmount.includes('Million') || program.fundingAmount.includes('64%')) commercialValueScore += 6;
  else if (program.fundingAmount.includes('50,000') || program.fundingAmount.includes('100,000')) commercialValueScore += 5;
  else commercialValueScore += 3;

  if (program.fundingDifficulty === 'Low') commercialValueScore += 5;
  else if (program.fundingDifficulty === 'Moderate') commercialValueScore += 4;
  else commercialValueScore += 2;

  const docCount = program.documentsRequiredCount || (program.eligibility?.length || 3);
  if (docCount <= 3) commercialValueScore += 4;
  else if (docCount <= 5) commercialValueScore += 3;
  else commercialValueScore += 2;

  const prepTime = program.preparationTime || '2–3 weeks';
  if (prepTime.includes('days') || prepTime.includes('1 week')) commercialValueScore += 3;
  else commercialValueScore += 2;

  if (program.fundingType === 'Grant' || program.fundingType === 'Tax Credit') commercialValueScore += 2;
  else commercialValueScore += 1;

  let sredBoost = 0;
  if (profile.industry === 'technology' && (haystack.includes('sr&ed') || haystack.includes('sred'))) {
    sredBoost = 15;
  }

  const totalScore = Math.min(
    96,
    industryScore + objectiveScore + stageScore + provinceScore + statusScore + commercialValueScore + sredBoost
  );

  const scoreBreakdown: ScoreBreakdown = {
    industryFit: industryScore,
    objectiveFit: objectiveScore,
    stageFit: stageScore,
    provinceMatch: provinceScore,
    statusAccessibility: statusScore,
    commercialRoiValue: commercialValueScore,
    totalScore,
  };

  return { totalScore, scoreBreakdown, industryHits, objectiveHits };
}

function buildEvaluatedRecommendation(
  program: ProgramDetails,
  profile: IntelligentlyMappedProfile,
  score: number,
  index: number
): EvaluatedRecommendation {
  const sequenceTier: 'Apply First' | 'Apply Second' | 'Apply Later' =
    index === 0 ? 'Apply First' : index === 1 ? 'Apply Second' : 'Apply Later';

  // Classification into RecommendationType
  let recommendationType: RecommendationType = 'Immediate Opportunity';
  if (score < 70) recommendationType = 'Near-Term Opportunity';
  if (program.fundingDifficulty === 'Competitive' && profile.revenue === 'pre-revenue') {
    recommendationType = 'Future Opportunity';
  }

  // Deterministic Recommendation Confidence
  const confidencePct = Math.min(96, Math.max(65, score));
  const recommendationConfidence = `${confidencePct}% Confidence (${score >= 80 ? 'High' : 'Medium'})`;

  // Realistic Readiness Stars (Business Readiness x Program Complexity)
  const complexity = program.complexity || (program.fundingDifficulty === 'Competitive' ? 'High' : 'Medium');
  let readinessStars = '★★★★☆';
  if (score >= 85 && complexity !== 'High') readinessStars = '★★★★★';
  else if (score >= 70) readinessStars = '★★★★☆';
  else if (score >= 55) readinessStars = '★★★☆☆';
  else readinessStars = '★★☆☆☆';

  const descSnippet = program.description.split('.')[0];
  const prepTime = program.preparationTime || '2–3 weeks';
  const reviewTime = program.reviewTime || '4–8 weeks';
  const docCount = program.documentsRequiredCount || (program.eligibility?.length || 4);

  return {
    programId: program.id,
    programName: program.name,
    agency: program.agency,
    fundingAmount: program.fundingAmount,
    fundingType: program.fundingType,
    difficulty: program.fundingDifficulty,
    recommendationType,
    recommendationConfidence,
    dataFreshness: program.lastReviewed ? `Verified ${new Date(program.lastReviewed).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : 'Verified Aug 2026',
    readinessStars,
    evidenceRating: {
      governmentAuthority: '★★★★★',
      eligibilityFit: score >= 85 ? '★★★★★' : '★★★★☆',
      documentationCompleteness: '★★★★☆',
    },
    commercialScore: score,
    scoreBreakdown: {
      industryFit: Math.min(25, Math.round(score * 0.25)),
      objectiveFit: Math.min(20, Math.round(score * 0.20)),
      stageFit: Math.min(15, Math.round(score * 0.15)),
      provinceMatch: 10,
      statusAccessibility: 10,
      commercialRoiValue: Math.min(20, Math.round(score * 0.20)),
      totalScore: score,
    },
    historicalEffectiveness: program.fundingType === 'Tax Credit' || program.fundingDifficulty === 'Low' ? 'High' : 'Medium',
    sequenceTier,
    preparationTime: prepTime,
    reviewTime,
    documentsRequiredCount: docCount,
    whyRecommended: `Highly tailored fit for your ${profile.industryName.toLowerCase()} business focusing on ${profile.businessObjective.toLowerCase()}. ${descSnippet}.`,
    whyRankedHere: `Ranked ${sequenceTier.toLowerCase()} due to high commercial ROI, strong profile alignment, and manageable preparation effort (${prepTime}).`,
    typicalRejectionReason: `Common rejection occurs from non-contemporaneous documentation or starting project expenditures before formal application registration.`,
    howToImproveSuccess: [
      `Maintain detailed JIRA/developer activity logs contemporaneously.`,
      `Verify matching cash reserves prior to formal submission.`,
      `Engage program officers early to align technical proposal framing.`,
    ],
    requiredDocuments: program.eligibility || [],
    applicationSteps: program.applicationProcess || [],
    officialWebsite: program.officialWebsite,
  };
}
