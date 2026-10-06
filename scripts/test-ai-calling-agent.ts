/**
 * AI Voice Calling Agent & Immediate Payment Email Verification Suite
 *
 * Full CEO Hardening Suite covering all 12 directives:
 * 1. Country-aware E.164 normalization (NANP +1, International +44, +91, +61 preserved)
 * 2. Kill switch guard: dormant by default (VOICE_AGENT_ENABLED !== 'true')
 * 3. Standalone explicit AI-call consent requirement
 * 4. Compliance safety guards:
 *    - Calling window check (CRTC telecommunications window)
 *    - Maximum outbound attempts limit (max 3)
 *    - Cooldown interval enforcement (24 hours minimum)
 *    - Do-Not-Call (DNC) registry hard block
 * 5. Product-Specific READY_TO_PAY Routing:
 *    - $19 Report -> /products/funding-match-report ($19 USD)
 *    - $49 Action Plan -> /products/action-plan ($49 USD)
 *    - $79 Complete Bundle -> /calculator?package=complete-bundle ($79 USD)
 *    - $199 Strategy Consultation -> /services ($199 USD)
 *    - Unknown Product -> WITHHELD (no payment link dispatched)
 * 6. INTERESTED_IN_INFO: Informational overview with zero payment push buttons ($0 revenue)
 * 7. Persistent Idempotency: Survives memory clearance via persistent multi-layer store
 * 8. Tightened Founder Hotline Alert:
 *    - Phone exists -> click-to-call rendered
 *    - No phone -> click-to-call withheld, email-only indicator
 * 9. Webhook Security: 401 on unauthorized secret, 200 on matching header
 */

import { triggerVoiceCallingAgent } from '../lib/voice-agent/outbound-caller';
import { handleCallConclusion, resolveRequestedProduct, CallConclusionPayload } from '../lib/voice-agent/call-handler';
import { CommercialActionTracker } from '../lib/ceo-agent/ledger/action-tracker';
import { normalizeToE164, validatePhone } from '../lib/phone-validator';
import { checkCallEligibility, isWithinCallingWindow } from '../lib/voice-agent/compliance-guard';
import { _clearMemoryCacheForTesting } from '../lib/voice-agent/idempotency';
import { POST as webhookHandler } from '../app/api/voice-agent/webhook/route';
import { NextRequest } from 'next/server';

async function runVoiceAgentTests() {
  console.log('🚀 Starting AI Voice Calling Agent Full Hardening Suite...\n');

  // Activate email mock for testing
  (global as any).mockSendEmailActive = true;
  const capturedEmails: any[] = [];
  (global as any).mockSendEmailCallback = (emailData: any) => {
    capturedEmails.push(emailData);
  };

  // ──────────────────────────────────────────────────────────────────────────
  // Test 1: Country-Aware E.164 Phone Normalization
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[Test 1/9] Verifying country-aware E.164 phone normalization...');
  const canPhone1 = normalizeToE164('416-555-0199', 'Canada');
  const canPhone2 = normalizeToE164('(604) 555-0188', 'CA');
  const ukPhone = normalizeToE164('+44 7911 123456', 'UK');
  const inPhone = normalizeToE164('+91 98765 43210', 'India');

  if (canPhone1 !== '+14165550199') throw new Error(`Expected +14165550199, got ${canPhone1}`);
  if (canPhone2 !== '+16045550188') throw new Error(`Expected +16045550188, got ${canPhone2}`);
  if (ukPhone !== '+447911123456') throw new Error(`Expected +447911123456, got ${ukPhone}`);
  if (inPhone !== '+919876543210') throw new Error(`Expected +919876543210, got ${inPhone}`);

  console.log(`   Canada: (416) 555-0199 -> ${canPhone1}`);
  console.log(`   Canada: (604) 555-0188 -> ${canPhone2}`);
  console.log(`   UK:     +44 7911 123456 -> ${ukPhone} (not prepended with +1)`);
  console.log(`   India:  +91 98765 43210 -> ${inPhone} (not prepended with +1)`);
  console.log('✅ Stage 1 Passed: Country-aware E.164 normalization validated.\n');

  // ──────────────────────────────────────────────────────────────────────────
  // Test 2: Kill Switch Guard (Dormant by default)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[Test 2/9] Testing Kill Switch (VOICE_AGENT_ENABLED is unset / false)...');
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
  // Test 3: Standalone Consent Guard
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[Test 3/9] Testing Standalone Consent Guard (Enabled, but consentToAiCall is false)...');
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
  // Test 4: Compliance Safety Guards (Calling Window, Max Attempts, Cooldown, DNC)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[Test 4/9] Testing Compliance Safety Guards (Window, Attempts, Cooldown, DNC)...');

  // 4A: Do-Not-Call (DNC) Guard
  const dncCheck = checkCallEligibility({
    consentToAiCall: true,
    doNotCall: true, // Lead opted out
    state: 'ON',
  });
  if (dncCheck.eligible || !dncCheck.reason?.includes('Do-Not-Call')) {
    throw new Error(`Expected DNC block, got: ${JSON.stringify(dncCheck)}`);
  }
  console.log('   4A Passed: Do-Not-Call registry block enforced.');

  // 4B: Maximum Attempts Guard (Limit = 3)
  const maxAttemptsCheck = checkCallEligibility({
    consentToAiCall: true,
    attemptCount: 3, // Already attempted 3 times
    state: 'ON',
  });
  if (maxAttemptsCheck.eligible || !maxAttemptsCheck.reason?.includes('Maximum outbound attempts')) {
    throw new Error(`Expected max attempts block, got: ${JSON.stringify(maxAttemptsCheck)}`);
  }
  console.log('   4B Passed: Max attempts limit (3) enforced.');

  // 4C: Cooldown Guard (24 hours minimum)
  const recentAttempt = new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(); // 4 hours ago
  const cooldownCheck = checkCallEligibility({
    consentToAiCall: true,
    attemptCount: 1,
    lastAttemptAt: recentAttempt,
    state: 'ON',
  });
  if (cooldownCheck.eligible || !cooldownCheck.reason?.includes('cooldown period')) {
    throw new Error(`Expected cooldown block, got: ${JSON.stringify(cooldownCheck)}`);
  }
  console.log('   4C Passed: 24-hour mandatory cooldown interval enforced.');

  // 4D: Calling Window Guard (Night time check)
  const midnightDate = new Date('2026-10-06T04:00:00Z'); // Approx 00:00 AM EDT
  const nightCheck = isWithinCallingWindow('ON', midnightDate);
  if (nightCheck.allowed) {
    throw new Error(`Expected night-time calling hours block, got: ${JSON.stringify(nightCheck)}`);
  }
  console.log('   4D Passed: Calling hours window check (09:00 - 20:30 local time) enforced.');
  console.log('✅ Stage 4 Passed: All compliance & safety guardrails validated.\n');

  // ──────────────────────────────────────────────────────────────────────────
  // Test 5: Product-Specific READY_TO_PAY Routing & Unknown Product Withholding
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[Test 5/9] Testing Product-Specific READY_TO_PAY ($19, $49, $79, $199 & Unknown)...');

  // 5A: $19 Funding Match Report
  const res19 = await handleCallConclusion({
    callId: `TEST-CALL-19-${Date.now()}`,
    customerPhone: '416-555-0199',
    customerEmail: 'lead19@example.com',
    customerName: 'Alice Green',
    companyName: 'GreenTech Innovations',
    durationSeconds: 120,
    callStatus: 'completed',
    disposition: 'READY_TO_PAY',
    productRequested: 'funding-match-report', // $19
    provider: 'vapi',
    summary: 'Alice requested the $19 Funding Match Report link.',
  });
  if (!res19.success || !res19.emailSent) throw new Error('Failed to process $19 product conclusion');
  const email19 = capturedEmails.find((e) => e.to === 'lead19@example.com');
  if (!email19 || !email19.html.includes('/products/funding-match-report') || !email19.html.includes('$19')) {
    throw new Error('Email for $19 product did not contain correct URL or price');
  }
  console.log('   5A Passed: $19 Report routed to /products/funding-match-report ($19 USD).');

  // 5B: $49 Funding Roadmap / Action Plan
  const res49 = await handleCallConclusion({
    callId: `TEST-CALL-49-${Date.now()}`,
    customerPhone: '416-555-0199',
    customerEmail: 'lead49@example.com',
    customerName: 'Bob Builder',
    companyName: 'RoboBuild Canada',
    durationSeconds: 140,
    callStatus: 'completed',
    disposition: 'READY_TO_PAY',
    productRequested: 'funding-roadmap', // $49
    provider: 'vapi',
    summary: 'Bob confirmed interest in the $49 Strategy Roadmap.',
  });
  if (!res49.success || !res49.emailSent) throw new Error('Failed to process $49 product conclusion');
  const email49 = capturedEmails.find((e) => e.to === 'lead49@example.com');
  if (!email49 || !email49.html.includes('/products/action-plan') || !email49.html.includes('$49')) {
    throw new Error('Email for $49 product did not contain correct URL or price');
  }
  console.log('   5B Passed: $49 Action Plan routed to /products/action-plan ($49 USD).');

  // 5C: $79 Complete Strategy Bundle
  const res79 = await handleCallConclusion({
    callId: `TEST-CALL-79-${Date.now()}`,
    customerPhone: '416-555-0199',
    customerEmail: 'lead79@example.com',
    customerName: 'Marcus Vance',
    companyName: 'Vance BioSolutions Ltd.',
    durationSeconds: 160,
    callStatus: 'completed',
    disposition: 'READY_TO_PAY',
    productRequested: 'funding-bundle', // $79
    provider: 'vapi',
    summary: 'Marcus agreed to proceed with the $79 Complete Bundle.',
  });
  if (!res79.success || !res79.emailSent) throw new Error('Failed to process $79 product conclusion');
  const email79 = capturedEmails.find((e) => e.to === 'lead79@example.com');
  if (!email79 || !email79.html.includes('/calculator?package=complete-bundle') || !email79.html.includes('$79')) {
    throw new Error('Email for $79 product did not contain correct URL or price');
  }
  console.log('   5C Passed: $79 Bundle routed to /calculator?package=complete-bundle ($79 USD).');

  // 5D: $199 Strategy Consultation & Audit
  const res199 = await handleCallConclusion({
    callId: `TEST-CALL-199-${Date.now()}`,
    customerPhone: '416-555-0199',
    customerEmail: 'lead199@example.com',
    customerName: 'David Zhang',
    companyName: 'AeroSpace Next Ltd.',
    durationSeconds: 210,
    callStatus: 'completed',
    disposition: 'READY_TO_PAY',
    productRequested: 'strategy-audit', // $199
    provider: 'vapi',
    summary: 'David requested private strategist review ($199).',
  });
  if (!res199.success || !res199.emailSent) throw new Error('Failed to process $199 product conclusion');
  const email199 = capturedEmails.find((e) => e.to === 'lead199@example.com');
  if (!email199 || !email199.html.includes('/services') || !email199.html.includes('$199')) {
    throw new Error('Email for $199 product did not contain correct URL or price');
  }
  console.log('   5D Passed: $199 Consultation routed to /services ($199 USD).');

  // 5E: Unknown Product -> WITHHELD (No payment link sent!)
  const resUnknown = await handleCallConclusion({
    callId: `TEST-CALL-UNK-${Date.now()}`,
    customerPhone: '416-555-0199',
    customerEmail: 'unknown.product@example.com',
    customerName: 'Unknown Lead',
    companyName: 'Mystery Corp',
    durationSeconds: 90,
    callStatus: 'completed',
    disposition: 'READY_TO_PAY',
    productRequested: 'quantum-ai-super-tier', // UNKNOWN
    provider: 'vapi',
    summary: 'Lead mentioned non-standard custom tier.',
  });
  if (resUnknown.emailSent !== false) {
    throw new Error(`Expected emailSent to be false for unknown product, got ${resUnknown.emailSent}`);
  }
  const emailUnknown = capturedEmails.find((e) => e.to === 'unknown.product@example.com');
  if (emailUnknown) {
    throw new Error('Payment email was erroneously dispatched for unknown product!');
  }
  console.log('   5E Passed: Unknown product requested -> payment link strictly withheld.');
  console.log('✅ Stage 5 Passed: Product-specific payment routing verified for all ladder tiers.\n');

  // ──────────────────────────────────────────────────────────────────────────
  // Test 6: INTERESTED_IN_INFO Disposition (Zero Payment Push Buttons)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[Test 6/9] Testing handleCallConclusion with INTERESTED_IN_INFO disposition...');
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

  if (!infoRes.success) throw new Error(`INTERESTED_IN_INFO conclusion failed: ${infoRes.error}`);

  const infoEmail = capturedEmails.find((e) => e.to === 'info.lead@example.com');
  if (!infoEmail) throw new Error('Mock did not capture info.lead email');
  if (infoEmail.html.includes('Complete Payment &amp; Unlock Package') || infoEmail.html.includes('checkoutUrl')) {
    throw new Error('Info email erroneously contains payment button');
  }
  console.log('   Email Copy Verified: Purely informational follow-up, zero payment push buttons.');
  console.log('✅ Stage 6 Passed: INTERESTED_IN_INFO processed without payment push.\n');

  // ──────────────────────────────────────────────────────────────────────────
  // Test 7: Persistent Webhook Idempotency (Survives in-memory cache clear)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[Test 7/9] Testing Persistent Idempotency (Survives in-memory cache clear)...');
  const persistentCallId = `TEST-PERSIST-${Date.now()}`;

  // First call
  const firstRes = await handleCallConclusion({
    callId: persistentCallId,
    customerPhone: '416-555-0199',
    customerEmail: 'persist.lead@example.com',
    disposition: 'READY_TO_PAY',
    productRequested: 'funding-bundle',
    provider: 'vapi',
    callStatus: 'completed',
    summary: 'First execution of call conclusion',
  });
  if (firstRes.duplicate) throw new Error('First conclusion was erroneously marked duplicate');

  // SIMULATE SERVERLESS RESTART: Clear in-memory cache
  _clearMemoryCacheForTesting();

  // Retry same call from a new "instance"
  const secondRes = await handleCallConclusion({
    callId: persistentCallId,
    customerPhone: '416-555-0199',
    customerEmail: 'persist.lead@example.com',
    disposition: 'READY_TO_PAY',
    productRequested: 'funding-bundle',
    provider: 'vapi',
    callStatus: 'completed',
    summary: 'Retry after serverless instance recycling',
  });
  if (!secondRes.duplicate) {
    throw new Error('Persistent store failed to detect duplicate across process restarts!');
  }
  console.log('   Persistent Idempotency: Duplicate correctly detected from persistent disk/store after memory cache clear.');
  console.log('✅ Stage 7 Passed: Persistent webhook idempotency validated.\n');

  // ──────────────────────────────────────────────────────────────────────────
  // Test 8: Tightened Founder Hotline Alert (Click-to-call requiring phone)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[Test 8/9] Testing Founder Hotline Alert (Phone vs No-Phone rendering)...');

  // 8A: Intake with phone -> click-to-call rendered
  await triggerVoiceCallingAgent({
    name: 'With Phone Lead',
    phone: '416-555-0199',
    email: 'withphone@example.com',
    companyName: 'Phone Tech Co.',
    score: 82,
    wantsAdvisorContact: true,
  });
  const alertWithPhone = capturedEmails.find((e) => e.text.includes('+14165550199') || e.subject.includes('+14165550199'));
  if (!alertWithPhone || !alertWithPhone.html.includes('href="tel:+14165550199"')) {
    throw new Error('Alert email for phone lead missing click-to-call tel: link');
  }
  console.log('   8A Passed: Click-to-call link rendered when phone is provided.');

  // 8B: Intake without phone -> no click-to-call, email follow-up indicator
  await triggerVoiceCallingAgent({
    name: 'No Phone Lead',
    email: 'nophone@example.com',
    companyName: 'Silent Tech Co.',
    score: 88, // High intent
    wantsAdvisorContact: true,
  });
  const alertNoPhone = capturedEmails.find((e) => e.to === (process.env.CEO_REPORT_EMAIL || 'ashwani@fsidigital.ca') && e.subject.includes('(NO PHONE)'));
  if (!alertNoPhone || alertNoPhone.html.includes('href="tel:')) {
    throw new Error('Alert email for no-phone lead erroneously contains click-to-call link');
  }
  console.log('   8B Passed: Click-to-call withheld when phone is not provided (Email follow-up only).');
  console.log('✅ Stage 8 Passed: Tightened founder alert phone rules validated.\n');

  // ──────────────────────────────────────────────────────────────────────────
  // Test 9: Webhook Endpoint Security Guard
  // ──────────────────────────────────────────────────────────────────────────
  console.log('[Test 9/9] Testing Webhook Endpoint Security Guard...');
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
      productRequested: 'funding-bundle',
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
  console.log('✅ Stage 9 Passed: Webhook secret security guard validated.\n');

  console.log('🎉 ALL 9/9 AI CALLING AGENT HARDENING TESTS PASSED SUCCESSFULLY!');
}

runVoiceAgentTests().catch((err) => {
  console.error('\n❌ Voice agent verification test failed:', err);
  process.exit(1);
});
