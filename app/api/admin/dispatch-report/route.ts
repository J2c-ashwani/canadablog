import { type NextRequest, NextResponse } from "next/server";
import { recordPurchase } from "@/lib/products/purchase-store";
import { grantEntitlements } from "@/lib/products/entitlements";
import { sendEmail } from "@/lib/emails/mailer";
import { buildPurchaseEmail } from "@/lib/emails/product-purchase";
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository";
import { ensureScopedSubscriberTokens } from "@/lib/leads/SubscriberRepository";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const adminKey = searchParams.get("key");
  const email = searchParams.get("email");
  const name = searchParams.get("name") || "Chintan Kakani";
  const productId = searchParams.get("product") || "funding-match-report";
  const amount = searchParams.get("amount") || "19.00";
  const orderId = searchParams.get("order") || `MANUAL-${Date.now()}`;

  if (adminKey !== "fsi2026admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email parameter required" }, { status: 400 });
  }

  try {
    const profileData = {
      province: searchParams.get("province") || "ON",
      industry: searchParams.get("industry") || "E-commerce and SaaS",
      revenue: "startup",
      goal: "E-commerce setup and marketing",
    };

    // 1. Record purchase
    const purchase = await recordPurchase({
      email,
      name,
      productId,
      amount,
      paypalOrderId: orderId,
      profileData,
      attribution: { utmSource: "admin_manual_dispatch" },
    });

    // 2. Grant Entitlements
    await grantEntitlements({
      purchaseId: purchase.purchaseId,
      email,
      productId,
      orderId,
    });

    // 3. Update CRM
    await SubscriberRepository.updateSubscriberPreferences(email, {
      reportPurchased: true,
      reportTransactionId: orderId,
      offlineStatus: "Report Buyer",
      leadActivity: JSON.stringify({
        paymentCompletedAt: new Date().toISOString(),
        purchasedProductId: productId,
        manualDispatch: true,
      }),
    });

    // 4. Ensure Token
    const tokens = await ensureScopedSubscriberTokens(email);
    const accessToken = purchase.accessToken || tokens?.loginToken || "token_manual_access";

    // 5. Build and Send Email
    const emailContent = buildPurchaseEmail({
      name,
      email,
      accessToken,
      paypalOrderId: orderId,
      productName: "Funding Match Report ($19 USD)",
      amount,
    });

    const emailResult = await sendEmail({
      to: email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
      tagType: "product_purchase",
    });

    return NextResponse.json({
      success: true,
      emailSent: emailResult.success,
      accessToken,
      reportUrl: `https://www.fsidigital.ca/products/report?token=${accessToken}`,
      downloadUrl: `https://www.fsidigital.ca/api/products/download-pdf?token=${accessToken}`,
      message: `Report successfully dispatched to ${email}`,
    });
  } catch (err: any) {
    console.error("❌ Admin manual dispatch failed:", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
