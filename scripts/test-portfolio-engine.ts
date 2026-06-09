import { PortfolioScoreEngine } from "../lib/leads/PortfolioScoreEngine"
import { getAllPrograms } from "../lib/data/programs"

function runTest() {
  console.log("🧪 [Portfolio Score Engine Test] Running validations...")

  // 1. Test profile: Perfect Candidate (Incorporated, Tech R&D, Hiring, Exporting, 10 employees)
  const profile1 = {
    isIncorporated: true,
    hasRd: true,
    hasHiring: true,
    hasExporting: true,
    companySize: "10-49"
  }
  const res1 = PortfolioScoreEngine.calculateReadiness(profile1)
  console.log("\n--------------------------------------------------")
  console.log("📊 Case 1: Ideal Tech SME Profile")
  console.log("   Readiness Score:", res1.score, "/ 100")
  console.log("   Band Assigned:", res1.band)
  console.log("   Benchmark Copy:", res1.benchmark)
  if (res1.score !== 100) throw new Error("Expected score 100 for ideal profile")

  // 2. Test profile: Moderate Candidate (Incorporated, Hiring, Service sector, 5 employees, no R&D, no Export)
  const profile2 = {
    isIncorporated: true,
    hasRd: false,
    hasHiring: true,
    hasExporting: false,
    companySize: "1-9"
  }
  const res2 = PortfolioScoreEngine.calculateReadiness(profile2)
  console.log("\n--------------------------------------------------")
  console.log("📊 Case 2: Moderate Service SMB Profile")
  console.log("   Readiness Score:", res2.score, "/ 100")
  console.log("   Band Assigned:", res2.band)
  console.log("   Benchmark Copy:", res2.benchmark)
  if (res2.score !== 60) throw new Error("Expected score 60 for case 2")

  // 3. Test profile: Limited Candidate (Unincorporated startup, 2 employees, no other plans)
  const profile3 = {
    isIncorporated: false,
    hasRd: false,
    hasHiring: false,
    hasExporting: false,
    companySize: "1-9"
  }
  const res3 = PortfolioScoreEngine.calculateReadiness(profile3)
  console.log("\n--------------------------------------------------")
  console.log("📊 Case 3: Early Unincorporated Startup")
  console.log("   Readiness Score:", res3.score, "/ 100")
  console.log("   Band Assigned:", res3.band)
  console.log("   Benchmark Copy:", res3.benchmark)
  if (res3.score !== 20) throw new Error("Expected score 20 for case 3")

  // 4. Test priority mapping
  console.log("\n--------------------------------------------------")
  console.log("📊 Case 4: Program Prioritization Mappings")
  const p1 = PortfolioScoreEngine.getProgramPriority("sred-tax-credit")
  const p2 = PortfolioScoreEngine.getProgramPriority("irap-grant")
  const p3 = PortfolioScoreEngine.getProgramPriority("canexport")
  const p4 = PortfolioScoreEngine.getProgramPriority("other-slug")

  console.log(`   sred-tax-credit -> ${p1.priority}: ${p1.rationale}`)
  console.log(`   irap-grant -> ${p2.priority}: ${p2.rationale}`)
  console.log(`   canexport -> ${p3.priority}: ${p3.rationale}`)
  console.log(`   other-slug -> ${p4.priority}: ${p4.rationale}`)

  if (p1.priority !== "Apply First") throw new Error("SRED priority mismatch")
  if (p2.priority !== "Apply Second") throw new Error("IRAP priority mismatch")
  if (p3.priority !== "Apply Third") throw new Error("CanExport priority mismatch")

  // 5. Test range stacking calculations
  console.log("\n--------------------------------------------------")
  console.log("📊 Case 5: Stacking Range Calculations")
  const allPrograms = getAllPrograms()
  const checkedSlugs = ["sred-tax-credit", "irap-grant", "canexport"]
  const stackRange = PortfolioScoreEngine.calculateStackingRange(checkedSlugs, allPrograms)
  console.log("   Checked Slugs:", checkedSlugs)
  console.log("   Combined Stacking Range:", stackRange.formatted)
  console.log(`   Numeric Range: $${stackRange.min} - $${stackRange.max}`)

  if (stackRange.min !== 115000 || stackRange.max !== 400000) {
    throw new Error(`Expected range $115,000 - $400,000, got min=${stackRange.min} max=${stackRange.max}`)
  }

  console.log("\n--------------------------------------------------")
  console.log("✅ Portfolio Score Engine Validation Successful!")
}

runTest()
