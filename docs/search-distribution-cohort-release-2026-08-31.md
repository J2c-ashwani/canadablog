# Search Distribution Cohort Release — 2026-08-31

## Release scope

This release is a controlled implementation of the changes originally developed in commit `110ed31`. The broad shared-template version was immediately neutralized by revert commit `e1d3ff8`. The production candidate applies new content and attribution only to the nine routes in `lib/seo/searchDistributionRollout.ts`.

- Three existing U.S. SBIR editorial revenue pages
- Three existing Canadian city-industry pages
- Three existing U.S. city-industry pages
- Every other city-industry page remains on the pre-release rendering path

The cohort is identified in production HTML and attributed product paths by rollout ID `seo-cohort-v1`.

## Required acceptance gates

1. Cohort pages return HTTP 200 and render the rollout marker.
2. Representative control pages return HTTP 200 without the rollout marker.
3. Every checked page has one rendered H1.
4. Titles, descriptions, canonicals, and index/follow metadata are present and route-correct.
5. Cohort content distinguishes research leads from confirmed eligibility and tells users to verify current official rules.
6. Product links pass through the signed first-party Growth OS redirect with a cohort-specific action ID/campaign.
7. Product pages, calculator, checkout creation, PayPal/Stripe verification code, fulfillment, email, membership, and Growth OS checks show no regression.
8. Revenue counts only when the purchase record contains a provider capture ID and a verified payment status.

## Primary KPI

`verified revenue from seo-cohort-v1 / unique organic sessions on cohort routes × 1,000`

The executive dashboard labels this metric **Search Cohort RP1KOV**. Forecasts, checkout starts, unverified purchase rows, and traffic estimates never count as revenue.

## Build environment limitation

The earlier local `next build` compiled and type-checked, then stopped during static generation after 4,056 of 8,114 routes because the local machine returned `ENOSPC` (insufficient disk space). That incomplete 8,114-route build is **not** evidence of full-build verification and must not be represented as a pass. Cohort acceptance instead requires the targeted test suite plus the hosting provider's completed production deployment and post-deploy HTTP/rendering checks.

## Expansion rule

Do not enable the shared template across the remaining pages from this release. Traffic alone never authorizes expansion.

Every later batch requires all of these gates:

1. **Observation:** at least 14 full days since the cohort release and at least 500 unique organic cohort visitors.
2. **SEO:** cohort rankings/CTR improve or remain neutral; a regression fails the gate.
3. **Funnel:** organic visitor → product click → checkout performance does not materially deteriorate.
4. **Revenue:** at least five provider-verified cohort purchases, or the conservative alternative evidence threshold of at least 1,000 organic cohort visitors, three verified purchases, and positive verified RP1KOV.
5. **No regression:** checkout, payment, fulfillment, email, calculator, Growth OS, and sitewide verified revenue remain healthy.

Unknown evidence fails closed. A human-reviewed expansion decision is still required even when every coded gate passes. Each later batch must remain independently reversible.
