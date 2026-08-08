import { type NextRequest, NextResponse } from "next/server";
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository";
import {
  sendMCAAbandonmentEmail2,
  sendMCAAbandonmentEmail3
} from "@/lib/emails/mca-abandonment";
import { isValidCronRequest } from "@/lib/admin/auth";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    if (!isValidCronRequest(request)) {
      return NextResponse.json({ error: "Unauthorized MCA recovery cron execution." }, { status: 401 })
    }

    const subscribers = await SubscriberRepository.getAllSubscribers()
    const now = Date.now()

    let mcaRecover2Count = 0
    let mcaRecover3Count = 0
    let skippedCount = 0

    for (const sub of subscribers) {
      if (!sub.email || !sub.email.includes("@")) {
        skippedCount++
        continue
      }

      // Check lead activity for MCA application step 1
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

      const isMcaPartialLead =
        activity.source === 'MCA Application Step 1' ||
        activity.toolUsed === 'MCA 3-Step Intake' ||
        ((sub as any).leadSource || '').includes('MCA') ||
        (sub.lastAttributionSource || '').includes('MCA');

      if (!isMcaPartialLead) {
        skippedCount++
        continue
      }

      // Calculate elapsed time from creation
      const createdDateStr = sub.timestamp || (sub as any).createdAt
      const createdAt = createdDateStr ? new Date(createdDateStr).getTime() : now
      const elapsedMs = now - createdAt

      let emailSent = false

      // Day 1 Recovery (24 hours = 24 * 60 * 60 * 1000)
      if (elapsedMs >= 24 * 60 * 60 * 1000 && elapsedMs < 72 * 60 * 60 * 1000 && !activity.mcaRecover2SentAt) {
        console.log(`✉️ Triggering MCA Abandonment Email #2 for: ${sub.email}`)
        const res = await sendMCAAbandonmentEmail2({
          to: sub.email,
          name: sub.name,
          companyName: sub.companyName,
          province: sub.region
        })
        if (res.success) {
          activity.mcaRecover2SentAt = new Date().toISOString()
          emailSent = true
          mcaRecover2Count++
        }
      }
      // Day 3 Recovery (72 hours)
      else if (elapsedMs >= 72 * 60 * 60 * 1000 && activity.mcaRecover2SentAt && !activity.mcaRecover3SentAt) {
        console.log(`✉️ Triggering MCA Abandonment Email #3 for: ${sub.email}`)
        const res = await sendMCAAbandonmentEmail3({
          to: sub.email,
          name: sub.name,
          companyName: sub.companyName,
          province: sub.region
        })
        if (res.success) {
          activity.mcaRecover3SentAt = new Date().toISOString()
          emailSent = true
          mcaRecover3Count++
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
        mcaRecoverDay1: mcaRecover2Count,
        mcaRecoverDay3: mcaRecover3Count
      },
      skipped: skippedCount
    })
  } catch (error: any) {
    console.error("MCA recovery cron execution error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
