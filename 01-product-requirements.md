# Project 001 — Product Requirements

## Product Name

Hababy & Co

## Document Purpose

This document defines what the Hababy & Co website must do from a product and user-experience perspective.

It focuses on:

* Customer journeys
* Pages
* Features
* Business rules
* Booking flow
* Admin needs
* Acceptance criteria

It does not define the full visual design system, technical architecture, or database schema. Those belong in separate workflow documents.

## Source Documents

This product requirements document is based on:

```text
00-project-brief.md
99-source-materials/hababy-developer-handover-original.md
```

## Product Summary

Hababy & Co is a premium baby gear rental service launching as a Rabat-only pilot.

The website should help families:

1. Understand the service.
2. Browse baby gear, bundles, and Welcome Kits.
3. Request a booking.
4. Receive a clear confirmation message.
5. Continue the conversation on WhatsApp.
6. Arrange offline payment before delivery.

The website should also help the owner:

1. Manage products, bundles, Welcome Kits, prices, and deposits.
2. View and manage booking requests.
3. Edit key business settings.
4. Update site content without changing code.

## Version 1 Product Goal

Version 1 should be a functional request-to-book website with a lightweight admin panel.

The goal is not to build a fully automated rental platform from day one.

The goal is to create a strong pilot system that supports real customer requests while keeping operational control with the owner.

## Product Principles

### 1. Request-first, not instant booking

The website should not promise instant availability.

The customer submits a request. Hababy & Co confirms availability and delivery manually.

### 2. Trust over automation

The business is premium and parent-led. The website should make manual confirmation feel like a quality-control feature, not a weakness.

Use language such as:

```text
Personally reviewed
Cleaned and checked
Confirmed within 24 hours
```

Avoid language such as:

```text
Awaiting confirmation
Rental listing
Unverified
```

### 3. Mobile-first

Most users are likely to use the site on a phone.

All core journeys must work well on mobile before desktop polish.

### 4. Pilot-friendly

Version 1 should support a Rabat-only pilot.

Do not overbuild for multi-city expansion yet.

### 5. Owner-editable where practical

The owner should be able to change operational details without asking a developer.

This includes prices, deposits, delivery zones, fees, WhatsApp number, product visibility, and key copy.

## Primary Users

### Customer Type 1 — Moroccan diaspora returning home

Needs:

* Reliable gear waiting on arrival
* Easy WhatsApp communication
* Trust that items are clean and suitable
* Clear delivery to family home or airport

### Customer Type 2 — Embassy, UN, NGO, relocation, and expat families

Needs:

* Professional service
* Clear pricing and deposit information
* Delivery to home, hotel, serviced apartment, or temporary accommodation
* English and French communication

### Customer Type 3 — Travelling families visiting Rabat

Needs:

* Quick understanding of service
* Simple rental request process
* Clear safety and cleaning reassurance
* Mobile-friendly browsing

### Customer Type 4 — Local parents and hosts

Needs:

* Temporary baby gear for visiting family
* Bundles for grandparents or hosts
* Reliable delivery and pickup
* Easy request flow

## Core Customer Journey

The ideal customer journey is:

```text
Arrive on homepage
→ Understand the service
→ Browse rental gear, bundles, or Welcome Kits
→ View product or bundle details
→ Select rental dates and delivery details
→ Submit request
→ See confirmation message
→ Continue on WhatsApp
→ Hababy & Co confirms availability and payment offline
```

## Main Navigation Requirements

The top navigation should include:

```text
Home
Rent Baby Gear
Bundles
Welcome Kits
How It Works
Safety & Cleaning
FAQ
Book / WhatsApp
```

The primary call-to-action should be:

```text
Request a booking
```

A WhatsApp option should be visible and easy to access.

## Footer Requirements

The footer should include:

```text
About Us
Delivery Zones
Terms
Privacy
Deposit Policy
Cancellation Policy
WhatsApp
Instagram
Contact
```

## Page Requirements

## 1. Home Page

### Purpose

The homepage should quickly explain what Hababy & Co does and guide users toward requesting a booking.

### Required Sections

The homepage should include:

1. Hero section
2. Value proposition section
3. How it works section
4. Category grid
5. Bundles preview
6. Welcome Kits preview
7. Trust and safety section
8. Audience strip
9. Delivery zones section
10. Final call-to-action

### Hero Section Requirements

The hero should include:

* Clear headline
* Short subheadline
* Primary CTA: Request a booking
* Secondary CTA: Chat on WhatsApp
* Warm, premium, Rabat-specific positioning

Suggested headline:

```text
Baby gear rental in Rabat, delivered before you arrive.
```

Suggested subheadline:

```text
Rent clean, inspected baby equipment for your stay — travel cots, strollers, car seats, high chairs, baby baths, and arrival essentials. Delivered to your home, hotel, or Airbnb.
```

### Value Proposition Requirements

The homepage should communicate:

* Travel light
* Clean and inspected gear
* Delivered before arrival
* Local and accountable service
* Personally reviewed requests

### How It Works Requirements

Use a simple four-step flow:

```text
1. Choose your gear
2. Send a request
3. We confirm availability and delivery
4. We deliver, collect, and inspect
```

### Audience Strip Requirements

The homepage should clearly state that the service is useful for:

```text
Families coming home
Expat and embassy families
Visitors to Rabat
Grandparents and hosts
```

### Delivery Zones Requirements

The homepage should explain that Hababy & Co is piloting in Rabat only.

Suggested copy:

```text
We're piloting in Rabat so we can guarantee quality, punctual delivery, and personal service.
```

## 2. Rent Baby Gear / Catalogue Page

### Purpose

The catalogue page should allow customers to browse available rental categories and products.

### Required Features

The catalogue should include:

* Product cards
* Category filters
* Date range filter or date selector
* Product availability badge
* Product image
* Product name
* Starting price
* CTA to view and request

### Product Card Requirements

Each product card should show:

```text
Product image
Product name
Category
From [daily price] MAD/day
Availability badge
View & request button
```

### Inventory Availability Rule

The catalogue now has an availability check before the request-first confirmation step.

If a product has at least one usable stock unit, the customer may request it.

If a product has zero usable stock units, the customer cannot request it and the UI should show:

```text
Currently unavailable
```

Usable stock means:

```text
status = available
cleaning_status = clean
current_order_id is null
```

This availability check does not make the booking instant or guaranteed. A request is still pending until Hababy & Co confirms stock, item condition, cleanliness, requested dates, delivery feasibility, payment/deposit, and handover details.

### Filters

The catalogue should allow filtering by:

```text
Category
Rental date range
```

The date filter does not need to become a full automated inventory allocation system in Version 1. However, the catalogue should still use product-level inventory availability to decide whether the customer can request a product at all.

## 3. Product Detail Page

### Purpose

The product detail page should help the customer understand the item and request it with confidence.

### Required Content

Each product detail page should include:

* Image gallery
* Product name
* Category
* Description
* Daily price
* Weekly price
* Monthly price
* Deposit
* Rental date selector
* Estimate preview
* Included items
* Optional add-ons
* Safety notes
* Cleaning notes
* Age, weight, or height guidance where relevant
* Availability badge
* CTA: Request this item

### Product Image Requirement

Manufacturer images can be used early in the pilot, but the page should allow a note such as:

```text
Model image; exact item confirmed before delivery.
```

### Product Safety Requirement

For car seats, different size/weight groups should be treated as separate requestable product options where possible.

Product detail pages must clearly display:

```text
Age guidance
Weight guidance
Height guidance if relevant
Specification/manufacturer guidance where available
```

Parents are responsible for choosing the appropriate car seat group based on the listed specifications.

Hababy & Co does not confirm child suitability.

Hababy & Co confirms stock, item condition, cleanliness, requested dates, delivery feasibility, payment/deposit, and handover details before approval.

## 4. Bundles Page

### Purpose

Bundles should make it easier for customers to choose common combinations without building an order from scratch.

### Required Bundle Examples

Seed bundles should include:

```text
Rabat Arrival
Sleep Easy
Car & City
Grandparents Hosting
Full Baby Setup
New Parent Emergency
```

### Bundle Card Requirements

Each bundle card should include:

```text
Bundle name
Short description
Included items
Starting price
Deposit if applicable
Availability badge
View & request button
```

### Bundle Detail Requirements

Each bundle detail page should include:

* Bundle description
* Included products
* Optional add-ons
* Price estimate
* Deposit
* Safety and cleaning reassurance
* CTA to request the bundle

## 5. Welcome Kits Page

### Purpose

Welcome Kits are sold, not rented.

They are arrival-day consumable kits for families who want essentials ready when they arrive.

### Required Welcome Kit Examples

Seed Welcome Kits should include:

```text
Essential
Sleep & Bath
Feeding
Premium Arrival
```

### Welcome Kit Requirements

Each Welcome Kit should show:

* Kit name
* Contents
* One-time price
* Size options where relevant
* Preference fields
* Organic option badge where relevant
* Note that brands may vary and will be confirmed before delivery

### Required Preference Fields

Welcome Kit requests may include:

```text
Baby age
Diaper size
Formula or milk preference
Allergies
Snack restrictions
Brand preference
Organic preference
```

## 6. How It Works Page

### Purpose

This page should explain the service in a calm, beginner-friendly way.

### Required Content

The page should explain:

1. Choose the gear or bundle.
2. Submit a request.
3. Hababy & Co confirms availability and delivery within 24 hours.
4. Payment and deposit are arranged before handover.
5. Items are delivered.
6. Items are collected and inspected after the rental.
7. Deposit is refunded after pickup and inspection.

## 7. Safety & Cleaning Page

### Purpose

This page should build trust.

### Required Content

The page should explain:

* Items are cleaned before reaching another family.
* Items are checked before delivery.
* Car seats and safety-sensitive items are personally confirmed.
* Some items may require child age, weight, or height details.
* Items are inspected after pickup.

Suggested copy:

```text
Every item is cleaned, checked, and prepared before it reaches another family.
```

## 8. FAQ Page

### Purpose

The FAQ should reduce customer hesitation and support the request-first model.

### Required FAQ Topics

The FAQ should cover:

* How booking works
* Why availability is personally confirmed
* Delivery zones
* Payment methods
* Deposits
* EUR and USD cash
* Confirmation timing
* Cancellation
* Car seat safety
* Cleaning and inspection
* What happens after submitting a request
* Whether same-day delivery is available

## 9. About Us Page

### Purpose

The About page should make the brand feel parent-led, trustworthy, and personal.

### Required Messaging

The page should communicate:

* Hababy & Co is parent-led.
* The service was created to make family travel easier.
* The business is Rabat-based.
* The pilot is intentionally local.
* The service is curated, not a marketplace.

## 10. Legal and Policy Pages

### Required Pages

The site should include editable pages for:

```text
Terms
Privacy
Deposit Policy
Cancellation Policy
Delivery Zones
```

These do not need to be legally perfect in the first internal draft, but they should exist as editable content pages before public launch.

## Booking Request Flow

## Overview

The booking flow should have six steps.

The booking flow should feel like a request, not a checkout.

There should be no online payment.

## Step 1 — Dates and Delivery

The booking flow may collect:

```text
Rental start date
Rental end date
Delivery window
Pickup window
Delivery type
Delivery zone
Delivery address, optional at first
```

Delivery windows:

```text
Morning: 9–12
Afternoon: 14–17
Evening: 17–20
```

Delivery types:

```text
Home
Hotel
Airbnb
Family home
Airport
Other
```

### Same-Day Rule

If the requested delivery is less than 24 hours away, block submission.

Show a message similar to:

```text
Same-day delivery isn't currently available — please request at least 24 hours ahead.
```

## Step 2 — Baby Details

Collect:

```text
Baby age
Approximate weight
Height if relevant
Number of children
```

For car seats, these details should support communication but should not replace the parent's responsibility to choose the appropriate car seat group from the listed specifications.

Car seat requests should not be blocked only because child details have not yet been entered.

Safety-sensitive products should instead show clear specification guidance before request:

```text
Age guidance
Weight guidance
Height guidance if relevant
Manufacturer/specification guidance where available
```

## Step 3 — Items

Allow the customer to review and edit:

```text
Products
Bundle
Add-ons
Welcome Kits
```

Items selected from product or bundle pages should carry into the booking flow.

## Step 4 — Order Summary

Show an itemised estimate.

The estimate should include:

```text
Rental subtotal
Add-ons
Welcome Kits
Delivery fee
Urgent fee, if enabled
Deposit
Estimated total
```

The summary must make clear that the final total is confirmed manually.

Use copy similar to:

```text
Final total confirmed within 24 hours.
```

## Step 5 — Contact and Payment Preference

Collect:

```text
Name
Phone
Email, optional
Preferred language
Payment method preference
```

Payment method options for the pilot:

```text
MAD cash
MAD bank transfer
EUR cash
USD cash
```

Card payment should not be visible in Version 1.

## Step 6 — Submit

On submit:

1. Save the customer.
2. Save the order with status `new`.
3. Show a confirmation page or confirmation panel.
4. Offer a button to continue on WhatsApp.
5. Generate a pre-filled WhatsApp message with the order summary.

Confirmation copy:

```text
Thanks! We've received your request and we'll confirm availability and delivery within 24 hours. You can also continue on WhatsApp now.
```

## WhatsApp Requirements

## WhatsApp Purpose

WhatsApp is a handoff channel, not an automated chatbot.

## WhatsApp Requirements

The site should include:

* Floating WhatsApp button
* WhatsApp CTA on key pages
* WhatsApp option after request submission
* Pre-filled message after booking request submission
* Admin-configurable WhatsApp number

The order must be saved to the database even if the user does not click WhatsApp.

## Payment Requirements

## Payment Principle

No payment is processed on the website in Version 1.

The website records the preferred payment method only.

## Accepted Payment Methods in Pilot

```text
MAD cash
MAD bank transfer
EUR cash
USD cash
```

## Card Payment

Card payment may exist in future planning or schema but must be disabled and hidden in the pilot.

## Payment Copy

Use language similar to:

```text
Full payment and deposit are arranged before delivery. We accept MAD cash, MAD bank transfer, and EUR/USD cash by prior agreement. Deposits are refunded after pickup and inspection.
```

## Currency Requirements

Base currency is MAD.

EUR and USD cash may be accepted using an owner-set manual rate.

The website may show approximate EUR or USD equivalents, but must label them clearly.

Suggested copy:

```text
EUR and USD cash may be accepted using our daily cash acceptance rate, which includes exchange and handling costs and is confirmed before delivery.
```

## Pricing Requirements

All prices, deposits, and fees should be editable by the admin where practical.

Nothing final should be hardcoded.

The customer should understand that displayed totals are estimates until confirmed.

## Rental Pricing Logic

Rental pricing should support:

```text
Daily price
Weekly price
Monthly price
Deposit
Delivery fee
Add-ons
Welcome Kits
Urgent fee, default disabled
```

## Urgent Fee Requirement

Urgent fee fields and logic should exist, but the default should be disabled at launch.

Default value:

```text
0 MAD
```

Potential future tiers:

```text
48–72 hours: +200 MAD
24–48 hours: +300 MAD
More than 72 hours: 0 MAD
```

## Delivery Requirements

The site should support Rabat-only delivery at launch.

Delivery zones should be admin-configurable.

Initial zones may include:

```text
Rabat
Agdal
Hay Riad
Souissi
Hassan
L'Orangeraie
Témara
Harhoura
Rabat-Salé Airport
```

Each zone may have its own delivery fee.

## Availability Requirements

Products and bundles should have an admin-configurable availability mode.

Availability modes:

```text
Request to book
Personally reviewed
Available on request
Hidden
```

For individual products, this availability mode is not the only availability signal shown to customers.

The public product catalogue should also calculate whether usable stock exists:

```text
usable stock =
  status = available
  and cleaning_status = clean
  and current_order_id is null
```

Customer-facing behavior:

```text
At least one usable stock unit = product may show a request CTA
Zero usable stock units = product shows Currently unavailable and cannot be requested
```

Owner confirmation still happens after the customer request. Hababy & Co still confirms condition, cleanliness, requested dates, delivery feasibility, payment/deposit, and handover details before approval.

## Availability Messaging

Use availability messaging to support trust and quality.

Recommended labels:

```text
Available to request
Personally reviewed
Available on request
Currently unavailable
```

Avoid:

```text
Awaiting confirmation
Maybe available
Unknown
```

## Admin Panel Requirements

## Admin Purpose

The admin panel should allow the owner to manage the pilot without editing code.

The admin should be simple and functional, not overdesigned.

## Admin Access

Admin should be protected.

There should be no public user sign-up.

## Admin — Products

The admin should allow the owner to:

* Add products
* Edit products
* Hide or show products
* Upload or change product images
* Edit descriptions
* Edit daily, weekly, and monthly prices
* Edit deposits
* Edit included items
* Edit optional add-ons
* Edit safety notes
* Edit age, weight, height, and specification guidance
* Set availability mode
* Toggle model-image note

## Admin — Bundles

The admin should allow the owner to:

* Add bundles
* Edit bundles
* Hide or show bundles
* Choose included products
* Edit bundle price
* Edit weekly price
* Edit deposit
* Edit optional add-ons
* Set availability mode

## Admin — Welcome Kits

The admin should allow the owner to:

* Add Welcome Kits
* Edit Welcome Kits
* Hide or show Welcome Kits
* Edit contents
* Edit price
* Edit size options
* Edit preference fields
* Mark organic options
* Add notes

## Admin — Orders

The admin should allow the owner to:

* View all requests
* Open order details
* Update order status
* Edit line items
* Edit delivery fee
* Edit urgent fee
* Edit deposit
* Edit total
* Record payment method
* Record currency
* Record FX rate used
* Record amount received
* Add payment notes
* Add internal notes

Order statuses should include:

```text
New
Confirmed
Paid
Delivered
Returned
Closed
Cancelled
```

## Admin — Settings

The admin should allow the owner to edit:

* Payment methods on/off
* EUR rate
* USD rate
* Delivery zones
* Delivery fees
* Urgent fee settings
* Same-day setting
* Minimum order value, if used
* WhatsApp number
* Discount settings
* Rental multipliers

## Admin — Content

The admin should allow the owner to edit key content such as:

* Homepage copy
* About Us
* FAQ
* Safety checklist
* Policy pages
* Delivery zone descriptions

## Language Requirements

Version 1 should support:

```text
English
French
```

The structure should allow Arabic later.

Arabic does not need to launch in Version 1, but the project should avoid decisions that would make Arabic impossible later.

## Content Requirements

## Ready-to-Use Copy

The following copy can be used as a starting point.

### Hero Headline

```text
Baby gear rental in Rabat, delivered before you arrive.
```

### Hero Subheadline

```text
Rent clean, inspected baby equipment for your stay — travel cots, strollers, car seats, high chairs, baby baths, and arrival essentials. Delivered to your home, hotel, or Airbnb.
```

### Rabat Pilot Copy

```text
We're piloting in Rabat so we can guarantee quality, punctual delivery, and personal service.
```

### Booking Confirmation

```text
Thanks! We've received your request and we'll confirm availability and delivery within 24 hours.
```

### Payment Copy

```text
Full payment and deposit are arranged before delivery. We accept MAD cash, MAD bank transfer, and EUR/USD cash by prior agreement. Deposits are refunded after pickup and inspection.
```

### Safety Copy

```text
Every item is cleaned, checked, and prepared before it reaches another family.
```

### No Same-Day Copy

```text
Same-day delivery isn't currently available — please request at least 24 hours ahead.
```

## Version 1 Out of Scope

Version 1 should not include:

* Online card payment
* Automated WhatsApp chatbot
* Live FX rates
* Customer accounts
* Reviews module
* Multi-city support
* Toy rentals
* Baby monitors, unless demand appears
* Advanced analytics dashboard
* In-house studio photography pipeline

## Product Acceptance Criteria

The product is acceptable when:

* The site is mobile-first across all customer-facing pages.
* Customers can understand the service from the homepage.
* Customers can browse rental products.
* Customers can browse bundles.
* Customers can browse Welcome Kits.
* Customers can request a booking only for products with usable stock.
* Products with zero usable stock show `Currently unavailable`.
* The booking flow is request-first, not instant purchase.
* Confirmation says availability and delivery will be confirmed within 24 hours.
* Deliveries less than 24 hours away are blocked.
* No online payment processing appears anywhere.
* Payment preference can be recorded.
* MAD is the base currency.
* EUR and USD are shown only as approximate or by prior agreement.
* WhatsApp handoff generates a pre-filled message.
* The order is saved even if the customer does not continue to WhatsApp.
* Admin can manage products without code.
* Admin can manage bundles without code.
* Admin can manage Welcome Kits without code.
* Admin can manage orders without code.
* Admin can manage delivery zones and fees without code.
* Admin can manage key content without code.
* English and French are supported.
* Arabic is structurally possible later.
* The pilot remains Rabat-only.
* The final product supports the AI workflow learning goal.

## Open Questions

The following questions do not block the next step, but should be answered before final build decisions:

1. What exact product categories should launch first?
2. Which actual products should be seeded first?
3. What placeholder prices should be used for the first build?
4. What delivery fees should be used per zone?
5. What deposit amounts should be used per product category?
6. What is the official WhatsApp number?
7. What Instagram account should be linked?
8. What email address should be used for contact?
9. What exact French copy should be used for launch?
10. Should airport delivery be included at launch or kept “on request”?

## Next Workflow Documents

After this product requirements document is saved, the next documents should be created in this order:

```text
04-ui-brief.md
03-architecture-plan.md
06-backend-plan.md
07-test-plan.md
```

Recommended next step:

```text
04-ui-brief.md
```

Reason:

The original handover contains a strong brand identity, logo system, colour palette, typography, imagery direction, icon direction, and voice. That should now be separated into a clean UI brief before technical planning begins.
