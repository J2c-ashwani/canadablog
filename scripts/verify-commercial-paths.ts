import { getPriorityResearchProfiles } from '../lib/editorial/priorityResearch';

const APPROVED_PATTERNS = [
  /^\/products\/funding-match-report/,
  /^\/products\/action-plan/,
  /^\/products\/toolkit/,
  /^\/products\/approval-library/,
  /^\/audit/,
  /^\/calculator/,
  /^\/booking/
];

console.log('🏁 Starting Commercial Path & Monetization Verification...');

const profiles = getPriorityResearchProfiles();
let failureCount = 0;

profiles.forEach((profile) => {
  const route = profile.route;
  const href = profile.cta.href;

  console.log(`\nAnalyzing route: ${route}`);
  console.log(`  - CTA Link destination: ${href}`);

  // Check 1: Must NOT contain /portfolio
  if (href.includes('/portfolio')) {
    console.error(`  ❌ FAIL: Link contains deprecated "/portfolio" route!`);
    failureCount++;
    return;
  }

  // Check 2: Must match one of the approved paths
  const isApproved = APPROVED_PATTERNS.some((pattern) => pattern.test(href));
  if (!isApproved) {
    console.error(`  ❌ FAIL: Link "${href}" does not map to any approved monetization endpoint!`);
    failureCount++;
  } else {
    console.log(`  ✅ PASS: Link maps to an active monetization route.`);
  }
});

console.log('\n=======================================');
if (failureCount === 0) {
  console.log(`🎉 SUCCESS: Verified all ${profiles.length} priority research paths. 0 failures.`);
  process.exit(0);
} else {
  console.error(`❌ FAILURE: Found ${failureCount} commercial path violations.`);
  process.exit(1);
}
