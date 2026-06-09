import { type NextRequest, NextResponse } from "next/server"
import { captureEmailLead } from "@/lib/google-sheets"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, utmSource, utmMedium, utmCampaign, gaClientId, location, industry, country, source } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Save subscriber with source and segmentation
    await captureEmailLead(
      email,
      source || "Newsletter Subscription",
      name,
      utmSource,
      utmMedium,
      utmCampaign,
      gaClientId,
      location,
      industry,
      country
    )

    return NextResponse.json({ success: true, message: "Successfully subscribed!" })
  } catch (error) {
    console.error("Subscription error:", error)
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}
