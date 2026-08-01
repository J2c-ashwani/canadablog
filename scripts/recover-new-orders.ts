import dotenv from "dotenv";
dotenv.config({ path: ".env.production.local" });
import { verifyPayPalOrder } from "@/lib/payments/paypal";
import { recordPurchase, getAllPurchases } from "@/lib/products/purchase-store";
import { grantEntitlements } from "@/lib/products/entitlements";
import { sendEmail } from "@/lib/emails/mailer";
import { buildPurchaseEmail } from "@/lib/emails/product-purchase";

async function processOrder(orderId: string, expectedAmount: string, productId: string) {
  console.log(`\n==================================================`);
  console.log(`Processing Order ${orderId}...`);
  console.log(`==================================================`);

  // Check if already in purchases
  const purchases = await getAllPurchases();
  const existing = purchases.find((p: any) => p.paypalOrderId === orderId);
  if (existing) {
    console.log(`✅ Order ${orderId} is ALREADY in Google Sheets: ${existing.purchaseId}`);
    console.log(`   Email: ${existing.email} | AccessToken: ${existing.accessToken}`);
    return existing;
  }

  // Verify with PayPal API
  const ver = await verifyPayPalOrder(orderId, expectedAmount);
  console.log(`PayPal Verification Result for ${orderId}:`, JSON.stringify(ver, null, 2));

  const orderData = ver.orderData || {};
  const payerEmail = orderData.payer?.email_address || "customer@fsidigital.ca";
  const payerName = `${orderData.payer?.name?.given_name || ""} ${orderData.payer?.name?.surname || ""}`.trim() || "Valued Customer";

  console.log(`Recording purchase to Google Sheets for ${payerEmail} (${payerName})...`);
  const purchase = await recordPurchase({
    email: payerEmail,
    name: payerName,
    productId: productId,
    amount: expectedAmount,
    paypalOrderId: orderId,
    profileData: { province: "ON", industry: "other", revenue: "pre-revenue", goal: "expansion" },
    attribution: { referrer: "direct", landingPage: "/calculator" },
    status: ver.verified ? "completed" : "pending_review"
  });

  console.log(`✅ Recorded in Google Sheets! Purchase ID: ${purchase.purchaseId}`);

  await grantEntitlements({
    purchaseId: purchase.purchaseId,
    email: payerEmail,
    productId: productId,
    orderId: orderId
  });

  console.log(`✅ Entitlements granted! Delivery URL: https://fsidigital.ca/products/report?token=${purchase.accessToken}`);
  return purchase;
}

async function run() {
  await processOrder("6LU31970NG3464453", "19.00", "funding-match-report");
  await processOrder("0U3930093L744772K", "19.00", "funding-match-report");
}

run().catch(console.error);
