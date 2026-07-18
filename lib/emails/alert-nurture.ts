import { sendEmail, getFirstName, escapeHtml } from "./mailer";

const BRAND_SENDER = "FSI Digital Partners <partners@fsidigital.ca>";

function wrapAlertNurtureTemplate(contentHtml: string, loginToken: string, firstName: string) {
  const unsubscribeUrl = 'https://www.fsidigital.ca/subscribe/unsubscribe';
  const year = new Date().getFullYear();

  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;margin:0;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="padding-bottom:18px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;text-align:left;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">FSI <span style="color:#059669;">Digital</span></span>
          <span style="float:right;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;padding:2px 8px;background-color:#e0e7ff;color:#4338ca;border-radius:4px;margin-top:2px;">
            Deadline Alerts
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
            This email was sent to you because you subscribed to government grant deadline alerts.<br>
            <a href="${unsubscribeUrl}" style="color:#64748b;text-decoration:underline;margin-top:8px;display:inline-block;">Unsubscribe from these alerts</a>
          </div>
        </div>

      </div>
    </div>
  `;
}

/**
 * Day 1: Welcome to Deadline Alerts
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
  province: string;
  industry: string;
}) {
  const firstName = getFirstName(name);
  const targetUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=alert_nurture_welcome`;
  const reportUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=alert_nurture_welcome_upgrade`;
  const subject = `🔔 You're subscribed to government grant deadline alerts`;

  const html = wrapAlertNurtureTemplate(`
    <p style="margin: 0 0 16px 0;">
      Welcome to your FSI Digital Deadline Alerts. We will track and notify you of approaching government grant deadlines tailored specifically to your business in <strong style="color:#4f46e5;">${province}</strong> operating in the <strong style="color:#4f46e5;">${industry}</strong> sector.
    </p>
    <p style="margin: 0 0 16px 0;">
      Based on initial matching data, there are active federal and provincial programs currently open that fit your profile. Missing these deadlines is the #1 reason businesses lose out on funding.
    </p>
    <p style="margin: 0 0 20px 0;">
      Want to see exactly which active programs matched your business? We've generated a personalized <strong>Funding Match Report</strong> detailing estimated amounts and qualification criteria:
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${reportUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 2px 4px rgba(5,150,105,0.2);">
        Unlock My Match Report ($19) &rarr;
      </a>
    </div>
    <p style="margin: 0; font-size:13px; color:#64748b;">
      You can also access your free summary profile dashboard at any time <a href="${targetUrl}" style="color:#4f46e5;text-decoration:underline;">here</a>.
    </p>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nYou are subscribed to deadline alerts for ${province} (${industry}).\n\nUnlock your complete Funding Match Report ($19) to see all matched programs and qualification criteria:\n${reportUrl}\n\nAccess your free summary profile:\n${targetUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

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
  province: string;
  industry: string;
}) {
  const firstName = getFirstName(name);
  const reportUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=alert_nurture_opportunity`;
  const subject = `⏳ Impending funding deadlines for ${industry} in ${province}`;

  const html = wrapAlertNurtureTemplate(`
    <p style="margin: 0 0 16px 0;">
      Government funding cycles wait for no one. Right now, several major programs for the <strong>${industry}</strong> sector in <strong>${province}</strong> are approaching their next intake deadlines.
    </p>
    <p style="margin: 0 0 16px 0;">
      These include wage subsidies to offset hiring costs, R&D tax credits for innovation, and regional business development grants. If your application isn't ready when the portal opens, you will have to wait until the next cycle — which could be up to 12 months.
    </p>
    <p style="margin: 0 0 20px 0;">
      See all approaching deadlines and check your exact eligibility for these active streams with your custom Funding Match Report:
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${reportUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 2px 4px rgba(5,150,105,0.2);">
        Get My Funding Match Report ($19) &rarr;
      </a>
    </div>
    <p style="margin: 0; font-size:13px; color:#64748b;">
      The report identifies estimated funding limits and outlines required application documentation so you can prepare early.
    </p>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nIntakes are closing soon for ${industry} programs in ${province}.\n\nGet your custom Funding Match Report ($19) to see exact deadlines, eligibility requirements, and estimated funding limits:\n${reportUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'alert-nurture-opp' });
}

/**
 * Day 7: Pitch Funding Match Report ($19)
 */
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
  province: string;
  industry: string;
}) {
  const firstName = getFirstName(name);
  const reportUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=alert_nurture_report_pitch`;
  const subject = `📋 Stop guessing: See your exact matched government grants`;

  const html = wrapAlertNurtureTemplate(`
    <p style="margin: 0 0 16px 0;">
      Most business owners waste hours searching through confusing government websites, trying to figure out if they qualify for grants.
    </p>
    <p style="margin: 0 0 16px 0;">
      We built FSI Digital to solve this. For just <strong>$19</strong>, we run your profile against our entire database of active provincial and federal funding programs.
    </p>
    <p style="margin: 0 0 16px 0;">
      Your **Funding Match Report** gives you:
      <br>• List of active programs that match your region and industry.
      <br>• Estimated funding ranges based on your business stage.
      <br>• Application difficulty ratings (Low / Medium / High).
      <br>• Pre-requisites and required filing documents.
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${reportUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 2px 4px rgba(5,150,105,0.2);">
        Unlock Match Report for $19 &rarr;
      </a>
    </div>
    <p style="margin: 0; font-size:13.5px; text-align:center; color:#e11d48; font-weight:bold;">
      🔒 100% money-back guarantee if no eligible matches are found.
    </p>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nStop wasting time scouring government portals. For $19, see every active grant, tax credit, and subsidy that matches your business in ${province}.\n\nGet Funding Match Report ($19):\n${reportUrl}\n\n100% refund guarantee if no matches found.\n\nBest,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'alert-nurture-report' });
}

/**
 * Day 14: Pitch Funding Action Plan ($49)
 */
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
  province: string;
  industry: string;
}) {
  const firstName = getFirstName(name);
  const planUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=alert_nurture_plan_pitch`;
  const subject = `🗺️ Your step-by-step government funding roadmap`;

  const html = wrapAlertNurtureTemplate(`
    <p style="margin: 0 0 16px 0;">
      Knowing which programs match your business is only half the battle. The real challenge is **execution**.
    </p>
    <p style="margin: 0 0 16px 0;">
      Filing multiple grant applications takes time. Which one should you apply for first? How do you stack them so you don't void eligibility for other programs?
    </p>
    <p style="margin: 0 0 16px 0;">
      Our **Funding Action Plan** is designed to map this out for you:
      <br>• **Priority program ranking**: Knowing where to focus your effort first.
      <br>• **120-day timeline schedule**: Sequential application phases.
      <br>• **Risk warning indicators**: Key rules and compliance pitfalls.
      <br>• **Pre-submission checklists**: Ensure you have all paperwork ready.
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${planUrl}" style="background-color:#4f46e5;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 2px 4px rgba(79,70,229,0.2);">
        Get My Action Plan ($49) &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nGet a step-by-step roadmap to apply for and stack government funding programs. Optimize your timeline and checklist to ensure success.\n\nUnlock Funding Action Plan ($49):\n${planUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'alert-nurture-plan' });
}

/**
 * Day 21: Pitch Funding Expert Audit ($199)
 */
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
  province: string;
  industry: string;
}) {
  const firstName = getFirstName(name);
  const auditUrl = `https://www.fsidigital.ca/consultation?token=${loginToken}&source=alert_nurture_audit_pitch`;
  const subject = `💬 Book a professional Funding Eligibility Audit`;

  const html = wrapAlertNurtureTemplate(`
    <p style="margin: 0 0 16px 0;">
      Writing grant proposals is hard. A single missing document or poorly framed sentence can lead to automatic rejection.
    </p>
    <p style="margin: 0 0 16px 0;">
      If you are planning to apply for major funding streams, having a professional review your eligibility and strategy can save you thousands of dollars.
    </p>
    <p style="margin: 0 0 16px 0;">
      Book a **Funding Eligibility Audit** with our advisory team:
      <br>• **Live Strategy Consultation**: 30-minute deep-dive review.
      <br>• **Application Strategy Outline**: Best framing strategies for your business.
      <br>• **Document & Compliance Preflight**: Identify missing criteria.
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${auditUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 2px 4px rgba(5,150,105,0.2);">
        Book Advisory Audit ($199) &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nGet expert eyeballs on your application strategy before submitting. Book a live 30-minute Funding Eligibility Audit with our advisors.\n\nBook Advisory Audit ($199):\n${auditUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'alert-nurture-audit' });
}

/**
 * Day 21: Success Story Case Study
 */
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
  province: string;
  industry: string;
}) {
  const firstName = getFirstName(name);
  const planUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=alert_nurture_success_story`;
  const subject = `💼 Case Study: How Apex Tech secured $85,000 in stacked funding`;

  const html = wrapAlertNurtureTemplate(`
    <p style="margin: 0 0 16px 0;">
      We often get asked by business owners: <em>"Can a small firm operating in the ${escapeHtml(industry)} sector in ${escapeHtml(province)} really stack multiple government funding programs?"</em>
    </p>
    <p style="margin: 0 0 16px 0;">
      The answer is a resounding **yes**.
    </p>
    <p style="margin: 0 0 16px 0;">
      Recently, one of our platform members, **Apex Tech Solutions**, successfully secured <strong>$85,000 in combined funding</strong> by stacking provincial wage subsidies with federal research and development tax credits.
    </p>
    <p style="margin: 0 0 16px 0;">
      By properly sequencing their application roadmap, they:
      <br>• Offset 70% of their new hiring costs.
      <br>• Claimed retroactive R&D credits on their core development.
      <br>• Kept their cash flow positive during critical growth months.
    </p>
    <p style="margin: 0 0 20px 0;">
      Knowing which programs exist is the first step. Knowing how and when to apply so you don't void eligibility is where the real value lies. Map out your sequential priority timeline with your custom Funding Action Plan:
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${planUrl}" style="background-color:#4f46e5;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 2px 4px rgba(79,70,229,0.2);">
        View Stacking Roadmap ($49) &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nApex Tech Solutions successfully secured $85,000 in stacked funding by combining wage subsidies and R&D credits. Learn how to sequence your intakes and unlock your priority roadmap:\n${planUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'alert-nurture-success' });
}

/**
 * Day 45: Advisory Audit Follow-up
 */
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
  province: string;
  industry: string;
}) {
  const firstName = getFirstName(name);
  const auditUrl = `https://www.fsidigital.ca/consultation?token=${loginToken}&source=alert_nurture_audit_followup`;
  const subject = `Re: Your Funding Eligibility Audit`;

  const html = wrapAlertNurtureTemplate(`
    <p style="margin: 0 0 16px 0;">
      I wanted to check back in regarding the Funding Eligibility Audit for your business.
    </p>
    <p style="margin: 0 0 16px 0;">
      Several key provincial and federal intakes for <strong>${escapeHtml(industry)}</strong> companies in <strong>${escapeHtml(province)}</strong> are opening their application portals this coming quarter. If you have hiring, development, or business expansion projects planned, having our advisory team pre-verify your eligibility will prevent costly filing mistakes.
    </p>
    <p style="margin: 0 0 20px 0;">
      As a reminder, our live strategy session is 100% risk-free. If we determine that you qualify for fewer than 2 active programs, we refund your $199 immediately.
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${auditUrl}" style="background-color:#0f172a;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;">
        Book Live Eligibility Audit ($199) &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nKey portals are opening next quarter for ${industry} companies in ${province}. Book a live 30-minute Funding Eligibility Audit. 100% money-back guarantee if you don't qualify for at least 2 programs:\n${auditUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'alert-nurture-audit-followup' });
}

/**
 * Day 52: Retention, Case Studies & Referrals Loop
 */
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
  province: string;
  industry: string;
}) {
  const firstName = getFirstName(name);
  const referralUrl = `https://www.fsidigital.ca/refer?token=${loginToken}&source=alert_nurture_referral`;
  const subject = `Can we feature your business? ($100 Referral Reward)`;

  const html = wrapAlertNurtureTemplate(`
    <p style="margin: 0 0 16px 0;">
      I hope your recent applications and funding filings are progressing smoothly.
    </p>
    <p style="margin: 0 0 16px 0;">
      At FSI Digital, we build our platform around real outcomes. If our match reports or advisory audits helped you identify or secure government funding, we would love to feature your success story in an upcoming case study (we can anonymize details to protect your privacy if preferred).
    </p>
    <p style="margin: 0 0 16px 0;">
      As a thank-you, when you share your feedback, you can participate in our <strong>Founder Referral Program</strong>. 
    </p>
    <p style="margin: 0 0 20px 0;">
      Introduce us to any founder in your network who is currently looking for non-dilutive capital. When they book a Strategic Audit, we will send you a <strong>$100 Amazon Gift Card</strong>, and give them a 20% discount on their session.
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${referralUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;">
        Share Feedback &amp; Refer Founders &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nWe would love to feature your success story in a case study. Plus, refer a founder to FSI Digital: when they book their Strategic Audit, we will send you a $100 Amazon Gift Card, and give them a 20% discount:\n${referralUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'alert-nurture-referral' });
}
