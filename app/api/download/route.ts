import { type NextRequest, NextResponse } from "next/server"
import { appendLeadToSheet } from "@/lib/google-sheets"
import { sendEmail } from "@/lib/emails/mailer"
import { applyRateLimit } from "@/lib/rate-limit"

export async function POST(request: NextRequest) {
  // Rate Limit: 10 requests / minute
  if (process.env.NODE_ENV !== 'development') {
    const limitRes = await applyRateLimit(request, 10, 60 * 1000);
    if (limitRes.isLimited) return limitRes.response;
  }

  try {
    const body = await request.json()
    const { email, name, company, guideName, industry, country, phone, utmSource, utmMedium, utmCampaign, gaClientId } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Save lead to Google Sheets
    const sheetResult = await appendLeadToSheet({
      source: `PDF Download - ${guideName}`,
      timestamp: new Date().toISOString(),
      email,
      name: name || company,
      companyName: company,
      country,
      industry,
      phone,
      additionalNotes: `Downloaded: ${guideName}`,
      consentToPartnerContact: !!body.consentToPartnerContact,
      pagePath: body.pagePath || request.headers.get("referer") || "N/A",
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "N/A",
      userAgent: request.headers.get("user-agent") || "N/A",
      utmSource,
      utmMedium,
      utmCampaign,
      gaClientId,
      offlineStatus: "Lead",
    });

    if (!sheetResult.success) {
      console.error("❌ CRITICAL: Google Sheets save failed in Download route. Metadata:", JSON.stringify({
        timestamp: new Date().toISOString(),
        source: `PDF Download - ${body.guideName}`,
        industry: body.industry,
        country: body.country,
        utmSource: body.utmSource,
        utmMedium: body.utmMedium,
        utmCampaign: body.utmCampaign,
        // PII fields redacted
        email: "[REDACTED]",
        name: "[REDACTED]",
        companyName: "[REDACTED]",
        phone: "[REDACTED]",
      }));
      return NextResponse.json(
        { error: "We encountered an issue saving your request. Please try again." },
        { status: 500 }
      );
    }

    // Send confirmation email containing the PDF download link
    const cleanGuideName = guideName || "Government Grants Guide";
    const downloadLink = "https://www.fsidigital.ca/lead-magnets/ultimate-grant-guide-2026.pdf";
    
    try {
      await sendEmail({
        to: email,
        subject: `Your Guide: ${cleanGuideName} — FSI Digital`,
        tagType: "guide-download",
        companyName: company || "Founder",
        html: `
          <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
            <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.05);">
              
              <!-- Brand Header -->
              <div style="padding-bottom:16px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;">
                <span style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.02em;">FSI <span style="color:#059669;">Digital</span></span>
              </div>

              <p style="margin:0 0 16px 0;font-size:15px;color:#334155;font-weight:500;">Hi there,</p>
              
              <p style="margin:0 0 16px 0;font-size:15px;color:#334155;line-height:1.6;">
                Thank you for requesting the <strong>${cleanGuideName}</strong>. 
                Below is your secure download link to access the guide:
              </p>

              <div style="text-align:center;margin:30px 0;">
                <a href="${downloadLink}" target="_blank" style="background-color:#059669;color:#ffffff;padding:12px 24px;border-radius:6px;font-size:15px;font-weight:700;text-decoration:none;display:inline-block;box-shadow:0 2px 4px rgba(5,150,105,0.2);">
                  Download PDF Guide
                </a>
              </div>

              <p style="margin:0 0 16px 0;font-size:13px;color:#64748b;line-height:1.5;text-align:center;">
                Or copy and paste this link in your browser:<br/>
                <a href="${downloadLink}" style="color:#3b82f6;text-decoration:underline;">${downloadLink}</a>
              </p>

              <div style="padding-top:20px;border-top:1px solid #f1f5f9;margin-top:28px;">
                <p style="margin:0;font-size:14px;color:#475569;line-height:1.5;">
                  Best regards,<br/>
                  <strong>Ashwani K</strong><br/>
                  <span style="color:#64748b;font-size:13px;">Founder, FSI Digital</span><br/>
                  <a href="mailto:hello@fsidigital.ca" style="color:#2563eb;text-decoration:none;font-size:13px;">hello@fsidigital.ca</a>
                </p>
              </div>

            </div>
          </div>
        `,
        text: `Hi there,\n\nThank you for requesting the ${cleanGuideName}. You can download it directly from the link below:\n\n${downloadLink}\n\nBest regards,\n\nAshwani K\nFounder, FSI Digital\nhello@fsidigital.ca`
      });
    } catch (emailError) {
      console.error("⚠️ Failed to send guide email (non-blocking):", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your guide is ready.",
      redirectUrl: `/download/thank-you?guide=${encodeURIComponent(guideName)}`,
    })
  } catch (error) {
    console.error("Download API error:", error)
    return NextResponse.json({ error: "Failed to process download" }, { status: 500 })
  }
}
