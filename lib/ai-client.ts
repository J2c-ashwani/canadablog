import { GoogleGenerativeAI } from "@google/generative-ai"
import type { GrantFinderRequest, GrantFinderResponse, Grant } from "./ai-grant-matcher"
import { grantsDatabase } from "./grants-data"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!)

export async function findMatchingGrants(request: GrantFinderRequest): Promise<GrantFinderResponse> {
  // Filter grants by country first
  const relevantGrants = grantsDatabase.filter(
    (grant) => grant.region.includes(request.country) || grant.region.includes("All")
  )

  // Create a detailed prompt for Gemini
  const prompt = `You are a grant matching expert. Analyze this business profile and match them with the most relevant grants.

Business Profile:
- Country: ${request.country}
- State/Province: ${request.state}
- Industry: ${request.industry}
- Business Stage: ${request.businessStage}
- Funding Amount Needed: ${request.fundingAmount || "Not specified"}
- Funding Purpose: ${request.fundingPurpose || "Not specified"}
- Business Description: ${request.businessDescription || "Not provided"}

Available Grants:
${JSON.stringify(relevantGrants, null, 2)}

Please provide:
1. Top 3-5 best matching grants (return grant IDs)
2. Match score for each (0-1)
3. Specific reasons why each grant matches
4. General recommendations for improving their chances
5. Next steps they should take

Respond ONLY with valid JSON in this exact structure (no markdown, no code blocks):
{
  "matchedGrantIds": ["id1", "id2", "id3"],
  "matchScores": [0.95, 0.87, 0.75],
  "matchReasons": {
    "id1": ["reason1", "reason2"],
    "id2": ["reason1", "reason2"]
  },
  "recommendations": ["rec1", "rec2", "rec3"],
  "nextSteps": ["step1", "step2", "step3"]
}`

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Clean up the response (remove markdown code blocks if present)
    const cleanedText = text.replace(/``````\n?/g, "").trim()
    const aiResponse = JSON.parse(cleanedText)

    // Map AI response to our format
    const matches = aiResponse.matchedGrantIds
      .map((grantId: string, index: number) => {
        const grant = relevantGrants.find((g) => g.id === grantId)
        if (!grant) return null

        return {
          grant,
          matchScore: aiResponse.matchScores[index],
          matchReasons: aiResponse.matchReasons[grantId] || [],
        }
      })
      .filter(Boolean)

    return {
      matches,
      totalMatches: matches.length,
      recommendations: aiResponse.recommendations || [],
      nextSteps: aiResponse.nextSteps || [],
    }
  } catch (error) {
    console.error("Gemini API Error:", error)

    // Fallback: Basic keyword matching if AI fails
    return fallbackMatching(request, relevantGrants)
  }
}

// Fallback matching function if AI API fails (same as before)
function fallbackMatching(request: GrantFinderRequest, grants: Grant[]): GrantFinderResponse {
  const matches = grants
    .map((grant) => {
      let score = 0
      const reasons: string[] = []

      // Industry match
      if (grant.categories.some((cat) => request.industry.toLowerCase().includes(cat))) {
        score += 0.4
        reasons.push(`Matches your ${request.industry} industry focus`)
      }

      // Location match
      if (grant.region.includes(request.country)) {
        score += 0.3
        reasons.push(`Available in ${request.country}`)
      }

      // Status check
      if (grant.status === "Active") {
        score += 0.2
        reasons.push("Currently accepting applications")
      }

      return score > 0.3 ? { grant, matchScore: score, matchReasons: reasons } : null
    })
    .filter(Boolean)
    .sort((a, b) => (b?.matchScore || 0) - (a?.matchScore || 0))
    .slice(0, 5) as any

  return {
    matches,
    totalMatches: matches.length,
    recommendations: [
      "Review each grant's eligibility criteria carefully",
      "Prepare required documentation in advance",
      "Consider applying to multiple grants to increase your chances",
    ],
    nextSteps: [
      "Review the detailed requirements for each recommended grant",
      "Gather necessary business documentation (tax returns, business plan, financials)",
      "Set application deadlines in your calendar",
      "Consider consulting with a grant writing specialist",
    ],
  }
}
