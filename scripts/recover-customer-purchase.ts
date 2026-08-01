/**
 * CUSTOMER RECOVERY SCRIPT — Ajit Kolethe (ajit@kolethe.com)
 * PayPal Order ID: 3S518103MR493542J
 * Product: Funding Action Plan (funding-roadmap) — $49.00 USD
 *
 * This script:
 * 1. Records the purchase in Google Sheets (Purchases tab)
 * 2. Grants entitlements
 * 3. Updates CRM lead record
 * 4. Sends the confirmation email with product access
 * 5. Logs telemetry
 *
 * Run: npx tsx scripts/recover-customer-purchase.ts
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.production.local' });

async function recoverPurchase() {
  console.log('🔧 CUSTOMER RECOVERY: Starting...');
  console.log('=====================================');
  console.log('Customer: Ajit Kolethe (ajit@kolethe.com)');
  console.log('PayPal Order ID: 3S518103MR493542J');
  console.log('Product: Funding Action Plan (funding-roadmap)');
  console.log('Amount: $49.00 USD');
  console.log('=====================================\n');

  // Step 1: Check for existing purchase to prevent duplicates
  console.log('Step 1: Checking for existing purchase...');
  const { getAllPurchases } = await import('@/lib/products/purchase-store');
  const allPurchases = await getAllPurchases();
  const existing = allPurchases.find(
    (p: any) => p.paypalOrderId === '3S518103MR493542J' && p.productId === 'funding-roadmap'
  );

  if (existing) {
    console.log(`✅ Purchase already exists: ${existing.purchaseId}`);
    console.log(`   Access Token: ${existing.accessToken}`);
    console.log(`   Status: ${existing.status}`);
    console.log('   → No duplicate will be created.');
    
    console.log('\n📧 Sending confirmation email with existing access token...');
    const { sendEmail } = await import('@/lib/emails/mailer');
    const { buildPurchaseEmail } = await import('@/lib/emails/product-purchase');
    
    const emailContent = buildPurchaseEmail({
      name: 'Ajit',
      email: 'ajit@kolethe.com',
      accessToken: existing.accessToken,
      paypalOrderId: '3S518103MR493542J',
      productName: 'Funding Action Plan',
      amount: '49.00',
    });

    await sendEmail({
      to: 'ajit@kolethe.com',
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
      tagType: 'product-purchase',
    });
    console.log('✅ Confirmation email sent to ajit@kolethe.com');
    console.log(`\n🔗 Product access URL: https://fsidigital.ca/products/report?token=${existing.accessToken}`);
    return;
  }

  // Step 2: Record the purchase
  console.log('Step 2: Recording purchase in Google Sheets...');
  const { recordPurchase } = await import('@/lib/products/purchase-store');
  const purchase = await recordPurchase({
    email: 'ajit@kolethe.com',
    name: 'Ajit Kolethe',
    productId: 'funding-roadmap',
    amount: '49.00',
    paypalOrderId: '3S518103MR493542J',
    profileData: {
      province: 'ON',
      industry: 'other',
      revenue: 'pre-revenue',
      goal: 'expansion',
    },
    attribution: {
      referrer: 'direct',
      landingPage: '/calculator',
    },
    status: 'completed',
  });
  console.log(`✅ Purchase recorded: ${purchase.purchaseId}`);
  console.log(`   Access Token: ${purchase.accessToken}`);

  // Step 3: Grant entitlements
  console.log('\nStep 3: Granting entitlements...');
  const { grantEntitlements } = await import('@/lib/products/entitlements');
  await grantEntitlements({
    purchaseId: purchase.purchaseId,
    email: 'ajit@kolethe.com',
    productId: 'funding-roadmap',
    orderId: '3S518103MR493542J',
  });
  console.log('✅ Entitlements granted');

  // Step 4: Update CRM
  console.log('\nStep 4: Updating CRM lead record...');
  const { SubscriberRepository } = await import('@/lib/leads/SubscriberRepository');
  try {
    const existingLead = await SubscriberRepository.getSubscriberByEmail('ajit@kolethe.com');
    const updates: any = {
      strategyReportPurchased: true,
      strategyReportTransactionId: '3S518103MR493542J',
      engagementScore: 150,
      offlineStatus: 'Report Buyer',
    };
    
    if (existingLead) {
      await SubscriberRepository.updateSubscriberPreferences('ajit@kolethe.com', updates);
      console.log('✅ Existing CRM lead updated as Report Buyer');
    } else {
      await SubscriberRepository.saveSubscriber({
        email: 'ajit@kolethe.com',
        name: 'Ajit Kolethe',
        country: 'Canada',
        region: 'ON',
        industry: 'other',
        companySize: '1-9',
        fundingInterests: ['Grants'],
        website: '',
        companyName: '',
      });
      await SubscriberRepository.updateSubscriberPreferences('ajit@kolethe.com', updates);
      console.log('✅ New CRM lead created and marked as Report Buyer');
    }
  } catch (crmErr) {
    console.error('⚠️ CRM update failed (non-blocking):', crmErr);
  }

  // Step 5: Send confirmation email
  console.log('\nStep 5: Sending confirmation email...');
  const { sendEmail } = await import('@/lib/emails/mailer');
  const { buildPurchaseEmail } = await import('@/lib/emails/product-purchase');
  
  const emailContent = buildPurchaseEmail({
    name: 'Ajit',
    email: 'ajit@kolethe.com',
    accessToken: purchase.accessToken,
    paypalOrderId: '3S518103MR493542J',
    productName: 'Funding Action Plan',
    amount: '49.00',
  });

  await sendEmail({
    to: 'ajit@kolethe.com',
    subject: emailContent.subject,
    html: emailContent.html,
    text: emailContent.text,
    tagType: 'product-purchase',
  });
  console.log('✅ Confirmation email sent to ajit@kolethe.com');

  // Step 6: Record telemetry
  console.log('\nStep 6: Recording telemetry...');
  const { recordTelemetryEvent } = await import('@/lib/telemetry/telemetry-store');
  await recordTelemetryEvent({
    eventName: 'purchase_product',
    sessionId: '3S518103MR493542J',
    pagePath: '/calculator',
    referrer: 'direct',
    productId: 'funding-roadmap',
    revenue: '49.00',
  });
  console.log('✅ Telemetry recorded');

  // Summary
  console.log('\n=====================================');
  console.log('🎉 RECOVERY COMPLETE');
  console.log('=====================================');
  console.log(`Purchase ID: ${purchase.purchaseId}`);
  console.log(`Access Token: ${purchase.accessToken}`);
  console.log(`Product Access URL: https://fsidigital.ca/products/report?token=${purchase.accessToken}`);
  console.log(`Email sent to: ajit@kolethe.com`);
  console.log('=====================================');
}

recoverPurchase().catch(err => {
  console.error('❌ RECOVERY FAILED:', err);
  process.exit(1);
});
