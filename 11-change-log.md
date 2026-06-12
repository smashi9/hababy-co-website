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
