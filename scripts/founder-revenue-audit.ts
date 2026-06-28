import fs from 'fs';
import path from 'path';
import { stateDetails } from '../lib/data/stateDetails';
import { guidesDatabase } from '../lib/data/guides';
import { getPriorityResearchProfile } from '../lib/editorial/priorityResearch';

const BLOG_DATA_DIR = path.join(__dirname, '../lib/data/blog-posts');
const DEFAULT_DOWNLOADS_DIR = '/Users/ashwanikumar/Downloads';
const SITE_URL = 'https://www.fsidigital.ca';

interface GscPageData {
  url: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface AuditedPage {
  type: 'blog' | 'state' | 'guide';
  slug: string;
  urlPath: string;
  title: string;
  isUpgraded: boolean;
  intent: 'Transactional' | 'Commercial Investigation' | 'Informational';
  
  // GSC Metrics
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  
  // Attribution Modeling
  potentialMonthlyTraffic: number;
  calculatorStarts: number;
  expectedPurchases: number;
  expectedAnnualRevenue: number;

  // Scores
  freshnessScore: number;
  seoOpportunityScore: number;
  commercialIntentScore: number;
  
  // Flags & Classification
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  deservesBacklinks: boolean;
  filePath: string;
  updatedAt: string;
}

function findLatestGscDir(): string | null {
  const targetDir = path.join(DEFAULT_DOWNLOADS_DIR, 'fsidigital.ca-Performance-on-Search-2026-06-28');
  if (fs.existsSync(targetDir) && fs.existsSync(path.join(targetDir, 'Pages.csv'))) {
    return targetDir;
  }
  return null;
}

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let value = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && next === '"') {
      value += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      values.push(value);
      value = '';
      continue;
    }

    value += char;
  }

  values.push(value);
  return values;
}

function readCsv(filePath: string): any[] {
  if (!fs.existsSync(filePath)) return [];
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/^\uFEFF/, '');
  const lines = content.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]).map((header) => header.trim());
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] || '']));
  });
}

function numberValue(value: any): number {
  return Number(String(value || '0').replace(/[%,$]/g, '').replace(/,/g, '')) || 0;
}

function urlPath(value: string): string {
  try {
    const parsed = new URL(value);
    return parsed.pathname.replace(/\/$/, '') || '/';
  } catch {
    return String(value || '').replace(SITE_URL, '').replace(/\/$/, '') || '/';
  }
}

function scanBlogDirectory(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      scanBlogDirectory(filePath, fileList);
    } else if (file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function classifyIntent(urlPath: string, title: string): 'Transactional' | 'Commercial Investigation' | 'Informational' {
  const pathLower = urlPath.toLowerCase();
  const titleLower = title.toLowerCase();

  if (
    pathLower.includes('irap') || 
    pathLower.includes('sred') || 
    pathLower.includes('calculator') || 
    pathLower.includes('audit') || 
    pathLower.includes('grant-finder') || 
    pathLower.includes('loan') || 
    pathLower.includes('financing') || 
    pathLower.includes('ontario-small-business-grants') || 
    pathLower.includes('eligibility') ||
    titleLower.includes('apply for') ||
    titleLower.includes('funding checklist')
  ) {
    return 'Transactional';
  }

  if (
    pathLower.includes('vs') || 
    pathLower.includes('compare') || 
    pathLower.includes('best') || 
    pathLower.includes('top-10') || 
    pathLower.includes('database') || 
    pathLower.includes('directory') || 
    pathLower.includes('forecast') || 
    pathLower.includes('guide') ||
    titleLower.includes('how to stack') ||
    titleLower.includes('comparison')
  ) {
    return 'Commercial Investigation';
  }

  return 'Informational';
}

function calculateFreshnessScore(updatedAtStr: string): number {
  if (!updatedAtStr || updatedAtStr === 'N/A') return 2;
  try {
    const now = new Date('2026-06-28'); // Consistent timeline anchor
    const updated = new Date(updatedAtStr.split('T')[0]);
    const diffTime = Math.abs(now.getTime() - updated.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 30) return 10;
    if (diffDays <= 90) return 8;
    if (diffDays <= 180) return 6;
    if (diffDays <= 365) return 4;
    return 2;
  } catch {
    return 2;
  }
}

function calculateSeoOpportunityScore(position: number, impressions: number): number {
  if (impressions === 0) return 1;
  // Goldilocks zone for high impact metadata updates
  if (position >= 3 && position <= 15) return 10; 
  if (position > 15 && position <= 30) return 7;  // High-potential recovery target
  if (position > 30 && position <= 50) return 4;  // Needs heavier content refresh
  if (position < 3) return 2;                     // Already ranking at top, low incremental lift
  return 1;
}

function determineTier(slug: string, urlPath: string): 'Tier 1' | 'Tier 2' | 'Tier 3' {
  const pathLower = urlPath.toLowerCase();
  const slugLower = slug.toLowerCase();

  // Tier 1: Ontario, IRAP, SR&ED, CSBFP, Women
  if (
    slugLower.includes('ontario-small-business-grants') ||
    slugLower.includes('irap') ||
    slugLower.includes('sred') ||
    slugLower.includes('csbfp') ||
    slugLower.includes('women-entrepreneurship')
  ) {
    return 'Tier 1';
  }

  // Tier 2: Agriculture, Startup Funding, Saskatchewan, Regional Development
  if (
    slugLower.includes('agriculture') ||
    slugLower.includes('startup-funding') ||
    slugLower.includes('saskatchewan') ||
    slugLower.includes('regional-development')
  ) {
    return 'Tier 2';
  }

  return 'Tier 3';
}

function checkDeservesBacklinks(slug: string, urlPath: string): boolean {
  const slugLower = slug.toLowerCase();
  // We only actively build backlinks to core commercial engines
  return (
    slugLower.includes('calculator') ||
    slugLower.includes('database') ||
    slugLower.includes('finder') ||
    slugLower.includes('irap') ||
    slugLower.includes('sred') ||
    slugLower.includes('ontario-small-business-grants') ||
    slugLower.includes('government-loans')
  );
}

async function run() {
  const gscDir = findLatestGscDir();
  const gscDataMap = new Map<string, GscPageData>();

  if (gscDir) {
    const pagesCsvPath = path.join(gscDir, 'Pages.csv');
    const csvRows = readCsv(pagesCsvPath);
    for (const row of csvRows) {
      const url = row['Top pages'] || row['Pages'] || row['Page'] || '';
      if (!url) continue;
      const cleanPath = urlPath(url);
      const rawCtr = numberValue(row['CTR']);
      gscDataMap.set(cleanPath, {
        url: cleanPath,
        clicks: numberValue(row['Clicks']),
        impressions: numberValue(row['Impressions']),
        ctr: rawCtr / 100, // CTR division bug fixed
        position: numberValue(row['Position'])
      });
    }
  } else {
    console.error('❌ GSC Pages.csv not found.');
    process.exit(1);
  }

  const list: AuditedPage[] = [];

  // Constants for conversion pipeline modeling
  const CALCULATOR_CONV_RATES = {
    Transactional: 0.05, // 5%
    'Commercial Investigation': 0.025, // 2.5%
    Informational: 0.005 // 0.5%
  };
  const REPORT_CONV_RATE = 0.02; // 2% Calculator Start to Purchase
  const AOV = 120; // $120 Average Order Value

  // 1. Audit Blog Posts
  const blogFiles = scanBlogDirectory(BLOG_DATA_DIR);
  for (const filePath of blogFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    const slugMatch = content.match(/slug:\s*["']([^"']+)["']/);
    const slug = slugMatch ? slugMatch[1] : path.basename(filePath, '.ts');
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
    const title = titleMatch ? titleMatch[1] : 'Unknown';

    const pathUrl = `/blog/${slug}`;
    const hasSeo = content.includes('seo:');
    const hasVersion = content.includes('seoVersion:');
    const hasProfile = !!getPriorityResearchProfile(pathUrl);
    const isUpgraded = (hasSeo && hasVersion) || hasProfile;
    const updatedAtMatch = content.match(/seoUpdatedAt:\s*["']([^"']+)["']/);
    const updatedAt = updatedAtMatch ? updatedAtMatch[1] : (hasProfile ? '2026-06-28' : 'N/A');

    const gsc = gscDataMap.get(pathUrl) || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
    const intent = classifyIntent(pathUrl, title);

    // Target position CTR for potential modeling
    let targetCtr = 0.005;
    if (gsc.position >= 1 && gsc.position <= 3) targetCtr = 0.08;
    else if (gsc.position > 3 && gsc.position <= 15) targetCtr = 0.04;
    else if (gsc.position > 15 && gsc.position <= 30) targetCtr = 0.015;

    // Traffic & revenue calculations
    const potentialMonthlyTraffic = Math.max(gsc.clicks, Math.max(50, gsc.impressions) * targetCtr);
    const calcStarts = potentialMonthlyTraffic * CALCULATOR_CONV_RATES[intent];
    const expectedPurchases = calcStarts * REPORT_CONV_RATE;
    const expectedAnnualRevenue = expectedPurchases * AOV * 12;

    const freshnessScore = calculateFreshnessScore(updatedAt);
    const seoOpportunityScore = calculateSeoOpportunityScore(gsc.position, gsc.impressions);
    const commercialIntentScore = intent === 'Transactional' ? 10 : (intent === 'Commercial Investigation' ? 7 : 2);

    list.push({
      type: 'blog',
      slug,
      urlPath: pathUrl,
      title,
      isUpgraded,
      intent,
      clicks: gsc.clicks,
      impressions: gsc.impressions,
      ctr: gsc.ctr,
      position: gsc.position,
      potentialMonthlyTraffic,
      calculatorStarts: calcStarts,
      expectedPurchases,
      expectedAnnualRevenue,
      freshnessScore,
      seoOpportunityScore,
      commercialIntentScore,
      tier: determineTier(slug, pathUrl),
      deservesBacklinks: checkDeservesBacklinks(slug, pathUrl),
      filePath: path.relative(path.join(__dirname, '..'), filePath),
      updatedAt
    });
  }

  // 2. Audit State pSEO Pages
  for (const state of stateDetails) {
    const pathUrl = `/usa/${state.slug}`;
    const gsc = gscDataMap.get(pathUrl) || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
    const intent = 'Transactional';
    const updatedAt = '2026-05-17'; // Original pSEO Rollout Date

    let targetCtr = 0.005;
    if (gsc.position >= 1 && gsc.position <= 3) targetCtr = 0.08;
    else if (gsc.position > 3 && gsc.position <= 15) targetCtr = 0.04;
    else if (gsc.position > 15 && gsc.position <= 30) targetCtr = 0.015;

    const potentialMonthlyTraffic = Math.max(gsc.clicks, Math.max(100, gsc.impressions) * targetCtr);
    const calcStarts = potentialMonthlyTraffic * CALCULATOR_CONV_RATES[intent];
    const expectedPurchases = calcStarts * REPORT_CONV_RATE;
    const expectedAnnualRevenue = expectedPurchases * AOV * 12;

    const freshnessScore = calculateFreshnessScore(updatedAt);
    const seoOpportunityScore = calculateSeoOpportunityScore(gsc.position, gsc.impressions);
    const commercialIntentScore = 10;

    list.push({
      type: 'state',
      slug: state.slug,
      urlPath: pathUrl,
      title: `${state.name} Business Grants`,
      isUpgraded: !!state.shortAnswer,
      intent,
      clicks: gsc.clicks,
      impressions: gsc.impressions,
      ctr: gsc.ctr,
      position: gsc.position,
      potentialMonthlyTraffic,
      calculatorStarts: calcStarts,
      expectedPurchases,
      expectedAnnualRevenue,
      freshnessScore,
      seoOpportunityScore,
      commercialIntentScore,
      tier: determineTier(state.slug, pathUrl),
      deservesBacklinks: checkDeservesBacklinks(state.slug, pathUrl),
      filePath: 'lib/data/stateDetails.ts',
      updatedAt
    });
  }

  // 3. Audit Guides
  for (const guide of guidesDatabase) {
    const pathUrl = `/guides/${guide.slug}`;
    const gsc = gscDataMap.get(pathUrl) || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
    const intent = classifyIntent(pathUrl, guide.title);
    const updatedAt = '2026-06-22'; // Guides optimization rollout

    let targetCtr = 0.005;
    if (gsc.position >= 1 && gsc.position <= 3) targetCtr = 0.08;
    else if (gsc.position > 3 && gsc.position <= 15) targetCtr = 0.04;
    else if (gsc.position > 15 && gsc.position <= 30) targetCtr = 0.015;

    const potentialMonthlyTraffic = Math.max(gsc.clicks, Math.max(100, gsc.impressions) * targetCtr);
    const calcStarts = potentialMonthlyTraffic * CALCULATOR_CONV_RATES[intent];
    const expectedPurchases = calcStarts * REPORT_CONV_RATE;
    const expectedAnnualRevenue = expectedPurchases * AOV * 12;

    const freshnessScore = calculateFreshnessScore(updatedAt);
    const seoOpportunityScore = calculateSeoOpportunityScore(gsc.position, gsc.impressions);
    const commercialIntentScore = intent === 'Transactional' ? 10 : 7;

    list.push({
      type: 'guide',
      slug: guide.slug,
      urlPath: pathUrl,
      title: guide.title,
      isUpgraded: !!guide.shortAnswer,
      intent,
      clicks: gsc.clicks,
      impressions: gsc.impressions,
      ctr: gsc.ctr,
      position: gsc.position,
      potentialMonthlyTraffic,
      calculatorStarts: calcStarts,
      expectedPurchases,
      expectedAnnualRevenue,
      freshnessScore,
      seoOpportunityScore,
      commercialIntentScore,
      tier: determineTier(guide.slug, pathUrl),
      deservesBacklinks: checkDeservesBacklinks(guide.slug, pathUrl),
      filePath: 'lib/data/guides.ts',
      updatedAt
    });
  }

  // Sort ALL pages by: Tier Priority first (Tier 1 > Tier 2 > Tier 3), then Expected Revenue descending
  const tierWeight = { 'Tier 1': 3, 'Tier 2': 2, 'Tier 3': 1 };
  list.sort((a, b) => {
    const diff = tierWeight[b.tier] - tierWeight[a.tier];
    if (diff !== 0) return diff;
    return b.expectedAnnualRevenue - a.expectedAnnualRevenue;
  });

  // Write reports
  const reportPath = path.join('/Users/ashwanikumar/.gemini/antigravity/brain/0297e945-61e0-4444-b294-8b6461dfbd30', 'revenue_intent_content_audit.md');
  const prodReportPath = path.join(__dirname, '../reports/founder-revenue-audit-2026-06-28.md');

  // System-level scenarios modeling
  const blendedLtv = 275; // $120 Report + $30 Audit upsell + $125 Filing conversion

  let md = `# Founder Revenue & Search Intent Audit\n\n`;
  md += `Generated: ${new Date().toLocaleDateString()} | Source: \`${path.basename(gscDir)}\`\n\n`;
  md += `This audit evaluates FSI Digital's organic pages based on conversion viability and expected business value. Rather than focusing on raw vanity traffic, it programmatically categorizes page search intent and models customer lifetime value (LTV).\n\n`;
  
  md += `## 📊 High-Level Breakdown\n\n`;
  md += `*   **Total Scanned Pages**: ${list.length}\n`;
  md += `  *   **Transactional Intent**: ${list.filter(p => p.intent === 'Transactional').length} pages\n`;
  md += `  *   **Commercial Investigation**: ${list.filter(p => p.intent === 'Commercial Investigation').length} pages\n`;
  md += `  *   **Informational Intent**: ${list.filter(p => p.intent === 'Informational').length} pages\n`;
  md += `*   **Tiers**: Tier 1 (${list.filter(p => p.tier === 'Tier 1').length}) | Tier 2 (${list.filter(p => p.tier === 'Tier 2').length}) | Tier 3 (${list.filter(p => p.tier === 'Tier 3').length})\n`;
  md += `*   **Upgraded Pages**: ${list.filter(p => p.isUpgraded).length} | **Pending Pages**: ${list.filter(p => !p.isUpgraded).length}\n\n`;

  md += `---\n\n`;

  md += `## 📈 System-Level Funnel Scenarios (MRR Modeling)\n`;
  md += `To scale to **$10k+ MRR**, we track conversions at the system funnel level. This model projects Monthly Recurring Revenue (MRR) across three scenarios, showing both raw Report AOV ($120) and blended customer LTV ($275):\n\n`;

  md += `| Scenario | Organic Visits / Mo | Calculator CVR | Purchase CVR | Calculator Starts | Est. Monthly Purchases | Est. MRR (Report Only) | Est. MRR (Blended LTV) |\n`;
  md += `|---|---|---|---|---|---|---|---|\n`;
  md += `| **Conservative** | 5,000 | 4.0% | 2.0% | 200 | 4.0 | $480 | **$1,100** |\n`;
  md += `| **Expected** | 15,000 | 5.0% | 3.0% | 750 | 22.5 | $2,700 | **$6,187** |\n`;
  md += `| **Ambitious** | 50,000 | 6.0% | 4.0% | 3,000 | 120.0 | $14,400 | **$33,000** |\n`;

  md += `\n> [!NOTE]
> **Blended LTV Calculation ($275)**:
> * Initial Report purchase: $120
> * 15% conversion to $199 Strategy Session / Audit = +$30 expected value
> * 5% conversion to $2,500 Full Funding Application service = +$125 expected value\n\n`;

  md += `---\n\n`;

  md += `## 🚀 Founder Revenue Dashboard (Top 25 Revenue Pillars)\n`;
  md += `This dashboard attributes expected revenue directly to individual search pages based on search intent, GSC baseline positioning, and conversion statistics:\n\n`;
  
  md += `| Rank | Tier | Path | Intent | Est. Monthly Traffic | Calculator Starts | Est. Annual Revenue Impact | Backlink Priority | Status |\n`;
  md += `|---|---|---|---|---|---|---|:---:|---|\n`;

  list.slice(0, 25).forEach((p, idx) => {
    const statusText = p.isUpgraded ? '✅ Upgraded' : '❌ Pending';
    const linkText = p.deservesBacklinks ? '⭐ **High**' : 'Low';
    md += `| ${idx + 1} | \`${p.tier}\` | \`${p.urlPath}\` | \`${p.intent}\` | ${Math.round(p.potentialMonthlyTraffic).toLocaleString()} | ${p.calculatorStarts.toFixed(1)} | **$${Math.round(p.expectedAnnualRevenue).toLocaleString()}** | ${linkText} | ${statusText} |\n`;
  });

  md += `---\n\n`;

  md += `## 🎯 Priority Wave 3 Candidates (Actionable Next Steps)\n`;
  md += `The top 15 **pending** candidate pages sorted by their priority Tier and expected annual revenue. Wave 3 updates should strictly focus on these high-leverage assets:\n\n`;

  md += `| Rank | Tier | Path | Raw Title | GSC Impressions | GSC Avg Position | Freshness Score | Est. Annual Revenue Impact | Source File |\n`;
  md += `|---|---|---|---|---|---|---|---|---|\n`;
  
  const pendingTargets = list.filter(p => !p.isUpgraded);
  pendingTargets.slice(0, 15).forEach((p, idx) => {
    md += `| ${idx + 1} | \`${p.tier}\` | \`${p.urlPath}\` | ${p.title} | ${p.impressions.toLocaleString()} | ${p.position.toFixed(1)} | ${p.freshnessScore}/10 | **$${Math.round(p.expectedAnnualRevenue).toLocaleString()}** | \`${p.filePath}\` |\n`;
  });

  md += `\n---\n\n`;
  md += `## 🔗 Backlink Strategy Matrix\n`;
  md += `These are our "money pages" where backlink campaigns should be focused to yield the highest business conversion return:\n\n`;

  const linkTargets = list.filter(p => p.deservesBacklinks);
  md += `| Page Path | Page Title | Intent | GSC Average Position | Est. Annual Revenue Impact |\n`;
  md += `|---|---|---|---|---|\n`;
  linkTargets.slice(0, 10).forEach(p => {
    md += `| \`${p.urlPath}\` | ${p.title} | \`${p.intent}\` | ${p.position.toFixed(1)} | **$${Math.round(p.expectedAnnualRevenue).toLocaleString()}** |\n`;
  });

  fs.writeFileSync(reportPath, md, 'utf8');
  fs.writeFileSync(prodReportPath, md, 'utf8');

  console.log(`🎉 Quantitative Revenue Audit report generated successfully at: ${reportPath}`);
}

run().catch(console.error);
