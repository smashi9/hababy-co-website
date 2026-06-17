# Milestone 039 — Phone and Contact Hardening

## Goal

Improve phone/contact handling so customer phone numbers are more reliable for WhatsApp/admin follow-up.

This milestone should make the request form collect cleaner phone data without adding OTP or external verification.

## Scope

Improve:

* phone input UX
* country code handling
* server-side phone validation
* server-side phone normalization
* WhatsApp-friendly phone format
* docs/tests around contact handling

## Business Decision

Do not add OTP yet.

V1 logic:

* Customer provides phone number.
* Hababy contacts customer manually by phone/WhatsApp.
* Fake or unreachable numbers are handled during human review.
* Request is not confirmed until Hababy manually confirms details.

## Read First

* `AGENT_ROUTING.md`
* `01-product-requirements.md`
* `06-backend-plan.md`
* `07-test-plan.md`
* `08-build-log.md`
* `11-change-log.md`
* `hababy-site/components/request/RequestForm.tsx`
* `hababy-site/lib/validation/requestSchema.ts`
* `hababy-site/app/request/actions.ts`
* `hababy-site/lib/supabase/orders.ts`
* `hababy-site/lib/whatsapp/message.ts`
* `hababy-site/tests/e2e/`

## Requirements

### Request Form

Update the request form so phone collection is clearer.

Preferred approach:

* Add a country code dropdown/select.
* Default to Morocco `+212`.
* Include common options:

  * Morocco `+212`
  * France `+33`
  * UK `+44`
  * US/Canada `+1`
  * Spain `+34`
  * UAE `+971`
  * Other/manual option if simple and safe

Keep a phone number input next to or below it.

The UI should still be simple and mobile-friendly.

### Server-Side Validation

Do not trust the browser.

Update server-side validation so the submitted phone becomes one normalized stored value.

Rules:

* Phone is required.
* Country code is required if using split input.
* Strip spaces, dashes, parentheses, and other formatting characters.
* Store the normalized phone in international-style format, preferably starting with `+`.
* Reject obviously too-short numbers.
* Reject obviously invalid values made only of symbols/text.
* Do not over-engineer full telecom validation.

### Morocco Handling

Handle common Morocco input patterns:

* `06...` with country code `+212` should normalize to `+2126...`
* `07...` with country code `+212` should normalize to `+2127...`
* `+2126...` should remain `+2126...`
* `002126...` should normalize to `+2126...`

### WhatsApp Compatibility

Update WhatsApp phone normalization if needed so it works well with the stored normalized phone.

Do not modify customer phone data in the database except for new submissions.

Do not add OTP.

Do not add SMS providers.

Do not add WhatsApp API.

Do not send messages automatically.

## Security / Data Rules

* Do not touch `.env.local`.
* Do not run SQL.
* Do not edit Supabase SQL files.
* Do not expose secrets.
* Do not add external phone APIs.
* Do not add OTP.
* Do not add payment/checkout UI.
* Do not commit.
* Do not push.

## Optional Helper

Create a small helper if useful:

* `hababy-site/lib/contact/phone.ts`

It can include:

* country code options
* normalize phone function
* WhatsApp URL phone conversion helper if appropriate
* safe display formatting if simple

Keep it framework-independent if possible.

## Tests

Update Playwright smoke tests if useful, but do not create real requests by default.

Safe tests can check:

* `/request?product=travel-cot` loads
* country code dropdown is visible
* Morocco is the default
* phone input is visible

Do not submit real order data in default e2e tests.

If adding unit-style tests is not already set up, do not add a new test framework just for this milestone.

## Documentation

Update:

* `08-build-log.md` with Entry 039
* `11-change-log.md` because request form behavior changes
* `07-test-plan.md` with contact/phone testing notes

## Checks

Run from `hababy-site/`:

* `npm run lint`
* `npm run build`
* `npm run test:e2e`

## Return Summary

Return:

* files changed
* what was implemented
* how phone input changed
* how phone normalization works
* how Morocco numbers are handled
* how WhatsApp compatibility is affected
* what was intentionally not built
* Playwright changes, if any
* lint result
* build result
* e2e result
* human review checklist
* whether Claude review is recommended before commit
* suggested commit message
