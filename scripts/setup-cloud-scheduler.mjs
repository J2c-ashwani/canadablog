#!/usr/bin/env node
/**
 * Idempotently creates or updates all Google Cloud Scheduler cron jobs
 * targeting the FSI Digital production API routes with CRON_SECRET auth.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

const PROJECT_ID = process.env.GCP_PROJECT_ID || 'arboreal-device-516006-j5';
const LOCATION = process.env.GCP_SCHEDULER_LOCATION || 'us-central1';
const GCLOUD_BIN = fs.existsSync('/opt/homebrew/share/google-cloud-sdk/bin/gcloud')
  ? '/opt/homebrew/share/google-cloud-sdk/bin/gcloud'
  : 'gcloud';

const SCHEDULER_JOBS = [
  {
    id: 'fsi-ceo-run',
    schedule: '35 13 * * *',
    path: '/api/ceo/run',
    description: 'Daily CEO OS brief and Window A fail-safe dispatcher',
  },
  {
    id: 'fsi-daily-agents-window-a',
    schedule: '20 13 * * *',
    path: '/api/cron/run-daily-agents?live=true&confirm=EXECUTE_REVENUE_AGENTS&window=na-morning&openerPush=true&max=25',
    description: 'Window A North America morning autonomous revenue dispatch',
  },
  {
    id: 'fsi-daily-agents-window-c',
    schedule: '0 18 * * *',
    path: '/api/cron/run-daily-agents?live=true&confirm=EXECUTE_REVENUE_AGENTS&window=na-afternoon&openerPush=true&max=10',
    description: 'Window C North America afternoon second-look revenue dispatch',
  },
  {
    id: 'fsi-growth-os-health',
    schedule: '10 9 * * *',
    path: '/api/cron/growth-os-health',
    description: 'Daily Growth OS health and delivery reconciliation',
  },
  {
    id: 'fsi-discover-authority',
    schedule: '20 10 * * *',
    path: '/api/cron/discover-authority-opportunities',
    description: 'Daily authority opportunity discovery',
  },
  {
    id: 'fsi-calculator-recovery',
    schedule: '20 11 * * *',
    path: '/api/cron/process-calculator-recovery',
    description: 'Daily calculator lead recovery sequence',
  },
  {
    id: 'fsi-cart-recovery',
    schedule: '5 * * * *',
    path: '/api/cron/process-cart-recovery',
    description: 'Hourly checkout cart recovery dispatch',
  },
  {
    id: 'fsi-alert-nurture',
    schedule: '30 14 * * *',
    path: '/api/cron/process-alert-nurture',
    description: 'Daily grant alert nurture sequence',
  },
  {
    id: 'fsi-reactivation-campaign',
    schedule: '0 15 * * *',
    path: '/api/cron/process-reactivation-campaign',
    description: 'Daily reactivation campaign dispatch',
  },
  {
    id: 'fsi-revenue-hunter',
    schedule: '0 14 * * 1-5',
    path: '/api/cron/process-revenue-hunter',
    description: 'Weekday autonomous revenue hunter pipeline',
  },
  {
    id: 'fsi-product-delivery-recovery',
    schedule: '10 17 * * *',
    path: '/api/cron/process-product-delivery-recovery',
    description: 'Daily paid report delivery verification & recovery',
  },
  {
    id: 'fsi-replay-failed-purchases',
    schedule: '15 0,6,12,18 * * *',
    path: '/api/cron/replay-failed-purchases',
    description: 'Six-hourly failed purchase webhook replay',
  },
  {
    id: 'fsi-mca-priority-recovery',
    schedule: '30 16 * * *',
    path: '/api/cron/process-mca-priority-recovery',
    description: 'Daily MCA priority recovery processing',
  },
  {
    id: 'fsi-social-revenue-sprint',
    schedule: '20 13 * * *',
    path: '/api/cron/process-social-revenue-sprint',
    description: 'Daily social revenue sprint dispatch',
  },
  {
    id: 'fsi-purchase-upsell',
    schedule: '40 15 * * *',
    path: '/api/cron/process-purchase-upsell',
    description: 'Daily buyer upgrade and upsell sequence',
  },
  {
    id: 'fsi-newsletter',
    schedule: '15 0 * * 0',
    path: '/api/cron/process-newsletter',
    description: 'Weekly subscriber funding newsletter digest',
  },
  {
    id: 'fsi-b2b-outreach',
    schedule: '20 14 * * 1-5',
    path: '/api/cron/process-b2b-outreach',
    description: 'Weekday B2B partnership outreach processor',
  },
];

function loadCronSecret(rootDir) {
  const envPath = path.join(rootDir, '.env.local');
  if (!fs.existsSync(envPath)) {
    throw new Error(`.env.local not found at ${envPath}`);
  }
  const parsed = dotenv.parse(fs.readFileSync(envPath, 'utf8'));
  const secret = String(parsed.CRON_SECRET || '').trim();
  if (!secret) {
    throw new Error('CRON_SECRET is missing or empty in .env.local');
  }
  return secret;
}

function getBaseUrl(argv) {
  const flag = argv.find((arg) => arg.startsWith('--base-url='));
  const raw = flag ? flag.slice('--base-url='.length) : process.env.CLOUD_RUN_BASE_URL || 'https://www.fsidigital.ca';
  return raw.replace(/\/+$/, '');
}

function runGcloud(args, dryRun) {
  const redacted = args.map((arg) => (arg.startsWith('Authorization=') ? 'Authorization=Bearer <REDACTED>' : arg));
  if (dryRun) {
    console.log(`[dry-run] ${GCLOUD_BIN} ${redacted.join(' ')}`);
    return 0;
  }
  const result = spawnSync(GCLOUD_BIN, args, { stdio: 'inherit', encoding: 'utf8' });
  return result.status ?? 1;
}

function getExistingJobIds(dryRun) {
  if (dryRun) return new Set();
  const result = spawnSync(
    GCLOUD_BIN,
    ['scheduler', 'jobs', 'list', '--project', PROJECT_ID, '--location', LOCATION, '--format', 'value(ID)'],
    { encoding: 'utf8' }
  );
  if (result.status !== 0) {
    throw new Error(`Failed to list Cloud Scheduler jobs: ${result.stderr || result.status}`);
  }
  return new Set(
    String(result.stdout || '')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
  );
}

function upsertJob(job, baseUrl, cronSecret, existingIds, dryRun) {
  const action = existingIds.has(job.id) ? 'update' : 'create';
  const args = [
    'scheduler',
    'jobs',
    action,
    'http',
    job.id,
    '--project',
    PROJECT_ID,
    '--location',
    LOCATION,
    '--schedule',
    job.schedule,
    '--time-zone',
    'UTC',
    '--uri',
    `${baseUrl}${job.path}`,
    '--http-method',
    'GET',
    '--headers',
    `Authorization=Bearer ${cronSecret}`,
    '--attempt-deadline',
    '300s',
    '--description',
    job.description,
    '--quiet',
  ];
  const code = runGcloud(args, dryRun);
  if (code !== 0) {
    throw new Error(`Failed to ${action} Cloud Scheduler job ${job.id}`);
  }
  console.log(`${dryRun ? '[dry-run] ' : ''}${action === 'update' ? 'Updated' : 'Created'} ${job.id} (${job.schedule} UTC -> ${job.path})`);
}

function main() {
  const argv = process.argv.slice(2);
  const dryRun = argv.includes('--dry-run');
  const baseUrl = getBaseUrl(argv);
  const cronSecret = loadCronSecret(process.cwd());
  const existingIds = getExistingJobIds(dryRun);

  for (const job of SCHEDULER_JOBS) {
    upsertJob(job, baseUrl, cronSecret, existingIds, dryRun);
  }
  console.log(`Configured ${SCHEDULER_JOBS.length} Cloud Scheduler jobs for ${baseUrl} in ${PROJECT_ID}/${LOCATION}.`);
}

main();
