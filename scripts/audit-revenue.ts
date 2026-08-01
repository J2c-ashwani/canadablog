import { config } from "dotenv"
import path from "path"
config({ path: path.join(__dirname, "../.env.local") })

import { getLeadsFromSheet } from "../lib/google-sheets"

async function auditRevenue() {
  console.log(`=== FSI DIGITAL ACTUAL REVENUE AUDIT ===\n`)
  
  try {
    const leads = await getLeadsFromSheet()
    
    // Check actual signed values
    const signedLeads = leads.filter((l: any) => l.actualSignedValue && l.actualSignedValue !== "N/A" && l.actualSignedValue !== "")
    console.log(`Leads with Actual Signed Value: ${signedLeads.length}`)
    signedLeads.forEach((l: any) => {
      console.log(`  - ${l.email}: $${l.actualSignedValue} (Status: ${l.offlineStatus})`)
    })
    
    // Check report purchases
    const purchases = leads.filter((l: any) => l.reportPurchased === true)
    console.log(`\nReport Purchases: ${purchases.length}`)
    purchases.forEach((l: any) => {
      console.log(`  - ${l.email}: Purchased at ${l.assessmentPurchasedAt || 'Unknown date'} (Transaction: ${l.reportTransactionId || 'N/A'})`)
    })
    
    // Check strategy session purchases  
    const strategyPurchases = leads.filter((l: any) => l.strategyReportPurchased === true)
    console.log(`\nStrategy Session Purchases: ${strategyPurchases.length}`)
    
    // Check booked audits
    const bookedAudits = leads.filter((l: any) => {
      const status = String(l.offlineStatus || "").toLowerCase()
      return status.includes("booked") || status.includes("audit") || status.includes("signed") || status.includes("client") || status.includes("vip")
    })
    console.log(`\nBooked Audits / Signed Clients: ${bookedAudits.length}`)
    bookedAudits.forEach((l: any) => {
      console.log(`  - ${l.email}: Status: ${l.offlineStatus}, Value: ${l.actualSignedValue || 'N/A'}`)
    })
    
    // Check high-intent signals
    const highIntent = leads.filter((l: any) => {
      const activity = l.leadActivity || ""
      return activity.includes("packageSelected") || activity.includes("paypalContainerRendered")
    })
    console.log(`\nHigh-Intent Leads (PayPal Rendered / Package Selected): ${highIntent.length}`)
    highIntent.forEach((l: any) => {
      try {
        const act = JSON.parse(l.leadActivity)
        console.log(`  - ${l.email}: Package: ${act.packageSelected || 'N/A'}, Price: $${act.packageSelectedPrice || 'N/A'}, Duration: ${act.durationSeconds || 'N/A'}s`)
      } catch {
        console.log(`  - ${l.email}: Has PayPal activity`)
      }
    })
    
    // Traffic sources
    const sources: Record<string, number> = {}
    leads.forEach((l: any) => {
      const src = l.source || l.lastAttributionSource || "Unknown"
      sources[src] = (sources[src] || 0) + 1
    })
    console.log(`\nTraffic Source Breakdown:`)
    Object.entries(sources).sort((a, b) => b[1] - a[1]).forEach(([src, count]) => {
      console.log(`  ${src}: ${count}`)
    })
    
  } catch (err: any) {
    console.error("Error:", err.message)
  }
}

auditRevenue()
