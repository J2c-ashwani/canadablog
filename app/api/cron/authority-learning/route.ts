import { NextResponse } from "next/server";
import { AuthorityMetrics } from "@/lib/growth-os/authority/authority-metrics";
import { isValidCronRequest } from "@/lib/admin/auth";

async function handleAuthorityLearning(request: Request) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized: Missing or invalid secret credentials" }, { status: 401 });
  }

  try {
    const flywheelScore = await AuthorityMetrics.calculateFlywheelScore();
    const categoryPerformance = await AuthorityMetrics.getCategoryPerformance();
    return NextResponse.json({
      success: true,
      flywheelScore,
      categoryPerformance,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Cron Authority Learning] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return handleAuthorityLearning(request);
}

export async function POST(request: Request) {
  return handleAuthorityLearning(request);
}
