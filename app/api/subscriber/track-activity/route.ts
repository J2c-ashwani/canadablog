import { NextResponse, type NextRequest } from "next/server"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, event, source } = body

    if (!email || !event) {
      return NextResponse.json({ error: "Email and event are required." }, { status: 400 })
    }

    // Retrieve subscriber
    const subscriber = await SubscriberRepository.getSubscriberByEmail(email)
    if (!subscriber) {
      return NextResponse.json({ error: "Subscriber not found." }, { status: 404 })
    }

    // Parse lead activity JSON safely
    let activity: any = {}
    try {
      if (subscriber.leadActivity && subscriber.leadActivity !== "N/A" && subscriber.leadActivity !== "{}") {
        activity = JSON.parse(subscriber.leadActivity)
      }
    } catch (e) {
      console.error("Failed to parse subscriber leadActivity JSON:", e)
    }

    // Timestamp the action based on event type
    const now = new Date().toISOString()
    const updates: any = {}

    if (event === "checkout_started") {
      activity.checkoutStartedAt = now
      if (body.priceShown) {
        activity.priceShown = body.priceShown
      }
    } else if (event === "checkout_viewed") {
      activity.checkoutViewedAt = now
      if (body.priceShown) {
        activity.priceShown = body.priceShown
      }
    } else if (event === "report_viewed") {
      activity.reportViewedAt = now
      if (!subscriber.firstReportViewedAt || subscriber.firstReportViewedAt === "N/A" || subscriber.firstReportViewedAt === "") {
        updates.firstReportViewedAt = now
      }
    } else if (event === "portfolio_viewed" || event === "dashboard_viewed") {
      updates.lastPortfolioViewAt = now
      updates.lastDashboardViewAt = now
      if (source && source.toLowerCase().includes("alert")) {
        updates.lastAlertClickAt = now
        updates.lastAlertClickedAt = now
      }
    } else if (event === "login") {
      updates.lastLoginAt = now
      updates.lastPortfolioViewAt = now
      updates.lastDashboardViewAt = now
      if (source && source.toLowerCase().includes("alert")) {
        updates.lastAlertClickAt = now
        updates.lastAlertClickedAt = now
      }
    } else if (event === "alert_click") {
      updates.lastAlertClickAt = now
      updates.lastAlertClickedAt = now
      updates.lastPortfolioViewAt = now
      updates.lastDashboardViewAt = now
    } else {
      return NextResponse.json({ error: `Unsupported event type: ${event}` }, { status: 400 })
    }

    updates.leadActivity = JSON.stringify(activity)

    // Update attribution source if passed
    if (source) {
      updates.lastAttributionSource = source
    }

    const dbRes = await SubscriberRepository.updateSubscriberPreferences(email, updates)
    if (!dbRes.success) {
      return NextResponse.json({ error: dbRes.error || "Failed to update subscriber activity log." }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      event,
      leadActivity: activity,
      lastAttributionSource: source || subscriber.lastAttributionSource || "N/A"
    })
  } catch (err: any) {
    console.error("Track activity API route error:", err)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
