import { type NextRequest, NextResponse } from "next/server"
import { isValidCronRequest } from "@/lib/admin/auth"
import { NewsletterEngine } from "@/lib/leads/NewsletterEngine"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import { getGoogleSheetsClient } from "@/lib/google-sheets"

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

    // Helper to update AZ column for ALL matching rows of the email address
    const updateAllRowsForEmail = async (email: string, campaignId: string) => {
      try {
        const sheets = await getGoogleSheetsClient()
        const spreadsheetId = process.env.GOOGLE_SHEET_ID
        if (!spreadsheetId) return

        const response = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range: 'Leads!A:BO',
        })

        const rows = response.data.values || []
        const emailIndex = 2 // Column C
        const leadActivityIndex = 51 // Column AZ

        for (let i = 1; i < rows.length; i++) {
          const row = rows[i]
          const rowEmail = (row[emailIndex] || '').toLowerCase().trim()
          if (rowEmail === email.toLowerCase().trim()) {
            const currentActivity = row[leadActivityIndex] || '{}'
            let activity: any = {}
            try {
              if (currentActivity && currentActivity !== 'N/A') {
                activity = JSON.parse(currentActivity)
              }
            } catch (e) {}

            activity.lastNewsletterCampaignId = campaignId
            activity.lastNewsletterSentAt = new Date().toISOString()
            
            // Also keep reactivation campaign tags synced
            activity.reactivationStage = "completed"
            activity.experimentTag = "historical_reactivation_batch_001"
            activity.reactivationSentAt = new Date().toISOString()

            const range = `Leads!AZ${i + 1}`
            await sheets.spreadsheets.values.update({
              spreadsheetId,
              range,
              valueInputOption: 'USER_ENTERED',
              requestBody: {
                values: [[JSON.stringify(activity)]],
              },
            })
            
            // Cooldown delay
            await new Promise(resolve => setTimeout(resolve, 800))
          }
        }
      } catch (err) {
        console.error(`Failed to update all rows for ${email}:`, err)
      }
    }

    // 4. Batch process the next 50 targets sequentially to prevent Sheets API rate limits
    const BATCH_SIZE = 50
    const batch = pendingLeads.slice(0, BATCH_SIZE)
    let successCount = 0
    const errors: { email: string; error?: string }[] = []

    console.log(`🚀 Starting newsletter batch: sending ${batch.length} emails for campaign ${config.campaignId}...`)

    for (const sub of batch) {
      const result = await NewsletterEngine.sendNewsletterToLead(config, sub)

      if (result.success) {
        successCount++
        console.log(`✉️ Email successfully sent to ${sub.email}. Updating all sheet rows...`)
        await updateAllRowsForEmail(sub.email, config.campaignId)
      } else {
        errors.push({ email: sub.email || "unknown", error: result.error })
        console.error(`❌ Failed to send email to ${sub.email}:`, result.error)
        
        // Still update rows to mark them as tried so we don't loop indefinitely
        await updateAllRowsForEmail(sub.email, config.campaignId)
      }

      // 1 second delay between sends
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    // 5. Update progress counts (sentCount tracks all attempted dispatches)
    const updatedSentCount = config.sentCount + batch.length
    config.sentCount = updatedSentCount
    
    // Check if we just completed all remaining targets
    if (pendingLeads.length - batch.length <= 0) {
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
      campaignStatus: config.status,
      errors: errors.length > 0 ? errors : undefined,
      senderKeyDiagnostics: {
        length: process.env.SENDER_API_KEY ? process.env.SENDER_API_KEY.length : 0,
        snippet: process.env.SENDER_API_KEY ? `${process.env.SENDER_API_KEY.slice(0, 6)}...${process.env.SENDER_API_KEY.slice(-6)}` : 'none'
      }
    })

  } catch (err: any) {
    console.error("Newsletter batch sending cron error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
