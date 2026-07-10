import fs from 'fs';
import path from 'path';

const coveragePath = '/Users/ashwanikumar/Downloads/canadablog/fsidigital.ca-Coverage-Valid-2026-07-10/Table.csv';
const pagesPath = '/Users/ashwanikumar/Downloads/canadablog/3monthGSCdata/Pages.csv';
const queriesPath = '/Users/ashwanikumar/Downloads/canadablog/3monthGSCdata/Queries.csv';
const outputPath = '/Users/ashwanikumar/Downloads/canadablog/lib/data/seo-backlog.json';

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// 1. Read files
if (!fs.existsSync(coveragePath) || !fs.existsSync(pagesPath) || !fs.existsSync(queriesPath)) {
  console.error("Required GSC or coverage CSV files are missing!");
  process.exit(1);
}

const coverageLines = fs.readFileSync(coveragePath, 'utf8').split('\n').filter(Boolean);
const pagesLines = fs.readFileSync(pagesPath, 'utf8').split('\n').filter(Boolean);
const queriesLines = fs.readFileSync(queriesPath, 'utf8').split('\n').filter(Boolean);

// 2. Parse indexed URLs
const indexedUrls = new Set<string>();
for (const line of coverageLines.slice(1)) {
  const parts = parseCSVLine(line);
  if (parts[0]) {
    indexedUrls.add(parts[0].replace('https://www.fsidigital.ca', ''));
  }
}

// 3. Parse query metrics for matching primary keywords
interface QueryMetric {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}
const queriesList: QueryMetric[] = [];
for (const line of queriesLines.slice(1)) {
  const parts = parseCSVLine(line);
  if (parts.length >= 5) {
    queriesList.push({
      query: parts[0],
      clicks: parseInt(parts[1]) || 0,
      impressions: parseInt(parts[2]) || 0,
      ctr: parseFloat(parts[3].replace('%', '')) || 0,
      position: parseFloat(parts[4]) || 0
    });
  }
}

// 4. Parse page performance metrics
interface PagePerformance {
  url: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}
const pagePerfList: PagePerformance[] = [];
for (const line of pagesLines.slice(1)) {
  const parts = parseCSVLine(line);
  if (parts.length >= 5) {
    pagePerfList.push({
      url: parts[0].replace('https://www.fsidigital.ca', ''),
      clicks: parseInt(parts[1]) || 0,
      impressions: parseInt(parts[2]) || 0,
      ctr: parseFloat(parts[3].replace('%', '')) || 0,
      position: parseFloat(parts[4]) || 0
    });
  }
}

// Helper to determine primary query based on URL terms
function findPrimaryQuery(urlPath: string): string {
  const slug = urlPath.split('/').filter(Boolean).pop() || '';
  if (!slug) return 'fsidigital homepage';
  const cleanSlug = slug.replace(/-/g, ' ');
  
  // Find a query in Queries.csv that matches clean slug keywords
  const slugKeywords = cleanSlug.split(' ');
  let bestMatch = cleanSlug;
  let maxImpressions = -1;
  
  for (const qObj of queriesList) {
    // If the query contains any of the main slug keywords, it is a candidate
    const matchCount = slugKeywords.filter(kw => kw.length > 3 && qObj.query.toLowerCase().includes(kw)).length;
    if (matchCount >= 2 && qObj.impressions > maxImpressions) {
      bestMatch = qObj.query;
      maxImpressions = qObj.impressions;
    }
  }
  return bestMatch;
}

// 5. Score opportunities
const scoredList = pagePerfList.map(page => {
  const pathUrl = page.url === '/' ? '/' : page.url;
  const isIndexed = indexedUrls.has(pathUrl);
  
  // Search Volume Score (S - 25%): based on page impressions
  let searchVolumeScore = 10;
  if (page.impressions > 5000) searchVolumeScore = 100;
  else if (page.impressions > 1000) searchVolumeScore = 80;
  else if (page.impressions > 500) searchVolumeScore = 60;
  else if (page.impressions > 100) searchVolumeScore = 40;
  else if (page.impressions > 10) searchVolumeScore = 20;

  // Commercial Intent Score (I - 25%)
  let commercialIntentScore = 40;
  if (pathUrl.includes('grant') || pathUrl.includes('loan') || pathUrl.includes('funding')) {
    commercialIntentScore = 100;
  } else if (pathUrl.includes('tax-credit') || pathUrl.includes('sred') || pathUrl.includes('incentive')) {
    commercialIntentScore = 90;
  } else if (pathUrl.includes('guide') || pathUrl.includes('program')) {
    commercialIntentScore = 70;
  }

  // Business Impact Score (B - 20%): based on monetization rules
  let businessImpactScore = 10;
  let monetizationPath = 'No monetization / generic info';
  if (pathUrl.includes('sred') || pathUrl.includes('irap') || pathUrl.includes('filing')) {
    businessImpactScore = 100;
    monetizationPath = 'Direct filing opportunity';
  } else if (pathUrl.includes('manufacturing') || pathUrl.includes('cybersecurity') || pathUrl.includes('technology') || pathUrl.includes('innovation')) {
    businessImpactScore = 70;
    monetizationPath = 'Audit booking opportunity';
  } else if (pathUrl.includes('alberta') || pathUrl.includes('ontario') || pathUrl.includes('bc') || pathUrl.includes('quebec') || pathUrl.includes('manitoba') || pathUrl.includes('saskatchewan') || pathUrl.includes('atlantic')) {
    businessImpactScore = 40;
    monetizationPath = 'Report bundle only';
  }

  // Ranking Opportunity Score (O - 20%)
  let rankingOpportunityScore = 20;
  if (page.position >= 20 && page.position <= 50) {
    rankingOpportunityScore = 100;
  } else if (page.position > 50 && page.position <= 100) {
    rankingOpportunityScore = 70;
  } else if (page.position > 100) {
    rankingOpportunityScore = 50;
  }

  // CTR Opportunity Score (C - 10%)
  let expectedCtr = 0.5;
  if (page.position < 3) expectedCtr = 15;
  else if (page.position < 10) expectedCtr = 5;
  else if (page.position < 30) expectedCtr = 1.5;
  
  const ctrOpportunityScore = page.ctr < expectedCtr ? 100 : 20;

  // Compute final Opportunity Score
  const opportunityScore = Math.round(
    (0.25 * searchVolumeScore) +
    (0.25 * commercialIntentScore) +
    (0.20 * businessImpactScore) +
    (0.20 * rankingOpportunityScore) +
    (0.10 * ctrOpportunityScore)
  );

  // Estimate Engineering Hours
  let engineeringEffort = 3; // Low
  if (pathUrl.includes('manufacturing') || pathUrl.includes('cybersecurity') || pathUrl.includes('technology') || pathUrl.includes('innovation')) {
    engineeringEffort = 7; // High
  } else if (pathUrl.includes('alberta') || pathUrl.includes('ontario') || pathUrl.includes('bc') || pathUrl.includes('quebec') || pathUrl.includes('manitoba') || pathUrl.includes('saskatchewan') || pathUrl.includes('atlantic')) {
    engineeringEffort = 5; // Medium
  }

  // Calculate Expected ROI
  const roiRatio = opportunityScore / engineeringEffort;
  let expectedRoi = 'Medium';
  if (roiRatio >= 18) expectedRoi = 'Very High';
  else if (roiRatio >= 14) expectedRoi = 'High';

  // Determine Priority Bucket
  let priorityBucket = 'Bucket D — Ignore';
  if (page.position >= 20 && page.position <= 50 && commercialIntentScore >= 70) {
    priorityBucket = 'Bucket A — Fast Wins';
  } else if (page.position > 50 && page.position <= 100 && commercialIntentScore >= 70) {
    priorityBucket = 'Bucket B — Medium Wins';
  } else if (page.position > 100 && isIndexed && page.impressions > 0 && commercialIntentScore >= 70) {
    priorityBucket = 'Bucket C — Breakthroughs';
  }

  // Determine Recommendation
  let recommendation = 'Inject Custom Stacking Component';
  if (ctrOpportunityScore === 100 && page.position < 50) {
    recommendation = 'Improve Title & Snippet (CTR Tuning)';
  } else if (page.position > 50 && page.impressions > 100) {
    recommendation = 'Expand Content Cluster & Internal Links';
  } else if (page.position > 100) {
    recommendation = 'Align Content Structure to Search Intent';
  }

  return {
    url: pathUrl,
    primaryKeyword: findPrimaryQuery(pathUrl),
    impressions: page.impressions,
    clicks: page.clicks,
    ctr: page.ctr,
    position: parseFloat(page.position.toFixed(2)),
    opportunityScore,
    priorityBucket,
    monetizationPath,
    engineeringEffort,
    expectedRoi,
    recommendation,
    isIndexed
  };
});

// Filter to top 100 opportunities sorting by score descending
const top100Backlog = scoredList
  .filter(p => p.priorityBucket !== 'Bucket D — Ignore')
  .sort((a, b) => b.opportunityScore - a.opportunityScore)
  .slice(0, 100);

fs.writeFileSync(outputPath, JSON.stringify(top100Backlog, null, 2), 'utf8');
console.log(`Successfully generated dynamic SEO backlog with ${top100Backlog.length} scored opportunities at ${outputPath}`);
