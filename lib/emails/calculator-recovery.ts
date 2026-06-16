import { sendEmail, getFirstName } from "./mailer";
import { generateFundingMatchReport } from "../products/report-generator";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function wrapCalculatorRecoveryTemplate(contentHtml: string, loginToken: string, firstName: string) {
  const unsubscribeUrl = `https://www.fsidigital.ca/subscribe/unsubscribe?token=${loginToken}`;

  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;margin:0;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="padding-bottom:18px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;text-align:left;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">FSI <span style="color:#059669;">Digital</span></span>
          <span style="float:right;font-size:11px;font-weight:700;color:#059669;text-transform:uppercase;padding:2px 8px;background-color:#ecfdf5;border-radius:4px;margin-top:2px;">
            Funding Roadmap
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
          <strong>Ashwani K</strong><br/>
          <span style="color:#64748b;font-size:12px;">Founder, FSI Digital</span>
          
          <div style="margin-top:24px;padding-top:16px;border-top:1px dashed #e2e8f0;font-size:11px;color:#94a3b8;text-align:center;">
            This email was sent because you completed our government funding calculator.<br>
            <a href="${unsubscribeUrl}" style="color:#64748b;text-decoration:underline;margin-top:8px;display:inline-block;">Unsubscribe from these emails</a>
          </div>
        </div>

      </div>
    </div>
  `;
}

/**
 * Calculator Recovery Email 1: Your funding matches are waiting
 * Sent 24 hours after completion
 */
export async function sendCalculatorRecoveryEmail1({
  to,
  name,
  loginToken,
  province,
  industry,
  revenue,
  goal,
  estimatedMin,
  estimatedMax
}: {
  to: string;
  name?: string;
  loginToken: string;
  province: string;
  industry: string;
  revenue: string;
  goal: string;
  estimatedMin: number;
  estimatedMax: number;
}) {
  const firstName = getFirstName(name);
  const checkoutUrl = `https://www.fsidigital.ca/calculator?token=${loginToken}&utm_source=calculator_recovery&utm_medium=email&utm_campaign=calc_recovery_day1`;
  const subject = `Your funding matches are waiting`;

  const html = wrapCalculatorRecoveryTemplate(`
    <p style="margin: 0 0 16px 0;">
      You recently ran your business profile through our Government Funding Calculator. We have successfully matched your profile to active non-dilutive programs currently accepting applications.
    </p>
    
    <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:20px 0;">
      <p style="margin:0 0 8px 0;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Your Profile Summary</p>
      <table style="width:100%;font-size:13.5px;color:#475569;">
        <tr>
          <td style="padding:3px 0;"><strong>Location:</strong></td>
          <td style="text-align:right;color:#0f172a;">${escapeHtml(province)}</td>
        </tr>
        <tr>
          <td style="padding:3px 0;"><strong>Industry:</strong></td>
          <td style="text-align:right;color:#0f172a;">${escapeHtml(industry)}</td>
        </tr>
        <tr>
          <td style="padding:3px 0;"><strong>Revenue Tier:</strong></td>
          <td style="text-align:right;color:#0f172a;">${escapeHtml(revenue)}</td>
        </tr>
        <tr>
          <td style="padding:3px 0;"><strong>Funding Goal:</strong></td>
          <td style="text-align:right;color:#0f172a;">${escapeHtml(goal)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0 0 0;font-size:14px;color:#059669;border-top:1px solid #e2e8f0;"><strong>Est. Potential Funding:</strong></td>
          <td style="padding:8px 0 0 0;text-align:right;font-size:15px;font-weight:800;color:#059669;border-top:1px solid #e2e8f0;">$${estimatedMin.toLocaleString()} – $${estimatedMax.toLocaleString()}</td>
        </tr>
      </table>
    </div>

    <p style="margin: 0 0 20px 0;">
      Unlock your personalized **Funding Match Report** to get the exact list of matching grants, loans, and subsidies, along with their specific application guides and required document lists:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);">
        Unlock My Match Report ($19) &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nYou recently calculated your funding matches. Based on your ${industry} business in ${province}, your estimated potential funding is $${estimatedMin.toLocaleString()} - $${estimatedMax.toLocaleString()}.\n\nUnlock your full Funding Match Report ($19) to see all matched programs:\n${checkoutUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'calc-recovery-email1' });
}

/**
 * Calculator Recovery Email 2: See the top programs we found
 * Sent 72 hours (3 days) after completion. Personalized with real program names.
 */
export async function sendCalculatorRecoveryEmail2({
  to,
  name,
  loginToken,
  provinceCode,
  industryCode,
  revenueCode,
  goalCode
}: {
  to: string;
  name?: string;
  loginToken: string;
  provinceCode: string;
  industryCode: string;
  revenueCode: string;
  goalCode: string;
}) {
  const firstName = getFirstName(name);
  const checkoutUrl = `https://www.fsidigital.ca/calculator?token=${loginToken}&utm_source=calculator_recovery&utm_medium=email&utm_campaign=calc_recovery_day3`;
  const subject = `See the top programs we found for your business`;

  // Fetch real programs matches from report generator
  const report = generateFundingMatchReport({
    province: provinceCode,
    industry: industryCode,
    revenue: revenueCode,
    goal: goalCode
  });

  const topPrograms = report.programs.slice(0, 3);
  let programsHtml = "";
  let programsText = "";

  if (topPrograms.length > 0) {
    programsHtml = `<ul style="list-style-type:none;padding-left:0;margin:18px 0;font-size:14px;color:#334155;">`;
    topPrograms.forEach((p) => {
      programsHtml += `
        <li style="margin-bottom:10px;padding-left:24px;position:relative;">
          <span style="color:#059669;font-weight:bold;position:absolute;left:0;top:0;">✔</span>
          <strong>${escapeHtml(p.name)}</strong><br>
          <span style="font-size:12px;color:#64748b;">${escapeHtml(p.agency)} · Type: ${escapeHtml(p.fundingType)} · Max Est: ${escapeHtml(p.estimatedRange)}</span>
        </li>
      `;
      programsText += `\n* ${p.name} (Agency: ${p.agency}, Est Range: ${p.estimatedRange})`;
    });
    programsHtml += `</ul>`;
  } else {
    programsHtml = `
      <p style="margin: 16px 0; color:#475569;">
        We matched your profile against our active database of federal and provincial grant streams, regional credits, and tax refunds.
      </p>
    `;
    programsText = `We matched your profile against federal and provincial grant streams, regional credits, and tax refunds.`;
  }

  const html = wrapCalculatorRecoveryTemplate(`
    <p style="margin: 0 0 16px 0;">
      A generic list of government grants is useless. That's why our system mapped your specific business profile in **${escapeHtml(report.profile.provinceName)}** against active programs.
    </p>
    
    <p style="margin: 16px 0 8px 0;">
      Based on your profile, here are the top matching programs we identified for your business:
    </p>

    ${programsHtml}

    <p style="margin: 16px 0 20px 0;">
      Unlock your full report to see your eligibility match score, required filing paperwork, and get step-by-step application instructions for these programs:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);">
        Unlock My Match Report &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nWe matched your business to top active programs based on your profile in ${report.profile.provinceName}:${programsText}\n\nUnlock your complete Funding Match Report ($19) to see eligibility criteria and application guides:\n${checkoutUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'calc-recovery-email2' });
}

/**
 * Calculator Recovery Email 3: Free Toolkit Bonus (Preserve $19 Price Integrity)
 * Sent 120 hours (5 days) after completion
 */
export async function sendCalculatorRecoveryEmail3({
  to,
  name,
  loginToken
}: {
  to: string;
  name?: string;
  loginToken: string;
}) {
  const firstName = getFirstName(name);
  const checkoutUrl = `https://www.fsidigital.ca/calculator?token=${loginToken}&utm_source=calculator_recovery&utm_medium=email&utm_campaign=calc_recovery_day5&bonus=toolkit`;
  const subject = `Your report is waiting (Free Toolkit Bonus included)`;

  const html = wrapCalculatorRecoveryTemplate(`
    <p style="margin: 0 0 16px 0;">
      I want to make sure you have everything you need to successfully secure non-dilutive government funding this quarter.
    </p>
    
    <p style="margin: 16px 0;">
      If you unlock your **Funding Match Report ($19)** within the next 72 hours, we will include our premium <strong>Funding Application Toolkit ($29 value) completely free</strong>.
    </p>

    <div style="background-color:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:20px 0;font-size:13.5px;color:#1e3a8a;">
      <strong>What's included in the Funding Application Toolkit:</strong>
      <ul style="margin:8px 0 0 0;padding-left:20px;">
        <li style="margin-bottom:4px;"><strong>Grant Budget Builder:</strong> Template to project expenses matching grant parameters.</li>
        <li style="margin-bottom:4px;"><strong>Hiring Plan Worksheet:</strong> Easily track wage subsidy calculations.</li>
        <li style="margin-bottom:4px;"><strong>Cash Flow Forecast Model:</strong> Show funding agencies your matching capital timeline.</li>
        <li style="margin-bottom:4px;"><strong>Application Progress Tracker:</strong> Track portals, deadlines, and submissions.</li>
      </ul>
    </div>

    <p style="margin: 16px 0 20px 0;">
      Preserve your $19 one-time pricing and get the $29 toolkit added automatically as a free bonus at checkout:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);">
        Get My Report + Free Toolkit ($19) &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nGet your custom Funding Match Report ($19) and we'll throw in our premium Funding Application Toolkit ($29 value) completely free if you purchase in the next 72 hours.\n\nClaim your report and free toolkit bonus here:\n${checkoutUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'calc-recovery-email3' });
}
