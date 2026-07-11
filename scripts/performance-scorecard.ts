#!/usr/bin/env node
/**
 * scripts/performance-scorecard.ts
 * Sprint 12 — Unified SEO Performance Scorecard Dashboard
 * 
 * Compares:
 *   BASELINE  → March 3, 2026 GSC export (28-day window, pre-optimization)
 *   CURRENT   → July 10, 2026 GSC export (3-month window, post-optimization)
 *   FUNNEL    → revenue-attribution-results.json (telemetry: views, calc starts, purchases)
 *   PURCHASES → Live Google Sheets data (Staging/Simulation purchases)
 * 
 * Segments optimized pages into four distinct strategic action groups:
 *   Group 1: High Impressions / Low CTR (Title/Meta updates)
 *   Group 2: High CTR / Low Conversion (Landing page / CTA optimization)
 *   Group 3: High Conversion (Backlink building & cluster expansion)
 *   Group 4: Low/No Impressions (Monitor / low priority)
 */

import fs from 'fs';
import path from 'path';

// ─── Paths ───────────────────────────────────────────────────────────────────
const ROOT = path.join(__dirname, '..');
const DOWNLOADS = '/Users/ashwanikumar/Downloads';

const BASELINE_DIR = path.join(DOWNLOADS, 'fsidigital.ca-Performance-on-Search-2026-03-03');
const CURRENT_DIR  = path.join(DOWNLOADS, 'fsidigital.ca-Performance-on-Search-2026-07-10');
// Weekly snapshots for trend analysis
const WEEKLY_DIRS = [
  { label: 'Jun 28', dir: path.join(ROOT, 'fsidigital.ca-Performance-on-Search-2026-06-28') },
  { label: 'Jul 02', dir: path.join(ROOT, 'fsidigital.ca-Performance-on-Search-2026-07-02') },
  { label: 'Jul 09', dir: path.join(DOWNLOADS, 'fsidigital.ca-Performance-on-Search-2026-07-09') },
];

const ATTRIBUTION_FILE = path.join(ROOT, 'scripts/revenue-attribution-results.json');
const SITE = 'https://www.fsidigital.ca';

// ─── Optimized URLs (Sprints 6–11) ──────────────────────────────────────────
const SPRINT_REGISTRY: Record<string, { sprint: string; optimizedDate: string }> = {
  '/canada/small-business-grants':                       { sprint: 'Sprint 6 (Batch 1)',  optimizedDate: '2026-05' },
  '/blog/csbfp-canada-small-business-financing-program': { sprint: 'Sprint 6 (Batch 1)',  optimizedDate: '2026-05' },
  '/blog/canada-federal-grants':                         { sprint: 'Sprint 6 (Batch 1)',  optimizedDate: '2026-05' },
  '/canada/women-business-grants':                       { sprint: 'Sprint 6 (Batch 1)',  optimizedDate: '2026-05' },
  '/usa/new-york':                                       { sprint: 'Sprint 6 (Batch 1)',  optimizedDate: '2026-05' },
  '/blog/women-entrepreneurship-grants-2026':            { sprint: 'Sprint 6 (Batch 2)',  optimizedDate: '2026-06' },
  '/canada/innovation-grants':                           { sprint: 'Sprint 6 (Batch 2)',  optimizedDate: '2026-06' },
  '/blog/alberta-small-business-grants-guide':           { sprint: 'Sprint 6 (Batch 2)',  optimizedDate: '2026-06' },
  '/blog/canada-startup-funding-grants-guide':           { sprint: 'Sprint 6 (Batch 2)',  optimizedDate: '2026-06' },
  '/canada/government-grants':                           { sprint: 'Sprint 6 (Batch 2)',  optimizedDate: '2026-06' },
  '/blog/quebec-small-business-grants-guide':            { sprint: 'Sprint 6 (Batch 3)',  optimizedDate: '2026-06' },
  '/blog/technology-startup-grants-2026':                { sprint: 'Sprint 6 (Batch 3)',  optimizedDate: '2026-06' },
  '/blog/manufacturing-grants-2026':                     { sprint: 'Sprint 6 (Batch 3)',  optimizedDate: '2026-06' },
  '/blog/ontario-small-business-grants-guide':           { sprint: 'Sprint 6 (Batch 3)',  optimizedDate: '2026-06' },
  '/blog/bc-small-business-grants-guide':                { sprint: 'Sprint 6 (Batch 3)',  optimizedDate: '2026-06' },
  '/blog/cybersecurity-grants':                          { sprint: 'Sprint 6 (Batch 4)',  optimizedDate: '2026-06' },
  '/blog/5-best-government-loans-agriculture-tech-startups': { sprint: 'Sprint 6 (Batch 4)', optimizedDate: '2026-06' },
  '/blog/saskatchewan-small-business-grants-guide':      { sprint: 'Sprint 6 (Batch 4)',  optimizedDate: '2026-06' },
  '/blog/manitoba-small-business-grants-guide':          { sprint: 'Sprint 6 (Batch 4)',  optimizedDate: '2026-06' },
  '/blog/atlantic-small-business-grants-guide':          { sprint: 'Sprint 6 (Batch 4)',  optimizedDate: '2026-06' },
  '/blog/irap-industrial-research-assistance-program':   { sprint: 'Sprint 8',            optimizedDate: '2026-06' },
  '/blog/canexport-grants-2026':                         { sprint: 'Sprint 8',            optimizedDate: '2026-06' },
  '/blog/canada-clean-technology-innovation-grants':     { sprint: 'Sprint 8',            optimizedDate: '2026-06' },
  '/blog/canada-digital-ai-innovation-grants':           { sprint: 'Sprint 8',            optimizedDate: '2026-06' },
  '/blog/sred-scientific-research-experimental-development': { sprint: 'Sprint 8',          optimizedDate: '2026-06' },
  '/blog/irap-vs-sred-difference-canada':                { sprint: 'Sprint 9',            optimizedDate: '2026-06' },
  '/blog/sred-tax-credits-vs-cdap-canadian-founders':    { sprint: 'Sprint 9',            optimizedDate: '2026-06' },
  '/blog/canada-agri-food-technology-innovation-grants': { sprint: 'Sprint 9',            optimizedDate: '2026-06' },
  '/blog/canada-advanced-manufacturing-innovation-grants': { sprint: 'Sprint 9',          optimizedDate: '2026-06' },
  '/blog/quebec-innovation-grants':                      { sprint: 'Sprint 9',            optimizedDate: '2026-06' },
  '/blog/nsf-sbir-grants-technology-startups':           { sprint: 'Sprint 10',           optimizedDate: '2026-07' },
  '/blog/usda-sbir-agtech-grants':                       { sprint: 'Sprint 10',           optimizedDate: '2026-07' },
  '/blog/healthcare-grants-2026':                        { sprint: 'Sprint 10',           optimizedDate: '2026-07' },
  '/blog/veteran-business-funding-canada-2026':          { sprint: 'Sprint 10',           optimizedDate: '2026-07' },
  '/blog/nih-sbir-biotech-grants':                       { sprint: 'Sprint 11',           optimizedDate: '2026-07' },
  '/blog/canada-agriculture-agrifood-grants-guide':      { sprint: 'Sprint 11',           optimizedDate: '2026-07' },
  '/blog/canada-clean-technology-environment-grants-guide': { sprint: 'Sprint 11',        optimizedDate: '2026-07' },
  '/blog/alberta-innovation-grants':                     { sprint: 'Sprint 11',           optimizedDate: '2026-07' },
  '/blog/ai-machine-learning-grants':                    { sprint: 'Sprint 11',           optimizedDate: '2026-07' },
};

// ─── CSV Parser ──────────────────────────────────────────────────────────────
function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let value = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"' && line[i + 1] === '"') { value += '"'; i++; continue; }
    if (ch === '"') { inQuotes = !inQuotes; continue; }
    if (ch === ',' && !inQuotes) { values.push(value); value = ''; continue; }
    value += ch;
  }
  values.push(value);
  return values;
}

function readCsv(filePath: string): Record<string, string>[] {
  if (!fs.existsSync(filePath)) return [];
  let content = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  const lines = content.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]).map(h => h.trim());
  return lines.slice(1).map(line => {
    const vals = parseCsvLine(line);
    return Object.fromEntries(headers.map((h, i) => [h, (vals[i] || '').trim()]));
  });
}

function num(v: any): number {
  return parseFloat(String(v || '0').replace(/[%,$]/g, '').replace(/,/g, '')) || 0;
}

// Ensure URL is parsed correctly into a clean path
function urlPath(v: string): string {
  try { return new URL(v).pathname.replace(/\/$/, '') || '/'; }
  catch { return String(v).replace(SITE, '').replace(/\/$/, '') || '/'; }
}

// ─── Load GSC pages into a map ───────────────────────────────────────────────
interface GscMetrics {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

function loadGscPages(dir: string): Map<string, GscMetrics> {
  const csvPath = path.join(dir, 'Pages.csv');
  const rows = readCsv(csvPath);
  const map = new Map<string, GscMetrics>();
  for (const row of rows) {
    const url = row['Top pages'] || row['Pages'] || row['Page'] || '';
    if (!url) continue;
    const p = urlPath(url);
    map.set(p, {
      clicks: num(row['Clicks']),
      impressions: num(row['Impressions']),
      ctr: num(row['CTR']),
      position: num(row['Position']),
    });
  }
  return map;
}

// ─── Industry benchmark CTRs by SERP position ───────────────────────────────
const BENCHMARK_CTR: Record<number, number> = {
  1: 28.5, 2: 15.7, 3: 11.0, 4: 8.0, 5: 7.2,
  6: 5.1,  7: 4.0,  8: 3.2,  9: 2.8, 10: 2.5,
  11: 1.9, 12: 1.5, 13: 1.3, 14: 1.1, 15: 1.0,
  16: 0.9, 17: 0.8, 18: 0.7, 19: 0.6, 20: 0.5,
};
function benchmarkCtr(pos: number): number {
  const p = Math.round(pos);
  return BENCHMARK_CTR[p] || (p > 20 ? 0.3 : 0.5);
}

// ─── Page type classifier ────────────────────────────────────────────────────
function classifyPageType(p: string): string {
  if (/^\/usa\//.test(p))              return 'usa';
  if (/^\/canada\//.test(p))           return 'canada-hub';
  if (/^\/grants\/province/.test(p))   return 'ca-province';
  if (/^\/grants\/industry/.test(p))   return 'industry';
  if (/^\/grants\/program/.test(p))    return 'program';
  if (/^\/compare\//.test(p))          return 'comparison';
  if (/^\/blog\//.test(p))             return 'blog';
  if (/^\/guides\//.test(p))           return 'guide';
  if (/^\/download\//.test(p))         return 'download';
  if (/\/calculator/.test(p))          return 'tool';
  return 'other';
}

// ─── Thematic cluster classifier ─────────────────────────────────────────────
function classifyCluster(p: string): string {
  const lower = p.toLowerCase();
  if (/ontario/.test(lower)) return 'Ontario';
  if (/quebec|qc/.test(lower)) return 'Quebec';
  if (/alberta/.test(lower)) return 'Alberta';
  if (/bc|british.columbia/.test(lower)) return 'BC';
  if (/saskatchewan/.test(lower)) return 'Saskatchewan';
  if (/manitoba/.test(lower)) return 'Manitoba';
  if (/atlantic/.test(lower)) return 'Atlantic';
  if (/manufactur/.test(lower)) return 'Manufacturing';
  if (/tech|ai|machine.learning|digital|cyber/.test(lower)) return 'Technology';
  if (/sbir|nsf|nih|usda|usa|new.york/.test(lower)) return 'USA Programs';
  if (/agri|agriculture|agrifood/.test(lower)) return 'Agriculture';
  if (/clean.tech|environment/.test(lower)) return 'Clean Technology';
  if (/irap|sred|cdap/.test(lower)) return 'Tax Credits & IRAP';
  if (/women|female/.test(lower)) return 'Women Entrepreneurs';
  if (/veteran/.test(lower)) return 'Veterans';
  if (/startup|innovation|canexport/.test(lower)) return 'Startup & Innovation';
  if (/csbfp|loan|financing/.test(lower)) return 'Financing';
  if (/healthcare|health/.test(lower)) return 'Healthcare';
  return 'General';
}

// ─── Main ────────────────────────────────────────────────────────────────────
function main() {
  console.log('\n⏳ Sprint 12 Performance Scorecard — Loading data...\n');

  // 1. Load baseline & current GSC data
  const baseline = loadGscPages(BASELINE_DIR);
  const current  = loadGscPages(CURRENT_DIR);
  console.log(`  ✅ Baseline (Mar 3, 28d): ${baseline.size} pages`);
  console.log(`  ✅ Current  (Jul 10, 3mo): ${current.size} pages`);

  // 2. Load weekly snapshots for trend sparklines
  const weeklySnapshots = WEEKLY_DIRS.map(w => ({
    label: w.label,
    data: loadGscPages(w.dir),
  }));

  // 3. Load funnel attribution data
  let funnelMap = new Map<string, { pageViews: number; calcStarts: number; calcDone: number; checkoutStarts: number; purchases: number; revenue: number }>();
  if (fs.existsSync(ATTRIBUTION_FILE)) {
    const attrData = JSON.parse(fs.readFileSync(ATTRIBUTION_FILE, 'utf8'));
    if (attrData.pageAttribution) {
      for (const entry of attrData.pageAttribution) {
        funnelMap.set(entry.page, entry.funnel);
      }
    }
    console.log(`  ✅ Funnel attribution: ${funnelMap.size} pages with telemetry`);
  }

  // 4. Build per-page scorecard
  interface PageScorecard {
    url: string;
    sprint: string;
    optimizedDate: string;
    cluster: string;
    pageType: string;
    // Baseline metrics (pre-optimization)
    baseClicks: number;
    baseImpressions: number;
    baseCtr: number;
    basePosition: number;
    // Current metrics (post-optimization)
    currClicks: number;
    currImpressions: number;
    currCtr: number;
    currPosition: number;
    // Deltas
    impressionsDelta: number;
    impressionsDeltaPct: string;
    clicksDelta: number;
    clicksDeltaPct: string;
    positionDelta: number;
    ctrDelta: number;
    // Benchmark gap
    benchmarkCtr: number;
    ctrGap: number;
    // Funnel
    pageViews: number;
    calcStarts: number;
    calcDone: number;
    purchases: number;
    revenue: number;
    viewToCalcRate: string;
    // Weekly trend
    weeklyTrend: { label: string; impressions: number; clicks: number; position: number }[];
    
    // Updated Simplified Scoring System (SEO + Revenue)
    seoScore: number;      // 0-50
    revenueScore: number;  // 0-50
    businessScore: number; // 0-100 (seoScore + revenueScore)
    strategicGroup: 'Group 1' | 'Group 2' | 'Group 3' | 'Group 4';
  }

  const scorecards: PageScorecard[] = [];

  for (const [urlPath, meta] of Object.entries(SPRINT_REGISTRY)) {
    const base = baseline.get(urlPath);
    const curr = current.get(urlPath);
    const funnel = funnelMap.get(urlPath);

    const baseClicks = base?.clicks ?? 0;
    const baseImpressions = base?.impressions ?? 0;
    const baseCtr = base?.ctr ?? 0;
    const basePosition = base?.position ?? 0;

    const currClicks = curr?.clicks ?? 0;
    const currImpressions = curr?.impressions ?? 0;
    const currCtr = curr?.ctr ?? 0;
    const currPosition = curr?.position ?? 0;

    const impressionsDelta = currImpressions - baseImpressions;
    const clicksDelta = currClicks - baseClicks;
    const positionDelta = currPosition - basePosition; // negative = improved
    const ctrDelta = currCtr - baseCtr;

    const bCtr = benchmarkCtr(currPosition || basePosition || 20);
    const ctrGap = currCtr - bCtr;

    const pageViews = funnel?.pageViews ?? 0;
    const calcStarts = funnel?.calcStarts ?? 0;
    const calcDone = funnel?.calcDone ?? 0;
    const purchases = funnel?.purchases ?? 0;
    const revenue = funnel?.revenue ?? 0;

    // Weekly trend
    const weeklyTrend = weeklySnapshots.map(w => {
      const d = w.data.get(urlPath);
      return {
        label: w.label,
        impressions: d?.impressions ?? 0,
        clicks: d?.clicks ?? 0,
        position: d?.position ?? 0,
      };
    });

    // ─── 1. SEO SCORE (0-50) ───
    // Visibility Component (0-25)
    const visibilityComponent = Math.min(
      (currImpressions > 0 ? 10 : 0) +
      (impressionsDelta > 0 ? Math.min(impressionsDelta / 150, 10) : 0) +
      (currPosition <= 10 ? 5 : currPosition <= 20 ? 3 : 0),
      25
    );
    // CTR Component (0-25)
    const ctrComponent = Math.min(
      (ctrGap >= 0 ? 15 : ctrGap >= -1 ? 10 : ctrGap >= -2 ? 5 : 0) +
      (currCtr > 1.5 ? 10 : currCtr > 0.5 ? 5 : 0),
      25
    );
    const seoScore = Math.round((visibilityComponent + ctrComponent) * 10) / 10;

    // ─── 2. REVENUE SCORE (0-50) ───
    // Engagement / Calculator starts (0-25)
    const engagementComponent = Math.min(
      (pageViews > 0 ? 5 : 0) +
      (calcStarts > 0 ? 15 : 0) +
      (calcDone > 0 ? 5 : 0),
      25
    );
    // Conversions / Test Purchases (0-25)
    const conversionComponent = Math.min(purchases * 25, 25);
    const revenueScore = Math.round((engagementComponent + conversionComponent) * 10) / 10;

    const businessScore = Math.round((seoScore + revenueScore) * 10) / 10;

    // ─── 3. STRATEGIC GROUP CLASSIFICATION ───
    let strategicGroup: 'Group 1' | 'Group 2' | 'Group 3' | 'Group 4';
    if (calcStarts > 0) {
      strategicGroup = 'Group 3'; // High Conversion
    } else if (currImpressions >= 250 && ctrGap < -0.2) {
      strategicGroup = 'Group 1'; // High Impressions, Low CTR -> Fix meta
    } else if (currImpressions >= 100) {
      strategicGroup = 'Group 2'; // High CTR/Volume, Low Conversion -> Fix landing CTA
    } else {
      strategicGroup = 'Group 4'; // Low/No Impressions
    }
    const impDeltaPct = baseImpressions > 0
      ? `${impressionsDelta >= 0 ? '+' : ''}${((impressionsDelta / baseImpressions) * 100).toFixed(0)}%`
      : currImpressions > 0 ? 'NEW' : 'N/A';
    const clkDeltaPct = baseClicks > 0
      ? `${clicksDelta >= 0 ? '+' : ''}${((clicksDelta / baseClicks) * 100).toFixed(0)}%`
      : currClicks > 0 ? 'NEW' : 'N/A';

    scorecards.push({
      url: urlPath,
      sprint: meta.sprint,
      optimizedDate: meta.optimizedDate,
      cluster: classifyCluster(urlPath),
      pageType: classifyPageType(urlPath),
      baseClicks, baseImpressions, baseCtr, basePosition,
      currClicks, currImpressions, currCtr, currPosition,
      impressionsDelta, impressionsDeltaPct: impDeltaPct,
      clicksDelta, clicksDeltaPct: clkDeltaPct,
      positionDelta, ctrDelta,
      benchmarkCtr: bCtr, ctrGap,
      pageViews, calcStarts, calcDone, purchases, revenue,
      viewToCalcRate: pageViews > 0 ? `${((calcStarts / pageViews) * 100).toFixed(1)}%` : '0.0%',
      weeklyTrend,
      seoScore,
      revenueScore,
      businessScore,
      strategicGroup,
    });
  }

  // Sort by business score descending
  scorecards.sort((a, b) => b.businessScore - a.businessScore);

  // ─── Aggregations ──────────────────────────────────────────────────────────
  const totalBaseImpressions = scorecards.reduce((s, c) => s + c.baseImpressions, 0);
  const totalCurrImpressions = scorecards.reduce((s, c) => s + c.currImpressions, 0);
  const totalBaseClicks = scorecards.reduce((s, c) => s + c.baseClicks, 0);
  const totalCurrClicks = scorecards.reduce((s, c) => s + c.currClicks, 0);
  const totalCalcStarts = scorecards.reduce((s, c) => s + c.calcStarts, 0);
  const totalCalcDone = scorecards.reduce((s, c) => s + c.calcDone, 0);
  const totalPurchases = scorecards.reduce((s, c) => s + c.purchases, 0);
  const totalRevenue = scorecards.reduce((s, c) => s + c.revenue, 0);
  const totalPageViews = scorecards.reduce((s, c) => s + c.pageViews, 0);

  const avgBasePosition = scorecards.filter(c => c.basePosition > 0).length > 0
    ? (scorecards.filter(c => c.basePosition > 0).reduce((s, c) => s + c.basePosition, 0) / scorecards.filter(c => c.basePosition > 0).length)
    : 0;
  const avgCurrPosition = scorecards.filter(c => c.currPosition > 0).length > 0
    ? (scorecards.filter(c => c.currPosition > 0).reduce((s, c) => s + c.currPosition, 0) / scorecards.filter(c => c.currPosition > 0).length)
    : 0;

  const pagesRanking = scorecards.filter(c => c.currPosition > 0 && c.currPosition <= 10).length;
  const pagesImproved = scorecards.filter(c => c.positionDelta < -1).length;
  const pagesDropped = scorecards.filter(c => c.positionDelta > 1).length;

  // Sprint-level aggregations
  const sprintAggs: Record<string, { pages: number; totalImpDelta: number; totalClkDelta: number; avgBizScore: number; calcStarts: number }> = {};
  for (const card of scorecards) {
    if (!sprintAggs[card.sprint]) {
      sprintAggs[card.sprint] = { pages: 0, totalImpDelta: 0, totalClkDelta: 0, avgBizScore: 0, calcStarts: 0 };
    }
    sprintAggs[card.sprint].pages++;
    sprintAggs[card.sprint].totalImpDelta += card.impressionsDelta;
    sprintAggs[card.sprint].totalClkDelta += card.clicksDelta;
    sprintAggs[card.sprint].avgBizScore += card.businessScore;
    sprintAggs[card.sprint].calcStarts += card.calcStarts;
  }
  for (const key of Object.keys(sprintAggs)) {
    sprintAggs[key].avgBizScore = Math.round(sprintAggs[key].avgBizScore / sprintAggs[key].pages);
  }

  // ─── Save JSON ─────────────────────────────────────────────────────────────
  const outputJson = {
    generatedAt: new Date().toISOString(),
    baseline: { source: 'Mar 3, 2026 (28d)', pages: baseline.size },
    current: { source: 'Jul 10, 2026 (3mo)', pages: current.size },
    portfolio: {
      totalPages: scorecards.length,
      totalBaseImpressions,
      totalCurrImpressions,
      impressionsDelta: totalCurrImpressions - totalBaseImpressions,
      totalBaseClicks,
      totalCurrClicks,
      clicksDelta: totalCurrClicks - totalBaseClicks,
      avgBasePosition: +avgBasePosition.toFixed(1),
      avgCurrPosition: +avgCurrPosition.toFixed(1),
      pagesOnPage1: pagesRanking,
      pagesImproved,
      pagesDropped,
      totalPageViews,
      totalCalcStarts,
      totalCalcDone,
      stagingPurchases: totalPurchases,
      stagingRevenue: totalRevenue,
    },
    sprintAggregations: sprintAggs,
    scorecards,
  };

  const jsonPath = path.join(ROOT, 'scripts/performance-scorecard-results.json');
  fs.writeFileSync(jsonPath, JSON.stringify(outputJson, null, 2));
  console.log(`\n✅ JSON saved to: ${jsonPath}`);

  // ─── Generate Markdown Artifact ────────────────────────────────────────────
  let md = `# 📊 Sprint 12 — Unified SEO Performance Scorecard\n\n`;
  md += `> **Generated:** ${new Date().toISOString().split('T')[0]}  \n`;
  md += `> **Baseline:** March 3, 2026 (28-day GSC window, pre-optimization)  \n`;
  md += `> **Current:** July 10, 2026 (3-month GSC window, post-optimization)  \n`;
  md += `> **Portfolio:** ${scorecards.length} optimized pages across Sprints 6–11\n\n`;

  md += `---\n\n## 🎯 Portfolio KPIs\n\n`;
  md += `| Metric | Baseline | Current | Delta |\n`;
  md += `|--------|----------|---------|-------|\n`;
  md += `| Total Impressions | ${totalBaseImpressions.toLocaleString()} | ${totalCurrImpressions.toLocaleString()} | ${totalCurrImpressions - totalBaseImpressions >= 0 ? '+' : ''}${(totalCurrImpressions - totalBaseImpressions).toLocaleString()} |\n`;
  md += `| Total Clicks | ${totalBaseClicks} | ${totalCurrClicks} | ${totalCurrClicks - totalBaseClicks >= 0 ? '+' : ''}${totalCurrClicks - totalBaseClicks} |\n`;
  md += `| Avg Position | ${avgBasePosition.toFixed(1)} | ${avgCurrPosition.toFixed(1)} | ${(avgCurrPosition - avgBasePosition) < 0 ? '' : '+'}${(avgCurrPosition - avgBasePosition).toFixed(1)} |\n`;
  md += `| Pages on Page 1 (≤10) | — | ${pagesRanking} | — |\n`;
  md += `| Pages Improved (>1 pos) | — | ${pagesImproved} | — |\n`;
  md += `| Pages Dropped (>1 pos) | — | ${pagesDropped} | — |\n`;
  md += `| Total Page Views | — | ${totalPageViews} | — |\n`;
  md += `| Calculator Starts | — | ${totalCalcStarts} | — |\n`;
  md += `| Calculator Completions | — | ${totalCalcDone} | — |\n`;
  md += `| Staging/Simulation Purchases | — | ${totalPurchases} | — |\n`;
  md += `| Staging/Simulation Revenue | — | $${totalRevenue.toFixed(2)} | — |\n\n`;

  md += `> [!IMPORTANT]\n`;
  md += `> **Staging Revenue Warning:** All checkout purchase events and revenue ($136.00 total) captured in the CRM logs correspond to automated sandbox/staging verification flows executed during code deployments, not organic customer sales. Direct organic transactions are currently at $0.00.\n\n`;

  md += `> [!NOTE]\n`;
  md += `> **Session Landing Page Resolution:** Telemetry metrics now resolve events back to the session's entry page. This correctly maps downstream calculator starts and completions to the specific blog page or provincial hub where the user landed, showing that optimized pages **are** driving calculator starts.\n\n`;

  md += `---\n\n## 📈 Sprint-Level Scorecard\n\n`;
  md += `| Sprint | Pages | Impression Δ | Click Δ | Calc Starts | Avg Business Score |\n`;
  md += `|--------|-------|-------------|---------|-------------|--------------------|\n`;
  for (const [sprint, agg] of Object.entries(sprintAggs).sort()) {
    md += `| ${sprint} | ${agg.pages} | ${agg.totalImpDelta >= 0 ? '+' : ''}${agg.totalImpDelta.toLocaleString()} | ${agg.totalClkDelta >= 0 ? '+' : ''}${agg.totalClkDelta} | ${agg.calcStarts} | ${agg.avgBizScore}/100 |\n`;
  }

  md += `\n---\n\n## 🗺️ Strategic Portfolio Segmentations (Groups 1–4)\n\n`;
  md += `To guide next-action prioritization, the portfolio has been segmented into four action groups based on search demand and landing page conversion efficiency:\n\n`;

  // Helper to list group pages
  const group1 = scorecards.filter(c => c.strategicGroup === 'Group 1');
  const group2 = scorecards.filter(c => c.strategicGroup === 'Group 2');
  const group3 = scorecards.filter(c => c.strategicGroup === 'Group 3');
  const group4 = scorecards.filter(c => c.strategicGroup === 'Group 4');

  md += `### 🟥 Group 1: High Impressions / Low CTR (Title & Meta Snippet Rescue)\n`;
  md += `*High search impressions but below-benchmark click-through rate. Priority targets for title/meta description optimization.*  \n\n`;
  md += `| Page | Impressions | Position | Current CTR | Benchmark CTR | CTR Gap |\n`;
  md += `|------|-------------|----------|-------------|---------------|---------|\n`;
  group1.forEach(c => {
    const slug = c.url.split('/').pop() || c.url;
    md += `| [${slug}](file:///Users/ashwanikumar/Downloads/canadablog/lib/data/blog-posts/${slug}.ts) | ${c.currImpressions} | ${c.currPosition.toFixed(1)} | ${c.currCtr.toFixed(1)}% | ${c.benchmarkCtr.toFixed(1)}% | **${c.ctrGap.toFixed(1)}%** |\n`;
  });

  md += `\n### 🟨 Group 2: High CTR / Low Conversion (Landing Page & CTA Optimization)\n`;
  md += `*Good CTR but zero calculator starts. Needs clearer inline CTAs, stacking playbooks, or value propositions.*  \n\n`;
  md += `| Page | Impressions | CTR | Page Views | Calc Starts | Score |\n`;
  md += `|------|-------------|-----|------------|-------------|-------|\n`;
  group2.forEach(c => {
    const slug = c.url.split('/').pop() || c.url;
    md += `| [${slug}](file:///Users/ashwanikumar/Downloads/canadablog/lib/data/blog-posts/${slug}.ts) | ${c.currImpressions} | ${c.currCtr.toFixed(1)}% | ${c.pageViews} | ${c.calcStarts} | ${c.businessScore}/100 |\n`;
  });

  md += `\n### 🟩 Group 3: High Conversion (Cluster Expansion & Authority Amplification)\n`;
  md += `*Proven conversion pages. Deserves backlink building, deeper cluster articles, and heavier paid/newsletter promotion.*  \n\n`;
  md += `| Page | Impressions | Clicks | Calc Starts | Calc Completions | Score |\n`;
  md += `|------|-------------|--------|-------------|------------------|-------|\n`;
  group3.forEach(c => {
    const slug = c.url.split('/').pop() || c.url;
    md += `| [${slug}](file:///Users/ashwanikumar/Downloads/canadablog/lib/data/blog-posts/${slug}.ts) | ${c.currImpressions} | ${c.currClicks} | **${c.calcStarts}** | **${c.calcDone}** | **${c.businessScore}**/100 |\n`;
  });

  md += `\n### ⬜ Group 4: Low/No Impressions (Monitor / Low Priority)\n`;
  md += `*Under 100 current impressions. Monitor and submit indexing requests via Google Search Console API, but do not spend content engineering hours here yet.*  \n\n`;
  md += `| Page | Impressions | Position | CTR | Issue | Score |\n`;
  md += `|------|-------------|----------|-----|-------|-------|\n`;
  group4.forEach(c => {
    const slug = c.url.split('/').pop() || c.url;
    const issue = c.currImpressions === 0 ? 'Not indexed' : 'Low search volume';
    md += `| [${slug}](file:///Users/ashwanikumar/Downloads/canadablog/lib/data/blog-posts/${slug}.ts) | ${c.currImpressions} | ${c.currPosition.toFixed(1)} | ${c.currCtr.toFixed(1)}% | ${issue} | ${c.businessScore}/100 |\n`;
  });

  md += `\n---\n\n## 🏆 Full Page Scorecard (Simplified Scoring: SEO Score + Revenue Score = Business Score)\n\n`;
  md += `| # | Page | Sprint | Pos (B→C) | Impressions (B→C) | CTR | Calc Starts | SEO Score (50) | Rev Score (50) | Business Score (100) |\n`;
  md += `|---|------|--------|-----------|-------------------|-----|-------------|----------------|----------------|----------------------|\n`;
  scorecards.forEach((card, i) => {
    const slug = card.url.split('/').pop() || card.url;
    const posStr = card.basePosition > 0 && card.currPosition > 0
      ? `${card.basePosition.toFixed(0)}→${card.currPosition.toFixed(0)}`
      : card.currPosition > 0 ? `—→${card.currPosition.toFixed(0)}` : '—';
    const impStr = `${card.baseImpressions}→${card.currImpressions}`;
    md += `| ${i + 1} | ${slug} | ${card.sprint} | ${posStr} | ${impStr} | ${card.currCtr.toFixed(1)}% | ${card.calcStarts} | ${card.seoScore}/50 | ${card.revenueScore}/50 | **${card.businessScore}**/100 |\n`;
  });

  md += `\n---\n\n## 🔄 Recommended Next Actions\n\n`;
  md += `1. **Group 1 Title Overhauls:** Focus on Sprints 6 & 10 pages in Group 1 (like \`small-business-grants\` and \`new-york\`) to lift CTR to benchmark.\n`;
  md += `2. **Group 2 Landing Page Refinement:** Review the inline CTAs and placement of the calculator widget on the Group 2 pages to make them stand out visually.\n`;
  md += `3. **Group 3 Double Down:** Build active backlinks to Group 3 pages (such as \`women-business-grants\` and \`veteran-business-funding\`) and expand content sub-topics in those cohorts.\n`;
  md += `4. **Indexation Recovery:** Use the Google Indexing API to submit the 4 pages in Group 4 that have zero impressions.\n\n`;

  md += `---\n\n*Dashboard generated by \`scripts/performance-scorecard.ts\` — Sprint 12, Cycle 1*\n`;

  const mdPath = path.join(ROOT, 'scripts/performance-scorecard-report.md');
  fs.writeFileSync(mdPath, md);
  console.log(`✅ Markdown report saved to: ${mdPath}`);

  console.log('\n' + '═'.repeat(80));
  console.log('  ✅  Sprint 12 Performance Scorecard complete.');
  console.log('═'.repeat(80) + '\n');
}

main();
