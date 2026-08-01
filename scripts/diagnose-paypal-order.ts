/**
 * DIAGNOSTIC SCRIPT — Inspect PayPal Order 3S518103MR493542J
 * 
 * This script fetches the ACTUAL PayPal API response for the failed order
 * and inspects exactly where custom_id, reference_id, and other fields
 * appear (or don't appear) in the response structure.
 *
 * Purpose: Prove or disprove the hypothesis that the capture response
 * omits custom_id at the purchase_units[0] level.
 *
 * Run: npx tsx scripts/diagnose-paypal-order.ts
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.vercel.pull' });

const PAYPAL_ORDER_ID = '3S518103MR493542J';

async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const isLive = process.env.PAYPAL_ENV === 'live';
  const baseUrl = isLive ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

  if (!clientId || !clientSecret) {
    throw new Error(`PAYPAL_CLIENT_ID/NEXT_PUBLIC_PAYPAL_CLIENT_ID (${clientId ? 'OK' : 'MISSING'}) or PAYPAL_CLIENT_SECRET (${clientSecret ? 'OK' : 'MISSING'}) is missing`);
  }

  console.log(`🔑 Authenticating with PayPal (${isLive ? 'LIVE' : 'SANDBOX'})...`);
  console.log(`   Base URL: ${baseUrl}`);

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  if (!response.ok || !data.access_token) {
    throw new Error(`PayPal auth failed: ${data.error_description || data.error || JSON.stringify(data)}`);
  }

  console.log('✅ PayPal authentication successful\n');
  return data.access_token;
}

async function diagnose() {
  console.log('='.repeat(70));
  console.log('  PAYPAL ORDER DIAGNOSTIC: ' + PAYPAL_ORDER_ID);
  console.log('='.repeat(70));
  console.log('');

  const accessToken = await getPayPalAccessToken();
  const isLive = process.env.PAYPAL_ENV === 'live';
  const baseUrl = isLive ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

  // ── Step 1: Fetch order details (GET endpoint) ──
  console.log('━'.repeat(70));
  console.log('STEP 1: Fetching order via GET /v2/checkout/orders/' + PAYPAL_ORDER_ID);
  console.log('━'.repeat(70));

  const orderRes = await fetch(`${baseUrl}/v2/checkout/orders/${PAYPAL_ORDER_ID}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!orderRes.ok) {
    const errText = await orderRes.text();
    console.error(`❌ Failed to fetch order: HTTP ${orderRes.status}`);
    console.error(errText);
    return;
  }

  const orderData = await orderRes.json();

  // ── Step 2: Full raw JSON dump ──
  console.log('\n📦 FULL RAW PAYPAL RESPONSE:');
  console.log(JSON.stringify(orderData, null, 2));

  // ── Step 3: Field-by-field inspection ──
  console.log('\n' + '━'.repeat(70));
  console.log('STEP 2: FIELD-BY-FIELD INSPECTION');
  console.log('━'.repeat(70));

  console.log(`\n🔹 Order ID:     ${orderData.id}`);
  console.log(`🔹 Status:       ${orderData.status}`);
  console.log(`🔹 Intent:       ${orderData.intent}`);
  console.log(`🔹 Create Time:  ${orderData.create_time}`);
  console.log(`🔹 Update Time:  ${orderData.update_time}`);

  // Payer info
  console.log(`\n👤 PAYER:`);
  console.log(`   Email:        ${orderData.payer?.email_address || 'NOT PRESENT'}`);
  console.log(`   Name:         ${orderData.payer?.name?.given_name || ''} ${orderData.payer?.name?.surname || ''}`);
  console.log(`   Payer ID:     ${orderData.payer?.payer_id || 'NOT PRESENT'}`);

  // Purchase units
  const pu = orderData.purchase_units;
  if (!pu || pu.length === 0) {
    console.log('\n❌ NO purchase_units FOUND IN RESPONSE');
    return;
  }

  for (let i = 0; i < pu.length; i++) {
    const unit = pu[i];
    console.log(`\n📦 PURCHASE UNIT [${i}]:`);
    console.log('─'.repeat(50));

    // ── THE KEY FIELDS ──
    console.log(`   custom_id:     ${unit.custom_id !== undefined ? `"${unit.custom_id}"` : '❌ NOT PRESENT (undefined)'}`);
    console.log(`   reference_id:  ${unit.reference_id !== undefined ? `"${unit.reference_id}"` : '❌ NOT PRESENT (undefined)'}`);
    console.log(`   description:   ${unit.description || 'NOT PRESENT'}`);
    console.log(`   soft_descriptor: ${unit.soft_descriptor || 'NOT PRESENT'}`);

    // Amount
    console.log(`   amount:`);
    console.log(`     currency:    ${unit.amount?.currency_code || 'NOT PRESENT'}`);
    console.log(`     value:       ${unit.amount?.value || 'NOT PRESENT'}`);

    // Payee
    console.log(`   payee:`);
    console.log(`     email:       ${unit.payee?.email_address || 'NOT PRESENT'}`);
    console.log(`     merchant_id: ${unit.payee?.merchant_id || 'NOT PRESENT'}`);

    // Payments (captures)
    const captures = unit.payments?.captures;
    if (captures && captures.length > 0) {
      for (let j = 0; j < captures.length; j++) {
        const cap = captures[j];
        console.log(`\n   💳 CAPTURE [${j}]:`);
        console.log(`     capture_id:   ${cap.id || 'NOT PRESENT'}`);
        console.log(`     status:       ${cap.status || 'NOT PRESENT'}`);
        console.log(`     custom_id:    ${cap.custom_id !== undefined ? `"${cap.custom_id}"` : '❌ NOT PRESENT (undefined)'}`);
        console.log(`     reference_id: ${cap.reference_id !== undefined ? `"${cap.reference_id}"` : '❌ NOT PRESENT (undefined)'}`);
        console.log(`     amount:`);
        console.log(`       currency:   ${cap.amount?.currency_code || 'NOT PRESENT'}`);
        console.log(`       value:      ${cap.amount?.value || 'NOT PRESENT'}`);
        console.log(`     final_capture: ${cap.final_capture}`);
        console.log(`     create_time:  ${cap.create_time || 'NOT PRESENT'}`);
        console.log(`     update_time:  ${cap.update_time || 'NOT PRESENT'}`);

        // Seller receivable
        if (cap.seller_receivable_breakdown) {
          const srb = cap.seller_receivable_breakdown;
          console.log(`     seller_receivable_breakdown:`);
          console.log(`       gross:      ${srb.gross_amount?.value} ${srb.gross_amount?.currency_code}`);
          console.log(`       paypal_fee: ${srb.paypal_fee?.value} ${srb.paypal_fee?.currency_code}`);
          console.log(`       net:        ${srb.net_amount?.value} ${srb.net_amount?.currency_code}`);
        }
      }
    } else {
      console.log(`\n   💳 CAPTURES: ❌ NO captures array found`);
    }

    // Items
    const items = unit.items;
    if (items && items.length > 0) {
      for (let k = 0; k < items.length; k++) {
        console.log(`\n   📝 ITEM [${k}]:`);
        console.log(`     name:         ${items[k].name || 'NOT PRESENT'}`);
        console.log(`     description:  ${items[k].description || 'NOT PRESENT'}`);
        console.log(`     quantity:     ${items[k].quantity || 'NOT PRESENT'}`);
        console.log(`     unit_amount:  ${items[k].unit_amount?.value} ${items[k].unit_amount?.currency_code}`);
        console.log(`     category:     ${items[k].category || 'NOT PRESENT'}`);
      }
    }
  }

  // ── Step 4: THE VERDICT ──
  console.log('\n' + '='.repeat(70));
  console.log('  DIAGNOSTIC VERDICT');
  console.log('='.repeat(70));

  const topCustomId = pu[0]?.custom_id;
  const captureCustomId = pu[0]?.payments?.captures?.[0]?.custom_id;
  const topRefId = pu[0]?.reference_id;
  const captureRefId = pu[0]?.payments?.captures?.[0]?.reference_id;

  console.log(`\n  purchase_units[0].custom_id:                 ${topCustomId !== undefined ? `"${topCustomId}"` : '❌ MISSING'}`);
  console.log(`  purchase_units[0].payments.captures[0].custom_id: ${captureCustomId !== undefined ? `"${captureCustomId}"` : '❌ MISSING'}`);
  console.log(`  purchase_units[0].reference_id:               ${topRefId !== undefined ? `"${topRefId}"` : '❌ MISSING'}`);
  console.log(`  purchase_units[0].payments.captures[0].reference_id: ${captureRefId !== undefined ? `"${captureRefId}"` : '❌ MISSING'}`);

  console.log(`\n  Order Status: ${orderData.status}`);
  console.log(`  Payer Email:  ${orderData.payer?.email_address || 'NOT PRESENT'}`);

  // Determine what happened
  if (orderData.status === 'COMPLETED') {
    console.log('\n  ✅ Order status is COMPLETED — payment was successfully captured.');
    
    if (topCustomId && captureCustomId) {
      console.log('  ℹ️  custom_id is present in BOTH locations.');
      console.log('     The bug may be a timing/race condition rather than a structural omission.');
    } else if (!topCustomId && captureCustomId) {
      console.log('  🔴 CONFIRMED: custom_id is MISSING at top level but PRESENT in captures.');
      console.log('     This PROVES the root cause — the capture response structure differs.');
    } else if (topCustomId && !captureCustomId) {
      console.log('  ℹ️  custom_id is at top level but NOT in captures. Original order data was preserved.');
    } else {
      console.log('  🔴 custom_id is MISSING from BOTH locations.');
      console.log('     The capture response stripped this field entirely.');
    }
  } else {
    console.log(`\n  ⚠️ Order is NOT COMPLETED. Current status: ${orderData.status}`);
    console.log('  The order may not have been captured yet.');
  }

  console.log('\n' + '='.repeat(70));
}

diagnose().catch(err => {
  console.error('❌ DIAGNOSTIC FAILED:', err);
  process.exit(1);
});
