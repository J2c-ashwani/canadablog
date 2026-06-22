const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const CREDENTIALS_PATH = path.join(__dirname, '../google-credentials.json');
const CSV_PATH = path.join(__dirname, '../fsidigital.ca-Coverage-Drilldown-2026-06-16/Table.csv');
const HISTORY_PATH = path.join(__dirname, 'indexing-history.json');

if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error('❌ ERROR: Google Credentials File Missing!');
    process.exit(1);
}

const credentials = require(CREDENTIALS_PATH);
const auth = google.auth.fromJSON(credentials);
auth.scopes = ['https://www.googleapis.com/auth/indexing'];

const indexing = google.indexing({ version: 'v3', auth });

async function loadHistory() {
    if (fs.existsSync(HISTORY_PATH)) {
        return JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf8'));
    }
    return {};
}

function saveHistory(history) {
    fs.writeFileSync(HISTORY_PATH, JSON.stringify(history, null, 2));
}

async function submitUrl(url) {
    try {
        const response = await indexing.urlNotifications.publish({
            requestBody: {
                url: url,
                type: 'URL_UPDATED'
            }
        });
        console.log(`✅ Submitted: ${url}`);
        return true;
    } catch (error) {
        if (error.code === 429) {
            console.error('❌ Quota Exceeded. Stopping.');
            return 'QUOTA';
        }
        console.error(`❌ Failed: ${url} - ${error.message}`);
        return false;
    }
}

async function run() {
    console.log('Starting Google Indexing API Submission from CSV...');
    
    // Read CSV
    const csvContent = fs.readFileSync(CSV_PATH, 'utf8');
    const lines = csvContent.split('\n');
    
    // Extract URLs (skip header and empty lines)
    const allUrls = lines
        .slice(1)
        .map(line => line.split(',')[0].trim())
        .filter(url => url && url.startsWith('http'));

    console.log(`Found ${allUrls.length} URLs in CSV.`);

    // High-priority new pages built after the June 16th CSV export
    const newPages = [
        // Core pages
        "https://www.fsidigital.ca/quarterly-report",
        "https://www.fsidigital.ca/methodology",
        "https://www.fsidigital.ca/about-founder",
        "https://www.fsidigital.ca/case-studies",
        "https://www.fsidigital.ca/testimonials",
        "https://www.fsidigital.ca/customer-success",

        // 21 commercial topic pages
        "https://www.fsidigital.ca/topics/sred-tax-credit-eligibility",
        "https://www.fsidigital.ca/topics/irap-funding-eligibility",
        "https://www.fsidigital.ca/topics/ontario-small-business-grants",
        "https://www.fsidigital.ca/topics/startup-grants-canada",
        "https://www.fsidigital.ca/topics/government-loans-small-business-canada",
        "https://www.fsidigital.ca/topics/how-to-apply-government-grants-canada",
        "https://www.fsidigital.ca/topics/federal-grants-small-business-canada",
        "https://www.fsidigital.ca/topics/canada-digital-adoption-program-grant",
        "https://www.fsidigital.ca/topics/women-entrepreneur-grants-canada",
        "https://www.fsidigital.ca/topics/hiring-wage-subsidies-canada",
        "https://www.fsidigital.ca/topics/export-grants-canada",
        "https://www.fsidigital.ca/topics/clean-tech-grants-canada",
        "https://www.fsidigital.ca/topics/bdc-small-business-loans",
        "https://www.fsidigital.ca/topics/csbfp-loans-canada",
        "https://www.fsidigital.ca/topics/futurpreneur-startup-funding",
        "https://www.fsidigital.ca/topics/minority-business-grants-canada",
        "https://www.fsidigital.ca/topics/canada-summer-jobs-wage-subsidy",
        "https://www.fsidigital.ca/topics/alberta-innovates-grant",
        "https://www.fsidigital.ca/topics/bc-tech-grant",
        "https://www.fsidigital.ca/topics/government-grants-for-manufacturing-canada",
        "https://www.fsidigital.ca/topics/quebec-small-business-grants",

        // 16 Partner landing pages
        "https://www.fsidigital.ca/partners/business-loan-leads",
        "https://www.fsidigital.ca/partners/government-grant-leads",
        "https://www.fsidigital.ca/partners/startup-funding-leads",
        "https://www.fsidigital.ca/partners/tax-credit-leads",
        "https://www.fsidigital.ca/partners/sred-leads",
        "https://www.fsidigital.ca/partners/canada-funding-leads",
        "https://www.fsidigital.ca/partners/usa-funding-leads",
        "https://www.fsidigital.ca/partners/merchant-cash-advance-leads",
        "https://www.fsidigital.ca/partners/equipment-financing-leads",
        "https://www.fsidigital.ca/partners/working-capital-leads",
        "https://www.fsidigital.ca/partners/commercial-real-estate-leads",
        "https://www.fsidigital.ca/partners/sbir-grant-leads",
        "https://www.fsidigital.ca/partners/usda-grant-leads",
        "https://www.fsidigital.ca/partners/clean-energy-grant-leads",
        "https://www.fsidigital.ca/partners/women-owned-business-leads",
        "https://www.fsidigital.ca/partners/nonprofit-grant-leads"
    ];

    newPages.forEach(url => {
        if (!allUrls.includes(url)) {
            allUrls.unshift(url); // Inject at the front so they are submitted first
        }
    });

    console.log(`Updated queue with newly built pages. Total URLs to evaluate: ${allUrls.length}`);

    let history = await loadHistory();
    const urlsToSubmit = allUrls.filter(url => {
        // Skip if submitted within the last 7 days
        if (history[url]) {
            const submittedAt = new Date(history[url]);
            const daysSince = (new Date() - submittedAt) / (1000 * 60 * 60 * 24);
            if (daysSince < 7) return false;
        }
        return true;
    });

    console.log(`${urlsToSubmit.length} URLs are eligible for submission (not submitted in last 7 days).`);

    let submittedCount = 0;
    const MAX_QUOTA = 190;

    for (const url of urlsToSubmit) {
        if (submittedCount >= MAX_QUOTA) {
            console.log(`\n⚠️ Reached daily safety limit of ${MAX_QUOTA}. Run again tomorrow.`);
            break;
        }

        const result = await submitUrl(url);
        if (result === 'QUOTA') {
            break;
        }

        if (result === true) {
            history[url] = new Date().toISOString();
            submittedCount++;
        }

        // Small delay to prevent rate limit spikes
        await new Promise(r => setTimeout(r, 500));
    }

    saveHistory(history);
    console.log(`\nDone! Successfully submitted ${submittedCount} URLs to Google.`);
}

run();
