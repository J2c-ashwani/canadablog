import { type NextRequest, NextResponse } from "next/server"
import { AlertEngine } from "@/lib/leads/AlertEngine"
import { SubscriberRepository, type SubscriberProfile } from "@/lib/leads/SubscriberRepository"
import { getAllPrograms } from "@/lib/data/programs"
import { saveCampaignMetrics } from "@/lib/leads/alert-metrics"
import { queueAlertJob } from "@/lib/google-sheets"
import { cookies } from "next/headers"
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/admin/auth"
import { applyRateLimit } from "@/lib/rate-limit"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  // 1. Rate Limiting (20 requests/minute)
  const limitRes = await applyRateLimit(request, 20, 60 * 1000)
  if (limitRes.isLimited) return limitRes.response

  // 2. Auth Check
  const adminSecret = process.env.LEAD_DASHBOARD_SECRET
  if (!adminSecret) {
    return NextResponse.json({ error: "Private dashboard access is not ready yet." }, { status: 500 })
  }

  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value

  if (!isValidAdminSession(sessionCookie, adminSecret)) {
    return NextResponse.json({ error: "Unauthorized session." }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, category, priority, subject, programSlug, changeText, changeSeverity } = body

    if (!id || !category || !priority || !subject || !programSlug) {
      return NextResponse.json({ error: "Missing required draft properties" }, { status: 400 })
    }

    const severity = changeSeverity || (priority === "High" ? "critical" : priority === "Medium" ? "major" : "minor")

    if (severity === "minor") {
      console.log(`ℹ️ Skipping alert dispatch for minor program change: ${programSlug}`)
      return NextResponse.json({ 
        success: true, 
        skipped: true, 
        message: "Alert skipped because change severity is minor." 
      })
    }

    // Queue the alert job in AlertJobsQueue sheet
    const queueRes = await queueAlertJob(programSlug, severity)
    if (!queueRes.success) {
      return NextResponse.json({ error: "Failed to queue alert job in Google Sheets." }, { status: 500 })
    }

    // Initialize campaign metrics record
    await saveCampaignMetrics({
      campaignId: id,
      category,
      subject,
      sentCount: 0, // Will be updated by the processing cron
      opens: 0,
      clicks: 0,
      conversions: 0,
      audits: 0,
      revenue: 0,
      timestamp: new Date().toISOString()
    }).catch(err => console.error("Failed to save campaign metrics:", err))

    return NextResponse.json({ 
      success: true, 
      queued: true,
      message: `Alert successfully queued in AlertJobsQueue sheet with severity ${severity}.`
    })
  } catch (error) {
    console.error("Alert send API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
