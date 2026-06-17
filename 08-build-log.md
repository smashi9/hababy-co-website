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

## Entry 026 — UI Direction Selected and UI Handoff Created

**Date:** 11 June 2026

**Tool used:** Gemini / ChatGPT guidance

**Task attempted:** Use Gemini to explore homepage design directions and convert the selected direction into a builder-ready UI handoff.

**What was done:**

- Used Gemini as the UI/visual design partner.
- Asked Gemini to generate three homepage design directions based on the project brief, product requirements, and UI brief.
- Reviewed the three directions:
  - Premium Editorial Boutique
  - Warm Family Service
  - Cultured Craft
- Selected Direction 2: Warm Family Service.
- Saved Gemini’s raw output to `99-source-materials/gemini-ui-directions-2026-06-11.md`.
- Updated `05-ui-handoff.md` with the selected design direction, homepage section order, visual rules, component rules, copy rules, implementation priorities, and acceptance criteria.

**Important decision:**

The project will use the Warm Family Service direction for Version 1 because it best supports the request-first, parent-led, manually confirmed service model.

**Lesson learned:**

The UI brief explains the brand direction, while the UI handoff translates the selected design concept into practical build instructions for Claude Code, Codex, or another implementation agent.

**Next action:**

Ask Claude Code or Codex to implement the first branded homepage foundation using `05-ui-handoff.md` as the source of truth.

## Entry 027 — First Branded Homepage Foundation Implemented

**Date:** 11 June 2026

**Tool used:** Codex / Claude Code / Next.js / ChatGPT guidance

**Task attempted:** Implement and review the first branded Hababy & Co homepage foundation.

**What was done:**

- Used Codex as the implementation agent.
- Codex read the project brief, product requirements, UI brief, UI handoff, test plan, and Supabase query file.
- Replaced the default Next.js starter homepage.
- Added a branded global layout foundation.
- Added a site header and footer.
- Added a first homepage shell based on the selected Gemini direction: Warm Family Service.
- Added homepage sections for:
  - Hero
  - How It Works
  - Value propositions
  - Product/category preview
  - Trust and safety
  - Bundles preview
  - Welcome Kits preview
  - Rabat pilot delivery zones
  - Final CTA
- Used seeded Supabase product data for the product preview, with a safe fallback.
- Preserved `/supabase-test`.
- Did not touch `.env.local`.
- Did not modify Supabase SQL files.
- Did not add booking flow, admin pages, or online payment.

**Review process:**

- Used Claude Code as the reviewer.
- Claude confirmed there were no critical issues.
- Claude recommended two fixes before commit:
  - load the approved fonts instead of starter fonts
  - remove the misleading FAQ nav link
- Claude accidentally applied those targeted fixes after the fix prompt was sent to the wrong agent.
- Used Codex again to review the final state before commit.
- Codex confirmed there were no critical issues.
- Codex identified minor footer polish: placeholder policy items looked like links but were not clickable.
- Footer placeholder policy items were adjusted to appear as muted placeholder text instead of links.
- Ran:

```bash
npm run lint
npm run build

## Entry 028 — Impeccable Design QA Installed and Initialized

**Date:** 11 June 2026

**Tool used:** Impeccable / Claude Code / ChatGPT guidance

**Task attempted:** Add Impeccable as a design critique and polish tool for the Hababy & Co workflow.

**What was done:**

- Installed Impeccable skills into `.claude/skills/impeccable/`.
- Resolved a Windows installation issue by making Git's `unzip.exe` available in the PowerShell session.
- Ran `/impeccable init`.
- Created `PRODUCT.md` as a product/design strategy source of truth.
- Ran `/impeccable document`.
- Created `DESIGN.md` as the visual design system.
- Created `.impeccable/design.json` as a machine-readable design sidecar.
- Added local Impeccable/Claude settings files to `.gitignore`.

**Important decision:**

Impeccable will be used as a design QA and critique layer, not as a replacement for the existing workflow.

Current role allocation remains:

```text
Gemini = design exploration
05-ui-handoff.md = builder handoff
Codex = implementation
Claude Code = review
Impeccable = design critique / polish guidance
ChatGPT = workflow guide
Human = approval and testing

## Entry 029 — Impeccable Homepage Critique Completed

**Date:** 12 June 2026

**Tool used:** Impeccable / Claude Code / ChatGPT guidance

**Task attempted:** Run a design critique of the first branded Hababy & Co homepage foundation.

**What was done:**

- Ran `/impeccable critique homepage`.
- Reviewed the current homepage against the product/design system.
- Received a design health score of `30/40`.
- Confirmed that the homepage is functional, on-brand, and request-first, but still reads as somewhat generic or AI-generated.
- Identified the main design issues:
  - repeated uppercase eyebrow labels across too many sections
  - no real imagery
  - visible placeholder/duplicate copy
  - mobile navigation disappears below desktop
  - nested card structure in the hero
  - monotonous section rhythm
- Selected the critique intent:
  - lead with escaping the template look
  - preserve the brand palette
  - create a plan only, then trigger fixes one by one

**Important decision:**

The current homepage should not be discarded. The brand direction is correct, but the design craft needs elevation.

**Lesson learned:**

A site can be technically correct and still feel generic. Design critique tools help turn vague discomfort into specific, actionable fixes.

**Next action:**

Run `/impeccable typeset homepage` first to reduce the repeated eyebrow/template look before making larger layout or imagery changes.

## Entry 030 — Design Automation Experiment Paused and Build Track Refocused

**Date:** 12 June 2026

**Tool used:** Impeccable / Codex / VS Code / ChatGPT guidance

**Task attempted:** Use Impeccable and Codex to improve the visual craft of the first branded Hababy & Co homepage after the homepage felt too generic.

**What was done:**

* Installed and initialized Impeccable as a design QA layer.
* Created design-system support files:

  * `PRODUCT.md`
  * `DESIGN.md`
  * `.impeccable/design.json`
  * `.claude/skills/impeccable/`
* Ran an Impeccable critique of the homepage.
* Impeccable identified that the homepage was technically functional and on-brand, but still felt generic/template-like.
* Attempted a first typesetting/design refinement pass.
* Attempted a broader Codex homepage craft pass based on the Impeccable critique.
* Visually reviewed the result and decided the automated design changes were not good enough.
* Decided not to continue the visual redesign loop for now.

**Result:**

* The automated design refinement did not produce an acceptable visual result.
* The latest unwanted design changes should be reverted or left uncommitted.
* The project will return to the functional build track instead of continuing homepage design polish immediately.

**Important decision:**

Design perfection will be paused for now.

The project will continue building core website functionality first, including catalogue structure, product pages, and request-first flow foundations.

Visual design can be revisited later with better assets, clearer references, and a more deliberate design pass.

**Lesson learned:**

Design critique tools can be useful for identifying why a page feels generic, but automated design fixes are not always good enough.

For this project, Impeccable is useful as a critique and diagnosis layer, but final design taste still requires human judgement and stronger visual direction.

**Next action:**

Revert any unwanted uncommitted design changes, confirm the app still builds, and continue with the next functional milestone: catalogue foundation and product pages.

## Entry 031 — Catalogue Foundation Implemented

**Date:** 12 June 2026

**Tool used:** Codex / Next.js / Supabase read queries

**Task attempted:** Build the first public catalogue foundation for Hababy & Co.

**What was done:**

* Created a public product catalogue page at:

```text
hababy-site/app/products/page.tsx
```

* Created a basic product detail route at:

```text
hababy-site/app/products/[slug]/page.tsx
```

* Added reusable catalogue components for:
  * product cards
  * product grids
  * product detail display
  * development-safe fallback product data
* Extended `hababy-site/lib/supabase/queries.ts` with `getProductBySlug(slug)`.
* Expanded product summaries to include descriptions for public catalogue cards.
* Kept all product reads server-side and read-only.
* Added safe fallback behavior if Supabase is unavailable or the catalogue is empty.
* Updated header/footer navigation so Rent Gear links to `/products`.
* Preserved request-first language:
  * customer submits a request
  * Hababy & Co confirms availability
  * payment/deposit are arranged before handover
* Added car-seat-specific child detail guidance on safety-sensitive product detail pages.
* Preserved `/supabase-test`.
* Did not touch `.env.local`.
* Did not modify or run Supabase SQL files.
* Did not add booking flow, admin pages, or online payment.

**Result:**

The public site now has a real catalogue foundation powered by Supabase product data with development-safe fallbacks.

**Important decision:**

The catalogue CTAs remain placeholders that guide users toward the request-first model. They do not create bookings yet.

**Next action:**

Human visual review of `/products` and `/products/[slug]`, then build the actual request-to-book flow in a later milestone.

## Entry 032 — Catalogue Inventory Gate Added

**Date:** 12 June 2026

**Tool used:** Codex / Next.js / Supabase read queries

**Task attempted:** Make the public catalogue inventory-aware before building the request flow.

**What was done:**

* Inspected the existing inventory schema in `001_initial_schema.sql`.
* Confirmed the schema supports product-level inventory availability through:
  * `inventory.product_id`
  * `inventory.status`
  * `inventory.cleaning_status`
  * `inventory.current_order_id`
* Extended Supabase read queries so product summaries and details include a simple inventory availability summary.
* Kept raw inventory rows server-only; the UI receives only counts and requestability.
* Updated `/products` cards to show:
  * `Available to request`
  * `Available on request`
  * `Currently unavailable`
* Updated product detail pages with the same availability check.
* Replaced request CTAs with `Currently unavailable` when usable stock count is zero.
* Updated homepage product previews to respect the same availability check.
* Updated car seat wording so parents are responsible for choosing the appropriate car seat group from listed specifications.
* Removed public-facing wording that implied Hababy & Co confirms child suitability.
* Created a draft inventory seed file:

```text
hababy-site/supabase/sql/003_seed_inventory.sql
```

* Marked the inventory seed file as review-before-run and development/testing only.
* Did not run SQL.
* Did not modify existing Supabase SQL files.
* Did not touch `.env.local`.
* Did not add booking flow, admin pages, or online payment.
* Preserved `/supabase-test`.

**Availability rule added in app code:**

```text
usable stock =
  status = 'available'
  and cleaning_status = 'clean'
  and current_order_id is null
```

**Result:**

The catalogue now has two separate gates:

* Availability check: products with no usable stock cannot be requested.
* Owner confirmation/QC step: products with usable stock still require Hababy & Co confirmation before approval.

**Checks run:**

```bash
npm run lint
npm run build
```

Both passed.

**Next action:**

Human should review `003_seed_inventory.sql`, then decide whether to run it in a disposable Supabase project before applying it to the real project.

**Follow-up documentation note:**

After the product owner confirmed that the catalogue should be availability-aware, the planning documents were updated to make this a formal Version 1 rule:

* `01-product-requirements.md`
* `06-backend-plan.md`
* `07-test-plan.md`
* `11-change-log.md`

The old planning language that treated catalogue availability as request-first only has been replaced with the two-gate model:

```text
availability check first
then owner confirmation/QC before approval
```

## Entry 033 — Level 2 Workflow Routing Added

**Date:** 16 June 2026

**Tool used:** Codex

**Task attempted:** Create reusable routing and workflow-runner files for future Hababy & Co milestones.

**What was done:**

* Created `AGENT_ROUTING.md`.
* Created `prompts/codex-workflow-runner.md`.
* Defined the project role model for:
  * human owner
  * ChatGPT
  * Codex
  * Claude Code
  * Gemini
  * Impeccable
  * GitHub
  * Supabase
  * Vercel
* Documented when Codex may proceed independently.
* Documented when Codex must stop and ask for Claude Code, Gemini, Impeccable, or the human owner.
* Added safety rules for SQL, `.env.local`, Vercel secrets, commits, pushes, payment language, and milestone scope.
* Reconfirmed the current Hababy business rules:
  * request-first
  * availability check before request
  * available products can be requested
  * unavailable products cannot be requested
  * requests remain pending Hababy confirmation
  * no online payment
  * no "Book now" or "Pay now"
  * parents choose car seat group based on listed specs
  * Hababy does not confirm child suitability
* Added a reusable prompt that can be pasted into Codex at the start of future milestones.

**Result:**

The project is moving from fully manual step-by-step guidance toward a reusable Codex workflow-runner approach, while preserving specialist roles for Gemini, Claude Code, Impeccable, ChatGPT, and the human owner.

**Important decision:**

Codex can now be used as the default milestone runner, but not as the final authority for business decisions, production SQL, secrets, commits, deployment settings, broad design exploration, design critique, or high-risk backend architecture.

**Checks run:**

No app checks were run because this was a documentation-only workflow milestone.

**Next action:**

Use `prompts/codex-workflow-runner.md` as the starting prompt for the next implementation milestone.

## Entry 034 — Request Flow Foundation Added

**Date:** 16 June 2026

**Tool used:** Codex / Next.js

**Task attempted:** Build the first customer request flow for available products.

**What was done:**

* Created a public request page at:

```text
hababy-site/app/request/page.tsx
```

* Created an interactive request form component at:

```text
hababy-site/components/request/RequestForm.tsx
```

* Updated product card CTAs so available products link to:

```text
/request?product=<slug>
```

* Updated product detail CTAs so available products link to the same request route.
* Kept unavailable product CTAs disabled as `Currently unavailable`.
* Updated header and footer request links to point to `/request`.
* Cleaned up existing homepage request-first copy so it avoids checkout language.
* The request page reads the selected product slug from the URL.
* If a product slug is provided, the page shows the selected product summary.
* If no product slug is provided, the user can choose from available products.
* If the selected product is unavailable, the page shows a clear unavailable message and blocks submission.
* Added the requested form fields:
  * selected product
  * rental start date
  * rental end date
  * delivery type
  * delivery zone
  * preferred delivery window
  * preferred pickup window
  * customer name
  * phone
  * optional email
  * preferred language
  * payment preference
  * notes
* Added a same-day / under-24-hours notice block.
* Added a simple rental estimate using daily and weekly product pricing plus refundable deposit.
* Made estimate copy clear that it is not a final confirmed total.
* Added confirmation-style UI copy that says Hababy & Co will review availability, delivery details, payment/deposit, and handover before approval.
* Preserved the request-first model.
* Preserved `/supabase-test`.
* Did not add online payment.
* Did not add Stripe, PayPal, card logos, checkout, or payment gateway UI.
* Did not add admin pages.
* Did not save requests to Supabase.
* Did not edit `.env.local`.
* Did not run SQL.
* Did not modify Supabase SQL files.
* Did not commit or push.

**Result:**

The site now has a UI-only request flow foundation. Customers can begin a request from available products, choose dates and delivery/contact/payment-preference details, see a simple estimate, and receive request-first confirmation messaging.

**Important decision:**

Requests are not saved to Supabase in this milestone. Order saving should be a later backend milestone after schema, validation, security, RLS, and request mutation behavior are reviewed.

**Availability rule preserved:**

```text
Products with usable stock can link to /request?product=<slug>.
Products without usable stock cannot start submission and remain Currently unavailable.
```

**Same-day rule added:**

```text
Same-day requests and requests less than 24 hours away are blocked in the UI.
```

**Checks run:**

```bash
npm run lint
npm run build
```

Both passed.

**Next action:**

Have the human owner review the `/request` flow on mobile and desktop. The recommended next milestone is validated Supabase order saving with Claude Code review before implementation.

## Entry 035 — Validated Supabase Order Saving Added

**Date:** 16 June 2026

**Tool used:** Codex / Next.js / Supabase server action

**Task attempted:** Turn the `/request` UI foundation into a real saved request flow using validated server-side Supabase writes.

**What was done:**

* Added Zod as an app dependency for request validation.
* Created a server action at:

```text
hababy-site/app/request/actions.ts
```

* Created request validation at:

```text
hababy-site/lib/validation/requestSchema.ts
```

* Created reusable estimate logic at:

```text
hababy-site/lib/pricing/estimate.ts
```

* Created Supabase order/customer persistence logic at:

```text
hababy-site/lib/supabase/orders.ts
```

* Updated the request form to submit through the server action.
* Added pending, success, and validation-error states to the request form.
* Removed the old UI-only copy that said requests are not saved to Supabase.
* Kept the customer-facing copy request-first:
  * request received
  * not a confirmed booking
  * Hababy & Co confirms availability, delivery, payment/deposit, and handover before approval
* Rechecked product availability server-side before saving:
  * product must exist
  * product must be active
  * product must not be hidden
  * product must have at least one usable inventory row
* Rechecked the 24-hour block server-side.
* Recomputed the rental estimate server-side using product daily/weekly price and deposit.
* Saved or reused a customer by exact phone lookup.
* Applied Claude review follow-up fixes so duplicate phone matches use the earliest customer row and blank submitted email/notes do not wipe existing customer data.
* Saved new orders with status `new`.
* Stored the selected product as a JSON snapshot.
* Set delivery fee and urgent fee to `0` for now.
* Set currency to `MAD`.
* Recorded only the offline payment preference.
* Returned only a minimal success result to the browser:
  * success message
  * short request reference
* Did not return PII or raw database records to the browser.
* Did not reserve inventory.
* Did not update `inventory.current_order_id`.
* Did not change inventory status.
* Preserved `/supabase-test`.
* Did not add admin pages.
* Did not add WhatsApp integration.
* Did not add online payment.
* Did not add Stripe, PayPal, card logos, checkout, or payment gateway UI.
* Did not edit `.env.local`.
* Did not run SQL.
* Did not modify Supabase SQL files.
* Did not commit or push.

**Result:**

The request flow now saves validated booking requests to Supabase through a server action using the service-role/admin client on the server only.

**Important decision:**

This milestone creates saved request records but does not reserve physical inventory. A submitted request remains `new` until Hababy & Co manually reviews availability, delivery feasibility, payment/deposit, and handover details.

**Checks run:**

```bash
npm run lint
npm run build
```

Both passed.

**Next action:**

Have Claude Code review the server action, validation, customer lookup, order insert, and service-role boundaries before committing. Then test against a reviewed Supabase project with seeded usable inventory.

## Entry 036 — Admin Order Review Foundation Added

**Date:** 17 June 2026

**Tool used:** Codex / Next.js / Supabase Auth

**Task attempted:** Create a protected, read-only admin order review surface so the owner can view saved customer requests without using SQL.

**What was done:**

* Added `@supabase/ssr` for cookie-backed Supabase Auth in the App Router.
* Added Supabase Auth login at `/admin/login`.
* Added `/admin` redirect behavior to `/admin/orders`.
* Added a read-only order list at `/admin/orders`, newest first.
* Added a read-only order detail page at `/admin/orders/[id]`.
* Added an admin shell with basic navigation and sign out.
* Added noindex metadata for the admin route tree.
* Added a proxy guard for `/admin/*`.
* Added a server-side protected admin layout guard before order pages render.
* Verified both a valid Supabase Auth user session and an active `admin_users` row.
* Added optional `ADMIN_ALLOWED_EMAILS` as a belt-and-suspenders allowlist in `.env.example`.
* Read orders and customer summaries through the authenticated user session so existing RLS/admin policies apply.
* Rendered selected products defensively from the `selected_products` JSON snapshot.
* Displayed list/detail request data without dumping raw JSON.
* Did not add status updates.
* Did not reserve inventory.
* Did not add WhatsApp handoff.
* Did not add admin CRUD beyond order review.
* Did not add online payment or checkout UI.
* Did not run SQL.
* Did not edit Supabase SQL files.
* Did not edit `.env.local`.
* Did not commit or push.

**Service role boundary:**

The new admin review surface does not use the service-role client. Existing public request saving still uses the server-only service-role helper from the previous milestone.

**Result:**

The project now has a real Supabase Auth admin foundation for reviewing saved booking requests while preserving the request-first workflow and read-only milestone scope.

**Checks run:**

```bash
npm run lint
npm run build
```

Both passed. After Claude's before-commit review, the admin guard was migrated from `middleware.ts` / `middleware()` to `proxy.ts` / `proxy()` for Next.js 16 compatibility while preserving the same `/admin/*` protection behavior.

**Next action:**

Have the human owner bootstrap a real Supabase Auth admin user and matching active `admin_users` row, then test login, protected redirects, order list/detail display, and sign out. Claude Code review is recommended before commit because this milestone touches auth, RLS-dependent reads, and PII display.

## Entry 037 — Playwright Workflow QA Layer Documented

**Date:** 17 June 2026

**Tool used:** Codex / documentation update

**Task attempted:** Add Playwright to the Hababy & Co AI workflow plan as the automated browser QA and smoke-test runner.

**What was done:**

* Documented that Playwright is not an AI agent.
* Added Playwright as the automated browser QA, smoke-test, and regression-check layer.
* Clarified that Codex writes and runs Playwright tests when tests exist.
* Clarified that Codex should summarize Playwright failures before asking the human owner for manual testing.
* Updated the reusable Codex workflow runner so `npm run test:e2e` should run after lint and build when available.
* Added an automated smoke testing section to the test plan.
* Defined the initial Playwright smoke-test scope:
  * homepage loads
  * `/products` loads
  * a product detail page loads
  * `/request` loads
  * `/supabase-test` loads
  * logged-out `/admin/orders` redirects to `/admin/login`
  * `/admin/login` loads
* Clarified that authenticated admin e2e tests should run only when `E2E_ADMIN_EMAIL` and `E2E_ADMIN_PASSWORD` are present.
* Clarified that tests creating Supabase customer/order data must be explicitly marked, disabled by default, or pointed at a disposable/test Supabase project.
* Did not install Playwright.
* Did not edit app code.
* Did not edit Supabase SQL files.
* Did not touch `.env.local`.
* Did not run SQL.
* Did not commit or push.

**Result:**

The project now has a documented place for Playwright in the Level 2 AI workflow: Codex remains the implementation runner, and Playwright becomes the scripted browser QA tool Codex can use after future implementation milestones.

**Checks run:**

No app checks were needed because this was a documentation-only workflow update and Playwright is not installed yet.

## Entry 038 — Playwright Smoke Tests Installed

**Date:** 17 June 2026

**Tool used:** Codex / Playwright

**Task attempted:** Install Playwright and add the first automated browser QA smoke tests for safe route and admin-access checks.

**What was done:**

* Installed `@playwright/test` as a development dependency.
* Added Playwright config inside `hababy-site/`.
* Added npm scripts:
  * `npm run test:e2e`
  * `npm run test:e2e:headed`
* Added public smoke tests for:
  * homepage
  * `/products`
  * `/products/travel-cot`
  * `/request`
  * `/request?product=travel-cot`
  * `/supabase-test`
* Added logged-out admin smoke tests for:
  * `/admin/orders` redirects to `/admin/login`
  * `/admin/login` loads
  * `/admin/orders` is not publicly visible without login
* Added optional authenticated admin tests that run only when `E2E_ADMIN_EMAIL` and `E2E_ADMIN_PASSWORD` are present.
* Added e2e credential placeholders to `.env.example` only.
* Did not store credentials in the repository.
* Did not create real order submissions.
* Did not add payment, admin mutation, inventory reservation, status update, or WhatsApp tests.
* Did not run SQL.
* Did not edit Supabase SQL files.
* Did not touch `.env.local`.
* Did not commit or push.

**Safety boundary:**

The default e2e suite is read-only. It verifies route loading and admin access protection, but it does not submit customer forms or create Supabase order/customer data.

**Checks run:**

```bash
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

`npm run lint` passed.

`npm run build` passed.

The first `npm run test:e2e` attempt correctly reported that Playwright browser binaries were missing. `npx playwright install chromium` was run to install the Chromium test browser.

After Chromium was installed, `npm run test:e2e` passed:

```text
9 passed
1 skipped
```

The skipped test was the optional authenticated admin flow because `E2E_ADMIN_EMAIL` and `E2E_ADMIN_PASSWORD` were not present in the test environment.
