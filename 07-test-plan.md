# Project 001 — Test Plan

## Product Name

Hababy & Co

## Document Purpose

This document defines how the Hababy & Co website should be tested before launch.

It is written for:

* The human product owner
* Codex or another coding agent
* Claude Code or another reviewer
* ChatGPT as teacher/documentation helper
* Any future developer or AI agent working on the project

The purpose of this test plan is to make sure the website works as intended, follows the business rules, protects the pilot scope, and does not silently introduce risky features.

## Source Documents

This test plan is based on:

```text
00-project-brief.md
01-product-requirements.md
03-architecture-plan.md
04-ui-brief.md
06-backend-plan.md
99-source-materials/hababy-developer-handover-original.md
```

## Testing Philosophy

The goal is not just to check whether the site “looks fine.”

The goal is to confirm that the website:

* Explains the service clearly
* Works on mobile
* Supports request-first booking
* Blocks same-day requests
* Does not process online payments
* Saves orders correctly
* Generates WhatsApp handoff correctly
* Lets the owner manage key business data
* Protects customer information
* Works in English and French
* Feels trustworthy and easy for parents to use

## Testing Levels

Testing should happen at several levels:

```text
1. Content and business-rule testing
2. UI and mobile testing
3. Customer journey testing
4. Booking flow testing
5. Backend and database testing
6. Admin panel testing
7. Language testing
8. Security testing
9. Deployment testing
10. Final launch readiness testing
```

## Test Environments

## Local Development

Used while building.

Purpose:

* Check pages load
* Check components render
* Check forms work
* Check Supabase connection
* Check errors before committing

## Vercel Preview Deployment

Used before public launch.

Purpose:

* Test the website as a real visitor would see it
* Test mobile on real devices
* Share preview with reviewers
* Catch deployment-specific issues

## Production Deployment

Used only after the site passes launch checks.

Purpose:

* Public-facing site
* Real customer requests
* Final live version

## Core Business Rules to Test

These rules are non-negotiable for Version 1.

## Rule 1 — Request-first booking

The site must not behave like instant checkout.

Expected behavior:

* Customer submits a booking request.
* Order is saved with status `new`.
* Confirmation says availability and delivery will be confirmed within 24 hours.
* No copy should imply that the booking is instantly confirmed.

Pass condition:

```text
The customer clearly understands this is a request, not an instant confirmed order.
```

Fail examples:

```text
Button says "Buy now"
Confirmation says "Your booking is confirmed"
Customer is asked to pay online
Availability appears guaranteed without review
```

## Rule 1A — Availability check before request

The catalogue must not let customers request products with zero usable stock.

Usable inventory means:

```text
status = available
cleaning_status = clean
current_order_id is null
```

Expected behavior:

* Product has at least one usable stock unit -> customer may click `Request a booking`.
* Product has zero usable stock units -> customer sees `Currently unavailable`.
* Products with zero usable units do not show an active request CTA.
* A requestable product still does not imply instant confirmation.

Pass condition:

```text
Inventory controls whether the customer may request the product, and Hababy & Co still confirms condition, cleanliness, requested dates, delivery feasibility, payment/deposit, and handover details before approval.
```

Fail examples:

```text
Product with no usable stock can still be requested
Product with usable stock says confirmed or guaranteed
Unavailable product shows a live request CTA
```

## Rule 2 — No same-day orders

Same-day delivery is not available by default.

Expected behavior:

* If requested delivery is less than 24 hours away, submission is blocked.
* The user sees a clear message explaining that same-day delivery is not currently available.
* No order is created if the request is blocked.

Pass condition:

```text
Requests under 24 hours cannot be submitted unless the owner explicitly changes this rule later.
```

Expected message:

```text
Same-day delivery isn't currently available — please request at least 24 hours ahead.
```

## Rule 3 — No online payment

Version 1 must not include online payment processing.

Expected behavior:

* No Stripe checkout
* No PayPal checkout
* No card payment form
* No “pay now” button
* No card details collected
* Payment method preference is recorded only

Pass condition:

```text
The site records payment preference but does not collect or process payment online.
```

## Rule 4 — Offline full payment before handover

Expected behavior:

* Customer-facing copy explains that payment and deposit are arranged before delivery.
* Admin can record payment method, currency, amount received, and notes.
* The system does not automate collection or refund.

Pass condition:

```text
Payment is operationally tracked, not processed online.
```

## Rule 5 — MAD base currency

Expected behavior:

* All stored prices are in MAD.
* EUR and USD are treated as offline cash options.
* Any EUR/USD equivalent is labelled approximate or by prior agreement.
* No live FX API is used.

Pass condition:

```text
MAD remains the source currency and EUR/USD are clearly manual/offline options.
```

## Rule 6 — Urgent fees default to 0

Expected behavior:

* Urgent fee fields may exist.
* Urgent fee logic may exist.
* Default urgent fees are 0 MAD.
* Customer should not be charged urgent fees unless the owner enables them.

Pass condition:

```text
Urgent fee does not accidentally appear as a live charge during the pilot.
```

## Rule 7 — Rabat-only pilot

Expected behavior:

* Website explains Hababy & Co is piloting in Rabat.
* Delivery zones are Rabat and nearby areas only.
* No page implies multi-city availability.
* Airport delivery can be included only if marked clearly or configured by admin.

Pass condition:

```text
The site feels intentionally Rabat-focused.
```

## Rule 8 — WhatsApp handoff does not replace order saving

Expected behavior:

* Booking request is saved to the database first.
* Confirmation page offers WhatsApp continuation.
* WhatsApp message is pre-filled with order summary.
* If the customer does not click WhatsApp, the order still exists in admin.

Pass condition:

```text
WhatsApp supports communication but does not become the only record of the request.
```

## Manual Smoke Test Checklist

Run this after every major build step.

```text
[ ] Homepage loads
[ ] Header logo appears
[ ] Navigation links work
[ ] Footer links work
[ ] Rent page loads
[ ] Product detail page loads
[ ] Bundles page loads
[ ] Welcome Kits page loads
[ ] Booking page loads
[ ] FAQ page loads
[ ] Safety & Cleaning page loads
[ ] About page loads
[ ] Admin login page loads
[ ] No obvious console errors
[ ] Site works on mobile width
[ ] Site works on desktop width
```

## Automated Smoke Testing

Playwright is the planned automated browser QA layer for this project. It is not an AI agent. Codex should write and run Playwright tests when the project has e2e tests available, then summarize failures before asking the human owner for manual testing.

Initial Playwright smoke tests should cover:

```text
[ ] Homepage loads
[ ] /products loads
[ ] A product detail page loads
[ ] /request loads
[ ] /supabase-test loads
[ ] Logged-out /admin/orders redirects to /admin/login
[ ] /admin/login loads
```

Authenticated admin tests are optional. They should run only when both of these environment variables are present in the test environment:

```text
E2E_ADMIN_EMAIL
E2E_ADMIN_PASSWORD
```

Automated tests should avoid creating production data by default. Tests that create real customer, order, inventory, or admin records must be explicitly marked, disabled by default, or configured to use a disposable/test Supabase project with cleanup.

Current Playwright commands:

```text
npm run test:e2e
npm run test:e2e:headed
```

Current safe default Playwright scope:

```text
[ ] Homepage loads
[ ] /products loads
[ ] /products/travel-cot loads
[ ] /request loads
[ ] /request?product=travel-cot loads without submitting the form
[ ] /supabase-test loads
[ ] Logged-out /admin/orders redirects to /admin/login
[ ] /admin/login loads
[ ] /admin/orders is not publicly visible without login
```

Admin status update tests are intentionally not part of the default Playwright smoke suite because
they mutate order data. Any future automated status mutation test must be skipped by default or gated
behind explicit disposable/test Supabase credentials and must never run against production by
accident.

Admin WhatsApp handoff checks may run as authenticated, non-mutating Playwright tests when
`E2E_ADMIN_EMAIL` and `E2E_ADMIN_PASSWORD` are present. These tests may verify that the handoff
section and copy button are visible on an existing order detail page, but they must not click the
external WhatsApp link or send messages.

Recommended Codex behavior:

```text
1. Run npm run lint.
2. Run npm run build.
3. Run npm run test:e2e.
4. Summarize any browser failures with route, expected behavior, actual behavior, and whether manual testing should proceed.
```

## Customer-Facing Page Tests

## Home Page Tests

Test that the homepage includes:

```text
[ ] Clear hero headline
[ ] Clear subheadline
[ ] Primary CTA: Request a booking
[ ] Secondary CTA: Chat on WhatsApp
[ ] Value propositions
[ ] How it works section
[ ] Category preview
[ ] Bundles preview
[ ] Welcome Kits preview
[ ] Safety/trust section
[ ] Audience strip
[ ] Rabat-only delivery message
[ ] Final CTA
```

Pass condition:

```text
A first-time visitor understands what Hababy & Co does within 10 seconds.
```

## Catalogue Page Tests

Test that the Rent Baby Gear page includes:

```text
[ ] Product grid
[ ] Product cards
[ ] Product images or placeholders
[ ] Product names
[ ] Category labels
[ ] Starting price in MAD
[ ] Availability badge
[ ] View/request CTA
[ ] Currently unavailable state for products with zero usable stock
[ ] No active request CTA for products with zero usable stock
[ ] Category filter
[ ] Date/rental filter if implemented
```

Pass condition:

```text
A visitor can browse rental gear, move to product details easily, and only request products with usable stock.
```

## Product Detail Page Tests

Each product detail page should show:

```text
[ ] Product image/gallery
[ ] Product name
[ ] Category
[ ] Description
[ ] Daily price
[ ] Weekly price
[ ] Monthly price
[ ] Deposit
[ ] Included items
[ ] Optional add-ons
[ ] Safety notes where relevant
[ ] Cleaning notes
[ ] Availability badge
[ ] Request CTA
[ ] Currently unavailable state when usable stock is zero
[ ] Model image note if relevant
```

For car seats:

```text
[ ] Car seat age/weight/height/specification guidance is clearly indicated
[ ] Separate car seat size/weight groups appear as separate requestable products where possible
[ ] Copy says parents are responsible for choosing the appropriate car seat group
[ ] Copy does not say Hababy confirms child suitability
[ ] Copy says Hababy confirms stock, condition, cleanliness, dates, and delivery feasibility
```

Pass condition:

```text
The customer understands the item, price estimate, deposit, and request process.
```

## Inventory Availability Tests

Create or use test products with the following inventory states:

```text
[ ] status available + cleaning_status clean + current_order_id null -> product can be requested
[ ] status available + cleaning_status needs_cleaning -> product shows Currently unavailable
[ ] status cleaning + cleaning_status clean -> product shows Currently unavailable
[ ] status maintenance + cleaning_status maintenance_needed -> product shows Currently unavailable
[ ] status available + cleaning_status clean + current_order_id set -> product shows Currently unavailable
[ ] no inventory rows -> product shows Currently unavailable
```

Pass condition:

```text
Only products with at least one usable stock unit show an active Request a booking CTA.
```

## Bundles Page Tests

Test that the Bundles page includes:

```text
[ ] Bundle cards
[ ] Bundle names
[ ] Included items
[ ] Starting price
[ ] Deposit if applicable
[ ] Availability badge
[ ] View/request CTA
```

Seed bundles to check:

```text
[ ] Rabat Arrival
[ ] Sleep Easy
[ ] Car & City
[ ] Grandparents Hosting
[ ] Full Baby Setup
[ ] New Parent Emergency
```

Pass condition:

```text
Bundles feel curated and helpful, not random product groups.
```

## Welcome Kits Page Tests

Test that the Welcome Kits page includes:

```text
[ ] Kit cards
[ ] Kit names
[ ] Contents
[ ] One-time price
[ ] Preference fields where relevant
[ ] Organic badge where relevant
[ ] Copy explaining that Welcome Kits are sold, not rented
```

Seed kits to check:

```text
[ ] Essential
[ ] Sleep & Bath
[ ] Feeding
[ ] Premium Arrival
```

Pass condition:

```text
The customer understands Welcome Kits are purchase add-ons, not rental items.
```

## How It Works Page Tests

Test that the page explains:

```text
[ ] Choose gear
[ ] Submit request
[ ] Hababy & Co confirms within 24 hours
[ ] Payment and deposit arranged before handover
[ ] Delivery happens
[ ] Pickup happens
[ ] Inspection happens
[ ] Deposit is refunded manually after inspection
```

Pass condition:

```text
The request-first model feels intentional and trustworthy.
```

## Safety & Cleaning Page Tests

Test that the page includes:

```text
[ ] Cleaning reassurance
[ ] Inspection reassurance
[ ] Safety-sensitive item guidance
[ ] Car seat confirmation language
[ ] Parent-friendly tone
```

Pass condition:

```text
The page reduces anxiety and increases trust.
```

## FAQ Page Tests

The FAQ should answer:

```text
[ ] How booking works
[ ] Why availability is personally confirmed
[ ] Where delivery is available
[ ] How payment works
[ ] How deposits work
[ ] Whether EUR/USD are accepted
[ ] How long confirmation takes
[ ] Whether same-day delivery is available
[ ] How cancellation works
[ ] How car-seat safety is handled
[ ] How cleaning and inspection work
```

Pass condition:

```text
The FAQ answers the main hesitation points before a customer submits a request.
```

## Booking Flow Tests

## Step 1 — Dates and Delivery

Test fields:

```text
[ ] Rental start date
[ ] Rental end date
[ ] Delivery window
[ ] Pickup window
[ ] Delivery type
[ ] Delivery zone
[ ] Delivery address, if included
```

Delivery windows:

```text
[ ] Morning 9–12
[ ] Afternoon 14–17
[ ] Evening 17–20
```

Delivery types:

```text
[ ] Home
[ ] Hotel
[ ] Airbnb
[ ] Family home
[ ] Airport
[ ] Other
```

Validation tests:

```text
[ ] Start date is required
[ ] End date is required
[ ] End date cannot be before start date
[ ] Delivery zone is required
[ ] Same-day request is blocked
```

## Step 2 — Baby Details

Test fields:

```text
[ ] Baby age
[ ] Approximate weight
[ ] Height if relevant
[ ] Number of children
```

Conditional requirement test:

```text
[ ] Car seat product pages show clear age/weight/height/specification guidance before request
[ ] Car seat request does not require child details before the customer can submit interest
[ ] Parents are told they are responsible for choosing the appropriate car seat group
[ ] Hababy does not claim to confirm child suitability
[ ] If child details are collected later, they support communication and do not replace parent responsibility
```

## Step 3 — Items

Test that the user can review/edit:

```text
[ ] Products
[ ] Bundle
[ ] Add-ons
[ ] Welcome Kits
```

Test carried-over state:

```text
[ ] Product selected from product page appears in booking flow
[ ] Bundle selected from bundle page appears in booking flow
[ ] Welcome Kit selected from Welcome Kits page appears in booking flow
```

## Step 4 — Order Summary

Test that summary shows:

```text
[ ] Rental subtotal
[ ] Add-ons
[ ] Welcome Kits
[ ] Delivery fee
[ ] Urgent fee, if enabled
[ ] Deposit
[ ] Estimated total
[ ] Copy saying final total is confirmed within 24 hours
```

Pass condition:

```text
The estimate is clear but does not imply final confirmed payment.
```

## Step 5 — Contact and Payment Preference

Test fields:

```text
[ ] Name
[ ] Phone
[ ] Email, optional
[ ] Preferred language
[ ] Payment method preference
```

Payment methods visible:

```text
[ ] MAD cash
[ ] MAD bank transfer
[ ] EUR cash
[ ] USD cash
```

Payment methods not visible:

```text
[ ] Card
[ ] Stripe
[ ] PayPal
[ ] Online checkout
```

## Step 6 — Submit and Confirmation

Test submit behavior:

```text
[ ] Form validates before submission
[ ] Customer record is created or matched
[ ] Order is created
[ ] Order status is `new`
[ ] Confirmation message appears
[ ] WhatsApp continuation button appears
[ ] WhatsApp link contains encoded order summary
```

Expected confirmation:

```text
Thanks! We've received your request and we'll confirm availability and delivery within 24 hours. You can also continue on WhatsApp now.
```

Pass condition:

```text
The order exists in admin even if the customer does not continue on WhatsApp.
```

## Same-Day Block Test Cases

Run these test cases:

```text
[ ] Delivery requested today → blocked
[ ] Delivery requested less than 24h away → blocked
[ ] Delivery requested more than 24h away → allowed
[ ] Delivery requested exactly 24h away → allowed or handled according to chosen rule
```

Expected blocked message:

```text
Same-day delivery isn't currently available — please request at least 24 hours ahead.
```

Pass condition:

```text
No order is created for blocked same-day requests.
```

## Pricing and Estimate Tests

Test that estimate includes:

```text
[ ] Daily pricing
[ ] Weekly pricing
[ ] Monthly pricing if applicable
[ ] Add-ons
[ ] Welcome Kits
[ ] Delivery fee
[ ] Urgent fee defaulting to 0
[ ] Deposit
[ ] Total due
```

Test pricing source:

```text
[ ] Product prices come from database/seed data
[ ] Bundle prices come from database/seed data
[ ] Welcome Kit prices come from database/seed data
[ ] Delivery fees come from settings
[ ] Urgent fees come from settings
[ ] Final prices are not hardcoded inside UI components
```

Pass condition:

```text
The customer sees an estimate and the owner can edit key values without code.
```

## Payment and Currency Tests

Test payment methods:

```text
[ ] MAD cash can be selected
[ ] MAD bank transfer can be selected
[ ] EUR cash can be selected
[ ] USD cash can be selected
[ ] Card is not visible
```

Test currency behavior:

```text
[ ] MAD is the base currency
[ ] EUR/USD are approximate if shown
[ ] FX rates are manual, not live API
[ ] Payment notes can be recorded in admin
[ ] Amount received can be recorded in admin
```

Pass condition:

```text
The site does not accidentally create an online payment flow.
```

## WhatsApp Handoff Tests

Test floating WhatsApp button:

```text
[ ] Appears where intended
[ ] Uses admin-configured number
[ ] Opens WhatsApp link
```

Test post-booking WhatsApp:

```text
[ ] Button appears after submission
[ ] Message includes order summary
[ ] Message includes customer name
[ ] Message includes rental dates
[ ] Message includes delivery zone
[ ] Message includes selected items
[ ] Message includes estimate/deposit
[ ] Message includes payment preference
[ ] Message includes order reference if available
[ ] Message is URL-encoded correctly
```

Security test:

```text
[ ] WhatsApp message does not include internal admin notes
[ ] WhatsApp message does not include private backend-only data
```

Pass condition:

```text
WhatsApp is a communication handoff, not the database of record.
```

Admin WhatsApp handoff tests:

```text
[ ] Admin order detail shows a WhatsApp message draft
[ ] Message tone matches new, confirmed, or cancelled status
[ ] Message can be copied manually
[ ] Open WhatsApp link appears only when the phone can be normalized
[ ] Tests do not send WhatsApp messages automatically
[ ] Tests do not click external WhatsApp links
```

## Admin Panel Tests

## Admin Login Tests

```text
[ ] Admin login page loads
[ ] Approved admin can log in
[ ] Non-admin cannot access admin pages
[ ] Logged-out user is redirected away from protected admin pages
[ ] Admin can log out
```

## Products Admin Tests

```text
[ ] Admin can view product list
[ ] Admin can create product
[ ] Admin can edit product
[ ] Admin can hide/show product
[ ] Admin can edit prices
[ ] Admin can edit deposit
[ ] Admin can edit included items
[ ] Admin can edit safety notes
[ ] Admin can edit age, weight, height, and specification guidance
[ ] Admin can set availability mode
[ ] Admin can toggle model-image note
```

## Bundles Admin Tests

```text
[ ] Admin can view bundle list
[ ] Admin can create bundle
[ ] Admin can edit bundle
[ ] Admin can hide/show bundle
[ ] Admin can edit included products
[ ] Admin can edit pricing
[ ] Admin can edit deposit
[ ] Admin can set availability mode
```

## Welcome Kits Admin Tests

```text
[ ] Admin can view Welcome Kit list
[ ] Admin can create Welcome Kit
[ ] Admin can edit Welcome Kit
[ ] Admin can hide/show Welcome Kit
[ ] Admin can edit contents
[ ] Admin can edit price
[ ] Admin can edit preference fields
[ ] Admin can mark organic option
```

## Orders Admin Tests

```text
[ ] Admin can view order list
[ ] Admin can open order detail
[ ] Admin can update a new order status to confirmed
[ ] Admin can update a new order status to cancelled
[ ] Admin cannot update non-new orders in the Milestone 037 status action UI
[ ] Admin status updates use authenticated RLS access, not service role
[ ] Admin can edit delivery fee
[ ] Admin can edit urgent fee
[ ] Admin can edit deposit
[ ] Admin can edit total
[ ] Admin can record payment method
[ ] Admin can record currency
[ ] Admin can record FX rate
[ ] Admin can record amount received
[ ] Admin can add payment notes
[ ] Admin can add internal notes
```

Test statuses:

```text
[ ] new
[ ] confirmed
[ ] paid
[ ] delivered
[ ] returned
[ ] closed
[ ] cancelled
```

## Settings Admin Tests

```text
[ ] Admin can edit WhatsApp number
[ ] Admin can enable/disable payment methods
[ ] Card remains disabled by default
[ ] Admin can edit EUR rate
[ ] Admin can edit USD rate
[ ] Admin can edit delivery zones
[ ] Admin can edit delivery fees
[ ] Admin can edit urgent fee settings
[ ] Urgent fees default to 0
[ ] Admin can edit minimum order value if implemented
```

## Content Admin Tests

```text
[ ] Admin can edit homepage copy
[ ] Admin can edit FAQ content
[ ] Admin can edit About Us copy
[ ] Admin can edit Safety & Cleaning copy
[ ] Admin can edit policy pages
```

If content editing is postponed, record it clearly in the build log and change log.

## Database and Backend Tests

Test Supabase data:

```text
[ ] Categories table exists
[ ] Products table exists
[ ] Bundles table exists
[ ] Accessories table exists
[ ] Welcome Kits table exists
[ ] Customers table exists
[ ] Orders table exists
[ ] Settings table exists
[ ] Content table exists
```

Optional:

```text
[ ] Inventory table exists if included in Version 1
```

Test backend actions:

```text
[ ] Booking request creates customer
[ ] Booking request creates order
[ ] Estimate calculation works
[ ] Same-day block works before order creation
[ ] WhatsApp link generation works
[ ] Admin updates save correctly
[ ] Invalid data is rejected
```

## Security Tests

## Public User Tests

A public visitor should be able to:

```text
[ ] Read active public products
[ ] Read active bundles
[ ] Read active Welcome Kits
[ ] Read public content
[ ] Submit a booking request
```

A public visitor should not be able to:

```text
[ ] Access admin pages
[ ] Edit products
[ ] Edit orders
[ ] Edit settings
[ ] Read internal notes
[ ] Read payment notes
[ ] Read customer private details outside their submission flow
```

## Admin User Tests

An approved admin should be able to:

```text
[ ] Access admin panel
[ ] Manage products
[ ] Manage bundles
[ ] Manage Welcome Kits
[ ] Manage orders
[ ] Manage settings
[ ] Manage content
```

## Environment Variable Tests

Check:

```text
[ ] `.env.local` is not committed
[ ] `.env.example` exists
[ ] Supabase anon key is public-safe
[ ] Supabase service role key is never exposed to browser
[ ] Production secrets are stored in Vercel
```

## UI and Brand Tests

Test brand application:

```text
[ ] Horizontal SVG logo appears in header
[ ] Primary SVG logo is used only where layout supports it
[ ] Stork SVG mark is used for favicon or small brand moments
[ ] Marrakech Red is used for key CTAs
[ ] Rose Dust and Sand are not used as text on white
[ ] Sage is used sparingly for organic cues
[ ] Charcoal is used for body text
[ ] Playfair Display is used for headings
[ ] Nunito is used for body/UI
[ ] Quicker Script is used sparingly, if at all
```

Test visual feel:

```text
[ ] Site feels warm
[ ] Site feels calm
[ ] Site feels trustworthy
[ ] Site feels parent-led
[ ] Site does not feel like a marketplace
[ ] Site does not feel like a toy shop
[ ] Moroccan inspiration is subtle
```

## Mobile Testing

Test on mobile widths:

```text
[ ] 360px wide
[ ] 390px wide
[ ] 430px wide
```

Check:

```text
[ ] Header works
[ ] Mobile menu works
[ ] Logo is readable
[ ] CTAs are easy to tap
[ ] Product cards stack correctly
[ ] Booking form is usable
[ ] Inputs are large enough
[ ] Date selectors work
[ ] WhatsApp button does not cover important content
[ ] Admin tables are usable or scrollable
```

Pass condition:

```text
The full customer request journey can be completed on a phone.
```

## Desktop Testing

Test common desktop widths:

```text
[ ] 1280px
[ ] 1440px
[ ] 1920px
```

Check:

```text
[ ] Layout does not feel stretched
[ ] Sections have good spacing
[ ] Product grids align properly
[ ] Navigation is clear
[ ] Booking flow remains readable
[ ] Admin panel is usable
```

## Browser Testing

Test at minimum:

```text
[ ] Chrome
[ ] Safari if available
[ ] Edge
[ ] Mobile Chrome
[ ] Mobile Safari if available
```

Pass condition:

```text
Core customer journey works in the main browsers customers are likely to use.
```

## Language Testing

## English Tests

```text
[ ] English homepage works
[ ] English navigation works
[ ] English booking flow works
[ ] English validation messages work
[ ] English confirmation works
```

## French Tests

```text
[ ] French homepage works
[ ] French navigation works
[ ] French booking flow works
[ ] French validation messages work
[ ] French confirmation works
[ ] French text does not break layout
```

## Future Arabic Readiness

Arabic does not need to launch in Version 1.

Check only that:

```text
[ ] Text is not embedded in images
[ ] Layouts are flexible
[ ] Components could later support RTL
[ ] Translation structure could accept `ar.json`
```

## Accessibility Tests

Check:

```text
[ ] Images have alt text
[ ] Logo has appropriate alt text
[ ] Buttons have clear labels
[ ] Form fields have labels
[ ] Error messages are clear
[ ] Focus states are visible
[ ] Keyboard navigation works for core forms
[ ] Dialogs and menus are accessible
[ ] Body text has sufficient contrast
[ ] Colour is not the only way information is communicated
```

## Performance Tests

Check:

```text
[ ] Homepage loads quickly
[ ] Images are optimized
[ ] No huge unnecessary assets
[ ] No heavy animation library unless justified
[ ] Product images are not oversized
[ ] Fonts load properly
[ ] Mobile performance is acceptable
```

Optional tools:

```text
Lighthouse
Vercel Analytics
Browser dev tools
```

## SEO Tests

Check main public pages for:

```text
[ ] Page title
[ ] Meta description
[ ] Open Graph title
[ ] Open Graph description
[ ] Useful URLs
[ ] No duplicate generic titles
[ ] Basic keywords naturally included
```

Relevant SEO phrases:

```text
baby gear rental Rabat
baby equipment rental Rabat
stroller rental Rabat
travel cot rental Rabat
car seat rental Rabat
baby gear delivery Rabat
```

SEO should be natural, not spammy.

## Error State Tests

Test:

```text
[ ] Product not found
[ ] Bundle not found
[ ] Empty product category
[ ] Booking submission failure
[ ] Missing required fields
[ ] Same-day blocked
[ ] Admin login failure
[ ] Failed settings save
[ ] Failed image upload, if applicable
```

Pass condition:

```text
The user sees helpful messages, not blank screens or technical errors.
```

## Deployment Tests

## Vercel Preview Tests

Before production:

```text
[ ] Vercel preview deploys successfully
[ ] Environment variables are set
[ ] Supabase connection works
[ ] Public pages load
[ ] Booking submission works
[ ] Admin login works
[ ] WhatsApp link works
[ ] Mobile preview tested
```

## Production Tests

After production deployment:

```text
[ ] Production homepage loads
[ ] Production navigation works
[ ] Production booking flow works
[ ] Production order appears in admin
[ ] Production WhatsApp handoff works
[ ] Production admin login works
[ ] No test-only copy visible
[ ] No placeholder contact information visible
[ ] No placeholder WhatsApp number visible
```

## Non-Coder Testing Method

The human product owner should test the site using simple scenarios.

## Scenario 1 — Diaspora Family

```text
I am coming to Rabat with a toddler for two weeks and need a travel cot and stroller delivered to my family home.
```

Test:

```text
[ ] Can I understand the service?
[ ] Can I find the items?
[ ] Can I request them?
[ ] Do I understand payment and deposit?
[ ] Can I continue on WhatsApp?
```

## Scenario 2 — Expat Family

```text
I am relocating to Rabat and need a full baby setup while my shipment arrives.
```

Test:

```text
[ ] Can I find bundles?
[ ] Does the site feel professional?
[ ] Do I trust the cleaning/safety process?
[ ] Can I submit a request?
```

## Scenario 3 — Grandparents Hosting

```text
My grandchild is visiting and I need temporary baby gear at home.
```

Test:

```text
[ ] Can I understand bundles?
[ ] Is the language simple?
[ ] Is WhatsApp easy?
```

## Scenario 4 — Safety-Sensitive Item

```text
I need a car seat for my baby.
```

Test:

```text
[ ] Does the site show car seat age/weight/height/specification guidance?
[ ] Does the site make parents responsible for choosing the appropriate car seat group?
[ ] Does the site avoid saying Hababy confirms child suitability?
[ ] Does the site show whether that car seat group has usable stock?
[ ] Does it avoid promising instant availability?
[ ] Does it explain Hababy confirms stock, condition, cleanliness, dates, and delivery feasibility?
```

## Scenario 5 — Same-Day Request

```text
I want delivery today.
```

Test:

```text
[ ] Does the site block the request?
[ ] Is the explanation clear?
[ ] Is there still a way to contact WhatsApp if appropriate?
```

## Bug Reporting Format

When a bug is found, record it like this:

```text
Bug title:
Where it happened:
Steps to reproduce:
Expected result:
Actual result:
Screenshot/video:
Severity:
Suggested fix:
Status:
```

## Bug Severity Levels

Use:

```text
Critical = blocks launch or creates business/legal/security risk
High = breaks core customer/admin flow
Medium = confusing or partially broken
Low = visual polish or minor copy issue
```

## Launch Blockers

The site should not launch if any of these are true:

```text
[ ] Booking requests do not save
[ ] Same-day requests are not blocked
[ ] Products with zero usable stock can be requested
[ ] Online payment appears anywhere
[ ] Admin routes are publicly accessible
[ ] Customer personal data is exposed
[ ] WhatsApp number is wrong
[ ] Production site has placeholder contact information
[ ] Mobile booking flow is unusable
[ ] No clear confirmation message appears after booking
[ ] Product prices/deposits are misleading or obviously wrong
[ ] French/English routing is broken if both are promised at launch
```

## Final Launch Checklist

Before launch, confirm:

```text
[ ] Homepage approved
[ ] Product catalogue approved
[ ] Product detail pages approved
[ ] Bundles approved
[ ] Welcome Kits approved
[ ] Booking flow approved
[ ] Admin login approved
[ ] Admin products approved
[ ] Admin orders approved
[ ] Settings approved
[ ] WhatsApp handoff approved
[ ] Payment copy approved
[ ] Deposit copy approved
[ ] Same-day block approved
[ ] Mobile approved
[ ] English approved
[ ] French approved
[ ] Legal/policy pages reviewed
[ ] Vercel production deployment approved
[ ] Build log updated
[ ] Deployment notes updated
```

## Test Plan Acceptance Criteria

This test plan is complete enough when it can verify:

* The customer-facing site works.
* The catalogue only allows requests for products with usable stock.
* The booking request flow works.
* Same-day delivery is blocked by default.
* No online payment exists.
* MAD remains the base currency.
* EUR/USD are treated as approximate offline options.
* WhatsApp handoff works.
* Orders save before WhatsApp handoff.
* Admin can manage the pilot.
* Customer data is protected.
* Mobile experience is strong.
* English and French are supported.
* The site is ready for Vercel deployment.
* The project remains aligned with the AI workflow learning goal.

## Next Workflow Document

