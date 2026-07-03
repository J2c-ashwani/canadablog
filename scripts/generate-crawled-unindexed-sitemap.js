const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.fsidigital.ca';
const CSV_PATH = path.join(__dirname, '../fsidigital.ca-Coverage-Drilldown-2026-06-16/Table.csv');
const OUTPUT_PATH = path.join(__dirname, '../public/indexing-recovery-crawled-unindexed.xml');

// The 177 new unindexed URLs provided by the user
const newUrls = [
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

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function run() {
    console.log('Generating Crawled Unindexed Recovery Sitemap...');
    
    const urlsToInclude = new Set(newUrls);

    // Read CSV for the original 812 pages
    if (fs.existsSync(CSV_PATH)) {
        console.log(`Reading original unindexed URLs from ${CSV_PATH}...`);
        const csvContent = fs.readFileSync(CSV_PATH, 'utf8');
        const lines = csvContent.split('\n');
        
        let csvCount = 0;
        let skippedCount = 0;
        
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (!line) continue;
            
            const url = line.split(',')[0].trim();
            if (url && url.startsWith('https://www.fsidigital.ca')) {
                // Filter out non-HTML static assets / feeds
                if (url.includes('/_next/') || url.includes('/static/') || url.endsWith('.woff2') || url.endsWith('.xml') || url.endsWith('.ico')) {
                    skippedCount++;
                    continue;
                }
                urlsToInclude.add(url);
                csvCount++;
            }
        }
        console.log(`   Processed ${csvCount} URLs from CSV (skipped ${skippedCount} static asset/non-page URLs).`);
    } else {
        console.warn(`⚠️ Warning: ${CSV_PATH} not found. Sitemap will only contain the 177 new URLs.`);
    }

    const finalUrls = Array.from(urlsToInclude).sort();
    console.log(`Total unique page URLs to include in recovery sitemap: ${finalUrls.length}`);

    // Generate XML content
    const lastmod = new Date().toISOString();
    const xmlContent = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...finalUrls.map((url) => [
            '  <url>',
            `    <loc>${escapeXml(url)}</loc>`,
            `    <lastmod>${lastmod}</lastmod>`,
            '    <changefreq>weekly</changefreq>',
            '    <priority>0.9</priority>',
            '  </url>',
        ].join('\n')),
        '</urlset>',
        ''
    ].join('\n');

    fs.writeFileSync(OUTPUT_PATH, xmlContent);
    console.log(`🎉 Successfully generated indexation recovery sitemap at: ${OUTPUT_PATH}`);
}

run();
