import fs from 'fs';
import path from 'path';

const TABLE_CSV_PATH = path.join(__dirname, '../no-index/Table.csv');
const SITE_URL = 'https://www.fsidigital.ca';

// Helper to parse CSV lines
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

function cleanPath(urlStr: string): string {
  try {
    const url = new URL(urlStr);
    return url.pathname.replace(/\/$/, '') || '/';
  } catch {
    return urlStr.replace(SITE_URL, '').replace(/\/$/, '') || '/';
  }
}

async function run() {
  console.log('📡 Loading Table.csv from no-index folder...');
  const rows = readCsv(TABLE_CSV_PATH);
  console.log(`📊 Loaded ${rows.length} records from GSC Table.csv.`);

  if (rows.length === 0) {
    console.error('❌ Table.csv is empty or not found.');
    return;
  }

  require('ts-node').register({ transpileOnly: true });

  // Load redirects from next.config.mjs dynamically
  console.log('🔍 Loading next.config.mjs redirects...');
  const configContent = fs.readFileSync(path.join(__dirname, '../next.config.mjs'), 'utf8');
  
  // Extract simple redirect sources via regex
  const redirects = new Set<string>();
  const redirectMatches = configContent.matchAll(/source:\s*['"]([^'"]+)['"]/g);
  for (const m of redirectMatches) {
    redirects.add(m[1].split('?')[0].replace(/\/$/, ''));
  }

  // Load blog metadata to match slugs to files
  const metadataPath = path.join(__dirname, '../lib/data/blogMetadata.json');
  if (!fs.existsSync(metadataPath)) {
    console.error('❌ blogMetadata.json not found. Run generate-metadata.js first.');
    return;
  }
  const blogMetadataObj = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  const slugToPath = blogMetadataObj.slugToPath || {};

  // Load databases
  const { getAllPseoPages } = require('../lib/pseo-data');
  const { getAllBlogPosts } = require('../lib/data/blogPosts');
  const { guidesDatabase } = require('../lib/data/guides');
  const { getAllStates } = require('../lib/data/states');
  const { getAllStateDetails } = require('../lib/data/stateDetails');

  const pseoPages = getAllPseoPages();
  const blogPosts = getAllBlogPosts();
  const guides = guidesDatabase;
  const states = getAllStates();
  const stateDetails = getAllStateDetails();

  const pseoPaths = new Map(pseoPages.map((p: any) => [`/grants/${p.provinceSlug}/${p.citySlug}/${p.industrySlug}`, p]));
  const blogPaths = new Map(blogPosts.map((p: any) => [`/blog/${p.slug}`, p]));
  const guidePaths = new Map(guides.map((g: any) => [`/guides/${g.slug}`, g]));
  const statePaths = new Map(states.map((s: any) => [`/usa/${s.slug}`, s]));

  // Build state cities set
  const cityPaths = new Set<string>();
  stateDetails.forEach((sd: any) => {
    if (sd.cityGuides) {
      sd.cityGuides.forEach((c: any) => {
        const citySlug = c.city.toLowerCase().replace(/[^\w\s-]/g).replace(/\s+/g, '-').replace(/-+/g, '-');
        cityPaths.add(`/usa/${sd.slug}/${citySlug}`);
      });
    }
  });

  const reportData = {
    redirected: [] as any[],
    pseoActive: [] as any[],
    pseoBlocked: [] as any[],
    blogActive: [] as any[],
    blogBlocked: [] as any[],
    guideActive: [] as any[],
    guideBlocked: [] as any[],
    other: [] as any[]
  };

  for (const row of rows) {
    const rawUrl = row.URL || row.url || '';
    if (!rawUrl) continue;

    const pathName = cleanPath(rawUrl);
    const lastCrawled = row['Last crawled'] || 'N/A';

    // 1. Is it a redirect?
    if (redirects.has(pathName)) {
      reportData.redirected.push({ url: rawUrl, path: pathName, lastCrawled, reason: 'Configured redirect source' });
      continue;
    }

    // 2. Is it a pSEO page?
    if (pathName.startsWith('/grants/')) {
      const pseoPage = pseoPaths.get(pathName);
      if (pseoPage) {
        if (pseoPage.isPublished) {
          reportData.pseoActive.push({ url: rawUrl, path: pathName, lastCrawled });
        } else {
          reportData.pseoBlocked.push({ url: rawUrl, path: pathName, lastCrawled, reason: 'Drip campaign not yet active at crawl date' });
        }
      } else {
        reportData.other.push({ url: rawUrl, path: pathName, lastCrawled, reason: 'Old/Deprecated pSEO structure or query string' });
      }
      continue;
    }

    // 3. Is it a Blog Post?
    if (pathName.startsWith('/blog/')) {
      const blog = blogPaths.get(pathName);
      if (blog) {
        const relativeFilePath = slugToPath[blog.slug];
        let hasNoindex = false;
        if (relativeFilePath) {
          const absoluteFilePath = path.join(__dirname, '../lib/data', relativeFilePath);
          if (fs.existsSync(absoluteFilePath)) {
            const fileContent = fs.readFileSync(absoluteFilePath, 'utf8');
            hasNoindex = fileContent.includes('noindex');
          }
        }
        
        if (hasNoindex) {
          reportData.blogBlocked.push({ url: rawUrl, path: pathName, lastCrawled, reason: 'Contains explicit noindex tag' });
        } else {
          reportData.blogActive.push({ url: rawUrl, path: pathName, lastCrawled });
        }
      } else {
        reportData.other.push({ url: rawUrl, path: pathName, lastCrawled, reason: 'Deprecated blog post or redirect source' });
      }
      continue;
    }

    // 4. Is it a Guide?
    if (pathName.startsWith('/guides/')) {
      const guide = guidePaths.get(pathName);
      if (guide) {
        reportData.guideActive.push({ url: rawUrl, path: pathName, lastCrawled });
      } else {
        reportData.other.push({ url: rawUrl, path: pathName, lastCrawled, reason: 'Deprecated guide path' });
      }
      continue;
    }

    // 5. Query string routes (e.g. ?page=3) or others
    if (rawUrl.includes('?')) {
      reportData.redirected.push({ url: rawUrl, path: pathName, lastCrawled, reason: 'Query string / pagination page (legitimate noindex)' });
      continue;
    }

    reportData.other.push({ url: rawUrl, path: pathName, lastCrawled, reason: 'Static utility path or non-published route' });
  }

  // Generate Report
  const totalProcessed = rows.length;
  console.log(`\n========================================`);
  console.log(`📊 NOINDEX COVERAGE AUDIT RESULTS`);
  console.log(`========================================`);
  console.log(`Total URLs analyzed: ${totalProcessed}`);
  console.log(`  Redirected/Query:  ${reportData.redirected.length}`);
  console.log(`  pSEO Active Now:   ${reportData.pseoActive.length}`);
  console.log(`  pSEO Drip-Blocked: ${reportData.pseoBlocked.length}`);
  console.log(`  Blog Active Now:   ${reportData.blogActive.length}`);
  console.log(`  Blog Blocked:      ${reportData.blogBlocked.length}`);
  console.log(`  Guides Active Now: ${reportData.guideActive.length}`);
  console.log(`  Deprecated/Other:  ${reportData.other.length}`);
  console.log(`========================================\n`);

  const reportPath = '/Users/ashwanikumar/.gemini/antigravity/brain/0297e945-61e0-4444-b294-8b6461dfbd30/noindex_coverage_audit.md';
  let md = `# Google Search Console "Excluded by noindex" Coverage Audit\n\n`;
  md += `This audit analyzes the **${totalProcessed} URLs** reported by Google Search Console as excluded by the 'noindex' tag. It checks their current code-level indexability state to determine if action is required.\n\n`;

  md += `## 📊 Summary Breakdown\n`;
  md += `| Category | URL Count | Action Required? | Description |\n`;
  md += `| :--- | :---: | :---: | :--- |\n`;
  md += `| **pSEO Pages (Active Now)** | ${reportData.pseoActive.length} | **Yes (Re-crawl needed)** | These pages are now fully published and indexable in the code, but Google's record is stale. |\n`;
  md += `| **Blog Posts (Active Now)** | ${reportData.blogActive.length} | **Yes (Re-crawl needed)** | These blogs are active and indexable, but Google has not re-crawled them since noindex was removed. |\n`;
  md += `| **Guides (Active Now)** | ${reportData.guideActive.length} | **Yes (Re-crawl needed)** | These guides are active and indexable, awaiting Google re-crawls. |\n`;
  md += `| **Redirected / Query Strings** | ${reportData.redirected.length} | No | Legitimate exclusions. Either redirected or pagination queries. |\n`;
  md += `| **Deprecated / Other** | ${reportData.other.length} | No | Old URL structures, drafts, or utility routes that do not need indexing. |\n\n`;

  md += `---\n\n`;

  md += `## 🚀 Active Pages Ready for Re-indexing (${reportData.pseoActive.length + reportData.blogActive.length + reportData.guideActive.length})\n`;
  md += `These URLs are now fully published and returning indexable directives. They should be submitted to Google for re-indexing immediately:\n\n`;

  md += `### Blog Posts & Guides\n`;
  [...reportData.blogActive, ...reportData.guideActive].forEach((item) => {
    md += `- [${item.path}](${item.url}) (Last crawled: ${item.lastCrawled})\n`;
  });

  md += `\n### Top Programmatic SEO Pages (Sample of 30)\n`;
  reportData.pseoActive.slice(0, 30).forEach((item) => {
    md += `- [${item.path}](${item.url}) (Last crawled: ${item.lastCrawled})\n`;
  });

  if (reportData.pseoActive.length > 30) {
    md += `\n*...and ${reportData.pseoActive.length - 30} more programmatic pages.*\n`;
  }

  md += `\n---\n\n`;

  md += `## 🔒 Legitimate Exclusions (No Action Needed — ${reportData.redirected.length + reportData.other.length})\n`;
  md += `These are correctly excluded from Google indexing to prevent duplicate content or search console errors:\n\n`;

  md += `### Redirects / Query Strings (Sample of 15)\n`;
  reportData.redirected.slice(0, 15).forEach((item) => {
    md += `- \`${item.path}\` (${item.reason || 'Redirected'})\n`;
  });

  md += `\n### Deprecated / Utilities (Sample of 15)\n`;
  reportData.other.slice(0, 15).forEach((item) => {
    md += `- \`${item.path}\` (${item.reason || 'Utility'})\n`;
  });

  fs.writeFileSync(reportPath, md, 'utf8');
  console.log(`🎉 Audit report successfully written to: ${reportPath}`);
}

run().catch(console.error);
