type PartnerReceiptInput = {
  to: string
  name: string
  companyName: string
  leadType: string
  geography: string
  budget: string
}

type PartnerApprovalInput = {
  to: string
  name: string
  companyName: string
  leadType: string
  geography: string
  score: number
  phone: string
  website: string
  existingVolume: string
  budget: string
  purchaseModel: string
  decisionMakerRole: string
  preferences: string
}

function escapeHtml(value: string) {
  return (value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function getFirstName(name: string) {
  return escapeHtml(name.split(" ")[0] || "there")
}

// HTML for Email 1: Instant Receipt Confirmation
function buildReceiptHtml({
  firstName,
  companyName,
  leadType,
  geography,
  budget,
  replyToEmail,
}: {
  firstName: string
  companyName: string
  leadType: string
  geography: string
  budget: string
  replyToEmail: string
}) {
  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.05);">
        <!-- Brand Header -->
        <div style="padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; margin-bottom: 24px; display: table; width: 100%;">
          <span style="font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; display: table-cell;">FSI <span style="color: #059669;">Digital</span></span>
          <span style="font-size: 12px; font-weight: 600; color: #64748b; background-color: #f1f5f9; padding: 4px 8px; border-radius: 4px; display: table-cell; text-align: right; width: 100px;">Advisory Desk</span>
        </div>

        <p style="margin:0 0 16px 0;font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>

        <p style="margin:0 0 16px 0;font-size:15px;color:#334155;line-height:1.6;">
          Thank you for submitting your lead buyer application to FSI Digital for <strong>${companyName}</strong>. 
        </p>

        <p style="margin:0 0 16px 0;font-size:15px;color:#334155;">
          Here is a copy of your requested target parameters:
        </p>

        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px 20px; margin: 20px 0;">
          <p style="margin: 0 0 8px 0; font-size: 14px; color: #334155;">
            <strong>Target Lead Type:</strong> ${escapeHtml(leadType)}
          </p>
          <p style="margin: 0 0 8px 0; font-size: 14px; color: #334155;">
            <strong>Geography Interest:</strong> ${escapeHtml(geography)}
          </p>
          <p style="margin: 0; font-size: 14px; color: #334155;">
            <strong>Monthly Lead Budget:</strong> ${escapeHtml(budget)}
          </p>
        </div>

        <p style="margin:0 0 16px 0;font-weight:700;color:#0f172a;font-size:15px;">What happens next:</p>
        <p style="margin:0 0 16px 0;font-size:14px;color:#475569;line-height:1.6;">
          Our compliance and operations team is currently reviewing your company website, profile, and ICP description to ensure we have active lead inventory matching your exact specifications.
        </p>
        <p style="margin:0 0 20px 0;font-size:14px;color:#475569;line-height:1.6;">
          This review typically takes <strong>1 to 2 hours</strong>. As soon as approval is completed, we will email you back with checkout instructions to lock in your starter pilot batch.
        </p>

        <!-- Footer Signature -->
        <div style="padding-top:20px;border-top:1px solid #f1f5f9;margin-top:28px;">
          <p style="margin:0;font-size:14px;color:#475569;line-height:1.5;">
            Best regards,<br/>
            <strong>Michael Thompson</strong><br/>
            <span style="color:#64748b;font-size:13px;">Senior Funding Analyst, FSI Digital</span><br/>
            <a href="mailto:${replyToEmail}" style="color:#2563eb;text-decoration:none;font-size:13px;">${replyToEmail}</a>
          </p>
        </div>
      </div>
    </div>
  `
}

// HTML for Email 2: Delayed Approval & Self-Service Pitch
function buildApprovalHtml({
  firstName,
  companyName,
  leadType,
  geography,
  replyToEmail,
}: {
  firstName: string
  companyName: string
  leadType: string
  geography: string
  replyToEmail: string
}) {
  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.05);">
        <!-- Brand Header -->
        <div style="padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; margin-bottom: 24px; display: table; width: 100%;">
          <span style="font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; display: table-cell;">FSI <span style="color: #059669;">Digital</span></span>
          <span style="font-size: 12px; font-weight: 600; color: #64748b; background-color: #f1f5f9; padding: 4px 8px; border-radius: 4px; display: table-cell; text-align: right; width: 100px;">Advisory Desk</span>
        </div>

        <p style="margin:0 0 16px 0;font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>

        <p style="margin:0 0 16px 0;font-size:15px;color:#334155;line-height:1.6;">
          Good news — our operations team has completed their review, and your B2B account for <strong>${companyName}</strong> has been approved.
        </p>

        <p style="margin:0 0 16px 0;font-size:15px;color:#334155;line-height:1.6;">
          We have verified active lead inventory matching your target requirements (<strong>${leadType}</strong> in <strong>${geography}</strong>).
        </p>

        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 18px 20px; margin: 20px 0; text-align: center;">
          <p style="margin: 0 0 10px 0; font-size: 14px; color: #166534; font-weight: 600;">
            Launch Your Starter Pilot Batch
          </p>
          <p style="margin: 0 0 16px 0; font-size: 13px; color: #15803d; line-height: 1.5;">
            You can purchase a starter batch securely via PayPal to begin routing leads to your desk immediately. No contract or setup call required.
          </p>
          <a href="https://www.fsidigital.ca/partners#pricing" 
             style="display: inline-block; background-color: #059669; color: #ffffff; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; transition: background-color 0.2s ease;">
            Select Pilot Package & Checkout
          </a>
        </div>

        <p style="margin:0 0 16px 0;font-size:14px;color:#334155;font-weight:600;">Starter Pilot Options:</p>
        <ul style="margin:0 0 20px 0;padding-left:20px;font-size:14px;color:#475569;line-height:1.6;">
          <li style="margin-bottom:8px;"><strong>Shared Lead Pilot ($500):</strong> 10 qualified funding leads routed to your email inbox.</li>
          <li style="margin-bottom:8px;"><strong>Exclusive Lead Pilot ($750):</strong> 10 priority leads distributed exclusively to your firm.</li>
          <li style="margin-bottom:12px;"><strong>Booked Call Pilot ($1,500):</strong> 5 warm consultation calls scheduled directly on your calendar.</li>
        </ul>

        <p style="margin:20px 0 16px 0;font-size:14px;color:#475569;line-height:1.6;">
          Once payment is verified, routing parameters are activated automatically. If you have custom API routing configurations or prefer a brief phone onboarding session, you can schedule a call here: <a href="https://www.fsidigital.ca/consultation?source=partner-approved" style="color:#2563eb;text-decoration:none;">Briefing Booking Page</a>.
        </p>

        <!-- Footer Signature -->
        <div style="padding-top:20px;border-top:1px solid #f1f5f9;margin-top:28px;">
          <p style="margin:0;font-size:14px;color:#475569;line-height:1.5;">
            Best regards,<br/>
            <strong>Michael Thompson</strong><br/>
            <span style="color:#64748b;font-size:13px;">Senior Funding Analyst, FSI Digital</span><br/>
            <a href="mailto:${replyToEmail}" style="color:#2563eb;text-decoration:none;font-size:13px;">${replyToEmail}</a>
          </p>
        </div>
      </div>
    </div>
  `
}

function buildInternalAlertHtml(data: PartnerApprovalInput) {
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;line-height:1.6;color:#1e293b;max-width:600px;margin:0 auto;padding:20px;border:1px solid #cbd5e1;border-radius:8px;">
      <h2 style="margin-top:0;color:#0f172a;border-bottom:2px solid #e2e8f0;padding-bottom:10px;">🚨 New B2B Lead Buyer Registered</h2>
      
      <p style="font-size:15px;">A new B2B buyer has applied and the receipt confirmation has been sent automatically. Details:</p>
      
      <table style="width:100%;border-collapse:collapse;margin:20px 0;" cellpadding="6">
        <tr style="background-color:#f8fafc;">
          <td style="font-weight:bold;width:180px;border-bottom:1px solid #e2e8f0;">Buyer Score:</td>
          <td style="border-bottom:1px solid #e2e8f0;color:#10b981;font-weight:bold;font-size:16px;">${data.score} / 100</td>
        </tr>
        <tr>
          <td style="font-weight:bold;border-bottom:1px solid #e2e8f0;">Contact Name:</td>
          <td style="border-bottom:1px solid #e2e8f0;">${escapeHtml(data.name)}</td>
        </tr>
        <tr style="background-color:#f8fafc;">
          <td style="font-weight:bold;border-bottom:1px solid #e2e8f0;">Work Email:</td>
          <td style="border-bottom:1px solid #e2e8f0;"><a href="mailto:${data.to}">${data.to}</a></td>
        </tr>
        <tr>
          <td style="font-weight:bold;border-bottom:1px solid #e2e8f0;">Phone Number:</td>
          <td style="border-bottom:1px solid #e2e8f0;">${escapeHtml(data.phone)}</td>
        </tr>
        <tr style="background-color:#f8fafc;">
          <td style="font-weight:bold;border-bottom:1px solid #e2e8f0;">Company Name:</td>
          <td style="border-bottom:1px solid #e2e8f0;"><strong>${escapeHtml(data.companyName)}</strong></td>
        </tr>
        <tr>
          <td style="font-weight:bold;border-bottom:1px solid #e2e8f0;">Company Website:</td>
          <td style="border-bottom:1px solid #e2e8f0;"><a href="${data.website}" target="_blank">${data.website}</a></td>
        </tr>
        <tr style="background-color:#f8fafc;">
          <td style="font-weight:bold;border-bottom:1px solid #e2e8f0;">Lead Type Target:</td>
          <td style="border-bottom:1px solid #e2e8f0;">${escapeHtml(data.leadType)}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;border-bottom:1px solid #e2e8f0;">Geography Target:</td>
          <td style="border-bottom:1px solid #e2e8f0;">${escapeHtml(data.geography)}</td>
        </tr>
        <tr style="background-color:#f8fafc;">
          <td style="font-weight:bold;border-bottom:1px solid #e2e8f0;">Current Lead Buying:</td>
          <td style="border-bottom:1px solid #e2e8f0;">${escapeHtml(data.existingVolume)}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;border-bottom:1px solid #e2e8f0;">Monthly Budget:</td>
          <td style="border-bottom:1px solid #e2e8f0;">${escapeHtml(data.budget)}</td>
        </tr>
        <tr style="background-color:#f8fafc;">
          <td style="font-weight:bold;border-bottom:1px solid #e2e8f0;">Preferred Model:</td>
          <td style="border-bottom:1px solid #e2e8f0;">${escapeHtml(data.purchaseModel)}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;border-bottom:1px solid #e2e8f0;">Applicant Role:</td>
          <td style="border-bottom:1px solid #e2e8f0;">${escapeHtml(data.decisionMakerRole)}</td>
        </tr>
        <tr style="background-color:#f8fafc;">
          <td style="font-weight:bold;vertical-align:top;border-bottom:1px solid #e2e8f0;">ICP Description:</td>
          <td style="border-bottom:1px solid #e2e8f0;line-height:1.5;">${escapeHtml(data.preferences)}</td>
        </tr>
      </table>
    </div>
  `
}

// Function 1: Send Instant Receipt confirmation (Email 1)
export async function sendPartnerReceiptEmail(data: PartnerReceiptInput) {
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL || "FSI Digital <hello@fsidigital.ca>"
  const replyToEmail = process.env.RESEND_REPLY_TO_EMAIL || "ashwani@fsidigital.ca"

  if (!apiKey) {
    console.warn("Partner receipt email skipped — RESEND_API_KEY is not set.")
    return { success: false, skipped: true }
  }

  const firstName = getFirstName(data.name)
  const html = buildReceiptHtml({
    firstName,
    companyName: data.companyName,
    leadType: data.leadType,
    geography: data.geography,
    budget: data.budget,
    replyToEmail,
  })

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [data.to],
        reply_to: replyToEmail,
        subject: `Application received: B2B lead partnership review for ${data.companyName}`,
        html,
        text: `Hi ${firstName},\n\nWe received your partner application for ${data.companyName}. Our compliance team is currently reviewing your profile to verify active lead inventory for ${data.leadType}. We will respond with approval within 1-2 hours.\n\nBest regards,\nMichael Thompson\nSenior Funding Analyst\nFSI Digital`,
        tags: [{ name: "type", value: "partner-receipt" }],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error("❌ Failed to send partner receipt email:", err)
      return { success: false, error: err }
    }

    console.log(`📧 Sent partner receipt email to: ${data.to}`)
    return { success: true }
  } catch (error) {
    console.error("❌ Resend receipt email error:", error)
    return { success: false, error: String(error) }
  }
}

// Function 2: Send Delayed Approval & Offer Checkout (Email 2) and Send Founder alert
export async function sendPartnerApprovalEmailAndAlert(data: PartnerApprovalInput) {
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL || "FSI Digital <hello@fsidigital.ca>"
  const replyToEmail = process.env.RESEND_REPLY_TO_EMAIL || "ashwani@fsidigital.ca"

  if (!apiKey) {
    console.warn("Partner approval email skipped — RESEND_API_KEY is not set.")
    return { success: false, skipped: true }
  }

  const firstName = getFirstName(data.name)
  const approvalHtml = buildApprovalHtml({
    firstName,
    companyName: data.companyName,
    leadType: data.leadType,
    geography: data.geography,
    replyToEmail,
  })

  const alertHtml = buildInternalAlertHtml(data)

  try {
    // Send Approval welcome email to partner
    const welcomeResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [data.to],
        reply_to: replyToEmail,
        subject: `Approved: Purchase your starter business funding lead pilot`,
        html: approvalHtml,
        text: `Hi ${firstName},\n\nGood news - your lead buyer profile for ${data.companyName} has been approved. You can purchase a starter lead pilot batch directly via PayPal here: https://www.fsidigital.ca/partners#pricing.\n\nBest regards,\nMichael Thompson\nSenior Funding Analyst\nFSI Digital`,
        tags: [{ name: "type", value: "partner-approved" }],
      }),
    })

    if (!welcomeResponse.ok) {
      const err = await welcomeResponse.text()
      console.error("❌ Failed to send partner welcome/approval email:", err)
    } else {
      console.log(`📧 Sent partner welcome/approval email to: ${data.to}`)
    }

    // Send Alert to Ashwani
    const alertResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [replyToEmail],
        reply_to: data.to,
        subject: `🚨 [New Partner Approval] ${data.companyName} - Score: ${data.score}/100`,
        html: alertHtml,
        text: `New B2B Lead Buyer Approved:\nName: ${data.name}\nEmail: ${data.to}\nCompany: ${data.companyName}\nScore: ${data.score}/100`,
        tags: [{ name: "type", value: "partner-alert" }],
      }),
    })

    if (!alertResponse.ok) {
      const err = await alertResponse.text()
      console.error("❌ Failed to send internal partner alert email:", err)
    } else {
      console.log(`📧 Sent internal partner alert email for: ${data.companyName}`)
    }

    return { success: true }
  } catch (error) {
    console.error("❌ Resend approval email error:", error)
    return { success: false, error: String(error) }
  }
}
