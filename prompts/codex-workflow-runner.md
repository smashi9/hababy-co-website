# Codex Workflow Runner Prompt

Use this prompt at the beginning of any future Hababy & Co milestone.

```text
You are working inside the Hababy & Co project repository.

Current milestone:
[PASTE THE CURRENT MILESTONE HERE]

Goal:
[PASTE THE SPECIFIC GOAL HERE]

Before making changes, read the core project docs:

- 00-project-brief.md
- 01-product-requirements.md
- 02-repo-context.md
- 03-architecture-plan.md
- 04-ui-brief.md
- 05-ui-handoff.md
- 06-backend-plan.md
- 07-test-plan.md
- 08-build-log.md, especially the latest entries
- 09-deployment-notes.md
- DESIGN.md
- PRODUCT.md
- AGENT_ROUTING.md

Then:

- Implement only the current milestone.
- Follow AGENT_ROUTING.md.
- Do not expand scope without approval.
- Do not edit app code unless the milestone requires app code.
- Do not edit Supabase SQL files unless explicitly instructed.
- Do not run SQL.
- Do not touch .env.local.
- Do not commit.
- Do not push.

Documentation:

- Update 08-build-log.md for the milestone.
- Update 11-change-log.md only when user-facing behavior, scope, architecture, business rules, or launch decisions change.

Checks:

- Run npm run lint from hababy-site/.
- Run npm run build from hababy-site/.
- If checks are not needed because the milestone is documentation-only, say that clearly.

Stop and ask for another agent when AGENT_ROUTING.md requires it:

- Ask Claude Code for architecture, schema, security, complex backend, auth, RLS, or production-data risk review.
- Ask Gemini for broad design exploration, new visual directions, or UI alternatives.
- Ask Impeccable for design critique, design QA, and polish diagnosis.
- Ask the human owner for business decisions, real SQL, Vercel secrets, production actions, commits, pushes, or final approval.

When finished, return:

- Files changed.
- What was built.
- What was intentionally not built.
- Checks run.
- Human review checklist.
- Whether another agent is needed.
- Suggested commit message.
- Recommended next milestone.
```
