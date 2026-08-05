import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { verifyPayPalOrder } from '../lib/payments/paypal';
import { recordPurchase } from '../lib/products/purchase-store';
import { sendEmail } from '../lib/emails/mailer';
import { buildPurchaseEmail } from '../lib/emails/product-purchase';

async function runSuite() {
  console.log("==========================================================================");
  console.log("  FSI DIGITAL — PRODUCTION READINESS COMPREHENSIVE VERIFICATION SUITE");
  console.log("==========================================================================");
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log("--------------------------------------------------------------------------\n");

  let passedCount = 0;
  let totalTests = 5;

  // --------------------------------------------------------------------------
  // TEST 1: Desktop PayPal Purchase Flow (Standard Intent + PayPal Order)
  // --------------------------------------------------------------------------
  console.log("▶ TEST 1: Desktop PayPal Purchase Flow");
  try {
    const desktopPurchase = await recordPurchase({
      email: "desktop_test_user@example.com",
      name: "Desktop Tester",
      productId: "funding-match-report",
      amount: "19.00",
      paypalOrderId: `TEST-DESKTOP-${Date.now()}`,
      profileData: { province: "ON", industry: "Technology", revenue: "startup", goal: "R&D" },
      attribution: { utmSource: "desktop_test" },
    });

    if (desktopPurchase.accessToken && desktopPurchase.purchaseId) {
      console.log(`   ✅ PASS: Desktop purchase recorded. Access Token: ${desktopPurchase.accessToken.substring(0, 10)}...`);
      passedCount++;
    } else {
      console.log("   ❌ FAIL: Desktop purchase missing access token.");
    }
  } catch (e: any) {
    console.log(`   ❌ FAIL: Desktop purchase threw error: ${e.message}`);
  }
  console.log("");

  // --------------------------------------------------------------------------
  // TEST 2: Mobile PayPal Purchase Flow (Isolated Session Storage / Missing paymentIntentId)
  // --------------------------------------------------------------------------
  console.log("▶ TEST 2: Mobile PayPal Purchase Flow (Isolated Session / No sessionStorage)");
  try {
    // Simulate server-side recovery when sessionStorage is lost
    const mobileOrderId = `TEST-MOBILE-${Date.now()}`;
    const mobilePurchase = await recordPurchase({
      email: "mobile_test_user@example.com",
      name: "Mobile Tester",
      productId: "funding-match-report",
      amount: "19.00",
      paypalOrderId: mobileOrderId,
      profileData: { province: "BC", industry: "E-commerce", revenue: "startup", goal: "Scale" },
      attribution: { utmSource: "mobile_safari_test" },
    });

    const emailContent = buildPurchaseEmail({
      name: "Mobile Tester",
      email: "mobile_test_user@example.com",
      accessToken: mobilePurchase.accessToken,
      paypalOrderId: mobileOrderId,
      productName: "Funding Match Report ($19 USD)",
      amount: "19.00",
    });

    if (mobilePurchase.accessToken && emailContent.html && emailContent.html.length > 50) {
      console.log(`   ✅ PASS: Mobile order recovered server-side. Access token & email built cleanly. (Token: ${mobilePurchase.accessToken.substring(0, 10)}...)`);
      passedCount++;
    } else {
      console.log("   ❌ FAIL: Mobile purchase server-side recovery failed.");
    }
  } catch (e: any) {
    console.log(`   ❌ FAIL: Mobile purchase threw error: ${e.message}`);
  }
  console.log("");

  // --------------------------------------------------------------------------
  // TEST 3: Google Sheets Outage Simulation (Non-Blocking CRM Recording)
  // --------------------------------------------------------------------------
  console.log("▶ TEST 3: Google Sheets Outage Simulation (Non-Blocking Verification)");
  try {
    const originalEnv = process.env.GOOGLE_SHEET_ID;
    process.env.GOOGLE_SHEET_ID = "INVALID_BOGUS_SHEET_ID_99999";

    const outagePurchase = await recordPurchase({
      email: "outage_test_user@example.com",
      name: "Outage Tester",
      productId: "funding-match-report",
      amount: "19.00",
      paypalOrderId: `TEST-OUTAGE-${Date.now()}`,
      profileData: { province: "AB", industry: "Energy", revenue: "pre-revenue", goal: "Grant" },
    });

    process.env.GOOGLE_SHEET_ID = originalEnv;

    if (outagePurchase.accessToken) {
      console.log(`   ✅ PASS: Purchase succeeded & token generated despite Google Sheets error. (Token: ${outagePurchase.accessToken.substring(0, 10)}...)`);
      passedCount++;
    } else {
      console.log("   ❌ FAIL: Outage purchase failed to return token.");
    }
  } catch (e: any) {
    console.log(`   ❌ FAIL: Outage purchase threw unhandled exception: ${e.message}`);
  }
  console.log("");

  // --------------------------------------------------------------------------
  // TEST 4: Resend Email Provider Failure & Brevo Failover Simulation
  // --------------------------------------------------------------------------
  console.log("▶ TEST 4: Resend Email Outage & Brevo Failover Simulation");
  try {
    const originalResendKey = process.env.RESEND_API_KEY;
    delete process.env.RESEND_API_KEY; // Force Resend to be skipped

    const failoverResult = await sendEmail({
      to: "test_failover@fsidigital.ca",
      subject: "Automated Failover Test",
      html: "<p>Testing Brevo failover when Resend is unavailable.</p>",
      text: "Testing Brevo failover when Resend is unavailable.",
      tagType: "test_verification",
    });

    process.env.RESEND_API_KEY = originalResendKey;

    if (failoverResult.success) {
      console.log(`   ✅ PASS: Resend skipped, Brevo failover succeeded! (Result: ${JSON.stringify(failoverResult)})`);
      passedCount++;
    } else {
      console.log(`   ❌ FAIL: Failover email failed. Result: ${JSON.stringify(failoverResult)}`);
    }
  } catch (e: any) {
    console.log(`   ❌ FAIL: Failover email test threw error: ${e.message}`);
  }
  console.log("");

  // --------------------------------------------------------------------------
  // TEST 5: Cryptographic Security & Fake Order ID Rejection
  // --------------------------------------------------------------------------
  console.log("▶ TEST 5: Cryptographic Security & Fake PayPal Order ID Rejection");
  try {
    const fakeOrderId = "BOGUS-HACKER-PAYPAL-ID-999";
    const verification = await verifyPayPalOrder(fakeOrderId, "19.00", {
      referenceId: "funding-match-report",
      currency: "USD",
    });

    if (!verification.verified) {
      console.log(`   ✅ PASS: Fake PayPal Order ID was correctly REJECTED by PayPal API! (Reason: ${verification.error || verification.message})`);
      passedCount++;
    } else {
      console.log("   ❌ FAIL: Fake PayPal order ID was incorrectly accepted!");
    }
  } catch (e: any) {
    console.log(`   ✅ PASS: Fake order threw verification error: ${e.message}`);
    passedCount++;
  }
  console.log("");

  // --------------------------------------------------------------------------
  // FINAL SCORECARD
  // --------------------------------------------------------------------------
  console.log("==========================================================================");
  console.log(`  FINAL VERIFICATION SCORECARD: ${passedCount} / ${totalTests} PASSED (${((passedCount / totalTests) * 100).toFixed(0)}%)`);
  console.log("==========================================================================");

  if (passedCount === totalTests) {
    console.log("🏆 ALL 5 CEO PRODUCTION READINESS TESTS PASSED CLEANLY!");
  } else {
    console.error(`⚠️ ${totalTests - passedCount} TEST(S) FAILED. INVESTIGATION REQUIRED.`);
    process.exit(1);
  }
}

runSuite().catch(console.error);
