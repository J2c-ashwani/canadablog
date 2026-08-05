import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { getPurchaseByToken } from '../lib/products/purchase-store';

async function testToken() {
  const token = "token_chintankakani_report_2026";
  console.log(`Testing token resolution for ${token}...`);
  const record = await getPurchaseByToken(token);
  console.log("RESOLVED RECORD:", JSON.stringify(record, null, 2));

  if (record && record.email === "chintankakani@gmail.com") {
    console.log("✅ SUCCESS: Chintan Kakani token resolved cleanly!");
  } else {
    console.error("❌ FAIL: Could not resolve Chintan Kakani token!");
    process.exit(1);
  }
}

testToken().catch(console.error);
