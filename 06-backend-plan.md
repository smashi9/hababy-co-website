# Project 001 — Backend Plan

## Product Name

Hababy & Co

## Document Purpose

This document defines the backend, database, admin data model, order logic, pricing logic, settings, and security approach for the Hababy & Co website.

It should be used by:

* Claude Code for backend architecture review
* Codex for implementation
* DeepSeek or another coding model for support tasks
* ChatGPT for explanation and documentation
* The human product owner to understand what data the website needs

This document focuses on:

* Supabase database structure
* Tables
* Relationships
* Order lifecycle
* Pricing and fee logic
* Payment and currency logic
* Admin settings
* Content management
* Authentication
* Security principles
* Seed data requirements

It does not define the visual design system. That belongs in:

```text
04-ui-brief.md
```

It does not define the high-level technical structure. That belongs in:

```text
03-architecture-plan.md
```

## Source Documents

This backend plan is based on:

```text
00-project-brief.md
01-product-requirements.md
03-architecture-plan.md
04-ui-brief.md
99-source-materials/hababy-developer-handover-original.md
```

## Backend Summary

Hababy & Co should use Supabase for:

* Postgres database
* Admin authentication
* Product data
* Bundle data
* Welcome Kit data
* Customer records
* Booking request records
* Settings
* Editable content
* Image storage where needed

The backend should support a Rabat-only pilot.

The backend should not over-automate the business.

The key principle is:

```text
The website captures structured requests.
The owner confirms availability and payment manually.
```

## Backend Principles

## 1. Request-first booking

Orders are not automatically confirmed.

Every customer submission creates an order with status:

```text
new
```

The owner/admin reviews the request and manually changes the status.

## 2. No online payment in Version 1

The backend should not integrate Stripe, PayPal, card checkout, or any online payment gateway.

The backend only records:

* Preferred payment method
* Currency preference
* Manual FX rate if used
* Amount due
* Amount received
* Payment notes

## 3. Admin-configurable business rules

The owner should be able to update important business settings without code.

This includes:

* Prices
* Deposits
* Delivery zones
* Delivery fees
* WhatsApp number
* Payment methods
* EUR/USD rates
* Urgent fee settings
* Discounts and rental multipliers
* Product visibility
* Content copy

## 4. MAD is the base currency

All prices should be stored in MAD.

EUR and USD are optional offline cash acceptance methods.

EUR/USD equivalents are approximate and manually confirmed.

## 5. Keep Version 1 simple

Do not build complex automated inventory allocation, customer accounts, online payments, or multi-city logic in Version 1.

The backend should be strong enough for the pilot, but not over-engineered.

## 6. Availability check before request

The public catalogue should be availability-aware at the product level.

If a product has at least one usable stock unit, the customer may request it.

If a product has zero usable stock units, the customer cannot request it and the UI should show:

```text
Currently unavailable
```

Usable inventory means:

```text
status = available
cleaning_status = clean
current_order_id is null
```

This is not full automated date-based allocation. It is a simple product-level gate before the request-first flow.

Even when usable stock exists, the request remains pending. Hababy & Co still confirms item condition, cleanliness, requested dates, delivery feasibility, payment/deposit, and handover details before approval.

## Supabase Services Used

Use Supabase for:

```text
Database: Postgres
Authentication: Supabase Auth
Storage: Supabase Storage for uploaded product images
Admin access: One owner/admin account
```

## Data Naming Rules

Use:

```text
snake_case
```

For database tables and fields.

Examples:

```text
daily_price_mad
created_at
updated_at
selected_products
delivery_zone
```

Use:

```text
uuid
```

For primary IDs where practical.

Use:

```text
created_at
updated_at
```

On main tables.

Money should be stored as integers in MAD where possible.

Example:

```text
daily_price_mad = 120
```

Avoid storing money as floating point decimals.

## Core Tables

The backend should include these main tables:

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

## Table 1 — categories

## Purpose

Stores product categories used in the catalogue.

Examples:

```text
Travel cots
Strollers
Car seats
High chairs
Baby baths
Feeding
Sleep
```

## Fields

```text
id uuid primary key
name text not null
slug text unique not null
description text nullable
display_order integer default 0
active boolean default true
created_at timestamptz default now()
updated_at timestamptz default now()
```

## Admin Needs

Admin should be able to:

* Add categories
* Edit categories
* Reorder categories
* Hide/show categories

## Table 2 — products

## Purpose

Stores rental products.

Examples:

```text
Travel cot
Compact stroller
Car seat
High chair
Baby bath
```

## Fields

```text
id uuid primary key
name text not null
slug text unique not null
category_id uuid references categories(id)
description text
image_gallery text[] default '{}'
daily_price_mad integer not null default 0
weekly_price_mad integer not null default 0
monthly_price_mad integer not null default 0
deposit_mad integer not null default 0
included_items text[] default '{}'
optional_accessories jsonb default '[]'
safety_notes text
cleaning_notes text
age_guidance text
weight_guidance text
height_guidance text
requires_child_details boolean default false
availability_mode text default 'request'
model_image_note boolean default false
active boolean default true
featured boolean default false
display_order integer default 0
created_at timestamptz default now()
updated_at timestamptz default now()
```

## Availability Mode Values

Use these values:

```text
request
confirm
on_request
hidden
```

Customer-facing labels:

```text
request = Request to book
confirm = Available to request
on_request = Available on request
hidden = Hidden
```

## Admin Needs

Admin should be able to:

* Add products
* Edit products
* Hide/show products
* Upload or change images
* Edit prices
* Edit deposits
* Edit descriptions
* Edit included items
* Edit optional accessories
* Edit safety notes
* Edit age, weight, height, and specification guidance
* Change availability mode
* Toggle model image note

## Table 3 — bundles

## Purpose

Stores curated rental bundles.

Examples:

```text
Rabat Arrival
Sleep Easy
Car & City
Grandparents Hosting
Full Baby Setup
New Parent Emergency
```

## Fields

```text
id uuid primary key
name text not null
slug text unique not null
description text
included_product_ids uuid[] default '{}'
optional_addons jsonb default '[]'
image text
base_price_mad integer not null default 0
weekly_price_mad integer not null default 0
monthly_price_mad integer not null default 0
deposit_mad integer not null default 0
availability_mode text default 'request'
active boolean default true
featured boolean default false
display_order integer default 0
created_at timestamptz default now()
updated_at timestamptz default now()
```

## Admin Needs

Admin should be able to:

* Add bundles
* Edit bundles
* Hide/show bundles
* Choose included products
* Edit bundle pricing
* Edit deposit
* Edit image
* Edit optional add-ons
* Change availability mode

## Table 4 — accessories

## Purpose

Stores optional add-ons that can be rented or sold with products and bundles.

Examples:

```text
Extra sheet
Mattress protector
Rain cover
Bath towel
Bath kit
Travel bag
```

## Fields

```text
id uuid primary key
name text not null
description text
linked_product_ids uuid[] default '{}'
price_mad integer not null default 0
type text
rented_or_sold text default 'rented'
active boolean default true
created_at timestamptz default now()
updated_at timestamptz default now()
```

## rented_or_sold Values

Use:

```text
rented
sold
```

## Admin Needs

Admin should be able to:

* Add accessories
* Edit accessories
* Hide/show accessories
* Link accessories to products
* Mark whether each accessory is rented or sold
* Edit price

## Table 5 — welcome_kits

## Purpose

Stores Welcome Kits.

Welcome Kits are sold, not rented.

Examples:

```text
Essential
Sleep & Bath
Feeding
Premium Arrival
```

## Fields

```text
id uuid primary key
name text not null
slug text unique not null
description text
contents text[] default '{}'
image text
price_mad integer not null default 0
size_options jsonb default '[]'
preference_fields jsonb default '[]'
is_organic boolean default false
notes text
active boolean default true
featured boolean default false
display_order integer default 0
created_at timestamptz default now()
updated_at timestamptz default now()
```

## Admin Needs

Admin should be able to:

* Add Welcome Kits
* Edit Welcome Kits
* Hide/show Welcome Kits
* Edit contents
* Edit price
* Edit size options
* Edit preference fields
* Mark organic options
* Add notes

## Table 6 — customers

## Purpose

Stores customers who submit booking requests.

Customers do not need accounts in Version 1.

## Fields

```text
id uuid primary key
name text not null
phone text not null
email text nullable
preferred_language text default 'en'
notes text
past_order_count integer default 0
created_at timestamptz default now()
updated_at timestamptz default now()
```

## Customer Matching Rule

When a booking is submitted, the system may:

* Create a new customer, or
* Match an existing customer by phone number

For Version 1, keep this simple.

Do not build customer login.

## Table 7 — orders

## Purpose

Stores booking requests.

Every booking request submitted by a customer creates an order.

## Fields

```text
id uuid primary key
customer_id uuid references customers(id)
status text default 'new'

rental_start date not null
rental_end date not null

delivery_zone text
delivery_type text
delivery_address text nullable
delivery_window text
pickup_window text

baby_details jsonb default '{}'

selected_products jsonb default '[]'
selected_bundle_id uuid nullable
add_ons jsonb default '[]'
welcome_kit_ids uuid[] default '{}'

rental_subtotal_mad integer default 0
addons_total_mad integer default 0
welcome_kit_total_mad integer default 0
delivery_fee_mad integer default 0
urgent_fee_mad integer default 0
deposit_mad integer default 0
total_due_mad integer default 0

payment_method text
currency text default 'MAD'
fx_rate_used numeric nullable
foreign_amount_due numeric nullable
amount_received integer nullable

payment_notes text
internal_notes text

whatsapp_message text nullable
whatsapp_link text nullable

created_at timestamptz default now()
updated_at timestamptz default now()
```

## Order Status Values

Use these statuses:

```text
new
confirmed
paid
delivered
returned
closed
cancelled
```

## Status Meaning

```text
new = customer submitted request
confirmed = owner confirmed availability and delivery
paid = payment and deposit received offline
delivered = items handed over
returned = items collected back
closed = order completed after inspection and deposit handling
cancelled = order cancelled
```

## Admin Needs

Admin should be able to:

* View all orders
* Open order details
* Update status
* Edit selected items
* Edit delivery fee
* Edit urgent fee
* Edit deposit
* Edit total
* Record payment method
* Record currency
* Record FX rate
* Record amount received
* Add payment notes
* Add internal notes

## Table 8 — inventory

## Purpose

Stores individual physical inventory items.

Inventory is optional/light in Version 1.

It can be created now as a schema foundation but not fully automated.

## Fields

```text
item_id uuid primary key
product_id uuid references products(id)
brand text
model text
serial_number text nullable
purchase_date date nullable
source text nullable
condition text
status text default 'available'
cleaning_status text default 'clean'
current_order_id uuid nullable references orders(id)
notes text
created_at timestamptz default now()
updated_at timestamptz default now()
```

## Inventory Status Values

Possible values:

```text
available
reserved
out
cleaning
maintenance
retired
```

## Cleaning Status Values

Possible values:

```text
clean
needs_cleaning
inspection_needed
maintenance_needed
```

## Version 1 Inventory Rule

Version 1 should not build complex automated date-based inventory allocation.

However, the public catalogue should use a simple product-level availability check.

Usable inventory means:

```text
status = available
cleaning_status = clean
current_order_id is null
```

Catalogue behavior:

```text
At least one usable stock unit = customer may request the product
Zero usable stock units = product shows Currently unavailable and cannot be requested
```

This gate only decides whether a request can be started. It does not confirm the booking.

After a request, Hababy & Co still confirms item condition, cleanliness, requested dates, delivery feasibility, payment/deposit, and handover details before approval.

Inventory also helps the owner track physical items later.

## Table 9 — settings

## Purpose

Stores global business settings.

This should be editable through admin where practical.

## Recommended Approach

Use either:

```text
single row settings table
```

or:

```text
key-value settings table
```

For beginner-friendly implementation, a single row may be easier.

## Fields

```text
id uuid primary key
base_currency text default 'MAD'

payment_methods_enabled jsonb default '{}'

eur_rate numeric nullable
usd_rate numeric nullable
fx_rate_updated_at timestamptz nullable
public_fx_note text

urgent_min_notice_hours integer default 24
urgent_fee_48_72 integer default 0
urgent_fee_24_48 integer default 0
same_day_enabled boolean default false

delivery_zones jsonb default '[]'

minimum_order_value_mad integer nullable

whatsapp_number text
card_enabled boolean default false

discount_3_6_days_pct numeric default 0
multiplier_14d numeric default 1.6
multiplier_30d numeric default 2.7

created_at timestamptz default now()
updated_at timestamptz default now()
```

## Default Payment Settings

At launch:

```text
MAD cash = enabled
MAD bank transfer = enabled
EUR cash = enabled
USD cash = enabled
Card = disabled
```

## Default Urgent Fee Settings

Urgent fee logic can exist but should be disabled by default.

Defaults:

```text
urgent_fee_48_72 = 0
urgent_fee_24_48 = 0
same_day_enabled = false
```

The future intended tiers may be:

```text
48–72 hours = 200 MAD
24–48 hours = 300 MAD
more than 72 hours = 0 MAD
```

But for the pilot, urgent fees default to 0 unless the owner enables them.

## Delivery Zones Setting

Delivery zones should be stored as JSON.

Example:

```json
[
  { "name": "Rabat", "fee_mad": 0, "active": true },
  { "name": "Agdal", "fee_mad": 0, "active": true },
  { "name": "Hay Riad", "fee_mad": 0, "active": true },
  { "name": "Souissi", "fee_mad": 0, "active": true },
  { "name": "Hassan", "fee_mad": 0, "active": true },
  { "name": "L'Orangeraie", "fee_mad": 0, "active": true },
  { "name": "Témara", "fee_mad": 0, "active": true },
  { "name": "Harhoura", "fee_mad": 0, "active": true },
  { "name": "Rabat-Salé Airport", "fee_mad": 0, "active": true }
]
```

Placeholder fees are acceptable during development.

The owner should replace them before launch.

## Table 10 — content

## Purpose

Stores editable website copy.

This is a lightweight CMS table.

## Fields

```text
id uuid primary key
key text not null
locale text not null
value text not null
content_type text default 'text'
created_at timestamptz default now()
updated_at timestamptz default now()
unique(key, locale)
```

## Content Examples

Possible content keys:

```text
home.hero.headline
home.hero.subheadline
home.rabat_pilot.copy
faq.delivery
faq.payment
safety.cleaning_checklist
about.story
policy.deposit
policy.cancellation
policy.privacy
policy.terms
```

## Content Rule

Public-facing copy should ideally come from either:

* Translation files for stable interface labels, or
* The content table for editable marketing and policy copy

Do not scatter important public copy across random components.

## Payment and Currency Logic

## Payment Methods

Version 1 supports offline payment preference only.

Allowed methods:

```text
mad_cash
mad_bank_transfer
eur_cash
usd_cash
```

Card payment should be hidden and disabled.

## Currency Values

Allowed currency values:

```text
MAD
EUR
USD
```

Base currency is always:

```text
MAD
```

## FX Logic

EUR and USD are offline cash options.

The owner may set manual rates in admin.

The site may display approximate equivalents.

Customer-facing wording should make clear:

```text
Final currency amount is confirmed before delivery.
```

No live FX API should be used in Version 1.

## Pricing Logic

Pricing should be handled in code, but values should come from the database or settings.

Do not hardcode final prices inside UI components.

## Estimate Formula

The estimated total should be calculated as:

```text
rental_subtotal
+ addons_total
+ welcome_kit_total
+ delivery_fee
+ urgent_fee
+ deposit
= total_due
```

## Rental Duration Logic

Support:

```text
daily price
weekly price
monthly price
```

Recommended placeholder rules:

```text
1–2 days = days × daily price
3–6 days = days × daily price, with optional admin discount
7 days = weekly price
8–13 days = weekly price + extra days × daily price
14 days = weekly price × admin 14-day multiplier
30 days = weekly or monthly logic using admin monthly multiplier
```

Exact pricing rules can be refined later.

The important rule is:

```text
Prices and multipliers should be admin-configurable where practical.
```

## Deposit Logic

Products and bundles can have deposits.

Deposit should be:

* Shown in the estimate
* Included in total due
* Recorded separately
* Refunded manually after pickup and inspection

The system does not need to automate deposit refunds in Version 1.

## Same-Day Logic

Default rule:

```text
Same-day delivery is not available.
```

If requested delivery is less than 24 hours away:

```text
Block submission.
Show same-day unavailable message.
Do not create order.
```

Unless later the owner explicitly enables same-day orders in settings.

## Urgent Fee Logic

Urgent fee exists but defaults to 0.

Potential logic:

```text
more than 72 hours = 0
48–72 hours = urgent_fee_48_72
24–48 hours = urgent_fee_24_48
less than 24 hours = blocked, unless same_day_enabled is true
```

For pilot launch:

```text
urgent fees are disabled by default
```

## WhatsApp Handoff Data

After booking submission, the backend should store:

* Order
* Customer
* Order summary
* WhatsApp message text if generated
* WhatsApp link if generated

The order must be saved even if the user does not click WhatsApp.

The WhatsApp number should come from settings.

## WhatsApp Message Content

The generated WhatsApp message should include:

```text
Customer name
Phone
Rental start
Rental end
Delivery zone
Delivery type
Selected products
Selected bundle
Welcome Kits
Estimated total
Deposit
Payment preference
Preferred language
Order reference
```

Do not include private admin notes in the WhatsApp message.

## Admin Authentication

Use Supabase Auth.

Version 1 should support:

```text
single owner/admin account
```

No public sign-up.

No customer login.

## Admin Access Rules

Only authenticated admin users should access:

```text
/admin
/admin/products
/admin/bundles
/admin/welcome-kits
/admin/orders
/admin/settings
/admin/content
```

## Role Management

For Version 1, keep roles simple.

Possible approach:

* Use a list of allowed admin emails in environment variable, or
* Use an `admin_users` table, or
* Use Supabase Auth metadata

Recommended simple approach:

```text
Use Supabase Auth and restrict admin access to approved admin email(s).
```

If the project grows, add formal roles later.

## Row Level Security

Supabase Row Level Security should be enabled where appropriate.

General principle:

```text
Public visitors can read active public catalogue/content data.
Only admin can create, update, or delete business data.
Customers can submit booking requests through a controlled server action or API route.
```

## Public Read Access

Public users may read:

```text
active categories
active products
active bundles
active welcome_kits
public content
basic settings needed for public site
```

Sensitive settings should not be publicly exposed.

## Public Write Access

Public users should not directly write freely to tables from the browser.

Booking request submission should be handled through:

```text
server action
or
API route
```

This controlled backend function validates the request and writes:

```text
customer
order
```

## Admin Write Access

Only admin can write:

```text
products
bundles
welcome_kits
accessories
orders
settings
content
inventory
categories
```

## Sensitive Data

The backend should protect:

* Customer phone numbers
* Customer emails
* Delivery addresses
* Internal notes
* Payment notes
* FX/payment records

Do not expose these in public queries.

## Storage Plan

Use Supabase Storage for uploaded product images when admin image upload is built.

Possible buckets:

```text
product-images
bundle-images
welcome-kit-images
content-images
```

Brand logo SVGs are local confirmed assets and should live in the project.

Runtime app location:

```text
/public/brand/
```

Expected confirmed brand files:

```text
hababy-logo-primary.svg
hababy-logo-horizontal.svg
hababy-stork-mark.svg
```

## Seed Data

Seed data should be realistic enough for the site to render properly.

Seed data should include:

* Categories
* Products
* Bundles
* Welcome Kits
* Accessories
* Settings
* Content
* Example delivery zones

All prices are placeholders until the owner finalizes pricing.

## Suggested Seed Categories

```text
Travel cots
Strollers
Car seats
High chairs
Baby baths
Feeding
Sleep accessories
```

## Suggested Seed Products

```text
Travel cot
Compact stroller
Full-size stroller
Infant car seat
Toddler car seat
High chair
Baby bath
Changing mat
```

For car seats, size/weight groups should be treated as separate requestable products where possible, such as infant car seat and toddler car seat.

Parents are responsible for choosing the appropriate car seat group based on listed specifications.

Hababy & Co does not confirm child suitability. Hababy & Co confirms stock, item condition, cleanliness, requested dates, and delivery feasibility.

## Suggested Seed Bundles

```text
Rabat Arrival
Sleep Easy
Car & City
Grandparents Hosting
Full Baby Setup
New Parent Emergency
```

## Suggested Seed Welcome Kits

```text
Essential
Sleep & Bath
Feeding
Premium Arrival
```

## Suggested Seed Accessories

```text
Extra fitted sheet
Mattress protector
Rain cover
Bath towel
Bottle brush
Travel bag
```

## Admin Panel Backend Requirements

## Products Admin

Backend must support:

* Create product
* Read product
* Update product
* Hide/show product
* Delete or archive product
* Upload/change image
* Edit pricing
* Edit deposit
* Edit availability mode
* Edit safety fields

Prefer soft hiding over permanent deletion.

## Bundles Admin

Backend must support:

* Create bundle
* Read bundle
* Update bundle
* Hide/show bundle
* Edit included products
* Edit pricing
* Edit deposit
* Edit availability mode

## Welcome Kits Admin

Backend must support:

* Create Welcome Kit
* Read Welcome Kit
* Update Welcome Kit
* Hide/show Welcome Kit
* Edit contents
* Edit price
* Edit preferences
* Mark organic

## Orders Admin

Backend must support:

* View order list
* Filter by status
* View order detail
* Update status
* Edit totals
* Edit fees
* Edit payment details
* Add internal notes
* Add payment notes
* Record amount received

## Settings Admin

Backend must support editing:

* Payment methods
* EUR rate
* USD rate
* Delivery zones
* Delivery fees
* Urgent fee settings
* Same-day setting
* Minimum order value
* WhatsApp number
* Pricing multipliers
* Card enabled flag, default false

## Content Admin

Backend should support editing:

* Homepage copy
* About Us
* FAQ
* Safety checklist
* Delivery zones copy
* Policy pages

Content editing can be basic in Version 1.

## API / Server Action Plan

Use server actions or API routes for operations that need validation and secure writes.

Possible backend actions:

```text
submitBookingRequest
calculateEstimate
createWhatsAppLink
adminCreateProduct
adminUpdateProduct
adminUpdateOrder
adminUpdateSettings
adminUpdateContent
```

## Validation Plan

Use `zod` schemas for:

* Booking request
* Customer details
* Baby details
* Product admin form
* Bundle admin form
* Welcome Kit admin form
* Settings form
* Content form
* Order update form

Validation should prevent invalid or incomplete data from entering Supabase.

## Error Handling

Backend errors should be handled gracefully.

Customer-facing errors should be simple.

Examples:

```text
We couldn't submit your request. Please try again or contact us on WhatsApp.
Same-day delivery isn't currently available.
Please enter your phone number.
Please select a rental start and end date.
```

Admin-facing errors can be slightly more specific but should still be understandable.

## Backup and Data Safety

For the pilot:

* Use Supabase backups where available.
* Avoid destructive deletes.
* Prefer `active = false` over deleting products.
* Keep internal notes separate from customer-facing content.
* Export orders periodically if needed.

## Future Backend Features

Do not build these in Version 1, but keep the structure flexible enough for later:

* Online card payments
* Stripe integration
* Customer accounts
* Automated inventory availability
* Multi-city support
* Reviews
* Staff roles
* Delivery driver view
* Automated email confirmations
* Automated WhatsApp chatbot
* Live FX rates
* Advanced analytics

## Backend Acceptance Criteria

The backend plan is acceptable when:

* Supabase is the source of truth for products, bundles, Welcome Kits, customers, orders, settings, and content.
* Public visitors can browse active catalogue data.
* Public product catalogue CTAs are based on usable stock.
* Products with zero usable stock show `Currently unavailable` and cannot be requested.
* Customers can submit request-first booking requests.
* Orders are saved with status `new`.
* Same-day requests are blocked by default.
* No online payment processing exists in Version 1.
* Payment preference is recorded only.
* MAD is the base currency.
* EUR and USD are handled as approximate offline cash options.
* Prices, deposits, delivery zones, and key settings are admin-editable where practical.
* WhatsApp number is admin-configurable.
* WhatsApp message generation does not replace order saving.
* Admin routes are protected.
* Customer personal data is not publicly exposed.
* Confirmed SVG brand files are handled as local assets.
* The backend remains pilot-friendly and not over-engineered.

## Open Backend Questions

These questions do not block the next workflow step, but should be answered before implementation:

1. What exact product categories should launch first?
2. What placeholder prices should be used for products, bundles, and Welcome Kits?
3. What deposit amounts should be used by product type?
4. What delivery zones and fees should be used at launch?
5. What WhatsApp number should be used?
6. What admin email address should be allowed to log in?
7. Should content editing be included in the first admin build or after product/order admin?
8. Should product image uploads use Supabase Storage from day one?
9. Should inventory be visible in admin from Version 1 or kept as backend-only structure?
10. Should orders support multiple bundles or only one selected bundle in Version 1?
11. Should airport delivery be active at launch or marked on request?
12. Should the public site show approximate EUR/USD equivalents or only mention EUR/USD by prior agreement?

## Next Workflow Document


