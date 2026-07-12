import { NextResponse, type NextRequest } from "next/server"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import { sendTrialExpiryEmail } from "@/lib/emails/trial-expiry"

import { isValidCronRequest } from "@/lib/admin/auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized trial expiry cron execution." }, { status: 401 })
  }

  try {
    const allSubscribers = await SubscriberRepository.getAllSubscribers(true)
    const now = new Date()
    let processedCount = 0

    for (const sub of allSubscribers) {
      // Must be currently on trial or trial expired
      if (sub.subscriptionStatus !== "trial" && sub.subscriptionStatus !== "trial_expired") continue
      if (!sub.email || !sub.trialStartedAt || sub.trialStartedAt === "N/A" || sub.trialStartedAt === "") continue

      // Calculate days elapsed since trial started
      const trialStart = new Date(sub.trialStartedAt).getTime()
      const diffDays = Math.floor((now.getTime() - trialStart) / (1000 * 60 * 60 * 24))

      let activity: any = {}
      try {
        if (sub.leadActivity && sub.leadActivity !== "N/A" && sub.leadActivity !== "{}") {
          activity = JSON.parse(sub.leadActivity)
        }
      } catch (e) {
        console.error(`Failed to parse activity for trial member ${sub.email}:`, e)
      }

      // Day 5 warning (2 days left)
      if (diffDays >= 5 && diffDays < 7 && !activity.trialExpiryWarnedDay5) {
        console.log(`✉️ Sending Day 5 Trial Expiry Warning to ${sub.email}...`)
        const emailRes = await sendTrialExpiryEmail({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          companyName: sub.companyName,
          day: 5
        })

        if (emailRes.success) {
          activity.trialExpiryWarnedDay5 = true
          await SubscriberRepository.updateSubscriberPreferences(sub.email, {
            leadActivity: JSON.stringify(activity)
          })
          processedCount++
        }
      } 
      // Day 7 warning (expires today)
      else if (diffDays >= 7 && diffDays < 10 && !activity.trialExpiryWarnedDay7) {
        console.log(`✉️ Sending Day 7 Trial Expiry Warning to ${sub.email}...`)
        const emailRes = await sendTrialExpiryEmail({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          companyName: sub.companyName,
          day: 7
        })

        if (emailRes.success) {
          activity.trialExpiryWarnedDay7 = true
          await SubscriberRepository.updateSubscriberPreferences(sub.email, {
            leadActivity: JSON.stringify(activity)
          })
          processedCount++
        }
      } 
      // Day 10 warning (expired for 3 days)
      else if (diffDays >= 10 && !activity.trialExpiryWarnedDay10) {
        console.log(`✉️ Sending Day 10 Trial Expired Warning to ${sub.email}...`)
        const emailRes = await sendTrialExpiryEmail({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          companyName: sub.companyName,
          day: 10
        })

        if (emailRes.success) {
          activity.trialExpiryWarnedDay10 = true
          // Mark subscription status as inactive/expired if not already
          await SubscriberRepository.updateSubscriberPreferences(sub.email, {
            subscriptionStatus: "inactive",
            leadActivity: JSON.stringify(activity)
          })
          processedCount++
        }
      }
    }

    return NextResponse.json({
      success: true,
      processed: processedCount
    })
  } catch (err: any) {
    console.error("Cron process-trial-expiry error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
