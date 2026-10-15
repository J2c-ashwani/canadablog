import * as fs from 'fs';
import * as path from 'path';
import { google } from 'googleapis';
import { UNINDEXED_REVIVAL_COHORT } from '../lib/pseo-engine/unindexedRevivalCohort';

async function main() {
  const credentialsPath = path.resolve(process.cwd(), 'google-credentials.json');
  if (!fs.existsSync(credentialsPath)) {
    throw new Error('google-credentials.json not found');
  }

  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const searchconsole = google.searchconsole({ version: 'v1', auth });

  console.log('📡 Querying GSC URL Inspection API for 6 Revival Pages...\n');

  for (const routePath of Object.keys(UNINDEXED_REVIVAL_COHORT)) {
    const inspectionUrl = `https://www.fsidigital.ca${routePath}`;
    try {
      const res = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl,
          siteUrl: 'sc-domain:fsidigital.ca',
        },
      });

      const result = res.data.inspectionResult;
      const indexStatus = result?.indexStatusResult;
      console.log(`URL: ${inspectionUrl}`);
      console.log(`  - Verdict: ${indexStatus?.verdict || 'UNKNOWN'}`);
      console.log(`  - Coverage State: ${indexStatus?.coverageState || 'UNKNOWN'}`);
      console.log(`  - Crawled as: ${indexStatus?.crawledAs || 'UNKNOWN'}`);
      console.log(`  - Last Crawl Time: ${indexStatus?.lastCrawlTime || 'NEVER'}\n`);
    } catch (err: any) {
      console.error(`  ❌ Error inspecting ${inspectionUrl}:`, err.message || err);
    }
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
