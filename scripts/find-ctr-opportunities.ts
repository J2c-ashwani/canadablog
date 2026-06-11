import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

// Load env variables
config({ path: '/Users/ashwanikumar/Downloads/canadablog/.env.local' });

import { getLeadsFromSheet } from '../lib/google-sheets';

const SITE_URL = 'https://www.fsidigital.ca';
const DEFAULT_DOWNLOADS_DIR = '/Users/ashwanikumar/Downloads';

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

// Clean and extract base program names for titles
function cleanBaseTitle(title: string): string {
  let cleaned = title.split('|')[0].split(':')[0].split('(')[0].split('[')[0].trim();
  // Strip years or ranges (e.g. 2025-2026, 2026-2027, 2026, 2025)
  cleaned = cleaned.replace(/\s*(202\d\s*-\s*202\d|202\d)/g, '').replace(/\s+/g, ' ').trim();
  return cleaned;
}

// Strict: 50-58 characters
function suggestTitle(title: string, maxGrant: string | null): string {
  const base = cleanBaseTitle(title);
  
  let suggestion = '';
  if (maxGrant) {
    suggestion = `${base} 2026: Get Up to ${maxGrant}`;
  } else {
    suggestion = `${base} 2026: Complete Guide`;
  }

  // Length constraints adjustment
  if (suggestion.length > 58) {
    if (maxGrant) {
      suggestion = `${base}: Get Up to ${maxGrant}`;
    } else {
      suggestion = `${base} 2026 Guide`;
    }
  }

  // Hard cut if still too long
  if (suggestion.length > 58) {
    suggestion = suggestion.substring(0, 55) + '...';
  }

  // Pad if too short
  if (suggestion.length < 50) {
    if (maxGrant && !suggestion.includes(maxGrant)) {
      suggestion = `${suggestion} (Get Up to ${maxGrant})`;
    } else if (!suggestion.includes('2026')) {
      suggestion = `${suggestion} 2026 Guide`;
    } else {
      suggestion = `${suggestion} — Apply Now`;
    }
  }

  if (suggestion.length > 58) {
    suggestion = suggestion.substring(0, 58);
  }
  
  return suggestion;
}

// Strict: 120-150 characters
function suggestDescription(title: string, maxGrant: string | null): string {
  const base = cleanBaseTitle(title);
  
  let suggestion = `Learn how to qualify and apply for ${base} in 2026. `;
  if (maxGrant) {
    suggestion += `Access up to ${maxGrant} in non-dilutive funding. `;
  } else {
    suggestion += `Access active government grants & loans. `;
  }
  suggestion += `See if you qualify.`;

  // Adjustments if too short or long
  if (suggestion.length > 150) {
    suggestion = `Guide to ${base} in 2026. Learn eligibility rules, requirements, and application steps. See if you qualify to apply.`;
  }
  
  if (suggestion.length < 120) {
    suggestion = `Our comprehensive 2026 guide to ${base}. Discover eligibility requirements, funding limits, and professional application steps to win. See if you qualify.`;
  }

  if (suggestion.length > 150) {
    suggestion = suggestion.substring(0, 147) + '...';
  }
  
  return suggestion;
}

// Auto-suggest search intent classification
function suggestIntent(category: string, title: string): string {
  const text = `${category} ${title}`.toLowerCase();
  if (text.includes('sred') || text.includes('sr&ed') || text.includes('tax credit') || text.includes('tax credits')) {
    return 'r_and_d';
  }
  if (text.includes('export') || text.includes('canexport')) {
    return 'export';
  }
  if (text.includes('hiring') || text.includes('workforce') || text.includes('training') || text.includes('employment')) {
    return 'hiring';
  }
  if (text.includes('loan') || text.includes('loans') || text.includes('csbfp')) {
    return 'loan';
  }
  if (text.includes('women') || text.includes('female')) {
    return 'women';
  }
  if (text.includes('startup') || text.includes('startups') || text.includes('accelerator') || text.includes('accelerators')) {
    return 'startup';
  }
  if (text.includes('manufacturing') || text.includes('industry 4.0') || text.includes('industrial') || text.includes('factory')) {
    return 'manufacturing';
  }
  if (text.includes('enterprise') || text.includes('scale-up')) {
    return 'enterprise';
  }
  if (text.includes('innovation') || text.includes('supercluster') || text.includes('research') || text.includes('nserc')) {
    return 'innovation';
  }
  return 'grant'; // default fallback
}

async function run() {
  console.log('🚀 Loading latest Search Console export...');
  const gscDir = findLatestGscDir();
  if (!gscDir) {
    console.error('❌ No GSC export directory found in /Users/ashwanikumar/Downloads');
    return;
  }
  console.log(`✅ Found latest GSC directory: ${gscDir}`);

  const pagesCsvPath = path.join(gscDir, 'Pages.csv');
  const gscPages = readCsv(pagesCsvPath);
  console.log(`Parsed ${gscPages.length} pages from GSC Pages.csv`);

  console.log('🚀 Fetching leads attribution from Google Sheets...');
  const leads = await getLeadsFromSheet(1500);
  console.log(`Fetched ${leads.length} leads from Google Sheets.`);

  // Aggregate leads by path
  const pageLeadsMap = new Map<string, { count: number; revenue: number }>();
  leads.forEach((lead) => {
    let rawPath = lead.pagePath || '';
    if (!rawPath) return;

    const cleanPath = rawPath.split('?')[0].replace(/\/$/, '') || '/';
    const current = pageLeadsMap.get(cleanPath) || { count: 0, revenue: 0 };
    
    current.count += 1;
    const rev = numberValue(lead.actualSignedValue) || numberValue(lead.estimatedValue) || 0;
    current.revenue += rev;

    pageLeadsMap.set(cleanPath, current);
  });

  // Load blog metadata to match slugs to files
  const metadataPath = path.join(__dirname, '../lib/data/blogMetadata.json');
  if (!fs.existsSync(metadataPath)) {
    console.error('❌ blogMetadata.json not found. Run generate-metadata.js first.');
    return;
  }
  const blogMetadataObj = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  const slugToPath = blogMetadataObj.slugToPath || {};

  require('ts-node').register({ transpileOnly: true });

  const enrichedPages: any[] = [];
  gscPages.forEach((row) => {
    const fullUrl = row['Top pages'] || row['Pages'] || '';
    const pathName = urlPath(fullUrl);
    
    if (!pathName.startsWith('/blog/')) return;
    const slug = pathName.replace('/blog/', '');
    
    const tsFileRelative = slugToPath[slug];
    if (!tsFileRelative) return;

    const clicks = numberValue(row.Clicks);
    const impressions = numberValue(row.Impressions);
    const ctr = numberValue(row.CTR);
    const position = numberValue(row.Position);

    const leadInfo = pageLeadsMap.get(pathName) || { count: 0, revenue: 0 };
    const conversionRate = clicks > 0 ? leadInfo.count / clicks : 0;

    enrichedPages.push({
      slug,
      path: pathName,
      tsFileRelative,
      clicks,
      impressions,
      ctr,
      position,
      leads: leadInfo.count,
      revenue: leadInfo.revenue,
      conversionRate,
    });
  });

  if (enrichedPages.length === 0) {
    console.log('No blog posts found matching GSC entries.');
    return;
  }

  // Max bounds for normalization
  const maxImpressions = Math.max(...enrichedPages.map(p => p.impressions), 1);
  const maxRevenue = Math.max(...enrichedPages.map(p => p.revenue), 1);
  const maxConvRate = Math.max(...enrichedPages.map(p => p.conversionRate), 1);

  enrichedPages.forEach((p) => {
    const impNorm = (p.impressions / maxImpressions) * 100;

    // Strike-zone ranking: position 5-15 gets highest score
    const rankOpportunity = p.position <= 15 ? Math.max(0, 20 - p.position) : 0;
    const rankNorm = (rankOpportunity / 20) * 100;

    const revNorm = (p.revenue / maxRevenue) * 100;
    const convNorm = (p.conversionRate / maxConvRate) * 100;

    // Weighting: 30% GSC Impressions, 25% Strike Position, 20% Revenue, 25% Conversion Rate
    p.priorityScore = Math.round((impNorm * 0.3) + (rankNorm * 0.25) + (revNorm * 0.2) + (convNorm * 0.25));
  });

  // Sort by priority score
  enrichedPages.sort((a, b) => b.priorityScore - a.priorityScore);

  const top25 = enrichedPages.slice(0, 25);

  // Generate recommendations
  top25.forEach((p) => {
    const absolutePostPath = path.join(__dirname, '../lib/data', p.tsFileRelative);
    try {
      const module = require(absolutePostPath);
      const post = module.default || module.post;

      if (post) {
        let maxGrant: string | null = null;
        if (post.metrics && Array.isArray(post.metrics)) {
          const grantMetric = post.metrics.find((m: any) => 
            String(m.label).toLowerCase().includes('max grant') || 
            String(m.label).toLowerCase().includes('fund pool') ||
            String(m.label).toLowerCase().includes('max funding')
          );
          if (grantMetric) maxGrant = grantMetric.value;
        }

        p.currentTitle = post.title || '';
        p.currentExcerpt = post.excerpt || '';
        p.currentMetaTitle = post.seo?.metaTitle || 'N/A';
        p.currentMetaDesc = post.seo?.metaDescription || 'N/A';
        p.currentIntent = post.seo?.intent || 'N/A';

        // Suggestions
        p.suggestedTitle = suggestTitle(post.title || '', maxGrant);
        p.suggestedDesc = suggestDescription(post.title || '', maxGrant);
        p.suggestedIntent = suggestIntent(post.category || '', post.title || '');
      }
    } catch (err: any) {
      console.warn(`[WARN] Failed to load TS post content for ${p.slug}: ${err.message}`);
    }
  });

  // Write reports
  let md = `# SEO Audit Report — Top 25 CTR & Revenue Opportunities\n\n`;
  md += `This report lists the Top 25 opportunity blog posts prioritized by GSC traffic potential, striking-zone rankings, attributed revenue, and lead conversion rates.\n\n`;
  md += `### 📊 Priority Scoring Formula\n`;
  md += `$$\\text{seoPriorityScore} = (I_{\\text{norm}} \\times 0.3) + (R_{\\text{norm}} \\times 0.25) + (Rev_{\\text{norm}} \\times 0.2) + (Conv_{\\text{norm}} \\times 0.25)$$\n\n`;
  
  md += `### ❌ Top 25 Opportunity List\n\n`;
  md += `| Rank | Page Title (Path) | Impressions | CTR | Position | Revenue | Conv % | Score | Suggested Title (Len) | Suggested Description (Len) | Suggested Intent |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  top25.forEach((p, idx) => {
    md += `| **${idx + 1}** | **[${p.currentTitle || p.slug}](file://${path.join(__dirname, '../lib/data', p.tsFileRelative)})**<br/>\`${p.path}\` | ${p.impressions.toLocaleString()} | ${(p.ctr * 100).toFixed(2)}% | ${p.position.toFixed(1)} | \$${p.revenue.toLocaleString()} | ${(p.conversionRate * 100).toFixed(1)}% | **${p.priorityScore}** | \`${p.suggestedTitle}\` (${p.suggestedTitle?.length}) | \`${p.suggestedDesc}\` (${p.suggestedDesc?.length}) | \`${p.suggestedIntent}\` |\n`;
  });

  const reportPath = '/Users/ashwanikumar/.gemini/antigravity/brain/c98d6492-5ab6-45be-a762-5b4ed8c4aa14/seo_ctr_opportunities.md';
  fs.writeFileSync(reportPath, md, 'utf8');
  console.log(`\n🎉 Success! Opportunity report written to: ${reportPath}`);

  const configPath = path.join(__dirname, 'seo-recommendations.json');
  const recommendations = top25.map((p) => ({
    slug: p.slug,
    path: p.path,
    tsFileRelative: p.tsFileRelative,
    suggestedTitle: p.suggestedTitle,
    suggestedDesc: p.suggestedDesc,
    suggestedIntent: p.suggestedIntent,
  }));
  fs.writeFileSync(configPath, JSON.stringify(recommendations, null, 2), 'utf8');
  console.log(`Generated recommendations JSON for AST modifications at: ${configPath}`);
}

run().catch(console.error);
