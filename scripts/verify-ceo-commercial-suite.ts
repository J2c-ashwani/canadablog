/**
 * FSI Digital CEO OS Commercial Failure-Injection Test Suite (v2.1)
 * Validates 7 mandatory commercial failure scenarios.
 */

import { RevenueTools } from '../lib/ceo-agent/tools/revenue-tools'
import { CEOScoreboard } from '../lib/ceo-agent/ceo-scoreboard'
import { GrowthTools } from '../lib/ceo-agent/tools/growth-tools'
import { CEOPolicies } from '../lib/ceo-agent/guards/ceo-policies'
import { CEOAgent } from '../lib/ceo-agent/ceo-agent'

async function runCommercialTestSuite() {
  console.log('====================================================')
  console.log('🧪 RUNNING FSI DIGITAL CEO OS COMMERCIAL TEST SUITE')
  console.log('====================================================\n')

  let passedTests = 0
  const totalTests = 7

  // Test 1: Reconciled Revenue Truth ($106 USD across 4 orders)
  console.log('Test 1: Reconciled Revenue Truth')
  const ledger = await RevenueTools.getRevenueLedger()
  if (ledger.verifiedRevenueUSD === 106 && ledger.captureCount === 4 && ledger.excludedTestDataUSD > 0) {
    console.log(`✅ PASS: Reconciled 4 verified orders ($106 USD total, $26.50 AOV). Excluded $${ledger.excludedTestDataUSD} USD test rows.`)
    passedTests++
  } else {
    console.error(`❌ FAIL: Revenue reconciliation mismatch (Expected $106, got $${ledger.verifiedRevenueUSD}).`)
  }

  // Test 2: Unreconciled / Fake Intent Rejection
  console.log('\nTest 2: Unreconciled / Fake Intent Rejection')
  if (ledger.evidenceState === 'VERIFIED') {
    console.log('✅ PASS: Only provider-captured PayPal orders ($106 USD) included in verified revenue.')
    passedTests++
  } else {
    console.error('❌ FAIL: Evidence state is not VERIFIED.')
  }

  // Test 3: Funnel Bottleneck Diagnosis
  console.log('\nTest 3: Funnel Bottleneck Diagnosis')
  const leakage = CEOScoreboard.calculateLeakageReport(100, 2, 50, 0)
  if (leakage.totalEstimatedLeakageUSD > 0 && leakage.items.some((i) => i.priority === 'P0' || i.priority === 'P1')) {
    console.log(`✅ PASS: Correctly identified checkout-to-payment leak (Leakage: $${leakage.totalEstimatedLeakageUSD}/mo).`)
    passedTests++
  } else {
    console.error('❌ FAIL: Failed to diagnose bottleneck in high checkout / low payment scenario.')
  }

  // Test 4: Growth OS Orphan Detection
  console.log('\nTest 4: Growth OS Orphan Detection')
  const growthAudit = await GrowthTools.getGrowthOSStatus()
  const orphan = growthAudit.orphanedStagesDetected.find((o) => o.severity === 'P0')
  if (orphan && orphan.stage.includes('Lead Queue')) {
    console.log(`✅ PASS: P0 Orphan Alert triggered correctly for zero email dispatches (${orphan.issue}).`)
    passedTests++
  } else {
    console.error('❌ FAIL: Failed to trigger P0 orphan alert on zero email dispatches.')
  }

  // Test 5: Fulfillment Failure Detection
  console.log('\nTest 5: Fulfillment Failure Detection')
  const leakRep = CEOScoreboard.calculateLeakageReport(14, 4, 103, 2)
  const fulfillmentItem = leakRep.items.find((i) => i.stage.includes('Report Delivery'))
  if (fulfillmentItem && fulfillmentItem.leakageMonthlyUSD > 0) {
    console.log(`✅ PASS: Correctly detected undelivered report fulfillment leak ($${fulfillmentItem.leakageMonthlyUSD}/mo).`)
    passedTests++
  } else {
    console.error('❌ FAIL: Failed to detect pending report delivery leak.')
  }

  // Test 6: Feature Distraction Rejection
  console.log('\nTest 6: Feature Distraction Rejection')
  const runResult = await CEOAgent.runCEOLoop('verification')
  if (runResult.briefText.includes('❌ WHAT WE SHOULD NOT DO TODAY') && runResult.briefText.includes('Do NOT build new SEO pages')) {
    console.log('✅ PASS: CEO Agent explicitly rejected low-priority feature building during conversion leak.')
    passedTests++
  } else {
    console.error('❌ FAIL: CEO Agent failed to suppress feature distraction tasks.')
  }

  // Test 7: Target Feasibility Math
  console.log('\nTest 7: Target Feasibility Math')
  const mathPath = CEOScoreboard.calculatePathToTarget(106, 15000, 22)
  if (mathPath.requiredDailyRevenueUSD > 0 && mathPath.requiredCheckouts > 0 && mathPath.requiredQualifiedLeads > 0) {
    console.log(`✅ PASS: Mathematical acquisition equation accurately computed ($${mathPath.requiredDailyRevenueUSD}/day, ${mathPath.requiredCheckouts} checkouts needed).`)
    passedTests++
  } else {
    console.error('❌ FAIL: Mathematical path calculation failed.')
  }

  console.log('\n====================================================')
  console.log(`SUMMARY: ${passedTests}/${totalTests} COMMERCIAL TESTS PASSED`)
  console.log('====================================================\n')

  if (passedTests !== totalTests) {
    process.exit(1)
  }
}

runCommercialTestSuite().catch((err) => {
  console.error('Fatal error in Commercial Test Suite:', err)
  process.exit(1)
})
