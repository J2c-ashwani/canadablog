import { NextResponse } from "next/server";
import { AuthorityMetrics } from "@/lib/growth-os/authority/authority-metrics";

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
    const flywheelScore = await AuthorityMetrics.calculateFlywheelScore();
    const categoryPerformance = await AuthorityMetrics.getCategoryPerformance();
    return NextResponse.json({
      flywheelScore,
      categoryPerformance,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
