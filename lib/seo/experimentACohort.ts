/**
 * Experiment A — SERP Snippet Optimization Cohort
 * Hard Identifier: seo_expA_serp_2026_09
 *
 * Governance:
 * Strictly decoupled from the prior 9-route Search Distribution Cohort (seo-cohort-v1).
 * Focuses solely on SERP packaging (Meta Title + Meta Description) across 5 treatment pages
 * with 5 matched observational control pages.
 */

export const EXPERIMENT_A_COHORT_ID = 'seo_expA_serp_2026_09';
export const EXPERIMENT_A_RELEASED_AT = '2026-09-11T00:00:00.000Z';

export interface ExperimentAPageTarget {
  path: string;
  category: string;
  expectedTitle: string;
  expectedDescriptionSnippet: string;
  classification: 'zero_click_recovery' | 'commercial_monetization';
}

export const EXPERIMENT_A_TREATMENT_PAGES: Record<string, ExperimentAPageTarget> = {
  '/blog/nih-sbir-biotech-grants': {
    path: '/blog/nih-sbir-biotech-grants',
    category: 'Federal Biotech',
    expectedTitle: 'NIH SBIR Biotech Grants 2026 | Eligibility, Deadlines & Funding Routes',
    expectedDescriptionSnippet: 'Evaluate NIH SBIR/STTR funding routes for biotech, medtech, and digital health startups.',
    classification: 'zero_click_recovery',
  },
  '/blog/nsf-sbir-grants-technology-startups': {
    path: '/blog/nsf-sbir-grants-technology-startups',
    category: 'Federal Deep Tech',
    expectedTitle: 'NSF SBIR Grants for Tech Startups 2026 | Project Pitch & Eligibility Guide',
    expectedDescriptionSnippet: 'Learn who qualifies for NSF SBIR/STTR funding, how the Project Pitch screening works',
    classification: 'zero_click_recovery',
  },
  '/grants/industry/saas-companies': {
    path: '/grants/industry/saas-companies',
    category: 'Industry Directory',
    expectedTitle: 'Government Grants & Tax Credits for SaaS Companies (2026) | Stacking Guide | FSI Digital',
    expectedDescriptionSnippet: 'Discover non-dilutive government grants, R&D tax credits, and software hiring subsidies for SaaS startups.',
    classification: 'commercial_monetization', // Distinct classification: existing traction (9 clicks), testing monetization quality
  },
  '/blog/women-entrepreneurship-strategy-canada': {
    path: '/blog/women-entrepreneurship-strategy-canada',
    category: 'Canada Demographic',
    expectedTitle: 'Women Entrepreneurship Strategy Canada (2026) | WES Grants & Loan Guide',
    expectedDescriptionSnippet: 'Explore Canada\'s Women Entrepreneurship Strategy (WES). Review ecosystem project grants',
    classification: 'zero_click_recovery',
  },
  '/grants/va/richmond/arts-entertainment': {
    path: '/grants/va/richmond/arts-entertainment',
    category: 'Local Creative Sector',
    expectedTitle: 'Richmond, VA Arts & Cultural Grants 2026 | Funding Programs & Eligibility',
    expectedDescriptionSnippet: 'Arts and cultural funding opportunities for Richmond, VA organizations.',
    classification: 'zero_click_recovery',
  },
};

export const EXPERIMENT_A_OBSERVATIONAL_CONTROLS = [
  {
    path: '/blog/usda-sbir-agtech-grants',
    category: 'Federal Biotech/Ag',
    controlFor: '/blog/nih-sbir-biotech-grants',
    note: 'Observational control: Federal R&D small business funding, different sector volume',
  },
  {
    path: '/blog/dod-sbir-defense-tech-grants',
    category: 'Federal Deep Tech',
    controlFor: '/blog/nsf-sbir-grants-technology-startups',
    note: 'Observational control: High-volume federal technical innovation on Page 2',
  },
  {
    path: '/grants/industry/ai-startups',
    category: 'Industry Directory',
    controlFor: '/grants/industry/saas-companies',
    note: 'Observational control: Tech industry directory, lower ranking position caveat',
  },
  {
    path: '/blog/bmo-celebrating-women-grant',
    category: 'Canada Demographic',
    controlFor: '/blog/women-entrepreneurship-strategy-canada',
    note: 'Observational control: Women-owned business funding in Canada, Page 1 position',
  },
  {
    path: '/grants/ct/new-haven/arts-entertainment',
    category: 'Local Creative Sector',
    controlFor: '/grants/va/richmond/arts-entertainment',
    note: 'Observational control: Arts/entertainment funding, lower SERP position caveat',
  },
] as const;

export function isExperimentATreatmentPath(path: string): boolean {
  const normalized = path.trim().toLowerCase().replace(/\/+$/, '');
  return Boolean(EXPERIMENT_A_TREATMENT_PAGES[normalized]);
}
