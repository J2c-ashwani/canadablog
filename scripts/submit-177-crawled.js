const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const CREDENTIALS_PATH = path.join(__dirname, '../google-credentials.json');
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
        await indexing.urlNotifications.publish({
            requestBody: {
                url: url,
                type: 'URL_UPDATED'
            }
        });
        console.log(`   ✅ Submitted: ${url}`);
        return true;
    } catch (error) {
        if (error.code === 429) {
            console.error('   ❌ Google Indexing API Quota Exceeded.');
            return 'QUOTA';
        }
        console.error(`   ❌ Failed: ${url} - ${error.message}`);
        return false;
    }
}

// The 177 newly identified "crawled - currently not indexed" URLs
const urls = [
    "https://www.fsidigital.ca/grants/id/boise/women-entrepreneurs",
    "https://www.fsidigital.ca/grants/id/boise/non-profits",
    "https://www.fsidigital.ca/grants/va/richmond/veterans",
    "https://www.fsidigital.ca/grants/ca/san-jose/minority-owned",
    "https://www.fsidigital.ca/grants/va/richmond/clean-energy",
    "https://www.fsidigital.ca/grants/ma/boston/logistics",
    "https://www.fsidigital.ca/grants/fl/hialeah/minority-owned",
    "https://www.fsidigital.ca/grants/co/colorado-springs/manufacturing",
    "https://www.fsidigital.ca/grants/fl/jacksonville/clean-energy",
    "https://www.fsidigital.ca/grants/co/colorado-springs/logistics",
    "https://www.fsidigital.ca/grants/fl/jacksonville/restaurants-hospitality",
    "https://www.fsidigital.ca/grants/co/colorado-springs/construction",
    "https://www.fsidigital.ca/grants/co/colorado-springs/retail",
    "https://www.fsidigital.ca/grants/az/tucson/education",
    "https://www.fsidigital.ca/grants/co/colorado-springs/healthcare",
    "https://www.fsidigital.ca/grants/tx/fort-worth/retail",
    "https://www.fsidigital.ca/grants/co/colorado-springs/restaurants-hospitality",
    "https://www.fsidigital.ca/grants/co/colorado-springs/education",
    "https://www.fsidigital.ca/grants/tx/el-paso/technology",
    "https://www.fsidigital.ca/grants/tx/corpus-christi/agriculture",
    "https://www.fsidigital.ca/grants/nc/raleigh/women-entrepreneurs",
    "https://www.fsidigital.ca/grants/bc/abbotsford/non-profits",
    "https://www.fsidigital.ca/grants/tx/el-paso/women-entrepreneurs",
    "https://www.fsidigital.ca/grants/nm/albuquerque/veterans",
    "https://www.fsidigital.ca/grants/tx/houston/technology",
    "https://www.fsidigital.ca/grants/tx/corpus-christi/restaurants-hospitality",
    "https://www.fsidigital.ca/grants/qc/sherbrooke/arts-entertainment",
    "https://www.fsidigital.ca/grants/fl/st-petersburg/restaurants-hospitality",
    "https://www.fsidigital.ca/grants/az/tucson/technology",
    "https://www.fsidigital.ca/grants/az/tucson/healthcare",
    "https://www.fsidigital.ca/grants/az/tucson/women-entrepreneurs",
    "https://www.fsidigital.ca/grants/tx/arlington/veterans",
    "https://www.fsidigital.ca/grants/nc/charlotte/retail",
    "https://www.fsidigital.ca/grants/fl/st-petersburg/agriculture",
    "https://www.fsidigital.ca/grants/fl/orlando/women-entrepreneurs",
    "https://www.fsidigital.ca/grants/tx/el-paso/arts-entertainment",
    "https://www.fsidigital.ca/grants/tx/el-paso/restaurants-hospitality",
    "https://www.fsidigital.ca/grants/fl/jacksonville/women-entrepreneurs",
    "https://www.fsidigital.ca/grants/nc/raleigh/logistics",
    "https://www.fsidigital.ca/grants/bc/kelowna/manufacturing",
    "https://www.fsidigital.ca/grants/nc/charlotte/arts-entertainment",
    "https://www.fsidigital.ca/grants/fl/jacksonville/manufacturing",
    "https://www.fsidigital.ca/grants/ga/atlanta/restaurants-hospitality",
    "https://www.fsidigital.ca/grants/il/chicago/agriculture",
    "https://www.fsidigital.ca/grants/ok/tulsa/logistics",
    "https://www.fsidigital.ca/grants/nm/albuquerque/logistics",
    "https://www.fsidigital.ca/usa/new-mexico/albuquerque",
    "https://www.fsidigital.ca/grants/fl/tampa/construction",
    "https://www.fsidigital.ca/grants/tx/lubbock/healthcare",
    "https://www.fsidigital.ca/grants/ny/rochester/logistics",
    "https://www.fsidigital.ca/grants/fl/orlando/education",
    "https://www.fsidigital.ca/grants/nc/raleigh/veterans",
    "https://www.fsidigital.ca/grants/ne/omaha/logistics",
    "https://www.fsidigital.ca/grants/tx/corpus-christi/arts-entertainment",
    "https://www.fsidigital.ca/grants/fl/orlando/minority-owned",
    "https://www.fsidigital.ca/grants/fl/tallahassee/construction",
    "https://www.fsidigital.ca/grants/tx/fort-worth/non-profits",
    "https://www.fsidigital.ca/grants/fl/st-petersburg/veterans",
    "https://www.fsidigital.ca/grants/qc/longueuil/construction",
    "https://www.fsidigital.ca/grants/dc/washington/technology",
    "https://www.fsidigital.ca/grants/qc/levis/manufacturing",
    "https://www.fsidigital.ca/grants/tx/fort-worth/technology",
    "https://www.fsidigital.ca/grants/md/baltimore/retail",
    "https://www.fsidigital.ca/grants/fl/tampa/veterans",
    "https://www.fsidigital.ca/grants/fl/st-petersburg/arts-entertainment",
    "https://www.fsidigital.ca/grants/fl/hialeah/agriculture",
    "https://www.fsidigital.ca/grants/wi/milwaukee/minority-owned",
    "https://www.fsidigital.ca/grants/tx/dallas/healthcare",
    "https://www.fsidigital.ca/grants/ca/los-angeles/logistics",
    "https://www.fsidigital.ca/grants/ny/buffalo/women-entrepreneurs",
    "https://www.fsidigital.ca/grants/ma/boston/veterans",
    "https://www.fsidigital.ca/grants/il/chicago/healthcare",
    "https://www.fsidigital.ca/grants/ny/new-york-city/education",
    "https://www.fsidigital.ca/grants/co/denver/minority-owned",
    "https://www.fsidigital.ca/grants/tx/corpus-christi/non-profits",
    "https://www.fsidigital.ca/grants/az/tucson/minority-owned",
    "https://www.fsidigital.ca/blog/women-business-grants-2026",
    "https://www.fsidigital.ca/grants/qc/quebec-city/restaurants-hospitality",
    "https://www.fsidigital.ca/grants/tx/lubbock/minority-owned",
    "https://www.fsidigital.ca/grants/ky/louisville/healthcare",
    "https://www.fsidigital.ca/grants/fl/tallahassee/minority-owned",
    "https://www.fsidigital.ca/grants/az/phoenix/education",
    "https://www.fsidigital.ca/grants/wi/milwaukee/veterans",
    "https://www.fsidigital.ca/grants/tx/lubbock/restaurants-hospitality",
    "https://www.fsidigital.ca/grants/tx/lubbock/veterans",
    "https://www.fsidigital.ca/grants/fl/hialeah/education",
    "https://www.fsidigital.ca/grants/fl/hialeah/healthcare",
    "https://www.fsidigital.ca/grants/md/baltimore/clean-energy",
    "https://www.fsidigital.ca/grants/md/baltimore/veterans",
    "https://www.fsidigital.ca/grants/nc/charlotte/technology",
    "https://www.fsidigital.ca/grants/nc/raleigh/technology",
    "https://www.fsidigital.ca/grants/az/tucson/veterans",
    "https://www.fsidigital.ca/grants/mi/detroit/construction",
    "https://www.fsidigital.ca/grants/wi/milwaukee/women-entrepreneurs",
    "https://www.fsidigital.ca/grants/co/denver/construction",
    "https://www.fsidigital.ca/grants/fl/jacksonville/healthcare",
    "https://www.fsidigital.ca/grants/mb/winnipeg/healthcare",
    "https://www.fsidigital.ca/grants/wi/milwaukee/retail",
    "https://www.fsidigital.ca/grants/fl/st-petersburg/construction",
    "https://www.fsidigital.ca/grants/ky/louisville/veterans",
    "https://www.fsidigital.ca/grants/fl/tallahassee/arts-entertainment",
    "https://www.fsidigital.ca/grants/pa/philadelphia/non-profits",
    "https://www.fsidigital.ca/grants/fl/st-petersburg/logistics",
    "https://www.fsidigital.ca/grants/fl/jacksonville/retail",
    "https://www.fsidigital.ca/grants/fl/jacksonville/construction",
    "https://www.fsidigital.ca/grants/fl/tallahassee/non-profits",
    "https://www.fsidigital.ca/grants/fl/st-petersburg/manufacturing",
    "https://www.fsidigital.ca/grants/fl/jacksonville/minority-owned",
    "https://www.fsidigital.ca/grants/az/tucson/non-profits",
    "https://www.fsidigital.ca/guides/canada-aerospace-defence-funding-guide",
    "https://www.fsidigital.ca/grants/bc/vancouver/clean-energy",
    "https://www.fsidigital.ca/grants/il/chicago/arts-entertainment",
    "https://www.fsidigital.ca/grants/ky/louisville/restaurants-hospitality",
    "https://www.fsidigital.ca/grants/nv/las-vegas/technology",
    "https://www.fsidigital.ca/grants/nm/albuquerque/agriculture",
    "https://www.fsidigital.ca/grants/fl/jacksonville/arts-entertainment",
    "https://www.fsidigital.ca/grants/nb/saint-john/manufacturing",
    "https://www.fsidigital.ca/grants/md/baltimore/manufacturing",
    "https://www.fsidigital.ca/grants/ny/rochester/manufacturing",
    "https://www.fsidigital.ca/grants/tx/lubbock/women-entrepreneurs",
    "https://www.fsidigital.ca/grants/md/baltimore/women-entrepreneurs",
    "https://www.fsidigital.ca/grants/ny/buffalo/healthcare",
    "https://www.fsidigital.ca/usa/tennessee/chattanooga",
    "https://www.fsidigital.ca/grants/md/baltimore/construction",
    "https://www.fsidigital.ca/grants/az/tucson/clean-energy",
    "https://www.fsidigital.ca/grants/ky/louisville/agriculture",
    "https://www.fsidigital.ca/grants/tx/el-paso/clean-energy",
    "https://www.fsidigital.ca/grants/md/baltimore/agriculture",
    "https://www.fsidigital.ca/blog/canada-regional-development-2026",
    "https://www.fsidigital.ca/grants/qc/sherbrooke/technology",
    "https://www.fsidigital.ca/grants/fl/tallahassee/agriculture",
    "https://www.fsidigital.ca/grants/nv/las-vegas/agriculture",
    "https://www.fsidigital.ca/grants/nm/albuquerque/education",
    "https://www.fsidigital.ca/grants/az/phoenix/healthcare",
    "https://www.fsidigital.ca/grants/tx/plano/manufacturing",
    "https://www.fsidigital.ca/usa/nevada/las-vegas",
    "https://www.fsidigital.ca/grants/nm/albuquerque/technology",
    "https://www.fsidigital.ca/grants/qc/levis/veterans",
    "https://www.fsidigital.ca/grants/tn/memphis/technology",
    "https://www.fsidigital.ca/grants/nv/las-vegas/education",
    "https://www.fsidigital.ca/grants/tn/memphis/manufacturing",
    "https://www.fsidigital.ca/grants/nv/las-vegas/women-entrepreneurs",
    "https://www.fsidigital.ca/grants/bc/abbotsford/education",
    "https://www.fsidigital.ca/grants/tn/memphis/agriculture",
    "https://www.fsidigital.ca/grants/nv/las-vegas/restaurants-hospitality",
    "https://www.fsidigital.ca/grants/nv/las-vegas/arts-entertainment",
    "https://www.fsidigital.ca/grants/nv/las-vegas/veterans",
    "https://www.fsidigital.ca/grants/ny/syracuse/veterans",
    "https://www.fsidigital.ca/guides/apply-british-columbia-grants",
    "https://www.fsidigital.ca/grants/ne/omaha/construction",
    "https://www.fsidigital.ca/grants/ky/louisville/retail",
    "https://www.fsidigital.ca/grants/tn/memphis/healthcare",
    "https://www.fsidigital.ca/grants/on/hamilton/healthcare",
    "https://www.fsidigital.ca/grants/nm/albuquerque/arts-entertainment",
    "https://www.fsidigital.ca/blog/women-entrepreneurship-loan-fund-canada",
    "https://www.fsidigital.ca/grants/ky/louisville/women-entrepreneurs",
    "https://www.fsidigital.ca/grants/co/denver/agriculture",
    "https://www.fsidigital.ca/grants/nv/las-vegas/minority-owned",
    "https://www.fsidigital.ca/grants/ky/louisville/non-profits",
    "https://www.fsidigital.ca/grants/ny/yonkers/retail",
    "https://www.fsidigital.ca/blog/top-10-no-equity-grants-black-female-entrepreneurs",
    "https://www.fsidigital.ca/grants/co/denver/restaurants-hospitality",
    "https://www.fsidigital.ca/grants/tn/nashville/restaurants-hospitality",
    "https://www.fsidigital.ca/grants/nv/las-vegas/manufacturing",
    "https://www.fsidigital.ca/grants/ca/fresno/women-entrepreneurs",
    "https://www.fsidigital.ca/grants/in/indianapolis/arts-entertainment",
    "https://www.fsidigital.ca/guides/california-loan-guarantee-guide",
    "https://www.fsidigital.ca/grants/pa/philadelphia/logistics",
    "https://www.fsidigital.ca/grants/mi/detroit/restaurants-hospitality",
    "https://www.fsidigital.ca/grants/wi/milwaukee/manufacturing",
    "https://www.fsidigital.ca/grants/ca/los-angeles/arts-entertainment",
    "https://www.fsidigital.ca/grants/ga/atlanta/arts-entertainment",
    "https://www.fsidigital.ca/grants/fl/miami/veterans",
    "https://www.fsidigital.ca/grants/bc/vancouver/minority-owned",
    "https://www.fsidigital.ca/grants/on/kingston/minority-owned",
    "https://www.fsidigital.ca/usa/ohio/cincinnati",
    "https://www.fsidigital.ca/blog/ontario-government-business-grants"
];

async function run() {
    console.log(`🚀 Starting Google Indexing API Submission for ${urls.length} target URLs...`);
    const history = await loadHistory();
    const now = new Date().toISOString();
    
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        console.log(`[${i + 1}/${urls.length}] Submitting: ${url}`);
        
        const result = await submitUrl(url);
        
        if (result === 'QUOTA') {
            console.log('🛑 Quota hit. Exiting.');
            break;
        } else if (result === true) {
            history[url] = now;
            successCount++;
        } else {
            failCount++;
        }
        
        // Sleep for 600ms to stay well within standard rate limits
        await new Promise(resolve => setTimeout(resolve, 600));
    }

    saveHistory(history);
    console.log('\n=======================================');
    console.log(`🎉 Execution finished.`);
    console.log(`   Submitted successfully: ${successCount}`);
    console.log(`   Failed submissions:     ${failCount}`);
    console.log(`   Remaining URLs:         ${urls.length - successCount - failCount}`);
    console.log('=======================================');
}

run().catch(err => {
    console.error('❌ Run failed:', err);
});
