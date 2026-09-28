/**
 * Voice Calling Agent Dispatcher
 * Dispatches automated AI outbound phone calls or webhooks when a lead is captured.
 * Supports Vapi.ai direct API or custom webhook (Make.com / n8n / Retell AI).
 */

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

  // 1. Check if direct Vapi.ai integration is configured
  const vapiApiKey = process.env.VAPI_API_KEY;
  const vapiAssistantId = process.env.VAPI_ASSISTANT_ID;
  const vapiPhoneNumberId = process.env.VAPI_PHONE_NUMBER_ID;

  if (vapiApiKey && vapiAssistantId && vapiPhoneNumberId) {
    try {
      console.log(`📞 [Voice Calling Agent] Initiating automated Vapi call to ${lead.phone} (${lead.name || 'Founder'})...`);

      const res = await fetch("https://api.vapi.ai/call/phone", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${vapiApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assistantId: vapiAssistantId,
          phoneNumberId: vapiPhoneNumberId,
          customer: {
            number: lead.phone,
            name: lead.name || "Founder",
          },
          assistantOverrides: {
            variableValues: {
              name: lead.name || "Founder",
              companyName: lead.companyName || "your company",
              email: lead.email,
              phone: lead.phone,
              state: lead.state || "Canada",
              industry: lead.industry || "General",
              fundingPurpose: lead.fundingPurpose || "Growth and Innovation Funding",
              fundingAmount: lead.fundingAmount || "N/A",
              score: lead.score ? String(lead.score) : "N/A",
              tier: lead.tier || "Standard",
              source: lead.source || "Interactive Assessment",
            },
          },
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        console.error(`❌ [Voice Calling Agent] Vapi call dispatch failed (${res.status}):`, errText);
        return { success: false, dispatchedTo: "vapi", reason: errText };
      }

      const result = await res.json().catch(() => ({}));
      console.log(`✅ [Voice Calling Agent] Vapi call successfully queued for ${lead.phone}. Call ID:`, result.id);
      return { success: true, dispatchedTo: "vapi" };
    } catch (err: any) {
      console.error("❌ [Voice Calling Agent] Error calling Vapi API:", err);
      return { success: false, dispatchedTo: "vapi", reason: err.message };
    }
  }

  // 2. Check if a custom webhook (Make.com / n8n / Zapier / Retell) is configured
  const webhookUrl = process.env.VOICE_AGENT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      console.log(`📞 [Voice Calling Agent] Forwarding lead to webhook ${webhookUrl}...`);
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          lead,
        }),
      });

      if (!res.ok) {
        console.error(`❌ [Voice Calling Agent] Webhook dispatch returned HTTP ${res.status}`);
        return { success: false, dispatchedTo: "webhook", reason: `HTTP ${res.status}` };
      }

      console.log(`✅ [Voice Calling Agent] Lead forwarded to webhook for ${lead.phone}`);
      return { success: true, dispatchedTo: "webhook" };
    } catch (err: any) {
      console.error("❌ [Voice Calling Agent] Error forwarding to webhook:", err);
      return { success: false, dispatchedTo: "webhook", reason: err.message };
    }
  }

  // 3. Fallback: Neither Vapi nor Webhook configured
  console.log(`ℹ️ [Voice Calling Agent] Phone captured for ${lead.email} (${lead.phone}). Automated call skipped because neither VAPI_API_KEY nor VOICE_AGENT_WEBHOOK_URL is set in environment.`);
  return { success: false, reason: "No voice provider or webhook configured in env" };
}
