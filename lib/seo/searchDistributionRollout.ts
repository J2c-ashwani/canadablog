export const SEARCH_DISTRIBUTION_ROLLOUT_ID = 'seo-cohort-v1';
export const SEARCH_DISTRIBUTION_RELEASED_AT = '2026-08-31T00:00:00.000Z';

export const SEARCH_DISTRIBUTION_EXPANSION_POLICY = {
  minimumObservationDays: 14,
  minimumOrganicVisitors: 500,
  minimumVerifiedPurchases: 5,
  alternativeMinimumOrganicVisitors: 1000,
  alternativeMinimumVerifiedPurchases: 3,
} as const;

export type SearchDistributionGateEvidence = {
  evaluatedAt?: string;
  organicVisitors: number;
  verifiedPurchases: number;
  verifiedRevenueUSD: number;
  seoPerformance: 'improved' | 'neutral' | 'regressed' | 'unknown';
  funnelPerformance: 'non_degrading' | 'regressed' | 'unknown';
  protectedFlows: 'healthy' | 'regressed' | 'unknown';
};

export function evaluateSearchDistributionExpansion(evidence: SearchDistributionGateEvidence) {
  const evaluatedAt = new Date(evidence.evaluatedAt || Date.now()).getTime();
  const releasedAt = new Date(SEARCH_DISTRIBUTION_RELEASED_AT).getTime();
  const observationDays = Math.max(0, Math.floor((evaluatedAt - releasedAt) / 86_400_000));
  const sufficientTraffic = evidence.organicVisitors >= SEARCH_DISTRIBUTION_EXPANSION_POLICY.minimumOrganicVisitors;
  const directPurchaseGate = evidence.verifiedPurchases >= SEARCH_DISTRIBUTION_EXPANSION_POLICY.minimumVerifiedPurchases;
  const statisticallyUsefulRevenueGate = evidence.organicVisitors >= SEARCH_DISTRIBUTION_EXPANSION_POLICY.alternativeMinimumOrganicVisitors
    && evidence.verifiedPurchases >= SEARCH_DISTRIBUTION_EXPANSION_POLICY.alternativeMinimumVerifiedPurchases
    && evidence.verifiedRevenueUSD > 0;
  const gates = {
    observation: observationDays >= SEARCH_DISTRIBUTION_EXPANSION_POLICY.minimumObservationDays,
    seo: evidence.seoPerformance === 'improved' || evidence.seoPerformance === 'neutral',
    funnel: evidence.funnelPerformance === 'non_degrading',
    revenue: directPurchaseGate || statisticallyUsefulRevenueGate,
    traffic: sufficientTraffic,
    noRegression: evidence.protectedFlows === 'healthy',
  };

  return {
    eligible: Object.values(gates).every(Boolean),
    observationDays,
    verifiedRevenuePer1000OrganicVisitors: evidence.organicVisitors > 0
      ? Number(((evidence.verifiedRevenueUSD / evidence.organicVisitors) * 1000).toFixed(2))
      : 0,
    gates,
  };
}

export const SEARCH_DISTRIBUTION_COHORT_PATHS = [
  '/blog/nih-sbir-biotech-grants',
  '/blog/dod-sbir-defense-tech-grants',
  '/blog/nsf-sbir-grants-technology-startups',
  '/grants/on/toronto/restaurants-hospitality',
  '/grants/qc/montreal/women-entrepreneurs',
  '/grants/bc/vancouver/women-entrepreneurs',
  '/grants/va/norfolk-virginia-beach/arts-entertainment',
  '/grants/nc/raleigh/logistics',
  '/grants/pa/erie/veterans',
] as const;

const COHORT_PATHS = new Set<string>(SEARCH_DISTRIBUTION_COHORT_PATHS);

export function normalizeSearchDistributionPath(path: string) {
  const normalized = path.trim().toLowerCase().replace(/\/+$/, '');
  return normalized || '/';
}

export function isSearchDistributionCohortPath(path: string) {
  return COHORT_PATHS.has(normalizeSearchDistributionPath(path));
}

export function getPseoSearchDistributionPath(province: string, city: string, industry: string) {
  return normalizeSearchDistributionPath(`/grants/${province}/${city}/${industry}`);
}

export function getSearchDistributionContext(province: string, city: string, industry: string) {
  const path = getPseoSearchDistributionPath(province, city, industry);
  return isSearchDistributionCohortPath(path)
    ? `${SEARCH_DISTRIBUTION_ROLLOUT_ID}-${province}-${city}-${industry}`
    : `${province}-${city}-${industry}`;
}
