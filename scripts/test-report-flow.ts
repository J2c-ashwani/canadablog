import path from 'path';
import dotenv from 'dotenv';

// Load .env.local environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

import { SubscriberRepository } from '../lib/leads/SubscriberRepository';
import { sendReportPurchaseEmail } from '../lib/emails/report-purchase';

async function runTests() {
  console.log('🚀 Starting Phase 3.9 Integration Tests...');
  const testEmail = 'test-report-purchase@fsidigital.ca';

  try {
    // 1. Check if test subscriber exists or register a new one
    console.log(`\n🔍 Checking if test subscriber: ${testEmail} exists...`);
    let subscriber = await SubscriberRepository.getSubscriberByEmail(testEmail);

    if (!subscriber) {
      console.log('➕ Creating a new test subscriber profile...');
      const registerRes = await SubscriberRepository.saveSubscriber({
        email: testEmail,
        name: 'Test Report Owner',
        country: 'Canada',
        region: 'ON',
        industry: 'technology',
        companySize: '10-49',
        fundingInterests: ['Grants'],
        website: 'https://testcompany.com',
        companyName: 'Test Company Inc'
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

    console.log('📋 Loaded Subscriber State:');
    console.log(`  Name: ${subscriber.name}`);
    console.log(`  Company: ${subscriber.companyName}`);
    console.log(`  Website: ${subscriber.website}`);
    console.log(`  Report Purchased: ${subscriber.reportPurchased}`);
    console.log(`  Report Transaction ID: ${subscriber.reportTransactionId}`);

    // 2. Validate new fields on subscriber object
    if (subscriber.companyName !== 'Test Company Inc' || subscriber.website !== 'https://testcompany.com') {
      throw new Error('❌ Test Failed: Company Name or Website was not retrieved correctly!');
    }
    console.log('✅ Success: Qualifying company details are present.');

    // 3. Upgrade to Purchased Status
    console.log('\n⏳ Updating profile to reportPurchased status...');
    const testTxId = `TEST-TX-ID-${Date.now()}`;
    const purchaseRes = await SubscriberRepository.updateSubscriberPreferences(testEmail, {
      reportPurchased: true,
      reportTransactionId: testTxId
    });

    if (!purchaseRes.success) {
      throw new Error(`Failed to update reportPurchased status: ${purchaseRes.error}`);
    }

    const updated = await SubscriberRepository.getSubscriberByEmail(testEmail);
    if (!updated || !updated.reportPurchased || updated.reportTransactionId !== testTxId) {
      throw new Error('❌ Test Failed: reportPurchased or transactionId was not successfully written!');
    }
    console.log('✅ Success: reportPurchased and reportTransactionId are correctly mapped to Google Sheets.');
    console.log(`  Report Purchased: ${updated.reportPurchased}`);
    console.log(`  Transaction ID: ${updated.reportTransactionId}`);

    // 4. Test Email Sending Compilation
    console.log('\n✉️ Testing purchase receipt email dispatch...');
    const emailRes = await sendReportPurchaseEmail({
      to: updated.email,
      name: updated.name || 'Founder',
      loginToken: updated.loginToken || 'mock-token',
      companyName: updated.companyName || 'Test Company Inc',
      readinessScore: 82,
      estimatedFunding: '$150,000 - $350,000+'
    });

    if (emailRes.skipped) {
      console.log('ℹ️ Email dispatch skipped (RESEND_API_KEY not configured). Email template compiled successfully.');
    } else if (!emailRes.success) {
      throw new Error(`Email dispatch failed: ${emailRes.error}`);
    } else {
      console.log('✅ Success: Purchase receipt email dispatched.');
    }

    // 5. Cleanup
    console.log('\n🧹 Cleaning up test subscriber parameters...');
    await SubscriberRepository.updateSubscriberPreferences(testEmail, {
      reportPurchased: false,
      reportTransactionId: 'N/A'
    });
    console.log('✅ Cleanup completed successfully.');
    console.log('\n🎉 ALL PHASE 3.9 INTEGRATION TESTS PASSED!');

  } catch (err: any) {
    console.error('\n❌ TEST SUITE RUNTIME EXCEPTION:');
    console.error(err.message || err);
    process.exit(1);
  }
}

runTests();
