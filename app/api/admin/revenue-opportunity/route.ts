import { NextRequest, NextResponse } from "next/server";
import { getAllPurchases } from "@/lib/products/purchase-store";
import { isValidAdminRequest } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isValidAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const allPurchases = (await getAllPurchases()).filter(
      (purchase) => ['provider_capture_verified', 'stripe_payment_verified'].includes(purchase.paymentStatus || '')
    );

    // Group purchases by customer
    const customerMap: Record<string, {
      name: string;
      email: string;
      purchases: any[];
      hasReport: boolean;
      hasActionPlan: boolean;
      hasStrategySession: boolean;
      latestPurchaseDate: string;
    }> = {};

    for (const p of allPurchases) {
      const emailKey = p.email.toLowerCase().trim();
      if (!customerMap[emailKey]) {
        customerMap[emailKey] = {
          name: p.name || "Customer",
          email: p.email,
          purchases: [],
          hasReport: false,
          hasActionPlan: false,
          hasStrategySession: false,
          latestPurchaseDate: p.createdAt,
        };
      }

      const cust = customerMap[emailKey];
      cust.purchases.push(p);

      if (p.productId === "funding-match-report") cust.hasReport = true;
      if (p.productId === "funding-roadmap" || p.productId === "action-plan") cust.hasActionPlan = true;
      if (["strategy-audit", "strategy-vip", "strategy-session"].includes(p.productId)) cust.hasStrategySession = true;
    }

    const customers = Object.values(customerMap);

    // Pipeline Bucket 1: $19 Report Buyers NOT Upgraded to $49 Action Plan
    const reportOnlyCustomers = customers.filter(c => c.hasReport && !c.hasActionPlan && !c.hasStrategySession);
    const reportToPlanPotentialUsd = reportOnlyCustomers.length * 30; // $30 net upgrade

    // Pipeline Bucket 2: $49 Action Plan Buyers NOT Booked for $199 Strategy Session
    const actionPlanOnlyCustomers = customers.filter(c => c.hasActionPlan && !c.hasStrategySession);
    const planToSessionPotentialUsd = actionPlanOnlyCustomers.length * 150; // $150 net upgrade ($199 - $49 credit)

    // No unverified lead count or invented names may be presented as pipeline.
    const qualifiedLeadCount = 0;
    const highTicketFilingPotentialUsd = 0;

    const totalOpenRevenuePipelineUsd = reportToPlanPotentialUsd + planToSessionPotentialUsd + highTicketFilingPotentialUsd;

    return NextResponse.json({
      revenueOpportunitySummary: {
        totalOpenPipelineUsd: totalOpenRevenuePipelineUsd,
        currency: "USD",
        calculatedAt: new Date().toISOString(),
      },
      pipelineBuckets: [
        {
          stage: "$19 Report Buyers (Not Upgraded to $49 Action Plan)",
          customerCount: reportOnlyCustomers.length,
          potentialRevenuePerLeadUsd: 30,
          totalBucketPotentialUsd: reportToPlanPotentialUsd,
          actionRequired: "Send $19 -> $49 Upgrade Email Sequence with $19 credit applied",
          targetLeads: reportOnlyCustomers.map(c => ({ name: c.name, email: c.email })),
        },
        {
          stage: "$49 Action Plan Buyers (Not Booked $199 Strategy Session)",
          customerCount: actionPlanOnlyCustomers.length,
          potentialRevenuePerLeadUsd: 150,
          totalBucketPotentialUsd: planToSessionPotentialUsd,
          actionRequired: "Send 1-on-1 Founder Strategy Consultation Outreach with 100% credit",
          targetLeads: actionPlanOnlyCustomers.map(c => ({ name: c.name, email: c.email })),
        },
        {
          stage: "High-Intent Qualified Leads (Target for $2,500+ Grant Filing)",
          customerCount: qualifiedLeadCount,
          potentialRevenuePerLeadUsd: 2500,
          totalBucketPotentialUsd: highTicketFilingPotentialUsd,
          actionRequired: "Direct Founder Sales Call / Filing Service Proposal",
          targetLeads: [],
        },
      ],
    });
  } catch (err: any) {
    console.error("❌ Revenue Opportunity Dashboard error:", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
