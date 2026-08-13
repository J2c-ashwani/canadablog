/**
 * FSI GA4 Environment Verification Script
 * Validates that NEXT_PUBLIC_GA_MEASUREMENT_ID is configured
 */
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.GA_MEASUREMENT_ID;

if (!gaId || gaId.trim() === '' || gaId === 'G-XXXXXXXXXX') {
  console.warn('⚠️ WARNING: NEXT_PUBLIC_GA_MEASUREMENT_ID is not configured or is using placeholder.');
  console.warn('To ensure revenue telemetry and conversion attribution work, set NEXT_PUBLIC_GA_MEASUREMENT_ID in your environment variables.');
  process.exit(0);
} else {
  console.log(`✅ GA4 Measurement ID verified: ${gaId.slice(0, 4)}****`);
  process.exit(0);
}
