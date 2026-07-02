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

## Phase 2: Dashboard Simple Table Integration
- [x] Import `seoExperiments` array from `lib/data/seoExperiments.ts` into `/app/admin/dashboard/page.tsx`
- [x] Render the simplified **SEO Experiments** table under the Top Opportunities section:
  - [x] Display Columns: Page, Status, CTR Lift, Revenue, Winner?
- [x] Verify variables and module imports compile cleanly

## Phase 3: Verification & Compilation
- [x] Run `npm run build` to verify clean build without Webpack errors
- [x] Git commit and push changes to origin main
