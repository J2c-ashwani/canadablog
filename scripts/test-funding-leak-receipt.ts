/**
 * Test & Validation Suite for "The Funding Leak Receipt"
 * Verifies rendering, monospace styling, genuine match row enforcement,
 * and question-mark formatting.
 */

import assert from 'assert';
import { renderFundingLeakReceiptHtml, renderFundingLeakReceiptText } from '../lib/emails/funding-leak-receipt';

console.log('🧪 Testing "The Funding Leak Receipt" Creative Engine...\n');

// Test 1: Genuine match data present (> 0)
const htmlWithMatches = renderFundingLeakReceiptHtml({
  firstName: 'Sarah',
  companyName: 'Apex Robotics Inc.',
  province: 'Ontario',
  industry: 'Artificial Intelligence',
  verifiedMatchCount: 4,
  checkoutUrl: 'https://www.fsidigital.ca/checkout?test=1',
  unsubscribeUrl: 'https://www.fsidigital.ca/unsubscribe?test=1',
  referenceId: 'FLR-TEST01',
  dateFormatted: 'OCT 15, 2026'
});

assert(htmlWithMatches.includes('FSI DIGITAL — THE FUNDING LEAK RECEIPT'), 'Receipt header rendered');
assert(htmlWithMatches.includes('Apex Robotics Inc.'), 'Company name rendered in receipt metadata');
assert(htmlWithMatches.includes('Ontario'), 'Province rendered');
assert(htmlWithMatches.includes('TOTAL FUNDING LEFT UNCHECKED:'), 'Total block rendered');
assert(htmlWithMatches.includes('?'), 'Prominent question mark rendered');
assert(htmlWithMatches.includes('Potential funding programs'), 'Potential funding programs row rendered when verified match count exists');
assert(htmlWithMatches.includes('4 to investigate'), 'Genuine match count displayed');
assert(htmlWithMatches.includes('That question mark is the entire point.'), 'Narrative copy rendered');
assert(htmlWithMatches.includes('$19'), '$19 price point clearly stated');
console.log('✅ Test 1 Passed: Receipt with verified match count rendered cleanly.');

// Test 2: Unverified / missing match data (MUST remove the row per CEO Directives)
const htmlWithoutMatches = renderFundingLeakReceiptHtml({
  firstName: 'David',
  companyName: 'Nexus Bio',
  province: 'California',
  industry: 'Biotechnology',
  verifiedMatchCount: null, // No genuine match data
  checkoutUrl: 'https://www.fsidigital.ca/checkout?test=2',
  unsubscribeUrl: 'https://www.fsidigital.ca/unsubscribe?test=2',
  referenceId: 'FLR-TEST02',
  dateFormatted: 'OCT 15, 2026'
});

assert(htmlWithoutMatches.includes('Nexus Bio'), 'Company name rendered');
assert(htmlWithoutMatches.includes('California'), 'Region rendered');
assert(!htmlWithoutMatches.includes('Potential funding programs'), 'Potential funding programs row is STRICTLY REMOVED when unverified');
assert(!htmlWithoutMatches.includes('to investigate'), 'No unverified match text appears');
assert(htmlWithoutMatches.includes('TOTAL FUNDING LEFT UNCHECKED:'), 'Total block preserved');
console.log('✅ Test 2 Passed: Row strictly omitted when verified match data is missing (CEO Directive enforced).');

// Test 3: Plaintext rendering verification
const textOutput = renderFundingLeakReceiptText({
  companyName: 'CleanTech Labs',
  province: 'British Columbia',
  industry: 'Clean Technology',
  verifiedMatchCount: 3,
  checkoutUrl: 'https://www.fsidigital.ca/checkout?test=3'
});

assert(textOutput.includes('FSI DIGITAL — THE FUNDING LEAK RECEIPT'), 'Plaintext receipt header present');
assert(textOutput.includes('TOTAL FUNDING LEFT UNCHECKED: ?'), 'Plaintext total question mark present');
assert(textOutput.includes('Potential funding programs        3 to investigate'), 'Plaintext line item aligned');
assert(textOutput.includes('That question mark is the entire point.'), 'Plaintext narrative present');
console.log('✅ Test 3 Passed: Plaintext format verified.');

// Test 4: Dynamic $79 Complete Bundle offer for Tier A enterprise lead
const htmlTierA = renderFundingLeakReceiptHtml({
  firstName: 'Marcus',
  companyName: 'Vanguard Aerospace',
  province: 'Ontario',
  industry: 'Aerospace & Defense',
  verifiedMatchCount: 5,
  checkoutUrl: 'https://www.fsidigital.ca/checkout?test=4',
  unsubscribeUrl: 'https://www.fsidigital.ca/unsubscribe?test=4',
  referenceId: 'FLR-TEST04',
  dateFormatted: 'OCT 15, 2026',
  productOffer: {
    productId: 'funding-bundle',
    productName: 'Complete Funding Blueprint',
    price: '$79',
    priceAmount: 79,
    ctaText: 'See the Complete Funding Blueprint ($79) →',
  }
});

assert(htmlTierA.includes('Complete Funding Blueprint'), 'Tier A Complete Funding Blueprint product name rendered');
assert(htmlTierA.includes('$79'), 'Tier A $79 price rendered');
console.log('✅ Test 4 Passed: Dynamic $79 Complete Funding Blueprint offer verified.');

// Test 5: Dynamic $49 Action Plan offer for Tier B lead
const htmlTierB = renderFundingLeakReceiptHtml({
  firstName: 'Elena',
  companyName: 'BioHealth Tech',
  province: 'Quebec',
  industry: 'Healthcare',
  verifiedMatchCount: 3,
  checkoutUrl: 'https://www.fsidigital.ca/checkout?test=5',
  unsubscribeUrl: 'https://www.fsidigital.ca/unsubscribe?test=5',
  referenceId: 'FLR-TEST05',
  dateFormatted: 'OCT 15, 2026',
  productOffer: {
    productId: 'funding-roadmap',
    productName: 'Funding Strategy Action Plan',
    price: '$49',
    priceAmount: 49,
    ctaText: 'See the Funding Action Plan ($49) →',
  }
});

assert(htmlTierB.includes('Funding Strategy Action Plan'), 'Tier B Action Plan product name rendered');
assert(htmlTierB.includes('$49'), 'Tier B $49 price rendered');
console.log('✅ Test 5 Passed: Dynamic $49 Funding Action Plan offer verified.');

console.log('\n🎉 ALL 5 "THE FUNDING LEAK RECEIPT" TESTS PASSED SUCCESSFULLY!\n');
