# FSI Digital — Founder & CEO Engineering & Product Execution Policy
# Effective Immediately (Applies to All Future Sprints)

## 🎯 Mission
We are NOT building a content website. We are building a commercial Funding Intelligence Platform with one objective:
👉 **Reach $10,000+ Monthly Recurring Revenue (MRR).**

Everything we build must move the company closer to that goal.

---

## 📈 Core Company Philosophy
Revenue is the North Star.
Not:
- More pages
- More dashboards
- More reports
- More analytics
- More SEO metrics
- Better looking UI
(Those are supporting metrics only).

Success is measured by:
1. Qualified Organic Traffic
2. Qualified Leads
3. Digital Product Sales
4. Strategy Session Bookings
5. Grant Filing Clients
6. Monthly Recurring Revenue (MRR)

Traffic without revenue has no business value.

---

## 📐 Engineering Golden Rule
Every engineering task must answer ONE question before development begins:
> **"Will this directly increase traffic, leads, conversions, or revenue?"**

If the answer is **NO**... **DO NOT BUILD IT.**

---

## 🚫 Infrastructure Freeze Policy
Do NOT build:
- Admin dashboards
- Analytics dashboards
- Internal reports
- Tracking systems
- Fancy UI improvements
- New infrastructure
- New scoring engines
UNLESS there is a clear and measurable path to increasing organic traffic, qualified leads, product sales, strategy bookings, filing clients, or MRR.

---

## 💰 Commercial Page Standard
Every commercial page must function like a salesperson. Every optimized page MUST contain the complete commercial funnel:
```
Google Search
      ↓
Commercial Landing Page
      ↓
Interactive Decision Tool
      ↓
Personalized Result
      ↓
Lead Capture (Google Sheets & Database sync)
      ↓
Relevant Product Recommendation
      ↓
Strategy Session Offer
      ↓
Grant Filing Service Signup
```
If any step is missing, the page is **NOT** complete.

---

## ⚡ Revenue Decision Engines Policy
Interactive tools are NOT built for engagement alone. Every tool is a **Revenue Decision Engine (RDE)** designed to attract commercial traffic, qualify prospects, collect first-party data, recommend the right paid product, and convert visitors into customers.

Every RDE MUST satisfy **ALL FIVE** conditions:
1. **Improves SEO:** Enhances engagement metrics, search session duration, and crawl relevance.
2. **Helps the founder make a decision:** Provides immediate business clarity.
3. **Captures a qualified lead:** Mandatory inline email capture synced to Google Sheets.
4. **Recommends the correct paid product:** Proposes a targeted paid product ($19-$29 upgrades) matching the user's specific result.
5. **Opens the path toward high-ticket services:** Direct routes to strategy sessions ($199) and filing services ($2,500+).

If any condition is missing, the implementation is **INCOMPLETE**.

---

## 🔒 Mandatory Lead Capture
Every interactive tool must save user interaction.
Capture the following parameters and submit them via POST to the `/api/contact` API (which syncs immediately to the Google Sheets database and customer profiles):
* Email (Mandatory)
* Name (Optional)
* Company (Optional)
* Tool Used (e.g. `TRL Selector`, `Stacking Checker`, `Checklist Screener`)
* Province/State
* Industry / Focus
* Qualification Score / Readiness Band
* Estimated Funding / Cap
* Timestamp, Landing Page Path, and Traffic Source (UTM params)

No qualified interaction should be lost.

---

## 💎 Mandatory Product Monetization
Every interactive tool MUST recommend a paid product. 
Our revenue ladder:
```
Free Tool
      ↓
$19 Funding Report
      ↓
$49 Toolkit
      ↓
$79 Premium Strategy
      ↓
$199 Strategy Session
      ↓
$2,500+ Grant Filing Service
```
Different tools must recommend the **most relevant** product matching the user's specific result. Never show the same generic offer everywhere.
* **TRL Selector** → Technology Funding Report
* **Healthcare Screener** → Healthcare Funding Guide
* **Agriculture Checker** → Agriculture Funding Toolkit
* **Women Founder Tool** → Women Entrepreneur Guide
* **Indigenous Funding Tool** → Indigenous Funding Package

---

## 🧭 Decision Support Principle
We are NOT writing articles. We are helping founders make business decisions. Every commercial page must answer one important decision:
* **TRL Selector** → Which funding agency should I apply to?
* **IRAP Screener** → Do I qualify?
* **Healthcare Tool** → Am I ready for NIH/FDA funding?
* **Stacking Checker** → Which grants can legally be combined?
* **NASA Tool** → Which solicitation matches my technology?

Users should leave with clarity, not just information.

---

## 📐 Differentiation Rule
Matching competitors is NOT enough. A comparison table, matrix, or checklist is parity. We must create reasons to choose FSI Digital. Deployed differentiators must be:
- Revenue Decision Engines (RDE)
- Eligibility Screeners
- Diagnostic Wizards
- Funding Stack Calculators
- Cost-Share Estimators
- Grant Match Engines
- Personalized Roadmaps
- Downloadable Action Plans
- Decision Trees
- Interactive Qualification Flows

Every optimized page should provide something competitors do not.

---

## 📋 Sprint Approval Policy
Future sprints will NOT be approved simply because "X pages optimized." They will only be approved if they contribute to business growth. Every sprint must estimate expected business impact:
* Additional Organic Visitors
* Qualified Leads
* Product Sales
* Strategy Session Opportunities
* Filing Opportunities
* Estimated Monthly Revenue Impact

Output is NOT success. Business impact is success.

---

## 🔒 60-Day Content Lock
After optimization, pages are locked for **60 days**. No further edits unless:
- Search intent changes significantly
- Government regulations change
- Rankings collapse
- Critical factual or mathematical errors are discovered
Avoid unnecessary SEO churn.

---

## 📂 Project-Specific Architecture Rules

To avoid confusion regarding rendering channels, agents must inspect the rendering structure before modifying files:

1. **Editorial Profiled Pages:**
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

---

## ✅ Sprint Optimization Definition of Done
Every page optimization sprint is considered complete only when:
- [ ] **Build Passes:** Project compiles successfully with zero TypeScript compilation errors or lints.
- [ ] **Metadata Updated:** Title, meta description, and schema properties are correct.
- [ ] **Internal Links Updated:** Bidirectional in-cluster link distribution is reviewed.
- [ ] **RelatedFundingPaths Configured:** Integrated with correct parameters.
- [ ] **Calculator CTA Verified:** Intake checks lead correctly to the matching calculator.
- [ ] **NeedHelpApplying Verified:** Strategy audits/consultations booking links function.
- [ ] **Sitemap Regenerated:** The priority XML sitemap file reflects the updated index states.
- [ ] **Backlog Regenerated:** Project backlog reports update the page status.
- [ ] **Manual Mobile QA Passed:** Touch sizes, safe area clipping, and responsive wrappers validated.
