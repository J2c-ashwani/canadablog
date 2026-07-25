/**
 * Growth OS — Decision Engine
 * Evaluates financial economics, ROI, BusinessImpactScore, and enforces the "Do Nothing" action.
 */

import { RevenueOpportunity, BusinessImpactScore } from "../types"

export class DecisionEngine {
  public static calculateImpactScore(opportunity: RevenueOpportunity): BusinessImpactScore {
    const revenueImpactUSD = opportunity.expectedRevenue
    const founderTimeSavedMinutes = opportunity.recommendedProduct.includes("$199") ? 120 : 45
    const customerTrustAddedScore = opportunity.evidence.length > 0 ? 90 : 60
    const knowledgeAddedScore = 75
    const competitiveAdvantageScore = opportunity.intentLevel === "High" ? 85 : 50

    // Weighted formula
    const compositeImpactRating = Math.round(
      (revenueImpactUSD * 0.4) +
      (founderTimeSavedMinutes * 0.2) +
      (customerTrustAddedScore * 0.2) +
      (competitiveAdvantageScore * 0.2)
    )

    return {
      revenueImpactUSD,
      founderTimeSavedMinutes,
      customerTrustAddedScore,
      knowledgeAddedScore,
      competitiveAdvantageScore,
      compositeImpactRating,
    }
  }

  public static evaluateOpportunity(opportunity: RevenueOpportunity, minRequiredROI = 3.0): {
    shouldExecute: boolean
    decisionReason: string
    updatedStatus: RevenueOpportunity["status"]
  } {
    // Economic Check
    if (opportunity.expectedCost > 0) {
      opportunity.expectedROI = Number((opportunity.expectedRevenue / opportunity.expectedCost).toFixed(2))
    } else {
      opportunity.expectedROI = 10.0
    }

    // "Do Nothing" Guardrail
    if (opportunity.expectedROI < minRequiredROI) {
      return {
        shouldExecute: false,
        decisionReason: `Expected ROI (${opportunity.expectedROI}) below threshold (${minRequiredROI}). Action suppressed to save compute/email budget.`,
        updatedStatus: "ObservedAndWaiting",
      }
    }

    if (opportunity.confidenceScore < 75 || opportunity.humanTrustScore < 80) {
      return {
        shouldExecute: false,
        decisionReason: `Confidence score (${opportunity.confidenceScore}) or Trust score (${opportunity.humanTrustScore}) below required threshold. Escalated to Exception Queue.`,
        updatedStatus: "ExceptionRaised",
      }
    }

    return {
      shouldExecute: true,
      decisionReason: `Approved by Decision Engine: ROI ${opportunity.expectedROI} >= ${minRequiredROI}, Trust ${opportunity.humanTrustScore} >= 80.`,
      updatedStatus: "Approved",
    }
  }
}
