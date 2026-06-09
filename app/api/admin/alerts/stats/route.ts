import { type NextRequest, NextResponse } from "next/server"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import { getAllCampaignMetrics } from "@/lib/leads/alert-metrics"

export async function GET(request: NextRequest) {
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
