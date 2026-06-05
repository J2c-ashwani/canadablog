import type { StrategyRecoveryEmailStage } from '@/lib/strategy-session/recovery-store';

type StrategyRecoveryEmailInput = {
  to: string;
  name?: string;
  source?: string;
  stage: StrategyRecoveryEmailStage;
  recoveryId?: string;
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

function baseHtml({ firstName, body, cta, replyToEmail }: { firstName: string; body: string; cta: string; replyToEmail: string }) {
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;line-height:1.7;color:#334155;max-width:580px;margin:0 auto;padding:24px;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;">
      <div style="display:none;max-height:0;overflow:hidden;color:transparent">FSI Digital: Your funding strategy session details.</div>
      
      <!-- Brand Header -->
      <div style="padding-bottom:16px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;">
        <span style="font-size:18px;font-weight:700;color:#0f172a;letter-spacing:-0.02em;">FSI <span style="color:#10b981;">Digital</span></span>
      </div>

      <p style="margin:0 0 16px 0;font-size:15px;color:#334155;">Hi ${firstName},</p>
      
      <div style="font-size:15px;color:#334155;">
        ${body}
      </div>
      
      <!-- Call to Action Button -->
      <div style="margin:28px 0;text-align:left;">
        <a href="${cta}" style="display:inline-block;background-color:#0f172a;background:linear-gradient(135deg, #1e293b 0%, #0f172a 100%);color:#ffffff;padding:14px 26px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;text-align:center;box-shadow:0 4px 6px -1px rgba(15,23,42,0.15);">Book Strategy Session — $199</a>
      </div>

      <!-- Footer Signature -->
      <div style="padding-top:20px;border-top:1px solid #f1f5f9;margin-top:28px;">
        <p style="margin:0;font-size:14px;color:#475569;line-height:1.5;">
          Best regards,<br/>
          <strong>Ashwani</strong><br/>
          <span style="color:#64748b;font-size:13px;">Founder, FSI Digital</span><br/>
          <a href="mailto:${replyToEmail}" style="color:#2563eb;text-decoration:none;font-size:13px;">${replyToEmail}</a>
        </p>
        <p style="margin:24px 0 0 0;font-size:12px;color:#94a3b8;line-height:1.4;">
          If this is not useful, reply "unsubscribe" and we will stop sending follow-ups.
        </p>
      </div>
    </div>
  `;
}

function getEmailContent(stage: StrategyRecoveryEmailStage, firstName: string, consultationUrl: string, replyToEmail: string) {
  if (stage === 'value_24h') {
    return {
      subject: 'Your funding roadmap is still available',
      html: baseHtml({
        firstName,
        cta: consultationUrl,
        replyToEmail,
        body: `
          <p style="margin:0 0 16px 0;">Your funding profile is still in our queue, waiting for a formal review.</p>
          <p style="margin:0 0 20px 0;">The <strong>$199 Strategy Session</strong> is designed to turn your submitted details into a concrete, step-by-step funding plan:</p>
          
          <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:18px;margin:24px 0;">
            <table style="width:100%;border-collapse:collapse;margin:0;" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:top;width:24px;padding-bottom:12px;font-size:14px;color:#10b981;font-weight:bold;">✓</td>
                <td style="vertical-align:top;padding-bottom:12px;font-size:14px;color:#475569;line-height:1.5;">
                  <strong>2 Hours Pre-Call Desk Research:</strong> Handled by our analysts on your business, industry, and region.
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top;width:24px;padding-bottom:12px;font-size:14px;color:#10b981;font-weight:bold;">✓</td>
                <td style="vertical-align:top;padding-bottom:12px;font-size:14px;color:#475569;line-height:1.5;">
                  <strong>Personalized Funding Roadmap:</strong> Covers grants, government loans, and tax credits you qualify for.
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top;width:24px;padding-bottom:12px;font-size:14px;color:#10b981;font-weight:bold;">✓</td>
                <td style="vertical-align:top;padding-bottom:12px;font-size:14px;color:#475569;line-height:1.5;">
                  <strong>Top Program Matches:</strong> Ranked by eligibility fit and next action items.
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top;width:24px;font-size:14px;color:#10b981;font-weight:bold;">✓</td>
                <td style="vertical-align:top;font-size:14px;color:#475569;line-height:1.5;">
                  <strong>Private Google Meet Call:</strong> A focused 30-minute session to discuss results and plan application stages.
                </td>
              </tr>
            </table>
          </div>

          <div style="background-color:#ecfdf5;border:1px dashed #34d399;border-radius:8px;padding:14px 16px;margin:20px 0;font-size:13.5px;color:#064e3b;line-height:1.5;">
            <strong>Zero-Risk Guarantee:</strong> If our research shows you have zero viable funding options, your fee is refunded in full, instantly.
          </div>

          <p style="margin:20px 0 0 0;">You can reserve your session and start your research here:</p>
        `,
      }),
      text: `Hi ${firstName},
 
Your funding profile is still waiting for review.
 
The $199 Strategy Session is designed to turn your submitted details into a practical funding action plan:
- 2 hours of pre-call desk research on your business, industry, and region.
- A personalized Business Funding Roadmap across grants, loans, and tax credits.
- Your top eligible program matches ranked by fit and next action.
- A private Google Meet call to decide what to pursue first.
 
You can secure your session here:
${consultationUrl}
 
Best regards,
Ashwani
FSI Digital
${replyToEmail}
 
If this is not useful, reply "unsubscribe" and we will stop sending follow-ups.`,
    };
  }
 
  if (stage === 'objection_3d') {
    return {
      subject: 'What if your business does not qualify?',
      html: baseHtml({
        firstName,
        cta: consultationUrl,
        replyToEmail,
        body: `
          <p style="margin:0 0 16px 0;">A very common question business owners ask before booking is: <em>"What if my business doesn't qualify for anything?"</em></p>
          <p style="margin:0 0 20px 0;">That's exactly why we do the <strong>2 hours of pre-call desk research</strong> first. Before we jump on a call, our team reviews your industry, region, entity type, and funding goals against all active programs.</p>

          <div style="background-color:#ecfdf5;border:1px solid #a7f3d0;border-radius:10px;padding:20px;margin:24px 0;">
            <p style="margin:0 0 8px 0;font-size:15px;font-weight:700;color:#064e3b;">Our Refund Guarantee Policy</p>
            <p style="margin:0;font-size:14px;color:#047857;line-height:1.6;">
              If our pre-call research reveals your business is not a fit for any active government grant, loan, or tax-credit options, <strong>we refund your $199 session fee immediately</strong>.
            </p>
            <p style="margin:10px 0 0 0;font-size:13px;color:#059669;font-style:italic;">
              This keeps the process completely risk-free for you. We only host calls where we can add real value.
            </p>
          </div>

          <p style="margin:20px 0 0 0;">If you would like us to begin your qualifying review, you can secure your slot here:</p>
        `,
      }),
      text: `Hi ${firstName},
 
A common question before booking is: "What if my business does not qualify?"
 
That is exactly why we do the pre-call research first. Before your private call, we review your industry, region, entity type, and funding goals against active grant, loan, and tax-credit options.
 
If our research shows your business is not a fit for any active funding options, we refund the $199 session fee immediately. No pressure and no funding approval guarantee.
 
If you want us to complete that review, you can book here:
${consultationUrl}
 
Best regards,
Ashwani
FSI Digital
${replyToEmail}
 
If this is not useful, reply "unsubscribe" and we will stop sending follow-ups.`,
    };
  }
 
  if (stage === 'final_7d') {
    return {
      subject: 'Should I close your funding review file?',
      html: baseHtml({
        firstName,
        cta: consultationUrl,
        replyToEmail,
        body: `
          <p style="margin:0 0 16px 0;">I don't want to keep filling your inbox if securing funding isn't a priority for your business right now.</p>
          <p style="margin:0 0 16px 0;">If you still want a custom funding roadmap, you can secure your Strategy Session and we will prepare the 2 hours of custom research before our call.</p>

          <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:18px;margin:20px 0;font-size:14px;color:#475569;line-height:1.6;">
            <strong style="color:#0f172a;display:block;margin-bottom:8px;">What would you like to do?</strong>
            <table style="width:100%;border-collapse:collapse;margin:0;" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:top;width:18px;color:#2563eb;font-weight:bold;">•</td>
                <td style="vertical-align:top;font-size:14px;color:#334155;padding-bottom:8px;">
                  <a href="${consultationUrl}" style="color:#2563eb;text-decoration:none;font-weight:600;">Click here to book your session ($199)</a>
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top;width:18px;color:#475569;font-weight:bold;">•</td>
                <td style="vertical-align:top;font-size:14px;color:#475569;padding-bottom:8px;">
                  Reply to this email with any quick questions you have.
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top;width:18px;color:#475569;font-weight:bold;">•</td>
                <td style="vertical-align:top;font-size:14px;color:#475569;">
                  Reply "unsubscribe" if you would like me to close your file.
                </td>
              </tr>
            </table>
          </div>

          <p style="margin:20px 0 0 0;">No pressure either way.</p>
        `,
      }),
      text: `Hi ${firstName},
 
I did not want to keep following up if this is not a priority right now.
 
If you still want a private funding roadmap, you can book the Strategy Session and we will prepare the research before your call.
 
If now is not the right time, no problem. You can reply with any question, or reply "unsubscribe" and we will close the follow-up.
 
Booking link:
${consultationUrl}
 
Best regards,
Ashwani
FSI Digital
${replyToEmail}
 
If this is not useful, reply "unsubscribe" and we will stop sending follow-ups.`,
    };
  }
 
  return {
    subject: 'Quick question about your funding inquiry',
    html: baseHtml({
      firstName,
      cta: consultationUrl,
      replyToEmail,
      body: `
        <p style="margin:0 0 16px 0;">I noticed that you submitted your business details for a funding review on FSI Digital, but didn't finish scheduling your private session.</p>
        <p style="margin:0 0 20px 0;">Did the checkout page give you any issues, or do you have any quick questions about your business's eligibility first?</p>

        <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:18px;margin:24px 0;">
          <p style="margin:0 0 14px 0;font-size:13px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.05em;">Your Strategy Session Includes:</p>
          <table style="width:100%;border-collapse:collapse;margin:0;" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:top;width:24px;padding-bottom:10px;font-size:14px;color:#10b981;font-weight:bold;">✓</td>
              <td style="vertical-align:top;padding-bottom:10px;font-size:14px;color:#475569;line-height:1.5;">
                <strong>2 Hours Pre-Call Research:</strong> We analyze your business against all active grants, loans, and tax credits before we talk.
              </td>
            </tr>
            <tr>
              <td style="vertical-align:top;width:24px;padding-bottom:10px;font-size:14px;color:#10b981;font-weight:bold;">✓</td>
              <td style="vertical-align:top;padding-bottom:10px;font-size:14px;color:#475569;line-height:1.5;">
                <strong>Custom Funding Roadmap:</strong> A personalized document outlining your best matches and application deadlines.
              </td>
            </tr>
            <tr>
              <td style="vertical-align:top;width:24px;font-size:14px;color:#10b981;font-weight:bold;">✓</td>
              <td style="vertical-align:top;font-size:14px;color:#475569;line-height:1.5;">
                <strong>Private Consultation:</strong> A 30-minute Google Meet call to answer your questions and plan next steps.
              </td>
            </tr>
          </table>
        </div>

        <div style="background-color:#ecfdf5;border:1px dashed #34d399;border-radius:8px;padding:14px 16px;margin:20px 0;font-size:13.5px;color:#064e3b;line-height:1.5;">
          <strong>Zero-Risk Guarantee:</strong> If our pre-call research shows your business is not a fit for any active funding options, we refund the $199 session fee immediately.
        </div>

        <p style="margin:20px 0 0 0;">If you are ready to secure your roadmap, you can book your slot here:</p>
      `,
    }),
    text: `Hi ${firstName},

I saw that you submitted your business funding details on FSI Digital, but did not finish booking your private strategy session.

Did the checkout page give you any trouble, or did you have a quick question about eligibility before booking?

If you are ready, you can secure your 30-minute Funding Strategy Session here:
${consultationUrl}

The session includes 2 hours of pre-call desk research, a personalized Business Funding Roadmap, your top eligible program matches, and a private Google Meet call to plan next steps.

If our pre-call research shows your business is not a fit for any active grant, loan, or tax-credit options, we refund the $199 session fee immediately. We do not guarantee funding approval.

Best regards,
Ashwani
FSI Digital
${replyToEmail}

If this is not useful, reply "unsubscribe" and we will stop sending follow-ups.`,
  };
}

export async function sendStrategyRecoveryEmail({
  to,
  name,
  source = 'strategy-session-recovery',
  stage,
  recoveryId,
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
  const consultationUrl = `https://www.fsidigital.ca/consultation?${consultationParams.toString()}`;
  const firstName = getFirstName(name);
  const content = getEmailContent(stage, firstName, consultationUrl, replyToEmail);

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
