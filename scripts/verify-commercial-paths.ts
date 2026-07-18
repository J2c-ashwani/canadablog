process.env.NODE_ENV = 'development';
process.env.GOOGLE_SHEET_ID = 'mock-sheet-id';
process.env.GOOGLE_SHEETS_CLIENT_EMAIL = 'mock-email@example.com';
process.env.GOOGLE_SHEETS_PRIVATE_KEY = 'mock-private-key';
process.env.RESEND_API_KEY = 're_mock_key_12345';

import { getPriorityResearchProfiles } from '../lib/editorial/priorityResearch';
import { POST as trackActivityHandler } from '../app/api/subscriber/track-activity/route';
import { POST as contactHandler } from '../app/api/contact/route';
import { POST as purchaseHandler } from '../app/api/products/purchase/route';
import { SubscriberRepository } from '../lib/leads/SubscriberRepository';
import * as mailer from '../lib/emails/mailer';
import * as purchaseStore from '../lib/products/purchase-store';
import * as contactMail from '../lib/emails/contact-confirmation';
import * as enterpriseAlerts from '../lib/emails/enterprise-alerts';
import * as subTokens from '../lib/auth/subscriber-tokens';
import { NextRequest } from 'next/server';
import { google } from 'googleapis';

// ── Auto-authorize activity tracking updates for testing ──
(subTokens as any).isLoginToken = (candidate: any, expected: any) => {
  return true;
};

// ── Intercept Global Fetch to capture Resend Email payloads ──
export let sentEmailsList: any[] = [];
const originalFetch = global.fetch;

global.fetch = (async (url: any, options: any) => {
  const urlStr = String(url);
  if (urlStr.includes('api.resend.com/emails')) {
    try {
      sentEmailsList.push(JSON.parse(options.body));
    } catch (e) {}
    return {
      ok: true,
      status: 200,
      json: async () => ({ id: 'mock-email-id' }),
      text: async () => 'mock-email-id'
    } as any;
  }
  return originalFetch(url, options);
}) as any;

// ── Mock googleapis module globally ──
google.sheets = () => {
  return {
    spreadsheets: {
      get: async () => {
        return { data: { sheets: [{ properties: { title: 'Purchases' } }, { properties: { title: 'Payment Intents' } }] } };
      },
      batchUpdate: async () => {
        return { data: {} };
      },
      values: {
        get: async (params: any) => {
          if (params.range.includes('Purchases')) {
            return { data: { values: sheetValuesStore } };
          }
          if (params.range.includes('Payment Intents')) {
            return { data: { values: paymentIntentsStore } };
          }
          return { data: { values: [] } };
        },
        append: async (params: any) => {
          if (params.range.includes('Purchases')) {
            const vals = params.requestBody?.values || [];
            sheetValuesStore.push(...vals);
          }
          if (params.range.includes('Payment Intents')) {
            const vals = params.requestBody?.values || [];
            paymentIntentsStore.push(...vals);
          }
          return { data: {} };
        },
        update: async (params: any) => {
          if (params.range.includes('Payment Intents')) {
            const match = params.range.match(/L(\d+)/) || params.range.match(/B(\d+)/);
            if (match) {
              const rowIdx = parseInt(match[1]) - 1;
              if (paymentIntentsStore[rowIdx]) {
                const vals = params.requestBody?.values?.[0] || [];
                if (params.range.includes('B')) {
                  paymentIntentsStore[rowIdx][1] = vals[0] || '';
                } else if (params.range.includes('L')) {
                  paymentIntentsStore[rowIdx][11] = vals[0] || '';
                  paymentIntentsStore[rowIdx][12] = vals[1] || '';
                  paymentIntentsStore[rowIdx][13] = vals[2] || '';
                }
              }
            }
          }
          return { data: {} };
        }
      }
    }
  } as any;
};

google.auth.GoogleAuth = class {
  constructor() {}
  async getClient() {
    return {};
  }
} as any;

// ── Mock CRM Lead Database Layer ──
let leadStore: Record<string, any> = {};

SubscriberRepository.saveSubscriber = async (profile: any) => {
  const email = profile.email.toLowerCase().trim();
  leadStore[email] = {
    ...leadStore[email],
    ...profile,
    timestamp: profile.timestamp || new Date().toISOString()
  };
  return { success: true };
};

SubscriberRepository.getSubscriberByEmail = async (email: string) => {
  const normalized = email.toLowerCase().trim();
  return leadStore[normalized] || null;
};

SubscriberRepository.updateSubscriberPreferences = async (email: string, updates: any) => {
  const normalized = email.toLowerCase().trim();
  if (leadStore[normalized]) {
    leadStore[normalized] = {
      ...leadStore[normalized],
      ...updates
    };
    return { success: true };
  }
  return { success: false, error: 'Lead not found' };
};

SubscriberRepository.getAllSubscribers = async () => {
  return Object.values(leadStore);
};

// ── Mock Token store ──
(purchaseStore as any).recordPurchaseInStore = async (pId: string, email: string, orderId: string) => {
  return { success: true, token: 'mock-token' };
};
(purchaseStore as any).getPurchaseFromStore = async (token: string) => {
  return { success: true, email: 'mock-email@example.com', productId: 'funding-match-report' };
};

// In-Memory Google Sheets Mock database
let sheetValuesStore: any[][] = [
  ['Purchase ID', 'Email', 'Product ID', 'Amount', 'Timestamp']
];
let paymentIntentsStore: any[][] = [
  ['Intent ID', 'PayPal Order ID', 'Email', 'Name', 'Product ID', 'Addons', 'Expected Amount', 'Currency', 'Profile Data', 'Attribution', 'Session ID', 'Status', 'Created At', 'Completed At']
];

async function runEndToEndVerification() {
  let failureCount = 0;
  console.log('🤖 Running Sprint 24 End-to-End Revenue Lifecycle Verification...');

  // Reset Sheets store
  sheetValuesStore = [['Purchase ID', 'Email', 'Product ID', 'Amount', 'Timestamp']];
  paymentIntentsStore = [['Intent ID', 'PayPal Order ID', 'Email', 'Name', 'Product ID', 'Addons', 'Expected Amount', 'Currency', 'Profile Data', 'Attribution', 'Session ID', 'Status', 'Created At', 'Completed At']];

  // 1. Report purchase only ($19)
  console.log('\n------------------------------------------------------');
  console.log('🧪 Test 1: Report purchase only ($19)');
  const email1 = 'buyer-report@fsidigital.ca';
  leadStore[email1] = { email: email1, name: 'Report Buyer', reportPurchased: false };
  
  const intentId1 = 'intent-123-1';
  paymentIntentsStore.push([
    intentId1, 'TEST-ORDER-19', email1, 'Report Buyer', 'funding-match-report', JSON.stringify({}), '19.00', 'USD',
    JSON.stringify({ province: 'ON', industry: 'technology', revenue: 'pre-revenue', goal: 'hiring' }),
    JSON.stringify({}), 'sess-123-1', 'created', new Date().toISOString(), ''
  ]);

  const purchaseReq1 = new NextRequest('http://localhost:3000/api/products/purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      paymentIntentId: intentId1,
      paypalOrderId: 'TEST-ORDER-19',
    })
  });
  const res1 = await purchaseHandler(purchaseReq1);
  const data1 = await res1.json();
  if (res1.status !== 200 || !data1.success) {
    console.error('❌ FAIL: Report purchase failed', data1);
    failureCount++;
  } else {
    const updated = leadStore[email1];
    if (updated.reportPurchased) {
      console.log('✅ PASS: Report purchased correctly logged.');
    } else {
      console.error('❌ FAIL: reportPurchased tag missing');
      failureCount++;
    }
  }

  // 2. Report + Toolkit purchase ($19 + $29 = $48)
  console.log('\n------------------------------------------------------');
  console.log('🧪 Test 2: Report + Toolkit purchase');
  const email2 = 'buyer-toolkit@fsidigital.ca';
  leadStore[email2] = { email: email2, name: 'Toolkit Buyer', reportPurchased: false };
  
  const intentId2 = 'intent-123-2';
  paymentIntentsStore.push([
    intentId2, 'TEST-ORDER-48', email2, 'Toolkit Buyer', 'funding-match-report', JSON.stringify({ toolkit: true, approvalLibrary: false, strategySession: false }), '48.00', 'USD',
    JSON.stringify({ province: 'ON', industry: 'technology', revenue: 'pre-revenue', goal: 'hiring' }),
    JSON.stringify({}), 'sess-123-2', 'created', new Date().toISOString(), ''
  ]);

  const purchaseReq2 = new NextRequest('http://localhost:3000/api/products/purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      paymentIntentId: intentId2,
      paypalOrderId: 'TEST-ORDER-48',
    })
  });
  const res2 = await purchaseHandler(purchaseReq2);
  const data2 = await res2.json();
  if (res2.status !== 200 || !data2.success) {
    console.error('❌ FAIL: Report + Toolkit purchase failed', data2);
    failureCount++;
  } else {
    console.log('✅ PASS: Report + Toolkit order processed successfully.');
  }

  // 3. Report + Strategy Session bump with Credit Applied ($180 Remaining, $199 Total package)
  console.log('\n------------------------------------------------------');
  console.log('🧪 Test 3: Report + Strategy upgrade credit applied ($180 Strategy + $19 Report)');
  const email3 = 'buyer-credit@fsidigital.ca';
  leadStore[email3] = { email: email3, name: 'Upgrade Buyer', reportPurchased: false, strategyReportPurchased: false };
  
  const intentId3 = 'intent-123-3';
  paymentIntentsStore.push([
    intentId3, 'TEST-ORDER-180', email3, 'Upgrade Buyer', 'funding-match-report', JSON.stringify({ toolkit: false, approvalLibrary: false, strategySession: true }), '199.00', 'USD',
    JSON.stringify({ province: 'ON', industry: 'technology', revenue: 'pre-revenue', goal: 'hiring' }),
    JSON.stringify({}), 'sess-123-3', 'created', new Date().toISOString(), ''
  ]);

  const purchaseReq3 = new NextRequest('http://localhost:3000/api/products/purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      paymentIntentId: intentId3,
      paypalOrderId: 'TEST-ORDER-180',
    })
  });
  const res3 = await purchaseHandler(purchaseReq3);
  const data3 = await res3.json();
  if (res3.status !== 200 || !data3.success) {
    console.error('❌ FAIL: Strategy order bump failed', data3);
    failureCount++;
  } else {
    const updated = leadStore[email3];
    if (updated.reportPurchased && updated.strategyReportPurchased) {
      console.log('✅ PASS: Both report and Strategy session purchases correctly logged via upgrade credit.');
    } else {
      console.error('❌ FAIL: strategyReportPurchased tag missing on upgrade credit');
      failureCount++;
    }
  }

  // 4. Strategy Session Only ($199)
  console.log('\n------------------------------------------------------');
  console.log('🧪 Test 4: Strategy Session Only direct purchase ($199)');
  const email4 = 'buyer-strategy@fsidigital.ca';
  leadStore[email4] = { email: email4, name: 'Strategy Buyer', strategyReportPurchased: false };
  
  const intentId4 = 'intent-123-4';
  paymentIntentsStore.push([
    intentId4, 'TEST-ORDER-199', email4, 'Strategy Buyer', 'strategy-audit', JSON.stringify({}), '199.00', 'USD',
    JSON.stringify({ province: 'ON', industry: 'technology', revenue: 'pre-revenue', goal: 'hiring' }),
    JSON.stringify({}), 'sess-123-4', 'created', new Date().toISOString(), ''
  ]);

  const purchaseReq4 = new NextRequest('http://localhost:3000/api/products/purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      paymentIntentId: intentId4,
      paypalOrderId: 'TEST-ORDER-199',
    })
  });
  const res4 = await purchaseHandler(purchaseReq4);
  const data4 = await res4.json();
  if (res4.status !== 200 || !data4.success) {
    console.error('❌ FAIL: Direct strategy session purchase failed', data4);
    failureCount++;
  } else {
    const updated = leadStore[email4];
    if (updated.strategyReportPurchased) {
      console.log('✅ PASS: Direct Strategy Session correctly logged.');
    } else {
      console.error('❌ FAIL: strategyReportPurchased tag missing');
      failureCount++;
    }
  }

  // 5. Enterprise Routing parameters validation
  console.log('\n------------------------------------------------------');
  console.log('🧪 Test 5: Enterprise Lead Routing & Qualification');
  const enterpriseEmail = 'founder-enterprise@fsidigital.ca';
  const contactReq = new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: enterpriseEmail,
      name: 'Enterprise Founder',
      companyName: 'Big Tech Corp',
      annualRevenue: 'over-1m',
      businessStage: 'growth',
      industry: 'technology',
      employees: '21-100',
      fundingAmount: '$500k',
      fundingPurpose: 'research',
      timeline: 'immediately',
      phone: '416-555-1234',
      businessDescription: 'Enterprise high tech grant stack design.',
      category: 'General'
    })
  });
  const contactRes = await contactHandler(contactReq);
  const contactData = await contactRes.json();
  if (contactRes.status !== 200 || !contactData.success) {
    console.error('❌ FAIL: Enterprise contact registration failed', contactData);
    failureCount++;
  } else {
    if (contactData.tier === 'A') {
      console.log('✅ PASS: Enterprise lead successfully categorized as Tier A.');
    } else {
      console.error('❌ FAIL: Enterprise lead misclassified:', contactData);
      failureCount++;
    }
  }

  // 6. Repeat Customer credit guard validation
  console.log('\n------------------------------------------------------');
  console.log('🧪 Test 6: Repeat Customer Credit Guard (Security & Fraud Prevention)');
  const email6 = 'buyer-repeat@fsidigital.ca';
  leadStore[email6] = { email: email6, name: 'Repeat Buyer', reportPurchased: false, strategyReportPurchased: false };
  
  // Step A: Buy report first
  console.log('  Step A: Simulating first purchase (Report only for $19)...');
  const intentId6A = 'intent-123-6a';
  paymentIntentsStore.push([
    intentId6A, 'ORDER-REP-1', email6, 'Repeat Buyer', 'funding-match-report', JSON.stringify({}), '19.00', 'USD',
    JSON.stringify({ province: 'ON', industry: 'technology', revenue: 'pre-revenue', goal: 'hiring' }),
    JSON.stringify({}), 'sess-123-6a', 'created', new Date().toISOString(), ''
  ]);

  const purchaseReq6A = new NextRequest('http://localhost:3000/api/products/purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      paymentIntentId: intentId6A,
      paypalOrderId: 'ORDER-REP-1',
    })
  });
  const res6A = await purchaseHandler(purchaseReq6A);
  const data6A = await res6A.json();
  if (res6A.status !== 200 || !data6A.success) {
    console.error('  ❌ FAIL: First purchase failed', data6A);
    failureCount++;
  } else {
    console.log('  ✅ First purchase recorded.');
  }

  // Step B: Buy Strategy Session using upgrade credit ($180)
  console.log('  Step B: Simulating second purchase (Strategy Session using credit for $180)...');
  const intentId6B = 'intent-123-6b';
  paymentIntentsStore.push([
    intentId6B, 'ORDER-REP-2', email6, 'Repeat Buyer', 'funding-match-report', JSON.stringify({ toolkit: false, approvalLibrary: false, strategySession: true }), '199.00', 'USD',
    JSON.stringify({ province: 'ON', industry: 'technology', revenue: 'pre-revenue', goal: 'hiring' }),
    JSON.stringify({}), 'sess-123-6b', 'created', new Date().toISOString(), ''
  ]);

  const purchaseReq6B = new NextRequest('http://localhost:3000/api/products/purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      paymentIntentId: intentId6B,
      paypalOrderId: 'ORDER-REP-2',
    })
  });
  const res6B = await purchaseHandler(purchaseReq6B);
  const data6B = await res6B.json();
  if (res6B.status !== 200 || !data6B.success) {
    console.error('  ❌ FAIL: Upgrade purchase failed', data6B);
    failureCount++;
  } else {
    console.log('  ✅ Upgrade purchase recorded.');
  }

  // Step C: Try to buy ANOTHER Strategy Session. Credit should NOT be applied.
  console.log('  Step C: Simulating third purchase (Attempting second Strategy Session purchase)...');
  const intentId6C = 'intent-123-6c';
  paymentIntentsStore.push([
    intentId6C, 'ORDER-REP-3', email6, 'Repeat Buyer', 'strategy-audit', JSON.stringify({}), '199.00', 'USD',
    JSON.stringify({ province: 'ON', industry: 'technology', revenue: 'pre-revenue', goal: 'hiring' }),
    JSON.stringify({}), 'sess-123-6c', 'created', new Date().toISOString(), ''
  ]);

  const purchaseReq6C = new NextRequest('http://localhost:3000/api/products/purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      paymentIntentId: intentId6C,
      paypalOrderId: 'ORDER-REP-3',
    })
  });
  const res6C = await purchaseHandler(purchaseReq6C);
  const data6C = await res6C.json();
  if (res6C.status !== 200 || !data6C.success) {
    console.error('  ❌ FAIL: Third purchase failed', data6C);
    failureCount++;
  } else {
    const thirdRow = sheetValuesStore.find(r => r[5] === 'ORDER-REP-3');
    if (thirdRow && parseFloat(thirdRow[4]) === 199.00) {
      console.log('  ✅ PASS: Credit correctly blocked on third purchase. Customer billed full $199.');
    } else {
      console.error('  ❌ FAIL: Credit was incorrectly reapplied! Row recorded:', thirdRow);
      failureCount++;
    }
  }

  // 7. A/B Variant Attribution & RPV Test
  console.log('\n------------------------------------------------------');
  console.log('🧪 Test 7: A/B Variant Attribution & RPV Test');
  const email7A = 'variant-a@fsidigital.ca';
  const email7B = 'variant-b@fsidigital.ca';
  leadStore[email7A] = { email: email7A, name: 'Variant A User', reportPurchased: false, loginToken: 'login_v3_token_a_12345678901234567890' };
  leadStore[email7B] = { email: email7B, name: 'Variant B User', reportPurchased: false, loginToken: 'login_v3_token_b_12345678901234567890' };

  // Track activity for Variant A
  const trackReq7A = new NextRequest('http://localhost:3000/api/subscriber/track-activity', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email7A,
      token: 'login_v3_token_a_12345678901234567890',
      event: 'calculator_completed',
      source: 'Calculator',
      calculator_cta_variant: 'A'
    })
  });
  await trackActivityHandler(trackReq7A);

  // Track activity for Variant B
  const trackReq7B = new NextRequest('http://localhost:3000/api/subscriber/track-activity', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email7B,
      token: 'login_v3_token_b_12345678901234567890',
      event: 'calculator_completed',
      source: 'Calculator',
      calculator_cta_variant: 'B'
    })
  });
  await trackActivityHandler(trackReq7B);

  // Assert that lead store holds variant assignments
  const userA = leadStore[email7A];
  const userB = leadStore[email7B];
  const activityA = JSON.parse(userA.leadActivity || '{}');
  const activityB = JSON.parse(userB.leadActivity || '{}');

  if (activityA.calculator_cta_variant === 'A' && activityB.calculator_cta_variant === 'B') {
    console.log('  ✅ PASS: A/B variants correctly attributed inside CRM Subscriber logs.');
  } else {
    console.error('  ❌ FAIL: Variant logging attribution mismatch!', activityA, activityB);
    failureCount++;
  }

  // 8. Enterprise Opportunity Value calculations
  console.log('\n------------------------------------------------------');
  console.log('🧪 Test 8: Enterprise Opportunity Value Calculations & Alerts');
  const email8 = 'enterprise-scoring@fsidigital.ca';
  const contactReq8 = new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email8,
      name: 'Opportunity Founder',
      companyName: 'Opportunity Corp',
      annualRevenue: 'over-1m',
      businessStage: 'growth',
      industry: 'technology',
      employees: '21-100',
      fundingAmount: '$500K–$1M', // fundingAmount midpoint $750k
      fundingPurpose: 'research',
      timeline: 'immediately',
      phone: '416-555-9876',
      businessDescription: 'Testing opportunity calculation alerts.',
      category: 'General'
    })
  });
  const res8 = await contactHandler(contactReq8);
  const data8 = await res8.json();
  if (res8.status !== 200 || !data8.success) {
    console.error('  ❌ FAIL: Contact registration failed', data8);
    failureCount++;
  } else {
    // Retainer ($2,500) + 10% of $750k ($75,000) = $77,500
    const alertEmail = sentEmailsList.find(e => 
      e.tags?.some((t: any) => t.name === 'type' && t.value === 'enterprise-sales-alert') ||
      e.text?.includes('PRIORITY ENTERPRISE LEAD')
    );
    if (alertEmail && alertEmail.text?.includes('$77,500')) {
      console.log('  ✅ PASS: Opportunity value correctly computed and dispatch alert contains $77,500.');
    } else {
      console.error('  ❌ FAIL: Opportunity value miscalculation! Email alert data:', alertEmail, 'Total Sent Emails:', sentEmailsList);
      failureCount++;
    }
  }

  console.log('\n======================================================');
  if (failureCount === 0) {
    console.log('🎉 SUCCESS: Verified all Sprint 24 Revenue Lifecycle flows successfully. 0 failures.');
    process.exit(0);
  } else {
    console.error(`❌ FAILURE: Found ${failureCount} commercial lifecycle violations.`);
    process.exit(1);
  }
}

runEndToEndVerification().catch((err) => {
  console.error('Fatal test execution error:', err);
  process.exit(1);
});
