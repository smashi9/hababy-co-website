# Milestone 036 — Admin Order Review Foundation

## Goal

Create a basic, read-only admin order review foundation so the owner can view incoming customer requests without using SQL.

This milestone introduces admin authentication and displays customer PII, so security is the priority.

## Source Review

Claude reviewed the plan and recommended:

- Use real Supabase Auth now.
- Reuse the existing `admin_users` / `is_admin()` infrastructure.
- Guard `/admin/*` with both middleware and server-side admin layout verification.
- Prefer RLS-enforced user-session reads for orders/customers instead of service-role reads.
- Keep this milestone read-only.
- Do not add status changes yet.
- Do not reserve inventory yet.
- Do not add WhatsApp handoff yet.
- Do not add schema changes.

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
- `hababy-site/lib/supabase/admin.ts`
- `hababy-site/lib/supabase/orders.ts`
- `hababy-site/app/request/actions.ts`
- `node_modules/next/dist/docs/` if needed to verify middleware, cookies, auth, and server action conventions for this Next.js version

## Human Decision

Use real Supabase Auth login now.

Do not use:
- obscure URL guard
- `NEXT_PUBLIC_` admin flags
- client-side-only guard
- temporary shared secret guard

## Build

Create a read-only admin surface:

1. `/admin/login`
   - email/password login using Supabase Auth
   - no public registration
   - clean request-first/admin-safe copy

2. `/admin`
   - redirect to `/admin/orders`

3. `/admin/orders`
   - read-only list of orders, newest first

4. `/admin/orders/[id]`
   - read-only order detail page

5. Admin layout/shell
   - basic navigation
   - sign out button
   - noindex metadata/robots protection for admin pages

## Security Requirements

1. Use Supabase Auth.
2. Verify both:
   - valid user session
   - user exists in `admin_users` / passes admin check
3. Enforce guard in:
   - `middleware.ts` for `/admin/*`
   - `app/admin/layout.tsx` before protected pages render
4. Prefer RLS-enforced user-session Supabase client for admin reads.
5. Use service role only if genuinely required and server-only.
6. Do not expose service role key to client code.
7. Do not add public RLS policies on orders/customers.
8. Do not log PII.
9. Do not make `/admin` indexable.
10. Do not display PII outside the auth gate.

## Data to Display

### Orders list

Show:

- short order reference
- created date/time
- status badge
- customer name
- customer phone
- selected product name(s)
- rental start/end
- delivery zone/type
- estimated total
- deposit
- payment preference

### Order detail

Show:

- everything from the list
- customer email
- preferred language
- selected products rendered defensively as a readable list/table
- estimate breakdown:
  - rental subtotal
  - deposit
  - total
- delivery window
- pickup window
- payment notes / internal notes if present

## Selected Products JSON

`selected_products` is a JSON snapshot.

Do not dump raw JSON.

Parse defensively and render readable fields:
- name
- slug if present
- quantity if present
- subtotal if present
- deposit if present

Handle missing keys gracefully.

## Do Not Build

- no status update buttons
- no order mutation actions
- no inventory reservation
- no `current_order_id` updates
- no WhatsApp handoff
- no product/settings CRUD
- no admin dashboard beyond order review
- no schema changes
- no new order status values
- no `reviewing` enum
- no SQL running
- no `.env.local` edits
- no commit
- no push

## Files Codex May Create/Edit

Likely create:

- `hababy-site/middleware.ts`
- `hababy-site/lib/supabase/serverAuth.ts`
- `hababy-site/lib/supabase/adminQueries.ts`
- `hababy-site/types/order.ts`
- `hababy-site/types/customer.ts`
- `hababy-site/app/admin/layout.tsx`
- `hababy-site/app/admin/page.tsx`
- `hababy-site/app/admin/login/page.tsx`
- `hababy-site/app/admin/orders/page.tsx`
- `hababy-site/app/admin/orders/[id]/page.tsx`
- `hababy-site/components/admin/`

Likely edit:

- `hababy-site/.env.example`
- `02-repo-context.md`
- `08-build-log.md`
- `11-change-log.md`
- `hababy-site/package.json`
- `hababy-site/package-lock.json`

If adding `@supabase/ssr`, update package files and repo context.

## Environment Variables

Add placeholder to `.env.example` only:

- `ADMIN_ALLOWED_EMAILS=admin@example.com`

Do not edit `.env.local`.

If implemented, `ADMIN_ALLOWED_EMAILS` should be optional belt-and-suspenders. The primary admin check must be Supabase Auth + `admin_users`.

## Documentation

Update:

- `08-build-log.md` with Entry 036
- `11-change-log.md` because this adds a new protected admin surface
- `02-repo-context.md` if dependencies or routes are added

## Checks

Run from `hababy-site/`:

- `npm run lint`
- `npm run build`

## Human Test Checklist to Return

Include:

- logged-out `/admin/orders` redirects to `/admin/login`
- logged-out `/admin/orders/[id]` redirects or blocks
- login works with bootstrapped admin user
- non-admin user is blocked if tested
- `/admin/orders` shows request list
- `/admin/orders/[id]` shows detail
- sign out works
- `/admin` is noindex
- `/supabase-test` still works

## Return Summary

Return:

- files changed
- dependencies added
- what was built
- how auth works
- how admin check works
- how orders/customers are read
- whether service role is used anywhere
- what was intentionally not built
- lint result
- build result
- human review checklist
- whether Claude review is recommended before commit
- suggested commit message