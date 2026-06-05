import { appendPartnerInquiryToSheet } from "@/lib/google-sheets"

export interface PartnerInquiryData {
  timestamp: string
  name: string
  email: string
  phone: string
  companyName: string
  website: string
  leadType: string
  geography: string
  existingVolume: string
  budget: string
  purchaseModel: string
  decisionMakerRole: string
  preferences: string
  ipAddress?: string
  userAgent?: string
}

/**
 * Calculates a lead score (0-100) to prioritize high-value buyers
 */
export function calculatePartnerScore(data: Partial<PartnerInquiryData>): number {
  let score = 0

  // 1. Corporate Email vs Generic Domain (+20)
  const email = (data.email || "").trim().toLowerCase()
  if (email) {
    const genericDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "aol.com",
      "icloud.com",
      "mail.com",
      "msn.com",
    ]
    const domain = email.split("@")[1] || ""
    const isCorporate = domain && !genericDomains.includes(domain)
    if (isCorporate) {
      score += 20
    }
  }

  // 2. Has Website (+15)
  if (data.website && data.website.trim().length > 0) {
    score += 15
  }

  // 3. Monthly Budget (+25 max)
  const budget = data.budget || ""
  if (budget === "$20,000+" || budget === "$5,000-$20,000") {
    score += 25
  } else if (budget === "$1,000-$5,000") {
    score += 10
  }

  // 4. Target Market / Geography (+20 max)
  const geo = data.geography || ""
  if (geo.includes("United States") || geo.includes("Canada & United States")) {
    score += 20
  } else if (geo.includes("Canada")) {
    score += 15
  }

  // 5. Existing Lead Volume (+20)
  const vol = data.existingVolume || ""
  if (vol && vol !== "None (Just starting)") {
    score += 20
  }

  return score
}

/**
 * Future-proof database interface. Currently routes to Google Sheets MVP.
 */
export async function savePartnerInquiry(data: PartnerInquiryData) {
  const score = calculatePartnerScore(data)
  
  // Save to Google Sheets MVP
  const result = await appendPartnerInquiryToSheet(data, score)
  return { ...result, score }
}
