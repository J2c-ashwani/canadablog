#!/usr/bin/env node
// scripts/weighted-query-impact.js
// Impression-weighted SEO query impact dashboard
// Compares: Baseline (Jun 28) → Week 1 (Jul 2) → Week 2 (Jul 9)
// Formula: Weighted Impact = Peak Impressions × |Position Delta|

const fs = require('fs');
const path = require('path');

// ── Config ─────────────────────────────────────────────────────────────────
const DOWNLOADS = '/Users/ashwanikumar/Downloads';
const CANADABLOG = path.join(DOWNLOADS, 'canadablog');

const WINDOWS = [
  {
    label: 'Baseline (Jun 28)',
    key: 'jun28',
    dir: path.join(CANADABLOG, 'fsidigital.ca-Performance-on-Search-2026-06-28'),
  },
  {
    label: 'Week 1 (Jul 2)',
    key: 'jul02',
    dir: path.join(CANADABLOG, 'fsidigital.ca-Performance-on-Search-2026-07-02'),
  },
  {
    label: 'Week 2 (Jul 9)',
    key: 'jul09',
    dir: path.join(DOWNLOADS, 'fsidigital.ca-Performance-on-Search-2026-07-09'),
  },
];

// Minimum impressions to include in dashboard (filter noise)
const MIN_IMPRESSIONS = 2;

// ── CSV Parser ──────────────────────────────────────────────────────────────
function parseCsv(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  const lines = raw.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const cols = line.split(',');
    const obj = {};
    headers.forEach((h, i) => { obj[h] = (cols[i] || '').trim(); });
    return obj;
  });
}

function num(v) {
  return parseFloat(String(v || '0').replace(/[%,]/g, '')) || 0;
}

// ── Load all query windows ──────────────────────────────────────────────────
const windowData = {};
for (const w of WINDOWS) {
  const rows = parseCsv(path.join(w.dir, 'Queries.csv'));
  windowData[w.key] = {};
  for (const row of rows) {
    const query = (row['Top queries'] || row['Query'] || '').toLowerCase().trim();
    if (!query) continue;
    windowData[w.key][query] = {
      clicks:      num(row['Clicks']),
      impressions: num(row['Impressions']),
      ctr:         num(row['CTR']),
      position:    num(row['Position']),
    };
  }
}

// ── Merge all unique queries ────────────────────────────────────────────────
const allQueries = new Set([
  ...Object.keys(windowData.jun28),
  ...Object.keys(windowData.jul02),
  ...Object.keys(windowData.jul09),
]);

// ── Build weighted impact table ─────────────────────────────────────────────
const rows = [];

for (const query of allQueries) {
  const base = windowData.jun28[query];
  const wk1  = windowData.jul02[query];
  const wk2  = windowData.jul09[query];

  // Use the first window where this query appears as baseline
  const baselinePos = base?.position ?? wk1?.position ?? null;
  const currentPos  = wk2?.position ?? wk1?.position ?? null;

  if (baselinePos === null || currentPos === null) continue;

  // Peak impressions across all windows (best signal of true demand)
  const peakImpressions = Math.max(
    base?.impressions ?? 0,
    wk1?.impressions ?? 0,
    wk2?.impressions ?? 0,
  );

  if (peakImpressions < MIN_IMPRESSIONS) continue;

  // Position delta: negative = IMPROVED (moved up), positive = DROPPED
  const posDelta = currentPos - baselinePos;

  // Weighted impact score (absolute value × impressions)
  // Positive score = page ROSE on an important query (good)
  // Negative score = page DROPPED on an important query (bad)
  const weightedImpact = Math.round(peakImpressions * (-posDelta));

  // Current clicks (latest window)
  const currentClicks = wk2?.clicks ?? wk1?.clicks ?? 0;

  // Status
  let status = '→ Stable';
  if (posDelta <= -3)       status = '🚀 Rising';
  else if (posDelta <= -1)  status = '↗ Improving';
  else if (posDelta >= 5)   status = '⚠️  Dropped';
  else if (posDelta >= 2)   status = '↘ Drifting';

  // New query flag
  const isNew = !base && (wk1 || wk2);
  if (isNew) status = '🆕 New';

  rows.push({
    query,
    baselinePos: baselinePos.toFixed(1),
    currentPos:  currentPos.toFixed(1),
    posDelta:    posDelta.toFixed(1),
    peakImpressions,
    currentClicks,
    weightedImpact,
    status,
    isNew: !!isNew,
  });
}

// Sort by weighted impact descending (best movers first)
rows.sort((a, b) => b.weightedImpact - a.weightedImpact);

// ── Tier labels ─────────────────────────────────────────────────────────────
function impactLabel(score, impressions) {
  const abs = Math.abs(score);
  if (impressions >= 200 && abs >= 1000) return 'CRITICAL';
  if (abs >= 500)  return 'Very High';
  if (abs >= 200)  return 'High';
  if (abs >= 50)   return 'Medium';
  return 'Low';
}

// ── Output ──────────────────────────────────────────────────────────────────
const COL = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red:   '\x1b[31m',
  yellow:'\x1b[33m',
  cyan:  '\x1b[36m',
  bold:  '\x1b[1m',
  dim:   '\x1b[2m',
};

function color(text, c) { return `${c}${text}${COL.reset}`; }

console.log('\n' + color('═'.repeat(110), COL.bold));
console.log(color('  IMPRESSION-WEIGHTED QUERY IMPACT DASHBOARD', COL.bold));
console.log(color('  FSI Digital · Baseline (Jun 28) → Current (Jul 9)', COL.dim));
console.log(color('═'.repeat(110), COL.bold));
console.log(color(
  `  ${'Query'.padEnd(50)} ${'Base Pos'.padStart(9)} ${'Curr Pos'.padStart(9)} ${'Δ Pos'.padStart(7)} ${'Peak Impr'.padStart(10)} ${'Clicks'.padStart(7)} ${'Impact'.padStart(10)}  Status`,
  COL.bold,
));
console.log(color('─'.repeat(110), COL.dim));

// Split into gainers, losers, new
const gainers  = rows.filter(r => !r.isNew && parseFloat(r.posDelta) < 0);
const losers   = rows.filter(r => !r.isNew && parseFloat(r.posDelta) > 0);
const stable   = rows.filter(r => !r.isNew && parseFloat(r.posDelta) === 0);
const newRows  = rows.filter(r => r.isNew);

function printSection(label, sectionRows, labelColor) {
  if (!sectionRows.length) return;
  console.log('\n' + color(`  ── ${label} ──`, labelColor));
  for (const r of sectionRows) {
    const delta = parseFloat(r.posDelta);
    const impLabel = impactLabel(r.weightedImpact, r.peakImpressions);
    const impColor = r.weightedImpact > 0 ? COL.green : (r.weightedImpact < 0 ? COL.red : COL.dim);
    const deltaStr = delta < 0
      ? color(r.posDelta.padStart(7), COL.green)
      : delta > 0
        ? color(r.posDelta.padStart(7), COL.red)
        : r.posDelta.padStart(7);

    console.log(
      `  ${r.query.substring(0, 49).padEnd(50)} ` +
      `${r.baselinePos.padStart(9)} ` +
      `${r.currentPos.padStart(9)} ` +
      `${deltaStr} ` +
      `${String(r.peakImpressions).padStart(10)} ` +
      `${String(r.currentClicks).padStart(7)} ` +
      `${color(impLabel.padStart(10), impColor)}  ${r.status}`,
    );
  }
}

printSection('RISING — Position Improved', gainers, COL.green);
printSection('DROPPING — Position Declined', losers, COL.red);
printSection('STABLE — No Significant Change', stable, COL.dim);
printSection('NEW QUERIES — Not in Baseline', newRows, COL.cyan);

// ── Summary Stats ──────────────────────────────────────────────────────────
const totalWeightedGain = gainers.reduce((s, r) => s + r.weightedImpact, 0);
const totalWeightedLoss = losers.reduce((s, r) => s + Math.abs(r.weightedImpact), 0);
const netScore = totalWeightedGain - totalWeightedLoss;
const netColor = netScore >= 0 ? COL.green : COL.red;

console.log('\n' + color('─'.repeat(110), COL.dim));
console.log(color('  SUMMARY', COL.bold));
console.log(`  Total queries tracked:      ${rows.length}`);
console.log(`  Queries rising:             ${color(String(gainers.length), COL.green)}`);
console.log(`  Queries dropping:           ${color(String(losers.length), COL.red)}`);
console.log(`  New queries gained:         ${color(String(newRows.length), COL.cyan)}`);
console.log(`  Weighted gain score:        ${color(String(totalWeightedGain), COL.green)}`);
console.log(`  Weighted loss score:        ${color(String(totalWeightedLoss), COL.red)}`);
console.log(`  NET weighted impact score:  ${color(String(netScore), netColor)}`);
console.log(color('═'.repeat(110), COL.bold) + '\n');

// Also write JSON output for future programmatic use
const jsonOut = {
  generatedAt: new Date().toISOString(),
  windows: WINDOWS.map(w => w.label),
  summary: {
    totalQueries: rows.length,
    rising: gainers.length,
    dropping: losers.length,
    newQueries: newRows.length,
    weightedGainScore: totalWeightedGain,
    weightedLossScore: totalWeightedLoss,
    netWeightedImpact: netScore,
  },
  queries: rows,
};

const outPath = path.join(CANADABLOG, 'scripts', 'weighted-query-impact.json');
fs.writeFileSync(outPath, JSON.stringify(jsonOut, null, 2));
console.log(`  JSON saved → ${outPath}\n`);
