export interface KeywordLink {
  keyword: string;
  url: string;
}

/**
 * The Omni-Channel Wikipedia Linker Keyword Dictionary.
 * Contains 50+ high-value keywords mapping directly to our absolute best pillar content.
 * 
 * NOTE: The array should be sorted by length (longest to shortest) automatically 
 * or manually when reading, to ensure "technology startup grants" evaluates before "startup grants".
 */
export const WIKIPEDIA_KEYWORD_MAP: KeywordLink[] = [
  // --- CORE PROGRAMS & GRANTS ---
  { keyword: "SR&ED", url: "/guides/sred-application-guide" },
  { keyword: "SRED", url: "/guides/sred-application-guide" },
  { keyword: "SBIR", url: "/guides/apply-sbir-grants" },
  { keyword: "STTR", url: "/guides/apply-sbir-grants" },
  { keyword: "IRAP", url: "/guides/apply-irap-grants" },
  { keyword: "AgriInnovate", url: "/guides/apply-agriculture-agri-food-canada" },
  { keyword: "Women Entrepreneurship Strategy", url: "/guides/apply-women-entrepreneurship-strategy" },
  { keyword: "Canada Digital Adoption Program", url: "/blog/canada-technology-adoption-grants-guide" },
  { keyword: "CDAP", url: "/blog/canada-technology-adoption-grants-guide" },
  { keyword: "CanExport", url: "/blog/canexport-grants-2026" },
  { keyword: "SBA loans", url: "/guides/apply-sba-loans" },
  { keyword: "SBA 504", url: "/guides/apply-sba-loans" },
  { keyword: "SBA 7(a)", url: "/guides/apply-sba-loans" },
  { keyword: "Canada Small Business Financing Program", url: "/guides/apply-csbfp-loans" },
  { keyword: "CSBFP", url: "/guides/apply-csbfp-loans" },
  { keyword: "Strategic Innovation Fund", url: "/guides/apply-strategic-innovation-fund" },
  { keyword: "NSERC", url: "/guides/nserc-research-grants-guide" },
  
  // --- INDUSTRIES & SECTORS ---
  { keyword: "agriculture grants", url: "/blog/agriculture-agri-food-canada-government-grants" },
  { keyword: "farming grants", url: "/blog/agriculture-agri-food-canada-government-grants" },
  { keyword: "manufacturing grants", url: "/guides/canada-manufacturing-funding-guide" },
  { keyword: "manufacturing automation", url: "/guides/canada-manufacturing-funding-guide" },
  { keyword: "clean technology", url: "/guides/canada-cleantech-funding-guide" },
  { keyword: "cleantech grants", url: "/guides/canada-cleantech-funding-guide" },
  { keyword: "environmental grants", url: "/blog/canada-clean-technology-environment-grants-guide" },
  { keyword: "life sciences funding", url: "/guides/canada-life-sciences-funding-guide" },
  { keyword: "biotech grants", url: "/guides/canada-life-sciences-funding-guide" },
  { keyword: "artificial intelligence", url: "/guides/canada-digital-ai-funding-guide" },
  { keyword: "AI grants", url: "/guides/canada-digital-ai-funding-guide" },
  { keyword: "aerospace grants", url: "/guides/canada-aerospace-defence-funding-guide" },
  { keyword: "healthcare grants", url: "/blog/healthcare-grants-2026" },
  { keyword: "technology startup grants", url: "/blog/technology-startup-grants-2026" },
  { keyword: "tech startup funding", url: "/blog/technology-startup-grants-2026" },

  // --- DEMOGRAPHICS ---
  { keyword: "women-owned business grants", url: "/blog/women-business-grants-2026" },
  { keyword: "grants for women entrepreneurs", url: "/guides/women-entrepreneurship-fund-guide" },
  { keyword: "women in tech grants", url: "/blog/women-tech-stem-grants-guide" },
  { keyword: "minority business grants", url: "/blog/minority-business-grants-2026" },
  { keyword: "black entrepreneurship", url: "/blog/black-entrepreneurship-loan-fund-2026" },
  { keyword: "indigenous grants", url: "/blog/indigenous-business-development-2026" },
  { keyword: "veteran business grants", url: "/blog/veterans-business-grants-2026" },
  { keyword: "youth entrepreneurship", url: "/guides/apply-youth-entrepreneurship-funding" },
  { keyword: "rural business grants", url: "/blog/rural-business-development-2026" },

  // --- GEOGRAPHIC HUBS (General Triggers) ---
  { keyword: "Ontario business grants", url: "/canada/ontario" },
  { keyword: "Ontario funding", url: "/canada/ontario" },
  { keyword: "Alberta business grants", url: "/blog/alberta-small-business-grants-guide" },
  { keyword: "BC business grants", url: "/canada/british-columbia" },
  { keyword: "British Columbia grants", url: "/canada/british-columbia" },
  { keyword: "Quebec business grants", url: "/blog/quebec-business-grants-2026" },
  { keyword: "Texas business grants", url: "/usa/texas" },
  { keyword: "Texas funding", url: "/usa/texas" },
  { keyword: "California business grants", url: "/usa/california" },
  { keyword: "California loans", url: "/guides/california-loan-guarantee-guide" },
  { keyword: "New York business grants", url: "/usa/new-york" },
  { keyword: "Florida business grants", url: "/usa/florida" },
  { keyword: "Illinois business grants", url: "/usa/illinois" },
  { keyword: "Michigan manufacturing grants", url: "/blog/michigan-manufacturing-renaissance-2026" },

  // --- GENERAL SEARCH INTENT (Long Tail) ---
  { keyword: "non-dilutive funding", url: "/blog/small-business-grants-complete-guide" },
  { keyword: "government grants", url: "/grant-finder" },
  { keyword: "business loans", url: "/blog/small-business-financing-2025" },
  { keyword: "grant consultant", url: "/contact" },
  { keyword: "hire a grant writer", url: "/contact" },
  { keyword: "grant application review", url: "/contact" },
];

/**
 * Normalizes and sorts the keyword map by length (longest strings first)
 * Longest first is critical so "technology startup grants" matches before "startup grants"
 */
export const getSortedKeywordMap = (): KeywordLink[] => {
  return [...WIKIPEDIA_KEYWORD_MAP].sort((a, b) => b.keyword.length - a.keyword.length);
};

/**
 * Creates a master Regular Expression that matches any of the keywords.
 * Uses \b (word boundaries) and case insensitivity.
 */
export const getMasterKeywordRegex = (): RegExp => {
  const sortedKeywords = getSortedKeywordMap();
  // Escape special regex characters in the keywords (e.g. for "SR&ED", "7(a)")
  const escapedKeywords = sortedKeywords.map(k => k.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  
  // Combine into a massive alternation group bounded by word boundaries
  // We use lookbehind and lookahead to ensure we don't partially match inside words,
  // but standard \b works for 99% of English keywords.
  return new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi');
};

export function injectWikipediaLinks(html: string | undefined): string {
  if (!html) return html || '';

  const keywordMap = getSortedKeywordMap();
  const linkedUrls = new Set<string>();
  
  const escapedKeywords = keywordMap.map(k => k.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const keywordPattern = escapedKeywords.join('|');
  
  // Regex to avoid matching inside <a> or <h1-6> or <button>
  const masterRegex = new RegExp(`(<a[^>]*>.*?<\\/a>|<h[1-6][^>]*>.*?<\\/h[1-6]>|<button[^>]*>.*?<\\/button>)|\\b(${keywordPattern})\\b`, 'gi');

  return html.replace(masterRegex, (match, ignoreGroup, matchedKeyword) => {
    if (ignoreGroup) return match;

    const lowerMatch = matchedKeyword.toLowerCase();
    const keywordObj = keywordMap.find(k => k.keyword.toLowerCase() === lowerMatch);
    if (!keywordObj) return match; 

    // Only link to a specific URL ONCE per block of text to avoid spam
    if (linkedUrls.has(keywordObj.url)) return match;

    linkedUrls.add(keywordObj.url);
    
    return `<a href="${keywordObj.url}" class="text-blue-600 hover:text-blue-800 underline decoration-blue-200 decoration-2 underline-offset-2 transition-colors font-medium wikipedia-link">${matchedKeyword}</a>`;
  });
}
