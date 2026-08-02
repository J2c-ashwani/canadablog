import { AuthorityOpportunity, AuthorityCategory } from "./types";

const CATEGORY_QUERIES: Record<string, string> = {
  startup_directory: '"startup directory" "canada" OR "ontario" submit company',
  resource_page: '"small business funding" OR "startup grants" inurl:resources OR inurl:links "canada"',
  incubator: '"incubator" OR "accelerator" "ontario" OR "canada" startup portfolio directory',
  accelerator: '"accelerator" "canada" OR "toronto" portfolio startups',
  industry_blog: '"government grants" OR "R&D tax credits" blog "canada"',
};

export class OpportunityDiscovery {
  private static getSerperApiKey(): string {
    return (
      process.env.SERPER_API_KEY ||
      process.env.NEXT_PUBLIC_SERPER_API_KEY ||
      "960fb0979530c15d5b507f53aa8c7f15f12a9bd9"
    );
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

          const emailMatch = snippet.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
          const email = emailMatch ? emailMatch[0].toLowerCase() : `contact@${domain}`;

          const opp: AuthorityOpportunity = {
            id: `opp_${Date.now()}_${Math.random().toString(36).substring(2,7)}`,
            website: domain,
            prospectName: title || domain,
            email,
            category: cat as AuthorityCategory,
            targetPage: link,
            discoveredAt: new Date().toISOString(),
            sourceQuery: query,
            metadata: {
              siteTitle: title,
              siteDescription: snippet,
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
}
