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
          <span style="float: right; background-color: #e0f2fe; color: #0369a1; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">$19 Credit Active</span>
        </div>
        <p style="font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          Thank you again for purchasing your <strong>Funding Match Report</strong>. Your personalized report identified <strong>${escapeHtml(estimatedFunding)}</strong> in potential active grants, tax credits, and subsidies for your business.
        </p>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          Since the report details self-serve matches, the next step is verification. We would like to assign a Senior Funding Advisor to run a manual eligibility audit of your entity structure and tech scope to lock in your filing calendar.
        </p>
        <div style="background-color: #f0fdf4; border: 1px dashed #4ade80; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #166534; font-weight: 600;">
            🎟️ Claim Your Report Purchase Credit:
          </p>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #1e293b; line-height: 1.5;">
            Your $19 report fee has been applied as a direct credit. Book your 1-on-1 Funding Eligibility Audit ($199 value) today for just <strong>$180</strong>.
          </p>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${bookingUrl}" target="_blank" rel="noopener noreferrer" 
             style="background-color: #4f46e5; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);">
             Book Audit & Claim $19 Credit &rarr;
          </a>
        </div>
        <p style="font-size:13px;color:#64748b;line-height:1.5;margin-top:20px; text-align: center;">
          <em>If our advisors determine your business does not qualify for any active programs, we refund your audit payment in full (100% risk-free guarantee).</em>
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
          <span style="float: right; background-color: #e0f2fe; color: #0369a1; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">$19 Credit Active</span>
        </div>
        <p style="font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          A few days ago you purchased your Funding Match Report. Have you had a chance to review the matched programs?
        </p>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          Many founders we talk to have questions about:
        </p>
        <ul style="font-size:14px;color:#475569;line-height:1.6;margin:10px 0 20px 20px;">
          <li><strong>Program Stacking:</strong> How to combine training grants and tax credits simultaneously.</li>
          <li><strong>Timeline Alignment:</strong> How to coordinate your project spend with intake calendars.</li>
          <li><strong>Submission Caps:</strong> What documents are needed to get approved before budget pools are exhausted.</li>
        </ul>
        <div style="background-color: #f0fdf4; border: 1px dashed #4ade80; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #166534; font-weight: 600;">
            🎟️ Report Purchase Credit Reminder:
          </p>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #1e293b; line-height: 1.5;">
            You can credit your $19 report fee towards a 1-on-1 Funding Eligibility Audit ($199 value) to get verified answers for just <strong>$180</strong>.
          </p>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${bookingUrl}" target="_blank" rel="noopener noreferrer" 
             style="background-color: #4f46e5; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);">
             Schedule Audit ($180 with Credit) &rarr;
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
          <span style="float: right; background-color: #fee2e2; color: #991b1b; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">Credit Expiring</span>
        </div>
        <p style="font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          This is a final heads-up: several of the program intakes identified in your Funding Match Report have active review periods this quarter.
        </p>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          Your **$19 purchase credit** towards a 1-on-1 Funding Eligibility Audit is expiring. If you book today, you can still apply it to get verified by our advisory team for just **$180** (instead of $199).
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${bookingUrl}" target="_blank" rel="noopener noreferrer" 
             style="background-color: #4f46e5; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);">
             Claim $19 Credit & Verify Eligibility &rarr;
          </a>
        </div>
        <p style="font-size:12px;color:#64748b;text-align:center;margin-top:20px;">
          If you do not qualify for any programs, your audit payment is 100% refundable.
        </p>
      </div>
    </div>
  `;
}

export async function sendFollowupEmail(stage: 'day2' | 'day5' | 'day10', { to, name, companyName, loginToken, estimatedFunding }: FollowupInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'FSI Digital <hello@fsidigital.ca>';
  const replyToEmail = process.env.RESEND_REPLY_TO_EMAIL || 'ashwani@fsidigital.ca';

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
