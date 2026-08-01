import { type NextRequest, NextResponse } from "next/server"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import {
  sendUpsellEmail1,
  sendUpsellEmail2,
  sendUpsellEmail3
} from "@/lib/emails/post-purchase-upsell"

import { isValidCronRequest } from "@/lib/admin/auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    if (!isValidCronRequest(request)) {
      return NextResponse.json({ error: "Unauthorized post purchase upsell cron execution." }, { status: 401 })
    }

    const subscribers = await SubscriberRepository.getAllSubscribers()
    const now = Date.now()

    let upsell1Count = 0
    let upsell2Count = 0
    let upsell3Count = 0
    let skippedCount = 0

    for (const sub of subscribers) {
      if (!sub.email || !sub.email.includes("@")) {
        skippedCount++
        continue
      }
      if (!sub.isSubscribed) {
        skippedCount++
        continue
      }
      if (sub.strategyReportPurchased === true) {
        skippedCount++
        continue
      }
      if (!sub.reportPurchased) {
        skippedCount++
        continue
      }

      // Parse activity JSON
      let activity: any = {}
      try {
        if (sub.leadActivity && sub.leadActivity !== "N/A" && sub.leadActivity !== "{}") {
          activity = JSON.parse(sub.leadActivity)
        }
      } catch (e) {
        console.error(`Failed to parse activity for subscriber ${sub.email}:`, e)
      }

      if (!activity.paymentCompletedAt) {
        skippedCount++
        continue
      }

      const paymentCompletedMs = new Date(activity.paymentCompletedAt).getTime()
      if (Number.isNaN(paymentCompletedMs)) {
        skippedCount++
        continue
      }

      const elapsedMs = now - paymentCompletedMs
      let emailSent = false

      // Day 2 (48 hours, i.e., 2 * 24 * 60 * 60 * 1000 ms = 172800000)
      if (elapsedMs >= 48 * 60 * 60 * 1000 && !activity.upsellEmail1SentAt) {
        console.log(`✉️ Triggering Upsell #1 for: ${sub.email}`)
        const res = await sendUpsellEmail1({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          companyName: sub.companyName,
          province: sub.region,
          productPurchased: activity.purchasedProductId || "Funding Match Report"
        })
        if (res.success || res.skipped) {
          activity.upsellEmail1SentAt = new Date().toISOString()
          emailSent = true
          upsell1Count++
        }
      }
      // Day 5 (120 hours)
      else if (elapsedMs >= 120 * 60 * 60 * 1000 && activity.upsellEmail1SentAt && !activity.upsellEmail2SentAt) {
        console.log(`✉️ Triggering Upsell #2 for: ${sub.email}`)
        const res = await sendUpsellEmail2({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          companyName: sub.companyName,
          province: sub.region,
          productPurchased: activity.purchasedProductId || "Funding Match Report"
        })
        if (res.success || res.skipped) {
          activity.upsellEmail2SentAt = new Date().toISOString()
          emailSent = true
          upsell2Count++
        }
      }
      // Day 10 (240 hours)
      else if (elapsedMs >= 240 * 60 * 60 * 1000 && activity.upsellEmail2SentAt && !activity.upsellEmail3SentAt) {
        console.log(`✉️ Triggering Upsell #3 for: ${sub.email}`)
        const res = await sendUpsellEmail3({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          companyName: sub.companyName,
          province: sub.region,
          productPurchased: activity.purchasedProductId || "Funding Match Report"
        })
        if (res.success || res.skipped) {
          activity.upsellEmail3SentAt = new Date().toISOString()
          emailSent = true
          upsell3Count++
        }
      }

      if (emailSent) {
        // Sync database activity column
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
        upsell1: upsell1Count,
        upsell2: upsell2Count,
        upsell3: upsell3Count
      },
      skipped: skippedCount
    })
  } catch (error: any) {
    console.error("Post purchase upsell cron execution error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
