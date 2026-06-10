# Project 001 — Deployment Notes

## Product Name

Hababy & Co

## Document Purpose

This document records how the Hababy & Co website should be deployed, configured, checked, and maintained.

It should be used by:

* The human product owner
* Codex or another coding agent
* Claude Code or another reviewer
* Any future developer or AI agent working on deployment

This document may remain partially incomplete until the actual application, GitHub repository, Supabase project, Vercel project, environment variables, and domain are created.

## Source Documents

This deployment notes document is based on:

```text
00-project-brief.md
01-product-requirements.md
03-architecture-plan.md
06-backend-plan.md
07-test-plan.md
99-source-materials/hababy-developer-handover-original.md
```

## Deployment Summary

Hababy & Co should be deployed using:

```text
GitHub for version control
Vercel for hosting
Supabase for database, authentication, and storage
```

The site should be deployed only after the core Version 1 rules have been tested:

* Request-first booking
* No online payment
* Same-day delivery blocked by default
* Orders saved before WhatsApp handoff
* Admin routes protected
* Mobile booking flow working
* English and French support working where promised

## Current Deployment Status

```text
Deployment status: GitHub repository created and first Vercel deployment completed; Supabase not yet started
GitHub repository: https://github.com/smashi9/hababy-co-website
Supabase project: TBD
Vercel project: https://hababy-co-website.vercel.app/
Production domain: TBD
Staging / preview URL: https://hababy-co-website.vercel.app/
```

## Hosting Platform

Use:

```text
Vercel
```

Reason:

* Best fit for Next.js
* Simple GitHub integration
* Preview deployments
* Easy environment variable management
* Good for fast iteration during the pilot

## Backend Platform

Use:

```text
Supabase
```

Supabase will provide:

* Postgres database
* Admin authentication
* Storage for uploaded product images, if used
* Backend data source for products, bundles, Welcome Kits, orders, settings, and content

## Version Control

Use:

```text
GitHub
```

GitHub should store:

* Application code
* Workflow markdown files
* Planning documents
* Change log
* Build log
* Deployment notes

Do not commit secrets.

Do not commit `.env.local`.

## Recommended Repository Name

Suggested repository name:

```text
hababy-co-website
```

Alternative:

```text
ai-website-workflow-project-001-hababy
```

Recommended:

```text
hababy-co-website
```

Reason:

It is cleaner for the real business website.

The AI workflow documentation can still live inside the repo.

## Deployment Environments

## Local Development

Used for building and testing on the computer.

Purpose:

* Run the app locally
* Test routes
* Test forms
* Test Supabase connection
* Test admin login
* Fix errors before deployment

Likely local command:

```bash
npm run dev
```

Local URL:

```text
http://localhost:3000
```

## Vercel Preview

Used after pushing changes to GitHub.

Purpose:

* Test the site in a real hosted environment
* Share with reviewers
* Test mobile devices
* Catch deployment issues
* Review before production

Preview URL:

```text
TBD
```

## Production

Used for the live public site.

Purpose:

* Real customer visits
* Real booking requests
* Real admin use

Production URL:

```text
TBD
```

## Required Accounts

Before deployment, the product owner should have access to:

```text
GitHub account
Vercel account
Supabase account
Domain registrar account, if using a custom domain
WhatsApp number for customer contact
Email address for customer contact
```

## Required Services

## GitHub

Needed for:

* Version control
* Vercel deployment connection
* Change history
* Safe rollback

## Vercel

Needed for:

* Hosting the Next.js app
* Preview deployments
* Production deployment
* Environment variables

## Supabase

Needed for:

* Database
* Admin auth
* Storage if product image uploads are enabled

## Domain Registrar

Needed if using a custom domain.

Potential domain:

```text
TBD
```

## WhatsApp

Needed for customer handoff.

WhatsApp number:

```text
TBD
```

This should be stored in Supabase settings and not hardcoded in multiple places.

## Email

Customer-facing email:

```text
TBD
```

Admin/account email:

```text
TBD
```

## Environment Variables

The app should use environment variables for configuration and secrets.

Expected variables:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL
```

Possible additional variables:

```text
ADMIN_ALLOWED_EMAILS
NEXT_PUBLIC_WHATSAPP_NUMBER
```

However, if WhatsApp number is stored in Supabase settings, `NEXT_PUBLIC_WHATSAPP_NUMBER` may not be needed.

## Environment Variable Rules

```text
.env.local should exist only locally
.env.local must not be committed to GitHub
.env.example should be committed
Production secrets should be stored in Vercel
Service role key must never be exposed to the browser
Only NEXT_PUBLIC_ variables can be used in browser/client code
```

## Suggested `.env.example`

Create a file called:

```text
.env.example
```

Suggested contents:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
ADMIN_ALLOWED_EMAILS=
```

Do not put real secret values in `.env.example`.

## Supabase Setup Checklist

Before connecting the app to Supabase:

```text
[ ] Create Supabase project
[ ] Save project URL
[ ] Save anon public key
[ ] Save service role key securely
[ ] Create database tables
[ ] Enable Row Level Security where appropriate
[ ] Create storage buckets if image uploads are used
[ ] Create admin user
[ ] Seed categories
[ ] Seed products
[ ] Seed bundles
[ ] Seed Welcome Kits
[ ] Seed settings
[ ] Seed content
[ ] Test public read access
[ ] Test booking submission
[ ] Test admin access
```

## Supabase Tables Expected

The backend plan defines these expected tables:

```text
categories
products
bundles
accessories
welcome_kits
customers
orders
inventory
settings
content
```

The `inventory` table may be light or optional in Version 1.

## Supabase Storage Buckets

Possible buckets:

```text
product-images
bundle-images
welcome-kit-images
content-images
```

Brand logos are confirmed local SVG files and should be handled as project/public assets rather than uploaded to Supabase.

Expected brand files:

```text
hababy-logo-primary.svg
hababy-logo-horizontal.svg
hababy-stork-mark.svg
```

## Brand Asset Deployment

Confirmed brand source folder:

```text
assets/brand/
```

Recommended runtime public folder inside the Next.js app:

```text
public/brand/
```

Expected files in runtime public folder:

```text
public/brand/hababy-logo-primary.svg
public/brand/hababy-logo-horizontal.svg
public/brand/hababy-stork-mark.svg
```

Before deployment, check:

```text
[ ] Header logo loads
[ ] Primary logo loads where used
[ ] Stork mark loads where used
[ ] Favicon works if implemented
[ ] SVGs are not distorted
[ ] Logo paths work in Vercel preview
```

## Vercel Setup Checklist

```text
[ ] Create Vercel account or log in
[ ] Import GitHub repository
[ ] Select correct project
[ ] Confirm framework is Next.js
[ ] Add environment variables
[ ] Deploy preview
[ ] Check build logs
[ ] Fix any build errors
[ ] Test preview URL
[ ] Connect custom domain if ready
[ ] Deploy production
```

## Vercel Project Settings

Framework:

```text
Next.js
```

Build command:

```bash
npm run build
```

Development command:

```bash
npm run dev
```

Install command:

```bash
npm install
```

Output directory:

```text
Default for Next.js
```

If the Next.js app is created inside a subfolder, Vercel must be pointed to that subfolder.

Current recommendation:

```text
Create the app directly inside project-001-first-website/
```

unless later changed.

## Deployment Branches

Recommended branches:

```text
main = production-ready branch
feature branches = work in progress
```

For a beginner workflow, it is acceptable to start with:

```text
main only
```

But once the project grows, use feature branches for larger changes.

## Pre-Deployment Local Checks

Before pushing to GitHub or deploying to Vercel, run:

```bash
npm run lint
npm run build
```

If tests are added later:

```bash
npm run test
```

Do not deploy production if:

```text
Build fails
Lint errors are serious
Booking flow is broken
Admin routes are exposed
Environment variables are missing
```

## Preview Deployment Checklist

After Vercel creates a preview URL, test:

```text
[ ] Homepage loads
[ ] Navigation works
[ ] Brand assets load
[ ] Rent page loads
[ ] Product detail page loads
[ ] Bundles page loads
[ ] Welcome Kits page loads
[ ] Booking page loads
[ ] Booking submission works
[ ] Same-day block works
[ ] WhatsApp handoff works
[ ] Admin login works
[ ] Admin products page works
[ ] Admin orders page works
[ ] English works
[ ] French works, if implemented
[ ] Mobile layout works
[ ] No online payment appears
```

## Production Deployment Checklist

Before production launch:

```text
[ ] Production domain confirmed
[ ] Production environment variables added
[ ] Supabase production project confirmed
[ ] Admin account created
[ ] WhatsApp number confirmed
[ ] Contact email confirmed
[ ] Product prices reviewed
[ ] Deposit amounts reviewed
[ ] Delivery zones reviewed
[ ] Payment copy reviewed
[ ] Cancellation policy reviewed
[ ] Deposit policy reviewed
[ ] Privacy policy reviewed
[ ] Terms reviewed
[ ] English content reviewed
[ ] French content reviewed
[ ] Mobile booking flow approved
[ ] Test order submitted successfully
[ ] Test order appears in admin
[ ] Test WhatsApp message works
[ ] Test order deleted/cancelled or clearly marked as test
```

## Launch Blockers

Do not launch if:

```text
[ ] Booking requests do not save
[ ] Same-day requests are not blocked
[ ] Online payment appears anywhere
[ ] Admin routes are publicly accessible
[ ] Customer personal data is exposed
[ ] WhatsApp number is wrong
[ ] Production site has placeholder contact information
[ ] Production site has placeholder legal copy
[ ] Mobile booking flow is unusable
[ ] Confirmation message is missing or misleading
[ ] Product prices or deposits are misleading
[ ] French/English routing is broken if both are promised at launch
```

## Domain Setup

Production domain:

```text
TBD
```

Possible steps:

```text
[ ] Buy or confirm domain
[ ] Add domain to Vercel
[ ] Update DNS records at registrar
[ ] Wait for DNS propagation
[ ] Confirm HTTPS works
[ ] Confirm www/non-www behavior
[ ] Update NEXT_PUBLIC_SITE_URL
[ ] Test production links
```

## SEO Deployment Notes

Before launch, confirm:

```text
[ ] Homepage title is specific
[ ] Homepage meta description is useful
[ ] Main pages have titles
[ ] Main pages have descriptions
[ ] Open Graph metadata exists where practical
[ ] No test titles remain
[ ] No placeholder descriptions remain
[ ] Sitemap is added if practical
[ ] Robots.txt is added if practical
```

Suggested SEO themes:

```text
baby gear rental Rabat
baby equipment rental Rabat
stroller rental Rabat
travel cot rental Rabat
car seat rental Rabat
baby gear delivery Rabat
```

SEO should be natural, not keyword-stuffed.

## Analytics Deployment Notes

Analytics are optional for Version 1.

Possible options:

```text
Vercel Analytics
Plausible
Google Analytics 4
```

Decision:

```text
TBD
```

Do not delay launch for advanced analytics unless specifically required.

## Email and Notifications

Version 1 does not require automated email notifications.

Possible future email features:

```text
Customer confirmation email
Admin notification email
Payment reminder email
Return reminder email
Deposit refund reminder email
```

Decision for Version 1:

```text
No automated email required unless later added.
```

## WhatsApp Deployment Notes

WhatsApp is required as a communication handoff.

Before launch:

```text
[ ] Confirm WhatsApp number
[ ] Add WhatsApp number to settings
[ ] Test floating WhatsApp button
[ ] Test post-booking WhatsApp link
[ ] Check message formatting
[ ] Check message includes order summary
[ ] Check message does not include internal notes
```

## Admin Deployment Notes

Before launch:

```text
[ ] Admin login works
[ ] Only approved admin can access
[ ] Admin can update products
[ ] Admin can update bundles
[ ] Admin can update Welcome Kits
[ ] Admin can view orders
[ ] Admin can update order status
[ ] Admin can update settings
[ ] Admin can edit content if feature is included
```

## Data Privacy Notes

The site will collect:

```text
Customer name
Customer phone
Optional email
Delivery details
Baby age/weight/height where relevant
Order details
Payment preference
```

Before launch:

```text
[ ] Privacy policy mentions collected data
[ ] Customer data is not publicly visible
[ ] Admin routes are protected
[ ] Sensitive Supabase keys are secure
[ ] Internal notes are never exposed publicly
```

## Backup and Rollback Notes

For the pilot:

```text
[ ] Use GitHub history for code rollback
[ ] Use Vercel deployment history for deployment rollback
[ ] Use Supabase backups where available
[ ] Avoid hard deletes in admin
[ ] Prefer active/inactive flags for products
```

If something breaks after deployment:

```text
1. Identify whether issue is code, environment variable, Supabase, or content.
2. If code issue, roll back to previous Vercel deployment.
3. If data issue, fix through admin or Supabase.
4. Record incident in build log.
5. Add prevention step to test plan if needed.
```

## Post-Launch Monitoring

After launch, check:

```text
[ ] Can visitors load the site?
[ ] Are booking requests arriving?
[ ] Are WhatsApp messages formatted correctly?
[ ] Are customers confused about request-first booking?
[ ] Are customers confused about payment/deposit?
[ ] Are any products missing key information?
[ ] Are mobile users completing the flow?
[ ] Is admin manageable for owner?
```

## First Live Test Order

After production deployment, create one test order.

Record:

```text
Test order date:
Test customer name:
Selected product/bundle:
Rental dates:
Delivery zone:
Payment preference:
Order saved in admin: yes/no
WhatsApp link worked: yes/no
Admin status update worked: yes/no
Issues found:
Fixes needed:
```

After testing, mark the order as:

```text
cancelled
```

or clearly label it as a test in internal notes.

## Deployment Notes Acceptance Criteria

This deployment notes document is acceptable when it explains:

* Which platforms are used
* Which accounts are needed
* Which environment variables are expected
* How Supabase should be prepared
* How Vercel should be configured
* How brand assets should be handled
* What needs to be tested before preview deployment
* What needs to be tested before production launch
* What launch blockers exist
* What remains TBD until the app and accounts are created

## Current TBD List

The following items are still unknown:

```text
GitHub repository URL
Supabase project URL
Vercel project https://hababy-co-website.vercel.app/
Production domain
WhatsApp number
Contact email
Admin email
Final product prices
Final deposit amounts
Final delivery fees
Analytics decision
Legal/policy final copy
```

These should be filled in as the project moves from planning into implementation.

## Next Workflow Step

After this document is saved, create:

```text
02-repo-context.md
```

That file should describe the actual repository once it exists.

For now, `02-repo-context.md` can be a placeholder because the app has not yet been created.

The next practical step after documentation is likely:

```text
Set up the GitHub repository and create the actual Next.js app.
```
