#!/usr/bin/env node
// scripts/cohort-impact-audit.js
// FSI Digital — Full SEO Cohort Impact Audit Engine
// Covers: Phase 0 (baseline) → Phase 1 (~50 pages) → Phase 2 (~180 pages) → Phase 3 (3-page deep)
// Outputs: JSON + console tables for all 10 audit parts

'use strict';
const fs   = require('fs');
const path = require('path');

// ─── Data Paths ─────────────────────────────────────────────────────────────
const ROOT      = '/Users/ashwanikumar/Downloads/canadablog';
const DOWNLOADS = '/Users/ashwanikumar/Downloads';

const GSC = {
  jun28: path.join(ROOT,      'fsidigital.ca-Performance-on-Search-2026-06-28'),
  jul02: path.join(ROOT,      'fsidigital.ca-Performance-on-Search-2026-07-02'),
  jul09: path.join(DOWNLOADS, 'fsidigital.ca-Performance-on-Search-2026-07-09'),
};

const SITE = 'https://www.fsidigital.ca';

// ─── Phase 3 known pages ─────────────────────────────────────────────────────
const PHASE3_PAGES = new Set([
  '/blog/nih-sbir-biotech-grants',
  '/blog/nsf-sbir-grants-technology-startups',
  '/usa/minnesota',
]);

// ─── CSV Parser ──────────────────────────────────────────────────────────────
function parseCsv(file) {
  if (!fs.existsSync(file)) return [];
  const raw   = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
  const lines = raw.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) return [];
  const hdrs  = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const vals = line.split(',');
    const obj  = {};
    hdrs.forEach((h, i) => { obj[h] = (vals[i] || '').trim(); });
    return obj;
  });
}
function num(v) { return parseFloat(String(v||'0').replace(/[%,]/g,'')) || 0; }
function urlPath(v) {
  try { return new URL(v).pathname.replace(/\/$/, '') || '/'; }
  catch { return String(v).replace(SITE,'').replace(/\/$/, '') || '/'; }
}

// ─── Classify Page Type ───────────────────────────────────────────────────────
function classifyPage(p) {
  if (/^\/usa\/[^/]+\/[^/]+/.test(p)) return 'usa-city';
  if (/^\/usa\/[^/]+$/.test(p))        return 'usa-state';
  if (/^\/grants\/province/.test(p))   return 'ca-province';
  if (/^\/grants\/industry/.test(p))   return 'industry';
  if (/^\/grants\/program/.test(p))    return 'program';
  if (/^\/compare\//.test(p))          return 'comparison';
  if (/^\/blog\//.test(p))             return 'blog';
  if (/^\/guides\//.test(p))           return 'guide';
  if (/^\/download\//.test(p))         return 'download';
  if (/^\/calculator/.test(p))         return 'tool';
  if (/^\/audit/.test(p))              return 'tool';
  if (/^\/booking/.test(p))            return 'booking';
  if (/^\/sample-report/.test(p))      return 'trust';
  if (/^\/testimonials/.test(p))       return 'trust';
  if (p === '/')                        return 'home';
  return 'other';
}

// ─── Revenue Potential Scoring ────────────────────────────────────────────────
// Intent signals
function commercialIntent(p, queries) {
  const highIntentPatterns = [
    /grant/i, /funding/i, /apply/i, /eligib/i, /program/i,
    /loan/i,  /credit/i, /startup/i, /sred/i, /irap/i,
  ];
  let score = 0;
  const combined = [p, ...(queries||[])].join(' ');
  highIntentPatterns.forEach(re => { if (re.test(combined)) score += 10; });
  return Math.min(score, 100);
}

function revenueOpportunityScore({ position, impressions, ctr, pageType, intentScore }) {
  // Position sweet spot: 5-15 = highest revenue potential (close to converting)
  let posScore = 0;
  if (position <= 5)        posScore = 40;
  else if (position <= 10)  posScore = 70;
  else if (position <= 15)  posScore = 50;
  else if (position <= 25)  posScore = 30;
  else                      posScore = 10;

  // Volume score
  const volScore = Math.min(impressions / 10, 30);

  // Type bonus
  const typeBonus = {
    'usa-state': 15, 'ca-province': 15, 'blog': 10,
    'industry': 12, 'guide': 8, 'comparison': 12,
    'tool': 20, 'program': 10, 'usa-city': 8,
  }[pageType] || 5;

  return Math.round(posScore + volScore + (intentScore * 0.2) + typeBonus);
}

// ─── Load all GSC page data ──────────────────────────────────────────────────
function loadPages(dir) {
  const rows = parseCsv(path.join(dir, 'Pages.csv'));
  const map  = {};
  rows.forEach(r => {
    const p = urlPath(r['Top pages'] || r['Page'] || Object.values(r)[0]);
    if (!p) return;
    map[p] = {
      clicks:      num(r['Clicks']),
      impressions: num(r['Impressions']),
      ctr:         num(r['CTR']),
      position:    num(r['Position']),
    };
  });
  return map;
}

function loadQueries(dir) {
  const rows = parseCsv(path.join(dir, 'Queries.csv'));
  return rows.map(r => ({
    query:       (r['Top queries'] || r['Query'] || '').toLowerCase().trim(),
    clicks:      num(r['Clicks']),
    impressions: num(r['Impressions']),
    ctr:         num(r['CTR']),
    position:    num(r['Position']),
  })).filter(r => r.query);
}

// ─── Load indexing history for phase assignment ───────────────────────────────
function loadPhases() {
  const hist = JSON.parse(fs.readFileSync(path.join(ROOT,'scripts/indexing-history.json'),'utf8'));
  // Phase heuristics from indexing dates:
  // Phase 0: pages NOT in indexing history (never explicitly reindexed)
  // Phase 1: first reindex batch — 2026-03-13 to 2026-04-17 (early rollout ~50-100 pages)
  // Phase 2: 2026-05-12 to 2026-05-17 (expanded rollout ~180+ pages)
  // Phase 3: 2026-06-27 to 2026-07-04 (recent reindex wave) + our 3 deep pages
  const phases = {};
  Object.entries(hist).forEach(([url, ts]) => {
    const p    = urlPath(url);
    const date = ts.substring(0,10);
    let phase  = 0;
    if (date >= '2026-03-13' && date <= '2026-04-17') phase = 1;
    else if (date >= '2026-05-12' && date <= '2026-05-17') phase = 2;
    else if (date >= '2026-06-27') phase = 3;
    if (PHASE3_PAGES.has(p)) phase = 3;
    phases[p] = phase;
  });
  return phases;
}

// ─── Query Classification ─────────────────────────────────────────────────────
function classifyQuery(q) {
  const cats = [];
  if (/grant|grants/.test(q))                cats.push('grant');
  if (/loan|financing|borrow/.test(q))        cats.push('loan');
  if (/tax credit|sred|r&d|r\+d/.test(q))    cats.push('tax-credit');
  if (/fund|funding/.test(q))                cats.push('funding');
  if (/innovat/.test(q))                     cats.push('innovation');
  if (/women|female|lady|ladies/.test(q))    cats.push('women');
  if (/veteran|military/.test(q))            cats.push('veteran');
  if (/startup|start-up/.test(q))            cats.push('startup');
  if (/manufactur|factory|industrial/.test(q)) cats.push('manufacturing');
  if (/tech|software|ai|digital|saas/.test(q)) cats.push('technology');
  if (/health|medical|biotech|pharma/.test(q)) cats.push('healthcare');
  if (/canada|ontario|quebec|alberta|bc|british columbia/.test(q)) cats.push('canada-regional');
  if (/usa|united states|\b[a-z]+ state\b|minnesota|texas|california/.test(q)) cats.push('usa-regional');
  if (/apply|eligib|qualify|how to|requirements/.test(q)) cats.push('commercial-intent');
  if (q.split(' ').length <= 2)              cats.push('head-term');
  else if (q.split(' ').length <= 4)         cats.push('mid-tail');
  else                                       cats.push('long-tail');
  return cats.length ? cats : ['other'];
}

// ─── Main Analysis ────────────────────────────────────────────────────────────
console.log('\n⏳  Loading GSC data across 3 windows...');
const pagesJun28 = loadPages(GSC.jun28);
const pagesJul02 = loadPages(GSC.jul02);
const pagesJul09 = loadPages(GSC.jul09);

const queriesJun28 = loadQueries(GSC.jun28);
const queriesJul02 = loadQueries(GSC.jul02);
const queriesJul09 = loadQueries(GSC.jul09);

const phaseMap = loadPhases();
console.log('✅  Data loaded. Building cohort analysis...\n');

// ─── All tracked pages (union across all windows) ─────────────────────────────
const allPages = new Set([
  ...Object.keys(pagesJun28),
  ...Object.keys(pagesJul02),
  ...Object.keys(pagesJul09),
]);

// ─── Per-page metrics ─────────────────────────────────────────────────────────
const pageStats = [];
for (const p of allPages) {
  const base = pagesJun28[p];
  const wk1  = pagesJul02[p];
  const wk2  = pagesJul09[p];
  if (!base && !wk1 && !wk2) continue;

  const basePos     = base?.position ?? wk1?.position ?? wk2?.position ?? 0;
  const currPos     = wk2?.position  ?? wk1?.position ?? base?.position ?? 0;
  const posDelta    = currPos - basePos;
  const peakImpr    = Math.max(base?.impressions??0, wk1?.impressions??0, wk2?.impressions??0);
  const currClicks  = wk2?.clicks  ?? wk1?.clicks  ?? base?.clicks  ?? 0;
  const currCtr     = wk2?.ctr     ?? wk1?.ctr     ?? base?.ctr     ?? 0;
  const baseCtr     = base?.ctr    ?? 0;
  const ctrDelta    = currCtr - baseCtr;
  const weightedImp = Math.round(peakImpr * (-posDelta));

  const phase    = phaseMap[p] ?? (PHASE3_PAGES.has(p) ? 3 : 0);
  const pageType = classifyPage(p);
  const intent   = commercialIntent(p, []);
  const revScore = revenueOpportunityScore({
    position: currPos, impressions: peakImpr,
    ctr: currCtr, pageType, intentScore: intent,
  });

  pageStats.push({
    page: p, phase, pageType,
    basePos, currPos, posDelta,
    peakImpr, currClicks, currCtr, baseCtr, ctrDelta,
    weightedImpact: weightedImp,
    intentScore: intent,
    revScore,
    isNew: !base && (wk1 || wk2),
    improved: posDelta < -1,
    dropped:  posDelta > 1,
  });
}

// ─── Query sets across windows ────────────────────────────────────────────────
const qMap = {};
queriesJun28.forEach(q => {
  if (!qMap[q.query]) qMap[q.query] = {};
  qMap[q.query].jun28 = q;
});
queriesJul02.forEach(q => {
  if (!qMap[q.query]) qMap[q.query] = {};
  qMap[q.query].jul02 = q;
});
queriesJul09.forEach(q => {
  if (!qMap[q.query]) qMap[q.query] = {};
  qMap[q.query].jul09 = q;
});

const queryStats = Object.entries(qMap).map(([query, windows]) => {
  const base = windows.jun28;
  const wk1  = windows.jul02;
  const wk2  = windows.jul09;
  const basePos  = base?.position ?? wk1?.position ?? wk2?.position ?? 0;
  const currPos  = wk2?.position  ?? wk1?.position ?? base?.position ?? 0;
  const posDelta = currPos - basePos;
  const peakImpr = Math.max(base?.impressions??0, wk1?.impressions??0, wk2?.impressions??0);
  const weighted = Math.round(peakImpr * (-posDelta));
  const cats     = classifyQuery(query);
  return {
    query, basePos, currPos, posDelta, peakImpr, weighted,
    isNew:    !base,
    isGained: !base && (wk1 || wk2),
    isLost:   base && !wk1 && !wk2,
    cats,
    clicks: wk2?.clicks ?? wk1?.clicks ?? base?.clicks ?? 0,
  };
});

// ─── COHORT SUMMARIES ─────────────────────────────────────────────────────────
function cohortSummary(pages) {
  if (!pages.length) return null;
  const n           = pages.length;
  const avgPosDelta = pages.reduce((s,p) => s + p.posDelta, 0) / n;
  const avgBasePos  = pages.reduce((s,p) => s + p.basePos,  0) / n;
  const avgCurrPos  = pages.reduce((s,p) => s + p.currPos,  0) / n;
  const totalImpr   = pages.reduce((s,p) => s + p.peakImpr, 0);
  const totalClicks = pages.reduce((s,p) => s + p.currClicks, 0);
  const improved    = pages.filter(p => p.improved).length;
  const dropped     = pages.filter(p => p.dropped).length;
  const wGain       = pages.filter(p=>p.weightedImpact>0).reduce((s,p)=>s+p.weightedImpact,0);
  const wLoss       = pages.filter(p=>p.weightedImpact<0).reduce((s,p)=>s+p.weightedImpact,0);
  const avgRevScore = pages.reduce((s,p)=>s+p.revScore,0)/n;
  return {
    count: n, avgPosDelta: avgPosDelta.toFixed(2),
    avgBasePos: avgBasePos.toFixed(1), avgCurrPos: avgCurrPos.toFixed(1),
    totalImpressions: totalImpr, totalClicks,
    improvedCount: improved, droppedCount: dropped,
    improvedPct: ((improved/n)*100).toFixed(1),
    droppedPct:  ((dropped/n)*100).toFixed(1),
    weightedGain: wGain, weightedLoss: wLoss,
    netWeighted:  wGain + wLoss,
    avgRevScore:  avgRevScore.toFixed(1),
  };
}

const cohorts = {
  phase0: pageStats.filter(p => p.phase === 0),
  phase1: pageStats.filter(p => p.phase === 1),
  phase2: pageStats.filter(p => p.phase === 2),
  phase3: pageStats.filter(p => p.phase === 3),
};

const cohortSummaries = {
  phase0: cohortSummary(cohorts.phase0),
  phase1: cohortSummary(cohorts.phase1),
  phase2: cohortSummary(cohorts.phase2),
  phase3: cohortSummary(cohorts.phase3),
};

// ─── PAGE TYPE SUMMARIES ──────────────────────────────────────────────────────
const pageTypes = [...new Set(pageStats.map(p => p.pageType))].sort();
const pageTypeSummaries = {};
pageTypes.forEach(t => {
  const pages = pageStats.filter(p => p.pageType === t);
  pageTypeSummaries[t] = cohortSummary(pages);
});

// ─── QUERY EXPANSION AUDIT ───────────────────────────────────────────────────
const gained       = queryStats.filter(q => q.isGained);
const lost         = queryStats.filter(q => q.isLost);
const rising       = queryStats.filter(q => !q.isNew && q.posDelta < -2);
const dropping     = queryStats.filter(q => !q.isNew && q.posDelta > 2);
const commercial   = queryStats.filter(q => q.cats.includes('commercial-intent'));
const grantQ       = queryStats.filter(q => q.cats.includes('grant'));
const loanQ        = queryStats.filter(q => q.cats.includes('loan'));
const womenQ       = queryStats.filter(q => q.cats.includes('women'));
const startupQ     = queryStats.filter(q => q.cats.includes('startup'));
const techQ        = queryStats.filter(q => q.cats.includes('technology'));
const healthQ      = queryStats.filter(q => q.cats.includes('healthcare'));
const caRegQ       = queryStats.filter(q => q.cats.includes('canada-regional'));
const usRegQ       = queryStats.filter(q => q.cats.includes('usa-regional'));
const headTerms    = queryStats.filter(q => q.cats.includes('head-term'));
const longTails    = queryStats.filter(q => q.cats.includes('long-tail'));

// ─── TOP REVENUE OPPORTUNITY PAGES ───────────────────────────────────────────
const top100Rev = [...pageStats]
  .filter(p => p.currPos > 0 && p.currPos <= 40 && p.peakImpr >= 5)
  .sort((a,b) => b.revScore - a.revScore)
  .slice(0, 100);

// ─── TOP WEIGHTED GAINERS / LOSERS ───────────────────────────────────────────
const top50gainers = [...queryStats]
  .filter(q => q.weighted > 0)
  .sort((a,b) => b.weighted - a.weighted)
  .slice(0, 50);

const top50losers = [...queryStats]
  .filter(q => q.weighted < 0)
  .sort((a,b) => a.weighted - b.weighted)
  .slice(0, 50);

// ─── CONTROL GROUP ────────────────────────────────────────────────────────────
const optimized   = pageStats.filter(p => p.phase > 0);
const untouched   = pageStats.filter(p => p.phase === 0);
const optImproved = optimized.filter(p => p.improved).length / (optimized.length || 1);
const untImproved = untouched.filter(p => p.improved).length / (untouched.length || 1);
const optDropped  = optimized.filter(p => p.dropped).length  / (optimized.length || 1);
const untDropped  = untouched.filter(p => p.dropped).length  / (untouched.length || 1);

// ─── OVERALL SCORES ───────────────────────────────────────────────────────────
const totalWeightedGain = queryStats.filter(q=>q.weighted>0).reduce((s,q)=>s+q.weighted,0);
const totalWeightedLoss = queryStats.filter(q=>q.weighted<0).reduce((s,q)=>s+q.weighted,0);
const netWeighted       = totalWeightedGain + totalWeightedLoss;

// SEO Health: based on net weighted, improved vs dropped ratio
const improvedRatio = pageStats.filter(p=>p.improved).length / pageStats.length;
const droppedRatio  = pageStats.filter(p=>p.dropped).length  / pageStats.length;
const seoHealthScore = Math.round(50 + (improvedRatio - droppedRatio) * 50 + (netWeighted > 0 ? 10 : -10));

// Growth Score: is the site gaining query coverage?
const queryExpansionRate = ((gained.length / (queryStats.length || 1)) * 100).toFixed(1);
const growthScore = Math.min(100, Math.round(
  (gained.length / (queryStats.length || 1)) * 200 +
  (top50gainers.length > 0 ? 20 : 0)
));

// Rollout Confidence: did optimized outperform untouched?
const outperformDelta = optImproved - untImproved;
const rolloutConfidence = Math.round(50 + outperformDelta * 200);

// Commercial Intent Score
const commercialGained = gained.filter(q => q.cats.includes('commercial-intent')).length;
const commercialScore  = Math.round(
  (commercial.filter(q=>q.weighted>0).length / (commercial.length||1)) * 100
);

// ─── PATTERN RECOGNITION ─────────────────────────────────────────────────────
// What do winning pages (improved) have in common?
const winningPages = pageStats.filter(p => p.improved && p.peakImpr >= 20)
  .sort((a,b) => a.posDelta - b.posDelta)
  .slice(0, 30);

const winTypes = {};
winningPages.forEach(p => { winTypes[p.pageType] = (winTypes[p.pageType]||0)+1; });

// ─── ASSEMBLE OUTPUT ─────────────────────────────────────────────────────────
const audit = {
  generatedAt: new Date().toISOString(),
  overallScores: {
    seoHealthScore:       Math.min(100, Math.max(0, seoHealthScore)),
    growthScore:          Math.min(100, growthScore),
    rolloutConfidenceScore: Math.min(100, Math.max(0, rolloutConfidence)),
    commercialIntentScore: commercialScore,
    queryExpansionRate:   parseFloat(queryExpansionRate),
    netWeightedImpact:    netWeighted,
  },
  cohortSummaries,
  pageTypeSummaries,
  queryExpansion: {
    totalTracked:   queryStats.length,
    gained:         gained.length,
    lost:           lost.length,
    rising:         rising.length,
    dropping:       dropping.length,
    byCategory: {
      grant:      { count: grantQ.length,   rising: grantQ.filter(q=>q.weighted>0).length },
      loan:       { count: loanQ.length,    rising: loanQ.filter(q=>q.weighted>0).length },
      women:      { count: womenQ.length,   rising: womenQ.filter(q=>q.weighted>0).length },
      startup:    { count: startupQ.length, rising: startupQ.filter(q=>q.weighted>0).length },
      technology: { count: techQ.length,    rising: techQ.filter(q=>q.weighted>0).length },
      healthcare: { count: healthQ.length,  rising: healthQ.filter(q=>q.weighted>0).length },
      caRegional: { count: caRegQ.length,   rising: caRegQ.filter(q=>q.weighted>0).length },
      usRegional: { count: usRegQ.length,   rising: usRegQ.filter(q=>q.weighted>0).length },
      headTerms:  { count: headTerms.length,rising: headTerms.filter(q=>q.weighted>0).length },
      longTail:   { count: longTails.length,rising: longTails.filter(q=>q.weighted>0).length },
      commercial: { count: commercial.length,rising: commercial.filter(q=>q.weighted>0).length },
    },
  },
  weightedImpact: {
    totalGain: totalWeightedGain,
    totalLoss: totalWeightedLoss,
    net:       netWeighted,
    top50gainers: top50gainers.map(q=>({ query:q.query, impressions:q.peakImpr, delta:q.posDelta.toFixed(1), weighted:q.weighted, cats:q.cats.join(',') })),
    top50losers:  top50losers.map(q=>({ query:q.query, impressions:q.peakImpr, delta:q.posDelta.toFixed(1), weighted:q.weighted, cats:q.cats.join(',') })),
  },
  top100RevOpportunity: top100Rev.map(p=>({
    page:p.page, type:p.pageType, phase:p.phase,
    position:p.currPos.toFixed(1), impressions:p.peakImpr,
    clicks:p.currClicks, revScore:p.revScore, intentScore:p.intentScore,
    posDelta:p.posDelta.toFixed(1),
  })),
  controlGroup: {
    optimizedPages:   optimized.length,
    untouchedPages:   untouched.length,
    optimizedImprovedPct: (optImproved*100).toFixed(1),
    untouchedImprovedPct: (untImproved*100).toFixed(1),
    optimizedDroppedPct:  (optDropped*100).toFixed(1),
    untouchedDroppedPct:  (untDropped*100).toFixed(1),
    outperformDelta: (outperformDelta*100).toFixed(1),
  },
  winningPagePatterns: {
    topTypes: Object.entries(winTypes).sort((a,b)=>b[1]-a[1]),
    sampleWinners: winningPages.slice(0,10).map(p=>({
      page:p.page, type:p.pageType, phase:p.phase,
      posImprovement:(-p.posDelta).toFixed(1),
      peakImpressions:p.peakImpr,
    })),
  },
  next25Priority: [...pageStats]
    .filter(p => p.currPos >= 6 && p.currPos <= 20 && p.peakImpr >= 20 && p.currCtr < 0.5)
    .sort((a,b) => b.peakImpr - a.peakImpr)
    .slice(0, 25)
    .map(p=>({ page:p.page, type:p.pageType, phase:p.phase, position:p.currPos.toFixed(1), impressions:p.peakImpr, ctr:p.currCtr.toFixed(2) })),
  highest25Risk: [...pageStats]
    .filter(p => p.dropped && p.peakImpr >= 30)
    .sort((a,b) => a.weightedImpact - b.weightedImpact)
    .slice(0, 25)
    .map(p=>({ page:p.page, type:p.pageType, phase:p.phase, posDrop:p.posDelta.toFixed(1), impressions:p.peakImpr, weightedLoss:p.weightedImpact })),
};

// Save JSON
const outFile = path.join(ROOT, 'scripts', 'cohort-audit-results.json');
fs.writeFileSync(outFile, JSON.stringify(audit, null, 2));
console.log(`✅  Audit JSON saved → ${outFile}`);

// ─── CONSOLE REPORT ───────────────────────────────────────────────────────────
const B = '\x1b[1m', R = '\x1b[0m', G = '\x1b[32m', Y = '\x1b[33m', Rd = '\x1b[31m', C = '\x1b[36m';

function bar(score) {
  const filled = Math.round(score / 5);
  return '[' + '█'.repeat(filled) + '░'.repeat(20-filled) + ']';
}

function printSection(title) {
  console.log('\n' + B + '═'.repeat(90) + R);
  console.log(B + `  ${title}` + R);
  console.log(B + '─'.repeat(90) + R);
}

function pct(v) { return String(v) + '%'; }

// ── PART 1: Executive Summary ─────────────────────────────────────────────────
printSection('PART 1 — EXECUTIVE SUMMARY');
const s = audit.overallScores;
console.log(`  ${B}SEO Health Score      ${R} ${bar(s.seoHealthScore)}  ${s.seoHealthScore}/100`);
console.log(`  ${B}Growth Score          ${R} ${bar(s.growthScore)}  ${s.growthScore}/100`);
console.log(`  ${B}Rollout Confidence    ${R} ${bar(s.rolloutConfidenceScore)}  ${s.rolloutConfidenceScore}/100`);
console.log(`  ${B}Commercial Intent     ${R} ${bar(s.commercialIntentScore)}  ${s.commercialIntentScore}/100`);
console.log(`  ${B}Query Expansion Rate  ${R} ${bar(parseFloat(s.queryExpansionRate)*3)}  ${s.queryExpansionRate}% new queries`);
console.log(`  ${B}Net Weighted Impact   ${R} ${s.netWeightedImpact >= 0 ? G : Rd}${s.netWeightedImpact}${R}`);

const verdict = s.rolloutConfidenceScore >= 60 && s.seoHealthScore >= 55
  ? `${G}✅  CONTINUE — Expand to next 10 pages (controlled rollout)${R}`
  : s.seoHealthScore >= 45
  ? `${Y}⚠️   MONITOR — Hold for one more week before expanding${R}`
  : `${Rd}🛑  PAUSE — More data needed before scaling${R}`;
console.log(`\n  ${B}RECOMMENDATION:${R}  ${verdict}`);

// ── PART 2: Cohort Comparison ─────────────────────────────────────────────────
printSection('PART 2 — COHORT COMPARISON');
const ch = audit.cohortSummaries;
const cohortRows = [
  ['Phase 0 (Untouched)', ch.phase0],
  ['Phase 1 (~50 pages)', ch.phase1],
  ['Phase 2 (~180 pages)', ch.phase2],
  ['Phase 3 (3-page deep)', ch.phase3],
];
console.log(`  ${'Cohort'.padEnd(24)} ${'Pages'.padStart(6)} ${'Avg Base'.padStart(9)} ${'Avg Curr'.padStart(9)} ${'Δ Pos'.padStart(7)} ${'% Improved'.padStart(11)} ${'% Dropped'.padStart(10)} ${'Net Weighted'.padStart(13)} ${'Rev Score'.padStart(10)}`);
console.log('  ' + '─'.repeat(97));
cohortRows.forEach(([name, c]) => {
  if (!c) return;
  const delta = parseFloat(c.avgPosDelta);
  const dStr  = (delta < 0 ? G : delta > 0 ? Rd : '') + c.avgPosDelta + R;
  console.log(
    `  ${name.padEnd(24)} ${String(c.count).padStart(6)} ${c.avgBasePos.padStart(9)} ${c.avgCurrPos.padStart(9)} ${dStr.padStart(7+10)} ${pct(c.improvedPct).padStart(11)} ${pct(c.droppedPct).padStart(10)} ${String(c.netWeighted).padStart(13)} ${c.avgRevScore.padStart(10)}`
  );
});

// ── PART 3: Page Type Analysis ────────────────────────────────────────────────
printSection('PART 3 — PAGE TYPE ANALYSIS (Ranked by Avg Position Improvement)');
const sortedTypes = Object.entries(audit.pageTypeSummaries)
  .filter(([,v]) => v && v.count >= 2)
  .sort((a,b) => parseFloat(a[1].avgPosDelta) - parseFloat(b[1].avgPosDelta));
console.log(`  ${'Page Type'.padEnd(16)} ${'Count'.padStart(6)} ${'Avg Pos Δ'.padStart(10)} ${'% Improved'.padStart(11)} ${'Total Impr'.padStart(11)} ${'Rev Score'.padStart(10)}`);
console.log('  ' + '─'.repeat(70));
sortedTypes.forEach(([type, c]) => {
  const delta = parseFloat(c.avgPosDelta);
  const dStr  = (delta < 0 ? G : delta > 0 ? Rd : '') + c.avgPosDelta + R;
  console.log(`  ${type.padEnd(16)} ${String(c.count).padStart(6)} ${(dStr).padStart(10+10)} ${pct(c.improvedPct).padStart(11)} ${String(c.totalImpressions).padStart(11)} ${c.avgRevScore.padStart(10)}`);
});

// ── PART 4: Query Expansion ───────────────────────────────────────────────────
printSection('PART 4 — QUERY EXPANSION AUDIT');
const qe = audit.queryExpansion;
console.log(`  Total queries tracked: ${B}${qe.totalTracked}${R}  |  Gained: ${G}+${qe.gained}${R}  |  Lost: ${Rd}-${qe.lost}${R}  |  Rising: ${G}${qe.rising}${R}  |  Dropping: ${Rd}${qe.dropping}${R}\n`);
console.log(`  ${'Category'.padEnd(16)} ${'Total'.padStart(6)} ${'Rising'.padStart(8)} ${'Rising%'.padStart(9)}`);
console.log('  ' + '─'.repeat(42));
Object.entries(qe.byCategory).forEach(([cat, v]) => {
  const pctR = ((v.rising/v.count)*100).toFixed(0);
  const col  = parseInt(pctR) >= 50 ? G : parseInt(pctR) >= 35 ? Y : Rd;
  console.log(`  ${cat.padEnd(16)} ${String(v.count).padStart(6)} ${String(v.rising).padStart(8)} ${(col+pctR+'%'+R).padStart(9)}`);
});

// ── PART 5: Weighted Impact Summary ──────────────────────────────────────────
printSection('PART 5 — WEIGHTED QUERY IMPACT (Top 15 Gainers / Top 15 Losers)');
const wi = audit.weightedImpact;
console.log(`  Total Gain: ${G}+${wi.totalGain}${R}  |  Total Loss: ${Rd}${wi.totalLoss}${R}  |  Net: ${wi.net>=0?G:Rd}${wi.net}${R}\n`);
console.log(`  ${B}TOP 15 GAINERS${R}`);
console.log(`  ${'Query'.padEnd(50)} ${'Impr'.padStart(6)} ${'Δ Pos'.padStart(7)} ${'Weighted'.padStart(10)}`);
console.log('  ' + '─'.repeat(76));
wi.top50gainers.slice(0,15).forEach(q => {
  console.log(`  ${q.query.substring(0,49).padEnd(50)} ${String(q.impressions).padStart(6)} ${G+q.delta.padStart(7)+R} ${G+String(q.weighted).padStart(10)+R}`);
});
console.log(`\n  ${B}TOP 15 LOSERS${R}`);
console.log(`  ${'Query'.padEnd(50)} ${'Impr'.padStart(6)} ${'Δ Pos'.padStart(7)} ${'Weighted'.padStart(10)}`);
console.log('  ' + '─'.repeat(76));
wi.top50losers.slice(0,15).forEach(q => {
  console.log(`  ${q.query.substring(0,49).padEnd(50)} ${String(q.impressions).padStart(6)} ${Rd+q.delta.padStart(7)+R} ${Rd+String(q.weighted).padStart(10)+R}`);
});

// ── PART 6: Revenue Opportunity (Top 20) ─────────────────────────────────────
printSection('PART 6 — TOP 20 REVENUE OPPORTUNITY PAGES');
console.log(`  ${'Page'.padEnd(46)} ${'Type'.padEnd(12)} ${'Ph'.padStart(3)} ${'Pos'.padStart(6)} ${'Impr'.padStart(6)} ${'RevScore'.padStart(9)}`);
console.log('  ' + '─'.repeat(85));
audit.top100RevOpportunity.slice(0,20).forEach(p => {
  console.log(`  ${p.page.substring(0,45).padEnd(46)} ${p.type.padEnd(12)} ${String(p.phase).padStart(3)} ${p.position.padStart(6)} ${String(p.impressions).padStart(6)} ${C+p.revScore.toString().padStart(9)+R}`);
});

// ── PART 7: Control Group ─────────────────────────────────────────────────────
printSection('PART 7 — CONTROL GROUP ANALYSIS');
const cg = audit.controlGroup;
console.log(`  ${'Group'.padEnd(20)} ${'Pages'.padStart(6)} ${'% Improved'.padStart(11)} ${'% Dropped'.padStart(10)}`);
console.log('  ' + '─'.repeat(50));
console.log(`  ${'Optimized (Ph1-3)'.padEnd(20)} ${String(cg.optimizedPages).padStart(6)} ${G+pct(cg.optimizedImprovedPct)+R.padStart(11)} ${Rd+pct(cg.optimizedDroppedPct)+R.padStart(10)}`);
console.log(`  ${'Untouched (Ph0)'.padEnd(20)} ${String(cg.untouchedPages).padStart(6)} ${pct(cg.untouchedImprovedPct).padStart(11)} ${pct(cg.untouchedDroppedPct).padStart(10)}`);
console.log(`\n  Optimized pages improved at ${cg.outperformDelta > 0 ? G : Rd}${cg.outperformDelta}% higher rate${R} than untouched pages.`);

// ── PART 9: Pattern Recognition ──────────────────────────────────────────────
printSection('PART 9 — WINNING PAGE PATTERNS (Pages with ≥20 Impressions that Improved Most)');
const wp = audit.winningPagePatterns;
console.log(`  Top page types among winners:`);
wp.topTypes.forEach(([type, count]) => {
  console.log(`    ${type.padEnd(16)}: ${count} pages`);
});
console.log(`\n  Sample winners:`);
wp.sampleWinners.forEach(p => {
  console.log(`    ${p.page.substring(0,45).padEnd(46)} [${p.type}] Phase ${p.phase}  +${p.posImprovement} pos  (${p.peakImpressions} impr)`);
});

// ── PART 10: Next 25 Priority / Highest 25 Risk ───────────────────────────────
printSection('PART 10 — NEXT 25 PRIORITY PAGES FOR OPTIMIZATION');
console.log(`  ${'Page'.padEnd(46)} ${'Type'.padEnd(12)} ${'Pos'.padStart(6)} ${'Impr'.padStart(6)} ${'CTR'.padStart(6)}`);
console.log('  ' + '─'.repeat(79));
audit.next25Priority.forEach(p => {
  console.log(`  ${p.page.substring(0,45).padEnd(46)} ${p.type.padEnd(12)} ${p.position.padStart(6)} ${String(p.impressions).padStart(6)} ${p.ctr.padStart(6)}`);
});

printSection('HIGHEST 25 RISK PAGES (Dropping on High-Impression Queries)');
console.log(`  ${'Page'.padEnd(46)} ${'Type'.padEnd(12)} ${'Pos Δ'.padStart(7)} ${'Impr'.padStart(6)} ${'Wt Loss'.padStart(9)}`);
console.log('  ' + '─'.repeat(83));
audit.highest25Risk.forEach(p => {
  console.log(`  ${p.page.substring(0,45).padEnd(46)} ${p.type.padEnd(12)} ${Rd+('+'+p.posDrop)+R.padStart(7+10)} ${String(p.impressions).padStart(6)} ${Rd+String(p.weightedLoss).padStart(9)+R}`);
});

console.log('\n' + B + '═'.repeat(90) + R);
console.log(B + '  FULL JSON → scripts/cohort-audit-results.json' + R);
console.log(B + '═'.repeat(90) + R + '\n');
