import { NextRequest, NextResponse } from "next/server";
import { getAllPurchases } from "@/lib/products/purchase-store";
import { isValidAdminRequest } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isValidAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized access to fulfillment audit" }, { status: 401 });
  }

  try {
    const allPurchases = await getAllPurchases();
    const todayStr = new Date().toISOString().split("T")[0];

    const todayPurchases = allPurchases.filter(p => (p.createdAt || "").startsWith(todayStr));
    const totalOrders = allPurchases.length;
    const ordersTodayCount = todayPurchases.length;

    const providerVerifiedCount = allPurchases.filter(p => p.paymentStatus === "provider_capture_verified").length;
    const deliveredCount = allPurchases.filter(p => p.deliveryStatus === "delivered").length;
    const acceptedForDeliveryCount = allPurchases.filter(p => p.deliveryStatus === "provider_accepted").length;
    const failedCount = allPurchases.filter(p => p.status === "pending_review" || p.deliveryStatus === "retry_pending").length;
    const historicalManualRecordCount = allPurchases.filter(
      p => p.landingPage?.includes("admin_manual_dispatch") || p.paypalOrderId?.startsWith("MANUAL-")
    ).length;

    const deliveryRate = providerVerifiedCount > 0
      ? ((deliveredCount / providerVerifiedCount) * 100).toFixed(1) + "%"
      : "N/A";

    const auditTrail = allPurchases.map(p => ({
      purchaseId: p.purchaseId,
      paypalOrderId: p.paypalOrderId,
      customerName: p.name,
      email: p.email,
      productId: p.productId,
      amount: p.amount,
      createdAt: p.createdAt,
      status: p.status,
      accessToken: p.accessToken ? `${p.accessToken.substring(0, 8)}...` : "N/A",
      pipelineSteps: [
        { step: "Provider capture", status: p.paymentStatus === "provider_capture_verified" ? "VERIFIED" : "UNVERIFIED", timestamp: p.createdAt },
        { step: "PayPal capture ID", status: p.paypalCaptureId ? "RECORDED" : "MISSING", timestamp: p.createdAt },
        { step: "Entitlement", status: p.status === "completed" ? "RECORDED" : "UNKNOWN", timestamp: p.createdAt },
        { step: "Access Token Generation", status: p.accessToken ? "PASS" : "FAIL", timestamp: p.createdAt },
        { step: "Delivery email", status: p.deliveryStatus || "UNKNOWN", timestamp: p.createdAt },
        { step: "CRM sync", status: "NOT_PROVEN_BY_THIS_LEDGER", timestamp: p.createdAt },
      ],
    }));

    return NextResponse.json({
      summary: {
        systemStatus: "EVIDENCE_BASED",
        architectureMode: "Provider capture → durable ledger → entitlement → delivery event",
        ordersTotal: totalOrders,
        ordersToday: ordersTodayCount,
        providerVerifiedTotal: providerVerifiedCount,
        deliveredTotal: deliveredCount,
        providerAcceptedTotal: acceptedForDeliveryCount,
        deliverySuccessRate: deliveryRate,
        avgDeliveryTimeSec: "NOT_MEASURED",
        failedOrdersCount: failedCount,
        historicalManualRecordCount,
        manualInterventionRequired: "NOT_MEASURED",
      },
      auditTrail,
    });
  } catch (err: any) {
    console.error("❌ Fulfillment audit route error:", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
