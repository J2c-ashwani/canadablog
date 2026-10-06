/**
 * FSI Digital — High-Intent Phone Lead Dispatcher
 *
 * Implements the CEO Operating Directive:
 * High-intent lead with phone -> Immediate Founder Hotline Email Alert to ashwani@fsidigital.ca
 * No unconsented automated robotic calls. Enables the Founder to directly call and close the deal.
 */

import { sendEmail } from '@/lib/emails/mailer';
import { CommercialActionTracker, generateActionId } from '@/lib/ceo-agent/ledger/action-tracker';

export interface VoiceLeadPayload {
  name?: string;
  phone: string;
  email: string;
  companyName?: string;
  state?: string;
  country?: string;
  industry?: string;
  fundingAmount?: string;
  fundingPurpose?: string;
  score?: number;
  tier?: string;
  source?: string;
  pagePath?: string;
}

export async function triggerVoiceCallingAgent(lead: VoiceLeadPayload): Promise<{ success: boolean; dispatchedTo?: string; reason?: string }> {
  // If phone is missing or marked "Not provided" or "N/A", skip
  if (!lead.phone || lead.phone === "Not provided" || lead.phone === "N/A" || lead.phone.trim().length < 7) {
    return { success: false, reason: "No valid phone number provided" };
  }

  const founderEmail = process.env.CEO_REPORT_EMAIL || 'ashwani@fsidigital.ca';
  const actionId = generateActionId('Sales');

  try {
    console.log(`📞 [Hot Lead Alert] Dispatching immediate founder alert for ${lead.phone} (${lead.name || 'Founder'})...`);

    const subject = `🚨 HOT LEAD PHONE ALERT: ${lead.name || 'Founder'} (${lead.companyName || 'Business'}) — Phone: ${lead.phone}`;
    const html = `
      <div style="font-family:Arial,sans-serif;padding:20px;border:1px solid #e2e8f0;border-radius:8px;max-width:600px;background:#ffffff;">
        <div style="background:#dc2626;color:#ffffff;padding:8px 16px;border-radius:4px;font-weight:bold;margin-bottom:16px;">
          HOT PHONE INTAKE — IMMEDIATE CALL RECOMMENDED
        </div>
        <h2 style="color:#0f172a;margin-top:0;">Founder Intake with Phone Number</h2>
        <p>A Canadian founder provided their direct phone number while completing a funding assessment:</p>
        
        <table style="width:100%;border-collapse:collapse;margin:16px 0;background:#f8fafc;border-radius:6px;overflow:hidden;">
          <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Founder Name:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;font-weight:bold;">${lead.name || 'Founder'}</td></tr>
          <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Phone Number:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;"><a href="tel:${lead.phone}" style="font-size:18px;font-weight:bold;color:#2563eb;">${lead.phone}</a></td></tr>
          <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Email:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
          <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Company:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;">${lead.companyName || 'N/A'}</td></tr>
          <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Funding Goal:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;font-weight:bold;color:#16a34a;">${lead.fundingAmount || 'Unspecified'}</td></tr>
          <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Funding Purpose:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;">${lead.fundingPurpose || 'General Expansion'}</td></tr>
          <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Province / Industry:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;">${lead.state || 'Canada'} / ${lead.industry || 'General'}</td></tr>
          <tr><td style="padding:10px;font-weight:bold;color:#475569;">Readiness Score:</td><td style="padding:10px;">${lead.score || 'N/A'}/100</td></tr>
        </table>

        <div style="background:#eff6ff;padding:12px;border-radius:6px;border-left:4px solid #2563eb;margin-top:16px;">
          <strong>Suggested Action:</strong> Call within 5-15 minutes while the founder is active. Pitch the $79 Complete Capital Stacking Toolkit or the $199 Strategy Session.
        </div>

        <p style="font-size:12px;color:#94a3b8;margin-top:20px;">
          Action ID: ${actionId} &bull; Generated autonomously by FSI Sales Agent
        </p>
      </div>
    `;

    const result = await sendEmail({
      to: founderEmail,
      subject,
      html,
      text: `Hot Phone Lead: ${lead.name || 'Founder'} (${lead.phone}) from ${lead.companyName || 'Business'} requested ${lead.fundingAmount || 'funding'}. Call them directly at ${lead.phone}.`,
      tagType: 'founder-hot-lead-alert',
    });

    if (result.success) {
      await CommercialActionTracker.recordAction({
        actionId,
        agent: 'Sales',
        trigger: `Phone number intake (${lead.phone})`,
        leadId: lead.email,
        leadEmail: lead.email,
        leadName: lead.name,
        company: lead.companyName,
        action: `Founder Direct Call Alert (${lead.phone})`,
        product: 'High-Ticket Strategy Advisory ($199 / $79 Bundle)',
        channel: 'Internal Alert',
        consent: 'Transactional',
        status: 'DISPATCHED',
        result: 'DELIVERED',
        revenueUSD: 79,
        attribution: 'FOUNDER_PHONE_HOTLINE',
        timestamp: new Date().toISOString(),
        providerMessageId: result.providerMessageId,
      });

      return { success: true, dispatchedTo: "founder_alert" };
    }

    return { success: false, reason: result.error || 'Failed to dispatch alert' };
  } catch (err: any) {
    console.error("❌ [Hot Lead Alert] Error dispatching alert:", err);
    return { success: false, reason: err.message };
  }
}
