import { type Grant, grantsDatabase } from "./grants-data"

export interface GrantFinderRequest {
  country: "USA" | "Canada"
  state: string
  industry: string
  businessStage: string
  fundingAmount: string
  fundingPurpose: string
  businessDescription: string
  email: string
  companyName?: string
}

export interface GrantMatch {
  grant: Grant
  matchScore: number
  matchReasons: string[]
}

export interface GrantFinderResponse {
  matches: GrantMatch[]
  totalMatches: number
  recommendations: string[]
  nextSteps: string[]
}

// AI-powered grant matching algorithm
export function findMatchingGrants(request: GrantFinderRequest): GrantFinderResponse {
  const { country, state, industry, businessStage, fundingAmount, fundingPurpose, businessDescription } = request

  // Filter grants by country first
  let eligibleGrants = grantsDatabase.filter((grant) => grant.country === country)

  // Filter by region if state-specific
  if (state && state !== "all") {
    eligibleGrants = eligibleGrants.filter(
      (grant) => grant.region === "Federal" || grant.region.toLowerCase().includes(state.toLowerCase()),
    )
  }

  // Score and match grants
  const matches: GrantMatch[] = eligibleGrants
    .map((grant) => {
      const matchScore = calculateMatchScore(grant, request)
      const matchReasons = getMatchReasons(grant, request)
      return { grant, matchScore, matchReasons }
    })
    .filter((match) => match.matchScore > 0.3) // Only include reasonable matches
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10) // Top 10 matches

  // Generate AI-powered recommendations
  const recommendations = generateRecommendations(request, matches)
  const nextSteps = generateNextSteps(request, matches)

  return {
    matches,
    totalMatches: matches.length,
    recommendations,
    nextSteps,
  }
}

function calculateMatchScore(grant: Grant, request: GrantFinderRequest): number {
  let score = 0
  const factors: { weight: number; match: boolean }[] = []

  // Country match (required)
  if (grant.country !== request.country) return 0

  // Industry/Category matching
  const industryMatch = matchIndustry(grant.category, request.industry)
  factors.push({ weight: 0.3, match: industryMatch })

  // Funding amount matching
  const fundingMatch = matchFundingAmount(grant, request.fundingAmount)
  factors.push({ weight: 0.25, match: fundingMatch })

  // Business stage matching
  const stageMatch = matchBusinessStage(grant, request.businessStage)
  factors.push({ weight: 0.2, match: stageMatch })

  // Purpose matching
  const purposeMatch = matchFundingPurpose(grant, request.fundingPurpose)
  factors.push({ weight: 0.15, match: purposeMatch })

  // Regional preference
  const regionalMatch = grant.region === "Federal" || grant.region.toLowerCase().includes(request.state.toLowerCase())
  factors.push({ weight: 0.1, match: regionalMatch })

  // Calculate weighted score
  factors.forEach(({ weight, match }) => {
    if (match) score += weight
  })

  return Math.min(score, 1) // Cap at 1.0
}

function matchIndustry(grantCategory: string, userIndustry: string): boolean {
  const industryMappings: Record<string, string[]> = {
    technology: ["Technology", "Innovation", "AI", "Software"],
    healthcare: ["Healthcare", "Medical", "Biotech"],
    manufacturing: ["Manufacturing", "Industrial"],
    agriculture: ["Agriculture", "Farming", "Food"],
    energy: ["Green Energy", "Clean Energy", "Renewable Energy"],
    retail: ["Retail", "Commerce", "Small Business"],
    services: ["Professional Services", "Small Business"],
  }

  const mappedCategories = industryMappings[userIndustry.toLowerCase()] || [userIndustry]
  return mappedCategories.some((category) => grantCategory.toLowerCase().includes(category.toLowerCase()))
}

function matchFundingAmount(grant: Grant, requestedAmount: string): boolean {
  const amountRanges: Record<string, { min: number; max: number }> = {
    "under-25k": { min: 0, max: 25000 },
    "25k-100k": { min: 25000, max: 100000 },
    "100k-500k": { min: 100000, max: 500000 },
    "500k-1m": { min: 500000, max: 1000000 },
    "over-1m": { min: 1000000, max: Number.POSITIVE_INFINITY },
  }

  const requestRange = amountRanges[requestedAmount]
  if (!requestRange) return true // If no specific amount, match all

  // Check if grant funding range overlaps with requested range
  return grant.fundingMax >= requestRange.min && grant.fundingMin <= requestRange.max
}

function matchBusinessStage(grant: Grant, businessStage: string): boolean {
  const stageKeywords: Record<string, string[]> = {
    idea: ["startup", "early", "seed", "concept"],
    startup: ["startup", "small business", "early", "innovation"],
    growth: ["growth", "expansion", "scale", "development"],
    established: ["established", "mature", "expansion", "all business"],
  }

  const keywords = stageKeywords[businessStage] || []
  const grantText = `${grant.name} ${grant.description} ${grant.eligibility.join(" ")}`.toLowerCase()

  return keywords.some((keyword) => grantText.includes(keyword))
}

function matchFundingPurpose(grant: Grant, purpose: string): boolean {
  const purposeKeywords: Record<string, string[]> = {
    research: ["research", "development", "R&D", "innovation"],
    equipment: ["equipment", "technology", "machinery", "infrastructure"],
    expansion: ["expansion", "growth", "scale", "market"],
    hiring: ["hiring", "training", "workforce", "employment"],
    marketing: ["marketing", "sales", "promotion", "market"],
    "working-capital": ["working capital", "operations", "cash flow"],
  }

  const keywords = purposeKeywords[purpose] || []
  const grantText = `${grant.name} ${grant.description} ${grant.tags.join(" ")}`.toLowerCase()

  return keywords.some((keyword) => grantText.includes(keyword))
}

function getMatchReasons(grant: Grant, request: GrantFinderRequest): string[] {
  const reasons: string[] = []

  if (matchIndustry(grant.category, request.industry)) {
    reasons.push(`Matches your ${request.industry} industry focus`)
  }

  if (matchFundingAmount(grant, request.fundingAmount)) {
    reasons.push("Funding amount aligns with your needs")
  }

  if (grant.region === "Federal") {
    reasons.push("Available nationwide")
  } else if (grant.region.toLowerCase().includes(request.state.toLowerCase())) {
    reasons.push(`Specifically available in ${request.state}`)
  }

  if (grant.status === "Active") {
    reasons.push("Currently accepting applications")
  }

  return reasons
}

function generateRecommendations(request: GrantFinderRequest, matches: GrantMatch[]): string[] {
  const recommendations: string[] = []

  if (matches.length === 0) {
    recommendations.push("Consider broadening your search criteria or exploring adjacent industries")
    recommendations.push("Look into state-specific programs that might not be in our current database")
    recommendations.push("Consider applying to federal programs that have broader eligibility requirements")
  } else {
    if (matches.some((m) => m.grant.region === "Federal")) {
      recommendations.push("Focus on federal programs first as they typically have larger funding amounts")
    }

    if (matches.some((m) => m.grant.deadline.includes("Rolling"))) {
      recommendations.push("Start with grants that have rolling deadlines to avoid time pressure")
    }

    if (request.businessStage === "idea" || request.businessStage === "startup") {
      recommendations.push("Consider SBIR/STTR programs if you have an innovative technology component")
    }

    recommendations.push("Prepare a strong business plan and financial projections before applying")
    recommendations.push("Consider working with a grant writer for complex applications")
  }

  return recommendations
}

function generateNextSteps(request: GrantFinderRequest, matches: GrantMatch[]): string[] {
  const steps: string[] = []

  if (request.country === "USA") {
    steps.push("Register your business in SAM.gov and obtain a DUNS number")
    steps.push("Create an account on grants.gov for federal applications")
  } else {
    steps.push("Ensure your business is registered with the Canada Revenue Agency")
    steps.push("Gather your business registration and tax documents")
  }

  steps.push("Prepare detailed financial statements and business plan")
  steps.push("Review eligibility requirements carefully for each grant")
  steps.push("Start with the highest-match grants and work your way down")
  steps.push("Set up a calendar to track application deadlines")

  return steps
}

// Simulate AI processing with OpenAI-style response
export async function processGrantFinderRequest(request: GrantFinderRequest): Promise<GrantFinderResponse> {
  // In a real implementation, this would call OpenAI API
  // For now, we'll use our matching algorithm

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return findMatchingGrants(request)
}
