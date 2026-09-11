import { config } from "dotenv";
import path from "path";
config({ path: path.join(__dirname, "../.env.local") });

import { getLeadsFromSheet } from "../lib/google-sheets";
import { getAllPurchases } from "../lib/products/purchase-store";
import { getAllProductPaymentIntents } from "../lib/payments/product-payment-intents";

function isInternalOrTestEmail(email: string): boolean {
  const norm = (email || "").toLowerCase().trim();
  return (
    !norm ||
    !norm.includes("@") ||
    norm.includes("example.com") ||
    norm.includes("test.com") ||
    norm.includes("antigravity") ||
    norm.endsWith("@fsidigital.ca") ||
    norm.endsWith("@join2campus.com")
  );
}

async function auditRevenue() {
  console.log(`\n======================================================`);
  console.log(`  FSI DIGITAL — CEO REVENUE TRUTH LEDGER`);
  console.log(`  Target Date: September 25, 2026 | Goal: $10,000 MRR`);
  console.log(`======================================================\n`);

  try {
    const [leads, purchases, intents] = await Promise.all([
      getLeadsFromSheet(1000).catch((err) => {
        console.warn("⚠️ Failed to load Leads sheet:", err?.message);
        return [];
      }),
      getAllPurchases().catch((err) => {
        console.warn("⚠️ Failed to load Product Purchases sheet:", err?.message);
        return [];
      }),
      getAllProductPaymentIntents().catch((err) => {
        console.warn("⚠️ Failed to load Payment Intents sheet:", err?.message);
        return [];
      }),
    ]);

    // 1. Filter external purchases
    const externalPurchases = purchases.filter((p) => !isInternalOrTestEmail(p.email));
    
    // Verified orders have a provider capture ID or verified payment status
    const verifiedPurchases = externalPurchases.filter(
      (p) =>
        (p.paypalCaptureId && p.paypalCaptureId !== "N/A" && p.paypalCaptureId !== "") ||
        p.paymentStatus === "provider_capture_verified" ||
        (p.status === "completed" && p.paypalOrderId && p.paypalOrderId !== "N/A")
    );

    const unverifiedPurchases = externalPurchases.filter(
      (p) => !verifiedPurchases.includes(p)
    );

    // Calculate total verified gross revenue
    let totalVerifiedRevenue = 0;
    let mtdRevenue = 0;
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    for (const p of verifiedPurchases) {
      const amt = parseFloat(p.amount) || 0;
      totalVerifiedRevenue += amt;

      const pDate = new Date(p.createdAt);
      if (!isNaN(pDate.getTime())) {
        if (pDate.getMonth() === currentMonth && pDate.getFullYear() === currentYear) {
          mtdRevenue += amt;
        }
      }
    }

    // 2. Pending Payment Intents
    const externalIntents = intents.filter((i) => !isInternalOrTestEmail(i.email));
    const pendingIntents = externalIntents.filter(
      (i) => i.status === "created" && (!i.captureId || i.captureId === "N/A")
    );

    // 3. Active Leads
    const externalLeads = leads.filter((l: any) => !isInternalOrTestEmail(l.email));

    // 4. Target & Pace calculations
    const SEPTEMBER_TARGET = 10000;
    const TARGET_DATE = new Date("2026-09-25T23:59:59Z").getTime();
    const now = Date.now();
    const daysRemaining = Math.max(1, Math.ceil((TARGET_DATE - now) / (1000 * 60 * 60 * 24)));
    const gapToTarget = Math.max(0, SEPTEMBER_TARGET - mtdRevenue);
    const dailyRequiredPace = (gapToTarget / daysRemaining).toFixed(2);

    // 5. Output exact CEO Truth Ledger metrics block
    console.log(`Verified One-Time Revenue: $${totalVerifiedRevenue.toFixed(2)} USD`);
    console.log(`Verified Subscription MRR: $0.00 USD`);
    console.log(`September One-Time Revenue: $${mtdRevenue.toFixed(2)} USD`);
    console.log(`September Total Captured Revenue: $${mtdRevenue.toFixed(2)} USD`);
    console.log(`Verified Orders: ${verifiedPurchases.length}`);
    console.log(`Pending Payment Intents: ${pendingIntents.length}`);
    console.log(`Unverified Client Orders: ${unverifiedPurchases.length}`);
    console.log(`Active Leads: ${externalLeads.length}`);
    console.log(`September Revenue Target: $${SEPTEMBER_TARGET.toFixed(2)} USD`);
    console.log(`Daily Required Pace: $${dailyRequiredPace} USD/day (over ${daysRemaining} days remaining)`);
    console.log(`Gap to Target: $${gapToTarget.toFixed(2)} USD`);
    console.log(`======================================================\n`);

    if (verifiedPurchases.length > 0) {
      console.log(`📜 Verified External Purchases:`);
      verifiedPurchases.forEach((p, idx) => {
        console.log(`   ${idx + 1}. ${p.email} | $${p.amount} | ${p.productId} | Date: ${p.createdAt} | Capture: ${p.paypalCaptureId || p.paypalOrderId}`);
      });
      console.log(``);
    } else {
      console.log(`ℹ️  No external purchases recorded yet in the current observation window.\n`);
    }

  } catch (err: any) {
    console.error("❌ Ledger audit error:", err?.message || err);
    process.exit(1);
  }
}

if (require.main === module) {
  auditRevenue();
}
