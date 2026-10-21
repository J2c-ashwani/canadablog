import { sendEmail, escapeHtml } from '@/lib/emails/mailer';
import {
  PublishingInquiry,
  PublishingOrder,
  PublishingBrief,
} from '@/lib/advertising/config';

const ADMIN_EMAIL = process.env.RESEND_REPLY_TO_EMAIL || 'ashwani@fsidigital.ca';
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca').replace(/\/$/, '');

/**
 * Sends confirmation receipt to an advertising prospect who submitted an inquiry.
 */
export async function sendPublishingInquiryReceipt(inquiry: PublishingInquiry): Promise<void> {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; background-color: #ffffff;">
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px;">
        <span style="font-size: 20px; font-weight: 700; color: #0f172a; letter-spacing: -0.5px;">FSI Digital</span>
        <span style="font-size: 13px; color: #64748b; margin-left: 8px;">Editorial & Publishing</span>
      </div>

      <h2 style="font-size: 22px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 16px;">We have received your publishing proposal</h2>
      <p style="font-size: 15px; line-height: 1.6; color: #334155;">Hello ${escapeHtml(inquiry.name)},</p>
      <p style="font-size: 15px; line-height: 1.6; color: #334155;">
        Thank you for submitting your inquiry to publish on <strong>FSI Digital</strong>. Our editorial team reviews every proposal to ensure fit with our audience of founders, corporate executives, and technology innovators.
      </p>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 24px 0;">
        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-top: 0; margin-bottom: 12px;">Inquiry Summary</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #64748b; width: 140px;">Company:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #0f172a;">${escapeHtml(inquiry.companyName)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Package Selected:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #0f172a;">${escapeHtml(inquiry.packageInterest)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Topic / Angle:</td>
            <td style="padding: 6px 0; color: #0f172a;">${escapeHtml(inquiry.topicAngle)}</td>
          </tr>
          ${inquiry.destinationUrl ? `
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Target Destination:</td>
            <td style="padding: 6px 0; color: #0f172a;"><a href="${escapeHtml(inquiry.destinationUrl)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(inquiry.destinationUrl)}</a></td>
          </tr>` : ''}
          ${inquiry.timeline ? `
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Desired Timeline:</td>
            <td style="padding: 6px 0; color: #0f172a;">${escapeHtml(inquiry.timeline)}</td>
          </tr>` : ''}
        </table>
      </div>

      <h4 style="font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 8px;">What Happens Next?</h4>
      <ol style="font-size: 14px; line-height: 1.6; color: #475569; padding-left: 20px; margin-top: 0;">
        <li style="margin-bottom: 6px;">An editor will evaluate your proposed topic against our editorial calendar and publishing guidelines.</li>
        <li style="margin-bottom: 6px;">We will confirm acceptance, suggest any angle adjustments, and provide scheduling details within <strong>1 business day</strong>.</li>
        <li style="margin-bottom: 6px;">If you have immediate questions, simply reply directly to this email.</li>
      </ol>

      <div style="border-top: 1px solid #e2e8f0; margin-top: 32px; padding-top: 16px; font-size: 12px; color: #94a3b8; line-height: 1.5;">
        <p style="margin: 0;">FSI Digital • Commercial Intelligence & Business Publishing</p>
        <p style="margin: 4px 0 0 0;">Strict Editorial Standards: Transparent disclosures apply to all commercial content. Outbound links are marked rel="sponsored".</p>
      </div>
    </div>
  `;

  await sendEmail({
    to: inquiry.email,
    subject: `Publishing Proposal Received: ${inquiry.companyName} — FSI Digital Editorial`,
    html,
    text: `Hello ${inquiry.name},\n\nWe received your publishing inquiry for ${inquiry.companyName}. Our editorial team will review your proposal and reply within 1 business day.\n\nFSI Digital Editorial`,
    tagType: 'advertising-inquiry-receipt',
    companyName: inquiry.companyName,
  });
}

/**
 * Sends internal team alert for a new publishing inquiry.
 */
export async function sendPublishingInquiryAdminAlert(inquiry: PublishingInquiry): Promise<void> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px;">
      <h2 style="color: #0f172a; margin-top: 0;">🎯 New Publishing Inquiry Received</h2>
      <p style="font-size: 14px; color: #334155;">A new advertiser has submitted an inquiry on <code>/advertise/contact</code>.</p>
      
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; background: #fff; border-radius: 6px; padding: 12px; border: 1px solid #e2e8f0;">
        <tr><td style="padding: 8px; font-weight: bold; width: 140px;">Prospect:</td><td style="padding: 8px;">${escapeHtml(inquiry.name)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Work Email:</td><td style="padding: 8px;"><a href="mailto:${escapeHtml(inquiry.email)}">${escapeHtml(inquiry.email)}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Company:</td><td style="padding: 8px;">${escapeHtml(inquiry.companyName)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Website:</td><td style="padding: 8px;"><a href="${escapeHtml(inquiry.website)}" target="_blank">${escapeHtml(inquiry.website)}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Package:</td><td style="padding: 8px; font-weight: bold; color: #2563eb;">${escapeHtml(inquiry.packageInterest)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Topic / Angle:</td><td style="padding: 8px;">${escapeHtml(inquiry.topicAngle)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Destination URL:</td><td style="padding: 8px;">${escapeHtml(inquiry.destinationUrl || 'None')}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Timeline:</td><td style="padding: 8px;">${escapeHtml(inquiry.timeline || 'Flexible')}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Budget:</td><td style="padding: 8px;">${escapeHtml(inquiry.budget || 'Not specified')}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Notes:</td><td style="padding: 8px;">${escapeHtml(inquiry.notes || 'None')}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Lead Score:</td><td style="padding: 8px; font-weight: bold; color: #16a34a;">${inquiry.score || 0} / 100</td></tr>
      </table>

      <p style="margin-top: 16px; font-size: 13px; color: #64748b;">
        Saved to Google Sheets tab <strong>Publishing Inquiries</strong>.
      </p>
    </div>
  `;

  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `[Publishing Inquiry] ${inquiry.companyName} - ${inquiry.packageInterest} (Score: ${inquiry.score || 0})`,
    html,
    text: `New publishing inquiry from ${inquiry.name} (${inquiry.companyName}) for package: ${inquiry.packageInterest}. Email: ${inquiry.email}`,
    tagType: 'advertising-inquiry-alert',
    companyName: inquiry.companyName,
  });
}

/**
 * Sends order receipt and post-purchase brief unlock link to a customer who purchased DFY package.
 */
export async function sendPublishingOrderConfirmation(order: PublishingOrder, briefUrl: string): Promise<void> {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; background-color: #ffffff;">
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px;">
        <span style="font-size: 20px; font-weight: 700; color: #0f172a; letter-spacing: -0.5px;">FSI Digital</span>
        <span style="font-size: 13px; color: #64748b; margin-left: 8px;">Order Confirmation</span>
      </div>

      <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <p style="margin: 0; color: #065f46; font-size: 15px; font-weight: 600;">
          Payment Confirmed — $${escapeHtml(order.amountUsd)} USD
        </p>
        <p style="margin: 4px 0 0 0; color: #047857; font-size: 13px;">
          Order ID: <code>${escapeHtml(order.orderId)}</code>
        </p>
      </div>

      <h2 style="font-size: 22px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 16px;">Next Step: Complete Your Editorial Brief</h2>
      <p style="font-size: 15px; line-height: 1.6; color: #334155;">Hello ${escapeHtml(order.buyerName)},</p>
      <p style="font-size: 15px; line-height: 1.6; color: #334155;">
        Thank you for choosing FSI Digital for your <strong>Done-for-You Sponsored Article</strong>. To begin drafting your piece, please complete our 5-minute editorial questionnaire so our research and writing team can tailor the content to your objectives.
      </p>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${escapeHtml(briefUrl)}" style="background-color: #2563eb; color: #ffffff; padding: 14px 28px; font-size: 16px; font-weight: 600; border-radius: 6px; text-decoration: none; display: inline-block; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);">
          Open My Editorial Brief &rarr;
        </a>
      </div>

      <p style="font-size: 13px; color: #64748b; text-align: center; margin-top: -16px; margin-bottom: 24px;">
        Or copy this secure link into your browser:<br/>
        <span style="word-break: break-all; color: #2563eb;">${escapeHtml(briefUrl)}</span>
      </p>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 24px 0;">
        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-top: 0; margin-bottom: 12px;">What Happens Next?</h3>
        <ol style="font-size: 14px; line-height: 1.6; color: #475569; padding-left: 20px; margin: 0;">
          <li style="margin-bottom: 6px;"><strong>Brief Submission:</strong> Submit your brand background, preferred topics, and destination links.</li>
          <li style="margin-bottom: 6px;"><strong>Drafting (3–5 Days):</strong> Our editorial team crafts an authoritative 1,200–1,500 word article.</li>
          <li style="margin-bottom: 6px;"><strong>Review &amp; Approval:</strong> You review the private draft on your portal. 1 round of revisions is included.</li>
          <li style="margin-bottom: 6px;"><strong>Publication:</strong> Once approved and authorized by the editorial desk, the article goes live with guaranteed active hosting for at least 12 months.</li>
        </ol>
      </div>

      <div style="border-top: 1px solid #e2e8f0; margin-top: 32px; padding-top: 16px; font-size: 12px; color: #94a3b8; line-height: 1.5;">
        <p style="margin: 0;">FSI Digital • Commercial Intelligence & Business Publishing</p>
        <p style="margin: 4px 0 0 0;">Questions about your order? Reach out directly to <a href="mailto:${ADMIN_EMAIL}" style="color: #2563eb;">${ADMIN_EMAIL}</a>.</p>
      </div>
    </div>
  `;

  await sendEmail({
    to: order.buyerEmail,
    subject: `Order Confirmed: Done-for-You Sponsored Article — Submit Your Editorial Brief (Order #${order.orderId.slice(-8)})`,
    html,
    text: `Hello ${order.buyerName},\n\nYour payment of $${order.amountUsd} USD for the Done-for-You Sponsored Article is confirmed (Order ID: ${order.orderId}).\n\nPlease submit your editorial brief to begin drafting:\n${briefUrl}\n\nFSI Digital Editorial Team`,
    tagType: 'advertising-order-receipt',
    companyName: order.companyName,
  });
}

/**
 * Sends internal team alert for a paid DFY order.
 */
export async function sendPublishingOrderAdminAlert(order: PublishingOrder): Promise<void> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; background-color: #f0fdf4; border: 1px solid #86efac; border-radius: 8px;">
      <h2 style="color: #15803d; margin-top: 0;">💰 Paid Publishing Order Received ($225 USD)</h2>
      <p style="font-size: 14px; color: #166534;">PayPal order payment verified and captured successfully.</p>
      
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; background: #fff; border-radius: 6px; padding: 12px; border: 1px solid #bbf7d0;">
        <tr><td style="padding: 8px; font-weight: bold; width: 140px;">Order ID:</td><td style="padding: 8px;"><code>${escapeHtml(order.orderId)}</code></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Amount:</td><td style="padding: 8px; font-weight: bold; color: #15803d;">$${escapeHtml(order.amountUsd)} USD</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Buyer:</td><td style="padding: 8px;">${escapeHtml(order.buyerName)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${escapeHtml(order.buyerEmail)}">${escapeHtml(order.buyerEmail)}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Company:</td><td style="padding: 8px;">${escapeHtml(order.companyName)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Website:</td><td style="padding: 8px;"><a href="${escapeHtml(order.website)}" target="_blank">${escapeHtml(order.website)}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Status:</td><td style="padding: 8px;"><code>${escapeHtml(order.status)}</code></td></tr>
      </table>

      <p style="margin-top: 16px; font-size: 13px; color: #475569;">
        The customer has been emailed the link to submit their post-purchase questionnaire. Once submitted, you will receive the full brief via email.
      </p>
    </div>
  `;

  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `💰 [New Order: $225 USD] ${order.companyName} (${order.buyerName})`,
    html,
    text: `New paid publishing order ($225 USD) from ${order.buyerName} (${order.companyName}). Order ID: ${order.orderId}`,
    tagType: 'advertising-order-admin-alert',
    companyName: order.companyName,
  });
}

/**
 * Sends confirmation to customer when their post-purchase brief is submitted.
 */
export async function sendPublishingBriefConfirmation(order: PublishingOrder, statusUrl: string): Promise<void> {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; background-color: #ffffff;">
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px;">
        <span style="font-size: 20px; font-weight: 700; color: #0f172a; letter-spacing: -0.5px;">FSI Digital</span>
        <span style="font-size: 13px; color: #64748b; margin-left: 8px;">Brief Received</span>
      </div>

      <h2 style="font-size: 22px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 16px;">Your Editorial Brief is in Production</h2>
      <p style="font-size: 15px; line-height: 1.6; color: #334155;">Hello ${escapeHtml(order.buyerName)},</p>
      <p style="font-size: 15px; line-height: 1.6; color: #334155;">
        We have received your completed editorial brief for <strong>${escapeHtml(order.companyName)}</strong>. Our editorial team has commenced research and drafting.
      </p>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 24px 0;">
        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-top: 0; margin-bottom: 8px;">Turnaround Schedule</h3>
        <p style="font-size: 14px; color: #334155; margin: 0 0 8px 0;">
          <strong>Target Draft Delivery:</strong> 3 to 5 business days
        </p>
        <p style="font-size: 13px; color: #64748b; margin: 0;">
          You will receive an email as soon as your draft is uploaded to your private portal for review.
        </p>
      </div>

      <div style="text-align: center; margin: 24px 0;">
        <a href="${escapeHtml(statusUrl)}" style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; font-size: 14px; font-weight: 600; border-radius: 6px; text-decoration: none; display: inline-block;">
          Track Production Status &rarr;
        </a>
      </div>

      <div style="border-top: 1px solid #e2e8f0; margin-top: 32px; padding-top: 16px; font-size: 12px; color: #94a3b8; line-height: 1.5;">
        <p style="margin: 0;">FSI Digital • Commercial Intelligence & Business Publishing</p>
      </div>
    </div>
  `;

  await sendEmail({
    to: order.buyerEmail,
    subject: `Editorial Brief Received: ${order.companyName} is in Production — FSI Digital`,
    html,
    text: `Hello ${order.buyerName},\n\nYour editorial brief for ${order.companyName} has been received and is now in production. Your draft will be ready in 3-5 business days.\n\nTrack status: ${statusUrl}\n\nFSI Digital Editorial`,
    tagType: 'advertising-brief-received',
    companyName: order.companyName,
  });
}

/**
 * Sends internal team alert containing the full brief submission.
 */
export async function sendPublishingBriefAdminAlert(order: PublishingOrder, brief: PublishingBrief): Promise<void> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 650px; padding: 20px; background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px;">
      <h2 style="color: #0f172a; margin-top: 0;">📝 Editorial Brief Submitted: Ready to Draft</h2>
      <p style="font-size: 14px; color: #334155;">Client <strong>${escapeHtml(order.companyName)}</strong> (${escapeHtml(order.buyerName)}) has submitted their brief.</p>

      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin-bottom: 16px;">
        <h3 style="font-size: 14px; color: #2563eb; margin-top: 0;">Section A: Brand Background</h3>
        <p style="font-size: 13px; margin: 4px 0;"><strong>Legal Company:</strong> ${escapeHtml(brief.legalCompanyName)}</p>
        <p style="font-size: 13px; margin: 4px 0;"><strong>Brand Name:</strong> ${escapeHtml(brief.brandName)}</p>
        <p style="font-size: 13px; margin: 4px 0;"><strong>Overview:</strong> ${escapeHtml(brief.companyOverview)}</p>
        <p style="font-size: 13px; margin: 4px 0;"><strong>Target Customers:</strong> ${escapeHtml(brief.targetCustomers)}</p>
        <p style="font-size: 13px; margin: 4px 0;"><strong>Value Proposition:</strong> ${escapeHtml(brief.valueProposition)}</p>
      </div>

      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin-bottom: 16px;">
        <h3 style="font-size: 14px; color: #2563eb; margin-top: 0;">Section B: Core Message & Goals</h3>
        <p style="font-size: 13px; margin: 4px 0;"><strong>Primary Goal:</strong> ${escapeHtml(brief.primaryGoal)}</p>
        <p style="font-size: 13px; margin: 4px 0;"><strong>Core Message:</strong> ${escapeHtml(brief.coreMessage)}</p>
        <p style="font-size: 13px; margin: 4px 0;"><strong>Target Keywords:</strong> ${escapeHtml(brief.targetKeywords)}</p>
        ${brief.referenceArticles ? `<p style="font-size: 13px; margin: 4px 0;"><strong>References:</strong> ${escapeHtml(brief.referenceArticles)}</p>` : ''}
      </div>

      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin-bottom: 16px;">
        <h3 style="font-size: 14px; color: #2563eb; margin-top: 0;">Section C: Article Specifications</h3>
        <p style="font-size: 13px; margin: 4px 0;"><strong>Audience Seniority:</strong> ${escapeHtml(brief.audienceSeniority)}</p>
        <p style="font-size: 13px; margin: 4px 0;"><strong>Voice / Tone:</strong> ${escapeHtml(brief.voiceAndTone)}</p>
        ${brief.suggestedHeadlines ? `<p style="font-size: 13px; margin: 4px 0;"><strong>Suggested Headlines:</strong> ${escapeHtml(brief.suggestedHeadlines)}</p>` : ''}
        <p style="font-size: 13px; margin: 4px 0;"><strong>Must Include:</strong> ${escapeHtml(brief.keyPointsToInclude)}</p>
      </div>

      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin-bottom: 16px;">
        <h3 style="font-size: 14px; color: #2563eb; margin-top: 0;">Section D: Outbound Links & CTAs (rel="sponsored")</h3>
        <p style="font-size: 13px; margin: 4px 0;"><strong>Primary Link:</strong> <a href="${escapeHtml(brief.primaryUrl)}">${escapeHtml(brief.primaryUrl)}</a> (${escapeHtml(brief.primaryAnchorText)})</p>
        ${brief.secondaryUrl ? `<p style="font-size: 13px; margin: 4px 0;"><strong>Secondary Link:</strong> <a href="${escapeHtml(brief.secondaryUrl)}">${escapeHtml(brief.secondaryUrl)}</a> (${escapeHtml(brief.secondaryAnchorText || 'N/A')})</p>` : ''}
        <p style="font-size: 13px; margin: 4px 0;"><strong>Reader CTA:</strong> ${escapeHtml(brief.readerCtaText)}</p>
      </div>

      <p style="font-size: 12px; color: #64748b;">
        Order ID: <code>${escapeHtml(order.orderId)}</code> • Logged to Google Sheets tab <strong>Publishing Briefs</strong>.
      </p>
    </div>
  `;

  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `📝 [Brief Submitted] ${order.companyName} - Ready for Drafting`,
    html,
    text: `Client ${order.companyName} submitted their brief for Order ID ${order.orderId}. Primary Link: ${brief.primaryUrl}`,
    tagType: 'advertising-brief-admin-alert',
    companyName: order.companyName,
  });
}

/**
 * Alerts team when a customer requests a revision on their draft.
 */
export async function sendPublishingRevisionRequestAlert(order: PublishingOrder, revisionNotes: string): Promise<void> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 8px;">
      <h2 style="color: #92400e; margin-top: 0;">🔄 Revision Requested: ${escapeHtml(order.companyName)}</h2>
      <p style="font-size: 14px; color: #78350f;">The client has reviewed the draft and submitted revision feedback.</p>

      <div style="background: #ffffff; border: 1px solid #fed7aa; border-radius: 6px; padding: 14px; margin: 16px 0; font-size: 14px; color: #1e293b; white-space: pre-wrap;">
${escapeHtml(revisionNotes)}
      </div>

      <p style="font-size: 13px; color: #451a03;">
        Order ID: <code>${escapeHtml(order.orderId)}</code> • Draft Title: ${escapeHtml(order.draftTitle || 'N/A')}
      </p>
    </div>
  `;

  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `🔄 [Revision Requested] ${order.companyName} - ${order.draftTitle || 'Article'}`,
    html,
    text: `Client ${order.companyName} requested revisions on order ${order.orderId}.\n\nFeedback:\n${revisionNotes}`,
    tagType: 'advertising-revision-requested',
    companyName: order.companyName,
  });
}
