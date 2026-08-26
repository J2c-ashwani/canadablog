export interface DiscoveredProspect {
  companyName: string;
  domain: string;
  email: string;
  decisionMakerName: string;
  industry: string;
  region: string;
  fundingPurpose: string;
  intentScore: number;
  confidencePct: number;
  sourceQuery: string;
  snippet: string;
}

const SEARCH_QUERIES = [
  'site:linkedin.com/in "founder" OR "ceo" "ontario" "tech startup" "canada"',
  'site:linkedin.com/in "founder" OR "ceo" "alberta" "manufacturing" "canada"',
  'site:linkedin.com/in "founder" OR "ceo" "british columbia" "clean tech"',
  '"expansion grant" "small business" "canada" email contact',
  '"hiring r&d" "tech startup" "ontario" "contact"',
  '"startup accelerator" "california" "founder" contact',
];

export class SERPERProspector {
  private static getSerperApiKey(): string {
    return process.env.SERPER_API_KEY || '';
  }

  /**
   * Discovers new commercial outbound prospects using Google Search via Serper API.
   * Extracts domains, calculates dual scores, and stores high-intent prospects into CRM & outreach queue.
   */
  static async discoverNewProspects(maxResultsPerQuery = 5): Promise<{
    discoveredCount: number;
    savedCount: number;
    prospects: DiscoveredProspect[];
  }> {
    const apiKey = this.getSerperApiKey();
    if (!apiKey) {
      console.warn("⚠️ SERPER_API_KEY not configured. Skipping outbound web discovery.");
      return { discoveredCount: 0, savedCount: 0, prospects: [] };
    }

    const discovered: DiscoveredProspect[] = [];
    let savedCount = 0;

    // Pick 2 random queries per run to rotate discovery topics
    const shuffled = [...SEARCH_QUERIES].sort(() => 0.5 - Math.random());
    const selectedQueries = shuffled.slice(0, 2);

    for (const query of selectedQueries) {
      try {
        console.log(`🔎 [SERPER Prospector] Searching Google for outbound leads: "${query}"...`);

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

          // Skip generic platform domains
          if (["linkedin.com", "facebook.com", "twitter.com", "canada.ca", "gc.ca", "wikipedia.org", "youtube.com"].includes(domain)) {
            continue;
          }

          // Parse company name & decision maker from title/snippet
          const companyName = domain.split(".")[0].toUpperCase();
          const decisionMakerName = title.split("-")[0]?.split("|")[0]?.trim() || "Founder";

          // Only use a public address actually present in the source snippet.
          const emailMatch = snippet.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
          if (!emailMatch) continue;
          const email = emailMatch[0].toLowerCase();

          // Determine industry & region from query/snippet
          const snippetLower = (title + " " + snippet).toLowerCase();
          const industry = snippetLower.includes("tech")
            ? "Technology"
            : snippetLower.includes("mfg") || snippetLower.includes("manufactur")
            ? "Manufacturing"
            : snippetLower.includes("clean") || snippetLower.includes("solar")
            ? "Clean Tech"
            : snippetLower.includes("health") || snippetLower.includes("bio")
            ? "Healthcare"
            : "General Business";

          const region = snippetLower.includes("ontario") || snippetLower.includes("toronto")
            ? "ON"
            : snippetLower.includes("alberta") || snippetLower.includes("calgary")
            ? "AB"
            : snippetLower.includes("bc") || snippetLower.includes("vancouver")
            ? "BC"
            : snippetLower.includes("quebec") || snippetLower.includes("montreal")
            ? "QC"
            : "ON";

          // Calculate Dual Scores (Intent Score 0-100 & Confidence Pct 0-100%)
          let intentScore = 75; // Outbound growth signal baseline
          if (snippetLower.includes("grant") || snippetLower.includes("funding")) intentScore += 10;
          if (snippetLower.includes("expans") || snippetLower.includes("hiring")) intentScore += 10;
          intentScore = Math.min(95, intentScore);

          const confidencePct = 85;

          const prospect: DiscoveredProspect = {
            companyName,
            domain,
            email,
            decisionMakerName,
            industry,
            region,
            fundingPurpose: "Expansion & R&D Funding",
            intentScore,
            confidencePct,
            sourceQuery: query,
            snippet,
          };

          discovered.push(prospect);

          // Save directly to "OutreachProspects" Google Sheet tab for targeted cold outreach
          try {
            const { seedOutreachProspects } = await import("@/lib/google-sheets");
            const save = await seedOutreachProspects([
              {
                website: `https://${domain}`,
                prospectName: decisionMakerName,
                email,
                targetPage: "/blog/canada-federal-grants",
                name: decisionMakerName,
                personalizedHook: `Found active ${industry} expansion signal for ${companyName} via Google SERP (${query}).`,
                // Discovery alone is not consent to commercial email. These prospects
                // remain in review_required until a compliant contact permission is recorded.
                status: "review_required",
                sentAt: null,
                deliveryStatus: null,
                replied: false,
                positiveConversation: false,
                backlinkEarned: false,
              },
            ]);
            if (!save.success) throw save.error || new Error('Prospect could not be durably saved.');
            savedCount += save.inserted || 0;
            console.log(`✅ [SERPER Prospector] Saved new outbound prospect to 'OutreachProspects' tab: ${email} (${companyName}) | Intent: ${intentScore}`);
          } catch (saveErr) {
            console.error(`⚠️ Failed to save discovered prospect ${email} to OutreachProspects tab:`, saveErr);
          }
        }
      } catch (err) {
        console.error(`Error executing SERPER query "${query}":`, err);
      }
    }

    console.log(`🎯 [SERPER Prospector] Completed web discovery: Found ${discovered.length} prospects, ${savedCount} new leads saved to CRM.`);
    return { discoveredCount: discovered.length, savedCount, prospects: discovered };
  }
}
