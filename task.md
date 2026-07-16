# Search Demand Capture Sprint Task Tracker

## Phase 1: Setup & Title/Meta/Content Rewrites
- [x] Implement Title & Meta B versions for the 3 target pages:
  - [x] NIH SBIR page (`lib/data/blog-posts/usa-news/nih-sbir-biotech-grants.ts`)
  - [x] NSF SBIR page (`lib/data/blog-posts/usa-news/nsf-sbir-grants-technology-startups.ts`)
  - [x] Minnesota state page (via priority research profile in `lib/editorial/priorityResearch.ts`)
- [x] Align H1, opening paragraph, and Calculator CTA on pages to prevent bounce:
  - [x] NIH SBIR page alignment (promise: Who qualifies + stacking)
  - [x] NSF SBIR page alignment (promise: Streams explained + success rates)
  - [x] Minnesota page alignment (promise: Stacking state + federal)

## Business System Integrity Audit — COMPLETE
- [x] **B1**: Cron connectivity check (schedule & env secret verification)
- [x] **B2**: Email connectivity mappings (trigger-to-webhook pipeline)
- [x] **B3**: Product pipeline connection check (catalog to purchase checkout and delivery endpoints)
- [x] **B4**: Lead capture to recovery check (sources, database, alert limits)
- [x] **B5**: Telemetry integrity check (dead tracking cleanup)
- [x] **B6**: Route reachability (sitemap / header checks)
- [x] **B7**: Feature reachability (UI discovery analysis)
- [x] **B8**: Revenue leakage checkpoints
- [x] **B9**: Dead code discovery
- [x] **B10**: Dependency mapping of the lead to executive data flow
- [x] **B11**: Construct final System Integrity Status Table

## Sprint 6: Commercial Query Sprint (Batch 1: First 5 Pages) — COMPLETE ✅
- [x] **Step 1: Perform SERP Competitor Gap & Search Intent Audits**
  - [x] Page 1: `/canada/small-business-grants` (Query: `small business funding canada`)
  - [x] Page 2: `/blog/csbfp-canada-small-business-financing-program` (Query: `canada small business financing`)
  - [x] Page 3: `/blog/canada-federal-grants` (Query: `government grants canada`)
  - [x] Page 4: `/canada/women-business-grants` (Query: `small business grants for women`)
  - [x] Page 5: `/usa/new-york` (Query: `new york business grants`)
- [x] **Step 2: Core Optimization Implementation (Batch 1)**
  - [x] Implement true freshness (deadlines, program counts, active cycles)
  - [x] Implement custom "Common Application Rejection Mistakes" sections
  - [x] Monetize the Ultimate Grant Guide CTA (`components/blog/GrantGuideCTA.tsx`)
  - [x] Store email in `sessionStorage` on submission
  - [x] Render the `OTOUpsellCard` on success state
- [x] Verification and Testing
  - [x] Verify phone validator fixes
  - [x] Verify contact form submission
  - [x] Verify calculator gated flow and auto-save
  - [x] Verify automated calculator follow-up email format
  - [x] Verify Ultimate Grant Guide monetization and pre-filled email
  - [x] Submit changes to production and trigger GSC priority recrawls

## Sprint 6: Commercial Query Sprint (Batch 2: Pages 6–10) — COMPLETE ✅
- [x] **Step 1: Core Optimization Implementation (Batch 2)**
  - [x] Page 6: `/blog/women-entrepreneurship-grants-2026` (Query: `grants for women owned businesses`)
  - [x] Page 7: `/canada/innovation-grants` (Query: `tech startup grants canada`)
  - [x] Page 8: `/blog/alberta-small-business-grants-guide` (Query: `alberta small business grants`)
  - [x] Page 9: `/blog/canada-startup-funding-grants-guide` (Query: `startup funding canada`)
  - [x] Page 10: `/canada/government-grants` (Query: `government funding for businesses canada`)
- [x] **Step 2: Verification & Build Validation**
  - [x] Compile and build local static pages to verify HTML indexability
  - [x] Verify contextual calculator headlines, Funding Strategy Boxes, and link mesh components
  - [x] Terminate compiler and submit changes to production

## Phase 2: Dashboard Simple Table Integration
- [x] Import `seoExperiments` array from `lib/data/seoExperiments.ts` into `/app/admin/dashboard/page.tsx`
- [x] Render the simplified **SEO Experiments** table under the Top Opportunities section:
  - [x] Display Columns: Page, Status, CTR Lift, Revenue, Winner?
- [x] Verify variables and module imports compile cleanly

## Sprint 6: Commercial Query Sprint (Batch 3: Pages 11–15) — COMPLETE ✅
- [x] **Step 1: Core Optimization Implementation (Batch 3)**
  - [x] Page 11: `/blog/quebec-small-business-grants-guide` (Priority: Highest)
  - [x] Page 12: `/blog/technology-startup-grants-2026` (Priority: High)
  - [x] Page 13: `/blog/manufacturing-grants-2026` (Priority: High)
  - [x] Page 14: `/blog/ontario-small-business-grants-guide` (Priority: Medium)
  - [x] Page 15: `/blog/bc-small-business-grants-guide` (Priority: Medium/Low)
- [x] **Step 2: Integration & Custom Differentiators**
  - [x] Bilingual glossary (Quebec), TRL Matrix (Tech), Capital cost write-off matrix (Manufacturing), Regional map directory (Ontario), Woman-owned eligibility checklist (BC)
  - [x] Flexible `<RelatedFundingPaths />` guided timeline router component
- [x] **Step 3: Verification & Build Validation**
  - [x] Verified static rendering and sitemap URLs
  - [x] Ran full Next.js production builds successfully

## Sprint 6: Commercial Query Sprint (Batch 4: Pages 16–20) — COMPLETE ✅
- [x] **Step 1: Core Optimization Implementation (Batch 4)**
  - [x] Page 16: `/blog/manitoba-small-business-grants-guide` (Priority: Medium/Low)
  - [x] Page 17: `/blog/saskatchewan-small-business-grants-guide` (Priority: Medium)
  - [x] Page 18: `/blog/atlantic-small-business-grants-guide` (Priority: Low)
  - [x] Page 19: `/blog/cybersecurity-grants` (Priority: Highest)
  - [x] Page 20: `/blog/5-best-government-loans-agriculture-tech-startups` (Priority: High)
- [x] **Step 2: Integration & Custom Differentiators**
  - [x] Regional map directory (Manitoba), SAVI glossary (Saskatchewan), ACOA BDP interest-free matrix (Atlantic), Cybersecurity supply-chain readiness scorecard (Cybersecurity), Sustainable CAP matching limits chart (Agriculture)
  - [x] Created and integrated the `EligibilitySnapshot` quick-criteria component
  - [x] Configured specific guided journeys via `RELATED_PATHS_CONFIG`
- [x] **Step 3: Verification & Build Validation**
  - [x] Verified build output on Next.js production compiler

## Phase 3: Verification & Compilation
- [x] Run `npm run build` to verify clean build without Webpack errors
- [x] Git commit and push changes to origin main

## Sprint 7: Cluster Authority & High-Impression Page Optimization
- [/] **Component A: Cluster Linking & Hub Authority**
  - [x] Update `RelatedPseoLinks.tsx` to link upward to hubs and database
  - [x] Verify `RelatedPageLinks.tsx` links logic
  - [x] Configure `RelatedFundingPaths.tsx` mappings for key clusters
- [x] **Component B: High-Impression Page & E-E-A-T Optimizations**
  - [x] Update `priorityResearch.ts` with top 100 GSC assets and CRA citations
  - [x] Enhance `priorityResearchContent.ts` with regional highlights for key state/province hubs
- [x] **Verification**
  - [x] Build the project successfully
  - [x] Verify link structures and sitemap configurations

