import { type NextRequest, NextResponse } from "next/server"
import { isValidCronRequest } from "@/lib/admin/auth"
import { NewsletterEngine } from "@/lib/leads/NewsletterEngine"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function getYearWeekString() {
  const now = new Date();
  const oneJan = new Date(now.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((now.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((now.getDay() + 1 + numberOfDays) / 7);
  return `${now.getFullYear()}_W${weekNumber}`;
}

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized newsletter cron execution." }, { status: 401 })
  }

  try {
    // 1. Fetch current campaign configuration
    const weekId = getYearWeekString()
    let config = await NewsletterEngine.getCampaignConfig()

    // Autopilot weekly check: If the stored campaign is from a previous week, 
    // or if no campaign is currently running, initialize a new weekly campaign automatically!
    const targetCampaignId = `autopilot_campaign_${weekId}`
    if (config.campaignId !== targetCampaignId && (config.status !== "running" || config.campaignId.startsWith("autopilot_campaign_"))) {
      console.log(`🤖 [Newsletter Autopilot] Initializing weekly newsletter campaign for week ${weekId}...`)
      config = await NewsletterEngine.autoInitializeWeeklyCampaign(weekId)
    }

    if (config.status !== "running") {
      return NextResponse.json({
        success: true,
        message: `No active campaign in 'running' state. Current state: ${config.status}`
      })
    }

    // 2. Load all subscribers & identify targets
    const allSubs = await SubscriberRepository.getAllSubscribers()
    const targetLeads = await NewsletterEngine.getTargetLeadsForCampaign(config, allSubs)

    // 3. Filter down to pending targets
    const pendingLeads = targetLeads.filter(sub => {
      let activity: any = {}
      try {
        if (sub.leadActivity && sub.leadActivity !== "N/A" && sub.leadActivity !== "{}") {
          activity = JSON.parse(sub.leadActivity)
        }
      } catch (e) {
        // ignore
      }
      return activity.lastNewsletterCampaignId !== config.campaignId
    })

    if (pendingLeads.length === 0) {
      // Mark campaign completed
      config.status = "completed"
      config.sentCount = targetLeads.length
      await NewsletterEngine.saveCampaignConfig(config)

      return NextResponse.json({
        success: true,
        message: `Newsletter campaign ${config.campaignId} has completed. 0 targets remaining.`,
        campaignStatus: "completed"
      })
    }

    // 4. Batch process the next 50 targets
    const BATCH_SIZE = 50
    const batch = pendingLeads.slice(0, BATCH_SIZE)
    let successCount = 0

    console.log(`🚀 Starting newsletter batch: sending ${batch.length} emails for campaign ${config.campaignId}...`)

    const sendPromises = batch.map(async (sub) => {
      const emailSuccess = await NewsletterEngine.sendNewsletterToLead(config, sub)
      
      if (emailSuccess) {
        let activity: any = {}
        try {
          if (sub.leadActivity && sub.leadActivity !== "N/A" && sub.leadActivity !== "{}") {
            activity = JSON.parse(sub.leadActivity)
          }
        } catch (e) {
          // ignore
        }

        // Record campaign send details
        activity.lastNewsletterCampaignId = config.campaignId
        activity.lastNewsletterSentAt = new Date().toISOString()

        await SubscriberRepository.updateSubscriberPreferences(sub.email, {
          leadActivity: JSON.stringify(activity)
        })

        successCount++
      }
    })

    await Promise.all(sendPromises)

    // 5. Update progress counts
    const updatedSentCount = config.sentCount + successCount
    config.sentCount = updatedSentCount
    
    // Check if we just completed all remaining targets
    if (pendingLeads.length <= batch.length) {
      config.status = "completed"
    }

    await NewsletterEngine.saveCampaignConfig(config)

    console.log(`✅ Finished newsletter batch. Success sends: ${successCount}. Total campaign sends: ${updatedSentCount}.`)

    return NextResponse.json({
      success: true,
      campaignId: config.campaignId,
      batchProcessed: batch.length,
      successSends: successCount,
      totalCampaignSends: updatedSentCount,
      remainingTargets: Math.max(0, pendingLeads.length - batch.length),
      campaignStatus: config.status
    })

  } catch (err: any) {
    console.error("Newsletter batch sending cron error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
