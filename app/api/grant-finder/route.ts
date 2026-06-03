import { type NextRequest, NextResponse } from "next/server"
import { processGrantFinderRequest, type GrantFinderRequest } from "@/lib/ai-grant-matcher"
import { appendLeadToSheet } from "@/lib/google-sheets"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as GrantFinderRequest & {
      consentToPartnerContact?: boolean
      pagePath?: string
    }

    // Validate required fields
    if (!body.country || !body.industry || !body.businessStage || !body.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Save lead to Google Sheets with source tracking
    const timestamp = new Date().toISOString()
    appendLeadToSheet({
      source: "AI Grant Finder", // 🎯 SOURCE TRACKING
      timestamp,
      email: body.email,
      companyName: body.companyName || "",
      country: body.country,
      phone: body.phone,
      state: body.state || "",
      industry: body.industry,
      businessStage: body.businessStage,
      fundingAmount: body.fundingAmount || "",
      fundingPurpose: body.fundingPurpose || "",
      businessDescription: body.businessDescription || "",
      consentToPartnerContact: !!body.consentToPartnerContact,
      pagePath: body.pagePath || request.headers.get("referer") || "N/A",
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "N/A",
      userAgent: request.headers.get("user-agent") || "N/A",
    }).catch((error) => {
      console.error("❌ Failed to save lead to Google Sheets:", error)
    })

    // Process the grant finder request
    const results = await processGrantFinderRequest(body)

    return NextResponse.json(results)
  } catch (error) {
    console.error("Grant finder error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
