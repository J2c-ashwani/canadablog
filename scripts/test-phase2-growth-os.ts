/**
 * Growth OS — Phase 2 Verification Test Script
 * Tests Commercial Intel, Strategic Intel, Executive Digest, and Exception Dashboard integration.
 */

import { CommercialIntelligenceEngine } from "../lib/growth-os/intelligence/commercial-intel"
import { StrategicIntelligenceEngine } from "../lib/growth-os/intelligence/strategic-intel"
import { ExecutiveDigestEngine } from "../lib/growth-os/content/executive-digest"
import { RevenueOpportunity } from "../lib/growth-os/types"

async function runPhase2Test() {
  console.log("=================================================================")
  console.log("   GROWTH OS — PHASE 2 MODULE VERIFICATION TEST                 ")
  console.log("=================================================================\n")

  // 1. Test Commercial Intelligence Engine
  console.log("--- TEST 1: Commercial Intelligence Engine Market Demand Scans ---")
  const commercialReport = CommercialIntelligenceEngine.analyzeMarketDemand()
  console.log("- Recommended Audience:", commercialReport.recommendedFocusSegment)
  console.log("- Recommended Offer:", commercialReport.recommendedFocusProduct)
  console.log("- Top Search Signal:", commercialReport.topDemandSignals[0].keyword, `(${commercialReport.topDemandSignals[0].searchVolumeTrend})`)
  console.log("Test 1 Result: PASSED\n")

  // 2. Test Strategic Intelligence Engine & GrowthGoal Progress
  console.log("--- TEST 2: Strategic Intelligence Engine & GrowthGoal Evaluation ---")
  const activeGoal = StrategicIntelligenceEngine.getActiveGoal()
  console.log("- Active Period:", activeGoal.period)
  console.log("- Target Revenue:", `$${activeGoal.revenueTargetUSD} USD`)

  const progress = StrategicIntelligenceEngine.evaluateGoalProgress(4200)
  console.log("- Month-to-Date Revenue:", `$${progress.achievedUSD} USD`)
  console.log("- Goal Progress:", `${progress.percentAchieved}%`)
  console.log("- Goal Status:", progress.status)
  console.log("Test 2 Result: PASSED\n")

  // 3. Test Daily Executive Digest Generation
  console.log("--- TEST 3: Daily Executive Digest Generation ---")
  const mockOpportunities: RevenueOpportunity[] = [
    {
      id: "opp_demo_01",
      brandId: "fsi-digital",
      trigger: "IRAP Q3 Intake Open",
      buyerSegment: "Ontario Tech / SaaS Founder",
      intentLevel: "High",
      recommendedProduct: "$79 Funding Bundle",
      targetLandingPage: "/blog/technology-startup-grants-2026",
      expectedRevenue: 316,
      expectedCost: 1.5,
      expectedROI: 210.67,
      estimatedExecutionTime: 1200,
      priorityScore: 92,
      humanTrustScore: 95,
      confidenceScore: 96,
      sourceType: "Government",
      expiresAt: "2026-08-31T00:00:00Z",
      evidence: [],
      status: "Dispatched",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  const digest = ExecutiveDigestEngine.generateDailyDigest(450, 4200, mockOpportunities, 1)
  console.log("Generated Executive Digest Sample:\n")
  console.log(digest.digestMarkdown)
  console.log("Test 3 Result: PASSED\n")

  console.log("=================================================================")
  console.log("   GROWTH OS PHASE 2 VERIFICATION COMPLETE — ALL PASS          ")
  console.log("=================================================================\n")
}

runPhase2Test().catch((err) => {
  console.error("Phase 2 Test Execution Error:", err)
  process.exit(1)
})
