import { NextRequest, NextResponse } from "next/server";
import { getAllPurchases } from "@/lib/products/purchase-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== "fsi2026admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const allPurchases = await getAllPurchases();

    // Group purchases by customer email to calculate LTV and upgrade paths
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
          trafficSource: p.utmSource || p.referrer || "Organic / Direct",
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

    // Calculate Top Converting Landing Pages & Articles
    const landingPageRevenue: Record<string, { reportCount: number; upgradeCount: number; totalRevenueUsd: number }> = {};
    for (const cust of customers) {
      const page = cust.landingPage || "Direct / Organic";
      if (!landingPageRevenue[page]) {
        landingPageRevenue[page] = { reportCount: 0, upgradeCount: 0, totalRevenueUsd: 0 };
      }
      landingPageRevenue[page].reportCount += cust.purchases.length;
      if (cust.hasUpgraded) landingPageRevenue[page].upgradeCount += 1;
      landingPageRevenue[page].totalRevenueUsd += cust.totalLtv;
    }

    const topConvertingPages = Object.entries(landingPageRevenue)
      .map(([page, data]) => ({
        landingPage: page,
        totalSalesCount: data.reportCount,
        upgradesCount: data.upgradeCount,
        totalRevenueUsd: data.totalRevenueUsd,
      }))
      .sort((a, b) => b.totalRevenueUsd - a.totalRevenueUsd);

    // Calculate Conversion Ladder
    const totalCustomers = customers.length;
    const reportBuyersCount = customers.filter(c => c.purchases.some(p => p.productId === "funding-match-report")).length;
    const actionPlanBuyersCount = customers.filter(c => c.purchases.some(p => p.productId === "funding-roadmap" || p.productId === "action-plan")).length;
    const strategySessionBuyersCount = customers.filter(c => c.purchases.some(p => p.productId === "strategy-audit" || p.productId === "strategy-vip" || p.productId === "strategy-session")).length;

    const reportToActionPlanConversionRate = reportBuyersCount > 0 ? ((actionPlanBuyersCount / reportBuyersCount) * 100).toFixed(1) + "%" : "0%";
    const actionPlanToSessionConversionRate = actionPlanBuyersCount > 0 ? ((strategySessionBuyersCount / actionPlanBuyersCount) * 100).toFixed(1) + "%" : "0%";

    const totalRevenueUsd = customers.reduce((acc, c) => acc + c.totalLtv, 0);
    const avgLtvUsd = totalCustomers > 0 ? (totalRevenueUsd / totalCustomers).toFixed(2) : "0.00";

    return NextResponse.json({
      revenueSummary: {
        totalRevenueUsd,
        totalUniquePayingCustomers: totalCustomers,
        averageCustomerLtvUsd: avgLtvUsd,
        reportBuyersCount,
        actionPlanBuyersCount,
        strategySessionBuyersCount,
        reportToActionPlanConversionRate,
        actionPlanToSessionConversionRate,
      },
      topConvertingArticles: topConvertingPages,
      customerAttributionLedger: customers.map(c => ({
        name: c.name,
        email: c.email,
        totalLtvUsd: c.totalLtv,
        trafficSource: c.trafficSource,
        landingPage: c.landingPage,
        hasUpgraded: c.hasUpgraded,
        upgradeProduct: c.upgradeProduct || "N/A",
        daysToUpgrade: c.daysToUpgrade,
        purchasesCount: c.purchases.length,
        firstPurchaseDate: c.firstPurchaseDate,
      })),
    });
  } catch (err: any) {
    console.error("❌ Revenue attribution dashboard error:", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
