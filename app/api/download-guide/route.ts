import { type NextRequest, NextResponse } from "next/server"
import { appendLeadToSheet } from "@/lib/google-sheets"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, phone, guideName, country, utmSource, utmMedium, utmCampaign, gaClientId } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "N/A"
    const userAgent = request.headers.get("user-agent") || "N/A"

    // Save lead with specific guide name
    await appendLeadToSheet({
      source: `PDF Download - ${guideName || "Grant Guide"}`, // 🎯 SOURCE with detail
      timestamp: new Date().toISOString(),
      email,
      name,
      phone,
      country,
      additionalNotes: `Downloaded guide: ${guideName || "Grant Guide"}`,
      pagePath: body.pagePath || request.headers.get("referer") || "N/A",
      ipAddress,
      userAgent,
      utmSource,
      utmMedium,
      utmCampaign,
      gaClientId,
      offlineStatus: "Lead",
    })


    // Return PDF URL or trigger download
    return NextResponse.json({
      success: true,
      message: "Guide ready for download",
      downloadUrl: "/lead-magnets/ultimate-grant-guide-2026.pdf",
    })
  } catch (error) {
    console.error("Download guide error:", error)
    return NextResponse.json({ error: "Failed to process" }, { status: 500 })
  }
}
