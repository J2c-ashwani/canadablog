import { config } from "dotenv"
import path from "path"
config({ path: path.join(__dirname, "../.env.local") })

import { getLeadsFromSheet } from "../lib/google-sheets"

async function searchLead() {
  const targetEmail = "pmorency01@gmail.com"
  console.log(`Searching Google Sheets for lead: ${targetEmail}...`)
  
  try {
    const leads = await getLeadsFromSheet()
    console.log(`Total leads in Sheet: ${leads.length}`)
    
    const matchingLeads = leads.filter((l: any) => 
      (l.email && l.email.toLowerCase().trim() === targetEmail) ||
      (l.name && l.name.toLowerCase().includes("morency")) ||
      (l.company && l.company.toLowerCase().includes("morency"))
    )

    console.log("\nMatching Leads Found:", JSON.stringify(matchingLeads, null, 2))
  } catch (err: any) {
    console.error("Error fetching leads from sheet:", err)
  }
}

searchLead()
