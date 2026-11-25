import { type NextRequest, NextResponse } from "next/server"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import {
  sendUpsellEmail1,
  sendUpsellEmail2,
  sendUpsellEmail3,
  sendFeedbackEmail
} from "@/lib/emails/post-purchase-upsell"

import { isValidCronRequest } from "@/lib/admin/auth"
import { acquireOperationLease, finishOperationLease } from "@/lib/growth-os/operations-store"
import { isTestOrInternalContact } from "@/lib/leads/commercial-eligibility"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
const MAX_UPSELL_SENDS_PER_RUN = 10

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized post purchase upsell cron execution." }, { status: 401 })
  }

  const dryRun = request.nextUrl.searchParams.get("dry") === "true"
  const lease = await acquireOperationLease(`purchase-upsell:${dryRun ? "dry" : "live"}`, 30 * 60 * 1000)
  if (!lease.acquired) {
    return NextResponse.json({ success: true, skipped: true, reason: lease.reason })
  }

  try {
    const subscribers = await SubscriberRepository.getAllSubscribers()
    const now = Date.now()

    let upsell1Count = 0
    let upsell2Count = 0
    let upsell3Count = 0
    let feedbackCount = 0
    let skippedCount = 0
    let attemptedCount = 0
    const dryCandidates: Array<{ email: string; stage: string; productPurchased: string }> = []

    for (const sub of subscribers) {
      if (!sub.email || !sub.email.includes("@")) {
        skippedCount++
        continue
      }
      if (!sub.isSubscribed || isTestOrInternalContact(sub)) {
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

      const purchasedProductId = String(activity.purchasedProductId || "").toLowerCase().trim()
      const alreadyHasTopTier = purchasedProductId === "funding-bundle" || purchasedProductId === "strategy-audit" || purchasedProductId === "strategy-vip"

      const elapsedMs = now - paymentCompletedMs
      let emailSent = false

      if (attemptedCount >= MAX_UPSELL_SENDS_PER_RUN) {
        skippedCount++
        continue
      }

      // Day 2 (48 hours, i.e., 2 * 24 * 60 * 60 * 1000 ms = 172800000)
      if (!alreadyHasTopTier && elapsedMs >= 48 * 60 * 60 * 1000 && !activity.upsellEmail1SentAt) {
        attemptedCount++
        if (dryRun) {
          dryCandidates.push({ email: sub.email, stage: "upsell-1", productPurchased: purchasedProductId || "Funding Match Report" })
          upsell1Count++
          continue
        }
        const res = await sendUpsellEmail1({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          companyName: sub.companyName,
          province: sub.region,
          productPurchased: activity.purchasedProductId || "Funding Match Report"
        })
        if (res.success) {
          activity.upsellEmail1SentAt = new Date().toISOString()
          emailSent = true
          upsell1Count++
        }
      }
      // Day 5 (120 hours)
      else if (!alreadyHasTopTier && elapsedMs >= 120 * 60 * 60 * 1000 && activity.upsellEmail1SentAt && !activity.upsellEmail2SentAt) {
        attemptedCount++
        if (dryRun) {
          dryCandidates.push({ email: sub.email, stage: "upsell-2", productPurchased: purchasedProductId || "Funding Match Report" })
          upsell2Count++
          continue
        }
        const res = await sendUpsellEmail2({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          companyName: sub.companyName,
          province: sub.region,
          productPurchased: activity.purchasedProductId || "Funding Match Report"
        })
        if (res.success) {
          activity.upsellEmail2SentAt = new Date().toISOString()
          emailSent = true
          upsell2Count++
        }
      }
      // Day 10 (240 hours)
      else if (!alreadyHasTopTier && elapsedMs >= 240 * 60 * 60 * 1000 && activity.upsellEmail2SentAt && !activity.upsellEmail3SentAt) {
        attemptedCount++
        if (dryRun) {
          dryCandidates.push({ email: sub.email, stage: "upsell-3", productPurchased: purchasedProductId || "Funding Match Report" })
          upsell3Count++
          continue
        }
        const res = await sendUpsellEmail3({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          companyName: sub.companyName,
          province: sub.region,
          productPurchased: activity.purchasedProductId || "Funding Match Report"
        })
        if (res.success) {
          activity.upsellEmail3SentAt = new Date().toISOString()
          emailSent = true
          upsell3Count++
        }
      }
      // Day 14 (336 hours) — Customer Satisfaction & Feedback Loop
      else if (elapsedMs >= 336 * 60 * 60 * 1000 && (alreadyHasTopTier || activity.upsellEmail3SentAt) && !activity.feedbackEmailSentAt) {
        attemptedCount++
        if (dryRun) {
          dryCandidates.push({ email: sub.email, stage: "feedback-day14", productPurchased: purchasedProductId || "Funding Match Report" })
          feedbackCount++
          continue
        }
        const res = await sendFeedbackEmail({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          companyName: sub.companyName,
          province: sub.region,
          productPurchased: activity.purchasedProductId || "Funding Match Report"
        })
        if (res.success) {
          activity.feedbackEmailSentAt = new Date().toISOString()
          emailSent = true
          feedbackCount++
        }
      }

      if (emailSent && !dryRun) {
        // Sync database activity column
        await SubscriberRepository.updateSubscriberPreferences(sub.email, {
          leadActivity: JSON.stringify(activity)
        })
      } else if (!emailSent) {
        skippedCount++
      }
    }

    const summary = {
      success: true,
      dryRun,
      processed: subscribers.length,
      attemptedCount,
      sent: {
        upsell1: upsell1Count,
        upsell2: upsell2Count,
        upsell3: upsell3Count,
        feedback: feedbackCount
      },
      skipped: skippedCount,
      dryCandidatesCount: dryCandidates.length,
    }
    await finishOperationLease(lease, "SUCCEEDED", summary)
    return NextResponse.json(summary)
  } catch (error: any) {
    console.error("Post purchase upsell cron execution error:", error)
    await finishOperationLease(lease, "FAILED", { error: error.message || String(error) }).catch(() => {})
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
