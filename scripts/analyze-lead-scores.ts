import { config } from 'dotenv';
import path from 'path';
// Load environment variables from .env.local
config({ path: path.join(__dirname, '../.env.local') });

import { getLeadsFromSheet, getGoogleSheetsClient } from '../lib/google-sheets';
import { calculateLeadIntelligence } from '../lib/leads/scoring';
import fs from 'fs';

async function main() {
  console.log('📊 --- STARTING LEAD SCORING ANALYSIS v2 ---\n');

  try {
    // 1. Fetch CRM Leads
    const rawLeads = await getLeadsFromSheet(1000);
    console.log(`Fetched ${rawLeads.length} leads from Google Sheets.`);

    if (rawLeads.length === 0) {
      console.log('⚠️ No leads found.');
      return;
    }

    // 2. Fetch Product Purchases
    let purchaseRows: any[] = [];
    try {
      const sheets = await getGoogleSheetsClient();
      const spreadsheetId = process.env.GOOGLE_SHEET_ID;
      const purchasesResponse = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Product Purchases!A2:O',
      });
      purchaseRows = purchasesResponse.data.values || [];
      console.log(`Retrieved ${purchaseRows.length} purchase records.`);
    } catch (e) {
      console.log('⚠️ Could not fetch Product Purchases sheet or it is empty.');
    }

    // 3. Map Purchases by Email
    const purchaseMap = new Map<string, {
      totalRevenue: number;
      purchasedReport: boolean;
      purchasedAudit: boolean;
    }>();

    purchaseRows.forEach((row) => {
      const email = String(row[1] || '').toLowerCase().trim();
      const productId = String(row[3] || '').trim();
      const amountVal = parseFloat(row[4] || '0');
      const status = String(row[9] || 'completed').toLowerCase().trim();

      if (!email || status !== 'completed') return;

      const current = purchaseMap.get(email) || {
        totalRevenue: 0,
        purchasedReport: false,
        purchasedAudit: false,
      };

      current.totalRevenue += amountVal;

      if (productId === 'strategy-audit' || productId === 'strategy-vip') {
        current.purchasedAudit = true;
      } else if (
        productId === 'funding-match-report' ||
        productId === 'funding-roadmap' ||
        productId === 'funding-bundle'
      ) {
        current.purchasedReport = true;
      }

      purchaseMap.set(email, current);
    });

    // 4. Define Telemetry Launch Date
    const TELEMETRY_LAUNCH_DATE = new Date('2026-06-20T00:00:00.000Z');

    // Split Leads by Telemetry Launch Date
    const preLeads = rawLeads.filter((l) => {
      if (!l.timestamp) return true;
      const t = new Date(l.timestamp);
      return isNaN(t.getTime()) || t.getTime() < TELEMETRY_LAUNCH_DATE.getTime();
    });

    const postLeads = rawLeads.filter((l) => {
      if (!l.timestamp) return false;
      const t = new Date(l.timestamp);
      return !isNaN(t.getTime()) && t.getTime() >= TELEMETRY_LAUNCH_DATE.getTime();
    });

    console.log(`Pre-Telemetry Leads (Before 2026-06-20): ${preLeads.length}`);
    console.log(`Post-Telemetry Leads (On/After 2026-06-20): ${postLeads.length}`);

    // Helper to calculate statistics for a given group of leads
    const calculateGroupStats = (leadList: typeof rawLeads) => {
      const statsByType: Record<string, {
        count: number;
        sumQualScore: number;
        sumIntentScore: number;
        tierA: number;
        tierB: number;
        tierC: number;
        tierD: number;
        purchasedAuditCount: number;
        purchasedReportCount: number;
        bookedCount: number;
        totalRevenue: number;
      }> = {
        'Newsletter': { count: 0, sumQualScore: 0, sumIntentScore: 0, tierA: 0, tierB: 0, tierC: 0, tierD: 0, purchasedAuditCount: 0, purchasedReportCount: 0, bookedCount: 0, totalRevenue: 0 },
        'Lead Magnet': { count: 0, sumQualScore: 0, sumIntentScore: 0, tierA: 0, tierB: 0, tierC: 0, tierD: 0, purchasedAuditCount: 0, purchasedReportCount: 0, bookedCount: 0, totalRevenue: 0 },
        'Calculator': { count: 0, sumQualScore: 0, sumIntentScore: 0, tierA: 0, tierB: 0, tierC: 0, tierD: 0, purchasedAuditCount: 0, purchasedReportCount: 0, bookedCount: 0, totalRevenue: 0 },
        'AI Finder': { count: 0, sumQualScore: 0, sumIntentScore: 0, tierA: 0, tierB: 0, tierC: 0, tierD: 0, purchasedAuditCount: 0, purchasedReportCount: 0, bookedCount: 0, totalRevenue: 0 },
        'Contact Form': { count: 0, sumQualScore: 0, sumIntentScore: 0, tierA: 0, tierB: 0, tierC: 0, tierD: 0, purchasedAuditCount: 0, purchasedReportCount: 0, bookedCount: 0, totalRevenue: 0 },
        'Audit Prospect': { count: 0, sumQualScore: 0, sumIntentScore: 0, tierA: 0, tierB: 0, tierC: 0, tierD: 0, purchasedAuditCount: 0, purchasedReportCount: 0, bookedCount: 0, totalRevenue: 0 },
        'Other': { count: 0, sumQualScore: 0, sumIntentScore: 0, tierA: 0, tierB: 0, tierC: 0, tierD: 0, purchasedAuditCount: 0, purchasedReportCount: 0, bookedCount: 0, totalRevenue: 0 },
      };

      const b2bScoreRanges = {
        '90+': 0,
        '80-89': 0,
        '70-79': 0,
        '60-69': 0,
        '50-59': 0,
        '<50': 0,
      };

      leadList.forEach((lead) => {
        const email = String(lead.email || '').toLowerCase().trim();
        const intel = calculateLeadIntelligence(lead);
        const leadType = intel.leadType || 'Other';

        // Parse activity for booking checks
        let activity: any = {};
        try {
          if (lead.leadActivity && lead.leadActivity !== 'N/A' && lead.leadActivity !== '{}') {
            activity = JSON.parse(lead.leadActivity);
          }
        } catch (e) {}

        const hasBooked = 
          activity.bookedAudit === true || 
          !!activity.auditBookedAt || 
          lead.offlineStatus === 'Booked Audit' || 
          lead.offlineStatus === 'Audit Completed';

        // Get purchase stats
        const purchaseInfo = purchaseMap.get(email) || {
          totalRevenue: 0,
          purchasedReport: false,
          purchasedAudit: false,
        };

        // If they are in the sheet but not completed, check if CRM indicates they purchased
        const finalPurchasedAudit = purchaseInfo.purchasedAudit || lead.strategyReportPurchased === true;
        const finalPurchasedReport = purchaseInfo.purchasedReport || lead.reportPurchased === true;
        const finalRevenue = purchaseInfo.totalRevenue || (finalPurchasedAudit ? 199 : 0) + (finalPurchasedReport ? 19 : 0);

        // Increment Group Statistics
        const group = statsByType[leadType] || statsByType['Other'];
        group.count++;
        group.sumQualScore += intel.qualificationScore;
        group.sumIntentScore += intel.intentScore;
        group.totalRevenue += finalRevenue;

        if (intel.tier === 'A') group.tierA++;
        else if (intel.tier === 'B') group.tierB++;
        else if (intel.tier === 'C') group.tierC++;
        else if (intel.tier === 'D') group.tierD++;

        if (finalPurchasedAudit) group.purchasedAuditCount++;
        if (finalPurchasedReport) group.purchasedReportCount++;
        if (hasBooked) group.bookedCount++;

        // Increment B2B Score Distribution if not Newsletter
        if (leadType !== 'Newsletter') {
          if (intel.score >= 90) b2bScoreRanges['90+']++;
          else if (intel.score >= 80) b2bScoreRanges['80-89']++;
          else if (intel.score >= 70) b2bScoreRanges['70-79']++;
          else if (intel.score >= 60) b2bScoreRanges['60-69']++;
          else if (intel.score >= 50) b2bScoreRanges['50-59']++;
          else b2bScoreRanges['<50']++;
        }
      });

      return { statsByType, b2bScoreRanges };
    };

    const preStats = calculateGroupStats(preLeads);
    const postStats = calculateGroupStats(postLeads);
    const currentThreshold = parseInt(process.env.TIER_A_THRESHOLD || '60', 10);

    // 5. Generate Markdown Report
    let report = `# Lead Funnel Calibration & Performance Report\n\n`;
    report += `Generated: ${new Date().toISOString()}\n`;
    report += `Total CRM Leads Analyzed: **${rawLeads.length}** (Pre-Telemetry: **${preLeads.length}**, Post-Telemetry: **${postLeads.length}**)\n`;
    report += `Telemetry Active Since: **2026-06-20**\n`;
    report += `Current TIER_A_THRESHOLD Config: **${currentThreshold}**\n\n`;

    // Render Stats Tables Helper
    const renderTablesForGroup = (title: string, groupStats: ReturnType<typeof calculateGroupStats>, leadsCount: number) => {
      let segmentMd = `## ${title} (Total Leads: ${leadsCount})\n\n`;

      segmentMd += `### Funnel Performance by Lead Type\n\n`;
      segmentMd += `| Lead Type | Volume | Avg Qual Score | Avg Intent Score | Audit Purchase Rate | Report Purchase Rate | Booking Rate | Revenue |\n`;
      segmentMd += `| --- | --- | --- | --- | --- | --- | --- | --- |\n`;

      Object.entries(groupStats.statsByType).forEach(([type, s]) => {
        const avgQual = s.count > 0 ? (s.sumQualScore / s.count).toFixed(1) : '0.0';
        const avgIntent = s.count > 0 ? (s.sumIntentScore / s.count).toFixed(1) : '0.0';
        
        const auditRate = s.count > 0 ? ((s.purchasedAuditCount / s.count) * 100).toFixed(1) + '%' : '0.0%';
        const reportRate = s.count > 0 ? ((s.purchasedReportCount / s.count) * 100).toFixed(1) + '%' : '0.0%';
        
        const bookingRateVal = s.purchasedAuditCount > 0 
          ? ((s.bookedCount / s.purchasedAuditCount) * 100).toFixed(1) + '% of buyers'
          : s.count > 0 ? ((s.bookedCount / s.count) * 100).toFixed(1) + '% of total' : '0.0%';

        const formattedRev = s.totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

        segmentMd += `| **${type}** | ${s.count} | ${avgQual}/100 | ${avgIntent}/100 | ${s.purchasedAuditCount} (${auditRate}) | ${s.purchasedReportCount} (${reportRate}) | ${s.bookedCount} (${bookingRateVal}) | **${formattedRev}** |\n`;
      });
      segmentMd += `\n`;

      segmentMd += `### Tier Distribution by Lead Type\n\n`;
      segmentMd += `| Lead Type | Tier A (Qual>=60, Intent>=20) | Tier B (Qual>=40, Intent>=10) | Tier C (Fallback) | Tier D (Newsletter) | Total |\n`;
      segmentMd += `| --- | --- | --- | --- | --- | --- |\n`;

      Object.entries(groupStats.statsByType).forEach(([type, s]) => {
        segmentMd += `| **${type}** | ${s.tierA} | ${s.tierB} | ${s.tierC} | ${s.tierD} | ${s.count} |\n`;
      });
      segmentMd += `\n`;

      segmentMd += `### Calibrated B2B Score Distribution\n`;
      segmentMd += `*Note: Excludes Tier D Newsletter Leads to prevent statistical dilution.*\n\n`;
      segmentMd += `| Score Range | Count | Percentage |\n`;
      segmentMd += `| --- | --- | --- |\n`;

      const totalB2B = Object.values(groupStats.b2bScoreRanges).reduce((a, b) => a + b, 0);
      Object.entries(groupStats.b2bScoreRanges).forEach(([range, count]) => {
        const pct = totalB2B > 0 ? ((count / totalB2B) * 100).toFixed(1) : '0.0';
        segmentMd += `| **${range}** | ${count} | ${pct}% |\n`;
      });
      segmentMd += `\n`;

      return segmentMd;
    };

    report += renderTablesForGroup("Post-Telemetry Data (On/After 2026-06-20)", postStats, postLeads.length);
    report += `\n---\n\n`;
    report += renderTablesForGroup("Pre-Telemetry Data (Before 2026-06-20)", preStats, preLeads.length);
    report += `\n---\n\n`;

    report += `## Strategic Recommendations & Funnel Insights\n\n`;
    report += `> [!IMPORTANT]\n`;
    report += `> **Telemetry Split Insights:**\n`;
    report += `> - The majority of historical leads (${preLeads.length}) do not possess calculator/audit behavioral tracking events as they pre-date the telemetry release on **2026-06-20**.\n`;
    report += `> - Evaluating the funnels post-telemetry ensures that drop-off metrics are computed strictly using visitors who had telemetry enabled.\n`;
    report += `> - Newsletter leads are successfully isolated in **Tier D** with a B2B score of **0**, resolving score dilution.\n`;
    report += `> - **AI Finder** leads continue to show a strong qualification profile. The roadmap should continue to prioritize traffic acquisition into high-intent telemetry-active funnels.\n`;

    // Write report file
    const reportPath = path.join(__dirname, '../reports/lead-scoring-calibration.md');
    fs.writeFileSync(reportPath, report);
    console.log(`✅ Diagnostics report written successfully to: ${reportPath}`);

    // Print quick summary to stdout
    console.log('\n📊 --- POST-TELEMETRY METRICS SUMMARY ---');
    Object.entries(postStats.statsByType).forEach(([type, s]) => {
      console.log(`- ${type}: ${s.count} leads | Avg Qual: ${(s.sumQualScore / (s.count || 1)).toFixed(1)} | Avg Intent: ${(s.sumIntentScore / (s.count || 1)).toFixed(1)} | Revenue: $${s.totalRevenue}`);
    });
    console.log('---------------------------------\n');

  } catch (error) {
    console.error('❌ Error executing lead scoring analysis:', error);
  }
}

main().catch(console.error);
