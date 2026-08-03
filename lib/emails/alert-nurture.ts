import { sendEmail, getFirstName, cleanRegionName, cleanIndustryName, escapeHtml } from "./mailer";

function wrapAlertNurtureTemplate(contentHtml: string, loginToken: string, firstName: string) {
  const unsubscribeUrl = 'https://www.fsidigital.ca/subscribe/unsubscribe';

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
  province?: string;
  industry?: string;
}) {
  const firstName = getFirstName(name);
  const cleanProv = cleanRegionName(province);
  const cleanInd = cleanIndustryName(industry);

  const targetUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=alert_nurture_welcome`;
  const reportUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=alert_nurture_welcome_upgrade`;
  const subject = `🔔 You're subscribed to government grant deadline alerts`;

  const html = wrapAlertNurtureTemplate(`
    <p style="margin: 0 0 16px 0;">
      Welcome to your FSI Digital Deadline Alerts. We will track and notify you of approaching government grant deadlines tailored specifically to your business in <strong style="color:#4f46e5;">${escapeHtml(cleanProv)}</strong> operating in the <strong style="color:#4f46e5;">${escapeHtml(cleanInd)}</strong> sector.
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

  const text = `Hi ${firstName},\n\nYou are subscribed to deadline alerts for ${cleanProv} (${cleanInd}).\n\nUnlock your complete Funding Match Report ($19) to see all matched programs and qualification criteria:\n${reportUrl}\n\nAccess your free summary profile:\n${targetUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

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

  const reportUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=alert_nurture_opportunity`;
  const subject = `⏳ Impending funding deadlines for ${cleanInd} in ${cleanProv}`;

  const html = wrapAlertNurtureTemplate(`
    <p style="margin: 0 0 16px 0;">
      Government funding cycles wait for no one. Right now, several major programs for the <strong>${escapeHtml(cleanInd)}</strong> sector in <strong>${escapeHtml(cleanProv)}</strong> are approaching their next intake deadlines.
    </p>
    <p style="margin: 0 0 16px 0;">
      If you are planning R&amp;D hiring, capital equipment investments, or market expansion within the next 3 to 6 months, securing grant eligibility before costs are incurred is critical.
    </p>
    <p style="margin: 0 0 20px 0;">
      Get your custom <strong>Funding Match Report</strong> to see exact deadline dates, eligibility requirements, and estimated funding limits for your firm:
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${reportUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 2px 4px rgba(5,150,105,0.2);">
        Get My Match Report ($19) &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nIntakes are closing soon for ${cleanInd} programs in ${cleanProv}.\n\nGet your custom Funding Match Report ($19) to see exact deadlines, eligibility requirements, and estimated funding limits:\n${reportUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

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

  const reportUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=alert_nurture_pitch`;
  const subject = `Every active grant program for your business in one place`;

  const html = wrapAlertNurtureTemplate(`
    <p style="margin: 0 0 16px 0;">
      Finding government funding shouldn't require spending 20+ hours navigating confusing government portals.
    </p>
    <p style="margin: 0 0 16px 0;">
      For just <strong>$19</strong>, our <strong>Funding Match Report</strong> cross-references your exact profile against active federal and provincial programs in <strong>${escapeHtml(cleanProv)}</strong>.
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${reportUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;">
        Claim My Match Report ($19) &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nStop wasting time scouring government portals. For $19, see every active grant that matches your business in ${cleanProv}.\n\nGet Funding Match Report ($19):\n${reportUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

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

  const planUrl = `https://www.fsidigital.ca/portfolio?token=${loginToken}&source=alert_nurture_plan`;
  const subject = `Action Plan: Prioritized funding roadmap for ${cleanProv}`;

  const html = wrapAlertNurtureTemplate(`
    <p style="margin: 0 0 16px 0;">
      Unlock your prioritized Funding Action Plan outlining the exact sequence to apply for funding in ${escapeHtml(cleanProv)}.
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${planUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;">
        View Action Plan ($49) &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nView your prioritized Funding Action Plan for ${cleanProv}:\n${planUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

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

  const auditUrl = `https://www.fsidigital.ca/booking?token=${loginToken}&source=alert_nurture_audit`;
  const subject = `Upcoming funding intake windows for ${cleanInd} firms in ${cleanProv}`;

  const html = wrapAlertNurtureTemplate(`
    <p style="margin: 0 0 16px 0;">
      Several key provincial and federal intakes for <strong>${escapeHtml(cleanInd)}</strong> companies in <strong>${escapeHtml(cleanProv)}</strong> are opening their application portals this coming quarter.
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${auditUrl}" style="background-color:#4f46e5;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;">
        Book a Funding Strategy Audit &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nKey portals are opening next quarter for ${cleanInd} companies in ${cleanProv}. Book a 30-minute Funding Strategy Audit:\n${auditUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

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

  const auditUrl = `https://www.fsidigital.ca/booking?token=${loginToken}&source=alert_nurture_audit_followup`;
  const subject = `Follow-up regarding your funding strategy session in ${cleanProv}`;

  const html = wrapAlertNurtureTemplate(`
    <p style="margin: 0 0 16px 0;">
      Following up regarding your funding roadmap in <strong>${escapeHtml(cleanProv)}</strong> (${escapeHtml(cleanInd)}).
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${auditUrl}" style="background-color:#4f46e5;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;">
        Claim Strategy Session &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nFollowing up regarding your funding roadmap in ${cleanProv}:\n${auditUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

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
  const shareUrl = `https://www.fsidigital.ca/calculator?source=referral`;
  const subject = `Know another founder searching for government grants?`;

  const html = wrapAlertNurtureTemplate(`
    <p style="margin: 0 0 16px 0;">
      If you know another Canadian founder looking for government grants, feel free to share our free eligibility calculator with them.
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${shareUrl}" style="background-color:#0f172a;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:13px;">
        Share Funding Calculator &rarr;
      </a>
    </div>
  `, loginToken, firstName);

  const text = `Hi ${firstName},\n\nKnow another founder searching for grants? Share our free calculator: ${shareUrl}\n\nBest,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'alert-nurture-referral' });
}
