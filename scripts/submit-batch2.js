const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const CREDENTIALS_PATH = path.join(__dirname, '../google-credentials.json');

// Check if credentials exist
if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error('\\n❌ ERROR: Google Credentials File Missing!\\n');
    process.exit(1);
}

// Authenticate with Google
const credentials = require(CREDENTIALS_PATH);
const auth = google.auth.fromJSON(credentials);
auth.scopes = ['https://www.googleapis.com/auth/indexing'];

const indexing = google.indexing({
    version: 'v3',
    auth: auth
});

const rawText = `
https://www.fsidigital.ca/usa/agriculture-farming-grants	21 Mar 2026
https://www.fsidigital.ca/usa/california/sacramento	20 Mar 2026
https://www.fsidigital.ca/usa/alberta	20 Mar 2026
https://www.fsidigital.ca/usa/ontario	19 Mar 2026
https://www.fsidigital.ca/usa/minority-owned-business-grants	19 Mar 2026
https://www.fsidigital.ca/refund-cancellation	19 Mar 2026
https://www.fsidigital.ca/blog/irap-nrc-canada-guide	19 Mar 2026
https://www.fsidigital.ca/usa/sba-loans	19 Mar 2026
https://www.fsidigital.ca/blog/top-10-no-equity-grants-black-female-entrepreneurs-2026	19 Mar 2026
https://www.fsidigital.ca/faq	17 Mar 2026
https://www.fsidigital.ca/blog/sustainable-development-technology-canada-guide	16 Mar 2026
https://www.fsidigital.ca/blog/agriculture-agri-food-canada-grants	12 Mar 2026
https://www.fsidigital.ca/blog/canadian-government-grants-tech-startups	5 Mar 2026
https://www.fsidigital.ca/blog/biden-2-5b-grants-2025	2 Mar 2026
https://www.fsidigital.ca/blog/agricultural-grants-canada	2 Mar 2026
https://www.fsidigital.ca/blog/sred-tax-credits-guide	1 Mar 2026
https://www.fsidigital.ca/blog/canada-aerospace--defence-innovation-grants	1 Mar 2026
https://www.fsidigital.ca/blog/energy-efficiency-grants-canada	28 Feb 2026
https://www.fsidigital.ca/blog/texas-tech-programs	28 Feb 2026
https://www.fsidigital.ca/guides/apply-women-entrepreneurship-strateg	28 Feb 2026
https://www.fsidigital.ca/blog/small-business-grants-ontario	27 Feb 2026
https://www.fsidigital.ca/blog/quebec-business-grants-loans-guide	26 Feb 2026
https://www.fsidigital.ca/blog/women-business-grants-canada	26 Feb 2026
https://www.fsidigital.ca/blog/canada-digital--ai-innovation-grants	26 Feb 2026
https://www.fsidigital.ca/guides/canada-innovation-rd-funding-guide	26 Feb 2026
https://www.fsidigital.ca/guides/sbir-sttr-complete-guide	26 Feb 2026
https://www.fsidigital.ca/blog/health-tech-grants	26 Feb 2026
https://www.fsidigital.ca/blog/cdap-guide	26 Feb 2026
https://www.fsidigital.ca/blog/manufacturing-grants	26 Feb 2026
https://www.fsidigital.ca/blog/ocean-tech-grants	26 Feb 2026
https://www.fsidigital.ca/blog/rural-funding-guide	26 Feb 2026
https://www.fsidigital.ca/blog/texas-business-incentives	26 Feb 2026
https://www.fsidigital.ca/blog/futurpreneur-loans-mentorship	26 Feb 2026
https://www.fsidigital.ca/blog/sred-guide	26 Feb 2026
https://www.fsidigital.ca/blog/canexport-guide	25 Feb 2026
https://www.fsidigital.ca/blog/canadian-small-business-funding-guide	25 Feb 2026
https://www.fsidigital.ca/blog/women-minority-business-grants-guide	25 Feb 2026
https://www.fsidigital.ca/blog/startup-business-grants-canada-guide	25 Feb 2026
https://www.fsidigital.ca/guides/apply-aafc-grants	24 Feb 2026
https://www.fsidigital.ca/blog/cybersecurity-startup-grants	23 Feb 2026
https://www.fsidigital.ca/blog/small-business-financing-2025	22 Feb 2026
https://www.fsidigital.ca/blog/canada-regional-development-2025	21 Feb 2026
https://www.fsidigital.ca/blog/quebec-business-grants-2025	21 Feb 2026
https://www.fsidigital.ca/blog/indigenous-business-development-2025	21 Feb 2026
https://www.fsidigital.ca/blog/october-2025-last-chance	19 Feb 2026
https://www.fsidigital.ca/blog/doe-clean-tech-2025	16 Feb 2026
https://www.fsidigital.ca/blog/sred-tax-credits-2025	16 Feb 2026
https://www.fsidigital.ca/blog/florida-business-grants-2025	16 Feb 2026
https://www.fsidigital.ca/blog/q4-2025-deadlines	16 Feb 2026
https://www.fsidigital.ca/blog/canada-irap-grants-2025	15 Feb 2026
https://www.fsidigital.ca/blog/innovation-superclusters-2025	14 Feb 2026
https://www.fsidigital.ca/blog/apply-usa-grants-2025	14 Feb 2026
https://www.fsidigital.ca/blog/rural-business-development-2025	14 Feb 2026
https://www.fsidigital.ca/blog/veterans-business-grants-2025	14 Feb 2026
https://www.fsidigital.ca/blog/new-york-business-grants-2025	13 Feb 2026
https://www.fsidigital.ca/blog/manufacturing-grants-2025	13 Feb 2026
https://www.fsidigital.ca/blog/digital-transformation-2025	13 Feb 2026
https://www.fsidigital.ca/blog/agricultural-innovation-2025	13 Feb 2026
https://www.fsidigital.ca/blog/minority-business-grants-2025	13 Feb 2026
https://www.fsidigital.ca/blog/usda-rural-grants-2025	13 Feb 2026
https://www.fsidigital.ca/blog/technology-startup-grants-2025	14 Jan 2026
https://www.fsidigital.ca/editorial-policy	12 Jan 2026
https://www.fsidigital.ca/blog/cybersecurity-grants	19 Dec 2025


https://www.fsidigital.ca/grants/bc
20 Mar 2026
https://www.fsidigital.ca/usa/north-carolina/raleigh-/-durham
20 Mar 2026
https://www.fsidigital.ca/canada/business-grants
18 Mar 2026
https://www.fsidigital.ca/new-york-business-grants-consultation
16 Mar 2026
https://www.fsidigital.ca/illinois-business-grants-consultation
15 Mar 2026
https://www.fsidigital.ca/usa/maryland/rockville-/-bethesda
10 Mar 2026
https://www.fsidigital.ca/cdbg-community-consultation
5 Mar 2026
https://www.fsidigital.ca/canada/life-sciences-funding-guide
5 Mar 2026
https://www.fsidigital.ca/grants/technology-grants
28 Feb 2026
https://www.fsidigital.ca/rural-grant-consultation
`;

// Extract ALL URLs and drop the dates
const urlRegex = /(https:\/\/www\.fsidigital\.ca[^\s]*)/g;
const TARGET_URLS = Array.from(new Set(rawText.match(urlRegex)));

// Submits a single URL
async function submitUrl(url) {
    try {
        const response = await indexing.urlNotifications.publish({
            requestBody: {
                url: url,
                type: 'URL_UPDATED'
            }
        });
        
        console.log(`✅ Success: ${url}`);
        return true;
    } catch (e) {
        if (e.response && e.response.status === 429) {
            console.error(`\\n⚠️ QUOTA EXCEEDED (429) at URL: ${url}`);
            return false;
        } else {
            console.error(`❌ Error (${e.response ? e.response.status : e.message}): ${url}`);
            if (e.response && e.response.data) {
                 console.error(JSON.stringify(e.response.data));
            }
            // Continuing execution if it's a random 4xx error (like malformed URL)
            return true;
        }
    }
}

// Batch submission wrapper
async function run() {
    console.log(`\\n========================================`);
    console.log(`🚀 STARTING BATCH SUBMISSION 2...`);
    console.log(`========================================\\n`);
    console.log(`Attempting to push ${TARGET_URLS.length} targeted URLs.\\n`);

    let successCount = 0;
    
    for (const url of TARGET_URLS) {
        const shouldContinue = await submitUrl(url);
        if (!shouldContinue) {
             console.log('\\n🛑 Force stopping batch due to quota exhaustion.');
             break;
        }
        successCount++;
        // Small delay to prevent API anger
        await new Promise(r => setTimeout(r, 600)); 
    }

    console.log(`\\n========================================`);
    console.log(`📊 BATCH COMPLETE`);
    console.log(`Successfully processed: ${successCount} / ${TARGET_URLS.length}`);
    console.log(`========================================\\n`);
}

run();
