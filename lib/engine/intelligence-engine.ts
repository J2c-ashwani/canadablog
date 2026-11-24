// lib/engine/intelligence-engine.ts

import { BusinessObjective } from './types';

export interface RawProfileInput {
  province: string;
  industry: string;
  revenue: string;
  goal: string;
}

export interface IntelligentlyMappedProfile {
  province: string;
  provinceName: string;
  country: 'Canada' | 'USA';
  industry: string;
  industryName: string;
  revenue: string;
  revenueName: string;
  goal: string;
  goalName: string;
  businessObjective: BusinessObjective;
  capitalNeedTier: string; // e.g. "$10,000 – $50,000"
}

const PROVINCE_MAP: Record<string, { name: string; country: 'Canada' | 'USA' }> = {
  // Canadian Provinces & Territories
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

  // US States & Territories
  al: { name: 'Alabama', country: 'USA' },
  ak: { name: 'Alaska', country: 'USA' },
  az: { name: 'Arizona', country: 'USA' },
  ar: { name: 'Arkansas', country: 'USA' },
  ca: { name: 'California', country: 'USA' },
  co: { name: 'Colorado', country: 'USA' },
  ct: { name: 'Connecticut', country: 'USA' },
  de: { name: 'Delaware', country: 'USA' },
  fl: { name: 'Florida', country: 'USA' },
  ga: { name: 'Georgia', country: 'USA' },
  hi: { name: 'Hawaii', country: 'USA' },
  id: { name: 'Idaho', country: 'USA' },
  il: { name: 'Illinois', country: 'USA' },
  in: { name: 'Indiana', country: 'USA' },
  ia: { name: 'Iowa', country: 'USA' },
  ks: { name: 'Kansas', country: 'USA' },
  ky: { name: 'Kentucky', country: 'USA' },
  la: { name: 'Louisiana', country: 'USA' },
  me: { name: 'Maine', country: 'USA' },
  md: { name: 'Maryland', country: 'USA' },
  ma: { name: 'Massachusetts', country: 'USA' },
  mi: { name: 'Michigan', country: 'USA' },
  mn: { name: 'Minnesota', country: 'USA' },
  ms: { name: 'Mississippi', country: 'USA' },
  mo: { name: 'Missouri', country: 'USA' },
  mt: { name: 'Montana', country: 'USA' },
  ne: { name: 'Nebraska', country: 'USA' },
  nv: { name: 'Nevada', country: 'USA' },
  nh: { name: 'New Hampshire', country: 'USA' },
  nj: { name: 'New Jersey', country: 'USA' },
  nm: { name: 'New Mexico', country: 'USA' },
  ny: { name: 'New York', country: 'USA' },
  nc: { name: 'North Carolina', country: 'USA' },
  nd: { name: 'North Dakota', country: 'USA' },
  oh: { name: 'Ohio', country: 'USA' },
  ok: { name: 'Oklahoma', country: 'USA' },
  or: { name: 'Oregon', country: 'USA' },
  pa: { name: 'Pennsylvania', country: 'USA' },
  ri: { name: 'Rhode Island', country: 'USA' },
  sc: { name: 'South Carolina', country: 'USA' },
  sd: { name: 'South Dakota', country: 'USA' },
  tn: { name: 'Tennessee', country: 'USA' },
  tx: { name: 'Texas', country: 'USA' },
  ut: { name: 'Utah', country: 'USA' },
  vt: { name: 'Vermont', country: 'USA' },
  va: { name: 'Virginia', country: 'USA' },
  wa: { name: 'Washington', country: 'USA' },
  wv: { name: 'West Virginia', country: 'USA' },
  wi: { name: 'Wisconsin', country: 'USA' },
  wy: { name: 'Wyoming', country: 'USA' },
  dc: { name: 'District of Columbia', country: 'USA' },
  national_us: { name: 'Federal', country: 'USA' },
};

const INDUSTRY_NAMES: Record<string, string> = {
  technology: 'Technology & Software',
  manufacturing: 'Manufacturing & Heavy Industry',
  agriculture: 'Agriculture & Agri-Food',
  healthcare: 'Healthcare & Life Sciences',
  energy: 'Clean Tech & Renewable Energy',
  retail: 'Retail & E-commerce',
  services: 'Professional Services',
  other: 'General Business Operations',
};

const REVENUE_NAMES: Record<string, string> = {
  'pre-revenue': 'Pre-revenue / Early-Stage Startup',
  'under-100k': 'Under $100,000 ARR',
  '100k-500k': '$100,000 – $500,000 ARR',
  '500k-1m': '$500,000 – $1,000,000 ARR',
  'over-1m': 'Over $1,000,000 ARR',
};

const GOAL_NAMES: Record<string, string> = {
  hiring: 'Hiring & Technical Workforce Expansion',
  research: 'R&D / Commercialization of IP',
  expansion: 'Business Operations Scaling',
  export: 'International Export & US Market Entry',
};

export function normalizeProvinceInput(raw: string): string {
  const s = String(raw || '').toLowerCase().trim();
  if (!s) return 'on';

  // 1. Direct code lookup in PROVINCE_MAP
  if (PROVINCE_MAP[s]) return s;

  // 2. Canadian matches by name / keyword
  if (s.includes('ontario')) return 'on';
  if (s.includes('british columbia')) return 'bc';
  if (s.includes('alberta')) return 'ab';
  if (s.includes('quebec')) return 'qc';
  if (s.includes('nova scotia')) return 'ns';
  if (s.includes('manitoba')) return 'mb';
  if (s.includes('saskatchewan')) return 'sk';
  if (s.includes('new brunswick')) return 'nb';
  if (s.includes('newfoundland') || s.includes('labrador')) return 'nl';
  if (s.includes('prince edward') || s === 'pei' || s.includes('p.e.i')) return 'pe';
  if (s.includes('territor') || s.includes('yukon') || s.includes('nunavut') || s.includes('northwest')) return 'territories';
  if (s === 'canada' || s === 'federal' || s === 'national') return 'national';

  // 3. Match US states by name
  for (const [code, info] of Object.entries(PROVINCE_MAP)) {
    if (info.country === 'USA' && code !== 'national_us') {
      const stateNameLower = info.name.toLowerCase();
      if (s === stateNameLower || s.includes(stateNameLower)) {
        return code;
      }
    }
  }

  // 4. US National / Federal fallback
  if (s === 'usa' || s === 'us' || s === 'united states') return 'national_us';

  return 'on';
}

export function normalizeIndustryInput(raw: string): string {
  const s = String(raw || '').toLowerCase().trim();
  if (s.includes('tech') || s.includes('saas') || s.includes('software') || s.includes('web-to-print') || s.includes('app')) return 'technology';
  if (s.includes('manufac') || s.includes('industrial') || s.includes('hardware')) return 'manufacturing';
  if (s.includes('agri') || s.includes('farm') || s.includes('food')) return 'agriculture';
  if (s.includes('health') || s.includes('bio') || s.includes('med')) return 'healthcare';
  if (s.includes('clean') || s.includes('energy') || s.includes('solar') || s.includes('green')) return 'energy';
  if (s.includes('retail') || s.includes('commerce') || s.includes('store')) return 'retail';
  if (s.includes('service') || s.includes('consult')) return 'services';
  if (s.includes('other') || s.includes('general')) return 'other';
  return 'technology';
}

export function normalizeRevenueInput(raw: string): string {
  const s = String(raw || '').toLowerCase().trim();
  if (s.includes('pre') || s.includes('startup') || s.includes('idea') || s.includes('seed')) return 'pre-revenue';
  if (s.includes('100k') && !s.includes('500k')) return 'under-100k';
  if (s.includes('500k')) return '100k-500k';
  if (s.includes('1m') || s.includes('million')) return 'over-1m';
  return 'pre-revenue';
}

export function normalizeGoalInput(raw: string): string {
  const s = String(raw || '').toLowerCase().trim();
  if (s.includes('hire') || s.includes('team') || s.includes('payroll') || s.includes('talent')) return 'hiring';
  if (s.includes('export') || s.includes('us') || s.includes('global') || s.includes('international')) return 'export';
  if (s.includes('expan') || s.includes('scale') || s.includes('market') || s.includes('platform')) return 'expansion';
  if (s.includes('r&d') || s.includes('research') || s.includes('dev') || s.includes('mvp') || s.includes('setup')) return 'research';
  return 'research';
}

/**
  Stage 1: Funding Intelligence Engine
  Maps customer intent to concrete Business Objectives.
 */
export function analyzeFundingIntelligence(input: RawProfileInput): IntelligentlyMappedProfile {
  const normProvince = normalizeProvinceInput(input.province);
  const normIndustry = normalizeIndustryInput(input.industry);
  const normRevenue = normalizeRevenueInput(input.revenue);
  const normGoal = normalizeGoalInput(input.goal);

  const provinceInfo = PROVINCE_MAP[normProvince] || { name: normProvince.toUpperCase(), country: 'Canada' as const };
  const industryName = INDUSTRY_NAMES[normIndustry] || 'General Business';
  const revenueName = REVENUE_NAMES[normRevenue] || normRevenue;
  const goalName = GOAL_NAMES[normGoal] || normGoal;

  // Determine Business Objective from Goal + Industry context
  let businessObjective: BusinessObjective = 'Launch MVP';

  if (normGoal === 'hiring') {
    businessObjective = 'Hire Team';
  } else if (normGoal === 'export') {
    businessObjective = provinceInfo.country === 'Canada' ? 'Enter USA' : 'Export';
  } else if (normGoal === 'expansion') {
    if (normIndustry === 'manufacturing') businessObjective = 'Increase Production';
    else if (normIndustry === 'retail') businessObjective = 'Acquire Customers';
    else businessObjective = 'Automate Operations';
  } else if (normGoal === 'research') {
    if (normRevenue === 'pre-revenue' || normRevenue === 'under-100k') {
      businessObjective = 'Launch MVP';
    } else {
      businessObjective = 'Commercialize IP';
    }
  }

  // Capital Need Tier
  let capitalNeedTier = '$25,000 – $75,000';
  if (normRevenue === '100k-500k') capitalNeedTier = '$50,000 – $150,000';
  if (normRevenue === '500k-1m') capitalNeedTier = '$100,000 – $300,000';
  if (normRevenue === 'over-1m') capitalNeedTier = '$250,000 – $1,000,000+';

  return {
    province: normProvince,
    provinceName: provinceInfo.name,
    country: provinceInfo.country,
    industry: normIndustry,
    industryName,
    revenue: normRevenue,
    revenueName,
    goal: normGoal,
    goalName,
    businessObjective,
    capitalNeedTier,
  };
}
