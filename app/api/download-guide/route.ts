import { type NextRequest, NextResponse } from "next/server"
import { appendLeadToSheet } from "@/lib/google-sheets"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, phone, guideName, country } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Save lead with specific guide name
    await appendLeadToSheet({
      source: `PDF Download - ${guideName || "Grant Guide"}`, // 🎯 SOURCE with detail
      timestamp: new Date().toISOString(),
      email,
      name,
      phone,
      country,
      additionalNotes: `Downloaded guide: ${guideName || "Grant Guide"}`,
    })

    // Return PDF URL or trigger download
    return NextResponse.json({
      success: true,
      message: "Guide ready for download",
      downloadUrl: "/guides/sample-guide.pdf", // Your PDF path
    })
  } catch (error) {
    console.error("Download guide error:", error)
    return NextResponse.json({ error: "Failed to process" }, { status: 500 })
  }
}
