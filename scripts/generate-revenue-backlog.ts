import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { getPriorityResearchProfiles } from "../lib/editorial/priorityResearch";
import { SubscriberRepository } from "../lib/leads/SubscriberRepository";
import { calculateLeadIntelligence } from "../lib/leads/scoring";
import { PRICING_CONFIG } from "../lib/leads/pricing-config";

// Artifact destination directory
const ART_DIR = process.env.ANTIGRAVITY_ARTIFACT_DIR || path.resolve(process.cwd(), "scratch");

interface Metrics {
  clicks: number | "Unknown";
  impressions: number | "Unknown";
  ctr: number | "Unknown";
  position: number | "Unknown";
  visitors: number | "Unknown";
}

interface OpportunityItem {
  page: string;
  clicks: number | "Unknown";
  impressions: number | "Unknown";
  visitors: number | "Unknown";
  leads: number;
  purchases: number;
  revenue: number;
  enterpriseLeads: number;
  commercialScore: number;
  expectedRevenueGain: number;
  effort: "S" | "M" | "L";
  effortWeight: number;
  confidence: "High" | "Medium" | "Low";
  confidenceMultiplier: number;
  roiScore: number;
  gaps: string[];
  recommendation: string;
}

async function run() {
  try {
    console.log("📊 Starting Monthly Revenue Optimization Backlog Loop...");

    // 1. Ingest Google Search Console (GSC) metrics
    const gscPath = path.resolve(process.cwd(), "scripts/data/gsc-metrics.json");
    let gscData: Record<string, any> = {};
    if (fs.existsSync(gscPath)) {
      try {
        gscData = JSON.parse(fs.readFileSync(gscPath, "utf-8"));
        console.log(`✅ Loaded GSC search metrics for ${Object.keys(gscData).length} paths.`);
      } catch (e) {
        console.error("❌ Failed to parse gsc-metrics.json:", e);
      }
    } else {
      console.warn("⚠️ Warning: scripts/data/gsc-metrics.json not found. Traffic metrics will show as Unknown.");
    }

    // 2. Ingest GA4 metrics
    const ga4Path = path.resolve(process.cwd(), "scripts/data/ga4-metrics.json");
    let ga4Data: Record<string, any> = {};
    if (fs.existsSync(ga4Path)) {
      try {
        ga4Data = JSON.parse(fs.readFileSync(ga4Path, "utf-8"));
        console.log(`✅ Loaded GA4 visitor metrics for ${Object.keys(ga4Data).length} paths.`);
      } catch (e) {
        console.error("❌ Failed to parse ga4-metrics.json:", e);
      }
    } else {
      console.warn("⚠️ Warning: scripts/data/ga4-metrics.json not found. Visitor metrics will show as Unknown.");
    }

    // 3. Fetch CRM lead database from sheets
    console.log("📥 Loading lead database records...");
    const subscribers = await SubscriberRepository.getAllSubscribers(true);
    console.log(`✅ Loaded ${subscribers.length} total database records.`);

    // 4. Gather list of commercial paths (dynamic profiles + static paths)
    const profiles = getPriorityResearchProfiles();
    const allPaths = new Set<string>([
      "/",
      "/calculator",
      "/contact",
      "/portfolio",
      ...profiles.map(p => p.route)
    ]);

    // Pre-calculate historical best performing benchmarks across pages with sufficient traffic (>= 100)
    let maxObservedLeadRate = 0.05; // default 5%
    let maxObservedPurchaseRate = 0.015; // default 1.5%
    let maxObservedEnterpriseRate = 0.01; // default 1%

    let bestLeadPage = "Benchmark Default";
    let bestPurchasePage = "Benchmark Default";
    let bestEnterprisePage = "Benchmark Default";

    for (const page of allPaths) {
      const gsc = gscData[page] || {};
      const ga4 = ga4Data[page] || {};
      const clicks: number = gsc.clicks !== undefined ? Number(gsc.clicks) : 0;
      const visitors: number = ga4.visitors !== undefined ? Number(ga4.visitors) : 0;
      const trafficVolume = clicks > 0 ? clicks : visitors;

      if (trafficVolume >= 100) {
        const pageLeads = subscribers.filter(s => s.pagePath && (s.pagePath === page || s.pagePath.endsWith(page)));
        const leadsCount = pageLeads.length;
        let purchasesCount = 0;
        let enterpriseCount = 0;

        pageLeads.forEach(s => {
          const intel = calculateLeadIntelligence(s);
          if (intel.tier === 'A') enterpriseCount++;
          if (s.reportPurchased || s.strategyReportPurchased || s.offlineStatus === 'Closed/Won Filing') {
            purchasesCount++;
          }
        });

        const leadRate = leadsCount / trafficVolume;
        const purchaseRate = leadsCount > 0 ? (purchasesCount / leadsCount) : 0;
        const enterpriseRate = enterpriseCount / trafficVolume;

        if (leadRate > maxObservedLeadRate) {
          maxObservedLeadRate = leadRate;
          bestLeadPage = page;
        }
        if (purchaseRate > maxObservedPurchaseRate) {
          maxObservedPurchaseRate = purchaseRate;
          bestPurchasePage = page;
        }
        if (enterpriseRate > maxObservedEnterpriseRate) {
          maxObservedEnterpriseRate = enterpriseRate;
          bestEnterprisePage = page;
        }
      }
    }

    console.log(`📈 Target Benchmarks from historical best-performing pages:`);
    console.log(`  - Lead Rate: ${(maxObservedLeadRate * 100).toFixed(2)}% (Best: ${bestLeadPage})`);
    console.log(`  - Purchase Rate: ${(maxObservedPurchaseRate * 100).toFixed(2)}% (Best: ${bestPurchasePage})`);
    console.log(`  - Enterprise Rate: ${(maxObservedEnterpriseRate * 100).toFixed(2)}% (Best: ${bestEnterprisePage})`);

    const backlog: OpportunityItem[] = [];

    for (const page of allPaths) {
      // Resolve analytics traffic
      const gsc = gscData[page] || {};
      const ga4 = ga4Data[page] || {};

      const clicks: number | "Unknown" = gsc.clicks !== undefined ? Number(gsc.clicks) : "Unknown";
      const impressions: number | "Unknown" = gsc.impressions !== undefined ? Number(gsc.impressions) : "Unknown";
      const ctr: number | "Unknown" = gsc.ctr !== undefined ? Number(gsc.ctr) : "Unknown";
      const position: number | "Unknown" = gsc.position !== undefined ? Number(gsc.position) : "Unknown";
      const visitors: number | "Unknown" = ga4.visitors !== undefined ? Number(ga4.visitors) : "Unknown";

      // Filter database leads for this path
      const pageLeads = subscribers.filter(s => {
        const pathMatch = s.pagePath && (s.pagePath === page || s.pagePath.endsWith(page));
        return pathMatch;
      });

      const leadsCount = pageLeads.length;
      let purchasesCount = 0;
      let revenueSum = 0;
      let enterpriseCount = 0;

      pageLeads.forEach(s => {
        const intel = calculateLeadIntelligence(s);
        if (intel.tier === 'A') {
          enterpriseCount++;
        }
        
        // Sum revenue
        let subRev = 0;
        if (s.reportPurchased) subRev += 19;
        if (s.strategyReportPurchased) subRev += 180; // bump value
        if (s.offlineStatus === 'Closed/Won Filing') subRev += 2500; // base retainer

        if (subRev > 0) {
          purchasesCount++;
          revenueSum += subRev;
        }
      });

      // 5. Calculate Commercial Scoring (Manual Verification Checklist)
      const profile = profiles.find(p => p.route === page);
      let scoreLeadCapture = 15; // default newsletter form present
      let scoreProductMapping = 0;
      let scoreRecovery = 0;
      let scoreEnterprise = 0;
      let scoreCTA = 5; // default plain links

      const gaps: string[] = [];

      if (page === "/") {
        scoreLeadCapture = 15;
        scoreProductMapping = 15; // generic products
        scoreRecovery = 20;
        scoreEnterprise = 0;
        scoreCTA = 15;
      } else if (page === "/calculator") {
        scoreLeadCapture = 25; // gates behind email
        scoreProductMapping = 25; // matched products on checkout cards
        scoreRecovery = 20;
        scoreEnterprise = 15; // high-ticket redirect logic active
        scoreCTA = 15;
      } else if (profile) {
        // Interactive tool check
        if (profile.interactiveTool) {
          scoreLeadCapture = 25;
        } else {
          scoreLeadCapture = 15;
          gaps.push("Missing interactive diagnostic wizard");
        }

        // Product mapping check
        if (profile.cta?.href?.includes("/products/") || profile.cta?.href?.includes("checkout")) {
          scoreProductMapping = 25;
        } else if (profile.cta?.href?.includes("/portfolio") || profile.cta?.href?.includes("/contact")) {
          scoreProductMapping = 15;
          gaps.push("Routes to general portfolio instead of matched product checkout card");
        } else {
          gaps.push("No matched product promoted");
        }

        // Recovery check
        if (page.includes("nih") || page.includes("nsf") || page.includes("women") || page.includes("small-business")) {
          scoreRecovery = 20;
        } else {
          gaps.push("No checkout abandonment watcher integration");
        }

        // Enterprise check
        if (profile.expectedIntent === "high" || profile.cta?.href?.includes("booking") || profile.cta?.href?.includes("contact")) {
          scoreEnterprise = 15;
        } else {
          gaps.push("Missing high-ticket DFY filing escalation hook");
        }

        // CTA check
        if (profile.cta && profile.relatedPath) {
          scoreCTA = 15;
        } else {
          scoreCTA = 5;
          gaps.push("Weak above-the-fold CTA placement");
        }
      } else {
        // Fallback static pages
        gaps.push("Unoptimized content profile");
      }

      const commercialScore = (
        (0.25 * scoreLeadCapture) + 
        (0.25 * scoreProductMapping) + 
        (0.20 * scoreRecovery) + 
        (0.15 * scoreEnterprise) + 
        (0.15 * scoreCTA)
      ) / 10;

      // 6. Calculate Potential Monthly Revenue Gain (Uplift Gaps against Best-Performing Benchmarks)
      let expectedRevenueGain = 0;
      const trafficVolume = clicks !== "Unknown" ? clicks : (visitors !== "Unknown" ? visitors : 0);

      if (trafficVolume > 0) {
        // A. Lead Conversion Gap (Benchmark maxObservedLeadRate)
        const currentLeadRate = leadsCount / trafficVolume;
        if (currentLeadRate < maxObservedLeadRate) {
          const leadDeficit = trafficVolume * (maxObservedLeadRate - currentLeadRate);
          expectedRevenueGain += leadDeficit * PRICING_CONFIG.TIER_C_EXPECTED_LTV; // Nurture LTV
        }

        // B. Purchase Conversion Gap (Benchmark maxObservedPurchaseRate)
        const currentPurchaseRate = leadsCount > 0 ? (purchasesCount / leadsCount) : 0;
        if (currentPurchaseRate < maxObservedPurchaseRate) {
          const purchaseDeficit = (leadsCount || 1) * (maxObservedPurchaseRate - currentPurchaseRate);
          expectedRevenueGain += purchaseDeficit * PRICING_CONFIG.TIER_B_EXPECTED_LTV; // Product LTV
        }

        // C. Enterprise Qualification Gap (Benchmark maxObservedEnterpriseRate)
        const currentEnterpriseRate = enterpriseCount / trafficVolume;
        if (currentEnterpriseRate < maxObservedEnterpriseRate) {
          const enterpriseDeficit = trafficVolume * (maxObservedEnterpriseRate - currentEnterpriseRate);
          expectedRevenueGain += enterpriseDeficit * PRICING_CONFIG.DFY_BASE_RETAINER; // Retainer value
        }
      }

      // 7. Estimate Engineering Effort (S/M/L)
      let effort: "S" | "M" | "L" = "S";
      let effortWeight = 1;

      if (gaps.length >= 4) {
        effort = "L";
        effortWeight = 6;
      } else if (gaps.length >= 2) {
        effort = "M";
        effortWeight = 3;
      }

      // 8. Confidence Score based on Traffic Sample Volume
      let confidence: "High" | "Medium" | "Low" = "Low";
      let confidenceMultiplier = 0.1;

      if (trafficVolume >= 500 || leadsCount >= 20) {
        confidence = "High";
        confidenceMultiplier = 1.0;
      } else if (trafficVolume >= 100) {
        confidence = "Medium";
        confidenceMultiplier = 0.5;
      }

      // 9. Prioritization ROI Score
      const roiScore = expectedRevenueGain > 0 
        ? (expectedRevenueGain * confidenceMultiplier) / effortWeight 
        : 0;

      // Map recommendations
      let recommendation = "Clean and align CTA destinations.";
      if (gaps.includes("Missing interactive diagnostic wizard")) {
        recommendation = "Deploy customized inline RDE diagnostic widget (TRL, Stacking, or Checklist).";
      } else if (gaps.includes("Routes to general portfolio instead of matched product checkout card")) {
        recommendation = "Replace portfolio redirect links with matched $19/$29/$49 product checkout cards.";
      } else if (gaps.includes("No matched product promoted")) {
        recommendation = "Design matched product pricing checkout block.";
      }

      backlog.push({
        page,
        clicks,
        impressions,
        visitors,
        leads: leadsCount,
        purchases: purchasesCount,
        revenue: revenueSum,
        enterpriseLeads: enterpriseCount,
        commercialScore,
        expectedRevenueGain,
        effort,
        effortWeight,
        confidence,
        confidenceMultiplier,
        roiScore,
        gaps,
        recommendation
      });
    }

    // Sort backlog by ROI Score descending
    backlog.sort((a, b) => b.roiScore - a.roiScore);

    // Limit to top 20
    const topOpportunities = backlog.slice(0, 20);

    // 10. Generate Markdown Backlog File
    const reportPath = path.join(ART_DIR, "revenue_opportunities_backlog.md");
    
    let md = `# Revenue Optimization Backlog — prioritized by ROI\n`;
    md += `**Compiled:** ${new Date().toISOString().split("T")[0]} | **Total Scanned Paths:** ${allPaths.size}\n\n`;
    md += `This backlog ranks conversion-rate optimization tasks by ROI (**Expected Revenue Gain $\\times$ Confidence $\\div$ Effort**) to ensure engineering focus stays centered on the highest-yield tasks first.\n\n`;
    md += `### 🎯 Dynamic Target Benchmarks (Self-Learning)\n`;
    md += `Benchmarks automatically scale to match the best-performing page (with minimum baseline fallbacks):\n`;
    md += `*   **Lead Rate:** **${(maxObservedLeadRate * 100).toFixed(2)}%** (Best Page: \`${bestLeadPage}\`)\n`;
    md += `*   **Purchase Rate:** **${(maxObservedPurchaseRate * 100).toFixed(2)}%** (Best Page: \`${bestPurchasePage}\`)\n`;
    md += `*   **Enterprise Rate:** **${(maxObservedEnterpriseRate * 100).toFixed(2)}%** (Best Page: \`${bestEnterprisePage}\`)\n\n`;
    md += `## 💵 Priority Sprint Backlog Matrix\n\n`;
    md += `| Page Path | Traffic (Clicks) | Leads | Purchases | Commercial Score | Est. Monthly Gain | Effort | Confidence | ROI Score | Priority |\n`;
    md += `| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n`;

    topOpportunities.forEach((item, idx) => {
      const priority = idx < 3 ? "🔥 P1 (High)" : (idx < 8 ? "⚡ P2 (Med)" : "💤 P3 (Low)");
      const clicksStr = item.clicks === "Unknown" ? "Unknown" : item.clicks.toString();
      const gainStr = item.expectedRevenueGain > 0 ? `$${Math.round(item.expectedRevenueGain).toLocaleString()}` : "$0";
      
      md += `| [\`${item.page}\`](file:///Users/ashwanikumar/Downloads/canadablog${item.page}) | ${clicksStr} | ${item.leads} | ${item.purchases} | \`${item.commercialScore.toFixed(1)}/10\` | **${gainStr}** | \`${item.effort} (${item.effortWeight})\` | \`${item.confidence}\` | \`${item.roiScore.toFixed(1)}\` | **${priority}** |\n`;
    });

    md += `\n\n## 🔍 Top Backlog Opportunity Details\n\n`;

    topOpportunities.forEach((item, idx) => {
      if (item.expectedRevenueGain === 0) return;
      md += `### ${idx + 1}. [\`${item.page}\`](file:///Users/ashwanikumar/Downloads/canadablog${item.page})\n`;
      md += `*   **Traffic & Leads:** ${item.clicks === "Unknown" ? "Unknown" : `${item.clicks} clicks`} | ${item.leads} leads captured | ${item.purchases} purchases\n`;
      md += `*   **Conversion Metrics:** Leads/Traffic: ${item.clicks !== "Unknown" && item.clicks > 0 ? `${((item.leads / item.clicks) * 100).toFixed(1)}%` : "0.0%"} | Sales/Leads: ${item.leads > 0 ? `${((item.purchases / item.leads) * 100).toFixed(1)}%` : "0.0%"}\n`;
      md += `*   **Commercial Score:** \`${item.commercialScore.toFixed(1)}/10\`\n`;
      md += `*   **Identified Gaps:**\n`;
      item.gaps.forEach(g => {
        md += `    *   ❌ ${g}\n`;
      });
      md += `*   **Recommendation:** ${item.recommendation}\n`;
      md += `*   **Expected Value Uplift:** **+$${Math.round(item.expectedRevenueGain).toLocaleString()} / month** (Effort: \`${item.effort}\` | Confidence: \`${item.confidence}\`)\n\n`;
    });

    fs.writeFileSync(reportPath, md, "utf-8");
    console.log(`\n🎉 SUCCESS: Wrote optimized revenue backlog to: ${reportPath}`);

    // Print backlog summary console table
    console.log("\n===============================================================================================");
    console.log("🔥 PRIORITIZED REVENUE OPTIMIZATION BACKLOG");
    console.log("===============================================================================================");
    console.log("Rank | Page Path                                | Clicks | Score | Est Gain  | Effort | ROI  | Priority");
    console.log("-----------------------------------------------------------------------------------------------");
    topOpportunities.forEach((item, idx) => {
      const rank = (idx + 1).toString().padEnd(4);
      const page = item.page.slice(0, 40).padEnd(40);
      const clicks = (item.clicks === "Unknown" ? "Unknown" : item.clicks.toString()).padEnd(6);
      const score = `${item.commercialScore.toFixed(1)}/10`.padEnd(5);
      const gain = `$${Math.round(item.expectedRevenueGain).toLocaleString()}`.padEnd(9);
      const effort = item.effort.padEnd(6);
      const roi = item.roiScore.toFixed(1).padEnd(5);
      const priority = idx < 3 ? "P1" : (idx < 8 ? "P2" : "P3");
      console.log(`${rank} | ${page} | ${clicks} | ${score} | ${gain} | ${effort} | ${roi} | ${priority}`);
    });
    console.log("===============================================================================================\n");

  } catch (err) {
    console.error("❌ Exception during backlog generation:", err);
  }
}

run();
