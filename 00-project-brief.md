# Project 001 — Hababy & Co Website Brief

## Project Name

Hababy & Co

## Working Title

Baby gear rental in Rabat, delivered before you arrive.

## Project Type

Customer-facing website with a lightweight admin panel.

## Project Purpose

Hababy & Co is a premium, parent-led baby equipment rental service launching as a Rabat-only pilot.

The business helps families rent clean, inspected baby gear for their stay in Rabat. Customers can rent items such as travel cots, strollers, car seats, high chairs, baby baths, and other arrival essentials. Items are delivered to a home, hotel, Airbnb, family home, or airport, then collected after the rental period.

The website should make the service feel trustworthy, warm, practical, and easy to use.

This project is also the first real test of the AI-assisted website-building workflow. The build process should be documented clearly so that another non-coder can later understand and repeat the same workflow.

## Core Business Idea

Families travelling with babies and toddlers often struggle with carrying bulky equipment.

Hababy & Co solves this by allowing families to request baby gear before they arrive in Rabat.

The brand is not a marketplace. It is a single, accountable, curated operator responsible for the gear, delivery, collection, and service quality.

## Primary Audiences

The website should prioritize these audiences:

1. Moroccan diaspora returning home for holidays or family visits.
2. Embassy, UN, NGO, relocation, and expat families in Rabat.
3. Travelling families visiting Rabat.
4. Local parents and hosts, including Airbnb hosts, hotels, and serviced apartments.

## Brand Positioning Summary

Hababy & Co should feel:

* Warm
* Calm
* Trustworthy
* Parent-led
* Premium but approachable
* Quietly upscale
* Moroccan-inspired
* Practical and service-oriented

The tone should avoid feeling cheap, overly corporate, or like a generic rental marketplace.

The brand should communicate care, cleanliness, reliability, and personal confirmation.

## Core Offer

The website should support three core offers:

1. Baby gear rental
   Examples: travel cots, strollers, car seats, high chairs, baby baths, and related gear.

2. Bundles
   Curated packages for common family needs, such as arrival bundles, sleep bundles, car-and-city bundles, and full baby setups.

3. Welcome Kits
   One-time purchase kits with arrival-day consumables such as diapers, wipes, bath items, feeding items, and other essentials.

## Pilot Scope

The first launch is a Rabat-only pilot.

Delivery zones should focus on Rabat and nearby areas, including places such as Agdal, Hay Riad, Souissi, Hassan, L'Orangeraie, Témara, Harhoura, and optionally Rabat-Salé Airport.

The website should clearly explain that the pilot is intentionally local so Hababy & Co can guarantee quality, punctual delivery, and personal service.

## Version 1 Scope

Version 1 should include:

* Customer-facing marketing website
* Product catalogue
* Product detail pages
* Bundles
* Welcome Kits
* Request-to-book flow
* WhatsApp handoff
* Basic order capture
* Lightweight admin panel
* English and French language support
* Mobile-first design
* Deployment to Vercel

The customer-facing site should be built first.

The lightweight admin panel should come after the main customer journey is working.

## Non-Negotiable Business Rules

The following rules are core to the pilot and should be respected throughout the project.

### Request-first booking

The site should not offer instant purchase or instant confirmed booking.

The default flow is:

```text
Request to book → Hababy & Co confirms availability and delivery → payment is arranged offline before handover
```

After a request is submitted, the user should see a message similar to:

```text
We'll confirm availability and delivery within 24 hours.
```

### No same-day orders

Same-day delivery is not available during the pilot.

If the requested delivery time is less than 24 hours away, the site should block submission and explain that at least 24 hours' notice is required.

### No online payment in Version 1

The website should not process card payments or online checkout.

Payment is arranged manually before handover.

The website should record the customer's preferred payment method only.

### Full payment before handover

All fees and deposits should be collected offline before the items are handed over.

### Cash-first payment options

The pilot should support:

* MAD cash
* MAD bank transfer
* EUR cash
* USD cash

Card payment may exist in the future data structure but should be hidden or disabled in the pilot.

### Security deposit

Products and bundles may require a refundable security deposit.

Deposits should be shown in the customer estimate and managed in the admin panel.

### Admin-configurable fees

Prices, deposits, delivery zones, delivery fees, urgent fees, payment methods, FX rates, and WhatsApp number should be editable by the admin where possible.

### Rabat-only delivery

The website should not present Hababy & Co as a multi-city service at launch.

Multi-city expansion is out of scope for Version 1.

## MVP Definition

MVP means minimum viable product.

For this project, the MVP is not just a landing page. It should be a functional request-to-book website with enough structure to test the real business.

The MVP should allow a visitor to:

1. Understand the service.
2. Browse rental categories.
3. View products or bundles.
4. Add or request items.
5. Select rental dates and delivery details.
6. Submit a booking request.
7. Continue the conversation on WhatsApp.
8. Receive clear confirmation that availability will be confirmed within 24 hours.

The admin should allow the owner to manage the pilot without editing code.

## Out of Scope for Version 1

Version 1 should not include:

* Online card payment
* Automated WhatsApp chatbot
* Live FX rates
* Customer accounts
* Full inventory automation
* Reviews module
* Multi-city support
* Toy rentals
* Baby monitors, unless later demand justifies them
* Advanced analytics dashboard
* In-house studio photography pipeline

These can be reconsidered after the pilot.

## Preferred Technical Direction

Use the default stack for this workflow unless there is a clear reason to change:

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Supabase
* Vercel
* GitHub
* VS Code

Supabase is expected to be needed because the project includes booking requests, products, settings, admin management, and content.

## Default AI Workflow Roles

For this project, use the default AI workflow roles:

* Human: product owner and final decision-maker
* ChatGPT: teacher, strategist, documentation assistant
* Claude Code: planning, architecture, review
* Gemini: UI and visual direction
* Codex: main implementation agent
* DeepSeek or similar: lower-cost support for repetitive coding and refactoring
* GitHub: version history
* VS Code: local workspace
* Vercel: deployment
* Supabase: backend and database

These roles are defaults, not permanent rules.

The workflow is model-flexible. If a model is unavailable, too expensive, rate-limited, or underperforming, another model can take over the same role as long as it reads the relevant markdown files and updates the correct handoff documents.

## AI Workflow Learning Goal

This project is not only about building the Hababy & Co website.

It is also a learning project designed to prove that a non-coder can build a serious website by managing AI agents through a structured workflow.

The process should teach:

* How to create a clear project brief
* How to split one large developer handover into focused workflow documents
* How to use markdown files as handoffs between AI tools
* How to work in VS Code
* How to use GitHub safely
* How to ask AI agents for planning, design, coding, review, and testing
* How to avoid blindly trusting AI-generated code
* How to document decisions and lessons learned
* How to turn the finished build into a public case study

## Source Material

The original developer handover has been preserved as source material in:

```text
02-projects/project-001-first-website/99-source-materials/
```

That source document contains detailed brand, UI, product, backend, admin, copy, and acceptance-checklist information.

This project brief intentionally does not include every detail from the original handover.

Instead, the detailed material will be split into the correct workflow documents:

```text
01-product-requirements.md
03-architecture-plan.md
04-ui-brief.md
05-ui-handoff.md
06-backend-plan.md
07-test-plan.md
08-build-log.md
09-deployment-notes.md
10-linkedin-case-study.md
```

## Success Criteria

The project is successful if:

* The Hababy & Co website is live.
* Visitors can understand the service clearly.
* Visitors can request baby gear rental without confusion.
* No online payment is processed in Version 1.
* The request-first booking flow works.
* WhatsApp handoff works.
* Orders are saved.
* The owner can manage key content, products, orders, prices, and settings through a light admin panel.
* The website works well on mobile.
* English and French are supported.
* The process is documented clearly enough for another non-coder to learn from.
* The final project can become a LinkedIn case study.

## Current Status

* Main AI Website Workflow folder created.
* Workflow folder structure created.
* Source memory file added.
* `WORKFLOW_GUIDE.md` created.
* `AGENTS.md` created and updated with model flexibility.
* Original Hababy & Co developer handover moved into `99-source-materials`.
* This project brief is now being created.

## Next Step

After this file is saved, create:

```text
01-product-requirements.md
```

That document will translate this project brief into specific product requirements, customer journeys, pages, features, and acceptance criteria.
