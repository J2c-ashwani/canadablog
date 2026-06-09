import { AlertEngine } from "../lib/leads/AlertEngine"
import type { SubscriberProfile } from "../lib/leads/SubscriberRepository"
import { getAllPrograms } from "../lib/data/programs"
import fs from "fs"
import path from "path"

const mockSub: SubscriberProfile = {
  email: "founder@techstartup.com",
  name: "Ashwani Kumar",
  country: "Canada",
  region: "ON",
  industry: "technology",
  companySize: "10-49",
  fundingInterests: ["Grants", "Tax Credits"],
  isSubscribed: true,
  unsubscribeToken: "test-token-12345",
  engagementScore: 100
}

const programs = getAllPrograms()
const matched = programs.filter(p => AlertEngine.matchesProfile(p, mockSub)).slice(0, 5)

console.log(`\n🔍 [Digest Test] Matching programs for ${mockSub.name} (Region: ${mockSub.region} | Sector: ${mockSub.industry})`)
console.log(`   Found ${matched.length} matching funding streams:`)
matched.forEach((p, i) => console.log(`   ${i + 1}. [${p.fundingType}] ${p.name}`))

const emailContent = AlertEngine.generateWeeklyDigestBody(matched, mockSub)
const fullHtml = AlertEngine.wrapEmailTemplate(emailContent, mockSub)

const outputPath = path.join(process.cwd(), "weekly-digest-preview.html")
fs.writeFileSync(outputPath, fullHtml, "utf8")

console.log(`\n✅ Generated HTML digest successfully written to: ${outputPath}\n`)
