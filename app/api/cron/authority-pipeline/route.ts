import { NextResponse, type NextRequest } from "next/server";
import { isValidCronRequest } from "@/lib/admin/auth";
import { AuthorityEngine } from "@/lib/growth-os/authority/authority-engine";
import { acquireOperationLease, finishOperationLease } from '@/lib/growth-os/operations-store';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const force = searchParams.get("force") === "true";
  if (force && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Forced authority outreach is disabled in production.' }, { status: 403 });
  }
  const lease = await acquireOperationLease('authority-outreach', 45 * 60 * 1000);
  if (!lease.acquired) return NextResponse.json({ success: true, skipped: true, reason: lease.reason });

  try {
    const dryRun = searchParams.get("dryRun") === "true";
    const limit = searchParams.get("limit");
    
    const maxSends = Math.min(Math.max(limit ? parseInt(limit, 10) : 3, 1), 5);

    const result = await AuthorityEngine.executePipeline({
      dryRun,
      forceOutsideHours: force,
      maxSends
    });

    const failed = result.errors.length > 0;
    await finishOperationLease(lease, failed ? 'PARTIAL' : 'SUCCEEDED', result);
    return NextResponse.json({ success: !failed, ...result }, { status: failed ? 502 : 200 });
  } catch (error: any) {
    await finishOperationLease(lease, 'FAILED', { error: error?.message || String(error) });
    console.error("Error in Authority Engine pipeline:", error);
    return NextResponse.json({ error: "Internal Server Error", details: String(error) }, { status: 500 });
  }
}
