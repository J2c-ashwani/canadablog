# Workspace Rules & SEO Optimization Checklist

All future page optimizations in the commercial query sprints (including Batch 4 and beyond) must strictly satisfy the following standardized review checklist before being marked complete.

---

## 📋 Page Optimization Audit Checklist

Before marking any optimized route as complete, the agent must verify:

- [ ] **Competitor Gaps Addressed:** Content covers all gaps identified during the corresponding SERP competitor audit.
- [ ] **Search Intent Aligned:** Copy speaks directly to search intent (e.g. explains *why* certain terms or glossaries are added).
- [ ] **Official Programs & Agencies Updated:** Injects correct, official department names and terminology rather than generic labels.
- [ ] **Freshness Verified:** Document active cycles, 2026 timelines, and clearly separate proposed measures (e.g. budget bills) from enacted programs.
- [ ] **Decision Support Added:** Includes helpful timelines, cost-sharing comparisons, or parameter tables.
- [ ] **Unique Differentiator Included:** Employs a unique visual asset (like maps, calculators, matrices, or glossaries) to differentiate from search competitors.
- [ ] **RelatedFundingPaths Configured:** Integrates a customizable `<RelatedFundingPaths />` component set up in `RELATED_PATHS_CONFIG` for the next logical read.
- [ ] **Calculator CTA Present:** Embeds the eligibility check or stacking tool.
- [ ] **Consultation Path Present:** Prominently links to the strategy audit booking flow.
- [ ] **Internal Links Reviewed:** Verifies bidirectional internal links to maintain semantic cluster relevance.
- [ ] **Metadata Checked:** Sets `seoTitle`, `metaDescription`, `seoVersion` (incremented), and `seoUpdatedAt` (current timestamp) in the wrapper file.
- [ ] **Build Passes:** Compiles successfully without TypeScript compilation or lint warnings.

---

## 📐 Cluster-Based Content Strategy

Organize optimizations inside distinct thematic groups rather than handling pages as isolated entities. This builds holistic topical authority:

*   **Ontario Cluster:** Ontario Small Business Grants, Regional Development Program (RDP), FedDev, Ontario Manufacturing, Ontario Tech.
*   **Quebec Cluster:** Quebec SME, Investissement Québec (IQ), MEIE, MES-MFOR, Quebec Manufacturing, Regional Tax Credits.
*   **Technology Cluster:** Innovation Grants, Tech Startup Funding, NRC IRAP, CRA SR&ED, Mitacs Accelerate, Scale AI.
*   **Manufacturing Cluster:** Advanced Manufacturing, SIF Stream 5, NGen Supercluster, Productivity Super-Deduction, CTM ITC, Regional Tariff Response (RTRI).

---

## 📂 Blog Page Architecture & Content Sources

To avoid confusion regarding "empty" or "blank" content fields, the agent must check which rendering channel a blog post uses before modifying files:

1. **Editorial Profiled Pages (The "Blank Content" Strategy):**
   * **Source location:** [priorityResearchContent.ts](file:///Users/ashwanikumar/Downloads/canadablog/lib/editorial/priorityResearchContent.ts)
   * **How it works:** If a route is registered in [priorityResearch.ts](file:///Users/ashwanikumar/Downloads/canadablog/lib/editorial/priorityResearch.ts), it dynamically resolves its body content from `priorityResearchContent.ts` and ignores the JSON `content` field.
   * **Rule:** Do NOT write copy under `"content"` in the JSON or TS metadata files for these pages. Keeping `content: ""` is **intentional** to protect search rankings and prevent double-rendering.

2. **Hardcoded Static Pages:**
   * **Source location:** `app/blog/[slug]/page.tsx` directories (e.g. `app/blog/canada-federal-grants/page.tsx`)
   * **How it works:** Next.js matches hardcoded routes before dynamic ones. These pages render their body statically from their own React files.
   * **Rule:** Do NOT use the dynamic JSON `content` fields to edit these pages; edit the `page.tsx` file inside their respective folder instead.

3. **Dynamic JSON Database Pages:**
   * **Source location:** `lib/data/blog-content/[slug].json` (content key)
   * **How it works:** Standard dynamic posts that do not have profiles or hardcoded directories load their HTML paragraphs directly from their corresponding JSON file.
   * **Rule:** Edit the `"content"` key of the JSON file to update the body copy for these pages.

