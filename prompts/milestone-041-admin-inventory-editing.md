# Milestone 041 — Admin Inventory Editing Foundation

## Goal

Allow the admin to edit the operational state of existing inventory items.

This milestone is admin-only and limited to existing inventory units.

## Source Review

Claude reviewed the plan and approved implementation with these guardrails:

* Inventory primary key is `item_id`, not `id`.
* Re-verify admin inside the mutation action/helper.
* Use the authenticated RLS Supabase client, not the service-role client.
* Do not touch `current_order_id`.
* Block editing atomically when `current_order_id` is not null.
* No inventory reservation.
* No product CRUD.
* No creating inventory units.
* No deleting inventory units.
* No SQL changes.
* No SQL execution.

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
* `hababy-site/app/admin/(protected)/inventory/page.tsx`
* `hababy-site/components/admin/InventorySummary.tsx`
* `hababy-site/components/admin/InventoryTable.tsx`
* `hababy-site/types/inventory.ts`
* `hababy-site/tests/e2e/`

## Editable Fields

Allow editing only:

* `status`
* `cleaning_status`
* `condition`
* `notes`
* `source`

## Read-Only Fields

Do not allow editing:

* `item_id`
* `product_id`
* `brand`
* `model`
* `serial_number`
* `purchase_date`
* `current_order_id`
* `created_at`
* `updated_at`

## Valid Inventory Status Values

Use exactly:

* `available`
* `reserved`
* `out`
* `cleaning`
* `maintenance`
* `retired`

## Valid Cleaning Status Values

Use exactly:

* `clean`
* `needs_cleaning`
* `inspection_needed`
* `maintenance_needed`

## Required Architecture

Create:

* `hababy-site/lib/validation/inventoryUpdateSchema.ts`
* `hababy-site/app/admin/(protected)/inventory/actions.ts`
* `hababy-site/app/admin/(protected)/inventory/[itemId]/page.tsx`
* `hababy-site/components/admin/InventoryEditForm.tsx`

Edit:

* `hababy-site/lib/supabase/adminQueries.ts`
* `hababy-site/components/admin/InventoryTable.tsx`
* `hababy-site/types/inventory.ts` if useful
* `07-test-plan.md`
* `08-build-log.md`
* `11-change-log.md`

## Validation

Use Zod to validate:

* `itemId` is a UUID.
* `status` is one of the six valid inventory status enum values.
* `cleaning_status` is one of the four valid cleaning status enum values.
* `condition`, `notes`, and `source` are optional, trimmed, nullable, and length-bounded.

Reject unknown values.

## Mutation Requirements

Add a helper in `adminQueries.ts`, such as:

* `getAdminInventoryItemById(itemId)`
* `updateAdminInventoryItem(input)`

The update helper must:

* Call `requireVerifiedAdminSession()` inside the mutation path.
* Use the authenticated RLS Supabase client returned by that admin session.
* Never use the service-role client.
* Key on `item_id`, not `id`.
* Atomically block linked items using:

  * `.eq("item_id", itemId)`
  * `.is("current_order_id", null)`
* Update only:

  * `status`
  * `cleaning_status`
  * `condition`
  * `notes`
  * `source`
* Return a friendly failure if no row updates because the item is missing or linked to an order.
* Return only minimal result data.
* Do not manually set `updated_at`; the existing trigger handles it.

## Admin UI

Add a dedicated edit route:

* `/admin/inventory/[itemId]`

The page should:

* Be protected by the existing admin layout.
* Show the product/item context.
* Show read-only identity fields.
* Show edit controls for status, cleaning status, condition, notes, and source.
* Clearly warn that making an item `available` + `clean` can make the product publicly available to request.
* Show a read-only note if the item is linked to an order and should not be edited.
* Include a way back to `/admin/inventory`.

Update the inventory table:

* Add an `Edit` link per editable inventory row.
* If `current_order_id` is not null, show a linked/read-only note instead of the edit affordance.

## Do Not Do

* Do not use the service-role client.
* Do not write `current_order_id`.
* Do not reserve inventory.
* Do not create inventory units.
* Do not delete inventory units.
* Do not edit product data.
* Do not edit `brand`, `model`, `serial_number`, `purchase_date`, or `product_id`.
* Do not add public RLS policies.
* Do not edit Supabase SQL files.
* Do not run SQL.
* Do not touch `.env.local`.
* Do not add WhatsApp changes.
* Do not add payment/checkout UI.
* Do not commit.
* Do not push.

## Playwright Tests

Keep the default suite safe.

Add or update non-mutating tests if practical:

* Authenticated admin can open `/admin/inventory`.
* Inventory page shows edit links.
* An inventory edit page loads.
* The form is visible.

Do not add inventory-mutating tests to the default e2e suite.

Any test that actually changes inventory must be skipped by default or gated for a disposable/test Supabase project.

## Documentation

Update:

* `08-build-log.md` with Entry 041.
* `11-change-log.md` because admin operational behavior changes.
* `07-test-plan.md` if Playwright/admin inventory checks are updated.

## Checks

Run from `hababy-site/`:

* `npm run lint`
* `npm run build`
* `npm run test:e2e`

## Return Summary

Return:

* files changed
* what was implemented
* editable fields
* read-only fields
* how admin is re-verified
* whether service role is avoided
* how linked/current_order_id items are blocked
* what was intentionally not built
* Playwright changes
* lint result
* build result
* e2e result
* human review checklist
* whether Claude review is recommended before commit
* suggested commit message
