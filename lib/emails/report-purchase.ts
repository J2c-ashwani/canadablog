type ReportPurchaseInput = {
  to: string;
  name: string;
  loginToken: string;
  companyName: string;
  readinessScore: number;
  estimatedFunding: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getFirstName(name: string) {
  return escapeHtml(name.split(' ')[0] || 'Founder');
}

function buildHtml({
  firstName,
  companyName,
  readinessScore,
  estimatedFunding,
  loginToken,
}: {
  firstName: string;
  companyName: string;
  readinessScore: number;
  estimatedFunding: string;
  loginToken: string;
}) {
  const dashboardUrl = `https://www.fsidigital.ca/portfolio/report?token=${loginToken}&ref=purchase_receipt`;

  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.05);">
        
        <!-- Brand Header -->
        <div style="padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; margin-bottom: 24px; display: table; width: 100%;">
          <span style="font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; display: table-cell;">FSI <span style="color: #059669;">Digital</span></span>
          <span style="font-size: 12px; font-weight: 600; color: #64748b; background-color: #f1f5f9; padding: 4px 8px; border-radius: 4px; display: table-cell; text-align: right; width: 100px;">Assessment</span>
        </div>

        <p style="margin:0 0 16px 0;font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>

        <p style="margin:0 0 16px 0;font-size:15px;color:#334155;line-height:1.6;">
          Thank you for purchasing the <strong>Executive Funding Opportunity Assessment</strong> for <strong>${escapeHtml(companyName)}</strong>.
        </p>

        <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 18px 20px; margin: 20px 0; text-align: center;">
          <p style="margin: 0 0 4px 0; font-size: 11px; color: #1e40af; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Readiness Score</p>
          <h3 style="font-size: 28px; margin: 0 0 8px 0; color: #1e3a8a;">${readinessScore}/100</h3>
          <p style="margin: 0; font-size: 14px; font-weight: 700; color: #2563eb;">
            Estimated Funding Stack: ${escapeHtml(estimatedFunding)}
          </p>
        </div>

        <p style="margin:0 0 24px 0;font-size:14px;color:#475569;line-height:1.6;text-align:center;">
          Your official Assessment PDF report is ready and can be accessed online, printed, or saved from your private portal below.
        </p>

        <div style="text-align: center; margin: 24px 0;">
          <a href="${dashboardUrl}" 
             style="background-color: #059669; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(5, 150, 105, 0.2);">
             View Executive Assessment Report &rarr;
          </a>
        </div>

        <p style="margin:24px 0 12px 0;font-weight:700;color:#0f172a;font-size:15px;">Next Steps for ${escapeHtml(companyName)}:</p>
        <table style="width:100%;border-collapse:collapse;margin:0 0 20px 0;" cellpadding="0" cellspacing="0">
          <tr>
            <td style="vertical-align:top;width:20px;padding-bottom:10px;font-size:14px;color:#059669;font-weight:bold;">1.</td>
            <td style="vertical-align:top;font-size:14px;color:#475569;padding-bottom:10px;line-height:1.5;">
              <strong>Review the Stacking Strategy:</strong> Check which grants can be stacked on top of tax credits to maximize cash yield.
            </td>
          </tr>
          <tr>
            <td style="vertical-align:top;width:20px;padding-bottom:10px;font-size:14px;color:#059669;font-weight:bold;">2.</td>
            <td style="vertical-align:top;font-size:14px;color:#475569;padding-bottom:10px;line-height:1.5;">
              <strong>Print or Export PDF:</strong> Save a copy of the report for your internal team or stakeholders.
            </td>
          </tr>
          <tr>
            <td style="vertical-align:top;width:20px;font-size:14px;color:#059669;font-weight:bold;">3.</td>
            <td style="vertical-align:top;font-size:14px;color:#475569;line-height:1.5;">
              <strong>Book Verification Audit:</strong> Schedule a 1-on-1 audit briefing with a Senior Funding Analyst to verify your filing deadlines.
            </td>
          </tr>
        </table>

        <!-- Footer Signature -->
        <div style="padding-top:20px;border-top:1px solid #f1f5f9;margin-top:28px;">
          <p style="margin:0;font-size:14px;color:#475569;line-height:1.5;">
            Best regards,<br/>
            <strong>Ashwani Kumar</strong><br/>
            <span style="color:#64748b;font-size:13px;">Founder, FSI Digital</span><br/>
            <a href="mailto:ashwani@fsidigital.ca" style="color:#2563eb;text-decoration:none;font-size:13px;">ashwani@fsidigital.ca</a>
          </p>
        </div>
      </div>
    </div>
  `;
}

function buildText({
  firstName,
  companyName,
  readinessScore,
  estimatedFunding,
  loginToken,
}: {
  firstName: string;
  companyName: string;
  readinessScore: number;
  estimatedFunding: string;
  loginToken: string;
}) {
  const dashboardUrl = `https://www.fsidigital.ca/portfolio/report?token=${loginToken}&ref=purchase_receipt`;

  return `Hi ${firstName},

Thank you for purchasing the Executive Funding Opportunity Assessment for ${companyName}.

Readiness Score: ${readinessScore}/100
Estimated Funding Stack: ${estimatedFunding}

Your official Assessment PDF report is ready and can be accessed online, printed, or saved from your private portal.

Access link:
${dashboardUrl}

Next Steps:
1. Review the Stacking Strategy: Check which grants can be stacked on top of tax credits to maximize cash yield.
2. Print or Export PDF: Save a copy of the report for your internal team or stakeholders.
3. Book Verification Audit: Schedule a 1-on-1 audit briefing with a Senior Funding Analyst to verify your filing deadlines.

Best regards,
Ashwani Kumar
Founder, FSI Digital
ashwani@fsidigital.ca`;
}

export async function sendReportPurchaseEmail({
  to,
  name,
  loginToken,
  companyName,
  readinessScore,
  estimatedFunding,
}: ReportPurchaseInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'FSI Digital <hello@fsidigital.ca>';
  const replyToEmail = process.env.RESEND_REPLY_TO_EMAIL || 'ashwani@fsidigital.ca';

  if (!apiKey) {
    console.warn('Report purchase email skipped — RESEND_API_KEY is not set.');
    return { success: false, skipped: true };
  }

  const firstName = getFirstName(name);
  const html = buildHtml({ firstName, companyName, readinessScore, estimatedFunding, loginToken });
  const text = buildText({ firstName, companyName, readinessScore, estimatedFunding, loginToken });

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [to],
        reply_to: replyToEmail,
        subject: `Your Executive Funding Assessment Report - ${companyName}`,
        html,
        text,
        tags: [
          { name: 'type', value: 'report-purchase' },
          { name: 'company', value: companyName.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 50) },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Report purchase email failed:', errorText);
      return { success: false, error: errorText };
    }

    return { success: true };
  } catch (error) {
    console.error('Report purchase email error:', error);
    return { success: false, error: String(error) };
  }
}
