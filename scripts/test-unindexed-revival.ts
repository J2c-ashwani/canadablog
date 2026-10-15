import { UNINDEXED_REVIVAL_COHORT, getUnindexedRevivalProfile, isUnindexedRevivalPath } from '../lib/pseo-engine/unindexedRevivalCohort';
import { generatePseoSchema } from '../lib/seo';

async function main() {
  console.log('🧪 Verifying Unindexed Revival Cohort (6 Pages)...');

  const paths = Object.keys(UNINDEXED_REVIVAL_COHORT);
  if (paths.length !== 6) {
    throw new Error(`Expected exactly 6 revival pages, found ${paths.length}`);
  }

  for (const path of paths) {
    console.log(`\n🔍 Testing route: ${path}`);

    if (!isUnindexedRevivalPath(path)) {
      throw new Error(`Failed isUnindexedRevivalPath for ${path}`);
    }

    const profile = getUnindexedRevivalProfile(path);
    if (!profile) {
      throw new Error(`Profile not found for ${path}`);
    }

    console.log(`   - City: ${profile.cityName}, ${profile.provinceName} (${profile.provinceSlug})`);
    console.log(`   - Industry: ${profile.industryName} (${profile.industrySlug})`);
    console.log(`   - Regional Agency: ${profile.regionalAgency} (${profile.regionalAgencyFullName})`);
    console.log(`   - Programs count: ${profile.programs.length}`);
    console.log(`   - Contacts count: ${profile.localContacts.length}`);
    console.log(`   - FAQs count: ${profile.faqs.length}`);

    // Verify Schema Generation
    const url = `https://www.fsidigital.ca${path}`;
    const schema: any = generatePseoSchema(
      profile.cityName,
      profile.provinceName,
      profile.industryName,
      url,
      '2026-01-01',
      'Canada'
    );

    const graph = schema['@graph'];
    if (!Array.isArray(graph)) {
      throw new Error(`Schema missing @graph for ${path}`);
    }

    const faqPage = graph.find((item: any) => item['@type'] === 'FAQPage');
    if (!faqPage || !faqPage.mainEntity || faqPage.mainEntity.length !== 3) {
      throw new Error(`Schema FAQPage missing or incomplete for ${path}`);
    }

    const firstQuestion = faqPage.mainEntity[0].name;
    console.log(`   - Schema FAQ 1: "${firstQuestion.substring(0, 60)}..."`);

    const govServices = graph.filter((item: any) => item['@type'] === 'GovernmentService');
    console.log(`   - GovernmentService entities in Schema: ${govServices.length}`);
    if (govServices.length !== profile.programs.length) {
      throw new Error(`GovernmentService count (${govServices.length}) does not match programs count (${profile.programs.length})`);
    }

    console.log(`   ✅ Route ${path} verified successfully.`);
  }

  console.log('\n🎉 ALL 6 UNINDEXED REVIVAL PAGES VERIFIED 100% SUCCESFULLY!\n');
}

main().catch((err) => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
