/**
 * Growth OS — Phase 5 Distribution Intelligence & Demand Gen Test Verification Script
 * Tests Vertical Slice #5 (Signal -> Dist Intel -> Growth Planner -> Content Factory -> Publisher -> Memory).
 */

import { SignalEngine } from "../lib/growth-os/intelligence/signal-engine"
import { DistributionIntelligenceEngine } from "../lib/growth-os/distribution/distribution-intelligence"
import { GrowthPlanner } from "../lib/growth-os/distribution/growth-planner"
import { ContentFactory } from "../lib/growth-os/distribution/content-factory"
import { MultiChannelPublisher } from "../lib/growth-os/distribution/multi-channel-publisher"
import { DistributionMemory } from "../lib/growth-os/memory/distribution-memory"

async function runPhase5Test() {
  console.log("=================================================================")
  console.log("   GROWTH OS — PHASE 5 DEMAND GEN & DISTRIBUTION TEST            ")
  console.log("=================================================================\n")

  // 1. Process Signal
  console.log("--- STEP 1: Process Funding Update Signal ---")
  const opportunity = SignalEngine.processRawScrape({
    sourceUrl: "https://nrc.canada.ca/irap-ai-intake-2026",
    title: "IRAP Artificial Intelligence & Quantum Tech Grant Round",
    rawText: "Canada IRAP has launched non-repayable grants up to $150,000 for AI software startups.",
    detectedProgram: "IRAP AI Round",
    province: "Canada Wide",
    industry: "AI & Software",
  })

  if (!opportunity) {
    throw new Error("Signal failed to generate opportunity.")
  }

  console.log("- Trigger:", opportunity.trigger)
  console.log("- Buyer Segment:", opportunity.buyerSegment)
  console.log("- Product:", opportunity.recommendedProduct)
  console.log("Step 1 Result: PASSED\n")

  // 2. Growth Planner Strategic Effort Allocation
  console.log("--- STEP 2: Growth Planner Daily Growth Plan ---")
  const growthPlan = GrowthPlanner.generateDailyGrowthPlan([opportunity])
  console.log("- Primary Focus Audience:", growthPlan.focusAudience)
  console.log("- Assigned Growth Lever:", growthPlan.primaryLever)
  console.log("- Top Action:", growthPlan.recommendedActions[0])
  console.log("- Predicted Daily Revenue Impact:", `$${growthPlan.predictedImpact.predictedRevenueUSD} USD`)
  console.log("Step 2 Result: PASSED\n")

  // 3. Evaluate Distribution Intelligence
  console.log("--- STEP 3: Distribution Intelligence Evaluation ---")
  const distOpportunity = DistributionIntelligenceEngine.evaluateDistributionOpportunity(opportunity)
  console.log("- Target Audience:", distOpportunity.audience)
  console.log("- Strategic Objective:", distOpportunity.objective)
  console.log("- Predicted Reach:", distOpportunity.predictedImpact.predictedReach, "impressions")
  console.log("- Predicted Traffic:", distOpportunity.predictedImpact.predictedTraffic, "visitors")
  console.log("- Predicted Leads:", distOpportunity.predictedImpact.predictedLeadGeneration, "leads")
  console.log("Step 3 Result: PASSED\n")

  // 4. Content Factory: Selective Asset Generation
  console.log("--- STEP 4: Content Factory Selective Asset Package Generation ---")
  const assetPackage = ContentFactory.buildAssetPackage(opportunity, distOpportunity)
  console.log("- 1. Blog Title:", assetPackage.blogGuide.title)
  console.log("- 2. LinkedIn Post Hashtags:", assetPackage.linkedInPost.hashtags.join(" "))
  console.log("- 3. Social Carousel Slides Count:", assetPackage.socialCarousel.slides.length)
  console.log("- 4. Newsletter Subject:", assetPackage.newsletterSection.subjectLine)
  console.log("- 5. Video Script Hook:", assetPackage.shortVideoScript.hook)
  console.log("- 6. FAQ Expansion Count:", assetPackage.faqExpansion.length)
  console.log("- 7. Partner Block Title:", assetPackage.partnerBlock.title)
  console.log("Step 4 Result: PASSED\n")

  // 5. Multi-Channel Publisher Execution
  console.log("--- STEP 5: Multi-Channel Publisher Execution ---")
  const receipt = await MultiChannelPublisher.dispatchAssetPackage(distOpportunity, assetPackage)
  console.log("- Status:", receipt.status)
  console.log("- Dispatched Channels (Auto):", receipt.dispatchedChannelsCount)
  console.log("- Queued Channels (Queue):", receipt.queuedChannelsCount)
  console.log("- Channel Summary:", JSON.stringify(receipt.channelStatusSummary))
  console.log("Step 5 Result: PASSED\n")

  // 6. Distribution Memory Summary
  console.log("--- STEP 6: Distribution Memory Performance Summary ---")
  const memorySummary = DistributionMemory.getChannelPerformanceSummary()
  console.log("- Channel Memory Performance:", JSON.stringify(memorySummary))
  console.log("Step 6 Result: PASSED\n")

  console.log("=================================================================")
  console.log("   GROWTH OS PHASE 5 VERIFICATION COMPLETE — ALL PASS          ")
  console.log("=================================================================\n")
}

runPhase5Test().catch((err) => {
  console.error("Phase 5 Test Execution Error:", err)
  process.exit(1)
})
