/**
 * FSI Digital — AI Voice Calling Agent & Outbound Phone Dispatcher
 *
 * Implements bounded, consented AI voice calling and high-intent founder alerts:
 * 1. Hard kill switch guard: VOICE_AGENT_ENABLED=true required (dormant by default)
 * 2. Mandatory explicit AI-call consent (lead.consentToAiCall === true)
 * 3. E.164 phone normalization via lib/phone-validator
 * 4. Single-provider abstraction (VOICE_PROVIDER = 'vapi' | 'bland' | 'webhook')
 * 5. Founder Hotline Email Alert to ashwani@fsidigital.ca when contact is requested
 * 6. Action logging in CEO Commercial Action Tracker
 */

import { sendEmail } from '@/lib/emails/mailer';
import { CommercialActionTracker, generateActionId } from '@/lib/ceo-agent/ledger/action-tracker';
import { normalizeToE164 } from '@/lib/phone-validator';

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
  wantsAdvisorContact?: boolean;
  consentToAiCall?: boolean;
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

  // Normalize phone to E.164 format
  const e164Phone = normalizeToE164(lead.phone, lead.country || 'Canada') || lead.phone.trim();

  // Hard production kill switch: default dormant unless explicitly set to 'true'
  const isVoiceAgentEnabled = process.env.VOICE_AGENT_ENABLED === 'true';
  const hasAiCallConsent = Boolean(lead.consentToAiCall);
  const wantsContact = Boolean(lead.wantsAdvisorContact);

  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca').replace(/\/$/, '');
  const webhookCallbackUrl = `${baseUrl}/api/voice-agent/webhook`;
  const actionId = generateActionId('Sales');

  let telephonyDispatched = false;
  let callId: string | undefined;

  // ── 1. Telephony Dispatch (Strictly Guarded by Kill Switch and Explicit AI Call Consent) ──
  if (isVoiceAgentEnabled && hasAiCallConsent) {
    const selectedProvider = (process.env.VOICE_PROVIDER || 'vapi').toLowerCase();

    if (selectedProvider === 'vapi') {
      const vapiApiKey = process.env.VAPI_API_KEY;
      const vapiAssistantId = process.env.VAPI_ASSISTANT_ID;
      const vapiPhoneNumberId = process.env.VAPI_PHONE_NUMBER_ID;

      if (vapiApiKey && vapiAssistantId && vapiPhoneNumberId) {
        try {
          console.log(`📞 [Voice Calling Agent] Initiating automated Vapi call to ${e164Phone} (${lead.name || 'Founder'})...`);

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
                number: e164Phone,
                name: lead.name || 'Founder',
              },
              serverUrl: webhookCallbackUrl,
              assistantOverrides: {
                variableValues: {
                  name: lead.name || 'Founder',
                  companyName: lead.companyName || 'your company',
                  email: lead.email,
                  phone: e164Phone,
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
    } else if (selectedProvider === 'bland') {
      const blandApiKey = process.env.BLAND_API_KEY;
      if (blandApiKey) {
        try {
          console.log(`📞 [Voice Calling Agent] Initiating Bland.ai call to ${e164Phone}...`);

          const blandRes = await fetch('https://api.bland.ai/v1/calls', {
            method: 'POST',
            headers: {
              'Authorization': blandApiKey,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              phone_number: e164Phone,
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
    } else if (selectedProvider === 'webhook') {
      const webhookUrl = process.env.VOICE_AGENT_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          console.log(`📞 [Voice Calling Agent] Forwarding lead to voice webhook ${webhookUrl}...`);
          const hookRes = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              timestamp: new Date().toISOString(),
              actionId,
              phone: e164Phone,
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
    }
  } else if (!isVoiceAgentEnabled) {
    console.log(`ℹ️ [Voice Calling Agent] Voice agent is DORMANT (VOICE_AGENT_ENABLED is not 'true'). No automated outbound calls initiated.`);
  } else if (!hasAiCallConsent) {
    console.log(`ℹ️ [Voice Calling Agent] Lead did not grant explicit AI call consent. Automated call skipped.`);
  }

  // ── 2. Founder Hotline Email Alert (Triggered when prospect requests contact or high-intent phone provided) ──
  const founderEmail = process.env.CEO_REPORT_EMAIL || 'ashwani@fsidigital.ca';
  try {
    const shouldAlertFounder = wantsContact || hasAiCallConsent || (lead.score && lead.score >= 70);
    let alertSent = false;

    if (shouldAlertFounder) {
      const subject = `🚨 HOT LEAD PHONE INTAKE: ${lead.name || 'Founder'} (${lead.companyName || 'Business'}) — Phone: ${e164Phone}`;
      const html = `
        <div style="font-family:Arial,sans-serif;padding:20px;border:1px solid #e2e8f0;border-radius:8px;max-width:600px;background:#ffffff;">
          <div style="background:#dc2626;color:#ffffff;padding:8px 16px;border-radius:4px;font-weight:bold;margin-bottom:16px;">
            FOUNDER LEAD ALERT — ${telephonyDispatched ? 'AI CALL TRIGGERED' : 'DIRECT FOUNDER FOLLOW-UP OPTION'}
          </div>
          <h2 style="color:#0f172a;margin-top:0;">Founder Intake with Phone Number</h2>
          <p>A Canadian founder provided their direct phone number while completing a funding assessment:</p>
          
          <table style="width:100%;border-collapse:collapse;margin:16px 0;background:#f8fafc;border-radius:6px;overflow:hidden;">
            <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Founder Name:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;font-weight:bold;">${lead.name || 'Founder'}</td></tr>
            <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Phone Number:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;"><a href="tel:${e164Phone}" style="font-size:18px;font-weight:bold;color:#2563eb;">${e164Phone}</a></td></tr>
            <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Email:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
            <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Company:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;">${lead.companyName || 'N/A'}</td></tr>
            <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Funding Goal:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;font-weight:bold;color:#16a34a;">${lead.fundingAmount || 'Unspecified'}</td></tr>
            <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Funding Purpose:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;">${lead.fundingPurpose || 'General Expansion'}</td></tr>
            <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Province / Industry:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;">${lead.state || 'Canada'} / ${lead.industry || 'General'}</td></tr>
            <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Readiness Score:</td><td style="padding:10px;">${lead.score || 'N/A'}/100</td></tr>
            <tr><td style="padding:10px;font-weight:bold;color:#475569;">Contact Consent:</td><td style="padding:10px;">Advisor Contact: ${wantsContact ? 'Yes' : 'No'} | AI Call: ${hasAiCallConsent ? 'Yes' : 'No'}</td></tr>
          </table>

          <div style="background:#eff6ff;padding:12px;border-radius:6px;border-left:4px solid #2563eb;margin-top:16px;">
            <strong>Suggested Action:</strong> Review file. The user is in the self-serve funnel; manual outreach is at founder discretion.
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
        text: `Hot Phone Lead: ${lead.name || 'Founder'} (${e164Phone}) from ${lead.companyName || 'Business'} requested ${lead.fundingAmount || 'funding'}. Call directly at ${e164Phone}.`,
        tagType: 'founder-hot-lead-alert',
      });
      alertSent = alertResult.success;
    }

    await CommercialActionTracker.recordAction({
      actionId,
      agent: 'Sales',
      trigger: `Phone number intake (${e164Phone})`,
      leadId: lead.email,
      leadEmail: lead.email,
      leadName: lead.name,
      company: lead.companyName,
      action: telephonyDispatched
        ? `AI Voice Call Queued (${e164Phone})`
        : `Founder Hotline Alert Processed (${e164Phone})`,
      product: 'Complete Funding Blueprint ($79)',
      channel: 'Internal Alert',
      consent: 'Transactional',
      status: 'DISPATCHED',
      result: 'DELIVERED',
      revenueUSD: 0,
      attribution: telephonyDispatched ? 'AI_VOICE_OUTBOUND' : 'FOUNDER_PHONE_HOTLINE',
      timestamp: new Date().toISOString(),
      details: {
        phone: e164Phone,
        telephonyDispatched,
        voiceAgentEnabled: isVoiceAgentEnabled,
        hasAiCallConsent,
        wantsContact,
        callId,
      },
    });

    return {
      success: true,
      dispatchedTo: telephonyDispatched
        ? 'telephony_and_founder_alert'
        : shouldAlertFounder
          ? 'founder_alert'
          : 'lead_captured_self_serve',
      callId,
    };
  } catch (err: any) {
    console.error('❌ [Voice Calling Agent] Error processing intake:', err);
    return { success: false, reason: err.message };
  }
}
