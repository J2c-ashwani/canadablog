/**
 * Growth OS — Safety & Compliance Layer
 * Audits content claims, source evidence, anti-spam rules, and brand trust limits.
 */

import { RevenueOpportunity } from "../types"
import { EvidenceRegistry } from "../knowledge/evidence-registry"

export interface SafetyAuditResult {
  passed: boolean
  trustScore: number
  reasons: string[]
}

export class SafetyLayer {
  public static auditOpportunity(opportunity: RevenueOpportunity): SafetyAuditResult {
    const reasons: string[] = []
    let trustScore = 100

    // 1. Evidence Verification
    if (!opportunity.evidence || opportunity.evidence.length === 0) {
      trustScore -= 30
      reasons.push("No official evidence links provided.")
    } else {
      for (const ev of opportunity.evidence) {
        if (!EvidenceRegistry.verifyUrlOfficiality(ev.sourceUrl)) {
          trustScore -= 15
          reasons.push(`Evidence domain '${ev.sourceUrl}' is not in verified official list.`)
        }
      }
    }

    // 2. Expiry Check
    if (opportunity.expiresAt) {
      const expiryDate = new Date(opportunity.expiresAt)
      if (expiryDate.getTime() < Date.now()) {
        trustScore = 0
        reasons.push("Funding program deadline has already passed.")
      }
    }

    // 3. Exaggeration & Claim Filter
    if (opportunity.trigger.toLowerCase().includes("guaranteed") || opportunity.trigger.toLowerCase().includes("free money")) {
      trustScore -= 40
      reasons.push("Prohibited claim terms detected ('guaranteed' / 'free money').")
    }

    const passed = trustScore >= 80

    return {
      passed,
      trustScore: Math.max(0, trustScore),
      reasons,
    }
  }
}
