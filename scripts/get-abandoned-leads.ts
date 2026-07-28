import { config } from "dotenv"
import path from "path"
config({ path: path.join(__dirname, "../.env.local") })

import { getLeadsFromSheet } from "../lib/google-sheets"

async function main() {
  const leads = await getLeadsFromSheet(1000)
  
  const highIntent = leads.filter((l: any) => {
    const activity = l.leadActivity || ""
    return activity.includes("packageSelected") || activity.includes("paypalContainerRendered")
  })
  
  console.log(`=== FOUND ${highIntent.length} HIGH-INTENT ABANDONED LEADS ===\n`)
  
  const uniqueLeads = new Map<string, any>()
  highIntent.forEach((l: any) => {
    const email = String(l.email || "").toLowerCase().trim()
    if (!email || email.includes("example.com") || email.includes("test")) return
    if (!uniqueLeads.has(email)) {
      uniqueLeads.set(email, l)
    }
  })
  
  let idx = 1
  for (const [email, l] of uniqueLeads.entries()) {
    let act: any = {}
    try {
      act = JSON.parse(l.leadActivity || "{}")
    } catch {}
    
    console.log(`${idx}. Email: ${email}`)
    console.log(`   Name: ${l.name || 'Founder'}`)
    console.log(`   Company: ${l.company || 'N/A'}`)
    console.log(`   Package Selected: ${act.packageSelected || 'N/A'} ($${act.packageSelectedPrice || 'N/A'})`)
    console.log(`   Time Spent: ${act.durationSeconds ? Math.round(act.durationSeconds) + 's' : 'N/A'}`)
    console.log(`   Source: ${l.source || 'N/A'}`)
    console.log(`   Date: ${l.timestamp || 'N/A'}\n`)
    idx++
  }
}

main().catch(console.error)
