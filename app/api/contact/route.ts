import { type NextRequest, NextResponse } from "next/server"
import { appendLeadToSheet } from "@/lib/google-sheets"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      category,
      message,
      companyName,
      country,
      state,
      industry,
      businessStage,
      fundingAmount,
      fundingPurpose,
      businessDescription,
      consentToPartnerContact,
      pagePath,
    } = body

    // Validate required fields
    if (!email || !name || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Save lead to Google Sheets with source tracking
    await appendLeadToSheet({
      source: `Contact Form - ${category || "General"}`,
      timestamp: new Date().toISOString(),
      email,
      name,
      companyName,
      country,
      state,
      industry,
      businessStage,
      fundingAmount,
      fundingPurpose,
      businessDescription,
      phone,
      additionalNotes: `Category: ${category || "General"}\nMessage: ${message}`,
      consentToPartnerContact: !!consentToPartnerContact,
      pagePath: pagePath || request.headers.get("referer") || "N/A",
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "N/A",
      userAgent: request.headers.get("user-agent") || "N/A",
    }).catch((error) => {
      console.error("❌ Failed to save contact lead to Google Sheets:", error)
    })

    console.log(`📧 Contact form submission from: ${name} (${email})`)

    // TODO: Send email notification to you
    // TODO: Send confirmation email to user

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting us! We'll respond within 24 hours.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to submit message" }, { status: 500 })
  }
}
