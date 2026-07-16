import * as fs from 'fs';
import * as path from 'path';

// Helper to parse GSC Table.csv files
function readGscCsv(filePath: string): string[] {
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        return [];
    }
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const urls: string[] = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const parts = line.split(',');
        if (parts[0]) {
            // Strip quotes if present
            urls.push(parts[0].replace(/^"|"$/g, ''));
        }
    }
    return urls;
}

const CRAWLED_UNINDEXED_PATH = path.join(__dirname, '../fsidigital.ca-Coverage-Drilldown-2026-07-17/Table.csv');
const DISCOVERED_UNINDEXED_PATH = path.join(__dirname, '../fsidigital.ca-Coverage-Drilldown-2026-07-17 (1)/Table.csv');
const VALID_INDEXED_PATH = path.join(__dirname, '../fsidigital.ca-Coverage-Valid-2026-07-10/Table.csv');

const crawledUnindexed = readGscCsv(CRAWLED_UNINDEXED_PATH);
const discoveredUnindexed = readGscCsv(DISCOVERED_UNINDEXED_PATH);
const validIndexed = readGscCsv(VALID_INDEXED_PATH);

console.log(`Loaded GSC lists:`);
console.log(`- Indexed (Valid): ${validIndexed.length}`);
console.log(`- Crawled - Currently Not Indexed: ${crawledUnindexed.length}`);
console.log(`- Discovered - Currently Not Indexed: ${discoveredUnindexed.length}`);

// PART 1 — Categorize Every Non-Indexed URL
const directories = [
    '/grants/',
    '/usa/',
    '/canada/',
    '/blog/',
    '/topics/',
    '/download/',
    '/partners/',
    '/products/',
    '/guides/'
];

interface DirStats {
    total: number;
    indexed: number;
    crawledNotIndexed: number;
    discoveredNotIndexed: number;
}

const dirStats: { [key: string]: DirStats } = {};
directories.forEach(dir => {
    dirStats[dir] = { total: 0, indexed: 0, crawledNotIndexed: 0, discoveredNotIndexed: 0 };
});
const miscStats: DirStats = { total: 0, indexed: 0, crawledNotIndexed: 0, discoveredNotIndexed: 0 };

function matchDir(urlPath: string): string | null {
    for (const dir of directories) {
        if (urlPath.includes(dir)) return dir;
    }
    return null;
}

validIndexed.forEach(url => {
    const matched = matchDir(url);
    if (matched) {
        dirStats[matched].indexed++;
        dirStats[matched].total++;
    } else {
        miscStats.indexed++;
        miscStats.total++;
    }
});

crawledUnindexed.forEach(url => {
    const matched = matchDir(url);
    if (matched) {
        dirStats[matched].crawledNotIndexed++;
        dirStats[matched].total++;
    } else {
        miscStats.crawledNotIndexed++;
        miscStats.total++;
    }
});

discoveredUnindexed.forEach(url => {
    const matched = matchDir(url);
    if (matched) {
        dirStats[matched].discoveredNotIndexed++;
        dirStats[matched].total++;
    } else {
        miscStats.discoveredNotIndexed++;
        miscStats.total++;
    }
});

console.log("\n=== PART 1: Directory Breakdown ===");
console.log("| Directory | Total URLs | Indexed | Crawled Not Indexed | Discovered Not Indexed | Index Rate % |");
console.log("|---|---|---|---|---|---|");
Object.entries(dirStats).forEach(([dir, stats]) => {
    const rate = stats.total > 0 ? (stats.indexed / stats.total * 100).toFixed(1) : '0.0';
    console.log(`| ${dir} | ${stats.total} | ${stats.indexed} | ${stats.crawledNotIndexed} | ${stats.discoveredNotIndexed} | ${rate}% |`);
});
const miscRate = miscStats.total > 0 ? (miscStats.indexed / miscStats.total * 100).toFixed(1) : '0.0';
console.log(`| / (misc/root) | ${miscStats.total} | ${miscStats.indexed} | ${miscStats.crawledNotIndexed} | ${miscStats.discoveredNotIndexed} | ${miscRate}% |`);

// PART 2 — Identify Template Patterns
// Categorize based on path depths and parameters
interface TemplateStats {
    total: number;
    indexed: number;
    excluded: number;
}

const templates: { [key: string]: TemplateStats } = {
    "PSEO City-Industry Leaves (/grants/[prov]/[city]/[ind])": { total: 0, indexed: 0, excluded: 0 },
    "PSEO City Hubs (/grants/[prov]/[city])": { total: 0, indexed: 0, excluded: 0 },
    "PSEO Province Hubs (/grants/[prov])": { total: 0, indexed: 0, excluded: 0 },
    "USA State Pages (/usa/[state])": { total: 0, indexed: 0, excluded: 0 },
    "USA City Pages (/usa/[state]/[city])": { total: 0, indexed: 0, excluded: 0 },
    "Topic Pages (/topics/[slug])": { total: 0, indexed: 0, excluded: 0 },
    "Partner Pages (/partners/[slug])": { total: 0, indexed: 0, excluded: 0 },
    "Blog Posts (/blog/[slug])": { total: 0, indexed: 0, excluded: 0 },
    "Download Hubs (/download/[slug])": { total: 0, indexed: 0, excluded: 0 }
};

function getTemplateName(url: string): string | null {
    try {
        const u = new URL(url);
        const path = u.pathname;
        if (path.startsWith('/grants/')) {
            const parts = path.split('/').filter(Boolean); // ["grants", "prov", "city", "ind"] or ["grants", "prov", "city"]
            if (parts.length === 4) return "PSEO City-Industry Leaves (/grants/[prov]/[city]/[ind])";
            if (parts.length === 3) return "PSEO City Hubs (/grants/[prov]/[city])";
            if (parts.length === 2) return "PSEO Province Hubs (/grants/[prov])";
        }
        if (path.startsWith('/usa/')) {
            const parts = path.split('/').filter(Boolean);
            if (parts.length === 3) return "USA City Pages (/usa/[state]/[city])";
            if (parts.length === 2) return "USA State Pages (/usa/[state])";
        }
        if (path.startsWith('/topics/')) return "Topic Pages (/topics/[slug])";
        if (path.startsWith('/partners/')) return "Partner Pages (/partners/[slug])";
        if (path.startsWith('/blog/')) return "Blog Posts (/blog/[slug])";
        if (path.startsWith('/download/')) return "Download Hubs (/download/[slug])";
    } catch (e) {}
    return null;
}

validIndexed.forEach(url => {
    const t = getTemplateName(url);
    if (t && templates[t]) {
        templates[t].indexed++;
        templates[t].total++;
    }
});

crawledUnindexed.forEach(url => {
    const t = getTemplateName(url);
    if (t && templates[t]) {
        templates[t].excluded++;
        templates[t].total++;
    }
});

discoveredUnindexed.forEach(url => {
    const t = getTemplateName(url);
    if (t && templates[t]) {
        templates[t].excluded++;
        templates[t].total++;
    }
});

console.log("\n=== PART 2: Template breakdown ===");
console.log("| Template Name | Total URLs | Indexed | Excluded | Index Rate % |");
console.log("|---|---|---|---|---|");
Object.entries(templates).forEach(([tName, stats]) => {
    const rate = stats.total > 0 ? (stats.indexed / stats.total * 100).toFixed(1) : '0.0';
    console.log(`| ${tName} | ${stats.total} | ${stats.indexed} | ${stats.excluded} | ${rate}% |`);
});
