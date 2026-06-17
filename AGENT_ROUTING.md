# Hababy & Co Agent Routing

## Purpose

This file defines how Hababy & Co project work should be routed between the human owner, ChatGPT, Codex, Claude Code, Gemini, Impeccable, GitHub, Supabase, Vercel, and supporting workflow tools such as Playwright.

The goal is to let future milestones run mostly from Codex in VS Code while preserving the intended specialist workflow. Codex can handle implementation, routine documentation, and verification, but it should pause when a decision needs another specialist or the human owner.

## Agent Role Table

| Role | Main responsibility | Typical work |
| --- | --- | --- |
| Human owner | Product owner, final approval, business decisions, real Supabase SQL, Vercel secrets, commits | Approves scope, confirms business rules, runs production SQL, manages secrets, commits and pushes when ready |
| ChatGPT | Teacher, strategist, workflow designer, explanation layer | Explains tradeoffs, designs milestone workflow, turns messy requirements into clear prompts, helps the owner understand decisions |
| Codex | Implementation runner, code changes, routine docs/logs, lint/build | Reads project docs, implements approved milestone scope, updates logs, runs checks, reports changed files and review checklist |
| Claude Code | Architecture review, schema review, security review, complex backend review | Reviews database schema, backend flows, security-sensitive logic, architecture changes, and risky refactors |
| Gemini | Design exploration, new visual directions, UI alternatives | Explores alternate visual concepts, layouts, moodboards, page directions, and creative UI options |
| Impeccable | Design critique, design QA, polish diagnosis | Reviews visual quality, spacing, hierarchy, responsiveness, polish, and brand consistency |
| GitHub | Version history | Stores commits, branches, pull requests, and project history |
| Supabase | Backend/database | Stores catalogue, inventory, request, auth, storage, and operational data |
| Vercel | Deployment | Hosts the Next.js app and manages deployment environment variables |

## Workflow Tool Table

Playwright is not an AI agent. It is the automated browser QA and regression test runner used by Codex when the project has browser tests available.

| Tool | Main responsibility | Typical work |
| --- | --- | --- |
| Playwright | Automated browser QA, smoke tests, regression checks | Opens the app in a browser, follows scripted checks, verifies redirects and page behavior, captures failures for Codex to summarize |

## When Codex May Proceed

Codex may proceed when the task is within an approved milestone and can be completed using existing project documents, existing architecture, and established business rules.

Codex may proceed with:

- Implementing app changes that match the current milestone.
- Creating or updating routine project documentation.
- Updating `08-build-log.md`.
- Updating `11-change-log.md` when user-facing behavior, scope, architecture, or business rules change.
- Running `npm run lint` and `npm run build`.
- Running Playwright browser checks, such as `npm run test:e2e`, after meaningful implementation milestones when those tests exist.
- Making small technical choices that follow existing project patterns.
- Creating draft SQL files only when explicitly requested, clearly marked for human review, and not run by Codex.

## When Codex Must Stop and Ask for Claude

Codex must stop and ask for Claude Code review before continuing when the milestone involves:

- New or changed Supabase schema.
- Row Level Security policies.
- Auth, roles, admin permissions, or security-sensitive backend logic.
- Payment, deposits, refunds, or finance-related backend logic.
- Complex request lifecycle logic.
- Major architecture changes or shared abstractions.
- Data migration plans.
- Production SQL that could affect real customer or inventory data.

Codex may draft questions or a review brief for Claude, but should not proceed with the risky implementation until the review is complete or the human owner explicitly approves proceeding.

## When Codex Must Stop and Ask for Gemini

Codex must stop and ask for Gemini when the work needs broad design exploration before implementation, including:

- A new visual direction.
- Several competing layout concepts.
- A new brand expression or campaign style.
- Major homepage, catalogue, product detail, or admin interface redesign.
- Visual alternatives that should be compared before choosing one.

Codex may implement a selected Gemini direction after the human owner approves it.

## When Codex Must Stop and Ask for Impeccable

Codex must stop and ask for Impeccable when the work needs detailed design critique or polish diagnosis, including:

- Final visual QA before launch.
- Spacing, hierarchy, responsiveness, or brand polish review.
- Uncertainty about whether a page feels premium, clear, or trustworthy.
- Design defects that are easier to diagnose from screenshots than from code.
- A UI that is functionally complete but may need refinement.

Codex may apply Impeccable's approved polish recommendations after the human owner confirms the scope.

## When Codex Must Stop and Ask the Human Owner

Codex must stop and ask the human owner when the work involves:

- Business decisions, pricing, deposits, delivery policy, cancellation policy, or liability language.
- Product availability rules that change the customer journey.
- Car seat safety wording or suitability promises.
- Running real Supabase SQL.
- Editing `.env.local` or managing secrets.
- Vercel production settings or deployment secrets.
- Committing, pushing, merging, or releasing.
- Any irreversible or production-affecting action.
- Ambiguous scope that could create user-facing behavior the owner has not approved.

## Safety Rules

- Do not run SQL.
- Do not edit `.env.local`.
- Do not expose secrets in docs, logs, screenshots, or commits.
- Do not commit or push unless the human owner explicitly instructs it.
- Do not add online payment unless the human owner approves a payment milestone.
- Do not create "Book now" or "Pay now" flows.
- Keep request-first language clear across the public site.
- Treat Supabase production data as human-owned.
- Treat Vercel secrets as human-owned.
- Keep implementation scoped to the current milestone.
- Preserve existing app behavior unless the milestone explicitly changes it.
- Update `08-build-log.md` after each milestone.
- Update `11-change-log.md` only for meaningful scope, behavior, architecture, business-rule, or launch-decision changes.
- Codex should summarize Playwright failures before asking the human owner to do manual testing.
- Playwright should not create production data by default.
- Playwright tests that write to Supabase must be explicitly marked, disabled by default, or pointed at a disposable/test Supabase project.
- Playwright must not be used to run production actions, manage secrets, or approve business decisions.

## Current Hababy Business Rules

- Hababy & Co uses a request-first flow.
- The app should check availability before a customer can request a product.
- Available products can be requested.
- Unavailable products cannot be requested.
- A submitted request is still pending Hababy confirmation.
- Hababy & Co does not take online payment in the Version 1 public flow.
- The public site must not say "Book now" or "Pay now".
- Parents choose the car seat group based on the listed age, weight, height, and product specifications.
- Hababy & Co does not confirm child suitability for car seats.
- Hababy confirms stock, item condition, cleanliness, requested dates, delivery feasibility, payment/deposit arrangements, and handover details before approving a request.
