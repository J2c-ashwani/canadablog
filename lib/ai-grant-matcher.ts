import { GoogleGenerativeAI } from "@google/generative-ai"
import { type Grant, grantsDatabase } from "./grants-data"

export type { Grant };

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
  phone?: string
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

const genAI = process.env.GOOGLE_GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY)
  : null

// Safe JSON parser to prevent crashes
function safeJSONParse(text: string) {
  try {
    if (!text) return null
    return JSON.parse(text)
  } catch (err) {
    console.error("JSON Parse Error. Raw response:", text)
    return null
  }
}

// Baseline matching
export function findMatchingGrants(request: GrantFinderRequest): GrantFinderResponse {

  const { country, state } = request

  let eligibleGrants = grantsDatabase.filter((grant) => grant.country === country)

  if (state && state !== "all") {
    eligibleGrants = eligibleGrants.filter(
      (grant) =>
        grant.region === "Federal" ||
        grant.region.toLowerCase().includes(state.toLowerCase())
    )
  }

  const matches: GrantMatch[] = eligibleGrants
    .map((grant) => {
      const matchScore = calculateMatchScore(grant, request)
      const matchReasons = getMatchReasons(grant, request)
      return { grant, matchScore, matchReasons }
    })
    .filter((match) => match.matchScore > 0.3)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10)

  const recommendations = generateRecommendations(request, matches)
  const nextSteps = generateNextSteps(request, matches)

  return {
    matches,
    totalMatches: matches.length,
    recommendations,
    nextSteps,
  }
}

// AI enhanced matching
export async function findMatchingGrantsWithAI(
  request: GrantFinderRequest
): Promise<GrantFinderResponse> {

  const baselineMatches = findMatchingGrants(request)

  if (!genAI) {
    console.log("Gemini API not configured, using baseline matching")
    return baselineMatches
  }

  try {

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    const prompt = `You are an expert grant advisor.

Business Profile:
Country: ${request.country}
State: ${request.state}
Industry: ${request.industry}
Stage: ${request.businessStage}
Funding Amount: ${request.fundingAmount}
Purpose: ${request.fundingPurpose}
Description: ${request.businessDescription}

Matched Grants:
${JSON.stringify(
  baselineMatches.matches.slice(0, 5).map((m) => ({
    id: m.grant.id,
    name: m.grant.name,
    description: m.grant.description,
    category: m.grant.category,
    fundingRange: m.grant.fundingMin + "-" + m.grant.fundingMax,
    currentScore: m.matchScore
  })),
  null,
  2
)}

Respond ONLY with JSON:
{
  "enhancedGrants":[
    {
      "grantId":"id",
      "refinedScore":0.9,
      "additionalReasons":["reason1"]
    }
  ],
  "recommendations":["rec1"],
  "nextSteps":["step1"]
}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    const aiResponse = safeJSONParse(cleanedText)

    if (!aiResponse) {
      console.warn("AI returned invalid JSON. Using baseline matches.")
      return baselineMatches
    }

    const enhancedMatches = baselineMatches.matches.map((match) => {

      const aiEnhancement = aiResponse.enhancedGrants?.find(
        (e: any) => e.grantId === match.grant.id
      )

      if (!aiEnhancement) return match

      return {
        ...match,
        matchScore: aiEnhancement.refinedScore ?? match.matchScore,
        matchReasons: [
          ...match.matchReasons,
          ...(aiEnhancement.additionalReasons ?? []),
        ],
      }

    })

    return {
      matches: enhancedMatches.sort((a, b) => b.matchScore - a.matchScore),
      totalMatches: enhancedMatches.length,
      recommendations: aiResponse.recommendations ?? baselineMatches.recommendations,
      nextSteps: aiResponse.nextSteps ?? baselineMatches.nextSteps,
    }

  } catch (error) {

    console.error("Gemini AI Error:", error)

    return baselineMatches
  }
}

// Helper functions
function calculateMatchScore(grant: Grant, request: GrantFinderRequest): number {
  let score = 0

  if (grant.category.toLowerCase().includes(request.industry.toLowerCase())) {
    score += 0.4
  }

  if (grant.eligibility.some(el => el.toLowerCase().includes(request.businessStage.toLowerCase()))) {
    score += 0.3
  }

  if (grant.region === "Federal" || grant.region.toLowerCase().includes(request.state.toLowerCase())) {
    score += 0.2
  }

  if (grant.status === "Active") {
    score += 0.1
  }

  return Math.min(score, 1)
}

function getMatchReasons(grant: Grant, request: GrantFinderRequest): string[] {
  const reasons: string[] = []

  if (grant.category.toLowerCase().includes(request.industry.toLowerCase())) {
    reasons.push(`Matches your ${request.industry} industry`)
  }

  if (grant.eligibility.some(el => el.toLowerCase().includes(request.businessStage.toLowerCase()))) {
    reasons.push(`Suitable for ${request.businessStage} businesses`)
  }

  if (grant.region === "Federal" || grant.region.toLowerCase().includes(request.state.toLowerCase())) {
    reasons.push(`Available in ${request.state}`)
  }

  if (grant.status === "Active") {
    reasons.push("Currently accepting applications")
  }

  return reasons
}

function generateRecommendations(request: GrantFinderRequest, matches: GrantMatch[]): string[] {
  const recommendations = [
    "Review eligibility criteria carefully before applying",
    "Prepare all required documentation in advance",
    "Consider applying to multiple grants to increase chances"
  ]

  if (matches.length < 3) {
    recommendations.push("Explore additional funding options beyond grants")
  }

  return recommendations
}

function generateNextSteps(request: GrantFinderRequest, matches: GrantMatch[]): string[] {
  return [
    "Review grant requirements and deadlines",
    "Prepare business plan and financial statements",
    "Gather supporting documentation",
    "Submit applications through official portals"
  ]
}

// MAIN API entry
export async function processGrantFinderRequest(
  request: GrantFinderRequest
): Promise<GrantFinderResponse> {
  return await findMatchingGrantsWithAI(request)
}