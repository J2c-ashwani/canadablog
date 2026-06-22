import { sendEmail, getFirstName, escapeHtml } from './mailer';

export function buildPostCallSummaryHtml({ firstName, companyName }: { firstName: string; companyName: string }) {
  const servicesUrl = `https://www.fsidigital.ca/services?ref=post_call_summary`;
  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.05);">
        <div style="padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; margin-bottom: 24px;">
          <span style="font-size: 18px; font-weight: 800; color: #0f172a;">FSI <span style="color: #059669;">Digital</span></span>
          <span style="float: right; background-color: #d1fae5; color: #065f46; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">Audit Summary</span>
        </div>
        <p style="font-size:15px;color:#334155;font-weight:600;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          It was great speaking with you today regarding the funding strategy for <strong>${companyName}</strong>. 
        </p>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          Based on our discussion and our database matching parameters, here is a summary of the next steps we mapped out:
        </p>
        <ol style="font-size:14px;color:#475569;line-height:1.6;margin:15px 0 25px 20px;">
          <li style="margin-bottom: 8px;"><strong>Review Stacking Plan:</strong> Focus on combining your physical or software R&D expenditures with provincial hiring programs.</li>
          <li style="margin-bottom: 8px;"><strong>Secure Timeline Deadlines:</strong> Keep an eye on upcoming Q3/Q4 program intakes to prevent missing application slots.</li>
          <li style="margin-bottom: 8px;"><strong>Leverage Your Audit Deposit:</strong> Your $199 research deposit is active and will be credited 100% toward our full writing and filing services.</li>
        </ol>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          If you are ready to have our team draft your proposals, build project budgets, and coordinate portal uploads, you can review our full services and claim your credit below.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${servicesUrl}" target="_blank" rel="noopener noreferrer" 
             style="background-color: #059669; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(5, 150, 105, 0.25);">
             Explore Full Filing Services &rarr;
          </a>
        </div>
        <p style="font-size:13px;color:#64748b;line-height:1.5;margin-top:20px; text-align: center;">
          <em>Have questions about the audit report? Reply directly to this email and our advisory team will assist you.</em>
        </p>
      </div>
    </div>
  `;
}

export function buildFilingOfferHtml({ firstName, companyName }: { firstName: string; companyName: string }) {
  const servicesUrl = `https://www.fsidigital.ca/services?ref=filing_offer_7d`;
  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.05);">
        <div style="padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; margin-bottom: 24px;">
          <span style="font-size: 18px; font-weight: 800; color: #0f172a;">FSI <span style="color: #059669;">Digital</span></span>
          <span style="float: right; background-color: #e0f2fe; color: #0369a1; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">$199 Credit Active</span>
        </div>
        <p style="font-size:15px;color:#334155;font-weight:600;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          It has been a week since we ran your 1-on-1 Funding Eligibility Audit. 
        </p>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          If you are planning to file for grants, hire new staff, or submit your R&D tax schedules this quarter, now is the time to start drafting. Proper program alignment and application writing takes average 6–8 weeks to coordinate before deadlines close.
        </p>
        <div style="background-color: #f0fdf4; border: 1px dashed #4ade80; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #166534; font-weight: 600;">
            🎟️ Reminder: Claim Your $199 Audit Credit:
          </p>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #1e293b; line-height: 1.5;">
            Your $199 audit deposit will be credited 100% toward our professional writing and filing engagement. We write your technical proposals and handle submission details end-to-end.
          </p>
        </div>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          Let us handle the heavy lifting. Review our process, deliverables, and transparent pricing below:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${servicesUrl}" target="_blank" rel="noopener noreferrer" 
             style="background-color: #4f46e5; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);">
             Claim $199 Credit & Start Filing &rarr;
          </a>
        </div>
      </div>
    </div>
  `;
}

export async function sendPostCallSummaryEmail({ to, name, companyName }: { to: string; name: string; companyName: string }) {
  const firstName = getFirstName(name);
  const subject = `Your Funding Strategy & Next Steps — ${companyName}`;
  const html = buildPostCallSummaryHtml({ firstName, companyName });
  const text = `Hi ${firstName},\n\nIt was great speaking with you today regarding your funding strategy for ${companyName}.\n\nReview our full writing and filing services: https://www.fsidigital.ca/services`;
  
  return sendEmail({
    to,
    subject,
    html,
    text,
    tagType: 'audit_post_call_summary',
    companyName
  });
}

export async function sendFilingOffer7dEmail({ to, name, companyName }: { to: string; name: string; companyName: string }) {
  const firstName = getFirstName(name);
  const subject = `Claim Your $199 Credit: Start Your Funding Application`;
  const html = buildFilingOfferHtml({ firstName, companyName });
  const text = `Hi ${firstName},\n\nIt has been a week since your Funding Audit. Claim your $199 credit toward application writing: https://www.fsidigital.ca/services`;
  
  return sendEmail({
    to,
    subject,
    html,
    text,
    tagType: 'audit_filing_offer_7d',
    companyName
  });
}

// ── POST-PAYMENT BOOKING REMINDER ──────────────────────────────────────────
// Fires when a customer paid $199 but never clicked through to book Calendly.
// Under the new Pay-First flow, payment unlocks /booking where Calendly lives.
// This email fires ~2 hours after payment if no Calendly booking is recorded.
// ─────────────────────────────────────────────────────────────────────────────
export function buildBookingReminderHtml({ firstName, bookingUrl }: { firstName: string; bookingUrl: string }) {
  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.05);">
        <div style="padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; margin-bottom: 24px; display: table; width: 100%;">
          <span style="font-size: 18px; font-weight: 800; color: #0f172a; display: table-cell;">FSI <span style="color: #059669;">Digital</span></span>
          <span style="float: right; background-color: #d1fae5; color: #065f46; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">Payment Received ✓</span>
        </div>
        <p style="font-size:15px;color:#334155;font-weight:600;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          Your $199 research deposit was successfully received — thank you!
        </p>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          The next step is to <strong>book your 30-minute strategy consultation</strong>. Our team will use this time to walk through your custom Funding Eligibility Report together, answer your questions, and map out your application sequence.
        </p>
        <div style="background-color: #f0fdf4; border: 1px dashed #4ade80; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #166534; font-weight: 600;">
            📅 Your calendar booking link is ready — pick any available slot:
          </p>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${bookingUrl}" target="_blank" rel="noopener noreferrer" 
             style="background-color: #059669; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(5, 150, 105, 0.25);">
             Book My Strategy Session →
          </a>
        </div>
        <p style="font-size:13px;color:#64748b;line-height:1.5;margin-top:20px; text-align: center;">
          <em>If you have any questions before the call, reply directly to this email — we respond within 1 business day.</em>
        </p>
        <div style="padding-top:20px;border-top:1px solid #f1f5f9;margin-top:28px;">
          <p style="margin:0;font-size:14px;color:#475569;line-height:1.5;">
            Best regards,<br/>
            <strong>Ashwani K</strong><br/>
            <span style="color:#64748b;font-size:13px;">Founder, FSI Digital</span>
          </p>
        </div>
      </div>
    </div>
  `;
}

export async function sendBookingReminderEmail({
  to,
  name,
  loginToken,
  recoveryId
}: {
  to: string;
  name: string;
  loginToken?: string;
  recoveryId?: string;
}) {
  const firstName = getFirstName(name);
  const subject = `Don't forget: Book your strategy session`;
  
  // Build the booking URL with prefill parameters
  const bookingParams = new URLSearchParams({ success: 'true' });
  if (loginToken) bookingParams.set('token', loginToken);
  if (recoveryId) bookingParams.set('rid', recoveryId);
  bookingParams.set('source', 'booking_reminder_email');
  const bookingUrl = `https://www.fsidigital.ca/booking?${bookingParams.toString()}`;
  
  const html = buildBookingReminderHtml({ firstName, bookingUrl });
  const text = `Hi ${firstName},\n\nYour $199 research deposit was received. The next step is to book your 30-minute strategy consultation.\n\nBook your session here:\n${bookingUrl}\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;
  
  return sendEmail({
    to,
    subject,
    html,
    text,
    tagType: 'audit_booking_reminder',
  });
}

