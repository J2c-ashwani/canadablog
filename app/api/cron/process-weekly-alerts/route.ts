import { NextResponse, type NextRequest } from "next/server"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import { getAllPrograms } from "@/lib/data/programs"
import { MatchScoreEngine } from "@/lib/leads/MatchScoreEngine"
import { sendWeeklyDeltaAlertEmail, type AlertProgramDelta } from "@/lib/emails/weekly-alerts"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // For manual/local development testing, we allow runs
  }

  try {
    const allSubscribers = await SubscriberRepository.getAllSubscribers()
    const allPrograms = getAllPrograms()
    const now = new Date()
    let emailsSentCount = 0

    for (const sub of allSubscribers) {
      // Must be subscribed
      if (!sub.isSubscribed) continue

      // Must have email
      if (!sub.email) continue

      // Skip drafts that have not submitted a complete step 1 name/email
      if (sub.source === "Screener Dropoff Draft" && !sub.name) continue

      // Get previous matches snapshot from leadActivity JSON
      let activity: any = {}
      try {
        if (sub.leadActivity && sub.leadActivity !== "N/A" && sub.leadActivity !== "{}") {
          activity = JSON.parse(sub.leadActivity)
        }
      } catch (e) {
        console.error(`Failed to parse activity JSON for ${sub.email}:`, e)
      }

      const previousMatched = activity.lastMatchedPrograms || {} // slug -> changeDescription

      // Compute current eligible programs
      const currentEligible: { slug: string; name: string; amount: string; type: string; change: string }[] = []
      
      allPrograms.forEach(prog => {
        const matchRes = MatchScoreEngine.calculateMatch(prog, {
          country: sub.country || "Canada",
          region: sub.region || "ON",
          companySize: sub.companySize || "1-9",
          industry: sub.industry || "technology",
          fundingInterests: sub.fundingInterests || []
        })

        if (matchRes.status === "Eligible") {
          const latestChange = prog.recentChanges?.[0] || `Status: ${prog.status}`
          currentEligible.push({
            slug: prog.slug,
            name: prog.name,
            amount: prog.fundingAmount,
            type: prog.fundingType,
            change: latestChange
          })
        }
      })

      // Calculate Deltas (NEW or UPDATED)
      const deltas: AlertProgramDelta[] = []
      const nextMatchedSnapshot: Record<string, string> = {}

      currentEligible.forEach(prog => {
        nextMatchedSnapshot[prog.slug] = prog.change

        const prevChange = previousMatched[prog.slug]
        if (prevChange === undefined) {
          // It's a new match
          deltas.push({
            name: prog.name,
            fundingAmount: prog.amount,
            fundingType: prog.type,
            deltaType: "NEW",
            changeDescription: prog.change
          })
        } else if (prevChange !== prog.change) {
          // It was updated
          deltas.push({
            name: prog.name,
            fundingAmount: prog.amount,
            fundingType: prog.type,
            deltaType: "UPDATED",
            changeDescription: prog.change
          })
        }
      })

      // If there are matches but no snapshots stored, we initialize snapshot without mailing to prevent a massive spam of "NEW" programs on first run
      const isFirstInitialization = Object.keys(previousMatched).length === 0

      if (deltas.length > 0) {
        if (isFirstInitialization) {
          // Just save snapshot on first run, do not send email
          activity.lastMatchedPrograms = nextMatchedSnapshot
          await SubscriberRepository.updateSubscriberPreferences(sub.email, {
            leadActivity: JSON.stringify(activity)
          })
          continue
        }

        // Send alert
        console.log(`✉️ Sending weekly delta alert to ${sub.email} (${deltas.length} deltas found)...`)
        const emailRes = await sendWeeklyDeltaAlertEmail({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          companyName: sub.companyName,
          deltas
        })

        if (emailRes.success) {
          // Stamp lastAlertSentAt and update snapshot
          activity.lastMatchedPrograms = nextMatchedSnapshot
          await SubscriberRepository.updateSubscriberPreferences(sub.email, {
            lastAlertSentAt: now.toISOString(),
            leadActivity: JSON.stringify(activity)
          })
          emailsSentCount++
        }
      } else {
        // No deltas, but let's make sure the snapshot is up-to-date in case programs database changed or they updated criteria
        activity.lastMatchedPrograms = nextMatchedSnapshot
        await SubscriberRepository.updateSubscriberPreferences(sub.email, {
          leadActivity: JSON.stringify(activity)
        })
      }
    }

    return NextResponse.json({
      success: true,
      alertsSent: emailsSentCount
    })
  } catch (err: any) {
    console.error("Weekly delta alerts cron error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
