import { type NextRequest, NextResponse } from "next/server"
import { AlertEngine } from "@/lib/leads/AlertEngine"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { category, programSlug, changeText } = body

    if (!category) {
      return NextResponse.json({ error: "category is required" }, { status: 400 })
    }

    let draft = null

    if (category === "New Opportunity") {
      if (!programSlug) return NextResponse.json({ error: "programSlug is required" }, { status: 400 })
      draft = await AlertEngine.createOpportunityAlertDraft(programSlug)
    } else if (category === "Program Change") {
      if (!programSlug || !changeText) {
        return NextResponse.json({ error: "programSlug and changeText are required" }, { status: 400 })
      }
      draft = await AlertEngine.createProgramChangeDraft(programSlug, changeText)
    } else if (category === "Weekly Intelligence") {
      draft = await AlertEngine.createWeeklyDigestDraft()
    } else if (category === "Emergency") {
      if (!programSlug) return NextResponse.json({ error: "programSlug is required" }, { status: 400 })
      draft = await AlertEngine.createEmergencyAlertDraft(programSlug)
    } else {
      return NextResponse.json({ error: "Invalid alert category" }, { status: 400 })
    }

    if (!draft) {
      return NextResponse.json({ error: "No matching active subscribers for this segment." }, { status: 404 })
    }

    return NextResponse.json({ success: true, draft })
  } catch (error) {
    console.error("Alert draft API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
