import fs from 'fs';
import path from 'path';

const coveragePath = '/Users/ashwanikumar/Downloads/canadablog/fsidigital.ca-Coverage-Valid-2026-07-10/Table.csv';
const pagesPath = '/Users/ashwanikumar/Downloads/canadablog/3monthGSCdata/Pages.csv';
const queriesPath = '/Users/ashwanikumar/Downloads/canadablog/3monthGSCdata/Queries.csv';
const blogContentDir = '/Users/ashwanikumar/Downloads/canadablog/lib/data/blog-content';
const keywordVolumesPath = '/Users/ashwanikumar/Downloads/canadablog/lib/data/keyword-volumes.json';
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
const keywordVolumes = fs.existsSync(keywordVolumesPath) 
  ? JSON.parse(fs.readFileSync(keywordVolumesPath, 'utf8'))
  : {};

// 2. Parse indexed URLs
const indexedUrls = new Set<string>();
for (const line of coverageLines.slice(1)) {
  const parts = parseCSVLine(line);
  if (parts[0]) {
    indexedUrls.add(parts[0].replace('https://www.fsidigital.ca', ''));
  }
}

// 3. Parse query metrics
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
const pagePerfMap = new Map<string, PagePerformance>();
for (const line of pagesLines.slice(1)) {
  const parts = parseCSVLine(line);
  if (parts.length >= 5) {
    const urlPath = parts[0].replace('https://www.fsidigital.ca', '');
    pagePerfMap.set(urlPath, {
      url: urlPath,
      clicks: parseInt(parts[1]) || 0,
      impressions: parseInt(parts[2]) || 0,
      ctr: parseFloat(parts[3].replace('%', '')) || 0,
      position: parseFloat(parts[4]) || 0
    });
  }
}

// Helper to determine primary query and estimate total search demand
interface QueryMatch {
  primaryKeyword: string;
  estimatedDemand: number;
}

function findPrimaryQueryAndDemand(urlPath: string): QueryMatch {
  const slug = urlPath.split('/').filter(Boolean).pop() || '';
  if (!slug) return { primaryKeyword: 'fsidigital homepage', estimatedDemand: 5000 };
  
  let fallbackKeyword = slug.replace(/-/g, ' ');
  if (slug.includes('alberta')) fallbackKeyword = 'alberta small business grants';
  else if (slug.includes('quebec')) fallbackKeyword = 'quebec small business grants';
  else if (slug.includes('saskatchewan')) fallbackKeyword = 'saskatchewan small business grants';
  else if (slug.includes('manitoba')) fallbackKeyword = 'manitoba small business grants';
  else if (slug.includes('bc-') || slug.includes('british-columbia')) fallbackKeyword = 'bc small business grants';
  else if (slug.includes('ontario')) fallbackKeyword = 'ontario small business grants';
  else if (slug.includes('atlantic')) fallbackKeyword = 'atlantic business grants';
  else if (slug.includes('cybersecurity')) fallbackKeyword = 'cybersecurity grants canada';
  else if (slug.includes('agriculture') || slug.includes('agri')) fallbackKeyword = 'agriculture startup grants';
  else if (slug.includes('manufacturing')) fallbackKeyword = 'manufacturing grants canada';
  else if (slug.includes('sred')) fallbackKeyword = 'sred tax credit canada';
  else if (slug.includes('irap')) fallbackKeyword = 'irap grants canada';
  else if (slug.includes('women')) fallbackKeyword = 'women entrepreneur grants canada';
  else if (slug.includes('veteran')) fallbackKeyword = 'veteran business grants canada';
  else if (slug.includes('indigenous')) fallbackKeyword = 'indigenous entrepreneur grants';
  else if (slug.includes('clean-tech') || slug.includes('green')) fallbackKeyword = 'clean tech grants canada';

  let bestMatch = fallbackKeyword;
  let maxImpressions = -1;
  let totalDemandAccumulator = 100;

  const searchTerms = slug.split('-');
  const pathLower = urlPath.toLowerCase();

  for (const qObj of queriesList) {
    const queryLower = qObj.query.toLowerCase();

    // STRICT SYMMETRIC GEOGRAPHIC & TOPICAL MATCH EXCLUSIONS
    if (pathLower.includes('alberta') !== queryLower.includes('alberta')) continue;
    if (pathLower.includes('quebec') !== queryLower.includes('quebec')) continue;
    if (pathLower.includes('saskatchewan') !== queryLower.includes('saskatchewan')) continue;
    if (pathLower.includes('manitoba') !== queryLower.includes('manitoba')) continue;
    if (pathLower.includes('ontario') !== queryLower.includes('ontario')) continue;
    if ((pathLower.includes('bc-') || pathLower.includes('british') || pathLower.includes('/bc/')) !== (queryLower.includes('bc') || queryLower.includes('british') || queryLower.includes('vancouver'))) continue;
    if (pathLower.includes('atlantic') !== (queryLower.includes('atlantic') || queryLower.includes('acoa'))) continue;
    if (pathLower.includes('cybersecurity') !== (queryLower.includes('cyber') || queryLower.includes('security'))) continue;
    if (pathLower.includes('sred') !== queryLower.includes('sred')) continue;
    if (pathLower.includes('irap') !== queryLower.includes('irap')) continue;
    
    // Canada vs USA cross-border query containment matching
    const isCanadaPage = pathLower.includes('canada') || pathLower.includes('canadian') || pathLower.includes('ontario') || pathLower.includes('quebec') || pathLower.includes('alberta') || pathLower.includes('bc') || pathLower.includes('manitoba') || pathLower.includes('saskatchewan') || pathLower.includes('atlantic') || pathLower.includes('sred') || pathLower.includes('irap');
    const isCanadaQuery = queryLower.includes('canada') || queryLower.includes('canadian') || queryLower.includes('ontario') || queryLower.includes('quebec') || queryLower.includes('alberta') || queryLower.includes('bc ') || queryLower.includes('vancouver') || queryLower.includes('toronto') || queryLower.includes('sred') || queryLower.includes('irap') || queryLower.includes('manitoba') || queryLower.includes('saskatchewan') || queryLower.includes('atlantic') || queryLower.includes('acoa');

    if (isCanadaPage !== isCanadaQuery) continue;

    // Strict thematic exclusions
    if (slug.includes('clean') && !queryLower.includes('clean') && !queryLower.includes('green') && !queryLower.includes('tech')) continue;
    if (slug.includes('life') && !queryLower.includes('life') && !queryLower.includes('biotech') && !queryLower.includes('health')) continue;
    if (slug.includes('agri') && !queryLower.includes('agri') && !queryLower.includes('farm') && !queryLower.includes('food')) continue;
    if (slug.includes('manufactur') && !queryLower.includes('manufactur') && !queryLower.includes('industrial') && !queryLower.includes('factory')) continue;
    if (slug.includes('aerospace') && !queryLower.includes('aero') && !queryLower.includes('space') && !queryLower.includes('defence') && !queryLower.includes('defense')) continue;
    if (slug.includes('veteran') && !queryLower.includes('veteran')) continue;
    if (slug.includes('indigenous') && !queryLower.includes('indigenous') && !queryLower.includes('aboriginal')) continue;
    if (slug.includes('women') && !queryLower.includes('women') && !queryLower.includes('female')) continue;

    const matchCount = searchTerms.filter(term => term.length > 3 && queryLower.includes(term)).length;
    if (matchCount >= 1) {
      totalDemandAccumulator += qObj.impressions * 1.2;
      if (matchCount >= 2 && qObj.impressions > maxImpressions) {
        bestMatch = qObj.query;
        maxImpressions = qObj.impressions;
      }
    }
  }

  return {
    primaryKeyword: bestMatch,
    estimatedDemand: Math.round(totalDemandAccumulator)
  };
}

// 5. Read all commercial files from blog-content dir
const commercialFiles = fs.readdirSync(blogContentDir).filter(file => file.endsWith('.json'));
const commercialCandidates: { url: string; fileBasename: string }[] = [];

for (const file of commercialFiles) {
  const slug = file.replace('.json', '');
  commercialCandidates.push({
    url: `/blog/${slug}`,
    fileBasename: file
  });
}

// Key /canada routes
commercialCandidates.push({ url: '/canada/innovation-grants', fileBasename: 'innovation-grants' });
commercialCandidates.push({ url: '/canada/small-business-grants', fileBasename: 'small-business-grants' });
commercialCandidates.push({ url: '/canada/women-business-grants', fileBasename: 'women-business-grants' });
commercialCandidates.push({ url: '/canada/government-grants', fileBasename: 'government-grants' });

const optimizedUrls = new Set<string>([
  '/canada/small-business-grants',
  '/blog/csbfp-canada-small-business-financing-program',
  '/blog/canada-federal-grants',
  '/canada/women-business-grants',
  '/usa/new-york',
  '/blog/women-entrepreneurship-grants-2026',
  '/canada/innovation-grants',
  '/blog/alberta-small-business-grants-guide',
  '/blog/canada-startup-funding-grants-guide',
  '/canada/government-grants',
  '/blog/quebec-small-business-grants-guide',
  '/blog/technology-startup-grants-2026',
  '/blog/manufacturing-grants-2026',
  '/blog/ontario-small-business-grants-guide',
  '/blog/bc-small-business-grants-guide',
  '/blog/cybersecurity-grants',
  '/blog/5-best-government-loans-agriculture-tech-startups',
  '/blog/saskatchewan-small-business-grants-guide',
  '/blog/manitoba-small-business-grants-guide',
  '/blog/atlantic-small-business-grants-guide',
  '/blog/irap-industrial-research-assistance-program',
  '/blog/canexport-grants-2026',
  '/blog/canada-clean-technology-innovation-grants',
  '/blog/canada-digital-ai-innovation-grants',
  '/blog/sred-scientific-research-experimental-development',
  '/blog/irap-vs-sred-difference-canada',
  '/blog/sred-tax-credits-vs-cdap-canadian-founders',
  '/blog/canada-agri-food-technology-innovation-grants',
  '/blog/canada-advanced-manufacturing-innovation-grants',
  '/blog/quebec-innovation-grants',
  '/blog/nsf-sbir-grants-technology-startups',
  '/blog/usda-sbir-agtech-grants',
  '/blog/healthcare-grants-2026',
  '/blog/veteran-business-funding-canada-2026',
  '/blog/nih-sbir-biotech-grants',
  '/blog/canada-agriculture-agrifood-grants-guide',
  '/blog/canada-clean-technology-environment-grants-guide',
  '/blog/alberta-innovation-grants',
  '/blog/ai-machine-learning-grants'
]);

// 6. Score opportunities with the upgraded 9-factor model
const scoredList = commercialCandidates.map(candidate => {
  const pathUrl = candidate.url;
  const lowerUrl = pathUrl.toLowerCase();
  
  const isIndexed = indexedUrls.has(pathUrl) || pagePerfMap.has(pathUrl);
  
  // Look up GSC performance
  const gscPerformance = pagePerfMap.get(pathUrl) || {
    url: pathUrl,
    clicks: 0,
    impressions: 0,
    ctr: 0,
    position: 999 // Represent non-indexed or untracked as 999
  };

  const { primaryKeyword, estimatedDemand } = findPrimaryQueryAndDemand(pathUrl);

  // 1. Search Volume Score (S - 15%)
  const kvEntry = keywordVolumes[primaryKeyword.toLowerCase()];
  const monthlyVolume = kvEntry ? kvEntry.monthlyVolume : estimatedDemand;
  const searchVolumeScore = Math.min(100, Math.max(10, Math.round(Math.log10(monthlyVolume + 1) * 20)));

  // 2. Commercial Intent Score (I - 15%)
  let commercialIntentScore = 40;
  if (lowerUrl.includes('sred') || lowerUrl.includes('irap') || lowerUrl.includes('apply') || lowerUrl.includes('filing')) {
    commercialIntentScore = 95;
  } else if (
    lowerUrl.match(/(grant|loan|fund|finance|financing|subsidy|subsidies|tax-credit|incentive|initiative)/)
  ) {
    commercialIntentScore = 90;
  } else if (
    lowerUrl.match(/(guide|program|compare|comparison|forecast|deadlines|audit|toolkit)/)
  ) {
    commercialIntentScore = 75;
  }

  // 3. Business Impact Score (B - 20%): monetization funnel depth
  // Rule: Every grant/loan/fund page supports Calculator → Report → Audit funnel.
  // Only truly generic or U.S.-only pages are awareness-only.
  let businessImpactScore = 15;
  let monetizationTier = 'awareness-only';
  if (pathUrl.includes('sred') || pathUrl.includes('irap') || pathUrl.includes('filing')) {
    businessImpactScore = 100;
    monetizationTier = 'direct-filing';
  } else if (pathUrl.match(/(manufacturing|cybersecurity|clean-tech|clean-technology|agri|agriculture|life-sciences|biotech|canexport|csbfp|indigenous|veteran)/)) {
    businessImpactScore = 85;
    monetizationTier = 'strategy-audit';
  } else if (pathUrl.match(/(alberta|ontario|bc|british-columbia|quebec|manitoba|saskatchewan|atlantic|northern|prairie|canada-small-business|canada-federal|canada-startup|canada-regional|canada-growth|innovation-canada|small-business-grants|women-business|women-entrepreneur)/)) {
    businessImpactScore = 65;
    monetizationTier = 'report-bundle';
  } else if (pathUrl.match(/(grant|loan|fund|financing|subsidy|incentive|program|guide|stack|compare|how-to)/) && !pathUrl.match(/(usa|california|texas|florida|new-york|minnesota|missouri|colorado|illinois|michigan|pennsylvania|washington|massachusetts|doe-|epa-|hud-|nsf-|sba-|usda-|nwbc|biden|dod-|nasa-|nih-|sbir.*sttr)/) ) {
    businessImpactScore = 65;
    monetizationTier = 'report-bundle';
  } else if (pathUrl.match(/(forecast|deadlines|last-chance|news|q1-|q4-|october-|2026-grant-forecast|early-bird)/)) {
    businessImpactScore = 40;
    monetizationTier = 'calculator-only';
  } else if (pathUrl.match(/(usa|california|texas|florida|new-york|minnesota|missouri|colorado|illinois|michigan|pennsylvania|washington|massachusetts|doe-|epa-|hud-|nsf-|sba-|usda-|nwbc|biden|dod-|nasa-|nih-)/) ) {
    businessImpactScore = 15;
    monetizationTier = 'awareness-only';
  } else {
    // Remaining Canadian-topic pages default to calculator funnel
    businessImpactScore = 50;
    monetizationTier = 'calculator-only';
  }

  // 4. Ranking Opportunity Score (O - 10%): bell curve peaking at position 30
  let rankingOpportunityScore = 20;
  const pos = gscPerformance.position;
  if (pos !== 999) {
    if (pos <= 30) {
      rankingOpportunityScore = Math.round(20 + (pos - 1) * (80 / 29));
    } else {
      rankingOpportunityScore = Math.round(Math.max(10, 100 - (pos - 30) * (80 / 150)));
    }
  }

  // 5. Competitor Feasibility (D - 10%)
  let competitorFeasibility = 60;
  if (kvEntry) {
    const diff = kvEntry.difficulty;
    if (diff === 'easy') competitorFeasibility = 95;
    else if (diff === 'medium') competitorFeasibility = 70;
    else if (diff === 'hard') competitorFeasibility = 40;
    else if (diff === 'very-hard') competitorFeasibility = 15;
  }

  // 6. Strategic Importance (SI - 10%)
  let strategicImportance = 30; // Default supporting page
  let clusterType = 'Supporting Page';
  // Top-level /canada/ routes are Pillar Pages
  if (pathUrl === '/canada/innovation-grants' || pathUrl === '/canada/small-business-grants' || pathUrl === '/canada/government-grants' || pathUrl === '/canada/women-business-grants') {
    strategicImportance = 100;
    clusterType = 'Pillar Page';
  // Filing program anchors are Cluster Hubs — they anchor the entire SR&ED / IRAP cluster
  } else if (pathUrl.match(/(\/sred-|\/irap-|\/csbfp-|\/canexport-)/) && !pathUrl.match(/(-2026|-2025|archive)/)) {
    strategicImportance = 80;
    clusterType = 'Cluster Hub';
  // Provincial guide hubs and known cluster hubs
  } else if (pathUrl.match(/(quebec-small-business|ontario-small-business|cybersecurity-grants|alberta-small-business|bc-small-business|manitoba-small-business|saskatchewan-small-business|atlantic-small-business)/)) {
    strategicImportance = 80;
    clusterType = 'Cluster Hub';
  // Comparison / link magnet pages
  } else if (pathUrl.includes('vs-') || pathUrl.includes('-vs-') || pathUrl.includes('how-to-stack') || pathUrl.includes('compare')) {
    strategicImportance = 50;
    clusterType = 'Link Magnet';
  // Authority builders
  } else if (pathUrl.includes('methodology') || pathUrl.includes('data-sources')) {
    strategicImportance = 60;
    clusterType = 'Authority Builder';
  // Isolated / U.S. pages
  } else if (pathUrl.match(/(veteran|usda-sbir|usa\/|\/california|\/texas|\/florida|\/new-york)/) || pathUrl.match(/(biden|nwbc|wosb-federal)/)) {
    strategicImportance = 10;
    clusterType = 'Isolated Page';
  }

  // 7. Intent Stability (IS - 10%)
  // Volatile: year-stamped deadlines/news. Seasonal: year-stamped forecasts.
  // Semi-stable: provincial/topical guides updated annually.
  // Evergreen: conceptual explanations, comparison pages, how-tos.
  let intentStability = 70; // Default: semi-stable (most grant guides)
  if (pathUrl.match(/(deadlines|last-chance|q1-|q4-|october-)/)) {
    intentStability = 15; // Volatile
  } else if (pathUrl.match(/(forecast|early-bird|-2026|-2025|archive)/)) {
    intentStability = 40; // Seasonal
  } else if (pathUrl.match(/(vs-|-vs-|how-to-|what-is|irap-vs|sred-vs|difference|compare|stack|stacking|guide$|program$)/)) {
    intentStability = 100; // Evergreen educational/comparison pages
  } else if (pathUrl.match(/(sred|irap|csbfp|canexport)/) && !pathUrl.match(/2026|2025|forecast|deadline/)) {
    intentStability = 100; // Evergreen program pages
  }

  // 8. CTR Opportunity Score (C - 5%)
  let expectedCtr = 0.3;
  if (gscPerformance.position < 3) expectedCtr = 12;
  else if (gscPerformance.position < 10) expectedCtr = 4;
  else if (gscPerformance.position < 30) expectedCtr = 1.2;
  
  const ctrOpportunityScore = gscPerformance.ctr < expectedCtr 
    ? Math.min(100, Math.round((expectedCtr - gscPerformance.ctr) * 50)) 
    : 10;

  // 9. Confidence — data quality signal only, NOT baked into opportunity score.
  // Philosophy: Confidence tells you how certain to be of the opportunity,
  // not whether the opportunity exists. A page with huge potential but low GSC
  // data should still surface as high opportunity — just with a confidence caveat.
  let confidenceScore = 20;
  if (gscPerformance.impressions > 500 && kvEntry) {
    confidenceScore = 100;
  } else if (gscPerformance.impressions > 50 || kvEntry) {
    confidenceScore = 60;
  }
  const confidenceLevel = confidenceScore === 100 ? 'High' : (confidenceScore === 60 ? 'Medium' : 'Low');

  // Calculate Maintenance Penalty (MP)
  let maintenancePenalty = 2; // Low default
  if (pathUrl.match(/(deadlines|last-chance|news)/)) {
    maintenancePenalty = 15; // Very High
  } else if (pathUrl.match(/(forecast|early-bird)/)) {
    maintenancePenalty = 10; // High
  } else if (pathUrl.match(/(guide|small-business-grants)/)) {
    maintenancePenalty = 5; // Medium
  } else if (pathUrl.match(/(sred|irap|vs-)/)) {
    maintenancePenalty = 0; // Evergreen / None
  }

  // Compute final score — 8 factors only. Confidence is a separate signal.
  // This means a page with massive opportunity but low GSC data still scores high;
  // the confidence badge tells the reader how much to trust the score.
  const grossScore = (0.20 * businessImpactScore) +
                     (0.15 * commercialIntentScore) +
                     (0.15 * searchVolumeScore) +
                     (0.10 * rankingOpportunityScore) +
                     (0.10 * competitorFeasibility) +
                     (0.10 * strategicImportance) +
                     (0.10 * intentStability) +
                     (0.10 * ctrOpportunityScore); // CTR weight raised to 10% to keep weights = 100%

  const netScore = Math.round(grossScore - maintenancePenalty);
  const opportunityScore = Math.min(100, Math.max(10, netScore));

  // ── Reason Score ────────────────────────────────────────────────────────────
  // Generate human-readable drivers for the score. Shown on the dashboard so
  // that revisiting the backlog 6 months later is self-explanatory.
  const drivers: { label: string; impact: 'positive' | 'negative' | 'neutral'; value: number }[] = [
    { label: 'Business Impact (funnel depth)', impact: businessImpactScore >= 80 ? 'positive' : businessImpactScore >= 50 ? 'neutral' : 'negative', value: businessImpactScore },
    { label: 'Commercial Intent (URL signals)', impact: commercialIntentScore >= 85 ? 'positive' : commercialIntentScore >= 70 ? 'neutral' : 'negative', value: commercialIntentScore },
    { label: 'Search Volume', impact: searchVolumeScore >= 70 ? 'positive' : searchVolumeScore >= 50 ? 'neutral' : 'negative', value: searchVolumeScore },
    { label: 'Ranking Opportunity (position)', impact: rankingOpportunityScore >= 70 ? 'positive' : rankingOpportunityScore >= 40 ? 'neutral' : 'negative', value: rankingOpportunityScore },
    { label: 'Competitor Feasibility', impact: competitorFeasibility >= 70 ? 'positive' : competitorFeasibility >= 50 ? 'neutral' : 'negative', value: competitorFeasibility },
    { label: 'Strategic Importance (cluster)', impact: strategicImportance >= 80 ? 'positive' : strategicImportance >= 50 ? 'neutral' : 'negative', value: strategicImportance },
    { label: 'Intent Stability (evergreen)', impact: intentStability >= 80 ? 'positive' : intentStability >= 50 ? 'neutral' : 'negative', value: intentStability },
    { label: 'CTR Opportunity', impact: ctrOpportunityScore >= 60 ? 'positive' : ctrOpportunityScore >= 30 ? 'neutral' : 'negative', value: ctrOpportunityScore },
    { label: 'GSC Confidence (data quality)', impact: confidenceScore >= 80 ? 'positive' : confidenceScore >= 50 ? 'neutral' : 'negative', value: confidenceScore },
    { label: 'Maintenance Cost (penalty)', impact: maintenancePenalty >= 10 ? 'negative' : maintenancePenalty >= 5 ? 'neutral' : 'positive', value: -maintenancePenalty },
  ];
  // Top 3 positive drivers by weighted contribution
  const positives = drivers
    .filter(d => d.impact === 'positive')
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)
    .map(d => d.label);
  // Top 2 negative or weak factors
  const negatives = drivers
    .filter(d => d.impact === 'negative')
    .sort((a, b) => a.value - b.value)
    .slice(0, 2)
    .map(d => d.label);
  const reasonScore = { positives, negatives };

  // Estimate Engineering Hours dynamically
  let engineeringEffort = 3;
  if (pathUrl.includes('sred') || pathUrl.includes('irap') || pathUrl.includes('manufacturing') || pathUrl.includes('cybersecurity') || pathUrl.includes('technology') || pathUrl.includes('innovation')) {
    engineeringEffort = 8;
  } else if (pathUrl.includes('alberta') || pathUrl.includes('ontario') || pathUrl.includes('bc') || pathUrl.includes('quebec') || pathUrl.includes('manitoba') || pathUrl.includes('saskatchewan') || pathUrl.includes('atlantic')) {
    engineeringEffort = 5;
  } else if (pathUrl.includes('download')) {
    engineeringEffort = 4;
  } else if (pathUrl.includes('news') || pathUrl.includes('list')) {
    engineeringEffort = 2;
  }

  // ROI Priority Bands mapping
  let priorityBucket = 'Low';
  if (opportunityScore >= 85) priorityBucket = 'Exceptional';
  else if (opportunityScore >= 70) priorityBucket = 'High';
  else if (opportunityScore >= 50) priorityBucket = 'Medium';

  // 8-Type Playbook Decision Tree (drift #6)
  let playbookType = 'Snippet Enhancement';
  let recommendation = 'Improve Title & Snippet (CTR Tuning)';
  let playbookTasks = ["Add NeedHelpApplying component", "Embed Calculator CTA", "Validate internal linking"];

  if (pathUrl.includes('sred') || pathUrl.includes('irap') || pathUrl.includes('filing')) {
    playbookType = 'Authority Build';
    recommendation = 'Deploy CRA Regulatory Citations & Stacking Rules';
    playbookTasks = [
      "Audit competitor technical guidance sections",
      "Inject updated CRA T661 guidelines",
      "Compare IRAP stacking rules",
      "Add direct filing success-fee metrics"
    ];
  } else if (pos === 999) {
    playbookType = 'Launch Campaign';
    recommendation = 'Request Manual Search Console Indexation';
    playbookTasks = [
      "Submit URL to GSC manual queue",
      "Verify sitemap availability",
      "Build 5 new internal inbound links",
      "Verify meta title schema tags"
    ];
  } else if (pos > 100) {
    playbookType = 'Intent Realignment';
    recommendation = 'Re-align Content to Match Top 5 Competitors';
    playbookTasks = [
      "Build comparison table or TRL decision matrix",
      "Inject YMYL verification notes",
      "Add Eligibility Snapshot checklist block"
    ];
  } else if (pos > 60 && pos <= 100) {
    playbookType = 'Structural Overhaul';
    recommendation = 'Refactor Heading Hierarchy & Layout';
    playbookTasks = [
      "Align H1/H2 keywords to search intent",
      "Embed visual stacking flow chart",
      "Build out regional comparisons",
      "Deploy custom RelatedFundingPaths steppers"
    ];
  } else if (pos > 30 && pos <= 60) {
    playbookType = 'Content Expansion';
    recommendation = 'Expand Secondary Keywords & Internal Linking';
    playbookTasks = [
      "Identify secondary supporting keywords",
      "Establish 3 new inbound links from related guides",
      "Add 800+ words of topical expansion",
      "Deploy localized program updates"
    ];
  } else if (gscPerformance.ctr < expectedCtr && pos < 30) {
    if (pos > 10) {
      playbookType = 'Title + Content Refresh';
      recommendation = 'CTR Tuning & Deep Content Refresh';
      playbookTasks = [
        "Rewrite title tag for click intent",
        "Add 500+ words of fresh 2026 data",
        "Verify FAQ schema integration",
        "Test dynamic CTR CTR metadata modifiers"
      ];
    } else {
      playbookType = 'CTR Rescue';
      recommendation = 'Optimize Title & Meta Snippet (CTR Rescue)';
      playbookTasks = [
        "Rewrite meta description to highlight value",
        "Refresh published date parameters",
        "Review competitor title formats",
        "Add click-through trigger modifiers"
      ];
    }
  }

  return {
    url: pathUrl,
    primaryKeyword,
    impressions: gscPerformance.impressions,
    clicks: gscPerformance.clicks,
    ctr: gscPerformance.ctr,
    position: pos === 999 ? 120 : parseFloat(pos.toFixed(2)),
    opportunityScore,
    confidenceScore,
    reasonScore,
    priorityBucket,
    monetizationTier,
    engineeringEffort,
    expectedRoi: priorityBucket,
    playbookType,
    recommendation,
    playbookTasks,
    confidenceLevel,
    clusterType,
    status: optimizedUrls.has(pathUrl) ? 'Optimized' : 'Backlog',
    owner: 'Ashwani',
    isIndexed
  };
});

// Sort backlog by opportunityScore descending
const sortedBacklog = scoredList
  .filter(p => p.priorityBucket !== 'Low')
  .sort((a, b) => b.opportunityScore - a.opportunityScore);

// Save the ENTIRE sorted backlog queue
fs.writeFileSync(outputPath, JSON.stringify(scoredList, null, 2), 'utf8');
console.log(`Successfully generated dynamic SEO backlog with ${scoredList.length} scored opportunities at ${outputPath}`);
