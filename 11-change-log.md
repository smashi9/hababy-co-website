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
