# Project 001 — Repo Context

## Product Name

Hababy & Co

## Document Purpose

This document records the actual repository and codebase context for the Hababy & Co website.

It should help any AI coding agent understand:

* Where the code lives
* What framework is being used
* How the project is structured
* What has already been built
* What commands are available
* What environment variables are needed
* What known issues exist
* What the next coding task is

This file should be updated whenever the real codebase changes in an important way.

## Current Status

```text
Repository status: Local app created, GitHub repository not yet created
GitHub repository URL: TBD
Local project folder: 02-projects/project-001-first-website/
Next.js app folder: 02-projects/project-001-first-website/hababy-site/
Next.js app status: Created and running locally
Supabase project: Not yet created
Vercel project: Not yet created
Production domain: TBD
```

## Important Planning Documents

Before coding, AI agents should read:

```text
AGENTS.md
00-project-brief.md
01-product-requirements.md
02-repo-context.md
03-architecture-plan.md
04-ui-brief.md
06-backend-plan.md
07-test-plan.md
09-deployment-notes.md
11-change-log.md
```

## Source Material

The original developer handover is stored in:

```text
99-source-materials/
```

The confirmed brand assets are stored in:

```text
assets/brand/
```

Expected brand files:

```text
hababy-logo-primary.svg
hababy-logo-horizontal.svg
hababy-stork-mark.svg
```

## Actual App Location

The actual Next.js app lives in:

```text
02-projects/project-001-first-website/hababy-site/
```

This was chosen because the parent folder contains workflow documentation, source materials, and brand assets.

Keeping the app inside `hababy-site/` separates the codebase from the planning documents while keeping everything connected inside the same project folder.

## App Setup Choices

The app was created using `create-next-app`.

Setup choices made:

```text
TypeScript: Yes
ESLint: Yes
React Compiler: No
App-level AGENTS.md: Yes
```

Tailwind CSS, App Router, and import alias settings should be confirmed from the generated app files.

If Tailwind CSS was not included during setup, it should be added before UI implementation begins.

## AI Guidance Files

There are now two levels of AI guidance.

## Workflow-Level AI Guidance

Main workflow file:

```text
01-workflow-kit/AGENTS.md
```

Purpose:

```text
Defines the overall AI-assisted website-building workflow, model flexibility, documentation rules, and agent behaviour.
```

## App-Level AI Guidance

Next.js app file:

```text
02-projects/project-001-first-website/hababy-site/AGENTS.md
```

Purpose:

```text
Guides coding agents to write up-to-date Next.js code for this specific app.
```

Both are useful.

The workflow-level `AGENTS.md` explains how the project works.

The app-level `AGENTS.md` helps coding agents work correctly inside the Next.js app.

## Planned Technical Stack

The planned stack is:

```text
Next.js App Router
TypeScript
Tailwind CSS
shadcn/ui
Supabase
Vercel
next-intl
react-hook-form
zod
lucide-react
```

## Current Confirmed Stack

Confirmed from setup so far:

```text
Next.js
TypeScript
ESLint
App-level AGENTS.md
```

To confirm from generated files:

```text
Tailwind CSS
App Router
Import alias @/*
Package manager
Next.js version
React version
```

## Local Commands

Run commands from inside:

```text
02-projects/project-001-first-website/hababy-site/
```

Expected commands:

```bash
npm run dev
npm run build
npm run lint
```

The development server has already been tested successfully.

Local development URL:

```text
http://localhost:3000
```

## Environment Variables

Expected future variables:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL
ADMIN_ALLOWED_EMAILS
```

These are not yet active because the Supabase project has not been created.

Environment variable rules:

```text
.env.local should not be committed
.env.example should be committed later
Service role key must never be exposed to the browser
Only NEXT_PUBLIC_ variables can be used in browser/client code
```

## Current Codebase Structure

The actual app now exists inside:

```text
hababy-site/
```

The exact generated structure should be confirmed in VS Code.

Expected high-level structure:

```text
hababy-site/
├── app/
├── public/
├── package.json
├── next.config.ts or next.config.js
├── tsconfig.json
├── eslint.config.mjs or equivalent
├── AGENTS.md
└── other generated config files
```

If Tailwind was selected during setup, expected Tailwind-related files/configuration should also exist.

## Planned Future App Structure

As the project develops, the app should move toward this structure:

```text
hababy-site/
├── app/
├── components/
│   ├── layout/
│   ├── marketing/
│   ├── catalogue/
│   ├── product/
│   ├── booking/
│   ├── admin/
│   └── ui/
├── lib/
│   ├── supabase/
│   ├── validation/
│   ├── pricing/
│   ├── whatsapp/
│   ├── i18n/
│   └── utils/
├── messages/
│   ├── en.json
│   └── fr.json
├── types/
├── public/
│   └── brand/
└── AGENTS.md
```

## Brand Asset Handling

Source brand assets currently live in the parent project folder:

```text
assets/brand/
```

Expected files:

```text
hababy-logo-primary.svg
hababy-logo-horizontal.svg
hababy-stork-mark.svg
```

For the app to use them publicly, they should be copied into:

```text
hababy-site/public/brand/
```

Expected runtime paths:

```text
/brand/hababy-logo-primary.svg
/brand/hababy-logo-horizontal.svg
/brand/hababy-stork-mark.svg
```

This copy step has not yet been completed unless manually done.

## Current Build Status

```text
Starter Next.js app created successfully.
Local development server tested successfully.
Default starter page loads at http://localhost:3000.
Hababy & Co custom implementation has not yet started.
```

## Current Known Issues

```text
No implementation bugs yet because the custom Hababy & Co site has not been built.
Supabase is not yet configured.
Vercel is not yet configured.
GitHub repository is not yet created.
Brand assets may still need to be copied into hababy-site/public/brand/.
Tailwind/App Router/import alias should be confirmed from generated files.
```

## Decisions Already Made

```text
The actual app will live inside hababy-site/.
The parent project folder will keep planning and workflow documents.
The app uses TypeScript.
The app uses ESLint.
React Compiler is not enabled.
The app includes a Next.js-specific AGENTS.md file.
The site will use Supabase later for backend/database/auth/storage.
The site will deploy to Vercel later.
```

## Next Practical Steps

Recommended next actions:

```text
1. Confirm the generated app files and setup choices.
2. Copy brand SVG files into hababy-site/public/brand/.
3. Run npm run lint.
4. Run npm run build.
5. Create the GitHub repository.
6. Make the first Git commit.
7. Push the project to GitHub.
```

## Repo Context Update Rule

Update this file when:

* GitHub repository is created
* Next.js app settings are confirmed
* Supabase project is created
* Vercel project is created
* Environment variables are confirmed
* Main commands change
* Folder structure changes
* Major dependencies are added
* Brand files are copied into the app
* Known issues appear
* Deployment URL is created
* Production domain is connected

## Current Next Action

The immediate next action is:

```text
Copy confirmed brand SVG files into hababy-site/public/brand/ and confirm the app build still works.
```
