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
const REINDEX_TRACKER_PATH = path.join(__dirname, 'reindex-tracker.json');

// ── QUOTA ALLOCATION ───────────────────────────────────────
// Google allows 200 requests/day. We split the quota:
// Today: 40 already used → 160 remaining → 10 new + 150 re-index
const QUOTA_NEW_DRIP = 10;      // Slots reserved for brand-new pSEO drip pages
const QUOTA_REINDEX  = 150;     // Slots for re-indexing existing pages (CTR updates)
// ───────────────────────────────────────────────────────────

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
 * Format: { "url": "2026-03-12T12:00:00Z" }
 */
function loadHistory() {
    if (fs.existsSync(HISTORY_PATH)) {
        try {
            return JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf8'));
        } catch (e) {
            console.error('Failed to parse history JSON. Starting fresh.');
        }
    }
    return {};
}

/**
 * Loads re-index tracker (URLs that have been re-submitted for CTR updates)
 * Format: { "url": "2026-04-01T00:00:00Z" }
 */
function loadReindexTracker() {
    if (fs.existsSync(REINDEX_TRACKER_PATH)) {
        try {
            return JSON.parse(fs.readFileSync(REINDEX_TRACKER_PATH, 'utf8'));
        } catch (e) {
            console.error('Failed to parse reindex tracker. Starting fresh.');
        }
    }
    return {};
}

function saveHistory(history) {
    fs.writeFileSync(HISTORY_PATH, JSON.stringify(history, null, 2));
}

function saveReindexTracker(tracker) {
    fs.writeFileSync(REINDEX_TRACKER_PATH, JSON.stringify(tracker, null, 2));
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
        return 'SUCCESS';
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.error(`   ❌ Permission Denied for ${url}`);
        } else if (error.response && error.response.status === 429) {
            console.error(`   ⚠️ RATE LIMIT EXCEEDED. Stopping.`);
            return 'RATELIMIT';
        } else {
            console.error(`   ❌ Failed: ${url} - ${error.message}`);
        }
        return 'ERROR';
    }
}

/**
 * Main execution function — Dual Priority Queue
 */
async function run() {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('  🚀 DUAL-PRIORITY Google Indexing API Submitter');
    console.log('  📌 Priority 1: New pSEO Drip Pages (20 slots)');
    console.log('  📌 Priority 2: Re-index Existing Pages for CTR (170 slots)');
    console.log('═══════════════════════════════════════════════════════════════\n');

    // ── Step 1: Gather all known URLs ──────────────────────────
    let allUrls = [];
    try {
        console.log(`📡 Fetching URLs from live sitemap: ${SITEMAP_URL}`);
        allUrls = await fetchSitemapUrls(SITEMAP_URL);
        console.log(`   Found ${allUrls.length} total URLs in sitemap.`);
    } catch (e) {
        console.error(`Failed to fetch sitemap: ${e.message}`);
        process.exit(1);
    }

    // Merge local pSEO drip pages (may not be in live sitemap yet)
    let localPseoUrls = [];
    try {
        console.log(`\n📂 Fetching local pSEO drip pages...`);
        const { execSync } = require('child_process');
        const output = execSync('npx tsx scripts/get-pseo-urls.ts', { encoding: 'utf8' });
        localPseoUrls = JSON.parse(output.trim());
        console.log(`   Found ${localPseoUrls.length} published pSEO pages locally.`);
        const originalCount = allUrls.length;
        allUrls = [...new Set([...allUrls, ...localPseoUrls])];
        console.log(`   Added ${allUrls.length - originalCount} un-cached drip pages.\n`);
    } catch (e) {
        console.warn(`   ⚠️ Could not fetch local pSEO URLs: ${e.message}\n`);
    }

    const history = loadHistory();
    const reindexTracker = loadReindexTracker();
    const now = new Date();

    // URLs submitted in the last 7 days (don't re-submit these as "new")
    const recentlySubmitted = new Set(
        Object.entries(history)
            .filter(([_, dateStr]) => {
                const daysDiff = (now.getTime() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24);
                return daysDiff < 7;
            })
            .map(([url]) => url)
    );

    // ── Step 2: PRIORITY 1 — New Drip Pages ───────────────────
    console.log('─── PRIORITY 1: New pSEO Drip Pages ─────────────────────────');
    const newDripPages = allUrls.filter(u => !recentlySubmitted.has(u));
    console.log(`   ${newDripPages.length} URLs have NOT been submitted in the last 7 days.`);

    const dripBatch = newDripPages.slice(0, QUOTA_NEW_DRIP);
    console.log(`   Submitting ${dripBatch.length} new pages (max ${QUOTA_NEW_DRIP} slots)...\n`);

    let dripSuccess = 0;
    let hitRateLimit = false;

    for (let i = 0; i < dripBatch.length; i++) {
        const url = dripBatch[i];
        console.log(`   [NEW ${i + 1}/${dripBatch.length}] ${url}`);
        const result = await submitUrl(url);
        if (result === 'SUCCESS') {
            dripSuccess++;
            history[url] = now.toISOString();
            saveHistory(history);
        } else if (result === 'RATELIMIT') {
            hitRateLimit = true;
            break;
        }
        await new Promise(r => setTimeout(r, 600));
    }

    console.log(`\n   ✅ New drip pages submitted: ${dripSuccess}/${dripBatch.length}\n`);

    if (hitRateLimit) {
        console.log('🛑 Rate limit hit during Priority 1. Stopping early.');
        return;
    }

    // ── Step 3: PRIORITY 2 — Re-index Existing Pages ──────────
    console.log('─── PRIORITY 2: Re-index Existing Pages (CTR Updates) ───────');

    // These are pages that HAVE been submitted before (exist in history)
    // but have NOT been re-indexed yet (not in reindexTracker)
    const alreadyReindexed = new Set(Object.keys(reindexTracker));
    const existingPages = allUrls.filter(u =>
        history[u] &&                    // Previously submitted
        !alreadyReindexed.has(u)         // Not yet re-indexed for CTR updates
    );

    console.log(`   ${existingPages.length} existing pages still need re-indexing.`);

    // Prioritize key page types first (state > city > Canada > blog > others)
    const prioritized = existingPages.sort((a, b) => {
        const priority = (url) => {
            if (url.includes('/usa/') && !url.includes('/grants/')) return 1;  // USA state/city
            if (url.includes('/canada/')) return 2;                             // Canada pages
            if (url.includes('/blog/')) return 3;                               // Blog posts
            if (url.includes('/grants/')) return 4;                             // pSEO grants
            return 5;                                                           // Other pages
        };
        return priority(a) - priority(b);
    });

    const reindexBatch = prioritized.slice(0, QUOTA_REINDEX);
    console.log(`   Submitting ${reindexBatch.length} pages for re-indexing (max ${QUOTA_REINDEX} slots)...\n`);

    let reindexSuccess = 0;

    for (let i = 0; i < reindexBatch.length; i++) {
        const url = reindexBatch[i];
        console.log(`   [REINDEX ${i + 1}/${reindexBatch.length}] ${url}`);
        const result = await submitUrl(url, 'URL_UPDATED');
        if (result === 'SUCCESS') {
            reindexSuccess++;
            reindexTracker[url] = now.toISOString();
            // Also update the main history so these don't get picked up by Priority 1
            history[url] = now.toISOString();
            saveReindexTracker(reindexTracker);
            saveHistory(history);
        } else if (result === 'RATELIMIT') {
            console.log('\n   🛑 Rate limit hit during Priority 2. Will resume tomorrow.');
            break;
        }
        await new Promise(r => setTimeout(r, 600));
    }

    // ── Summary ────────────────────────────────────────────────
    const remainingReindex = existingPages.length - reindexSuccess;
    const daysToComplete = Math.ceil(remainingReindex / QUOTA_REINDEX);

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('  📊 SESSION SUMMARY');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`  🆕 New drip pages submitted:     ${dripSuccess}`);
    console.log(`  🔄 Existing pages re-indexed:    ${reindexSuccess}`);
    console.log(`  📋 Remaining to re-index:        ${remainingReindex}`);
    console.log(`  ⏳ Estimated days to finish:     ${daysToComplete}`);
    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log('Run this script daily to continue the re-indexing cycle!');
}

run().catch(console.error);
