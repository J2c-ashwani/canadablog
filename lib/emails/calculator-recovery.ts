import { sendEmail, getFirstName, cleanRegionName, cleanIndustryName, isUSMarket } from "./mailer";
import { generateFundingRecommendationPlatform } from "../products/report-generator";

function escapeHtml(value: string) {
  if (!value) return '';
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function wrapCalculatorRecoveryTemplate(contentHtml: string, loginToken: string, firstName: string) {
  const unsubscribeUrl = loginToken
    ? `https://www.fsidigital.ca/subscribe/unsubscribe?token=${encodeURIComponent(loginToken)}`
    : 'https://www.fsidigital.ca/subscribe/unsubscribe';

  return `
    <div style="background-color:#0f172a;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;margin:0;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px -5px rgba(0,0,0,0.3);">
        
        <!-- Header -->
        <div style="background-color:#020617;padding:24px 32px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #1e293b;">
          <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">FSI <span style="color:#10b981;">DIGITAL</span></span>
          <span style="float:right;font-size:11px;font-weight:700;color:#10b981;text-transform:uppercase;letter-spacing:1px;padding:4px 10px;background-color:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.3);border-radius:6px;margin-top:2px;">
            Capital Intelligence
          </span>
        </div>

        <!-- Body Content -->
        <div style="padding:32px 32px 24px 32px;font-size:15px;color:#1e293b;line-height:1.65;text-align:left;">
          <p style="font-size:16px;font-weight:700;margin-top:0;margin-bottom:18px;color:#0f172a;">Hi ${firstName},</p>
          
          ${contentHtml}

        </div>

        <!-- Footer -->
        <div style="padding:24px 32px;background-color:#f8fafc;border-top:1px solid #e2e8f0;font-size:13px;color:#475569;text-align:left;line-height:1.5;">
          <div style="margin-bottom:12px;">
            <strong>Ashwani K</strong><br/>
            <span style="color:#64748b;font-size:12px;">Growth &amp; Funding Intelligence · FSI Digital</span>
          </div>
          
          <div style="margin-top:20px;padding-top:16px;border-top:1px dashed #cbd5e1;font-size:11px;color:#94a3b8;text-align:center;">
            You completed our Funding Decision Tool. Your assessment data is securely preserved.<br>
            <a href="${unsubscribeUrl}" style="color:#64748b;text-decoration:underline;margin-top:8px;display:inline-block;">Unsubscribe from these memos</a>
          </div>
        </div>

      </div>
    </div>
  `;
}

/**
 * Calculator Recovery Email 1: "Hatke" Pattern Interrupt (4h)
 * Shows the reality of capital leakage vs paying full retail for growth
 */
export async function sendCalculatorRecoveryEmail1({
  to,
  name,
  loginToken,
  province,
  industry
}: {
  to: string;
  name?: string;
  loginToken: string;
  province?: string;
  industry?: string;
}) {
  const firstName = getFirstName(name);
  const cleanProv = cleanRegionName(province);
  const cleanInd = cleanIndustryName(industry);
  const isUS = isUSMarket(province);

  const tokenParam = loginToken && loginToken !== 'N/A' ? `token=${loginToken}&` : '';
  const checkoutUrl = `https://www.fsidigital.ca/calculator?${tokenParam}step=6&email=${encodeURIComponent(to)}&utm_source=calculator_recovery&utm_medium=email&utm_campaign=calc_recovery_day0_4h`;

  const subject = isUS
    ? `The $250,000 IRS check sitting in your payroll account`
    : `The $84,000 payroll check you didn't have to write`;

  const hookHtml = isUS ? `
    <p style="margin: 0 0 16px 0; font-size:16px; color:#0f172a; font-weight:600;">
      Most US tech founders think their next funding round has to come from VCs or angel investors.
    </p>
    <p style="margin: 0 0 16px 0;">
      They don't realize that under <strong>IRC Section 41</strong>, the IRS allows qualified tech startups to offset up to <strong>$500,000 in payroll taxes</strong>, while America's Seed Fund (SBIR/STTR) dishes out <strong>$4.3 Billion in 0% equity awards</strong> every year.
    </p>
    <p style="margin: 0 0 18px 0; background-color:#fef2f2; border-left:4px solid #ef4444; padding:12px 16px; color:#991b1b; border-radius:4px; font-weight:500;">
      Paying 100 cents on the dollar for software engineers and R&amp;D is like taking a stack of $10,000 bills and feeding 35% straight into a paper shredder.
    </p>
    <p style="margin: 0 0 16px 0;">
      Earlier today, you ran your business profile through our Funding Decision Engine for <strong>${escapeHtml(cleanProv)}</strong> (${escapeHtml(cleanInd)}). We detected open federal solicitations and state R&amp;D incentives specifically matching your operational stage.
    </p>
  ` : `
    <p style="margin: 0 0 16px 0; font-size:16px; color:#0f172a; font-weight:600;">
      Most Canadian tech founders think their biggest monthly expense is developer payroll.
    </p>
    <p style="margin: 0 0 16px 0; font-size:17px; font-weight:700; color:#059669;">
      It isn't.
    </p>
    <p style="margin: 0 0 16px 0;">
      Their biggest expense is paying <strong>100 cents on the dollar</strong> for engineers when the Canadian federal government (NRC-IRAP and SR&amp;ED) reimburses up to <strong>64% of technical salaries</strong> in direct, refundable cash.
    </p>
    <p style="margin: 0 0 18px 0; background-color:#fef2f2; border-left:4px solid #ef4444; padding:12px 16px; color:#991b1b; border-radius:4px; font-weight:500;">
      Paying full retail for tech talent is like taking a stack of $10,000 cash bundles and running 35% through a paper shredder every month.
    </p>
    <p style="margin: 0 0 16px 0;">
      Earlier today, you ran your profile through our Funding Decision Engine for <strong>${escapeHtml(cleanProv)}</strong>. We matched your business against active federal wage subsidies, regional tax credits, and non-dilutive programs currently open.
    </p>
  `;

  const html = wrapCalculatorRecoveryTemplate(`
    ${hookHtml}
    
    <p style="margin: 0 0 20px 0; font-weight:600; color:#0f172a;">
      Your customized Funding Match Report is computed and ready to download. Avoid letting this quarter's intake allocation close before you secure your position:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#059669;color:white;padding:15px 32px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:15px;box-shadow:0 4px 10px rgba(5,150,105,0.25);">
        Unlock My Funding Match Report ($19) &rarr;
      </a>
    </div>

    <p style="margin: 0; font-size:13px; color:#64748b; text-align:center;">
      Instant self-serve download · Includes program caps, eligibility criteria, and direct intake links.
    </p>
  `, loginToken, firstName);

  const text = isUS
    ? `Hi ${firstName},\n\nMost US tech founders think funding has to come from VCs. They don't realize the IRS allows up to $500,000 in payroll tax offsets under IRC §41, and SBIR provides $4.3B in 0% equity capital.\n\nPaying full retail for engineering is like shredding 35% of your cash. We mapped your active non-dilutive matches in ${cleanProv}.\n\nUnlock your Funding Match Report ($19):\n${checkoutUrl}\n\nBest,\nAshwani K\nFSI Digital`
    : `Hi ${firstName},\n\nMost Canadian founders pay 100 cents on the dollar for devs when NRC-IRAP and SR&ED refund up to 64% in cash.\n\nPaying full retail for tech talent is like shredding 35% of your payroll every month. We mapped your active government matches in ${cleanProv}.\n\nUnlock your Funding Match Report ($19):\n${checkoutUrl}\n\nBest,\nAshwani K\nFSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'calc-recovery-email1' });
}

/**
 * Calculator Recovery Email 2: The "Return to Sender" / Loss Aversion Memo (24h)
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
  province?: string;
  industry?: string;
  revenue?: string;
  goal?: string;
  estimatedMin: number;
  estimatedMax: number;
}) {
  const firstName = getFirstName(name);
  const cleanProvince = cleanRegionName(province);
  const cleanInd = cleanIndustryName(industry);
  const isUS = isUSMarket(province);

  const checkoutUrl = `https://www.fsidigital.ca/calculator?token=${loginToken}&utm_source=calculator_recovery&utm_medium=email&utm_campaign=calc_recovery_day1_24h`;
  
  const subject = isUS
    ? `America's 0% equity seed round (the deadline window)`
    : `Ottawa's "Return to Sender" file (closing this quarter)`;

  const leadCopy = isUS ? `
    <p style="margin: 0 0 16px 0; font-size:16px; color:#0f172a; font-weight:600;">
      Every year, $4.3 Billion is awarded to US companies through SBIR and federal non-dilutive programs without taking 1% of your cap table.
    </p>
    <p style="margin: 0 0 16px 0;">
      The difference between founders who pull in $250k–$750k in non-dilutive capital and those who dilute their equity by 20% isn't intelligence. It is knowing which open solicitation matches their operational stage before the agency deadline closes.
    </p>
  ` : `
    <p style="margin: 0 0 16px 0; font-size:16px; color:#0f172a; font-weight:600;">
      Every quarter, millions in federal innovation grants get returned to the Canadian treasury unspent.
    </p>
    <p style="margin: 0 0 16px 0;">
      Why? Not because Canadian businesses don't need capital. But because 85% of founders wait until their competitors have already locked in the intake quotas.
    </p>
  `;

  const html = wrapCalculatorRecoveryTemplate(`
    ${leadCopy}
    
    <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:20px;margin:24px 0;">
      <div style="display:flex;justify-content:space-between;border-bottom:1px solid #e2e8f0;padding-bottom:10px;margin-bottom:12px;">
        <span style="font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Audited Assessment Profile</span>
        <span style="font-size:11px;font-weight:700;color:#059669;">MATCH STATUS: CONFIRMED</span>
      </div>
      <table style="width:100%;font-size:14px;color:#334155;">
        <tr>
          <td style="padding:4px 0;"><strong>Jurisdiction:</strong></td>
          <td style="text-align:right;color:#0f172a;font-weight:600;">${escapeHtml(cleanProvince)}</td>
        </tr>
        <tr>
          <td style="padding:4px 0;"><strong>Sector Focus:</strong></td>
          <td style="text-align:right;color:#0f172a;font-weight:600;">${escapeHtml(cleanInd)}</td>
        </tr>
        ${revenue && revenue.toUpperCase() !== 'N/A' ? `
        <tr>
          <td style="padding:4px 0;"><strong>Operating Stage:</strong></td>
          <td style="text-align:right;color:#0f172a;">${escapeHtml(revenue)}</td>
        </tr>` : ''}
        ${goal && goal.toUpperCase() !== 'N/A' ? `
        <tr>
          <td style="padding:4px 0;"><strong>Primary Allocation:</strong></td>
          <td style="text-align:right;color:#0f172a;">${escapeHtml(goal)}</td>
        </tr>` : ''}
        <tr>
          <td style="padding:10px 0 0 0;font-size:14px;color:#059669;border-top:1px solid #e2e8f0;"><strong>Identified Potential Funding:</strong></td>
          <td style="padding:10px 0 0 0;text-align:right;font-size:16px;font-weight:900;color:#059669;border-top:1px solid #e2e8f0;">$${estimatedMin.toLocaleString()} – $${estimatedMax.toLocaleString()}</td>
        </tr>
      </table>
    </div>

    <p style="margin: 0 0 20px 0;">
      Your data is preserved in our matching vault. Unlock your complete <strong>Funding Match Report ($19)</strong> to inspect the exact program list, allowable cost allocations, and upcoming deadline windows:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#059669;color:white;padding:15px 32px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:15px;box-shadow:0 4px 10px rgba(5,150,105,0.25);">
        Unlock My Funding Matches ($19) &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = isUS
    ? `Hi ${firstName},\n\nEvery year, $4.3B in SBIR non-dilutive capital is awarded to US founders. Don't let your competitors take your allocation.\n\nYour profile in ${cleanProvince} qualified for $${estimatedMin.toLocaleString()} - $${estimatedMax.toLocaleString()}.\n\nUnlock your Funding Match Report ($19):\n${checkoutUrl}\n\nBest,\nAshwani K\nFSI Digital`
    : `Hi ${firstName},\n\nEvery quarter, millions in innovation grants return to the Canadian treasury unspent because founders wait too long.\n\nYour profile in ${cleanProvince} qualified for $${estimatedMin.toLocaleString()} - $${estimatedMax.toLocaleString()}.\n\nUnlock your Funding Match Report ($19):\n${checkoutUrl}\n\nBest,\nAshwani K\nFSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'calc-recovery-email2' });
}

/**
 * Calculator Recovery Email 3: Top matching programs + Free Bonus Package (72h Urgency)
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
  provinceCode?: string;
  industryCode?: string;
  revenueCode?: string;
  goalCode?: string;
}) {
  const firstName = getFirstName(name);
  const isUS = isUSMarket(provinceCode);
  const checkoutUrl = `https://www.fsidigital.ca/calculator?token=${loginToken}&utm_source=calculator_recovery&utm_medium=email&utm_campaign=calc_recovery_day3_72h&bonus=cro_value_pack`;
  
  const subject = isUS
    ? `What leaving non-dilutive capital on the table costs you`
    : `What paying full retail for dev payroll actually costs you`;

  const platformResult = generateFundingRecommendationPlatform({
    province: provinceCode || 'on',
    industry: industryCode || 'technology',
    revenue: revenueCode || 'pre-revenue',
    goal: goalCode || 'hiring'
  });

  const topPrograms = platformResult.primaryRecommendations.slice(0, 3);
  let programsHtml = "";
  let programsText = "";

  if (topPrograms.length > 0) {
    programsHtml = `<ul style="list-style-type:none;padding-left:0;margin:18px 0;font-size:14px;color:#334155;">`;
    topPrograms.forEach((p) => {
      programsHtml += `
        <li style="margin-bottom:10px;padding-left:24px;position:relative;">
          <span style="color:#059669;font-weight:bold;position:absolute;left:0;top:0;">✔</span>
          <strong>${escapeHtml(p.programName)}</strong><br>
          <span style="font-size:12px;color:#64748b;">${escapeHtml(p.agency)} · Type: ${escapeHtml(p.fundingType)} · Max Est: ${escapeHtml(p.fundingAmount)}</span>
        </li>
      `;
      programsText += `\n* ${p.programName} (Agency: ${p.agency}, Est Range: ${p.fundingAmount})`;
    });
    programsHtml += `</ul>`;
  } else {
    programsHtml = `
      <p style="margin: 16px 0; color:#475569;">
        We matched your profile against our active database of non-dilutive grant streams, wage subsidies, and tax refunds.
      </p>
    `;
    programsText = `We matched your profile against non-dilutive grant streams, wage subsidies, and tax refunds.`;
  }

  const cleanProvince = cleanRegionName(platformResult.profile.provinceName);

  const html = wrapCalculatorRecoveryTemplate(`
    <p style="margin: 0 0 16px 0; font-size:16px; color:#0f172a; font-weight:600;">
      Most tech businesses don't have a revenue problem. They have a capital leakage problem.
    </p>
    <p style="margin: 0 0 16px 0;">
      A generic list of government grants is useless. That's why our engine mapped your operational parameters in <strong>${escapeHtml(cleanProvince)}</strong> against active non-dilutive allocations.
    </p>
    
    <p style="margin: 16px 0 8px 0; font-weight:600; color:#0f172a;">
      Top matching programs currently active for your profile:
    </p>

    ${programsHtml}

    <div style="background-color:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:20px 0;font-size:13px;color:#1e3a8a;">
      <strong>🎁 FREE Value-Add Bonus Bundle Included ($39 value):</strong>
      <ul style="margin:8px 0 0 0;padding-left:20px;line-height:1.5;">
        <li style="margin-bottom:4px;"><strong>Capital Stacking Plan Checklist:</strong> Determine exactly which grants can legally combine.</li>
        <li style="margin-bottom:4px;"><strong>Pre-Submission Reviewer Checklist:</strong> Audit your application narrative against scoring criteria.</li>
        <li style="margin-bottom:4px;"><strong>4-Month Filing Timeline Template:</strong> Sequence submissions to avoid intake lockouts.</li>
      </ul>
    </div>

    <p style="margin: 16px 0 20px 0;">
      Unlock your full report for <strong>$19</strong> and get the complete B2B Stacking &amp; Reviewer package added to your download dashboard automatically:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#059669;color:white;padding:15px 32px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:15px;box-shadow:0 4px 10px rgba(5,150,105,0.25);">
        Unlock My Match Report + Free Bonuses ($19) &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nWe matched your business to top active programs in ${cleanProvince}:${programsText}\n\nUnlock your complete Funding Match Report ($19) and we will automatically include our Capital Stacking, Reviewer Checklists, and Filing Timeline templates completely free.\n\nClaim your report and bonuses here:\n${checkoutUrl}\n\nBest,\nAshwani K\nFSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'calc-recovery-email3' });
}

/**
 * Calculator Recovery Email 4: Stacking rules & compliance guide (7d Final)
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
  provinceCode?: string;
  industryCode?: string;
  revenueCode?: string;
  goalCode?: string;
}) {
  const firstName = getFirstName(name);
  const isUS = isUSMarket(provinceCode);
  
  const subject = isUS
    ? `How top US tech founders stack SBIR and IRC §41 (IRS compliance)`
    : `How to stack Canadian government grants (CRA compliance guide)`;
    
  const readMoreUrl = `https://www.fsidigital.ca/blog/irap-industrial-research-assistance-program-government-grants?token=${loginToken}&utm_source=calculator_recovery&utm_medium=email&utm_campaign=calc_recovery_day7_educational`;

  const compliancePoints = isUS ? `
    <ul style="margin:8px 0 0 0;padding-left:20px;">
      <li style="margin-bottom:6px;"><strong>IRC §41 Payroll Tax Offset:</strong> Qualified small businesses (under $5M gross receipts, under 5 years old) can elect to apply up to $500,000 of R&amp;D credits directly against the employer portion of FICA payroll taxes.</li>
      <li style="margin-bottom:6px;"><strong>SBIR Cost Accounting:</strong> Federal grants (NSF, NIH, DOD) require strict indirect rate accounting. Direct project hours cannot overlap with general administrative payroll.</li>
      <li style="margin-bottom:6px;"><strong>State Matching Grants:</strong> Many states (e.g., NC, KY, OH, VA) offer 50%–100% matching grants for SBIR Phase I winners without surrendering any equity.</li>
    </ul>
  ` : `
    <ul style="margin:8px 0 0 0;padding-left:20px;">
      <li style="margin-bottom:6px;"><strong>Proxy Tax Offsets:</strong> If you receive an IRAP wage subsidy for a developer, that funding amount reduces your eligible expenditure base for SR&amp;ED tax claims on Form T661.</li>
      <li style="margin-bottom:6px;"><strong>Separate Cost Centers:</strong> You must track separate development sprints. Program A funds commercial adoption, while SR&amp;ED claims focus exclusively on technical uncertainty.</li>
      <li style="margin-bottom:6px;"><strong>Cost Share Ceilings:</strong> Most federal programs limit total stacked co-funding (federal + provincial + municipal) to 75% or 85% of total project costs. Private capital covers the balance.</li>
    </ul>
  `;

  const html = wrapCalculatorRecoveryTemplate(`
    <p style="margin: 0 0 16px 0; font-size:16px; color:#0f172a; font-weight:600;">
      When securing non-dilutive government funding, the most critical compliance principle is <strong>capital stacking</strong>.
    </p>
    <p style="margin: 0 0 16px 0;">
      A common misconception is that you can claim the same developer hours under multiple grant and tax credit programs. Doing this without proper accounting triggers audit penalties and clawbacks.
    </p>
    
    <div style="background-color:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:16px;margin:20px 0;font-size:13.5px;color:#78350f;line-height:1.5;">
      <strong>Key Non-Dilutive Stacking &amp; Compliance Rules:</strong>
      ${compliancePoints}
    </div>

    <p style="margin: 16px 0 20px 0;">
      To help you map out your co-funding roadmap cleanly, we have documented the exact step-by-step framework in our knowledge vault:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${readMoreUrl}" style="background-color:#1e293b;color:white;padding:13px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;">
        Read the Full Compliance Guide &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = isUS
    ? `Hi ${firstName},\n\nUnderstanding non-dilutive capital stacking (SBIR + IRC §41) is critical to building a high-runway tech company.\n\nRead our compliance blueprint here:\n${readMoreUrl}\n\nBest,\nAshwani K\nFSI Digital`
    : `Hi ${firstName},\n\nUnderstanding stacking compliance rules (IRAP + SR&ED) is vital to avoid clawbacks.\n\nRead our full compliance guide here:\n${readMoreUrl}\n\nBest,\nAshwani K\nFSI Digital`;

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
  const noUrl = `https://www.fsidigital.ca/products/bundle?token=${loginToken}&utm_source=customer_success&utm_medium=email&utm_campaign=success_started_no`;

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
          <p style="margin: 0 0 14px 0; font-size: 11px; color: #1e40af;">I need stacking templates and CRA compliance rules.</p>
          <a href="${noUrl}" style="background-color: #1e40af; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 11px; display: inline-block;">
            Get Stacking Bundle ($79) &rarr;
          </a>
        </td>
      </tr>
    </table>
    
    <p style="margin: 16px 0 0 0;">
      Writing government grant applications requires specific cost center structure and legal stacking alignment. We are here to support your growth pipeline.
    </p>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nIt's been a week since you retrieved your funding matches. Have you started your applications yet?\n\n- YES (Get our Writing Toolkit package to accelerate): ${yesUrl}\n- NO (Get our Complete Stacking Toolkit with compliance templates): ${noUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'customer-success-followup' });
}
