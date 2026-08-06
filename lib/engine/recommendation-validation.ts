// lib/engine/recommendation-validation.ts

import { HistoricalEffectiveness, RecommendationValidation } from './types';

export interface AccuracyReport {
  totalRecommendedProgramsEvaluated: number;
  totalAppliedPrograms: number;
  totalApprovedPrograms: number;
  recommendationAccuracyPct: number; // Formula: (Approved / Applied) * 100
  unappliedReasonBreakdown: Record<string, number>;
}

/**
  Phase 4C: Recommendation Validation Engine
  Calculates deterministic platform-wide Recommendation Accuracy % and non-application diagnostic reasons.
 */
export function validateRecommendationQuality(
  validations: RecommendationValidation[]
): AccuracyReport {
  const totalRecommendedProgramsEvaluated = validations.length;
  const appliedList = validations.filter((v) => v.didClientApply);
  const approvedList = appliedList.filter((v) => v.wasApproved);

  const totalAppliedPrograms = appliedList.length;
  const totalApprovedPrograms = approvedList.length;

  const recommendationAccuracyPct =
    totalAppliedPrograms > 0
      ? Math.round((totalApprovedPrograms / totalAppliedPrograms) * 100)
      : 100;

  const unappliedReasonBreakdown: Record<string, number> = {};
  validations.forEach((v) => {
    if (!v.didClientApply && v.reasonNotApplied) {
      unappliedReasonBreakdown[v.reasonNotApplied] =
        (unappliedReasonBreakdown[v.reasonNotApplied] || 0) + 1;
    }
  });

  return {
    totalRecommendedProgramsEvaluated,
    totalAppliedPrograms,
    totalApprovedPrograms,
    recommendationAccuracyPct,
    unappliedReasonBreakdown,
  };
}

/**
  Calibrates Historical Effectiveness rating deterministically based on real aggregate client outcome approval rates.
  CEO Guarantee: Strictly updates advisory HistoricalEffectiveness label without altering CommercialScore (Profile Fit).
 */
export function calibrateEvidenceConfidence(
  programId: string,
  historicalApprovalRatePct: number
): HistoricalEffectiveness {
  if (historicalApprovalRatePct >= 80) return 'High';
  if (historicalApprovalRatePct >= 50) return 'Medium';
  return 'Low';
}
