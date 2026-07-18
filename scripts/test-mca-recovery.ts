// scripts/test-mca-recovery.ts
// Integration test to verify the MCA Priority Recovery Engine.

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import {
  appendMCAApplication,
  getMCAApplications,
  updateMCAApplicationRecovery,
  getMCAConfig,
  generateApplicationId,
} from '../lib/mca/sheets';
import { sendMCARecoveryEmail1 } from '../lib/emails/mca-recovery';
import type { MCAApplication } from '../lib/mca/types';

async function runTest() {
  console.log('🏁 Starting MCA Priority Recovery Engine test suite...');

  // 1. Fetch delays configuration
  console.log('\nChecking Configuration spreadsheet...');
  const config = await getMCAConfig();
  console.log('Delays read from sheet:', {
    stage1: config['Recovery Stage 1 Delay (Hours)'] ?? '1 (Default)',
    stage2: config['Recovery Stage 2 Delay (Hours)'] ?? '6 (Default)',
    stage3: config['Recovery Stage 3 Delay (Hours)'] ?? '24 (Default)',
  });

  const delay1Hours = parseFloat(config['Recovery Stage 1 Delay (Hours)'] || '1');
  const elapsedMsNeeded = (delay1Hours * 60 * 60 * 1000) + 10000; // slightly older than delay1

  // 2. Create mock abandoned applicant (e.g. applied 1.5 hours ago)
  const timestamp = new Date(Date.now() - elapsedMsNeeded).toISOString();
  const applicationId = generateApplicationId();
  const testEmail = `recovery-test-${Math.random().toString(36).substring(2, 8)}@example.com`;
  const recoveryToken = `mca_rec_test_${Math.random().toString(36).substring(2, 10)}`;

  const mockApp: MCAApplication = {
    timestamp,
    applicationId,
    legalBusinessName: 'Recovery Test LLC',
    tradeName: 'Rec Test',
    businessAddress: '789 Recovery Blvd',
    city: 'Vancouver',
    province: 'BC',
    postalCode: 'V6B 2T4',
    ownerName: 'Robert Recover',
    email: testEmail,
    phone: '6045550177',
    website: 'https://recoverytest.com',
    industry: 'Retail',
    yearsInBusiness: 2,
    monthlyRevenue: 15000,
    fundingAmount: 10000,
    fundingPurpose: 'Refurbishing store front',
    fileCount: 1,
    storageFileUrls: ['https://example.com/rec-statements.pdf'],
    consentToShare: true,
    consent: true,
    priorityScore: 70,
    priorityBand: 'B',
    applicationStatus: 'New',
    priorityProcessing: false,
    revenue: 0,
    recoveryToken,
    priorityRecoveryStatus: 'ACTIVE',
    recoveryStage: 'NONE',
  };

  console.log(`\nInserting mock abandoned application. ID: ${applicationId}, Email: ${testEmail}`);
  await appendMCAApplication(mockApp);
  console.log('✅ Mock application written to Sheets.');

  // 3. Scan applications and simulate cron logic for Email 1
  console.log('\nScanning sheet to simulate Cron processing check...');
  const apps = await getMCAApplications();
  const target = apps.find(a => a.applicationId === applicationId);

  if (!target) {
    throw new Error('❌ Test Failed: Mock application not found in database.');
  }

  const elapsed = Date.now() - new Date(target.timestamp).getTime();
  console.log(`Elapsed time since submission: ${(elapsed / (1000 * 60 * 60)).toFixed(2)} hours`);

  if (target.priorityRecoveryStatus === 'ACTIVE' && elapsed >= (delay1Hours * 60 * 60 * 1000)) {
    console.log('💡 Threshold met. Sending Email 1 to:', target.email);
    const res = await sendMCARecoveryEmail1({
      to: target.email,
      name: target.ownerName,
      recoveryToken: target.recoveryToken,
    });

    if (res.success || res.skipped) {
      console.log('✅ Email trigger successful. Updating Sheets CRM with progress...');
      const sentTime = new Date().toISOString();
      
      const sheetUpdated = await updateMCAApplicationRecovery(target.applicationId, {
        priorityRecoveryStatus: 'EMAIL_1_SENT',
        recoveryStage: 'EMAIL_1',
        recoveryEmail1Sent: sentTime,
        lastRecoveryEmail: sentTime,
      });

      if (sheetUpdated) {
        console.log('🎉 Google Sheet updated: status set to "EMAIL_1_SENT", stage set to "EMAIL_1"');
      } else {
        console.error('❌ Failed to update recovery status in Google Sheet.');
      }
    } else {
      console.error('❌ Resend API call failed:', res.error);
    }
  } else {
    console.log('❌ Threshold not met or status is not ACTIVE.');
  }

  // 4. Verify updates
  console.log('\nReading back application record to confirm sync...');
  const updatedApps = await getMCAApplications();
  const verifiedApp = updatedApps.find(a => a.applicationId === applicationId);

  console.log('--- SYNC DETAILS ---');
  console.log('Recovery Status:', verifiedApp?.priorityRecoveryStatus);
  console.log('Recovery Stage:', verifiedApp?.recoveryStage);
  console.log('Email 1 Sent Timestamp:', verifiedApp?.recoveryEmail1Sent);
  console.log('Recovery Token:', verifiedApp?.recoveryToken);
  console.log('--------------------');

  if (verifiedApp?.priorityRecoveryStatus === 'EMAIL_1_SENT' && verifiedApp?.recoveryStage === 'EMAIL_1') {
    console.log('\n🎉 Recovery Engine test run successfully completed!');
  } else {
    console.error('\n❌ Test verification failed: Sheet status did not match expected values.');
  }
}

runTest().catch(err => {
  console.error('❌ Test aborted due to error:', err);
});
