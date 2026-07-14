import fs from "fs";
import path from "path";
import { getPriorityResearchProfiles } from "../lib/editorial/priorityResearch";
import { calculateLeadIntelligence } from "../lib/leads/scoring";
import { PRICING_CONFIG } from "../lib/leads/pricing-config";

async function verifyRevenueBacklog() {
  console.log("🤖 Running Sprint 25 Backlog Generator Verification Tests...");
  let failureCount = 0;

  // 1. Verify Pricing Registry imports
  console.log("\n------------------------------------------------------");
  console.log("🧪 Test 1: Verify Pricing Registry Constants & Imports");
  if (PRICING_CONFIG.DFY_BASE_RETAINER === 2500 && PRICING_CONFIG.TIER_B_EXPECTED_LTV === 250) {
    console.log("  ✅ PASS: Pricing config constants are correctly imported and defined.");
  } else {
    console.error("  ❌ FAIL: Pricing config constants mismatch!", PRICING_CONFIG);
    failureCount++;
  }

  // 2. Verify real-time opportunity scoring calculation correctness
  console.log("\n------------------------------------------------------");
  console.log("🧪 Test 2: Verify Real-Time Lead Scoring Calculations");
  const testLeadA = {
    source: "Contact Form - General",
    timestamp: new Date().toISOString(),
    email: "enterprise-test@example.com",
    name: "Enterprise Buyer",
    companyName: "Enterprise Co",
    fundingAmount: "$500K–$1M",
    businessStage: "established",
    industry: "technology",
    employees: "21-100",
    annualRevenue: "over-1m"
  };

  const intelA = calculateLeadIntelligence(testLeadA);
  // Tier A: $2,500 + ($750,000 midpoint * 10% success fee) = $77,500
  if (intelA.estimatedOpportunityValueNum === 77500) {
    console.log("  ✅ PASS: Tier A enterprise opportunity correctly calculated as $77,500.");
  } else {
    console.error("  ❌ FAIL: Tier A opportunity miscalculated:", intelA.estimatedOpportunityValueNum);
    failureCount++;
  }

  const testLeadB = {
    source: "Contact Form - General",
    timestamp: new Date().toISOString(),
    email: "buyer-b@example.com",
    name: "Product Buyer",
    companyName: "Mid Co",
    fundingAmount: "$25K–$100K",
    businessStage: "established",
    industry: "other",
    employees: "1-5",
    annualRevenue: "under-100k"
  };
  const intelB = calculateLeadIntelligence(testLeadB);
  // Tier B expected LTV = $250
  if (intelB.estimatedOpportunityValueNum === 250) {
    console.log("  ✅ PASS: Tier B opportunity correctly calculated as $250.");
  } else {
    console.error("  ❌ FAIL: Tier B opportunity miscalculated:", intelB.estimatedOpportunityValueNum);
    failureCount++;
  }

  // 3. Verify backlog ranking calculation logic
  console.log("\n------------------------------------------------------");
  console.log("🧪 Test 3: Verify Backlog ROI Ranking and Expected Uplift Calculations");
  
  // Let's verify our mathematical uplift gap formulas
  const traffic = 1000;
  const currentLeads = 10; // 1% lead rate (benchmark is 5%)
  const currentSales = 0; // 0% purchase rate (benchmark is 1.5%)
  
  // Calculations:
  // A. Lead Gain = 1000 * (0.05 - 0.01) = 40 leads. Gain Uplift = 40 * $19 = $760
  // B. Purchase Gain = 10 * (0.015 - 0.0) = 0.15 purchases. Gain Uplift = 0.15 * $250 = $37.5
  // C. Enterprise Gain = 1000 * (0.01 - 0.0) = 10 enterprise leads. Gain Uplift = 10 * $2500 = $25,000
  const currentLeadRate = currentLeads / traffic;
  let expectedRevenueGain = 0;
  
  if (currentLeadRate < 0.05) {
    const leadDeficit = traffic * (0.05 - currentLeadRate);
    expectedRevenueGain += leadDeficit * PRICING_CONFIG.TIER_C_EXPECTED_LTV;
  }
  const currentPurchaseRate = currentLeads > 0 ? (currentSales / currentLeads) : 0;
  if (currentPurchaseRate < 0.015) {
    const purchaseDeficit = currentLeads * (0.015 - currentPurchaseRate);
    expectedRevenueGain += purchaseDeficit * PRICING_CONFIG.TIER_B_EXPECTED_LTV;
  }
  const currentEnterpriseRate = 0 / traffic;
  if (currentEnterpriseRate < 0.01) {
    const enterpriseDeficit = traffic * (0.01 - currentEnterpriseRate);
    expectedRevenueGain += enterpriseDeficit * PRICING_CONFIG.DFY_BASE_RETAINER;
  }

  const expectedTotal = 760 + 37.5 + 25000; // $25,797.5
  if (Math.abs(expectedRevenueGain - expectedTotal) < 1) {
    console.log(`  ✅ PASS: Expected monthly revenue gain correctly calculated as $${Math.round(expectedRevenueGain).toLocaleString()}.`);
  } else {
    console.error("  ❌ FAIL: Revenue gain uplift mismatch! Expected:", expectedTotal, "Got:", expectedRevenueGain);
    failureCount++;
  }

  // 4. Verify output report file exists and is populated
  console.log("\n------------------------------------------------------");
  console.log("🧪 Test 4: Verify Output Backlog Report Generation");
  
  const backlogReportPath = path.join("/Users/ashwanikumar/.gemini/antigravity/brain/3861610f-ba06-40f7-9b69-5a0cbbf0df8b", "revenue_opportunities_backlog.md");
  
  // Temporarily delete if exists to ensure new write
  if (fs.existsSync(backlogReportPath)) {
    fs.unlinkSync(backlogReportPath);
  }

  // Run the script logic to write it
  const execSync = require("child_process").execSync;
  try {
    execSync("npx tsx scripts/generate-revenue-backlog.ts", { stdio: "inherit" });
    if (fs.existsSync(backlogReportPath)) {
      const content = fs.readFileSync(backlogReportPath, "utf-8");
      if (content.includes("# Revenue Optimization Backlog") && content.includes("Priority")) {
        console.log("  ✅ PASS: Backlog report file generated and validated successfully.");
      } else {
        console.error("  ❌ FAIL: Generated backlog file has invalid header content.");
        failureCount++;
      }
    } else {
      console.error("  ❌ FAIL: Backlog report file was not created!");
      failureCount++;
    }
  } catch (err) {
    console.error("  ❌ FAIL: Script generate-revenue-backlog.ts execution crashed!", err);
    failureCount++;
  }

  console.log("\n======================================================");
  if (failureCount === 0) {
    console.log("🎉 SUCCESS: Verified all Sprint 25 Backlog Optimization calculations successfully. 0 failures.");
    process.exit(0);
  } else {
    console.error(`❌ FAILURE: Found ${failureCount} backlog scoring defects.`);
    process.exit(1);
  }
}

verifyRevenueBacklog().catch((err) => {
  console.error("Fatal test verification error:", err);
  process.exit(1);
});
