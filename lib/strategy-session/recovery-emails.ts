import type { StrategyRecoveryEmailStage } from '@/lib/strategy-session/recovery-store';

type StrategyRecoveryEmailInput = {
  to: string;
  name?: string;
  source?: string;
  stage: StrategyRecoveryEmailStage;
  recoveryId?: string;
  bookedAt?: number;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getFirstName(name?: string) {
  return escapeHtml((name || '').split(' ')[0] || 'there');
}

function buildRecapHtml(recoveryId?: string, bookedAt?: number) {
  if (!bookedAt) return '';

  const refId = recoveryId ? `FSI-AUD-${recoveryId.split('-')[0].toUpperCase()}` : 'N/A';
  
  let dateStr = 'N/A';
  if (bookedAt) {
    try {
      const date = new Date(bookedAt);
      dateStr = date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      });
    } catch {
      dateStr = 'Scheduled Session';
    }
  }

  return `
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
      <p style="margin: 0 0 8px 0; font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Provisional Reservation Details</p>
      <table style="width: 100%; border-collapse: collapse;" cellpadding="0" cellspacing="0">
        <tr>
          <td style="font-size: 13px; color: #475569; padding: 4px 0; font-weight: 600;">Audit Reference ID:</td>
          <td style="font-size: 13px; color: #0f172a; padding: 4px 0; text-align: right; font-family: monospace; font-weight: bold;">${refId}</td>
        </tr>
        <tr>
          <td style="font-size: 13px; color: #475569; padding: 4px 0; font-weight: 600;">Provisional Slot:</td>
          <td style="font-size: 13px; color: #0f172a; padding: 4px 0; text-align: right; font-weight: bold;">${dateStr}</td>
        </tr>
        <tr>
          <td style="font-size: 13px; color: #475569; padding: 4px 0; font-weight: 600;">Assigned Specialist:</td>
          <td style="font-size: 13px; color: #0f172a; padding: 4px 0; text-align: right; font-weight: bold;">Sam (Funding Specialist)</td>
        </tr>
      </table>
    </div>
  `;
}

function buildValueBoxHtml() {
  return `
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 24px 0; text-align: left;">
      <p style="margin: 0 0 14px 0; font-size: 13px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em;">What does the $199 Research Deposit include?</p>
      <table style="width: 100%; border-collapse: collapse; margin: 0 0 16px 0;" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align: top; width: 24px; padding-bottom: 8px; font-size: 14px; color: #059669; font-weight: bold;">✓</td>
          <td style="vertical-align: top; padding-bottom: 8px; font-size: 13.5px; color: #475569; line-height: 1.4;">
            Manual funding eligibility review of your business profile
          </td>
        </tr>
        <tr>
          <td style="vertical-align: top; width: 24px; padding-bottom: 8px; font-size: 14px; color: #059669; font-weight: bold;">✓</td>
          <td style="vertical-align: top; padding-bottom: 8px; font-size: 13.5px; color: #475569; line-height: 1.4;">
            Identification of relevant grants, tax credits, and funding programs
          </td>
        </tr>
        <tr>
          <td style="vertical-align: top; width: 24px; padding-bottom: 8px; font-size: 14px; color: #059669; font-weight: bold;">✓</td>
          <td style="vertical-align: top; padding-bottom: 8px; font-size: 13.5px; color: #475569; line-height: 1.4;">
            Custom Funding Eligibility Report prepared for your business
          </td>
        </tr>
        <tr>
          <td style="vertical-align: top; width: 24px; padding-bottom: 8px; font-size: 14px; color: #059669; font-weight: bold;">✓</td>
          <td style="vertical-align: top; padding-bottom: 8px; font-size: 13.5px; color: #475569; line-height: 1.4;">
            Private strategy consultation with our specialist
          </td>
        </tr>
        <tr>
          <td style="vertical-align: top; width: 24px; font-size: 14px; color: #059669; font-weight: bold;">✓</td>
          <td style="vertical-align: top; font-size: 13.5px; color: #475569; line-height: 1.4;">
            100% credited toward full-service filing support if you choose to partner with us
          </td>
        </tr>
      </table>
      <div style="background-color: #ecfdf5; border: 1px dashed #34d399; border-radius: 6px; padding: 12px 14px; font-size: 13px; color: #064e3b; line-height: 1.4;">
        🛡️ <strong>Eligibility Guarantee:</strong> If our analysts determine that your business is not eligible for any active funding opportunities, your deposit is refunded in full.
      </div>
    </div>
  `;
}

function buildValueBoxText() {
  return `What does the $199 Research Deposit include?
- Manual funding eligibility review of your business profile
- Identification of relevant grants, tax credits, and funding programs
- Custom Funding Eligibility Report prepared for your business
- Private strategy consultation with our specialist
- 100% credited toward full-service filing support if you choose to partner with us

🛡️ Eligibility Guarantee: If our analysts determine that your business is not eligible for any active funding opportunities, your deposit is refunded in full.

You're not paying for a call. You're paying for a custom Funding Eligibility Report and funding assessment prepared for your business.`;
}

function buildReportPreviewHtml() {
  return `
    <div style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; margin: 24px 0; background-color: #ffffff; text-align: left;">
      <div style="background-color: #0f172a; color: #ffffff; padding: 12px 16px; font-size: 11px; font-weight: bold; letter-spacing: 0.05em; text-transform: uppercase;">
        Funding Eligibility Report Preview
      </div>
      <div style="padding: 16px; background-color: #f8fafc;">
        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px;" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="font-size: 10px; font-weight: 700; color: #059669; background-color: #ecfdf5; padding: 3px 6px; border-radius: 4px; text-transform: uppercase;">Opportunity #1</span>
              </td>
              <td style="text-align: right;">
                <span style="font-size: 11px; font-weight: 600; color: #059669;">Likelihood: High</span>
              </td>
            </tr>
          </table>
          <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold; color: #0f172a;">SR&ED Tax Credit</p>
          <p style="margin: 0 0 12px 0; font-size: 16px; font-weight: 800; color: #059669;">Est. Benefit: $42,000</p>
          <div style="border-top: 1px solid #f1f5f9; padding-top: 10px; margin-top: 10px;">
            <p style="margin: 0 0 6px 0; font-size: 10px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 0.03em;">Required Actions:</p>
            <table style="width: 100%; border-collapse: collapse;" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align: top; width: 14px; font-size: 12px; color: #64748b; padding-bottom: 4px;">•</td>
                <td style="vertical-align: top; font-size: 12px; color: #475569; padding-bottom: 4px;">Technical project summary setup</td>
              </tr>
              <tr>
                <td style="vertical-align: top; width: 14px; font-size: 12px; color: #64748b; padding-bottom: 4px;">•</td>
                <td style="vertical-align: top; font-size: 12px; color: #475569; padding-bottom: 4px;">Payroll & subcontractor expense tracking</td>
              </tr>
              <tr>
                <td style="vertical-align: top; width: 14px; font-size: 12px; color: #64748b;">•</td>
                <td style="vertical-align: top; font-size: 12px; color: #475569;">Technical claim preparation</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildReportPreviewText() {
  return `Funding Eligibility Report Preview
--------------------------------------
Opportunity #1: SR&ED Tax Credit
Estimated Benefit: $42,000
Likelihood: High
Required Actions:
- Technical project summary setup
- Payroll & subcontractor expense tracking
- Technical claim preparation`;
}

function baseHtml({ 
  firstName, 
  body, 
  cta, 
  replyToEmail, 
  btnText = 'Secure Audit & Report',
  recapHtml = ''
}: { 
  firstName: string; 
  body: string; 
  cta: string; 
  replyToEmail: string;
  btnText?: string;
  recapHtml?: string;
}) {
  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.05);">
        <div style="display:none;max-height:0;overflow:hidden;color:transparent">FSI Digital: Your funding audit and report details.</div>
        
        <!-- Brand Header -->
        <div style="padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; margin-bottom: 24px; display: table; width: 100%;">
          <span style="font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; display: table-cell;">FSI <span style="color: #059669;">Digital</span></span>
          <span style="font-size: 12px; font-weight: 600; color: #64748b; background-color: #f1f5f9; padding: 4px 8px; border-radius: 4px; display: table-cell; text-align: right; width: 100px;">Advisory Desk</span>
        </div>

        <p style="margin:0 0 16px 0;font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>
        
        <div style="font-size:15px;color:#334155;line-height:1.6;">
          ${body}
        </div>
        
        ${recapHtml}

        <!-- Value Justification Box -->
        ${buildValueBoxHtml()}

        <!-- Positioning Statement -->
        <p style="margin:24px 0 12px 0;font-size:13.5px;font-weight:bold;color:#0f172a;line-height:1.5;text-align:left;">
          You're not paying for a call. You're paying for a custom Funding Eligibility Report and funding assessment prepared for your business.
        </p>

        <!-- Call to Action Button -->
        <div style="margin:0 0 28px 0;text-align:left;">
          <a href="${cta}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:#059669;color:#ffffff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;text-align:center;box-shadow:0 4px 6px -1px rgba(5,150,105,0.15);">${btnText}</a>
        </div>

        <!-- Trust Footer -->
        <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:24px 0 0 0;font-size:12px;line-height:1.5;color:#475569;text-align:left;">
          <p style="margin:0 0 4px 0;font-weight:bold;color:#0f172a;">About FSI Digital</p>
          <p style="margin:0 0 6px 0;">FSI Digital is an independent private advisory firm. We are not affiliated with the Government of Canada or any government funding agency.</p>
          <p style="margin:0;">We help businesses identify, evaluate, and pursue relevant grants, tax credits, and funding programs.</p>
        </div>

        <!-- Footer Signature -->
        <div style="padding-top:20px;border-top:1px solid #f1f5f9;margin-top:28px;">
          <p style="margin:0;font-size:14px;color:#475569;line-height:1.5;">
            Best regards,<br/>
            <strong>Ashwani K</strong><br/>
            <span style="color:#64748b;font-size:13px;">Founder, FSI Digital</span><br/>
            <a href="mailto:${replyToEmail}" style="color:#2563eb;text-decoration:none;font-size:13px;">${replyToEmail}</a>
          </p>
          <p style="margin:24px 0 0 0;font-size:12px;color:#94a3b8;line-height:1.4;">
            If this is not useful, reply "unsubscribe" to close your file.
          </p>
        </div>
      </div>
    </div>
  `;
}

// Re-map contents for the 3-step sequence
export function getEmailContent(
  stage: StrategyRecoveryEmailStage, 
  firstName: string, 
  consultationUrl: string, 
  replyToEmail: string,
  recoveryId?: string,
  bookedAt?: number
) {
  const recpHtml = buildRecapHtml(recoveryId, bookedAt);

  if (stage === 'value_24h') {
    const subject = 'Pending Audit: Activating pre-call funding eligibility review...';
    const bodyHtml = bookedAt
      ? `<p style="margin:0 0 16px 0;">This is a final reminder that your provisionally scheduled Funding Eligibility Audit time slot is still held under our active review queue.</p>
         <p style="margin:0 0 20px 0;">To begin your custom funding eligibility review, we require completion of the refundable research deposit. This allows us to compile your personalized Funding Eligibility Report before our call.</p>`
      : `<p style="margin:0 0 16px 0;">This is a final reminder that your pending Funding Eligibility Audit and Report is still held under our active review queue.</p>
         <p style="margin:0 0 20px 0;">To begin your custom funding eligibility review, we require completion of the refundable research deposit. This allows us to compile your personalized Funding Eligibility Report before our call.</p>`;

    const ctaTextHtml = bookedAt
      ? `<p style="margin:20px 0 0 0;">You can reserve your slot and secure your eligibility review here:</p>`
      : `<p style="margin:20px 0 0 0;">You can activate your review file and secure your eligibility review here:</p>`;

    const textBody = bookedAt
      ? `This is a final reminder that your provisionally scheduled Funding Eligibility Audit time slot is still held under our active review queue.

To begin your custom funding eligibility review, we require completion of the refundable research deposit. This allows us to compile your personalized Funding Eligibility Report before our call.`
      : `This is a final reminder that your pending Funding Eligibility Audit and Report is still held under our active review queue.

To begin your custom funding eligibility review, we require completion of the refundable research deposit. This allows us to compile your personalized Funding Eligibility Report before our call.`;

    const textCta = bookedAt ? 'You can secure your session here:' : 'You can secure your audit here:';

    return {
      subject,
      html: baseHtml({
        firstName,
        cta: consultationUrl,
        replyToEmail,
        btnText: 'Secure Audit & Report',
        recapHtml: recpHtml,
        body: `
          ${bodyHtml}
          
          ${buildReportPreviewHtml()}

          <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:18px;margin:24px 0;">
            <p style="margin:0 0 12px 0;font-size:13px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.05em;">Pre-Call Funding Review Criteria:</p>
            <table style="width:100%;border-collapse:collapse;margin:0;" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:top;width:24px;padding-bottom:12px;font-size:14px;color:#059669;font-weight:bold;">✓</td>
                <td style="vertical-align:top;padding-bottom:12px;font-size:14px;color:#475569;line-height:1.5;">
                  <strong>Tax Incentive Eligibility:</strong> Custom funding eligibility review of entity age, payroll records, and R&D activities for SR&ED program compatibility.
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top;width:24px;padding-bottom:12px;font-size:14px;color:#059669;font-weight:bold;">✓</td>
                <td style="vertical-align:top;padding-bottom:12px;font-size:14px;color:#475569;line-height:1.5;">
                  <strong>Federal & Regional Subsidies:</strong> Funding opportunity assessment matching project timelines against current IRAP and regional technology grants.
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top;width:24px;font-size:14px;color:#059669;font-weight:bold;">✓</td>
                <td style="vertical-align:top;font-size:14px;color:#475569;line-height:1.5;">
                  <strong>Capital Stacking Strategy:</strong> Structuring regional hiring credits with federal innovation grants to maximize non-dilutive capital.
                </td>
              </tr>
            </table>
          </div>

          ${ctaTextHtml}
        `,
      }),
      text: `Hi ${firstName},
 
${textBody}
 
${buildReportPreviewText()}

Pre-Call Funding Review Criteria:
- Tax Incentive Eligibility: Custom funding eligibility review of entity age, payroll records, and R&D activities for SR&ED program compatibility.
- Federal & Regional Subsidies: Funding opportunity assessment matching project timelines against current IRAP and regional technology grants.
- Capital Stacking Strategy: Structuring regional hiring credits with federal innovation grants to maximize non-dilutive capital.
 
${buildValueBoxText()}
 
${textCta}
${consultationUrl}
 
Best regards,
Ashwani K
Founder, FSI Digital
${replyToEmail}`,
    };
  }

  if (stage === 'objection_3d') {
    const subject = bookedAt 
      ? 'Final reminder: Your audit slot is about to be released...'
      : 'Final reminder: Your funding audit is about to be closed...';
      
    const bodyHtml = bookedAt
      ? `<p style="margin:0 0 16px 0;">This is the final reminder that your provisionally scheduled Funding Eligibility Audit time slot is about to expire and be released back to the public calendar.</p>
         <p style="margin:0 0 16px 0;">Before we close your pending file, I wanted to share answers to the three most frequent questions we receive from founders:</p>
         
         <div style="margin:20px 0;border-left:3px solid #059669;padding-left:16px;text-align:left;">
           <p style="margin:0 0 4px 0;font-size:14px;font-weight:700;color:#0f172a;">Are you a government agency?</p>
           <p style="margin:0;font-size:13px;color:#475569;line-height:1.5;">No. FSI Digital is an independent private consultancy. We are not affiliated with the Government of Canada or any government department. We work on behalf of the business owner to find and stack programs.</p>
         </div>

         <div style="margin:20px 0;border-left:3px solid #059669;padding-left:16px;text-align:left;">
           <p style="margin:0 0 4px 0;font-size:14px;font-weight:700;color:#0f172a;">Can I apply by myself?</p>
           <p style="margin:0;font-size:13px;color:#475569;line-height:1.5;">Yes, you can apply directly. We are hired by founders who want to avoid filing errors, delegate administrative hours, and ensure they stack programs correctly to get the highest cash yield.</p>
         </div>

         <div style="margin:20px 0;border-left:3px solid #059669;padding-left:16px;text-align:left;">
           <p style="margin:0 0 4px 0;font-size:14px;font-weight:700;color:#0f172a;">What does the $199 deposit cover?</p>
           <p style="margin:0;font-size:13px;color:#475569;line-height:1.5;">It pays for a custom funding eligibility review of your profile, research matches, and compiling your custom Funding Eligibility Report. It is fully refunded if no matches are found, and 100% credited if you partner with us.</p>
         </div>`
      : `<p style="margin:0 0 16px 0;">This is the final reminder that your pending Funding Eligibility Audit and Report is about to expire and your file will be closed.</p>
         <p style="margin:0 0 16px 0;">Before we close your pending file, I wanted to share answers to the three most frequent questions we receive from founders:</p>
         
         <div style="margin:20px 0;border-left:3px solid #059669;padding-left:16px;text-align:left;">
           <p style="margin:0 0 4px 0;font-size:14px;font-weight:700;color:#0f172a;">Are you a government agency?</p>
           <p style="margin:0;font-size:13px;color:#475569;line-height:1.5;">No. FSI Digital is an independent private consultancy. We are not affiliated with the Government of Canada or any government department. We work on behalf of the business owner to find and stack programs.</p>
         </div>

         <div style="margin:20px 0;border-left:3px solid #059669;padding-left:16px;text-align:left;">
           <p style="margin:0 0 4px 0;font-size:14px;font-weight:700;color:#0f172a;">Can I apply by myself?</p>
           <p style="margin:0;font-size:13px;color:#475569;line-height:1.5;">Yes, you can apply directly. We are hired by founders who want to avoid filing errors, delegate administrative hours, and ensure they stack programs correctly to get the highest cash yield.</p>
         </div>

         <div style="margin:20px 0;border-left:3px solid #059669;padding-left:16px;text-align:left;">
           <p style="margin:0 0 4px 0;font-size:14px;font-weight:700;color:#0f172a;">What does the $199 deposit cover?</p>
           <p style="margin:0;font-size:13px;color:#475569;line-height:1.5;">It pays for a custom funding eligibility review of your profile, research matches, and compiling your custom Funding Eligibility Report. It is fully refunded if no matches are found, and 100% credited if you partner with us.</p>
         </div>`;

    const ctaTextHtml = bookedAt
      ? `<p style="margin:20px 0 0 0;">If you want to keep your scheduled slot, you can complete checkout here before your reservation expires:</p>`
      : `<p style="margin:20px 0 0 0;">If you want to activate your audit, you can complete checkout here before your file expires:</p>`;

    const textBody = bookedAt
      ? `This is the final reminder that your provisionally scheduled Funding Eligibility Audit time slot is about to expire and be released back to the public calendar.`
      : `This is the final reminder that your pending Funding Eligibility Audit is about to expire and your file will be closed.`;

    const textCta = bookedAt ? 'You can book your session here:' : 'You can secure your audit here:';

    return {
      subject,
      html: baseHtml({
        firstName,
        cta: consultationUrl,
        replyToEmail,
        btnText: 'Secure Audit & Report',
        recapHtml: recpHtml,
        body: `
          ${bodyHtml}
          ${buildReportPreviewHtml()}
          ${ctaTextHtml}
        `,
      }),
      text: `Hi ${firstName},
  
${textBody}

Before we close your pending file, I wanted to share answers to the three most frequent questions we receive from founders:

1. Are you a government agency?
No. FSI Digital is an independent private consultancy. We are not affiliated with the Government of Canada or any government department. We work on behalf of the business owner to find and stack programs.

2. Can I apply by myself?
Yes, you can apply directly. We are hired by founders who want to avoid filing errors, delegate administrative hours, and ensure they stack programs correctly to get the highest cash yield.

3. What does the $199 deposit cover?
It pays for a custom funding eligibility review of your profile, research matches, and compiling your custom Funding Eligibility Report. It is fully refunded if no matches are found, and 100% credited if you partner with us.

${buildReportPreviewText()}

${buildValueBoxText()}
  
${textCta}
${consultationUrl}
  
Best regards,
Ashwani K
Founder, FSI Digital
${replyToEmail}`,
    };
  }

  if (stage === 'final_7d') {
    const ctaTextHtml = bookedAt
      ? `<p style="margin:0 0 20px 0;">If you still want us to complete your custom funding eligibility review and build your Funding Eligibility Report, this is your final opportunity to lock in your slot:</p>`
      : `<p style="margin:0 0 20px 0;">If you still want us to complete your custom funding eligibility review and build your Funding Eligibility Report, this is your final opportunity to activate your file:</p>`;

    const listCtaHtml = bookedAt
      ? `<a href="${consultationUrl}" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:none;font-weight:600;">Secure your Audit slot here</a>`
      : `<a href="${consultationUrl}" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:none;font-weight:600;">Secure your Audit and Report here</a>`;

    const textBody = bookedAt
      ? `If you still want us to complete your custom funding eligibility review and build your Funding Eligibility Report, this is your final opportunity to book:`
      : `If you still want us to complete your custom funding eligibility review and build your Funding Eligibility Report, this is your final opportunity to secure your audit:`;

    return {
      subject: 'Should I close your funding review file?',
      html: baseHtml({
        firstName,
        cta: consultationUrl,
        replyToEmail,
        btnText: 'Secure Audit & Report',
        recapHtml: recpHtml,
        body: `
          <p style="margin:0 0 16px 0;">We haven't heard back regarding your funding review request.</p>
          <p style="margin:0 0 16px 0;">I will go ahead and close your funding review file tomorrow so our team can focus on active applicants in our queue.</p>
          ${ctaTextHtml}

          <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:18px;margin:20px 0;font-size:14px;color:#475569;line-height:1.6;">
            <strong style="color:#0f172a;display:block;margin-bottom:8px;">Your Options:</strong>
            <table style="width:100%;border-collapse:collapse;margin:0;" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:top;width:18px;color:#2563eb;font-weight:bold;">•</td>
                <td style="vertical-align:top;font-size:14px;color:#334155;padding-bottom:8px;">
                  ${listCtaHtml}
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top;width:18px;color:#475569;font-weight:bold;">•</td>
                <td style="vertical-align:top;font-size:14px;color:#475569;padding-bottom:8px;">
                  Reply directly to this email with any quick questions.
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top;width:18px;color:#475569;font-weight:bold;">•</td>
                <td style="vertical-align:top;font-size:14px;color:#475569;">
                  Reply "unsubscribe" to close your file immediately.
                </td>
              </tr>
            </table>
          </div>

          <p style="margin:20px 0 0 0;">Otherwise, I wish you the best of luck in scaling your business this year.</p>
        `,
      }),
      text: `Hi ${firstName},
 
We haven't heard back regarding your funding review request.
 
I will go ahead and close your funding review file tomorrow so our team can focus on active applicants in our queue.
 
${textBody}
${consultationUrl}
 
Otherwise, I wish you the best of luck in scaling your business this year.
 
Best regards,
Ashwani K
Founder, FSI Digital
${replyToEmail}`,
    };
  }

  const subject = bookedAt
    ? 'Provisional Reservation: Confirming your Funding Eligibility Audit'
    : 'Pending: Confirming your Funding Eligibility Audit';

  const bodyHtml = bookedAt
    ? `<p style="margin:0 0 16px 0;">This is a confirmation that your selected Google Meet time slot for your Funding Eligibility Audit has been provisionally reserved.</p>
       <p style="margin:0 0 20px 0;">To activate your reservation and compile your custom Funding Eligibility Report, please complete your research deposit within the next 60 minutes.</p>`
    : `<p style="margin:0 0 16px 0;">This is a confirmation that your Funding Eligibility Audit and custom Funding Eligibility Report has been successfully generated and is currently pending activation.</p>
       <p style="margin:0 0 20px 0;">To activate your profile and compile your custom Funding Eligibility Report, please complete your research deposit within the next 60 minutes.</p>`;

  const ctaTextHtml = bookedAt
    ? `<p style="margin:20px 0 0 0;">Complete your checkout here before your reservation expires to secure your session and report:</p>`
    : `<p style="margin:20px 0 0 0;">Complete your checkout here to activate your audit and compile your report:</p>`;

  const textSubject = bookedAt
    ? `Your audit time slot is temporarily reserved. Complete your research deposit within 60 minutes to secure your session.`
    : `Your Funding Eligibility Audit and custom Funding Eligibility Report is pending. Complete your research deposit within 60 minutes to activate your audit and report.`;

  return {
    subject,
    html: baseHtml({
      firstName,
      cta: consultationUrl,
      replyToEmail,
      btnText: 'Secure Audit & Report',
      recapHtml: recpHtml,
      body: `
        ${bodyHtml}

        ${buildReportPreviewHtml()}

        <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:18px;margin:24px 0;">
          <p style="margin:0 0 14px 0;font-size:13px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.05em;">Your Funding Eligibility Report will show:</p>
          <table style="width:100%;border-collapse:collapse;margin:0;" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:top;width:24px;padding-bottom:10px;font-size:14px;color:#059669;font-weight:bold;">✓</td>
              <td style="vertical-align:top;padding-bottom:10px;font-size:14px;color:#475569;line-height:1.5;">
                <strong>Priority Matches:</strong> Which grant, tax credit, and loan programs you should apply for first.
              </td>
            </tr>
            <tr>
              <td style="vertical-align:top;width:24px;padding-bottom:10px;font-size:14px;color:#059669;font-weight:bold;">✓</td>
              <td style="vertical-align:top;padding-bottom:10px;font-size:14px;color:#475569;line-height:1.5;">
                <strong>Funding Estimates:</strong> How much capital your business can realistically expect to win.
              </td>
            </tr>
            <tr>
              <td style="vertical-align:top;width:24px;font-size:14px;color:#059669;font-weight:bold;">✓</td>
              <td style="vertical-align:top;font-size:14px;color:#475569;line-height:1.5;">
                <strong>Key Requirements:</strong> Specific application criteria, stacking parameters, and upcoming filing deadlines.
              </td>
            </tr>
          </table>
        </div>

        ${ctaTextHtml}
      `,
    }),
    text: `Hi ${firstName},
${textSubject}
 
${buildReportPreviewText()}

The audit includes a custom funding eligibility review, a personalized Funding Eligibility Report, your top eligible program matches, and a private strategy consultation to plan next steps.
 
${buildValueBoxText()}
 
Best regards,
Ashwani K
Founder, FSI Digital
${replyToEmail}`,
  };
}

export async function sendStrategyRecoveryEmail({
  to,
  name,
  source = 'strategy-session-recovery',
  stage,
  recoveryId,
  bookedAt,
}: StrategyRecoveryEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'FSI Digital <hello@fsidigital.ca>';
  const replyToEmail = process.env.RESEND_REPLY_TO_EMAIL || 'ashwani@fsidigital.ca';

  if (!apiKey) {
    console.warn('Strategy session recovery email skipped because RESEND_API_KEY is not set.');
    return { success: false, skipped: true };
  }

  const consultationParams = new URLSearchParams({ source: stage });
  if (recoveryId) {
    consultationParams.set('rid', recoveryId);
  }
  if (bookedAt) {
    consultationParams.set('booked_at', String(bookedAt));
  }
  consultationParams.set('scheduled', 'true');
  const consultationUrl = `https://www.fsidigital.ca/consultation?${consultationParams.toString()}`;
  const firstName = getFirstName(name);
  const content = getEmailContent(stage, firstName, consultationUrl, replyToEmail, recoveryId, bookedAt);

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
      subject: content.subject,
      html: content.html,
      text: content.text,
      tags: [
        { name: 'source', value: source.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 50) },
        { name: 'type', value: 'strategy-session-recovery' },
        { name: 'stage', value: stage },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Resend strategy session recovery email failed:', errorText);
    return { success: false, error: errorText };
  }

  return { success: true };
}
