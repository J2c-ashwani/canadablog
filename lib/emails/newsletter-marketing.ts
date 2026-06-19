import { sendEmail, getFirstName } from "./mailer";
import { getReactivationPriceForEmail } from "../leads/pricing-test";

export interface NewFundingAlertData {
  to: string;
  name?: string;
  loginToken: string;
  companyName?: string;
  programName: string;
  maxFundingAmount: string;
  region: string;
  industry: string;
}

export interface FundingMatchUpdateData {
  to: string;
  name?: string;
  loginToken: string;
  companyName?: string;
  newProgramsCount: number;
  newProgramsList: string[];
  forceResend?: boolean;
}

export interface MissingFundingAlertData {
  to: string;
  name?: string;
  loginToken: string;
  companyName?: string;
  missingFundingAmount: string;
  region?: string;
  industry?: string;
  businessStage?: string;
  forceResend?: boolean;
}

const BRAND_SENDER = "FSI Digital Partners <partners@fsidigital.ca>";

function wrapNewsletterTemplate(contentHtml: string, loginToken: string, firstName: string, preheader?: string) {
  const pricing = getReactivationPriceForEmail(loginToken); // fallback if token used
  const dashboardUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=newsletter_campaign`;
  const unsubscribeUrl = `https://www.fsidigital.ca/subscribe/unsubscribe?token=${loginToken}`;
  const year = new Date().getFullYear();

  return `
    ${preheader ? `<span style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${preheader}</span>` : ''}
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;margin:0;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="padding-bottom:18px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;text-align:left;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">FSI <span style="color:#059669;">Digital</span></span>
          <span style="float:right;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;padding:2px 8px;background-color:#f1f5f9;border-radius:4px;margin-top:2px;">
            Funding Alert
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
            This email was sent to you because you checked your grant eligibility on FSI Digital.<br>
            <a href="${unsubscribeUrl}" style="color:#64748b;text-decoration:underline;margin-top:8px;display:inline-block;">Unsubscribe from these alerts</a>
          </div>
        </div>

      </div>
    </div>
  `;
}

/**
 * Newsletter Template 1: New Funding Alert
 */
export async function sendNewFundingAlertEmail(data: NewFundingAlertData) {
  const firstName = getFirstName(data.name);
  const pricing = getReactivationPriceForEmail(data.to);
  const targetUrl = `https://www.fsidigital.ca/portfolio?token=${data.loginToken}&source=new_funding_alert&price=${pricing.price}`;
  
  const contentHtml = `
    <p style="margin: 0 0 16px 0;">
      A high-value grant matching your business profile was recently updated in our funding intelligence database.
    </p>
    
    <!-- Program Feature Card -->
    <div style="margin: 24px 0; padding: 20px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; text-align: left;">
      <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; background-color: #10b981; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">
        Matching Opportunity
      </span>
      <h3 style="font-size: 16px; font-weight: 800; color: #064e3b; margin: 4px 0 8px 0;">${data.programName}</h3>
      <p style="font-size: 14px; color: #047857; margin: 4px 0;">
        <strong>Funding Value:</strong> Up to ${data.maxFundingAmount}
      </p>
      <p style="font-size: 13px; color: #065f46; margin: 8px 0 0 0; line-height: 1.4;">
        Intended for eligible <strong>${data.industry}</strong> enterprises operating in <strong>${data.region}</strong>.
      </p>
    </div>

    <p style="margin: 16px 0;">
      Application cycles are competitive and often close on short notice. Tap below to check your specific eligibility score and access our application guide.
    </p>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #059669; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(5,150,105,0.2);">
        See If You Qualify &rarr;
      </a>
    </div>
  `;

  const text = `Hi ${firstName},\n\nA high-value grant matching your business profile has been updated:\n\n* Opportunity: ${data.programName}\n* Value: Up to ${data.maxFundingAmount}\n* Criteria: ${data.industry} companies in ${data.region}\n\nSee if you qualify:\n${targetUrl}\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;
  const subject = `${data.region} Funding Alert: ${data.maxFundingAmount} Available`;

  return sendEmail({
    to: data.to,
    subject,
    html: wrapNewsletterTemplate(contentHtml, data.loginToken, firstName),
    text,
    tagType: "newsletter-new-funding",
    companyName: data.companyName,
    from: BRAND_SENDER
  });
}

/**
 * Newsletter Template 2: Funding Match Update
 */
export async function sendFundingMatchUpdateEmail(data: FundingMatchUpdateData) {
  const firstName = getFirstName(data.name);
  const pricing = getReactivationPriceForEmail(data.to);
  const targetUrl = `https://www.fsidigital.ca/portfolio?token=${data.loginToken}&source=match_update_alert&price=${pricing.price}`;

  const programsListHtml = data.newProgramsList.map(name => `
    <li style="margin-bottom: 6px; font-weight: 500;">
      <span style="color: #059669; font-weight: bold; margin-right: 4px;">✔</span> ${name}
    </li>
  `).join("");

  const contentHtml = `
    <p style="margin: 0 0 16px 0;">
      Since your last funding review, we have identified <strong>${data.newProgramsCount} additional funding programs</strong> that may be relevant to businesses like yours.
    </p>

    <p style="margin: 16px 0;">
      Some of the newly added opportunities include:
    </p>

    <ul style="list-style-type: none; padding-left: 0; margin: 16px 0; font-size: 14px;">
      ${programsListHtml}
    </ul>

    <p style="margin: 16px 0;">
      We've refreshed your funding profile to reflect these additions. Log in to view your updated matches and see whether any of these opportunities could increase your potential funding options.
    </p>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #059669; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(5,150,105,0.2);">
        View My Updated Matches &rarr;
      </a>
    </div>
  `;

  const text = `Hi ${firstName},\n\nSince your last funding review, we have identified ${data.newProgramsCount} additional funding programs that may be relevant to your business.\n\nSome of the newly added opportunities include:\n${data.newProgramsList.map(n => `- ${n}`).join("\n")}\n\nWe've refreshed your funding profile to reflect these additions. Log in to view your updated matches here:\n${targetUrl}\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;
  const subject = data.companyName
    ? `New funding opportunities identified for ${data.companyName}`
    : `We reviewed your funding profile`;

  return sendEmail({
    to: data.to,
    subject,
    html: wrapNewsletterTemplate(contentHtml, data.loginToken, firstName),
    text,
    tagType: "newsletter-match-update",
    companyName: data.companyName,
    from: BRAND_SENDER,
    forceResend: data.forceResend
  });
}

/**
 * Newsletter Template 3: Missing Funding Alert
 */
export async function sendMissingFundingAlertEmail(data: MissingFundingAlertData) {
  const firstName = getFirstName(data.name);
  const link = `https://www.fsidigital.ca/calculator?token=${data.loginToken || ""}`;

  // Helper to clean fields and ignore placeholders, Other, and N/A
  const cleanField = (val?: string) => {
    if (!val) return "";
    const trimmed = val.trim();
    const lower = trimmed.toLowerCase();
    if (lower === "n/a" || lower === "other" || lower === "general" || lower === "canada" || lower === "growth") {
      return "";
    }
    return trimmed;
  };

  const cleanIndustry = cleanField(data.industry);
  const cleanRegion = cleanField(data.region);
  const cleanStage = cleanField(data.businessStage);

  // Classification logic
  const isFullProfile = !!(cleanIndustry && cleanRegion && cleanStage);
  const isPartialProfile = !isFullProfile && !!(cleanIndustry || cleanRegion || cleanStage);
  const isNewsletterOnly = !isFullProfile && !isPartialProfile;

  let subject = "";
  let contentHtml = "";
  let text = "";

  if (isFullProfile) {
    subject = "We reviewed your funding profile";
    contentHtml = `
      <p style="margin: 0 0 16px 0;">
        We recently reviewed the information you previously submitted through FSI Digital.
      </p>

      <p style="margin: 16px 0;">
        Based on that profile, we identified government funding opportunities that appear relevant to your business.
      </p>

      <p style="margin: 16px 0; font-weight: 600;">
        These opportunities align with:
      </p>

      <ul style="padding-left: 20px; margin: 16px 0; line-height: 1.6; list-style-type: none;">
        <li style="margin-bottom: 8px;">✓ Industry: <strong>${cleanIndustry}</strong></li>
        <li style="margin-bottom: 8px;">✓ Location: <strong>${cleanRegion}</strong></li>
        <li style="margin-bottom: 8px;">✓ Business Stage: <strong>${cleanStage}</strong></li>
      </ul>

      <p style="margin: 16px 0;">
        During our review, we identified multiple funding opportunities that may be worth investigating further, including programs with funding amounts ranging from several thousand dollars to significantly larger programs depending on eligibility.
      </p>

      <p style="margin: 16px 0;">
        We've prepared a personalized funding summary showing:
      </p>

      <ul style="padding-left: 20px; margin: 16px 0; line-height: 1.6; list-style-type: none;">
        <li style="margin-bottom: 6px;">• Relevant funding opportunities</li>
        <li style="margin-bottom: 6px;">• Estimated funding amounts</li>
        <li style="margin-bottom: 6px;">• Eligibility requirements</li>
        <li style="margin-bottom: 6px;">• Priority opportunities to review first</li>
        <li style="margin-bottom: 6px;">• Recommended next steps</li>
      </ul>

      <p style="margin: 16px 0;">
        As a previously assessed business, you can unlock your matched opportunities for a one-time fee of <strong>$19</strong>.
      </p>
    `;
    text = `Hi ${firstName},\n\nWe recently reviewed the information you previously submitted through FSI Digital.\n\nBased on that profile, we identified government funding opportunities that appear relevant to your business.\n\nThese opportunities align with:\n✓ Industry: ${cleanIndustry}\n✓ Location: ${cleanRegion}\n✓ Business Stage: ${cleanStage}\n\nDuring our review, we identified multiple funding opportunities that may be worth investigating further, including programs with funding amounts ranging from several thousand dollars to significantly larger programs depending on eligibility.\n\nWe've prepared a personalized funding summary showing:\n• Relevant funding opportunities\n• Estimated funding amounts\n• Eligibility requirements\n• Priority opportunities to review first\n• Recommended next steps\n\nAs a previously assessed business, you can unlock your matched opportunities for a one-time fee of $19.\n\nUnlock your matched opportunities here:\n${link}\n\nRegards,\nAshwani Kumar\nFounder, FSI Digital`;
  } else if (isPartialProfile) {
    subject = "We reviewed your funding profile";
    
    let htmlBullets = "";
    let textBullets = "";
    if (cleanIndustry) {
      htmlBullets += `<li style="margin-bottom: 8px;">✓ Industry: <strong>${cleanIndustry}</strong></li>`;
      textBullets += `\n✓ Industry: ${cleanIndustry}`;
    }
    if (cleanRegion) {
      htmlBullets += `<li style="margin-bottom: 8px;">✓ Location: <strong>${cleanRegion}</strong></li>`;
      textBullets += `\n✓ Location: ${cleanRegion}`;
    }
    if (cleanStage) {
      htmlBullets += `<li style="margin-bottom: 8px;">✓ Business Stage: <strong>${cleanStage}</strong></li>`;
      textBullets += `\n✓ Business Stage: ${cleanStage}`;
    }

    contentHtml = `
      <p style="margin: 0 0 16px 0;">
        We recently reviewed the information you previously submitted through FSI Digital.
      </p>

      <p style="margin: 16px 0;">
        Based on that profile, we identified government funding opportunities that appear relevant to your business.
      </p>

      <p style="margin: 16px 0; font-weight: 600;">
        These opportunities align with:
      </p>

      <ul style="padding-left: 20px; margin: 16px 0; line-height: 1.6; list-style-type: none;">
        ${htmlBullets}
      </ul>

      <p style="margin: 16px 0;">
        During our review, we identified multiple funding opportunities that may be worth investigating further, including programs with funding amounts ranging from several thousand dollars to significantly larger programs depending on eligibility.
      </p>

      <p style="margin: 16px 0;">
        We've prepared a personalized funding summary showing:
      </p>

      <ul style="padding-left: 20px; margin: 16px 0; line-height: 1.6; list-style-type: none;">
        <li style="margin-bottom: 6px;">• Relevant funding opportunities</li>
        <li style="margin-bottom: 6px;">• Estimated funding amounts</li>
        <li style="margin-bottom: 6px;">• Eligibility requirements</li>
        <li style="margin-bottom: 6px;">• Priority opportunities to review first</li>
        <li style="margin-bottom: 6px;">• Recommended next steps</li>
      </ul>

      <p style="margin: 16px 0;">
        As a previously assessed business, you can unlock your matched opportunities for a one-time fee of <strong>$19</strong>.
      </p>
    `;
    text = `Hi ${firstName},\n\nWe recently reviewed the information you previously submitted through FSI Digital.\n\nBased on that profile, we identified government funding opportunities that appear relevant to your business.\n\nThese opportunities align with:${textBullets}\n\nDuring our review, we identified multiple funding opportunities that may be worth investigating further, including programs with funding amounts ranging from several thousand dollars to significantly larger programs depending on eligibility.\n\nWe've prepared a personalized funding summary showing:\n• Relevant funding opportunities\n• Estimated funding amounts\n• Eligibility requirements\n• Priority opportunities to review first\n• Recommended next steps\n\nAs a previously assessed business, you can unlock your matched opportunities for a one-time fee of $19.\n\nUnlock your matched opportunities here:\n${link}\n\nRegards,\nAshwani Kumar\nFounder, FSI Digital`;
  } else {
    subject = "New government funding opportunities identified";
    contentHtml = `
      <p style="margin: 0 0 16px 0;">
        We recently expanded our funding database and identified several government funding opportunities that may be relevant to growing businesses.
      </p>

      <p style="margin: 16px 0;">
        During our review, we identified multiple funding opportunities that may be worth investigating further, including programs with funding amounts ranging from several thousand dollars to significantly larger programs depending on eligibility.
      </p>

      <p style="margin: 16px 0;">
        We've prepared a personalized funding summary showing:
      </p>

      <ul style="padding-left: 20px; margin: 16px 0; line-height: 1.6; list-style-type: none;">
        <li style="margin-bottom: 6px;">• Relevant funding opportunities</li>
        <li style="margin-bottom: 6px;">• Estimated funding amounts</li>
        <li style="margin-bottom: 6px;">• Eligibility requirements</li>
        <li style="margin-bottom: 6px;">• Priority opportunities to review first</li>
        <li style="margin-bottom: 6px;">• Recommended next steps</li>
      </ul>

      <p style="margin: 16px 0;">
        As a subscriber, you can unlock your matched opportunities for a one-time fee of <strong>$19</strong>.
      </p>
    `;
    text = `Hi ${firstName},\n\nWe recently expanded our funding database and identified several government funding opportunities that may be relevant to growing businesses.\n\nDuring our review, we identified multiple funding opportunities that may be worth investigating further, including programs with funding amounts ranging from several thousand dollars to significantly larger programs depending on eligibility.\n\nWe've prepared a personalized funding summary showing:\n• Relevant funding opportunities\n• Estimated funding amounts\n• Eligibility requirements\n• Priority opportunities to review first\n• Recommended next steps\n\nAs a subscriber, you can unlock your matched opportunities for a one-time fee of $19.\n\nUnlock your matched opportunities here:\n${link}\n\nRegards,\nAshwani Kumar\nFounder, FSI Digital`;
  }

  // Determine footer based on type
  const footerText = isNewsletterOnly
    ? "This access is intended only for our newsletter subscribers."
    : "This access is available only to businesses that have already completed an eligibility assessment.";

  const preheaderText = isNewsletterOnly
    ? "New government funding opportunities have been identified for Canadian businesses."
    : "We reviewed your funding profile and found matching government funding programs.";

  // Append button and footer to html
  const finalContentHtml = `
    ${contentHtml}
    
    <div style="text-align: center; margin: 28px 0;">
      <a href="${link}" target="_blank" rel="noopener noreferrer" style="background-color: #059669; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(5,150,105,0.2);">
        Unlock Your Matched Opportunities &rarr;
      </a>
    </div>

    <p style="margin: 16px 0; font-size: 13px; color: #64748b;">
      ${footerText}
    </p>
  `;

  return sendEmail({
    to: data.to,
    subject,
    html: wrapNewsletterTemplate(finalContentHtml, data.loginToken, firstName, preheaderText),
    text,
    tagType: "newsletter-missing-funding",
    companyName: data.companyName,
    from: BRAND_SENDER,
    forceResend: data.forceResend
  });
}

/**
 * Reactivation Nurture Day 2: Reminder Email
 */
export async function sendReactivationReminderEmail(data: { to: string; name?: string; loginToken: string; companyName?: string; forceResend?: boolean }) {
  const firstName = getFirstName(data.name);
  const pricing = getReactivationPriceForEmail(data.to);
  const targetUrl = `https://www.fsidigital.ca/portfolio?token=${data.loginToken}&source=reactivation_reminder&price=${pricing.price}`;
  
  const contentHtml = `
    <p style="margin: 0 0 16px 0;">
      We often get asked: <strong>"How does FSI Digital help businesses access government funding?"</strong>
    </p>
    <p style="margin: 16px 0;">
      It is a fair question. Government funding is provided directly by federal, provincial, and regional agencies. FSI Digital does not distribute these funds.
    </p>
    <p style="margin: 16px 0;">
      Instead, FSI Digital identifies matching programs for your profile, compiles eligibility rules, highlights priority deadlines, and provides step-by-step guidance. You or your accountant use these tools and winning templates to submit directly to the government program portals.
    </p>
    <p style="margin: 16px 0;">
      When you unlock your custom Funding Match Report, here is exactly what unlocks in your portal:
    </p>
    <ul style="padding-left: 20px; margin: 16px 0; font-size: 14px; line-height: 1.6;">
      <li style="margin-bottom: 6px;"><strong>Priority Match Ranking:</strong> See which programs are highly relevant to your business profile first.</li>
      <li style="margin-bottom: 6px;"><strong>Eligibility Breakdown:</strong> Clear, organized qualification criteria for each program.</li>
      <li style="margin-bottom: 6px;"><strong>Intake Deadlines:</strong> Track closing windows and opening cycles so you don't miss key dates.</li>
      <li style="margin-bottom: 6px;"><strong>Funding Estimates:</strong> View realistic grant match ranges and wage subsidy limits.</li>
      <li style="margin-bottom: 6px;"><strong>Step-by-Step Next Actions:</strong> Get the exact documentation requirements and submission checklists.</li>
    </ul>
    <p style="margin: 16px 0;">
      Review your matched opportunities and access your roadmap in your dashboard:
    </p>
    <div style="text-align: center; margin: 28px 0;">
      <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #059669; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(5,150,105,0.2);">
        View My Matches &rarr;
      </a>
    </div>
  `;

  const subject = `How FSI Digital matches your business to government funding`;
  return sendEmail({
    to: data.to,
    subject,
    html: wrapNewsletterTemplate(contentHtml, data.loginToken, firstName),
    text: `Hi ${firstName},\n\nGovernment funding is provided directly by agencies. FSI Digital does not distribute funds, but identifies matching programs, organizes eligibility rules, and provides approved guides/templates so you can submit successfully.\n\nUnlock your Funding Match Report in your dashboard:\n\n${targetUrl}\n\nBest regards,\nAshwani K`,
    tagType: "reactivation-reminder",
    companyName: data.companyName,
    from: BRAND_SENDER,
    forceResend: data.forceResend
  });
}

/**
 * Reactivation Nurture Day 5: Case Study Email
 */
export async function sendReactivationCaseStudyEmail(data: { to: string; name?: string; loginToken: string; companyName?: string; forceResend?: boolean }) {
  const firstName = getFirstName(data.name);
  const pricing = getReactivationPriceForEmail(data.to);
  const targetUrl = `https://www.fsidigital.ca/portfolio?token=${data.loginToken}&source=reactivation_casestudy&price=${pricing.price}`;
  
  const contentHtml = `
    <p style="margin: 0 0 16px 0;">
      Government funding is designed to offset specific growth activities. Most programs fall under four main categories:
    </p>
    <ul style="padding-left: 20px; margin: 16px 0; font-size: 14px; line-height: 1.6;">
      <li style="margin-bottom: 8px;"><strong>Hiring & Training:</strong> Wage subsidies covering up to 50-70% of candidate salaries.</li>
      <li style="margin-bottom: 8px;"><strong>R&D / Innovation:</strong> Tax credits and grants for developer salaries and collaborative R&D.</li>
      <li style="margin-bottom: 8px;"><strong>Business Expansion:</strong> Funding for purchasing equipment, machinery, or upgrading facilities.</li>
      <li style="margin-bottom: 8px;"><strong>Exporting:</strong> Travel and market development grants to support international expansion.</li>
    </ul>
    <p style="margin: 16px 0;">
      A custom Funding Eligibility Report maps these active categories to your business stage and prioritizes opportunities by closing dates so you can focus on high-probability intakes first.
    </p>
    <p style="margin: 16px 0;">
      Your custom report instantly unlocks:
    </p>
    <ul style="padding-left: 20px; margin: 16px 0; font-size: 14px; line-height: 1.6;">
      <li style="margin-bottom: 6px;">Priority program ranking and eligibility rules</li>
      <li style="margin-bottom: 6px;">Active intake windows and closing deadlines</li>
      <li style="margin-bottom: 6px;">Estimated funding amounts for each match</li>
      <li style="margin-bottom: 6px;">Step-by-step next actions and checklist sheets</li>
    </ul>
    <div style="text-align: center; margin: 28px 0;">
      <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #059669; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(5,150,105,0.2);">
        View Funding Priority Roadmap &rarr;
      </a>
    </div>
  `;

  const subject = `Some of your matched opportunities may support hiring and growth`;
  return sendEmail({
    to: data.to,
    subject,
    html: wrapNewsletterTemplate(contentHtml, data.loginToken, firstName),
    text: `Hi ${firstName},\n\nGovernment funding typically covers hiring/training, R&D/innovation, business expansion, and exporting. A custom Funding Eligibility Report maps these to your specific profile and prioritizes closing dates.\n\nView your priority roadmap in your dashboard:\n\n${targetUrl}\n\nBest regards,\nAshwani K`,
    tagType: "reactivation-casestudy",
    companyName: data.companyName,
    from: BRAND_SENDER,
    forceResend: data.forceResend
  });
}

/**
 * Reactivation Nurture Day 8: Last Chance Email
 */
export async function sendReactivationLastChanceEmail(data: { to: string; name?: string; loginToken: string; companyName?: string; forceResend?: boolean }) {
  const firstName = getFirstName(data.name);
  const pricing = getReactivationPriceForEmail(data.to);
  const targetUrl = `https://www.fsidigital.ca/portfolio?token=${data.loginToken}&source=reactivation_lastchance&price=${pricing.price}`;
  
  const contentHtml = `
    <p style="margin: 0 0 16px 0;">
      This is your final notice to access your pre-qualification checklist and custom Funding Eligibility Report before your active review file is locked and archived.
    </p>
    <p style="margin: 16px 0;">
      Unlock your report starting at just $19 to secure your step-by-step application templates and priority timelines before they are removed from your active queue.
    </p>
    <div style="text-align: center; margin: 28px 0;">
      <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #e11d48; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(225,29,72,0.2);">
        Claim Your Report Access &rarr;
      </a>
    </div>
  `;

  const subject = `Final Reminder: Your matched opportunities are ready for review`;
  return sendEmail({
    to: data.to,
    subject,
    html: wrapNewsletterTemplate(contentHtml, data.loginToken, firstName),
    text: `Hi ${firstName},\n\nThis is your final opportunity to claim your custom Funding Eligibility Report starting at $19 before your active review file is archived:\n\n${targetUrl}\n\nBest regards,\nAshwani K`,
    tagType: "reactivation-lastchance",
    companyName: data.companyName,
    from: BRAND_SENDER,
    forceResend: data.forceResend
  });
}

/**
 * Reactivation Nurture Day 14: Final Close Email
 */
export async function sendReactivationFinalCloseEmail(data: { to: string; name?: string; loginToken: string; companyName?: string; forceResend?: boolean }) {
  const firstName = getFirstName(data.name);
  const targetUrl = `https://www.fsidigital.ca/portfolio?token=${data.loginToken}&source=reactivation_finalclose`;
  
  const contentHtml = `
    <p style="margin: 0 0 16px 0;">
      We haven't heard back regarding your updated funding matches for ${data.companyName || "your business"}.
    </p>
    <p style="margin: 16px 0;">
      We are closing your active review file today. To keep our analyst support focused on active applicants, we are moving your profile to our low-frequency update list.
    </p>
    <p style="margin: 16px 0;">
      Going forward, you will only receive our high-level quarterly funding announcements and new major grant releases, rather than active reminders.
    </p>
    <p style="margin: 16px 0;">
      If you'd like to check your matching results or keep your active review file open before we close the file, you can access your dashboard below:
    </p>
    <div style="text-align: center; margin: 28px 0;">
      <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #475569; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(71,85,105,0.2);">
        Keep My Profile Active &rarr;
      </a>
    </div>
  `;

  const subject = `🔒 Transitioning your pending funding profile file`;
  return sendEmail({
    to: data.to,
    subject,
    html: wrapNewsletterTemplate(contentHtml, data.loginToken, firstName),
    text: `Hi ${firstName},\n\nWe are closing your active review file today and transitioning your profile to our low-frequency update list (quarterly announcements only). If you wish to review your matches one last time and keep your profile active, visit your dashboard:\n\n${targetUrl}\n\nBest regards,\nAshwani K`,
    tagType: "reactivation-finalclose",
    companyName: data.companyName,
    from: BRAND_SENDER,
    forceResend: data.forceResend
  });
}

/**
 * Reactivation Nurture Day 11: Dedicated Founder Email (Plain Text Style)
 */
export async function sendReactivationFounderEmail(data: { to: string; name?: string; loginToken: string; companyName?: string; forceResend?: boolean }) {
  const firstName = getFirstName(data.name);
  const targetUrl = `https://www.fsidigital.ca/portfolio?token=${data.loginToken}&source=reactivation_founder`;
  const unsubscribeUrl = `https://www.fsidigital.ca/subscribe/unsubscribe?token=${data.loginToken}`;

  const subject = `Re: your funding review`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; color: #334155; line-height: 1.6; max-width: 580px; margin: 0 auto; padding: 20px 0; text-align: left;">
      <p>Hi ${firstName},</p>
      
      <p>I wanted to reach out personally to see if you had any questions about the funding opportunities we matched for ${data.companyName || "your business"}.</p>
      
      <p>A common question we get from founders is: <em>"How does FSI Digital secure this funding?"</em></p>
      
      <p>To be clear: FSI Digital doesn't directly distribute government funding. The funding itself comes from federal, provincial, and regional government programs.</p>
      
      <p>What we do is identify opportunities that are relevant to your business profile, organize the eligibility criteria, and map out a step-by-step roadmap with approved application templates. This helps your team or accountant submit directly to the government portals and avoids wasting weeks on manual research.</p>
      
      <p>If you'd like to check your matches or lock in your custom report, you can access your dashboard here:</p>
      <p><a href="${targetUrl}" target="_blank" rel="noopener noreferrer" style="color: #4f46e5; text-decoration: underline; font-weight: 600;">${targetUrl}</a></p>
      
      <p>Let me know if you have any questions.</p>
      
      <p style="margin-bottom: 0;">
        Best,<br/>
        <strong>Ashwani K</strong><br/>
        Founder, FSI Digital
      </p>

      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
        This is a personal follow-up regarding your FSI Digital review.<br>
        <a href="${unsubscribeUrl}" style="color: #94a3b8; text-decoration: underline;">Unsubscribe from alerts</a>
      </div>
    </div>
  `;

  const text = `Hi ${firstName},\n\nI wanted to reach out personally to see if you had any questions about the funding opportunities we matched for ${data.companyName || "your business"}.\n\nA common question we get from founders is: "How does FSI Digital secure this funding?"\n\nTo be clear: FSI Digital doesn't directly distribute government funding. The funding itself comes from federal, provincial, and regional government programs.\n\nWhat we do is identify opportunities that are relevant to your business profile, organize the eligibility criteria, and map out a step-by-step roadmap with approved application templates. This helps your team or accountant submit directly to the government portals and avoids wasting weeks on manual research.\n\nIf you'd like to check your matches or lock in your custom report, you can access your dashboard here:\n${targetUrl}\n\nLet me know if you have any questions.\n\nBest,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({
    to: data.to,
    subject,
    html,
    text,
    tagType: "reactivation-founder",
    companyName: data.companyName,
    from: BRAND_SENDER,
    forceResend: data.forceResend
  });
}
