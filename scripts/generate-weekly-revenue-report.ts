import { config } from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables from .env.local
config({ path: path.join(__dirname, '../.env.local') });

import { getLeadsFromSheet } from '../lib/google-sheets';
import { getTelemetryEvents } from '../lib/telemetry/telemetry-store';

async function main() {
  console.log('🔍 Generating Commercial Revenue & Funnel Report...');

  try {
    const leads = await getLeadsFromSheet(1000);
    const telemetry = await getTelemetryEvents();

    console.log(`Loaded ${leads.length} Leads and ${telemetry.length} Telemetry Events.\n`);

    // Map page-level metrics
    const pagesMap: Record<string, {
      views: number;
      leads: number;
      checkoutStarts: number;
      purchases: number;
      revenue: number;
      enterpriseLeadsCount: number;
    }> = {};

    // Map product-level metrics
    const productsMap: Record<string, {
      name: string;
      revenue: number;
      orders: number;
      refunds: number;
      recovered: number;
    }> = {
      'funding-match-report': { name: 'Match Report ($19)', revenue: 0, orders: 0, refunds: 0, recovered: 0 },
      'funding-roadmap': { name: 'Action Plan ($49)', revenue: 0, orders: 0, refunds: 0, recovered: 0 },
      'funding-bundle': { name: 'Complete Bundle ($79)', revenue: 0, orders: 0, refunds: 0, recovered: 0 },
      'guide-companion-kit': { name: 'Companion Pack ($9)', revenue: 0, orders: 0, refunds: 0, recovered: 0 },
      'strategy-audit': { name: 'Strategy Session ($199)', revenue: 0, orders: 0, refunds: 0, recovered: 0 },
    };

    const getBasePrice = (productId: string) => {
      if (productId === 'funding-bundle') return 79;
      if (productId === 'funding-roadmap') return 49;
      if (productId === 'guide-companion-kit') return 9;
      if (productId === 'strategy-audit') return 199;
      return 19; // Default Match Report
    };

    const getNormalizedProductId = (productId: string): string => {
      const pid = String(productId || '').toLowerCase().trim();
      if (pid.includes('bundle')) return 'funding-bundle';
      if (pid.includes('roadmap') || pid.includes('plan')) return 'funding-roadmap';
      if (pid.includes('companion') || pid.includes('kit') || pid.includes('paywall')) return 'guide-companion-kit';
      if (pid.includes('audit') || pid.includes('session')) return 'strategy-audit';
      return 'funding-match-report'; // Default fallback
    };

    let totalRevenueSum = 0;
    let totalPurchasesCount = 0;

    // 1. Process Telemetry Events (views, checkout views/starts, cancelled, etc.)
    telemetry.forEach((event) => {
      const pathKey = event.pagePath || '/';
      if (!pagesMap[pathKey]) {
        pagesMap[pathKey] = { views: 0, leads: 0, checkoutStarts: 0, purchases: 0, revenue: 0, enterpriseLeadsCount: 0 };
      }

      if (event.eventName === 'checkout_viewed' || event.eventName === 'paywall_viewed') {
        pagesMap[pathKey].views++;
      } else if (event.eventName === 'checkout_started' || event.eventName === 'guide_companion_checkout_started' || event.eventName === 'ai_finder_checkout_started') {
        pagesMap[pathKey].checkoutStarts++;
      } else if (event.eventName === 'purchase_product' || event.eventName === 'strategy_audit_purchased' || event.eventName === 'ai_finder_purchase_success' || event.eventName === 'guide_companion_purchase_success') {
        pagesMap[pathKey].purchases++;
        const price = Number(event.revenue) || getBasePrice(event.productId || '');
        pagesMap[pathKey].revenue += price;
        totalRevenueSum += price;
        totalPurchasesCount++;

        const normProdId = getNormalizedProductId(event.productId || '');
        if (productsMap[normProdId]) {
          productsMap[normProdId].orders++;
          productsMap[normProdId].revenue += price;
        }
      }
    });

    // 2. Process CRM Leads List for recovery campaign stats & enterprise pipeline
    const enterpriseLeads: any[] = [];
    let enterpriseBookedCount = 0;
    let enterpriseClosedCount = 0;
    let enterpriseTotalValue = 0;

    // Recovery Stats counters
    let cartRecoverySent = 0;
    let cartRecoveryRecovered = 0;
    let calcRecoverySent = 0;
    let calcRecoveryRecovered = 0;

    leads.forEach((lead) => {
      const pathKey = lead.pagePath || '/';
      if (!pagesMap[pathKey]) {
        pagesMap[pathKey] = { views: 0, leads: 0, checkoutStarts: 0, purchases: 0, revenue: 0, enterpriseLeadsCount: 0 };
      }

      // Increment lead count
      pagesMap[pathKey].leads++;

      // Process Activity JSON
      let activity: any = {};
      try {
        if (lead.leadActivity && lead.leadActivity !== 'N/A' && lead.leadActivity !== '{}') {
          activity = JSON.parse(lead.leadActivity);
        }
      } catch (e) {}

      const hasPurchasedReport = lead.reportPurchased === true || activity.purchasedProductId === 'funding-match-report';
      const hasPurchasedRoadmap = lead.strategyReportPurchased === true || activity.purchasedProductId === 'funding-roadmap';
      
      if (hasPurchasedReport || hasPurchasedRoadmap) {
        pagesMap[pathKey].purchases++;
        const baseVal = hasPurchasedRoadmap ? 49 : 19;
        pagesMap[pathKey].revenue += baseVal;
        totalRevenueSum += baseVal;
        totalPurchasesCount++;

        const normProdId = hasPurchasedRoadmap ? 'funding-roadmap' : 'funding-match-report';
        productsMap[normProdId].orders++;
        productsMap[normProdId].revenue += baseVal;
      }

      // Recovery Campaigns tracking
      const hasCartRecoverySent = !!activity.cartRecoveryEmail1SentAt || !!activity.cartRecoveryEmail2SentAt || !!activity.cartRecoveryEmail3SentAt;
      const hasCalcRecoverySent = !!activity.calcRecoveryEmail1SentAt || !!activity.calcRecoveryEmail2SentAt || !!activity.calcRecoveryEmail3SentAt;
      const isBuyer = lead.reportPurchased === true || lead.strategyReportPurchased === true || !!activity.paymentCompletedAt;

      if (hasCartRecoverySent) {
        cartRecoverySent++;
        if (isBuyer) {
          cartRecoveryRecovered++;
          const normProdId = getNormalizedProductId(activity.purchasedProductId || '');
          if (productsMap[normProdId]) {
            productsMap[normProdId].recovered++;
          }
        }
      }

      if (hasCalcRecoverySent) {
        calcRecoverySent++;
        if (isBuyer) {
          calcRecoveryRecovered++;
          const normProdId = getNormalizedProductId(activity.purchasedProductId || '');
          if (productsMap[normProdId]) {
            productsMap[normProdId].recovered++;
          }
        }
      }

      // Check Enterprise Status (> $800k funding or high tier)
      const funding = String(lead.fundingAmount || '').toLowerCase();
      const revenueVal = String(lead.annualRevenue || '').toLowerCase();
      const isEnterprise = 
        funding.includes('800k') || 
        funding.includes('million') || 
        revenueVal.includes('1m') || 
        lead.leadTier === 'A' || 
        lead.leadTier === 'B';

      if (isEnterprise) {
        pagesMap[pathKey].enterpriseLeadsCount++;
        enterpriseLeads.push(lead);

        const estValue = Number(lead.potentialFundingRange?.replace(/[^0-9]/g, '')) || 2500; // Estimated Filing Fee
        enterpriseTotalValue += estValue;

        const hasBooked = activity.bookedAudit === true || !!activity.auditBookedAt || lead.offlineStatus === 'Booked Audit' || lead.offlineStatus === 'Audit Completed';
        if (hasBooked) {
          enterpriseBookedCount++;
        }
        if (lead.offlineStatus === 'Won' || lead.offlineStatus === 'Filing Client') {
          enterpriseClosedCount++;
        }
      }
    });

    // Compute Dynamic Global AOV
    const globalAOV = totalPurchasesCount > 0 ? totalRevenueSum / totalPurchasesCount : 29.00;

    // Compile reports array
    const pagesReport = Object.entries(pagesMap).map(([page, stats]) => {
      const lostRevenue = Math.max(0, (stats.checkoutStarts - stats.purchases) * globalAOV);
      const conversionRate = stats.views > 0 ? (stats.purchases / stats.views) * 100 : 0;
      const recoveryRate = stats.checkoutStarts > 0 ? (stats.purchases / stats.checkoutStarts) * 100 : 0;
      const aov = stats.purchases > 0 ? stats.revenue / stats.purchases : 0;

      return {
        page,
        ...stats,
        lostRevenue,
        conversionRate,
        recoveryRate,
        aov
      };
    });

    // Obfuscate email helper
    const obfuscateEmail = (email: string) => {
      if (!email) return 'Anonymous';
      const parts = email.split('@');
      if (parts.length < 2) return 'Anonymous';
      const name = parts[0];
      return `${name.slice(0, 2)}***@${parts[1]}`;
    };

    // Sort page lists
    const topRevenuePages = [...pagesReport].sort((a, b) => b.revenue - a.revenue).slice(0, 5);
    const topAbandonedPages = [...pagesReport].filter(p => p.checkoutStarts > 0).sort((a, b) => b.lostRevenue - a.lostRevenue).slice(0, 5);
    const highestConverting = [...pagesReport].filter(p => p.views > 10).sort((a, b) => b.conversionRate - a.conversionRate).slice(0, 5);
    const lowestConverting = [...pagesReport].filter(p => p.views > 10).sort((a, b) => a.conversionRate - b.conversionRate).slice(0, 5);
    const highestAov = [...pagesReport].filter(p => p.purchases > 0).sort((a, b) => b.aov - a.aov).slice(0, 5);

    // Format Report Markdown
    const reportDate = new Date().toISOString().split('T')[0];
    const reportContent = `# FSI Digital — Weekly Commercial Revenue & Funnel Report
**Date:** ${reportDate} | **Attributes:** Sheets Database & Telemetry Store
**Objective:** $10,000+ MRR
**Dynamic AOV (Last 30 Days):** $${globalAOV.toFixed(2)}

---

## 📈 SITE CONVERSION FUNNEL METRICS

| Top Revenue Pages | Revenue | Purchases | AOV | Conversion Rate |
| :--- | :--- | :--- | :--- | :--- |
${topRevenuePages.map(p => `| \`${p.page}\` | $${p.revenue.toFixed(2)} | ${p.purchases} | $${p.aov.toFixed(2)} | ${p.conversionRate.toFixed(1)}% |`).join('\n')}

---

## 💸 ESTIMATED LOST REVENUE & LEAKAGE (TARGET FIRST)

| Page | Checkout Starts | Purchases | Est. Lost Revenue | Recovery % |
| :--- | :--- | :--- | :--- | :--- |
${topAbandonedPages.map(p => `| \`${p.page}\` | ${p.checkoutStarts} | ${p.purchases} | **$${p.lostRevenue.toFixed(2)}** | ${p.recoveryRate.toFixed(1)}% |`).join('\n')}

*Note: Lost revenue is calculated dynamically: \`Checkout Starts\` × \`Dynamic AOV ($${globalAOV.toFixed(2)})\`.*

---

## 📦 PRODUCT PERFORMANCE MATRIX

| Product | Revenue | Orders | Refunds | Recovery | Product AOV |
| :--- | :--- | :--- | :--- | :--- | :--- |
${Object.entries(productsMap).map(([id, stats]) => {
  const prodAov = stats.orders > 0 ? stats.revenue / stats.orders : getBasePrice(id);
  return `| ${stats.name} | $${stats.revenue.toFixed(2)} | ${stats.orders} | ${stats.refunds} | ${stats.recovered} | $${prodAov.toFixed(2)} |`;
}).join('\n')}

---

## 📧 RECOVERY CAMPAIGN EFFECTIVENESS

- **Cart Recovery Sequence:**
  - Cart Recovery Emails Sent: **${cartRecoverySent}**
  - Recovered Orders (Purchased): **${cartRecoveryRecovered}**
  - Recovery Campaign Conversion Rate: **${cartRecoverySent > 0 ? ((cartRecoveryRecovered / cartRecoverySent) * 100).toFixed(1) : '0.0'}%**

- **Calculator Recovery Sequence:**
  - Calculator Recovery Emails Sent: **${calcRecoverySent}**
  - Recovered Orders (Purchased): **${calcRecoveryRecovered}**
  - Recovery Campaign Conversion Rate: **${calcRecoverySent > 0 ? ((calcRecoveryRecovered / calcRecoverySent) * 100).toFixed(1) : '0.0'}%**

---

## 💎 ENTERPRISE PIPELINE STATUS (HIGH-TICKET DFY FILING)

- **Total B2B Enterprise Leads (> $800k):** ${enterpriseLeads.length} leads
- **Booked Strategy Sessions (Audit):** ${enterpriseBookedCount} booked
- **Closed Filing Clients (Won/Filing):** ${enterpriseClosedCount} signed
- **Filing Pipeline Estimated Deal Value:** **$${enterpriseTotalValue.toLocaleString()}**
- **Win Rate (Closed / Total Leads):** ${enterpriseLeads.length > 0 ? ((enterpriseClosedCount / enterpriseLeads.length) * 100).toFixed(1) : 0}%

### Active Enterprise Lead Ledger
| Lead ID | Lead Source | Industry | Province | Funding Need | Recommended Service | Stage | Owner |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${enterpriseLeads.map(lead => {
  const service = lead.leadTier === 'A' ? 'Grant Filing Service ($2.5k+)' : 'Strategy Session ($199)';
  return `| ${obfuscateEmail(lead.email)} | ${lead.source || 'Direct'} | ${lead.industry || 'other'} | ${lead.state || 'ON'} | ${lead.fundingAmount || 'N/A'} | ${service} | ${lead.offlineStatus || 'Lead'} | Ashwani K |`;
}).join('\n')}

---

## 🎯 PERFORMANCE PROFILE LEADERS

### Highest Converting Pages (Min 10 views)
${highestConverting.map((p, i) => `${i + 1}. \`${p.page}\` — **${p.conversionRate.toFixed(1)}%** (${p.purchases} sales / ${p.views} views)`).join('\n')}

### Lowest Converting Pages (Min 10 views)
${lowestConverting.map((p, i) => `${i + 1}. \`${p.page}\` — **${p.conversionRate.toFixed(1)}%** (${p.purchases} sales / ${p.views} views)`).join('\n')}

### Highest AOV Pages
${highestAov.map((p, i) => `${i + 1}. \`${p.page}\` — **$${p.aov.toFixed(2)}** (${p.purchases} purchases)`).join('\n')}
`;

    // Ensure reports directory exists
    const reportsDir = path.join(__dirname, 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const reportPath = path.join(reportsDir, 'weekly-revenue-report.md');
    fs.writeFileSync(reportPath, reportContent, 'utf-8');

    console.log(`\n✅ Weekly report written successfully to ${reportPath}\n`);
    console.log(reportContent);

  } catch (err) {
    console.error('❌ Failed to generate revenue report:', err);
  }
}

main().catch(console.error);
