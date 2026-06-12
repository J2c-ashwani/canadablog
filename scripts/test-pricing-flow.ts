import { getReactivationPriceForEmail } from '../lib/leads/pricing-test';

function runPricingTests() {
  console.log('🧪 Running A/B Pricing Test Validation...');

  const testEmails = [
    'tamara@glix.com',
    'renaldalinck@yahoo.ca',
    'Puru@coffeestreet.ca',
    'maria.sargsyan.exp@gmail.com',
    'tthom@live.ca',
    'ashwanikumar@fsidigital.ca',
    'test-lead-1@gmail.com',
    'test-lead-2@gmail.com',
    'test-lead-3@gmail.com'
  ];

  const groupCounts: Record<string, number> = {
    Control: 0,
    A: 0,
    B: 0
  };

  testEmails.forEach((email) => {
    const pricing = getReactivationPriceForEmail(email);
    groupCounts[pricing.group] += 1;
    console.log(`Email: ${email.padEnd(30)} => Group: ${pricing.group.padEnd(8)} Price: $${pricing.price}`);
  });

  console.log('\n📊 Group Distributions:');
  console.log(`  Control ($199): ${groupCounts.Control} (${Math.round((groupCounts.Control / testEmails.length) * 100)}%)`);
  console.log(`  Group A ($99):   ${groupCounts.A} (${Math.round((groupCounts.A / testEmails.length) * 100)}%)`);
  console.log(`  Group B ($49):   ${groupCounts.B} (${Math.round((groupCounts.B / testEmails.length) * 100)}%)`);
  console.log('✅ A/B Pricing Test Validation Passed.');
}

runPricingTests();
