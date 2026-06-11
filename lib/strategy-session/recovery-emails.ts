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
  if (!recoveryId && !bookedAt) return '';

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
          <td style="font-size: 13px; color: #0f172a; padding: 4px 0; text-align: right; font-weight: bold;">Michael Thompson (Senior Analyst)</td>
        </tr>
      </table>
    </div>
  `;
}

function baseHtml({ 
  firstName, 
  body, 
  cta, 
  replyToEmail, 
  btnText = 'Secure Audit & Roadmap',
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
        <div style="display:none;max-height:0;overflow:hidden;color:transparent">FSI Digital: Your funding audit and roadmap details.</div>
        
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

        <!-- Call to Action Button -->
        <div style="margin:28px 0;text-align:left;">
          <a href="${cta}" style="display:inline-block;background-color:#059669;color:#ffffff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;text-align:center;box-shadow:0 4px 6px -1px rgba(5,150,105,0.15);">${btnText}</a>
        </div>

        <!-- Footer Signature -->
        <div style="padding-top:20px;border-top:1px solid #f1f5f9;margin-top:28px;">
          <p style="margin:0;font-size:14px;color:#475569;line-height:1.5;">
            Best regards,<br/>
            <strong>Michael Thompson</strong><br/>
            <span style="color:#64748b;font-size:13px;">Senior Funding Analyst, FSI Digital</span><br/>
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
function getEmailContent(
  stage: StrategyRecoveryEmailStage, 
  firstName: string, 
  consultationUrl: string, 
  replyToEmail: string,
  recoveryId?: string,
  bookedAt?: number
) {
  const recpHtml = buildRecapHtml(recoveryId, bookedAt);

  if (stage === 'value_24h') {
    return {
      subject: 'Pending Audit: Activating pre-call R&D and tax credit research...',
      html: baseHtml({
        firstName,
        cta: consultationUrl,
        replyToEmail,
        btnText: 'Secure Audit & Roadmap',
        recapHtml: recpHtml,
        body: `
          <p style="margin:0 0 16px 0;">This is a final reminder that your provisionally scheduled Funding Eligibility Audit time slot is still held under our active review queue.</p>
          <p style="margin:0 0 20px 0;">To begin manual pre-call analysis, our research team requires completion of the refundable research deposit. This secures analyst time to review your entity parameters against active directories.</p>
          
          <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:18px;margin:24px 0;">
            <p style="margin:0 0 12px 0;font-size:13px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.05em;">Pre-Call Analyst Research Criteria:</p>
            <table style="width:100%;border-collapse:collapse;margin:0;" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:top;width:24px;padding-bottom:12px;font-size:14px;color:#059669;font-weight:bold;">✓</td>
                <td style="vertical-align:top;padding-bottom:12px;font-size:14px;color:#475569;line-height:1.5;">
                  <strong>Tax Incentive Eligibility:</strong> Manual audit of entity age, payroll records, and R&D activities for SR&ED program compatibility.
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top;width:24px;padding-bottom:12px;font-size:14px;color:#059669;font-weight:bold;">✓</td>
                <td style="vertical-align:top;padding-bottom:12px;font-size:14px;color:#475569;line-height:1.5;">
                  <strong>Federal & Regional Subsidies:</strong> Matching project timelines against current IRAP and regional technology grants.
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

          <div style="background-color:#f5f3ff;border:1px solid #ddd6fe;border-radius:8px;padding:12px 14px;margin:20px 0;font-size:13px;color:#3b0764;">
            🎁 <strong>100% Credit:</strong> Your pre-call research deposit is fully credited toward our full-service application preparation and submission support if you choose to partner with us.
          </div>

          <div style="background-color:#ecfdf5;border:1px dashed #34d399;border-radius:8px;padding:14px 16px;margin:20px 0;font-size:13.5px;color:#064e3b;line-height:1.5;">
            <strong>Eligibility Guarantee:</strong> If our analysts determine that your business is not eligible for any active funding opportunities, your research deposit is refunded in full.
          </div>

          <p style="margin:20px 0 0 0;">You can reserve your slot and lock in your research audit here:</p>
        `,
      }),
      text: `Hi ${firstName},
 
This is a final reminder that your provisionally scheduled Funding Eligibility Audit time slot is still held under our active review queue.
 
To begin manual pre-call analysis, our research team requires completion of the refundable research deposit. This secures analyst time to review your entity parameters against active directories.
 
Pre-Call Analyst Research Criteria:
- Tax Incentive Eligibility: Manual audit of entity age, payroll records, and R&D activities for SR&ED program compatibility.
- Federal & Regional Subsidies: Matching project timelines against current IRAP and regional technology grants.
- Capital Stacking Strategy: Structuring regional hiring credits with federal innovation grants to maximize non-dilutive capital.
 
Your research deposit is 100% credited toward full-service application preparation and submission support if you choose to partner with us.
 
Eligibility Guarantee: If our analysts determine that your business is not eligible for any active funding opportunities, your research deposit is refunded in full.
 
You can secure your session here:
${consultationUrl}
 
Best regards,
Michael Thompson
Senior Funding Analyst
FSI Digital
${replyToEmail}`,
    };
  }

  if (stage === 'objection_3d') {
    return {
      subject: 'Final reminder: Your audit slot is about to be released...',
      html: baseHtml({
        firstName,
        cta: consultationUrl,
        replyToEmail,
        btnText: 'Secure Audit & Roadmap',
        recapHtml: recpHtml,
        body: `
          <p style="margin:0 0 16px 0;">This is the final reminder that your provisionally scheduled Funding Eligibility Audit time slot is about to expire and be released back to the public calendar.</p>
          <p style="margin:0 0 20px 0;">We want this process to be completely risk-free for you. That is why we back our manual audits with an eligibility refund guarantee.</p>

          <div style="background-color:#ecfdf5;border:1px solid #a7f3d0;border-radius:10px;padding:20px;margin:24px 0;">
            <p style="margin:0 0 8px 0;font-size:15px;font-weight:700;color:#064e3b;">Our Eligibility Guarantee</p>
            <p style="margin:0;font-size:14px;color:#047857;line-height:1.6;">
              If our analysts determine that your business is not eligible for any active funding opportunities, your research deposit is refunded in full.
            </p>
            <p style="margin:10px 0 0 0;font-size:13px;color:#059669;font-style:italic;">
              This means you only pay if we find real funding opportunities for your business. If we find nothing, it costs you $0. If we do find opportunities, your deposit is 100% credited toward our full-service preparation and submission support if we partner together.
            </p>
          </div>

          <p style="margin:20px 0 0 0;">If you want to keep your scheduled slot, you can complete checkout here before your reservation expires:</p>
        `,
      }),
      text: `Hi ${firstName},
 
This is the final reminder that your provisionally scheduled Funding Eligibility Audit time slot is about to expire and be released back to the public calendar.
 
We want this process to be completely risk-free for you. That is why we back our manual audits with an eligibility refund guarantee.
 
If our analysts determine that your business is not eligible for any active funding opportunities, your research deposit is refunded in full.
 
This means you only pay if we find real funding opportunities for your business. If we find nothing, it costs you $0. If we do find opportunities, your deposit is 100% credited toward our full-service preparation and submission support if we partner together.
 
You can book your session here:
${consultationUrl}
 
Best regards,
Michael Thompson
Senior Funding Analyst
FSI Digital
${replyToEmail}`,
    };
  }

  if (stage === 'final_7d') {
    return {
      subject: 'Should I close your funding review file?',
      html: baseHtml({
        firstName,
        cta: consultationUrl,
        replyToEmail,
        btnText: 'Secure Audit & Roadmap',
        recapHtml: recpHtml,
        body: `
          <p style="margin:0 0 16px 0;">I haven't heard back from you, so I assume finding government funding isn't a priority for your business right now.</p>
          <p style="margin:0 0 16px 0;">I will go ahead and close your funding review file tomorrow so our team can focus on active applicants in our queue.</p>
          <p style="margin:0 0 20px 0;">If you still want us to complete your 2-hour research audit and build your custom roadmap, this is your final opportunity to lock in your slot:</p>

          <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:18px;margin:20px 0;font-size:14px;color:#475569;line-height:1.6;">
            <strong style="color:#0f172a;display:block;margin-bottom:8px;">Your Options:</strong>
            <table style="width:100%;border-collapse:collapse;margin:0;" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:top;width:18px;color:#2563eb;font-weight:bold;">•</td>
                <td style="vertical-align:top;font-size:14px;color:#334155;padding-bottom:8px;">
                  <a href="${consultationUrl}" style="color:#2563eb;text-decoration:none;font-weight:600;">Secure your Audit slot here</a>
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
 
I haven't heard back from you, so I assume finding government funding isn't a priority for your business right now.
 
I will go ahead and close your funding review file tomorrow so our team can focus on active applicants in our queue.
 
If you still want us to complete your 2-hour research audit and build your custom roadmap, this is your final opportunity to book:
${consultationUrl}
 
Otherwise, I wish you the best of luck in scaling your business this year.
 
Best regards,
Michael Thompson
Senior Funding Analyst
FSI Digital
${replyToEmail}`,
    };
  }

  return {
    subject: 'Provisional Reservation: Confirming your Funding Eligibility Audit',
    html: baseHtml({
      firstName,
      cta: consultationUrl,
      replyToEmail,
      btnText: 'Secure Audit & Roadmap',
      recapHtml: recpHtml,
      body: `
        <p style="margin:0 0 16px 0;">This is a confirmation that your selected Google Meet time slot for your Funding Eligibility Audit has been provisionally reserved.</p>
        <p style="margin:0 0 20px 0;">To activate your reservation and allow our analysts to allocate time to compile your custom pre-call research report, please complete your research deposit within the next 60 minutes.</p>

        <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:18px;margin:24px 0;">
          <p style="margin:0 0 14px 0;font-size:13px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.05em;">On our call, your analyst will deliver a Funding Roadmap showing:</p>
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

        <div style="background-color:#f5f3ff;border:1px solid #ddd6fe;border-radius:8px;padding:12px 14px;margin:20px 0;font-size:13px;color:#3b0764;">
          🎁 <strong>100% Credit:</strong> Your pre-call research deposit is fully credited toward our full-service application preparation and submission support if you choose to partner with us.
        </div>

        <div style="background-color:#ecfdf5;border:1px dashed #34d399;border-radius:8px;padding:14px 16px;margin:20px 0;font-size:13.5px;color:#064e3b;line-height:1.5;">
          <strong>Eligibility Guarantee:</strong> If our analysts determine that your business is not eligible for any active funding opportunities, your research deposit is refunded in full.
        </div>

        <p style="margin:20px 0 0 0;">Let's get your funding roadmap sorted. Complete your checkout here before your reservation expires:</p>
      `,
    }),
    text: `Hi ${firstName},
Your audit time slot is temporarily reserved. Complete your research deposit within 60 minutes to secure your session.
 
The audit includes 2 hours of pre-call desk research, a personalized Business Funding Roadmap, your top eligible program matches, and a private Google Meet call to plan next steps.
 
Your research deposit is 100% credited toward full-service application preparation and submission support if you choose to partner with us.
 
Eligibility Guarantee: If our analysts determine that your business is not eligible for any active funding opportunities, your research deposit is refunded in full.
 
Best regards,
Michael Thompson
Senior Funding Analyst
FSI Digital
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
