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

// The custom list of URLs provided by the user
const TARGET_URLS = [
    "https://www.fsidigital.ca/blog/rbc-women-entrepreneur-awards",
    "https://www.fsidigital.ca/blog/sba-7a-loans-vs-state-grants-comparison",
    "https://www.fsidigital.ca/blog/sred-tax-credits-vs-cdap-canadian-founders",
    "https://www.fsidigital.ca/blog/state-women-business-programs-guide",
    "https://www.fsidigital.ca/blog/top-10-no-equity-grants-black-female-entrepreneurs",
    "https://www.fsidigital.ca/blog/usda-reap-grant-vs-utility-rebates",
    "https://www.fsidigital.ca/blog/women-business-centers-guide",
    "https://www.fsidigital.ca/blog/women-entrepreneurship-fund-canada",
    "https://www.fsidigital.ca/blog/wosb-federal-contracting-guide",
    "https://www.fsidigital.ca/grants/on/barrie/arts-entertainment",
    "https://www.fsidigital.ca/grants/on/barrie/non-profits",
    "https://www.fsidigital.ca/grants/on/barrie/restaurants-hospitality",
    "https://www.fsidigital.ca/grants/on/brampton/arts-entertainment",
    "https://www.fsidigital.ca/grants/on/burlington/manufacturing",
    "https://www.fsidigital.ca/grants/on/greater-sudbury/arts-entertainment",
    "https://www.fsidigital.ca/grants/on/greater-sudbury/clean-energy",
    "https://www.fsidigital.ca/grants/on/greater-sudbury/minority-owned",
    "https://www.fsidigital.ca/grants/on/greater-sudbury/women-entrepreneurs",
    "https://www.fsidigital.ca/grants/on/hamilton/education",
    "https://www.fsidigital.ca/grants/on/hamilton/retail",
    "https://www.fsidigital.ca/grants/on/hamilton/women-entrepreneurs",
    "https://www.fsidigital.ca/grants/on/kitchener/veterans",
    "https://www.fsidigital.ca/grants/on/markham/veterans",
    "https://www.fsidigital.ca/grants/on/mississauga/arts-entertainment",
    "https://www.fsidigital.ca/grants/on/mississauga/clean-energy",
    "https://www.fsidigital.ca/grants/on/mississauga/veterans",
    "https://www.fsidigital.ca/grants/on/toronto/retail",
    "https://www.fsidigital.ca/grants/on/vaughan/non-profits",
    "https://www.fsidigital.ca/guides/apply-doe-clean-energy-grants",
    "https://www.fsidigital.ca/guides/apply-indigenous-rural-business-funding",
    "https://www.fsidigital.ca/guides/apply-irap-government-grants",
    "https://www.fsidigital.ca/guides/apply-regional-development-agencies",
    "https://www.fsidigital.ca/guides/apply-sba-loans",
    "https://www.fsidigital.ca/guides/apply-sbir-grants",
    "https://www.fsidigital.ca/guides/apply-women-entrepreneurship-strategy",
    "https://www.fsidigital.ca/guides/bdc-women-entrepreneurs-financing-guide",
    "https://www.fsidigital.ca/guides/canada-digital-ai-funding-guide",
    "https://www.fsidigital.ca/guides/canada-manufacturing-funding-guide",
    "https://www.fsidigital.ca/guides/edc-women-trade-export-financing-guide",
    "https://www.fsidigital.ca/guides/sred-application-guide",
    "https://www.fsidigital.ca/usa/iowa/cedar-rapids",
    "https://www.fsidigital.ca/usa/michigan",
    "https://www.fsidigital.ca/usa/montana",
    "https://www.fsidigital.ca/usa/texas",
    "https://www.fsidigital.ca/new-york-business-grants-consultation",
    "https://www.fsidigital.ca/canada/business-grants",
    "https://www.fsidigital.ca/healthcare-grants-consultation",
    "https://www.fsidigital.ca/illinois-business-grants-consultation",
    "https://www.fsidigital.ca/grants/on",
    "https://www.fsidigital.ca/grant-application-review",
    "https://www.fsidigital.ca/usa/maryland/rockville-/-bethesda",
    "https://www.fsidigital.ca/cdbg-community-consultation",
    "https://www.fsidigital.ca/canada/life-sciences-funding-guide",
    "https://www.fsidigital.ca/grants/technology-grants",
    "https://www.fsidigital.ca/rural-grant-consultation",
    "https://www.fsidigital.ca/portfolio",
    "https://www.fsidigital.ca/grant-finder?program=irap",
    "https://www.fsidigital.ca/grant-finder?program=youth&age=18-35",
    "https://www.fsidigital.ca/grant-finder?program=csbfp",
    "https://www.fsidigital.ca/blog?category=USA+News",
    "https://www.fsidigital.ca/grant-finder?program=rda",
    "https://www.fsidigital.ca/grant-finder?category=employment-training",
    "https://www.fsidigital.ca/grant-finder?category=clean-technology",
    "https://www.fsidigital.ca/grant-finder?program=wes",
    "https://www.fsidigital.ca/grant-finder?category=regional-development",
    "https://www.fsidigital.ca/grant-finder?program=wes&gender=female",
    "https://www.fsidigital.ca/grant-finder?program=agriculture",
    "https://www.fsidigital.ca/grant-finder?category=agriculture-agrifood",
    "https://www.fsidigital.ca/blog?page=14",
    "https://www.fsidigital.ca/blog/industry-specific-business-grants-guide",
    "https://www.fsidigital.ca/blog/colorado-tech-programs",
    "https://www.fsidigital.ca/get-started"
];

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
    console.log(`🚀 SCRIPT STARTING...`);
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
