# Milestone 044 — Admin Order Internal Notes

## Goal

Allow the admin to add/edit private internal notes on an existing order.

These notes are admin-only and must never appear on public pages, customer messages, WhatsApp handoff, or any customer-facing surface.

## Claude Review Summary

Claude reviewed and approved this milestone.

Key guardrails:

* Edit only `orders.internal_notes`.
* Use `orders.id` as the primary key.
* Use authenticated RLS Supabase client through `requireVerifiedAdminSession()`.
* Do not use service role.
* Do not run SQL.
* Do not change schema.
* Do not edit order status.
* Do not edit payment notes.
* Do not touch inventory.
* Do not touch `current_order_id`.
* Do not add reservation logic.
* Do not add payment logic.
* Do not add WhatsApp API or automated messages.
* Do not include internal notes in WhatsApp handoff.
* Internal notes should be editable for all order statuses, including confirmed/cancelled.
* Do not copy the status-update `.eq("status", "new")` guard.

## Read First

* `AGENT_ROUTING.md`
* `01-product-requirements.md`
* `06-backend-plan.md`
* `07-test-plan.md`
* `08-build-log.md`
* `11-change-log.md`
* `hababy-site/supabase/sql/001_initial_schema.sql`
* `hababy-site/lib/supabase/serverAuth.ts`
* `hababy-site/lib/supabase/adminQueries.ts`
* `hababy-site/app/admin/(protected)/orders/page.tsx`
* `hababy-site/app/admin/(protected)/orders/[id]/page.tsx`
* `hababy-site/app/admin/(protected)/orders/actions.ts`
* `hababy-site/components/admin/OrderDetailView.tsx`
* `hababy-site/components/admin/WhatsAppHandoff.tsx`
* `hababy-site/lib/whatsapp/message.ts`
* `hababy-site/tests/e2e/`

## Editable Field

Allow editing only:

* `internal_notes`

## Read-Only Fields

Do not allow editing:

* `status`
* `payment_notes`
* `customer.notes`
* `selected_products`
* `total_due_mad`
* `deposit_mad`
* `rental_start_date`
* `rental_end_date`
* `delivery_type`
* `delivery_zone`
* `delivery_address`
* `payment_method`
* `currency`
* `whatsapp_message`
* `whatsapp_link`
* `created_at`
* `updated_at`
* any customer fields
* any inventory fields
* any product fields

## Required Architecture

Create:

* `hababy-site/lib/validation/orderInternalNotesSchema.ts`
* `hababy-site/components/admin/OrderInternalNotesForm.tsx`

Edit:

* `hababy-site/lib/supabase/adminQueries.ts`
* `hababy-site/app/admin/(protected)/orders/actions.ts`
* `hababy-site/components/admin/OrderDetailView.tsx`
* `hababy-site/tests/e2e/admin-access.spec.ts`
* `07-test-plan.md`
* `08-build-log.md`
* `11-change-log.md`

## Validation

Use Zod with `.strict()`.

Validate:

* `orderId` is a UUID.
* `internal_notes` is optional.
* Trim `internal_notes`.
* Store blank notes as `null`.
* Bound max length. Use a sensible limit such as 3000 or 5000 characters.
* Reject unknown fields.

## Mutation Requirements

Add a helper in `adminQueries.ts`, such as:

* `updateAdminOrderInternalNotes(input)`

The helper must:

* call `requireVerifiedAdminSession()` inside the mutation path
* use the authenticated RLS Supabase client
* never use service role
* update only `internal_notes`
* key on `orders.id`
* not filter by order status
* allow updates for all statuses
* use `.select("id").maybeSingle()`
* return a friendly failure if no row updates
* not manually change status
* not manually change payment fields
* not touch inventory
* not touch `current_order_id`
* not add reservation logic

## Server Action

Add an action in:

* `hababy-site/app/admin/(protected)/orders/actions.ts`

The action should:

* use the existing server action pattern
* safeParse form data
* call `updateAdminOrderInternalNotes`
* return typed state with status/message/fieldErrors
* revalidate:

  * `/admin/orders`
  * `/admin/orders/[orderId]`

No public revalidation is required.

## Admin UI

In `OrderDetailView.tsx`:

* Replace the read-only internal notes display with the editable form.
* Always render the internal notes form, even if there are no notes yet.
* Keep customer notes read-only.
* Keep payment notes read-only.
* Clearly label the field as private/admin-only.
* Include helper copy that says notes are not sent to the customer and are not included in WhatsApp handoff.

## WhatsApp / Customer Safety

Do not edit:

* `hababy-site/lib/whatsapp/message.ts`
* `createWhatsAppHandoffDraft`

Internal notes must not appear in:

* WhatsApp handoff
* customer messages
* public pages
* request confirmation copy
* emails/notifications

## Playwright Tests

Add or update safe non-mutating tests:

* Authenticated admin order detail page shows internal notes textarea.
* Authenticated admin order detail page shows save button/control.
* Logged-out admin order detail protection should remain covered.

Do not submit the form in default e2e tests.

Optional gated mutation test may be added only if skipped by default behind:

* `E2E_ADMIN_EMAIL`
* `E2E_ADMIN_PASSWORD`
* `E2E_ALLOW_MUTATING_TESTS=true`
* `E2E_ORDER_ID`

If added, it should:

* update internal notes
* reload
* assert persistence

But if it adds complexity, skip mutation tests for now.

Default `npm run test:e2e` must remain safe.

## Do Not Do

* Do not use service role.
* Do not run SQL.
* Do not edit Supabase SQL files.
* Do not change schema.
* Do not touch `.env.local`.
* Do not edit order status.
* Do not add status guards.
* Do not restrict notes to `new` orders only.
* Do not edit payment_notes.
* Do not edit money fields.
* Do not touch inventory.
* Do not touch `current_order_id`.
* Do not add reservation logic.
* Do not modify WhatsApp handoff.
* Do not add internal notes to customer-facing messages.
* Do not add email/notification logic.
* Do not add payment logic.
* Do not commit.
* Do not push.

## Documentation

Update:

* `08-build-log.md` with Entry 044.
* `11-change-log.md` because admin order behavior changes.
* `07-test-plan.md` if Playwright tests are added/updated.

## Checks

Run from `hababy-site/`:

* `npm run lint`
* `npm run build`
* `npm run test:e2e`

## Return Summary

Return:

* files changed
* what was implemented
* editable field
* read-only fields
* how admin is re-verified
* whether service role is avoided
* how validation works
* whether notes work for all statuses
* whether WhatsApp handoff remains unchanged
* what was intentionally not built
* Playwright changes
* lint result
* build result
* e2e result
* human review checklist
* whether Claude review is recommended before commit
* suggested commit message
