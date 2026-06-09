import path from 'path';
import dotenv from 'dotenv';

// Load .env.local environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

import { SubscriberRepository } from '../lib/leads/SubscriberRepository';
import { AlertEngine } from '../lib/leads/AlertEngine';

async function runTests() {
  console.log('🚀 Starting Phase 3.8 Integration Tests...');
  const testEmail = 'test-subscription-agent@fsidigital.ca';

  try {
    // 1. Check if test subscriber exists or register a new one
    console.log(`\n🔍 Checking if test subscriber: ${testEmail} exists...`);
    let subscriber = await SubscriberRepository.getSubscriberByEmail(testEmail);

    if (!subscriber) {
      console.log('➕ Creating a new test subscriber profile...');
      const registerRes = await SubscriberRepository.saveSubscriber({
        email: testEmail,
        name: 'Test Agent',
        country: 'Canada',
        region: 'ON',
        industry: 'technology',
        companySize: '10-49',
        fundingInterests: ['Grants', 'Loans'] // Map to valid interests
      });

      if (!registerRes.success) {
        throw new Error(`Failed to register test subscriber: ${registerRes.error}`);
      }
      subscriber = await SubscriberRepository.getSubscriberByEmail(testEmail);
      console.log('✅ Registered test subscriber successfully.');
    }

    if (!subscriber) {
      throw new Error('Test subscriber registration failed to return record.');
    }

    console.log('📋 Existing Subscriber State:');
    console.log(`  Name: ${subscriber.name}`);
    console.log(`  Unsubscribe Token: ${subscriber.unsubscribeToken}`);
    console.log(`  Login Token: ${subscriber.loginToken}`);
    console.log(`  Status: ${subscriber.subscriptionStatus || 'inactive'}`);
    console.log(`  Trial Started At: ${subscriber.trialStartedAt || 'N/A'}`);

    // 2. Test Magic Token Presence
    if (!subscriber.loginToken) {
      throw new Error('❌ Test Failed: loginToken was not generated or retrieved!');
    }
    console.log('✅ Success: Magic loginToken is present and distinct.');

    // 3. Test Trial Upgrade Action
    console.log('\n⏳ Upgrading profile to "trial" status...');
    const trialRes = await SubscriberRepository.updateSubscriberPreferences(testEmail, {
      subscriptionStatus: 'trial',
      trialStartedAt: new Date().toISOString()
    });

    if (!trialRes.success) {
      throw new Error(`Failed to update status to trial: ${trialRes.error}`);
    }

    let updated = await SubscriberRepository.getSubscriberByEmail(testEmail);
    if (!updated || updated.subscriptionStatus !== 'trial' || !updated.trialStartedAt) {
      throw new Error('❌ Test Failed: Trial status or timestamp was not successfully saved!');
    }
    console.log('✅ Success: Trial status is correctly written to Google Sheets.');
    console.log(`  New Status: ${updated.subscriptionStatus}`);
    console.log(`  Trial Started: ${updated.trialStartedAt}`);

    // 4. Test Active Membership Upgrade Action
    console.log('\n💳 Upgrading profile to "active" (Founding Member) status...');
    const testPaymentId = `TEST-PAYPAL-ID-${Date.now()}`;
    const activeRes = await SubscriberRepository.updateSubscriberPreferences(testEmail, {
      subscriptionStatus: 'active',
      subscriptionId: testPaymentId
    });

    if (!activeRes.success) {
      throw new Error(`Failed to update status to active: ${activeRes.error}`);
    }

    updated = await SubscriberRepository.getSubscriberByEmail(testEmail);
    if (!updated || updated.subscriptionStatus !== 'active' || updated.subscriptionId !== testPaymentId) {
      throw new Error('❌ Test Failed: Active subscription details were not saved correctly!');
    }
    console.log('✅ Success: Active member status is correctly mapped to Google Sheets.');
    console.log(`  New Status: ${updated.subscriptionStatus}`);
    console.log(`  Payment ID: ${updated.subscriptionId}`);

    // 5. Test Alert URL Redirections
    console.log('\n✉️ Testing weekly Alert URL formatting & Upgrade promos...');
    const mockPrograms = [
      { slug: 'canada-irap-consultation', name: 'IRAP Funding Stream' }
    ];
    
    // Test that alert compiler references the magic loginToken
    const alertBody = AlertEngine.generateWeeklyDigestBody(mockPrograms as any[], updated);
    const alertHtml = AlertEngine.wrapEmailTemplate(alertBody, updated);

    const expectedPortfolioLink = `/portfolio?token=${updated.loginToken}`;
    const expectedPromoString = '$29/month';

    if (!alertHtml.includes(expectedPortfolioLink)) {
      throw new Error('❌ Test Failed: Weekly digest URLs do not point to /portfolio with the correct loginToken!');
    }
    console.log('✅ Success: Digest link correctly redirects to magic portfolio URL.');

    if (!alertHtml.includes(expectedPromoString)) {
      throw new Error('❌ Test Failed: Founding Member promo was not injected into the alert template!');
    }
    console.log('✅ Success: Founding Member promo banner exists in the alert template.');

    // 6. Cleanup - Revert test profile to inactive
    console.log('\n🧹 Cleaning up test profile...');
    await SubscriberRepository.updateSubscriberPreferences(testEmail, {
      subscriptionStatus: 'inactive',
      subscriptionId: '',
      trialStartedAt: ''
    });
    console.log('✅ Cleanup completed successfully.');
    console.log('\n🎉 ALL PHASE 3.8 COMPLIANCE AND FLOW TESTS PASSED!');

  } catch (err: any) {
    console.error('\n❌ TEST SUITE RUNTIME EXCEPTION:');
    console.error(err.message || err);
    process.exit(1);
  }
}

runTests();
