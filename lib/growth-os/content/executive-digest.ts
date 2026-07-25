/**
 * Growth OS — Daily Executive Digest Generator
 * Compiles the daily 9:00 AM CEO Executive Digest.
 */

import { StrategicIntelligenceEngine } from "../intelligence/strategic-intel"
import { CommercialIntelligenceEngine } from "../intelligence/commercial-intel"
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

    const recommendation = `Double down on '${commercialReport.recommendedFocusSegment}' promoting the '${commercialReport.recommendedFocusProduct}' (Demand lift: ${commercialReport.topDemandSignals[0].searchVolumeTrend}).`

    const digestMarkdown = `# FSI DIGITAL — DAILY EXECUTIVE DIGEST (${new Date().toLocaleDateString()})

**Month-to-Date Revenue:** $${monthToDateRevenueUSD} USD (${goalProgress.percentAchieved}% of $${goalProgress.targetUSD} Goal)  
**Revenue Yesterday:** $${revenueYesterdayUSD} USD  
**Goal Status:** **${goalProgress.status}**  
**Active Exceptions Requiring Action:** **${activeExceptionsCount}**

---

### 💡 TOP STRATEGIC RECOMMENDATION FOR TODAY
> **${recommendation}**

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
      topStrategicRecommendation: recommendation,
      digestMarkdown,
    }
  }
}
