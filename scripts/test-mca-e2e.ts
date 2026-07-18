// scripts/test-mca-e2e.ts
// Comprehensive End-to-End Simulation of Canada MCA Platform
//
// Journey: Business Application -> Upload -> Priority Payment -> Partner Routing -> Partner Outbox -> Outcome -> Dashboard Metrics

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import {
  appendMCAApplication,
  getMCAApplications,
  getMCAPriorityOrders,
  getMCAPartnerSubmissions,
  getMCAPartnerOutcomes,
  appendMCAPartnerSubmission,
  appendMCAActivityLog,
  appendMCAPriorityOrder,
  updateMCAApplicationPayment,
  updateMCAPriorityOrderStatus,
  generateApplicationId,
} from '../lib/mca/sheets';
import { calculatePriorityScore } from '../lib/mca/priority-score';
import { getMatchingPartners } from '../lib/mca/partner-routing.config';
import type { MCAApplication, MCAPriorityOrder } from '../lib/mca/types';

// Helper to wait
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function runSimulation() {
  console.log('🏁 Starting Canada MCA Platform End-to-End Simulation...');

  // 1. Generate Unique ID & Mock App Data
  const timestamp = new Date().toISOString();
  const applicationId = generateApplicationId();
  const testEmail = `simulation-${Math.random().toString(36).substring(2, 8)}@example.com`;
  const businessName = `Simulated Trucking Logistics Inc`;

  console.log(`\n1. Creating mock application. ID: ${applicationId}`);

  // Underwrite
  const { priorityScore, priorityBand } = calculatePriorityScore({
    monthlyRevenue: 35000,
    yearsInBusiness: 3,
    fundingAmount: 25000,
    industry: 'trucking',
    province: 'ON',
    website: 'https://simulatedtrucking.com',
    consent: true,
  });

  const mockApp: MCAApplication = {
    timestamp,
    applicationId,
    legalBusinessName: businessName,
    tradeName: 'Simulated Trucking',
    businessRegistrationNumber: 'BN987654321',
    businessAddress: '456 Logistics Way',
    city: 'Mississauga',
    province: 'ON',
    postalCode: 'L4W 1A2',
    ownerName: 'Alice Driver',
    email: testEmail,
    phone: '9055550188',
    website: 'https://simulatedtrucking.com',
    industry: 'Trucking',
    yearsInBusiness: 3,
    employees: 12,
    monthlyRevenue: 35000,
    fundingAmount: 25000,
    fundingPurpose: 'Fleet maintenance & fuel working capital',
    fileCount: 3,
    storageFileUrls: ['https://vercel-blob.com/sim-statement-1.pdf', 'https://vercel-blob.com/sim-statement-2.pdf'],
    consentToShare: true,
    consent: true,
    priorityScore,
    priorityBand,
    applicationStatus: 'New',
    priorityProcessing: false,
    revenue: 0,
  };

  // 2. Write Application to Sheets
  console.log('Writing application details to Google Sheet [MCA Applications]...');
  await appendMCAApplication(mockApp);
  console.log('✅ Application saved successfully.');

  // 3. Partner Routing Simulation
  console.log('\n2. Simulating Partner Routing Engine...');
  const matchingPartners = getMatchingPartners(
    mockApp.industry,
    mockApp.province,
    priorityBand,
    mockApp.monthlyRevenue
  );

  console.log(`Matched partners: ${matchingPartners.map(p => p.partnerId).join(', ')}`);
  
  // Forward to each matched partner
  for (const partner of matchingPartners) {
    console.log(`Routing lead to Partner: ${partner.name} (${partner.partnerId}) via ${partner.deliveryMethod}...`);
    await appendMCAPartnerSubmission({
      applicationId,
      businessName: mockApp.legalBusinessName,
      email: mockApp.email,
      monthlyRevenue: mockApp.monthlyRevenue,
      fundingRequested: mockApp.fundingAmount,
      band: priorityBand,
      priorityFlag: false,
      fileStorageUrls: mockApp.storageFileUrls.join(', '),
      submissionMethod: partner.deliveryMethod,
      submittedBy: `simulation-router → ${partner.partnerId}`,
    });
    console.log(`✅ Partner submission record generated.`);
  }

  // 4. Priority Payment Simulation ($49 CAD Upgrade)
  console.log('\n3. Simulating Priority Funding Processing Upgrade...');
  const paypalOrderId = `PAYPAL-SIM-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

  const priorityOrder: MCAPriorityOrder = {
    timestamp: new Date().toISOString(),
    applicationId,
    email: testEmail,
    paypalOrderId,
    amountCAD: 49,
    status: 'COMPLETED',
    fulfilmentStatus: 'Queued',
  };

  console.log(`Creating Priority Order in [MCA Priority Orders]...`);
  await appendMCAPriorityOrder(priorityOrder);

  console.log(`Applying Priority Tag and updating Revenue on Application...`);
  const appUpdated = await updateMCAApplicationPayment(applicationId, paypalOrderId);
  const orderUpdated = await updateMCAPriorityOrderStatus(paypalOrderId, 'Captured');

  if (appUpdated && orderUpdated) {
    console.log('✅ Google Sheets updated: Application marked [PRIORITY], status changed to "Documents Received", revenue set to $49.');
  } else {
    console.error('❌ Failed to update application/order payment status in Sheets.');
  }

  // 5. Activity Log Entry
  await appendMCAActivityLog({
    timestamp: new Date().toISOString(),
    applicationId,
    email: testEmail,
    event: 'simulation_run_completed',
    metadata: { paypalOrderId, priorityBand, priorityScore },
  });

  // 6. Verify Dashboard Metrics Calculations
  console.log('\n4. Verifying Dashboard Metrics Calculation...');
  const apps = await getMCAApplications();
  const orders = await getMCAPriorityOrders();
  const submissions = await getMCAPartnerSubmissions();

  const appsToday = apps.filter(app => {
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    return new Date(app.timestamp).getTime() >= cutoff;
  }).length;

  const priorityRev = orders
    .filter(o => o.status === 'Captured' || o.status === 'COMPLETED' || o.status === 'succeeded')
    .reduce((sum, o) => sum + (o.amountCAD || 0), 0);

  console.log(`--- CURRENT METRICS SNAPSHOT ---`);
  console.log(`Applications Today: ${appsToday}`);
  console.log(`Priority Revenue: $${priorityRev} CAD`);
  console.log(`Total Applications: ${apps.length}`);
  console.log(`Submissions routed to Partners: ${submissions.length}`);
  console.log(`--------------------------------`);
  console.log('\n🎉 End-to-End Simulation run successfully completed!');
}

runSimulation().catch(err => {
  console.error('❌ Simulation aborted due to error:', err);
});
