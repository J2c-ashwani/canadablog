# Global Monetization Expansion Plan (Sprint 3 Backlog)

> [!WARNING]
> **Sprint Freeze Precaution**: This plan contains blueprints for future monetization expansion. Execution will begin sequentially following the successful commercial validation of Sprint 2.

---

## Mission
Transform FSI Digital from a collection of monetized pages into a **unified commercial system** by aligning our product offers with customer intent, ensuring every asset feeds the next stage of the customer journey, and maximizing Lifetime Value (LTV).

---

## Commercial Principles

Every monetization point must satisfy three conditions:

1. **Meaningful Value First**: The user has already received meaningful value before seeing a paywall.
2. **Next Problem Focus**: The paid product solves the user's next logical problem, not the current one.
3. **LTV Stacking**: Every purchase creates the opportunity for the next purchase, increasing Customer Lifetime Value (LTV).

---

## Customer Value Ladder

Rather than gating pages arbitrarily, products map directly to the customer's active journey stage:

```
Discover (Free Lead Magnet / Free Guide)
    ↓
Evaluate (Match Wizard Pre-Prescreen / Teaser)
    ↓
Plan (Match Report $19 / Action Plan $49)
    ↓
Execute (Application Companion Kits $9 / Complete Bundle $79)
    ↓
Optimize (Done-For-You Filing / Strategic Funding Audit)
    ↓
Maintain (Annual Funding Membership Retainer)
```

---

## Phase 1: Download "Thank You" Page One-Time Offer (OTO)
Targeting users who have just downloaded a free kit and demonstrated initial research intent.

### User Flow
```
User requests free kit (Enter Email) 
    ↓
Submits Form (Saved to Leads DB)
    ↓
Redirects to Thank-You Page
    ↓
Show success message + What they received
    ↓
Show what templates/checklists they are missing
    ↓
Offer Exclusive Upgrade: Grant Application Toolkit ($29 one-time)
    ↓
Secure Checkout (PayPal) ──> Redirects to Toolkit Downloads
```

### Phase 1 Success Rule
Customers should think:
> *"I already received something valuable. The toolkit will save me even more time."*
*(Not: "They're trying to sell me immediately.")*

---

## Phase 2: Program Page Match Teaser
Targeting organic searchers checking match qualifications on individual program pages.

### User Flow
```
User visits /programs/[slug] 
    ↓
Runs Match Wizard (Wizard Step 1-4)
    ↓
Show High-Value Pre-qualification Teaser (Fit, Amount, Difficulty, Timeline)
    ↓
Gate: Detailed Stacking Sequence & Combined Roadmap
    ↓
Offer Next Step: Complete Funding Match Report ($19) or Booking Path
    ↓
Secure Checkout (PayPal) ──> Reveal Detailed Scorecard + Stacking Portfolio
```

### Phase 2 Success Rule
Customers should think:
> *"I already know I qualify. Now I need the strategy."*
*(Not: "They're hiding everything.")*

---

## Phase 3: Guide Application Companion Kits
Targeting top-of-funnel readers consuming long-form research articles.

### User Flow
```
User reads 4,000-word guide (e.g. /guides/sred-application-guide)
    ↓
Sticky Sidebar Callout: "Get the Application Companion Kit for $9"
    ↓
Fast Checkout (Email + PayPal)
    ↓
Instant delivery of Companion pack (Worksheets, checklists, offline guide)
```

### Phase 3 Success Rule
Customers should think:
> *"This implementation pack will help me actually complete my application."*
*(Not: "They're charging for a PDF.")*

---

## Phase 4: Post-Purchase Revenue Engine & Upgrades
Maximize Average Order Value (AOV) by providing seamless path upgrades.

### Upgrade Path
- **Order Bump**: Immediately after purchasing a `$19` Match Report, prompt the user: *"Upgrade to the Funding Action Plan. Pay only the difference: $30."*
- **Done-For-You Hook**: On the purchase thank-you page, display the primary CTA: *"Need help implementing these applications? Book a 15-minute consultation review to discuss full-service filing."*

---

## Phase 5: Customer Retention & Referrals
Multiply LTV by driving post-purchase outcomes, case study assets, and retainers.

### Lifecycle Flow
```
Purchase
    ↓
Successful Outcome (Filing complete)
    ↓
Referral Request & Case Study Consent
    ↓
Annual Membership Upsell (Year-round monitoring)
    ↓
Renewal / Repeat Purchases (Next fiscal period filing)
```

---

## Success Metrics

### 1. Acquisition
- Total Visitors
- Revenue Per Visitor (RPV)
- Email Capture Rate
- Organic Conversion Rate

### 2. Commerce
- Checkout Start Rate
- Purchase Conversion Rate
- Average Order Value (AOV)
- Revenue by Channel

### 3. Customer Success
- Consultation Booking Rate
- Repeat Purchase Rate
- Refund Rate
- Support Tickets per 100 orders
- Customer Satisfaction

---

## Rollback Conditions

Immediately disable or redesign the experiment if:
- Organic traffic decreases significantly.
- Email capture rate falls materially.
- Landing page bounce rate increases materially.
- Revenue Per Visitor (RPV) decreases.
- Refund rate exceeds target benchmark (>1.5%).
- Customer complaints indicate reduced brand trust.

---

## Definition of "Done"

A sprint phase is considered officially closed and complete only when:
- The funnel is stable in production.
- The first organic sale is recorded.
- Seven consecutive days of successful operation are achieved.
- No P0 or P1 production issues remain in telemetry.
- Commercial KPIs meet predefined targets.
- Customer feedback indicates the offer adds value rather than friction.
