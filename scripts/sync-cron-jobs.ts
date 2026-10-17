/**
 * FSI Digital — cron-job.org Automated Synchronization & Registry Engine
 * 
 * Interacts directly with the official cron-job.org REST API (v1) to programmatically
 * audit, create, and update all production cron jobs for FSI Digital.
 * 
 * Usage:
 *   export CRON_SECRET="your-production-cron-secret"
 *   export CRONJOB_API_KEY="your-cron-job-org-api-key" (optional: if omitted, prints UI setup table)
 *   npx tsx scripts/sync-cron-jobs.ts
 */

import https from 'https';

interface DesiredCronJob {
  title: string;
  url: string;
  schedule: {
    hours: number[];
    minutes: number[];
    mdays: number[];
    months: number[];
    wdays: number[];
    timezone: string;
  };
  humanSchedule: string;
  purpose: string;
}

const PRODUCTION_BASE_URL = 'https://www.fsidigital.ca';

// Timezone: UTC for all backend crons
const TZ = 'UTC';

const DESIRED_JOBS: DesiredCronJob[] = [
  {
    title: 'FSI - CEO OS Executive Run',
    url: `${PRODUCTION_BASE_URL}/api/ceo/run`,
    schedule: { hours: [8], minutes: [10], mdays: [-1], months: [-1], wdays: [-1], timezone: TZ },
    humanSchedule: 'Daily at 08:10 UTC',
    purpose: 'Executive revenue audit, leakage detection, & outcome verification'
  },
  {
    title: 'FSI - Growth OS Health Check',
    url: `${PRODUCTION_BASE_URL}/api/cron/growth-os-health`,
    schedule: { hours: [9], minutes: [10], mdays: [-1], months: [-1], wdays: [-1], timezone: TZ },
    humanSchedule: 'Daily at 09:10 UTC',
    purpose: 'Audits SERPER ingestion, signal queue, and safety bounds'
  },
  {
    title: 'FSI - Discover Authority Opportunities',
    url: `${PRODUCTION_BASE_URL}/api/cron/discover-authority-opportunities`,
    schedule: { hours: [10], minutes: [20], mdays: [-1], months: [-1], wdays: [-1], timezone: TZ },
    humanSchedule: 'Daily at 10:20 UTC',
    purpose: 'SERPER prospector and commercial backlink discovery'
  },
  {
    title: 'FSI - Process Calculator Recovery',
    url: `${PRODUCTION_BASE_URL}/api/cron/process-calculator-recovery`,
    schedule: { hours: [11], minutes: [20], mdays: [-1], months: [-1], wdays: [-1], timezone: TZ },
    humanSchedule: 'Daily at 11:20 UTC',
    purpose: 'Recovers diagnostic and calculator leads with "Hatke" CA/US sequences'
  },
  {
    title: 'FSI - Process Cart Abandonment Recovery',
    url: `${PRODUCTION_BASE_URL}/api/cron/process-cart-recovery`,
    schedule: { hours: [-1], minutes: [5], mdays: [-1], months: [-1], wdays: [-1], timezone: TZ },
    humanSchedule: 'Hourly at :05',
    purpose: 'Recovers abandoned $19, $49, and $79 digital product checkouts'
  },
  {
    title: 'FSI - Process Alert Nurture Sequences',
    url: `${PRODUCTION_BASE_URL}/api/cron/process-alert-nurture`,
    schedule: { hours: [14], minutes: [30], mdays: [-1], months: [-1], wdays: [-1], timezone: TZ },
    humanSchedule: 'Daily at 14:30 UTC',
    purpose: 'Dispatches 7/21-day direct-response capital leakage emails'
  },
  {
    title: 'FSI - Process Revenue Hunter B2B Outbound',
    url: `${PRODUCTION_BASE_URL}/api/cron/process-revenue-hunter`,
    schedule: { hours: [14], minutes: [0], mdays: [-1], months: [-1], wdays: [1, 2, 3, 4, 5], timezone: TZ },
    humanSchedule: 'Mon-Fri at 14:00 UTC',
    purpose: 'Autonomous high-intent warm lead reactivations and B2B outreach'
  },
  {
    title: 'FSI - Process Product Delivery Recovery',
    url: `${PRODUCTION_BASE_URL}/api/cron/process-product-delivery-recovery`,
    schedule: { hours: [17], minutes: [10], mdays: [-1], months: [-1], wdays: [-1], timezone: TZ },
    humanSchedule: 'Daily at 17:10 UTC',
    purpose: 'Re-evaluates pending PDF compilation and dispatches download tokens'
  },
  {
    title: 'FSI - Replay Failed Purchases',
    url: `${PRODUCTION_BASE_URL}/api/cron/replay-failed-purchases`,
    schedule: { hours: [0, 6, 12, 18], minutes: [15], mdays: [-1], months: [-1], wdays: [-1], timezone: TZ },
    humanSchedule: 'Every 6 hours at :15',
    purpose: 'Re-processes captured PayPal intents that missed instant webhook delivery'
  },
  {
    title: 'FSI - Process Social Revenue Sprint',
    url: `${PRODUCTION_BASE_URL}/api/cron/process-social-revenue-sprint`,
    schedule: { hours: [13], minutes: [30], mdays: [-1], months: [-1], wdays: [-1], timezone: TZ },
    humanSchedule: 'Daily at 13:30 UTC',
    purpose: 'Autonomous daily multi-channel social posting across Facebook, Instagram, and LinkedIn'
  }
];

function apiRequest(options: https.RequestOptions, postData?: any): Promise<{ statusCode: number; data: any }> {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        let parsed = null;
        try {
          parsed = body ? JSON.parse(body) : null;
        } catch {
          parsed = body;
        }
        resolve({ statusCode: res.statusCode || 0, data: parsed });
      });
    });

    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function syncCronJobs() {
  console.log('════════════════════════════════════════════════════════════════════');
  console.log('🚀 FSI DIGITAL — CRON-JOB.ORG PRODUCTION SYNCHRONIZATION ENGINE');
  console.log('════════════════════════════════════════════════════════════════════\n');

  const cronSecret = process.env.CRON_SECRET;
  const cronJobApiKey = process.env.CRONJOB_API_KEY || process.env.CRON_JOB_API_KEY;

  if (!cronSecret) {
    console.warn('⚠️  CRON_SECRET environment variable is missing.');
    console.warn('   Ensure you export CRON_SECRET to authenticate calls against fsidigital.ca.\n');
  }

  // If no API key is provided, print the exact setup configuration matrix for manual / web dashboard verification
  if (!cronJobApiKey) {
    console.log('ℹ️  No CRONJOB_API_KEY provided.');
    console.log('   Here is the verified production configuration matrix for cron-job.org:\n');

    console.table(
      DESIRED_JOBS.map((j) => ({
        Title: j.title,
        URL: j.url,
        Schedule: j.humanSchedule,
        Method: 'GET',
        Required_Header: 'Authorization: Bearer <CRON_SECRET>',
        Purpose: j.purpose
      }))
    );

    console.log('\n💡 To sync automatically via the cron-job.org REST API:');
    console.log('   1. Get your API Key from: https://cron-job.org/en/members/settings/ (API section)');
    console.log('   2. Run:');
    console.log('      CRONJOB_API_KEY="your-key" CRON_SECRET="your-secret" npx tsx scripts/sync-cron-jobs.ts\n');
    return;
  }

  console.log('🔑 CRONJOB_API_KEY detected. Connecting to https://api.cron-job.org/jobs ...');

  try {
    // 1. Fetch existing jobs
    const getRes = await apiRequest({
      hostname: 'api.cron-job.org',
      path: '/jobs',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cronJobApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (getRes.statusCode !== 200) {
      console.error(`❌ Failed to retrieve jobs from cron-job.org (HTTP ${getRes.statusCode}):`, getRes.data);
      process.exit(1);
    }

    const existingJobs: any[] = getRes.data.jobs || [];
    console.log(`✅ Found ${existingJobs.length} active jobs on cron-job.org.\n`);

    // 2. Iterate desired jobs and create or update
    for (const desired of DESIRED_JOBS) {
      const match = existingJobs.find(
        (ej) => ej.url.toLowerCase() === desired.url.toLowerCase() || ej.title.toLowerCase() === desired.title.toLowerCase()
      );

      const jobPayload = {
        job: {
          url: desired.url,
          title: desired.title,
          enabled: true,
          saveResponses: true,
          schedule: desired.schedule,
          requestMethod: 0, // 0 = GET, 1 = POST
          extendedData: {
            headers: {
              Authorization: `Bearer ${cronSecret || ''}`,
              'User-Agent': 'cron-job.org (FSI Digital Synchronizer)'
            }
          }
        }
      };

      if (match) {
        console.log(`🔄 Updating existing job [ID: ${match.jobId}] - ${desired.title} ...`);
        const patchRes = await apiRequest(
          {
            hostname: 'api.cron-job.org',
            path: `/jobs/${match.jobId}`,
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${cronJobApiKey}`,
              'Content-Type': 'application/json'
            }
          },
          jobPayload
        );

        if (patchRes.statusCode === 200) {
          console.log(`   ✅ Successfully updated: ${desired.title} (${desired.humanSchedule})`);
        } else {
          console.warn(`   ⚠️  Update failed for ${desired.title} (HTTP ${patchRes.statusCode}):`, patchRes.data);
        }
      } else {
        console.log(`➕ Creating new job - ${desired.title} ...`);
        const putRes = await apiRequest(
          {
            hostname: 'api.cron-job.org',
            path: '/jobs',
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${cronJobApiKey}`,
              'Content-Type': 'application/json'
            }
          },
          jobPayload
        );

        if (putRes.statusCode === 200 || putRes.statusCode === 201) {
          console.log(`   ✅ Successfully created: ${desired.title} (${desired.humanSchedule})`);
        } else {
          console.warn(`   ⚠️  Creation failed for ${desired.title} (HTTP ${putRes.statusCode}):`, putRes.data);
        }
      }
    }

    console.log('\n🎉 Production cron-job.org synchronization finished.');
  } catch (err: any) {
    console.error('💥 Fatal error syncing cron-job.org jobs:', err.message || err);
    process.exit(1);
  }
}

syncCronJobs();
