import fs from 'fs';
import path from 'path';
import { stateDetails } from '../lib/data/stateDetails';
import { guidesDatabase } from '../lib/data/guides';

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

interface PageAuditResult {
  type: 'blog' | 'state' | 'guide';
  slug: string;
  urlPath: string;
  title: string;
  isUpgraded: boolean;
  metaTitle: string;
  metaDesc: string;
  updatedAt: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  filePath: string;
}

function findLatestGscDir(): string | null {
  const targetDir = path.join(DEFAULT_DOWNLOADS_DIR, 'fsidigital.ca-Performance-on-Search-2026-06-28');
  if (fs.existsSync(targetDir) && fs.existsSync(path.join(targetDir, 'Pages.csv'))) {
    return targetDir;
  }

  // Fallback to searching
  if (!fs.existsSync(DEFAULT_DOWNLOADS_DIR)) return null;
  const candidates = fs.readdirSync(DEFAULT_DOWNLOADS_DIR)
    .filter((name) => name.startsWith('fsidigital.ca-Performance-on-Search-'))
    .map((name) => path.join(DEFAULT_DOWNLOADS_DIR, name))
    .filter((fullPath) => fs.existsSync(path.join(fullPath, 'Pages.csv')))
    .map((fullPath) => ({
      fullPath,
      mtime: fs.statSync(fullPath).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime);

  return candidates[0]?.fullPath || null;
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
  content = content.replace(/^\uFEFF/, ''); // Strip BOM

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

async function run() {
  const gscDir = findLatestGscDir();
  const gscDataMap = new Map<string, GscPageData>();

  if (gscDir) {
    console.log(`✅ Loaded current GSC directory: ${gscDir}`);
    const pagesCsvPath = path.join(gscDir, 'Pages.csv');
    const csvRows = readCsv(pagesCsvPath);
    console.log(`📊 Loaded ${csvRows.length} pages from GSC Pages.csv`);

    for (const row of csvRows) {
      const url = row['Top pages'] || row['Pages'] || row['Page'] || '';
      if (!url) continue;
      const cleanPath = urlPath(url);
      gscDataMap.set(cleanPath, {
        url: cleanPath,
        clicks: numberValue(row['Clicks']),
        impressions: numberValue(row['Impressions']),
        ctr: numberValue(row['CTR']),
        position: numberValue(row['Position'])
      });
    }
  } else {
    console.error('❌ GSC Pages.csv not found.');
    process.exit(1);
  }

  const allPages: PageAuditResult[] = [];

  // 1. Scan Blog Posts (Dynamic source files)
  console.log('🔍 Auditing Blog Posts...');
  const blogFiles = scanBlogDirectory(BLOG_DATA_DIR);
  for (const filePath of blogFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    const slugMatch = content.match(/slug:\s*["']([^"']+)["']/);
    const slug = slugMatch ? slugMatch[1] : path.basename(filePath, '.ts');

    const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
    const title = titleMatch ? titleMatch[1] : 'Unknown';

    const hasSeo = content.includes('seo:');
    const hasVersion = content.includes('seoVersion:');
    const metaTitleMatch = content.match(/metaTitle:\s*["']([^"']+)["']/);
    const metaDescMatch = content.match(/metaDescription:\s*["']([^"']+)["']/);
    const updatedAtMatch = content.match(/seoUpdatedAt:\s*["']([^"']+)["']/);

    const pathUrl = `/blog/${slug}`;
    const gsc = gscDataMap.get(pathUrl) || { clicks: 0, impressions: 0, ctr: 0, position: 0 };

    allPages.push({
      type: 'blog',
      slug,
      urlPath: pathUrl,
      title,
      isUpgraded: hasSeo && hasVersion,
      metaTitle: metaTitleMatch ? metaTitleMatch[1] : title,
      metaDesc: metaDescMatch ? metaDescMatch[1] : '',
      updatedAt: updatedAtMatch ? updatedAtMatch[1] : 'N/A',
      clicks: gsc.clicks,
      impressions: gsc.impressions,
      ctr: gsc.ctr,
      position: gsc.position,
      filePath: path.relative(path.join(__dirname, '..'), filePath)
    });
  }

  // 2. Scan pSEO State Pages (from stateDetails.ts in memory)
  console.log('🔍 Auditing State pSEO Pages...');
  for (const state of stateDetails) {
    const pathUrl = `/usa/${state.slug}`;
    const gsc = gscDataMap.get(pathUrl) || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
    
    // State pages are already generated with standard schema/shortAnswer.
    // They are counted as CTR-optimized if they contain shortAnswers.
    const isUpgraded = !!state.shortAnswer;
    const baseTitle = `${state.name} Business Grants 2026`;
    const fundingHook = state.heroStats.totalFunding.replace(/\+$/, '');
    let metaTitle = `${baseTitle} – ${fundingHook}+ Available`;
    if (metaTitle.length > 60) metaTitle = `${baseTitle} (${fundingHook}+)`;
    if (metaTitle.length > 60) metaTitle = baseTitle;

    allPages.push({
      type: 'state',
      slug: state.slug,
      urlPath: pathUrl,
      title: `${state.name} Business Grants`,
      isUpgraded,
      metaTitle,
      metaDesc: state.shortAnswer || state.metaDescription || '',
      updatedAt: '2026-05-17', // Original pSEO Rollout Date
      clicks: gsc.clicks,
      impressions: gsc.impressions,
      ctr: gsc.ctr,
      position: gsc.position,
      filePath: 'lib/data/stateDetails.ts'
    });
  }

  // 3. Scan Guides (from guides.ts in memory)
  console.log('🔍 Auditing Guides...');
  for (const guide of guidesDatabase) {
    const pathUrl = `/guides/${guide.slug}`;
    const gsc = gscDataMap.get(pathUrl) || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
    
    const isUpgraded = !!guide.shortAnswer;

    allPages.push({
      type: 'guide',
      slug: guide.slug,
      urlPath: pathUrl,
      title: guide.title,
      isUpgraded,
      metaTitle: guide.title,
      metaDesc: guide.shortAnswer || guide.description || '',
      updatedAt: '2026-06-22', // Guides Optimization Date
      clicks: gsc.clicks,
      impressions: gsc.impressions,
      ctr: gsc.ctr,
      position: gsc.position,
      filePath: 'lib/data/guides.ts'
    });
  }

  // Group pages by Upgraded / Pending
  const upgraded = allPages.filter(p => p.isUpgraded);
  const pending = allPages.filter(p => !p.isUpgraded);

  // Sort lists by GSC impressions descending
  upgraded.sort((a, b) => b.impressions - a.impressions);
  pending.sort((a, b) => b.impressions - a.impressions);

  // Output stats
  const totalScanned = allPages.length;
  console.log(`\n========================================`);
  console.log(`📊 COMPREHENSIVE PERFORMANCE AUDIT`);
  console.log(`========================================`);
  console.log(`Total Pages Scanned: ${totalScanned}`);
  console.log(`  Blog Posts: ${allPages.filter(p => p.type === 'blog').length}`);
  console.log(`  State pSEO: ${allPages.filter(p => p.type === 'state').length}`);
  console.log(`  Guides:     ${allPages.filter(p => p.type === 'guide').length}`);
  console.log(`----------------------------------------`);
  console.log(`✅ Upgraded (Optimized): ${upgraded.length}`);
  console.log(`❌ Pending (Standard):   ${pending.length}`);
  console.log(`========================================\n`);

  // Write markdown report
  const reportPath = path.join('/Users/ashwanikumar/.gemini/antigravity/brain/0297e945-61e0-4444-b294-8b6461dfbd30', 'ctr_performance_audit.md');
  const prodReportPath = path.join(__dirname, '../reports/gsc-revenue-recovery-2026-06-28.md');

  let mdContent = `# CTR Performance & Metadata Upgrade Audit (Comprehensive)\n\n`;
  mdContent += `Generated: ${new Date().toLocaleDateString()} | Source: \`${path.basename(gscDir)}\`\n\n`;
  mdContent += `### Summary Status\n`;
  mdContent += `- **Total Active Pages**: ${totalScanned}\n`;
  mdContent += `  - **Blog Posts**: ${allPages.filter(p => p.type === 'blog').length} scanned\n`;
  mdContent += `  - **State pSEO**: ${allPages.filter(p => p.type === 'state').length} pages\n`;
  mdContent += `  - **Guides**: ${allPages.filter(p => p.type === 'guide').length} pages\n`;
  mdContent += `- **✅ Total Upgraded Pages**: ${upgraded.length} (Optimized with structured metadata, short answers, and JSON-LD schema)\n`;
  mdContent += `- **❌ Total Pending Pages**: ${pending.length} (Candidates for the next optimization waves)\n\n`;

  mdContent += `## 🚀 GSC Performance of Upgraded Pages (${upgraded.length})\n`;
  mdContent += `These pages have already been optimized. We track their current clicks, impressions, CTR, and search positions:\n\n`;
  mdContent += `| # | Type | Path | Current Meta Title | Impressions | Clicks | CTR | Avg Pos | Updated At |\n`;
  mdContent += `|---|---|---|---|---|---|---|---|---|\n`;
  upgraded.forEach((p, idx) => {
    mdContent += `| ${idx + 1} | \`${p.type}\` | \`${p.urlPath}\` | **${p.metaTitle}** | ${p.impressions.toLocaleString()} | ${p.clicks} | ${(p.ctr * 100).toFixed(2)}% | ${p.position.toFixed(1)} | \`${p.updatedAt ? p.updatedAt.split('T')[0] : 'N/A'}\` |\n`;
  });

  mdContent += `\n## 🎯 Top 30 Pending Priority Targets\n`;
  mdContent += `These pending pages represent the highest potential search traffic based on GSC Impressions. They should be prioritized for the next wave of metadata upgrades to capture high-intent users:\n\n`;
  mdContent += `| # | Type | Path | Raw Title | Impressions | Clicks | CTR | Avg Pos | Source File |\n`;
  mdContent += `|---|---|---|---|---|---|---|---|---|\n`;
  pending.slice(0, 30).forEach((p, idx) => {
    mdContent += `| ${idx + 1} | \`${p.type}\` | \`${p.urlPath}\` | ${p.title} | ${p.impressions.toLocaleString()} | ${p.clicks} | ${(p.ctr * 100).toFixed(2)}% | ${p.position.toFixed(1)} | \`${p.filePath}\` |\n`;
  });

  fs.writeFileSync(reportPath, mdContent, 'utf8');
  fs.writeFileSync(prodReportPath, mdContent, 'utf8');
  
  console.log(`🎉 Detailed audit report written successfully to: ${reportPath}`);
  console.log(`🎉 Production report written successfully to: ${prodReportPath}`);
}

run().catch(console.error);
