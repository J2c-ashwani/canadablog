/**
 * Growth OS — Campaign Generator
 * Generates situation-matched multi-channel copy bundles from a RevenueOpportunity.
 */

import { GoogleGenerativeAI } from "@google/generative-ai"
import { RevenueOpportunity } from "../types"

export interface CampaignBundle {
  opportunityId: string
  campaignName: string
  emailSubject: string
  emailBody: string
  socialPost: string
  partnerPlug: string
  primaryCta: string
  ctaDestination: string
}

export class CampaignGenerator {
  public static async generateBundle(opportunity: RevenueOpportunity): Promise<CampaignBundle> {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "demo_key")

    const prompt = `You are the Chief Sales & Revenue Copywriter for FSI Digital. Generate a high-converting situation-based marketing campaign bundle.

Opportunity: ${opportunity.trigger}
Target Buyer: ${opportunity.buyerSegment}
Recommended Product: ${opportunity.recommendedProduct}
Target Landing Page: https://fsidigital.ca${opportunity.targetLandingPage}
Official Evidence: ${opportunity.evidence.map((e) => e.sourceUrl).join(", ")}

Campaign Theme: The August Funding Window (Urgency based on active program intake & Q3 deadlines).

Respond ONLY in valid JSON format with keys:
{
  "emailSubject": "Compelling subject line",
  "emailBody": "High-converting email body explaining the problem, funding update, who qualifies, common mistake, and single CTA.",
  "socialPost": "Educational LinkedIn post breakdown with zero fluff.",
  "partnerPlug": "2-sentence newsletter snippet for accountants & CFOs.",
  "primaryCta": "CTA Button Text"
}`

    try {
      if (process.env.GOOGLE_GEMINI_API_KEY) {
        const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-3.6-flash" })
        const result = await model.generateContent(prompt)
        const response = await result.response
        const rawText = response.text().replace(/```json/g, "").replace(/```/g, "").trim()
        const parsed = JSON.parse(rawText)

        return {
          opportunityId: opportunity.id,
          campaignName: `August Window - ${opportunity.buyerSegment}`,
          emailSubject: parsed.emailSubject,
          emailBody: parsed.emailBody,
          socialPost: parsed.socialPost,
          partnerPlug: parsed.partnerPlug,
          primaryCta: parsed.primaryCta || `Access Your ${opportunity.recommendedProduct}`,
          ctaDestination: `https://fsidigital.ca${opportunity.targetLandingPage}`,
        }
      }
    } catch (err) {
      console.warn("[CampaignGenerator] Gemini API call skipped or failed, using deterministic fallback:", err)
    }

    // High-converting deterministic fallback
    return {
      opportunityId: opportunity.id,
      campaignName: `August Window - ${opportunity.buyerSegment}`,
      emailSubject: `[Action Required] Urgent funding intake open for ${opportunity.buyerSegment}`,
      emailBody: `Hi Founder,\n\nKey funding program updates have just been announced: ${opportunity.trigger}.\n\nIf you are operating as a ${opportunity.buyerSegment}, application windows are currently active on a first-come, first-served basis.\n\nThe biggest mistake founders make is applying without verifying stacking limits or program order.\n\nCheck your exact qualification status and claim your custom ${opportunity.recommendedProduct} here:\nhttps://fsidigital.ca${opportunity.targetLandingPage}`,
      socialPost: `Attention ${opportunity.buyerSegment}: New funding intakes are officially active. Key program details: ${opportunity.trigger}.\n\nRead full qualification criteria here: https://fsidigital.ca${opportunity.targetLandingPage}`,
      partnerPlug: `Monthly Funding Update: New grant rounds have opened for ${opportunity.buyerSegment}. View verified breakdown here: https://fsidigital.ca${opportunity.targetLandingPage}`,
      primaryCta: `Get Your ${opportunity.recommendedProduct}`,
      ctaDestination: `https://fsidigital.ca${opportunity.targetLandingPage}`,
    }
  }
}
