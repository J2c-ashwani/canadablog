import { config } from 'dotenv';
import path from 'path';
config({ path: path.join(__dirname, '../.env.local') });

import { getAllPurchases } from '../lib/products/purchase-store';

async function main() {
  console.log('📡 --- FETCHING REVENUE ATTRIBUTION RECORDS ---');
  try {
    const purchases = await getAllPurchases();
    console.log(`📊 Found ${purchases.length} total product sales records.\n`);

    if (purchases.length === 0) {
      console.log('No purchase records found in sheet.');
      return;
    }

    const landingPages: Record<string, number> = {};
    const utmSources: Record<string, number> = {};
    const productSales: Record<string, { count: number; totalRev: number }> = {};

    purchases.forEach((p, idx) => {
      const page = p.landingPage || 'direct/unknown';
      const source = p.utmSource || 'direct/organic';
      const prod = p.productId;
      const amt = parseFloat(p.amount || '0');

      landingPages[page] = (landingPages[page] || 0) + 1;
      utmSources[source] = (utmSources[source] || 0) + 1;

      if (!productSales[prod]) {
        productSales[prod] = { count: 0, totalRev: 0 };
      }
      productSales[prod].count++;
      productSales[prod].totalRev += amt;

      console.log(`Sale #${idx + 1}:`);
      console.log(`  - Date:        ${p.createdAt}`);
      console.log(`  - Product:     ${prod} ($${amt})`);
      console.log(`  - Landing:     ${page}`);
      console.log(`  - UTM Source:  ${source}`);
      console.log(`  - Referral:    ${p.referrer || 'None'}`);
      console.log(`  - Profile:     ${p.profileData}`);
      console.log('--------------------------------------------');
    });

    console.log('\n📈 SUMMARY BY LANDING PAGE:');
    Object.entries(landingPages).forEach(([page, count]) => {
      console.log(`  * ${page.padEnd(50)} : ${count} sales`);
    });

    console.log('\n📈 SUMMARY BY ACQUISITION CHANNEL (UTM Source):');
    Object.entries(utmSources).forEach(([source, count]) => {
      console.log(`  * ${source.padEnd(50)} : ${count} sales`);
    });

    console.log('\n📈 SUMMARY BY PRODUCT:');
    Object.entries(productSales).forEach(([prod, data]) => {
      console.log(`  * ${prod.padEnd(30)} : ${data.count} sales ($${data.totalRev.toFixed(2)} total)`);
    });

  } catch (error) {
    console.error('❌ Failed to run attribution audit:', error);
  }
}

main().catch(console.error);
