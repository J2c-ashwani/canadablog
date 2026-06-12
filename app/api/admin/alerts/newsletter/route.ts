import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/admin/auth"
import { applyRateLimit } from "@/lib/rate-limit"
import { NewsletterEngine, type NewsletterCampaignConfig } from "@/lib/leads/NewsletterEngine"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import {
  sendNewFundingAlertEmail,
  sendFundingMatchUpdateEmail,
  sendMissingFundingAlertEmail
} from "@/lib/emails/newsletter-marketing"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  // 1. Rate Limiting (20 requests/minute)
  const limitRes = applyRateLimit(request, 20, 60 * 1000)
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
    const config = await NewsletterEngine.getCampaignConfig()
    const allSubs = await SubscriberRepository.getAllSubscribers()
    const targetLeads = await NewsletterEngine.getTargetLeadsForCampaign(config, allSubs)

    // Calculate progress statistics
    let sentCount = 0
    let pendingCount = 0

    targetLeads.forEach(sub => {
      let activity: any = {}
      try {
        if (sub.leadActivity && sub.leadActivity !== "N/A" && sub.leadActivity !== "{}") {
          activity = JSON.parse(sub.leadActivity)
        }
      } catch (e) {
        // ignore
      }

      if (activity.lastNewsletterCampaignId === config.campaignId) {
        sentCount++
      } else {
        pendingCount++
      }
    })

    // Also update the sheets config sentCount value for consistency
    if (config.status === "running" && sentCount !== config.sentCount) {
      config.sentCount = sentCount
      if (pendingCount === 0 && targetLeads.length > 0) {
        config.status = "completed"
      }
      await NewsletterEngine.saveCampaignConfig(config)
    }

    // Generate HTML preview for a sample lead
    const sampleSub = targetLeads[0] || {
      email: "info@fsidigital.ca",
      name: "Alex",
      loginToken: "sample_token_123",
      companyName: "Apex Enterprises",
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

      await NewsletterEngine.sendNewsletterToLead(config, sampleSub as any)
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
      config,
      stats: {
        totalTargets: targetLeads.length,
        sentCount,
        pendingCount
      },
      previewHtml
    })

  } catch (err: any) {
    console.error("GET newsletter campaign error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // 1. Rate Limiting (20 requests/minute)
  const limitRes = applyRateLimit(request, 20, 60 * 1000)
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

    if (!campaignType) {
      return NextResponse.json({ error: "campaignType is required" }, { status: 400 })
    }

    // Generate unique Campaign ID based on type and timestamp
    const campaignId = `${campaignType}_campaign_${Date.now()}`

    const newConfig: NewsletterCampaignConfig = {
      campaignId,
      campaignType,
      programSlug: programSlug || "",
      newProgramsCount: Number(newProgramsCount || 3),
      newProgramsList: newProgramsList || [],
      missingFundingAmount: missingFundingAmount || "$120,000",
      status: "running",
      startedAt: new Date().toISOString(),
      sentCount: 0
    }

    await NewsletterEngine.saveCampaignConfig(newConfig)

    return NextResponse.json({
      success: true,
      message: "Newsletter campaign initialized and launched.",
      config: newConfig
    })

  } catch (err: any) {
    console.error("POST newsletter campaign error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
