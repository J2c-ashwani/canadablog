type OtpEmailInput = {
  to: string;
  code: string;
};

function buildHtml(code: string) {
  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <div style="max-width:480px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.05);">
        <!-- Brand Header -->
        <div style="padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; margin-bottom: 24px; display: table; width: 100%;">
          <span style="font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; display: table-cell;">FSI <span style="color: #059669;">Digital</span></span>
          <span style="font-size: 12px; font-weight: 600; color: #64748b; background-color: #f1f5f9; padding: 4px 8px; border-radius: 4px; display: table-cell; text-align: right; width: 100px;">Verification</span>
        </div>

        <h2 style="margin:0 0 12px 0;font-size:20px;font-weight:700;color:#0f172a;line-height:1.3;">Verify Your Email Address</h2>
        <p style="margin:0 0 24px 0;font-size:14px;color:#475569;line-height:1.5;">Enter the following code in the verification screen to view your Funding Readiness Score and unlock your matches.</p>

        <!-- OTP Code Box -->
        <div style="background-color:#f1f5f9;border-radius:8px;padding:20px;text-align:center;margin-bottom:24px;">
          <span style="font-family:Courier,monospace;font-size:32px;font-weight:800;color:#0f172a;letter-spacing:8px;padding-left:8px;">${code}</span>
        </div>

        <p style="margin:0 0 20px 0;font-size:12px;color:#64748b;line-height:1.5;">This verification code is valid for <strong>10 minutes</strong>. If you did not request this code, please ignore this email.</p>

        <!-- Footer Signature -->
        <div style="padding-top:20px;border-top:1px solid #f1f5f9;margin-top:28px;">
          <p style="margin:0;font-size:13px;color:#64748b;line-height:1.4;">
            Best regards,<br/>
            <strong>Ashwani K</strong><br/>
            <span style="font-size:12px;color:#94a3b8;">Founder, FSI Digital</span>
          </p>
        </div>
      </div>
    </div>
  `;
}

export async function sendOtpEmail({ to, code }: OtpEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'FSI Digital <hello@fsidigital.ca>';
  const replyToEmail = process.env.RESEND_REPLY_TO_EMAIL || 'ashwani@fsidigital.ca';

  if (!apiKey) {
    console.warn('[OTP Email] Skipped sending — RESEND_API_KEY is not set.');
    return { success: false, skipped: true };
  }

  const html = buildHtml(code);
  const text = `Your FSI Digital email verification code is: ${code}. This code is valid for 10 minutes.`;

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
        subject: `${code} is your FSI Digital verification code`,
        html,
        text,
        tags: [{ name: 'type', value: 'otp-verification' }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[OTP Email] Resend failed:', errorText);
      return { success: false, error: errorText };
    }

    return { success: true };
  } catch (error) {
    console.error('[OTP Email] Sending error:', error);
    return { success: false, error: String(error) };
  }
}
