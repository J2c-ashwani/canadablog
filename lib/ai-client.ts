import { GoogleGenerativeAI } from "@google/generative-ai"
import type { GrantFinderRequest, GrantFinderResponse, Grant } from "./ai-grant-matcher"
import { grantsDatabase } from "./grants-data"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!)

// Safe JSON parser to prevent runtime crashes
function safeJSONParse(text: string) {
  try {
    if (!text) return null
    return JSON.parse(text)
  } catch (err) {
    console.error("JSON Parse Error. Raw response:", text)
    return null
  }
}

export async function findMatchingGrants(request: GrantFinderRequest): Promise<GrantFinderResponse> {

  // Filter grants by country first
  const relevantGrants = grantsDatabase.filter(
    (grant) => grant.region.includes(request.country) || grant.region.includes("All")
  )

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

Respond ONLY with valid JSON in this exact structure:
{
  "matchedGrantIds": ["id1","id2"],
  "matchScores": [0.9,0.8],
  "matchReasons": {
    "id1": ["reason1"],
    "id2": ["reason1"]
  },
  "recommendations": ["rec1"],
  "nextSteps": ["step1"]
}`

  try {

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Remove markdown if Gemini returns ```json blocks
    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    const aiResponse = safeJSONParse(cleanedText)

    // If parsing fails → fallback
    if (!aiResponse || !aiResponse.matchedGrantIds) {
      console.warn("AI returned invalid JSON, using fallback matching")
      return fallbackMatching(request, relevantGrants)
    }

    const matches = aiResponse.matchedGrantIds
      .map((grantId: string, index: number) => {
        const grant = relevantGrants.find((g) => g.id === grantId)
        if (!grant) return null

        return {
          grant,
          matchScore: aiResponse.matchScores?.[index] ?? 0.5,
          matchReasons: aiResponse.matchReasons?.[grantId] ?? [],
        }
      })
      .filter(Boolean)

    return {
      matches,
      totalMatches: matches.length,
      recommendations: aiResponse.recommendations ?? [],
      nextSteps: aiResponse.nextSteps ?? [],
    }

  } catch (error) {

    console.error("Gemini API Error:", error)

    return fallbackMatching(request, relevantGrants)
  }
}


// Fallback matching if AI fails
function fallbackMatching(request: GrantFinderRequest, grants: Grant[]): GrantFinderResponse {

  const matches = grants
    .map((grant) => {

      let score = 0
      const reasons: string[] = []

      if (grant.category.toLowerCase().includes(request.industry.toLowerCase())) {
        score += 0.4
        reasons.push(`Matches your ${request.industry} industry`)
      }

      if (grant.region.includes(request.country)) {
        score += 0.3
        reasons.push(`Available in ${request.country}`)
      }

      if (grant.status === "Active") {
        score += 0.2
        reasons.push("Currently accepting applications")
      }

      return score > 0.3
        ? { grant, matchScore: score, matchReasons: reasons }
        : null

    })
    .filter(Boolean)
    .sort((a, b) => (b?.matchScore || 0) - (a?.matchScore || 0))
    .slice(0, 5) as any

  return {
    matches,
    totalMatches: matches.length,
    recommendations: [
      "Review eligibility criteria carefully",
      "Prepare documentation in advance",
      "Apply to multiple grants to increase chances"
    ],
    nextSteps: [
      "Review grant requirements",
      "Prepare business plan & financials",
      "Track deadlines carefully"
    ],
  }
}