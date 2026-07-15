import { sendEmail } from "./mailer";

export async function sendEnterpriseSalesAlert({
  email,
  name,
  phone,
  companyName,
  revenue,
  goal,
  state,
  industry,
  score,
  tier,
  businessDescription,
  fundingNeed,
  leadSource,
  pagePath,
  referralSource,
  utmSource,
  utmMedium,
  utmCampaign,
  craRiskRating = "Moderate",
  estimatedOpportunityValue = "N/A"
}: {
  email: string;
  name: string;
  phone?: string;
  companyName: string;
  revenue: string;
  goal: string;
  state: string;
  industry: string;
  score: number;
  tier: string;
  businessDescription: string;
  fundingNeed: string;
  leadSource: string;
  pagePath: string;
  referralSource: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  craRiskRating?: string;
  estimatedOpportunityValue?: string;
}) {
  const adminEmail = process.env.ADMIN_ALERT_EMAIL || "hello@fsidigital.ca";
  const subject = `🚨 PRIORITY ENTERPRISE LEAD: ${companyName} (${revenue} | Focus: ${goal})`;
  
  const html = `
    <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; border: 2px solid #dc2626; border-radius: 12px;">
      <h2 style="color: #dc2626; margin-top: 0;">🚨 Priority Enterprise Lead Dashboard</h2>
      <p>A high-value enterprise prospect requires immediate sales follow-up (target timeline: 30 minutes).</p>
      
      <div style="background-color: #fef2f2; border: 1px solid #fee2e2; border-radius: 8px; padding: 16px; margin: 20px 0;">
        <h4 style="margin: 0 0 10px 0; color: #b91c1c; border-bottom: 1px solid #fecaca; pb: 4px; uppercase; font-size: 11px;">Client Profile</h4>
        <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
          <tr>
            <td style="padding: 4px 0; font-weight: bold; width: 150px;">Company Name:</td>
            <td>${companyName}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-weight: bold;">Contact Name:</td>
            <td>${name}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-weight: bold;">Email:</td>
            <td><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-weight: bold;">Phone Number:</td>
            <td>${phone || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-weight: bold;">Annual Revenue:</td>
            <td style="color: #dc2626; font-weight: bold;">${revenue}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-weight: bold;">Location:</td>
            <td>${state}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-weight: bold;">Industry:</td>
            <td>${industry}</td>
          </tr>
        </table>
        
        <h4 style="margin: 16px 0 10px 0; color: #b91c1c; border-bottom: 1px solid #fecaca; pb: 4px; uppercase; font-size: 11px;">Qualification Details</h4>
        <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
          <tr>
            <td style="padding: 4px 0; font-weight: bold; width: 150px;">Funding Need:</td>
            <td>${fundingNeed}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-weight: bold;">Funding Focus:</td>
            <td>${goal}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-weight: bold;">Lead Tier / Score:</td>
            <td style="font-weight: bold; color: #1e3a8a;">Tier ${tier} (Score: ${score}/100)</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-weight: bold;">Est. Opportunity Value:</td>
            <td style="font-weight: bold; color: #dc2626; font-size: 14px;">${estimatedOpportunityValue}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-weight: bold;">CRA Stacking Risk:</td>
            <td style="font-weight: bold; color: ${craRiskRating === "High" ? "#dc2626" : "#b45309"};">${craRiskRating} Risk</td>
          </tr>
        </table>

        <h4 style="margin: 16px 0 10px 0; color: #b91c1c; border-bottom: 1px solid #fecaca; pb: 4px; uppercase; font-size: 11px;">Traffic & Referral Attribution</h4>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #4b5563;">
          <tr>
            <td style="padding: 3px 0; font-weight: bold; width: 150px;">Source Page:</td>
            <td>${pagePath}</td>
          </tr>
          <tr>
            <td style="padding: 3px 0; font-weight: bold;">Lead Source:</td>
            <td>${leadSource}</td>
          </tr>
          <tr>
            <td style="padding: 3px 0; font-weight: bold;">Referral Source:</td>
            <td>${referralSource}</td>
          </tr>
          <tr>
            <td style="padding: 3px 0; font-weight: bold;">UTM Campaign:</td>
            <td>${utmSource} / ${utmMedium} / ${utmCampaign}</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; font-style: italic; font-size: 13px;">
        <strong>Description / Message:</strong><br/>
        "${businessDescription}"
      </div>
      
      <p style="margin-top: 24px; font-size: 11px; color: #64748b;">
        Sync timestamp: ${new Date().toISOString()}<br/>
        FSI Digital Auto Sales Alert System
      </p>
    </div>
  `;

  const text = `🚨 PRIORITY ENTERPRISE LEAD CAPTURED\n\nCompany: ${companyName}\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nRevenue: ${revenue}\nGoal: ${goal}\nLocation: ${state}\nIndustry: ${industry}\nScore: ${score} (Tier: ${tier})\n\nAttribution Parameters:\n- Funding Need: ${fundingNeed}\n- Est. Opportunity Value: ${estimatedOpportunityValue}\n- CRA Risk: ${craRiskRating}\n- Source Page: ${pagePath}\n- Lead Source: ${leadSource}\n- Referral: ${referralSource}\n- UTMs: ${utmSource} / ${utmMedium} / ${utmCampaign}\n\nDescription:\n"${businessDescription}"`;

  return sendEmail({
    to: adminEmail,
    subject,
    html,
    text,
    tagType: "enterprise-sales-alert",
    companyName
  });
}
