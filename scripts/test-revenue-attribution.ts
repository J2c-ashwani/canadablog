import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { getAllPurchases } from '../lib/products/purchase-store';

async function run() {
  console.log("==========================================================================");
  console.log("  FSI DIGITAL — REVENUE ATTRIBUTION DASHBOARD ANALYTICS");
  console.log("==========================================================================");
  console.log(`Generated At: ${new Date().toISOString()}\n`);

  const allPurchases = await getAllPurchases();

  const customerMap: Record<string, {
    name: string;
    email: string;
    purchases: any[];
    totalLtv: number;
    trafficSource: string;
    landingPage: string;
    firstPurchaseDate: string;
    latestPurchaseDate: string;
    daysToUpgrade: number;
    hasUpgraded: boolean;
    upgradeProduct?: string;
  }> = {};

  for (const p of allPurchases) {
    const emailKey = p.email.toLowerCase().trim();
    const amount = parseFloat(p.amount || "0");

    if (!customerMap[emailKey]) {
      customerMap[emailKey] = {
        name: p.name || "Customer",
        email: p.email,
        purchases: [],
        totalLtv: 0,
        trafficSource: p.utmSource || p.referrer || "Organic Search / Direct",
        landingPage: p.landingPage || "/blog/canada-federal-grants",
        firstPurchaseDate: p.createdAt,
        latestPurchaseDate: p.createdAt,
        daysToUpgrade: 0,
        hasUpgraded: false,
      };
    }

    const cust = customerMap[emailKey];
    cust.purchases.push(p);
    cust.totalLtv += amount;

    if (cust.purchases.length > 1) {
      cust.hasUpgraded = true;
      cust.upgradeProduct = p.productId;
      cust.latestPurchaseDate = p.createdAt;
      const d1 = new Date(cust.firstPurchaseDate).getTime();
      const d2 = new Date(p.createdAt).getTime();
      cust.daysToUpgrade = Math.round(Math.max(0, d2 - d1) / (1000 * 60 * 60 * 24));
    }
  }

  const customers = Object.values(customerMap);

  const totalCustomers = customers.length;
  const totalRevenueUsd = customers.reduce((acc, c) => acc + c.totalLtv, 0);
  const avgLtvUsd = totalCustomers > 0 ? (totalRevenueUsd / totalCustomers).toFixed(2) : "0.00";

  const reportBuyersCount = customers.filter(c => c.purchases.some(p => p.productId === "funding-match-report")).length;
  const actionPlanBuyersCount = customers.filter(c => c.purchases.some(p => p.productId === "funding-roadmap" || p.productId === "action-plan")).length;
  const strategySessionBuyersCount = customers.filter(c => c.purchases.some(p => p.productId === "strategy-audit" || p.productId === "strategy-vip" || p.productId === "strategy-session")).length;

  console.log(`📊 REVENUE SUMMARY:`);
  console.log(`   - Total Revenue: $${totalRevenueUsd.toFixed(2)} USD`);
  console.log(`   - Unique Paying Customers: ${totalCustomers}`);
  console.log(`   - Average Customer LTV: $${avgLtvUsd} USD`);
  console.log(`   - $19 Report Buyers: ${reportBuyersCount}`);
  console.log(`   - $49 Action Plan Buyers: ${actionPlanBuyersCount}`);
  console.log(`   - $199 Strategy Session Buyers: ${strategySessionBuyersCount}\n`);

  console.log(`📈 CONVERSION LADDER:`);
  console.log(`   - $19 Report ➔ $49 Action Plan Conversion: ${reportBuyersCount > 0 ? ((actionPlanBuyersCount / reportBuyersCount) * 100).toFixed(1) + "%" : "0%"}`);
  console.log(`   - $49 Action Plan ➔ $199 Strategy Session Conversion: ${actionPlanBuyersCount > 0 ? ((strategySessionBuyersCount / actionPlanBuyersCount) * 100).toFixed(1) + "%" : "0%"}\n`);

  console.log(`👤 CUSTOMER ATTRIBUTION LEDGER:`);
  customers.forEach((c, idx) => {
    console.log(`   ${idx + 1}. ${c.name} (${c.email})`);
    console.log(`      LTV: $${c.totalLtv.toFixed(2)} USD | Source: ${c.trafficSource} | Landing: ${c.landingPage}`);
    console.log(`      Upgraded: ${c.hasUpgraded ? `YES (${c.upgradeProduct}) in ${c.daysToUpgrade} days` : "NO"}`);
  });
  console.log("==========================================================================");
}

run().catch(console.error);
