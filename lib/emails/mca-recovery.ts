// lib/emails/mca-recovery.ts
// MCA Priority Processing Recovery Emails — Trust-First Copy Optimization
// Positioned as an optional operational/readiness review rather than a paid queue-bypass.

import { sendEmail, getFirstName } from "./mailer";

function wrapMCARecoveryTemplate(contentHtml: string, firstName: string) {
  const unsubscribeUrl = 'https://www.fsidigital.ca/subscribe/unsubscribe';

  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;margin:0;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="padding-bottom:18px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;text-align:left;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">FSI <span style="color:#2563eb;">Digital</span></span>
          <span style="float:right;font-size:11px;font-weight:700;color:#2563eb;text-transform:uppercase;padding:2px 8px;background-color:#eff6ff;border-radius:4px;margin-top:2px;">
            Application Operations
          </span>
        </div>

        <!-- Body Content -->
        <div style="font-size:15px;color:#334155;line-height:1.6;text-align:left;">
          <p style="font-weight:600;margin-top:0;margin-bottom:16px;">Hi ${firstName},</p>
          
          ${contentHtml}

        </div>

        <!-- Footer -->
        <div style="padding-top:24px;border-top:1px solid #f1f5f9;margin-top:32px;font-size:13px;color:#475569;text-align:left;line-height:1.5;">
          Best regards,<br/>
          <strong>Funding Operations Team</strong><br/>
          <span style="color:#64748b;font-size:12px;">FSI Digital Canada</span>
          
          <div style="margin-top:24px;padding-top:16px;border-top:1px dashed #e2e8f0;font-size:11px;color:#94a3b8;text-align:center;">
            This email was sent because you submitted a business funding application on fsidigital.ca.<br>
            <a href="${unsubscribeUrl}" style="color:#64748b;text-decoration:underline;margin-top:8px;display:inline-block;">Unsubscribe from these emails</a>
          </div>
        </div>

      </div>
    </div>
  `;
}

// ─── Email 1 — 1 hour ────────────────────────────────────────────────────────

export async function sendMCARecoveryEmail1({
  to,
  name,
  recoveryToken,
}: {
  to: string;
  name?: string;
  recoveryToken: string;
}) {
  const firstName = getFirstName(name);
  const checkoutUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca'}/priority-processing?t=${recoveryToken}`;
  const subject = `Your business funding application has been received`;

  const html = wrapMCARecoveryTemplate(`
    <p style="margin: 0 0 16px 0;">
      Your business funding application has been received successfully.
    </p>
    <p style="margin: 0 0 16px 0;">
      Our operations team reviews applications in the order they are received. Standard files are submitted sequentially as spacing opens up with our funding partners.
    </p>
    <p style="margin: 0 0 16px 0;">
      If you would like a specialist to audit your financial files and verify your details before they are forwarded to a funding partner, you can request our optional <strong>Pre-Submission Document Review</strong> for a one-time fee of <strong>CAD $49</strong>. This identifies any compliance gaps, Low-OCR PDF formatting faults, or missing statements that could cause immediate partner declines.
    </p>
    
    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#2563eb;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(37,99,235,0.2);">
        Request Pre-Submission Review &rarr;
      </a>
      <p style="font-size:12px;color:#64748b;margin-top:12px;font-style:italic;margin-bottom:0;">
        Your application remains active in our standard queue whether or not you choose this optional service.
      </p>
    </div>
  `, firstName);

  const text = `Hi ${firstName},\n\nYour application has been received successfully. We review files in the order received. If you'd like a specialist to review your files before partner submission, you can opt for our Pre-Submission Document Review for CAD $49 here:\n${checkoutUrl}\n\nNote: Your application remains active in our standard queue whether or not you choose this optional service.\n\nBest,\nFunding Operations Team\nFSI Digital Canada`;

  return sendEmail({ to, subject, html, text, tagType: 'mca-recovery-email1' });
}

// ─── Email 2 — 6 hours ───────────────────────────────────────────────────────

export async function sendMCARecoveryEmail2({
  to,
  name,
  recoveryToken,
}: {
  to: string;
  name?: string;
  recoveryToken: string;
}) {
  const firstName = getFirstName(name);
  const checkoutUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca'}/priority-processing?t=${recoveryToken}`;
  const subject = `Don't let avoidable issues delay your funding application`;

  const html = wrapMCARecoveryTemplate(`
    <p style="margin: 0 0 16px 0;">
      Many business owners are unaware that standard automated credit underwriting checks can reject applications due to minor document glitches, transaction formatting errors, or illegible PDF statements.
    </p>
    <p style="margin: 0 0 16px 0;">
      Some applications require additional clarification or updated documentation before they are ready for submission. Our optional <strong>Pre-Submission Document Review</strong> assigns an application specialist to audit your files, catch potential red flags (such as transaction irregularities or corrupted statements), and guide you in resolving them before partner underwriting begins.
    </p>
    <p style="margin: 0 0 20px 0;">
      If you want to review your file for completeness, you can activate your review here:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#2563eb;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(37,99,235,0.2);">
        Verify My Application Details &rarr;
      </a>
      <p style="font-size:12px;color:#64748b;margin-top:12px;font-style:italic;margin-bottom:0;">
        Your application remains active in our standard queue whether or not you choose this optional service.
      </p>
    </div>
  `, firstName);

  const text = `Hi ${firstName},\n\nAutomated checks can reject files due to minor document glitches. Our optional Pre-Submission Document Review audits your files beforehand. Get started here:\n${checkoutUrl}\n\nNote: Your application remains active in our standard queue whether or not you choose this optional service.\n\nBest,\nFunding Operations Team\nFSI Digital Canada`;

  return sendEmail({ to, subject, html, text, tagType: 'mca-recovery-email2' });
}

// ─── Email 3 — 24 hours ──────────────────────────────────────────────────────

export async function sendMCARecoveryEmail3({
  to,
  name,
  recoveryToken,
}: {
  to: string;
  name?: string;
  recoveryToken: string;
}) {
  const firstName = getFirstName(name);
  const checkoutUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca'}/priority-processing?t=${recoveryToken}`;
  const subject = `Your application is waiting`;

  const html = wrapMCARecoveryTemplate(`
    <p style="margin: 0 0 16px 0;">
      Your business funding profile has been received. Standard applications are processed sequentially in submission order. During periods of high volume, sequential processing can take up to several business days.
    </p>
    <p style="margin: 0 0 16px 0;">
      Some applicants choose to have our specialists perform an optional <strong>Pre-Submission Document Review</strong>. This service accelerates document preparation, resolves formatting warnings, and delivers a clean, pre-verified file straight to our primary partner's desk.
    </p>
    <p style="margin: 0 0 20px 0;">
      If you would like to initiate a specialist review before your file is forwarded, you can do so here:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#2563eb;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(37,99,235,0.2);">
        Initiate Pre-Submission Review &rarr;
      </a>
      <p style="font-size:12px;color:#64748b;margin-top:12px;font-style:italic;margin-bottom:0;">
        Your application remains active in our standard queue whether or not you choose this optional service.
      </p>
    </div>
  `, firstName);

  const text = `Hi ${firstName},\n\nStandard applications are reviewed sequentially. For a dedicated Pre-Submission Document Review before forwarding, you can activate this optional upgrade:\n${checkoutUrl}\n\nNote: Your application remains active in our standard queue whether or not you choose this optional service.\n\nBest,\nFunding Operations Team\nFSI Digital Canada`;

  return sendEmail({ to, subject, html, text, tagType: 'mca-recovery-email3' });
}

// ─── Email 4 — 3 days ────────────────────────────────────────────────────────

export async function sendMCARecoveryEmail4({
  to,
  name,
  recoveryToken,
}: {
  to: string;
  name?: string;
  recoveryToken: string;
}) {
  const firstName = getFirstName(name);
  const checkoutUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca'}/priority-processing?t=${recoveryToken}`;
  const subject = `Still interested in business funding?`;

  const html = wrapMCARecoveryTemplate(`
    <p style="margin: 0 0 16px 0;">
      We wanted to reach out one more time regarding your business funding request.
    </p>
    <p style="margin: 0 0 16px 0;">
      If you are ready to proceed with securing working capital for inventory, payroll, or expansion, opting for our Pre-Submission Document Review ensures you get a dedicated application review to optimize your document pack.
    </p>
    <p style="margin: 0 0 20px 0;">
      You can access the optional pre-submission audit check directly:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#2563eb;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(37,99,235,0.2);">
        Get Dedicated Document Review &rarr;
      </a>
      <p style="font-size:12px;color:#64748b;margin-top:12px;font-style:italic;margin-bottom:0;">
        Your application remains active in our standard queue whether or not you choose this optional service.
      </p>
    </div>
  `, firstName);

  const text = `Hi ${firstName},\n\nIf you're still looking to secure working capital, you can request an optional Pre-Submission Document Review here:\n${checkoutUrl}\n\nNote: Your application remains active in our standard queue whether or not you choose this optional service.\n\nBest,\nFunding Operations Team\nFSI Digital Canada`;

  return sendEmail({ to, subject, html, text, tagType: 'mca-recovery-email4' });
}

// ─── Email 5 — 7 days ────────────────────────────────────────────────────────

export async function sendMCARecoveryEmail5({
  to,
  name,
  recoveryToken,
}: {
  to: string;
  name?: string;
  recoveryToken: string;
}) {
  const firstName = getFirstName(name);
  const checkoutUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca'}/priority-processing?t=${recoveryToken}`;
  const subject = `Action required: complete your funding review`;

  const html = wrapMCARecoveryTemplate(`
    <p style="margin: 0 0 16px 0;">
      This is our final notice regarding your optional pre-submission document review.
    </p>
    <p style="margin: 0 0 16px 0;">
      We will stop sending reminders after tomorrow. You can still complete your Pre-Submission Document Review today to ensure your application files are verified by a specialist before partner submission.
    </p>
    <p style="margin: 0 0 20px 0;">
      Complete your review now before the registration window closes:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#2563eb;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(37,99,235,0.2);">
        Complete Final Document Review &rarr;
      </a>
      <p style="font-size:12px;color:#64748b;margin-top:12px;font-style:italic;margin-bottom:0;">
        Your application remains active in our standard queue whether or not you choose this optional service.
      </p>
    </div>
  `, firstName);

  const text = `Hi ${firstName},\n\nWe'll stop sending reminders after tomorrow. You can still complete your optional Pre-Submission Document Review to verify your documents:\n${checkoutUrl}\n\nNote: Your application remains active in our standard queue whether or not you choose this optional service.\n\nBest,\nFunding Operations Team\nFSI Digital Canada`;

  return sendEmail({ to, subject, html, text, tagType: 'mca-recovery-email5' });
}
