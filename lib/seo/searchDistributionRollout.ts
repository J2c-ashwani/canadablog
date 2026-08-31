export const SEARCH_DISTRIBUTION_ROLLOUT_ID = 'seo-cohort-v1';

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
