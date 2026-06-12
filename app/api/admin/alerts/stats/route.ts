import { type NextRequest, NextResponse } from "next/server"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import { getAllCampaignMetrics } from "@/lib/leads/alert-metrics"
import { cookies } from "next/headers"
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/admin/auth"
import { applyRateLimit } from "@/lib/rate-limit"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  // 1. Rate Limiting (20 requests/minute)
  const limitRes = applyRateLimit(request, 20, 60 * 1000)
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
    const subs = await SubscriberRepository.getAllSubscribers()
    const activeSubs = subs.filter(s => s.isSubscribed)
    const inactiveSubs = subs.filter(s => !s.isSubscribed)

    // Calculate average engagement score
    const avgEngagement = activeSubs.length > 0 
      ? Math.round(activeSubs.reduce((acc, s) => acc + s.engagementScore, 0) / activeSubs.length)
      : 100

    const metrics = await getAllCampaignMetrics()

    return NextResponse.json({
      success: true,
      stats: {
        totalSubscribers: subs.length,
        activeSubscribers: activeSubs.length,
        unsubscribed: inactiveSubs.length,
        averageEngagement: avgEngagement,
      },
      metrics: Object.values(metrics).sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
    })
  } catch (error) {
    console.error("Alert stats API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
