import { config } from 'dotenv';
import path from 'path';

// For local testing, load from .env.local if present
config({ path: path.join(__dirname, '../.env.local') });

const REQUIRED_SECRETS = [
  'OTP_SECRET',
  'SESSION_TOKEN_SALT',
  'SESSION_UNSUBSCRIBE_SALT',
  'PAYPAL_CLIENT_ID',
  'PAYPAL_CLIENT_SECRET',
  'RESEND_API_KEY',
  'GOOGLE_SHEETS_PRIVATE_KEY',
];

function verifyProductionSecrets() {
  // A build is considered a strict deployment build if running in CI or on Vercel deployment servers
  const isStrictDeployment = 
    process.env.CI === '1' || 
    (!!process.env.VERCEL_ENV && !!process.env.VERCEL_GIT_COMMIT_SHA && process.env.VERCEL_GIT_COMMIT_SHA !== "");

  console.log(`🔍 Checking production secrets (CI Build: ${isStrictDeployment ? 'Yes' : 'No'})...`);

  const missing: string[] = [];

  REQUIRED_SECRETS.forEach((secret) => {
    const val = process.env[secret];
    if (!val || val.trim() === '' || val.includes('fallback') || val.includes('LEGACY_SALT_PLACEHOLDER')) {
      missing.push(secret);
    }
  });

  if (missing.length > 0) {
    if (isStrictDeployment) {
      console.error('\n🚨 BUILD FAILED: Missing required production secrets:');
      missing.forEach((secret) => {
        console.error(`   - ${secret}`);
      });
      console.error('\nPlease configure these environment variables in your hosting environment (e.g. Vercel dashboard).\n');
      process.exit(1);
    } else {
      console.warn('\n⚠️  WARNING: Missing some secrets required for production deployment:');
      missing.forEach((secret) => {
        console.warn(`   - ${secret}`);
      });
      console.warn('Continuing build since this is a local build step.\n');
    }
  } else {
    console.log('✅ All production secrets are configured correctly!\n');
  }
}

verifyProductionSecrets();
