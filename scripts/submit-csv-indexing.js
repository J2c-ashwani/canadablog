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
