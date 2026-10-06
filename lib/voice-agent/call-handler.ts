import { appendCallLogToSheet, updateLeadInSheet } from '@/lib/google-sheets';
import { sendEmail, getFirstName } from '@/lib/emails/mailer';
import { CommercialActionTracker, generateActionId } from '@/lib/ceo-agent/ledger/action-tracker';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { normalizeToE164 } from '@/lib/phone-validator';

export interface CallConclusionPayload {
  callId: string;
  customerPhone: string;
  customerEmail: string;
  customerName?: string;
  companyName?: string;
  durationSeconds?: number;
  callStatus: 'completed' | 'busy' | 'no-answer' | 'failed' | 'voicemail';
  disposition: 'READY_TO_PAY' | 'INTERESTED_IN_INFO' | 'CALLBACK_REQUESTED' | 'NOT_INTERESTED' | 'NO_ANSWER' | string;
  summary: string;
  transcript?: string;
  productRequested?: 'funding-bundle' | 'funding-match-report' | 'funding-roadmap' | 'strategy-audit' | string;
  provider?: 'vapi' | 'bland' | 'retell' | 'manual' | string;
  recordingUrl?: string;
}

import { isCallEventProcessed, markCallEventProcessed } from '@/lib/voice-agent/idempotency';

export interface CallProductDetails {
  id: string;
  name: string;
  priceUSD: number;
  path: string;
  description: string;
  deliverables: string[];
}

export const PRODUCTS_MAP: Record<string, CallProductDetails> = {
  'funding-match-report': {
    id: 'funding-match-report',
    name: 'Funding Recommendation Report',
    priceUSD: 19,
    path: '/products/funding-match-report',
    description: 'Personalized government grant, tax credit, and non-dilutive loan recommendation report.',
    deliverables: [
      'Top ranked government grants and wage subsidies matching your criteria',
      'Direct guidelines on matching funds, project timelines, and TRL requirements',
      'Intake deadline monitoring and official program portal access',
    ],
  },
  'funding-roadmap': {
    id: 'funding-roadmap',
    name: 'Funding Strategy & Action Plan',
    priceUSD: 49,
    path: '/products/action-plan',
    description: 'Prioritized milestone sequence, risk mitigation guidelines, and application preparation roadmap.',
    deliverables: [
      'Step-by-step milestone execution roadmap mapped to upcoming funding cycles',
      'Disqualification risk analysis and project positioning guidelines',
      'Detailed document preparation checklists for financial and technical exhibits',
    ],
  },
  'funding-bundle': {
    id: 'funding-bundle',
    name: 'Complete Funding Strategy Bundle',
    priceUSD: 79,
    path: '/calculator?package=complete-bundle',
    description: 'Full Grant Recommendation Report, 4-Month Action Plan, Capital Stacking Blueprint, and Document Checklists.',
    deliverables: [
      'Target Program Alignment: Prioritized matching grants, tax credits, and subsidies',
      'Capital Stacking Roadmap: Legal stacking guidelines for combining federal and provincial funding',
      'Document Preparation Checklists: Exhaustive exhibit templates before application windows close',
    ],
  },
  'strategy-audit': {
    id: 'strategy-audit',
    name: '1-on-1 Strategy Consultation & Grant Audit',
    priceUSD: 199,
    path: '/services',
    description: 'Live 30-minute funding strategist audit and file review.',
    deliverables: [
      'Live 30-minute private video session with an FSI Digital funding strategist',
      'Comprehensive audit of project eligibility, cash-flow matching, and corporate structure',
      'Customized funding acquisition strategy and grant stack roadmap',
    ],
  },
};

/**
 * Resolves requested product from voice disposition.
 * Strictly returns null if unrecognized, preventing inappropriate payment links.
 */
export function resolveRequestedProduct(requested?: string): CallProductDetails | null {
  if (!requested) return null;
  const key = requested.trim().toLowerCase();

  // Exact ID hit
  if (PRODUCTS_MAP[key]) return PRODUCTS_MAP[key];

  // $19 Match Report
  if (
    key === '19' || key === '$19' ||
    key === 'funding-match-report' || key === 'match-report' ||
    key.includes('19') || key.includes('report')
  ) {
    return PRODUCTS_MAP['funding-match-report'];
  }

  // $49 Action Plan / Roadmap
  if (
    key === '49' || key === '$49' ||
    key === 'funding-roadmap' || key === 'action-plan' ||
    key.includes('49') || key.includes('action plan') || key.includes('roadmap')
  ) {
    return PRODUCTS_MAP['funding-roadmap'];
  }

  // $79 Complete Strategy Bundle
  if (
    key === '79' || key === '$79' ||
    key === 'funding-bundle' || key === 'complete-bundle' ||
    key.includes('79') || key.includes('bundle')
  ) {
    return PRODUCTS_MAP['funding-bundle'];
  }

  // $199 Strategy Consultation / Live Audit
  if (
    key === '199' || key === '$199' ||
    key === 'strategy-audit' || key === 'consultation' ||
    key.includes('199') || key.includes('consultation') || key.includes('audit')
  ) {
    return PRODUCTS_MAP['strategy-audit'];
  }

  // Unknown product -> strictly null
  return null;
}

export async function handleCallConclusion(payload: CallConclusionPayload): Promise<{
  success: boolean;
  callId: string;
  sheetUpdated: boolean;
  emailSent: boolean;
  duplicate?: boolean;
  error?: string;
}> {
  const email = (payload.customerEmail || '').trim().toLowerCase();
  const phone = (payload.customerPhone || '').trim();
  const name = payload.customerName?.trim() || 'Founder';
  const company = payload.companyName?.trim() || 'Your Business';
  const callId = payload.callId || `CALL-${Date.now()}`;
  const provider = (payload.provider || 'voice').toLowerCase();
  const disposition = (payload.disposition || 'COMPLETED').toUpperCase();
  const now = new Date().toISOString();

  if (!email && !phone) {
    return { success: false, callId, sheetUpdated: false, emailSent: false, error: 'Email or phone required' };
  }

  // ── Persistent Call-Event Idempotency Check (Memory + Disk + Redis) ──
  const idempotencyKey = `${provider}:${callId}:${disposition}`.toLowerCase();
  const alreadyProcessed = await isCallEventProcessed(idempotencyKey);
  if (alreadyProcessed) {
    console.log(`ℹ️ [Voice Call Handler] Duplicate call event ignored via persistent store (Idempotency key: ${idempotencyKey})`);
    return {
      success: true,
      callId,
      sheetUpdated: false,
      emailSent: false,
      duplicate: true,
    };
  }
  await markCallEventProcessed(idempotencyKey);

  const e164Phone = normalizeToE164(phone) || phone;

  // Resolve requested product (STRICTLY product-specific, never default to $79)
  const product = resolveRequestedProduct(payload.productRequested);

  let emailSent = false;
  let sheetUpdated = false;

  try {
    // 1. Log to Google Sheets 'Call Logs' tab
    const callLogRes = await appendCallLogToSheet({
      timestamp: now,
      callId,
      customerName: name,
      customerEmail: email,
      phone: e164Phone,
      companyName: company,
      durationSeconds: payload.durationSeconds || 0,
      callDisposition: disposition,
      summary: payload.summary || 'AI call completed.',
      productRequested: product ? product.name : (payload.productRequested || 'Unspecified'),
      paymentLinkDispatched: (disposition === 'READY_TO_PAY' && Boolean(product)) ? 'Yes' : 'No',
      recordingOrTranscriptUrl: payload.recordingUrl || 'N/A',
    });

    if (callLogRes.success) sheetUpdated = true;

    // 2. Synchronize main 'Leads' sheet with call conclusion
    if (email) {
      let existingActivity: Record<string, any> = {};
      try {
        const subscriber = await SubscriberRepository.getSubscriberByEmail(email);
        if (subscriber?.leadActivity) {
          existingActivity = typeof subscriber.leadActivity === 'string'
            ? JSON.parse(subscriber.leadActivity)
            : subscriber.leadActivity;
        }
      } catch {}

      existingActivity.lastCallCompletedAt = now;
      existingActivity.lastCallDisposition = disposition;
      existingActivity.lastCallSummary = payload.summary;
      existingActivity.lastCallId = callId;
      existingActivity.lastCallDurationSeconds = payload.durationSeconds || 0;
      existingActivity.readyToPay = disposition === 'READY_TO_PAY';

      const offlineStatus = disposition === 'READY_TO_PAY'
        ? 'Call_ReadyToPay'
        : disposition === 'INTERESTED_IN_INFO'
          ? 'Call_InfoRequested'
          : 'Call_Completed';

      const updateRes = await updateLeadInSheet(email, {
        additionalNotes: `\n[AI Call ${now}]: Status=${disposition} | Summary: ${payload.summary} | CallID: ${callId}`,
        leadActivity: JSON.stringify(existingActivity),
        offlineStatus,
      });

      if (updateRes.success) sheetUpdated = true;
    }

    const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca').replace(/\/$/, '');
    const firstName = getFirstName(name);

    // ── 3A. Customer is READY_TO_PAY: Send Exact Requested Payment Link ──
    if (email && disposition === 'READY_TO_PAY') {
      if (!product) {
        console.warn(`⚠️ [Voice Call Handler] READY_TO_PAY disposition received with unknown product: "${payload.productRequested}". Payment link withheld per CEO policy.`);
        return {
          success: true,
          callId,
          sheetUpdated,
          emailSent: false,
          error: `Unknown or unspecified product requested ("${payload.productRequested || 'none'}"). Payment link withheld per product governance.`,
        };
      }

      const glue = product.path.includes('?') ? '&' : '?';
      const checkoutUrl = `${baseUrl}${product.path}${glue}email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&utm_source=ai_calling_agent&utm_medium=phone_close&utm_campaign=${encodeURIComponent(callId)}`;

      const subject = `Your Requested Checkout Link: ${product.name} — ${company}`;

      const emailHtml = `
        <div style="background-color:#0f172a;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
          <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px -5px rgba(0,0,0,0.3);">
            
            <div style="background:linear-gradient(135deg,#047857 0%,#065f46 100%);padding:28px 32px;color:#ffffff;">
              <span style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#a7f3d0;display:block;margin-bottom:6px;">
                FSI Digital &bull; Canadian Funding Intelligence
              </span>
              <h1 style="margin:0;font-size:22px;font-weight:800;line-height:1.3;color:#ffffff;">
                Your ${product.name} Package Is Ready
              </h1>
            </div>

            <div style="padding:32px;">
              <p style="font-size:16px;color:#1e293b;font-weight:600;margin-top:0;">
                Hi ${firstName},
              </p>
              
              <p style="font-size:15px;color:#334155;line-height:1.6;">
                Thank you for speaking with our funding specialist regarding the non-dilutive capital options for <strong>${company}</strong>.
              </p>

              <div style="background-color:#f8fafc;border-left:4px solid #059669;padding:16px;border-radius:0 8px 8px 0;margin:20px 0;">
                <p style="margin:0;font-size:13px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">
                  Summary of Discussion
                </p>
                <p style="margin:8px 0 0 0;font-size:14px;color:#475569;line-height:1.5;">
                  ${payload.summary || 'Based on the information provided, we reviewed your project criteria and mapped out applicable government funding streams.'}
                </p>
              </div>

              <p style="font-size:15px;color:#334155;line-height:1.6;">
                As requested during our call, here is your direct checkout link to complete your order for the <strong>${product.name}</strong> ($${product.priceUSD} USD):
              </p>

              <div style="text-align:center;margin:32px 0;">
                <a href="${checkoutUrl}" target="_blank" rel="noopener noreferrer"
                   style="background:linear-gradient(135deg,#059669 0%,#047857 100%);color:#ffffff;padding:16px 36px;text-decoration:none;border-radius:10px;font-weight:800;display:inline-block;font-size:16px;box-shadow:0 4px 14px rgba(5,150,105,0.4);">
                  Complete Payment &amp; Unlock Package ($${product.priceUSD}) &rarr;
                </a>
                <p style="font-size:12px;color:#64748b;margin-top:10px;">
                  Instant digital access upon checkout &bull; 256-bit encrypted checkout via Stripe / PayPal
                </p>
              </div>

              <div style="border-top:1px solid #e2e8f0;padding-top:20px;margin-top:24px;">
                <p style="margin:0 0 10px 0;font-size:13px;font-weight:700;color:#0f172a;">
                  What Your Package Delivers:
                </p>
                <ul style="margin:0;padding-left:20px;font-size:13px;color:#475569;line-height:1.7;">
                  ${product.deliverables.map((d) => `<li>${d}</li>`).join('\n                  ')}
                </ul>
              </div>

              <div style="border-top:1px solid #f1f5f9;padding-top:20px;margin-top:28px;">
                <p style="margin:0;font-size:13px;color:#64748b;line-height:1.5;">
                  Have questions before finalizing? Reply directly to this email and our team will assist you.
                </p>
                <p style="margin:16px 0 0 0;font-size:14px;color:#334155;font-weight:600;">
                  Ashwani K.<br/>
                  <span style="font-size:12px;color:#64748b;font-weight:400;">Founder &bull; FSI Digital</span>
                </p>
              </div>

            </div>
          </div>
        </div>
      `;

      const emailText = `Hi ${firstName},\n\nThank you for speaking with our funding specialist regarding ${company}.\n\nDiscussion summary: ${payload.summary || 'We reviewed your project criteria and mapped out applicable government funding streams.'}\n\nHere is your requested checkout link for the ${product.name} ($${product.priceUSD} USD):\n${checkoutUrl}\n\nBest regards,\nAshwani K.\nFounder, FSI Digital`;

      const emailRes = await sendEmail({
        to: email,
        subject,
        html: emailHtml,
        text: emailText,
        tagType: 'voice_call_payment_link',
        companyName: company,
      });

      if (emailRes.success || emailRes.skipped) {
        emailSent = emailRes.success;

        const actionId = generateActionId('Sales');
        await CommercialActionTracker.recordAction({
          actionId,
          agent: 'Sales',
          trigger: `Voice Call Disposition (READY_TO_PAY)`,
          leadId: email,
          leadEmail: email,
          leadName: name,
          company,
          action: `AI Voice Call -> Instant Payment Link Email (${product.name} - $${product.priceUSD})`,
          product: product.id,
          channel: 'Email',
          consent: 'Transactional',
          status: 'DISPATCHED',
          result: emailRes.success ? 'DELIVERED' : 'PENDING_MOCK',
          revenueUSD: product.priceUSD,
          attribution: 'VOICE_CALL_CLOSE',
          timestamp: now,
          providerMessageId: emailRes.providerMessageId || `mock-${Date.now()}`,
          details: {
            callId,
            disposition,
            durationSeconds: payload.durationSeconds,
            summary: payload.summary,
            requestedProduct: product.id,
            productPrice: product.priceUSD,
            checkoutUrl,
          },
        });
      }
    }

    // ── 3B. Customer is INTERESTED_IN_INFO: Send Informational Overview (NO Payment Push) ──
    else if (email && disposition === 'INTERESTED_IN_INFO') {
      const subject = `Funding Strategy Overview & Information — ${company}`;

      const emailHtml = `
        <div style="background-color:#0f172a;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
          <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px -5px rgba(0,0,0,0.3);">
            
            <div style="background:#1e293b;padding:28px 32px;color:#ffffff;border-bottom:3px solid #059669;">
              <span style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#94a3b8;display:block;margin-bottom:6px;">
                FSI Digital &bull; Canadian Funding Intelligence
              </span>
              <h1 style="margin:0;font-size:22px;font-weight:800;line-height:1.3;color:#ffffff;">
                Funding Consultation Summary
              </h1>
            </div>

            <div style="padding:32px;">
              <p style="font-size:16px;color:#1e293b;font-weight:600;margin-top:0;">
                Hi ${firstName},
              </p>
              
              <p style="font-size:15px;color:#334155;line-height:1.6;">
                It was great speaking with you today regarding funding options for <strong>${company}</strong>.
              </p>

              <div style="background-color:#f8fafc;border-left:4px solid #64748b;padding:16px;border-radius:0 8px 8px 0;margin:20px 0;">
                <p style="margin:0;font-size:13px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">
                  What We Reviewed
                </p>
                <p style="margin:8px 0 0 0;font-size:14px;color:#475569;line-height:1.5;">
                  ${payload.summary || 'Based on the details provided, your project aligns with Canadian non-dilutive programs supporting R&D, commercialization, and growth.'}
                </p>
              </div>

              <p style="font-size:15px;color:#334155;line-height:1.6;">
                When you are ready to explore next steps, FSI Digital offers self-serve intelligence tools to help founders navigate program stacking:
              </p>

              <ul style="padding-left:20px;font-size:14px;color:#475569;line-height:1.7;">
                <li><strong>Self-Serve Assessment:</strong> Review your baseline grant eligibility in our free interactive calculator.</li>
                <li><strong>Funding Strategy Packages:</strong> Detailed milestone sequences, program rankings, and application exhibits when you choose to proceed.</li>
              </ul>

              <div style="border-top:1px solid #f1f5f9;padding-top:20px;margin-top:28px;">
                <p style="margin:0;font-size:13px;color:#64748b;line-height:1.5;">
                  If you have questions as you plan your upcoming intake cycle, simply reply directly to this email.
                </p>
                <p style="margin:16px 0 0 0;font-size:14px;color:#334155;font-weight:600;">
                  Ashwani K.<br/>
                  <span style="font-size:12px;color:#64748b;font-weight:400;">Founder &bull; FSI Digital</span>
                </p>
              </div>

            </div>
          </div>
        </div>
      `;

      const emailText = `Hi ${firstName},\n\nIt was great speaking with you today regarding funding options for ${company}.\n\nWhat we reviewed: ${payload.summary || 'Your project aligns with Canadian non-dilutive funding programs.'}\n\nWhen you are ready to explore next steps, feel free to reply to this email or visit www.fsidigital.ca.\n\nBest regards,\nAshwani K.\nFounder, FSI Digital`;

      const emailRes = await sendEmail({
        to: email,
        subject,
        html: emailHtml,
        text: emailText,
        tagType: 'voice_call_info_followup',
        companyName: company,
      });

      if (emailRes.success || emailRes.skipped) {
        emailSent = emailRes.success;

        const actionId = generateActionId('Sales');
        await CommercialActionTracker.recordAction({
          actionId,
          agent: 'Sales',
          trigger: `Voice Call Disposition (INTERESTED_IN_INFO)`,
          leadId: email,
          leadEmail: email,
          leadName: name,
          company,
          action: `AI Voice Call -> Informational Follow-up Email`,
          product: 'Educational Overview',
          channel: 'Email',
          consent: 'Transactional',
          status: 'DISPATCHED',
          result: emailRes.success ? 'DELIVERED' : 'PENDING_MOCK',
          revenueUSD: 0,
          attribution: 'VOICE_CALL_INFO',
          timestamp: now,
          providerMessageId: emailRes.providerMessageId || `mock-${Date.now()}`,
          details: {
            callId,
            disposition,
            durationSeconds: payload.durationSeconds,
            summary: payload.summary,
          },
        });
      }
    }

    return {
      success: true,
      callId,
      sheetUpdated,
      emailSent,
    };
  } catch (err: any) {
    console.error(`❌ [Voice Call Handler] Error processing call conclusion for ${callId}:`, err);
    return {
      success: false,
      callId,
      sheetUpdated,
      emailSent,
      error: err.message || String(err),
    };
  }
}
