/**
 * Growth OS — Strategic Intelligence Engine
 * Manages company GrowthGoals, quarterly roadmaps, and resource constraints.
 */

import { GrowthGoal } from "../types"

export class StrategicIntelligenceEngine {
  private static activeGoal: GrowthGoal = {
    id: "goal_2026_q3",
    period: "2026-Q3",
    revenueTargetUSD: 10000,
    priorityMarkets: ["Canada", "USA"],
    priorityProducts: ["$19 Match Report", "$49 Action Plan", "$79 Funding Bundle", "$29 Watch", "$199 Dossier"],
    constraints: {
      maxMonthlyComputeBudgetUSD: 250,
      maxDailyEmailVolume: 1000,
      minRequiredROI: 3.0,
    },
  }

  public static getActiveGoal(): GrowthGoal {
    return this.activeGoal
  }

  public static updateGoal(updated: Partial<GrowthGoal>): GrowthGoal {
    this.activeGoal = { ...this.activeGoal, ...updated }
    console.log("[StrategicIntelligenceEngine] Active GrowthGoal updated:", this.activeGoal)
    return this.activeGoal
  }

  public static evaluateGoalProgress(currentRevenueUSD: number): {
    targetUSD: number
    achievedUSD: number
    percentAchieved: number
    status: "ON_TRACK" | "NEEDS_ATTENTION" | "CRITICAL"
  } {
    const percent = Number(((currentRevenueUSD / this.activeGoal.revenueTargetUSD) * 100).toFixed(1))
    let status: "ON_TRACK" | "NEEDS_ATTENTION" | "CRITICAL" = "ON_TRACK"

    if (percent < 50) {
      status = "CRITICAL"
    } else if (percent < 85) {
      status = "NEEDS_ATTENTION"
    }

    return {
      targetUSD: this.activeGoal.revenueTargetUSD,
      achievedUSD: currentRevenueUSD,
      percentAchieved: percent,
      status,
    }
  }
}
