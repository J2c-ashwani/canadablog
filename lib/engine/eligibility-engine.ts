// lib/engine/eligibility-engine.ts

import { ProgramDetails } from '@/lib/data/programs';
import { IntelligentlyMappedProfile } from './intelligence-engine';
import { RuleID } from './types';

export interface EligibilityResult {
  isEligible: boolean;
  ruleId?: RuleID;
  exclusionReason?: string;
  unlockCriteria?: string;
  reEvaluateStage?: string;
}

/**
  Stage 2: Eligibility Engine
  Applies hard negative exclusions with versioned Rule IDs and generates "How to Become Eligible" criteria.
 */
export function evaluateProgramEligibility(
  program: ProgramDetails,
  profile: IntelligentlyMappedProfile
): EligibilityResult {
  // 1. Program Status Gate
  if (program.status !== 'Open') {
    return {
      isEligible: false,
      ruleId: 'RULE-002',
      exclusionReason: `Program status is currently ${program.status.toLowerCase()}.`,
      unlockCriteria: 'Revisit when the government opens the next application intake window.',
      reEvaluateStage: 'Intake Opening Stage',
    };
  }

  // 2. Geographic Gates
  if (program.country !== profile.country) {
    return {
      isEligible: false,
      ruleId: 'RULE-001',
      exclusionReason: `Available only to businesses operating in ${program.country}.`,
      unlockCriteria: `Establish a registered legal entity or operating facility in ${program.country}.`,
      reEvaluateStage: 'International Expansion Stage',
    };
  }

  if (program.region !== 'Federal' && program.region !== profile.provinceName) {
    return {
      isEligible: false,
      ruleId: 'RULE-001',
      exclusionReason: `Regional restriction: Limited to ${program.region} businesses.`,
      unlockCriteria: `Incorporate or register a primary physical office in ${program.region}.`,
      reEvaluateStage: 'Regional Office Setup Stage',
    };
  }

  const haystack = `${program.name} ${program.description} ${program.agency} ${program.category || ''}`.toLowerCase();

  // 3. Agriculture Mismatch Exclusion
  const isAgriProgram =
    program.category === 'Agriculture' ||
    haystack.includes('agricultur') ||
    haystack.includes('farming') ||
    haystack.includes('agri-food');

  if (isAgriProgram && profile.industry !== 'agriculture') {
    return {
      isEligible: false,
      ruleId: 'RULE-018',
      exclusionReason: 'Requires commercial agricultural, farming, or agri-food processing operations.',
      unlockCriteria: 'Integrate agricultural producers or sustainable farm supply chains into your product scope.',
      reEvaluateStage: 'Agri-Tech Pivot Stage',
    };
  }

  // 4. Clean Energy / Facility Retrofit Mismatch Exclusion
  const isEnergyProgram =
    program.category === 'Green Energy' ||
    haystack.includes('facility retrofit') ||
    haystack.includes('solar installation') ||
    haystack.includes('eco-efficiency');

  if (isEnergyProgram && profile.industry !== 'energy') {
    return {
      isEligible: false,
      ruleId: 'RULE-018',
      exclusionReason: 'Requires commercial facility energy retrofits or clean tech infrastructure installation.',
      unlockCriteria: 'Perform a certified commercial facility energy audit prior to capital expenditure.',
      reEvaluateStage: 'Facility Upgrade Stage',
    };
  }

  // 5. Large Industrial Scale Mismatch Exclusion (e.g., SIF)
  const isLargeScale =
    program.fundingAmount.toLowerCase().includes('minimum $10 million') ||
    program.name.includes('Strategic Innovation Fund');

  if (isLargeScale && (profile.revenue === 'pre-revenue' || profile.revenue === 'under-100k' || profile.revenue === '100k-500k')) {
    return {
      isEligible: false,
      ruleId: 'RULE-014',
      exclusionReason: 'Targeted at large-scale industrial projects requiring $20M+ project scope.',
      unlockCriteria: 'Revisit this program once annual revenues exceed $10M or when leading a major commercial manufacturing line.',
      reEvaluateStage: 'Scale-Up Enterprise Stage',
    };
  }

  // 6. Minimum Revenue Threshold Exclusion
  if (program.minRevenueThreshold) {
    const revLimits: Record<string, number> = {
      'pre-revenue': 0,
      'under-100k': 50000,
      '100k-500k': 250000,
      '500k-1m': 750000,
      'over-1m': 1500000,
    };
    const currentRevEstimate = revLimits[profile.revenue] || 0;
    if (currentRevEstimate < program.minRevenueThreshold) {
      return {
        isEligible: false,
        exclusionReason: `Requires minimum declared annual revenue of $${program.minRevenueThreshold.toLocaleString()}.`,
        unlockCriteria: `Scale commercial sales to achieve $${program.minRevenueThreshold.toLocaleString()} in gross revenues in the prior fiscal year.`,
      };
    }
  }

  return { isEligible: true };
}
