import { type NextRequest, NextResponse } from "next/server"
import { appendLeadToSheet } from "@/lib/google-sheets"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, company, guideName, industry, country, phone } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Save lead to Google Sheets
    await appendLeadToSheet({
      source: `PDF Download - ${guideName}`,
      timestamp: new Date().toISOString(),
      email,
      name: name || company,
      companyName: company,
      country,
      industry,
      phone,
      additionalNotes: `Downloaded: ${guideName}`,
    }).catch((error) => console.error("Failed to save download lead:", error))

    return NextResponse.json({
      success: true,
      message: "Thank you! Your guide is ready.",
      redirectUrl: `/download/thank-you?guide=${encodeURIComponent(guideName)}`,
    })
  } catch (error) {
    console.error("Download API error:", error)
    return NextResponse.json({ error: "Failed to process download" }, { status: 500 })
  }
}
