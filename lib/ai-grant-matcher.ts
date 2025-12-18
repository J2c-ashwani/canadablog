import { GoogleGenerativeAI } from "@google/generative-ai"
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

// Initialize Gemini AI
const genAI = process.env.GOOGLE_GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY)
  : null

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
    .filter((match) => match.matchScore > 0.3)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10)

  // Generate recommendations
  const recommendations = generateRecommendations(request, matches)
  const nextSteps = generateNextSteps(request, matches)

  return {
    matches,
    totalMatches: matches.length,
    recommendations,
    nextSteps,
  }
}

// Enhanced AI-powered matching with Gemini
export async function findMatchingGrantsWithAI(request: GrantFinderRequest): Promise<GrantFinderResponse> {
  // Get baseline matches using your existing algorithm
  const baselineMatches = findMatchingGrants(request)

  // If Gemini API is not configured, return baseline matches
  if (!genAI) {
    console.log("Gemini API not configured, using baseline matching")
    return baselineMatches
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    const prompt = `You are an expert grant advisor. Analyze this business and the matching grants, then provide:
1. Refined match scores (0-1) for each grant
2. Additional specific match reasons
3. Personalized recommendations
4. Actionable next steps

Business Profile:
- Country: ${request.country}
- State: ${request.state}
- Industry: ${request.industry}
- Business Stage: ${request.businessStage}
- Funding Amount: ${request.fundingAmount}
- Funding Purpose: ${request.fundingPurpose}
- Description: ${request.businessDescription}

Matched Grants:
${JSON.stringify(
  baselineMatches.matches.slice(0, 5).map((m) => ({
    id: m.grant.id,
    name: m.grant.name,
    description: m.grant.description,
    category: m.grant.category,
    fundingRange: `$${m.grant.fundingMin}-$${m.grant.fundingMax}`,
    currentScore: m.matchScore,
  })),
  null,
  2,
)}

Respond with ONLY valid JSON (no markdown):
{
  "enhancedGrants": [
    {
      "grantId": "grant-id",
      "refinedScore": 0.95,
      "additionalReasons": ["reason1", "reason2"],
      "applicationTips": "Specific tip for this grant"
    }
  ],
  "recommendations": ["personalized rec 1", "rec 2", "rec 3"],
  "nextSteps": ["actionable step 1", "step 2", "step 3"]
}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Clean and parse AI response
    const cleanedText = text.replace(/``````\n?/g, "").trim()
    const aiResponse = JSON.parse(cleanedText)

    // Merge AI insights with baseline matches
    const enhancedMatches = baselineMatches.matches.map((match) => {
      const aiEnhancement = aiResponse.enhancedGrants?.find((e: any) => e.grantId === match.grant.id)

      if (aiEnhancement) {
        return {
          ...match,
          matchScore: aiEnhancement.refinedScore || match.matchScore,
          matchReasons: [...match.matchReasons, ...(aiEnhancement.additionalReasons || [])],
        }
      }
      return match
    })

    return {
      matches: enhancedMatches.sort((a, b) => b.matchScore - a.matchScore),
      totalMatches: enhancedMatches.length,
      recommendations: aiResponse.recommendations || baselineMatches.recommendations,
      nextSteps: aiResponse.nextSteps || baselineMatches.nextSteps,
    }
  } catch (error) {
    console.error("Gemini AI Error:", error)
    // Fallback to baseline matches if AI fails
    return baselineMatches
  }
}

// [Keep all your existing helper functions below]
function calculateMatchScore(grant: Grant, request: GrantFinderRequest): number {
  let score = 0
  const factors: { weight: number; match: boolean }[] = []

  if (grant.country !== request.country) return 0

  const industryMatch = matchIndustry(grant.category, request.industry)
  factors.push({ weight: 0.3, match: industryMatch })

  const fundingMatch = matchFundingAmount(grant, request.fundingAmount)
  factors.push({ weight: 0.25, match: fundingMatch })

  const stageMatch = matchBusinessStage(grant, request.businessStage)
  factors.push({ weight: 0.2, match: stageMatch })

  const purposeMatch = matchFundingPurpose(grant, request.fundingPurpose)
  factors.push({ weight: 0.15, match: purposeMatch })

  const regionalMatch = grant.region === "Federal" || grant.region.toLowerCase().includes(request.state.toLowerCase())
  factors.push({ weight: 0.1, match: regionalMatch })

  factors.forEach(({ weight, match }) => {
    if (match) score += weight
  })

  return Math.min(score, 1)
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
  if (!requestRange) return true

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
    steps.push("Register your business in SAM.gov and obtain a UEI number")
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

// Main export function
export async function processGrantFinderRequest(request: GrantFinderRequest): Promise<GrantFinderResponse> {
  // Use AI-enhanced matching if available, otherwise use baseline
  return await findMatchingGrantsWithAI(request)
}
