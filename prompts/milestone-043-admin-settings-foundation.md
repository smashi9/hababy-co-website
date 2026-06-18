# Milestone 043 — Admin Settings Foundation

## Goal

Create an admin-only settings page that lets the owner edit a small Tier A set of existing settings fields.

This milestone stores operational settings for future use. These values are not yet wired into the live public site, pricing, WhatsApp handoff, or request flow.

## Claude Review Summary

Claude reviewed and approved this milestone with strict scope discipline.

Key findings:

* The app does not currently read from the `settings` table anywhere.
* Editing these settings has no immediate public/request-flow effect today.
* The settings table is a singleton table with exactly one row.
* Codex must update the existing row only.
* Codex must never insert a second settings row.
* The admin page must clearly state that these values are stored but not yet live-wired.
* `settings` is intentionally non-public and must be read server-side through `requireVerifiedAdminSession()`.
* Use authenticated RLS Supabase client, not service role.
* No schema or RLS changes are required.

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
* `hababy-site/lib/contact/phone.ts`
* `hababy-site/app/admin/(protected)/products/actions.ts`
* `hababy-site/app/admin/(protected)/inventory/actions.ts`
* `hababy-site/components/admin/AdminShell.tsx`
* `hababy-site/tests/e2e/admin-access.spec.ts`

## Editable Fields

Allow editing only these Tier A fields:

* `whatsapp_number`
* `public_fx_note`
* `eur_rate`
* `usd_rate`

## Read-Only / Deferred Fields

Do not allow editing:

* `id`
* `base_currency`
* `payment_methods_enabled`
* `card_enabled`
* `same_day_enabled`
* `delivery_zones`
* `urgent_min_notice_hours`
* `urgent_fee_48_72`
* `urgent_fee_24_48`
* `minimum_order_value_mad`
* `discount_3_6_days_pct`
* `multiplier_14d`
* `multiplier_30d`
* `fx_rate_updated_at`
* `created_at`
* `updated_at`

## Public / Request-Flow Consequence

Important:

The app does not currently consume settings values.

Therefore, saving these settings should not be described as changing the live customer site.

The UI must clearly say:

* These values are stored for operational/future use.
* They do not yet change the live catalogue.
* They do not yet change request pricing.
* They do not yet change WhatsApp handoff.
* Payment/card/delivery/urgent fee controls are intentionally locked for later milestones.

## Required Architecture

Mirror the product/inventory edit pattern.

Create:

* `hababy-site/lib/validation/settingsUpdateSchema.ts`
* `hababy-site/app/admin/(protected)/settings/page.tsx`
* `hababy-site/app/admin/(protected)/settings/actions.ts`
* `hababy-site/components/admin/SettingsEditForm.tsx`
* `hababy-site/types/settings.ts`

Edit:

* `hababy-site/lib/supabase/adminQueries.ts`
* `hababy-site/components/admin/AdminShell.tsx`
* `hababy-site/tests/e2e/admin-access.spec.ts`
* `07-test-plan.md`
* `08-build-log.md`
* `11-change-log.md`

## Query / Mutation Requirements

Add helpers in `adminQueries.ts`, such as:

* `getAdminSettings()`
* `updateAdminSettings(input)`

Both helpers must:

* call `requireVerifiedAdminSession()`
* use the authenticated RLS Supabase client from that session
* never use service role

The update helper must:

* update the existing singleton row only
* key on `settings.id`
* never insert
* never upsert
* use `.select("id").maybeSingle()`
* treat no returned row as a friendly failure
* update only the whitelisted Tier A fields
* set or update `fx_rate_updated_at` server-side when `eur_rate` or `usd_rate` changes
* not manually edit `updated_at` unless existing project pattern requires it; the DB trigger handles it

## Validation

Use Zod with `.strict()`.

Validate:

* `id` is a UUID
* `whatsapp_number` is optional
* if `whatsapp_number` is present, normalize it using `normalizePhoneNumber` from `lib/contact/phone.ts`
* store WhatsApp number as normalized E.164
* invalid phone numbers should return a friendly validation error
* `public_fx_note` is optional, trimmed, nullable, and max 500 chars
* `eur_rate` is optional but if present must be a positive number with sane upper bound
* `usd_rate` is optional but if present must be a positive number with sane upper bound
* empty FX rate fields should be treated consistently and safely, not silently coerced to misleading values

Do not accept unknown fields.

## Admin UI

Create:

* `/admin/settings`

The page should:

* be protected by the existing admin layout
* load settings server-side
* show one settings form
* show read-only context values where useful
* include a clear warning/info banner:

  * settings are stored but not yet wired to the live customer flow
  * changing FX/WhatsApp here does not yet change customer pricing or WhatsApp handoff
  * card/payment/delivery/urgent fee controls are intentionally locked for later milestones

Add a Settings link to the admin nav.

## Do Not Do

* Do not use service role.
* Do not expose settings through a public route.
* Do not create a NEXT_PUBLIC settings endpoint.
* Do not read settings from a client component directly.
* Do not insert a settings row.
* Do not upsert a settings row.
* Do not create a second settings row.
* Do not run SQL.
* Do not edit Supabase SQL files.
* Do not change schema.
* Do not add columns.
* Do not edit `.env.local`.
* Do not enable `card_enabled`.
* Do not edit `payment_methods_enabled`.
* Do not add online payment, checkout, deposit automation, Stripe, PayPal, or card flow.
* Do not edit `delivery_zones`.
* Do not edit urgent fee fields.
* Do not edit same-day settings.
* Do not edit pricing multipliers or discounts.
* Do not add business open/closed switch.
* Do not add WhatsApp API or automated messaging.
* Do not change product, inventory, or order workflow logic.
* Do not commit.
* Do not push.

## Playwright Tests

Add safe non-mutating tests:

* logged-out user cannot access `/admin/settings`
* authenticated admin can open `/admin/settings`
* settings page shows the heading and key fields

Do not add a default-running mutating settings test.

Optional gated mutation test may be added only if skipped by default behind:

* `E2E_ADMIN_EMAIL`
* `E2E_ADMIN_PASSWORD`
* `E2E_ALLOW_MUTATING_TESTS=true`

But if this adds complexity, skip mutation tests for now.

Default `npm run test:e2e` must remain safe.

## Documentation

Update:

* `08-build-log.md` with Entry 043.
* `11-change-log.md` because admin capability changes.
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
* read-only/deferred fields
* how singleton settings row is handled
* how admin is re-verified
* whether service role is avoided
* how phone/FX validation works
* whether fx_rate_updated_at is auto-stamped
* what the UI says about settings not being live-wired yet
* what was intentionally not built
* Playwright changes
* lint result
* build result
* e2e result
* human review checklist
* whether Claude review is recommended before commit
* suggested commit message
