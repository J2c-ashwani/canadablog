import { NextResponse, type NextRequest } from "next/server"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import { sendInactivityRecoveryEmail } from "@/lib/emails/inactivity-alert"

import { isValidCronRequest } from "@/lib/admin/auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized inactivity recovery cron execution." }, { status: 401 })
  }

  try {
    const allSubscribers = await SubscriberRepository.getAllSubscribers()
    const now = new Date()
    let processedCount = 0

    for (const sub of allSubscribers) {
      // Must be subscribed
      if (!sub.isSubscribed || !sub.email) continue

      // Must be an active trial or paid membership user
      if (sub.subscriptionStatus !== "trial" && sub.subscriptionStatus !== "active") continue

      // Calculate last active timestamp from recency properties
      const dates = [sub.lastLoginAt, sub.lastDashboardViewAt, sub.lastPortfolioViewAt]
        .filter((d): d is string => !!(d && d !== "N/A" && d !== ""))
        .map(d => new Date(d).getTime())

      if (dates.length === 0) {
        // Fallback to timestamp (signup time) if no active view was recorded yet
        if (sub.timestamp) {
          dates.push(new Date(sub.timestamp).getTime())
        } else {
          continue
        }
      }

      const lastActive = Math.max(...dates)
      const diffDays = Math.floor((now.getTime() - lastActive) / (1000 * 60 * 60 * 24))

      if (diffDays < 14) continue // Active recently (under 14 days)

      // Retrieve activity
      let activity: any = {}
      try {
        if (sub.leadActivity && sub.leadActivity !== "N/A" && sub.leadActivity !== "{}") {
          activity = JSON.parse(sub.leadActivity)
        }
      } catch (e) {
        console.error(`Failed to parse activity for inactive member ${sub.email}:`, e)
      }

      // Check cooldown between inactivity warning emails (must be at least 14 days)
      if (activity.lastInactivityRecoverySentAt) {
        const lastSent = new Date(activity.lastInactivityRecoverySentAt).getTime()
        const daysSinceSent = Math.floor((now.getTime() - lastSent) / (1000 * 60 * 60 * 24))
        if (daysSinceSent < 14) continue
      }

      console.log(`✉️ Sending Inactivity Warning to ${sub.email} (last active ${diffDays} days ago)...`)
      const emailRes = await sendInactivityRecoveryEmail({
        to: sub.email,
        name: sub.name,
        loginToken: sub.loginToken || "",
        companyName: sub.companyName
      })

      if (emailRes.success) {
        activity.lastInactivityRecoverySentAt = now.toISOString()
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
    console.error("Cron process-inactive-recovery error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
