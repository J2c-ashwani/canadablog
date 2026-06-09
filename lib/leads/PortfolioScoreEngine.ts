import type { ProgramDetails } from "@/lib/data/programs"

export interface ReadinessResult {
  score: number
  band: "Excellent Candidate" | "Strong Candidate" | "Average Candidate" | "Limited Candidate"
  benchmark: string
}

export interface StackingRange {
  min: number
  max: number
  formatted: string
}

export class PortfolioScoreEngine {
  /**
   * Calculates a Funding Readiness Score (0-100) based on firmographics and plans.
   */
  static calculateReadiness(profile: {
    isIncorporated?: boolean
    hasRd?: boolean
    hasHiring?: boolean
    hasExporting?: boolean
    companySize?: string
  }): ReadinessResult {
    let score = 0

    // 1. Incorporation status (25 points)
    if (profile.isIncorporated === true) {
      score += 25
    }

    // 2. Technology R&D activity (25 points)
    if (profile.hasRd === true) {
      score += 25
    }

    // 3. Active hiring plans (15 points)
    if (profile.hasHiring === true) {
      score += 15
    }

    // 4. International export plans (15 points)
    if (profile.hasExporting === true) {
      score += 15
    }

    // 5. Employee size cohorts (20 points max)
    const size = profile.companySize || "1-9"
    if (size === "1-9" || size === "10-49") {
      score += 20
    } else if (size === "50-99" || size === "100-499") {
      score += 15
    } else {
      score += 10
    }

    // Map to band and benchmark copy
    let band: ReadinessResult["band"] = "Limited Candidate"
    let benchmark = "Initial setup required to meet agency guidelines."

    if (score >= 85) {
      band = "Excellent Candidate"
      benchmark = "Based on current program criteria. High Funding Likelihood."
    } else if (score >= 70) {
      band = "Strong Candidate"
      benchmark = "Based on current program criteria. Robust eligibility alignment."
    } else if (score >= 50) {
      band = "Average Candidate"
      benchmark = "In line with standard SME profiles. Pre-qualification mapping recommended."
    }

    return {
      score,
      band,
      benchmark,
    }
  }

  /**
   * Determines application priority and rationale for programs.
   */
  static getProgramPriority(slug: string): {
    priority: "Apply First" | "Apply Second" | "Apply Third" | "Alternative Match"
    rationale: string
  } {
    if (slug === "sred-tax-credit") {
      return {
        priority: "Apply First",
        rationale: "Fastest Approval & Highest Certainty (Tax Refund Entitlement)",
      }
    }
    if (slug === "irap-grant") {
      return {
        priority: "Apply Second",
        rationale: "Highest Potential Yield (Selective non-repayable wage grant)",
      }
    }
    if (slug === "canexport") {
      return {
        priority: "Apply Third",
        rationale: "Lowest Application Overhead (Rolling international marketing grant)",
      }
    }
    return {
      priority: "Alternative Match",
      rationale: "Secondary program stream matching your specific business criteria",
    }
  }

  /**
   * Helper to parse program estimated opportunity range.
   * Returns a min and max yield value.
   */
  static getOpportunityRange(slug: string, rawAmount: string): { min: number; max: number } {
    if (slug === "sred-tax-credit") {
      return { min: 50000, max: 200000 }
    }
    if (slug === "irap-grant") {
      return { min: 50000, max: 150000 }
    }
    if (slug === "canexport") {
      return { min: 15000, max: 50000 }
    }
    if (slug === "mitacs-accelerate") {
      return { min: 15000, max: 30000 }
    }

    // Try parsing numbers from the fundingAmount string
    const cleaned = rawAmount.replace(/[^0-9]/g, "")
    if (cleaned.length > 0) {
      const val = parseInt(cleaned, 10)
      const multiplier = rawAmount.toLowerCase().includes("k") ? 1000 : 1
      const normalized = val * multiplier
      
      if (normalized < 1000) {
        // Assume e.g. "$50,000" was parsed as "50"
        return { min: normalized * 1000, max: normalized * 2000 }
      }
      return { min: Math.round(normalized * 0.5), max: normalized }
    }

    return { min: 10000, max: 30000 } // Default fallback
  }

  /**
   * Calculates the combined stacking opportunity range of selected programs.
   */
  static calculateStackingRange(checkedSlugs: string[], allPrograms: ProgramDetails[]): StackingRange {
    let minSum = 0
    let maxSum = 0

    checkedSlugs.forEach((slug) => {
      const prog = allPrograms.find((p) => p.slug === slug)
      if (prog) {
        const range = this.getOpportunityRange(slug, prog.fundingAmount)
        minSum += range.min
        maxSum += range.max
      }
    })

    if (minSum === 0 && maxSum === 0) {
      return {
        min: 0,
        max: 0,
        formatted: "N/A",
      }
    }

    const formatCurrency = (val: number) => {
      if (val >= 1000000) {
        return `$${(val / 1000000).toFixed(1)}M`
      }
      return `$${(val / 1000).toFixed(0)}k`
    }

    return {
      min: minSum,
      max: maxSum,
      formatted: `${formatCurrency(minSum)} - ${formatCurrency(maxSum)}+`,
    }
  }

  /**
   * Returns a dynamic status / review cycle deadline.
   */
  static getOpportunityStatus(slug: string): string {
    if (slug === "sred-tax-credit") {
      return "Open • Tax year filing intake active"
    }
    if (slug === "irap-grant") {
      return "Open • ITA consultations active (Fast Allocation)"
    }
    if (slug === "canexport") {
      return "Open • Next review deadline: 14 days remaining"
    }
    return "Open • Active CCPC intake window"
  }
}
