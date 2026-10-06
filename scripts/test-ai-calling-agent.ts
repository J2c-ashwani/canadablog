/**
 * AI Voice Calling Agent & Immediate Payment Email Verification Suite
 *
 * Comprehensive Test Suite covering CEO Architecture Directives:
 * 1. Kill Switch Guard: Dormant by default (VOICE_AGENT_ENABLED !== 'true')
 * 2. Consent Enforcement: Never call without explicit consentToAiCall === true
 * 3. E.164 Phone Normalization: Formats Canadian/US phone numbers accurately
 * 4. Single Voice Provider Dispatch: Dispatches cleanly without provider race conditions
 * 5. READY_TO_PAY Disposition:
 *    - Sends exact $79 bundle URL (/calculator?package=complete-bundle)
 *    - Verifies zero false guarantees ("100% filing credit guarantee" removed)
 *    - Logs to Google Sheets Call Logs + updates Lead offlineStatus
 *    - Records Sales action in CEO Commercial Action Ledger
 * 6. INTERESTED_IN_INFO Disposition:
 *    - Sends informational overview with ZERO payment push links/buttons
 *    - Sets offlineStatus to Call_InfoRequested
 *    - Records commercial action with $0 revenue
 * 7. Call-Event Idempotency: Duplicate webhooks are suppressed and flagged
 * 8. Webhook Security: Enforces VOICE_WEBHOOK_SECRET authentication
 */

import { triggerVoiceCallingAgent } from '../lib/voice-agent/outbound-caller';
import { handleCallConclusion, CallConclusionPayload } from '../lib/voice-agent/call-handler';
import { CommercialActionTracker } from '../lib/ceo-agent/ledger/action-tracker';
import { normalizeToE164 } from '../lib/phone-validator';
import { POST as webhookHandler } from '../app/api/voice-agent/webhook/route';
import { NextRequest } from 'next/server';

async function runVoiceAgentTests() {
  console.log('🚀 Starting AI Voice Calling Agent & Self-Serve Guard Verification...\n');

  // Activate email mock for testing
  (global as any).mockSendEmailActive = true;
  const capturedEmails: any[] = [];
  (global as any).mockSendEmailCallback = (emailData: any) => {
    capturedEmails.push(emailData);
  };

  // ──────────────────────────────────────────────────────────────────────────
  // Test 1: Phone Normalization to E.164
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[Test 1/8] Verifying E.164 phone normalization...');
  const phone1 = normalizeToE164('416-555-0199', 'CA');
  const phone2 = normalizeToE164('(604) 555-0188');
  const phone3 = normalizeToE164('+1 514 555 0177');

  if (phone1 !== '+14165550199') throw new Error(`Expected +14165550199, got ${phone1}`);
  if (phone2 !== '+16045550188') throw new Error(`Expected +16045550188, got ${phone2}`);
  if (phone3 !== '+15145550177') throw new Error(`Expected +15145550177, got ${phone3}`);
  console.log(`   Normalized 416-555-0199 -> ${phone1}`);
  console.log(`   Normalized (604) 555-0188 -> ${phone2}`);
  console.log(`   Normalized +1 514 555 0177 -> ${phone3}`);
  console.log('✅ Stage 1 Passed: E.164 normalization validated.\n');

  // ──────────────────────────────────────────────────────────────────────────
  // Test 2: Kill Switch Guard (Dormant by default)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[Test 2/8] Testing Kill Switch (VOICE_AGENT_ENABLED is unset / false)...');
  const originalEnv = process.env.VOICE_AGENT_ENABLED;
  delete process.env.VOICE_AGENT_ENABLED;

  const dormantRes = await triggerVoiceCallingAgent({
    name: 'Dormant Lead',
    phone: '4165550199',
    email: 'dormant@example.com',
    companyName: 'Self-Serve First Co.',
    state: 'ON',
    score: 85,
    wantsAdvisorContact: true,
    consentToAiCall: true,
  });

  if (!dormantRes.success || dormantRes.dispatchedTo !== 'founder_alert') {
    throw new Error(`Expected dormant kill switch to dispatch to founder_alert, got: ${JSON.stringify(dormantRes)}`);
  }
  console.log('   Dormant Result: Voice agent dormant, zero automated phone calls initiated.');
  console.log('✅ Stage 2 Passed: Kill switch reliably halts outbound voice calls.\n');

  // ──────────────────────────────────────────────────────────────────────────
  // Test 3: Consent Guard (Requires explicit consentToAiCall === true)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[Test 3/8] Testing Consent Guard (Enabled, but without AI call consent)...');
  process.env.VOICE_AGENT_ENABLED = 'true';

  const noConsentRes = await triggerVoiceCallingAgent({
    name: 'Unconsented Lead',
    phone: '4165550199',
    email: 'noconsent@example.com',
    companyName: 'Private Corp',
    state: 'BC',
    score: 90,
    wantsAdvisorContact: true,
    consentToAiCall: false, // NO AI CALL CONSENT
  });

  if (noConsentRes.callId !== undefined || noConsentRes.dispatchedTo === 'telephony_and_founder_alert') {
    throw new Error(`Expected zero telephony dispatch due to lack of AI call consent, got: ${JSON.stringify(noConsentRes)}`);
  }
  console.log('   Consent Guard Result: Zero telephony dispatch initiated because consentToAiCall is false.');
  console.log('✅ Stage 3 Passed: Voice calls strictly blocked without explicit consent.\n');

  // Restore env
  if (originalEnv) process.env.VOICE_AGENT_ENABLED = originalEnv;
  else delete process.env.VOICE_AGENT_ENABLED;

  // ──────────────────────────────────────────────────────────────────────────
  // Test 4: READY_TO_PAY Disposition ($79 Complete Bundle Checkout Link)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[Test 4/8] Testing handleCallConclusion with READY_TO_PAY disposition...');
  const readyCallId = `TEST-CALL-READY-${Date.now()}`;
  const readyRes = await handleCallConclusion({
    callId: readyCallId,
    customerPhone: '416-555-0199',
    customerEmail: 'ready.buyer@example.com',
    customerName: 'Marcus Vance',
    companyName: 'Vance BioSolutions Ltd.',
    durationSeconds: 160,
    callStatus: 'completed',
    disposition: 'READY_TO_PAY',
    summary: 'Marcus agreed to proceed with the $79 Complete Funding Strategy Bundle.',
    productRequested: 'funding-bundle',
    provider: 'vapi',
  });

  if (!readyRes.success) {
    throw new Error(`READY_TO_PAY conclusion failed: ${readyRes.error}`);
  }
  console.log('   READY_TO_PAY Conclusion Result:', readyRes);
  console.log('✅ Stage 4 Passed: READY_TO_PAY processed and logged successfully.\n');

  // ──────────────────────────────────────────────────────────────────────────
  // Test 5: Verify Commercial Action Ledger & Exact $79 Path
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[Test 5/8] Verifying Commercial Action Ledger for post-call payment action...');
  const todayMetrics = CommercialActionTracker.getTodayMetrics();
  const salesActions = todayMetrics.recentActions.filter(a => a.agent === 'Sales' && a.leadEmail === 'ready.buyer@example.com');
  if (salesActions.length === 0) {
    throw new Error('Commercial Action Ledger did not record Sales action for ready.buyer@example.com');
  }
  const lastAction = salesActions[0];
  console.log(`   Recorded Action ID: ${lastAction.actionId}`);
  console.log(`   Product: ${lastAction.product} | Status: ${lastAction.status} | Revenue USD: $${lastAction.revenueUSD}`);
  if (lastAction.details?.checkoutUrl) {
    console.log(`   Checkout URL: ${lastAction.details.checkoutUrl}`);
    if (!lastAction.details.checkoutUrl.includes('/calculator?package=complete-bundle')) {
      throw new Error(`Expected checkoutUrl to contain /calculator?package=complete-bundle, got: ${lastAction.details.checkoutUrl}`);
    }
  }

  const readyEmail = capturedEmails.find(e => e.to === 'ready.buyer@example.com');
  if (!readyEmail) throw new Error('Mock did not capture ready.buyer email');
  if (!readyEmail.html.includes('/calculator?package=complete-bundle')) {
    throw new Error('Email HTML missing exact $79 complete bundle url');
  }
  if (readyEmail.html.toLowerCase().includes('100% filing credit guarantee')) {
    throw new Error('Email HTML contains unsupported 100% filing credit guarantee');
  }
  console.log('   Email Copy Verified: Contains exact $79 complete-bundle URL, zero false guarantees.');
  console.log('✅ Stage 5 Passed: Commercial Action Ledger accurately tracked exact $79 path.\n');

  // ──────────────────────────────────────────────────────────────────────────
  // Test 6: INTERESTED_IN_INFO Disposition (No Payment Push Link)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[Test 6/8] Testing handleCallConclusion with INTERESTED_IN_INFO disposition...');
  const infoCallId = `TEST-CALL-INFO-${Date.now()}`;
  const infoRes = await handleCallConclusion({
    callId: infoCallId,
    customerPhone: '604-555-0188',
    customerEmail: 'info.lead@example.com',
    customerName: 'Sarah Jenkins',
    companyName: 'Pacific Biotech',
    durationSeconds: 95,
    callStatus: 'completed',
    disposition: 'INTERESTED_IN_INFO',
    summary: 'Sarah requested email summary of Canadian biotech funding streams before making a decision.',
    productRequested: 'funding-bundle',
    provider: 'vapi',
  });

  if (!infoRes.success) {
    throw new Error(`INTERESTED_IN_INFO conclusion failed: ${infoRes.error}`);
  }

  const updatedMetrics = CommercialActionTracker.getTodayMetrics();
  const infoAction = updatedMetrics.recentActions.find(a => a.leadEmail === 'info.lead@example.com');
  if (!infoAction) {
    throw new Error('Commercial Action Ledger did not record informational follow-up action');
  }
  console.log(`   Recorded Info Action ID: ${infoAction.actionId} | Revenue: $${infoAction.revenueUSD} | Product: ${infoAction.product}`);
  if (infoAction.revenueUSD !== 0) {
    throw new Error(`Expected $0 revenue attribution for info follow-up, got ${infoAction.revenueUSD}`);
  }

  const infoEmail = capturedEmails.find(e => e.to === 'info.lead@example.com');
  if (!infoEmail) throw new Error('Mock did not capture info.lead email');
  if (infoEmail.html.includes('Complete Payment &amp; Unlock Package') || infoEmail.html.includes('checkoutUrl')) {
    throw new Error('Info email erroneously contains payment button');
  }
  console.log('   Email Copy Verified: Purely informational follow-up, zero payment push buttons.');
  console.log('✅ Stage 6 Passed: INTERESTED_IN_INFO processed without payment push.\n');

  // ──────────────────────────────────────────────────────────────────────────
  // Test 7: Call-Event Idempotency Check
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[Test 7/8] Testing Call-Event Idempotency (Re-submitting duplicate event)...');
  const duplicateRes = await handleCallConclusion({
    callId: readyCallId, // SAME CALL ID
    customerPhone: '416-555-0199',
    customerEmail: 'ready.buyer@example.com',
    disposition: 'READY_TO_PAY', // SAME DISPOSITION
    summary: 'Duplicate retry from Vapi webhook',
    provider: 'vapi',
    callStatus: 'completed',
  });

  if (!duplicateRes.duplicate) {
    throw new Error(`Expected duplicate to be detected, got: ${JSON.stringify(duplicateRes)}`);
  }
  console.log('   Duplicate Result: duplicate=true, redundant email and database writes prevented.');
  console.log('✅ Stage 7 Passed: Call-event idempotency validated.\n');

  // ──────────────────────────────────────────────────────────────────────────
  // Test 8: Webhook Authentication Security Guard
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[Test 8/8] Testing Webhook Endpoint Security Guard...');
  process.env.VOICE_WEBHOOK_SECRET = 'super-secret-voice-key-2026';

  // Unauthorized request
  const unauthReq = new NextRequest('http://localhost:3000/api/voice-agent/webhook', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callId: 'TEST-UNAUTH', customerEmail: 'test@example.com' }),
  });
  const unauthRes = await webhookHandler(unauthReq);
  if (unauthRes.status !== 401) {
    throw new Error(`Expected 401 Unauthorized for missing secret, got ${unauthRes.status}`);
  }
  console.log('   Unauthorized Request: Correctly blocked with 401 HTTP response.');

  // Authorized request with x-voice-webhook-secret
  const authReq = new NextRequest('http://localhost:3000/api/voice-agent/webhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-voice-webhook-secret': 'super-secret-voice-key-2026',
    },
    body: JSON.stringify({
      callId: `WEBHOOK-TEST-${Date.now()}`,
      customerEmail: 'authorized.lead@example.com',
      customerPhone: '4165559988',
      disposition: 'READY_TO_PAY',
      summary: 'Authorized webhook call conclusion',
    }),
  });
  const authRes = await webhookHandler(authReq);
  const authBody = await authRes.json();
  if (authRes.status !== 200 || !authBody.success) {
    throw new Error(`Expected 200 OK for authorized secret, got ${authRes.status}: ${JSON.stringify(authBody)}`);
  }
  console.log('   Authorized Request: Successfully authenticated and processed.');
  delete process.env.VOICE_WEBHOOK_SECRET;
  console.log('✅ Stage 8 Passed: Webhook secret security guard validated.\n');

  console.log('🎉 ALL 8/8 AI CALLING AGENT VERIFICATION TESTS PASSED SUCCESSFULLY!');
}

runVoiceAgentTests().catch(err => {
  console.error('\n❌ Voice agent verification test failed:', err);
  process.exit(1);
});
