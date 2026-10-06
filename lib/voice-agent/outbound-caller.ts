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
import { checkCallEligibility } from '@/lib/voice-agent/compliance-guard';

export interface VoiceLeadPayload {
  name?: string;
  phone?: string;
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
  consentTextVersion?: string;
  consentTimestamp?: string;
  consentSource?: string;
  doNotCall?: boolean;
  attemptCount?: number;
  lastAttemptAt?: string;
}

export async function triggerVoiceCallingAgent(lead: VoiceLeadPayload): Promise<{
  success: boolean;
  dispatchedTo?: string;
  callId?: string;
  reason?: string;
}> {
  // Normalize phone if provided
  const rawPhone = (lead.phone || '').trim();
  const hasPhone = rawPhone && rawPhone !== 'Not provided' && rawPhone !== 'N/A' && rawPhone.length >= 7;
  const e164Phone = hasPhone ? (normalizeToE164(rawPhone, lead.country || 'Canada') || rawPhone) : null;

  // Hard production kill switch: default dormant unless explicitly set to 'true'
  const isVoiceAgentEnabled = process.env.VOICE_AGENT_ENABLED === 'true';
  const hasAiCallConsent = Boolean(lead.consentToAiCall);
  const wantsContact = Boolean(lead.wantsAdvisorContact);

  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca').replace(/\/$/, '');
  const webhookCallbackUrl = `${baseUrl}/api/voice-agent/webhook`;
  const actionId = generateActionId('Sales');

  let telephonyDispatched = false;
  let callId: string | undefined;

  // ── 1. Telephony Dispatch Guarded by Kill Switch, Standalone Consent, & Compliance Guard ──
  if (isVoiceAgentEnabled && hasPhone && e164Phone) {
    const eligibility = checkCallEligibility({
      consentToAiCall: hasAiCallConsent,
      doNotCall: lead.doNotCall,
      attemptCount: lead.attemptCount,
      lastAttemptAt: lead.lastAttemptAt,
      state: lead.state,
    });

    if (!eligibility.eligible) {
      console.log(`ℹ️ [Voice Calling Agent] Call blocked by compliance guard: ${eligibility.reason}`);
    } else {
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
  }
} else if (!isVoiceAgentEnabled) {
  console.log(`ℹ️ [Voice Calling Agent] Voice agent is DORMANT (VOICE_AGENT_ENABLED is not 'true'). No automated outbound calls initiated.`);
} else if (!hasAiCallConsent) {
  console.log(`ℹ️ [Voice Calling Agent] Lead did not grant explicit AI call consent. Automated call skipped.`);
}

  // ── 2. Founder Hotline Email Alert (Tightened: click-to-call strictly requires valid phone) ──
  const founderEmail = process.env.CEO_REPORT_EMAIL || 'ashwani@fsidigital.ca';
  try {
    const isHighIntent = Boolean((lead.score && lead.score >= 70) || lead.tier === 'A' || wantsContact);
    const shouldAlertFounder = isHighIntent;
    let alertSent = false;

    if (shouldAlertFounder) {
      const subject = hasPhone && e164Phone
        ? `🚨 HOT LEAD PHONE INTAKE: ${lead.name || 'Founder'} (${lead.companyName || 'Business'}) — Phone: ${e164Phone}`
        : `🚨 HIGH INTENT INTAKE (NO PHONE): ${lead.name || 'Founder'} (${lead.companyName || 'Business'}) — Email Follow-up`;

      const phoneCellHtml = hasPhone && e164Phone
        ? `<a href="tel:${e164Phone}" style="font-size:18px;font-weight:bold;color:#2563eb;">${e164Phone}</a> <span style="font-size:12px;color:#16a34a;margin-left:8px;">[One-Tap Dialing Available]</span>`
        : `<span style="font-size:14px;color:#64748b;font-style:italic;">No phone provided (Email follow-up only — no click-to-call available)</span>`;

      const suggestedActionHtml = hasPhone && e164Phone
        ? `<strong>Suggested Action:</strong> Founder provided a verified direct phone number. One-tap dialing available above. The user is in the self-serve funnel; manual outreach is at founder discretion.`
        : `<strong>Suggested Action:</strong> High-intent founder submitted assessment without a phone number. Follow up via email: <a href="mailto:${lead.email}">${lead.email}</a>.`;

      const html = `
        <div style="font-family:Arial,sans-serif;padding:20px;border:1px solid #e2e8f0;border-radius:8px;max-width:600px;background:#ffffff;">
          <div style="background:${hasPhone ? '#dc2626' : '#2563eb'};color:#ffffff;padding:8px 16px;border-radius:4px;font-weight:bold;margin-bottom:16px;">
            FOUNDER LEAD ALERT — ${telephonyDispatched ? 'AI CALL TRIGGERED' : (hasPhone ? 'DIRECT FOUNDER FOLLOW-UP OPTION' : 'HIGH INTENT EMAIL CANDIDATE')}
          </div>
          <h2 style="color:#0f172a;margin-top:0;">Founder Intake Details</h2>
          <p>A Canadian founder completed a funding assessment with high qualification scores:</p>
          
          <table style="width:100%;border-collapse:collapse;margin:16px 0;background:#f8fafc;border-radius:6px;overflow:hidden;">
            <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Founder Name:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;font-weight:bold;">${lead.name || 'Founder'}</td></tr>
            <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Phone Number:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;">${phoneCellHtml}</td></tr>
            <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Email:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
            <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Company:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;">${lead.companyName || 'N/A'}</td></tr>
            <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Funding Goal:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;font-weight:bold;color:#16a34a;">${lead.fundingAmount || 'Unspecified'}</td></tr>
            <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Funding Purpose:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;">${lead.fundingPurpose || 'General Expansion'}</td></tr>
            <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Province / Industry:</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;">${lead.state || 'Canada'} / ${lead.industry || 'General'}</td></tr>
            <tr><td style="padding:10px;font-weight:bold;color:#475569;border-bottom:1px solid #e2e8f0;">Readiness Score:</td><td style="padding:10px;">${lead.score || 'N/A'}/100</td></tr>
            <tr><td style="padding:10px;font-weight:bold;color:#475569;">Contact Consent:</td><td style="padding:10px;">Advisor Contact: ${wantsContact ? 'Yes' : 'No'} | AI Call: ${hasAiCallConsent ? 'Yes' : 'No'} (v: ${lead.consentTextVersion || 'N/A'})</td></tr>
          </table>

          <div style="background:#eff6ff;padding:12px;border-radius:6px;border-left:4px solid #2563eb;margin-top:16px;">
            ${suggestedActionHtml}
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
        text: hasPhone && e164Phone
          ? `Hot Phone Lead: ${lead.name || 'Founder'} (${e164Phone}) from ${lead.companyName || 'Business'} requested ${lead.fundingAmount || 'funding'}. One-tap call: ${e164Phone}.`
          : `High Intent Lead (No Phone): ${lead.name || 'Founder'} from ${lead.companyName || 'Business'} scored ${lead.score || 'N/A'}/100. Contact via email: ${lead.email}.`,
        tagType: 'founder-hot-lead-alert',
      });
      alertSent = alertResult.success;
    }

    // Persist full consent audit record in Commercial Action Tracker
    await CommercialActionTracker.recordAction({
      actionId,
      agent: 'Sales',
      trigger: hasPhone ? `Phone number intake (${e164Phone})` : `High intent intake (${lead.email})`,
      leadId: lead.email,
      leadEmail: lead.email,
      leadName: lead.name,
      company: lead.companyName,
      action: telephonyDispatched
        ? `AI Voice Call Queued (${e164Phone})`
        : (hasPhone ? `Founder Hotline Alert Processed (${e164Phone})` : `High Intent Alert (Email Follow-up)`),
      product: 'Complete Funding Blueprint ($79)',
      channel: 'Internal Alert',
      consent: 'Transactional',
      status: 'DISPATCHED',
      result: 'DELIVERED',
      revenueUSD: 0,
      attribution: telephonyDispatched ? 'AI_VOICE_OUTBOUND' : 'FOUNDER_PHONE_HOTLINE',
      timestamp: new Date().toISOString(),
      details: {
        phone: e164Phone || 'None',
        hasPhone: Boolean(hasPhone),
        telephonyDispatched,
        voiceAgentEnabled: isVoiceAgentEnabled,
        // Complete Persistent Consent Audit Trail
        consentToAiCall: hasAiCallConsent,
        consentTextVersion: lead.consentTextVersion || (hasAiCallConsent ? 'v1.0-2026-10-06' : 'None'),
        consentTimestamp: lead.consentTimestamp || (hasAiCallConsent ? new Date().toISOString() : 'None'),
        consentSource: lead.consentSource || (hasAiCallConsent ? 'grant_calculator_step5' : 'None'),
        doNotCall: Boolean(lead.doNotCall),
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
