import { sendEmail, getFirstName, cleanRegionName, cleanIndustryName, escapeHtml, isUSMarket } from "./mailer";

function wrapAlertNurtureTemplate(contentHtml: string, loginToken: string, firstName: string) {
  const unsubscribeUrl = 'https://www.fsidigital.ca/subscribe/unsubscribe';

  return `
    <div style="background-color:#0f172a;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;margin:0;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px -5px rgba(0,0,0,0.3);">
        
        <!-- Header -->
        <div style="background-color:#020617;padding:24px 32px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #1e293b;">
          <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">FSI <span style="color:#10b981;">DIGITAL</span></span>
          <span style="float:right;font-size:11px;font-weight:700;color:#10b981;text-transform:uppercase;letter-spacing:1px;padding:4px 10px;background-color:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.3);border-radius:6px;margin-top:2px;">
            Funding Intelligence
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
            This memo was dispatched to your verified founder profile.<br>
            <a href="${unsubscribeUrl}" style="color:#64748b;text-decoration:underline;margin-top:8px;display:inline-block;">Unsubscribe from funding alerts</a>
          </div>
        </div>

      </div>
    </div>
  `;
}

/**
 * Day 1: Welcome to Deadline Alerts ("Hatke" Pattern Interrupt)
 */
export async function sendAlertWelcomeEmail({
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

  const reportUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=alert_nurture_welcome_upgrade`;
  const targetUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=alert_nurture_welcome`;

  const subject = isUS
    ? `The $250,000 FICA tax offset most tech founders miss`
    : `The $84,000 payroll subsidy you didn't know existed`;

  const leadCopy = isUS ? `
    <p style="margin: 0 0 16px 0; font-size:16px; color:#0f172a; font-weight:600;">
      Most tech founders think they have a fundraising problem.
    </p>
    <p style="margin: 0 0 16px 0; font-size:17px; font-weight:700; color:#059669;">
      They don't. They have a capital leakage problem.
    </p>
    <p style="margin: 0 0 16px 0;">
      Every 2 weeks, when payroll runs, you are paying 100 cents on the dollar for software engineering and technical product development. Meanwhile, under <strong>IRC Section 41</strong>, the IRS permits early-stage tech companies to offset up to <strong>$500,000 in payroll taxes</strong> against research expenses.
    </p>
    <p style="margin: 0 0 18px 0; background-color:#fef2f2; border-left:4px solid #ef4444; padding:12px 16px; color:#991b1b; border-radius:4px; font-weight:500;">
      Paying full retail price for tech talent is like feeding a stack of $10,000 bills straight into a shredder.
    </p>
    <p style="margin: 0 0 16px 0;">
      We monitor active government solicitations across federal agencies and <strong>${escapeHtml(cleanProv)}</strong> for the <strong>${escapeHtml(cleanInd)}</strong> sector.
    </p>
  ` : `
    <p style="margin: 0 0 16px 0; font-size:16px; color:#0f172a; font-weight:600;">
      Most Canadian tech founders think their biggest monthly expense is developer payroll.
    </p>
    <p style="margin: 0 0 16px 0; font-size:17px; font-weight:700; color:#059669;">
      It isn't.
    </p>
    <p style="margin: 0 0 16px 0;">
      Their biggest expense is paying 100% full retail for engineers when the Canadian federal government (NRC-IRAP and SR&amp;ED) reimburses up to <strong>64% of technical salaries</strong> in direct, refundable cash.
    </p>
    <p style="margin: 0 0 18px 0; background-color:#fef2f2; border-left:4px solid #ef4444; padding:12px 16px; color:#991b1b; border-radius:4px; font-weight:500;">
      Paying full retail for engineering is like running 35% of your bank balance through a paper shredder every month.
    </p>
    <p style="margin: 0 0 16px 0;">
      We monitor active non-dilutive programs across federal ministries and <strong>${escapeHtml(cleanProv)}</strong> for the <strong>${escapeHtml(cleanInd)}</strong> sector.
    </p>
  `;

  const html = wrapAlertNurtureTemplate(`
    ${leadCopy}
    
    <p style="margin: 0 0 20px 0; font-weight:600; color:#0f172a;">
      Want to inspect the active non-dilutive programs matched directly to your company? Unlock your personalized <strong>Funding Match Report ($19)</strong>:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${reportUrl}" style="background-color:#059669;color:white;padding:15px 32px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:15px;box-shadow:0 4px 10px rgba(5,150,105,0.25);">
        Unlock My Funding Match Report ($19) &rarr;
      </a>
    </div>

    <p style="margin: 0; font-size:13px; color:#64748b; text-align:center;">
      Or review your free baseline summary in your <a href="${targetUrl}" style="color:#059669;text-decoration:underline;">founder dashboard</a>.
    </p>
  `, loginToken, firstName);

  const text = isUS
    ? `Hi ${firstName},\n\nMost US founders pay full retail for devs, unaware that IRC §41 allows up to $500k in payroll tax offsets.\n\nStop shredding cash. See active non-dilutive matches in ${cleanProv} (${cleanInd}).\n\nUnlock Funding Match Report ($19):\n${reportUrl}\n\nBest,\nAshwani K\nFSI Digital`
    : `Hi ${firstName},\n\nMost Canadian tech founders pay 100 cents on the dollar when IRAP and SR&ED refund up to 64% in cash.\n\nStop shredding payroll. See active non-dilutive matches in ${cleanProv} (${cleanInd}).\n\nUnlock Funding Match Report ($19):\n${reportUrl}\n\nBest,\nAshwani K\nFSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'alert-nurture-welcome' });
}

/**
 * Day 3: Funding Opportunity Highlight
 */
export async function sendAlertOpportunityEmail({
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

  const reportUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=alert_nurture_opportunity`;
  
  const subject = isUS
    ? `America's $4.3B non-dilutive pool for ${cleanInd} in ${cleanProv}`
    : `Why your competitors pay 36¢ on the dollar for engineers in ${cleanProv}`;

  const opportunityBody = isUS ? `
    <p style="margin: 0 0 16px 0; font-size:16px; color:#0f172a; font-weight:600;">
      Government funding cycles wait for no one.
    </p>
    <p style="margin: 0 0 16px 0;">
      Right now, multiple federal solicitations for the <strong>${escapeHtml(cleanInd)}</strong> sector in <strong>${escapeHtml(cleanProv)}</strong> are approaching their quarterly cutoff dates.
    </p>
    <p style="margin: 0 0 16px 0;">
      The biggest mistake early-stage founders make is applying after incurring expenses. Federal grants require pre-approval before research sprints start.
    </p>
  ` : `
    <p style="margin: 0 0 16px 0; font-size:16px; color:#0f172a; font-weight:600;">
      Government funding cycles run on strict fiscal calendar deadlines.
    </p>
    <p style="margin: 0 0 16px 0;">
      Right now, major provincial and federal intake quotas for <strong>${escapeHtml(cleanInd)}</strong> businesses in <strong>${escapeHtml(cleanProv)}</strong> are filling their remaining allocations.
    </p>
    <p style="margin: 0 0 16px 0;">
      If you are planning to hire developers, invest in capital equipment, or expand to international markets in the next 3 to 6 months, securing grant eligibility before costs are incurred is the difference between getting a $100,000 refund or zero.
    </p>
  `;

  const html = wrapAlertNurtureTemplate(`
    ${opportunityBody}
    
    <p style="margin: 0 0 20px 0; font-weight:600; color:#0f172a;">
      Inspect your custom <strong>Funding Match Report</strong> to see exact deadline dates, qualification limits, and direct agency contact protocols:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${reportUrl}" style="background-color:#059669;color:white;padding:15px 32px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:15px;box-shadow:0 4px 10px rgba(5,150,105,0.25);">
        Get My Match Report ($19) &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = isUS
    ? `Hi ${firstName},\n\nApproaching deadlines for ${cleanInd} in ${cleanProv}. Federal solicitations require pre-approval before expenses occur.\n\nGet Funding Match Report ($19):\n${reportUrl}\n\nBest,\nAshwani K\nFSI Digital`
    : `Hi ${firstName},\n\nIntake quotas are closing soon for ${cleanInd} in ${cleanProv}. Securing grant eligibility before hiring is essential.\n\nGet Funding Match Report ($19):\n${reportUrl}\n\nBest,\nAshwani K\nFSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'alert-nurture-opportunity' });
}

export async function sendAlertMatchReportEmail({
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
  const isUS = isUSMarket(province);

  const reportUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=alert_nurture_pitch`;
  
  const subject = isUS
    ? `The 0% equity seed round (how top startups use SBIR)`
    : `Ottawa's unspent $4.2B allocation (don't leave it on the table)`;

  const html = wrapAlertNurtureTemplate(`
    <p style="margin: 0 0 16px 0; font-size:16px; color:#0f172a; font-weight:600;">
      Navigating government funding shouldn't mean drowning in 40-page PDFs and confusing bureaucracy.
    </p>
    <p style="margin: 0 0 16px 0;">
      There are two ways founders handle public capital:
    </p>
    <p style="margin: 0 0 8px 0;">
      1. <strong>The Amateur Way:</strong> Spend 30 hours clicking through disorganized government websites, guessing whether they qualify, and applying for expired programs.
    </p>
    <p style="margin: 0 0 16px 0;">
      2. <strong>The Strategic Founder Way:</strong> Get a tailored dossier cross-referencing your exact payroll, sector, and location against active programs with real funding caps.
    </p>
    <p style="margin: 0 0 20px 0;">
      For just <strong>$19</strong>, our <strong>Funding Match Report</strong> maps out the exact non-dilutive programs you qualify for in <strong>${escapeHtml(cleanProv)}</strong>:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${reportUrl}" style="background-color:#059669;color:white;padding:15px 32px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:15px;box-shadow:0 4px 10px rgba(5,150,105,0.25);">
        Claim My Match Report ($19) &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nStop wasting 30+ hours on clunky government portals. For $19, see every active non-dilutive grant and subsidy that matches your business in ${cleanProv}.\n\nGet Funding Match Report ($19):\n${reportUrl}\n\nBest,\nAshwani K\nFSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'alert-nurture-pitch' });
}

export async function sendAlertActionPlanEmail({
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

  const planUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=alert_nurture_plan`;
  const subject = `The 90-day execution blueprint for ${cleanInd} (${cleanProv})`;

  const html = wrapAlertNurtureTemplate(`
    <p style="margin: 0 0 16px 0; font-size:16px; color:#0f172a; font-weight:600;">
      Knowing which grants exist is only 20% of the game. The real edge is <strong>execution sequencing</strong>.
    </p>
    <p style="margin: 0 0 16px 0;">
      If you apply to Program B before Program A is approved, you risk disqualifying your payroll subsidies due to co-funding stacking caps.
    </p>
    <p style="margin: 0 0 20px 0;">
      Our <strong>Funding Strategy &amp; Action Plan ($49)</strong> gives you a prioritized, 90-day step-by-step roadmap tailored to <strong>${escapeHtml(cleanProv)}</strong> (${escapeHtml(cleanInd)}):
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${planUrl}" style="background-color:#059669;color:white;padding:15px 32px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:15px;box-shadow:0 4px 10px rgba(5,150,105,0.25);">
        Unlock Action Plan ($49) &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nSequencing is everything in non-dilutive funding. Unlock your prioritized 90-day Funding Action Plan for ${cleanProv} (${cleanInd}):\n${planUrl}\n\nBest,\nAshwani K\nFSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'alert-nurture-plan' });
}

export async function sendAlertAuditEmail({
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

  const bundleUrl = `https://www.fsidigital.ca/products/bundle?token=${loginToken}&source=alert_nurture_bundle`;
  const subject = `How to reverse-invoice the government: Capital Stacking Toolkit ($79 USD)`;

  const html = wrapAlertNurtureTemplate(`
    <p style="margin: 0 0 16px 0; font-size:16px; color:#0f172a; font-weight:600;">
      Top tech companies don't rely on a single grant. They stack 3 to 4 non-dilutive programs together.
    </p>
    <p style="margin: 0 0 16px 0;">
      By combining technical wage subsidies, research tax credits, and market expansion grants, strategic founders fund <strong>up to 75%–85% of their R&amp;D costs</strong> without diluting a single share of equity.
    </p>
    <p style="margin: 0 0 20px 0;">
      Our <strong>Complete Funding Bundle ($79 USD)</strong> provides the complete capital stacking blueprint: proposal narrative frameworks, audit compliance spreadsheets, and stacking formulas:
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${bundleUrl}" style="background-color:#059669;color:white;padding:15px 32px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:15px;box-shadow:0 4px 10px rgba(5,150,105,0.25);">
        Get Complete Funding Bundle ($79 USD) &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nHow to fund up to 75-85% of your R&D costs without equity dilution. Get our Complete Capital Stacking Toolkit ($79 USD):\n${bundleUrl}\n\nBest,\nAshwani K\nFSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'alert-nurture-audit' });
}

export async function sendAlertSuccessEmail({
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
  const dashboardUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=alert_nurture_success`;
  const subject = `Your funding match dashboard is active`;

  const html = wrapAlertNurtureTemplate(`
    <p style="margin: 0 0 16px 0;">
      Your matched funding dashboard is active and monitored.
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${dashboardUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;">
        Access My Dashboard &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nYour dashboard is active: ${dashboardUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'alert-nurture-success' });
}

export async function sendAlertAuditFollowupEmail({
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

  const bundleUrl = `https://www.fsidigital.ca/products/bundle?token=${loginToken}&source=alert_nurture_bundle_followup`;
  const subject = isUS
    ? `The IRS compliance shield for stacking SBIR & IRC §41`
    : `The CRA compliance shield: stacking grants without clawbacks`;

  const complianceMemo = isUS ? `
    <p style="margin: 0 0 16px 0; font-size:16px; color:#0f172a; font-weight:600;">
      Following up regarding your non-dilutive co-funding roadmap in <strong>${escapeHtml(cleanProv)}</strong>.
    </p>
    <p style="margin: 0 0 16px 0;">
      Stacking federal SBIR awards with state matching funds and IRC §41 FICA payroll tax offsets is the fastest path to extending runway by 12+ months. But submitting them without formal cost center segregation will trigger IRS audit adjustments.
    </p>
  ` : `
    <p style="margin: 0 0 16px 0; font-size:16px; color:#0f172a; font-weight:600;">
      Following up regarding your non-dilutive co-funding roadmap in <strong>${escapeHtml(cleanProv)}</strong>.
    </p>
    <p style="margin: 0 0 16px 0;">
      Stacking NRC-IRAP wage support with SR&amp;ED tax refunds is how top Canadian startups subsidize up to 64% of engineering payroll. But claiming both without accounting for proxy tax offsets triggers automatic CRA clawbacks.
    </p>
  `;

  const html = wrapAlertNurtureTemplate(`
    ${complianceMemo}
    <p style="margin: 0 0 20px 0;">
      Our <strong>Complete Funding Bundle ($79 USD)</strong> includes the exact cost-allocation spreadsheets, application narrative guidelines, and co-funding audit templates you need:
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${bundleUrl}" style="background-color:#059669;color:white;padding:15px 32px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:15px;box-shadow:0 4px 10px rgba(5,150,105,0.25);">
        Get Complete Funding Bundle ($79 USD) &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = isUS
    ? `Hi ${firstName},\n\nStacking SBIR with IRC §41 is the best way to extend runway. Protect your firm from clawbacks with our Complete Funding Bundle ($79 USD):\n${bundleUrl}\n\nBest,\nAshwani K\nFSI Digital`
    : `Hi ${firstName},\n\nStacking IRAP with SR&ED is how top Canadian startups subsidize up to 64% of dev payroll. Protect your firm with our Complete Funding Bundle ($79 USD):\n${bundleUrl}\n\nBest,\nAshwani K\nFSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'alert-nurture-audit-followup' });
}

export async function sendAlertReferralEmail({
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
  const isUS = isUSMarket(province);
  const shareUrl = `https://www.fsidigital.ca/calculator?source=referral`;
  
  const subject = isUS
    ? `Know another founder who is paying full retail for engineers?`
    : `Know another founder who is paying full retail for dev payroll?`;

  const html = wrapAlertNurtureTemplate(`
    <p style="margin: 0 0 16px 0; font-size:16px; color:#0f172a; font-weight:600;">
      If you know another tech founder who is burning runway by paying 100% full retail for developer payroll...
    </p>
    <p style="margin: 0 0 20px 0;">
      Send them our free Funding Decision Engine. In 60 seconds, it calculates their exact eligible non-dilutive subsidies and tax offsets:
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${shareUrl}" style="background-color:#0f172a;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;">
        Share Free Funding Engine &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nKnow another founder burning runway by paying full retail for devs? Share our free Funding Decision Engine:\n${shareUrl}\n\nBest,\nAshwani K\nFSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'alert-nurture-referral' });
}
