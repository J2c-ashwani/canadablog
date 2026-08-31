import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getAllPseoPages } from '../lib/pseo-data';
import { resolveBenchmarkBySlug } from '../lib/editorial/eligibilityBenchmarks';
import {
  evaluateSearchDistributionExpansion,
  getPseoSearchDistributionPath,
  getSearchDistributionContext,
  isSearchDistributionCohortPath,
  normalizeSearchDistributionPath,
  SEARCH_DISTRIBUTION_COHORT_PATHS,
  SEARCH_DISTRIBUTION_ROLLOUT_ID,
} from '../lib/seo/searchDistributionRollout';

const expected = new Set([
  '/blog/nih-sbir-biotech-grants',
  '/blog/dod-sbir-defense-tech-grants',
  '/blog/nsf-sbir-grants-technology-startups',
  '/grants/on/toronto/restaurants-hospitality',
  '/grants/qc/montreal/women-entrepreneurs',
  '/grants/bc/vancouver/women-entrepreneurs',
  '/grants/va/norfolk-virginia-beach/arts-entertainment',
  '/grants/nc/raleigh/logistics',
  '/grants/pa/erie/veterans',
]);

assert.equal(SEARCH_DISTRIBUTION_COHORT_PATHS.length, 9, 'cohort must contain exactly nine routes');
assert.deepEqual(new Set(SEARCH_DISTRIBUTION_COHORT_PATHS), expected, 'cohort allowlist changed unexpectedly');
assert.equal(isSearchDistributionCohortPath('/GRANTS/ON/TORONTO/RESTAURANTS-HOSPITALITY/'), true);
assert.equal(isSearchDistributionCohortPath('/grants/on/ottawa/technology'), false);
assert.equal(isSearchDistributionCohortPath('/grants/tx/austin/technology'), false);
assert.equal(normalizeSearchDistributionPath(' /BLOG/NIH-SBIR-BIOTECH-GRANTS/ '), '/blog/nih-sbir-biotech-grants');

assert.equal(evaluateSearchDistributionExpansion({
  evaluatedAt: '2026-09-20T00:00:00.000Z',
  organicVisitors: 500,
  verifiedPurchases: 0,
  verifiedRevenueUSD: 0,
  seoPerformance: 'improved',
  funnelPerformance: 'non_degrading',
  protectedFlows: 'healthy',
}).eligible, false, 'traffic alone must never authorize expansion');
assert.equal(evaluateSearchDistributionExpansion({
  evaluatedAt: '2026-09-20T00:00:00.000Z',
  organicVisitors: 1000,
  verifiedPurchases: 3,
  verifiedRevenueUSD: 57,
  seoPerformance: 'neutral',
  funnelPerformance: 'non_degrading',
  protectedFlows: 'healthy',
}).eligible, true, 'conservative positive-RP1KOV alternative should pass after 14 days');
assert.equal(evaluateSearchDistributionExpansion({
  evaluatedAt: '2026-09-10T00:00:00.000Z',
  organicVisitors: 1000,
  verifiedPurchases: 5,
  verifiedRevenueUSD: 95,
  seoPerformance: 'improved',
  funnelPerformance: 'non_degrading',
  protectedFlows: 'healthy',
}).eligible, false, 'purchase evidence must not bypass the minimum observation period');

const pseoPages = getAllPseoPages();
const pseoCohort = pseoPages.filter((page) => isSearchDistributionCohortPath(
  getPseoSearchDistributionPath(page.provinceSlug, page.citySlug, page.industrySlug)
));
assert.equal(pseoCohort.length, 6, 'only six city-industry pages may receive cohort rendering');
assert.equal(pseoCohort.every((page) => page.isPublished), true, 'every cohort city-industry route must be published');

for (const page of pseoPages) {
  const path = getPseoSearchDistributionPath(page.provinceSlug, page.citySlug, page.industrySlug);
  const context = getSearchDistributionContext(page.provinceSlug, page.citySlug, page.industrySlug);
  if (isSearchDistributionCohortPath(path)) {
    assert.equal(context.startsWith(`${SEARCH_DISTRIBUTION_ROLLOUT_ID}-`), true, `${path} lacks cohort attribution`);
  } else {
    assert.equal(context, `${page.provinceSlug}-${page.citySlug}-${page.industrySlug}`, `${path} control attribution changed`);
  }
}

const exactBlogRoutes = [
  '/blog/nih-sbir-biotech-grants',
  '/blog/nsf-sbir-grants-technology-startups',
  '/blog/dod-sbir-defense-tech-grants',
];
for (const route of exactBlogRoutes) {
  assert.equal(resolveBenchmarkBySlug(route).ctaHref?.includes(SEARCH_DISTRIBUTION_ROLLOUT_ID), true, `${route} lacks cohort CTA`);
}
assert.equal(resolveBenchmarkBySlug('nih-sbir').ctaHref, undefined, 'program-page NIH benchmark leaked into cohort');
assert.equal(resolveBenchmarkBySlug('nsf-sbir-grants-technology-startups').ctaHref, undefined, 'slug-only NSF benchmark leaked into cohort');
assert.equal(resolveBenchmarkBySlug('/blog/canada-technology-adoption-grants-guide').ctaHref, undefined, 'control blog entered cohort');

const loadingSource = readFileSync('app/loading.tsx', 'utf8');
assert.equal(/<h1\b/i.test(loadingSource), false, 'global loading UI must not inject a second H1');
const onsiteClickSource = readFileSync('app/api/growth-os/onsite-click/route.ts', 'utf8');
assert.equal(onsiteClickSource.includes("contentContext.startsWith('seo-cohort-v1-')"), true, 'cohort action attribution is missing');
const pseoTemplateSource = readFileSync('app/grants/[province]/[city]/[industry]/page.tsx', 'utf8');
const blogTemplateSource = readFileSync('app/blog/[slug]/page.tsx', 'utf8');
assert.equal(
  pseoTemplateSource.includes('data-cohort-revenue-cta="hero-match-report"')
    && pseoTemplateSource.includes('verifiedCohort && (')
    && pseoTemplateSource.includes('offer=match-report&experiment=focused-v2'),
  true,
  'city cohort must expose one attributable $19 opening CTA without changing control rendering',
);
assert.equal(
  blogTemplateSource.includes('data-cohort-revenue-cta="opening-match-report"')
    && blogTemplateSource.includes('verifiedSearchCohort && (')
    && blogTemplateSource.includes('offer=match-report&experiment=focused-v2'),
  true,
  'editorial cohort must expose one attributable $19 opening CTA without changing control rendering',
);
const dashboardSource = readFileSync('app/admin/dashboard/page.tsx', 'utf8');
const indexNowSource = readFileSync('scripts/submit-search-cohort-indexnow.ts', 'utf8');
const indexNowKey = readFileSync('public/9f2d760a190decd61c5ea57bab9f5d7b.txt', 'utf8').trim();
assert.equal(dashboardSource.includes('.filter(isProviderVerifiedPurchase)'), true, 'dashboard KPI must exclude unverified purchase rows');
assert.equal(dashboardSource.includes('Search Cohort RP1KOV'), true, 'controlled-cohort KPI is missing');
assert.equal(indexNowKey, '9f2d760a190decd61c5ea57bab9f5d7b', 'IndexNow ownership key file is invalid');
assert.equal(indexNowSource.includes('SEARCH_DISTRIBUTION_COHORT_PATHS.map'), true, 'IndexNow submission must derive only from the controlled cohort allowlist');
assert.equal(indexNowSource.includes('getAllPseoPages'), false, 'IndexNow submission must never expand to the full pSEO inventory');

console.log(`PASS search-distribution cohort: 9 routes (${pseoCohort.length} city-industry + ${exactBlogRoutes.length} editorial)`);
console.log(`PASS controls preserved across ${pseoPages.length - pseoCohort.length} non-cohort city-industry pages`);
console.log('PASS exact-route SBIR gating, cohort-only opening CTAs, attributed product paths, verified-revenue KPI, and single-H1 loading guard');
