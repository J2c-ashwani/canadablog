import { type NextRequest, NextResponse } from "next/server";
import { appendLeadToSheet } from "@/lib/google-sheets";
import { sendContactConfirmation } from "@/lib/emails/contact-confirmation";
import { validateEmail } from "@/lib/email-validator";
import { validatePhone } from "@/lib/phone-validator";
import { calculateLeadIntelligence } from "@/lib/leads/scoring";
import { applyRateLimit } from "@/lib/rate-limit";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  // Rate Limiting (10 requests/hour per IP to accommodate B2B funnel submissions)
  if (process.env.NODE_ENV !== 'development') {
    const limitRes = await applyRateLimit(request, 10, 60 * 60 * 1000);
    if (limitRes.isLimited) return limitRes.response;
  }

  try {
    const body = await request.json();
    
    // Honeypot check for bots
    if (body.confirmEmail) {
      console.warn("🤖 [Spam Bot Trapped] Contact form submission honeypot triggered.");
      return NextResponse.json({
        success: true,
        message: "Thank you for contacting us! We'll respond within 24 hours."
      });
    }

    const {
      name,
      email,
      phone: rawPhone,
      companyName,
      country,
      state,
      city,
      industry,
      businessStage,
      employees,
      annualRevenue,
      fundingAmount,
      fundingPurpose,
      timeline,
      businessDescription,
      requestType,
      category,
      consentToPartnerContact,
      pagePath,
      utmSource,
      utmMedium,
      utmCampaign,
      gaClientId,
      referralSource,
    } = body;

    const isCalculator = category === "Grant Calculator" || requestType === "Grant Calculator" || requestType === "Calculator" || body.category === "Grant Calculator";
    const isPhoneOptional = isCalculator || category === "AI Grant Finder" || body.category === "AI Grant Finder";
    const finalName = name || (isPhoneOptional ? "Founder" : "");
    const finalCompanyName = companyName || (isPhoneOptional ? "Not provided" : "");

    // Validate required fields (phone and company are optional for calculator and AI Finder leads)
    if (!email || !finalName || !finalCompanyName || (!isPhoneOptional && !rawPhone) || !industry || !businessStage || !fundingAmount || !fundingPurpose || !businessDescription) {
      return NextResponse.json({ error: "Missing required qualification fields" }, { status: 400 });
    }

    // Validate email pattern
    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      return NextResponse.json({ error: emailCheck.error }, { status: 400 });
    }

    let phone = "Not provided";
    let phoneValidationNotes = "Phone not provided";

    if (rawPhone && rawPhone.trim() !== "" && rawPhone.trim().toLowerCase() !== "not provided") {
      // Perform phone validation
      const phoneValResult = validatePhone(rawPhone, country);

      // Hard reject: number is structurally invalid (wrong length, bad NANP area/exchange code)
      if (!phoneValResult.isValid) {
        return NextResponse.json({
          error: `The phone number provided appears to be invalid (${phoneValResult.carrier}). Please enter a valid business phone number.`
        }, { status: 400 });
      }

      phone = phoneValResult.formatted;
      const phoneTypeFlag = phoneValResult.isVoipOrTollFree
        ? ` ⚠️ ${phoneValResult.type === 'toll-free' ? 'Toll-Free' : 'VoIP'} number detected — verify business legitimacy.`
        : '';
      phoneValidationNotes = `Phone Format: Valid, Type: ${phoneValResult.type}, Carrier: ${phoneValResult.carrier}${phoneTypeFlag}`;
    } else if (!isPhoneOptional) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    // Compile lead details for scoring
    const leadData = {
      source: `Contact Form - ${requestType || "General"}`,
      timestamp: new Date().toISOString(),
      email,
      name: finalName,
      companyName: finalCompanyName,
      country: country || "N/A",
      state: state || "N/A",
      city: city || "N/A",
      industry,
      businessStage,
      employees: employees || "N/A",
      annualRevenue: annualRevenue || "N/A",
      fundingAmount,
      fundingPurpose: Array.isArray(fundingPurpose) ? fundingPurpose.join(", ") : fundingPurpose,
      timeline: timeline || "N/A",
      businessDescription,
      requestType: requestType || "General",
      phone,
      emailVerified: "No", // Marked unverified initially until OTP validation succeeds
      consentToPartnerContact: !!consentToPartnerContact,
      pagePath: pagePath || request.headers.get("referer") || "N/A",
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "N/A",
      userAgent: request.headers.get("user-agent") || "N/A",
      utmSource,
      utmMedium,
      utmCampaign,
      gaClientId,
      offlineStatus: "Lead",
      referralSource: referralSource || "N/A",
    };

    const getEstimatedOpportunityRange = (amount: string) => {
      if (amount === "Under $25K") return "$5,000 – $25,000";
      if (amount === "$25K–$100K") return "$25,000 – $100,000";
      if (amount === "$100K–$250K") return "$100,000 – $250,000";
      if (amount === "$250K–$500K") return "$250,000 – $500,000";
      if (amount === "$500K–$1M") return "$500,000 – $1,000,000";
      if (amount === "Over $1M") return "$1,000,000 – $5,000,000+";
      return "TBD (Profile review pending)";
    };
    const potentialFundingRange = getEstimatedOpportunityRange(fundingAmount);

    // Calculate lead score & intelligence parameters
    const intelligence = calculateLeadIntelligence(leadData);
    const score = intelligence.score;
    const tier = intelligence.tier;
    const isAuditCandidate = tier === "A";

    const additionalNotes = `Request Type: ${requestType || "General"}\nMessage: ${businessDescription}\n${phoneValidationNotes}`;

    // Save lead to Google Sheets database immediately
    const sheetResult = await appendLeadToSheet({
      ...leadData,
      potentialFundingRange,
      additionalNotes,
      leadTier: tier,
      auditCandidate: isAuditCandidate ? "Yes" : "No",
    });

    if (!sheetResult.success) {
      console.error("❌ CRITICAL: Google Sheets save failed. Metadata:", JSON.stringify({
        timestamp: leadData.timestamp,
        source: leadData.source,
        country: leadData.country,
        state: leadData.state,
        city: leadData.city,
        industry: leadData.industry,
        businessStage: leadData.businessStage,
        companySize: leadData.companySize,
        annualRevenue: leadData.annualRevenue,
        fundingAmount: leadData.fundingAmount,
        fundingPurpose: leadData.fundingPurpose,
        consentToPartnerContact: leadData.consentToPartnerContact,
        pagePath: leadData.pagePath,
        utmSource: leadData.utmSource,
        utmMedium: leadData.utmMedium,
        utmCampaign: leadData.utmCampaign,
        leadTier: tier,
        auditCandidate: isAuditCandidate ? "Yes" : "No",
        // PII fields redacted
        email: "[REDACTED]",
        name: "[REDACTED]",
        phone: "[REDACTED]",
        businessDescription: "[REDACTED]",
        ipAddress: "[REDACTED]",
        userAgent: "[REDACTED]",
        additionalNotes: "[REDACTED]",
      }));
      return NextResponse.json(
        { error: "We encountered an issue saving your qualification details. Please try again." },
        { status: 500 }
      );
    }

    console.log(`📧 B2B Lead Captured: ${name} (${email}) - Score: ${score}/100 - Tier: ${tier}`);

    // Send confirmation receipt email to the user (fire-and-forget)
    sendContactConfirmation({
      to: email,
      name: name || '',
      category: requestType || 'General',
      messageSnippet: businessDescription || '',
    }).catch((error) => {
      console.error('❌ Failed to send contact confirmation email:', error);
    });

    return NextResponse.json({
      success: true,
      score,
      tier,
      isAuditCandidate,
      message: "Lead successfully captured. Awaiting OTP email verification."
    }, { status: 200 });

  } catch (error) {
    console.error("[B2B Contact Route] Error:", error);
    return NextResponse.json({ error: "Failed to process B2B contact inquiry" }, { status: 500 });
  }
}
