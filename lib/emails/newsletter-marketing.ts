import { sendEmail, getFirstName } from "./mailer";

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
}

export interface MissingFundingAlertData {
  to: string;
  name?: string;
  loginToken: string;
  companyName?: string;
  missingFundingAmount: string;
}

const BRAND_SENDER = "FSI Digital Partners <partners@fsidigital.ca>";

function wrapNewsletterTemplate(contentHtml: string, loginToken: string, firstName: string) {
  const dashboardUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=newsletter_campaign`;
  const unsubscribeUrl = `https://www.fsidigital.ca/subscribe/unsubscribe?token=${loginToken}`;
  const year = new Date().getFullYear();

  return `
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
          <strong>Ashwani Kumar</strong><br/>
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
  const targetUrl = `https://www.fsidigital.ca/portfolio?token=${data.loginToken}&source=new_funding_alert`;
  
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
      <a href="${targetUrl}" style="background-color: #059669; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(5,150,105,0.2);">
        See If You Qualify &rarr;
      </a>
    </div>
  `;

  const text = `Hi ${firstName},\n\nA high-value grant matching your business profile has been updated:\n\n* Opportunity: ${data.programName}\n* Value: Up to ${data.maxFundingAmount}\n* Criteria: ${data.industry} companies in ${data.region}\n\nSee if you qualify:\n${targetUrl}\n\nBest regards,\nAshwani Kumar\nFounder, FSI Digital`;
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
  const targetUrl = `https://www.fsidigital.ca/portfolio?token=${data.loginToken}&source=match_update_alert`;

  const programsListHtml = data.newProgramsList.map(name => `
    <li style="margin-bottom: 6px; font-weight: 500;">
      <span style="color: #059669; font-weight: bold; margin-right: 4px;">✔</span> ${name}
    </li>
  `).join("");

  const contentHtml = `
    <p style="margin: 0 0 16px 0;">
      We have expanded our funding match engine database, adding <strong>${data.newProgramsCount} new programs</strong> matching businesses like yours.
    </p>

    <p style="margin: 16px 0;">
      Here are a few of the newly added matching programs:
    </p>

    <ul style="list-style-type: none; padding-left: 0; margin: 16px 0; font-size: 14px;">
      ${programsListHtml}
    </ul>

    <p style="margin: 16px 0;">
      Your matched eligibility score has been updated in real-time based on these additions. Log in to view your refreshed stack and see how much your funding ceiling has increased.
    </p>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${targetUrl}" style="background-color: #059669; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(5,150,105,0.2);">
        Check Your Updated Score &rarr;
      </a>
    </div>
  `;

  const text = `Hi ${firstName},\n\nWe added ${data.newProgramsCount} new programs to our assessment engine matching businesses like yours.\n\nMatching programs include:\n${data.newProgramsList.map(n => `- ${n}`).join("\n")}\n\nCheck your updated score:\n${targetUrl}\n\nBest regards,\nAshwani Kumar\nFounder, FSI Digital`;
  const subject = `Funding Match Update: We added ${data.newProgramsCount} new programs`;

  return sendEmail({
    to: data.to,
    subject,
    html: wrapNewsletterTemplate(contentHtml, data.loginToken, firstName),
    text,
    tagType: "newsletter-match-update",
    companyName: data.companyName,
    from: BRAND_SENDER
  });
}

/**
 * Newsletter Template 3: Missing Funding Alert
 */
export async function sendMissingFundingAlertEmail(data: MissingFundingAlertData) {
  const firstName = getFirstName(data.name);
  const targetUrl = `https://www.fsidigital.ca/portfolio?token=${data.loginToken}&source=missing_funding_alert`;

  const contentHtml = `
    <p style="margin: 0 0 16px 0;">
      According to our preliminary diagnostics, your business could qualify for up to <strong>${data.missingFundingAmount}</strong> in provincial and federal funding.
    </p>

    <div style="margin: 24px 0; padding: 20px; background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; text-align: left;">
      <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; background-color: #3b82f6; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">
        Unclaimed Estimated Funding
      </span>
      <h3 style="font-size: 24px; font-weight: 800; color: #1e3a8a; margin: 4px 0 8px 0;">${data.missingFundingAmount}+</h3>
      <p style="font-size: 13px; color: #1e40af; margin: 0; line-height: 1.4;">
        Estimated matching yields based on your industry segment, company size, and region.
      </p>
    </div>

    <p style="margin: 16px 0;">
      You haven't completed your full eligibility screener yet. Finish the remaining questions in your portal to lock in your recommendations, access matching checklists, and begin claiming these grants before the current cycle deadlines.
    </p>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${targetUrl}" style="background-color: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(37,99,235,0.2);">
        Complete Your Assessment &rarr;
      </a>
    </div>
  `;

  const text = `Hi ${firstName},\n\nYou may be missing out on up to ${data.missingFundingAmount} in business funding. Complete your assessment to view all matches and download checklists:\n\n${targetUrl}\n\nBest regards,\nAshwani Kumar\nFounder, FSI Digital`;
  const subject = `Attention: You may be missing ${data.missingFundingAmount} in business funding`;

  return sendEmail({
    to: data.to,
    subject,
    html: wrapNewsletterTemplate(contentHtml, data.loginToken, firstName),
    text,
    tagType: "newsletter-missing-funding",
    companyName: data.companyName,
    from: BRAND_SENDER
  });
}
