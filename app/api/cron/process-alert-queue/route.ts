import { NextResponse, type NextRequest } from "next/server"
import { getPendingAlertJobs, updateAlertJobStatus } from "@/lib/google-sheets"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import { getAllPrograms } from "@/lib/data/programs"
import { MatchScoreEngine } from "@/lib/leads/MatchScoreEngine"
import { sendInstantProgramAlertEmail } from "@/lib/emails/program-alert"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // Optional cron validation
  }

  try {
    const pendingJobs = await getPendingAlertJobs()
    if (pendingJobs.length === 0) {
      return NextResponse.json({ success: true, message: "No pending alert jobs." })
    }

    const allPrograms = getAllPrograms()
    const allSubscribers = await SubscriberRepository.getAllSubscribers()
    let totalEmailsSent = 0
    let jobsProcessed = 0

    for (const job of pendingJobs) {
      const prog = allPrograms.find(p => p.slug === job.programSlug)
      if (!prog) {
        console.warn(`⚠️ Program not found for alert job: ${job.programSlug}`)
        await updateAlertJobStatus(job.rowIndex, "failed", 0)
        continue
      }

      // We only alert Tier A subscribers for major or critical updates
      if (job.severity !== "major" && job.severity !== "critical") {
        await updateAlertJobStatus(job.rowIndex, "skipped_minor", 0)
        continue
      }

      let emailsSentForJob = 0

      // Find matching Tier A subscribers
      for (const sub of allSubscribers) {
        if (!sub.isSubscribed || !sub.email) continue

        // Must be Tier A lead
        if (sub.leadTier !== "Tier A") continue

        // Check if the program matches their profile
        const matchRes = MatchScoreEngine.calculateMatch(prog, {
          country: sub.country || "Canada",
          region: sub.region || "ON",
          companySize: sub.companySize || "1-9",
          industry: sub.industry || "technology",
          fundingInterests: sub.fundingInterests || []
        })

        if (matchRes.status === "Eligible") {
          console.log(`✉️ Sending instant alert for program ${prog.slug} to ${sub.email}...`)
          const emailRes = await sendInstantProgramAlertEmail({
            to: sub.email,
            name: sub.name,
            loginToken: sub.loginToken || "",
            companyName: sub.companyName,
            programName: prog.name,
            fundingAmount: prog.fundingAmount,
            fundingType: prog.fundingType,
            description: prog.recentChanges?.[0] || prog.description,
            severity: job.severity
          })

          if (emailRes.success) {
            emailsSentForJob++
            totalEmailsSent++
          }
        }
      }

      await updateAlertJobStatus(job.rowIndex, "completed", emailsSentForJob)
      jobsProcessed++
    }

    return NextResponse.json({
      success: true,
      jobsProcessed,
      totalEmailsSent
    })
  } catch (err: any) {
    console.error("Error in process-alert-queue cron:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
