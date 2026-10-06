/**
 * FSI Digital — AI Voice Calling Agent & Outbound Phone Dispatcher
 *
 * Implements automated outbound AI calling for high-intent leads who provide a phone number:
 * 1. Outbound telephony dispatch via Vapi.ai or Bland.ai (when API keys are present)
 * 2. External webhook routing (Make.com, n8n, Retell AI)
 * 3. Simultaneous Founder Hotline Email Alert to ashwani@fsidigital.ca
 * 4. Autonomous action logging in CEO Commercial Action Tracker
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

export async function triggerVoiceCallingAgent(lead: VoiceLeadPayload): Promise<{
  success: boolean;
  dispatchedTo?: string;
  callId?: string;
  reason?: string;
}> {
  // If phone is missing or marked "Not provided" or "N/A", skip
  if (!lead.phone || lead.phone === 'Not provided' || lead.phone === 'N/A' || lead.phone.trim().length < 7) {
    return { success: false, reason: 'No valid phone number provided' };
  }

  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca').replace(/\/$/, '');
  const webhookCallbackUrl = `${baseUrl}/api/voice-agent/webhook`;
  const actionId = generateActionId('Sales');

  let telephonyDispatched = false;
  let callId: string | undefined;

  // ── 1. Telephony Dispatch: Vapi.ai ──
  const vapiApiKey = process.env.VAPI_API_KEY;
  const vapiAssistantId = process.env.VAPI_ASSISTANT_ID;
  const vapiPhoneNumberId = process.env.VAPI_PHONE_NUMBER_ID;

  if (vapiApiKey && vapiAssistantId && vapiPhoneNumberId) {
    try {
      console.log(`📞 [Voice Calling Agent] Initiating automated Vapi call to ${lead.phone} (${lead.name || 'Founder'})...`);

      const vapiRes = await fetch('https://api.vapi.ai/call/phone', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${vapiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assistantId: vapiAssistantId,
          phoneNumberId: vapiPhoneNumberId,
          customer: {
            number: lead.phone,
            name: lead.name || 'Founder',
          },
          serverUrl: webhookCallbackUrl,
          assistantOverrides: {
            variableValues: {
              name: lead.name || 'Founder',
              companyName: lead.companyName || 'your company',
              email: lead.email,
              phone: lead.phone,
              state: lead.state || 'Canada',
              industry: lead.industry || 'General',
              fundingPurpose: lead.fundingPurpose || 'Growth and Innovation Funding',
              fundingAmount: lead.fundingAmount || 'N/A',
              score: lead.score ? String(lead.score) : 'N/A',
              tier: lead.tier || 'Standard',
              source: lead.source || 'Grant Calculator Intake',
              actionId,
            },
          },
        }),
      });

      if (vapiRes.ok) {
        const vapiData = await vapiRes.json().catch(() => ({}));
        callId = vapiData.id || `VAPI-${Date.now()}`;
        telephonyDispatched = true;
        console.log(`✅ [Voice Calling Agent] Vapi call successfully queued. Call ID: ${callId}`);
      } else {
        const errText = await vapiRes.text().catch(() => '');
        console.warn(`⚠️ [Voice Calling Agent] Vapi call returned ${vapiRes.status}:`, errText);
      }
    } catch (vapiErr: any) {
      console.error('❌ [Voice Calling Agent] Error invoking Vapi API:', vapiErr);
    }
  }

  // ── 2. Telephony Dispatch: Bland.ai ──
  const blandApiKey = process.env.BLAND_API_KEY;
  if (!telephonyDispatched && blandApiKey) {
    try {
      console.log(`📞 [Voice Calling Agent] Initiating Bland.ai call to ${lead.phone}...`);

      const blandRes = await fetch('https://api.bland.ai/v1/calls', {
        method: 'POST',
        headers: {
          'Authorization': blandApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: lead.phone,
          task: `Qualify ${lead.name || 'Founder'} from ${lead.companyName || 'the business'} for Canadian non-dilutive government funding. Pitch the $79 Complete Funding Blueprint. Offer to email them the direct payment link.`,
          webhook: webhookCallbackUrl,
          request_data: {
            email: lead.email,
            name: lead.name || 'Founder',
            companyName: lead.companyName || 'Your Business',
            province: lead.state || 'Canada',
            fundingAmount: lead.fundingAmount || 'N/A',
            actionId,
          },
        }),
      });

      if (blandRes.ok) {
        const blandData = await blandRes.json().catch(() => ({}));
        callId = blandData.call_id || `BLAND-${Date.now()}`;
        telephonyDispatched = true;
        console.log(`✅ [Voice Calling Agent] Bland call queued. Call ID: ${callId}`);
      } else {
        const errText = await blandRes.text().catch(() => '');
        console.warn(`⚠️ [Voice Calling Agent] Bland call failed (${blandRes.status}):`, errText);
      }
    } catch (blandErr: any) {
      console.error('❌ [Voice Calling Agent] Error invoking Bland API:', blandErr);
    }
  }

  // ── 3. External Webhook (Make.com / n8n / Zapier) ──
  const webhookUrl = process.env.VOICE_AGENT_WEBHOOK_URL;
  if (!telephonyDispatched && webhookUrl) {
    try {
      console.log(`📞 [Voice Calling Agent] Forwarding lead to voice webhook ${webhookUrl}...`);
      const hookRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          actionId,
          webhookCallbackUrl,
          lead,
        }),
      });
      if (hookRes.ok) {
        telephonyDispatched = true;
        callId = `HOOK-${Date.now()}`;
        console.log(`✅ [Voice Calling Agent] Lead forwarded to external voice webhook.`);
      }
    } catch (hookErr: any) {
      console.error('❌ [Voice Calling Agent] Error calling voice webhook:', hookErr);
    }
  }

  // ── 4. Founder Hotline Email Alert (Always Dispatched for Real-Time Notification) ──
  const founderEmail = process.env.CEO_REPORT_EMAIL || 'ashwani@fsidigital.ca';
  try {
    const subject = `🚨 HOT LEAD PHONE INTAKE: ${lead.name || 'Founder'} (${lead.companyName || 'Business'}) — Phone: ${lead.phone}`;
    const html = `
      <div style="font-family:Arial,sans-serif;padding:20px;border:1px solid #e2e8f0;border-radius:8px;max-width:600px;background:#ffffff;">
        <div style="background:#dc2626;color:#ffffff;padding:8px 16px;border-radius:4px;font-weight:bold;margin-bottom:16px;">
          HOT PHONE INTAKE — ${telephonyDispatched ? 'AI CALL TRIGGERED' : 'DIRECT FOUNDER CALL RECOMMENDED'}
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
          <strong>Suggested Pitch:</strong> $79 Complete Capital Stacking Toolkit or $199 Strategy Session with credited filing deposit.
        </div>

        <p style="font-size:12px;color:#94a3b8;margin-top:20px;">
          Action ID: ${actionId} &bull; Generated autonomously by FSI Sales Agent
        </p>
      </div>
    `;

    const alertResult = await sendEmail({
      to: founderEmail,
      subject,
      html,
      text: `Hot Phone Lead: ${lead.name || 'Founder'} (${lead.phone}) from ${lead.companyName || 'Business'} requested ${lead.fundingAmount || 'funding'}. Call directly at ${lead.phone}.`,
      tagType: 'founder-hot-lead-alert',
    });

    await CommercialActionTracker.recordAction({
      actionId,
      agent: 'Sales',
      trigger: `Phone number intake (${lead.phone})`,
      leadId: lead.email,
      leadEmail: lead.email,
      leadName: lead.name,
      company: lead.companyName,
      action: telephonyDispatched
        ? `AI Voice Call Queued (${lead.phone})`
        : `Founder Direct Call Alert (${lead.phone})`,
      product: 'Complete Funding Blueprint ($79 / $199)',
      channel: telephonyDispatched ? 'Internal Alert' : 'Internal Alert',
      consent: 'Transactional',
      status: 'DISPATCHED',
      result: 'DELIVERED',
      revenueUSD: 79,
      attribution: telephonyDispatched ? 'AI_VOICE_OUTBOUND' : 'FOUNDER_PHONE_HOTLINE',
      timestamp: new Date().toISOString(),
      providerMessageId: alertResult.providerMessageId,
      details: {
        phone: lead.phone,
        telephonyDispatched,
        callId,
      },
    });

    return {
      success: true,
      dispatchedTo: telephonyDispatched ? 'telephony_and_founder_alert' : 'founder_alert',
      callId,
    };
  } catch (err: any) {
    console.error('❌ [Voice Calling Agent] Error dispatching alert:', err);
    return { success: false, reason: err.message };
  }
}
