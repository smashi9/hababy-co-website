# Project 001 — Change Log

This file records important changes to project scope, requirements, design direction, technical architecture, business rules, and launch decisions.

The build log records the day-to-day process.

The change log records major decisions that affect the project direction.

## Change 001 — Initial Workflow Structure

**Date:** 10 June 2026

**Change type:** Project setup

**Summary:** Created the markdown-based workflow structure for Project 001.

**Reason:** The project needs a clear way to separate business brief, product requirements, UI direction, architecture, backend planning, testing, deployment, and case-study documentation.

**Files affected:**

- `00-project-brief.md`
- `01-product-requirements.md`
- `08-build-log.md`
- `11-change-log.md`

**Decision:** Use focused markdown files rather than one giant developer handover document.

**Status:** Accepted

## Change 002 — Next.js App Created in Subfolder

**Date:** 10 June 2026

**Change type:** Architecture / repo setup

**Summary:** The actual Next.js application was created inside `hababy-site/` instead of directly inside `project-001-first-website/`.

**Reason:** The main project folder already contains workflow documents, source materials, brand assets, and planning files. Creating the app inside a subfolder keeps the codebase separate from the documentation and avoids confusion.

**Files affected:**

* `02-repo-context.md`
* `03-architecture-plan.md`
* `09-deployment-notes.md`
* `11-change-log.md`
* `08-build-log.md`

**Decision:** Use the following folder as the actual Next.js app folder:

```text
02-projects/project-001-first-website/hababy-site/
```

**Setup choices made:**

* TypeScript: Yes
* ESLint: Yes
* React Compiler: No
* App-level `AGENTS.md`: Yes
* Next.js starter app created successfully
* Local development server tested successfully

**Status:** Accepted

## Change 003 — Public Catalogue Foundation Added

**Date:** 12 June 2026

**Change type:** Product surface / customer journey

**Summary:** Added the first public product catalogue and product detail foundation.

**Reason:** Hababy & Co needs customers to browse rental gear before the future request-to-book flow is built. This milestone introduces real catalogue routes without creating booking, admin, or online payment functionality.

**Files affected:**

* `hababy-site/app/products/page.tsx`
* `hababy-site/app/products/[slug]/page.tsx`
* `hababy-site/components/catalogue/`
* `hababy-site/lib/supabase/queries.ts`
* `hababy-site/components/layout/SiteHeader.tsx`
* `hababy-site/components/layout/SiteFooter.tsx`
* `08-build-log.md`
* `11-change-log.md`

**Decision:** Use Supabase read queries for active product data, with development-safe fallback content if Supabase is unavailable. Keep all CTAs request-first and avoid booking creation until the dedicated booking-flow milestone.

**Status:** Accepted

## Change 004 — Catalogue Requests Now Require Usable Inventory

**Date:** 12 June 2026

**Change type:** Product behavior / customer journey

**Summary:** Product catalogue CTAs now depend on usable stock.

**Reason:** Customers should only be able to request products that have clean available stock. Owner confirmation remains a separate request-first/QC step after the availability check.

**Files affected:**

* `hababy-site/lib/supabase/queries.ts`
* `hababy-site/app/products/page.tsx`
* `hababy-site/components/catalogue/`
* `hababy-site/components/home/HomePage.tsx`
* `hababy-site/supabase/sql/003_seed_inventory.sql`
* `08-build-log.md`
* `11-change-log.md`

**Decision:** Treat a product as requestable only when at least one inventory row has `status = 'available'`, `cleaning_status = 'clean'`, and no `current_order_id`. Products with zero usable stock show `Currently unavailable`.

**Car seat decision:** Parents are responsible for selecting the appropriate car seat group from the listed age, weight, height, and specification guidance. Hababy & Co confirms stock, item condition, cleanliness, requested dates, and delivery feasibility, not child suitability.

**Status:** Accepted

## Change 005 — Planning Docs Aligned With Inventory-Aware Catalogue

**Date:** 12 June 2026

**Change type:** Requirements / backend plan / test plan

**Summary:** Updated planning documents so the availability-aware catalogue is now an explicit Version 1 rule.

**Reason:** Earlier planning language said catalogue availability should remain request-first and should not depend on live stock. The product owner changed that decision: products with usable stock may be requested, and products with zero usable stock must show `Currently unavailable`.

**Files affected:**

* `01-product-requirements.md`
* `06-backend-plan.md`
* `07-test-plan.md`
* `08-build-log.md`
* `11-change-log.md`

**Decision:** The catalogue now has two gates:

```text
Availability check:
  status = available
  cleaning_status = clean
  current_order_id is null

Owner confirmation/QC gate:
  Hababy confirms condition, cleanliness, requested dates, delivery feasibility,
  payment/deposit, and handover details before approval.
```

**Car seat clarification:** Car seat size/weight groups should be separate requestable products where possible. Parents choose the appropriate group from listed specifications. Hababy does not confirm child suitability.

**Status:** Accepted

## Change 006 — Request Flow Foundation Added

**Date:** 16 June 2026

**Change type:** Product behavior / customer journey

**Summary:** Added the first public request flow foundation at `/request`.

**Reason:** Customers need a clear way to request available products after browsing the catalogue and product detail pages, while preserving the request-first pilot model.

**Files affected:**

* `hababy-site/app/request/page.tsx`
* `hababy-site/components/request/RequestForm.tsx`
* `hababy-site/components/catalogue/ProductCard.tsx`
* `hababy-site/components/catalogue/ProductDetail.tsx`
* `hababy-site/components/home/HomePage.tsx`
* `hababy-site/components/layout/SiteHeader.tsx`
* `hababy-site/components/layout/SiteFooter.tsx`
* `08-build-log.md`
* `11-change-log.md`

**Decision:** Product request CTAs now route to `/request?product=<slug>` only when the product has usable inventory. Unavailable products remain blocked and do not allow request submission.

**Same-day decision:** Same-day requests and requests less than 24 hours away are blocked in the UI during the pilot.

**Persistence decision:** This milestone is UI-only. Requests are not saved to Supabase yet. Validated order saving should be handled in a later backend milestone after schema, validation, security, and RLS review.

**Payment decision:** The request flow records only an offline payment preference. It does not include online payment, checkout, Stripe, PayPal, card logos, or payment gateway UI.

**Status:** Accepted

## Change 007 — Booking Requests Now Save to Supabase

**Date:** 16 June 2026

**Change type:** Product behavior / backend behavior / customer journey

**Summary:** The `/request` flow now saves validated customer booking requests to Supabase.

**Reason:** The request flow needs to become a real pilot workflow, not just a UI foundation. Customers can now submit structured requests that create customer/order records for Hababy & Co review.

**Files affected:**

* `hababy-site/app/request/actions.ts`
* `hababy-site/components/request/RequestForm.tsx`
* `hababy-site/lib/pricing/estimate.ts`
* `hababy-site/lib/supabase/orders.ts`
* `hababy-site/lib/validation/requestSchema.ts`
* `hababy-site/package.json`
* `hababy-site/package-lock.json`
* `08-build-log.md`
* `11-change-log.md`

**Decision:** Use a server action with server-side Zod validation and the service-role/admin Supabase client to create or update the customer record and insert a new order.

**Customer data decision:** Existing customers are matched by exact phone using the earliest created matching row. Existing email and notes are preserved when a new submission leaves those fields blank.

**Availability decision:** Availability is rechecked server-side before saving. A product must exist, be active, not be hidden, and have at least one usable inventory row where `status = available`, `cleaning_status = clean`, and `current_order_id is null`.

**Same-day decision:** The 24-hour request block is enforced server-side as well as in the UI.

**Order decision:** New saved requests use status `new`. The selected product is saved as a JSON snapshot. Delivery fee and urgent fee are `0` for now. Currency is `MAD`.

**Inventory decision:** Saving a request does not reserve inventory, does not update `current_order_id`, and does not change inventory status.

**Payment decision:** The flow records only offline payment preference. It does not include online payment, checkout, Stripe, PayPal, card logos, or payment gateway UI.

**Status:** Accepted

## Change 008 — Protected Admin Order Review Added

**Date:** 17 June 2026

**Change type:** Admin behavior / security / operational workflow

**Summary:** Added a real Supabase Auth protected admin surface for read-only review of saved customer requests.

**Reason:** Hababy & Co needs a non-SQL way for the owner to review incoming request records created by the public `/request` flow, while keeping customer PII behind authentication and admin authorization.

**Files affected:**

* `hababy-site/middleware.ts`
* `hababy-site/app/admin/`
* `hababy-site/components/admin/`
* `hababy-site/lib/supabase/authConfig.ts`
* `hababy-site/lib/supabase/serverAuth.ts`
* `hababy-site/lib/supabase/middlewareAuth.ts`
* `hababy-site/lib/supabase/adminQueries.ts`
* `hababy-site/types/order.ts`
* `hababy-site/types/customer.ts`
* `hababy-site/.env.example`
* `hababy-site/package.json`
* `hababy-site/package-lock.json`
* `02-repo-context.md`
* `08-build-log.md`
* `11-change-log.md`

**Decision:** Use real Supabase Auth plus the existing `admin_users` / `is_admin()` infrastructure. `ADMIN_ALLOWED_EMAILS` is optional extra protection only; it is not the primary admin check.

**Read decision:** Admin order/customer reads use the authenticated Supabase user session so Row Level Security remains the enforcement layer. The new admin review pages do not use the service-role key.

**Scope decision:** This milestone is read-only. It does not add status changes, inventory reservation, WhatsApp handoff, product/settings CRUD, payment UI, schema changes, or SQL.

**Status:** Accepted

## Change 009 — Admin Can Confirm or Cancel New Requests

**Date:** 17 June 2026

**Change type:** Admin behavior / order lifecycle

**Summary:** Added admin-only status actions on order detail pages for moving a new request to either confirmed or cancelled.

**Reason:** The owner needs the first safe lifecycle action after reviewing a saved request, while preserving the request-first pilot model and avoiding inventory automation.

**Files affected:**

* `hababy-site/app/admin/(protected)/orders/actions.ts`
* `hababy-site/components/admin/OrderDetailView.tsx`
* `hababy-site/components/admin/OrderStatusActions.tsx`
* `hababy-site/lib/supabase/adminQueries.ts`
* `hababy-site/lib/validation/orderStatusSchema.ts`
* `07-test-plan.md`
* `08-build-log.md`
* `11-change-log.md`

**Decision:** Only `new -> confirmed` and `new -> cancelled` are allowed in this milestone. The update path re-verifies admin access and uses the authenticated RLS Supabase client.

**Stale-order decision:** Status updates are guarded by both order id and `status = new`. If an order is no longer new, the admin receives a friendly failure message and no update occurs.

**Scope decision:** This milestone does not add `reviewing`, does not reserve inventory, does not update `inventory.current_order_id`, does not add WhatsApp handoff, and does not add payment or checkout UI.

**Status:** Accepted
