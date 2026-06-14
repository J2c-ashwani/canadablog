import { getAllPrograms, type ProgramDetails } from '@/lib/data/programs';

// ── Input / Output Types ──

export interface ReportInput {
  province: string;  // e.g., 'on', 'bc', 'qc', 'ca', 'tx'
  industry: string;  // e.g., 'technology', 'manufacturing', 'agriculture'
  revenue: string;   // e.g., 'pre-revenue', 'under-100k', '100k-500k', '500k-1m', 'over-1m'
  goal: string;      // e.g., 'hiring', 'research', 'expansion', 'export'
}

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
}

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
  };
  programs: ReportProgram[];
}

// ── Lookup Maps ──

const PROVINCE_MAP: Record<string, { name: string; country: 'Canada' | 'USA' }> = {
  // Canada
  on: { name: 'Ontario', country: 'Canada' },
  bc: { name: 'British Columbia', country: 'Canada' },
  ab: { name: 'Alberta', country: 'Canada' },
  qc: { name: 'Quebec', country: 'Canada' },
  ns: { name: 'Nova Scotia', country: 'Canada' },
  mb: { name: 'Manitoba', country: 'Canada' },
  sk: { name: 'Saskatchewan', country: 'Canada' },
  nb: { name: 'New Brunswick', country: 'Canada' },
  nl: { name: 'Newfoundland and Labrador', country: 'Canada' },
  pe: { name: 'Prince Edward Island', country: 'Canada' },
  territories: { name: 'Territories', country: 'Canada' },
  national: { name: 'Federal', country: 'Canada' },
  // USA
  ca: { name: 'California', country: 'USA' },
  tx: { name: 'Texas', country: 'USA' },
  ny: { name: 'New York', country: 'USA' },
  fl: { name: 'Florida', country: 'USA' },
  il: { name: 'Illinois', country: 'USA' },
  oh: { name: 'Ohio', country: 'USA' },
  wa: { name: 'Washington', country: 'USA' },
  ma: { name: 'Massachusetts', country: 'USA' },
  co: { name: 'Colorado', country: 'USA' },
  nc: { name: 'North Carolina', country: 'USA' },
  mi: { name: 'Michigan', country: 'USA' },
  va: { name: 'Virginia', country: 'USA' },
  ga: { name: 'Georgia', country: 'USA' },
  pa: { name: 'Pennsylvania', country: 'USA' },
};

const INDUSTRY_NAMES: Record<string, string> = {
  technology: 'Technology & Software',
  manufacturing: 'Manufacturing',
  agriculture: 'Agriculture & Agri-Food',
  healthcare: 'Healthcare & Life Sciences',
  energy: 'Clean Tech & Energy',
  retail: 'Retail & E-commerce',
  services: 'Professional Services',
  other: 'General Business',
};

const REVENUE_NAMES: Record<string, string> = {
  'pre-revenue': 'Pre-revenue / Startup',
  'under-100k': 'Under $100,000',
  '100k-500k': '$100,000 – $500,000',
  '500k-1m': '$500,000 – $1,000,000',
  'over-1m': 'Over $1,000,000',
};

const GOAL_NAMES: Record<string, string> = {
  hiring: 'Hiring & Training',
  research: 'R&D / Innovation',
  expansion: 'Business Expansion',
  export: 'Exporting / International',
};

// ── Helpers ──

/**
 * Attempts to extract dollar amounts from a funding string like
 * "Up to $500,000", "$50,000 to $200,000", or "Phase I: $150K-$275K".
 * Returns [min, max] in raw numbers, or null if parsing fails.
 */
function parseFundingRange(fundingAmount: string): [number, number] | null {
  const normalized = fundingAmount
    .replace(/,/g, '')
    .replace(/K/gi, '000')
    .replace(/M/gi, '000000');

  const matches = normalized.match(/\$([0-9]+(?:\.[0-9]+)?)/g);
  if (!matches || matches.length === 0) return null;

  const values = matches.map((m) => parseFloat(m.replace('$', '')));

  if (values.length === 1) {
    return [0, values[0]];
  }

  const sorted = values.sort((a, b) => a - b);
  return [sorted[0], sorted[sorted.length - 1]];
}

function scaleFundingByRevenue(
  range: [number, number],
  revenue: string
): [number, number] {
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
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value.toLocaleString()}`;
}

/** Industry keyword sets used for scoring match strength. */
const INDUSTRY_KEYWORDS: Record<string, string[]> = {
  technology: ['tech', 'software', 'digital', 'ai', 'innovation', 'r&d', 'research', 'sred', 'sr&ed', 'cyber'],
  manufacturing: ['manufactur', 'industrial', 'supply chain', 'machinery', 'production'],
  agriculture: ['agri', 'farm', 'food', 'rural', 'crop', 'sustain'],
  healthcare: ['health', 'bio', 'medical', 'life science', 'pharma', 'clinical', 'nih'],
  energy: ['energy', 'clean', 'solar', 'wind', 'carbon', 'climate', 'eco', 'green'],
  retail: ['retail', 'ecommerce', 'e-commerce', 'consumer', 'sales'],
  services: ['service', 'consulting', 'professional', 'advisory'],
};

const GOAL_KEYWORDS: Record<string, string[]> = {
  hiring: ['hiring', 'hire', 'employee', 'workforce', 'training', 'wage', 'payroll', 'youth', 'co-op', 'credential', 'intern'],
  research: ['research', 'r&d', 'innovation', 'technology', 'sred', 'sr&ed', 'prototype', 'develop', 'sbir', 'sttr'],
  expansion: ['expansion', 'growth', 'scale', 'invest', 'accelerat', 'enterprise', 'facility'],
  export: ['export', 'international', 'trade', 'global', 'market'],
};

function computeMatchStrength(
  program: ProgramDetails,
  industry: string,
  goal: string
): 'Strong Match' | 'Good Match' | 'Potential Match' {
  const haystack = `${program.name} ${program.description} ${program.agency}`.toLowerCase();

  const industryKeys = INDUSTRY_KEYWORDS[industry] || [];
  const goalKeys = GOAL_KEYWORDS[goal] || [];

  const industryHits = industryKeys.filter((kw) => haystack.includes(kw)).length;
  const goalHits = goalKeys.filter((kw) => haystack.includes(kw)).length;

  // Special SR&ED boost for tech + research
  if (
    industry === 'technology' &&
    goal === 'research' &&
    (haystack.includes('sr&ed') || haystack.includes('sred'))
  ) {
    return 'Strong Match';
  }

  if (industryHits >= 2 && goalHits >= 1) return 'Strong Match';
  if (industryHits >= 1 || goalHits >= 1) return 'Good Match';
  return 'Potential Match';
}

function buildMatchReason(
  program: ProgramDetails,
  industryName: string,
  goalName: string,
  matchStrength: string
): string {
  const descSnippet = program.description.split('.')[0];

  if (matchStrength === 'Strong Match') {
    return `Highly tailored match: Your business in the ${industryName.toLowerCase()} sector directly aligns with this program's core mandate. Specifically, your strategic focus on ${goalName.toLowerCase()} qualifies you for initiatives that ${descSnippet.toLowerCase()}.`;
  }
  if (matchStrength === 'Good Match') {
    return `Strategic match: Your objectives for ${goalName.toLowerCase()} are highly relevant to this program's support structure. It specifically funds activities designed to ${descSnippet.charAt(0).toLowerCase()}${descSnippet.slice(1)}.`;
  }
  return `Potential opportunity: This ${program.fundingType.toLowerCase()} program is aimed at projects that ${descSnippet.charAt(0).toLowerCase()}${descSnippet.slice(1)}, making it a valuable option for your ${industryName.toLowerCase()} business.`;
}

const MATCH_ORDER: Record<string, number> = {
  'Strong Match': 0,
  'Good Match': 1,
  'Potential Match': 2,
};

// ── Main Generator ──

export function generateFundingMatchReport(input: ReportInput): FundingMatchReport {
  const allPrograms = getAllPrograms();

  const provinceInfo = PROVINCE_MAP[input.province.toLowerCase()] || {
    name: input.province,
    country: 'Canada' as const,
  };

  const industryName = INDUSTRY_NAMES[input.industry] || 'General Business';
  const revenueName = REVENUE_NAMES[input.revenue] || input.revenue;
  const goalName = GOAL_NAMES[input.goal] || input.goal;

  // Step 1: Filter programs by country, region, and status
  const filtered = allPrograms.filter((p) => {
    // Only open programs
    if (p.status !== 'Open') return false;

    // Must be same country
    if (p.country !== provinceInfo.country) return false;

    // Federal programs always included; also include province-specific
    if (p.region === 'Federal') return true;
    if (p.region === provinceInfo.name) return true;

    return false;
  });

  // Step 2: Score and build report programs
  let estimatedTotalMin = 0;
  let estimatedTotalMax = 0;

  const reportPrograms: ReportProgram[] = filtered.map((p) => {
    const matchStrength = computeMatchStrength(p, input.industry, input.goal);
    const matchReason = buildMatchReason(p, industryName, goalName, matchStrength);

    // Compute estimated range
    const parsed = parseFundingRange(p.fundingAmount);
    let estimatedRange = p.fundingAmount;

    if (parsed) {
      const scaled = scaleFundingByRevenue(parsed, input.revenue);
      estimatedRange = `${formatDollar(scaled[0])} – ${formatDollar(scaled[1])}`;
      estimatedTotalMin += scaled[0];
      estimatedTotalMax += scaled[1];
    }

    return {
      id: p.id,
      name: p.name,
      agency: p.agency,
      fundingAmount: p.fundingAmount,
      fundingType: p.fundingType,
      difficulty: p.fundingDifficulty,
      matchStrength,
      matchReason,
      estimatedRange,
      requiredDocuments: p.eligibility,
      applicationSteps: p.applicationProcess,
      status: p.status,
      deadline: p.deadlineType,
    };
  });

  // Step 3: Sort by match strength, then by name. Cap at 12.
  reportPrograms.sort((a, b) => {
    const diff = MATCH_ORDER[a.matchStrength] - MATCH_ORDER[b.matchStrength];
    if (diff !== 0) return diff;
    return a.name.localeCompare(b.name);
  });

  const capped = reportPrograms.slice(0, 12);

  // Step 4: Calculate readiness score
  let readinessScore = 0;
  if (input.industry && input.industry !== 'other') readinessScore += 20;
  if (input.revenue && input.revenue !== 'pre-revenue') readinessScore += 20;
  if (input.goal) readinessScore += 20;
  if (input.province) readinessScore += 20;
  if (capped.some((p) => p.matchStrength === 'Strong Match')) readinessScore += 10;
  if (capped.length > 3) readinessScore += 10;

  return {
    generatedAt: new Date().toISOString(),
    profile: {
      province: input.province,
      provinceName: provinceInfo.name,
      industry: input.industry,
      industryName,
      revenue: input.revenue,
      revenueName,
      goal: input.goal,
      goalName,
    },
    summary: {
      totalPrograms: capped.length,
      estimatedTotalMin,
      estimatedTotalMax,
      readinessScore,
    },
    programs: capped,
  };
}
