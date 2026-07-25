/**
 * Growth OS — Daily Executive Digest Generator
 * Compiles the daily 9:00 AM CEO Executive Digest, opening with Today's Growth Plan.
 */

import { StrategicIntelligenceEngine } from "../intelligence/strategic-intel"
import { CommercialIntelligenceEngine } from "../intelligence/commercial-intel"
import { GrowthPlanner } from "../distribution/growth-planner"
import { RevenueOpportunity } from "../types"

export interface ExecutiveDigest {
  date: string
  revenueYesterdayUSD: number
  monthToDateRevenueUSD: number
  goalProgressPercent: number
  opportunitiesProcessedCount: number
  activeExceptionsCount: number
  topStrategicRecommendation: string
  digestMarkdown: string
}

export class ExecutiveDigestEngine {
  public static generateDailyDigest(
    revenueYesterdayUSD: number,
    monthToDateRevenueUSD: number,
    opportunities: RevenueOpportunity[],
    activeExceptionsCount: number
  ): ExecutiveDigest {
    const goalProgress = StrategicIntelligenceEngine.evaluateGoalProgress(monthToDateRevenueUSD)
    const commercialReport = CommercialIntelligenceEngine.analyzeMarketDemand()
    const growthPlan = GrowthPlanner.generateDailyGrowthPlan(opportunities)

    const digestMarkdown = `# FSI DIGITAL — DAILY EXECUTIVE DIGEST (${new Date().toLocaleDateString()})

## 🎯 TODAY'S GROWTH PLAN
**Primary Audience Focus:** ${growthPlan.focusAudience}  
**Primary Strategic Objective:** ${growthPlan.focusObjective}  
**Growth Lever Assigned:** **${growthPlan.primaryLever}**  

### Recommended Growth Actions for Today:
${growthPlan.recommendedActions.map((a) => `- ${a}`).join("\n")}

### Predicted Daily Growth Impact:
* **Predicted Reach:** ${growthPlan.predictedImpact.predictedImpressions.toLocaleString()} impressions
* **Predicted Traffic:** ${growthPlan.predictedImpact.predictedVisitors} visitors
* **Predicted Leads:** ${growthPlan.predictedImpact.predictedLeads} qualified leads
* **Predicted Revenue Impact:** $${growthPlan.predictedImpact.predictedRevenueUSD.toLocaleString()} USD

---

## 📊 REVENUE & GOAL SCOREBOARD
**Month-to-Date Revenue:** $${monthToDateRevenueUSD} USD (${goalProgress.percentAchieved}% of $${goalProgress.targetUSD} Goal)  
**Revenue Yesterday:** $${revenueYesterdayUSD} USD  
**Goal Status:** **${goalProgress.status}**  
**Active Exceptions Requiring Action:** **${activeExceptionsCount}**

---

### 📊 COMMERCIAL INTEL HIGHLIGHTS
* **Top Demand Query:** \`${commercialReport.topDemandSignals[0].keyword}\` (${commercialReport.topDemandSignals[0].searchVolumeTrend} volume lift)
* **Target Audience:** ${commercialReport.recommendedFocusSegment}
* **Projected Monthly Impact:** $${commercialReport.projectedMonthlyRevenueUSD} USD

---

### 🚀 REVENUE OPPORTUNITIES PROCESSED TODAY (${opportunities.length})
${opportunities.map((o) => `- **${o.trigger}** | Segment: ${o.buyerSegment} | Product: ${o.recommendedProduct} | Status: **${o.status}**`).join("\n") || "No new signals processed today."}
`

    return {
      date: new Date().toISOString(),
      revenueYesterdayUSD,
      monthToDateRevenueUSD,
      goalProgressPercent: goalProgress.percentAchieved,
      opportunitiesProcessedCount: opportunities.length,
      activeExceptionsCount,
      topStrategicRecommendation: growthPlan.recommendedActions[0],
      digestMarkdown,
    }
  }
}
