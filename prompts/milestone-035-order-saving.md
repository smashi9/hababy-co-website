# Milestone 035 — Validated Supabase Order Saving

## Goal

Turn the existing `/request` UI into a real saved request flow using Supabase, while preserving request-first behaviour.

## Source Review

Claude reviewed the architecture and approved implementation with guardrails. Follow the plan in the Claude review for validated Supabase order saving.

## Read First

- `AGENT_ROUTING.md`
- `00-project-brief.md`
- `01-product-requirements.md`
- `02-repo-context.md`
- `03-architecture-plan.md`
- `06-backend-plan.md`
- `07-test-plan.md`
- `08-build-log.md`
- `11-change-log.md`
- `hababy-site/supabase/sql/001_initial_schema.sql`
- `hababy-site/lib/supabase/queries.ts`
- `hababy-site/lib/supabase/admin.ts`
- `hababy-site/app/request/page.tsx`
- `hababy-site/components/request/RequestForm.tsx`
- `node_modules/next/dist/docs/` if needed to verify server-action conventions

## Do Not Do

- Do not run SQL.
- Do not edit Supabase SQL files.
- Do not create `004` SQL.
- Do not touch `.env.local`.
- Do not add public RLS insert policies.
- Do not commit.
- Do not push.
- Do not add admin pages.
- Do not add WhatsApp integration yet.
- Do not add online payment, Stripe, PayPal, checkout, card logos, “Pay now,” or “Book now.”

## Business Rules

- Available products can be requested.
- Currently unavailable products cannot be requested.
- A submitted request is not a confirmed booking.
- New order status should be `new`.
- Payment method is only a preference.
- Hababy confirms availability, delivery, payment/deposit, and handover before approval.
- For car seats, parents choose the appropriate group based on listed specs. Hababy does not confirm child suitability.
- Same-day / less than 24h requests are blocked during the pilot.
- Service role key must never reach the browser.

## Implementation

1. Make `RequestForm` capture all fields:
   - selected product slug
   - rental start date
   - rental end date
   - delivery type
   - delivery zone
   - delivery window
   - pickup window
   - customer name
   - phone
   - optional email
   - preferred language
   - payment preference
   - notes

2. Add server-side validation using Zod:
   - product slug required
   - product exists, active, not hidden, and has usable stock
   - rental dates valid
   - rental end >= rental start
   - start must be at least 24h ahead
   - delivery type maps to existing enum values
   - delivery zone is allowed
   - delivery/pickup windows are allowed
   - name required
   - phone required with basic sanity check
   - email optional but valid if present
   - preferred language maps to `en`/`fr`
   - payment method maps to offline methods only
   - reject card

3. Create server action:
   - `hababy-site/app/request/actions.ts`
   - `"use server"`
   - `submitBookingRequest(formData)` or equivalent
   - use service-role/admin client only server-side
   - never expose service role to client

4. Create helper files if useful:
   - `hababy-site/lib/validation/requestSchema.ts`
   - `hababy-site/lib/supabase/orders.ts`
   - optional `hababy-site/lib/pricing/estimate.ts`

5. Server action must:
   - parse and validate form
   - re-fetch product by slug
   - re-check usable stock server-side:
     - `status = available`
     - `cleaning_status = clean`
     - `current_order_id is null`
   - re-enforce 24h block server-side
   - recompute rental subtotal, deposit, total due in integer MAD
   - find existing customer by exact phone or create new customer
   - map customer notes to `customers.notes` for now
   - insert order with status default/new
   - insert selected product as JSON snapshot
   - set delivery_fee_mad and urgent_fee_mad to 0 for now
   - set currency to MAD
   - set payment_method to selected offline method
   - return minimal success result only
   - do not echo PII or internal columns

6. Do not reserve inventory:
   - do not set `current_order_id`
   - do not change inventory status
   - order remains `new`

7. Update `RequestForm`:
   - call server action
   - show pending state
   - show validation errors
   - show success message:
     “Thanks — we’ve received your request. Hababy & Co will confirm availability, delivery, payment/deposit, and handover before approval.”
   - remove copy saying requests are not saved to Supabase
   - keep estimate clearly labelled as estimate, not final total

8. Update:
   - `08-build-log.md` with Entry 035
   - `11-change-log.md`

9. Run:
   - `npm run lint`
   - `npm run build`

## Return

- files changed
- what was implemented
- whether requests now save to Supabase
- how customer lookup/creation works
- how order insert works
- how server-side availability is rechecked
- how 24h block is rechecked
- how estimate is recomputed
- what was intentionally not built
- lint result
- build result
- whether `/supabase-test` is preserved
- human review checklist
- whether Claude review is recommended before commit
- suggested commit message