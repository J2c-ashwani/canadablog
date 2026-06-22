/**
 * scripts/audit-internal-links.ts
 *
 * Crawls the sitemap and spot-checks key internal routes for broken links.
 * Run: npx tsx scripts/audit-internal-links.ts
 * Or:  pnpm audit-links
 *
 * Output: reports/broken-links-audit.md
 */

import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.AUDIT_BASE_URL || 'https://www.fsidigital.ca';
const TIMEOUT_MS = 12000;
const CONCURRENCY = 5;

// ─── URL List ─────────────────────────────────────────────────────────────────
// Core routes to verify (add more as needed)
const CORE_ROUTES = [
  '/',
  '/grants',
  '/guides',
  '/download',
  '/calculator',
  '/grant-finder',
  '/audit',
  '/blog',
  '/tools',
  '/about',
  '/contact',
];

// Download pages (62 pages)
const DOWNLOAD_SLUGS = [
  'agriculture-agri-food-application-kit','ai-ml-grants-guide','alberta-business-grants-kit',
  'alberta-women-business-grants-guide','amber-grant-women-application-guide',
  'bc-women-business-grants-guide','bdc-women-entrepreneurs-financing-guide',
  'biotech-grants-guide','bmo-celebrating-women-grant-guide','british-columbia-grants-kit',
  'california-tech-guide','canada-aerospace-defence-funding-guide','canada-agri-food-funding-guide',
  'canada-cleantech-funding-guide','canada-digital-ai-funding-guide','canada-life-sciences-funding-guide',
  'canada-manufacturing-funding-guide','cartier-womens-initiative-application-guide',
  'clean-tech-energy-grants-guide','colorado-tech-guide','csbfp-application-kit',
  'csbfp-government-financing-kit','cybersecurity-grants-guide','dod-sbir-defense-tech-guide',
  'doe-sbir-clean-energy-guide','edc-women-trade-export-financing-guide','hardware-iot-grants-guide',
  'indigenous-rural-funding-kit','indigenous-women-business-grants-guide','irap-application-kit',
  'irap-government-application-kit','irap-innovation-application-guide','massachusetts-tech-guide',
  'nasa-sbir-space-tech-guide','new-york-tech-guide','nih-sbir-biotech-guide',
  'nserc-research-grants-guide','nsf-sbir-grants-guide','ontario-business-grants-kit',
  'ontario-women-business-grants-guide','quebec-business-grants-kit','quebec-women-business-grants-guide',
  'rbc-women-entrepreneur-awards-guide','rda-regional-application-kit','sba-application-checklist',
  'scotiabank-women-initiative-guide','sif-application-kit','software-saas-grants-guide',
  'sred-application-kit','usda-sbir-agtech-guide','washington-tech-guide','wbdc-equity-match-grant-guide',
  'wes-application-kit','women-clean-technology-grants-guide','women-entrepreneurship-application-kit',
  'women-entrepreneurship-fund-guide','women-entrepreneurship-loan-fund-guide',
  'women-export-trade-grants-guide','women-manufacturing-grants-guide','women-social-enterprise-grants-guide',
  'women-technology-grants-guide','youth-entrepreneurship-kit',
];

// Guides pages (39 pages)
const GUIDE_SLUGS = [
  'apply-agriculture-agri-food-canada','apply-alberta-business-grants','apply-british-columbia-grants',
  'apply-csbfp-government-financing','apply-csbfp-loans','apply-doe-clean-energy-grants',
  'apply-federal-grants','apply-indigenous-rural-business-funding','apply-irap-government-grants',
  'apply-irap-grants','apply-minority-grants','apply-ontario-business-grants',
  'apply-quebec-business-grants','apply-regional-development-agencies','apply-sba-loans',
  'apply-sbir-grants','apply-small-business-grants','apply-strategic-innovation-fund',
  'apply-women-entrepreneurship-strategy','apply-youth-entrepreneurship-funding',
  'bdc-women-entrepreneurs-financing-guide','california-loan-guarantee-guide',
  'canada-aerospace-defence-funding-guide','canada-agri-food-funding-guide',
  'canada-cleantech-funding-guide','canada-digital-ai-funding-guide',
  'canada-life-sciences-funding-guide','canada-manufacturing-funding-guide',
  'edc-women-trade-export-financing-guide','federal-grants-application-tips',
  'irap-innovation-application-guide','nserc-research-grants-guide','sba-application-process',
  'sba-growth-accelerator-fund-guide','sbir-research-grants-guide','sred-application-guide',
  'women-entrepreneurship-fund-guide','women-entrepreneurship-loan-fund-guide',
];

// Legacy consultation slugs (from VALID_CONSULTATIONS set)
const CONSULTATION_SLUGS = [
  'agriinnovate-consultation','canada-irap-consultation','canada-regional-development-consultation',
  'canexport-consultation','canada-cleantech-consultation','cdap-digital-consultation',
  'indigenous-business-consultation','canada-supercluster-consultation',
  'canada-financing-consultation','sred-tax-credit-consultation',
  'minority-business-grants-consultation','rural-business-development-consultation',
  'women-business-grants-consultation','healthcare-grants-consultation',
  'manufacturing-grants-consultation','tech-startup-grants-consultation',
  'california-business-grants-consultation','florida-business-grants-consultation',
  'illinois-business-grants-consultation','michigan-manufacturing-consultation',
  'new-york-business-grants-consultation','pennsylvania-innovation-consultation',
  'texas-business-grants-consultation','grant-application-review','free-grant-consultation',
  'doe-clean-energy-consultation','environmental-justice-consultation','cdbg-community-consultation',
  'nsf-sbir-masterclass','rural-grant-consultation','veteran-business-consultation',
  '24-hour-sprint','opportunity-triage','ai-grant-finder','emergency-grant-support',
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface AuditResult {
  url: string;
  status: number | null;
  ok: boolean;
  error?: string;
  redirected?: boolean;
  finalUrl?: string;
}

// ─── Fetch with timeout ────────────────────────────────────────────────────────
async function checkUrl(url: string): Promise<AuditResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': 'FSI-LinkAudit/1.0' },
    });
    clearTimeout(timer);
    return {
      url,
      status: res.status,
      ok: res.ok,
      redirected: res.redirected,
      finalUrl: res.url !== url ? res.url : undefined,
    };
  } catch (err: any) {
    clearTimeout(timer);
    return {
      url,
      status: null,
      ok: false,
      error: err.name === 'AbortError' ? 'TIMEOUT' : err.message,
    };
  }
}

// ─── Batch executor ───────────────────────────────────────────────────────────
async function runBatch(urls: string[]): Promise<AuditResult[]> {
  const results: AuditResult[] = [];
  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    const batch = urls.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map(checkUrl));
    results.push(...batchResults);
    process.stdout.write(`  Checked ${Math.min(i + CONCURRENCY, urls.length)}/${urls.length}\r`);
  }
  process.stdout.write('\n');
  return results;
}

// ─── Report writer ────────────────────────────────────────────────────────────
function writeReport(
  sections: Array<{ title: string; results: AuditResult[] }>,
  timestamp: string
) {
  const broken: AuditResult[] = [];
  const redirects: AuditResult[] = [];
  let totalOk = 0;
  let totalChecked = 0;

  let md = `# FSI Digital — Internal Link Audit Report\n\n`;
  md += `**Run at**: ${timestamp}  \n`;
  md += `**Base URL**: ${BASE_URL}  \n\n---\n\n`;

  for (const section of sections) {
    const sectionBroken = section.results.filter(r => !r.ok);
    const sectionRedirects = section.results.filter(r => r.ok && r.redirected);
    totalOk += section.results.filter(r => r.ok).length;
    totalChecked += section.results.length;
    broken.push(...sectionBroken);
    redirects.push(...sectionRedirects);

    md += `## ${section.title}\n\n`;
    md += `| Status | URL |\n|---|---|\n`;
    for (const r of section.results) {
      const icon = r.ok ? (r.redirected ? '🔀' : '✅') : '❌';
      const statusStr = r.status ? String(r.status) : r.error || 'ERR';
      const note = r.finalUrl ? ` → ${r.finalUrl}` : '';
      md += `| ${icon} ${statusStr} | \`${r.url}\`${note} |\n`;
    }
    md += `\n**${section.results.filter(r => r.ok).length}/${section.results.length} OK** | Broken: ${sectionBroken.length} | Redirects: ${sectionRedirects.length}\n\n---\n\n`;
  }

  // Summary
  md += `## Summary\n\n`;
  md += `| Metric | Value |\n|---|---|\n`;
  md += `| Total Checked | ${totalChecked} |\n`;
  md += `| ✅ OK | ${totalOk} |\n`;
  md += `| ❌ Broken | ${broken.length} |\n`;
  md += `| 🔀 Redirects | ${redirects.length} |\n\n`;

  if (broken.length > 0) {
    md += `### ❌ Broken URLs (Action Required)\n\n`;
    for (const r of broken) {
      md += `- \`${r.url}\` → ${r.status || r.error}\n`;
    }
    md += '\n';
  } else {
    md += `### ✅ No broken URLs found!\n\n`;
  }

  if (redirects.length > 0) {
    md += `### 🔀 Unexpected Redirects\n\n`;
    for (const r of redirects) {
      md += `- \`${r.url}\` → \`${r.finalUrl}\`\n`;
    }
    md += '\n';
  }

  return md;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const timestamp = new Date().toISOString();
  console.log(`\n🔍 FSI Digital Link Audit — ${timestamp}`);
  console.log(`📡 Base URL: ${BASE_URL}\n`);

  const allSections: Array<{ title: string; results: AuditResult[] }> = [];

  // Core routes
  console.log('🔵 Checking core routes...');
  const coreUrls = CORE_ROUTES.map(r => `${BASE_URL}${r}`);
  allSections.push({ title: 'Core Routes', results: await runBatch(coreUrls) });

  // Download pages
  console.log('📦 Checking /download pages...');
  const downloadUrls = DOWNLOAD_SLUGS.map(s => `${BASE_URL}/download/${s}`);
  allSections.push({ title: 'Download Pages (62)', results: await runBatch(downloadUrls) });

  // Guides pages
  console.log('📚 Checking /guides pages...');
  const guideUrls = GUIDE_SLUGS.map(s => `${BASE_URL}/guides/${s}`);
  allSections.push({ title: 'Guide Pages (39)', results: await runBatch(guideUrls) });

  // Consultation slugs
  console.log('📋 Checking consultation pages...');
  const consultUrls = CONSULTATION_SLUGS.map(s => `${BASE_URL}/${s}`);
  allSections.push({ title: 'Consultation Pages (35)', results: await runBatch(consultUrls) });

  // Write report
  const report = writeReport(allSections, timestamp);
  const reportPath = path.join(process.cwd(), 'reports', 'broken-links-audit.md');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, report, 'utf-8');

  // Print summary
  const totalChecked = allSections.reduce((s, sec) => s + sec.results.length, 0);
  const totalBroken = allSections.reduce((s, sec) => s + sec.results.filter(r => !r.ok).length, 0);
  const totalOk = totalChecked - totalBroken;

  console.log(`\n✅ Audit complete!`);
  console.log(`   Total checked: ${totalChecked}`);
  console.log(`   OK: ${totalOk}`);
  console.log(`   ❌ Broken: ${totalBroken}`);
  console.log(`\n📄 Report written to: reports/broken-links-audit.md\n`);

  if (totalBroken > 0) {
    process.exit(1); // Non-zero exit so CI fails on broken links
  }
}

main().catch(err => {
  console.error('Audit script failed:', err);
  process.exit(1);
});
