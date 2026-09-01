import { AuthorityOpportunity, AuthorityCategory } from "./types";

const PUBLIC_EMAIL_PATTERN = /(?:mailto:)?([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+)/gi;
const NON_CONTACT_LOCAL_PARTS = new Set(['noreply', 'no-reply', 'donotreply', 'mailer-daemon', 'bounce']);
const MAX_CONTACT_PAGE_BYTES = 750_000;
const CONTACT_LOOKUP_TIMEOUT_MS = 8_000;

const CATEGORY_QUERIES: Record<string, string> = {
  startup_directory: '"startup directory" "canada" OR "ontario" submit company',
  resource_page: '"small business funding" OR "startup grants" inurl:resources OR inurl:links "canada"',
  incubator: '"incubator" OR "accelerator" "ontario" OR "canada" startup portfolio directory',
  accelerator: '"accelerator" "canada" OR "toronto" portfolio startups',
  industry_blog: '"government grants" OR "R&D tax credits" blog "canada"',
};

function decodeCommonHtmlEntities(value: string) {
  return value
    .replace(/&commat;|&#64;|&#x40;/gi, '@')
    .replace(/&#46;|&#x2e;/gi, '.')
    .replace(/&amp;/gi, '&');
}

function normalizedHost(value: string) {
  return value.trim().toLowerCase().replace(/^www\./, '');
}

function isPublicHttpsUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return false;
    const host = normalizedHost(url.hostname);
    if (!host || host === 'localhost' || host.endsWith('.localhost')) return false;
    if (/^(?:0|127)(?:\.\d{1,3}){3}$/.test(host)) return false;
    if (/^10(?:\.\d{1,3}){3}$/.test(host)) return false;
    if (/^192\.168(?:\.\d{1,3}){2}$/.test(host)) return false;
    if (/^172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2}$/.test(host)) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Finds a contact address visibly published by the candidate site itself. It
 * deliberately rejects third-party addresses present in a resource article so
 * a public source never becomes an excuse to contact an unrelated person.
 */
export function extractSameSitePublicEmail(html: string, website: string) {
  const expectedHost = normalizedHost(website);
  const matches = decodeCommonHtmlEntities(html).matchAll(PUBLIC_EMAIL_PATTERN);
  for (const match of matches) {
    const email = String(match[1] || '').trim().toLowerCase().replace(/[.,;:!?]+$/, '');
    const [localPart, domain] = email.split('@');
    if (!localPart || !domain || NON_CONTACT_LOCAL_PARTS.has(localPart)) continue;
    const emailHost = normalizedHost(domain);
    if (emailHost === expectedHost || emailHost.endsWith(`.${expectedHost}`)) return email;
  }
  return undefined;
}

export class OpportunityDiscovery {
  private static getSerperApiKey(): string {
    return process.env.SERPER_API_KEY || '';
  }

  /**
   * Discovers high-ROI link building opportunities focused on the 3 core launch categories:
   * 1. Startup Directories
   * 2. Industry Resource Pages
   * 3. Incubators / Accelerators
   *
   * @param category Optional specific category to search
   * @param maxResultsPerQuery Maximum number of results to fetch per SERP query
   * @returns Array of AuthorityOpportunity
   */
  static async discoverOpportunities(category?: AuthorityCategory, maxResultsPerQuery = 5): Promise<AuthorityOpportunity[]> {
    const apiKey = this.getSerperApiKey();
    if (!apiKey) {
      console.warn("⚠️ SERPER_API_KEY not configured. Skipping authority opportunity discovery.");
      return [];
    }

    const discovered: AuthorityOpportunity[] = [];
    
    // Core 3 launch categories for high depth before breadth
    const launchCategories: string[] = [
      "startup_directory",
      "resource_page",
      "incubator"
    ];

    let selectedQueries: { cat: string; query: string }[] = [];

    if (category && CATEGORY_QUERIES[category as string]) {
      selectedQueries.push({ cat: category as string, query: CATEGORY_QUERIES[category as string] });
    } else {
      // Pick 2 random queries from the top 3 core launch categories
      const shuffled = [...launchCategories].sort(() => 0.5 - Math.random());
      const selectedCats = shuffled.slice(0, 2);
      selectedQueries = selectedCats.map(cat => ({ cat, query: CATEGORY_QUERIES[cat] }));
    }

    for (const { cat, query } of selectedQueries) {
      try {
        console.log(`🔎 [Opportunity Discovery] Searching for ${cat}: "${query}"...`);

        const response = await fetch("https://google.serper.dev/search", {
          method: "POST",
          headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: query,
            num: maxResultsPerQuery,
          }),
        });

        if (!response.ok) {
          console.error(`SERPER API request failed (${response.status}): ${await response.text()}`);
          continue;
        }

        const data = await response.json();
        const results = data.organic || [];

        for (const item of results) {
          const title = item.title || "";
          const snippet = item.snippet || "";
          const link = item.link || "";

          // Extract domain
          let domain = "";
          try {
            const parsedUrl = new URL(link);
            domain = parsedUrl.hostname.replace(/^www\./, "");
          } catch (e) {
            continue;
          }

          // Filter out social/generic domains
          const ignoredDomains = [
            "linkedin.com", "facebook.com", "twitter.com", "github.com",
            "canada.ca", "gc.ca", "wikipedia.org", "youtube.com", "medium.com"
          ];
          if (ignoredDomains.includes(domain)) {
            continue;
          }

          // A SERP snippet is not contact evidence. Read only the exact public
          // candidate page, extract a visibly published same-site contact, and
          // preserve that page as the later human-review source URL.
          const email = await this.findSameSitePublicContact(link, domain);

          const opp: AuthorityOpportunity = {
            id: `opp_${Date.now()}_${Math.random().toString(36).substring(2,7)}`,
            website: domain,
            prospectName: title || domain,
            email: email || '',
            category: cat as AuthorityCategory,
            targetPage: link,
            discoveredAt: new Date().toISOString(),
            sourceQuery: query,
            metadata: {
              siteTitle: title,
              siteDescription: email
                ? `Public same-site contact was displayed on the exact source page. ${snippet}`
                : snippet,
              recentArticles: [],
              aboutSummary: ''
            }
          };

          discovered.push(opp);
        }
      } catch (err) {
        console.error(`Error executing opportunity discovery query "${query}":`, err);
      }
    }

    return discovered;
  }

  private static async findSameSitePublicContact(targetPage: string, website: string) {
    if (!isPublicHttpsUrl(targetPage)) return undefined;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), CONTACT_LOOKUP_TIMEOUT_MS);
    try {
      const response = await fetch(targetPage, {
        method: 'GET',
        redirect: 'manual',
        signal: controller.signal,
        headers: {
          Accept: 'text/html,application/xhtml+xml',
          'User-Agent': 'FSI-Digital-Authority-Research/1.0 (+https://www.fsidigital.ca)',
        },
      });
      if (!response.ok || response.status >= 300 && response.status < 400) return undefined;
      const contentType = String(response.headers.get('content-type') || '').toLowerCase();
      const contentLength = Number(response.headers.get('content-length') || 0);
      if (!contentType.includes('text/html') || (Number.isFinite(contentLength) && contentLength > MAX_CONTACT_PAGE_BYTES)) {
        return undefined;
      }
      const html = await response.text();
      if (html.length > MAX_CONTACT_PAGE_BYTES) return undefined;
      return extractSameSitePublicEmail(html, website);
    } catch {
      return undefined;
    } finally {
      clearTimeout(timeout);
    }
  }
}
