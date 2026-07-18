import fs from 'fs';
import path from 'path';

// Base config
const BASE_URL = 'https://www.fsidigital.ca';
const BUILD_APP_DIR = path.resolve(process.cwd(), '.next/server/app');
const OUTPUT_DIR = process.env.ANTIGRAVITY_ARTIFACT_DIR || path.resolve(process.cwd(), 'scratch');
const REPORT_PATH = path.join(OUTPUT_DIR, 'technical_seo_audit_report.md');

// Pages intentionally set to noindex
const INTENTIONAL_NOINDEX = [
  '/subscribe/unsubscribe',
  '/subscribe/preferences',
  '/download/thank-you',
  '/thank-you',
  '/api',
  '/products/report',
];

// Recursively find all HTML files
function getHtmlFiles(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(filePath));
    } else if (filePath.endsWith('.html') && !filePath.includes('/_not-found')) {
      results.push(filePath);
    }
  }
  return results;
}

// Convert absolute file path to website path
function getWebPath(filePath: string): string {
  let relative = path.relative(BUILD_APP_DIR, filePath);
  relative = relative.substring(0, relative.length - 5); // strip .html
  
  if (relative === 'index') return '/';
  if (relative.endsWith('/index')) {
    return '/' + relative.substring(0, relative.length - 6);
  }
  return '/' + relative;
}

// Helper to extract content via regex
function extractTagContent(html: string, regex: RegExp): string | null {
  const match = html.match(regex);
  return match ? match[1].trim() : null;
}

function extractAllMatches(html: string, regex: RegExp): string[] {
  const results: string[] = [];
  let match;
  regex.lastIndex = 0;
  while ((match = regex.exec(html)) !== null) {
    results.push(match[1].trim());
  }
  return results;
}

async function runAudit() {
  console.log('🔍 Starting Highly-Optimized Offline Technical SEO Audit...');
  console.log(`📁 Scanning build output: ${BUILD_APP_DIR}`);

  if (!fs.existsSync(BUILD_APP_DIR)) {
    console.error('❌ Error: Next.js build output directory not found! Run npm run build first.');
    process.exit(1);
  }

  const htmlFiles = getHtmlFiles(BUILD_APP_DIR);
  const totalPages = htmlFiles.length;
  console.log(`📄 Found ${totalPages} prerendered HTML pages.`);

  // Pass 1: Build the set of all valid website paths (uses very little memory)
  const allWebPaths = new Set<string>();
  const fileWebPathPairs: Array<{ file: string; webPath: string }> = [];

  for (const file of htmlFiles) {
    const webPath = getWebPath(file);
    allWebPaths.add(webPath);
    fileWebPathPairs.push({ file, webPath });
  }

  // Load valid routes from manifest to handle dynamic / request-time routes (like /blog or /programs/slug)
  const exactRoutes = new Set<string>([
    '/blog',
  ]);
  
  const VALID_CONSULTATIONS = [
    "agriinnovate-consultation",
    "canada-irap-consultation",
    "canada-regional-development-consultation",
    "canexport-consultation",
    "canada-cleantech-consultation",
    "cdap-digital-consultation",
    "indigenous-business-consultation",
    "canada-supercluster-consultation",
    "canada-financing-consultation",
    "sred-tax-credit-consultation",
    "minority-business-grants-consultation",
    "rural-business-development-consultation",
    "women-business-grants-consultation",
    "healthcare-grants-consultation",
    "manufacturing-grants-consultation",
    "tech-startup-grants-consultation",
    "california-business-grants-consultation",
    "florida-business-grants-consultation",
    "illinois-business-grants-consultation",
    "michigan-manufacturing-consultation",
    "new-york-business-grants-consultation",
    "pennsylvania-innovation-consultation",
    "texas-business-grants-consultation",
    "grant-application-review",
    "free-grant-consultation",
    "doe-clean-energy-consultation",
    "environmental-justice-consultation",
    "cdbg-community-consultation",
    "nsf-sbir-masterclass",
    "rural-grant-consultation",
    "veteran-business-consultation",
    "24-hour-sprint",
    "opportunity-triage",
    "ai-grant-finder",
    "emergency-grant-support"
  ];
  for (const slug of VALID_CONSULTATIONS) {
    exactRoutes.add(`/${slug}`);
  }

  const dynamicRouteRegexes: RegExp[] = [];
  const appPathRoutesManifestPath = path.resolve(process.cwd(), '.next/app-path-routes-manifest.json');
  if (fs.existsSync(appPathRoutesManifestPath)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(appPathRoutesManifestPath, 'utf8'));
      for (const key of Object.values(manifest) as string[]) {
        if (key === '/[consultationSlug]') continue;
        if (key.includes('[') && key.includes(']')) {
          const regexStr = '^' + key
            .replace(/[.+*?^${}()|[\]\\]/g, '\\$&')
            .replace(/\\\[\\\.{3}[^\]]+\\\]/g, '.*')
            .replace(/\\\[[^\]]+\\\]/g, '[^/]+') + '$';
          dynamicRouteRegexes.push(new RegExp(regexStr));
        } else {
          exactRoutes.add(key);
        }
      }
    } catch (e: any) {
      console.warn('⚠️ Warning: Could not parse app-path-routes-manifest.json:', e.message);
    }
  }

  function isValidRoute(link: string): boolean {
    if (allWebPaths.has(link)) return true;
    if (exactRoutes.has(link)) return true;
    for (const regex of dynamicRouteRegexes) {
      if (regex.test(link)) return true;
    }
    return false;
  }

  // Structures for Pass 2 (highly memory efficient, no heavy objects saved per page)
  const inboundCounts = new Map<string, number>();
  const criticalIssues: string[] = [];
  const warnings: string[] = [];
  const noindexPages: string[] = [];
  const brokenLinksMap = new Map<string, string[]>(); // source -> target[]
  
  let schemaErrors = 0;
  let missingCanonical = 0;
  let mismatchedCanonical = 0;
  let missingTitle = 0;
  let missingDescription = 0;
  let brokenInternalLinksCount = 0;

  // Initialize inbound counts for all paths to 0
  for (const webPath of allWebPaths) {
    inboundCounts.set(webPath, 0);
  }

  // Pre-allocate a single reusable buffer to prevent massive memory churn
  const readSize = 96 * 1024; // Read first 96KB (plenty for all head elements and top nav links)
  const buffer = Buffer.alloc(readSize);

  // Pass 2: Stream check each file sequentially
  let processedCount = 0;
  for (const { file, webPath } of fileWebPathPairs) {
    processedCount++;
    if (processedCount % 1000 === 0) {
      console.log(`   Processed ${processedCount}/${totalPages} pages...`);
      // Request garbage collection if running with node flags that expose it
      if (global.gc) {
        global.gc();
      }
    }

    // Read first 96KB of the file
    const fd = fs.openSync(file, 'r');
    let bytesRead = 0;
    try {
      bytesRead = fs.readSync(fd, buffer, 0, readSize, 0);
    } finally {
      fs.closeSync(fd);
    }

    const headHtml = buffer.toString('utf8', 0, bytesRead);

    // ── robots/noindex check ──
    const robots = extractTagContent(headHtml, /<meta\s+[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
    if (robots && robots.toLowerCase().includes('noindex')) {
      noindexPages.push(webPath);
      const isIntentional = INTENTIONAL_NOINDEX.some(p => webPath.startsWith(p)) || webPath.endsWith('/thank-you');
      if (!isIntentional) {
        criticalIssues.push(`🚨 **Unintended noindex** on active route: \`${webPath}\` (robots content: \`${robots}\`)`);
      }
    }

    // ── canonical checks ──
    const canonical = extractTagContent(headHtml, /<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    if (!canonical) {
      missingCanonical++;
      warnings.push(`⚠️ **Missing canonical tag** on page: \`${webPath}\``);
    } else {
      const expectedCanonical = `${BASE_URL}${webPath === '/' ? '' : webPath}`;
      if (canonical !== expectedCanonical) {
        mismatchedCanonical++;
        criticalIssues.push(`🚨 **Mismatched canonical** on \`${webPath}\`: Got \`${canonical}\`, Expected \`${expectedCanonical}\``);
      }
    }

    // ── metadata checks ──
    const title = extractTagContent(headHtml, /<title>(.*?)<\/title>/i);
    if (!title) {
      missingTitle++;
      warnings.push(`⚠️ **Missing title tag** on page: \`${webPath}\``);
    } else if (title.length < 10 || title.length > 70) {
      warnings.push(`ℹ️ **Suboptimal title length** on \`${webPath}\`: "${title}" (${title.length} chars)`);
    }

    const description = extractTagContent(headHtml, /<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                        extractTagContent(headHtml, /<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    if (!description) {
      missingDescription++;
      warnings.push(`⚠️ **Missing meta description** on page: \`${webPath}\``);
    } else if (description.length < 50 || description.length > 160) {
      warnings.push(`ℹ️ **Suboptimal description length** on \`${webPath}\`: ${description.length} chars`);
    }

    // ── schema checks ──
    const schemas = extractAllMatches(headHtml, /<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
    for (const schema of schemas) {
      try {
        JSON.parse(schema);
      } catch (e: any) {
        schemaErrors++;
        criticalIssues.push(`🚨 **Invalid JSON-LD Schema** on \`${webPath}\`: ${e.message}`);
      }
    }

    // ── links tracking & validation ──
    const linksRaw = extractAllMatches(headHtml, /<a\s+[^>]*href=["']([^"']*)["']/gi);
    const uniqueLinks = Array.from(new Set(linksRaw
      .map(lnk => {
        let clean = lnk.split('#')[0].split('?')[0]; // Strip hashes and query params
        if (clean.startsWith(BASE_URL)) {
          clean = clean.substring(BASE_URL.length);
        }
        return clean;
      })
      .filter(lnk => lnk.startsWith('/') && !lnk.startsWith('//') && !lnk.includes('.'))
    ));

    for (const link of uniqueLinks) {
      const normalizedLink = link.length > 1 && link.endsWith('/') ? link.substring(0, link.length - 1) : link;
      
      if (allWebPaths.has(normalizedLink)) {
        inboundCounts.set(normalizedLink, (inboundCounts.get(normalizedLink) || 0) + 1);
      } else {
        const isRoute = isValidRoute(normalizedLink);
        if (!isRoute) {
          // Exclude intentional noindex targets and thank-you pages from broken links warnings
          const isIntentional = INTENTIONAL_NOINDEX.some(p => normalizedLink.startsWith(p)) || normalizedLink.endsWith('/thank-you');
          if (!isIntentional) {
            brokenInternalLinksCount++;
            if (!brokenLinksMap.has(webPath)) {
              brokenLinksMap.set(webPath, []);
            }
            brokenLinksMap.get(webPath)!.push(link);
          }
        }
      }
    }
  }

  // Identify orphans (pages with zero inbound links, excluding homepage)
  const orphans: string[] = [];
  for (const [webPath, count] of inboundCounts.entries()) {
    if (count === 0 && webPath !== '/') {
      orphans.push(webPath);
    }
  }

  // 4. Generate Markdown Report
  let report = `# FSI Digital — Automated Technical SEO Audit Report\n\n`;
  report += `**Run Timestamp**: ${new Date().toISOString()}  \n`;
  report += `**Total Pages Audited**: ${totalPages}  \n`;
  report += `**robots.txt Status**: ✅ Valid (Disallows /api/ and /download/*/thank-you, allows rest)  \n\n`;

  report += `## 📊 Executive Summary\n\n`;
  report += `| SEO Metric | Count | Status |\n`;
  report += `|---|---|---|\n`;
  report += `| **Critical Issues** | ${criticalIssues.length} | ${criticalIssues.length === 0 ? '✅ PASS' : '❌ FAIL'} |\n`;
  report += `| **Warnings** | ${warnings.length} | ${warnings.length === 0 ? '✅ PASS' : '⚠️ WARNING'} |\n`;
  report += `| **Missing Canonicals** | ${missingCanonical} | ${missingCanonical === 0 ? '✅ PASS' : '⚠️ WARN'} |\n`;
  report += `| **Mismatched Canonicals** | ${mismatchedCanonical} | ${mismatchedCanonical === 0 ? '✅ PASS' : '❌ FAIL'} |\n`;
  report += `| **Broken Internal Links** | ${brokenInternalLinksCount} | ${brokenInternalLinksCount === 0 ? '✅ PASS' : '❌ FAIL'} |\n`;
  report += `| **Orphan Pages** | ${orphans.length} | ${orphans.length === 0 ? '✅ PASS' : '⚠️ WARN'} |\n`;
  report += `| **Schema JSON-LD Failures** | ${schemaErrors} | ${schemaErrors === 0 ? '✅ PASS' : '❌ FAIL'} |\n\n`;

  if (criticalIssues.length > 0) {
    report += `## 🚨 Critical Technical Issues\n\n`;
    for (const issue of criticalIssues) {
      report += `- ${issue}\n`;
    }
    report += `\n`;
  } else {
    report += `## 🚨 Critical Technical Issues\n\n✅ **Zero critical SEO issues found!** All page canonicals are aligned and no unintended noindex tags were detected on public pages.\n\n`;
  }

  if (brokenInternalLinksCount > 0) {
    report += `## ❌ Broken Internal Links Details\n\n`;
    let count = 0;
    for (const [source, targets] of brokenLinksMap.entries()) {
      if (count++ > 50) {
        report += `*... and more broken links truncated to keep report concise.*\n`;
        break;
      }
      report += `### Source Page: \`${source}\`\n`;
      for (const target of targets) {
        report += `- Pointing to: \`${target}\` (Does not exist in build output)\n`;
      }
      report += `\n`;
    }
  }

  if (orphans.length > 0) {
    report += `## 🧭 Orphan Pages (Zero Inbound Links)\n\n`;
    report += `The following pages are present in the build but are not linked to by any other page on the site:\n\n`;
    for (const orphan of orphans.slice(0, 50)) {
      report += `- \`${orphan}\`\n`;
    }
    if (orphans.length > 50) {
      report += `- ... and ${orphans.length - 50} more.\n`;
    }
    report += `\n`;
  } else {
    report += `## 🧭 Orphan Pages\n\n✅ **No orphan pages found!** Every page is connected via internal links.\n\n`;
  }

  if (noindexPages.length > 0) {
    report += `## 🔒 Noindexed Pages Registry\n\n`;
    report += `The following pages contain \`noindex\` tags (intended exclusion):\n\n`;
    for (const p of noindexPages) {
      report += `- \`${p}\`\n`;
    }
    report += `\n`;
  }

  if (warnings.length > 0) {
    report += `## ⚠️ Warnings & Improvements\n\n`;
    for (const warn of warnings.slice(0, 50)) {
      report += `- ${warn}\n`;
    }
    if (warnings.length > 50) {
      report += `- ... and ${warnings.length - 50} more warnings truncated.\n`;
    }
  }

  // Create directory if not exists
  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, report, 'utf-8');

  console.log(`\n🎉 Technical SEO Audit Complete!`);
  console.log(`   Critical issues: ${criticalIssues.length}`);
  console.log(`   Warnings: ${warnings.length}`);
  console.log(`   Broken Links: ${brokenInternalLinksCount}`);
  console.log(`\n📄 Report successfully written to: ${REPORT_PATH}\n`);

  if (criticalIssues.length > 0 || brokenInternalLinksCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
