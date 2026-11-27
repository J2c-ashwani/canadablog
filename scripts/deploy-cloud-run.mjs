#!/usr/bin/env node
/**
 * Builds the Next.js standalone image via Cloud Build and deploys it to Cloud Run.
 * Reads build-time NEXT_PUBLIC_* substitutions and runtime secrets from .env.local
 * without committing any secrets or leaving temporary env files behind.
 */
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

const PROJECT_ID = process.env.GCP_PROJECT_ID || 'arboreal-device-516006-j5';
const REGION = process.env.GCP_REGION || 'us-central1';
const SERVICE_NAME = process.env.CLOUD_RUN_SERVICE || 'fsi-web';
const REPO_NAME = 'fsi-digital';
const IMAGE_URI = `${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/web:latest`;

const GCLOUD_BIN = fs.existsSync('/opt/homebrew/share/google-cloud-sdk/bin/gcloud')
  ? '/opt/homebrew/share/google-cloud-sdk/bin/gcloud'
  : 'gcloud';

const BUILD_SUBSTITUTION_KEYS = [
  'NEXT_PUBLIC_APP_URL',
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_PAYPAL_CLIENT_ID',
  'NEXT_PUBLIC_CONSULTATION_PAYPAL_CLIENT_ID',
  'NEXT_PUBLIC_PAYPAL_PLAN_ID',
  'NEXT_PUBLIC_PAYPAL_CURRENCY',
  'NEXT_PUBLIC_GA_MEASUREMENT_ID',
  'NEXT_PUBLIC_ADSENSE_PUBLISHER_ID',
  'NEXT_PUBLIC_ADSENSE_AUTO_ADS',
  'NEXT_PUBLIC_ADSENSE_HEADER_AD',
  'NEXT_PUBLIC_ADSENSE_SIDEBAR_AD',
  'NEXT_PUBLIC_ADSENSE_IN_CONTENT_HORIZONTAL',
  'NEXT_PUBLIC_ADSENSE_IN_CONTENT_RECTANGLE',
  'NEXT_PUBLIC_ADSENSE_BLOG_PARAGRAPH_2',
  'NEXT_PUBLIC_ADSENSE_BLOG_PARAGRAPH_7',
];

const EXCLUDED_RUNTIME_PREFIXES = ['VERCEL_', 'TURBO_'];
const EXCLUDED_RUNTIME_KEYS = new Set([
  'VERCEL',
  'NX_DAEMON',
  'PORT',
  'HOSTNAME',
  'NODE_ENV',
]);

function shouldExcludeRuntimeKey(key) {
  if (EXCLUDED_RUNTIME_KEYS.has(key)) return true;
  return EXCLUDED_RUNTIME_PREFIXES.some((prefix) => key.startsWith(prefix));
}

function loadEnvLocal(rootDir) {
  const envPath = path.join(rootDir, '.env.local');
  if (!fs.existsSync(envPath)) {
    throw new Error(`.env.local not found at ${envPath}`);
  }
  return dotenv.parse(fs.readFileSync(envPath, 'utf8'));
}

function buildRuntimeEnvMap(rawEnv) {
  const runtimeEnv = {};
  for (const [key, value] of Object.entries(rawEnv)) {
    if (!key || value === undefined || shouldExcludeRuntimeKey(key)) continue;
    runtimeEnv[key] = String(value);
  }
  runtimeEnv.NEXT_PUBLIC_APP_URL = runtimeEnv.NEXT_PUBLIC_APP_URL || 'https://www.fsidigital.ca';
  runtimeEnv.NEXT_PUBLIC_SITE_URL = runtimeEnv.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca';
  // Keep Redis disabled on Cloud Run until Upstash quota is upgraded/reset so cron runs never error on Fixed plan caps.
  runtimeEnv.DISABLE_REDIS = process.env.CLOUD_RUN_DISABLE_REDIS || 'true';
  return runtimeEnv;
}

function buildSubstitutionsArg(runtimeEnv) {
  const pairs = [`_IMAGE=${IMAGE_URI}`];
  for (const key of BUILD_SUBSTITUTION_KEYS) {
    const fallback = key === 'NEXT_PUBLIC_PAYPAL_CURRENCY' ? 'USD' : '';
    const value = (runtimeEnv[key] ?? fallback).replace(/\|/g, '\\|');
    pairs.push(`_${key}=${value}`);
  }
  return `^|^${pairs.join('|')}`;
}

function serializeYamlEnv(envMap) {
  const keys = Object.keys(envMap).sort();
  return `${keys.map((key) => `${JSON.stringify(key)}: ${JSON.stringify(envMap[key])}`).join('\n')}\n`;
}

function runGcloud(args, { dryRun }) {
  const redacted = args.map((a) => (a.startsWith('^|^') ? '<REDACTED_PUBLIC_SUBSTITUTIONS>' : a));
  console.log(`> ${GCLOUD_BIN} ${redacted.join(' ')}`);
  if (dryRun) return '';
  const result = spawnSync(GCLOUD_BIN, args, { stdio: 'inherit', encoding: 'utf8' });
  if (result.status !== 0) {
    throw new Error(`gcloud failed with exit code ${result.status ?? 1}`);
  }
  return '';
}

function main() {
  const args = new Set(process.argv.slice(2));
  const dryRun = args.has('--dry-run');
  const skipBuild = args.has('--skip-build');
  const rootDir = process.cwd();

  const rawEnv = loadEnvLocal(rootDir);
  const runtimeEnv = buildRuntimeEnvMap(rawEnv);
  const substitutions = buildSubstitutionsArg(runtimeEnv);

  const tempDir = path.join(rootDir, 'scratch');
  fs.mkdirSync(tempDir, { recursive: true });
  const tempEnvFile = path.join(tempDir, `.cloudrun-env-${process.pid}.yaml`);

  try {
    fs.writeFileSync(tempEnvFile, serializeYamlEnv(runtimeEnv), { mode: 0o600 });
    console.log(
      `Prepared ${Object.keys(runtimeEnv).length} runtime env vars for ${SERVICE_NAME} in ${PROJECT_ID} (${REGION}).`
    );

    if (!skipBuild) {
      runGcloud(
        [
          'builds',
          'submit',
          '--project',
          PROJECT_ID,
          '--config',
          'cloudbuild.yaml',
          '--substitutions',
          substitutions,
          '.',
        ],
        { dryRun }
      );
    }

    runGcloud(
      [
        'run',
        'deploy',
        SERVICE_NAME,
        '--project',
        PROJECT_ID,
        '--image',
        IMAGE_URI,
        '--platform',
        'managed',
        '--region',
        REGION,
        '--allow-unauthenticated',
        '--port',
        '8080',
        '--memory',
        '2Gi',
        '--cpu',
        '2',
        '--timeout',
        '300',
        '--concurrency',
        '80',
        '--min-instances',
        '0',
        '--max-instances',
        '5',
        '--env-vars-file',
        tempEnvFile,
      ],
      { dryRun }
    );

    if (!dryRun) {
      const url = execFileSync(
        GCLOUD_BIN,
        [
          'run',
          'services',
          'describe',
          SERVICE_NAME,
          '--project',
          PROJECT_ID,
          '--region',
          REGION,
          '--format',
          'value(status.url)',
        ],
        { encoding: 'utf8' }
      ).trim();
      console.log(`Cloud Run live URL: ${url}`);
    }
  } finally {
    if (fs.existsSync(tempEnvFile)) {
      fs.unlinkSync(tempEnvFile);
    }
  }
}

main();
