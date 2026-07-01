function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getFirstName(name?: string) {
  return name ? escapeHtml(name.split(' ')[0]) : 'Founder';
}

export function buildPurchaseEmail(data: {
  name: string;
  email: string;
  accessToken: string;
  paypalOrderId: string;
  productName: string;
  amount: string;
}): { subject: string; html: string; text: string } {
  const firstName = getFirstName(data.name);
  const reportUrl = `https://www.fsidigital.ca/products/report?token=${data.accessToken}&ref=purchase_email`;
  const downloadUrl = `https://www.fsidigital.ca/api/products/download-pdf?token=${data.accessToken}`;
  const auditUrl = 'https://www.fsidigital.ca/consultation?source=report_purchase_email';

  const subject = 'Your Funding Match Report is Ready';

  const html = `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <div style="max-width:580px;margin:0 auto;">

        <!-- Brand Header -->
        <div style="background-color:#0f172a;padding:20px 28px;border-radius:12px 12px 0 0;">
          <span style="font-size:18px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">FSI <span style="color:#34d399;">Digital</span></span>
          <span style="float:right;font-size:11px;font-weight:600;color:#94a3b8;padding-top:4px;">Purchase Receipt</span>
        </div>

        <!-- Main Body -->
        <div style="background-color:#ffffff;border:1px solid #e2e8f0;border-top:none;padding:32px 28px;border-radius:0 0 12px 12px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">

          <p style="margin:0 0 16px 0;font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>

          <p style="margin:0 0 16px 0;font-size:15px;color:#334155;line-height:1.6;">
            Thank you for purchasing your <strong>${escapeHtml(data.productName)}</strong>. Your personalized report is ready and waiting for you.
          </p>

          <!-- CTA Buttons -->
          <div style="text-align:center;margin:28px 0;">
            <a href="${reportUrl}" target="_blank" rel="noopener noreferrer"
               style="background-color:#059669;color:white;padding:14px 24px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);margin-right:8px;margin-bottom:10px;">
               Interactive Dashboard &rarr;
            </a>
            <a href="${downloadUrl}" target="_blank" rel="noopener noreferrer"
               style="background-color:#4f46e5;color:white;padding:14px 24px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(79,70,229,0.2);margin-bottom:10px;">
               Download PDF Report 📥
            </a>
          </div>

          <p style="margin:0 0 20px 0;font-size:13px;color:#64748b;text-align:center;line-height:1.5;">
            You can access your report anytime using the links above.<br/>
            Bookmark them for future reference.
          </p>

          <!-- Receipt Section -->
          <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:18px 20px;margin:24px 0;">
            <p style="margin:0 0 12px 0;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Order Details</p>
            <table style="width:100%;border-collapse:collapse;" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size:14px;color:#475569;padding:4px 0;">Product</td>
                <td style="font-size:14px;color:#0f172a;font-weight:600;padding:4px 0;text-align:right;">${escapeHtml(data.productName)}</td>
              </tr>
              <tr>
                <td style="font-size:14px;color:#475569;padding:4px 0;">Amount</td>
                <td style="font-size:14px;color:#0f172a;font-weight:600;padding:4px 0;text-align:right;">$${escapeHtml(data.amount)} USD</td>
              </tr>
              <tr>
                <td style="font-size:14px;color:#475569;padding:4px 0;">Order ID</td>
                <td style="font-size:13px;color:#64748b;padding:4px 0;text-align:right;font-family:monospace;">${escapeHtml(data.paypalOrderId)}</td>
              </tr>
            </table>
          </div>

          <p style="margin:0 0 16px 0;font-size:14px;color:#475569;line-height:1.6;">
            This report identifies the government grants, tax credits, and loans your business may qualify for — with estimated funding ranges and recommended next steps.
          </p>

          <!-- Upsell Section -->
          <div style="border-top:1px solid #f1f5f9;padding-top:24px;margin-top:24px;">
            <p style="margin:0 0 8px 0;font-size:15px;font-weight:700;color:#0f172a;">Want Expert Guidance?</p>
            <p style="margin:0 0 16px 0;font-size:14px;color:#475569;line-height:1.6;">
              Our funding advisors can review your report, verify your eligibility, and help you prepare winning applications. Book a 1-on-1 Funding Eligibility Audit ($199).
            </p>
            <div style="text-align:center;">
              <a href="${auditUrl}" target="_blank" rel="noopener noreferrer"
                 style="background-color:#0f172a;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:13px;">
                 Book a Funding Eligibility Audit &rarr;
              </a>
            </div>
          </div>

          <!-- Footer Signature -->
          <div style="padding-top:24px;border-top:1px solid #f1f5f9;margin-top:28px;">
            <p style="margin:0;font-size:14px;color:#475569;line-height:1.5;">
              Best regards,<br/>
              <strong>Ashwani K</strong><br/>
              <span style="color:#64748b;font-size:13px;">Founder, FSI Digital</span><br/>
              <a href="mailto:ashwani@fsidigital.ca" style="color:#2563eb;text-decoration:none;font-size:13px;">ashwani@fsidigital.ca</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  `;

  const text = `Hi ${firstName},

Thank you for purchasing your ${data.productName}.

You can access your report anytime at:
${reportUrl}

Order Details:
- Product: ${data.productName}
- Amount: $${data.amount} USD
- Order ID: ${data.paypalOrderId}

This report identifies the government grants, tax credits, and loans your business may qualify for.

---

Want Expert Guidance?
Our funding advisors can review your report, verify your eligibility, and help you prepare winning applications.

Book a Funding Eligibility Audit ($199):
${auditUrl}

Best regards,
Ashwani K
Founder, FSI Digital
ashwani@fsidigital.ca`;

  return { subject, html, text };
}
