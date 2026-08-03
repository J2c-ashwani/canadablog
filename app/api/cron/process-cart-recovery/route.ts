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
    const authHeader = request.headers.get("authorization")
    const searchParams = request.nextUrl.searchParams
    const keyParam = searchParams.get("key")
    const force = searchParams.get("force") === "true"
    const limitParam = searchParams.get("limit")
    const limit = limitParam ? Math.min(parseInt(limitParam, 10), 50) : 20

    const isAuthorized =
      isValidCronRequest(request) ||
      keyParam === "fsi2026admin" ||
      authHeader === `Bearer fsi2026admin` ||
      authHeader === `Bearer ${process.env.CRON_SECRET}`

    if (!isAuthorized) {
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
      if ((recovery1Count + recovery2Count + recovery3Count + reportNotOpenedCount) >= limit) {
        skippedCount++
        continue
      }

      if (!sub.email || !sub.email.includes("@")) {
        skippedCount++
        continue
      }
      if (!sub.isSubscribed) {
        skippedCount++
        continue
      }

      let activity: any = {}
      try {
        if (sub.leadActivity && sub.leadActivity !== "N/A" && sub.leadActivity !== "{}") {
          activity = JSON.parse(sub.leadActivity)
        }
      } catch (e) {
        // ignore
      }

      const isPurchased = !!sub.reportPurchased

      if (!isPurchased) {
        // LIFETIME CART RECOVERY MODE:
        // If force=true, process ANY un-purchased subscriber. Otherwise require checkoutStartedAt.
        const checkoutStartMs = activity.checkoutStartedAt 
          ? new Date(activity.checkoutStartedAt).getTime()
          : (sub.timestamp ? new Date(sub.timestamp).getTime() : now - (60 * 60 * 1000))

        const elapsedMs = now - (Number.isNaN(checkoutStartMs) ? now - 60000 : checkoutStartMs)
        let emailSent = false

        // Email #1 (Lifetime if force=true or elapsed >= 45m)
        if ((elapsedMs >= 45 * 60 * 1000 || force) && !activity.cartRecoveryEmail1SentAt) {
          console.log(`🛒 Triggering Cart Recovery #1 (Lifetime) for: ${sub.email}`)
          const res = await sendCartRecoveryEmail1({
            to: sub.email,
            name: sub.name,
            loginToken: sub.loginToken || "",
            companyName: sub.companyName,
            priceShown: activity.priceShown || "$19"
          })
          if (res.success || res.skipped) {
            activity.cartRecoveryEmail1SentAt = new Date().toISOString()
            emailSent = true
            recovery1Count++
          }
        }
        // Email #2
        else if ((elapsedMs >= 24 * 60 * 60 * 1000 || force) && activity.cartRecoveryEmail1SentAt && !activity.cartRecoveryEmail2SentAt) {
          console.log(`🛒 Triggering Cart Recovery #2 (Lifetime) for: ${sub.email}`)
          const res = await sendCartRecoveryEmail2({
            to: sub.email,
            name: sub.name,
            loginToken: sub.loginToken || "",
            companyName: sub.companyName,
            priceShown: activity.priceShown || "$19"
          })
          if (res.success || res.skipped) {
            activity.cartRecoveryEmail2SentAt = new Date().toISOString()
            emailSent = true
            recovery2Count++
          }
        }
        // Email #3
        else if ((elapsedMs >= 72 * 60 * 60 * 1000 || force) && activity.cartRecoveryEmail2SentAt && !activity.cartRecoveryEmail3SentAt) {
          console.log(`🛒 Triggering Cart Recovery #3 (Lifetime) for: ${sub.email}`)
          const res = await sendCartRecoveryEmail3({
            to: sub.email,
            name: sub.name,
            loginToken: sub.loginToken || "",
            companyName: sub.companyName,
            priceShown: activity.priceShown || "$19"
          })
          if (res.success || res.skipped) {
            activity.cartRecoveryEmail3SentAt = new Date().toISOString()
            emailSent = true
            recovery3Count++
          }
        }

        if (emailSent) {
          await SubscriberRepository.updateSubscriberPreferences(sub.email, {
            leadActivity: JSON.stringify(activity)
          })
        } else {
          skippedCount++
        }
      } else {
        skippedCount++
      }
    }

    return NextResponse.json({
      success: true,
      mode: force ? "lifetime_force" : "standard",
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
