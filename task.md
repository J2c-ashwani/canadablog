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

## Phase 2: Dashboard Simple Table Integration
- [x] Import `seoExperiments` array from `lib/data/seoExperiments.ts` into `/app/admin/dashboard/page.tsx`
- [x] Render the simplified **SEO Experiments** table under the Top Opportunities section:
  - [x] Display Columns: Page, Status, CTR Lift, Revenue, Winner?
- [x] Verify variables and module imports compile cleanly

## Phase 3: Verification & Compilation
- [x] Run `npm run build` to verify clean build without Webpack errors
- [x] Git commit and push changes to origin main
