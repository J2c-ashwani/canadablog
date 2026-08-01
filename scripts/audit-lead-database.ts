import { config } from "dotenv"
import path from "path"
config({ path: path.join(__dirname, "../.env.local") })

import { getLeadsFromSheet } from "../lib/google-sheets"

async function auditLeadDatabase() {
  console.log(`=== FSI DIGITAL LEAD DATABASE AUDIT ===\n`)
  
  try {
    const leads = await getLeadsFromSheet()
    console.log(`Total Leads in Database: ${leads.length}`)
    
    // Tier breakdown
    const tierA = leads.filter((l: any) => l.tier === "A" || l.leadTier === "Tier A")
    const tierB = leads.filter((l: any) => l.tier === "B" || l.leadTier === "Tier B" || l.leadTier === "B")
    const tierC = leads.filter((l: any) => l.tier === "C" || l.leadTier === "Tier C" || l.leadTier === "C")
    const tierD = leads.filter((l: any) => l.tier === "D" || l.leadTier === "Tier D" || l.leadTier === "D")
    
    console.log(`\nLead Tier Breakdown:`)
    console.log(`  Tier A (High Value):  ${tierA.length}`)
    console.log(`  Tier B (Medium):      ${tierB.length}`)
    console.log(`  Tier C (Low):         ${tierC.length}`)
    console.log(`  Tier D (Minimal):     ${tierD.length}`)
    
    // Subscribed leads
    const subscribed = leads.filter((l: any) => l.isSubscribed === true || l.isSubscribed === "true")
    console.log(`\nSubscribed (Email Active): ${subscribed.length}`)
    
    // Purchases
    const reportPurchased = leads.filter((l: any) => l.reportPurchased === true)
    const strategyPurchased = leads.filter((l: any) => l.strategyReportPurchased === true)
    const assessmentPurchased = leads.filter((l: any) => l.assessmentPurchasedAt && l.assessmentPurchasedAt !== "N/A" && l.assessmentPurchasedAt !== "")
    
    console.log(`\nPurchase History:`)
    console.log(`  Report Purchased ($19-$79):        ${reportPurchased.length}`)
    console.log(`  Strategy Report Purchased ($79):   ${strategyPurchased.length}`)
    console.log(`  Assessment/Audit Purchased ($199): ${assessmentPurchased.length}`)
    
    // Consent to partner contact
    const partnerConsent = leads.filter((l: any) => l.consentToPartnerContact === true)
    console.log(`\nConsent to Partner Contact: ${partnerConsent.length}`)
    
    // Country breakdown
    const countries: Record<string, number> = {}
    leads.forEach((l: any) => {
      const country = l.country || "Unknown"
      countries[country] = (countries[country] || 0) + 1
    })
    console.log(`\nCountry Breakdown (Top 5):`)
    Object.entries(countries).sort((a, b) => b[1] - a[1]).slice(0, 5).forEach(([country, count]) => {
      console.log(`  ${country}: ${count}`)
    })
    
    // Recent leads (last 30 days)
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
    const recentLeads = leads.filter((l: any) => {
      const ts = l.timestamp
      if (!ts || ts === "N/A") return false
      return new Date(ts).getTime() > thirtyDaysAgo
    })
    console.log(`\nLeads in Last 30 Days: ${recentLeads.length}`)
    
    // Leads with PayPal checkout activity
    const paypalActivity = leads.filter((l: any) => {
      const activity = l.leadActivity || ""
      return activity.includes("paypal") || activity.includes("PayPal")
    })
    console.log(`Leads with PayPal Checkout Activity: ${paypalActivity.length}`)
    
    // Leads who viewed paywall
    const paywallViewed = leads.filter((l: any) => {
      const activity = l.leadActivity || ""
      return activity.includes("paywallViewed")
    })
    console.log(`Leads who Viewed Paywall: ${paywallViewed.length}`)
    
    // Package selections
    const packageSelected = leads.filter((l: any) => {
      const activity = l.leadActivity || ""
      return activity.includes("packageSelected")
    })
    console.log(`Leads who Selected a Package: ${packageSelected.length}`)
    
    // Offline status breakdown
    const offlineStatuses: Record<string, number> = {}
    leads.forEach((l: any) => {
      const status = l.offlineStatus || "Unknown"
      offlineStatuses[status] = (offlineStatuses[status] || 0) + 1
    })
    console.log(`\nOffline Status Breakdown:`)
    Object.entries(offlineStatuses).sort((a, b) => b[1] - a[1]).forEach(([status, count]) => {
      console.log(`  ${status}: ${count}`)
    })
    
  } catch (err: any) {
    console.error("Error:", err.message)
  }
}

auditLeadDatabase()
