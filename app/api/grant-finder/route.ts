import { type NextRequest, NextResponse } from "next/server"
import { processGrantFinderRequest, type GrantFinderRequest } from "@/lib/ai-grant-matcher"
import { appendLeadToSheet } from "@/lib/google-sheets"

export async function POST(request: NextRequest) {
  try {
    const body: GrantFinderRequest = await request.json()

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
      state: body.state || "",
      industry: body.industry,
      businessStage: body.businessStage,
      fundingAmount: body.fundingAmount || "",
      fundingPurpose: body.fundingPurpose || "",
      businessDescription: body.businessDescription || "",
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
