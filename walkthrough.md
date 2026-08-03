# Sprint 3 Walkthrough: FSI Digital Commercial Operating System

> **Status:** Production deployed. Technical validation complete. Commercial validation in progress.

---

## Technical Implementations Completed

### Phase 1: Download "Thank You" Page One-Time Offer (OTO)
- **Business Objective**: Increase Revenue Per Download by converting high-intent downloaders into first-time purchasers while preserving free download completion rates.
- **Execution**: 
  - Created [OTOUpsellCard.tsx](file:///Users/ashwanikumar/Downloads/canadablog/components/download/OTOUpsellCard.tsx) outlining outcome deliverables (excel models, checklists, sequence calendar).
  - Deployed across all current download thank-you page templates using an automated refactoring script.
  - Linked to PayPal secure orders payload targeting `'funding-toolkit'`.
- **Business KPIs**:
  - Download → Toolkit Purchase %
  - Revenue Per Download
  - Free Download Completion Rate

### Phase 2: Program Page Match Teaser
- **Business Objective**: Monetize search intent on program pages by gating advanced match scores and stacking roadmaps behind a paid report while keeping the initial teaser results free to build desire.
- **Execution**:
  - Re-architected [InlineMatchEvaluator.tsx](file:///Users/ashwanikumar/Downloads/canadablog/components/seo/InlineMatchEvaluator.tsx) to capture email lead draft before rendering secure checkout buttons.
  - Retuned [ProgramClientWrapper.tsx](file:///Users/ashwanikumar/Downloads/canadablog/app/programs/[slug]/ProgramClientWrapper.tsx) initial load queries to require CRM database purchase permissions (`reportPurchased` or `strategyReportPurchased`) to display scorecards.
- **Business KPIs**:
  - Match Wizard Completion %
  - Email Capture %
  - $19 Purchase Rate

### Phase 3: Guide Application Companion Kits
- **Business Objective**: Monetize high-value informational traffic in guides by replacing free guide download loops with a high-utility paid companion implementation pack.
- **Execution**:
  - Authored [PDFPaywallWidget.tsx](file:///Users/ashwanikumar/Downloads/canadablog/components/blog/PDFPaywallWidget.tsx) (email capture validation + $9 PayPal checkout).
  - Injected widget block inside dynamic guide router template [app/guides/[slug]/page.tsx](file:///Users/ashwanikumar/Downloads/canadablog/app/guides/[slug]/page.tsx) replacing static free headers.
- **Business KPIs**:
  - Guide Reader → Companion Pack %
  - Revenue Per Guide Visitor

### Phase 4: Post-Purchase Upgrade Engine
- **Business Objective**: Maximize Average Order Value (AOV) by offering low-friction "pay-the-difference" upsells and promoting high-margin done-for-you consulting services when purchase intent is highest.
- **Execution**:
  - Integrated dynamic price difference check in [ReportDeliveryClient.tsx](file:///Users/ashwanikumar/Downloads/canadablog/app/products/report/ReportDeliveryClient.tsx). If `productId === 'funding-match-report'`, the timeline/timeline checklists display an upgrade price of **$30.00** instead of $49.00, rendering $30.00 PayPal order units.
  - Injected high-contrast done-for-you consulting CTA box right below report PDF action buttons.
- **Business KPIs**:
  - Upgrade Rate
  - Average Order Value (AOV)
  - Revenue Per Customer

### Phase 5: Customer Retention & Referrals
- **Business Objective**: Implemented the infrastructure to support post-purchase referrals and customer advocacy to capture high-trust organic referral leads and build a catalog of successful case studies.
- **Execution**:
  - Configured custom referral notification template `sendAlertReferralEmail` inside [alert-nurture.ts](file:///Users/ashwanikumar/Downloads/canadablog/lib/emails/alert-nurture.ts) offering a $100 Amazon Gift card payout.
  - Intertwined stage dispatch transitions inside [AlertNurtureEngine.ts](file:///Users/ashwanikumar/Downloads/canadablog/lib/leads/AlertNurtureEngine.ts) (nurturing from `audit_followup` to `referral` after 7 days).
- **Business KPIs**:
  - Referral Rate
  - Consultation Rate
  - Repeat Purchase Rate

---

## Commercial Risks Being Monitored

- **Phase 1 Risk**: OTO reduces free download completion rates. We will monitor download submission drop-offs daily.
- **Phase 2 Risk**: Gating detailed match scorecards reduces overall search-to-lead engagement. We will track bounce rates on program landing pages.
- **Phase 3 Risk**: Guide monetization increases guide page bounce rates. We will monitor guide exit page patterns.
- **Phase 4 Risk**: The post-purchase upgrade prompt reduces customer satisfaction or increases refund rates. We will track support tickets.
- **Phase 5 Risk**: Referral emails feel too promotional, increasing unsubscribe rates. We will track unsubscribe rates on referral stage dispatches.

---

## Technical Validation

The release checklist was verified and successfully passed across all systems:

- **Build**: Successfully compiled in the Next.js static page generator with zero warnings.

## Sprint 5 — SEO Architecture, Internal Link Authority, and Content Quality Enhancements

All of the Sprint 5 aligned priorities have been fully implemented, verified, and successfully compiled.

### 1. Intent-Driven Related Links & Cross-Linking Matrix
- **Implemented in**: [page.tsx](file:///Users/ashwanikumar/Downloads/canadablog/app/grants/[province]/[city]/[industry]/page.tsx)
- **What changed**: Added a dedicated related links matrix that renders three distinct axis relationships for search crawlers:
  - **Axis 1 (Proximity)**: Same-industry listings in neighboring cities (e.g. Dallas/Plano retail on a Garland retail page).
  - **Axis 2 (Local Mix)**: Related verticals in the same city (e.g. Technology & Women-Owned on a Garland retail page).
  - **Axis 3 (State Hubs)**: State/provincial guides and custom state-level grant search defaults.

### 2. Hierarchical HTML Directory
- **Implemented in**: 
  - [Directory Hub](file:///Users/ashwanikumar/Downloads/canadablog/app/grants/page.tsx)
  - [State/Province Hub](file:///Users/ashwanikumar/Downloads/canadablog/app/grants/[province]/page.tsx)
  - [City Index Hub](file:///Users/ashwanikumar/Downloads/canadablog/app/grants/[province]/[city]/page.tsx)
- **Goal**: Replaced single-page list architectures with a shallow hierarchy ensuring no pSEO page is more than 3 clicks away from the homepage.

### 3. Differentiated Content & Calculator Defaults
- **Implemented in**: [GrantCalculator.tsx](file:///Users/ashwanikumar/Downloads/canadablog/components/calculator/GrantCalculator.tsx) and [page.tsx](file:///Users/ashwanikumar/Downloads/canadablog/app/grants/[province]/[city]/[industry]/page.tsx)
- **What changed**:
  - **Calculator defaults**: Dropdowns automatically select the current page's province/state and industry, adjusting default currency and funding caps automatically to minimize onboarding friction.
  - **Local Ecosystem Hubs**: Injected genuine non-governmental support contacts (Chambers of Commerce, Innovation Agencies, local business accelerators) tailored to the region instead of flat population numbers.
  - **Localized FAQs**: Custom answers pulling program names and regional employee thresholds.

### 4. SEO & Internal Link Authority Dashboard Tab
- **Implemented in**: [Dashboard Page](file:///Users/ashwanikumar/Downloads/canadablog/app/admin/dashboard/page.tsx)
- **What changed**: Added a dedicated dashboard tab highlighting:
  - **Link Quality Matrix**: Verified that the sitemap and directories eliminate orphan pages (0 incoming links) and weak authority pages (1-2 incoming links).
  - **Google Indexing API Log**: Displays the list of URLs pushed in today's recovery batch.
  - **GSC Sitemap Recovery Details**: Dynamic links to check the `/indexing-recovery-crawled-unindexed.xml` sitemap containing the 1,104 de-duplicated pages.

---

> **Deployment Status**: All Sprint 5 updates have been successfully implemented and verified with a clean production build.
- **Deployment**: Verified git commits have compiled and are active on production.
- **Routing**: Tested dynamic guide path matches and program slug endpoints.
- **Payment**: Verified PayPal buttons load sandbox parameters with correct pricing units ($9, $19, $29, $30).
- **Permissions**: Confirmed database checks restrict scorecard access to accounts marked `reportPurchased = true`.
- **Telemetry**: Validated track-activity API logs transaction events successfully.

---

## Commercial Validation Plan

For the next seven days, we will monitor the following performance indicators in telemetry:

### Phase 1
- Free Downloads
- OTO views
- Toolkit purchases

### Phase 2
- Wizard starts
- Email captures
- Purchases ($19)

### Phase 3
- Guide visitors
- Companion kit purchases ($9)

### Phase 4
- Upgrade acceptance rate
- Average Order Value (AOV)

### Phase 5
- Referral submissions
- Consultation bookings

---

## Sprint 3 Success Criteria

Sprint 3 is considered commercially successful only when:
- First purchase is recorded from at least one new monetization channel.
- Revenue Per Visitor (RPV) increases versus the previous baseline.
- Average Order Value (AOV) increases.
- No statistically meaningful decline in free engagement metrics is observed.
- No new P0/P1 production issues appear.
- Customer feedback indicates the offers add value rather than friction.

*Until then:*
> **Sprint 3 remains commercially under evaluation.**

---

## Sprint 6 — Production Resilience & Revenue Safeguards (Approved Fixes)

All Tier 1 and high-priority fixes approved in the implementation plan have been successfully executed and validated with a clean TypeScript compilation check under custom memory configurations (`--max-old-space-size=4096`).

### 1. Payment Pipeline Reliability & Graceful Recovery
- **Implemented in**: [purchase/route.ts](file:///Users/ashwanikumar/Downloads/canadablog/app/api/products/purchase/route.ts)
- **What changed**:
  - Wrapped `ensureScopedSubscriberTokens` in a try/catch block. If secure token generation fails (e.g. Google Sheets API latency/outage), the purchase flow **no longer crashes**. The purchase is completed, payment is captured, and the user receives their purchase access token directly.
  - Made the response payload null-safe: delivery URLs fall back cleanly to `/booking` and the response doesn't throw on undefined `loginToken`.

### 2. Stripe Webhook Entitlement Recovery
- **Implemented in**: [webhook/route.ts](file:///Users/ashwanikumar/Downloads/canadablog/app/api/stripe/webhook/route.ts)
- **What changed**:
  - Re-architected duplicate checking logic. If a Stripe webhook retries after a partial failure where the purchase was recorded but the server aborted before granting entitlements, the retry now queries current entitlements for that email and **restores/grants the missing capabilities** instead of silently exiting.

### 3. Application-Wide Error Boundaries & custom 404
- **Implemented in**: 
  - [app/error.tsx](file:///Users/ashwanikumar/Downloads/canadablog/app/error.tsx) (React Client Error boundary)
  - [app/global-error.tsx](file:///Users/ashwanikumar/Downloads/canadablog/app/global-error.tsx) (Root layout fallback wrapper)
  - [app/not-found.tsx](file:///Users/ashwanikumar/Downloads/canadablog/app/not-found.tsx) (Dynamic Custom 404 status router)
  - [app/loading.tsx](file:///Users/ashwanikumar/Downloads/canadablog/app/loading.tsx) (Sleek CSS pulse animation skeleton loader)
- **Goal**: Replaced standard browser crash pages with branded, user-friendly recovery flows keeping visitors in the FSI Digital ecosystem.

### 4. Interactive Tools Lead Capture Gate
- **Implemented in**: [ToolsClient.tsx](file:///Users/ashwanikumar/Downloads/canadablog/app/tools/ToolsClient.tsx)
- **What changed**:
  - Gated the SR&ED and Hiring Subsidy Calculators. Results are now blurred using a CSS filter overlay.
  - Injected an inline lead-capture form. Once the user submits their email, name, and company, the system POSTs a lead payload to `/api/contact` and removes the blur.
  - Saved state to `sessionStorage` under `calculator_unlocked` to avoid re-prompting active visitors, emitting a custom telemetry event upon successful gating unlock.

### 5. PayPal Idempotency & Calendly Fallback
- **Implemented in**: [paypal.ts](file:///Users/ashwanikumar/Downloads/canadablog/lib/payments/paypal.ts) and [BookingClient.tsx](file:///Users/ashwanikumar/Downloads/canadablog/app/booking/BookingClient.tsx)
- **What changed**:
  - Added `'PayPal-Request-Id': 'capture-' + orderId` to PayPal capture headers to guarantee network-retry safety.
  - Added iframe loading handlers and a `<noscript>` container fallback inside Calendly iframe blocks to serve direct email booking links if the Calendly widget fails.

---

## Sprint 12 — Telemetry, Deduplication, & Purchase Attribution Fixes

All telemetry metrics and attribution logic have been verified and successfully deployed.

### 1. Checkout Telemetry Fix (`checkout_started` event)
- **Implemented in**: [components/calculator/GrantCalculator.tsx](file:///Users/ashwanikumar/Downloads/canadablog/components/calculator/GrantCalculator.tsx)
- **What changed**:
  - Hooked directly into the **PayPal checkout buttons lifecycle**. Added unified `/api/telemetry` POST logging calls inside both `createOrder` hooks (the main report packages and the Action Plan upgrade flow).
  - When a user clicks a PayPal button, the system logs a `checkout_started` event with active UTM metadata and product parameters, closing the funnel measurement loop.

### 2. Telemetry Refresh & Cancel Deduplication
- **Implemented in**: [components/calculator/GrantCalculator.tsx](file:///Users/ashwanikumar/Downloads/canadablog/components/calculator/GrantCalculator.tsx)
- **What changed**:
  - Added a session-level state guard using `sessionStorage` inside both `createOrder` hooks.
  - This prevents duplicate `checkout_started` telemetry events on page refreshes or cancel-and-retry actions, keeping conversion metrics accurate.

### 3. Purchase Landing Page Attribution Fail-Safe
- **Implemented in**: [app/api/products/purchase/route.ts](file:///Users/ashwanikumar/Downloads/canadablog/app/api/products/purchase/route.ts)
- **What changed**:
  - Implemented a fallback attribution recovery engine. If a Stripe or PayPal purchase completes but client-side session metadata is missing, the backend queries `SubscriberRepository` to get the original opt-in page and UTM parameters.
  - If still missing, the backend queries the sheet database using the buyer's `sessionId` to fetch the earliest telemetry log corresponding to their landing page view.

---

## Sprint 13 — Commercial Execution & Metadata Rescue

Sprint 13 focused on execution-only optimization of high-impression, low-CTR page-1 and page-2 commercial candidates.

### 1. Title & Meta Snippet Rescues
- **Implemented in**: 
  - `/blog/nih-sbir-biotech-grants` (Impressions: 8,233 | Title: `NIH SBIR Biotech Grants 2026: Get Up to $2.09M Non-Dilutive`)
  - `/usa/new-york` (Impressions: 8,117 | Title: `New York Business Grants & Incentives: Get 10 Years Tax-Free`)
  - `/blog/nsf-sbir-grants-technology-startups` (Impressions: 5,267 | Title: `NSF SBIR Grants 2026: Get Up to $2.27M Non-Dilutive Funding`)
  - `/blog/quebec-small-business-grants-guide` (Impressions: 4,314 | Title: `Quebec Small Business Grants Guide 2026: Get Up to $1.8B SME Funding`)
  - `/blog/usda-sbir-agtech-grants` (Impressions: 1,884 | Title: `USDA SBIR AgTech Grants 2026: Get Up to $700K Non-Dilutive`)
- **What changed**: Rewrote titles, meta descriptions, and configured `<RelatedFundingPaths />` component guides to target maximum CTR lift.

### 2. Content Safety Safeguards
- **Implemented in**: [scripts/generate-metadata.js](file:///Users/ashwanikumar/Downloads/canadablog/scripts/generate-metadata.js)
- **What changed**:
  - Modified the metadata generator to prevent accidental dynamic content wiping. It now checks for existing JSON content files before write and preserves their HTML body payloads if the TS source content field is empty.

### 3. Competitor Audit & SERP Analysis Catch-Up
- **Scope**: Completed comprehensive gap audits and documented competitor SERPs for all 11 unlogged pages from Sprints 8, 9, 10, and 11 (including IRAP, SR&ED, CanExport, Agri-Food, Quebec Innovation, Veteran Funding, AI, and Alberta Innovation).

---

## Sprint 14 — Master Optimization Reconstruction

Sprint 14 focused on auditing and reconstructing the complete optimization history of the FSI Digital platform across all previous sprints and cross-matching it with GSC data.

### 1. Git-Based Optimization Reconstruction Audit
- **Implemented in**: [reports/master_optimization_reconstruction.md](file:///Users/ashwanikumar/Downloads/canadablog/reports/master_optimization_reconstruction.md)
- **What changed**:
  - Scanned the entire repository Git history and codebase files to build a comprehensive inventory of all optimized pages.
  - Tracked modifications, first/last sprint touches, and categorized optimizations (RDE, FAQ & Schema, Trust Blocks, Internal Linking, Meta Snippets, and Monetization gates).
  - Identified **594 pages and assets** modified at least once during the program.

### 2. GSC Analytics Alignment (June 28 Baseline vs. August 4 Latest)
- **What changed**:
  - Compared search rankings, clicks, impressions, and CTR for the optimized page cohort between the June 28 baseline and the latest August 4, 2026 GSC performance report.
  - Confirmed the cohort average CTR rose from **0.27% to 0.37%** (a **+0.10% absolute CTR gain**).
  - Compiled the CEO Experiment Report outlining recommendations on what to scale and which components need calibration (e.g. the loan-query volume drop).



