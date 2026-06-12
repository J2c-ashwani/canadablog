import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/admin/auth"
import { applyRateLimit } from "@/lib/rate-limit"
import { NewsletterEngine } from "@/lib/leads/NewsletterEngine"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  // 1. Rate Limiting (30 requests/minute)
  const limitRes = applyRateLimit(request, 30, 60 * 1000)
  if (limitRes.isLimited) return limitRes.response

  // 2. Auth Check
  const adminSecret = process.env.LEAD_DASHBOARD_SECRET
  if (!adminSecret) {
    return NextResponse.json({ error: "Private dashboard access is not ready yet." }, { status: 500 })
  }

  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value

  if (!isValidAdminSession(sessionCookie, adminSecret)) {
    return NextResponse.json({ error: "Unauthorized session." }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { campaignType, programSlug, newProgramsCount, newProgramsList, missingFundingAmount } = body

    // Mock configuration object
    const mockConfig = {
      campaignId: "preview_mock",
      campaignType,
      programSlug,
      newProgramsCount: Number(newProgramsCount || 3),
      newProgramsList: newProgramsList || [],
      missingFundingAmount: missingFundingAmount || "$120,000",
      status: "idle" as const,
      sentCount: 0
    }

    // Mock recipient
    const mockSub = {
      email: "info@fsidigital.ca",
      name: "Alex",
      loginToken: "preview_token_123",
      companyName: "Apex Technology Solutions",
      region: "ON",
      industry: "technology"
    }

    let previewHtml = ""
    try {
      const g = global as any
      g.mockSendEmailActive = true
      let capturedHtml = ""
      g.mockSendEmailCallback = (params: any) => {
        capturedHtml = params.html
      }

      await NewsletterEngine.sendNewsletterToLead(mockConfig, mockSub as any)
      previewHtml = capturedHtml
      
      // Clean up
      g.mockSendEmailActive = false
      g.mockSendEmailCallback = undefined
    } catch (err) {
      previewHtml = `<div style="padding:20px;color:red;">Failed to compile preview template: ${err}</div>`
      const g = global as any
      g.mockSendEmailActive = false
      g.mockSendEmailCallback = undefined
    }

    return NextResponse.json({
      success: true,
      previewHtml
    })

  } catch (err: any) {
    console.error("Newsletter preview error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
