import { type NextRequest, NextResponse } from "next/server"
import { getLeadsFromSheet, updateLeadInSheet } from "@/lib/google-sheets"
import {
  sendCartRecoveryEmail1,
  sendCartRecoveryEmail2,
  sendCartRecoveryEmail3,
} from "@/lib/emails/cart-recovery"
import { isValidCronRequest } from "@/lib/admin/auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    if (!isValidCronRequest(request)) {
      return NextResponse.json({ error: "Unauthorized cart recovery cron execution." }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const force = searchParams.get("force") === "true"

    // Asynchronous non-blocking background processing to prevent cron-job.org 30s timeout
    processCartRecoveryAsync(force).catch((err) => console.error("Async cart recovery background error:", err))

    return NextResponse.json({
      success: true,
      message: "Cart recovery processing initiated asynchronously.",
      mode: force ? "lifetime_force" : "standard",
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error("Cart recovery cron execution error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

async function processCartRecoveryAsync(force: boolean) {
  const now = Date.now()
  // Fast fetch max 50 recent leads to avoid Google Sheets API latency
  const leads = await getLeadsFromSheet(50)
  if (!leads || leads.length === 0) return

  let processedCount = 0
  const maxEmailsPerRun = 5

  for (const sub of leads) {
    if (processedCount >= maxEmailsPerRun) break
    if (!sub.email || !sub.email.includes("@")) continue

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
      const checkoutStartMs = activity.checkoutStartedAt
        ? new Date(activity.checkoutStartedAt).getTime()
        : (sub.timestamp ? new Date(sub.timestamp).getTime() : now - (60 * 60 * 1000))

      const elapsedMs = now - (Number.isNaN(checkoutStartMs) ? now - 60000 : checkoutStartMs)
      let emailSent = false

      if ((elapsedMs >= 45 * 60 * 1000 || force) && !activity.cartRecoveryEmail1SentAt) {
        console.log(`🛒 [Async Cron] Triggering Cart Recovery #1 for: ${sub.email}`)
        const res = await sendCartRecoveryEmail1({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          companyName: sub.companyName,
          priceShown: activity.priceShown || "$19"
        })
        if (res.success) {
          activity.cartRecoveryEmail1SentAt = new Date().toISOString()
          emailSent = true
          processedCount++
        }
      } else if ((elapsedMs >= 24 * 60 * 60 * 1000 || force) && activity.cartRecoveryEmail1SentAt && !activity.cartRecoveryEmail2SentAt) {
        console.log(`🛒 [Async Cron] Triggering Cart Recovery #2 for: ${sub.email}`)
        const res = await sendCartRecoveryEmail2({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          companyName: sub.companyName,
          priceShown: activity.priceShown || "$19"
        })
        if (res.success) {
          activity.cartRecoveryEmail2SentAt = new Date().toISOString()
          emailSent = true
          processedCount++
        }
      } else if ((elapsedMs >= 72 * 60 * 60 * 1000 || force) && activity.cartRecoveryEmail2SentAt && !activity.cartRecoveryEmail3SentAt) {
        console.log(`🛒 [Async Cron] Triggering Cart Recovery #3 for: ${sub.email}`)
        const res = await sendCartRecoveryEmail3({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          companyName: sub.companyName,
          priceShown: activity.priceShown || "$19"
        })
        if (res.success) {
          activity.cartRecoveryEmail3SentAt = new Date().toISOString()
          emailSent = true
          processedCount++
        }
      }

      if (emailSent) {
        try {
          await updateLeadInSheet(sub.email, {
            leadActivity: JSON.stringify(activity)
          })
        } catch (err) {
          console.error(`[Cart Recovery] Error updating lead activity in sheet for ${sub.email}:`, err)
        }
      }
    }
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
