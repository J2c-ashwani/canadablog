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

function baseHtml({ 
  firstName, 
  body, 
  cta, 
  replyToEmail, 
  btnText = 'Secure Audit & Roadmap' 
}: { 
  firstName: string; 
  body: string; 
  cta: string; 
  replyToEmail: string;
  btnText?: string;
}) {
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;line-height:1.7;color:#334155;max-width:580px;margin:0 auto;padding:24px;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;">
      <div style="display:none;max-height:0;overflow:hidden;color:transparent">FSI Digital: Your funding audit and roadmap details.</div>
      
      <!-- Brand Header -->
      <div style="padding-bottom:16px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;">
        <span style="font-size:18px;font-weight:700;color:#0f172a;letter-spacing:-0.02em;">FSI <span style="color:#4f46e5;">Digital</span></span>
      </div>

      <p style="margin:0 0 16px 0;font-size:15px;color:#334155;">Hi ${firstName},</p>
      
      <div style="font-size:15px;color:#334155;">
        ${body}
      </div>
      
      <!-- Call to Action Button -->
      <div style="margin:28px 0;text-align:left;">
        <a href="${cta}" style="display:inline-block;background-color:#4f46e5;background:linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);color:#ffffff;padding:14px 26px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;text-align:center;box-shadow:0 4px 6px -1px rgba(79,70,229,0.15);">${btnText}</a>
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
      subject: 'The cost of waiting on government funding',
      html: baseHtml({
        firstName,
        cta: consultationUrl,
        replyToEmail,
        btnText: 'Secure Audit & Roadmap',
        body: `
          <p style="margin:0 0 16px 0;">The biggest mistake I see business owners make with government funding is simple: <strong>waiting too long to apply</strong>.</p>
          <p style="margin:0 0 16px 0;">Many of the best grants and interest-free loan programs have limited annual budgets and operate on a first-come, first-served basis. If you don't apply when the program opens, you miss out on tens of thousands of dollars in non-dilutive capital.</p>
          <p style="margin:0 0 20px 0;">Your business details are already in my queue. During your <strong>Funding Eligibility Audit & Roadmap</strong>, we will perform a deep dive to map out your funding windows so you never miss a deadline.</p>
          
          <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:18px;margin:24px 0;">
            <p style="margin:0 0 12px 0;font-size:13px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.05em;">Our Action Plan Together:</p>
            <table style="width:100%;border-collapse:collapse;margin:0;" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:top;width:24px;padding-bottom:12px;font-size:14px;color:#10b981;font-weight:bold;">✓</td>
                <td style="vertical-align:top;padding-bottom:12px;font-size:14px;color:#475569;line-height:1.5;">
                  <strong>Complete Program Audit:</strong> We analyze federal, provincial, and private grants to tell you exactly what you qualify for.
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top;width:24px;padding-bottom:12px;font-size:14px;color:#10b981;font-weight:bold;">✓</td>
                <td style="vertical-align:top;padding-bottom:12px;font-size:14px;color:#475569;line-height:1.5;">
                  <strong>Application Strategy:</strong> We share formatting and criteria alignment tips to help you pass the government review stage.
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top;width:24px;font-size:14px;color:#10b981;font-weight:bold;">✓</td>
                <td style="vertical-align:top;font-size:14px;color:#475569;line-height:1.5;">
                  <strong>Capital Stacking:</strong> How to stack grants, loans, and tax credits to maximize your total funding.
                </td>
              </tr>
            </table>
          </div>

          <div style="background-color:#f5f3ff;border:1px solid #ddd6fe;border-radius:8px;padding:12px 14px;margin:20px 0;font-size:13px;color:#3b0764;">
            🎁 <strong>100% Credit:</strong> Your pre-call research deposit is fully credited toward our full-service application preparation and submission support if you choose to partner with us.
          </div>

          <div style="background-color:#ecfdf5;border:1px dashed #34d399;border-radius:8px;padding:14px 16px;margin:20px 0;font-size:13.5px;color:#064e3b;line-height:1.5;">
            <strong>Zero-Risk Guarantee:</strong> If our research shows you have zero viable funding options, your deposit is refunded in full, instantly.
          </div>

          <p style="margin:20px 0 0 0;">You can reserve your slot and lock in your research audit here:</p>
        `,
      }),
      text: `Hi ${firstName},
 
The biggest mistake I see business owners make with government funding is simple: waiting too long to apply.
 
Many of the best grants and interest-free loan programs have limited annual budgets and operate on a first-come, first-served basis. If you don't apply when the program opens, you miss out on tens of thousands of dollars in free capital.
 
Your business details are already in my queue. During your Funding Eligibility Audit & Roadmap, we will perform a deep dive to map out your funding windows so you never miss a deadline.
 
Here is what we will build:
- Complete Program Audit: We tell you exactly what grants and programs you qualify for.
- Application Strategy: Secrets to passing the government review stage.
- Capital Stacking: Mixing grants, loans, and tax credits to maximize your total payout.

Your research deposit is 100% credited toward full-service application preparation and submission support if you choose to partner with us.
 
Zero-Risk Guarantee: If our research shows you have zero viable funding options, your deposit is refunded in full, instantly.
 
You can secure your session here:
${consultationUrl}
 
Best regards,
Ashwani
FSI Digital
${replyToEmail}`,
    };
  }
 
  if (stage === 'objection_3d') {
    return {
      subject: 'Is a funding audit deposit worth it?',
      html: baseHtml({
        firstName,
        cta: consultationUrl,
        replyToEmail,
        btnText: 'Secure Audit & Roadmap',
        body: `
          <p style="margin:0 0 16px 0;">I completely understand if you are hesitant to place a research deposit on a funding audit. In the government grants space, there is a lot of noise and false promises.</p>
          <p style="margin:0 0 20px 0;">That is exactly why I put a <strong>100% money-back guarantee</strong> on this audit. I want this to be completely risk-free for you.</p>

          <div style="background-color:#ecfdf5;border:1px solid #a7f3d0;border-radius:10px;padding:20px;margin:24px 0;">
            <p style="margin:0 0 8px 0;font-size:15px;font-weight:700;color:#064e3b;">Our Qualification Guarantee</p>
            <p style="margin:0;font-size:14px;color:#047857;line-height:1.6;">
              My team and I spend 2 hours researching your business profile <strong>before</strong> our call. If we find that there are zero active programs you qualify for, I will refund your deposit immediately. You will receive an automated refund receipt before we even meet.
            </p>
            <p style="margin:10px 0 0 0;font-size:13px;color:#059669;font-style:italic;">
              This means you only pay if we find real funding opportunities for your business. If we find nothing, it costs you $0. If we do find opportunities, your deposit is 100% credited toward our full-service preparation and submission support if we partner together.
            </p>
          </div>

          <p style="margin:20px 0 0 0;">If you want us to start your research audit, you can secure your slot here:</p>
        `,
      }),
      text: `Hi ${firstName},
 
I completely understand if you are hesitant to place a research deposit on a funding audit. In the government grants space, there is a lot of noise and false promises.
 
That is exactly why I put a 100% money-back guarantee on this audit.
 
My team and I spend 2 hours researching your business profile before our call. If we find that there are zero active programs you qualify for, I will refund your deposit immediately. You will receive an automated refund receipt before we even meet.
 
This means you only pay if we find real funding opportunities for your business. If we find nothing, it costs you $0. If we do find opportunities, your deposit is 100% credited toward our full-service preparation and submission support if we partner together.
 
You can book your session here:
${consultationUrl}
 
Best regards,
Ashwani
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
        body: `
          <p style="margin:0 0 16px 0;">I haven't heard back from you, so I assume finding government funding isn't a priority for your business right now.</p>
          <p style="margin:0 0 16px 0;">I will go ahead and close your funding review file tomorrow so my team can focus on active applicants in our queue.</p>
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
 
I will go ahead and close your funding review file tomorrow so my team can focus on active applicants in our queue.
 
If you still want us to complete your 2-hour research audit and build your custom roadmap, this is your final opportunity to book:
${consultationUrl}
 
Otherwise, I wish you the best of luck in scaling your business this year.
 
Best regards,
Ashwani
FSI Digital
${replyToEmail}`,
    };
  }
 
  return {
    subject: 'Quick question about your funding inquiry',
    html: baseHtml({
      firstName,
      cta: consultationUrl,
      replyToEmail,
      btnText: 'Secure Audit & Roadmap',
      body: `
        <p style="margin:0 0 16px 0;">Applying for government grants and business funding is notoriously frustrating. Between dense eligibility rules, hidden deadlines, and dozens of portals, most founders give up before they even start.</p>
        <p style="margin:0 0 20px 0;">That is why you filled out our form—because you want a clear, straight-to-the-point path to secure capital without wasting dozens of hours.</p>
        <p style="margin:0 0 20px 0;">When you secure a **Funding Eligibility Audit & Roadmap**, my team and I spend 2 hours doing the heavy lifting for you before we even meet, matching your business profile against active federal, regional, and private programs.</p>

        <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:18px;margin:24px 0;">
          <p style="margin:0 0 14px 0;font-size:13px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.05em;">On our call, I will hand you a Funding Roadmap showing:</p>
          <table style="width:100%;border-collapse:collapse;margin:0;" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:top;width:24px;padding-bottom:10px;font-size:14px;color:#10b981;font-weight:bold;">✓</td>
              <td style="vertical-align:top;padding-bottom:10px;font-size:14px;color:#475569;line-height:1.5;">
                <strong>Priority Matches:</strong> Which grant and loan programs you should apply for first.
              </td>
            </tr>
            <tr>
              <td style="vertical-align:top;width:24px;padding-bottom:10px;font-size:14px;color:#10b981;font-weight:bold;">✓</td>
              <td style="vertical-align:top;padding-bottom:10px;font-size:14px;color:#475569;line-height:1.5;">
                <strong>Funding Estimates:</strong> How much capital you can realistically expect to win.
              </td>
            </tr>
            <tr>
              <td style="vertical-align:top;width:24px;font-size:14px;color:#10b981;font-weight:bold;">✓</td>
              <td style="vertical-align:top;font-size:14px;color:#475569;line-height:1.5;">
                <strong>Secret Requirements:</strong> Deadlines and application criteria to maximize your odds.
              </td>
            </tr>
          </table>
        </div>

        <div style="background-color:#f5f3ff;border:1px solid #ddd6fe;border-radius:8px;padding:12px 14px;margin:20px 0;font-size:13px;color:#3b0764;">
          🎁 <strong>100% Credit:</strong> Your pre-call research deposit is fully credited toward our full-service application preparation and submission support if you choose to partner with us.
        </div>

        <div style="background-color:#ecfdf5;border:1px dashed #34d399;border-radius:8px;padding:14px 16px;margin:20px 0;font-size:13.5px;color:#064e3b;line-height:1.5;">
          <strong>Our Guarantee:</strong> If our pre-call research shows your business is not a fit for any active funding options, we refund your deposit immediately.
        </div>

        <p style="margin:20px 0 0 0;">Let's get your funding roadmap sorted. Select a time and secure your audit slot here:</p>
      `,
    }),
    text: `Hi ${firstName},
The audit includes 2 hours of pre-call desk research, a personalized Business Funding Roadmap, your top eligible program matches, and a private Google Meet call to plan next steps.

Your research deposit is 100% credited toward full-service application preparation and submission support if you choose to partner with us.

If our pre-call research shows your business is not a fit for any active grant, loan, or tax-credit options, we refund your deposit immediately. We do not guarantee funding approval.

Best regards,
Ashwani
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
