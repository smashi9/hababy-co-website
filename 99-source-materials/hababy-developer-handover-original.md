# Hababy & Co — Developer Handover & Build Specification

> **What this is.** A single, complete brief for building the Hababy & Co website + lightweight admin panel. It contains everything a developer (or an AI coding assistant) needs: brand identity and assets, the pilot business rules, the full page/feature spec, data model, and admin requirements. Build the customer-facing site first, then the light admin.

> **Brand image.** The full brand kit reference image lives beside this file as `hababy-branding-kit.png` (logo lockups, palette, typography, patterns, icon set). Keep them in the same folder.
>
> ![Hababy & Co brand kit](hababy-branding-kit.png)

---

# PART A — Brand identity & assets

## A1. Positioning
Hababy & Co is a premium, parent-led baby equipment **rental** service launching as a **Rabat-only pilot**. Customers rent clean, inspected baby gear and buy **Welcome Kits** of arrival-day consumables. Items are delivered to a hotel, Airbnb, family home, or the airport, then collected after the rental. The brand is a single, accountable, curated operator — **not** a marketplace. Tone: warm, calm, trustworthy, quietly upscale, with a sense of place (Morocco) and a delivery/homecoming story (the stork).

Primary audiences, in priority order: (1) Moroccan **diaspora** returning home for the holidays; (2) **embassy / UN / NGO / relocation** families and expats in the capital; (3) **travelling families** visiting Rabat; (4) local parents and **hosts** (Airbnb, hotels, serviced apartments).

## A2. Logo
**Mark:** a stork carrying a bundle (with a small heart) set inside an eight-point Moroccan star. Lockups, all in the brand image:
- **Primary** — mark above the "hababy & co" wordmark. Hero, print.
- **Horizontal** — mark left, wordmark right. **Site header**, email, letterhead.
- **Icon only** — mark alone. Favicon (≥28px), watermark.
- **App icon** — white mark on a solid Marrakech Red rounded square. Social avatar, small UI, phone.
- **Badge / stamp** — circular "Hababy & Co · Baby Gear Rental" seal. Delivery-box seals, stickers, inspection cards.

**Rules:** clear space = one star point on all sides. Minimum: horizontal lockup ≥130px wide; icon ≥28px (below that use the single-colour version). Never recolour the stork, add gradients, stretch, rotate, or shadow it. On busy photos use the reversed white mark or the app-icon block. **Keep a one-colour stork-in-star on file** (solid Marrakech Red + reversed white) for small sizes, embroidery, stamps, and single-colour print.

## A3. Colour palette

| Role | Name | HEX | Use |
|---|---|---|---|
| Primary | Marrakech Red | `#B94A48` | Logo, primary buttons / CTAs, links, key accents |
| Accent (warm) | Rose Dust | `#DCA5A1` | Soft fills, secondary highlights — **fill only, not text** |
| Surface | Sand | `#EAD7C3` | Section backgrounds, cards, bands — **fill only, not text** |
| Organic accent | Sage | `#8FA18A` | The **organic / premium-natural product line** cue — milk, "organic available" badges. Sparingly |
| Neutral | Taupe | `#A89E94` | Borders, muted captions, dividers |
| Ink | Charcoal | `#333333` | All body text, most headings |

Surfaces are white / warm off-white / Sand; text is Charcoal. **Marrakech Red is the one bold colour — reserve it for the logo, CTAs, links, highlights.** Sage flags organic items only. **Never set text in Rose Dust or Sand on white** (fills only); text on Marrakech Red is white. Don't use Taupe for long text (captions only).

## A4. Typography
- **Headings — Playfair Display** (display sizes ~20px+; it's high-contrast, keep it off small UI).
- **Body & UI — Nunito** (all paragraphs, buttons, forms, labels).
- **Accents — Quicker Script**, very sparingly (a tagline word, a "welcome home" note). Never body, prices, or functional text.

Sentence case in running text; the wordmark stays lowercase "hababy & co". Line-height ~1.6. Two weights per family (400 / 600).

## A5. CSS variables (use these in the build)

```css
:root {
  --color-primary:   #B94A48; /* Marrakech Red */
  --color-rose:      #DCA5A1; /* Rose Dust  — fills only */
  --color-sand:      #EAD7C3; /* Sand       — surfaces */
  --color-sage:      #8FA18A; /* Sage       — organic accent */
  --color-taupe:     #A89E94; /* Taupe      — borders/captions */
  --color-ink:       #333333; /* Charcoal   — body text */
  --color-surface:   #FFFFFF;
  --color-page:      #FBF7F1; /* warm off-white page background */

  --font-heading: "Playfair Display", Georgia, serif;
  --font-body:    "Nunito", system-ui, sans-serif;
  --font-accent:  "Quicker Script", cursive;

  --radius-md: 10px;
  --radius-lg: 16px;
}
```

## A6. Patterns, icons, imagery
- **Patterns:** zellige tile, scattered storks, Moroccan trellis — packaging, subtle section backgrounds (behind Sand/white), social tiles. Keep low-contrast behind text.
- **Icon set (outline):** stroller, crib, high chair, car seat, travel cot, baby monitor, bottle, pacifier, changing table, diaper bag, safe & clean, sanitized, calendar, flexible, delivery, location, care, family, package, payment, support, trusted. Consistent stroke weight, in Charcoal or Marrakech Red. Use across categories, How It Works, Safety, trust badges.
- **Photography:** soft natural light, warm neutral tones, real clean gear and calm arrival moments. Manufacturer images allowed early with a discreet "model image; exact item confirmed before delivery" note.

## A7. Voice
Warm, calm, competent. We say "delivered clean and ready", "personally confirmed", "every item checked before it reaches your family", "travel light", with a touch of "welcome home" for the diaspora. We avoid "cheap", "rental listing", "awaiting confirmation". Bilingual English / French (Arabic-Darija warmth where it fits). Taglines: *"Travel light. We've got the baby gear."* · *"Clean, checked, and ready before you arrive."*

---

# PART B — Product & technical build specification

## B0. Instructions to the developer / assistant
- Build the **customer-facing site first**, then the **light admin panel**.
- Use realistic seed data so every page renders, but treat all prices as placeholders the owner will replace.
- **Do not** integrate any card / online payment gateway — payment is handled manually offline (§B7).
- **Do not** build a full automated WhatsApp chatbot — WhatsApp is a click-to-chat handoff with a pre-filled message (§B6).
- Mobile-first is mandatory (most customers arrive on a phone), then scale up.
- Apply the Part A brand system throughout (palette, fonts, logo, icons).

## B1. Pilot business rules (non-negotiable logic)

| Rule | Behaviour |
|---|---|
| **Request-first booking** | Default flow is "Request to book", not instant purchase. After submission show: *"We'll confirm availability and delivery within 24 hours."* No payment on the site. |
| **No same-day orders** | If requested delivery is **< 24h** away, block submission and show same-day is unavailable. |
| **Urgent / priority fee** | **Admin-configurable.** Fields + logic must exist but default to **0 MAD (disabled)** for the pilot. Default tiers when enabled: 48–72h = +200 MAD, 24–48h = +300 MAD, >72h = 0. |
| **Full payment before handover** | All fees + deposit collected **offline before** handover. The site records the chosen method only. |
| **Cash-first payments** | MAD cash, MAD bank transfer, EUR cash, USD cash. Card exists in the schema but is **hidden/disabled**. |
| **Security deposit** | Admin-configurable per product/bundle; shown in summary; refunded after pickup + inspection. |
| **Rabat-only delivery** | Zones: Rabat + nearby (Agdal, Hay Riad, Souissi, Hassan, L'Orangeraie, Témara, Harhoura, optionally Rabat-Salé Airport). Admin-configurable zone list + per-zone fee. |

## B2. Tech stack & architecture
- **Framework:** Next.js (App Router) + TypeScript.
- **Styling:** Tailwind CSS + shadcn/ui; icons lucide-react (or the brand outline set). Wire the Part A CSS variables / fonts (Playfair Display, Nunito via Google Fonts).
- **Backend / DB / Auth / Storage:** Supabase (Postgres, Auth, Storage for images).
- **Hosting:** Vercel + Supabase. All keys in environment variables.
- **Forms/validation:** react-hook-form + zod.
- **i18n:** next-intl. **English + French** at launch; structure for **Arabic** later (RTL-aware).
- **Admin auth:** Supabase Auth, single owner/admin role; admin routes protected; no public sign-up.

```
/app
  /(marketing)   -> home, how-it-works, safety, faq, about, legal
  /rent          -> catalogue + product detail
  /bundles
  /welcome-kits
  /book          -> booking request flow
  /admin         -> protected admin panel
/components  /lib  /messages (en.json, fr.json)  /types
```

## B3. Pages & navigation
**Top nav:** Home · Rent Baby Gear · Bundles · Welcome Kits · How It Works · Safety & Cleaning · FAQ · **Book / WhatsApp** (primary CTA). **Footer:** About Us, Delivery Zones, Terms, Privacy, Deposit Policy, Cancellation Policy, WhatsApp, Instagram, contact.

**Home:** hero (headline + subheadline + "Request a booking" + "Chat on WhatsApp") on a Sand band; value props (travel light · clean & inspected · delivered · local & accountable); 4-step how-it-works; category grid; bundles; Welcome Kits; trust section; audience strip ("for families coming home, expat & embassy families, and visitors to Rabat"); delivery zones; final CTA.

**Rent (catalogue):** product cards (image, name, "from [daily] MAD/day", availability badge, "View & request"); filters by category + delivery date range; availability badge per §B5.

**Product detail:** image gallery (manufacturer images allowed with a "model image; exact item confirmed before delivery" toggle per product); name/category/description; pricing block (daily/weekly/monthly + deposit, all admin-editable); rental date selector showing an **estimate** (§B8); included items; add-ons (sheet, mattress protector, rain cover, towel, bath kit…); safety/age/weight fields (mandatory for car seats & carriers); cleaning/safety notes; availability badge; CTA "Request this item".

**Bundles / detail:** bundle cards + detail mirroring product detail. Seed: Rabat Arrival (cot+stroller+high chair); Sleep Easy (cot+protector+2 sheets+bath); Car & City (car seat+compact stroller); Grandparents Hosting (cot+high chair+bath+welcome kit); Full Baby Setup; New Parent Emergency.

**Welcome Kits:** **sold, not rented** (one-time price, no deposit/return). Seed: Essential, Sleep & Bath, Feeding, Premium Arrival. Customisation: baby age, diaper size, formula/milk preference, allergies/snack restrictions, brand preference. Note brands may vary; confirmed before delivery. Flag organic options with the Sage badge.

**How It Works / Safety & Cleaning / About Us / FAQ / legal:** the 4-step flow + payment-before-handover + deposit; the cleaning & inspection checklist as customer-friendly bullets; story-led parent-to-parent About Us; FAQ (delivery, payment, deposits, currencies, confirmation timing, cancellation, car-seat safety); editable legal pages.

## B4. Booking request flow (6 steps)
1. **Dates & delivery:** start + end, delivery window (Morning 9–12 / Afternoon 14–17 / Evening 17–20), pickup window, delivery type (home/hotel/Airbnb/family/airport/other), zone (exact address optional). If < 24h away → block (same-day message).
2. **Baby details:** age, approx weight, height if relevant, number of children. Required when a car seat/carrier is in the cart.
3. **Items:** products/bundle/add-ons/welcome kits (carried from product pages, editable).
4. **Order summary:** itemised **estimate** (§B8) with "final total confirmed within 24 hours".
5. **Contact & payment preference:** name, phone, email (optional), language; payment method (MAD cash / MAD transfer / EUR cash / USD cash).
6. **Submit:** write `order` (+ `customer`) with status `new`; show confirmation; offer "Continue on WhatsApp" with the pre-filled summary.

## B5. Availability model
Per product/bundle `availability_mode` (admin-configurable): `request` (default, "Request to book") · `confirm` ("Personally confirmed" — car seats, premium strollers, bundles, airport/multi-item) · `on_request` ("Available on request" — special/long-term) · `hidden`. Frame confirmation as care/quality control; never "awaiting confirmation".

## B6. WhatsApp handoff (no chatbot)
Floating WhatsApp button site-wide + as a CTA. On submission, generate a **pre-filled** `https://wa.me/<number>?text=<encoded summary>` (number admin-configurable) with the order summary, **and** save the order to the DB regardless. Confirmation copy: *"Thanks! We've received your request and we'll confirm availability and delivery within 24 hours. You can also continue on WhatsApp now."*

## B7. Payments & currency logic
No on-site payment. Record the chosen method only; owner collects offline before handover. Methods (admin on/off each): MAD cash, MAD bank transfer, EUR cash, USD cash. Card = in schema, `enabled=false`, hidden. **Base currency MAD** — store/display all amounts in MAD. EUR/USD cash use an admin-set manual "daily cash acceptance rate" per currency (includes exchange + handling); the site may show an approximate equivalent labelled "approximate — confirmed before delivery"; owner can override per order. Per order store: currency, MAD total, rate used, foreign amount due, amount received, deposit method, payment notes.

## B8. Pricing & fee logic
> All money values are **admin-configurable** and placeholders until the owner finalises pricing — nothing final hardcoded.

Rental subtotal by length (daily `d`, weekly `w`, monthly `m`): 1–2 days = days×d; 3–6 = days×d with small admin-set discount % or capped subtotal; 7 = w; 8–13 = w + extra days×d (admin); 14 ≈ 1.6×w (admin multiplier); 30 ≈ 2.5–3×w (admin multiplier). **Order total estimate** = rental subtotal(s) + add-ons + welcome kit(s) + delivery fee (by zone) + urgent fee (default 0) + deposit. Show as an estimate with "final total confirmed within 24 hours". Urgent fee from hours-to-delivery using §B1 tiers, default 0. Optional admin minimum order value (default off).

## B9. Data model (Supabase / Postgres, snake_case, add created_at/updated_at)
- **categories**: id, name, slug, display_order, active.
- **products**: id, name, slug, category_id, description, image_gallery(text[]), daily_price_mad, weekly_price_mad, monthly_price_mad, deposit_mad, included_items(text[]), optional_accessories(jsonb), safety_notes, requires_child_details(bool), availability_mode(enum), model_image_note(bool), active.
- **bundles**: id, name, slug, description, included_product_ids(uuid[]), optional_addons(jsonb), base_price_mad, weekly_price_mad, deposit_mad, image, availability_mode, active.
- **accessories**: id, name, linked_product_ids(uuid[]), price_mad, type, rented_or_sold(enum), active.
- **welcome_kits**: id, name, slug, contents(text[]), price_mad, size_options(jsonb), preference_fields(jsonb), is_organic(bool), notes, active.
- **orders**: id, customer_id, status(enum: new|confirmed|paid|delivered|returned|closed|cancelled), rental_start, rental_end, delivery_zone, delivery_type(enum), delivery_address(nullable), delivery_window, pickup_window, baby_details(jsonb), selected_products(jsonb), selected_bundle_id(nullable), add_ons(jsonb), welcome_kit_ids(uuid[]), rental_subtotal_mad, addons_total_mad, welcome_kit_total_mad, delivery_fee_mad, urgent_fee_mad, deposit_mad, total_due_mad, payment_method(enum), currency(enum: MAD|EUR|USD), fx_rate_used, foreign_amount_due, amount_received, payment_notes, internal_notes.
- **customers**: id, name, phone, email(nullable), preferred_language, notes, past_order_count.
- **inventory** (schema now, optional use): item_id, product_id, brand, model, serial_number, purchase_date, source, condition, status, cleaning_status, current_order_id(nullable), notes.
- **settings** (single row / key-value): base_currency, payment_methods_enabled(jsonb), eur_rate, usd_rate, fx_rate_updated_at, public_fx_note, urgent_min_notice_hours, urgent_fee_48_72, urgent_fee_24_48, same_day_enabled(false), delivery_zones(jsonb: name+fee_mad), minimum_order_value_mad, whatsapp_number, card_enabled(false), discount_3_6_days_pct, multiplier_14d, multiplier_30d.
- **content** (CMS-lite): id, key, locale, value — editable copy, FAQs, policy text, zone descriptions.

## B10. Light admin panel (Supabase Auth, single owner)
- **Products / Bundles / Welcome kits:** full CRUD, image upload (Supabase Storage), pricing, deposit, included items, add-ons, safety notes, availability mode, show/hide, organic flag, model-image-note toggle.
- **Orders:** list + detail of all requests; update status; edit any line item, delivery fee, urgent fee, deposit, totals; record payment method/currency/FX rate/amount received/notes; internal notes.
- **Settings:** payment methods on/off; EUR & USD rates (+ per-order override); urgent fee tiers + same-day toggle; delivery zones + fees; minimum order value; WhatsApp number; discount/multiplier values.
- **Content:** edit homepage copy, About Us, FAQ, safety checklist, policy pages.
Keep the admin UI simple (tables + forms); no analytics dashboards for the pilot.

## B11. Ready-to-use copy
- **Hero headline:** "Baby gear rental in Rabat, delivered before you arrive."
- **Subheadline:** "Rent clean, inspected baby equipment for your stay — travel cots, strollers, car seats, high chairs, baby baths, and arrival essentials. Delivered to your home, hotel, or Airbnb."
- **Rabat-only:** "We're piloting in Rabat so we can guarantee quality, punctual delivery, and personal service."
- **Booking confirmation:** "Thanks! We've received your request and we'll confirm availability and delivery within 24 hours."
- **Payment:** "Full payment and deposit are arranged before delivery. We accept MAD cash, MAD bank transfer, and EUR/USD cash by prior agreement. Deposits are refunded after pickup and inspection."
- **FX:** "EUR and USD cash may be accepted using our daily cash acceptance rate, which includes exchange and handling costs and is confirmed before delivery."
- **Safety:** "Every item is cleaned, checked, and prepared before it reaches another family."
- **No same-day:** "Same-day delivery isn't currently available — please request at least 24 hours ahead."

## B12. Build sequence
1. Foundation: Next.js + Tailwind + shadcn + Supabase; settings + content tables; brand theme (logo, palette, fonts); i18n EN/FR.
2. Catalogue: categories, products, product detail, bundles, welcome kits (DB + seed).
3. Booking flow: 6-step request + estimate logic + same-day block + WhatsApp handoff + order write.
4. Light admin: auth + CRUD + orders + settings + content.
5. Trust & polish: Safety/Cleaning, About Us, FAQ, legal, SEO, mobile QA.

## B13. Out of scope for the pilot
Card / online payment gateway; automated WhatsApp chatbot; live FX; toy rentals; baby monitors (unless demand appears); customer accounts; reviews module (use Google Business Profile); multi-city; in-house studio photography pipeline.

## B14. Acceptance checklist
- [ ] Mobile-first across all pages; brand system (palette, Playfair/Nunito, logo, icons) applied.
- [ ] No on-site payment processing anywhere.
- [ ] Booking is request-first; confirmation says "within 24 hours".
- [ ] Deliveries < 24h blocked with the same-day message.
- [ ] Urgent fees exist in code but default to 0.
- [ ] All prices/deposits/fees come from the DB and are editable in admin (nothing final hardcoded).
- [ ] EUR/USD shown as "approximate"; MAD is the stored base.
- [ ] WhatsApp pre-filled message generates AND the order is saved to the DB.
- [ ] Admin manages products, bundles, kits, orders, settings, content without code.
- [ ] EN/FR working; Arabic/RTL structurally possible.

---

*Note: confirm OMPIC trademark clearance for "Hababy" in Morocco before public launch. This brief is a working specification, not legal or final technical sign-off.*
