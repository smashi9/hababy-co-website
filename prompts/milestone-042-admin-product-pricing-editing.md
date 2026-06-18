# Milestone 042 — Admin Product/Pricing Editing Foundation

## Goal

Allow the admin to edit existing product catalogue copy and pricing without using Supabase directly.

This milestone is limited to existing products.

## Claude Review Summary

Claude reviewed and approved this milestone with strict scope discipline.

Key guardrails:

* Use product `id` as the primary key.
* Use authenticated RLS Supabase client through `requireVerifiedAdminSession()`.
* Do not use service role.
* Do not run SQL.
* Do not change schema.
* Do not edit `active`.
* Do not edit `availability_mode`.
* Do not edit `slug`.
* Do not edit `category_id`.
* Do not edit image/gallery/json/array fields.
* Do not create products.
* Do not delete products.
* Do not add product visibility controls yet.

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
* `hababy-site/lib/validation/inventoryUpdateSchema.ts`
* `hababy-site/app/admin/(protected)/inventory/actions.ts`
* `hababy-site/app/admin/(protected)/inventory/[itemId]/page.tsx`
* `hababy-site/components/admin/InventoryEditForm.tsx`
* `hababy-site/components/admin/AdminShell.tsx`
* `hababy-site/tests/e2e/admin-inventory-mutation.spec.ts`
* `hababy-site/tests/e2e/admin-access.spec.ts`

## Editable Fields

Allow editing only these fields:

* `name`
* `description`
* `safety_notes`
* `cleaning_notes`
* `age_guidance`
* `weight_guidance`
* `height_guidance`
* `daily_price_mad`
* `weekly_price_mad`
* `monthly_price_mad`
* `deposit_mad`
* `featured`
* `display_order`

## Read-Only Fields

Do not allow editing:

* `id`
* `slug`
* `category_id`
* `image_gallery`
* `included_items`
* `optional_accessories`
* `requires_child_details`
* `model_image_note`
* `active`
* `availability_mode`
* `created_at`
* `updated_at`

## Important Public Consequence

Editing product copy and pricing is immediately customer-visible after revalidation.

That is intended.

But do not add visibility controls yet.

Do not edit:

* `active`
* `availability_mode`

Those fields can change the customer journey and should be handled in a later owner-approved milestone.

## Required Architecture

Mirror the inventory editing pattern.

Create:

* `hababy-site/lib/validation/productUpdateSchema.ts`
* `hababy-site/app/admin/(protected)/products/actions.ts`
* `hababy-site/app/admin/(protected)/products/page.tsx`
* `hababy-site/app/admin/(protected)/products/[productId]/page.tsx`
* `hababy-site/components/admin/ProductEditForm.tsx`

Possibly create:

* `hababy-site/components/admin/ProductTable.tsx`
* `hababy-site/types/product.ts`

Edit:

* `hababy-site/lib/supabase/adminQueries.ts`
* `hababy-site/components/admin/AdminShell.tsx` or wherever admin nav lives
* `hababy-site/.env.example` only if adding gated test placeholders
* `07-test-plan.md`
* `08-build-log.md`
* `11-change-log.md`

## Query / Mutation Requirements

Add helpers in `adminQueries.ts`, such as:

* `getAdminProducts()`
* `getAdminProductById(id)`
* `updateAdminProduct(input)`

The update helper must:

* call `requireVerifiedAdminSession()` inside the mutation path
* use the authenticated RLS Supabase client returned by that admin session
* never use the service-role client
* key on `products.id`
* update only the whitelisted editable fields
* use `.select("id").maybeSingle()`
* treat no returned row as a friendly failure
* not manually set `updated_at`; the trigger handles it

## Validation

Use Zod.

Validate:

* `id` is a UUID
* `name` is required, trimmed, non-empty, and length-bounded
* product text fields are optional, trimmed, nullable, and length-bounded
* price/deposit fields are whole-number MAD integers
* price/deposit fields are non-negative
* price/deposit fields have a sane upper bound
* `featured` is boolean
* `display_order` is integer

Reject unknown values.

Do not validate or accept `active` or `availability_mode` in this milestone.

## Admin UI

Create:

* `/admin/products`
* `/admin/products/[productId]`

The products list should show:

* product name
* slug
* current daily/weekly/monthly price
* deposit
* featured status
* display order
* edit link

The edit page should show read-only identity/context fields:

* id
* slug
* category if available
* active status as read-only
* availability_mode as read-only

The edit form should allow editing only the approved fields.

Add clear copy:

* product copy and pricing changes are public after saving
* visibility controls are intentionally not editable in this milestone

## Revalidation

After successful product update, revalidate:

* `/products`
* `/products/[slug]`
* `/request`
* `/admin/products`
* `/admin/products/[productId]`

Use the actual product slug where needed.

## Playwright Tests

Add safe non-mutating tests:

* logged-out user cannot access `/admin/products`
* logged-out user cannot access `/admin/products/[productId]` if practical
* authenticated admin can open `/admin/products`
* authenticated admin can open one product edit page
* product edit form is visible

Add a gated mutating Playwright test only if practical, mirroring the inventory notes test.

If added, it must require:

* `E2E_ADMIN_EMAIL`
* `E2E_ADMIN_PASSWORD`
* `E2E_ALLOW_MUTATING_TESTS=true`
* `E2E_PRODUCT_ID`

The gated test should mutate a low-risk copy field only, preferably `description` or `cleaning_notes`.

Do not mutate price, active, availability_mode, slug, category, image fields, or product identity by default.

Default `npm run test:e2e` must remain safe.

## Do Not Do

* Do not use service role.
* Do not edit `.env.local`.
* Do not run SQL.
* Do not edit Supabase SQL files.
* Do not change schema.
* Do not add internal_notes to products.
* Do not create products.
* Do not delete products.
* Do not add product visibility controls.
* Do not edit `active`.
* Do not edit `availability_mode`.
* Do not edit `slug`.
* Do not edit `category_id`.
* Do not edit `image_gallery`.
* Do not edit `included_items`.
* Do not edit `optional_accessories`.
* Do not add category CRUD.
* Do not add image upload.
* Do not add checkout/payment logic.
* Do not add reservation logic.
* Do not commit.
* Do not push.

## Documentation

Update:

* `08-build-log.md` with Entry 042.
* `11-change-log.md` because admin product/pricing editing changes owner capabilities.
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
* editable fields
* read-only fields
* how admin is re-verified
* whether service role is avoided
* how product updates are validated
* public catalogue consequences
* what was intentionally not built
* Playwright changes
* lint result
* build result
* e2e result
* human review checklist
* whether Claude review is recommended before commit
* suggested commit message
