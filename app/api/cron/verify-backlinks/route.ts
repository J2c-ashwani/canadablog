import { NextResponse } from "next/server";
import { BacklinkVerifier } from "@/lib/growth-os/authority/backlink-verifier";
import { isValidCronRequest } from "@/lib/admin/auth";

export async function GET(request: Request) {
  if (!isValidCronRequest(request)) {
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
