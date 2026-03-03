import { BlogPost } from './data/blogPosts';

/**
 * CTR Optimization Utilities — SERP Psychology Edition
 * ----------------------------------------------------
 * At position 9, branding loses. Specificity wins.
 * Every title must be a CLICK MAGNET with:
 *   - Dollar amounts ($305K, $10K, $5M)
 *   - Program names (NSF, SBIR, IRAP)
 *   - Hooks (Non-Dilutive, Check Eligibility, Apply Now)
 *
 * Google displays ~60 chars for title, ~155 chars for description.
 */

const TITLE_MAX = 60;
const DESC_MAX = 155;

/**
 * Extracts dollar amounts from text (e.g. "$305K", "$100M", "$5,000")
 */
function extractDollarAmounts(text: string): string[] {
  const matches = text.match(/\$[\d,.]+[KkMmBb]?/g);
  return matches || [];
}

/**
 * Extracts known program acronyms from text
 */
function extractPrograms(text: string): string[] {
  const knownPrograms = [
    'NSF', 'SBIR', 'STTR', 'DOE', 'DOD', 'NIH', 'USDA', 'SBA', 'EPA', 'HUD',
    'IRAP', 'SR&ED', 'SRED', 'NGen', 'ACOA', 'BDC', 'EDC', 'WES', 'CDAP',
    'CSBFP', 'CanExport', 'CalSEED', 'NSERC', 'CPRIT', 'ERA'
  ];
  return knownPrograms.filter(p => text.includes(p));
}

/**
 * Extracts hook phrases that drive clicks
 */
function extractHooks(text: string): string | null {
  const hookPatterns = [
    'Non-Dilutive', 'non-dilutive',
    'No Equity', 'no equity', '0% Equity',
    'Free', 'Monthly', 'Annual',
    'Tax Credit', 'tax credit',
    'Refundable', 'refundable',
  ];
  for (const hook of hookPatterns) {
    if (text.toLowerCase().includes(hook.toLowerCase())) {
      // Return the canonical form
      if (hook.toLowerCase().includes('non-dilutive')) return 'Non-Dilutive';
      if (hook.toLowerCase().includes('equity') || hook.includes('0%')) return 'No Equity';
      if (hook.toLowerCase() === 'tax credit') return 'Tax Credits';
      if (hook.toLowerCase() === 'refundable') return 'Refundable';
      if (hook.toLowerCase() === 'monthly') return 'Monthly';
      return hook;
    }
  }
  return null;
}

/**
 * Builds a CTR-optimized title ≤60 chars.
 *
 * Strategy (position 9 psychology):
 * 1. If post has seoTitle override → use it directly
 * 2. Extract the core topic (before first |)
 * 3. Extract dollar amounts + programs + hooks from FULL title
 * 4. Build: "{core topic} – {$amount} {program}" or "{core topic} ({hook})"
 * 5. Only use branding suffix if NO value hook is available
 *
 * Examples:
 *   "AI Grants 2026 – $305K NSF & DOD Funding"
 *   "Alberta Small Business Grants 2026 ($980M+)"
 *   "Amber Grant for Women 2026 – $10K Monthly"
 */
export function getCleanTitle(rawTitle: string): string {
  // Step 1: Get the base topic (first segment before |)
  const segments = rawTitle.split('|');
  let baseTopic = segments[0].trim();
  const fullTitle = rawTitle;

  // Step 2: Extract value signals from the FULL title (including after pipes)
  const dollars = extractDollarAmounts(fullTitle);
  const programs = extractPrograms(fullTitle);
  const hook = extractHooks(fullTitle);

  // Step 3: Shorten the base topic if needed
  // Remove "Complete guide to", "Programs Guide" fluff from base
  baseTopic = baseTopic
    .replace(/\s*Programs?\s*Guide\s*/gi, ' ')
    .replace(/\s*Funding\s*Programs?\s*/gi, ' ')
    .replace(/\s*Complete\s*/gi, ' ')
    .replace(/\s*Provincial\s*/gi, ' ')
    .replace(/\s*Federal\s*/gi, ' ')
    .replace(/\s*Government\s*/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Step 4: Build the best title we can fit in 60 chars
  // Priority: $ amount > program acronym > hook > brand

  // Try: "Base – $Amount Program"
  if (dollars.length > 0 && programs.length > 0) {
    const candidate = `${baseTopic} – ${dollars[0]} ${programs[0]}`;
    if (candidate.length <= TITLE_MAX) return candidate;
  }

  // Try: "Base – $Amount Hook"
  if (dollars.length > 0 && hook) {
    const candidate = `${baseTopic} – ${dollars[0]} ${hook}`;
    if (candidate.length <= TITLE_MAX) return candidate;
  }

  // Try: "Base ($Amount+)"
  if (dollars.length > 0) {
    const candidate = `${baseTopic} (${dollars[0]}+)`;
    if (candidate.length <= TITLE_MAX) return candidate;
    // Still try with just dollar
    const shorter = `${baseTopic} – ${dollars[0]}`;
    if (shorter.length <= TITLE_MAX) return shorter;
  }

  // Try: "Base (Hook)"
  if (hook) {
    const candidate = `${baseTopic} (${hook})`;
    if (candidate.length <= TITLE_MAX) return candidate;
  }

  // Try: "Base – Program"
  if (programs.length > 0) {
    const candidate = `${baseTopic} – ${programs[0]} Funding`;
    if (candidate.length <= TITLE_MAX) return candidate;
  }

  // Fallback: base topic only, trimmed to fit
  if (baseTopic.length <= TITLE_MAX) {
    return baseTopic;
  }

  // Last resort: truncate at word boundary
  const words = baseTopic.split(' ');
  let truncated = '';
  for (const word of words) {
    const candidate = truncated ? `${truncated} ${word}` : word;
    if (candidate.length > TITLE_MAX) break;
    truncated = candidate;
  }
  return truncated || baseTopic.substring(0, TITLE_MAX);
}

/**
 * Produces a compelling meta description ≤155 chars.
 *
 * Priority order:
 * 1. shortAnswer (most specific and authoritative)
 * 2. seo.metaDescription (manually written)
 * 3. excerpt (fallback)
 *
 * Adds a CTA arrow if room permits.
 */
export function getCleanDescription(post: BlogPost): string {
  const raw = post.shortAnswer || post.seo?.metaDescription || post.excerpt;
  if (!raw) return '';

  let desc = raw.trim();

  // Truncate at sentence boundary if possible
  if (desc.length > DESC_MAX) {
    // Try to cut at last period within limit
    const shortened = desc.substring(0, DESC_MAX);
    const lastPeriod = shortened.lastIndexOf('.');
    if (lastPeriod > DESC_MAX * 0.6) {
      desc = shortened.substring(0, lastPeriod + 1);
    } else {
      // Cut at last word boundary
      const lastSpace = shortened.lastIndexOf(' ');
      desc = shortened.substring(0, lastSpace) + '…';
    }
  }

  return desc;
}

export function generateMetadata(post: BlogPost) {
  // Determine OG category from post category
  const ogCategory = post.category?.toLowerCase().includes('women') ? 'women'
    : post.category?.toLowerCase().includes('usa') ? 'usa'
      : post.category?.toLowerCase().includes('technology') || post.category?.toLowerCase().includes('innovation') ? 'tech'
        : 'canada';

  const cleanTitle = getCleanTitle(post.seo?.metaTitle || post.title);
  const cleanDesc = getCleanDescription(post);

  const ogImageUrl = `/api/og?title=${encodeURIComponent(cleanTitle)}&subtitle=${encodeURIComponent(cleanDesc)}&category=${ogCategory}`;

  return {
    title: cleanTitle,
    description: cleanDesc,
    keywords: post.seo?.keywords?.join(', ') || '',
    openGraph: {
      title: cleanTitle,
      description: cleanDesc,
      url: `https://www.fsidigital.ca/blog/${post.slug}`,
      siteName: 'FSI Digital',
      images: [
        {
          url: post.seo?.ogImage || ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle,
      description: cleanDesc,
      images: [post.seo?.ogImage || `/images/blog/${post.image}`],
    },
    alternates: {
      canonical: `https://www.fsidigital.ca/blog/${post.slug}`,
    },
  };
}

export function generateBlogPageMetadata() {
  return {
    title: 'Grant News, Alerts & Guides | FSI Digital Blog',
    description: 'Stay updated with the latest grant opportunities, funding alerts, and expert application guides for USA and Canada grants.',
    openGraph: {
      title: 'Grant News & Funding Alerts | FSI Digital Blog',
      description: 'Latest grant opportunities, funding alerts, and application guides for USA and Canada.',
      url: 'https://www.fsidigital.ca/blog',
      siteName: 'FSI Digital',
      images: [
        {
          url: '/images/blog/grant-finder-blog-og.png',
          width: 1200,
          height: 630,
          alt: 'FSI Digital Blog',
        },
      ],
      type: 'website',
    },
  };
}
