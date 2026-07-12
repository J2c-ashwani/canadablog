import { type NextRequest, NextResponse } from "next/server"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import { sendFollowupEmail } from "@/lib/emails/report-followups"
import { PortfolioScoreEngine } from "@/lib/leads/PortfolioScoreEngine"
import { getAllPrograms } from "@/lib/data/programs"

import { isValidCronRequest } from "@/lib/admin/auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    if (!isValidCronRequest(request)) {
      return NextResponse.json({ error: "Unauthorized followup cron execution." }, { status: 401 })
    }

    const subscribers = await SubscriberRepository.getAllSubscribers()
    // Filter only those who purchased the assessment and have not booked consultations/audits
    const targetLeads = subscribers.filter(sub => {
      if (!sub.reportPurchased) return false

      const statusLower = String(sub.subscriptionStatus || "").toLowerCase()
      const offlineLower = String((sub as any).offlineStatus || "").toLowerCase()

      // Skip if already booked an audit or signed as client
      if (offlineLower.includes("audit") || offlineLower.includes("signed") || offlineLower.includes("vip")) {
        return false
      }
      return true
    })

    if (targetLeads.length === 0) {
      return NextResponse.json({ success: true, message: "No report buyers qualify for followup sequences today." })
    }

    const allPrograms = getAllPrograms()
    const programSlugs = allPrograms.map(p => p.slug)
    const stackingRange = PortfolioScoreEngine.calculateStackingRange(programSlugs, allPrograms)

    let day2Count = 0
    let day5Count = 0
    let day10Count = 0
    let skippedCount = 0

    const now = Date.now()

    for (const sub of targetLeads) {
      const purchaseTimeStr = sub.assessmentPurchasedAt || sub.timestamp
      const purchaseDate = purchaseTimeStr && purchaseTimeStr !== "N/A" && purchaseTimeStr !== ""
        ? new Date(purchaseTimeStr).getTime()
        : now
      const elapsedHours = (now - purchaseDate) / (1000 * 60 * 60)

      let targetStage: "day2" | "day5" | "day10" | null = null
      const currentFollowup = sub.lastEmailFollowup || "N/A"

      // Stage 1: Day 2 (elapsed >= 24 hours but < 96 hours, and has not received day2, day5, or day10)
      if (elapsedHours >= 24 && elapsedHours < 96 && currentFollowup === "N/A") {
        targetStage = "day2"
      }
      // Stage 2: Day 5 (elapsed >= 96 hours but < 216 hours, and has received day2)
      else if (elapsedHours >= 96 && elapsedHours < 216 && currentFollowup === "day2") {
        targetStage = "day5"
      }
      // Stage 3: Day 10 (elapsed >= 216 hours, and has received day5)
      else if (elapsedHours >= 216 && currentFollowup === "day5") {
        targetStage = "day10"
      }

      if (!targetStage) {
        skippedCount++
        continue
      }

      console.log(`✉️ Triggering followup ${targetStage} for lead: ${sub.email}`)

      // Send the email
      const emailRes = await sendFollowupEmail(targetStage, {
        to: sub.email,
        name: sub.name || "Founder",
        companyName: sub.companyName || "Your Company",
        loginToken: sub.loginToken || "",
        estimatedFunding: stackingRange.formatted
      })

      if (emailRes.skipped) {
        console.log(`ℹ️ Mock Email trigger - Stage ${targetStage} to: ${sub.email}`)
      }

      // Update database
      await SubscriberRepository.updateSubscriberPreferences(sub.email, {
        lastEmailFollowup: targetStage
      })

      if (targetStage === "day2") day2Count++
      else if (targetStage === "day5") day5Count++
      else if (targetStage === "day10") day10Count++
    }

    return NextResponse.json({
      success: true,
      processed: targetLeads.length,
      sent: {
        day2: day2Count,
        day5: day5Count,
        day10: day10Count
      },
      skipped: skippedCount
    })
  } catch (error: any) {
    console.error("Followup cron execution error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
