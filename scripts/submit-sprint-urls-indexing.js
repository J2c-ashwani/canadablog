const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const CREDENTIALS_PATH = path.join(__dirname, '../google-credentials.json');

if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error('\n❌ ERROR: Google Credentials File Missing!\n');
    process.exit(1);
}

const credentials = require(CREDENTIALS_PATH);
const auth = google.auth.fromJSON(credentials);
auth.scopes = ['https://www.googleapis.com/auth/indexing'];

const indexing = google.indexing({
    version: 'v3',
    auth: auth
});

const SPRINT_URLS = [
    // Canadian Provincial Power Grid (Overhauled in Sprint 4)
    "https://www.fsidigital.ca/canada/ontario",
    "https://www.fsidigital.ca/canada/british-columbia",
    "https://www.fsidigital.ca/canada/alberta",
    "https://www.fsidigital.ca/canada/quebec",
    "https://www.fsidigital.ca/canada/manitoba",
    "https://www.fsidigital.ca/canada/saskatchewan",
    "https://www.fsidigital.ca/canada/nova-scotia",
    "https://www.fsidigital.ca/canada/new-brunswick",
    "https://www.fsidigital.ca/calculator",

    // Flagship Canada Commercial Hubs (Overhauled in Sprint 2)
    "https://www.fsidigital.ca/canada/small-business-grants",
    "https://www.fsidigital.ca/canada/government-grants",
    "https://www.fsidigital.ca/canada/women-business-grants",
    "https://www.fsidigital.ca/canada/indigenous-entrepreneur-grants",
    "https://www.fsidigital.ca/canada/innovation-grants",

    // Top 10 Striking Distance Blog Posts (Titles Optimized in Sprint 1)
    "https://www.fsidigital.ca/blog/nih-sbir-biotech-grants",
    "https://www.fsidigital.ca/blog/new-york-tech-programs",
    "https://www.fsidigital.ca/blog/colorado-tech-programs",
    "https://www.fsidigital.ca/blog/dod-sbir-defense-tech-grants",
    "https://www.fsidigital.ca/blog/healthcare-grants-2026",
    "https://www.fsidigital.ca/blog/canexport-grants-2026",
    "https://www.fsidigital.ca/blog/bmo-celebrating-women-grant",
    "https://www.fsidigital.ca/blog/usda-sbir-agtech-grants",
    "https://www.fsidigital.ca/blog/7-startup-accelerators-california-free-money",
    "https://www.fsidigital.ca/blog/women-entrepreneurship-strategy-canada",

    // USA Hubs & Comparisons (Sprint 1)
    "https://www.fsidigital.ca/usa/nevada",
    "https://www.fsidigital.ca/usa/oregon",
    "https://www.fsidigital.ca/usa/arizona",
    "https://www.fsidigital.ca/usa/missouri",
    "https://www.fsidigital.ca/usa/kansas/wichita",
    "https://www.fsidigital.ca/compare/nsf-vs-nih-sbir",
    "https://www.fsidigital.ca/compare/mitacs-vs-irap",
    "https://www.fsidigital.ca/download/amber-grant-women-application-guide",

    // Page-1 High-Impression pSEO Pages (With New Regional Showcase & Schemas)
    "https://www.fsidigital.ca/grants/mi/detroit/minority-owned",
    "https://www.fsidigital.ca/grants/va/richmond/arts-entertainment",
    "https://www.fsidigital.ca/grants/oh/toledo/women-entrepreneurs",
    "https://www.fsidigital.ca/grants/on/toronto/technology",
    "https://www.fsidigital.ca/grants/bc/vancouver/women-entrepreneurs",
    "https://www.fsidigital.ca/grants/ca/san-francisco/technology",
    "https://www.fsidigital.ca/grants/il/peoria-il/minority-owned",
    "https://www.fsidigital.ca/grants/mb/winnipeg/restaurants-hospitality",
    "https://www.fsidigital.ca/grants/nc/raleigh/logistics",
    "https://www.fsidigital.ca/grants/pa/erie/veterans",

    // Sprint 6 High-Impact Additions (Minnesota, California, Veteran, Federal Grants)
    "https://www.fsidigital.ca/usa/minnesota",
    "https://www.fsidigital.ca/usa/california",
    "https://www.fsidigital.ca/blog/veteran-business-funding-canada-2026",
    "https://www.fsidigital.ca/blog/canada-federal-grants",
    "https://www.fsidigital.ca/blog/canada-startup-funding-grants-guide",
    "https://www.fsidigital.ca/blog/women-technology-grants-canada",
    "https://www.fsidigital.ca/blog/canada-aerospace-defence-innovation-grants",
    "https://www.fsidigital.ca/grants/on/toronto/restaurants-hospitality",
    "https://www.fsidigital.ca/grants/qc/montreal/women-entrepreneurs",
    "https://www.fsidigital.ca/grants/mb/winnipeg/non-profits",
    "https://www.fsidigital.ca/grants/ab/calgary/restaurants-hospitality",
    "https://www.fsidigital.ca/grants/on/toronto/construction"
];

async function submitUrl(url) {
    try {
        const response = await indexing.urlNotifications.publish({
            requestBody: {
                url: url,
                type: 'URL_UPDATED'
            }
        });
        console.log(`✅ [SUBMITTED] ${url} (Status: ${response.status})`);
        return true;
    } catch (error) {
        console.error(`❌ [FAILED] ${url} - Error: ${error.message}`);
        return false;
    }
}

async function run() {
    console.log(`🚀 Starting Google Indexing API push for ${SPRINT_URLS.length} priority URLs...\n`);
    let successCount = 0;

    for (const url of SPRINT_URLS) {
        const success = await submitUrl(url);
        if (success) successCount++;
        // Respect rate limits: small 250ms gap between submissions
        await new Promise(r => setTimeout(r, 250));
    }

    console.log(`\n🎉 Google Indexing Push Complete: ${successCount}/${SPRINT_URLS.length} URLs submitted successfully!`);
}

run();
