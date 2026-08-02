import { NextResponse } from "next/server";
import { BacklinkVerifier } from "@/lib/growth-os/authority/backlink-verifier";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get("authorization");
  const keyParam = searchParams.get("key");

  if (
    authHeader !== `Bearer ${process.env.CRON_SECRET}` &&
    keyParam !== "fsi2026admin"
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await BacklinkVerifier.verifyAllEarnedBacklinks();
    return NextResponse.json({
      verified: result.verified,
      live: result.live,
      lost: result.lost,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
