// scripts/test-mca-apply.ts
import { checkDuplicateApplication, appendMCAApplication } from '../lib/mca/sheets';
import { calculatePriorityScore } from '../lib/mca/priority-score';
import type { MCAApplication } from '../lib/mca/types';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function test() {
  console.log('Testing Google Sheets connection and MCA Application functions...');
  
  const mockApp: MCAApplication = {
    timestamp: new Date().toISOString(),
    applicationId: 'TEST-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
    legalBusinessName: 'Acme Test Corp LLC',
    tradeName: 'Acme Test',
    businessRegistrationNumber: 'BN123456789',
    businessAddress: '123 Test St',
    city: 'Toronto',
    province: 'ON',
    postalCode: 'M5V 2T6',
    ownerName: 'Test Owner',
    email: 'test-' + Date.now() + '@example.com',
    phone: '4165550199',
    website: 'https://acmetest.com',
    industry: 'Retail',
    yearsInBusiness: 3,
    employees: 5,
    monthlyRevenue: 25000,
    fundingAmount: 20000,
    fundingPurpose: 'Inventory',
    fileCount: 1,
    storageFileUrls: ['https://example.com/test-statement.pdf'],
    consent: true,
    consentToShare: true,
    priorityScore: 85,
    priorityBand: 'A',
    applicationStatus: 'New',
    priorityProcessing: false,
    revenue: 0,
    utmSource: 'test-source',
    utmMedium: 'test-medium',
    utmCampaign: 'test-campaign',
    ga4ClientId: 'test-ga4',
    landingPage: '/test-apply',
    referrer: 'https://google.com',
  };

  try {
    console.log('Checking duplicate status (should be false)...');
    const dupCheck = await checkDuplicateApplication(mockApp.email, mockApp.phone, mockApp.legalBusinessName);
    console.log('Duplicate check result:', dupCheck);

    console.log('Writing mock application to Google Sheet...');
    await appendMCAApplication(mockApp);
    console.log('✅ Write successful!');

    console.log('Checking duplicate status again (should be true now)...');
    const dupCheck2 = await checkDuplicateApplication(mockApp.email, mockApp.phone, mockApp.legalBusinessName);
    console.log('Duplicate check result:', dupCheck2);

  } catch (err) {
    console.error('❌ Test failed:', err);
  }
}

test();
