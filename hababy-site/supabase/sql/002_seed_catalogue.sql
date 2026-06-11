-- =============================================================================
-- Hababy & Co — Seed catalogue data (Version 1 pilot)
-- =============================================================================
-- Draft file. Do NOT run in Supabase until reviewed by the product owner.
-- Apply 001_initial_schema.sql FIRST; this file depends on those tables/enums.
--
-- Purpose: realistic-but-PLACEHOLDER starter data so the site renders during
-- development — categories, products, accessories, bundles, Welcome Kits, and
-- editable content copy.
--
-- !!! REVIEW BEFORE LAUNCH !!!
--   * EVERY price and deposit below is a PLACEHOLDER in MAD. None are final.
--     The owner must set real pricing/deposits before the pilot goes live.
--   * All product/bundle/kit descriptions are placeholder marketing copy.
--   * Legal/policy content rows are stubs and are NOT legally reviewed.
--   * Product↔category assignments are best-guess placeholders.
--
-- What this file deliberately does NOT do (per task + schema rules):
--   * No real customer data (table left empty).
--   * No order data (table left empty).
--   * No admin_users rows (admin bootstrap is manual/server-side — see 001).
--   * No settings changes. The default settings row is created by 001. Delivery
--     zones and the WhatsApp number are configured in settings separately; a
--     placeholder WhatsApp number is intentionally NOT seeded (a visible
--     placeholder number is a launch blocker per 07-test-plan.md).
--
-- Re-runnable design:
--   * Money is INTEGER MAD; base currency is MAD (EUR/USD are offline-only).
--   * Catalogue tables use `on conflict (slug) do nothing` so re-running the
--     file will NOT overwrite later owner edits (it only fills gaps).
--   * Content uses `on conflict (key, locale) do nothing`.
--   * Accessories have no natural unique key in the schema, so they use an
--     `insert ... select ... where not exists (name match)` guard instead.
--   * Bundles/accessories resolve product references by slug at insert time,
--     so no hardcoded UUIDs are needed.
-- =============================================================================


-- -----------------------------------------------------------------------------
-- 1. Categories
-- -----------------------------------------------------------------------------
-- display_order is a placeholder ordering; adjust in admin as desired.
insert into public.categories (name, slug, description, display_order) values
  ('Travel cots',       'travel-cots',       'PLACEHOLDER: Travel cots and portable sleep solutions.', 1),
  ('Strollers',         'strollers',         'PLACEHOLDER: Compact and full-size strollers.',           2),
  ('Car seats',         'car-seats',         'PLACEHOLDER: Infant and toddler car seats.',              3),
  ('High chairs',       'high-chairs',       'PLACEHOLDER: Feeding high chairs.',                       4),
  ('Baby baths',        'baby-baths',        'PLACEHOLDER: Baby baths and changing essentials.',        5),
  ('Feeding',           'feeding',           'PLACEHOLDER: Feeding gear and accessories.',              6),
  ('Sleep accessories', 'sleep-accessories', 'PLACEHOLDER: Sleep-related extras and add-ons.',          7)
on conflict (slug) do nothing;


-- -----------------------------------------------------------------------------
-- 2. Products
-- -----------------------------------------------------------------------------
-- PLACEHOLDER pricing (MAD). category_id is resolved from the category slug.
-- Car seats are safety-sensitive: requires_child_details = true and they use
-- availability_mode 'confirm' (Personally confirmed) per the trust model.
-- model_image_note = true means "Model image; exact item confirmed before
-- delivery." (manufacturer images may be used early in the pilot).

insert into public.products (
  name, slug, category_id, description,
  daily_price_mad, weekly_price_mad, monthly_price_mad, deposit_mad,
  included_items, safety_notes, cleaning_notes,
  age_guidance, weight_guidance,
  requires_child_details, availability_mode, model_image_note,
  featured, display_order
) values
  (
    'Travel cot', 'travel-cot',
    (select id from public.categories where slug = 'travel-cots'),
    'PLACEHOLDER: Compact, sturdy travel cot suitable for newborns and toddlers. Cleaned and inspected before delivery.',
    60, 300, 900, 500,
    array['Travel cot frame', 'Mattress pad', 'Carry bag'],
    'PLACEHOLDER: Follow manufacturer weight/age limits.',
    'PLACEHOLDER: Cleaned and inspected before each rental.',
    'PLACEHOLDER: Newborn to ~3 years', 'PLACEHOLDER: Up to ~15 kg',
    false, 'request', true,
    true, 1
  ),
  (
    'Compact stroller', 'compact-stroller',
    (select id from public.categories where slug = 'strollers'),
    'PLACEHOLDER: Lightweight, foldable stroller ideal for travel and city use.',
    50, 250, 750, 400,
    array['Stroller', 'Rain cover'],
    'PLACEHOLDER: Always use the harness.',
    'PLACEHOLDER: Cleaned and inspected before each rental.',
    'PLACEHOLDER: ~6 months and up', 'PLACEHOLDER: Up to ~22 kg',
    false, 'request', true,
    false, 2
  ),
  (
    'Full-size stroller', 'full-size-stroller',
    (select id from public.categories where slug = 'strollers'),
    'PLACEHOLDER: Full-size stroller with extra comfort and storage.',
    70, 350, 1000, 600,
    array['Stroller', 'Rain cover', 'Storage basket'],
    'PLACEHOLDER: Always use the harness.',
    'PLACEHOLDER: Cleaned and inspected before each rental.',
    'PLACEHOLDER: Newborn and up (with recline)', 'PLACEHOLDER: Up to ~22 kg',
    false, 'request', true,
    true, 3
  ),
  (
    'Infant car seat', 'infant-car-seat',
    (select id from public.categories where slug = 'car-seats'),
    'PLACEHOLDER: Rear-facing infant car seat. Personally confirmed for safety before delivery.',
    50, 250, 700, 500,
    array['Infant car seat', 'Base (if available)'],
    'PLACEHOLDER: Child age/weight/height required. Fitting and suitability personally confirmed before handover.',
    'PLACEHOLDER: Cleaned and inspected before each rental.',
    'PLACEHOLDER: Newborn to ~12 months', 'PLACEHOLDER: ~0–13 kg',
    true, 'confirm', true,
    false, 4
  ),
  (
    'Toddler car seat', 'toddler-car-seat',
    (select id from public.categories where slug = 'car-seats'),
    'PLACEHOLDER: Forward-facing toddler car seat. Personally confirmed for safety before delivery.',
    55, 270, 750, 500,
    array['Toddler car seat'],
    'PLACEHOLDER: Child age/weight/height required. Fitting and suitability personally confirmed before handover.',
    'PLACEHOLDER: Cleaned and inspected before each rental.',
    'PLACEHOLDER: ~9 months to 4 years', 'PLACEHOLDER: ~9–18 kg',
    true, 'confirm', true,
    false, 5
  ),
  (
    'High chair', 'high-chair',
    (select id from public.categories where slug = 'high-chairs'),
    'PLACEHOLDER: Stable feeding high chair with removable tray.',
    40, 200, 600, 300,
    array['High chair', 'Tray'],
    'PLACEHOLDER: Always use the harness.',
    'PLACEHOLDER: Cleaned and inspected before each rental.',
    'PLACEHOLDER: ~6 months and up', 'PLACEHOLDER: Up to ~15 kg',
    false, 'request', true,
    false, 6
  ),
  (
    'Baby bath', 'baby-bath',
    (select id from public.categories where slug = 'baby-baths'),
    'PLACEHOLDER: Newborn-friendly baby bath.',
    25, 120, 350, 150,
    array['Baby bath tub'],
    'PLACEHOLDER: Never leave a child unattended during bathing.',
    'PLACEHOLDER: Cleaned and sanitised before each rental.',
    'PLACEHOLDER: Newborn and up', null,
    false, 'request', true,
    false, 7
  ),
  (
    'Changing mat', 'changing-mat',
    (select id from public.categories where slug = 'baby-baths'),
    'PLACEHOLDER: Wipe-clean changing mat. (Placeholder category assignment — review.)',
    20, 100, 300, 100,
    array['Changing mat'],
    null,
    'PLACEHOLDER: Wiped down and sanitised before each rental.',
    'PLACEHOLDER: Newborn and up', null,
    false, 'request', true,
    false, 8
  )
on conflict (slug) do nothing;


-- -----------------------------------------------------------------------------
-- 3. Accessories
-- -----------------------------------------------------------------------------
-- The accessories table has no unique key besides id, so each row is guarded
-- with `where not exists (name match)` to stay re-runnable without altering the
-- schema. linked_product_ids is resolved from product slugs at insert time.
-- rented_or_sold: most are rented add-ons; consumable-style items are 'sold'.
-- PLACEHOLDER prices (MAD).

insert into public.accessories (name, description, linked_product_ids, price_mad, type, rented_or_sold)
select
  'Extra fitted sheet',
  'PLACEHOLDER: Spare fitted sheet for the travel cot.',
  array(select id from public.products where slug = 'travel-cot'),
  30, 'bedding', 'rented'
where not exists (select 1 from public.accessories where name = 'Extra fitted sheet');

insert into public.accessories (name, description, linked_product_ids, price_mad, type, rented_or_sold)
select
  'Mattress protector',
  'PLACEHOLDER: Waterproof mattress protector for the travel cot.',
  array(select id from public.products where slug = 'travel-cot'),
  30, 'bedding', 'rented'
where not exists (select 1 from public.accessories where name = 'Mattress protector');

insert into public.accessories (name, description, linked_product_ids, price_mad, type, rented_or_sold)
select
  'Rain cover',
  'PLACEHOLDER: Universal rain cover for strollers.',
  array(select id from public.products where slug = any (array['compact-stroller', 'full-size-stroller'])),
  25, 'stroller', 'rented'
where not exists (select 1 from public.accessories where name = 'Rain cover');

insert into public.accessories (name, description, linked_product_ids, price_mad, type, rented_or_sold)
select
  'Bath towel',
  'PLACEHOLDER: Soft hooded bath towel.',
  array(select id from public.products where slug = 'baby-bath'),
  20, 'bath', 'rented'
where not exists (select 1 from public.accessories where name = 'Bath towel');

insert into public.accessories (name, description, linked_product_ids, price_mad, type, rented_or_sold)
select
  'Bottle brush',
  'PLACEHOLDER: Bottle brush (sold, not rented — hygiene item).',
  '{}'::uuid[],
  25, 'feeding', 'sold'
where not exists (select 1 from public.accessories where name = 'Bottle brush');

insert into public.accessories (name, description, linked_product_ids, price_mad, type, rented_or_sold)
select
  'Travel bag',
  'PLACEHOLDER: Protective travel/carry bag for gear.',
  '{}'::uuid[],
  40, 'travel', 'rented'
where not exists (select 1 from public.accessories where name = 'Travel bag');


-- -----------------------------------------------------------------------------
-- 4. Bundles
-- -----------------------------------------------------------------------------
-- Curated placeholder bundles. included_product_ids is resolved from product
-- slugs at insert time (array of UUIDs). PLACEHOLDER pricing (MAD).
-- Bundles that include a car seat are set to 'confirm' (safety review).

insert into public.bundles (
  name, slug, description, included_product_ids,
  base_price_mad, weekly_price_mad, monthly_price_mad, deposit_mad,
  availability_mode, featured, display_order
) values
  (
    'Rabat Arrival', 'rabat-arrival',
    'PLACEHOLDER: Arrival-day essentials — somewhere to sleep and a way to get around.',
    array(select id from public.products where slug = any (array['travel-cot', 'compact-stroller'])),
    120, 550, 1500, 800,
    'request', true, 1
  ),
  (
    'Sleep Easy', 'sleep-easy',
    'PLACEHOLDER: A calm, clean sleep setup for your stay.',
    array(select id from public.products where slug = any (array['travel-cot', 'changing-mat'])),
    80, 380, 1100, 600,
    'request', false, 2
  ),
  (
    'Car & City', 'car-city',
    'PLACEHOLDER: Safe travel by car and easy movement around the city.',
    array(select id from public.products where slug = any (array['infant-car-seat', 'compact-stroller'])),
    100, 480, 1300, 900,
    'confirm', false, 3
  ),
  (
    'Grandparents Hosting', 'grandparents-hosting',
    'PLACEHOLDER: Everything grandparents need when little ones visit.',
    array(select id from public.products where slug = any (array['travel-cot', 'high-chair', 'baby-bath'])),
    110, 520, 1450, 800,
    'request', false, 4
  ),
  (
    'Full Baby Setup', 'full-baby-setup',
    'PLACEHOLDER: A complete setup while you settle in or wait for your shipment.',
    array(select id from public.products where slug = any (array['travel-cot', 'full-size-stroller', 'high-chair', 'infant-car-seat'])),
    180, 850, 2400, 1200,
    'confirm', true, 5
  ),
  (
    'New Parent Emergency', 'new-parent-emergency',
    'PLACEHOLDER: Quick essentials for an unexpected arrival.',
    array(select id from public.products where slug = any (array['travel-cot', 'baby-bath', 'changing-mat'])),
    90, 420, 1200, 600,
    'request', false, 6
  )
on conflict (slug) do nothing;


-- -----------------------------------------------------------------------------
-- 5. Welcome Kits (SOLD, not rented — one-time price)
-- -----------------------------------------------------------------------------
-- PLACEHOLDER pricing (MAD). preference_fields is a JSON array of field keys the
-- booking form may collect; brands/contents are confirmed before delivery.

insert into public.welcome_kits (
  name, slug, description, contents,
  price_mad, preference_fields, is_organic, notes,
  featured, display_order
) values
  (
    'Essential', 'essential',
    'PLACEHOLDER: Arrival-day basics to get you started.',
    array['Diapers (size to confirm)', 'Wipes', 'Nappy bags', 'Basic toiletries'],
    250, '["baby_age", "diaper_size"]'::jsonb, false,
    'PLACEHOLDER: Brands may vary and are confirmed before delivery.',
    false, 1
  ),
  (
    'Sleep & Bath', 'sleep-bath',
    'PLACEHOLDER: Calm-night and bath-time essentials.',
    array['Diapers (size to confirm)', 'Wipes', 'Baby wash', 'Bath sponge', 'Soft towel'],
    300, '["baby_age", "diaper_size", "allergies"]'::jsonb, false,
    'PLACEHOLDER: Brands may vary and are confirmed before delivery.',
    false, 2
  ),
  (
    'Feeding', 'feeding',
    'PLACEHOLDER: Feeding-day essentials for bottle or weaning.',
    array['Bottles (count to confirm)', 'Formula or milk (preference to confirm)', 'Bibs', 'Bottle brush'],
    280, '["baby_age", "formula_preference", "allergies", "snack_restrictions"]'::jsonb, false,
    'PLACEHOLDER: Formula/milk preference confirmed before delivery. Brands may vary.',
    false, 3
  ),
  (
    'Premium Arrival', 'premium-arrival',
    'PLACEHOLDER: Our most complete arrival kit, with organic options.',
    array['Premium diapers (size to confirm)', 'Organic wipes', 'Organic toiletries', 'Bath set', 'Feeding basics'],
    600, '["baby_age", "diaper_size", "allergies", "brand_preference", "organic_preference"]'::jsonb, true,
    'PLACEHOLDER: Organic options where available. Brands may vary and are confirmed before delivery.',
    true, 4
  )
on conflict (slug) do nothing;


-- -----------------------------------------------------------------------------
-- 6. Content (editable site copy)
-- -----------------------------------------------------------------------------
-- English ('en') starter copy only. FRENCH ('fr') rows must be added before a
-- bilingual launch (01-product-requirements.md requires EN + FR).
-- Marketing copy is taken from the ready-to-use copy in the planning docs;
-- policy rows are PLACEHOLDER stubs and are NOT legally reviewed.
-- content_type: 'text' for short strings, 'markdown' for longer body copy.

insert into public.content (key, locale, value, content_type) values
  -- Homepage hero
  (
    'home.hero.headline', 'en',
    'Baby gear rental in Rabat, delivered before you arrive.',
    'text'
  ),
  (
    'home.hero.subheadline', 'en',
    'Rent clean, inspected baby equipment for your stay — travel cots, strollers, car seats, high chairs, baby baths, and arrival essentials. Delivered to your home, hotel, or Airbnb.',
    'text'
  ),
  -- Rabat pilot positioning
  (
    'home.rabat_pilot.copy', 'en',
    'We''re piloting in Rabat so we can guarantee quality, punctual delivery, and personal service.',
    'text'
  ),
  -- Booking confirmation
  (
    'booking.confirmation', 'en',
    'Thanks! We''ve received your request and we''ll confirm availability and delivery within 24 hours. You can also continue on WhatsApp now.',
    'text'
  ),
  -- Same-day blocked message
  (
    'booking.same_day_blocked', 'en',
    'Same-day delivery isn''t currently available — please request at least 24 hours ahead.',
    'text'
  ),
  -- Safety & cleaning
  (
    'safety.headline', 'en',
    'Every item is cleaned, checked, and prepared before it reaches another family.',
    'text'
  ),
  (
    'safety.cleaning_checklist', 'en',
    'PLACEHOLDER: Items are cleaned and sanitised, inspected for safety, and safety-sensitive items such as car seats are personally confirmed before delivery. Items are inspected again after pickup.',
    'markdown'
  ),
  -- Payment copy
  (
    'payment.copy', 'en',
    'Full payment and deposit are arranged before delivery. We accept MAD cash, MAD bank transfer, and EUR/USD cash by prior agreement. Deposits are refunded after pickup and inspection.',
    'markdown'
  ),
  -- FAQ starter items
  (
    'faq.booking', 'en',
    'PLACEHOLDER: You send a request, we personally confirm availability and delivery within 24 hours, and payment is arranged offline before handover.',
    'markdown'
  ),
  (
    'faq.delivery', 'en',
    'PLACEHOLDER: We deliver across Rabat and nearby areas. Delivery zones and any fees are confirmed before delivery.',
    'markdown'
  ),
  (
    'faq.payment', 'en',
    'PLACEHOLDER: We accept MAD cash, MAD bank transfer, and EUR/USD cash by prior agreement. There is no online payment — payment is arranged before delivery.',
    'markdown'
  ),
  (
    'faq.deposit', 'en',
    'PLACEHOLDER: Some items require a refundable deposit, shown in your estimate and refunded after pickup and inspection.',
    'markdown'
  ),
  (
    'faq.same_day', 'en',
    'PLACEHOLDER: Same-day delivery isn''t available during the pilot. Please request at least 24 hours ahead.',
    'markdown'
  ),
  (
    'faq.car_seat_safety', 'en',
    'PLACEHOLDER: For car seats we collect your child''s age, weight, and height, and personally confirm suitability before delivery.',
    'markdown'
  ),
  -- About
  (
    'about.story', 'en',
    'PLACEHOLDER: Hababy & Co is a parent-led baby gear rental service, created to make family travel to Rabat easier. We are intentionally local so we can guarantee quality and personal service. Replace with the final About copy before launch.',
    'markdown'
  ),
  -- Policy placeholders (NOT legally reviewed)
  (
    'policy.terms', 'en',
    'PLACEHOLDER — Terms of service. Replace with reviewed legal copy before launch.',
    'markdown'
  ),
  (
    'policy.privacy', 'en',
    'PLACEHOLDER — Privacy policy. Replace with reviewed legal copy before launch.',
    'markdown'
  ),
  (
    'policy.deposit', 'en',
    'PLACEHOLDER — Deposit policy. Replace with reviewed legal copy before launch.',
    'markdown'
  ),
  (
    'policy.cancellation', 'en',
    'PLACEHOLDER — Cancellation policy. Replace with reviewed legal copy before launch.',
    'markdown'
  ),
  (
    'policy.delivery_zones', 'en',
    'PLACEHOLDER — Delivery zones description. Replace with reviewed copy and final zones before launch.',
    'markdown'
  )
on conflict (key, locale) do nothing;

-- =============================================================================
-- End of 002_seed_catalogue.sql
-- =============================================================================
