import { NextResponse, type NextRequest } from "next/server";
import { isValidCronRequest } from "@/lib/admin/auth";
import { OpportunityDiscovery } from "@/lib/growth-os/authority/opportunity-discovery";
import { OpportunityQualifier } from "@/lib/growth-os/authority/opportunity-qualifier";
import { seedOutreachProspects, type OutreachProspect } from "@/lib/google-sheets";
import type { AuthorityCategory } from "@/lib/growth-os/authority/types";
import { acquireOperationLease, finishOperationLease } from '@/lib/growth-os/operations-store';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Cron route for autonomous authority opportunity discovery and qualification.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  if (!isValidCronRequest(request)) {
      return NextResponse.json({ error: "Unauthorized request" }, { status: 401 });
  }
  const lease = await acquireOperationLease('authority-discovery', 6 * 60 * 60 * 1000);
  if (!lease.acquired) return NextResponse.json({ success: true, skipped: true, reason: lease.reason });

  try {

    const categoryParam = searchParams.get("category");
    const category = categoryParam ? (categoryParam as AuthorityCategory) : undefined;
    const limit = parseInt(searchParams.get("limit") || "5", 10);

    // Call OpportunityDiscovery.discoverOpportunities()
    const discoveredOpps = await OpportunityDiscovery.discoverOpportunities(category, limit);

    // Call OpportunityQualifier.qualifyBatch()
    const qualifiedOpps = OpportunityQualifier.qualifyBatch(discoveredOpps);

    // Filter to auto_outreach tier (ROI >= 55)
    const autoOutreachOpps = qualifiedOpps.filter(
      (opp) => opp.score.recommendedAction === "auto_outreach" || opp.score.estimatedROI >= 55
    );

    // Map to OutreachProspect format for Google Sheets
    // Do not invent contact@ addresses. A prospect without a discovered public
    // address remains a research opportunity and is never queued for sending.
    const contactableOpps = autoOutreachOpps.filter((opp) => Boolean(opp.email));
    const sheetProspects: Omit<OutreachProspect, "rowIndex">[] = contactableOpps.map((opp) => ({
      website: opp.website,
      prospectName: opp.prospectName,
      email: opp.email!,
      targetPage: opp.targetPage,
      name: opp.prospectName,
      personalizedHook: opp.metadata?.siteDescription || `Discovered resource on ${opp.website}`,
      status: "review_required",
      sentAt: null,
      deliveryStatus: null,
      replied: false,
      positiveConversation: false,
      backlinkEarned: false,
      prospectId: opp.id,
      campaignId: `authority_discovery_${opp.category}`,
      source: "serper_search_result",
      sourceUrl: opp.targetPage,
      createdAt: opp.discoveredAt,
    }));

    let savedToSheet = 0;
    if (sheetProspects.length > 0) {
      const save = await seedOutreachProspects(sheetProspects);
      if (!save.success) throw save.error || new Error('Authority prospects could not be durably saved.');
      savedToSheet = save.inserted || 0;
    }

    const summary = {
      discovered: discoveredOpps.length,
      qualified: qualifiedOpps.length,
      contactable: contactableOpps.length,
      savedToSheet,
    };
    await finishOperationLease(lease, 'SUCCEEDED', summary);
    return NextResponse.json({
      success: true,
      summary,
    });
  } catch (error: any) {
    await finishOperationLease(lease, 'FAILED', { error: error?.message || String(error) });
    console.error("Error in discover-authority-opportunities cron:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
