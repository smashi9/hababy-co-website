# Milestone 038 — WhatsApp Handoff Foundation

## Goal

Add a safe admin-side WhatsApp handoff foundation so the owner can quickly contact a customer about an order.

This milestone should generate copyable / prefilled WhatsApp messages from the admin order detail page.

## Scope

Build a helper on the admin order detail page that lets the admin:

- copy a WhatsApp-ready message
- optionally open WhatsApp with a prefilled message using the customer phone number
- choose message tone/status based on the order status

## Important

This is not WhatsApp API integration.

Do not:
- send messages automatically
- add WhatsApp Business API
- add webhooks
- add background jobs
- add paid integrations
- change order status
- reserve inventory
- edit SQL
- run SQL
- touch `.env.local`
- commit
- push

## Read First

- `AGENT_ROUTING.md`
- `06-backend-plan.md`
- `07-test-plan.md`
- `08-build-log.md`
- `11-change-log.md`
- `hababy-site/app/admin/(protected)/orders/[id]/page.tsx`
- `hababy-site/components/admin/OrderDetailView.tsx`
- `hababy-site/types/order.ts`
- `hababy-site/lib/supabase/adminQueries.ts`
- `hababy-site/tests/e2e/`

## Business Rules

- Request-first model remains.
- A request is not automatically confirmed.
- Payment is offline only.
- No “Pay now.”
- No online payment.
- No automatic WhatsApp sending.
- Admin manually reviews and sends the message.
- For car seats, do not imply Hababy confirms child suitability.
- Parents choose the appropriate car seat group based on listed specs.

## Message Types

Support at least these message drafts:

### New request received

Use when order status is `new`.

Message should say:
- thanks for the request
- Hababy is reviewing availability/delivery details
- payment/deposit will be arranged before handover
- no confirmed booking language

### Confirmed request

Use when order status is `confirmed`.

Message should say:
- request is confirmed
- summarize product, dates, delivery zone/window
- mention total/deposit as estimate or amount to be arranged offline
- no online payment link

### Cancelled request

Use when order status is `cancelled`.

Message should say:
- request cannot be fulfilled
- polite apology
- offer to suggest alternatives manually

## Implementation Suggestions

Create helper if useful:

- `hababy-site/lib/whatsapp/message.ts`

Create component if useful:

- `hababy-site/components/admin/WhatsAppHandoff.tsx`

Edit:

- `hababy-site/components/admin/OrderDetailView.tsx`

The component should:

- generate a readable message from the order/customer data already available to the admin detail page
- show the message in a textarea or preview box
- include “Copy message” button
- include “Open WhatsApp” link/button if the customer phone can be normalized
- handle missing/invalid phone gracefully
- never expose customer data outside the admin guard

## Phone Handling

- Normalize basic phone values into a WhatsApp URL format if possible.
- Do not over-engineer phone validation.
- If phone cannot be safely normalized, show copy-only mode.
- Do not add OTP.
- Do not modify customer phone data in the database.

## Tests

Update or add safe Playwright tests if reasonable:

- Admin detail page still loads
- WhatsApp handoff section is visible to authenticated admin if env vars exist
- Do not send WhatsApp
- Do not click external WhatsApp link in tests
- Default e2e suite should remain safe and non-destructive

## Documentation

Update:

- `08-build-log.md` with Entry 038
- `11-change-log.md` because admin workflow changes
- `07-test-plan.md` if Playwright/admin checks are updated

## Checks

Run from `hababy-site/`:

- `npm run lint`
- `npm run build`
- `npm run test:e2e`

## Return Summary

Return:

- files changed
- what was built
- what message types are supported
- how phone/WhatsApp URL handling works
- what was intentionally not built
- Playwright changes, if any
- lint result
- build result
- e2e result
- human review checklist
- whether Claude review is recommended before commit
- suggested commit message