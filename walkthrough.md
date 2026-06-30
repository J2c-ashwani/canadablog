# Sprint 2 Walkthrough — AI Grant Finder Monetization

**Date:** June 30, 2026  
**Status:** Production deployed. Commercial validation pending.

---

## 1. Context & Business Rationale

While auditing our database, we identified high-intent users who successfully completed searches but had no monetization path. Users landing on the **AI Grant Finder** (`/grant-finder`) were obtaining all matched grants in plain text with direct links for free, resulting in zero revenue generation and missed lead nurturing opportunities.

Instead of simply copying the calculator layout, Sprint 2 monetizes the AI Finder by adapting to the exploratory search psychology of these users. The goal is to maximize **Revenue Per Visitor (RPV)** and capture leads before showing the checkout.

---

## 2. Core Features Implemented

### 1. Value Preview (Audit 3 matches)
- Users see exactly **3 high-probability matched grants** in full, along with match score percentages, agencies, region categories, and the AI matching justifications.
- This serves as concrete proof of value and builds trust before presenting any paywall.

### 2. Benefit-Driven Lead Capture
- Instead of treating the email field as a gateway barrier, we introduce a benefit-driven save banner:
  > **"Save your personalized funding search so you can return anytime. We'll also email you your results."**
- Once a valid email is typed, it is auto-saved as a qualified lead to the CRM Sheets database (`/api/contact`), protecting the lead even if they abandon checkout. We will monitor the **Search → Email → Purchase** conversion loop to verify if this capture step improves our downstream email nurture campaigns.

### 3. Padlocked Categories & Opportunity Range
- Post-email capture, remaining matched grants are rendered as padlocked category placeholders (Federal, Provincial, Tax Credits, Wage Subsidies).
- We show a dynamic opportunity range banner:
  > **Estimated Funding Opportunity Range**: *"Based on your search, multiple programs may be relevant. Your complete report includes estimated funding opportunities and eligibility analysis."*

### 4. Outcome-Focused Value Dividers
- Before displaying pricing, a value divider card lists clear business outcomes:
  - Know which funding programs to prioritize first.
  - Avoid applications that are unlikely to succeed.
  - Reduce preparation time with checklists.
  - Understand combining/stacking rules.
  - Follow a step-by-step filing roadmap.

### 5. 3-Tier Commerce & Secondary Booking Path
- Mounts the PayPal script and injects the same pricing grid ($19 Basic Report, $79 Complete Bundle, $49 Action Plan) reusing our existing transactional pipeline.
- Below checkout, a secondary consult route is available:
  > **"Not ready to purchase? Book a 15-minute funding review."**

---

## 3. Success Metrics (Week 1 Targets)

| Metric | Target |
|--------|--------|
| **Searches** | Current baseline |
| **Email Capture** | +20% |
| **Checkout Starts** | +15% |
| **Purchases** | First AI Finder purchase |
| **Revenue per Search** | Above current baseline |
| **Bookings** | First qualified booking |

---

## 4. Technical Changes

### Files Modified

| File | Change |
|------|--------|
| [ai-grant-finder-form.tsx](file:///Users/ashwanikumar/Downloads/canadablog/components/ai-grant-finder-form.tsx) | Redesigned form output, added lock state hooks, injected email gate, pricing cards, and PayPal script. |
| [LeadConversionUpsellWatcher.tsx](file:///Users/ashwanikumar/Downloads/canadablog/components/LeadConversionUpsellWatcher.tsx) | Added `/grant-finder` to the suppression list to prevent upsell modals from hijacking checkout. |

---

## 5. Deployment & Build Status

| Verification Gate | Result | Status |
|-------------------|--------|--------|
| Next.js compiler check | Compiled successfully with zero errors | ✅ **PASS** |
| Git Commit | `d466d36` | ✅ **PASS** |
| Vercel Deployment | Live on production environment | ✅ **PASS** |

---

## 6. Commercial Validation

Sprint 2 is considered successful only if:
- Revenue per Search increases.
- Email capture rate exceeds previous baseline.
- Checkout starts increase.
- At least one purchase originates from the AI Grant Finder.
- At least one qualified booking originates from the AI Grant Finder.

---

## 7. Rollback Plan

Commercial validation will be monitored continuously. A rollback or immediate revision should be considered if:
- Search → Email conversion drops significantly below baseline.
- Checkout starts decrease materially.
- Purchases decline after deployment.
- Bounce rate increases substantially.
- Critical customer feedback indicates confusion.

---

## 8. Lessons Learned

Sprint 2 reinforced several commercial principles:
- Show meaningful value before introducing payment.
- Capture qualified leads before asking for purchase.
- Sell business outcomes rather than product features.
- Adapt monetization to user intent instead of copying existing funnels.
- Reuse proven commerce infrastructure whenever possible.

---

## 9. Founder Review

We will monitor production sessions daily to answer:
1. Did overall revenue increase?
2. Did Revenue Per Visitor (RPV) increase?
3. Did email lead capture rate improve?
4. Did booking requests increase?
5. Did checkout start rate improve?
6. Did support requests increase?
7. Did the landing page bounce rate change?

---

## 10. Exit Criteria

Commercial validation ends and Sprint 2 is officially closed when:
- The first purchase occurs on the AI Grant Finder.
- The funnel remains stable for seven consecutive days.
- Revenue Per Search stabilizes.
- No P0/P1 issues remain.
- KPIs meet or exceed targets.

---

## 11. What's Next (Operation First Revenue)

Both the `/calculator` and `/grant-finder` funnels are now technically monetized.

---

**Sprint 2 Implementation:** ✅ Complete  
**Production Deployment:** ✅ Complete  
**Technical Validation:** ✅ Complete  
**Commercial Validation:** ⏳ In Progress  

Sprint 2 will only be closed once commercial validation demonstrates that the AI Grant Finder generates measurable business value through increased Revenue Per Search, qualified lead capture, purchases, or consultation bookings.
