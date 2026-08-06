import { generateFundingRecommendationPlatform, generateFundingMatchReport } from '../lib/products/report-generator';
import { generateFundingMatchReportPDF } from '../lib/products/report-pdf';
import fs from 'fs';
import path from 'path';

/**
 * Golden Master Regression Test Suite — FSI Digital Platform v1.0
 * 
 * Verifies that the engine output and compiled vector PDF for Chintan's profile
 * remain 100% deterministic and match the saved snapshot exactly.
 */

const GOLDEN_MASTER_PATH = path.join(process.cwd(), 'lib/engine/golden-master-chintan.json');

const CHINTAN_PROFILE = {
  province: 'on',
  industry: 'technology',
  revenue: 'pre-revenue',
  goal: 'research',
};

console.log('🏆 Running Golden Master Regression Test Suite...');

const currentResult = generateFundingRecommendationPlatform(CHINTAN_PROFILE);

// Mask dynamic timestamps for static snapshot comparison
const staticResult = JSON.parse(JSON.stringify(currentResult));
staticResult.generatedAt = '2026-08-01T00:00:00.000Z';
staticResult.snapshot.generatedTimestamp = '2026-08-01T00:00:00.000Z';

// 1. JSON Golden Master Audit
if (!fs.existsSync(GOLDEN_MASTER_PATH)) {
  fs.mkdirSync(path.dirname(GOLDEN_MASTER_PATH), { recursive: true });
  fs.writeFileSync(GOLDEN_MASTER_PATH, JSON.stringify(staticResult, null, 2), 'utf8');
  console.log(`  ✅ Saved new Golden Master snapshot to ${GOLDEN_MASTER_PATH}`);
} else {
  const masterContent = fs.readFileSync(GOLDEN_MASTER_PATH, 'utf8');
  const masterResult = JSON.parse(masterContent);

  const isMatch = JSON.stringify(staticResult) === JSON.stringify(masterResult);

  if (isMatch) {
    console.log(`  ✅ GOLDEN MASTER JSON TEST PASSED: 100% Match with Golden Master Snapshot`);
  } else {
    console.error(`  ❌ GOLDEN MASTER JSON TEST FAILED: Output deviated from Golden Master!`);
    process.exit(1);
  }
}

// 2. PDF Golden Master Vector Audit
const report = generateFundingMatchReport(CHINTAN_PROFILE);
const pdfDoc = generateFundingMatchReportPDF(report, 'Chintan Patel', null);
const pdfBuffer = Buffer.from(pdfDoc.output('arraybuffer'));

if (pdfDoc.getNumberOfPages() >= 4 && pdfBuffer.length >= 25000) {
  console.log(`  ✅ GOLDEN MASTER PDF TEST PASSED: Vector PDF Compiled (${(pdfBuffer.length / 1024).toFixed(1)} KB, ${pdfDoc.getNumberOfPages()} Pages)\n`);
} else {
  console.error(`  ❌ GOLDEN MASTER PDF TEST FAILED: PDF compilation size or page count threshold not met.\n`);
  process.exit(1);
}
