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
  const subject = `We identified ${data.newProgramsCount} new funding programs for your business`;

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
        Based on that profile, our system identified government funding opportunities that may be relevant to your business.
      </p>

      <p style="margin: 16px 0; font-weight: 600;">
        Potential matches appear to align with:
      </p>

      <ul style="padding-left: 20px; margin: 16px 0; line-height: 1.6; list-style-type: none;">
        <li style="margin-bottom: 8px;">✓ Industry: <strong>${cleanIndustry}</strong></li>
        <li style="margin-bottom: 8px;">✓ Location: <strong>${cleanRegion}</strong></li>
        <li style="margin-bottom: 8px;">✓ Business Stage: <strong>${cleanStage}</strong></li>
      </ul>

      <p style="margin: 16px 0;">
        Most business owners never discover these opportunities because they are scattered across multiple federal and provincial programs, each with different eligibility requirements, funding amounts, and intake periods.
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
    text = `Hi ${firstName},\n\nWe recently reviewed the information you previously submitted through FSI Digital.\n\nBased on that profile, our system identified government funding opportunities that may be relevant to your business.\n\nPotential matches appear to align with:\n✓ Industry: ${cleanIndustry}\n✓ Location: ${cleanRegion}\n✓ Business Stage: ${cleanStage}\n\nMost business owners never discover these opportunities because they are scattered across multiple federal and provincial programs, each with different eligibility requirements, funding amounts, and intake periods.\n\nWe've prepared a personalized funding summary showing:\n• Relevant funding opportunities\n• Estimated funding amounts\n• Eligibility requirements\n• Priority opportunities to review first\n• Recommended next steps\n\nAs a previously assessed business, you can unlock your matched opportunities for a one-time fee of $19.\n\nUnlock your matched opportunities here:\n${link}\n\nRegards,\nAshwani Kumar\nFounder, FSI Digital`;
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
        Based on that profile, our system identified government funding opportunities that may be relevant to your business.
      </p>

      <p style="margin: 16px 0; font-weight: 600;">
        Potential matches appear to align with:
      </p>

      <ul style="padding-left: 20px; margin: 16px 0; line-height: 1.6; list-style-type: none;">
        ${htmlBullets}
      </ul>

      <p style="margin: 16px 0;">
        Most business owners never discover these opportunities because they are scattered across multiple federal and provincial programs, each with different eligibility requirements, funding amounts, and intake periods.
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
    text = `Hi ${firstName},\n\nWe recently reviewed the information you previously submitted through FSI Digital.\n\nBased on that profile, our system identified government funding opportunities that may be relevant to your business.\n\nPotential matches appear to align with:${textBullets}\n\nMost business owners never discover these opportunities because they are scattered across multiple federal and provincial programs, each with different eligibility requirements, funding amounts, and intake periods.\n\nWe've prepared a personalized funding summary showing:\n• Relevant funding opportunities\n• Estimated funding amounts\n• Eligibility requirements\n• Priority opportunities to review first\n• Recommended next steps\n\nAs a previously assessed business, you can unlock your matched opportunities for a one-time fee of $19.\n\nUnlock your matched opportunities here:\n${link}\n\nRegards,\nAshwani Kumar\nFounder, FSI Digital`;
  } else {
    subject = "New government funding opportunities identified";
    contentHtml = `
      <p style="margin: 0 0 16px 0;">
        We recently expanded our funding database and identified several government funding opportunities that may be relevant to growing businesses.
      </p>

      <p style="margin: 16px 0;">
        Most business owners never discover these opportunities because they are scattered across multiple federal and provincial programs, each with different eligibility requirements, funding amounts, and intake periods.
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
    text = `Hi ${firstName},\n\nWe recently expanded our funding database and identified several government funding opportunities that may be relevant to growing businesses.\n\nMost business owners never discover these opportunities because they are scattered across multiple federal and provincial programs, each with different eligibility requirements, funding amounts, and intake periods.\n\nWe've prepared a personalized funding summary showing:\n• Relevant funding opportunities\n• Estimated funding amounts\n• Eligibility requirements\n• Priority opportunities to review first\n• Recommended next steps\n\nAs a subscriber, you can unlock your matched opportunities for a one-time fee of $19.\n\nUnlock your matched opportunities here:\n${link}\n\nRegards,\nAshwani Kumar\nFounder, FSI Digital`;
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
    from: BRAND_SENDER
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
      This is a quick reminder that your exclusive reactivation pricing for the FSI Digital Funding Eligibility Report expires soon.
    </p>
    <p style="margin: 16px 0;">
      Access your personalized dashboard to lock in your <strong>$${pricing.price} report</strong> (normally $199) and secure your documentation checklist before your profile file is closed.
    </p>
    <div style="text-align: center; margin: 28px 0;">
      <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #059669; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(5,150,105,0.2);">
        Claim Your Discounted Report &rarr;
      </a>
    </div>
  `;

  const subject = `⏰ Reminder: Your $${pricing.price} funding report offer is expiring`;
  return sendEmail({
    to: data.to,
    subject,
    html: wrapNewsletterTemplate(contentHtml, data.loginToken, firstName),
    text: `Hi ${firstName},\n\nThis is a reminder that your exclusive reactivation offer for the Funding Eligibility Report expires soon. Lock in your $${pricing.price} report (usually $199) here:\n\n${targetUrl}\n\nBest regards,\nAshwani K`,
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
      We often get asked: <em>"Can a small tech firm really stack multiple government grant programs?"</em>
    </p>
    <p style="margin: 16px 0;">
      The answer is yes. Recently, one of our platform members, <strong>Apex Tech Solutions</strong>, successfully secured <strong>$85,000 in combined funding</strong> by stacking provincial hiring subsidies with federal R&D tax credits (SR&ED).
    </p>
    <p style="margin: 16px 0;">
      In your dashboard, we have mapped out a priority intake schedule for ${data.companyName || "your business"} based on Apex's success strategy. Unlock your full Funding Eligibility Report and checklist for just $${pricing.price} (usually $199).
    </p>
    <div style="text-align: center; margin: 28px 0;">
      <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #059669; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(5,150,105,0.2);">
        View Stacking Strategy &rarr;
      </a>
    </div>
  `;

  const subject = `💼 Case Study: How Apex Tech secured $85,000 in stacked funding`;
  return sendEmail({
    to: data.to,
    subject,
    html: wrapNewsletterTemplate(contentHtml, data.loginToken, firstName),
    text: `Hi ${firstName},\n\nApex Tech Solutions stacked hiring subsidies and SR&ED tax credits to secure $85,000. View your custom Funding Eligibility Report and checklist for $${pricing.price} (usually $199):\n\n${targetUrl}\n\nBest regards,\nAshwani K`,
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
      This is your final opportunity to claim your pre-qualification checklist and custom Funding Eligibility Report before your file is locked and archived.
    </p>
    <p style="margin: 16px 0;">
      Access your portal now to claim your discounted report for just $${pricing.price} (usually $199). Once this window closes, the price reverts to standard rates.
    </p>
    <div style="text-align: center; margin: 28px 0;">
      <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #e11d48; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(225,29,72,0.2);">
        Claim Your Discount Now &rarr;
      </a>
    </div>
  `;

  const subject = `⚠️ Final Notice: Your $${pricing.price} funding report expires soon`;
  return sendEmail({
    to: data.to,
    subject,
    html: wrapNewsletterTemplate(contentHtml, data.loginToken, firstName),
    text: `Hi ${firstName},\n\nThis is your final opportunity to claim your custom Funding Eligibility Report for $${pricing.price} (usually $199) before it is archived:\n\n${targetUrl}\n\nBest regards,\nAshwani K`,
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
