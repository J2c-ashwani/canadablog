import fs from 'fs';
import path from 'path';

const GSC_DIR = path.join(process.cwd(), 'fsidigital.ca-Performance-on-Search-2026-07-30');

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let value = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i], n = line[i + 1];
    if (c === '"' && n === '"') { value += '"'; i++; continue; }
    if (c === '"') { inQuotes = !inQuotes; continue; }
    if (c === ',' && !inQuotes) { values.push(value); value = ''; continue; }
    value += c;
  }
  values.push(value);
  return values;
}

function readCsv(filePath: string): any[] {
  if (!fs.existsSync(filePath)) return [];
  let content = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  const lines = content.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]).map(h => h.trim());
  return lines.slice(1).map(line => {
    const vals = parseCsvLine(line);
    return Object.fromEntries(headers.map((h, i) => [h, vals[i] || '']));
  });
}

function num(v: any): number {
  return Number(String(v || '0').replace(/[%,$]/g, '').replace(/,/g, '')) || 0;
}

// === CHART: Daily split ===
const chart = readCsv(path.join(GSC_DIR, 'Chart.csv'));
const midpoint = '2026-07-14'; // First 14 days: Jun 30 - Jul 13. Last 14 days: Jul 14 - Jul 27

const period1 = chart.filter(r => r.Date < midpoint);
const period2 = chart.filter(r => r.Date >= midpoint);

const sum = (arr: any[], field: string) => arr.reduce((s, r) => s + num(r[field]), 0);
const avg = (arr: any[], field: string) => arr.length > 0 ? sum(arr, field) / arr.length : 0;

console.log('=================================================================');
console.log('  FSI DIGITAL — GSC 28-DAY SPLIT ANALYSIS (Jun 30 – Jul 27)');
console.log('  Period 1 (Pre-Optimization): Jun 30 – Jul 13 (14 days)');
console.log('  Period 2 (Post-Optimization + Content Freeze): Jul 14 – Jul 27 (14 days)');
console.log('=================================================================\n');

const p1Clicks = sum(period1, 'Clicks');
const p2Clicks = sum(period2, 'Clicks');
const p1Imp = sum(period1, 'Impressions');
const p2Imp = sum(period2, 'Impressions');
const p1AvgCtr = avg(period1, 'CTR');
const p2AvgCtr = avg(period2, 'CTR');
const p1AvgPos = avg(period1, 'Position');
const p2AvgPos = avg(period2, 'Position');

const clicksChange = ((p2Clicks - p1Clicks) / p1Clicks * 100).toFixed(1);
const impChange = ((p2Imp - p1Imp) / p1Imp * 100).toFixed(1);

console.log('📊 AGGREGATE COMPARISON');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`| Metric             | Period 1 (Pre) | Period 2 (Post) | Change |`);
console.log(`|---|---|---|---|`);
console.log(`| Total Clicks       | ${p1Clicks} | ${p2Clicks} | ${Number(clicksChange) > 0 ? '+' : ''}${clicksChange}% |`);
console.log(`| Total Impressions  | ${p1Imp.toLocaleString()} | ${p2Imp.toLocaleString()} | ${Number(impChange) > 0 ? '+' : ''}${impChange}% |`);
console.log(`| Avg Daily CTR      | ${p1AvgCtr.toFixed(2)}% | ${p2AvgCtr.toFixed(2)}% | ${(p2AvgCtr - p1AvgCtr) > 0 ? '+' : ''}${(p2AvgCtr - p1AvgCtr).toFixed(2)}pp |`);
console.log(`| Avg Position       | ${p1AvgPos.toFixed(1)} | ${p2AvgPos.toFixed(1)} | ${(p2AvgPos - p1AvgPos) > 0 ? '+' : ''}${(p2AvgPos - p1AvgPos).toFixed(1)} |`);
console.log(`| Avg Clicks/Day     | ${(p1Clicks / 14).toFixed(1)} | ${(p2Clicks / 14).toFixed(1)} | ${((p2Clicks/14 - p1Clicks/14) / (p1Clicks/14) * 100).toFixed(1)}% |`);
console.log(`| Avg Impr/Day       | ${(p1Imp / 14).toFixed(0)} | ${(p2Imp / 14).toFixed(0)} | ${((p2Imp/14 - p1Imp/14) / (p1Imp/14) * 100).toFixed(1)}% |`);

console.log('\n📈 DAILY TRAFFIC BREAKDOWN');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('| Date       | Clicks | Impressions | CTR    | Avg Position | Period |');
console.log('|---|---|---|---|---|---|');

for (const row of chart) {
  const period = row.Date < midpoint ? 'Pre-Opt' : '**Post-Opt**';
  console.log(`| ${row.Date} | ${row.Clicks} | ${row.Impressions} | ${row.CTR} | ${row.Position} | ${period} |`);
}

// === PAGES: Build per-page period comparison ===
// We need to compare pages across the two periods
// Since GSC CSV gives aggregate data, we'll use Pages.csv to get the 28-day aggregate
// and cross-reference with the previous GSC export for delta analysis

const pages = readCsv(path.join(GSC_DIR, 'Pages.csv'));

console.log('\n\n📊 TOP 30 PAGES — 28-DAY AGGREGATE');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('| # | URL Path | Clicks | Impressions | CTR | Avg Pos |');
console.log('|---|---|---|---|---|---|');

const sortedPages = pages.sort((a: any, b: any) => num(b.Clicks) - num(a.Clicks));
sortedPages.slice(0, 30).forEach((row: any, i: number) => {
  const url = (row['Top pages'] || '').replace('https://www.fsidigital.ca', '') || '/';
  console.log(`| ${i + 1} | \`${url}\` | ${row.Clicks} | ${row.Impressions} | ${row.CTR} | ${row.Position} |`);
});

// === COMPARE with previous GSC export (3monthGSCdata) for page-level delta ===
const prevDir = path.join(process.cwd(), '3monthGSCdata');
const prevPages = readCsv(path.join(prevDir, 'Pages.csv'));
const prevMap = new Map<string, any>();
for (const row of prevPages) {
  const url = (row['Top pages'] || '').replace('https://www.fsidigital.ca', '') || '/';
  prevMap.set(url, row);
}

// Identify pages that were likely optimized (RDE / commercial engine optimization)
// We look for pages that had significant click/impression changes
interface PageDelta {
  url: string;
  prevClicks: number;
  currClicks: number;
  clicksDelta: number;
  prevImpressions: number;
  currImpressions: number;
  impDelta: number;
  prevPosition: number;
  currPosition: number;
  posDelta: number;
  prevCtr: number;
  currCtr: number;
  ctrDelta: number;
}

const pageDeltas: PageDelta[] = [];

for (const row of sortedPages) {
  const url = (row['Top pages'] || '').replace('https://www.fsidigital.ca', '') || '/';
  const prev = prevMap.get(url);
  
  const currClicks = num(row.Clicks);
  const currImp = num(row.Impressions);
  const currCtr = num(row.CTR);
  const currPos = num(row.Position);
  
  const prevClicks = prev ? num(prev.Clicks) : 0;
  const prevImp = prev ? num(prev.Impressions) : 0;
  const prevCtr = prev ? num(prev.CTR) : 0;
  const prevPos = prev ? num(prev.Position) : 0;
  
  pageDeltas.push({
    url,
    prevClicks,
    currClicks,
    clicksDelta: currClicks - prevClicks,
    prevImpressions: prevImp,
    currImpressions: currImp,
    impDelta: currImp - prevImp,
    prevPosition: prevPos,
    currPosition: currPos,
    posDelta: currPos - prevPos, // negative = improved
    prevCtr: prevCtr,
    currCtr: currCtr,
    ctrDelta: currCtr - prevCtr,
  });
}

console.log('\n\n📊 BIGGEST WINNERS (Pages that Gained Clicks vs 3-Month Baseline)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('| URL Path | Prev Clicks | Curr Clicks | Δ Clicks | Prev Pos | Curr Pos | Δ Pos |');
console.log('|---|---|---|---|---|---|---|');

const winners = pageDeltas.filter(p => p.clicksDelta > 0).sort((a, b) => b.clicksDelta - a.clicksDelta);
for (const p of winners.slice(0, 15)) {
  const posIcon = p.posDelta < 0 ? '🟢' : p.posDelta > 0 ? '🔴' : '⚪';
  console.log(`| \`${p.url}\` | ${p.prevClicks} | ${p.currClicks} | **+${p.clicksDelta}** | ${p.prevPosition.toFixed(1)} | ${p.currPosition.toFixed(1)} | ${posIcon} ${p.posDelta > 0 ? '+' : ''}${p.posDelta.toFixed(1)} |`);
}

console.log('\n\n📊 BIGGEST LOSERS (Pages that Lost Clicks vs 3-Month Baseline)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('| URL Path | Prev Clicks | Curr Clicks | Δ Clicks | Prev Pos | Curr Pos | Δ Pos |');
console.log('|---|---|---|---|---|---|---|');

const losers = pageDeltas.filter(p => p.clicksDelta < 0).sort((a, b) => a.clicksDelta - b.clicksDelta);
for (const p of losers.slice(0, 15)) {
  const posIcon = p.posDelta < 0 ? '🟢' : p.posDelta > 0 ? '🔴' : '⚪';
  console.log(`| \`${p.url}\` | ${p.prevClicks} | ${p.currClicks} | **${p.clicksDelta}** | ${p.prevPosition.toFixed(1)} | ${p.currPosition.toFixed(1)} | ${posIcon} ${p.posDelta > 0 ? '+' : ''}${p.posDelta.toFixed(1)} |`);
}

// NEW PAGES (appeared in current but not in previous)
const newPages = pageDeltas.filter(p => p.prevClicks === 0 && p.currClicks > 0)
  .sort((a, b) => b.currClicks - a.currClicks);

if (newPages.length > 0) {
  console.log('\n\n📊 NEW PAGES (Appeared in Last 28 Days, Not in Previous 3-Month Export)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('| URL Path | Clicks | Impressions | CTR | Position |');
  console.log('|---|---|---|---|---|');
  for (const p of newPages.slice(0, 20)) {
    const row = pages.find((r: any) => (r['Top pages'] || '').replace('https://www.fsidigital.ca', '') === p.url);
    if (row) {
      console.log(`| \`${p.url}\` | ${row.Clicks} | ${row.Impressions} | ${row.CTR} | ${row.Position} |`);
    }
  }
}

// POSITION IMPROVERS (pages that moved up in ranking)
const posImprovers = pageDeltas.filter(p => p.prevPosition > 0 && p.posDelta < -2 && p.currImpressions > 50)
  .sort((a, b) => a.posDelta - b.posDelta);

console.log('\n\n📊 BIGGEST POSITION IMPROVEMENTS (Moved Up 2+ Positions, >50 Impressions)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('| URL Path | Prev Pos | Curr Pos | Δ Pos | Impressions | Clicks |');
console.log('|---|---|---|---|---|---|');
for (const p of posImprovers.slice(0, 15)) {
  console.log(`| \`${p.url}\` | ${p.prevPosition.toFixed(1)} | ${p.currPosition.toFixed(1)} | 🟢 **${p.posDelta.toFixed(1)}** | ${p.currImpressions} | ${p.currClicks} |`);
}

// POSITION DECLINERS
const posDecliners = pageDeltas.filter(p => p.prevPosition > 0 && p.posDelta > 2 && p.currImpressions > 50)
  .sort((a, b) => b.posDelta - a.posDelta);

console.log('\n\n📊 BIGGEST POSITION DECLINES (Dropped 2+ Positions, >50 Impressions)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('| URL Path | Prev Pos | Curr Pos | Δ Pos | Impressions | Clicks |');
console.log('|---|---|---|---|---|---|');
for (const p of posDecliners.slice(0, 15)) {
  console.log(`| \`${p.url}\` | ${p.prevPosition.toFixed(1)} | ${p.currPosition.toFixed(1)} | 🔴 **+${p.posDelta.toFixed(1)}** | ${p.currImpressions} | ${p.currClicks} |`);
}

// QUERIES Analysis
const queries = readCsv(path.join(GSC_DIR, 'Queries.csv'));

console.log('\n\n📊 TOP 30 SEARCH QUERIES (28-Day Period)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('| # | Query | Clicks | Impressions | CTR | Position | Commercial? |');
console.log('|---|---|---|---|---|---|---|');

const commercialTerms = ['grant', 'fund', 'loan', 'business', 'startup', 'women', 'veteran', 'indigenous', 'apply', 'eligib'];
const sortedQueries = queries.sort((a: any, b: any) => num(b.Impressions) - num(a.Impressions));

sortedQueries.slice(0, 30).forEach((row: any, i: number) => {
  const query = row['Top queries'] || '';
  const isCommercial = commercialTerms.some(t => query.toLowerCase().includes(t));
  console.log(`| ${i + 1} | ${query} | ${row.Clicks} | ${row.Impressions} | ${row.CTR} | ${row.Position} | ${isCommercial ? '💰 Yes' : '—'} |`);
});

// HIGH IMPRESSION LOW CLICK OPPORTUNITIES
console.log('\n\n📊 CTR OPTIMIZATION OPPORTUNITIES (>50 Impressions, 0 Clicks)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('| Query | Impressions | Position | Opportunity |');
console.log('|---|---|---|---|');

const ctrOpps = queries.filter((r: any) => num(r.Clicks) === 0 && num(r.Impressions) >= 50)
  .sort((a: any, b: any) => num(b.Impressions) - num(a.Impressions));

for (const row of ctrOpps.slice(0, 20)) {
  const query = row['Top queries'] || '';
  const pos = num(row.Position);
  const imp = num(row.Impressions);
  let opp = 'Optimize meta title/description';
  if (pos > 20 && pos <= 40) opp = 'Content refresh + internal linking';
  if (pos > 40) opp = 'Deep content rewrite needed';
  if (pos <= 10) opp = '🔥 Quick win — fix title/description only';
  console.log(`| ${query} | ${imp} | ${pos.toFixed(1)} | ${opp} |`);
}

// SUMMARY VERDICT
console.log('\n\n=================================================================');
console.log('  OPTIMIZATION IMPACT VERDICT');
console.log('=================================================================');
const clicksDir = Number(clicksChange) > 0 ? '📈 UP' : '📉 DOWN';
const impDir = Number(impChange) > 0 ? '📈 UP' : '📉 DOWN';
console.log(`Clicks: ${clicksDir} ${clicksChange}% (${p1Clicks} → ${p2Clicks})`);
console.log(`Impressions: ${impDir} ${impChange}% (${p1Imp.toLocaleString()} → ${p2Imp.toLocaleString()})`);
console.log(`CTR: ${p1AvgCtr.toFixed(2)}% → ${p2AvgCtr.toFixed(2)}% (${(p2AvgCtr - p1AvgCtr) > 0 ? '+' : ''}${(p2AvgCtr - p1AvgCtr).toFixed(2)} percentage points)`);
console.log(`Avg Position: ${p1AvgPos.toFixed(1)} → ${p2AvgPos.toFixed(1)} (${(p2AvgPos - p1AvgPos) > 0 ? 'worse by' : 'improved by'} ${Math.abs(p2AvgPos - p1AvgPos).toFixed(1)} positions)`);
console.log('=================================================================');
