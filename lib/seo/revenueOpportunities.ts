export type RevenueMarket = 'usa' | 'canada' | 'cross-border';

export type RevenueOpportunity = {
  href: string;
  title: string;
  description: string;
  market: RevenueMarket;
  pageType: 'hub' | 'guide' | 'blog' | 'pseo';
  priority: number;
};

const CANADIAN_REGION_SLUGS = new Set(['on', 'bc', 'ab', 'qc', 'mb', 'sk', 'ns', 'nl', 'nb', 'pe']);

export const HIGH_INTENT_REVENUE_PAGES: RevenueOpportunity[] = [
  {
    href: '/usa/technology-startup-grants',
    title: 'USA Technology Startup Grants',
    description: 'SBIR, STTR, R&D tax credits, and state incentives for technology companies.',
    market: 'usa',
    pageType: 'hub',
    priority: 100,
  },
  {
    href: '/usa/new-york',
    title: 'New York Small Business Grants',
    description: 'High-impression state page with startup, workforce, and local incentive programs.',
    market: 'usa',
    pageType: 'hub',
    priority: 98,
  },
  {
    href: '/usa/california',
    title: 'California Business Grants',
    description: 'California state incentives, clean-tech funding, and startup support programs.',
    market: 'usa',
    pageType: 'hub',
    priority: 96,
  },
  {
    href: '/blog/nih-sbir-biotech-grants',
    title: 'NIH SBIR Biotech Grants',
    description: 'Biotech and health innovation funding with strong commercial search intent.',
    market: 'usa',
    pageType: 'blog',
    priority: 94,
  },
  {
    href: '/blog/nsf-sbir-grants-technology-startups',
    title: 'NSF SBIR Grants for Startups',
    description: 'Non-dilutive technology funding for U.S. startups with R&D projects.',
    market: 'usa',
    pageType: 'blog',
    priority: 93,
  },
  {
    href: '/blog/usda-sbir-agtech-grants',
    title: 'USDA SBIR AgTech Grants',
    description: 'Agriculture technology grants and rural innovation funding.',
    market: 'usa',
    pageType: 'blog',
    priority: 90,
  },
  {
    href: '/canada/small-business-grants',
    title: 'Canada Small Business Grants',
    description: 'Federal and provincial grants, loans, credits, and application routes.',
    market: 'canada',
    pageType: 'hub',
    priority: 99,
  },
  {
    href: '/canada/indigenous-entrepreneur-grants',
    title: 'Indigenous Entrepreneur Grants',
    description: 'Canadian Indigenous business funding with strong eligibility-driven searches.',
    market: 'canada',
    pageType: 'hub',
    priority: 95,
  },
  {
    href: '/blog/quebec-small-business-grants-guide',
    title: 'Quebec Small Business Grants',
    description: 'Quebec SME grants, loans, and provincial funding programs.',
    market: 'canada',
    pageType: 'blog',
    priority: 94,
  },
  {
    href: '/blog/veteran-business-funding-canada-2026',
    title: 'Veteran Business Grants Canada',
    description: 'One of the current strongest click-producing pages in Search Console.',
    market: 'canada',
    pageType: 'blog',
    priority: 92,
  },
  {
    href: '/guides/irap-innovation-application-guide',
    title: 'IRAP Application Guide',
    description: 'Step-by-step Canadian innovation funding guide for qualified companies.',
    market: 'canada',
    pageType: 'guide',
    priority: 91,
  },
  {
    href: '/grants/on/toronto/restaurants-hospitality',
    title: 'Toronto Restaurant Grants',
    description: 'High-CTR local funding page for restaurants and hospitality operators.',
    market: 'canada',
    pageType: 'pseo',
    priority: 89,
  },
  {
    href: '/grants/bc/vancouver/women-entrepreneurs',
    title: 'Vancouver Women Entrepreneur Grants',
    description: 'Local women-owned business funding page with commercial lead intent.',
    market: 'canada',
    pageType: 'pseo',
    priority: 86,
  },
  {
    href: '/grants/ca/san-francisco/women-entrepreneurs',
    title: 'San Francisco Women Entrepreneur Grants',
    description: 'Local U.S. pSEO page with early ranking and buyer intent.',
    market: 'usa',
    pageType: 'pseo',
    priority: 84,
  },
  {
    href: '/grant-finder',
    title: 'AI Grant Finder',
    description: 'Lead-capture tool that converts organic visitors into funding inquiries.',
    market: 'cross-border',
    pageType: 'hub',
    priority: 88,
  },
];

export function getTopRevenuePages(limit = 8, market?: RevenueMarket) {
  return HIGH_INTENT_REVENUE_PAGES
    .filter((page) => !market || page.market === market || page.market === 'cross-border')
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit);
}

export function classifyRevenuePath(pathname: string) {
  const normalizedPath = pathname.split('?')[0].replace(/\/$/, '') || '/';
  const knownPage = HIGH_INTENT_REVENUE_PAGES.find((page) => page.href === normalizedPath);

  let market: RevenueMarket = knownPage?.market || 'cross-border';
  let contentFormat = knownPage?.pageType || 'standard';
  let revenueTier: 'high' | 'medium' | 'low' = knownPage && knownPage.priority >= 90 ? 'high' : knownPage ? 'medium' : 'low';

  if (normalizedPath.startsWith('/usa/')) {
    market = 'usa';
    contentFormat = contentFormat === 'standard' ? 'usa_hub' : contentFormat;
  } else if (normalizedPath.startsWith('/canada/')) {
    market = 'canada';
    contentFormat = contentFormat === 'standard' ? 'canada_hub' : contentFormat;
  } else if (normalizedPath.startsWith('/blog/')) {
    contentFormat = contentFormat === 'standard' ? 'blog' : contentFormat;
  } else if (normalizedPath.startsWith('/guides/')) {
    contentFormat = contentFormat === 'standard' ? 'guide' : contentFormat;
  } else if (normalizedPath.startsWith('/grants/')) {
    const regionSlug = normalizedPath.split('/')[2];
    market = CANADIAN_REGION_SLUGS.has(regionSlug) ? 'canada' : 'usa';
    contentFormat = 'pseo';
    revenueTier = knownPage ? revenueTier : 'medium';
  }

  const expectedAdSlots =
    contentFormat === 'blog' ? 5 :
    contentFormat === 'pseo' ? 4 :
    contentFormat === 'guide' ? 2 :
    contentFormat === 'usa_hub' || contentFormat === 'canada_hub' ? 1 :
    0;

  return {
    market,
    contentFormat,
    revenueTier,
    expectedAdSlots,
    isKnownRevenuePage: !!knownPage,
  };
}
