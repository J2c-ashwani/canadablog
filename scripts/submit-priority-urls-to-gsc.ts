// scripts/submit-priority-urls-to-gsc.ts
// Uses Google Search Console API siteOwner credentials to inspect and verify indexing state
import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const credentialsPath = path.resolve(process.cwd(), 'google-credentials.json');
  if (!fs.existsSync(credentialsPath)) {
    console.error('❌ google-credentials.json not found');
    process.exit(1);
  }

  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
  const auth = google.auth.fromJSON(credentials);
  auth.scopes = [
    'https://www.googleapis.com/auth/webmasters.readonly',
    'https://www.googleapis.com/auth/webmasters'
  ];

  const searchconsole = google.searchconsole({ version: 'v1', auth });
  const siteUrl = 'sc-domain:fsidigital.ca';

  console.log(`📡 Connecting to Google Search Console for: ${siteUrl}`);
  console.log(`🤖 Service Account: ${credentials.client_email}\n`);

  // Target Priority URLs from Sprint 1 and Sprint 2
  const priorityUrls = [
    // Flagship Canada Hubs
    'https://www.fsidigital.ca/canada/small-business-grants',
    'https://www.fsidigital.ca/canada/government-grants',
    'https://www.fsidigital.ca/canada/women-business-grants',
    'https://www.fsidigital.ca/canada/indigenous-entrepreneur-grants',
    'https://www.fsidigital.ca/canada/innovation-grants',

    // Top Striking Distance Blog Posts
    'https://www.fsidigital.ca/blog/nih-sbir-biotech-grants',
    'https://www.fsidigital.ca/blog/new-york-tech-programs',
    'https://www.fsidigital.ca/blog/colorado-tech-programs',
    'https://www.fsidigital.ca/blog/dod-sbir-defense-tech-grants',
    'https://www.fsidigital.ca/blog/healthcare-grants-2026',
    'https://www.fsidigital.ca/blog/canexport-grants-2026',
    'https://www.fsidigital.ca/blog/bmo-celebrating-women-grant',
    'https://www.fsidigital.ca/blog/usda-sbir-agtech-grants',
    'https://www.fsidigital.ca/blog/7-startup-accelerators-california-free-money',
    'https://www.fsidigital.ca/blog/women-entrepreneurship-strategy-canada',

    // USA Hubs
    'https://www.fsidigital.ca/usa/nevada',
    'https://www.fsidigital.ca/usa/oregon',
    'https://www.fsidigital.ca/usa/arizona',
    'https://www.fsidigital.ca/usa/missouri',
    'https://www.fsidigital.ca/usa/kansas/wichita',

    // Comparisons & Downloads
    'https://www.fsidigital.ca/compare/nsf-vs-nih-sbir',
    'https://www.fsidigital.ca/compare/mitacs-vs-irap',
    'https://www.fsidigital.ca/download/amber-grant-women-application-guide',

    // Page 1 High-Impression pSEO Pages
    'https://www.fsidigital.ca/grants/mi/detroit/minority-owned',
    'https://www.fsidigital.ca/grants/va/richmond/arts-entertainment',
    'https://www.fsidigital.ca/grants/oh/toledo/women-entrepreneurs',
    'https://www.fsidigital.ca/grants/on/toronto/technology',
    'https://www.fsidigital.ca/grants/bc/vancouver/women-entrepreneurs',
  ];

  console.log(`Inspecting ${priorityUrls.length} priority URLs in Google Search Console...\n`);

  for (const inspectionUrl of priorityUrls) {
    try {
      const res = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl,
          siteUrl,
        },
      });

      const result = res.data.inspectionResult;
      const indexStatus = result?.indexStatusResult;
      const coverageState = indexStatus?.coverageState || 'UNKNOWN';
      const verdict = indexStatus?.verdict || 'UNKNOWN';
      const lastCrawl = indexStatus?.lastCrawlTime || 'Never';

      console.log(`[${verdict}] ${inspectionUrl}`);
      console.log(`  Coverage: ${coverageState} | Last Crawled: ${lastCrawl}`);
    } catch (err: any) {
      console.log(`[ERR] ${inspectionUrl} — ${err.message}`);
    }
  }

  console.log('\n✅ Priority URL inspection cycle complete.');
}

main().catch(console.error);
