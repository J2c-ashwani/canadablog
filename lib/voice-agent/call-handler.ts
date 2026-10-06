import { appendCallLogToSheet, updateLeadInSheet } from '@/lib/google-sheets';
import { sendEmail, getFirstName } from '@/lib/emails/mailer';
import { CommercialActionTracker, generateActionId } from '@/lib/ceo-agent/ledger/action-tracker';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';

export interface CallConclusionPayload {
  callId: string;
  customerPhone: string;
  customerEmail: string;
  customerName?: string;
  companyName?: string;
  durationSeconds?: number;
  callStatus: 'completed' | 'busy' | 'no-answer' | 'failed' | 'voicemail';
  disposition: 'READY_TO_PAY' | 'INTERESTED_IN_INFO' | 'CALLBACK_REQUESTED' | 'NOT_INTERESTED' | 'NO_ANSWER';
  summary: string;
  transcript?: string;
  productRequested?: 'funding-bundle' | 'funding-match-report' | 'funding-roadmap' | 'strategy-audit' | string;
  provider?: 'vapi' | 'bland' | 'retell' | 'manual' | string;
  recordingUrl?: string;
}

export interface CallProductDetails {
  id: string;
  name: string;
  priceUSD: number;
  path: string;
  description: string;
}

const PRODUCTS_MAP: Record<string, CallProductDetails> = {
  'funding-bundle': {
    id: 'funding-bundle',
    name: 'Complete Funding Blueprint',
    priceUSD: 79,
    path: '/products/bundle',
    description: 'Full Grant Recommendation Report, 4-Month Action Plan, Capital Stacking Blueprint, and Document Checklists.',
  },
  'funding-match-report': {
    id: 'funding-match-report',
    name: 'Funding Recommendation Report',
    priceUSD: 19,
    path: '/products/funding-match-report',
    description: 'Personalized government grant, tax credit, and non-dilutive loan recommendation report.',
  },
  'funding-roadmap': {
    id: 'funding-roadmap',
    name: 'Funding Strategy & Action Plan',
    priceUSD: 49,
    path: '/products/action-plan',
    description: 'Prioritized milestone sequence, risk mitigation guidelines, and application preparation roadmap.',
  },
  'strategy-audit': {
    id: 'strategy-audit',
    name: '1-on-1 Strategy Consultation & Grant Audit',
    priceUSD: 199,
    path: '/services',
    description: 'Live 30-minute funding strategist audit with 100% deposit credited toward full grant filing.',
  },
};

export async function handleCallConclusion(payload: CallConclusionPayload): Promise<{
  success: boolean;
  callId: string;
  sheetUpdated: boolean;
  emailSent: boolean;
  error?: string;
}> {
  const email = (payload.customerEmail || '').trim().toLowerCase();
  const phone = (payload.customerPhone || '').trim();
  const name = payload.customerName?.trim() || 'Founder';
  const company = payload.companyName?.trim() || 'Your Business';
  const callId = payload.callId || `CALL-${Date.now()}`;
  const now = new Date().toISOString();

  if (!email && !phone) {
    return { success: false, callId, sheetUpdated: false, emailSent: false, error: 'Email or phone required' };
  }

  // Resolve product tier
  const productKey = payload.productRequested && PRODUCTS_MAP[payload.productRequested]
    ? payload.productRequested
    : 'funding-bundle'; // Default high-converting tier
  const product = PRODUCTS_MAP[productKey];

  let emailSent = false;
  let sheetUpdated = false;

  try {
    // 1. Log to Google Sheets 'Call Logs' tab
    const callLogRes = await appendCallLogToSheet({
      timestamp: now,
      callId,
      customerName: name,
      customerEmail: email,
      phone,
      companyName: company,
      durationSeconds: payload.durationSeconds || 0,
      callDisposition: payload.disposition,
      summary: payload.summary || 'AI call completed.',
      productRequested: product.name,
      paymentLinkDispatched: (payload.disposition === 'READY_TO_PAY' || payload.disposition === 'INTERESTED_IN_INFO') ? 'Yes' : 'No',
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
      existingActivity.lastCallDisposition = payload.disposition;
      existingActivity.lastCallSummary = payload.summary;
      existingActivity.lastCallId = callId;
      existingActivity.lastCallDurationSeconds = payload.durationSeconds || 0;
      existingActivity.readyToPay = payload.disposition === 'READY_TO_PAY';

      const offlineStatus = payload.disposition === 'READY_TO_PAY'
        ? 'Call_ReadyToPay'
        : payload.disposition === 'INTERESTED_IN_INFO'
          ? 'Call_InfoRequested'
          : 'Call_Completed';

      const updateRes = await updateLeadInSheet(email, {
        additionalNotes: `\n[AI Call ${now}]: Status=${payload.disposition} | Summary: ${payload.summary} | CallID: ${callId}`,
        leadActivity: JSON.stringify(existingActivity),
        offlineStatus,
      });

      if (updateRes.success) sheetUpdated = true;
    }

    // 3. Automated AI Sales Agent: Send Immediate Email with Payment Link
    if (email && (payload.disposition === 'READY_TO_PAY' || payload.disposition === 'INTERESTED_IN_INFO')) {
      const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca').replace(/\/$/, '');
      const checkoutUrl = `${baseUrl}${product.path}?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&utm_source=ai_calling_agent&utm_medium=phone_close&utm_campaign=${encodeURIComponent(callId)}`;

      const firstName = getFirstName(name);
      const isReadyToPay = payload.disposition === 'READY_TO_PAY';
      const subject = isReadyToPay
        ? `Direct Payment Link: Your Canadian ${product.name} — ${company}`
        : `Your Funding Strategy & Next Steps — ${company}`;

      const emailHtml = `
        <div style="background-color:#0f172a;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
          <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px -5px rgba(0,0,0,0.3);">
            
            <!-- Header Banner -->
            <div style="background:linear-gradient(135deg,#047857 0%,#065f46 100%);padding:28px 32px;color:#ffffff;">
              <span style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#a7f3d0;display:block;margin-bottom:6px;">
                FSI Digital &bull; Canadian Funding Intelligence
              </span>
              <h1 style="margin:0;font-size:22px;font-weight:800;line-height:1.3;color:#ffffff;">
                ${isReadyToPay ? 'Your Funding Package Is Ready' : 'Summary of Your Funding Consultation'}
              </h1>
            </div>

            <!-- Main Body -->
            <div style="padding:32px;">
              <p style="font-size:16px;color:#1e293b;font-weight:600;margin-top:0;">
                Hi ${firstName},
              </p>
              
              <p style="font-size:15px;color:#334155;line-height:1.6;">
                Thank you for speaking with our AI funding specialist today regarding the grant and non-dilutive capital strategy for <strong>${company}</strong>.
              </p>

              <!-- Call Conclusion Box -->
              <div style="background-color:#f8fafc;border-left:4px solid #059669;padding:16px;border-radius:0 8px 8px 0;margin:20px 0;">
                <p style="margin:0;font-size:13px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">
                  Discussion Conclusion &amp; Next Steps
                </p>
                <p style="margin:8px 0 0 0;font-size:14px;color:#475569;line-height:1.5;">
                  ${payload.summary || 'We confirmed your project parameters and verified eligibility for matching provincial and federal Canadian non-dilutive programs.'}
                </p>
              </div>

              <p style="font-size:15px;color:#334155;line-height:1.6;">
                As discussed on the call, here is your direct 1-click link to secure your <strong>${product.name}</strong> ($${product.priceUSD} USD):
              </p>

              <!-- Payment CTA Button -->
              <div style="text-align:center;margin:32px 0;">
                <a href="${checkoutUrl}" target="_blank" rel="noopener noreferrer"
                   style="background:linear-gradient(135deg,#059669 0%,#047857 100%);color:#ffffff;padding:16px 36px;text-decoration:none;border-radius:10px;font-weight:800;display:inline-block;font-size:16px;box-shadow:0 4px 14px rgba(5,150,105,0.4);">
                  ${isReadyToPay ? `Complete Payment & Unlock Package ($${product.priceUSD}) &rarr;` : `Review & Access Your Strategy ($${product.priceUSD}) &rarr;`}
                </a>
                <p style="font-size:12px;color:#64748b;margin-top:10px;">
                  Instant digital delivery upon checkout &bull; 256-bit encrypted checkout via Stripe / PayPal
                </p>
              </div>

              <!-- Product Deliverables -->
              <div style="border-top:1px solid #e2e8f0;padding-top:20px;margin-top:24px;">
                <p style="margin:0 0 10px 0;font-size:13px;font-weight:700;color:#0f172a;">
                  What's Included in Your Package:
                </p>
                <ul style="margin:0;padding-left:20px;font-size:13px;color:#475569;line-height:1.7;">
                  <li><strong>Target Program Alignment:</strong> Prioritized matching grants, tax credits, and subsidies.</li>
                  <li><strong>Capital Stacking Roadmap:</strong> How to legally combine federal, provincial, and wage funding.</li>
                  <li><strong>Document Preparation Checklists:</strong> Exact required exhibits before intake closes.</li>
                  <li><strong>100% Credit Guarantee:</strong> Your $${product.priceUSD} investment is credited 100% toward our full grant filing services.</li>
                </ul>
              </div>

              <!-- Founder Signature -->
              <div style="border-top:1px solid #f1f5f9;padding-top:20px;margin-top:28px;">
                <p style="margin:0;font-size:13px;color:#64748b;line-height:1.5;">
                  Have questions before finalizing? Reply directly to this email and our team will get back to you within 1 business day.
                </p>
                <p style="margin:16px 0 0 0;font-size:14px;color:#334155;font-weight:600;">
                  Ashwani K.<br/>
                  <span style="font-size:12px;color:#64748b;font-weight:400;">Founder &amp; Managing Director &bull; FSI Digital</span>
                </p>
              </div>

            </div>
          </div>
        </div>
      `;

      const emailText = `Hi ${firstName},\n\nThank you for speaking with our AI funding specialist today regarding ${company}.\n\nConclusion: ${payload.summary || 'We confirmed your project parameters and verified eligibility for matching Canadian grants.'}\n\nHere is your direct payment link to unlock your ${product.name} ($${product.priceUSD} USD):\n${checkoutUrl}\n\nBest regards,\nAshwani K.\nFounder, FSI Digital`;

      const emailRes = await sendEmail({
        to: email,
        subject,
        html: emailHtml,
        text: emailText,
        tagType: 'voice_call_payment_link',
        companyName: company,
      });

      if (emailRes.success) {
        emailSent = true;

        // Record autonomous commercial action in CEO Ledger
        const actionId = generateActionId('Sales');
        await CommercialActionTracker.recordAction({
          actionId,
          agent: 'Sales',
          trigger: `Voice Call Disposition (${payload.disposition})`,
          leadId: email,
          leadEmail: email,
          leadName: name,
          company,
          action: `AI Voice Call -> Instant Payment Link Email (${product.name})`,
          product: product.id,
          channel: 'Email',
          consent: 'Transactional',
          status: 'DISPATCHED',
          result: 'DELIVERED',
          revenueUSD: product.priceUSD,
          attribution: 'VOICE_CALL_CLOSE',
          timestamp: now,
          providerMessageId: emailRes.providerMessageId,
          details: {
            callId,
            disposition: payload.disposition,
            durationSeconds: payload.durationSeconds,
            summary: payload.summary,
            checkoutUrl,
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
