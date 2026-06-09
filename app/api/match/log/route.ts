import { type NextRequest, NextResponse } from "next/server"
import { appendMatchEvaluationToSheet } from "@/lib/google-sheets"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, region, industry, companySize, programSlug, fitBand, confidence, difficulty } = body

    if (!email || !region || !industry || !companySize || !programSlug || !fitBand) {
      return NextResponse.json({ error: "Missing required match log parameters" }, { status: 400 })
    }

    const res = await appendMatchEvaluationToSheet({
      timestamp: new Date().toISOString(),
      email,
      region,
      industry,
      companySize,
      programSlug,
      fitBand,
      confidence: confidence || "Medium",
      difficulty: difficulty || "Moderate"
    })

    if (res.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: res.error || "Failed to log evaluation" }, { status: 500 })
    }
  } catch (error) {
    console.error("Match evaluation log API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
