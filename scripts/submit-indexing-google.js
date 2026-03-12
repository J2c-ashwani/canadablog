const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const https = require('https');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Configuration
const SITEMAP_URL = 'https://www.fsidigital.ca/sitemap.xml'; // Live sitemap
const CREDENTIALS_PATH = path.join(__dirname, '../google-credentials.json');
const HISTORY_PATH = path.join(__dirname, 'indexing-history.json');

// Check if credentials exist
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

/**
 * Loads history of previously submitted URLs
 */
function loadHistory() {
    if (fs.existsSync(HISTORY_PATH)) {
        try {
            return JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf8'));
        } catch (e) {
            console.error('Failed to parse history JSON. Starting fresh.');
        }
    }
    return {}; // Format: { "url": "2026-03-12T12:00:00Z" }
}

/**
 * Saves history to disk
 */
function saveHistory(history) {
    fs.writeFileSync(HISTORY_PATH, JSON.stringify(history, null, 2));
}

/**
 * Fetches the sitemap from the live URL and extracts all URLs.
 */
async function fetchSitemapUrls(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to fetch sitemap. Status code: ${res.statusCode}`));
                return;
            }
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const regex = /<loc>(.*?)<\/loc>/g;
                let match;
                const urls = [];
                while ((match = regex.exec(data)) !== null) {
                    let cleanUrl = match[1].trim();
                    if (cleanUrl.includes('canadablog.vercel.app') && process.env.NEXT_PUBLIC_BASE_URL) {
                        cleanUrl = cleanUrl.replace('https://canadablog.vercel.app', process.env.NEXT_PUBLIC_BASE_URL);
                    }
                    urls.push(cleanUrl);
                }
                resolve(urls);
            });
        }).on('error', reject);
    });
}

/**
 * Submits a single URL to the Indexing API
 */
async function submitUrl(url, type = 'URL_UPDATED') {
    try {
        await indexing.urlNotifications.publish({
            requestBody: { url: url, type: type }
        });
        console.log(`✅ Success: ${url}`);
        return 'SUCCESS';
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.error(`❌ Permission Denied for ${url}`);
        } else if (error.response && error.response.status === 429) {
            console.error(`⚠️ RATE LIMIT EXCEEDED. Stopping.`);
            return 'RATELIMIT';
        } else {
            console.error(`❌ Failed: ${url} - ${error.message}`);
        }
        return 'ERROR';
    }
}

/**
 * Main execution function
 */
async function run() {
    console.log('🚀 Starting Smart Google Indexing API Submitter...\n');

    let allUrls = [];
    try {
        console.log(`Fetching URLs from live sitemap: ${SITEMAP_URL}`);
        allUrls = await fetchSitemapUrls(SITEMAP_URL);
        console.log(`Found ${allUrls.length} total URLs in sitemap.`);
    } catch (e) {
        console.error(`Failed to fetch sitemap: ${e.message}`);
        process.exit(1);
    }

    const history = loadHistory();
    const now = new Date();
    
    // Filter out URLs that were successfully submitted in the last 7 days
    const recentSubmissions = Object.entries(history)
        .filter(([_, dateStr]) => {
            const timeDiffMs = now.getTime() - new Date(dateStr).getTime();
            const daysDiff = timeDiffMs / (1000 * 60 * 60 * 24);
            return daysDiff < 7;
        })
        .map(([url]) => url);
    
    console.log(`Found ${recentSubmissions.length} URLs already submitted in the last 7 days.`);

    // Find URLs that need submission
    let pendingUrls = allUrls.filter(u => !recentSubmissions.includes(u));
    console.log(`Remaining unindexed/stale URLs to process: ${pendingUrls.length}\n`);

    if (pendingUrls.length === 0) {
        console.log('🎉 All URLs have been submitted recently! Nothing to do.');
        return;
    }

    // Google limit is 200 per day. We'll do 190 to be safe.
    const quotaLimit = 190;
    const batchToSubmit = pendingUrls.slice(0, quotaLimit);
    
    console.log(`Submitting batch of ${batchToSubmit.length} URLs... (This takes a moment)`);

    let successCount = 0;
    
    for (let i = 0; i < batchToSubmit.length; i++) {
        const url = batchToSubmit[i];
        console.log(`[${i + 1}/${batchToSubmit.length}] Submitting: ${url}`);

        const result = await submitUrl(url);
        
        if (result === 'SUCCESS') {
            successCount++;
            history[url] = now.toISOString();
            // Save history incrementally so we don't lose it if it crashes
            saveHistory(history);
        } else if (result === 'RATELIMIT') {
            console.log('\n🛑 Stopped early due to API Rate Limits (Google 200/day quota).');
            break;
        }

        // Sleep briefly to avoid 429s (2 requests per second max)
        await new Promise(r => setTimeout(r, 600));
    }

    console.log(`\n🎉 Session Complete! Successfully submitted ${successCount} URLs today.`);
    console.log(`Run this script again tomorrow to submit the next batch!`);
}

run().catch(console.error);
