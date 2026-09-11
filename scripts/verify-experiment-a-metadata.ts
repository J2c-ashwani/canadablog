import assert from 'node:assert/strict';
import { getPriorityResearchProfile } from '../lib/editorial/priorityResearch';
import { industryDatabase } from '../lib/data/industry-pages';
import { generateMetadata as generatePseoMetadata } from '../app/grants/[province]/[city]/[industry]/page';
import {
  EXPERIMENT_A_COHORT_ID,
  EXPERIMENT_A_TREATMENT_PAGES,
  EXPERIMENT_A_OBSERVATIONAL_CONTROLS,
} from '../lib/seo/experimentACohort';

async function verifyExperimentAMetadata() {
  console.log(`\n==================================================`);
  console.log(`🛡️  VERIFYING EXPERIMENT A METADATA: ${EXPERIMENT_A_COHORT_ID}`);
  console.log(`==================================================\n`);

  // Verify Cohort Registry Separation
  assert.equal(EXPERIMENT_A_COHORT_ID, 'seo_expA_serp_2026_09', 'Cohort ID must match approved hard identifier');
  assert.equal(Object.keys(EXPERIMENT_A_TREATMENT_PAGES).length, 5, 'Must contain exactly 5 treatment pages');
  assert.equal(EXPERIMENT_A_OBSERVATIONAL_CONTROLS.length, 5, 'Must contain exactly 5 observational control pages');

  // Treatment 1: /blog/nih-sbir-biotech-grants
  console.log('Testing Treatment 1: /blog/nih-sbir-biotech-grants');
  const nihProfile = getPriorityResearchProfile('/blog/nih-sbir-biotech-grants');
  assert.ok(nihProfile, 'NIH profile must exist in priorityResearch');
  assert.equal(
    nihProfile?.seoTitle,
    'NIH SBIR Biotech Grants 2026 | Eligibility, Deadlines & Funding Routes',
    'NIH title must match approved non-clickbait specification'
  );
  assert.ok(
    nihProfile?.seoDescription.includes('Evaluate NIH SBIR/STTR funding routes for biotech, medtech, and digital health startups'),
    'NIH description must match approved non-clickbait specification'
  );
  console.log('✅ PASS: Treatment 1 rendered title & description verified.\n');

  // Treatment 2: /blog/nsf-sbir-grants-technology-startups
  console.log('Testing Treatment 2: /blog/nsf-sbir-grants-technology-startups');
  const nsfProfile = getPriorityResearchProfile('/blog/nsf-sbir-grants-technology-startups');
  assert.ok(nsfProfile, 'NSF profile must exist in priorityResearch');
  assert.equal(
    nsfProfile?.seoTitle,
    'NSF SBIR Grants for Tech Startups 2026 | Project Pitch & Eligibility Guide',
    'NSF title must match approved non-clickbait specification'
  );
  assert.ok(
    nsfProfile?.seoDescription.includes('Learn who qualifies for NSF SBIR/STTR funding, how the Project Pitch screening works'),
    'NSF description must match approved non-clickbait specification'
  );
  console.log('✅ PASS: Treatment 2 rendered title & description verified.\n');

  // Treatment 3: /grants/industry/saas-companies (Distinct SaaS classification)
  console.log('Testing Treatment 3: /grants/industry/saas-companies (Commercial Monetization Focus)');
  const saasData = industryDatabase['saas-companies'];
  assert.ok(saasData, 'SaaS industry profile must exist in industryDatabase');
  assert.equal(
    saasData.seoTitle,
    'Government Grants & Tax Credits for SaaS Companies (2026) | Stacking Guide',
    'SaaS title must match approved non-clickbait specification'
  );
  assert.ok(
    saasData.description.includes('Discover non-dilutive government grants, R&D tax credits, and software hiring subsidies for SaaS startups'),
    'SaaS description must match approved non-clickbait specification'
  );
  assert.equal(
    EXPERIMENT_A_TREATMENT_PAGES['/grants/industry/saas-companies'].classification,
    'commercial_monetization',
    'SaaS must be classified as commercial_monetization due to existing traction (9 clicks)'
  );
  console.log('✅ PASS: Treatment 3 rendered title & description verified.\n');

  // Treatment 4: /blog/women-entrepreneurship-strategy-canada
  console.log('Testing Treatment 4: /blog/women-entrepreneurship-strategy-canada');
  const wesProfile = getPriorityResearchProfile('/blog/women-entrepreneurship-strategy-canada');
  assert.ok(wesProfile, 'WES profile must exist in priorityResearch');
  assert.equal(
    wesProfile?.seoTitle,
    'Women Entrepreneurship Strategy Canada (2026) | WES Grants & Loan Guide',
    'WES title must match approved non-clickbait specification'
  );
  assert.ok(
    wesProfile?.seoDescription.includes('Explore Canada\'s Women Entrepreneurship Strategy (WES)'),
    'WES description must match approved non-clickbait specification'
  );
  console.log('✅ PASS: Treatment 4 rendered title & description verified.\n');

  // Treatment 5: /grants/va/richmond/arts-entertainment
  console.log('Testing Treatment 5: /grants/va/richmond/arts-entertainment');
  const richmondMetadata = await generatePseoMetadata({
    params: Promise.resolve({ province: 'va', city: 'richmond', industry: 'arts-entertainment' }),
  });
  assert.equal(
    richmondMetadata.title,
    'Richmond, VA Arts & Cultural Grants 2026 | Funding Programs & Eligibility',
    'Richmond arts title must match approved non-clickbait specification'
  );
  assert.ok(
    (richmondMetadata.description as string)?.includes('Arts and cultural funding opportunities for Richmond, VA organizations'),
    'Richmond arts description must match approved non-clickbait specification'
  );
  console.log('✅ PASS: Treatment 5 rendered title & description verified.\n');

  console.log('🎉 ALL 5 EXPERIMENT A TREATMENT URLS PASSED PRODUCTION-RENDER VERIFICATION!');
}

verifyExperimentAMetadata().catch((err) => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
