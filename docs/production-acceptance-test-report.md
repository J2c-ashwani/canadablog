# Production Acceptance Test Report

**Release:** `91823c5` — Secure payments and product entitlements  
**Status:** Conditional approval — local code checks passed; live commercial-flow checks pending a configured staging/production environment.  
**Owner:** Founder / operations lead

## Verified locally

| Control | Result | Evidence |
| --- | --- | --- |
| Type safety | Pass | `NODE_OPTIONS="--max-old-space-size=4096" npx tsc --noEmit` completed successfully. |
| Browser-created product orders | Pass | Product checkout components call the server checkout helper; no `actions.order.create` or `actions.order.capture` remains in product checkout paths. |
| Premium public assets | Pass | Paid templates were moved from `public/templates` to `private-assets/templates`; delivery is through `/api/products/download-asset`. |
| Download authorization | Pass (code inspection) | Download route requires an active purchase token and the capability required by the requested asset. |
| Booking authorization | Pass (code inspection) | `/booking` accepts a scoped login token and checks `strategy-audit-booking`; email, order ID, and product query parameters do not authorize booking. |
| Token scope separation | Pass (code inspection) | Login and unsubscribe use separate v3 prefixes and timing-safe scoped comparisons. Retired v2/deterministic credentials are rejected. |
| Spreadsheet formula safety | Pass (code inspection) | Customer writes use `RAW`; the sole `USER_ENTERED` exception writes a server-generated WhatsApp formula in its dedicated column. |
| Refund ordering | Pass (code inspection) | Admin refund handler revokes entitlements before calling the PayPal or Stripe refund API. |

## Local build note

Next.js source compilation completed. Full local static export could not be completed because this workstation could not resolve `fonts.googleapis.com` and later exhausted disk space while rendering the site's thousands of static pages. Those are local-environment constraints, not a TypeScript or application compile failure. Run the full build in Vercel or a staging environment with network access and adequate disk before production approval.

## Required live acceptance tests

Use PayPal/Stripe sandbox credentials, a non-production Google Sheet, and dedicated test email addresses. Record the order/session IDs and screenshots or response bodies for each case.

| ID | Scenario | Expected result | Status |
| --- | --- | --- | --- |
| PAY-01 | Complete a Funding Match Report purchase. | Server-created order completes; one completed purchase and `report` entitlement are created. | Pending live test |
| PAY-02 | Submit a valid order ID with a changed amount, currency, product, or payment-intent ID. | Purchase endpoint rejects it; no entitlement or download is issued. | Pending live test |
| PAY-03 | Submit the same completed order twice. | Second call returns the existing purchase only; no duplicate purchase, entitlement, email, or CRM entry. | Pending live test |
| ENT-01 | Report purchaser opens a protected report/download link. | Only report-scoped content is available; booking is denied. | Pending live test |
| ENT-02 | Strategy Audit purchaser opens the booking link. | Scoped login token resolves the purchaser and grants booking access. | Pending live test |
| ENT-03 | Bundle/toolkit purchaser downloads every included asset and requests an excluded asset. | Included downloads succeed; excluded assets return HTTP 403. | Pending live test |
| REF-01 | Refund a completed purchase through the admin refund endpoint. | Entitlements change to revoked before the processor refund succeeds. | Pending live test |
| REF-02 | After refund, retry report, download, and booking access. | Each protected action is denied. | Pending live test |
| TOK-01 | Use an unsubscribe token against login, profile, restore, booking, and download routes. | Every unrelated capability is denied. | Pending live test |
| TOK-02 | Use a malformed or retired v2 token. | It is denied without revealing account existence. | Pending live test |
| SHEET-01 | Submit customer fields beginning with `=`, `+`, `-`, and `@`. | Values appear as literal data in Sheets; no customer-controlled formula executes. | Pending live test |
| MOB-01 | Repeat PAY-01, ENT-02, and ENT-03 on a mobile browser. | Checkout, redirect, booking, and protected download work without exposing raw asset URLs. | Pending live test |

## Production approval criteria

Approve production only when every pending live test above has a recorded pass result and the remote Vercel build completes successfully. If a check fails, keep the release in staging, attach the failed order/session ID to the incident, and remediate only that confirmed failure before rerunning the affected test.

## Operational handoff after approval

1. Freeze feature work.
2. Monitor payment verification failures, refund attempts, denied-download events, and booking denials.
3. Prioritize production bugs, security dependency updates, SEO/Search Console findings, and measured revenue improvements.
