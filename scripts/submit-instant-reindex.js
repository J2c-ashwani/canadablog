const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const CREDENTIALS_PATH = path.join(__dirname, '../google-credentials.json');

if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error('\n❌ ERROR: Google Credentials File Missing!\n');
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

// Top 150 High-Commercial-Intent Blogs/Guides to Reindex Immediately
const TARGET_URLS = [
    "https://www.fsidigital.ca/blog/canada-irap-grants-2026",
    "https://www.fsidigital.ca/blog/sred-tax-credits-2026",
    "https://www.fsidigital.ca/blog/ontario-small-business-grants-guide",
    "https://www.fsidigital.ca/blog/alberta-small-business-grants-guide",
    "https://www.fsidigital.ca/blog/bc-small-business-grants-guide",
    "https://www.fsidigital.ca/blog/quebec-small-business-grants-guide",
    "https://www.fsidigital.ca/blog/saskatchewan-small-business-grants-guide",
    "https://www.fsidigital.ca/blog/manitoba-small-business-grants-guide",
    "https://www.fsidigital.ca/blog/women-business-grants-2026",
    "https://www.fsidigital.ca/blog/minority-business-grants-2026",
    "https://www.fsidigital.ca/blog/veteran-business-funding-canada-2026",
    "https://www.fsidigital.ca/blog/technology-startup-grants-2026",
    "https://www.fsidigital.ca/blog/software-saas-startup-grants",
    "https://www.fsidigital.ca/blog/ai-machine-learning-grants",
    "https://www.fsidigital.ca/blog/healthcare-grants-2026",
    "https://www.fsidigital.ca/blog/manufacturing-grants-2026",
    "https://www.fsidigital.ca/blog/agriculture-grants-2026",
    "https://www.fsidigital.ca/blog/clean-technology-2026",
    "https://www.fsidigital.ca/blog/sred-scientific-research-experimental-development",
    "https://www.fsidigital.ca/blog/irap-industrial-research-assistance-program-government-grants",
    "https://www.fsidigital.ca/blog/irap-industrial-research-assistance-program",
    "https://www.fsidigital.ca/blog/csbfp-canada-small-business-financing-program",
    "https://www.fsidigital.ca/blog/black-entrepreneurship-loan-fund-2026",
    "https://www.fsidigital.ca/blog/bmo-celebrating-women-grant",
    "https://www.fsidigital.ca/blog/rbc-women-entrepreneur-awards",
    "https://www.fsidigital.ca/blog/scotiabank-women-initiative",
    "https://www.fsidigital.ca/blog/wbdc-equity-match-grant-women",
    "https://www.fsidigital.ca/blog/women-entrepreneurship-grants-2026",
    "https://www.fsidigital.ca/blog/indigenous-business-development-2026",
    "https://www.fsidigital.ca/blog/indigenous-women-business-grants-canada",
    "https://www.fsidigital.ca/blog/youth-entrepreneurship-canada-funding",
    "https://www.fsidigital.ca/blog/newcomer-entrepreneur-grants-2026",
    "https://www.fsidigital.ca/blog/california-business-grants-2026",
    "https://www.fsidigital.ca/blog/texas-business-grants-2026",
    "https://www.fsidigital.ca/blog/new-york-business-grants-2026",
    "https://www.fsidigital.ca/blog/florida-business-grants-2026",
    "https://www.fsidigital.ca/blog/illinois-business-development-2026",
    "https://www.fsidigital.ca/blog/michigan-manufacturing-renaissance-2026",
    "https://www.fsidigital.ca/blog/pennsylvania-innovation-2026",
    "https://www.fsidigital.ca/blog/nsf-stem-research-2026",
    "https://www.fsidigital.ca/blog/doe-sbir-clean-energy-grants",
    "https://www.fsidigital.ca/blog/usda-sbir-agtech-grants",
    "https://www.fsidigital.ca/blog/dod-sbir-defense-tech-grants",
    "https://www.fsidigital.ca/blog/nasa-sbir-space-tech-grants",
    "https://www.fsidigital.ca/blog/nih-sbir-biotech-grants",
    "https://www.fsidigital.ca/blog/nsf-sbir-grants-technology-startups",
    "https://www.fsidigital.ca/blog/sba-sbir-grants-2026",
    "https://www.fsidigital.ca/blog/sred-tax-credits-vs-cdap-canadian-founders",
    "https://www.fsidigital.ca/blog/sba-7a-loans-vs-state-grants-comparison",
    "https://www.fsidigital.ca/blog/top-10-no-equity-grants-black-female-entrepreneurs",
    "https://www.fsidigital.ca/blog/5-best-government-loans-agriculture-tech-startups",
    "https://www.fsidigital.ca/blog/usda-reap-grant-vs-utility-rebates",
    "https://www.fsidigital.ca/blog/women-business-centers-guide",
    "https://www.fsidigital.ca/blog/women-entrepreneurship-fund-canada",
    "https://www.fsidigital.ca/blog/wosb-federal-contracting-guide",
    "https://www.fsidigital.ca/blog/biden-2-5b-grants-2026",
    "https://www.fsidigital.ca/blog/biotech-life-sciences-grants",
    "https://www.fsidigital.ca/blog/british-columbia-government-business-grants",
    "https://www.fsidigital.ca/blog/british-columbia-innovation-grants",
    "https://www.fsidigital.ca/blog/california-tech-programs",
    "https://www.fsidigital.ca/blog/clean-tech-energy-grants",
    "https://www.fsidigital.ca/blog/colorado-tech-programs",
    "https://www.fsidigital.ca/blog/cybersecurity-grants",
    "https://www.fsidigital.ca/blog/doe-sbir-clean-energy-grants",
    "https://www.fsidigital.ca/blog/hardware-iot-startup-grants",
    "https://www.fsidigital.ca/blog/hud-community-2026",
    "https://www.fsidigital.ca/blog/massachusetts-tech-programs",
    "https://www.fsidigital.ca/blog/new-york-tech-programs",
    "https://www.fsidigital.ca/blog/ontario-government-business-grants",
    "https://www.fsidigital.ca/blog/ontario-innovation-grants",
    "https://www.fsidigital.ca/blog/prairie-provinces-innovation-grants",
    "https://www.fsidigital.ca/blog/quebec-government-business-grants",
    "https://www.fsidigital.ca/blog/quebec-innovation-grants",
    "https://www.fsidigital.ca/blog/regional-development-agencies-government-grants",
    "https://www.fsidigital.ca/blog/state-province-grants",
    "https://www.fsidigital.ca/blog/usa-federal-grants",
    "https://www.fsidigital.ca/blog/usda-rural-grants-2026",
    "https://www.fsidigital.ca/blog/washington-tech-programs",
    "https://www.fsidigital.ca/blog/amber-grant-women-canada",
    "https://www.fsidigital.ca/blog/atlantic-canada-innovation-grants",
    "https://www.fsidigital.ca/blog/canada-advanced-manufacturing-innovation-grants",
    "https://www.fsidigital.ca/blog/canada-aerospace-defence-innovation-grants",
    "https://www.fsidigital.ca/blog/canada-agri-food-technology-innovation-grants",
    "https://www.fsidigital.ca/blog/canada-agriculture-agrifood-grants-guide",
    "https://www.fsidigital.ca/blog/canada-clean-technology-environment-grants-guide",
    "https://www.fsidigital.ca/blog/canada-clean-technology-innovation-grants",
    "https://www.fsidigital.ca/blog/canada-digital-ai-innovation-grants",
    "https://www.fsidigital.ca/blog/canada-employment-workforce-training-grants-guide",
    "https://www.fsidigital.ca/blog/canada-export-development-grants-guide",
    "https://www.fsidigital.ca/blog/canada-federal-grants",
    "https://www.fsidigital.ca/blog/canada-growth-expansion-grants-guide",
    "https://www.fsidigital.ca/blog/canada-hiring-training-grants-guide",
    "https://www.fsidigital.ca/blog/canada-housing-community-grants-2026",
    "https://www.fsidigital.ca/blog/canada-industry-specific-grants-guide",
    "https://www.fsidigital.ca/blog/canada-innovation-research-development-grants-guide",
    "https://www.fsidigital.ca/blog/canada-life-sciences-innovation-grants",
    "https://www.fsidigital.ca/blog/canada-manufacturing-industry-grants-guide",
    "https://www.fsidigital.ca/blog/canada-regional-economic-development-grants-guide",
    "https://www.fsidigital.ca/blog/canada-startup-funding-grants-guide",
    "https://www.fsidigital.ca/blog/canada-technology-adoption-grants-guide",
    "https://www.fsidigital.ca/blog/cartier-womens-initiative-canada",
    "https://www.fsidigital.ca/blog/commercialization-scale-up-funding-canada",
    "https://www.fsidigital.ca/blog/csbfp-canada-small-business-financing-program-government-grants",
    "https://www.fsidigital.ca/blog/demonstration-pilot-funding-canada",
    "https://www.fsidigital.ca/blog/development-proof-concept-funding-canada",
    "https://www.fsidigital.ca/blog/ideation-research-funding-canada",
    "https://www.fsidigital.ca/blog/indigenous-rural-business-funding-canada",
    "https://www.fsidigital.ca/blog/innovation-superclusters-2026",
    "https://www.fsidigital.ca/blog/nserc-research-grants-canada",
    "https://www.fsidigital.ca/blog/strategic-innovation-fund-canada-guide",
    "https://www.fsidigital.ca/blog/women-clean-technology-grants-canada",
    "https://www.fsidigital.ca/blog/women-entrepreneurship-strategy-canada-government-grants",
    "https://www.fsidigital.ca/blog/women-entrepreneurship-strategy-canada",
    "https://www.fsidigital.ca/blog/women-export-trade-grants-canada",
    "https://www.fsidigital.ca/blog/women-manufacturing-grants-canada",
    "https://www.fsidigital.ca/blog/women-social-enterprise-grants-canada",
    "https://www.fsidigital.ca/blog/women-technology-grants-canada",
    "https://www.fsidigital.ca/blog/alberta-women-business-grants",
    "https://www.fsidigital.ca/blog/bc-women-business-grants",
    "https://www.fsidigital.ca/blog/bdc-women-entrepreneurs-financing",
    "https://www.fsidigital.ca/blog/edc-women-trade-export-financing",
    "https://www.fsidigital.ca/blog/federal-grants-women-minorities",
    "https://www.fsidigital.ca/blog/ontario-women-business-grants",
    "https://www.fsidigital.ca/blog/quebec-women-business-grants",
    "https://www.fsidigital.ca/blog/rural-business-development-2026",
    "https://www.fsidigital.ca/blog/wbdc-equity-match-grant-women",
    "https://www.fsidigital.ca/blog/2026-grant-forecast",
    "https://www.fsidigital.ca/blog/october-2026-last-chance",
    "https://www.fsidigital.ca/blog/q4-2026-deadlines",
    "https://www.fsidigital.ca/blog/10-easy-to-win-local-grants-canadian-retail-stores",
    "https://www.fsidigital.ca/blog/7-startup-accelerators-california-free-money",
    "https://www.fsidigital.ca/blog/5-best-government-loans-agriculture-tech-startups",
    "https://www.fsidigital.ca/blog/doe-clean-tech-2026",
    "https://www.fsidigital.ca/blog/alberta-business-grants-2026",
    "https://www.fsidigital.ca/blog/atlantic-business-grants-2026",
    "https://www.fsidigital.ca/blog/bc-business-grants-2026",
    "https://www.fsidigital.ca/blog/manitoba-business-grants-2026",
    "https://www.fsidigital.ca/blog/northern-canada-business-grants-2026",
    "https://www.fsidigital.ca/blog/quebec-business-grants-2026",
    "https://www.fsidigital.ca/blog/saskatchewan-business-grants-2026",
    "https://www.fsidigital.ca/blog/2026-grant-preview-early-bird",
    "https://www.fsidigital.ca/blog/q1-2026-grant-deadlines",
    "https://www.fsidigital.ca/blog/green-business-funding",
    "https://www.fsidigital.ca/blog/apply-usa-grants-2026",
    "https://www.fsidigital.ca/blog/atlantic-small-business-grants-guide",
    "https://www.fsidigital.ca/blog/grant-writing-secrets-2026",
    "https://www.fsidigital.ca/blog/sba-disaster-relief-loans-guide",
    "https://www.fsidigital.ca/blog/sba-loans-grants-guide",
    "https://www.fsidigital.ca/blog/sbir-small-business-guide",
    "https://www.fsidigital.ca/blog/sbir-sttr-complete-guide",
    "https://www.fsidigital.ca/blog/small-business-grants-complete-guide"
];

// Submits a single URL
async function submitUrl(url) {
    try {
        await indexing.urlNotifications.publish({
            requestBody: {
                url: url,
                type: 'URL_UPDATED'
            }
        });
        console.log(`✅ Success: ${url}`);
        return true;
    } catch (e) {
        if (e.response && e.response.status === 429) {
            console.error(`\n⚠️ QUOTA EXCEEDED (429) at URL: ${url}`);
            return false;
        } else {
            console.error(`❌ Error (${e.response ? e.response.status : e.message}): ${url}`);
            if (e.response && e.response.data) {
                 console.error(JSON.stringify(e.response.data));
            }
            return true;
        }
    }
}

// Batch submission
async function run() {
    console.log(`\n========================================`);
    console.log(`🚀 INSTANT RE-INDEXATION STARTING...`);
    console.log(`========================================\n`);
    console.log(`Attempting to push ${TARGET_URLS.length} high-intent URLs directly to Google Indexing API.\n`);

    let successCount = 0;
    
    for (const url of TARGET_URLS) {
        const shouldContinue = await submitUrl(url);
        if (!shouldContinue) {
             console.log('\n🛑 Force stopping batch due to Google API daily quota exhaustion.');
             break;
        }
        successCount++;
        // Small delay to prevent rate limits
        await new Promise(r => setTimeout(r, 600)); 
    }

    console.log(`\n========================================`);
    console.log(`📊 RE-INDEXATION COMPLETE`);
    console.log(`Successfully indexed: ${successCount} / ${TARGET_URLS.length}`);
    console.log(`========================================\n`);
}

run();
