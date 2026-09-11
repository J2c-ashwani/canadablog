# Affiliate distribution release — CEO review

Code commit: `62ec5ce` — `feat(distribution): add verified affiliate referral channel`.

Production correction: `e4be140` — `fix(affiliates): use type alias for public partner record`. Final release verification completed September 9, 2026.

## Commercial purpose

This release gives approved newsletter owners, business communities, educators, and other relevant partners a commission incentive to distribute FSI Digital's existing self-serve products. It creates no upfront advertising spend. Partner commissions are a real acquisition cost and must be deducted when assessing contribution or profit.

The release itself does not establish new customers, revenue, active partners, or achievement of the $10,000 target. Recruitment, partner approval, publication, qualified visits, and verified purchases remain the commercial proof required.

## What was implemented

| Surface | Function |
| --- | --- |
| `/affiliates` | Public program terms and application form |
| `/affiliates/status?token=…` | Private application status, approved product links, clicks, verified conversions, and commission ledger |
| `/admin/affiliates` | Authenticated application review, commission review, manual payout recording, and payment reconciliation |
| `/r/[code]?offer=…` | Approved partner referral redirect into an eligible product |
| `/api/cron/reconcile-affiliate-commissions` | Authenticated daily recovery of missing commission records |

Applications collect contact and PayPal payout details, audience information, promotion plan, and acceptance of the current terms. Applications begin pending. Approval activates links; rejection keeps them inactive. Application receipts and review decisions use the existing email provider. The response distinguishes provider acceptance from delivery.

The partner portal's token is stored as a hash. Private pages are excluded from indexing, the status route is excluded from the sitemap, and the portal uses a no-referrer policy. New affiliate private pages suppress third-party tracking initialization and first-party funnel telemetry. The application opens its private status link through a full navigation.

## Approved economics

| Offer | Eligible sale value | 30% commission |
| --- | ---: | ---: |
| Funding Match Report | USD 19 | USD 5.70 |
| Funding Application Toolkit | USD 29 | USD 8.70 |
| Funding Action Plan | USD 49 | USD 14.70 |
| Complete Funding Blueprint | USD 79 | USD 23.70 |
| Funding Watch | USD 29/payment | USD 8.70 for each of the first three eligible payments |

Commission is based on eligible value actually paid and verified. Ineligible add-ons are excluded. Approved discounts can reduce the commissionable amount. CAD MCA purchases and the call-dependent offer are outside this affiliate program.

Attribution uses the last approved affiliate click within 30 days. An internal navigation click does not replace an existing valid affiliate referral. A later affiliate click can replace it. Commissions remain on hold for 30 days after payment, then require administrator approval. Recording a paid commission requires a PayPal payout reference; the dashboard does not initiate a transfer.

For illustration only, 127 USD 79 sales produce USD 10,033 gross and USD 3,009.90 affiliate commission, leaving USD 7,023.10 before payment fees, refunds, taxes, and other costs. Gross sales and cash retained are different targets. One-time product sales are not MRR.

## Payment and attribution controls

1. PayPal and Stripe checkout creation discard browser-provided attribution IDs, legacy alias fields, timestamps, and affiliate claims. Only the signed first-party cookie supplies trusted referral data.
2. Provider-verified one-time payments can create commissions through the browser completion route or signed provider webhook. Deterministic provider-payment commission IDs and operation leases reduce duplicate creation.
3. Membership checkout stores an opaque attribution intent and passes its handle in PayPal `custom_id`. The callback or signed activation webhook can restore the referral after a lost browser callback. The intent is bound to the declared member email.
4. Repeated membership callbacks preserve existing attribution, activation date, and payment history. Subscription activation establishes subscription status; signed payment events establish membership cash commissions.
5. Only the first three eligible membership payments are commissionable. Self-referrals matching the partner contact or payout email are rejected.
6. Refund, reversal, and dispute handlers update the commercial ledger and reverse unpaid commissions. Already-paid commissions become `clawback_due` for manual recovery.
7. Payable approval and paid-recording checks revalidate the source payment and approved partner status.
8. Daily reconciliation can backfill missed commissions. It excludes already-recorded sources before applying the batch cap, preventing those records from displacing new work.

## Existing behavior protected

The active self-serve price ladder is preserved. This release does not expand the nine-page SEO experiment or change the SEO cohort gate. It adds no calls, live sessions, paid advertising, automatic affiliate approvals, bulk outreach, or automatic money transfer.

The public rules require an affiliate disclosure and prohibit deceptive government affiliation, funding guarantees, self-referrals, cookie stuffing, impersonation, false urgency, unsolicited bulk messages, and guessed addresses. These restrictions are enforced through manual review, attribution controls, and commission review where measurable; the software cannot independently inspect every external partner publication.

## Verification

- TypeScript: passed after final code changes.
- Affiliate commercial-rule and integration assertions: passed.
- Existing architecture guard: passed.
- Existing CEO/Growth OS commercial reliability suite: passed.
- Existing search-distribution cohort suite: passed; 9 cohort routes and 6,144 non-cohort city-industry pages retained their controls.
- Git whitespace/conflict-marker check: passed.
- Independent review agent could not finish because of its usage limit; the primary agent performed the remaining review.
- Full local static build was not repeated because the environment had approximately 6.4 GB free and an earlier full build exhausted disk space. That earlier incomplete build is not verification evidence. Hosted build and production smoke results are recorded separately below.

These checks do not constitute a live end-to-end purchase, delivery, refund, renewal, or payout test. No synthetic sale or payout should be counted as commercial evidence.

## Operating the channel

Start with a small set of relevant partners whose audiences include Canadian or U.S. business owners. Review their actual audience and proposed placement, approve appropriate applications in Affiliate Operations, and have each approved partner publish one clearly disclosed placement using the supplied product-specific link.

Record partner activation as an actual published placement, not merely an approved account. Review approved partners, published placements, qualified product visits, checkout starts, provider-verified purchases, gross revenue, commission liability, refunds, and contribution after commissions. Scale partners and offers only after purchase evidence.

Suggested invitation for a relevant contact who welcomes partnership proposals:

> We have opened FSI Digital's affiliate program for business communities and publishers. Our self-serve funding research products cost USD 19–79, and approved partners earn 30% on eligible verified purchases. Funding Watch pays 30% on the first three eligible USD 29 membership payments. There is no signup fee; applications are manually reviewed and promotions must disclose the commission relationship. If this fits your audience, the details and application are at https://www.fsidigital.ca/affiliates.

## Production results

The first hosted deployment of `62ec5ce` failed lint at `lib/affiliates/store.ts:57`: an empty interface extended an `Omit` type. The implementation was corrected to a type alias; the failed deployment is not production verification evidence. The previously ready production deployment retained the live domain.

Provider configuration inspection is incomplete. The old local PayPal credentials returned HTTP 401; this does not establish a problem with production PayPal. The subsequent read-only inspection using current production configuration was rejected by automatic approval review because its reviewer hit a usage limit. No provider payment or webhook settings were changed.

Corrected deployment `dpl_DGn3pqumQ2L5ZnAzcbEwx8axokXj` is **Ready**. Vercel confirmed commit `e4be140`, completed the full production build and output deployment, and assigned both `https://www.fsidigital.ca` and `https://fsidigital.ca` to this deployment. Deployment URL: https://canadablog-g5066n4zr-join2campus-7325s-projects.vercel.app.

Full local lint passed with warnings, and TypeScript passed after the correction. Fifteen production smoke checks passed:

- Ten page requests returned HTTP 200: affiliate program, private status entry, locked admin entry, four eligible one-time product pages, membership, grants calculator, and MCA funding calculator. Each rendered one H1.
- Public affiliate canonical metadata, terms text, private status noindex/no-referrer metadata, and locked unauthenticated admin rendering were verified from production HTML.
- Three unauthenticated affiliate admin POST endpoints returned HTTP 401.
- The unauthenticated affiliate reconciliation cron endpoint returned HTTP 401.
- An unregistered referral code returned HTTP 307 to `/affiliates?ref=unavailable`.

These requests created no application, purchase, email, refund, or payout. The temporary production environment file used for the attempted configuration inspection was deleted. Existing unrelated workspace files were excluded from both commits.

The release is deployed. Live provider webhook event subscriptions, approved-partner checkout conversion, actual report delivery from an affiliate sale, renewal commission creation, and payout execution still require operational evidence. No new provider-verified cash was demonstrated by this deployment work; the September 25 revenue objective remains open.
