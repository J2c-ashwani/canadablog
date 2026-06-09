import type { ProgramDetails } from "@/lib/data/programs"
import type { SubscriberProfile } from "@/lib/leads/SubscriberRepository"

export interface MatchResult {
  status: 'Eligible' | 'Not Eligible'
  fitBand: 'Excellent' | 'Strong' | 'Moderate' | 'Limited' | 'None'
  score: number // Internal only
  potentialOpportunity: string // e.g. "Potential Funding: Up to $150,000"
  confidence: 'High' | 'Medium' | 'Low'
  difficulty: 'Easy' | 'Moderate' | 'Competitive' | 'Highly Competitive'
  explanations: string[] // List of checkmarks and warnings
}

const REGION_MAP: Record<string, string> = {
  "on": "Ontario",
  "bc": "British Columbia",
  "qc": "Quebec",
  "ab": "Alberta",
  "ca": "California",
  "tx": "Texas",
  "ny": "New York",
  "fl": "Florida",
  "ontario": "Ontario",
  "quebec": "Quebec",
  "alberta": "Alberta",
  "british columbia": "British Columbia",
  "california": "California",
  "texas": "Texas",
  "new york": "New York",
  "florida": "Florida"
}

export class MatchScoreEngine {
  /**
   * Evaluates if a profile matches a program, and returns a detailed MatchResult
   */
  static calculateMatch(program: ProgramDetails, profile: Partial<SubscriberProfile>): MatchResult {
    const subscriberRegion = profile.region || "ON"
    const subscriberCountry = profile.country || "Canada"
    const subscriberIndustry = (profile.industry || "other").toLowerCase()
    const subscriberSize = profile.companySize || "1-9"
    const subscriberInterests = profile.fundingInterests || []

    // 1. HARD ELIGIBILITY GATEKEEPER (Pass / Fail)
    
    // Country check
    if (program.country !== subscriberCountry) {
      return this.notEligibleResult("✖ Program is only available in " + program.country)
    }

    // Region check (Only check if program is regional)
    if (program.region !== "Federal") {
      const progRegionNorm = program.region.toLowerCase().trim()
      const subRegionNorm = subscriberRegion.toLowerCase().trim()

      const progRegionName = REGION_MAP[progRegionNorm] || progRegionNorm
      const subRegionName = REGION_MAP[subRegionNorm] || subRegionNorm

      if (progRegionName !== subRegionName) {
        return this.notEligibleResult(`✖ Program is restricted to businesses in ${program.region}`)
      }
    }

    // Explicit blacklists (safeguards)
    const textToScan = `${program.name} ${program.fundingType} ${program.description} ${program.eligibility.join(" ")}`.toLowerCase()
    if (subscriberIndustry === "technology" || subscriberIndustry === "software") {
      if (textToScan.includes("agriculture only") || textToScan.includes("farming only")) {
        return this.notEligibleResult("✖ Program is restricted to agricultural operations")
      }
      if (textToScan.includes("non-profit only") || textToScan.includes("charity only")) {
        return this.notEligibleResult("✖ Program is restricted to non-profit organizations")
      }
    }

    // 2. SCORING WEIGHTS CALCULATION (Max 100 points)
    let score = 0
    const explanations: string[] = []

    // A. Industry Fit (35 points max)
    let industryScore = 0
    let industryMatched = false

    const techKeywords = ["technology", "software", "digital", "r&d", "innovation", "science", "development", "itc"]
    const mfgKeywords = ["manufacturing", "production", "equipment", "scale", "factory", "plant"]
    const cleanTechKeywords = ["clean", "green", "sustainability", "energy", "solar", "wind", "reduce"]
    
    let keywords: string[] = []
    if (subscriberIndustry === "technology" || subscriberIndustry === "software") {
      keywords = techKeywords
    } else if (subscriberIndustry === "manufacturing") {
      keywords = mfgKeywords
    } else if (subscriberIndustry === "cleantech" || subscriberIndustry === "energy") {
      keywords = cleanTechKeywords
    }

    if (keywords.length > 0) {
      const hasKeywordMatch = keywords.some(kw => textToScan.includes(kw))
      if (hasKeywordMatch) {
        industryScore = 35
        industryMatched = true
        explanations.push(`✓ High industry sector fit (${profile.industry || "Technology"})`)
      }
    }

    if (!industryMatched) {
      // General programs (like CanExport, BDC) get moderate industry alignment
      const isGeneralProgram = textToScan.includes("export") || textToScan.includes("general") || textToScan.includes("hiring") || textToScan.includes("business growth")
      if (isGeneralProgram) {
        industryScore = 25
        explanations.push(`✓ General business growth program (Sector eligible)`)
      } else {
        industryScore = 15
        explanations.push(`⚠ Moderate sector alignment (Pre-qualification check recommended)`)
      }
    }
    score += industryScore

    // B. Location Fit (30 points max)
    let locationScore = 0
    if (program.region !== "Federal") {
      // Direct state/provincial match
      locationScore = 30
      const displayRegion = REGION_MAP[subscriberRegion.toLowerCase()] || subscriberRegion
      explanations.push(`✓ Localized in ${displayRegion} (Direct regional allocation)`)
    } else {
      // Federal program match
      locationScore = 25
      explanations.push(`✓ Federal program available in ${subscriberCountry}`)
    }
    score += locationScore

    // C. Company Stage & Size Fit (20 points max)
    let sizeScore = 0
    const isSmeProgram = textToScan.includes("sme") || textToScan.includes("small business") || textToScan.includes("under 500") || textToScan.includes("under 100")
    
    if (subscriberSize === "1-9" || subscriberSize === "10-49") {
      // Small/medium size
      sizeScore = 20
      explanations.push(`✓ Company size matches target SMB cohorts (${subscriberSize} employees)`)
    } else if (subscriberSize === "50-99" || subscriberSize === "100-499") {
      if (textToScan.includes("startup only") || textToScan.includes("under 10")) {
        sizeScore = 10
        explanations.push(`⚠ Business size exceeds target micro-startup scale`)
      } else {
        sizeScore = 20
        explanations.push(`✓ Matches SME criteria (${subscriberSize} employees)`)
      }
    } else {
      // Large size
      if (isSmeProgram) {
        sizeScore = 5
        explanations.push(`⚠ Enterprise size may exceed maximum SME limits`)
      } else {
        sizeScore = 15
        explanations.push(`✓ Fits general company scale requirements`)
      }
    }
    score += sizeScore

    // D. Funding Type Interest Fit (15 points max)
    let interestScore = 0
    const progType = program.fundingType.toLowerCase()
    
    // Map subscriber interests list to program types
    const matchedInterest = subscriberInterests.some(interest => {
      const mapped = interest.toLowerCase()
      if (mapped.includes("grant") && progType.includes("grant")) return true
      if (mapped.includes("loan") && (progType.includes("loan") || progType.includes("debt"))) return true
      if (mapped.includes("tax credit") && progType.includes("credit")) return true
      if (mapped.includes("hiring") && (progType.includes("subsidy") || progType.includes("hire") || progType.includes("grant"))) return true
      return false
    })

    if (matchedInterest) {
      interestScore = 15
      explanations.push(`✓ Aligns with preferred funding structures (${program.fundingType})`)
    } else {
      interestScore = 5
      // Don't add a warning, just lower points slightly
    }
    score += interestScore

    // 3. FIT BAND MAPPING
    let fitBand: MatchResult['fitBand'] = 'Limited'
    if (score >= 85) fitBand = 'Excellent'
    else if (score >= 70) fitBand = 'Strong'
    else if (score >= 50) fitBand = 'Moderate'

    // 4. VALUE, DIFFICULTY & CONFIDENCE RATINGS
    
    // Safety label for opportunity value
    let potentialOpportunity = ""
    const rawAmt = program.fundingAmount || ""
    if (rawAmt.toLowerCase().startsWith("up to")) {
      potentialOpportunity = `Potential Funding Opportunity: ${rawAmt}`
    } else if (rawAmt.includes("-") || rawAmt.toLowerCase().includes("typical")) {
      potentialOpportunity = `Typical Funding Range: ${rawAmt}`
    } else {
      potentialOpportunity = `Potential Funding: Up to ${rawAmt}`
    }

    // Confidence mapping
    let confidence: MatchResult['confidence'] = 'Medium'
    if (program.fundingType === "Tax Credit" || program.id === "mitacs-accelerate") {
      confidence = 'High' // Tax credits are highly predictable based on math
    } else if (program.status === "Closed" || program.status === "Paused") {
      confidence = 'Low'
    }

    // Difficulty mapping
    let difficulty: MatchResult['difficulty'] = 'Competitive'
    if (program.fundingDifficulty === "Low") {
      difficulty = 'Easy'
    } else if (program.fundingDifficulty === "Moderate") {
      difficulty = 'Moderate'
    } else if (program.fundingDifficulty === "Competitive") {
      if (program.id === "nih-sbir" || program.id === "nsf-sbir" || program.id.includes("strategic-innovation-fund")) {
        difficulty = 'Highly Competitive'
      } else {
        difficulty = 'Competitive'
      }
    }

    // Additional warning flags for context
    if (textToScan.includes("export") || textToScan.includes("international")) {
      explanations.push("⚠ Export activity or overseas sales verification required")
    }

    return {
      status: 'Eligible',
      fitBand,
      score,
      potentialOpportunity,
      confidence,
      difficulty,
      explanations
    }
  }

  private static notEligibleResult(reason: string): MatchResult {
    return {
      status: 'Not Eligible',
      fitBand: 'None',
      score: 0,
      potentialOpportunity: 'N/A',
      confidence: 'Low',
      difficulty: 'Competitive',
      explanations: [reason]
    }
  }
}
