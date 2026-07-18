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
  const unsubscribeUrl = 'https://www.fsidigital.ca/subscribe/unsubscribe';

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
 * Calculator Recovery Email 1: Your funding matches are ready (4h Reminder)
 * Sent 4 hours after completion
 */
export async function sendCalculatorRecoveryEmail1({
  to,
  name,
  loginToken
}: {
  to: string;
  name?: string;
  loginToken: string;
}) {
  const firstName = getFirstName(name);
  const checkoutUrl = `https://www.fsidigital.ca/calculator?token=${loginToken}&utm_source=calculator_recovery&utm_medium=email&utm_campaign=calc_recovery_day0_4h`;
  const subject = `Your government funding matches are ready`;

  const html = wrapCalculatorRecoveryTemplate(`
    <p style="margin: 0 0 16px 0;">
      You recently ran your business profile through our Government Funding Calculator. Your dynamic matching report has been generated successfully.
    </p>
    <p style="margin: 0 0 16px 0;">
      We matched your location, industry, and funding goals to active government programs accepting applications right now.
    </p>
    <p style="margin: 0 0 20px 0;">
      Avoid missing current intake windows. Access your customized report to review matching programs:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);">
        View My Funding Matches &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nYour government funding matches are calculated and ready to view. Access your customized report to review active programs matching your business profile:\n${checkoutUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'calc-recovery-email1' });
}

/**
 * Calculator Recovery Email 2: Your personalized funding report summary (24h Summary)
 * Sent 24 hours after completion. Includes profile summary & funding ranges.
 */
export async function sendCalculatorRecoveryEmail2({
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
  const checkoutUrl = `https://www.fsidigital.ca/calculator?token=${loginToken}&utm_source=calculator_recovery&utm_medium=email&utm_campaign=calc_recovery_day1_24h`;
  const subject = `Your personalized funding report summary`;

  const html = wrapCalculatorRecoveryTemplate(`
    <p style="margin: 0 0 16px 0;">
      Here is the custom funding projection generated from your assessment yesterday. Based on your business profile, our database matched you to active non-dilutive programs currently open.
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

  return sendEmail({ to, subject, html, text, tagType: 'calc-recovery-email2' });
}

/**
 * Calculator Recovery Email 3: Top matching programs + Free Bonus Package (72h Urgency)
 * Sent 72 hours (3 days) after completion. Includes value-added bonuses to preserve $19 price integrity.
 */
export async function sendCalculatorRecoveryEmail3({
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
  const checkoutUrl = `https://www.fsidigital.ca/calculator?token=${loginToken}&utm_source=calculator_recovery&utm_medium=email&utm_campaign=calc_recovery_day3_72h&bonus=cro_value_pack`;
  const subject = `See the top programs we found for your business (Free Value-Add Bonuses)`;

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

    <div style="background-color:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:20px 0;font-size:13px;color:#1e3a8a;">
      <strong>🎁 FREE Value-Add Bonus Bundle Included ($39 value):</strong>
      <ul style="margin:8px 0 0 0;padding-left:20px;line-height:1.5;">
        <li style="margin-bottom:4px;"><strong>Funding Stacking Plan Checklist:</strong> Determine exactly which grants can combine.</li>
        <li style="margin-bottom:4px;"><strong>Pre-Submission Reviewer Checklist:</strong> Audit your narrative drafts against audit criteria.</li>
        <li style="margin-bottom:4px;"><strong>Filing Timeline Template:</strong> Plan application submission sequence across 4 months.</li>
      </ul>
    </div>

    <p style="margin: 16px 0 20px 0;">
      Unlock your full report for $19 and get the complete B2B Stacking & Reviewer package added to your download dashboard automatically at checkout:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);">
        Unlock My Report + Free Bonuses ($19) &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nWe matched your business to top active programs based on your profile in ${report.profile.provinceName}:${programsText}\n\nUnlock your complete Funding Match Report ($19) and we will automatically add our B2B Stacking, Reviewer Checklists, and Timeline templates completely free.\n\nClaim your report and bonuses here:\n${checkoutUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'calc-recovery-email3' });
}

/**
 * Calculator Recovery Email 4: Educational Guide (7d educational sequence)
 * Sent 7 days (168 hours) after completion. Pure value, no promotional pitching.
 */
export async function sendCalculatorRecoveryEmail4({
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
  const subject = `How to stack Canadian government grants (CRA compliance guide)`;
  const readMoreUrl = `https://www.fsidigital.ca/blog/irap-industrial-research-assistance-program-government-grants?token=${loginToken}&utm_source=calculator_recovery&utm_medium=email&utm_campaign=calc_recovery_day7_educational`;

  const html = wrapCalculatorRecoveryTemplate(`
    <p style="margin: 0 0 16px 0;">
      When securing non-dilutive government funding, one of the most critical compliance topics B2B founders face is <strong>stacking rules</strong>.
    </p>
    <p style="margin: 0 0 16px 0;">
      A common misconception is that you can claim the same developer hours under multiple grant and tax credit programs. Doing this without proper accounting will trigger a CRA audit and subsequent funding clawbacks.
    </p>
    
    <div style="background-color:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:16px;margin:20px 0;font-size:13.5px;color:#78350f;line-height:1.5;">
      <strong>Key CRA Stacking & Co-Funding Compliance Rules:</strong>
      <ul style="margin:8px 0 0 0;padding-left:20px;">
        <li style="margin-bottom:6px;"><strong>Proxy Tax Offsets:</strong> If you receive an IRAP wage subsidy for a developer, that funding amount reduces your eligible expenditure base for SR&ED tax claims on Form T661.</li>
        <li style="margin-bottom:6px;"><strong>Separate Cost Centers:</strong> You must track separate development sprints. Program A must fund developer hours on front-end UI adoption, while Program B claims focus on core technical uncertainty.</li>
        <li style="margin-bottom:6px;"><strong>Cost Share Ceilings:</strong> Most federal programs limit total stacked co-funding (federal + provincial + municipal) to 75% or 85% of total project costs. You must support the remainder via private capital.</li>
      </ul>
    </div>

    <p style="margin: 16px 0 20px 0;">
      To help you map out your compliance strategies, we have outlined the exact steps in our stacking guides. You can review the details on our portal:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${readMoreUrl}" style="background-color:#1e293b;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:13px;">
        Read the Compliance Guide &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nWhen securing government funding, understanding stacking compliance rules is vital to avoid clawbacks. \n\nRemember:\n- IRAP wage support offsets your eligible SR&ED expenditure base.\n- Separate cost centers must track developer hours across programs.\n- Combined public co-funding has a maximum stacking ceiling (usually 75-85%).\n\nRead our full compliance guide here:\n${readMoreUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'calc-recovery-email4' });
}

/**
 * LTV Customer Success Trigger followup (Sent 7 days after purchase)
 */
export async function sendCustomerSuccessFollowup({
  to,
  name,
  loginToken
}: {
  to: string;
  name?: string;
  loginToken: string;
}) {
  const firstName = getFirstName(name);
  const subject = `Have you started your government funding applications yet?`;
  
  const yesUrl = `https://www.fsidigital.ca/products/toolkit?token=${loginToken}&utm_source=customer_success&utm_medium=email&utm_campaign=success_started_yes`;
  const noUrl = `https://www.fsidigital.ca/audit?token=${loginToken}&utm_source=customer_success&utm_medium=email&utm_campaign=success_started_no`;

  const html = wrapCalculatorRecoveryTemplate(`
    <p style="margin: 0 0 16px 0;">
      It has been a week since you unlocked your government funding matches. I wanted to follow up and check on your progress.
    </p>
    <p style="margin: 0 0 20px 0; font-weight: bold; text-align: center; color: #0f172a;">
      Have you started preparing your grant applications yet?
    </p>
    
    <table style="width: 100%; border-spacing: 12px; border-collapse: separate; margin: 10px 0 20px 0;">
      <tr>
        <td style="width: 50%; text-align: center; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px;">
          <h4 style="margin: 0 0 8px 0; color: #166534; font-size: 14px;"><strong>Yes, I'm writing it</strong></h4>
          <p style="margin: 0 0 14px 0; font-size: 11px; color: #166534;">I'm compiling proposal narratives and budgets myself.</p>
          <a href="${yesUrl}" style="background-color: #166534; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 11px; display: inline-block;">
            Get Writing Toolkit &rarr;
          </a>
        </td>
        <td style="width: 50%; text-align: center; background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px;">
          <h4 style="margin: 0 0 8px 0; color: #1e40af; font-size: 14px;"><strong>No, not yet</strong></h4>
          <p style="margin: 0 0 14px 0; font-size: 11px; color: #1e40af;">I need professional guidance to set up compliance rules.</p>
          <a href="${noUrl}" style="background-color: #1e40af; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 11px; display: inline-block;">
            Book Strategy Session &rarr;
          </a>
        </td>
      </tr>
    </table>
    
    <p style="margin: 16px 0 0 0;">
      Writing government grant applications requires specific cost center structure and legal stacking alignment. We are here to support your growth pipeline.
    </p>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nIt's been a week since you retrieved your funding matches. Have you started your applications yet?\n\n- YES (Get our Writing Toolkit package to accelerate): ${yesUrl}\n- NO (Let's schedule a Strategy session to review stacking compliance): ${noUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'customer-success-followup' });
}
