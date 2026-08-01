import { config } from "dotenv"
import path from "path"
config({ path: path.join(__dirname, "../.env.local") })

import { getLeadsFromSheet } from "../lib/google-sheets"

async function auditEmailMetrics() {
  console.log(`=== FSI DIGITAL — EMAIL DELIVERABILITY & ENGAGEMENT AUDIT ===\n`)
  
  try {
    const leads = await getLeadsFromSheet()
    
    const subscribed = leads.filter((l: any) => l.isSubscribed === true || l.isSubscribed === "true")
    console.log(`Total Active Subscribers: ${subscribed.length}`)
    console.log(`Total Leads in DB: ${leads.length}\n`)
    
    // Parse leadActivity for each lead to extract email engagement
    let totalEmailsSent = 0
    let totalOpens = 0
    let totalClicks = 0
    let totalNewslettersSent = 0
    let totalRecoverySent = 0
    let totalAlertsSent = 0
    let totalReactivationSent = 0
    
    let leadsWithOpens = 0
    let leadsWithClicks = 0
    let leadsWithNewsletterSent = 0
    let leadsWithLinkClicks = 0
    
    const campaignTracker: Record<string, number> = {}
    
    for (const lead of leads) {
      const activity = lead.leadActivity || ""
      if (!activity || activity === "N/A") continue
      
      let act: any = {}
      try {
        act = JSON.parse(activity)
      } catch { continue }
      
      // Newsletter sends
      if (act.lastNewsletterSentAt && act.lastNewsletterSentAt !== "N/A") {
        totalNewslettersSent++
        leadsWithNewsletterSent++
      }
      
      // Track campaign IDs
      if (act.lastNewsletterCampaignId) {
        const cid = act.lastNewsletterCampaignId
        campaignTracker[cid] = (campaignTracker[cid] || 0) + 1
      }
      
      // Recovery emails
      if (act.calcRecoveryEmail1SentAt) totalRecoverySent++
      if (act.calcRecoveryEmail2SentAt) totalRecoverySent++
      if (act.calcRecoveryEmail3SentAt) totalRecoverySent++
      
      // Reactivation
      if (act.reactivationSentAt) totalReactivationSent++
      
      // Link clicks
      if (act.linkClicks && Array.isArray(act.linkClicks) && act.linkClicks.length > 0) {
        leadsWithLinkClicks++
        totalClicks += act.linkClicks.length
      }
      
      // Count all email sends for this lead
      const emailKeys = [
        "calcRecoveryEmail1SentAt", "calcRecoveryEmail2SentAt", "calcRecoveryEmail3SentAt",
        "lastNewsletterSentAt", "reactivationSentAt", "contactConfirmationSentAt",
        "screenerRecoverySentAt", "cartRecoverySentAt",
      ]
      for (const key of emailKeys) {
        if (act[key] && act[key] !== "N/A") totalEmailsSent++
      }
    }
    
    // Check opens from main lead fields
    for (const lead of leads) {
      if (lead.lastOpenedAt && lead.lastOpenedAt !== "N/A" && lead.lastOpenedAt !== "") {
        leadsWithOpens++
      }
      if (lead.lastClickedAt && lead.lastClickedAt !== "N/A" && lead.lastClickedAt !== "") {
        leadsWithClicks++
      }
    }
    
    // Alert emails
    for (const lead of leads) {
      if (lead.lastAlertSentAt && lead.lastAlertSentAt !== "N/A" && lead.lastAlertSentAt !== "") {
        totalAlertsSent++
      }
    }
    
    console.log(`=== EMAIL VOLUME ===`)
    console.log(`Newsletter Broadcasts Delivered: ${totalNewslettersSent}`)
    console.log(`Calculator Recovery Emails Delivered: ${totalRecoverySent}`)
    console.log(`Reactivation Emails Delivered: ${totalReactivationSent}`)
    console.log(`Program Alert Emails Delivered: ${totalAlertsSent}`)
    console.log(`Total Tracked Email Sends: ${totalEmailsSent}`)
    
    console.log(`\n=== ENGAGEMENT METRICS ===`)
    console.log(`Leads with Email Opens Tracked: ${leadsWithOpens}`)
    console.log(`Leads with Email Clicks Tracked: ${leadsWithClicks}`)
    console.log(`Leads with Link Clicks (in-email): ${leadsWithLinkClicks}`)
    console.log(`Total Link Click Events: ${totalClicks}`)
    
    // Rates
    const openRate = totalNewslettersSent > 0 ? ((leadsWithOpens / totalNewslettersSent) * 100).toFixed(1) : "N/A"
    const clickRate = totalNewslettersSent > 0 ? ((leadsWithClicks / totalNewslettersSent) * 100).toFixed(1) : "N/A"
    const clickToOpenRate = leadsWithOpens > 0 ? ((leadsWithClicks / leadsWithOpens) * 100).toFixed(1) : "N/A"
    
    console.log(`\n=== CALCULATED RATES ===`)
    console.log(`Open Rate (opens / newsletter sent): ${openRate}%`)
    console.log(`Click Rate (clicks / newsletter sent): ${clickRate}%`)
    console.log(`Click-to-Open Rate (clicks / opens): ${clickToOpenRate}%`)
    
    console.log(`\n=== CAMPAIGN BREAKDOWN ===`)
    Object.entries(campaignTracker).sort((a, b) => b[1] - a[1]).forEach(([campaign, count]) => {
      console.log(`  ${campaign}: ${count} recipients`)
    })
    
    // Unsubscribes
    const unsubscribed = leads.filter((l: any) => {
      const status = String(l.offlineStatus || "").toLowerCase()
      return status.includes("unsubscribed") || l.isSubscribed === false || l.isSubscribed === "false"
    })
    console.log(`\n=== UNSUBSCRIBES ===`)
    console.log(`Unsubscribed Leads: ${unsubscribed.length}`)
    const unsubRate = totalNewslettersSent > 0 ? ((unsubscribed.length / totalNewslettersSent) * 100).toFixed(2) : "N/A"
    console.log(`Unsubscribe Rate: ${unsubRate}%`)
    
    // Leads who never received any email
    let noEmailsReceived = 0
    for (const lead of leads) {
      const activity = lead.leadActivity || ""
      if (!activity || activity === "N/A" || activity === "") {
        noEmailsReceived++
      }
    }
    console.log(`\nLeads with No Email Activity Tracked: ${noEmailsReceived}`)
    
  } catch (err: any) {
    console.error("Error:", err.message)
  }
}

auditEmailMetrics()
