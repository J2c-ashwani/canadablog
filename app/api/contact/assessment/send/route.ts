import { type NextRequest, NextResponse } from "next/server";
import { applyRateLimit } from "@/lib/rate-limit";
import { sendEmail } from '@/lib/emails/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function buildHtml(name: string, score: number, tier: string, range: string, categories: string[]) {
  const action = tier === 'A'
    ? {
        text: 'Get named program matches, a prioritized action plan, and a multi-year stacking simulation in the Complete Funding Blueprint.',
        link: 'https://www.fsidigital.ca/products/bundle?source=contact-score-email',
        label: 'Get Complete Blueprint — $79',
      }
    : tier === 'B'
      ? {
          text: 'Turn your profile into a prioritized four-month application sequence with document and timing requirements.',
          link: 'https://www.fsidigital.ca/products/action-plan?source=contact-score-email',
          label: 'Get Funding Action Plan — $49',
        }
      : {
          text: 'Start with a personalized list of matched programs, estimated ranges, requirements, and next steps.',
          link: 'https://www.fsidigital.ca/products/funding-match-report?source=contact-score-email',
          label: 'Get Funding Match Report — $19',
        };

  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.05);">
        <!-- Brand Header -->
        <div style="padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; margin-bottom: 24px; display: table; width: 100%;">
          <span style="font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; display: table-cell;">FSI <span style="color: #059669;">Digital</span></span>
          <span style="font-size: 12px; font-weight: 600; color: #64748b; background-color: #f1f5f9; padding: 4px 8px; border-radius: 4px; display: table-cell; text-align: right; width: 110px;">Readiness Score</span>
        </div>

        <p style="margin:0 0 16px 0;font-size:15px;color:#334155;font-weight:500;">Hi ${name || 'there'},</p>
        <p style="margin:0 0 24px 0;font-size:15px;color:#334155;line-height:1.6;">Here is a copy of your Funding Readiness Assessment score. Based on your submitted profile, our algorithm has compiled the following criteria:</p>

        <!-- Score Dashboard Box -->
        <div style="border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:28px;background-color:#fafafa;text-align:center;">
          <div style="font-size:14px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Ready Score</div>
          <div style="font-size:48px;font-weight:800;color:#059669;margin-bottom:8px;">${score} / 100</div>
          <div style="font-size:14px;font-weight:700;color:#1e293b;background-color:#f1f5f9;display:inline-block;padding:6px 12px;border-radius:20px;">
            ${tier === 'A' ? '🔥 High Potential Candidate' : tier === 'B' ? '⚡ Opportunities Available' : '📚 Nurture Candidate'}
          </div>
        </div>

        <!-- Details Grid -->
        <div style="margin-bottom:28px;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 12px 0;border-bottom:1px solid #f1f5f9;padding-bottom:6px;">Assessment Summary</h3>
          <table style="width:100%;font-size:14px;color:#475569;" cellpadding="0" cellspacing="0">
            <tr style="border-bottom:1px solid #f8fafc;">
              <td style="padding:10px 0;font-weight:600;width:160px;color:#334155;">Opportunity Range:</td>
              <td style="padding:10px 0;font-weight:700;color:#059669;">${range}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:600;vertical-align:top;color:#334155;">Matched Streams:</td>
              <td style="padding:10px 0;line-height:1.5;">
                ${categories.map(c => `<div style="margin-bottom:4px;">✓ ${c}</div>`).join('')}
              </td>
            </tr>
          </table>
        </div>

        <!-- Call to Action -->
        <div style="background-color:#e0f2fe;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin-bottom:28px;text-align:center;">
          <h4 style="margin:0 0 8px 0;font-size:15px;font-weight:700;color:#0369a1;">Recommended Next Step</h4>
          <p style="margin:0 0 16px 0;font-size:13px;color:#0284c7;line-height:1.5;">${action.text}</p>
          <a href="${action.link}" style="display:inline-block;background-color:#0284c7;color:#ffffff;font-weight:700;font-size:14px;padding:12px 24px;border-radius:6px;text-decoration:none;">
            ${action.label}
          </a>
        </div>

        <!-- Footer Signature -->
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

export async function POST(request: NextRequest) {
  // Rate Limit: 5 requests / minute
  if (process.env.NODE_ENV !== 'development') {
    const limitRes = await applyRateLimit(request, 5, 60 * 1000);
    if (limitRes.isLimited) return limitRes.response;
  }

  try {
    const { email, name, score, tier, range, categories } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const html = buildHtml(name, score, tier, range, categories);
    const product = tier === 'A' ? '$79 Complete Funding Blueprint' : tier === 'B' ? '$49 Funding Action Plan' : '$19 Funding Match Report';
    const text = `Hi ${name || 'there'},\n\nYour Funding Readiness Assessment Score is ${score}/100. Match Range: ${range}.\n\nRecommended self-serve next step: ${product}. Instant digital delivery; no call or live session is required.`;
    const result = await sendEmail({
      to: email,
      subject: `Your Funding Readiness Score: ${score}/100`,
      html,
      text,
      tagType: 'contact-assessment-copy',
    });
    if (!result.success || !result.providerMessageId) {
      console.error('[Assessment Email] Provider did not accept the assessment copy:', result.error || 'provider message ID missing');
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, provider: result.provider, providerMessageId: result.providerMessageId });
  } catch (error) {
    console.error("[Assessment Email Route] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
