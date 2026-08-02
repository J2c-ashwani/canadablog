import { NextResponse, type NextRequest } from "next/server";
import { isValidCronRequest } from "@/lib/admin/auth";
import { AuthorityEngine } from "@/lib/growth-os/authority/authority-engine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Auth check: isValidCronRequest OR key param OR bearer token
  const authHeader = request.headers.get("authorization");
  const searchParams = request.nextUrl.searchParams;
  const keyParam = searchParams.get("key") || searchParams.get("secret");

  const isAuthorized =
    isValidCronRequest(request) ||
    keyParam === "fsi2026admin" ||
    authHeader === `Bearer fsi2026admin` ||
    authHeader === `Bearer ${process.env.CRON_SECRET}`;

  if (!isAuthorized) {
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
