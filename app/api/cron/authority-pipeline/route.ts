import { NextResponse, type NextRequest } from "next/server";
import { isValidCronRequest } from "@/lib/admin/auth";
import { AuthorityEngine } from "@/lib/growth-os/authority/authority-engine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const dryRun = searchParams.get("dryRun") === "true";
    const force = searchParams.get("force") === "true";
    const limit = searchParams.get("limit");
    
    const maxSends = limit ? parseInt(limit, 10) : undefined;

    const result = await AuthorityEngine.executePipeline({
      dryRun,
      forceOutsideHours: force,
      maxSends
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error in Authority Engine pipeline:", error);
    return NextResponse.json({ error: "Internal Server Error", details: String(error) }, { status: 500 });
  }
}
