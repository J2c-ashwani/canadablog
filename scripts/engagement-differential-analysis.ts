import * as fs from 'fs';
import * as path from 'path';

// Helper to parse GSC Table.csv files
function readGscCsv(filePath: string): Set<string> {
    const urls = new Set<string>();
    if (!fs.existsSync(filePath)) return urls;
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const parts = line.split(',');
        if (parts[0]) {
            urls.add(parts[0].replace(/^"|"$/g, '').toLowerCase().trim());
        }
    }
    return urls;
}

const CRAWLED_UNINDEXED_PATH = path.join(__dirname, '../fsidigital.ca-Coverage-Drilldown-2026-07-17/Table.csv');
const DISCOVERED_UNINDEXED_PATH = path.join(__dirname, '../fsidigital.ca-Coverage-Drilldown-2026-07-17 (1)/Table.csv');
const VALID_INDEXED_PATH = path.join(__dirname, '../fsidigital.ca-Coverage-Valid-2026-07-10/Table.csv');
const REVENUE_ATTRIBUTION_PATH = path.join(__dirname, 'revenue-attribution-results.json');

const crawledUnindexed = readGscCsv(CRAWLED_UNINDEXED_PATH);
const discoveredUnindexed = readGscCsv(DISCOVERED_UNINDEXED_PATH);
const validIndexed = readGscCsv(VALID_INDEXED_PATH);

if (!fs.existsSync(REVENUE_ATTRIBUTION_PATH)) {
    console.error("Error: revenue-attribution-results.json not found!");
    process.exit(1);
}

const attributionData = JSON.parse(fs.readFileSync(REVENUE_ATTRIBUTION_PATH, 'utf8'));
const pageAttributions: any[] = attributionData.pageAttribution;

console.log(`Loaded ${pageAttributions.length} pages from revenue-attribution-results.json.`);

interface EngAnalyzedPage {
    pagePath: string;
    url: string;
    status: 'indexed' | 'crawled_unindexed' | 'discovered_unindexed' | 'unknown';
    pageViews: number;
    calcStarts: number;
    calcDone: number;
    engMinutes: number;
    estRevenue: number;
}

const analyzed: EngAnalyzedPage[] = [];

pageAttributions.forEach(item => {
    const pagePath = item.page; // e.g. "/grants/on/toronto/technology"
    const url = `https://www.fsidigital.ca${pagePath}`.toLowerCase().trim();
    
    let status: 'indexed' | 'crawled_unindexed' | 'discovered_unindexed' | 'unknown' = 'unknown';
    if (validIndexed.has(url)) {
        status = 'indexed';
    } else if (crawledUnindexed.has(url)) {
        status = 'crawled_unindexed';
    } else if (discoveredUnindexed.has(url)) {
        status = 'discovered_unindexed';
    }
    
    analyzed.push({
        pagePath,
        url,
        status,
        pageViews: item.funnel?.pageViews || 0,
        calcStarts: item.funnel?.calcStarts || 0,
        calcDone: item.funnel?.calcDone || 0,
        engMinutes: item.engMinutes || 0,
        estRevenue: item.estRevenue || 0
    });
});

const indexedGroup = analyzed.filter(p => p.status === 'indexed');
const crawledGroup = analyzed.filter(p => p.status === 'crawled_unindexed');
const discoveredGroup = analyzed.filter(p => p.status === 'discovered_unindexed');
const unknownGroup = analyzed.filter(p => p.status === 'unknown');

console.log(`\n=== MATCHED ATTRIBUTION PAGES BY INDEX STATUS ===`);
console.log(`- Indexed Group: ${indexedGroup.length} pages`);
console.log(`- Crawled Unindexed Group: ${crawledGroup.length} pages`);
console.log(`- Discovered Unindexed Group: ${discoveredGroup.length} pages`);

function getAverageMetrics(group: EngAnalyzedPage[]) {
    if (group.length === 0) return { views: 0, starts: 0, done: 0, eng: 0, rev: 0 };
    let totalViews = 0;
    let totalStarts = 0;
    let totalDone = 0;
    let totalEng = 0;
    let totalRev = 0;
    
    group.forEach(p => {
        totalViews += p.pageViews;
        totalStarts += p.calcStarts;
        totalDone += p.calcDone;
        totalEng += p.engMinutes;
        totalRev += p.estRevenue;
    });
    
    return {
        views: totalViews / group.length,
        starts: totalStarts / group.length,
        done: totalDone / group.length,
        eng: totalEng / group.length,
        rev: totalRev / group.length
    };
}

const indexedAvg = getAverageMetrics(indexedGroup);
const crawledAvg = getAverageMetrics(crawledGroup);
const discoveredAvg = getAverageMetrics(discoveredGroup);

console.log(`\n=== DIFFERENTIAL ENGAGEMENT & COMMERCIAL MATRIX ===`);
console.log(`| Metric | Indexed Group (${indexedGroup.length} pages) | Crawled Unindexed Group (${crawledGroup.length} pages) | Discovered Unindexed Group (${discoveredGroup.length} pages) |`);
console.log(`|---|---|---|---|`);
console.log(`| Avg Pageviews | ${indexedAvg.views.toFixed(2)} | ${crawledAvg.views.toFixed(2)} | ${discoveredAvg.views.toFixed(2)} |`);
console.log(`| Avg Calc Starts | ${indexedAvg.starts.toFixed(2)} | ${crawledAvg.starts.toFixed(2)} | ${discoveredAvg.starts.toFixed(2)} |`);
console.log(`| Avg Calc Done | ${indexedAvg.done.toFixed(2)} | ${crawledAvg.done.toFixed(2)} | ${discoveredAvg.done.toFixed(2)} |`);
console.log(`| Avg Eng Minutes | ${indexedAvg.eng.toFixed(2)} | ${crawledAvg.eng.toFixed(2)} | ${discoveredAvg.eng.toFixed(2)} |`);
console.log(`| Avg Est. Revenue ($) | $${indexedAvg.rev.toFixed(2)} | $${crawledAvg.rev.toFixed(2)} | $${discoveredAvg.rev.toFixed(2)} |`);
