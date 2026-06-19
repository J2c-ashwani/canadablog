import { type NextRequest, NextResponse } from "next/server"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import { sendFilingOffer7dEmail } from "@/lib/emails/post-call-emails"
import { isValidCronRequest } from "@/lib/admin/auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    if (!isValidCronRequest(request)) {
      return NextResponse.json({ error: "Unauthorized followup cron execution." }, { status: 401 })
    }

    const subscribers = await SubscriberRepository.getAllSubscribers()
    const now = Date.now()
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000

    // Filter leads who:
    // 1. Attended their audit call
    // 2. Have not signed up as filing clients yet
    // 3. Have the auditAttendedAt timestamp in leadActivity
    // 4. Have not been sent the 7-day followup yet
    // 5. Attended the audit at least 7 days ago
    const targetLeads = subscribers.filter(sub => {
      // Skip if they are fully signed filing clients
      if (sub.offlineStatus === "Filing Client Signed") {
        return false
      }

      let activity: Record<string, any> = {}
      if (sub.leadActivity && sub.leadActivity !== "N/A" && sub.leadActivity !== "{}") {
        try {
          activity = JSON.parse(sub.leadActivity)
        } catch (e) {
          return false
        }
      }

      // Check if audit was attended and has timestamp
      if (!activity.auditAttendedAt) {
        return false
      }

      // Check if 7-day followup has already been sent
      if (activity.auditFollowupSent) {
        return false
      }

      // Check if 7 days have elapsed since the audit call
      const attendedTime = new Date(activity.auditAttendedAt).getTime()
      if (now - attendedTime < sevenDaysInMs) {
        return false
      }

      return true
    })

    if (targetLeads.length === 0) {
      return NextResponse.json({ success: true, message: "No leads qualify for 7-day post-audit followup today." })
    }

    let sentCount = 0
    let errorCount = 0

    for (const sub of targetLeads) {
      console.log(`✉️ Triggering 7-day post-audit filing offer email to: ${sub.email}`)

      try {
        const emailRes = await sendFilingOffer7dEmail({
          to: sub.email,
          name: sub.name || "Founder",
          companyName: sub.companyName || "Your Company"
        })

        // Update leadActivity preferences to record email sent
        let activity: Record<string, any> = {}
        if (sub.leadActivity && sub.leadActivity !== "N/A" && sub.leadActivity !== "{}") {
          try {
            activity = JSON.parse(sub.leadActivity)
          } catch (e) {}
        }

        activity.auditFollowupSent = true
        activity.auditFollowupSentAt = new Date().toISOString()

        await SubscriberRepository.updateSubscriberPreferences(sub.email, {
          leadActivity: JSON.stringify(activity)
        })

        sentCount++
      } catch (err) {
        console.error(`❌ Failed to send 7-day followup to ${sub.email}:`, err)
        errorCount++
      }
    }

    return NextResponse.json({
      success: true,
      processed: targetLeads.length,
      sent: sentCount,
      errors: errorCount
    })
  } catch (error: any) {
    console.error("Audit followup cron error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
