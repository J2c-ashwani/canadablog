import { sendEmail, getFirstName } from "./mailer";

export type B2BOutreachStage = 'b2b_day1' | 'b2b_day4' | 'b2b_day7';

function wrapB2BEmailTemplate(contentHtml: string, firstName: string, unsubscribeUrl: string) {
  return `
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;margin:0;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="padding-bottom:18px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;text-align:left;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">FSI <span style="color:#059669;">Digital</span></span>
          <span style="float:right;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;padding:2px 8px;background-color:#f1f5f9;border-radius:4px;margin-top:2px;">
            Advisory Desk
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
          <span style="color:#64748b;font-size:12px;">Founder & CEO, FSI Digital</span>
          
          <div style="margin-top:24px;padding-top:16px;border-top:1px dashed #e2e8f0;font-size:11px;color:#94a3b8;text-align:center;">
            This advisory update was sent because you requested a B2B grant eligibility assessment on FSI Digital.<br>
            <a href="${unsubscribeUrl}" style="color:#64748b;text-decoration:underline;margin-top:8px;display:inline-block;">Unsubscribe from outreach updates</a>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function getB2BEmailContent(
  stage: B2BOutreachStage, 
  firstName: string, 
  industry: string, 
  state: string,
  telemetrySignal: 'calculator' | 'pdf' | 'general' = 'general'
) {
  const unsubscribeUrl = 'https://www.fsidigital.ca/subscribe/unsubscribe';
  const bookingUrl = 'https://www.fsidigital.ca/booking';

  const isTech = ['tech', 'software', 'it'].some(x => industry.toLowerCase().includes(x));
  const isMfg = ['manufacturing', 'industrial'].some(x => industry.toLowerCase().includes(x));
  
  const regionName = state.toUpperCase() === 'ON' ? 'Ontario' : state.toUpperCase() === 'AB' ? 'Alberta' : 'your region';

  // Credibility Proof Block
  const credibilityBlockHtml = `
    <p style="margin: 20px 0 16px 0; font-size: 13.5px; color: #475569; line-height: 1.5; font-weight: 500;">
      During the past year we've helped founders understand which funding programs matched their projects before they committed significant time to applications. The first step is simply determining whether there are realistic opportunities for your business.
    </p>
  `;

  // Objection Handling & Trust Bullets Block
  const trustBlockHtml = `
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 24px 0;">
      <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em;">Why founders book this call:</p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px;" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align: top; width: 20px; font-size: 14px; color: #059669; font-weight: bold; padding-bottom: 6px;">✓</td>
          <td style="vertical-align: top; font-size: 13px; color: #475569; padding-bottom: 6px; line-height: 1.4;">Review current B2B grant eligibility maps</td>
        </tr>
        <tr>
          <td style="vertical-align: top; width: 20px; font-size: 14px; color: #059669; font-weight: bold; padding-bottom: 6px;">✓</td>
          <td style="vertical-align: top; font-size: 13px; color: #475569; padding-bottom: 6px; line-height: 1.4;">Avoid missing application deadline windows</td>
        </tr>
        <tr>
          <td style="vertical-align: top; width: 20px; font-size: 14px; color: #059669; font-weight: bold; padding-bottom: 6px;">✓</td>
          <td style="vertical-align: top; font-size: 13px; color: #475569; padding-bottom: 6px; line-height: 1.4;">Identify programs that match upcoming projects</td>
        </tr>
        <tr>
          <td style="vertical-align: top; width: 20px; font-size: 14px; color: #059669; font-weight: bold;">✓</td>
          <td style="vertical-align: top; font-size: 13px; color: #475569; line-height: 1.4;">No obligation or filing pressure</td>
        </tr>
      </table>
      <p style="margin: 0; font-size: 12.5px; color: #64748b; line-height: 1.4; font-style: italic;">
        *Note: If it turns out there aren't any suitable programs for your business, I'll tell you that straight away. The goal is to help you make an informed decision—not to push you into an application.
      </p>
    </div>
  `;

  switch (stage) {
    case 'b2b_day1':
      let contextPhrase = '';
      if (telemetrySignal === 'calculator') {
        contextPhrase = `Thanks for checking your B2B grant eligibility on FSI Digital. I noticed you didn't get a chance to complete the final review step on our calculator in ${regionName}.`;
      } else if (telemetrySignal === 'pdf') {
        contextPhrase = `Thanks for downloading our B2B grant guide. I hope the regional hiring incentives section was useful for your project planning in ${regionName}.`;
      } else {
        contextPhrase = `Thanks for requesting your grant eligibility assessment on FSI Digital for your business in ${regionName}.`;
      }

      const coreOffering = isTech 
        ? 'stacking both the **IRAP R&D Grant** (offsetting engineer salaries) and local scientific experimental tax credits'
        : isMfg 
          ? 'leveraging regional green manufacturing transition funds and machinery acquisition capital grants'
          : 'leveraging hiring subsidies and local digital transformation grants';

      return {
        subject: 'A quick follow-up on your assessment',
        text: `Hi ${firstName},\n\n${contextPhrase.replace(/<[^>]*>/g, '')}\n\nBased on the information you shared, I believe there are a few funding opportunities worth discussing before your next hiring or product development milestone (such as ${coreOffering}).\n\nI have prepared a quick eligibility diagnostic outlining your top open programs. Let me know if you have 10 minutes next week to review: ${bookingUrl}\n\nBest,\nAshwani Kumar\nFounder, FSI Digital`,
        html: wrapB2BEmailTemplate(`
          <p style="margin: 0 0 16px 0;">${contextPhrase}</p>
          <p style="margin: 0 0 16px 0;">Based on the information you shared, I believe there are a few funding opportunities worth discussing before your next hiring or product development milestone (such as <strong>${coreOffering}</strong>).</p>
          <p style="margin: 0 0 20px 0;">Let's schedule a brief strategy call to review these options and see what programs are currently accepting applications.</p>
          
          ${trustBlockHtml}
          ${credibilityBlockHtml}

          <div style="margin: 24px 0; text-align: left;">
            <a href="${bookingUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:#059669;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.15);">Review My B2B Eligibility</a>
          </div>
        `, firstName, unsubscribeUrl),
      };

    case 'b2b_day4':
      const caseStudyText = isTech 
        ? 'A software company in Ontario reduced its R&D costs by combining two funding programs before starting development. The important part wasn\'t the amount received—it was applying before expenses were incurred.'
        : 'An industrial operator offset 40% of their machinery acquisition costs by submitting applications before ordering new equipment. That\'s why timing matters.';

      return {
        subject: 'Funding case study: Stacking regional grants',
        text: `Hi ${firstName},\n\nFollowing up on my previous message. I wanted to share a quick example of how B2B companies in ${regionName} stack regional grants:\n\n${caseStudyText}\n\nBy planning applications before starting projects, founders can offset substantial developer and equipment costs without leaving money on the table. Let's run a quick projection for your team. Book a slot here: ${bookingUrl}\n\nBest,\nAshwani Kumar\nFounder, FSI Digital`,
        html: wrapB2BEmailTemplate(`
          <p style="margin: 0 0 16px 0;">I wanted to share a quick example of how B2B companies stack regional grants:</p>
          
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 20px 0; font-size: 14px; color: #475569; line-height: 1.6;">
            <strong style="color: #0f172a; display: block; margin-bottom: 6px;">Timing is Everything:</strong>
            ${caseStudyText}
          </div>

          <p style="margin: 0 0 20px 0;">By planning applications before starting projects, you can avoid leaving money on the table. Let's run a quick eligibility projection for your team to identify similar opportunities.</p>
          
          ${trustBlockHtml}
          ${credibilityBlockHtml}

          <div style="margin: 24px 0; text-align: left;">
            <a href="${bookingUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:#059669;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.15);">Schedule My Funding Review</a>
          </div>
        `, firstName, unsubscribeUrl),
      };

    case 'b2b_day7':
      return {
        subject: 'Should I close your funding diagnostic file?',
        text: `Hi ${firstName},\n\nWe haven't heard back regarding your grant eligibility assessment.\n\nWe're planning next week's advisory schedule. If this isn't a priority right now, no problem. Otherwise, let me know before we close this round of consultations.\n\nYou can book your slot here: ${bookingUrl}\n\nBest,\nAshwani Kumar\nFounder, FSI Digital`,
        html: wrapB2BEmailTemplate(`
          <p style="margin: 0 0 16px 0;">We haven't heard back regarding your grant eligibility assessment.</p>
          <p style="margin: 0 0 16px 0;">We're currently planning next week's B2B advisory schedule. If this isn't a priority for your business right now, no problem at all.</p>
          <p style="margin: 0 0 20px 0;">Otherwise, please let me know before we close this round of consultations so I can save your slot on our calendar:</p>
          
          ${trustBlockHtml}
          ${credibilityBlockHtml}

          <div style="margin: 24px 0; text-align: left;">
            <a href="${bookingUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:#dc2626;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;box-shadow:0 4px 6px -1px rgba(220,38,38,0.15);">Claim My Strategy Session</a>
          </div>
        `, firstName, unsubscribeUrl),
      };
  }
}
