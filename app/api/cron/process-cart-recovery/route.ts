import { type NextRequest, NextResponse } from "next/server"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import {
  sendCartRecoveryEmail1,
  sendCartRecoveryEmail2,
  sendCartRecoveryEmail3,
  sendReportNotOpenedEmail
} from "@/lib/emails/cart-recovery"

import { isValidCronRequest } from "@/lib/admin/auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    if (!isValidCronRequest(request)) {
      return NextResponse.json({ error: "Unauthorized cart recovery cron execution." }, { status: 401 })
    }

    const subscribers = await SubscriberRepository.getAllSubscribers()
    const now = Date.now()

    let recovery1Count = 0
    let recovery2Count = 0
    let recovery3Count = 0
    let reportNotOpenedCount = 0
    let skippedCount = 0

    for (const sub of subscribers) {
      // Adjustment 1: Recovery should trigger only for qualified, active, subscribed leads with valid emails
      if (!sub.email || !sub.email.includes("@")) {
        skippedCount++
        continue
      }
      if (!sub.isSubscribed) {
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

      const isPurchased = !!sub.reportPurchased

      if (!isPurchased) {
        // ── CART ABANDONMENT RECOVERY SEQUENCE ──
        if (!activity.checkoutStartedAt) {
          skippedCount++
          continue
        }

        const checkoutStartMs = new Date(activity.checkoutStartedAt).getTime()
        if (Number.isNaN(checkoutStartMs)) {
          skippedCount++
          continue
        }

        const elapsedMs = now - checkoutStartMs
        let emailSent = false
        let stepUpdated = false

        // Email #1 (45 minutes, i.e., 2700000 ms)
        if (elapsedMs >= 45 * 60 * 1000 && !activity.cartRecoveryEmail1SentAt) {
          console.log(`🛒 Triggering Cart Recovery #1 for: ${sub.email}`)
          const res = await sendCartRecoveryEmail1({
            to: sub.email,
            name: sub.name,
            loginToken: sub.loginToken || "",
            companyName: sub.companyName,
            priceShown: activity.priceShown
          })
          if (res.success || res.skipped) {
            activity.cartRecoveryEmail1SentAt = new Date().toISOString()
            emailSent = true
            recovery1Count++
          }
        }
        // Email #2 (24 hours, i.e., 86400000 ms)
        else if (elapsedMs >= 24 * 60 * 60 * 1000 && activity.cartRecoveryEmail1SentAt && !activity.cartRecoveryEmail2SentAt) {
          console.log(`🛒 Triggering Cart Recovery #2 for: ${sub.email}`)
          const res = await sendCartRecoveryEmail2({
            to: sub.email,
            name: sub.name,
            loginToken: sub.loginToken || "",
            companyName: sub.companyName,
            priceShown: activity.priceShown
          })
          if (res.success || res.skipped) {
            activity.cartRecoveryEmail2SentAt = new Date().toISOString()
            emailSent = true
            recovery2Count++
          }
        }
        // Email #3 (72 hours, i.e., 259200000 ms)
        else if (elapsedMs >= 72 * 60 * 60 * 1000 && activity.cartRecoveryEmail2SentAt && !activity.cartRecoveryEmail3SentAt) {
          console.log(`🛒 Triggering Cart Recovery #3 for: ${sub.email}`)
          const res = await sendCartRecoveryEmail3({
            to: sub.email,
            name: sub.name,
            loginToken: sub.loginToken || "",
            companyName: sub.companyName,
            priceShown: activity.priceShown
          })
          if (res.success || res.skipped) {
            activity.cartRecoveryEmail3SentAt = new Date().toISOString()
            emailSent = true
            recovery3Count++
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
      else {
        // ── REPORT NOT VIEWED RECOVERY SEQUENCE (24 Hours) ──
        // Trigger if purchased, but never opened the report page
        const hasOpenedReport = !!activity.reportViewedAt

        if (!hasOpenedReport && !activity.reportNotViewedEmailSentAt) {
          const purchaseTimeMs = sub.timestamp ? new Date(sub.timestamp).getTime() : now
          const elapsedMsSincePurchase = now - purchaseTimeMs

          // Send reminder 24 hours after purchase
          if (elapsedMsSincePurchase >= 24 * 60 * 60 * 1000) {
            console.log(`✉️ Triggering Report Not Opened Email for: ${sub.email}`)
            const res = await sendReportNotOpenedEmail({
              to: sub.email,
              name: sub.name,
              loginToken: sub.loginToken || "",
              companyName: sub.companyName
            })
            if (res.success || res.skipped) {
              activity.reportNotViewedEmailSentAt = new Date().toISOString()
              
              await SubscriberRepository.updateSubscriberPreferences(sub.email, {
                leadActivity: JSON.stringify(activity)
              })
              reportNotOpenedCount++
            }
          } else {
            skippedCount++
          }
        } else {
          skippedCount++
        }
      }
    }

    return NextResponse.json({
      success: true,
      processed: subscribers.length,
      sent: {
        cartRecovery1: recovery1Count,
        cartRecovery2: recovery2Count,
        cartRecovery3: recovery3Count,
        reportNotOpened: reportNotOpenedCount
      },
      skipped: skippedCount
    })
  } catch (error: any) {
    console.error("Cart recovery cron execution error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
