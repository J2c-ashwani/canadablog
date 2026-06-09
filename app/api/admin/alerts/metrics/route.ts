import { type NextRequest, NextResponse } from "next/server"
import { recordCampaignEvent } from "@/lib/leads/alert-metrics"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const campaignId = searchParams.get("campaignId")
    const event = searchParams.get("event") as any

    if (!campaignId || !event) {
      return NextResponse.json({ error: "campaignId and event are required" }, { status: 400 })
    }

    const validEvents = ["open", "click", "conversion", "audit", "revenue"]
    if (!validEvents.includes(event)) {
      return NextResponse.json({ error: "Invalid event type" }, { status: 400 })
    }

    await recordCampaignEvent(campaignId, event, 1)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Alert metrics API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
