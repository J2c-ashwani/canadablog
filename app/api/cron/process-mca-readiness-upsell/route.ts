import { type NextRequest, NextResponse } from "next/server";
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository";
import {
  sendMCAReadinessEmail2,
  sendMCAReadinessEmail3
} from "@/lib/emails/mca-readiness-upsell";
import { isValidCronRequest } from "@/lib/admin/auth";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    if (!isValidCronRequest(request)) {
      return NextResponse.json({ error: "Unauthorized MCA readiness cron execution." }, { status: 401 })
    }

    const subscribers = await SubscriberRepository.getAllSubscribers()
    const now = Date.now()

    let readiness2Count = 0
    let readiness3Count = 0
    let skippedCount = 0

    for (const sub of subscribers) {
      if (!sub.email || !sub.email.includes("@")) {
        skippedCount++
        continue
      }

      let activity: any = {}
      try {
        if ((sub as any).leadActivity) {
          activity = typeof (sub as any).leadActivity === 'string'
            ? JSON.parse((sub as any).leadActivity)
            : (sub as any).leadActivity
        }
      } catch {
        activity = {}
      }

      // Check if subscriber completed full MCA application or has active readiness sequence
      const isCompletedMcaApp =
        activity.source === 'MCA Application Submitted' ||
        activity.mcaApplicationId ||
        activity.mcaReadinessEmail1SentAt;

      // Skip if customer already paid for $49 readiness review
      if (!isCompletedMcaApp || activity.mcaReadinessPaidAt || activity.priorityOrderPaid) {
        skippedCount++
        continue
      }

      const createdDateStr = activity.mcaAppSubmittedAt || sub.timestamp || (sub as any).createdAt
      const createdAt = createdDateStr ? new Date(createdDateStr).getTime() : now
      const elapsedMs = now - createdAt

      let emailSent = false

      // 12 Hours (12 * 60 * 60 * 1000)
      if (elapsedMs >= 12 * 60 * 60 * 1000 && elapsedMs < 72 * 60 * 60 * 1000 && !activity.mcaReadinessEmail2SentAt) {
        console.log(`✉️ Triggering MCA Readiness Email #2 (12h) for: ${sub.email}`)
        const res = await sendMCAReadinessEmail2({
          to: sub.email,
          name: sub.name,
          companyName: sub.companyName,
          province: sub.region,
          recoveryToken: activity.mcaRecoveryToken || ""
        })
        if (res.success) {
          activity.mcaReadinessEmail2SentAt = new Date().toISOString()
          emailSent = true
          readiness2Count++
        }
      }
      // 72 Hours (72 * 60 * 60 * 1000)
      else if (elapsedMs >= 72 * 60 * 60 * 1000 && activity.mcaReadinessEmail2SentAt && !activity.mcaReadinessEmail3SentAt) {
        console.log(`✉️ Triggering MCA Readiness Email #3 (72h) for: ${sub.email}`)
        const res = await sendMCAReadinessEmail3({
          to: sub.email,
          name: sub.name,
          companyName: sub.companyName,
          province: sub.region,
          recoveryToken: activity.mcaRecoveryToken || ""
        })
        if (res.success) {
          activity.mcaReadinessEmail3SentAt = new Date().toISOString()
          emailSent = true
          readiness3Count++
        }
      }

      if (emailSent) {
        await SubscriberRepository.updateSubscriberPreferences(sub.email, {
          leadActivity: JSON.stringify(activity)
        })
      } else {
        skippedCount++
      }
    }

    return NextResponse.json({
      success: true,
      processed: subscribers.length,
      sent: {
        readiness12h: readiness2Count,
        readiness72h: readiness3Count
      },
      skipped: skippedCount
    })
  } catch (error: any) {
    console.error("MCA readiness cron execution error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
