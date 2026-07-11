#!/usr/bin/env node
// scripts/revenue-attribution-audit.js
// FSI Digital — Revenue Attribution Audit
// Connects: GSC impressions → clicks → telemetry events → leads → purchases → revenue
// All data from live Google Sheets + GSC CSV exports

'use strict';
require('dotenv').config({ path: '.env.local' });
const fs   = require('fs');
const path = require('path');
const { google } = require('googleapis');

// ── Config ────────────────────────────────────────────────────────────────────
const SHEET_ID  = process.env.GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const PRIVATE_KEY  = (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n');

const DOWNLOADS  = '/Users/ashwanikumar/Downloads';
const ROOT       = path.join(DOWNLOADS, 'canadablog');
const SITE       = 'https://www.fsidigital.ca';

const GSC = {
  jun28: path.join(ROOT, 'fsidigital.ca-Performance-on-Search-2026-06-28'),
  jul02: path.join(ROOT, 'fsidigital.ca-Performance-on-Search-2026-07-02'),
  jul09: path.join(DOWNLOADS, 'fsidigital.ca-Performance-on-Search-2026-07-09'),
};

// Industry benchmark CTRs by position (Sistrix 2023 study)
const BENCHMARK_CTR = {
  1: 28.5, 2: 15.7, 3: 11.0, 4: 8.0, 5: 7.2,
  6: 5.1,  7: 4.0,  8: 3.2,  9: 2.8, 10: 2.5,
  11: 1.9, 12: 1.5, 13: 1.3, 14: 1.1, 15: 1.0,
  16: 0.9, 17: 0.8, 18: 0.7, 19: 0.6, 20: 0.5,
};
function benchmarkCtr(pos) {
  const p = Math.round(pos);
  return BENCHMARK_CTR[p] || (p > 20 ? 0.3 : 0.5);
}

// ── Google Sheets client ──────────────────────────────────────────────────────
async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: CLIENT_EMAIL, private_key: PRIVATE_KEY },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  return google.sheets({ version: 'v4', auth });
}

async function readSheet(sheets, range) {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range,
    });
    return res.data.values || [];
  } catch (e) {
    console.warn(`  ⚠️  Could not read sheet range "${range}": ${e.message}`);
    return [];
  }
}

// ── CSV helpers ───────────────────────────────────────────────────────────────
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
function num(v)     { return parseFloat(String(v||'0').replace(/[%,$,]/g,'')) || 0; }
function urlPath(v) {
  try { return new URL(v).pathname.replace(/\/$/, '') || '/'; }
  catch { return String(v).replace(SITE,'').replace(/\/$/, '') || '/'; }
}

// ── Page classification ───────────────────────────────────────────────────────
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
  if (/\/calculator/.test(p))          return 'tool';
  if (/\/sample-report/.test(p))       return 'trust';
  if (p === '/')                        return 'home';
  return 'other';
}

// ── Intent classification ─────────────────────────────────────────────────────
function intentClass(title = '', desc = '') {
  const t = (title + ' ' + desc).toLowerCase();
  if (/who qualifies|eligib|qualify|requirements/.test(t))   return 'Eligibility';
  if (/how to apply|step.by.step|application guide/.test(t)) return 'How-to';
  if (/\$\d|up to|phase i|phase ii|funding amount/.test(t))  return 'Funding Amount';
  if (/compare|vs\.|versus/.test(t))                         return 'Comparison';
  if (/deadline|due date|calendar/.test(t))                  return 'Deadline';
  return 'Informational';
}

// ── Load GSC pages ────────────────────────────────────────────────────────────
function loadGscPages(dir) {
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

// ── Load seoExperiments metadata (V-A titles for CTR comparison) ──────────────
function loadExperimentMeta() {
  try {
    // Extract from the TS file manually
    const raw = fs.readFileSync(path.join(ROOT,'lib/data/seoExperiments.ts'),'utf8');
    const experiments = [];
    const pageRe  = /page:\s*["']([^"']+)["']/g;
    const vaRe    = /versionA:\s*\{[^}]*title:\s*["']([^"']+)["'][^}]*description:\s*["']([^"']+)["'][^}]*ctr:\s*([\d.]+)/gs;
    const vbRe    = /versionB:\s*\{[^}]*title:\s*["']([^"']+)["'][^}]*description:\s*["']([^"']+)["'][^}]*ctr:\s*([\d.]+)/gs;
    const pages   = [...raw.matchAll(pageRe)].map(m => m[1]);
    const vas     = [...raw.matchAll(vaRe)];
    const vbs     = [...raw.matchAll(vbRe)];
    pages.forEach((page, i) => {
      experiments.push({
        page,
        vA: { title: vas[i]?.[1]||'', desc: vas[i]?.[2]||'', ctr: parseFloat(vas[i]?.[3]||0) },
        vB: { title: vbs[i]?.[1]||'', desc: vbs[i]?.[2]||'', ctr: parseFloat(vbs[i]?.[3]||0) },
      });
    });
    return experiments;
  } catch { return []; }
}

// ── Load Phase map ────────────────────────────────────────────────────────────
function loadPhaseMap() {
  const hist = JSON.parse(fs.readFileSync(path.join(ROOT,'scripts/indexing-history.json'),'utf8'));
  const map  = {};
  Object.entries(hist).forEach(([url, ts]) => {
    const p    = urlPath(url);
    const date = ts.substring(0,10);
    let phase  = 0;
    if (date >= '2026-03-13' && date <= '2026-04-17') phase = 1;
    else if (date >= '2026-05-12' && date <= '2026-05-17') phase = 2;
    else if (date >= '2026-06-27') phase = 3;
    map[p] = phase;
  });
  return map;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n' + '═'.repeat(80));
  console.log('  FSI DIGITAL — REVENUE ATTRIBUTION AUDIT');
  console.log('  Connecting: GSC → Telemetry → Leads → Purchases → Revenue');
  console.log('═'.repeat(80));

  // 1. Load GSC data
  console.log('\n⏳  Loading GSC data...');
  const gscJun28 = loadGscPages(GSC.jun28);
  const gscJul09 = loadGscPages(GSC.jul09);
  console.log(`    Jun 28: ${Object.keys(gscJun28).length} pages tracked`);
  console.log(`    Jul 09: ${Object.keys(gscJul09).length} pages tracked`);

  // 2. Load live Google Sheets data
  console.log('\n⏳  Connecting to Google Sheets...');
  let telemetry = [], purchases = [], leads = [];
  try {
    const sheets = await getSheetsClient();

    // Telemetry events
    const telRows = await readSheet(sheets, 'Funnel Events!A:N');
    if (telRows.length > 1) {
      const hdrs = telRows[0];
      telemetry = telRows.slice(1).map(row => {
        const obj = {};
        hdrs.forEach((h, i) => obj[h.trim()] = row[i] || '');
        return obj;
      });
    }
    console.log(`    Telemetry events: ${telemetry.length}`);

    // Purchases
    const purRows = await readSheet(sheets, 'Product Purchases!A:Z');
    if (purRows.length > 1) {
      const hdrs = purRows[0];
      purchases = purRows.slice(1).map(row => {
        const obj = {};
        hdrs.forEach((h, i) => obj[h.trim()] = row[i] || '');
        return obj;
      });
    }
    console.log(`    Purchases: ${purchases.length}`);

    // Leads
    const leadRows = await readSheet(sheets, 'Sheet1!A:Z');
    if (leadRows.length > 1) {
      const hdrs = leadRows[0];
      leads = leadRows.slice(1).map(row => {
        const obj = {};
        hdrs.forEach((h, i) => obj[h.trim()] = row[i] || '');
        return obj;
      });
    }
    console.log(`    Leads: ${leads.length}`);
  } catch (e) {
    console.warn(`  ⚠️  Google Sheets error: ${e.message}`);
  }

  // 3. Load experiment metadata + phase map
  const experiments = loadExperimentMeta();
  const phaseMap    = loadPhaseMap();

  // 4. Build funnel by landing page from telemetry using session-level landing page resolution
  const funnelByPage = {};
  const EVENT_NAMES  = {
    PAGE_VIEW:          ['page_view', 'pageview', 'page view'],
    CALCULATOR_START:   ['calculator_start', 'calc_start', 'start_calculator', 'calculator-start', 'calculator_started'],
    CALCULATOR_STEP:    ['calculator_step', 'calc_step'],
    CALCULATOR_DONE:    ['calculator_complete', 'calculator_done', 'calc_complete', 'report_generated', 'report-generated', 'calculator_completed'],
    CHECKOUT_START:     ['checkout_start', 'checkout-start', 'payment_start', 'paypal_initiated', 'begin_checkout'],
    PURCHASE:           ['purchase', 'payment_success', 'purchase_complete', 'order_complete'],
  };

  function matchEvent(name, category) {
    const n = (name || '').toLowerCase().trim();
    return EVENT_NAMES[category].some(e => n.includes(e));
  }

  // Determine landing page for each session ID (earliest page_view or page path)
  const sessionLandingMap = {};
  const sessionEarliestTime = {};

  telemetry.forEach(ev => {
    const sessId = ev['Session ID'] || ev['sessionId'];
    if (!sessId || sessId === 'sess_anonymous') return;
    const page = (ev['Page Path'] || ev['pagePath'] || '').split('?')[0];
    if (!page) return;
    const time = new Date(ev['Timestamp'] || ev['timestamp']).getTime();
    if (isNaN(time)) return;

    if (!sessionEarliestTime[sessId] || time < sessionEarliestTime[sessId]) {
      sessionEarliestTime[sessId] = time;
      sessionLandingMap[sessId] = page;
    }
  });

  telemetry.forEach(ev => {
    const sessId = ev['Session ID'] || ev['sessionId'];
    const page  = (ev['Page Path'] || ev['pagePath'] || '').split('?')[0];
    const event = (ev['Event Name'] || ev['eventName'] || '');
    if (!page) return;

    // Resolve landing page of the session, falling back to the event page
    const lp = (sessId && sessionLandingMap[sessId]) ? sessionLandingMap[sessId] : page;

    if (!funnelByPage[lp]) {
      funnelByPage[lp] = { pageViews:0, calcStarts:0, calcDone:0, checkoutStarts:0, purchases:0, revenue:0 };
    }
    const f = funnelByPage[lp];
    if (matchEvent(event, 'PAGE_VIEW'))         f.pageViews++;
    if (matchEvent(event, 'CALCULATOR_START'))  f.calcStarts++;
    if (matchEvent(event, 'CALCULATOR_DONE'))   f.calcDone++;
    if (matchEvent(event, 'CHECKOUT_START'))    f.checkoutStarts++;
    if (matchEvent(event, 'PURCHASE')) {
      f.purchases++;
      f.revenue += num(ev['Revenue'] || ev['revenue'] || 0);
    }
  });

  // Also count purchases by landing page from purchases sheet
  purchases.forEach(p => {
    const lp  = (p['Landing Page'] || p['landingPage'] || p['Page Path'] || '').split('?')[0];
    const amt = num(p['Amount'] || p['amount'] || p['Revenue'] || 0);
    if (!lp) return;
    if (!funnelByPage[lp]) {
      funnelByPage[lp] = { pageViews:0, calcStarts:0, calcDone:0, checkoutStarts:0, purchases:0, revenue:0 };
    }
    funnelByPage[lp].purchases++;
    funnelByPage[lp].revenue += amt;
  });

  // 5. Site-wide funnel totals
  const TOTALS = Object.values(funnelByPage).reduce((acc, f) => {
    acc.pageViews      += f.pageViews;
    acc.calcStarts     += f.calcStarts;
    acc.calcDone       += f.calcDone;
    acc.checkoutStarts += f.checkoutStarts;
    acc.purchases      += f.purchases;
    acc.revenue        += f.revenue;
    return acc;
  }, { pageViews:0, calcStarts:0, calcDone:0, checkoutStarts:0, purchases:0, revenue:0 });

  // Compute site-wide conversion rates
  const RATES = {
    viewToCalcStart:    TOTALS.pageViews > 0 ? TOTALS.calcStarts / TOTALS.pageViews : 0,
    calcStartToDone:    TOTALS.calcStarts > 0 ? TOTALS.calcDone / TOTALS.calcStarts : 0,
    calcDoneToCheckout: TOTALS.calcDone > 0 ? TOTALS.checkoutStarts / TOTALS.calcDone : 0,
    checkoutToPurchase: TOTALS.checkoutStarts > 0 ? TOTALS.purchases / TOTALS.checkoutStarts : 0,
    avgOrderValue:      TOTALS.purchases > 0 ? TOTALS.revenue / TOTALS.purchases : 49,
  };

  // 6. Build per-page attribution table for all high-value pages
  const allPages = new Set([...Object.keys(gscJun28), ...Object.keys(gscJul09)]);
  const pageAttribution = [];

  for (const p of allPages) {
    const base    = gscJun28[p];
    const curr    = gscJul09[p];
    if (!curr) continue;

    const position   = curr.position;
    const impressions = curr.impressions;
    if (impressions < 5) continue;

    const baseCtr    = base?.ctr    ?? 0;
    const currCtr    = curr.ctr;
    const benchmark  = benchmarkCtr(position);
    const ctrGap     = currCtr - benchmark;

    const posDelta   = base ? curr.position - base.position : 0;
    const phase      = phaseMap[p] ?? 0;
    const pageType   = classifyPage(p);
    const funnel     = funnelByPage[p] || { pageViews:0, calcStarts:0, calcDone:0, checkoutStarts:0, purchases:0, revenue:0 };

    // Expected monthly revenue calculation
    // Estimated monthly clicks = impressions × expected CTR (benchmark or actual, whichever higher)
    const expectedCtr     = Math.max(currCtr, benchmark * 0.3); // floor at 30% of benchmark
    const estMonthlyClicks = impressions * 4.3 * (expectedCtr / 100); // 4.3 = ~monthly multiplier from weekly data
    const estCalcStarts   = estMonthlyClicks * Math.max(RATES.viewToCalcStart, 0.02);
    const estCalcDone     = estCalcStarts    * Math.max(RATES.calcStartToDone, 0.5);
    const estCheckouts    = estCalcDone      * Math.max(RATES.calcDoneToCheckout, 0.3);
    const estPurchases    = estCheckouts     * Math.max(RATES.checkoutToPurchase, 0.4);
    const estRevenue      = estPurchases     * (RATES.avgOrderValue || 49);

    // CTR gap revenue: how much revenue is left on the table from CTR gap vs benchmark
    const ctrGapClicks    = impressions * 4.3 * (Math.max(0, benchmark - currCtr) / 100);
    const ctrGapRevenue   = ctrGapClicks * RATES.viewToCalcStart * RATES.calcStartToDone * RATES.calcDoneToCheckout * RATES.checkoutToPurchase * (RATES.avgOrderValue || 49);

    // Engineering ROI estimate (minutes to optimize × rate assumption)
    const engMinutes = pageType === 'blog' ? 30 : pageType === 'usa-state' ? 20 : 25;
    const engROI     = estRevenue > 0 ? (estRevenue / (engMinutes / 60 * 100)).toFixed(1) : '—'; // $100/hr rate

    // Confidence score: based on data richness
    let confidence = 50;
    if (impressions > 500)      confidence += 20;
    else if (impressions > 100) confidence += 10;
    if (funnel.pageViews > 0)   confidence += 15;
    if (funnel.calcStarts > 0)  confidence += 10;
    if (posDelta !== 0)         confidence += 5;
    confidence = Math.min(95, confidence);

    pageAttribution.push({
      page: p, phase, pageType,
      impressions, position: position.toFixed(1),
      baseCtr: baseCtr.toFixed(2), currCtr: currCtr.toFixed(2),
      benchmark: benchmark.toFixed(2), ctrGap: ctrGap.toFixed(2),
      posDelta: posDelta.toFixed(1),
      funnel,
      estMonthlyClicks:  Math.round(estMonthlyClicks),
      estRevenue:        Math.round(estRevenue),
      ctrGapRevenue:     Math.round(ctrGapRevenue),
      engMinutes, engROI, confidence,
    });
  }

  // Sort by estimated revenue descending
  pageAttribution.sort((a, b) => b.estRevenue - a.estRevenue);

  // 7. CTR experiment analysis
  const ctrExperiments = experiments.map(exp => {
    const base = gscJun28[exp.page];
    const curr = gscJul09[exp.page];
    const bench = curr ? benchmarkCtr(curr.position) : 0;
    return {
      page: exp.page,
      vA_title: exp.vA.title,
      vB_title: exp.vB.title,
      vA_intent: intentClass(exp.vA.title, exp.vA.desc),
      vB_intent: intentClass(exp.vB.title, exp.vB.desc),
      intentDrift: intentClass(exp.vA.title, exp.vA.desc) !== intentClass(exp.vB.title, exp.vB.desc),
      baseCtr:    (base?.ctr ?? 0).toFixed(2),
      currCtr:    (curr?.ctr ?? 0).toFixed(2),
      benchmark:  bench.toFixed(2),
      ctrGap:     ((curr?.ctr ?? 0) - bench).toFixed(2),
      ctrDelta:   ((curr?.ctr ?? 0) - (base?.ctr ?? 0)).toFixed(2),
      basePos:    (base?.position ?? 0).toFixed(1),
      currPos:    (curr?.position ?? 0).toFixed(1),
      impressions: curr?.impressions ?? 0,
      funnel: funnelByPage[exp.page] || { pageViews:0, calcStarts:0, calcDone:0, checkoutStarts:0, purchases:0, revenue:0 },
    };
  });

  // 8. Phase 2 failure investigation
  // Find Phase 2 pages that dropped and characterize them
  const phase2Risk = pageAttribution
    .filter(p => p.phase === 2 && parseFloat(p.posDelta) > 1)
    .sort((a,b) => parseFloat(b.posDelta) - parseFloat(a.posDelta))
    .slice(0, 20);

  const phase2Win = pageAttribution
    .filter(p => p.phase === 2 && parseFloat(p.posDelta) < -2)
    .sort((a,b) => parseFloat(a.posDelta) - parseFloat(b.posDelta))
    .slice(0, 10);

  // Compare V-A vs V-B intent in experiments — did Phase 2 over-optimize?
  const phase2IntentMismatch = phase2Risk.filter(p => {
    return p.pageType === 'blog'; // blogs were most common Phase 2 type
  }).length;

  // ── OUTPUT ──────────────────────────────────────────────────────────────────
  const B = '\x1b[1m', R = '\x1b[0m', G = '\x1b[32m', Y = '\x1b[33m', Rd = '\x1b[31m', C = '\x1b[36m', D = '\x1b[2m';

  function pSection(title) {
    console.log('\n' + B + '═'.repeat(80) + R);
    console.log(B + `  ${title}` + R);
    console.log(B + '─'.repeat(80) + R);
  }

  // ── Business Attribution Layer ─────────────────────────────────────────────
  pSection('BUSINESS ATTRIBUTION LAYER — FUNNEL BY LANDING PAGE (Top 20 by Est. Revenue)');
  console.log(`\n  ${B}Site-Wide Funnel (actual telemetry):${R}`);
  console.log(`    Page Views:        ${TOTALS.pageViews}`);
  console.log(`    Calculator Starts: ${TOTALS.calcStarts}  (${(RATES.viewToCalcStart*100).toFixed(1)}% of views)`);
  console.log(`    Calculator Done:   ${TOTALS.calcDone}   (${(RATES.calcStartToDone*100).toFixed(1)}% of starts)`);
  console.log(`    Checkout Starts:   ${TOTALS.checkoutStarts}  (${(RATES.calcDoneToCheckout*100).toFixed(1)}% of completions)`);
  console.log(`    Purchases:         ${TOTALS.purchases}`);
  console.log(`    Revenue:           $${TOTALS.revenue.toFixed(2)}`);
  console.log(`    Avg Order Value:   $${(RATES.avgOrderValue).toFixed(0)}`);

  console.log(`\n  ${B}Page Attribution Table:${R}`);
  console.log(`  ${'Page'.padEnd(42)} ${'Type'.padEnd(10)} ${'Ph'.padStart(3)} ${'Pos'.padStart(5)} ${'Impr'.padStart(5)} ${'Views'.padStart(6)} ${'Calc'.padStart(5)} ${'Purch'.padStart(5)} ${'Rev'.padStart(7)} ${'EstRev/mo'.padStart(10)} ${'Conf'.padStart(5)}`);
  console.log('  ' + '─'.repeat(108));
  pageAttribution.slice(0,20).forEach(p => {
    console.log(
      `  ${p.page.substring(0,41).padEnd(42)} ${p.pageType.padEnd(10)} ${String(p.phase).padStart(3)} ` +
      `${p.position.padStart(5)} ${String(p.impressions).padStart(5)} ` +
      `${String(p.funnel.pageViews).padStart(6)} ${String(p.funnel.calcStarts).padStart(5)} ` +
      `${String(p.funnel.purchases).padStart(5)} ${('$'+p.funnel.revenue).padStart(7)} ` +
      `${(C+'$'+p.estRevenue+R).padStart(10)} ${(p.confidence+'%').padStart(5)}`
    );
  });

  // ── CTR Experiment Audit ───────────────────────────────────────────────────
  pSection('CTR EXPERIMENT AUDIT — Before · After · Benchmark · Gap · Intent Drift');
  ctrExperiments.forEach(e => {
    const driftStr = e.intentDrift ? Rd + '⚠️  INTENT DRIFT' + R : G + '✓ Same intent' + R;
    const ctrD = parseFloat(e.ctrDelta);
    console.log(`\n  ${B}${e.page}${R}`);
    console.log(`    V-A Intent: ${e.vA_intent.padEnd(20)} V-B Intent: ${e.vB_intent}  →  ${driftStr}`);
    console.log(`    V-A Title:  "${e.vA_title.substring(0,65)}"`);
    console.log(`    V-B Title:  "${e.vB_title.substring(0,65)}"`);
    console.log(`    ${'Metric'.padEnd(22)} ${'Before'.padStart(10)} ${'After'.padStart(10)} ${'Benchmark'.padStart(11)} ${'Gap vs Bench'.padStart(13)}`);
    console.log('    ' + '─'.repeat(68));
    console.log(`    ${'CTR'.padEnd(22)} ${(e.baseCtr+'%').padStart(10)} ${(e.currCtr+'%').padStart(10)} ${(e.benchmark+'%').padStart(11)} ${((ctrD>=0?G:Rd)+(e.ctrGap)+'%'+R).padStart(13)}`);
    console.log(`    ${'Position'.padEnd(22)} ${e.basePos.padStart(10)} ${e.currPos.padStart(10)}`);
    console.log(`    ${'Impressions'.padEnd(22)} ${String(e.impressions).padStart(10)}`);
    console.log(`    ${'Page Views (telemetry)'.padEnd(22)} ${String(e.funnel.pageViews).padStart(10)}`);
    console.log(`    ${'Calc Starts'.padEnd(22)} ${String(e.funnel.calcStarts).padStart(10)}`);
    console.log(`    ${'Purchases'.padEnd(22)} ${String(e.funnel.purchases).padStart(10)}`);
    console.log(`    ${'Revenue'.padEnd(22)} ${('$'+e.funnel.revenue).padStart(10)}`);
  });

  // ── Conversion Priority Matrix ─────────────────────────────────────────────
  pSection('CONVERSION PRIORITY MATRIX — Ranked by CTR Gap × Impressions (Revenue Left on Table)');
  const priorityMatrix = pageAttribution
    .filter(p => p.impressions >= 30 && parseFloat(p.ctrGap) < 0)
    .sort((a, b) => b.ctrGapRevenue - a.ctrGapRevenue)
    .slice(0, 25);

  console.log(`  ${'Page'.padEnd(42)} ${'Pos'.padStart(5)} ${'Impr'.padStart(6)} ${'Act CTR'.padStart(8)} ${'Bench CTR'.padStart(10)} ${'Gap'.padStart(6)} ${'Rev Left/mo'.padStart(12)} ${'Eng hrs'.padStart(8)}`);
  console.log('  ' + '─'.repeat(100));
  priorityMatrix.forEach(p => {
    const gap   = parseFloat(p.ctrGap);
    const gStr  = (gap < -2 ? Rd : gap < -1 ? Y : '') + p.ctrGap + '%' + R;
    console.log(
      `  ${p.page.substring(0,41).padEnd(42)} ${p.position.padStart(5)} ${String(p.impressions).padStart(6)} ` +
      `${(p.currCtr+'%').padStart(8)} ${(p.benchmark+'%').padStart(10)} ${gStr.padStart(6+10)} ` +
      `${(Rd+'$'+p.ctrGapRevenue+R).padStart(12+10)} ${((p.engMinutes/60).toFixed(1)+'h').padStart(8)}`
    );
  });

  // ── Engineering ROI ────────────────────────────────────────────────────────
  pSection('ENGINEERING ROI — Expected Revenue per Hour of Optimization (Top 20)');
  const engROI = pageAttribution
    .filter(p => p.estRevenue > 0 && p.impressions >= 30)
    .sort((a, b) => parseFloat(b.engROI) - parseFloat(a.engROI))
    .slice(0, 20);

  console.log(`  ${'Page'.padEnd(42)} ${'Type'.padEnd(10)} ${'Pos'.padStart(5)} ${'Impr'.padStart(6)} ${'Est Rev/mo'.padStart(11)} ${'Eng hrs'.padStart(8)} ${'ROI $/hr'.padStart(9)}`);
  console.log('  ' + '─'.repeat(95));
  engROI.forEach(p => {
    console.log(
      `  ${p.page.substring(0,41).padEnd(42)} ${p.pageType.padEnd(10)} ${p.position.padStart(5)} ${String(p.impressions).padStart(6)} ` +
      `${(C+'$'+p.estRevenue+R).padStart(11+10)} ${((p.engMinutes/60).toFixed(1)+'h').padStart(8)} ` +
      `${(G+'$'+p.engROI+R).padStart(9+10)}`
    );
  });

  // ── Phase 2 Failure Investigation ─────────────────────────────────────────
  pSection('PHASE 2 FAILURE INVESTIGATION — Dropped Pages Characterization');
  console.log(`\n  Phase 2 pages dropping:  ${phase2Risk.length}`);
  console.log(`  Phase 2 pages winning:   ${phase2Win.length}`);
  console.log(`  Blog pages among drops:  ${phase2IntentMismatch} (${Math.round(phase2IntentMismatch/(phase2Risk.length||1)*100)}%)\n`);

  console.log(`  ${B}Dropped Pages (Phase 2):${R}`);
  console.log(`  ${'Page'.padEnd(42)} ${'Type'.padEnd(10)} ${'Pos Δ'.padStart(7)} ${'Impr'.padStart(6)} ${'Curr CTR'.padStart(9)} ${'Bench'.padStart(7)}`);
  console.log('  ' + '─'.repeat(85));
  phase2Risk.forEach(p => {
    console.log(
      `  ${p.page.substring(0,41).padEnd(42)} ${p.pageType.padEnd(10)} ` +
      `${(Rd+'+'+p.posDelta+R).padStart(7+10)} ${String(p.impressions).padStart(6)} ` +
      `${(p.currCtr+'%').padStart(9)} ${(p.benchmark+'%').padStart(7)}`
    );
  });

  console.log(`\n  ${B}Winning Pages (Phase 2) — what worked:${R}`);
  phase2Win.forEach(p => {
    console.log(`    ${G}↑${(-parseFloat(p.posDelta)).toFixed(1)} pos${R}  ${p.page}  [${p.pageType}]  ${p.impressions} impr`);
  });

  // ── Save JSON ──────────────────────────────────────────────────────────────
  const outputPath = path.join(ROOT, 'scripts', 'revenue-attribution-results.json');
  fs.writeFileSync(outputPath, JSON.stringify({
    generatedAt: new Date().toISOString(),
    siteFunnel: { totals: TOTALS, rates: RATES },
    pageAttribution: pageAttribution.slice(0, 100),
    ctrExperiments,
    priorityMatrix: priorityMatrix.slice(0, 25),
    engROI: engROI.slice(0, 20),
    phase2Investigation: { dropped: phase2Risk, winning: phase2Win },
  }, null, 2));

  console.log(`\n${'═'.repeat(80)}`);
  console.log(`  ✅  Full JSON → scripts/revenue-attribution-results.json`);
  console.log(`${'═'.repeat(80)}\n`);
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
