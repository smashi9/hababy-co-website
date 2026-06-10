# Project 001 — Architecture Plan

## Product Name

Hababy & Co

## Document Purpose

This document defines the technical architecture for the Hababy & Co website.

It explains how the application should be structured before coding begins.

This document should be used by:

* Claude Code for architecture review and planning
* Codex for implementation
* DeepSeek or another coding model for support tasks
* ChatGPT for explanation and documentation
* The human product owner to understand how the site is built

This document focuses on:

* Application structure
* Technical stack
* Routing
* Data flow
* Authentication approach
* Internationalization
* Admin architecture
* Deployment approach
* Development rules

It does not contain the full database schema. The detailed database, tables, fields, and backend logic belong in:

```text
06-backend-plan.md
```

It does not contain the visual design system. That belongs in:

```text
04-ui-brief.md
```

## Source Documents

This architecture plan is based on:

```text
00-project-brief.md
01-product-requirements.md
04-ui-brief.md
99-source-materials/hababy-developer-handover-original.md
```

## Architecture Summary

Hababy & Co should be built as a modern full-stack web application using:

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
```

The customer-facing site should be built first.

The lightweight admin panel should be built after the core customer journey works.

The application should support:

* Marketing pages
* Product catalogue
* Product detail pages
* Bundles
* Welcome Kits
* Request-to-book flow
* WhatsApp handoff
* Order capture
* Admin panel
* English and French
* Future Arabic support
* Deployment to Vercel

## Core Architecture Principle

The site should be simple, maintainable, and pilot-friendly.

Do not over-engineer.

The goal is not to build a perfect enterprise rental platform on day one.

The goal is to build a clean, real, functional pilot that can later grow.

## Recommended Stack

## Frontend Framework

Use:

```text
Next.js with App Router
```

Reason:

* Good for marketing pages and application flows
* Works well with Vercel
* Supports server components and client components
* Strong ecosystem
* Suitable for static pages and dynamic data
* Good long-term choice for multilingual websites

## Language

Use:

```text
TypeScript
```

Reason:

* Safer than plain JavaScript
* Helps AI coding agents avoid mistakes
* Makes data structures clearer
* Useful for product, order, and admin types

## Styling

Use:

```text
Tailwind CSS
```

Reason:

* Fast to build with
* Works well with shadcn/ui
* Easy to apply the brand colour system
* Good for responsive design

## UI Components

Use:

```text
shadcn/ui
```

Reason:

* Gives clean, accessible component foundations
* Works well with Tailwind CSS
* Easier to customize than many component libraries
* Good for forms, dialogs, buttons, cards, tabs, tables, and admin UI

## Icons

Use:

```text
lucide-react
```

Reason:

* Clean outline icon style
* Matches the UI brief
* Large icon library
* Works well with React and Tailwind

If a custom brand icon set is later created, it can replace or supplement lucide-react.

## Backend, Database, Auth, and Storage

Use:

```text
Supabase
```

For:

* Postgres database
* Admin authentication
* File/image storage
* Server-side data access
* Future expansion

Reason:

* Cost-efficient for pilot
* Fast to set up
* Works well with Next.js
* Provides database, auth, and storage in one platform
* Suitable for lightweight admin panel

## Hosting

Use:

```text
Vercel
```

Reason:

* Best fit for Next.js
* Simple deployment from GitHub
* Good preview deployments
* Easy environment variable setup
* Suitable for a public pilot website

## Forms and Validation

Use:

```text
react-hook-form
zod
```

Reason:

* `react-hook-form` manages form state efficiently
* `zod` validates form data clearly
* Together they are useful for booking requests, admin forms, product forms, and settings forms

## Internationalization

Use:

```text
next-intl
```

Reason:

* Supports English and French at launch
* Can support Arabic later
* Encourages structured translation files
* Avoids hardcoding copy into components

## Architecture Scope for Version 1

Version 1 should include:

* Customer-facing marketing pages
* Product catalogue
* Product detail pages
* Bundles
* Welcome Kits
* Six-step request-to-book flow
* WhatsApp handoff
* Supabase order capture
* Lightweight admin panel
* Admin authentication
* Admin CRUD for pilot operations
* English and French content
* Deployment to Vercel

Version 1 should not include:

* Online payment processing
* Automated WhatsApp chatbot
* Customer accounts
* Multi-city architecture
* Live FX integrations
* Advanced analytics dashboard
* Full automated inventory availability engine
* Reviews module

## Recommended Project Structure

The Next.js application should use a structure similar to this:

```text
/app
  /[locale]
    /(marketing)
      /page.tsx
      /how-it-works
        /page.tsx
      /safety-cleaning
        /page.tsx
      /faq
        /page.tsx
      /about
        /page.tsx
      /delivery-zones
        /page.tsx
      /terms
        /page.tsx
      /privacy
        /page.tsx
      /deposit-policy
        /page.tsx
      /cancellation-policy
        /page.tsx

    /rent
      /page.tsx
      /[slug]
        /page.tsx

    /bundles
      /page.tsx
      /[slug]
        /page.tsx

    /welcome-kits
      /page.tsx
      /[slug]
        /page.tsx

    /book
      /page.tsx
      /confirmation
        /page.tsx

    /admin
      /page.tsx
      /login
        /page.tsx
      /products
        /page.tsx
      /bundles
        /page.tsx
      /welcome-kits
        /page.tsx
      /orders
        /page.tsx
      /orders/[id]
        /page.tsx
      /settings
        /page.tsx
      /content
        /page.tsx

/components
  /layout
  /marketing
  /catalogue
  /product
  /booking
  /admin
  /ui

/lib
  /supabase
  /validation
  /pricing
  /whatsapp
  /i18n
  /utils

/messages
  en.json
  fr.json

/types
  product.ts
  bundle.ts
  welcome-kit.ts
  order.ts
  customer.ts
  settings.ts

/public
  /brand
  /images
```

## Important Folder Clarification

The workflow documents currently live outside the actual Next.js app.

Current planning folder:

```text
02-projects/project-001-first-website/
```

When the real Next.js application is created, there are two acceptable options.

## Option A — App inside the project folder

Create the app directly inside:

```text
02-projects/project-001-first-website/
```

This means the folder contains both:

```text
Workflow markdown files
Next.js application files
```

Pros:

* Everything for Project 001 is in one place.
* Easier for a beginner to understand.
* AI agents can see the planning docs and the code together.

Cons:

* The folder may feel crowded.

## Option B — App in a subfolder

Create the app inside:

```text
02-projects/project-001-first-website/app/
```

or:

```text
02-projects/project-001-first-website/hababy-site/
```

Pros:

* Keeps planning docs separate from code.
* Cleaner separation.

Cons:

* Some AI coding agents may need clearer instructions about where the app lives.
* Deployment setup needs to point to the app subfolder.

## Recommended Choice

Use Option A for this project unless there is a strong reason not to.

Reason:

This is a learning project. Keeping planning documents and code in one project folder makes the AI handoff process easier to understand.

The markdown files should remain in place and should not be deleted when the Next.js app is created.

## Routing Strategy

Use locale-based routing.

Recommended public route pattern:

```text
/en
/fr
```

Examples:

```text
/en
/fr
/en/rent
/fr/rent
/en/rent/travel-cot
/fr/rent/lit-bebe-voyage
/en/book
/fr/book
```

If the implementation becomes too complex at the beginning, English can be built first with French structure prepared.

However, the architecture should not block French launch.

## Public Routes

The public site should include:

```text
/
/rent
/rent/[slug]
/bundles
/bundles/[slug]
/welcome-kits
/welcome-kits/[slug]
/book
/how-it-works
/safety-cleaning
/faq
/about
/delivery-zones
/terms
/privacy
/deposit-policy
/cancellation-policy
```

If using locale routing, these sit under:

```text
/[locale]/
```

## Admin Routes

Admin routes should sit under:

```text
/[locale]/admin
```

or, if simpler:

```text
/admin
```

Recommended:

```text
/admin
```

Reason:

The admin panel does not need full public multilingual routing in Version 1.

The public site needs English and French. The admin can initially be English only, unless the owner specifically wants French admin support.

Admin routes should include:

```text
/admin/login
/admin
/admin/products
/admin/bundles
/admin/welcome-kits
/admin/orders
/admin/orders/[id]
/admin/settings
/admin/content
```

## Data Architecture Overview

Supabase should store:

* Categories
* Products
* Bundles
* Accessories
* Welcome Kits
* Customers
* Orders
* Inventory, optional or light in Version 1
* Settings
* Content

The full schema belongs in:

```text
06-backend-plan.md
```

This architecture plan only confirms that Supabase is the backend source of truth.

## Data Access Strategy

Use a simple data access layer in:

```text
/lib/supabase
```

Recommended files:

```text
/lib/supabase/client.ts
/lib/supabase/server.ts
/lib/supabase/admin.ts
/lib/supabase/queries.ts
/lib/supabase/mutations.ts
```

Purpose:

* Keep Supabase setup in one place.
* Avoid repeating database code across components.
* Make it easier for AI agents to understand how data is fetched and written.
* Make future refactoring easier.

## Type Strategy

Create TypeScript types in:

```text
/types
```

Recommended files:

```text
/types/product.ts
/types/bundle.ts
/types/welcome-kit.ts
/types/order.ts
/types/customer.ts
/types/settings.ts
```

Later, once Supabase tables are created, generated Supabase types can be added.

Do not block the early planning stage on generated types.

## Component Architecture

Components should be grouped by purpose.

## Layout Components

Path:

```text
/components/layout
```

Examples:

```text
SiteHeader.tsx
SiteFooter.tsx
MobileNav.tsx
LanguageSwitcher.tsx
WhatsAppFloatingButton.tsx
```

## Marketing Components

Path:

```text
/components/marketing
```

Examples:

```text
HeroSection.tsx
ValueProps.tsx
HowItWorksSteps.tsx
AudienceStrip.tsx
DeliveryZonesPreview.tsx
TrustSection.tsx
FinalCTA.tsx
```

## Catalogue Components

Path:

```text
/components/catalogue
```

Examples:

```text
CategoryFilter.tsx
ProductGrid.tsx
ProductCard.tsx
AvailabilityBadge.tsx
DateRangeFilter.tsx
```

## Product Components

Path:

```text
/components/product
```

Examples:

```text
ProductGallery.tsx
PricingBlock.tsx
DepositNotice.tsx
IncludedItems.tsx
AddOnsSelector.tsx
SafetyNotes.tsx
RequestItemCTA.tsx
```

## Booking Components

Path:

```text
/components/booking
```

Examples:

```text
BookingStepper.tsx
DatesDeliveryStep.tsx
BabyDetailsStep.tsx
ItemsStep.tsx
OrderSummaryStep.tsx
ContactPaymentStep.tsx
BookingConfirmation.tsx
```

## Admin Components

Path:

```text
/components/admin
```

Examples:

```text
AdminShell.tsx
AdminSidebar.tsx
AdminTable.tsx
AdminForm.tsx
OrderStatusBadge.tsx
SettingsForm.tsx
ContentEditor.tsx
```

## Shared UI Components

Path:

```text
/components/ui
```

This is where shadcn/ui components should live.

Examples:

```text
button.tsx
card.tsx
input.tsx
select.tsx
dialog.tsx
table.tsx
badge.tsx
form.tsx
tabs.tsx
```

## Client and Server Component Strategy

Use server components by default where possible.

Use client components when needed for:

* Forms
* Stepper interactions
* Date pickers
* Filters
* Admin editing
* Dialogs
* Interactive selectors
* WhatsApp button interactions where necessary

Rule:

```text
Default to server components.
Use client components only when interactivity requires them.
```

## Booking Flow Architecture

The booking flow should be a guided multi-step request form.

Recommended route:

```text
/book
```

The form should support six steps:

1. Dates and delivery
2. Baby details
3. Items
4. Order summary
5. Contact and payment preference
6. Submit and confirmation

## Booking State

Booking state can begin as client-side state.

Recommended approach:

* Use a single booking form component.
* Use `react-hook-form` for state management.
* Use `zod` for validation.
* Save the final request to Supabase only on submission.

Do not overbuild persistent carts or customer accounts in Version 1.

## Booking Submission

On successful submission:

1. Validate form data.
2. Check same-day rule.
3. Calculate estimate.
4. Create or update customer record.
5. Create order record with status `new`.
6. Show confirmation.
7. Generate WhatsApp pre-filled message.
8. Offer button to continue on WhatsApp.

The order must be saved even if the user does not click WhatsApp.

## Same-Day Rule

The same-day rule should be enforced before order submission.

Business rule:

```text
If requested delivery is less than 24 hours away, block submission.
```

Show copy similar to:

```text
Same-day delivery isn't currently available — please request at least 24 hours ahead.
```

## Pricing Architecture

Pricing should be handled in a dedicated utility file.

Recommended path:

```text
/lib/pricing/calculateEstimate.ts
```

This file should calculate:

* Rental subtotal
* Add-ons total
* Welcome Kit total
* Delivery fee
* Urgent fee, if enabled
* Deposit
* Estimated total

Pricing should use settings from Supabase where practical.

Do not hardcode final business prices in components.

Placeholder seed prices are allowed during development.

## WhatsApp Architecture

WhatsApp handoff should be handled in a dedicated utility file.

Recommended path:

```text
/lib/whatsapp/createWhatsAppLink.ts
```

This utility should:

* Accept an order summary
* Accept the admin-configured WhatsApp number
* Encode the message safely
* Return a `https://wa.me/...` link

The WhatsApp feature is not a chatbot.

It is only a click-to-chat handoff.

## Payment Architecture

Version 1 should not include online payment processing.

There should be:

* No Stripe integration
* No PayPal integration
* No card checkout
* No online payment page

The site should only record the customer's preferred payment method.

Payment methods:

```text
MAD cash
MAD bank transfer
EUR cash
USD cash
```

Card can exist as a future concept in the backend plan, but it should be hidden or disabled in Version 1.

## Currency Architecture

Base currency:

```text
MAD
```

EUR and USD should be handled as approximate offline cash acceptance options.

Manual FX rates should be stored in settings.

The site may show approximate equivalents, but must clearly label them as approximate and manually confirmed.

No live FX API should be used in Version 1.

## Internationalization Architecture

Use:

```text
next-intl
```

Recommended translation files:

```text
/messages/en.json
/messages/fr.json
```

Rules:

* Do not hardcode public-facing text in components unless temporary.
* Use translation keys for marketing copy, labels, buttons, validation messages, and confirmation text.
* Leave room for longer French text.
* Avoid text embedded inside images.
* Structure the app so Arabic can be added later.

Future Arabic support should consider:

* RTL layout
* Arabic translation file
* Font support
* Mirrored spacing where needed

Arabic does not need to launch in Version 1.

## Admin Architecture

The admin panel should be protected using Supabase Auth.

Version 1 should support one owner/admin.

No public sign-up.

## Admin Authentication

Recommended approach:

* Supabase Auth
* Admin login page
* Protected admin layout
* Redirect unauthenticated users to admin login
* Use one approved admin account

If role-based access is needed later, it can be added.

For Version 1, keep it simple.

## Admin Features

The admin should support:

* Products CRUD
* Bundles CRUD
* Welcome Kits CRUD
* Orders management
* Settings management
* Content editing

The admin should use simple tables and forms.

Do not overdesign the admin.

## Storage Architecture

Use Supabase Storage for product and brand-related uploads if needed.

However, confirmed brand assets are already local SVG files and should live in:

```text
assets/brand/
```

or be copied into the Next.js public folder during implementation.

Recommended public asset path inside the Next.js app:

```text
/public/brand/
```

Expected logo files:

```text
/public/brand/hababy-logo-primary.svg
/public/brand/hababy-logo-horizontal.svg
/public/brand/hababy-stork-mark.svg
```

Product images may start as:

* Seed images
* Manufacturer images
* Supabase Storage uploads
* Local placeholders

Do not let missing product photography block the first build.

## Brand Asset Architecture

During implementation, the confirmed SVG logos should be made available to the app.

Source planning asset location:

```text
assets/brand/
```

Runtime public asset location:

```text
/public/brand/
```

Implementation agent should copy or reference the SVGs appropriately.

The app should not assume optional assets exist.

Confirmed assets:

```text
hababy-logo-primary.svg
hababy-logo-horizontal.svg
hababy-stork-mark.svg
```

Optional future assets:

```text
app icon
badge / stamp
one-colour logo
reversed white logo
```

## Environment Variables

The app should use environment variables for secrets and configuration.

Expected variables may include:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL
```

If using next-intl or other libraries, additional variables may be needed.

Rules:

* Do not commit `.env.local`.
* Keep `.env.example` with placeholder variable names.
* Store production secrets in Vercel.
* Use service role key only on the server.
* Never expose service role key to the browser.

## Security Principles

Important rules:

* Admin routes must be protected.
* Public users should not be able to access admin data.
* Public users should not be able to modify products, settings, or content.
* Supabase Row Level Security should be considered in the backend plan.
* Sensitive environment variables must not be exposed to client components.
* Do not add online payments in Version 1.
* Do not allow public account creation in Version 1.

## SEO and Metadata Architecture

The public site should include basic SEO metadata.

Each main page should have:

* Title
* Description
* Open Graph title
* Open Graph description
* Open Graph image if available
* Canonical URL where appropriate

Important SEO themes:

```text
baby gear rental Rabat
baby equipment rental Rabat
stroller rental Rabat
travel cot rental Rabat
car seat rental Rabat
baby gear delivery Rabat
```

SEO should be useful but not spammy.

## Analytics

Analytics are optional for Version 1.

If added, use a privacy-conscious and simple setup.

Do not delay the build for advanced analytics.

Possible later options:

* Vercel Analytics
* Plausible
* Google Analytics 4

This should be decided later.

## Error Handling

The app should handle common errors clearly.

Examples:

* Booking submission failed
* Product not found
* Missing required baby details
* Same-day delivery blocked
* Admin login failed
* Image upload failed
* Settings failed to save

Error messages should be clear and beginner-friendly.

Avoid technical messages shown to customers.

## Loading and Empty States

The app should include clear loading and empty states.

Examples:

* Loading catalogue
* No products in this category
* No bundles available yet
* No orders found
* Settings saved
* Content updated

Do not leave blank screens.

## Performance Principles

The site should be fast and mobile-friendly.

Use:

* Optimized images
* Server rendering where useful
* Minimal unnecessary dependencies
* Lightweight animations only
* Clean component structure

Avoid:

* Heavy animation libraries in Version 1
* Large unoptimized image files
* Overly complex state management
* Unnecessary client-side rendering

## Accessibility Principles

The app should support:

* Keyboard-accessible forms and buttons
* Proper labels for form fields
* Clear focus states
* Sufficient colour contrast
* Alt text for images
* Semantic headings
* Accessible dialogs and menus through shadcn/ui

Accessibility should not be treated as a final polish step only.

## Testing Architecture Overview

Testing details belong in:

```text
07-test-plan.md
```

However, the architecture should support testing of:

* Same-day block
* Booking submission
* WhatsApp link generation
* Pricing estimate calculation
* Admin authentication
* Product management
* Language switching
* Mobile responsiveness

## Development Workflow

Use GitHub for version control.

Recommended process:

1. Create or update a markdown planning document.
2. Ask an AI agent to plan the implementation.
3. Review the plan before coding.
4. Implement in small steps.
5. Test locally.
6. Commit changes.
7. Update the build log.
8. Deploy preview to Vercel.
9. Review preview.
10. Fix issues.
11. Deploy production when ready.

## Suggested Build Sequence

Build in this order:

## Phase 1 — Foundation

Set up:

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Basic routing
* Brand theme
* Fonts
* Logo assets
* English/French i18n structure
* Supabase connection
* Environment variables

## Phase 2 — Public Marketing Pages

Build:

* Home
* How It Works
* Safety & Cleaning
* FAQ
* About
* Delivery Zones
* Legal/policy pages

## Phase 3 — Catalogue

Build:

* Categories
* Product cards
* Product detail pages
* Bundles
* Welcome Kits
* Seed data

## Phase 4 — Booking Flow

Build:

* Six-step request form
* Same-day block
* Estimate calculation
* Order summary
* Contact and payment preference
* Supabase order save
* Confirmation
* WhatsApp handoff

## Phase 5 — Light Admin

Build:

* Admin login
* Admin shell
* Products CRUD
* Bundles CRUD
* Welcome Kits CRUD
* Orders list and detail
* Settings
* Content editing

## Phase 6 — Trust, Polish, QA, and Deployment

Build or improve:

* Safety and cleaning trust sections
* Mobile polish
* French copy
* SEO metadata
* Error states
* Empty states
* Vercel deployment
* Final QA

## AI Agent Handoff Guidance

Before any coding agent starts implementation, it should read:

```text
AGENTS.md
00-project-brief.md
01-product-requirements.md
03-architecture-plan.md
04-ui-brief.md
06-backend-plan.md, once created
07-test-plan.md, once created
```

The coding agent should not rely only on this architecture plan.

It must understand the product and UI context too.

## Architecture Acceptance Criteria

The architecture is acceptable when:

* It uses Next.js App Router and TypeScript.
* It uses Tailwind CSS and shadcn/ui.
* It uses Supabase for database, auth, and storage where needed.
* It uses Vercel for deployment.
* It supports English and French.
* It does not block future Arabic support.
* It supports the request-first booking model.
* It does not include online payment processing in Version 1.
* It supports WhatsApp handoff without building a chatbot.
* It supports admin authentication.
* It supports a lightweight owner admin panel.
* It keeps pricing logic out of UI components.
* It keeps WhatsApp link generation in a utility.
* It keeps Supabase access organized.
* It uses confirmed SVG brand assets.
* It avoids over-engineering.
* It is understandable for a non-coder using AI agents.

## Open Architecture Questions

These questions do not block the next workflow step, but should be resolved before implementation:

1. Should the Next.js app be created directly inside `project-001-first-website/` or inside a subfolder?
2. Should public routes use `/en` and `/fr` from the start, or should English be built first and French added immediately after?
3. Should the admin panel be English-only in Version 1?
4. Will product images be local placeholders, manufacturer images, or Supabase uploads during the first build?
5. Should Supabase Storage be used from the beginning or added when admin image upload is built?
6. Should analytics be included in Version 1 or postponed?
7. What exact domain will be used for Vercel deployment?
8. Should legal pages be editable through admin from day one or initially stored as static content?
9. Should content editing be built in the first admin version or after product/order management?
10. Should inventory tracking be included lightly in Version 1 or postponed after pilot validation?


