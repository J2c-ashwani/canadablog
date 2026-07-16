import * as fs from 'fs';
import * as path from 'path';
import { getAllPseoPages, type PseoPage } from '../lib/pseo-data';

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
            urls.add(parts[0].replace(/^"|"$/g, '').toLowerCase());
        }
    }
    return urls;
}

// Helper to parse performance GSC Pages.csv
interface PerformanceMetrics {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
}
function readPerformanceCsv(filePath: string): Map<string, PerformanceMetrics> {
    const dataMap = new Map<string, PerformanceMetrics>();
    if (!fs.existsSync(filePath)) return dataMap;
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const parts = line.split(',');
        if (parts.length >= 5) {
            const url = parts[0].replace(/^"|"$/g, '').toLowerCase();
            const clicks = parseInt(parts[1]) || 0;
            const impressions = parseInt(parts[2]) || 0;
            const ctr = parseFloat(parts[3].replace('%', '')) || 0;
            const position = parseFloat(parts[4]) || 0;
            dataMap.set(url, { clicks, impressions, ctr, position });
        }
    }
    return dataMap;
}

const CRAWLED_UNINDEXED_PATH = path.join(__dirname, '../fsidigital.ca-Coverage-Drilldown-2026-07-17/Table.csv');
const DISCOVERED_UNINDEXED_PATH = path.join(__dirname, '../fsidigital.ca-Coverage-Drilldown-2026-07-17 (1)/Table.csv');
const VALID_INDEXED_PATH = path.join(__dirname, '../fsidigital.ca-Coverage-Valid-2026-07-10/Table.csv');
const PERFORMANCE_PATH = path.join(__dirname, '../3monthGSCdata/Pages.csv');

const crawledUnindexed = readGscCsv(CRAWLED_UNINDEXED_PATH);
const discoveredUnindexed = readGscCsv(DISCOVERED_UNINDEXED_PATH);
const validIndexed = readGscCsv(VALID_INDEXED_PATH);
const performanceData = readPerformanceCsv(PERFORMANCE_PATH);

const allPseoPages = getAllPseoPages();

console.log(`Loaded ${allPseoPages.length} programmatic SEO leaf pages from local registry.`);

interface AnalyzedPage {
    page: PseoPage;
    url: string;
    status: 'indexed' | 'crawled_unindexed' | 'discovered_unindexed' | 'unknown';
    metrics?: PerformanceMetrics;
}

const analyzed: AnalyzedPage[] = [];

allPseoPages.forEach(p => {
    const url = `https://www.fsidigital.ca/grants/${p.provinceSlug}/${p.citySlug}/${p.industrySlug}`.toLowerCase();
    let status: 'indexed' | 'crawled_unindexed' | 'discovered_unindexed' | 'unknown' = 'unknown';
    
    if (validIndexed.has(url)) {
        status = 'indexed';
    } else if (crawledUnindexed.has(url)) {
        status = 'crawled_unindexed';
    } else if (discoveredUnindexed.has(url)) {
        status = 'discovered_unindexed';
    }
    
    const metrics = performanceData.get(url);
    analyzed.push({ page: p, url, status, metrics });
});

// Group pages by status
const indexedPages = analyzed.filter(p => p.status === 'indexed');
const crawledUnindexedPages = analyzed.filter(p => p.status === 'crawled_unindexed');
const discoveredUnindexedPages = analyzed.filter(p => p.status === 'discovered_unindexed');
const unknownPages = analyzed.filter(p => p.status === 'unknown');

console.log(`\n=== MATCHED PROGRAMMATIC LEAF PAGES ===`);
console.log(`- Matched Indexed: ${indexedPages.length}`);
console.log(`- Matched Crawled Unindexed: ${crawledUnindexedPages.length}`);
console.log(`- Matched Discovered Unindexed: ${discoveredUnindexedPages.length}`);
console.log(`- Remainder (not in GSC sample lists): ${unknownPages.length}`);

// Helper to compute statistics
function getGroupStats(group: AnalyzedPage[]) {
    let totalImpressions = 0;
    let totalClicks = 0;
    let totalPos = 0;
    let posCount = 0;
    let metricsCount = 0;
    
    const industries: Record<string, number> = {};
    const provinces: Record<string, number> = {};
    const tiers: Record<string, number> = {};

    group.forEach(p => {
        if (p.metrics) {
            totalImpressions += p.metrics.impressions;
            totalClicks += p.metrics.clicks;
            metricsCount++;
            if (p.metrics.position > 0) {
                totalPos += p.metrics.position;
                posCount++;
            }
        }
        
        industries[p.page.industrySlug] = (industries[p.page.industrySlug] || 0) + 1;
        provinces[p.page.provinceSlug] = (provinces[p.page.provinceSlug] || 0) + 1;
        tiers[p.page.tier] = (tiers[p.page.tier] || 0) + 1;
    });

    return {
        avgImpressions: metricsCount > 0 ? (totalImpressions / group.length) : 0,
        avgClicks: metricsCount > 0 ? (totalClicks / group.length) : 0,
        avgPosition: posCount > 0 ? (totalPos / posCount) : 0,
        metricsRatio: group.length > 0 ? (metricsCount / group.length) : 0,
        industries,
        provinces,
        tiers
    };
}

const indexedStats = getGroupStats(indexedPages);
const crawledStats = getGroupStats(crawledUnindexedPages);
const discoveredStats = getGroupStats(discoveredUnindexedPages);

console.log(`\n=== DIFFERENTIAL GSC PERFORMANCE ANALYSIS ===`);
console.log(`| Metric | Indexed Group (${indexedPages.length} urls) | Crawled Unindexed Group (${crawledUnindexedPages.length} urls) | Discovered Unindexed Group (${discoveredUnindexedPages.length} urls) |`);
console.log(`|---|---|---|---|`);
console.log(`| Avg Clicks (3mo) | ${indexedStats.avgClicks.toFixed(2)} | ${crawledStats.avgClicks.toFixed(2)} | ${discoveredStats.avgClicks.toFixed(2)} |`);
console.log(`| Avg Impressions | ${indexedStats.avgImpressions.toFixed(2)} | ${crawledStats.avgImpressions.toFixed(2)} | ${discoveredStats.avgImpressions.toFixed(2)} |`);
console.log(`| Avg Position | ${indexedStats.avgPosition.toFixed(2)} | ${crawledStats.avgPosition.toFixed(2)} | ${discoveredStats.avgPosition.toFixed(2)} |`);
console.log(`| % of URLs with search metrics | ${(indexedStats.metricsRatio * 100).toFixed(1)}% | ${(crawledStats.metricsRatio * 100).toFixed(1)}% | ${(discoveredStats.metricsRatio * 100).toFixed(1)}% |`);

console.log(`\n=== TIER DISTRIBUTION ===`);
console.log(`| Tier | Indexed % | Crawled Unindexed % | Discovered Unindexed % |`);
console.log(`|---|---|---|---|`);
const tierNames = ['A', 'B', 'C'];
tierNames.forEach(tier => {
    const idxPct = indexedPages.length > 0 ? ((indexedStats.tiers[tier] || 0) / indexedPages.length * 100).toFixed(1) : '0.0';
    const crwPct = crawledUnindexedPages.length > 0 ? ((crawledStats.tiers[tier] || 0) / crawledUnindexedPages.length * 100).toFixed(1) : '0.0';
    const dscPct = discoveredUnindexedPages.length > 0 ? ((discoveredStats.tiers[tier] || 0) / discoveredUnindexedPages.length * 100).toFixed(1) : '0.0';
    console.log(`| Tier ${tier} | ${idxPct}% | ${crwPct}% | ${dscPct}% |`);
});

console.log(`\n=== MAJOR REGIONS (PROVINCES/STATES) DISTRIBUTION ===`);
console.log(`| Region Slug | Indexed Count | Crawled Unindexed Count | Discovered Unindexed Count |`);
console.log(`|---|---|---|---|`);
const allRegs = new Set([...Object.keys(indexedStats.provinces), ...Object.keys(crawledStats.provinces), ...Object.keys(discoveredStats.provinces)]);
Array.from(allRegs).sort().forEach(reg => {
    console.log(`| ${reg.toUpperCase()} | ${indexedStats.provinces[reg] || 0} | ${crawledStats.provinces[reg] || 0} | ${discoveredStats.provinces[reg] || 0} |`);
});

console.log(`\n=== INDUSTRY DISTRIBUTION ===`);
console.log(`| Industry Slug | Indexed Count | Crawled Unindexed Count | Discovered Unindexed Count |`);
console.log(`|---|---|---|---|`);
const allInds = new Set([...Object.keys(indexedStats.industries), ...Object.keys(crawledStats.industries), ...Object.keys(discoveredStats.industries)]);
Array.from(allInds).sort().forEach(ind => {
    console.log(`| ${ind} | ${indexedStats.industries[ind] || 0} | ${crawledStats.industries[ind] || 0} | ${discoveredStats.industries[ind] || 0} |`);
});

// Save stats to JSON report
fs.writeFileSync(path.join(__dirname, '../reports/differential-analysis-results.json'), JSON.stringify({
    indexed: { count: indexedPages.length, stats: indexedStats },
    crawledUnindexed: { count: crawledUnindexedPages.length, stats: crawledStats },
    discoveredUnindexed: { count: discoveredUnindexedPages.length, stats: discoveredStats }
}, null, 2));
