# Project 001 Build Log

## Entry 001 — Source Material and Project Brief Setup

**Date:** 10 June 2026

**Tool used:** ChatGPT

**Task attempted:** Start Project 001 and convert the original Hababy & Co developer handover into the first clean workflow document.

**What was done:**

* Created the main project folder structure.
* Created the workflow documentation files.
* Created `WORKFLOW_GUIDE.md`.
* Created and updated `AGENTS.md`.
* Confirmed that the workflow is stable but models are interchangeable.
* Created a `99-source-materials` folder.
* Moved the original Hababy & Co developer handover into `99-source-materials`.
* Created `00-project-brief.md`.

**Important decision:**

The original handover will not be used as one giant instruction file.

Instead, it will be split into focused workflow documents:

* `00-project-brief.md` for the big-picture project definition
* `01-product-requirements.md` for pages, features, and customer journeys
* `03-architecture-plan.md` for technical structure
* `04-ui-brief.md` for brand, visual direction, tone, and design system
* `06-backend-plan.md` for database, admin, settings, and logic
* `07-test-plan.md` for acceptance criteria and QA
* `10-linkedin-case-study.md` for the public story

**Lesson learned:**

A developer handover can contain too much information for one AI agent step. The workflow becomes clearer when the handover is decomposed into smaller markdown files, each with a specific purpose.

**Next action:**

Create `01-product-requirements.md`

## Entry 002 — Product Requirements Created

**Date:** 10 June 2026

**Tool used:** ChatGPT

**Task attempted:** Convert the Hababy & Co project brief and original developer handover into a clean product requirements document.

**What was done:**

* Created `01-product-requirements.md`.
* Defined the main customer journey.
* Defined the required pages.
* Defined the request-to-book flow.
* Defined the WhatsApp handoff requirements.
* Defined payment and currency requirements.
* Defined admin panel requirements.
* Defined Version 1 out-of-scope items.
* Added product acceptance criteria.
* Added open questions for later clarification.

**Important decision:**

The product requirements document focuses on what the website must do.

It does not include the detailed UI design system, technical architecture, or database schema. Those will be handled in separate workflow files.

**Lesson learned:**

A good product requirements document should be detailed enough for an AI planner or developer to understand the product, but not overloaded with visual design tokens or database implementation details.

## Entry 003 — UI Brief Created

**Date:** 10 June 2026

**Tool used:** ChatGPT

**Task attempted:** Convert the Hababy & Co brand identity and visual direction from the original handover into a clean UI brief.

**What was done:**

* Created `04-ui-brief.md`.
* Defined the brand feel and visual direction.
* Separated brand and UI guidance from product requirements.
* Added confirmed logo asset details.
* Added logo usage rules.
* Added colour palette and colour usage rules.
* Added typography rules.
* Added imagery, icon, pattern, and tone guidance.
* Added page-level UI direction.
* Added UI acceptance criteria.
* Added open UI questions.

**Important decision:**

The UI brief should guide visual design and implementation, but it should not contain backend logic, database schema, or detailed technical architecture.

The confirmed SVG logo files are:

* `hababy-logo-primary.svg`
* `hababy-logo-horizontal.svg`
* `hababy-stork-mark.svg`

These should be stored in:

```text
assets/brand/
```

**Lesson learned:**

A UI brief is different from a product requirements document. Product requirements explain what the website must do. A UI brief explains how the website should feel, look, and communicate.

**Next action:**

Create `03-architecture-plan.md`.

## Entry 004 — Architecture Plan Created

**Date:** 10 June 2026

**Tool used:** ChatGPT

**Task attempted:** Convert the product requirements and UI direction into a technical architecture plan.

**What was done:**

* Created `03-architecture-plan.md`.
* Confirmed the recommended stack: Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Supabase, Vercel, next-intl, react-hook-form, and zod.
* Defined the recommended application structure.
* Defined public routes, admin routes, component organization, and utility folders.
* Defined the approach for booking flow state, pricing logic, WhatsApp handoff, i18n, admin auth, brand assets, deployment, and environment variables.
* Clarified that the full database schema belongs in `06-backend-plan.md`.
* Clarified that the visual design system belongs in `04-ui-brief.md`.

**Important decision:**

The architecture should stay simple and pilot-friendly. The site should be built as a real full-stack app, but without over-engineering features like online payment, customer accounts, automated WhatsApp chatbot, or multi-city logic in Version 1.

**Lesson learned:**

An architecture plan is not the same as a backend plan. The architecture plan explains how the application is organized. The backend plan will explain the actual data model, database tables, settings, admin logic, and security rules.

**Next action:**

Create `06-backend-plan.md`.

## Entry 005 — Backend Plan Created

**Date:** 10 June 2026

**Tool used:** ChatGPT

**Task attempted:** Convert the Hababy & Co product requirements and architecture into a backend and Supabase planning document.

**What was done:**

* Created `06-backend-plan.md`.
* Defined the Supabase backend approach.
* Defined core database tables.
* Defined products, bundles, Welcome Kits, customers, orders, inventory, settings, and content models.
* Defined the order lifecycle and order statuses.
* Defined payment and currency logic.
* Defined pricing, deposit, urgent fee, and same-day logic.
* Defined WhatsApp handoff data requirements.
* Defined admin authentication and access rules.
* Defined basic Row Level Security principles.
* Defined seed data requirements.
* Defined backend acceptance criteria.
* Added open backend questions.

**Important decision:**

The backend should support the real business pilot, but should not over-automate the rental operation in Version 1.

The site will capture structured booking requests, but Hababy & Co will manually confirm availability, payment, and delivery.

**Lesson learned:**

A backend plan is where business rules become data structures. It translates the product idea into tables, fields, statuses, settings, validation, and admin controls.

**Next action:**

Create `07-test-plan.md`.

## Entry 006 — Test Plan Created

**Date:** 10 June 2026

**Tool used:** ChatGPT

**Task attempted:** Create a complete test plan for the Hababy & Co website before implementation.

**What was done:**

* Created `07-test-plan.md`.
* Defined testing levels and environments.
* Added customer-facing page tests.
* Added booking flow tests.
* Added same-day blocking tests.
* Added pricing and estimate tests.
* Added payment and currency tests.
* Added WhatsApp handoff tests.
* Added admin panel tests.
* Added backend and database tests.
* Added security tests.
* Added UI, mobile, language, accessibility, SEO, and deployment tests.
* Added non-coder testing scenarios.
* Added bug reporting format and launch blockers.
* Added final launch checklist.

**Important decision:**

The test plan should protect the business rules, not just check whether pages load.

The most important things to protect are:

* Request-first booking
* No same-day orders
* No online payment
* Order saving before WhatsApp handoff
* Admin control of pilot data
* Mobile usability
* Customer data protection

**Lesson learned:**

Testing is not only a developer task. A non-coder product owner can test the website using realistic customer scenarios and clear acceptance checklists.

**Next action:**

Create `09-deployment-notes.md`, knowing that some sections will remain incomplete until the actual app, GitHub repository, Supabase project, and Vercel project exist.

## Entry 007 — Deployment Notes Created

**Date:** 10 June 2026

**Tool used:** ChatGPT

**Task attempted:** Create deployment notes for the Hababy & Co website.

**What was done:**

* Created `09-deployment-notes.md`.
* Defined the intended deployment stack: GitHub, Vercel, and Supabase.
* Added expected environment variables.
* Added Supabase setup checklist.
* Added Vercel setup checklist.
* Added preview deployment checklist.
* Added production deployment checklist.
* Added launch blockers.
* Added domain setup notes.
* Added privacy, backup, rollback, and post-launch monitoring notes.
* Added a first live test order template.
* Added a list of TBD items.

**Important decision:**

The deployment notes will remain partially incomplete until the actual GitHub repository, Supabase project, Vercel project, production domain, WhatsApp number, admin email, and final pricing details exist.

**Lesson learned:**

Deployment planning can start before the app exists, but deployment notes should clearly mark unknown items as TBD instead of pretending they have already been decided.

**Next action:**

Create `02-repo-context.md` as a placeholder, then move toward creating the actual GitHub repository and Next.js app.

## Entry 008 — Repo Context Placeholder Created

**Date:** 10 June 2026

**Tool used:** ChatGPT

**Task attempted:** Create the initial repository context document before the actual codebase exists.

**What was done:**

* Created `02-repo-context.md`.
* Recorded that the GitHub repository has not yet been created.
* Recorded that the Next.js app has not yet been created.
* Added the planned technical stack.
* Added expected commands and environment variables.
* Added expected brand asset filenames.
* Added a rule for updating repo context as the codebase develops.

**Important decision:**

`02-repo-context.md` will start as a placeholder and become more useful after the actual GitHub repository, Next.js app, Supabase project, and Vercel project exist.

**Lesson learned:**

Repo context is different from architecture. Architecture explains the intended structure. Repo context records the actual codebase reality as it develops.

**Next action:**

Move from planning into setup: create the GitHub repository and initialize the Next.js app.

## Entry 009 — Next.js App Created Successfully

**Date:** 10 June 2026

**Tool used:** VS Code terminal / create-next-app / ChatGPT guidance

**Task attempted:** Create the actual Next.js application for Hababy & Co.

**What was done:**

* Created the Next.js app inside:

```text
02-projects/project-001-first-website/hababy-site/
```

* Used `create-next-app`.
* Chose TypeScript.
* Chose ESLint.
* Chose not to enable React Compiler.
* Chose to include an app-level `AGENTS.md` for Next.js-specific AI coding guidance.
* Started the local development server.
* Confirmed the starter app works locally.

**Important decision:**

The actual application code will live inside the `hababy-site/` subfolder, while the planning and workflow documents remain in the parent project folder.

This keeps the documentation and code connected but not mixed together.

**Lesson learned:**

The project now has two levels of AI guidance:

```text
01-workflow-kit/AGENTS.md
```

This is the overall AI workflow guide.

```text
project-001-first-website/hababy-site/AGENTS.md
```

This is the app-level Next.js coding guide created during setup.

**Current status:**

The planning phase has now moved into real project setup.

The starter Next.js app exists and runs locally.

**Next action:**

Update `02-repo-context.md` to reflect the real app folder, actual commands, and current build status.

## Entry 010 — Repo Context Updated After App Creation

**Date:** 10 June 2026

**Tool used:** ChatGPT

**Task attempted:** Update the repository context after creating the actual Next.js app.

**What was done:**

* Updated `02-repo-context.md`.
* Recorded that the actual app now lives inside `hababy-site/`.
* Recorded that the starter Next.js app was created and tested locally.
* Recorded the setup choices: TypeScript, ESLint, React Compiler disabled, and app-level `AGENTS.md` included.
* Clarified the difference between workflow-level `AGENTS.md` and app-level `AGENTS.md`.
* Added the current app status, known issues, expected commands, and next practical steps.
* Added the next step of copying brand SVG files into the app’s `public/brand/` folder.

**Important decision:**

The repo context now reflects the real codebase state rather than the earlier placeholder state.

**Lesson learned:**

The repo context file should describe what actually exists, not what we planned before implementation started.

**Next action:**

Copy the confirmed SVG logo files into `hababy-site/public/brand/` and confirm the app still runs.

## Entry 011 — Brand Assets Copied Into App

**Date:** 10 June 2026

**Tool used:** VS Code / ChatGPT guidance

**Task attempted:** Copy confirmed Hababy & Co SVG logo files into the actual Next.js app.

**What was done:**

- Created `hababy-site/public/brand/`.
- Copied the confirmed SVG brand assets into the app’s public folder.
- Confirmed the expected runtime logo paths:

```text
/brand/hababy-logo-primary.svg
/brand/hababy-logo-horizontal.svg
/brand/hababy-stork-mark.svg

## Entry 012 — Starter App Checks Passed

**Date:** 10 June 2026

**Tool used:** VS Code terminal / Next.js

**Task attempted:** Confirm that the newly created Next.js starter app runs, lints, and builds successfully.

**What was done:**

* Ran the local development server with:

```bash
npm run dev
```

* Confirmed the app loads at:

```text
http://localhost:3000
```

* Ran lint check with:

```bash
npm run lint
```

* Ran production build check with:

```bash
npm run build
```

**Result:**

* Local development server started successfully.
* Homepage returned `200`.
* Lint completed with no reported errors.
* Production build compiled successfully.
* TypeScript check completed successfully.
* Static pages generated successfully.

**Important note:**

The terminal showed a warning about the default `vercel.svg` image aspect ratio. This is from the default Next.js starter page and is not a blocker. The starter page will be replaced during Hababy & Co implementation.

**Confirmed technical detail:**

The app is running:

```text
Next.js 16.2.9
Turbopack
```

**Lesson learned:**

Before customizing the site, it is important to confirm that the starter app is healthy. This gives a clean baseline so future errors are easier to identify.

**Next action:**

Create the GitHub repository and make the first commit.

## Entry 013 — Git Repository Created and First Commit Made

**Date:** 10 June 2026

**Tool used:** Git / GitHub / VS Code terminal / ChatGPT guidance

**Task attempted:** Put the Hababy & Co project under version control and create the first GitHub-backed restore point.

**What was done:**

* Confirmed the project should use `project-001-first-website/` as the Git repository root.
* Checked whether `hababy-site/` had a nested Git repository.
* Created a parent `.gitignore`.
* Initialized Git in the project folder.
* Added the planning documents, workflow files, source materials, brand assets, and Next.js app to version control.
* Created the first commit.

**Important decision:**

The Git repository tracks both the planning workflow documents and the actual Next.js application.

This keeps the AI handoff system and the codebase together.

**Lesson learned:**

Git gives the project a safe restore point. Before making major AI-generated code changes, the project should be committed so mistakes can be reversed.

**Next action:**

Push the repository to GitHub, then update `02-repo-context.md` with the GitHub repository URL.


## Entry 014 — GitHub Repository Created and First Push Completed

**Date:** 10 June 2026

**Tool used:** Git / GitHub / VS Code terminal / ChatGPT guidance

**Task attempted:** Push the Hababy & Co project to GitHub for the first time.

**What was done:**

* Created a GitHub repository:

```text
https://github.com/smashi9/hababy-co-website
```

* Added the GitHub repository as the remote origin.
* Renamed the local branch to `main`.
* Pushed the local project to GitHub.
* Set the local `main` branch to track `origin/main`.

**Important decision:**

The GitHub repository contains both:

* The planning and workflow markdown documents
* The actual Next.js app inside `hababy-site/`

This keeps the AI workflow documentation and the codebase together.

**Lesson learned:**

GitHub now gives the project a remote backup and makes it possible to connect the project to tools like Vercel, Codex, Claude Code, and other AI coding agents.

**Next action:**

Update `02-repo-context.md` and `09-deployment-notes.md` with the GitHub repository URL.

## Entry 015 — First Vercel Deployment Completed

**Date:** 10 June 2026

**Tool used:** Vercel / GitHub / ChatGPT guidance

**Task attempted:** Connect the GitHub repository to Vercel and deploy the starter Next.js app.

**What was done:**

- Imported the GitHub repository into Vercel.
- Set the Vercel root directory to `hababy-site`.
- Confirmed Vercel detected the app as a Next.js project.
- Deployed the starter app.
- Opened the Vercel deployment URL and confirmed the page loads.

**Important decision:**

Vercel must use `hababy-site` as the project root because the repository also contains planning and workflow documents outside the app folder.

**Lesson learned:**

The project now has a working deployment pipeline: local code → GitHub → Vercel.

**Next action:**

Update `02-repo-context.md` and `09-deployment-notes.md` with the Vercel project and deployment URLs.

## Entry 016 — Supabase Package Installed and Build Passed

**Date:** 10 June 2026

**Tool used:** Supabase / npm / Next.js / VS Code terminal / ChatGPT guidance

**Task attempted:** Create the Supabase project configuration locally and install the Supabase JavaScript client.

**What was done:**

* Created a Supabase project.
* Added Supabase environment variables to local `.env.local`.
* Created a safe `.env.example` file with placeholder variable names only.
* Updated `.gitignore` so `.env.example` can be committed while `.env.local` remains ignored.
* Installed the Supabase JavaScript client:

```bash
npm install @supabase/supabase-js
```

* Ran the production build:

```bash
npm run build
```

**Result:**

* `@supabase/supabase-js` installed successfully.
* The build completed successfully.
* Next.js detected `.env.local`.
* No TypeScript or build errors were reported.
* `.env.local` was not tracked by Git.

**Important note:**

The npm install reported 2 moderate vulnerabilities. `npm audit fix --force` was not run because forced audit fixes can introduce breaking dependency changes. This should be reviewed later if needed.

**Important decision:**

Real Supabase keys are stored only in `.env.local` and should not be committed to GitHub or pasted into chat.

A safe `.env.example` file is committed with placeholder variable names only.

**Lesson learned:**

Environment variables allow the app to connect to external services without exposing secrets in the codebase.

**Next action:**

Create Supabase client files in `hababy-site/lib/supabase/`.

## Entry 017 — Supabase Client Utilities Created

**Date:** 10 June 2026

**Tool used:** VS Code / Next.js / Supabase / ChatGPT guidance

**Task attempted:** Create reusable Supabase client utility files for the Hababy & Co app.

**What was done:**

* Created the Supabase utility folder:

```text
hababy-site/lib/supabase/
```

* Created browser-safe Supabase client file:

```text
hababy-site/lib/supabase/browser.ts
```

* Created server-side Supabase client file:

```text
hababy-site/lib/supabase/server.ts
```

* Created admin/server-only Supabase client file using the service role key:

```text
hababy-site/lib/supabase/admin.ts
```

* Ran lint check:

```bash
npm run lint
```

* Ran production build:

```bash
npm run build
```

**Result:**

* Lint passed.
* Production build passed.
* TypeScript passed.
* Next.js successfully detected `.env.local`.
* No build errors were reported.

**Important decision:**

The Supabase service role key should only be used in server-only code.

The admin client must never be imported into client components or browser-exposed code.

**Lesson learned:**

Backend connection logic should be centralized in reusable utility files instead of being scattered across pages and components.

**Next action:**

Commit and push the Supabase client utility files, then begin planning the first Supabase database schema.

## Entry 018 — Supabase Client Utilities Committed

**Date:** 10 June 2026

**Tool used:** VS Code / Git / Supabase / ChatGPT guidance

**Task attempted:** Commit the reusable Supabase client utility files.

**What was done:**

- Created `hababy-site/lib/supabase/`.
- Added reusable Supabase client utilities:
  - `browser.ts`
  - `server.ts`
  - `admin.ts`
- Ran lint and production build checks.
- Confirmed the app still builds successfully.
- Committed and pushed the Supabase client utilities to GitHub.

**Important decision:**

Supabase connection logic is now centralized in utility files instead of being scattered through pages or components.

**Lesson learned:**

A clean backend connection layer makes future coding safer and easier for AI agents to understand.

**Next action:**

Create the first SQL schema file at `hababy-site/supabase/sql/001_initial_schema.sql`.

## Entry 019 — Initial Supabase Schema Drafted and Reviewed

**Date:** 11 June 2026

**Tool used:** Claude Code / Codex / ChatGPT guidance / VS Code

**Task attempted:** Draft and review the first Supabase database schema for the Hababy & Co backend.

**What was done:**

- Used Claude Code to draft `hababy-site/supabase/sql/001_initial_schema.sql`.
- Used Codex to review the drafted SQL against the project planning files.
- Identified and fixed a critical ordering issue where `is_admin()` was created before `admin_users`.
- Removed the `public_settings` view to avoid exposing settings through a database view.
- Confirmed that settings should be handled later through server-side Next.js code with a public-safe whitelist.
- Added a defensive `drop view if exists public.public_settings;`.
- Added admin bootstrap notes.
- Added or confirmed non-negative/positive checks for:
  - `amount_received`
  - `minimum_order_value_mad`
  - `discount_3_6_days_pct`
  - `multiplier_14d`
  - `multiplier_30d`
- Preserved Version 1 business rules:
  - request-first booking
  - no online payment
  - card disabled by default
  - same-day disabled by default
  - urgent fees default to 0
  - MAD as base currency
  - EUR/USD as offline cash options
  - WhatsApp handoff does not replace saved orders

**Important decision:**

The SQL schema is now a reviewed draft and should be committed before being run in Supabase.

The public site should not read the raw `settings` table directly. Public-safe settings should later be returned through server-side app code.

**Lesson learned:**

This is the intended manual AI workflow: one model drafts, another reviews, the first model revises, and the human controls when changes are accepted and applied.

**Next action:**

Commit the reviewed SQL schema, then decide whether to run it in a disposable Supabase project or the real project.

## Entry 020 — Initial Supabase Schema Tested Successfully

**Date:** 11 June 2026

**Tool used:** Supabase SQL Editor / ChatGPT guidance

**Task attempted:** Test the reviewed initial Supabase schema in a disposable Supabase project before applying it to the real Hababy & Co backend.

**What was done:**

* Created a disposable/test Supabase project.
* Ran `hababy-site/supabase/sql/001_initial_schema.sql` in the test project SQL Editor.
* Confirmed the SQL returned:

```text
Success. No rows returned
```

* Verified that the expected public tables were created:

```text
accessories
admin_users
bundles
categories
content
customers
inventory
orders
products
settings
welcome_kits
```

* Ran:

```sql
select count(*) from public.settings;
```

* Confirmed the result was:

```text
1
```

**Important decision:**

The initial schema was tested in a disposable Supabase project before being applied to the real project.

**Lesson learned:**

Testing database schema in a practice project is safer than running it directly in the real backend. SQL changes affect the database immediately, so a successful disposable test gives confidence before touching the real project.

**Next action:**

Run the reviewed schema in the real Hababy & Co Supabase project and verify the same table/settings checks.

## Entry 021 — Initial Supabase Schema Applied to Real Project

**Date:** 11 June 2026

**Tool used:** Supabase SQL Editor / ChatGPT guidance

**Task attempted:** Apply the reviewed initial Supabase schema to the real Hababy & Co Supabase project.

**What was done:**

- Ran `hababy-site/supabase/sql/001_initial_schema.sql` in the real Supabase project SQL Editor.
- Confirmed the SQL returned:

```text
Success. No rows returned

Verified that the expected public tables were created:
accessories
admin_users
bundles
categories
content
customers
inventory
orders
products
settings
welcome_kits

Ran select count(*) from public.settings;
Confirmed the result was: 1

## Entry 022 — First Admin User Bootstrapped

**Date:** 11 June 2026

**Tool used:** Supabase Authentication / Supabase SQL Editor / ChatGPT guidance

**Task attempted:** Create and connect the first admin user for the Hababy & Co backend.

**What was done:**

- Created the first admin user in Supabase Authentication.
- Copied the Auth user UUID.
- Inserted the Auth user UUID and admin email into `public.admin_users`.
- Set the admin role to `owner`.
- Set `active` to `true`.
- Verified that the `admin_users` table contains the admin row.

**Important decision:**

Admin access requires both:

```text
Supabase Auth user

## Entry 023 — Seed Catalogue Drafted, Reviewed, and Tested

**Date:** 11 June 2026

**Tool used:** Claude Code / Codex / Supabase SQL Editor / ChatGPT guidance

**Task attempted:** Draft, review, and test the first seed catalogue SQL file for Hababy & Co.

**What was done:**

- Created `hababy-site/supabase/sql/002_seed_catalogue.sql`.
- Used Claude Code to draft starter seed data.
- Used Codex to review the seed file against the schema and planning documents.
- Confirmed the seed file does not add fake customers, fake orders, or fake admin users.
- Confirmed the seed file uses placeholder catalogue/content data only.
- Ran the seed file in the disposable/test Supabase project after the initial schema.
- Confirmed the SQL returned:

```text
Success. No rows returned

## Entry 024 — Seed Catalogue Applied to Real Supabase Project

**Date:** 11 June 2026

**Tool used:** Supabase SQL Editor / ChatGPT guidance

**Task attempted:** Apply the reviewed seed catalogue data to the real Hababy & Co Supabase project.

**What was done:**

* Ran `hababy-site/supabase/sql/002_seed_catalogue.sql` in the real Supabase project.
* Confirmed the SQL returned successfully.
* Verified that the real project now contains the expected starter data.

**Verified seed counts:**

```text
categories: 7
products: 8
accessories: 6
bundles: 6
welcome_kits: 4
content: 20
```

**Important decision:**

The real Supabase backend now contains starter catalogue and content data for development.

This seed data is approved for development use, but not yet final for launch.

**Items still requiring review before launch:**

* Product prices
* Product deposits
* Product descriptions
* Bundle prices and contents
* Welcome Kit prices and contents
* Legal and policy copy
* French translations
* Delivery zone fees
* WhatsApp number
* Final safety wording for car seats

**Lesson learned:**

Schema creates the database structure. Seed data fills that structure with starter information so the app can display real-looking pages during development.

**Next action:**

Commit this build log update, then create a simple app-side Supabase read test to confirm that the Next.js app can read catalogue data from the real Supabase backend.

## Entry 025 — App Connected to Supabase Product Data

**Date:** 11 June 2026

**Tool used:** Next.js / Supabase / Vercel / VS Code / ChatGPT guidance

**Task attempted:** Confirm that the Next.js app can read seeded product data from the real Supabase backend.

**What was done:**

- Created `hababy-site/lib/supabase/queries.ts`.
- Added `getProductSummaries()` to read active products from Supabase.
- Created temporary test route:

```text
hababy-site/app/supabase-test/page.tsx
Fixed an initial file-location issue where queries.ts was accidentally created in the wrong folder.
Fixed the local Supabase URL environment variable format.
Added Supabase environment variables to Vercel.
Confirmed locally that /supabase-test loads successfully.
Confirmed the page displays seeded product data from Supabase.
Ran:
npm run lint
npm run build

Result:

Lint passed.
Production build passed.
/supabase-test was included in the build.
The app successfully connected to Supabase and read product data locally.
Vercel environment variables were added so the deployed app can read from Supabase.

Important decision:

/supabase-test is temporary. It exists only to prove the app-to-Supabase connection works before building real catalogue pages.

Lesson learned:

Creating a small test route is a safe way to confirm the data pipeline before building full UI pages.