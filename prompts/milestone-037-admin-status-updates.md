# Milestone 037 — Admin Order Status Updates

## Goal

Allow the admin to update an order from `new` to either `confirmed` or `cancelled`.

This is an admin-only mutation milestone. It must preserve the existing Supabase Auth + admin_users + RLS access model.

## Source Review

Claude reviewed the plan and approved implementation with these guardrails:

* Re-verify admin inside the server action.
* Use the authenticated RLS Supabase client, not the service-role client.
* Only allow `new → confirmed` and `new → cancelled`.
* Do not add `reviewing`.
* Do not add new enum values.
* Do not reserve inventory.
* Do not update `current_order_id`.
* Do not add WhatsApp handoff.
* Do not add payment/checkout UI.
* Do not run SQL.
* Do not edit Supabase SQL files.

## Read First

* `AGENT_ROUTING.md`
* `06-backend-plan.md`
* `07-test-plan.md`
* `08-build-log.md`
* `11-change-log.md`
* `hababy-site/supabase/sql/001_initial_schema.sql`
* `hababy-site/lib/supabase/serverAuth.ts`
* `hababy-site/lib/supabase/adminQueries.ts`
* `hababy-site/app/admin/layout.tsx`
* `hababy-site/app/admin/orders/page.tsx`
* `hababy-site/app/admin/orders/[id]/page.tsx`
* `hababy-site/components/admin/`
* `hababy-site/tests/e2e/`

## Business Rules

* Existing valid statuses include `new`, `confirmed`, `paid`, `delivered`, `returned`, `closed`, `cancelled`.
* For this milestone, only implement:

  * `new → confirmed`
  * `new → cancelled`
* Do not implement:

  * `reviewing`
  * `paid`
  * `delivered`
  * `returned`
  * `closed`
* If an order is not `new`, do not allow status changes in this milestone.
* Inventory is not reserved.
* WhatsApp handoff is out of scope.
* Payment remains offline/preference-only.

## Implementation Requirements

### 1. Server-side validation

Create if useful:

* `hababy-site/lib/validation/orderStatusSchema.ts`

Validate:

* `orderId` is a UUID.
* `targetStatus` is only `confirmed` or `cancelled`.

### 2. Admin mutation helper

Edit:

* `hababy-site/lib/supabase/adminQueries.ts`

Add a helper such as:

* `updateAdminOrderStatus(orderId, targetStatus)`

Requirements:

* Re-verify admin inside the mutation path.
* Use the authenticated RLS Supabase client from the verified admin session.
* Do not use the service-role client.
* Re-read or update only if the current order status is `new`.
* Use an atomic guard such as:

  * `.eq("id", orderId)`
  * `.eq("status", "new")`
* Return a friendly failure if no row updates because the order is no longer `new`.
* Return only minimal result data.
* Do not echo PII or raw database rows.

### 3. Server action

Create:

* `hababy-site/app/admin/(protected)/orders/actions.ts`

Implement a `"use server"` action, for example:

* `updateOrderStatus(prevState, formData)`

Requirements:

* Calls the validation schema.
* Calls the admin mutation helper.
* Revalidates:

  * `/admin/orders`
  * the relevant order detail page if possible
* Returns a small state object:

  * status/success/error
  * message

### 4. Admin UI

Create:

* `hababy-site/components/admin/OrderStatusActions.tsx`

Edit:

* `hababy-site/components/admin/OrderDetailView.tsx`

Requirements:

* Show `Confirm request` and `Cancel request` buttons only when `order.status === "new"`.
* For non-new orders, show read-only status badge only.
* Use a client component for the action buttons if needed.
* Show pending state.
* Show success/error message.
* Do not show status actions on list page unless already simple and safe. Detail page is enough.

## Playwright Tests

Default test suite must remain non-mutating.

Do not add status-mutation tests to the normal public smoke suite.

You may add or update non-mutating authenticated tests only if safe, for example:

* On a new order detail page, confirm/cancel controls are visible.
* On a non-new order detail page, controls are hidden.

Any test that actually changes order status must be:

* skipped by default, or
* gated behind explicit env vars, and
* clearly marked as mutating, and
* ideally only for disposable/test Supabase.

Do not create production-mutating tests that run by default.

## Do Not Do

* Do not run SQL.
* Do not edit Supabase SQL files.
* Do not touch `.env.local`.
* Do not use the service-role client for admin status updates.
* Do not add public RLS policies.
* Do not add `reviewing`.
* Do not add schema changes.
* Do not reserve inventory.
* Do not update inventory rows.
* Do not add WhatsApp.
* Do not add payment/checkout UI.
* Do not commit.
* Do not push.

## Documentation

Update:

* `08-build-log.md` with Entry 037.
* `11-change-log.md` because admin order lifecycle behavior changes.
* `07-test-plan.md` if tests are added or updated.

## Checks

Run from `hababy-site/`:

* `npm run lint`
* `npm run build`
* `npm run test:e2e`

If authenticated/mutating tests are skipped, say so clearly.

## Return Summary

Return:

* files changed
* what was implemented
* allowed status transitions
* how admin is re-verified
* whether service role is avoided
* how stale/non-new orders are blocked
* what was intentionally not built
* Playwright changes, if any
* lint result
* build result
* e2e result
* human review checklist
* whether Claude review is recommended before commit
* suggested commit message
