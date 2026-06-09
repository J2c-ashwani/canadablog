import { getProgramBySlug } from "../lib/data/programs"
import { MatchScoreEngine } from "../lib/leads/MatchScoreEngine"
import type { SubscriberProfile } from "../lib/leads/SubscriberRepository"

function runTest() {
  console.log("🧪 [Match Engine Test] Loading programs...")
  const sred = getProgramBySlug("sred-tax-credit")
  const canexport = getProgramBySlug("canexport")

  if (!sred || !canexport) {
    console.error("❌ Failed to load target programs for testing.")
    return
  }

  // 1. Profile 1: ON Tech SME (Ideal fit for SRED & CanExport)
  const profile1: Partial<SubscriberProfile> = {
    email: "ontario-tech@company.com",
    name: "Ontario Tech Inc",
    country: "Canada",
    region: "ON",
    industry: "technology",
    companySize: "10-49",
    fundingInterests: ["Grants", "Tax Credits"],
    isSubscribed: true
  }

  // 2. Profile 2: Texas Tech Company (Incompatible Country/Region)
  const profile2: Partial<SubscriberProfile> = {
    email: "texas-tech@company.com",
    name: "Texas Tech LLC",
    country: "USA",
    region: "TX",
    industry: "technology",
    companySize: "10-49",
    fundingInterests: ["Grants"],
    isSubscribed: true
  }

  // 3. Profile 3: ON Agriculture Startup (Different Sector)
  const profile3: Partial<SubscriberProfile> = {
    email: "ontario-farm@farm.com",
    name: "Ontario Green Fields",
    country: "Canada",
    region: "ON",
    industry: "agriculture",
    companySize: "1-9",
    fundingInterests: ["Grants"],
    isSubscribed: true
  }

  console.log("\n--------------------------------------------------")
  console.log("📊 CASE 1: ON Tech SME vs. SR&ED Tax Credit")
  const res1 = MatchScoreEngine.calculateMatch(sred, profile1)
  console.log("   Status:", res1.status)
  console.log("   Fit Band:", res1.fitBand)
  console.log("   Score (Internal):", res1.score)
  console.log("   Opportunity:", res1.potentialOpportunity)
  console.log("   Difficulty:", res1.difficulty)
  console.log("   Confidence:", res1.confidence)
  console.log("   Explanations:")
  res1.explanations.forEach(e => console.log(`     ${e}`))

  console.log("\n--------------------------------------------------")
  console.log("📊 CASE 2: Texas Tech Company vs. SR&ED Tax Credit (Country Gatekeeper)")
  const res2 = MatchScoreEngine.calculateMatch(sred, profile2)
  console.log("   Status:", res2.status)
  console.log("   Fit Band:", res2.fitBand)
  console.log("   Explanations:")
  res2.explanations.forEach(e => console.log(`     ${e}`))

  console.log("\n--------------------------------------------------")
  console.log("📊 CASE 3: ON Agriculture Startup vs. SR&ED Tax Credit (Sector Check)")
  const res3 = MatchScoreEngine.calculateMatch(sred, profile3)
  console.log("   Status:", res3.status)
  console.log("   Fit Band:", res3.fitBand)
  console.log("   Score (Internal):", res3.score)
  console.log("   Explanations:")
  res3.explanations.forEach(e => console.log(`     ${e}`))

  console.log("\n--------------------------------------------------")
  console.log("📊 CASE 4: ON Tech SME vs. CanExport SMEs (Wage/Grant Fit)")
  const res4 = MatchScoreEngine.calculateMatch(canexport, profile1)
  console.log("   Status:", res4.status)
  console.log("   Fit Band:", res4.fitBand)
  console.log("   Score (Internal):", res4.score)
  console.log("   Explanations:")
  res4.explanations.forEach(e => console.log(`     ${e}`))

  console.log("\n--------------------------------------------------")
  console.log("✅ Match Engine Validation Complete.")
}

runTest()
