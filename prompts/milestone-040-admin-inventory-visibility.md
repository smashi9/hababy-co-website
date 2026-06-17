# Milestone 040 — Admin Inventory Visibility

## Goal

Add a read-only admin inventory visibility page so the owner can see stock and availability without using Supabase directly.

This milestone is visibility only.

## Scope

Create an admin-protected inventory page that shows:

* products
* inventory units
* item status
* cleaning status
* whether each item is usable for requests
* product-level usable stock counts

## Read First

* `AGENT_ROUTING.md`
* `01-product-requirements.md`
* `06-backend-plan.md`
* `07-test-plan.md`
* `08-build-log.md`
* `11-change-log.md`
* `hababy-site/supabase/sql/001_initial_schema.sql`
* `hababy-site/lib/supabase/adminQueries.ts`
* `hababy-site/app/admin/(protected)/layout.tsx`
* `hababy-site/app/admin/(protected)/orders/page.tsx`
* `hababy-site/components/admin/`
* `hababy-site/tests/e2e/`

## Business Rules

* This is read-only.
* Do not allow inventory editing.
* Do not reserve inventory.
* Do not change `current_order_id`.
* Do not change inventory status.
* Do not change cleaning status.
* Do not change product availability.
* Do not add admin product CRUD.
* Do not add SQL.
* Do not run SQL.

## Required Page

Create:

* `/admin/inventory`

It should be protected by the existing admin auth system.

## Data to Show

Show a product-level summary:

* product name
* product slug
* availability mode if useful
* usable stock count
* total inventory units
* unavailable/cleaning/maintenance counts if easy
* status summary such as:

  * Available to request
  * Currently unavailable
  * Needs cleaning
  * Maintenance

Also show an inventory-unit table or grouped list:

* product name
* brand/model if present
* item status
* cleaning status
* condition notes if present
* serial number if present
* source/notes if present
* whether usable for request

Usable means:

* `status = available`
* `cleaning_status = clean`
* `current_order_id is null`

## Admin Navigation

Update the admin shell/nav to include:

* Orders
* Inventory

Keep it simple.

## Security Requirements

* Must be behind existing Supabase Auth admin guard.
* Use the authenticated RLS Supabase client if inventory admin RLS supports it.
* Do not use service role unless absolutely necessary.
* If inventory cannot be read with the RLS user client because policies are missing, stop and report that Claude review / SQL policy decision is needed.
* Do not expose inventory data publicly.
* Do not log sensitive/internal data.

## Do Not Build

* no inventory editing
* no status changes
* no reservation logic
* no product CRUD
* no new SQL
* no SQL execution
* no `.env.local` edits
* no payment features
* no WhatsApp changes
* no commit
* no push

## Files Codex May Create/Edit

Likely create:

* `hababy-site/app/admin/(protected)/inventory/page.tsx`
* `hababy-site/components/admin/InventorySummary.tsx`
* `hababy-site/components/admin/InventoryTable.tsx`

Likely edit:

* `hababy-site/lib/supabase/adminQueries.ts`
* `hababy-site/components/admin/AdminShell.tsx` or equivalent nav component
* `hababy-site/types/order.ts` or create `hababy-site/types/inventory.ts`
* `07-test-plan.md`
* `08-build-log.md`
* `11-change-log.md`

## Playwright Tests

Add safe non-mutating tests if practical:

* authenticated admin can navigate to `/admin/inventory`
* inventory page loads
* inventory page shows an empty state or inventory rows
* logged-out user cannot access `/admin/inventory`

Do not add any mutating inventory tests.

If authenticated admin env vars are missing, authenticated tests should skip gracefully.

## Documentation

Update:

* `08-build-log.md` with Entry 040
* `11-change-log.md` because admin capability changes
* `07-test-plan.md` if tests are added/updated

## Checks

Run from `hababy-site/`:

* `npm run lint`
* `npm run build`
* `npm run test:e2e`

## Return Summary

Return:

* files changed
* what was built
* how inventory is read
* whether RLS user client or service role is used
* what inventory data is displayed
* what was intentionally not built
* Playwright changes
* lint result
* build result
* e2e result
* human review checklist
* whether Claude review is recommended before commit
* suggested commit message
