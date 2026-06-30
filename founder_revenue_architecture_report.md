# Founder's Revenue Architecture Report: FSI Digital

This report details how each of our **10 monetization channels** is technically wired, how payments are collected, and how user states are synchronized in our Google Sheets CRM.

---

## 💳 Checkout Engine Overview

FSI Digital leverages the secure **PayPal JavaScript SDK** on the client side, paired with **server-side validation** in Next.js API routes. This prevents client-side transaction spoofing.

We utilize two distinct transaction types via the PayPal API:
1. **One-Time Order Capture (`v2/checkout/orders`)**: Used for digital files, reports, audits, and upgrades.
2. **Billing Agreements / Vaulted Subscriptions (`v1/billing/subscriptions`)**: Used for the recurring Founding Member membership.

---

## 📦 Detailed Product & Revenue Breakdown

### 1. Founding Member Subscription (Recurring)
*   **Price:** **$29.00 / month** (7-day free trial)
*   **Frontend Execution:** [PortfolioClient.tsx](file:///Users/ashwanikumar/Downloads/canadablog/app/portfolio/PortfolioClient.tsx#L464-L508)
    - Injected SDK script loads with `vault=true&intent=subscription`.
    - PayPal buttons call `actions.subscription.create({ plan_id: "P-4NW64491Y0450531PM2WUT7Y" })`.
    - Upon approval, grabs `data.subscriptionID` (starts with `I-`).
*   **Backend Verification:** [upgrade/route.ts](file:///Users/ashwanikumar/Downloads/canadablog/app/api/subscriber/upgrade/route.ts#L30-L40) -> calls `verifyPayPalSubscription(subscriptionId)` in [paypal.ts](file:///Users/ashwanikumar/Downloads/canadablog/lib/payments/paypal.ts).
    - Queries PayPal subscription v1 API to check for status `ACTIVE` or `APPROVED`.
*   **Database Record Updated:** Sets `subscriptionStatus = "active"` and records the PayPal `subscriptionId` in Google Sheets columns 43 & 44.

---

### 2. Interactive Assessment / Full Profile Scorecard
*   **Standard Price:** **$199.00** | **Member Price:** **$99.00**
*   **Frontend Execution:** Handled during assessment checkout flows.
*   **Backend Verification:** [buy-report/route.ts](file:///Users/ashwanikumar/Downloads/canadablog/app/api/subscriber/buy-report/route.ts#L26-L31)
    - Checks the subscriber's `subscriptionStatus`. If active/trial, prices at `$99.00`, otherwise `$199.00`.
    - Verifies order transaction using standard `verifyPayPalOrder(transactionId, expectedPrice)`.
*   **Database Record Updated:** Sets `reportPurchased = true` and saves `reportTransactionId` in column 48.

---

### 3. Funding Match Report (Program Wizard)
*   **Price:** **$19.00**
*   **Frontend Execution:** [InlineMatchEvaluator.tsx](file:///Users/ashwanikumar/Downloads/canadablog/components/seo/InlineMatchEvaluator.tsx#L182-L199)
    - Captures lead email first, then launches standard PayPal Order capture.
*   **Backend Verification:** [purchase/route.ts](file:///Users/ashwanikumar/Downloads/canadablog/app/api/products/purchase/route.ts)
    - Standard PayPal Order verification matches against a `$19.00` expected price.
*   **Database Record Updated:** Writes purchase history and toggles `reportPurchased = true` in Google Sheets database (granting access to program-specific metrics).

---

### 4. Funding Action Plan (Roadmap Timeline)
*   **Price:** **$49.00**
*   **Frontend Execution:** [GrantCalculator.tsx](file:///Users/ashwanikumar/Downloads/canadablog/components/calculator/GrantCalculator.tsx#L960-L985)
    - Prompted when a user clicks locked timeline/sequence views.
*   **Backend Verification:** [purchase/route.ts](file:///Users/ashwanikumar/Downloads/canadablog/app/api/products/purchase/route.ts)
    - Validates order signature matching a `$49.00` expected price.
*   **Database Record Updated:** Toggles `strategyReportPurchased = true` in sheet column 65.

---

### 5. Complete Funding Bundle
*   **Price:** **$79.00**
*   **Frontend Execution:** Injected inside calculator plans selection interface.
*   **Backend Verification:** [purchase/route.ts](file:///Users/ashwanikumar/Downloads/canadablog/app/api/products/purchase/route.ts)
    - Verifies order value matching `$79.00`.
*   **Database Record Updated:** Toggles both access columns: `reportPurchased = true` AND `strategyReportPurchased = true`.

---

### 6. Action Plan Upgrade (Pay-the-Difference)
*   **Price:** **$30.00**
*   **Frontend Execution:** [ReportDeliveryClient.tsx](file:///Users/ashwanikumar/Downloads/canadablog/app/products/report/ReportDeliveryClient.tsx#L191-L215)
    - If user purchased the `$19` Match Report, the timeline checkouts dynamically discount the upgrade from `$49.00` to `$30.00`.
*   **Backend Verification:** [purchase/route.ts](file:///Users/ashwanikumar/Downloads/canadablog/app/api/products/purchase/route.ts)
    - Verifies transaction value at the `$30.00` discount mark.
*   **Database Record Updated:** Overwrites access permissions `strategyReportPurchased = true` in column 65.

---

### 7. Funding Application Toolkit (One-Time Offer)
*   **Price:** **$29.00**
*   **Frontend Execution:** [OTOUpsellCard.tsx](file:///Users/ashwanikumar/Downloads/canadablog/components/download/OTOUpsellCard.tsx#L90-L105)
    - Promoted on download thank-you pages.
*   **Backend Verification:** [purchase/route.ts](file:///Users/ashwanikumar/Downloads/canadablog/app/api/products/purchase/route.ts)
    - Matches expected price of `$29.00` for product `'funding-toolkit'`.
*   **Database Record Updated:** Adds `"toolkit"` to JSON `leadActivity` field mapping for delivery.

---

### 8. Funding Approval Library
*   **Price:** **$9.00**
*   **Frontend Execution:** [PDFPaywallWidget.tsx](file:///Users/ashwanikumar/Downloads/canadablog/components/blog/PDFPaywallWidget.tsx#L140-L155)
    - Swapped inside guides to gate companion files. Also available as an order bump checkbox on the calculator dashboard.
*   **Backend Verification:** [purchase/route.ts](file:///Users/ashwanikumar/Downloads/canadablog/app/api/products/purchase/route.ts)
    - Verifies order signature matching a `$9.00` expected price.
*   **Database Record Updated:** Updates activity JSON data arrays in column 51.

---

### 9. Live Strategic Audit / Consultation
*   **Standard Audit:** **$199.00** | **VIP Strategic Session:** **$499.00**
*   **Frontend Execution:** [AuditClient.tsx](file:///Users/ashwanikumar/Downloads/canadablog/app/audit/AuditClient.tsx#L260-L295)
    - Secure payment captures on the advisory calendar booking form.
*   **Backend Verification:** [purchase/route.ts](file:///Users/ashwanikumar/Downloads/canadablog/app/api/products/purchase/route.ts)
    - Checks input price values. If `tier === 'vip'`, verifies `$499.00`, else `$199.00`.
*   **Database Record Updated:** Flags `auditCandidate = "Yes"` in database column 71.

---

### 10. Partner Referral Commissions
*   **Revenue Source:** Variable B2B commissions (typically **$500–$2,500** per corporate referral contract signed).
*   **Process:** 
    - Leads matching high corporate readiness scores are routed to B2B tax credit accounting firms.
    - Commission outcomes are registered inside the Google Sheets B2B partner payout rows.
*   **Location:** Integrated into the admin leads dashboard metric graphs at [/admin/leads](file:///Users/ashwanikumar/Downloads/canadablog/app/admin/leads/page.tsx#L229-L235).

---

## 🔍 Security Measures In Place

1. **Server-Side Order Capturing**: For standard checkouts, we capture the transaction server-side rather than trusting the client-side `onApprove` capture. This prevents users from fabricating success calls.
2. **Double-Dipping Protection**: Cross-checks prevent users from buying identical matching reports or overlapping items twice.
3. **Decoupled Verification**: If Google Sheets encounters temporary API limits, the transaction capture is completed on PayPal first, ensuring no customer is charged without securing vendor validation logs.
