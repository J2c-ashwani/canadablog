import { type NextRequest, NextResponse } from "next/server"
import { savePartnerInquiry } from "@/lib/partners/db"
import { validateEmail } from "@/lib/email-validator"
import { sendPartnerReceiptEmail } from "@/lib/emails/partner-inquiry"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      companyName,
      website,
      leadType,
      geography,
      existingVolume,
      budget,
      purchaseModel,
      decisionMakerRole,
      preferences,
      website_hp, // Honeypot field
      utmSource,
      utmMedium,
      utmCampaign,
      gaClientId,
    } = body


    // 1. Spam Honeypot validation
    if (website_hp && website_hp.trim().length > 0) {
      console.warn("⚠️ Spam submission blocked via honeypot.")
      return NextResponse.json({ error: "Spam detected." }, { status: 400 })
    }

    // 2. Required fields validation
    if (!name || !email || !companyName || !website) {
      return NextResponse.json(
        { error: "Name, email, company name, and website are required." },
        { status: 400 }
      )
    }

    // 3. Email validator check
    const emailCheck = validateEmail(email)
    if (!emailCheck.isValid) {
      return NextResponse.json({ error: emailCheck.error }, { status: 400 })
    }

    // 4. Extract client context metadata
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "N/A"
    const userAgent = request.headers.get("user-agent") || "N/A"

    const cleanLeadType = leadType || "All / Mixed Funding Leads"
    const cleanGeography = geography || "Canada & United States"
    const cleanExistingVolume = existingVolume || "None (Just starting)"
    const cleanBudget = budget || "$1,000-$5,000"
    const cleanPurchaseModel = purchaseModel || "Cost Per Lead (CPL) - Shared Leads"
    const cleanRole = decisionMakerRole || "Other"

    // 5. Save to Google Sheets via DB Layer
    const result = await savePartnerInquiry({
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : "N/A",
      companyName: companyName.trim(),
      website: website.trim(),
      leadType: cleanLeadType,
      geography: cleanGeography,
      existingVolume: cleanExistingVolume,
      budget: cleanBudget,
      purchaseModel: cleanPurchaseModel,
      decisionMakerRole: cleanRole,
      preferences: preferences ? preferences.trim() : "N/A",
      ipAddress,
      userAgent,
      utmSource,
      utmMedium,
      utmCampaign,
      gaClientId,
    })


    if (!result.success) {
      return NextResponse.json(
        { error: "Internal error saving inquiry. Please try again." },
        { status: 500 }
      )
    }

    // 6. Trigger B2B email sequence - Send instant receipt email (Email 1)
    sendPartnerReceiptEmail({
      to: email.trim().toLowerCase(),
      name: name.trim(),
      companyName: companyName.trim(),
      leadType: cleanLeadType,
      geography: cleanGeography,
      budget: cleanBudget,
    }).catch((error) => {
      console.error("❌ Failed to send B2B partner receipt email:", error)
    })

    console.log(`✅ B2B Partner Inquiry created: ${name} (${companyName})`)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("❌ Partner inquiry API error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    )
  }
}
