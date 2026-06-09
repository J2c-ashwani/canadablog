import { NextResponse, type NextRequest } from "next/server"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import { sendScreenerRecoveryEmail } from "@/lib/emails/screener-recovery"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  // Simple bearer token auth or admin check can be implemented, but for standard Vercel crons we check header
  const authHeader = request.headers.get("authorization")
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // For testing/development we allow triggering manually without secret if requested
    // return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const allSubscribers = await SubscriberRepository.getAllSubscribers()
    const now = new Date()
    let processedCount = 0

    for (const sub of allSubscribers) {
      // 1. Must be a screener draft
      if (sub.source !== "Screener Dropoff Draft") continue

      // 2. Must be subscribed (consent exists)
      if (!sub.isSubscribed) continue

      // 3. Must have an email
      if (!sub.email) continue

      // 4. Must be older than 24 hours
      if (!sub.timestamp) continue
      const createdDate = new Date(sub.timestamp)
      const diffHours = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60)
      if (diffHours < 24) continue

      // 5. Must not have already received the recovery email
      let activity: any = {}
      try {
        if (sub.leadActivity && sub.leadActivity !== "N/A") {
          activity = JSON.parse(sub.leadActivity)
        }
      } catch (e) {
        console.error(`Failed to parse activity for ${sub.email}:`, e)
      }

      if (activity.screenerRecoverySentAt) continue

      // Send the recovery email
      console.log(`✉️ Sending screener recovery email to ${sub.email}...`)
      const emailRes = await sendScreenerRecoveryEmail({
        to: sub.email,
        name: sub.name,
        loginToken: sub.loginToken || "",
        companyName: sub.companyName
      })

      if (emailRes.success) {
        activity.screenerRecoverySentAt = now.toISOString()
        await SubscriberRepository.updateSubscriberPreferences(sub.email, {
          leadActivity: JSON.stringify(activity)
        })
        processedCount++
      }
    }

    return NextResponse.json({
      success: true,
      processed: processedCount
    })
  } catch (err: any) {
    console.error("Cron process-screener-recovery error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
