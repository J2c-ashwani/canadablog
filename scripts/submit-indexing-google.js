const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const https = require('https');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Configuration
const SITEMAP_URL = 'https://canadablog.vercel.app/sitemap.xml'; // Fallback to live sitemap
const CREDENTIALS_PATH = path.join(__dirname, '../google-credentials.json');

// Check if credentials exist
if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error('\n❌ ERROR: Google Credentials File Missing!\n');
    console.error('To use the Automated Indexing API, you must:');
    console.error('1. Go to Google Cloud Console (console.cloud.google.com)');
    console.error('2. Create a Project and Enable the "Web Search Indexing API"');
    console.error('3. Create a Service Account and download the JSON key');
    console.error('4. Rename the downloaded file to "google-credentials.json" and place it in the root folder of this project.');
    console.error('5. Go to Google Search Console (search.google.com/search-console)');
    console.error('6. Add the Service Account email (e.g., something@your-project.iam.gserviceaccount.com) as an "Owner" of your domain property.');
    console.error('\nDocumentation: https://developers.google.com/search/apis/indexing-api/v3/prereqs\n');
    process.exit(1);
}

// Authenticate with Google
const credentials = require(CREDENTIALS_PATH);
const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/indexing'],
    null
);

const indexing = google.indexing({
    version: 'v3',
    auth: auth
});

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

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                // Simple regex to extract URLs from <loc> tags
                const regex = /<loc>(.*?)<\/loc>/g;
                let match;
                const urls = [];

                while ((match = regex.exec(data)) !== null) {
                    // Use the exact production domain 
                    let cleanUrl = match[1].trim();

                    // Replace Vercel URL with primary domain if necessary
                    // Note to user: If your main domain is fsidigital.ca in Search Console,
                    // we need to ensure the URLs match exactly what is verified in Search Console.
                    if (cleanUrl.includes('canadablog.vercel.app') && process.env.NEXT_PUBLIC_BASE_URL) {
                        cleanUrl = cleanUrl.replace('https://canadablog.vercel.app', process.env.NEXT_PUBLIC_BASE_URL);
                    }

                    urls.push(cleanUrl);
                }

                resolve(urls);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

/**
 * Submits a single URL to the Indexing API
 */
async function submitUrl(url, type = 'URL_UPDATED') {
    try {
        const response = await indexing.urlNotifications.publish({
            requestBody: {
                url: url,
                type: type // 'URL_UPDATED' or 'URL_DELETED'
            }
        });

        console.log(`✅ Success: ${url}`);
        return true;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.error(`❌ Permission Denied for ${url}`);
            console.error(`   Make sure ${credentials.client_email} is added as an OWNER in Google Search Console for this domain.`);
        } else if (error.response && error.response.status === 429) {
            console.error(`⚠️ Rate Limit Exceeded: Quota reached for the Google Indexing API.`);
            return false; // Stop further processing
        } else {
            console.error(`❌ Failed: ${url} - ${error.message}`);
        }
        return true; // Continue processing other URLs despite error
    }
}

/**
 * Main execution function
 */
async function run() {
    console.log('🚀 Starting Google Indexing API Submitter...\n');

    // Decide which URLs to submit
    let urlsToSubmit = [];

    // If arguments provided, use those
    const args = process.argv.slice(2);
    if (args.length > 0) {
        console.log(`Found ${args.length} direct URLs provided as arguments.`);
        urlsToSubmit = args;
    } else {
        // Default: Fetch from sitemap
        console.log(`Fetching URLs from sitemap: ${SITEMAP_URL}`);
        try {
            urlsToSubmit = await fetchSitemapUrls(SITEMAP_URL);
            console.log(`Found ${urlsToSubmit.length} URLs in sitemap.`);
        } catch (e) {
            console.error(`Failed to fetch sitemap: ${e.message}`);
            process.exit(1);
        }
    }

    // Google allows up to 200 requests per day per project for the Indexing API.
    // We should limit the batch size or the user will hit the quota immediately.
    const quotaLimit = 190; // Leave buffer
    if (urlsToSubmit.length > quotaLimit) {
        console.log(`\n⚠️ Warning: You are trying to submit ${urlsToSubmit.length} URLs, but the daily Google API quota is usually 200 URLs.`);
        console.log(`Trimming list to ${quotaLimit} URLs to avoid quota errors...`);

        // Sort logic to prioritize non-indexed or newly added URLs if possible.
        // For now we will just take the latest/first.
        // Usually, blog pages are near the end of the sitemap or generated in order.
        // If you want to prioritize blog posts, filter here:
        const blogUrls = urlsToSubmit.filter(u => u.includes('/blog/'));
        const guideUrls = urlsToSubmit.filter(u => u.includes('/guides/'));
        const stateUrls = urlsToSubmit.filter(u => u.includes('/usa/'));

        // Create a prioritized list
        const prioritized = [...blogUrls, ...guideUrls, ...stateUrls, ...urlsToSubmit];
        // Remove duplicates
        const uniquePrioritized = [...new Set(prioritized)];

        urlsToSubmit = uniquePrioritized.slice(0, quotaLimit);
        console.log(`Prepared ${urlsToSubmit.length} highest-priority URLs for submission.\n`);
    }

    console.log('Starting submissions... (This takes a moment)');

    let successCount = 0;

    // Submit sequentially to avoid hammering the API
    for (let i = 0; i < urlsToSubmit.length; i++) {
        const url = urlsToSubmit[i];
        console.log(`[${i + 1}/${urlsToSubmit.length}] Submitting: ${url}`);

        const shouldContinue = await submitUrl(url);
        if (shouldContinue) {
            successCount++;
        } else {
            console.log('Quitting early due to API limits.');
            break;
        }

        // Sleep briefly between requests to be nice to the API
        await new Promise(r => setTimeout(r, 500));
    }

    console.log(`\n🎉 Done! Attempted to submit ${urlsToSubmit.length} URLs.`);
}

run().catch(console.error);
