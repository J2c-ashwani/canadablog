import path from 'path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

import { SubscriberRepository } from '../lib/leads/SubscriberRepository';

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

async function runEndToEndTests() {
  console.log('🧪 Starting End-to-End Funnel Verification Tests...');
  const testEmail = 'test-e2e-calc-lead@fsidigital.ca';

  try {
    // 0. Ensure no leftover test lead exists
    console.log(`\n🧹 Preparing sheet: checking for existing test lead: ${testEmail}...`);
    const existing = await SubscriberRepository.getSubscriberByEmail(testEmail);
    if (existing) {
      console.log('🗑️ Leftover test lead found. Cleaning up...');
      await SubscriberRepository.updateSubscriberPreferences(testEmail, {
        isSubscribed: false,
        email: 'test-e2e-calc-lead-deleted@fsidigital.ca'
      });
    }

    // 1. Test Calculator Lead Submission (Empty Company & Phone)
    console.log('\n1️⃣ Testing calculator submission (category = "Grant Calculator")...');
    const calcPayload = {
      name: '',
      email: testEmail,
      phone: '',
      category: 'Grant Calculator',
      companyName: '',
      country: 'Canada',
      state: 'on',
      industry: 'technology',
      businessStage: 'pre-revenue',
      fundingAmount: 'Under $25K',
      fundingPurpose: 'hiring',
      businessDescription: 'Test E2E calculator lead capture validation check',
      consentToPartnerContact: true,
      requestType: 'Grant Calculator'
    };

    const calcRes = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(calcPayload)
    });

    const calcData: any = await calcRes.json();
    console.log(`   Response status: ${calcRes.status}`);
    console.log(`   Response body:`, calcData);

    if (calcRes.status !== 200 || !calcData.success) {
      throw new Error(`❌ Test Failed: Calculator submission was rejected! status: ${calcRes.status}`);
    }
    console.log('✅ Success: Calculator submission was accepted.');

    // 2. Verify Lead in Google Sheets
    console.log('\n2️⃣ Verifying lead details in Google Sheets via SubscriberRepository...');
    // Sheets update is async, wait a second
    await new Promise(r => setTimeout(r, 1500));

    const sub = await SubscriberRepository.getSubscriberByEmail(testEmail);
    if (!sub) {
      throw new Error('❌ Test Failed: Lead was not found in Google Sheets after submission!');
    }

    console.log('📋 Captured Subscriber State:');
    console.log(`  Name: ${sub.name} (Expected: Founder)`);
    console.log(`  Company: ${sub.companyName} (Expected: Not provided)`);
    console.log(`  Phone: ${sub.phone} (Expected: Not provided)`);
    console.log(`  Region: ${sub.region}`);
    console.log(`  Industry: ${sub.industry}`);

    if (sub.name !== 'Founder' || sub.companyName !== 'Not provided' || sub.phone !== 'Not provided') {
      throw new Error('❌ Test Failed: Defaults were not correctly applied to empty fields!');
    }
    console.log('✅ Success: Lead successfully captured with correct defaulted parameters.');

    // 3. Test General Contact Submission (Should fail without phone/company)
    console.log('\n3️⃣ Testing general contact submission with missing required fields...');
    const generalPayload = {
      name: 'General Inquirer',
      email: 'general-inquiry@fsidigital.ca',
      phone: '',
      category: 'General',
      companyName: '',
      country: 'Canada',
      state: 'on',
      industry: 'technology',
      businessStage: 'pre-revenue',
      fundingAmount: 'Under $25K',
      fundingPurpose: 'hiring',
      businessDescription: 'Standard contact form test inquiry',
      requestType: 'General'
    };

    const generalRes = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(generalPayload)
    });

    const generalData: any = await generalRes.json();
    console.log(`   Response status: ${generalRes.status} (Expected: 400)`);
    console.log(`   Response body:`, generalData);

    if (generalRes.status !== 400) {
      throw new Error(`❌ Test Failed: General contact form accepted empty company/phone parameters! status: ${generalRes.status}`);
    }
    console.log('✅ Success: General contact form correctly rejected empty parameters.');

    // 4. Cleanup
    console.log('\n🧹 Cleaning up test lead from Google Sheets...');
    await SubscriberRepository.updateSubscriberPreferences(testEmail, {
      isSubscribed: false,
      email: 'test-e2e-calc-lead-deleted@fsidigital.ca'
    });
    console.log('✅ Cleanup completed.');

    console.log('\n🎉 ALL END-TO-END FUNNEL TESTS PASSED!');
    process.exit(0);

  } catch (err: any) {
    console.error('\n❌ TEST SUITE RUNTIME EXCEPTION:');
    console.error(err.message || err);
    process.exit(1);
  }
}

runEndToEndTests();
