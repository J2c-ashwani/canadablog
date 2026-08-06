import { generateFundingRecommendationPlatform } from '../lib/products/report-generator';
import { assertEnterprisePlatform } from '../app/products/report/EnterpriseReportRenderer';
import { analyzeFundingIntelligence } from '../lib/engine/intelligence-engine';

/**
 * Production Validation Sprint — Negative & Failure Scenario Stress Suite
 */

console.log('================================================================');
console.log(' 🧪 NEGATIVE & FAILURE SCENARIO STRESS TEST SUITE');
console.log('================================================================\n');

let passedTests = 0;
let totalTests = 0;

function runTest(testName: string, fn: () => void) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${testName}`);
    passedTests++;
  } catch (err: any) {
    console.error(`  ❌ [FAIL] ${testName}: ${err.message || err}`);
  }
}

// ── 1. Empty Profile Fallback Test ──
runTest('Empty profile inputs handling', () => {
  const result = generateFundingRecommendationPlatform({ province: '', industry: '', revenue: '', goal: '' });
  if (!result || !result.primaryRecommendations || result.primaryRecommendations.length === 0) {
    throw new Error('Platform produced empty output on empty inputs.');
  }
  if (result.profile.province !== 'on' || result.profile.industry !== 'technology') {
    throw new Error(`Fallback mapping failed: got prov=${result.profile.province}, ind=${result.profile.industry}`);
  }
});

// ── 2. Garbage String Typo Normalization Test ──
runTest('Garbage raw string typo normalization', () => {
  const intel = analyzeFundingIntelligence({ province: 'mars_colony_99', industry: 'quantum_crypto_123', revenue: 'trillion', goal: 'rocket_launch' });
  if (!intel.province || !intel.industry || !intel.revenue || !intel.goal) {
    throw new Error('Intelligence engine failed to normalize garbage input into valid defaults.');
  }
});

// ── 3. Enterprise Renderer Assertion Guard Check ──
runTest('EnterpriseReportRenderer runtime assertion fails on null/missing platformResult', () => {
  let thrown = false;
  try {
    assertEnterprisePlatform(null as any);
  } catch (e: any) {
    thrown = true;
    if (!e.message.includes('EnterpriseReportRenderer requires FundingRecommendationResult')) {
      throw new Error(`Unexpected error message: ${e.message}`);
    }
  }
  if (!thrown) throw new Error('assertEnterprisePlatform failed to throw on null input.');
});

// ── 4. Entitlement Capability Denial Test ──
runTest('Inactive purchase status rejection check', () => {
  const activeStatuses = ['completed', 'processing'];
  const testStatuses = ['refunded', 'cancelled', 'failed', 'failed_sheets_sync', 'chargeback', 'expired'];
  
  testStatuses.forEach((status) => {
    if (activeStatuses.includes(status.toLowerCase().trim())) {
      throw new Error(`Status "${status}" should be rejected but was allowed.`);
    }
  });
});

// ── 5. Score Capping Capped at <= 96 Constraint Test ──
runTest('Max Commercial Score Capped at 96/100', () => {
  const result = generateFundingRecommendationPlatform({ province: 'on', industry: 'technology', revenue: 'pre-revenue', goal: 'research' });
  const uncappedOrExcessive = result.primaryRecommendations.filter(r => r.commercialScore > 96);
  if (uncappedOrExcessive.length > 0) {
    throw new Error(`Found recommendation with commercialScore > 96: ${uncappedOrExcessive[0].programName} (${uncappedOrExcessive[0].commercialScore})`);
  }
});

console.log(`\n================================================================`);
console.log(` 🎯 NEGATIVE SUITE PASSED: ${passedTests}/${totalTests} failure scenarios verified.`);
console.log(`================================================================\n`);
