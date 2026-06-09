import { type NextRequest, NextResponse } from "next/server"
import { processGrantFinderRequest, type GrantFinderRequest } from "@/lib/ai-grant-matcher"
import { appendLeadToSheet } from "@/lib/google-sheets"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as GrantFinderRequest & {
      consentToPartnerContact?: boolean
      pagePath?: string
      utmSource?: string
      utmMedium?: string
      utmCampaign?: string
      gaClientId?: string
      readinessScore?: number
      readinessBand?: string
      companySize?: string
      fundingInterests?: string[]
      name?: string
      companyName?: string
      website?: string
      source?: string
    }

    // Validate required fields
    if (!body.country || !body.industry || !body.businessStage || !body.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const leadSource = body.source || "AI Grant Finder"
    const timestamp = new Date().toISOString()

    const unsubscribeToken = crypto.randomBytes(16).toString("hex")
    const loginToken = crypto.randomBytes(16).toString("hex")

    // Save lead to Google Sheets with source tracking
    appendLeadToSheet({
      source: leadSource, // 🎯 SOURCE TRACKING
      timestamp,
      email: body.email,
      name: body.name || "",
      companyName: body.companyName || "",
      website: body.website || "",
      country: body.country,
      phone: body.phone || "N/A",
      state: body.state || "",
      industry: body.industry,
      businessStage: body.businessStage,
      fundingAmount: body.fundingAmount || "",
      fundingPurpose: body.fundingPurpose || "",
      businessDescription: body.businessDescription || "",
      consentToPartnerContact: !!body.consentToPartnerContact,
      pagePath: body.pagePath || request.headers.get("referer") || "N/A",
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "N/A",
      userAgent: request.headers.get("user-agent") || "N/A",
      utmSource: body.utmSource,
      utmMedium: body.utmMedium,
      utmCampaign: body.utmCampaign,
      gaClientId: body.gaClientId,
      offlineStatus: "Lead",
      companySize: body.companySize,
      fundingInterests: body.fundingInterests,
      readinessScore: body.readinessScore,
      readinessBand: body.readinessBand,
      unsubscribeToken,
      loginToken,
      subscriptionStatus: "inactive",
      subscriptionId: "N/A",
      trialStartedAt: "N/A",
    }).catch((error) => {
      console.error("❌ Failed to save lead to Google Sheets:", error)
    })

    // Dispatch welcome follow-up email if Sender.net is configured
    const senderApiKey = process.env.SENDER_API_KEY
    if (senderApiKey && body.email) {
      const senderFromEmail = process.env.SENDER_FROM_EMAIL || "hello@fsidigital.ca"
      const senderFromName = process.env.SENDER_FROM_NAME || "FSI Digital"
      const firstName = (body.name || "").split(" ")[0] || "Founder"
      
      let emailBody = ""
      let subject = ""

      if (body.readinessScore !== undefined) {
        subject = `[Funding Assessment] Your Readiness Score: ${body.readinessScore}/100`
        emailBody = `
          <div style="font-family: sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">FSI Funding Intelligence</h2>
            <p>Hi ${firstName},</p>
            <p>Thank you for completing our Funding Readiness assessment. We have successfully compiled your initial matches.</p>
            <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin: 20px 0; text-align: center;">
              <span style="font-size: 13px; font-weight: 700; color: #1e40af; text-transform: uppercase;">Assessment Complete</span>
              <h3 style="font-size: 28px; margin: 10px 0 5px 0; color: #1e3a8a;">${body.readinessScore}/100</h3>
              <p style="margin: 0; font-weight: 700; color: #2563eb;">${body.readinessBand}</p>
            </div>
            <p>Based on your profile, your business is aligned with several active funding streams in <strong>${body.state || body.country}</strong>.</p>
            <p><strong>Next Steps:</strong></p>
            <p>You can access your personalized funding shortlist and review detail checklists on our portal. To discuss program stacking options and coordinate application timing, access your dashboard:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.fsidigital.ca/portfolio?token=${loginToken}&ref=welcome_email" 
                 style="background-color: #059669; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                 Access Your Funding Dashboard &rarr;
              </a>
            </div>
            <p style="font-size: 12px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
              <strong>Disclosure:</strong> FSI Digital is an independent private consultancy. We are not associated with, endorsed by, or affiliated with the CRA, NRC, SBA, or any government body.
            </p>
          </div>
        `
      } else {
        subject = "Your Custom Business Grant Search Results"
        emailBody = `
          <div style="font-family: sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">FSI Funding Intelligence</h2>
            <p>Hi ${firstName},</p>
            <p>Thank you for using the FSI Digital AI Grant Finder. Your custom search matches have been generated.</p>
            <p>You can access your personalized funding shortlist and review detail checklists on our portal. To discuss program stacking options and coordinate application timing, access your dashboard:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.fsidigital.ca/portfolio?token=${loginToken}&ref=welcome_grant_finder" 
                 style="background-color: #1e40af; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                 Access Your Funding Dashboard &rarr;
              </a>
            </div>
            <p style="font-size: 12px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
              <strong>Disclosure:</strong> FSI Digital is an independent private consultancy. We are not associated with, endorsed by, or affiliated with the CRA, NRC, SBA, or any government body.
            </p>
          </div>
        `
      }

      try {
        await fetch("https://api.sender.net/v2/message/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${senderApiKey}`
          },
          body: JSON.stringify({
            from: { email: senderFromEmail, name: senderFromName },
            to: { email: body.email, name: body.name || "Founder" },
            subject: subject,
            html: emailBody
          })
        })
        console.log(`✉️ Immediate welcome email sent to ${body.email} via Sender.net`)
      } catch (emailErr) {
        console.error("❌ Failed to dispatch welcome email via Sender.net:", emailErr)
      }
    }

    // Process the grant finder request
    const results = await processGrantFinderRequest(body)

    return NextResponse.json({
      ...results,
      unsubscribeToken,
      loginToken,
    })
  } catch (error) {
    console.error("Grant finder error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
