type ContactConfirmationInput = {
  to: string;
  name: string;
  category: string;
  messageSnippet: string;
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
  return escapeHtml(name.split(' ')[0] || 'there');
}

function truncateMessage(message: string, maxLength = 200) {
  const clean = message.replace(/\n+/g, ' ').trim();
  if (clean.length <= maxLength) return escapeHtml(clean);
  return escapeHtml(clean.slice(0, maxLength).trim()) + '…';
}

function buildHtml({
  firstName,
  category,
  messageSnippet,
  replyToEmail,
}: {
  firstName: string;
  category: string;
  messageSnippet: string;
  replyToEmail: string;
}) {
  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.05);">
        <div style="display:none;max-height:0;overflow:hidden;color:transparent">We received your funding question — here's a copy for your records.</div>

        <!-- Brand Header -->
        <div style="padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; margin-bottom: 24px; display: table; width: 100%;">
          <span style="font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; display: table-cell;">FSI <span style="color: #059669;">Digital</span></span>
          <span style="font-size: 12px; font-weight: 600; color: #64748b; background-color: #f1f5f9; padding: 4px 8px; border-radius: 4px; display: table-cell; text-align: right; width: 100px;">Advisory Desk</span>
        </div>

        <p style="margin:0 0 16px 0;font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>

        <p style="margin:0 0 16px 0;font-size:15px;color:#334155;line-height:1.6;">Thank you for reaching out to FSI Digital. We have received your message and a member of our team will review it.</p>

        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 18px 20px; margin: 20px 0;">
          <p style="margin: 0 0 8px 0; font-size: 11px; color: #047857; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Your Request</p>
          <p style="margin: 0 0 8px 0; font-size: 15px; color: #064e3b;">
            <strong>Category:</strong> ${escapeHtml(category)}
          </p>
          <div style="font-size: 14px; color: #047857; font-style: italic; background-color: #ffffff; border-left: 3px solid #10b981; padding: 8px 12px; margin: 8px 0 0 0; border-radius: 4px; line-height: 1.5;">
            "${messageSnippet}"
          </div>
        </div>

        <p style="margin:20px 0 8px 0;font-weight:700;color:#0f172a;font-size:15px;">What happens next:</p>
        <table style="width:100%;border-collapse:collapse;margin:0 0 20px 0;" cellpadding="0" cellspacing="0">
          <tr>
            <td style="vertical-align:top;width:20px;padding-bottom:8px;font-size:14px;color:#059669;font-weight:bold;">•</td>
            <td style="vertical-align:top;font-size:14px;color:#475569;padding-bottom:8px;line-height:1.5;">
              Our team typically responds within <strong>24–48 hours</strong>.
            </td>
          </tr>
          <tr>
            <td style="vertical-align:top;width:20px;font-size:14px;color:#059669;font-weight:bold;">•</td>
            <td style="vertical-align:top;font-size:14px;color:#475569;line-height:1.5;">
              If you need to add any details, simply reply to this email.
            </td>
          </tr>
        </table>

        <!-- Footer Signature -->
        <div style="padding-top:20px;border-top:1px solid #f1f5f9;margin-top:28px;">
          <p style="margin:0;font-size:14px;color:#475569;line-height:1.5;">
            Best regards,<br/>
            <strong>Ashwani K</strong><br/>
            <span style="color:#64748b;font-size:13px;">Founder, FSI Digital</span><br/>
            <a href="mailto:${replyToEmail}" style="color:#2563eb;text-decoration:none;font-size:13px;">${replyToEmail}</a>
          </p>
        </div>
      </div>
    </div>
  `;
}

function buildText({
  firstName,
  category,
  messageSnippet,
  replyToEmail,
}: {
  firstName: string;
  category: string;
  messageSnippet: string;
  replyToEmail: string;
}) {
  return `Hi ${firstName},

Thank you for reaching out to FSI Digital. We have received your message and a member of our team will review it.

Your request:
Category: ${category}
"${messageSnippet}"

What happens next:
- Our team typically responds within 24–48 hours.
- If you need to add any details, simply reply to this email.

Best regards,
Ashwani K
Founder, FSI Digital
${replyToEmail}`;
}

function parseCalculatorSnippet(snippet: string) {
  const provinceMatch = snippet.match(/Province:\s*(.+)/);
  const industryMatch = snippet.match(/Industry:\s*(.+)/);
  const revenueMatch = snippet.match(/Revenue:\s*(.+)/);
  const goalMatch = snippet.match(/Goal:\s*(.+)/);
  const rangeMatch = snippet.match(/Estimated Funding Range:\s*(.+)/);
  const matchesMatch = snippet.match(/Matched Grants Count:\s*(.+)/);
  
  return {
    province: provinceMatch ? provinceMatch[1].trim() : 'Ontario',
    industry: industryMatch ? industryMatch[1].trim() : 'Business',
    revenue: revenueMatch ? revenueMatch[1].trim() : '',
    goal: goalMatch ? goalMatch[1].trim() : '',
    range: rangeMatch ? rangeMatch[1].trim() : '$25,000 - $100,000+',
    matches: matchesMatch ? matchesMatch[1].trim() : '15',
  };
}

function buildPersonalizedIntro(parsed: { province: string; industry: string; matches: string; range: string }) {
  const cleanProvince = parsed.province.trim().toUpperCase();
  const cleanIndustry = parsed.industry.trim().toLowerCase();

  const provinceMap: Record<string, string> = {
    ON: 'Ontario',
    BC: 'British Columbia',
    AB: 'Alberta',
    QC: 'Quebec',
    SK: 'Saskatchewan',
    MB: 'Manitoba',
    NB: 'New Brunswick',
    NS: 'Nova Scotia',
    PE: 'Prince Edward Island',
    NL: 'Newfoundland & Labrador',
    YT: 'Yukon',
    NT: 'Northwest Territories',
    NU: 'Nunavut',
  };

  const provinceName = provinceMap[cleanProvince] || parsed.province.trim();
  
  const hasInvalidProvince = !provinceName || ['N/A', 'NA', 'OTHER', 'UNKNOWN', 'CANADA'].includes(provinceName.toUpperCase());
  const hasInvalidIndustry = !cleanIndustry || ['N/A', 'NA', 'OTHER', 'UNKNOWN', 'BUSINESS'].includes(cleanIndustry.toUpperCase());

  if (hasInvalidProvince && hasInvalidIndustry) {
    return `Based on your business profile, we identified <strong>${escapeHtml(parsed.matches)}</strong> funding opportunities with an estimated funding range of <strong>${escapeHtml(parsed.range)}</strong>.`;
  }

  if (hasInvalidProvince) {
    return `Based on your <strong>${escapeHtml(cleanIndustry)}</strong> business, we identified <strong>${escapeHtml(parsed.matches)}</strong> funding opportunities with an estimated funding range of <strong>${escapeHtml(parsed.range)}</strong>.`;
  }

  if (hasInvalidIndustry) {
    return `Based on your <strong>${escapeHtml(provinceName)}</strong> business, we identified <strong>${escapeHtml(parsed.matches)}</strong> funding opportunities with an estimated funding range of <strong>${escapeHtml(parsed.range)}</strong>.`;
  }

  return `Based on your <strong>${escapeHtml(provinceName)} ${escapeHtml(cleanIndustry)}</strong> business, we identified <strong>${escapeHtml(parsed.matches)}</strong> funding opportunities with an estimated funding range of <strong>${escapeHtml(parsed.range)}</strong>.`;
}

function buildPersonalizedIntroText(parsed: { province: string; industry: string; matches: string; range: string }) {
  const cleanProvince = parsed.province.trim().toUpperCase();
  const cleanIndustry = parsed.industry.trim().toLowerCase();

  const provinceMap: Record<string, string> = {
    ON: 'Ontario',
    BC: 'British Columbia',
    AB: 'Alberta',
    QC: 'Quebec',
    SK: 'Saskatchewan',
    MB: 'Manitoba',
    NB: 'New Brunswick',
    NS: 'Nova Scotia',
    PE: 'Prince Edward Island',
    NL: 'Newfoundland & Labrador',
    YT: 'Yukon',
    NT: 'Northwest Territories',
    NU: 'Nunavut',
  };

  const provinceName = provinceMap[cleanProvince] || parsed.province.trim();
  
  const hasInvalidProvince = !provinceName || ['N/A', 'NA', 'OTHER', 'UNKNOWN', 'CANADA'].includes(provinceName.toUpperCase());
  const hasInvalidIndustry = !cleanIndustry || ['N/A', 'NA', 'OTHER', 'UNKNOWN', 'BUSINESS'].includes(cleanIndustry.toUpperCase());

  if (hasInvalidProvince && hasInvalidIndustry) {
    return `Based on your business profile, we identified ${parsed.matches} funding opportunities with an estimated funding range of ${parsed.range}.`;
  }

  if (hasInvalidProvince) {
    return `Based on your ${cleanIndustry} business, we identified ${parsed.matches} funding opportunities with an estimated funding range of ${parsed.range}.`;
  }

  if (hasInvalidIndustry) {
    return `Based on your ${provinceName} business, we identified ${parsed.matches} funding opportunities with an estimated funding range of ${parsed.range}.`;
  }

  return `Based on your ${provinceName} ${cleanIndustry} business, we identified ${parsed.matches} funding opportunities with an estimated funding range of ${parsed.range}.`;
}

function buildCalculatorHtml({
  firstName,
  parsed,
  restoreUrl,
  replyToEmail,
  to,
}: {
  firstName: string;
  parsed: ReturnType<typeof parseCalculatorSnippet>;
  restoreUrl: string;
  replyToEmail: string;
  to: string;
}) {
  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.05);">
        <!-- Brand Header -->
        <div style="padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; margin-bottom: 24px; display: table; width: 100%;">
          <span style="font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; display: table-cell;">FSI <span style="color: #059669;">Digital</span></span>
          <span style="font-size: 12px; font-weight: 600; color: #64748b; background-color: #f1f5f9; padding: 4px 8px; border-radius: 4px; display: table-cell; text-align: right; width: 100px;">Advisory Desk</span>
        </div>

        <p style="margin:0 0 16px 0;font-size:15px;color:#334155;font-weight:500;">Hi ${firstName},</p>

        <p style="margin:0 0 20px 0;font-size:15px;color:#334155;line-height:1.6;">Your personalized funding strategy is waiting. ${buildPersonalizedIntro(parsed)}</p>

        <!-- Eligibility Result Card -->
        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
          <p style="margin: 0 0 8px 0; font-size: 11px; color: #047857; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Estimated Business Funding Match</p>
          <h2 style="margin: 0 0 10px 0; font-size: 32px; font-weight: 900; color: #065f46; letter-spacing: -0.03em;">${escapeHtml(parsed.range)}</h2>
          <div style="display: inline-block; background-color: #d1fae5; color: #065f46; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 9999px;">
            ✓ ${escapeHtml(parsed.matches)} Active Programs Matched
          </div>
        </div>

        <!-- Call to Action -->
        <div style="text-align: center; margin: 28px 0;">
          <p style="margin: 0 auto 16px auto; font-size: 12px; color: #64748b; line-height: 1.5; max-width: 480px;">
            These recommendations were generated based on your business profile and may change as funding programs open or close. Review your personalized strategy now to see the programs currently available to you.
          </p>
          <a href="${restoreUrl}" style="display: inline-block; background-color: #059669; color: #ffffff; font-weight: 700; font-size: 15px; text-decoration: none; padding: 14px 28px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(5, 150, 105, 0.2);">
            Continue to My Funding Strategy &rarr;
          </a>
          <p style="margin: 10px 0 0 0; font-size: 11px; color: #64748b;">Link is valid for your email: ${to}</p>
        </div>

        <p style="margin:20px 0 8px 0;font-weight:700;color:#0f172a;font-size:15px;">Next steps to lock in your funding:</p>
        <table style="width:100%;border-collapse:collapse;margin:0 0 24px 0;" cellpadding="0" cellspacing="0">
          <tr>
            <td style="vertical-align:top;width:20px;padding-bottom:8px;font-size:14px;color:#059669;font-weight:bold;">1.</td>
            <td style="vertical-align:top;font-size:14px;color:#475569;padding-bottom:8px;line-height:1.5;">
              Open your <strong>Funding Matches</strong> to check matching deadlines.
            </td>
          </tr>
          <tr>
            <td style="vertical-align:top;width:20px;padding-bottom:8px;font-size:14px;color:#059669;font-weight:bold;">2.</td>
            <td style="vertical-align:top;font-size:14px;color:#475569;padding-bottom:8px;line-height:1.5;">
              Download template files and application guides to prepare your filing.
            </td>
          </tr>
          <tr>
            <td style="vertical-align:top;width:20px;padding-bottom:8px;font-size:14px;color:#059669;font-weight:bold;">3.</td>
            <td style="vertical-align:top;font-size:14px;color:#475569;line-height:1.5;">
              Secure a 1-on-1 strategy session to review matching programs with an expert.
            </td>
          </tr>
        </table>

        <!-- Footer Signature -->
        <div style="padding-top:20px;border-top:1px solid #f1f5f9;margin-top:28px;">
          <p style="margin:0;font-size:14px;color:#475569;line-height:1.5;">
            Best regards,<br/>
            <strong>Ashwani K</strong><br/>
            <span style="color:#64748b;font-size:13px;">Founder, FSI Digital</span><br/>
            <a href="mailto:${replyToEmail}" style="color:#2563eb;text-decoration:none;font-size:13px;">${replyToEmail}</a>
          </p>
        </div>
      </div>
    </div>
  `;
}

function buildCalculatorText({
  firstName,
  parsed,
  restoreUrl,
  replyToEmail,
}: {
  firstName: string;
  parsed: ReturnType<typeof parseCalculatorSnippet>;
  restoreUrl: string;
  replyToEmail: string;
}) {
  return `Hi ${firstName},

Your personalized funding strategy is waiting.

${buildPersonalizedIntroText(parsed)}

These recommendations were generated based on your business profile and may change as funding programs open or close. Review your personalized strategy now to see the programs currently available to you.

Continue to your strategy here:
${restoreUrl}

Next steps to lock in your funding:
1. Open your Funding Matches to check matching deadlines.
2. Download template files and application guides to prepare your filing.
3. Secure a 1-on-1 strategy session to review matching programs with an expert.

Best regards,
Ashwani K
Founder, FSI Digital
${replyToEmail}`;
}

export async function sendContactConfirmation({
  to,
  name,
  category,
  messageSnippet,
}: ContactConfirmationInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'FSI Digital <hello@fsidigital.ca>';
  const replyToEmail = process.env.RESEND_REPLY_TO_EMAIL || 'ashwani@fsidigital.ca';

  if (!apiKey) {
    console.warn('Contact confirmation email skipped — RESEND_API_KEY is not set.');
    return { success: false, skipped: true };
  }

  const firstName = getFirstName(name);

  let html = "";
  let text = "";
  let subject = `We received your message, ${firstName}`;

  if (category === 'Grant Calculator') {
    const parsed = parseCalculatorSnippet(messageSnippet);
    const restoreUrl = `https://www.fsidigital.ca/calculator?step=6&email=${encodeURIComponent(to)}&province=${encodeURIComponent(parsed.province)}&industry=${encodeURIComponent(parsed.industry)}&revenue=${encodeURIComponent(parsed.revenue)}&goal=${encodeURIComponent(parsed.goal)}&name=${encodeURIComponent(name)}`;
    
    subject = `Your funding strategy is waiting, ${firstName}`;
    html = buildCalculatorHtml({ firstName, parsed, restoreUrl, replyToEmail, to });
    text = buildCalculatorText({ firstName, parsed, restoreUrl, replyToEmail });
  } else {
    const snippet = truncateMessage(messageSnippet);
    html = buildHtml({ firstName, category, messageSnippet: snippet, replyToEmail });
    text = buildText({ firstName, category, messageSnippet: snippet, replyToEmail });
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
        text,
        tags: [
          { name: 'type', value: 'contact-confirmation' },
          { name: 'category', value: category.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 50) },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Contact confirmation email failed:', errorText);
      return { success: false, error: errorText };
    }

    return { success: true };
  } catch (error) {
    console.error('Contact confirmation email error:', error);
    return { success: false, error: String(error) };
  }
}
