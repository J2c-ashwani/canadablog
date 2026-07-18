# FSI Digital — Launch Readiness Checklist

**Release / commit:** ____________________  
**Planned launch date and time:** ____________________  
**Sign-off owner (not the implementing developer):** ____________________

Mark every item complete and attach the evidence location before approving launch.

- [ ] Vercel production build succeeded and the production URL passed a smoke check.
- [ ] Every scenario in the [Production Acceptance Test Report](./production-acceptance-test-report.md) passed, with evidence attached.
- [ ] Production PayPal/Stripe credentials, merchant account, currency, and webhook secrets are configured and verified.
- [ ] Production Google Sheets/CRM and transactional-email integrations are verified using a test record.
- [ ] Protected downloads require a valid active entitlement; direct and guessed URLs are denied.
- [ ] Booking requires a valid scoped login credential and `strategy-audit-booking` entitlement.
- [ ] Refund revocation is verified: access is denied before the processor refund is issued.
- [ ] Payment-verification failures, refund failures, denied-download events, and application errors are monitored and alerting is enabled.
- [ ] A rollback plan is documented, including the prior Vercel deployment URL/ID, owner, and customer-support response.

## Evidence and approval

**Evidence location:** _________________________________________________

**Go / no-go decision:**  ☐ Go  ☐ No-go

**Sign-off name and role:** ___________________________________________

**Signature / approval reference:** ____________________________________

**Date and time:** ____________________________________________________
