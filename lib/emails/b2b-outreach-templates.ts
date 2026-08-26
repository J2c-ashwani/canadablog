import { escapeHtml, getFirstName } from './mailer';

export type B2BOutreachStage = 'b2b_day1' | 'b2b_day4' | 'b2b_day7';

function wrapB2BEmailTemplate(contentHtml: string, firstName: string, unsubscribeUrl: string) {
  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;margin:0;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
        <div style="padding-bottom:18px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">FSI <span style="color:#059669;">Digital</span></span>
          <span style="float:right;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;padding:2px 8px;background-color:#f1f5f9;border-radius:4px;margin-top:2px;">Funding Tools</span>
        </div>
        <div style="font-size:15px;color:#334155;line-height:1.6;text-align:left;">
          <p style="font-weight:600;margin-top:0;margin-bottom:16px;">Hi ${firstName},</p>
          ${contentHtml}
        </div>
        <div style="padding-top:24px;border-top:1px solid #f1f5f9;margin-top:32px;font-size:13px;color:#475569;line-height:1.5;">
          Best regards,<br/><strong>Ashwani Kumar</strong><br/>
          <span style="color:#64748b;font-size:12px;">Founder, FSI Digital</span>
          <div style="margin-top:24px;padding-top:16px;border-top:1px dashed #e2e8f0;font-size:11px;color:#94a3b8;text-align:center;">
            You receive this because you opted in for funding information from FSI Digital.<br/>
            <a href="${unsubscribeUrl}" style="color:#64748b;text-decoration:underline;margin-top:8px;display:inline-block;">Unsubscribe</a>
          </div>
        </div>
      </div>
    </div>`;
}

function cta(url: string, label: string, color = '#059669') {
  return `<div style="margin:24px 0;"><a href="${url}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:${color};color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;">${label}</a></div>`;
}

export function getB2BEmailContent(
  stage: B2BOutreachStage,
  firstName: string,
  industry: string,
  state: string,
  telemetrySignal: 'calculator' | 'pdf' | 'general' = 'general',
  unsubscribeToken = ''
) {
  const safeName = getFirstName(firstName);
  const unsubscribeUrl = unsubscribeToken
    ? `https://www.fsidigital.ca/subscribe/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`
    : 'https://www.fsidigital.ca/subscribe/unsubscribe';
  const region = escapeHtml(state?.trim() || 'your region');
  const industryLabel = escapeHtml(industry?.trim() || 'your industry');
  const context = telemetrySignal === 'calculator'
    ? `You recently used the FSI Digital funding calculator for ${region}.`
    : telemetrySignal === 'pdf'
      ? `You recently downloaded an FSI Digital funding guide for ${region}.`
      : `You asked FSI Digital for funding information for a business in ${region}.`;

  if (stage === 'b2b_day1') {
    const url = 'https://www.fsidigital.ca/products/funding-match-report?utm_source=growth_os&utm_medium=email&utm_campaign=b2b_day1';
    return {
      subject: 'Your next funding-screening step',
      text: `Hi ${safeName},\n\n${context}\n\nIf you want a concise, self-serve next step, the $19 USD Funding Match Report is built to screen the current database against your profile and show which programs deserve further review. No call is required.\n\nView it here: ${url}\n\nProgram availability and eligibility should always be confirmed with the official funding body.\n\nBest,\nAshwani Kumar\nFounder, FSI Digital`,
      html: wrapB2BEmailTemplate(`
        <p>${context}</p>
        <p>For a concise, self-serve next step, the <strong>$19 USD Funding Match Report</strong> screens the current FSI program database against your ${industryLabel} profile and identifies programs worth reviewing.</p>
        <p style="font-size:13px;color:#64748b;">No call is required. Program availability and final eligibility should always be confirmed with the official funding body.</p>
        ${cta(url, 'Get the $19 Match Report')}
      `, safeName, unsubscribeUrl),
    };
  }

  if (stage === 'b2b_day4') {
    const url = 'https://www.fsidigital.ca/products/bundle?utm_source=growth_os&utm_medium=email&utm_campaign=b2b_day4';
    return {
      subject: 'Turn the shortlist into an action plan',
      text: `Hi ${safeName},\n\nA useful funding shortlist still needs deadlines, document requirements, and a preparation sequence. The $79 USD Funding Toolkit bundles the self-serve materials for that work.\n\nReview the toolkit: ${url}\n\nThere are no calls or filing-service commitments included.\n\nBest,\nAshwani Kumar\nFounder, FSI Digital`,
      html: wrapB2BEmailTemplate(`
        <p>A useful funding shortlist still needs deadlines, document requirements, and a preparation sequence.</p>
        <p>The <strong>$79 USD Funding Toolkit</strong> bundles the self-serve materials for that work. It does not include calls or a filing service.</p>
        ${cta(url, 'Review the $79 Toolkit')}
      `, safeName, unsubscribeUrl),
    };
  }

  const url = 'https://www.fsidigital.ca/membership?utm_source=growth_os&utm_medium=email&utm_campaign=b2b_day7';
  return {
    subject: 'Prefer ongoing funding updates?',
    text: `Hi ${safeName},\n\nIf you are not ready for a one-time report, Funding Watch is the self-serve option for ongoing monitoring. It is $29 USD per month and includes weekly profile-matched radar emails, deadline updates, dashboard access, and templates. Cancel online anytime.\n\nSee Funding Watch: ${url}\n\nBest,\nAshwani Kumar\nFounder, FSI Digital`,
    html: wrapB2BEmailTemplate(`
      <p>If you prefer ongoing monitoring, <strong>Funding Watch</strong> is the self-serve option.</p>
      <p>For $29 USD/month, active members receive weekly profile-matched radar emails, deadline updates, dashboard access, and templates. Cancel online anytime.</p>
      ${cta(url, 'See the $29 Funding Watch')}
    `, safeName, unsubscribeUrl),
  };
}
