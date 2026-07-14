process.env.NODE_ENV = 'development';
process.env.GOOGLE_SHEET_ID = 'mock-sheet-id';
process.env.GOOGLE_SHEETS_CLIENT_EMAIL = 'mock-email@example.com';
process.env.GOOGLE_SHEETS_PRIVATE_KEY = 'mock-private-key';

import { getPriorityResearchProfiles } from '../lib/editorial/priorityResearch';
import { POST as trackActivityHandler } from '../app/api/subscriber/track-activity/route';
import { POST as contactHandler } from '../app/api/contact/route';
import { POST as purchaseHandler } from '../app/api/products/purchase/route';
import { SubscriberRepository } from '../lib/leads/SubscriberRepository';
import * as mailer from '../lib/emails/mailer';
import * as purchaseStore from '../lib/products/purchase-store';
import * as contactMail from '../lib/emails/contact-confirmation';
import { NextRequest } from 'next/server';
import { google } from 'googleapis';

// ── Mock googleapis module globally ──
google.sheets = () => {
  return {
    spreadsheets: {
      get: async () => {
        return { data: { sheets: [{ properties: { title: 'Purchases' } }] } };
      },
      batchUpdate: async () => {
        return { data: {} };
      },
      values: {
        get: async () => {
          return { data: { values: [] } };
        },
        append: async () => {
          return { data: {} };
        },
        update: async () => {
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

// ── Mock CRM Lead Database Layer to prevent real Google Sheets/database API calls ──
let leadStore: Record<string, any> = {};

SubscriberRepository.getSubscriberByEmail = async (email: string) => {
  return leadStore[email] || null;
};

SubscriberRepository.updateSubscriberPreferences = async (email: string, updates: any) => {
  if (leadStore[email]) {
    leadStore[email] = { ...leadStore[email], ...updates };
  }
  return { success: true };
};

SubscriberRepository.saveSubscriber = async (data: any) => {
  leadStore[data.email] = { ...data, offlineStatus: 'Lead' };
  return { success: true };
};

// ── Mock Contact Confirmation Email ──
(contactMail as any).sendContactConfirmation = async (lead: any) => {
  return { success: true };
};

// ── Mock Email Mailer ──
(mailer as any).sendEmail = async (options: any) => {
  return { success: true, messageId: 'mock-msg-id-12345' };
};

// ── Mock Purchase Store ──
let purchaseRecords: any[] = [];
(purchaseStore as any).recordPurchase = async (purchase: any) => {
  purchaseRecords.push(purchase);
  return { success: true };
};
(purchaseStore as any).getAllPurchases = async () => {
  return purchaseRecords;
};

const APPROVED_PATTERNS = [
  /^\/products\/funding-match-report/,
  /^\/products\/action-plan/,
  /^\/products\/toolkit/,
  /^\/products\/approval-library/,
  /^\/audit/,
  /^\/calculator/,
  /^\/booking/
];

console.log('🏁 Starting End-to-End Commercial Flow & Telemetry Attribution Verification...');

const profiles = getPriorityResearchProfiles();
let failureCount = 0;

async function runEndToEndVerification() {
  for (const profile of profiles) {
    const route = profile.route;
    const href = profile.cta.href;
    const testEmail = `founder-${Math.random().toString(36).substring(7)}@fsidigital.ca`;

    console.log(`\n======================================================`);
    console.log(`Testing Route: ${route}`);
    console.log(`  - CTA Link: ${href}`);

    // Check 1: Check deprecated link path
    if (href.includes('/portfolio')) {
      console.error(`  ❌ FAIL: Link contains deprecated "/portfolio" route!`);
      failureCount++;
      continue;
    }

    const isApproved = APPROVED_PATTERNS.some((pattern) => pattern.test(href));
    if (!isApproved) {
      console.error(`  ❌ FAIL: Link "${href}" does not map to any approved monetization endpoint!`);
      failureCount++;
      continue;
    }

    // Pre-seed the subscriber in the mock lead store so the telemetry API route can resolve them
    leadStore[testEmail] = {
      email: testEmail,
      name: 'Sprint 19 Tester',
      country: 'Canada',
      region: 'ON',
      industry: 'technology',
      leadActivity: '{}',
      offlineStatus: 'Lead'
    };

    // Step 1: Telemetry Event Logging (User clicks CTA and lands on page)
    console.log(`  Step 1: Simulating Telemetry Activity Event...`);
    const trackReq = new NextRequest('http://localhost:3000/api/subscriber/track-activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        event: 'homepage_product_clicked',
        productId: href.includes('toolkit') ? 'funding-toolkit' : 'strategy-audit',
        source: route
      })
    });
    const trackRes = await trackActivityHandler(trackReq);
    const trackData = await trackRes.json();
    if (trackRes.status !== 200 || !trackData.success) {
      console.error(`  ❌ FAIL: Telemetry tracking event registration failed!`, trackData);
      failureCount++;
      continue;
    }
    console.log(`  ✅ Telemetry registered successfully.`);

    // Step 2: Lead Capture (User completes form)
    console.log(`  Step 2: Simulating Lead Capture API Submission...`);
    const contactReq = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        name: 'Sprint 19 Tester',
        companyName: 'Test Corp',
        country: 'Canada',
        state: 'ON',
        industry: 'technology',
        businessStage: 'Startup',
        employees: '1-9',
        annualRevenue: '100k',
        fundingAmount: '200000',
        fundingPurpose: 'R&D expansion',
        businessDescription: 'Developing artificial intelligence software.',
        timeline: 'Immediate',
        consentToPartnerContact: true,
        category: 'Grant Calculator'
      })
    });
    const contactRes = await contactHandler(contactReq);
    const contactData = await contactRes.json();
    if (contactRes.status !== 200 || !contactData.success) {
      console.error(`  ❌ FAIL: Lead capture registration failed!`, contactData);
      failureCount++;
      continue;
    }
    console.log(`  ✅ Lead registered in local CRM database.`);

    // Step 3: Purchase Processing & Revenue Attribution (User completes purchase)
    console.log(`  Step 3: Simulating Purchase Checkout Completion & Attribution...`);
    const purchaseReq = new NextRequest('http://localhost:3000/api/products/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: href.includes('toolkit') ? 'funding-toolkit' : href.includes('funding-match-report') ? 'funding-match-report' : 'strategy-audit',
        email: testEmail,
        name: 'Sprint 19 Tester',
        paypalOrderId: `TEST-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        profileData: {
          province: 'ON',
          industry: 'technology'
        },
        attribution: {
          landingPage: route,
          referrer: 'google',
          utmSource: 'organic-seo',
          utmMedium: 'blog',
          utmCampaign: 'sprint19-redirects',
          device: 'desktop',
          browser: 'chrome',
          country: 'Canada'
        }
      })
    });
    const purchaseRes = await purchaseHandler(purchaseReq);
    const purchaseData = await purchaseRes.json();
    if (purchaseRes.status !== 200 || !purchaseData.success) {
      console.error(`  ❌ FAIL: Purchase processing failed!`, purchaseData);
      failureCount++;
      continue;
    }
    console.log(`  ✅ Purchase processed and Revenue Attribution registered.`);
    
    // Verify resolved attribution in lead storage
    const storedLead = leadStore[testEmail];
    if (storedLead && storedLead.utmSource === 'organic-seo') {
      console.log(`  ✅ VERIFIED: End-to-end attribution properties attached to subscriber profile!`);
    } else {
      console.error(`  ❌ FAIL: Attribution tags missing in database profile!`, storedLead);
      failureCount++;
    }
  }

  console.log('\n======================================================');
  if (failureCount === 0) {
    console.log(`🎉 SUCCESS: Verified all ${profiles.length} priority paths end-to-end. 0 failures.`);
    process.exit(0);
  } else {
    console.error(`❌ FAILURE: Found ${failureCount} end-to-end path/attribution violations.`);
    process.exit(1);
  }
}

runEndToEndVerification().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
