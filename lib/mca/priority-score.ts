// lib/mca/priority-score.ts
// MCA Priority Score — Internal Processing Priority Only
//
// IMPORTANT: This score is NEVER shown to applicants.
// It is NEVER used to reject an application.
// It determines ONLY the internal handling speed and partner routing priority.
// The funding partner makes ALL funding decisions.

import { PriorityBand } from './types';

const LOW_RISK_INDUSTRIES = [
  'restaurant',
  'retail',
  'healthcare',
  'professional services',
  'auto repair',
  'construction',
  'manufacturing',
  'transportation',
  'trucking',
];

const HIGH_PRIORITY_PROVINCES = ['ON', 'BC', 'AB', 'QC'];

interface ScoreInput {
  monthlyRevenue: number;
  yearsInBusiness: number;
  fundingAmount: number;
  industry: string;
  province: string;
  website?: string;
  consent: boolean;
}

interface ScoreResult {
  priorityScore: number;
  priorityBand: PriorityBand;
}

export function calculatePriorityScore(input: ScoreInput): ScoreResult {
  let score = 0;

  // Monthly Revenue (max 30 points)
  if (input.monthlyRevenue >= 20000) {
    score += 30;
  } else if (input.monthlyRevenue >= 10000) {
    score += 15;
  } else if (input.monthlyRevenue >= 5000) {
    score += 5;
  }

  // Years in Business (max 20 points)
  if (input.yearsInBusiness >= 2) {
    score += 20;
  } else if (input.yearsInBusiness >= 1) {
    score += 10;
  }

  // Funding Amount vs Revenue ratio (max 15 points)
  if (input.monthlyRevenue > 0) {
    const ratio = input.fundingAmount / input.monthlyRevenue;
    if (ratio <= 1.0) score += 15;
    else if (ratio <= 2.0) score += 8;
  }

  // Industry risk profile (max 10 points)
  if (LOW_RISK_INDUSTRIES.includes(input.industry.toLowerCase())) {
    score += 10;
  }

  // Province (max 5 points)
  if (HIGH_PRIORITY_PROVINCES.includes(input.province.toUpperCase())) {
    score += 5;
  }

  // Website provided (max 5 points)
  if (input.website && input.website.trim().length > 0) {
    score += 5;
  }

  // Consent is required — if not given, score is 0 (should never reach scoring)
  if (!input.consent) {
    score = 0;
  }

  const priorityBand: PriorityBand =
    score >= 70 ? 'A' :
    score >= 50 ? 'B' :
    score >= 30 ? 'C' : 'D';

  return { priorityScore: score, priorityBand };
}
