/**
 * Growth OS — Subsystem Health & Kill Switch Monitor
 * Tracks subsystem compute cost, business impact, and recommends retiring un-triggered modules.
 */

import { BusinessImpactScore } from "../types"

export interface SubsystemHealthReport {
  subsystemId: string
  subsystemName: string
  monthlyCostUSD: number
  totalImpactGenerated: BusinessImpactScore
  lastUsedTimestamp: string
  recommendation: "ACTIVE" | "DEPRECATED" | "RETIRE_RECOMMENDED"
  reason: string
}

export class SubsystemHealthMonitor {
  private static healthReports: Map<string, SubsystemHealthReport> = new Map([
    [
      "sub_campaign_gen",
      {
        subsystemId: "sub_campaign_gen",
        subsystemName: "Campaign Copy Generator",
        monthlyCostUSD: 12.5,
        totalImpactGenerated: {
          revenueImpactUSD: 4200,
          founderTimeSavedMinutes: 450,
          customerTrustAddedScore: 90,
          knowledgeAddedScore: 80,
          competitiveAdvantageScore: 85,
          compositeImpactRating: 1800,
        },
        lastUsedTimestamp: new Date().toISOString(),
        recommendation: "ACTIVE",
        reason: "High revenue return ($4,200 vs $12.50 cost).",
      },
    ],
    [
      "sub_legacy_scraper",
      {
        subsystemId: "sub_legacy_scraper",
        subsystemName: "Legacy RSS Scraper v1",
        monthlyCostUSD: 45.0,
        totalImpactGenerated: {
          revenueImpactUSD: 0,
          founderTimeSavedMinutes: 0,
          customerTrustAddedScore: 0,
          knowledgeAddedScore: 10,
          competitiveAdvantageScore: 0,
          compositeImpactRating: 2,
        },
        lastUsedTimestamp: "2026-06-01T00:00:00Z",
        recommendation: "RETIRE_RECOMMENDED",
        reason: "Module unused for >30 days with $0 revenue impact and $45 monthly cost.",
      },
    ],
  ])

  public static getSubsystemReports(): SubsystemHealthReport[] {
    return Array.from(this.healthReports.values())
  }

  public static auditSubsystems(): SubsystemHealthReport[] {
    const reports = this.getSubsystemReports()
    const retired = reports.filter((r) => r.recommendation === "RETIRE_RECOMMENDED")
    if (retired.length > 0) {
      console.log(`[SubsystemHealthMonitor] ${retired.length} subsystem(s) flagged for retirement:`, retired.map((r) => r.subsystemName))
    }
    return reports
  }
}
