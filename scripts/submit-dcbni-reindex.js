const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const CREDENTIALS_PATH = path.join(__dirname, '../google-credentials.json');
const TABLE_CSV_PATH = path.join(__dirname, '../dcbni/Table.csv');
const LOG_PATH = path.join(__dirname, '../dcbni/submission-log.json');

if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error('\n❌ ERROR: Google Credentials File Missing!\n');
    process.exit(1);
}

if (!fs.existsSync(TABLE_CSV_PATH)) {
    console.error('\n❌ ERROR: GSC Table.csv Missing under /dcbni!\n');
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

// Helper to parse CSV lines
function parseCsvLine(line) {
  const values = [];
  let value = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && next === '"') {
      value += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      values.push(value);
      value = '';
      continue;
    }

    value += char;
  }

  values.push(value);
  return values;
}

function readCsvUrls(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/^\uFEFF/, ''); // Strip BOM

  const lines = content.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map((header) => header.trim());
  const urlIndex = headers.indexOf('URL');
  if (urlIndex === -1) {
    console.error('❌ Table.csv missing URL header.');
    return [];
  }

  return lines.slice(1)
    .map((line) => parseCsvLine(line)[urlIndex])
    .filter(Boolean)
    .map(url => url.trim());
}

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
            return true;
        }
    }
}

async function run() {
    console.log(`\n========================================`);
    console.log(`🚀 DCBNI (DISCOVERED BUT NOT INDEXED) RE-INDEXATION`);
    console.log(`========================================\n`);

    const allUrls = readCsvUrls(TABLE_CSV_PATH);
    
    // Filter out admin, thank-you pages, or pages with query parameters to avoid duplicate canonical warnings
    const filteredUrls = allUrls.filter(url => {
        if (url.includes('/admin/')) return false;
        if (url.includes('/thank-you')) return false;
        if (url.includes('?')) return false; // Skip query strings
        return true;
    });

    console.log(`Parsed ${allUrls.length} total URLs from dcbni/Table.csv.`);
    console.log(`Filtered down to ${filteredUrls.length} active indexable URLs.`);

    // Load history log to skip already submitted URLs
    let submittedSet = new Set();
    if (fs.existsSync(LOG_PATH)) {
        const logData = JSON.parse(fs.readFileSync(LOG_PATH, 'utf8'));
        submittedSet = new Set(logData.submitted || []);
    }

    const pendingUrls = filteredUrls.filter(url => !submittedSet.has(url));
    console.log(`Remaining pending URLs to submit: ${pendingUrls.length}\n`);

    if (pendingUrls.length === 0) {
        console.log('✅ All pending URLs have already been submitted in previous runs.');
        return;
    }

    let successCount = 0;
    const newlySubmitted = [];

    for (const url of pendingUrls) {
        const shouldContinue = await submitUrl(url);
        if (!shouldContinue) {
             console.log('\n🛑 Force stopping batch due to Google API daily quota exhaustion.');
             break;
        }
        successCount++;
        newlySubmitted.push(url);
        // Small delay to prevent rate limits
        await new Promise(r => setTimeout(r, 600)); 
    }

    // Update history log
    const updatedSubmitted = Array.from(new Set([...Array.from(submittedSet), ...newlySubmitted]));
    fs.writeFileSync(LOG_PATH, JSON.stringify({
        submitted: updatedSubmitted,
        lastUpdated: new Date().toISOString()
    }, null, 2), 'utf8');

    console.log(`\n========================================`);
    console.log(`📊 BATCH RE-INDEXATION SUMMARY`);
    console.log(`Successfully submitted in this batch: ${successCount}`);
    console.log(`Total submitted overall: ${updatedSubmitted.length} / ${filteredUrls.length}`);
    console.log(`========================================\n`);
}

run().catch(console.error);
