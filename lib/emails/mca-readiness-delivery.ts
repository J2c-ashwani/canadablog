import { escapeHtml, sendEmail } from '@/lib/emails/mailer';

export async function sendMCAReadinessReportDelivery(input: {
  to: string;
  name: string;
  companyName: string;
  reportUrl: string;
  applicationId: string;
}) {
  const safeName = escapeHtml(input.name.trim() || 'Founder');
  const safeCompany = escapeHtml(input.companyName.trim() || 'your business');
  const safeApplicationId = escapeHtml(input.applicationId);
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;line-height:1.6">
      <h1 style="font-size:24px;color:#0f172a">Your MCA Funding Readiness Report is ready</h1>
      <p>Hi ${safeName},</p>
      <p>Your automated readiness report for <strong>${safeCompany}</strong> is now available.</p>
      <p><a href="${input.reportUrl}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:13px 22px;border-radius:8px;font-weight:700">Open my private report</a></p>
      <p style="font-size:13px;color:#64748b">Application: ${safeApplicationId}. This private link provides access to the report, so please do not forward it.</p>
      <p style="font-size:13px;color:#64748b">The report scores declared application data and document inventory only. It does not inspect bank-statement contents, make a credit decision, or guarantee funding.</p>
    </div>`;
  const text = `Hi ${safeName},\n\nYour automated MCA Funding Readiness Report for ${safeCompany} is ready:\n${input.reportUrl}\n\nApplication: ${input.applicationId}. Keep this private link secure. The report scores declared application data and document inventory only; it does not inspect bank-statement contents or guarantee funding.`;

  return sendEmail({
    to: input.to,
    subject: `Your MCA Funding Readiness Report is ready — ${input.applicationId}`,
    html,
    text,
    tagType: 'mca-product-delivery',
    companyName: input.companyName,
  });
}
