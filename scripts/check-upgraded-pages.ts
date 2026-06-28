import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(__dirname, '../lib/data/blog-posts');
const DEFAULT_DOWNLOADS_DIR = '/Users/ashwanikumar/Downloads';
const SITE_URL = 'https://www.fsidigital.ca';

interface GscPageData {
  url: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface PageInfo {
  slug: string;
  filePath: string;
  title: string;
  isUpgraded: boolean;
  metaTitle?: string;
  metaDescription?: string;
  updatedAt?: string;
  // GSC Metrics
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

function findLatestGscDir(): string | null {
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

function scanDirectory(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      scanDirectory(filePath, fileList);
    } else if (file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function run() {
  console.log('📡 Scanning GSC performance folder...');
  const gscDir = findLatestGscDir();
  const gscDataMap = new Map<string, GscPageData>();

  if (gscDir) {
    console.log(`✅ Found latest GSC directory: ${gscDir}`);
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
    console.log('⚠️ No Google Search Console Pages.csv found in Downloads directory.');
  }

  console.log('🔍 Scanning local blog content database...');
  const files = scanDirectory(DATA_DIR);
  
  const upgradedList: PageInfo[] = [];
  const pendingList: PageInfo[] = [];

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract slug
    const slugMatch = content.match(/slug:\s*["']([^"']+)["']/);
    const slug = slugMatch ? slugMatch[1] : path.basename(filePath, '.ts');

    // Extract title
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
    const title = titleMatch ? titleMatch[1] : 'Unknown';

    // Check for SEO block and version
    const hasSeo = content.includes('seo:');
    const hasVersion = content.includes('seoVersion:');
    
    // Extract meta details
    const metaTitleMatch = content.match(/metaTitle:\s*["']([^"']+)["']/);
    const metaDescMatch = content.match(/metaDescription:\s*["']([^"']+)["']/);
    const updatedAtMatch = content.match(/seoUpdatedAt:\s*["']([^"']+)["']/);

    // Merge GSC data
    const gscUrl = `/blog/${slug}`;
    const gsc = gscDataMap.get(gscUrl) || { clicks: 0, impressions: 0, ctr: 0, position: 0 };

    const info: PageInfo = {
      slug,
      filePath: path.relative(path.join(__dirname, '..'), filePath),
      title,
      isUpgraded: hasSeo && hasVersion,
      metaTitle: metaTitleMatch ? metaTitleMatch[1] : undefined,
      metaDescription: metaDescMatch ? metaDescMatch[1] : undefined,
      updatedAt: updatedAtMatch ? updatedAtMatch[1] : undefined,
      clicks: gsc.clicks,
      impressions: gsc.impressions,
      ctr: gsc.ctr,
      position: gsc.position
    };

    if (info.isUpgraded) {
      upgradedList.push(info);
    } else {
      pendingList.push(info);
    }
  }

  // Sort lists
  // Sort upgraded list by impressions descending
  upgradedList.sort((a, b) => b.impressions - a.impressions);
  // Sort pending list by impressions descending to find the highest value targets
  pendingList.sort((a, b) => b.impressions - a.impressions);

  // Generate Report
  console.log(`\n========================================`);
  console.log(`📊 CTR PAGE METADATA AUDIT`);
  console.log(`========================================`);
  console.log(`Total scanned posts: ${files.length}`);
  console.log(`✅ Upgraded (CTR-Optimized): ${upgradedList.length}`);
  console.log(`❌ Pending (Standard):       ${pendingList.length}`);
  console.log(`========================================\n`);

  const reportPath = path.join('/Users/ashwanikumar/.gemini/antigravity/brain/0297e945-61e0-4444-b294-8b6461dfbd30', 'ctr_performance_audit.md');
  
  let mdContent = `# CTR Performance & Metadata Upgrade Audit\n\n`;
  mdContent += `Generated: ${new Date().toLocaleDateString()} | Source: \`${gscDir ? path.basename(gscDir) : 'N/A'}\`\n\n`;
  mdContent += `### Summary Status\n`;
  mdContent += `- **Total Pages Scanned**: ${files.length}\n`;
  mdContent += `- **CTR Upgraded Pages**: ${upgradedList.length} (Optimized with structured metadata, no-keyword meta tags, and version tracking)\n`;
  mdContent += `- **Pending Pages**: ${pendingList.length} (Candidates for the next optimization wave)\n\n`;

  mdContent += `## 🚀 Performance of Upgraded Pages (${upgradedList.length})\n`;
  mdContent += `These pages have already been upgraded. We track their current Search Console impressions, clicks, CTR, and average position:\n\n`;
  mdContent += `| # | Slug | Current Meta Title | Impressions | Clicks | CTR | Avg Pos | Updated At |\n`;
  mdContent += `|---|---|---|---|---|---|---|---|\n`;
  upgradedList.forEach((p, idx) => {
    mdContent += `| ${idx + 1} | \`/${p.slug}\` | **${p.metaTitle || p.title}** | ${p.impressions.toLocaleString()} | ${p.clicks} | ${(p.ctr * 100).toFixed(2)}% | ${p.position.toFixed(1)} | \`${p.updatedAt ? p.updatedAt.split('T')[0] : 'N/A'}\` |\n`;
  });

  mdContent += `\n## 🎯 Top 25 Pending Priority Targets (${pendingList.length} total)\n`;
  mdContent += `These pending pages represent the highest potential search traffic based on GSC Impressions. They should be prioritized for the next wave of metadata upgrades to capture high-intent users:\n\n`;
  mdContent += `| # | Slug | Raw Title | Impressions | Clicks | CTR | Avg Pos | File Path |\n`;
  mdContent += `|---|---|---|---|---|---|---|---|\n`;
  pendingList.slice(0, 25).forEach((p, idx) => {
    mdContent += `| ${idx + 1} | \`/${p.slug}\` | ${p.title} | ${p.impressions.toLocaleString()} | ${p.clicks} | ${(p.ctr * 100).toFixed(2)}% | ${p.position.toFixed(1)} | [${path.basename(p.filePath)}](file:///${path.resolve(p.filePath)}) |\n`;
  });

  fs.writeFileSync(reportPath, mdContent, 'utf8');
  console.log(`🎉 Detailed audit report written successfully to: ${reportPath}`);
}

run();
