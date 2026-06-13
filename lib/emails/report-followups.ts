type FollowupInput = {
  to: string;
  name: string;
  companyName: string;
  loginToken: string;
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

export function buildDay2Html({ firstName, companyName, estimatedFunding, loginToken }: { firstName: string; companyName: string; estimatedFunding: string; loginToken: string }) {
  const bookingUrl = `https://www.fsidigital.ca/consultation?email=${encodeURIComponent(loginToken)}&name=${encodeURIComponent(firstName)}&ref=followup_day2`;
  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.05);">
        <div style="padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; margin-bottom: 24px;">
          <span style="font-size: 18px; font-weight: 800; color: #0f172a;">FSI <span style="color: #059669;">Digital</span></span>
        </div>
        <p style="font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          Yesterday, your Funding Opportunity Assessment identified <strong>${escapeHtml(estimatedFunding)}</strong> in potential grants, tax credits, and subsidies for <strong>${escapeHtml(companyName)}</strong>.
        </p>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          Since these assessments model general applicant criteria, the next step is verification. We can assign a Senior Funding Analyst to run a manual audit of your entity structure and tech scope to lock in your filing calendar.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${bookingUrl}" target="_blank" rel="noopener noreferrer" 
             style="background-color: #059669; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px;">
             Book Verification Audit & Roadmap &rarr;
          </a>
        </div>
        <p style="font-size:13px;color:#64748b;line-height:1.5;margin-top:20px;">
          <em>Note: If our research shows your business does not qualify for any active programs, we refund the audit fee immediately (100% risk-free).</em>
        </p>
      </div>
    </div>
  `;
}

export function buildDay5Html({ firstName, companyName, loginToken }: { firstName: string; companyName: string; loginToken: string }) {
  const bookingUrl = `https://www.fsidigital.ca/consultation?email=${encodeURIComponent(loginToken)}&name=${encodeURIComponent(firstName)}&ref=followup_day5`;
  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.05);">
        <div style="padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; margin-bottom: 24px;">
          <span style="font-size: 18px; font-weight: 800; color: #0f172a;">FSI <span style="color: #059669;">Digital</span></span>
        </div>
        <p style="font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          It's been a few days since we compiled the Executive Funding Assessment for <strong>${escapeHtml(companyName)}</strong>.
        </p>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          Many founders have questions about:
        </p>
        <ul style="font-size:14px;color:#475569;line-height:1.6;margin:10px 0 20px 20px;">
          <li><strong>Stacking:</strong> Can you claim training subsidies and tax credits simultaneously?</li>
          <li><strong>Timing:</strong> When do intake periods close for this quarter?</li>
          <li><strong>Deadlines:</strong> How to avoid missing CRA/IRS submission windows.</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${bookingUrl}" target="_blank" rel="noopener noreferrer" 
             style="background-color: #059669; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px;">
             Schedule a Quick 15-Min Briefing &rarr;
          </a>
        </div>
      </div>
    </div>
  `;
}

export function buildDay10Html({ firstName, companyName, loginToken }: { firstName: string; companyName: string; loginToken: string }) {
  const bookingUrl = `https://www.fsidigital.ca/consultation?email=${encodeURIComponent(loginToken)}&name=${encodeURIComponent(firstName)}&ref=followup_day10`;
  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.05);">
        <div style="padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; margin-bottom: 24px;">
          <span style="font-size: 18px; font-weight: 800; color: #0f172a;">FSI <span style="color: #059669;">Digital</span></span>
        </div>
        <p style="font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          We wanted to send a quick heads-up: several of the program intakes identified in your assessment for <strong>${escapeHtml(companyName)}</strong> have active review periods this quarter.
        </p>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          To ensure your application files are submitted before caps are reached, we recommend booking a slot to verify your filing deadlines.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${bookingUrl}" target="_blank" rel="noopener noreferrer" 
             style="background-color: #059669; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px;">
             Schedule Deadline Verification &rarr;
          </a>
        </div>
      </div>
    </div>
  `;
}

export async function sendFollowupEmail(stage: 'day2' | 'day5' | 'day10', { to, name, companyName, loginToken, estimatedFunding }: FollowupInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'FSI Digital <hello@fsidigital.ca>';
  const replyToEmail = process.env.RESEND_REPLY_TO_EMAIL || 'advisors@fsidigital.ca';

  if (!apiKey) {
    console.warn(`Followup email (${stage}) skipped — RESEND_API_KEY is not set.`);
    return { success: false, skipped: true };
  }

  const firstName = getFirstName(name);
  let html = '';
  let subject = '';

  if (stage === 'day2') {
    html = buildDay2Html({ firstName, companyName, estimatedFunding, loginToken });
    subject = `Verify the matched opportunities for ${companyName}`;
  } else if (stage === 'day5') {
    html = buildDay5Html({ firstName, companyName, loginToken });
    subject = `Questions about your funding assessment, ${firstName}?`;
  } else {
    html = buildDay10Html({ firstName, companyName, loginToken });
    subject = `Active program intakes for ${companyName}`;
  }

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
        subject,
        html,
        tags: [
          { name: 'type', value: `report-followup-${stage}` },
          { name: 'company', value: companyName.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 50) },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Followup email ${stage} failed:`, errorText);
      return { success: false, error: errorText };
    }

    return { success: true };
  } catch (error) {
    console.error(`Followup email ${stage} error:`, error);
    return { success: false, error: String(error) };
  }
}
