import { NextResponse } from "next/server";
import { AuthorityMetrics } from "@/lib/growth-os/authority/authority-metrics";
import { isValidCronRequest } from "@/lib/admin/auth";

export async function GET(request: Request) {
  if (!isValidCronRequest(request)) {
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
