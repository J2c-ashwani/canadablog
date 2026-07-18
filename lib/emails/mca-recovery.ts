// lib/emails/mca-recovery.ts
// MCA Priority Processing Recovery Emails
// Sends high-converting, personalized recovery templates via Resend.

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
            Canada Funding Priority
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
      We have successfully received your business funding application for FSI Digital.
    </p>
    <p style="margin: 0 0 16px 0;">
      Please note that your file is currently placed in the standard queue. A senior analyst has not yet started reviewing your financial documents.
    </p>
    <p style="margin: 0 0 20px 0;">
      If you want to accelerate your application and bypass the standard queue wait time, you can upgrade to <strong>Priority Funding Processing</strong> for a one-time fee of <strong>CAD $49</strong>. This activates immediate review and priority partner delivery:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#2563eb;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(37,99,235,0.2);">
        Complete Priority Processing &rarr;
      </a>
    </div>
  `, firstName);

  const text = `Hi ${firstName},\n\nWe received your business funding application successfully. Standard queue reviews take time. Upgrade to Priority Processing for CAD $49 to fast-track your review and skip the queue:\n${checkoutUrl}\n\nBest,\nFunding Operations Team\nFSI Digital Canada`;

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
      Underwriting checks are automated, and even tiny formatting errors or transaction anomalies on your bank statements can trigger immediate partner declines.
    </p>
    <p style="margin: 0 0 16px 0;">
      With <strong>Priority Processing</strong>, our specialists audit your bank statements manually to catch red flags (like NSFs, low balances, or corrupted PDFs) and assist you in fixing them <strong>before</strong> your file goes to partners.
    </p>
    <p style="margin: 0 0 20px 0;">
      Protect your credit rating and avoid automated partner declines by opting for priority review today:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#2563eb;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(37,99,235,0.2);">
        Secure My Application &rarr;
      </a>
    </div>
  `, firstName);

  const text = `Hi ${firstName},\n\nMinor bank statement issues can cause automated partner declines. Enable Priority Processing for CAD $49 to have our specialists verify your documents before partner submission:\n${checkoutUrl}\n\nBest,\nFunding Operations Team\nFSI Digital Canada`;

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
      This is a quick update regarding your business funding profile. Standard applications are processed sequentially in submission order, which can cause significant delays during high volume periods.
    </p>
    <p style="margin: 0 0 16px 0;">
      Our <strong>Priority Queue</strong> bypasses this standard wait list completely, landing your file directly on the priority desks of our primary funding partner.
    </p>
    <p style="margin: 0 0 20px 0;">
      Fast-track your application and complete your document verification today:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#2563eb;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(37,99,235,0.2);">
        Fast-Track My Review Now &rarr;
      </a>
    </div>
  `, firstName);

  const text = `Hi ${firstName},\n\nYour application is in the standard review queue. Bypass the queue completely and get priority specialist review within 4 hours for CAD $49:\n${checkoutUrl}\n\nBest,\nFunding Operations Team\nFSI Digital Canada`;

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
      If you are ready to proceed with securing working capital for inventory, payroll, or expansion, completing your Priority Processing ensures you get immediate, dedicated review.
    </p>
    <p style="margin: 0 0 20px 0;">
      Click below to upgrade your application in one click:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#2563eb;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(37,99,235,0.2);">
        Complete Priority Review &rarr;
      </a>
    </div>
  `, firstName);

  const text = `Hi ${firstName},\n\nIf you are still looking to secure working capital for your business, you can complete your Priority Processing review here:\n${checkoutUrl}\n\nBest,\nFunding Operations Team\nFSI Digital Canada`;

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
      This is our final notice regarding your priority funding options.
    </p>
    <p style="margin: 0 0 16px 0;">
      We will close your active recovery sequence in 24 hours. You can still complete your priority processing upgrade today to ensure your application is reviewed and submitted to our partners with highest queue standing.
    </p>
    <p style="margin: 0 0 20px 0;">
      Complete your review now before the priority window closes:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#2563eb;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(37,99,235,0.2);">
        Complete Final Review &rarr;
      </a>
    </div>
  `, firstName);

  const text = `Hi ${firstName},\n\nThis is our final notice before closing your active recovery sequence. Complete your Priority Processing upgrade to verify your documents:\n${checkoutUrl}\n\nBest,\nFunding Operations Team\nFSI Digital Canada`;

  return sendEmail({ to, subject, html, text, tagType: 'mca-recovery-email5' });
}
