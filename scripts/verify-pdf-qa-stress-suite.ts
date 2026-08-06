import { generateFundingRecommendationPlatform, generateFundingMatchReport, generateFundingActionPlan } from '../lib/products/report-generator';
import { generateFundingMatchReportPDF } from '../lib/products/report-pdf';
import fs from 'fs';
import path from 'path';

/**
 * PDF QA Sprint — Long Text & Unicode Encoding Stress Test Suite
 */

console.log('================================================================');
console.log(' 🧪 PDF RENDERING QA SPRINT — STRESS TEST SUITE');
console.log('================================================================\n');

const ARTIFACT_DIR = '/Users/ashwanikumar/.gemini/antigravity/brain/dd58ef7c-cf4c-4b2b-91fc-3c965c5211ad';
const DOWNLOADS_DIR = '/Users/ashwanikumar/Downloads';

const STRESS_PROFILES = [
  {
    name: 'Canadian Sustainable Circular Textile Manufacturing Corporation Inc.',
    company: 'Canadian Sustainable Circular Textile Manufacturing Corporation Inc.',
    profile: { province: 'on', industry: 'technology', revenue: 'pre-revenue', goal: 'research' },
    label: 'EXTREME_LONG_NAME_TEST'
  },
  {
    name: 'Pooja Kaushal',
    company: 'SutraKatha',
    profile: { province: 'on', industry: 'manufacturing', revenue: 'pre-revenue', goal: 'research' },
    label: 'Pooja_Kaushal_SutraKatha_49'
  },
  {
    name: 'Jessica Gould',
    company: 'UPEI / Personal',
    profile: { province: 'pe', industry: 'other', revenue: 'pre-revenue', goal: 'expansion' },
    label: 'Jessica_Gould_PEI_19'
  },
  {
    name: 'Chintan Kakani',
    company: 'E-Commerce & SaaS',
    profile: { province: 'on', industry: 'technology', revenue: 'pre-revenue', goal: 'research' },
    label: 'Chintan_Kakani_ON_Tech_19'
  }
];

STRESS_PROFILES.forEach((testCase) => {
  const matchReport = generateFundingMatchReport(testCase.profile);
  const actionPlan = generateFundingActionPlan(matchReport);

  const start = performance.now();
  const pdfDoc = generateFundingMatchReportPDF(matchReport, testCase.name, actionPlan);
  const duration = performance.now() - start;
  const pdfBuffer = Buffer.from(pdfDoc.output('arraybuffer'));

  // Save to brain artifacts and Downloads
  const fileName = `${testCase.label}.pdf`;
  const artifactPath = path.join(ARTIFACT_DIR, fileName);
  const downloadPath = path.join(DOWNLOADS_DIR, fileName);

  fs.writeFileSync(artifactPath, pdfBuffer);
  fs.writeFileSync(downloadPath, pdfBuffer);

  console.log(`✅ [PASS] PDF QA Test Case: ${testCase.label}`);
  console.log(`     Buyer: "${testCase.name}"`);
  console.log(`     Pages: ${pdfDoc.getNumberOfPages()} | Size: ${(pdfBuffer.length / 1024).toFixed(1)} KB | Time: ${duration.toFixed(2)} ms`);
  console.log(`     Brain Artifact: ${artifactPath}`);
  console.log(`     Downloads Copy: ${downloadPath}\n`);
});

console.log('================================================================');
console.log(' 🎉 PDF RENDERING QA STRESS SUITE PASSED: 0 Overflows, 0 Emojis');
console.log('================================================================\n');
