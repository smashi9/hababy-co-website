-- =============================================================================
-- Hababy & Co — Initial Supabase / PostgreSQL schema (Version 1 pilot)
-- =============================================================================
-- Draft file. Do NOT run in Supabase until reviewed by the product owner.
--
-- Scope: Rabat-only request-first booking pilot.
-- Source of truth for this schema: 06-backend-plan.md (cross-checked against
-- 00-project-brief.md, 01-product-requirements.md, 03-architecture-plan.md,
-- 07-test-plan.md).
--
-- Design principles baked into this file:
--   * Request-first booking: every booking is saved as an order with status 'new'.
--   * No online payment in Version 1: we only RECORD a preferred payment method.
--   * MAD is the base currency; EUR/USD are offline cash options only.
--   * Card payment exists in the data model but is DISABLED by default.
--   * Same-day delivery is DISABLED by default; urgent fees default to 0.
--   * WhatsApp handoff never replaces order saving (order is always persisted).
--   * Money is stored as INTEGER MAD (minor exchange amounts use numeric).
--   * Conservative Row Level Security: public can read active catalogue/content
--     only; customers/orders are never publicly readable; writes happen through
--     server-side code (service role) or an authenticated admin.
--
-- Security model recap (matches lib/supabase/*.ts):
--   * Public site read       -> anon key   -> RLS applies (this file's policies).
--   * Booking submission     -> service role on the server -> bypasses RLS.
--   * Admin panel writes      -> service role on the server -> bypasses RLS.
--   * Authenticated admin     -> covered by is_admin() policies as a safety net.
--
-- This file is written to be re-runnable (idempotent) so a beginner can apply it
-- more than once without errors. It intentionally creates NO seed/business data,
-- except a single default `settings` row.
-- =============================================================================


-- -----------------------------------------------------------------------------
-- 0. Extensions
-- -----------------------------------------------------------------------------
-- gen_random_uuid() comes from pgcrypto. Supabase usually enables this already,
-- but we guard it so the file works on a fresh project too.
create extension if not exists pgcrypto;

-- Defensive cleanup: a `public_settings` view existed in an earlier draft of
-- this schema and was removed for V1. Drop it here in case that draft was ever
-- applied, so no stale public-facing view lingers.
drop view if exists public.public_settings;


-- -----------------------------------------------------------------------------
-- 1. Enum types
-- -----------------------------------------------------------------------------
-- We use real PostgreSQL enum types for the small, well-bounded value sets that
-- the business rules depend on. Enums give us database-level validation so bad
-- values (e.g. an unknown order status) can never be written, even by a buggy
-- server action. New values can be added later with: ALTER TYPE ... ADD VALUE.
--
-- DECISION: enums are intentional for Version 1. If they prove too rigid later
-- (e.g. the owner needs to add/rename values frequently from the Supabase table
-- editor), they can be swapped for plain `text` columns with CHECK constraints
-- in a future migration. Keeping them as enums for now for stronger guarantees.
--
-- Each `create type` is wrapped in a guard so re-running the file is safe.

do $$ begin
  -- Catalogue availability mode (products & bundles).
  -- request    = "Request to book"      (default)
  -- confirm    = "Personally confirmed"
  -- on_request = "Available on request"
  -- hidden     = hidden from the public catalogue
  create type availability_mode as enum ('request', 'confirm', 'on_request', 'hidden');
exception when duplicate_object then null; end $$;

do $$ begin
  -- Order lifecycle. Every new booking request starts as 'new'.
  create type order_status as enum (
    'new', 'confirmed', 'paid', 'delivered', 'returned', 'closed', 'cancelled'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  -- Preferred payment method (RECORDED only — no online processing in V1).
  -- 'card' exists for forward compatibility but is DISABLED in the pilot
  -- (see settings.card_enabled and settings.payment_methods_enabled).
  create type payment_method as enum (
    'mad_cash', 'mad_bank_transfer', 'eur_cash', 'usd_cash', 'card'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  -- Currency. MAD is always the base/source currency; EUR/USD are offline cash.
  create type currency_code as enum ('MAD', 'EUR', 'USD');
exception when duplicate_object then null; end $$;

do $$ begin
  -- Delivery types offered in the booking flow.
  create type delivery_type as enum (
    'home', 'hotel', 'airbnb', 'family_home', 'airport', 'other'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  -- Physical inventory status (inventory is light/optional in V1).
  create type inventory_status as enum (
    'available', 'reserved', 'out', 'cleaning', 'maintenance', 'retired'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  -- Cleaning / inspection status for a physical inventory item.
  create type cleaning_status as enum (
    'clean', 'needs_cleaning', 'inspection_needed', 'maintenance_needed'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  -- Whether an accessory is rented with the gear or sold outright.
  create type accessory_kind as enum ('rented', 'sold');
exception when duplicate_object then null; end $$;


-- -----------------------------------------------------------------------------
-- 2. Shared helper: updated_at trigger function
-- -----------------------------------------------------------------------------
-- NOTE: is_admin() is intentionally NOT defined here. Because it is a SQL
-- function that reads public.admin_users, that table must exist first or
-- creation fails. is_admin() is defined just below the admin_users table (3.0).

-- Keeps `updated_at` in sync on every UPDATE. Attached to every table below.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- -----------------------------------------------------------------------------
-- 3. Tables
-- -----------------------------------------------------------------------------

-- 3.0 admin_users -------------------------------------------------------------
-- Maps a Supabase Auth user (auth.users) to admin access for this project.
-- V1 expects a single owner/admin, but the table supports more later.
-- There is NO public sign-up; rows are added manually / via service role.
create table if not exists public.admin_users (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null unique references auth.users (id) on delete cascade,
  email       text,
  role        text not null default 'owner',
  active      boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ADMIN BOOTSTRAP (read before relying on admin RLS):
--   1. Create the owner's account in Supabase Auth (Dashboard > Authentication,
--      or via the API). This gives you a row in auth.users with a user id.
--   2. Insert that user into admin_users so is_admin() recognises them, e.g.:
--        insert into public.admin_users (user_id, email)
--        values ('<auth-user-uuid>', 'owner@example.com');
--   3. Until that row exists, the authenticated-admin RLS policies below grant
--      NOTHING — is_admin() returns false for everyone.
--   This bootstrap insert should be done server-side / with the service role
--   (it bypasses RLS), since the admin_users table is itself locked down.

-- is_admin(): true when the current authenticated user is an active admin.
-- Defined here (not in section 2) because it reads public.admin_users, which
-- must already exist. SECURITY DEFINER lets it read admin_users even though that
-- table is locked down by RLS. search_path is pinned to public to avoid
-- search_path hijacking.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users a
    where a.user_id = auth.uid()
      and a.active = true
  );
$$;

-- 3.1 categories --------------------------------------------------------------
create table if not exists public.categories (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text not null unique,
  description   text,
  display_order integer not null default 0,
  active        boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists categories_active_idx        on public.categories (active);
create index if not exists categories_display_order_idx on public.categories (display_order);

-- 3.2 products ----------------------------------------------------------------
-- All prices are INTEGER MAD. Final business prices come from the DB/admin,
-- never hardcoded in the UI.
create table if not exists public.products (
  id                   uuid primary key default gen_random_uuid(),
  name                 text not null,
  slug                 text not null unique,
  category_id          uuid references public.categories (id) on delete set null,
  description          text,
  image_gallery        text[] not null default '{}',
  daily_price_mad      integer not null default 0 check (daily_price_mad   >= 0),
  weekly_price_mad     integer not null default 0 check (weekly_price_mad  >= 0),
  monthly_price_mad    integer not null default 0 check (monthly_price_mad >= 0),
  deposit_mad          integer not null default 0 check (deposit_mad       >= 0),
  included_items       text[] not null default '{}',
  optional_accessories jsonb not null default '[]',
  safety_notes         text,
  cleaning_notes       text,
  age_guidance         text,
  weight_guidance      text,
  height_guidance      text,
  -- When true (e.g. car seats, carriers), the booking flow must collect baby
  -- details before the request can be submitted (enforced in app code).
  requires_child_details boolean not null default false,
  availability_mode    availability_mode not null default 'request',
  model_image_note     boolean not null default false,
  active               boolean not null default true,
  featured             boolean not null default false,
  display_order        integer not null default 0,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);
create index if not exists products_category_idx      on public.products (category_id);
create index if not exists products_active_idx         on public.products (active);
create index if not exists products_featured_idx       on public.products (featured);
create index if not exists products_availability_idx   on public.products (availability_mode);

-- 3.3 bundles -----------------------------------------------------------------
-- included_product_ids is a plain uuid[] for V1 simplicity (no junction table).
-- A junction table can replace this later if referential integrity is needed.
create table if not exists public.bundles (
  id                   uuid primary key default gen_random_uuid(),
  name                 text not null,
  slug                 text not null unique,
  description          text,
  included_product_ids uuid[] not null default '{}',
  optional_addons      jsonb not null default '[]',
  image                text,
  base_price_mad       integer not null default 0 check (base_price_mad    >= 0),
  weekly_price_mad     integer not null default 0 check (weekly_price_mad  >= 0),
  monthly_price_mad    integer not null default 0 check (monthly_price_mad >= 0),
  deposit_mad          integer not null default 0 check (deposit_mad       >= 0),
  availability_mode    availability_mode not null default 'request',
  active               boolean not null default true,
  featured             boolean not null default false,
  display_order        integer not null default 0,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);
create index if not exists bundles_active_idx       on public.bundles (active);
create index if not exists bundles_featured_idx     on public.bundles (featured);
create index if not exists bundles_availability_idx on public.bundles (availability_mode);

-- 3.4 accessories -------------------------------------------------------------
create table if not exists public.accessories (
  id                 uuid primary key default gen_random_uuid(),
  name               text not null,
  description        text,
  linked_product_ids uuid[] not null default '{}',
  price_mad          integer not null default 0 check (price_mad >= 0),
  type               text,
  rented_or_sold     accessory_kind not null default 'rented',
  active             boolean not null default true,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);
create index if not exists accessories_active_idx on public.accessories (active);

-- 3.5 welcome_kits ------------------------------------------------------------
-- Welcome Kits are SOLD, not rented. Single one-time price in MAD.
create table if not exists public.welcome_kits (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  slug              text not null unique,
  description       text,
  contents          text[] not null default '{}',
  image             text,
  price_mad         integer not null default 0 check (price_mad >= 0),
  size_options      jsonb not null default '[]',
  preference_fields jsonb not null default '[]',
  is_organic        boolean not null default false,
  notes             text,
  active            boolean not null default true,
  featured          boolean not null default false,
  display_order     integer not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create index if not exists welcome_kits_active_idx   on public.welcome_kits (active);
create index if not exists welcome_kits_featured_idx on public.welcome_kits (featured);

-- 3.6 customers ---------------------------------------------------------------
-- Customers do NOT have accounts in V1. Records are created server-side when a
-- booking is submitted. This table holds personal data and is NEVER publicly
-- readable (see RLS below).
create table if not exists public.customers (
  id                 uuid primary key default gen_random_uuid(),
  name               text not null,
  phone              text not null,
  email              text,
  preferred_language text not null default 'en',
  notes              text,
  past_order_count   integer not null default 0,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);
-- Phone is the soft "matching key" for repeat customers (matching is done in
-- app code in V1). Indexed for quick lookup; not unique because data may be
-- messy during the pilot (duplicate/blank handling stays in app logic).
create index if not exists customers_phone_idx on public.customers (phone);

-- 3.7 orders ------------------------------------------------------------------
-- A booking request. Created with status 'new'. Holds the estimate snapshot,
-- recorded (offline) payment preference, and the generated WhatsApp message.
-- Contains sensitive operational data -> never publicly readable.
create table if not exists public.orders (
  id          uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers (id) on delete set null,
  status      order_status not null default 'new',

  -- Rental period.
  rental_start date not null,
  rental_end   date not null,

  -- Delivery / pickup details.
  delivery_zone    text,
  delivery_type    delivery_type,
  delivery_address text,
  delivery_window  text,
  pickup_window    text,

  -- Baby details captured for safety-sensitive items.
  baby_details jsonb not null default '{}',

  -- Selected items. Stored as JSON snapshots so the order keeps what was
  -- requested even if a product/bundle is later edited or hidden.
  selected_products jsonb  not null default '[]',
  selected_bundle_id uuid  references public.bundles (id) on delete set null,
  add_ons            jsonb  not null default '[]',
  welcome_kit_ids    uuid[] not null default '{}',

  -- Estimate breakdown (all INTEGER MAD). These are estimates until the owner
  -- confirms; total_due_mad is the sum the customer sees.
  rental_subtotal_mad   integer not null default 0 check (rental_subtotal_mad   >= 0),
  addons_total_mad      integer not null default 0 check (addons_total_mad      >= 0),
  welcome_kit_total_mad integer not null default 0 check (welcome_kit_total_mad >= 0),
  delivery_fee_mad      integer not null default 0 check (delivery_fee_mad      >= 0),
  urgent_fee_mad        integer not null default 0 check (urgent_fee_mad        >= 0),
  deposit_mad           integer not null default 0 check (deposit_mad           >= 0),
  total_due_mad         integer not null default 0 check (total_due_mad         >= 0),

  -- Payment preference is RECORDED ONLY. No online payment happens in V1.
  payment_method     payment_method,
  currency           currency_code not null default 'MAD',
  fx_rate_used        numeric,
  foreign_amount_due  numeric,
  amount_received     integer check (amount_received >= 0),

  -- Notes. payment_notes / internal_notes are admin-only and must never leak
  -- to the public or into the WhatsApp message.
  payment_notes  text,
  internal_notes text,

  -- WhatsApp handoff snapshot. Generated AFTER the order is saved; the order
  -- exists regardless of whether the customer clicks through to WhatsApp.
  whatsapp_message text,
  whatsapp_link    text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Rental end cannot be before rental start.
  constraint orders_rental_dates_valid check (rental_end >= rental_start)
);
create index if not exists orders_customer_idx   on public.orders (customer_id);
create index if not exists orders_status_idx      on public.orders (status);
create index if not exists orders_created_at_idx  on public.orders (created_at desc);
create index if not exists orders_rental_start_idx on public.orders (rental_start);

-- 3.8 inventory ---------------------------------------------------------------
-- Light, optional in V1. Foundation for tracking physical items later.
-- Note the PK is `item_id` (per 06-backend-plan.md), not `id`.
create table if not exists public.inventory (
  item_id          uuid primary key default gen_random_uuid(),
  product_id       uuid references public.products (id) on delete set null,
  brand            text,
  model            text,
  serial_number    text,
  purchase_date    date,
  source           text,
  condition        text,
  status           inventory_status not null default 'available',
  cleaning_status  cleaning_status  not null default 'clean',
  current_order_id uuid references public.orders (id) on delete set null,
  notes            text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create index if not exists inventory_product_idx       on public.inventory (product_id);
create index if not exists inventory_status_idx         on public.inventory (status);
create index if not exists inventory_current_order_idx  on public.inventory (current_order_id);

-- 3.9 settings ----------------------------------------------------------------
-- Single-row global settings (beginner-friendly per 06-backend-plan.md).
-- A partial unique index enforces "only one row" so the admin can't create
-- duplicates by accident.
--
-- IMPORTANT — settings is ADMIN / SERVER-ONLY in Version 1:
--   * This table mixes public-safe values (whatsapp_number, delivery zones,
--     which payment methods are on) with values that must NOT be exposed
--     wholesale (fx rates, multipliers, minimum_order_value_mad). RLS cannot
--     hide individual columns, so the ENTIRE table is admin-only (no anon
--     read policy is created below).
--   * The public site must NOT read this table directly from the browser.
--     Instead, a server-side Next.js route/action (running with the service
--     role) should read settings and return ONLY a whitelisted, public-safe
--     subset to the client. That whitelist lives in app code, not the database.
--     (A database view was intentionally NOT used for V1 to keep the public
--     surface small and explicit.)
--   * The service-role key must NEVER be exposed to client/browser code. It
--     belongs only in server-side files (see lib/supabase/admin.ts), and only
--     NEXT_PUBLIC_* variables may reach the browser.
create table if not exists public.settings (
  id                      uuid primary key default gen_random_uuid(),
  base_currency           currency_code not null default 'MAD',

  -- Which payment methods are enabled. Card is disabled at launch.
  payment_methods_enabled jsonb not null default
    '{"mad_cash": true, "mad_bank_transfer": true, "eur_cash": true, "usd_cash": true, "card": false}'::jsonb,

  -- Manual FX. No live FX API in V1.
  eur_rate           numeric,
  usd_rate           numeric,
  fx_rate_updated_at  timestamptz,
  public_fx_note      text,

  -- Urgent / same-day controls. All "off" at launch.
  urgent_min_notice_hours integer not null default 24,
  urgent_fee_48_72        integer not null default 0 check (urgent_fee_48_72 >= 0),
  urgent_fee_24_48        integer not null default 0 check (urgent_fee_24_48 >= 0),
  same_day_enabled        boolean not null default false,

  -- Delivery zones as JSON, e.g. [{ "name": "Rabat", "fee_mad": 0, "active": true }].
  delivery_zones jsonb not null default '[]',

  minimum_order_value_mad integer check (minimum_order_value_mad >= 0),

  whatsapp_number text,
  card_enabled    boolean not null default false,

  -- Pricing knobs (admin-configurable). Discount is non-negative; multipliers
  -- must be strictly positive (a zero/negative multiplier would break pricing).
  discount_3_6_days_pct numeric not null default 0   check (discount_3_6_days_pct >= 0),
  multiplier_14d        numeric not null default 1.6 check (multiplier_14d > 0),
  multiplier_30d        numeric not null default 2.7 check (multiplier_30d > 0),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
-- Enforce a single settings row.
create unique index if not exists settings_singleton_idx on public.settings ((true));

-- 3.10 content ----------------------------------------------------------------
-- Lightweight CMS for editable public copy. Keyed by (key, locale) for i18n.
create table if not exists public.content (
  id           uuid primary key default gen_random_uuid(),
  key          text not null,
  locale       text not null,
  value        text not null,
  content_type text not null default 'text',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (key, locale)
);
create index if not exists content_key_idx on public.content (key);


-- -----------------------------------------------------------------------------
-- 4. updated_at triggers
-- -----------------------------------------------------------------------------
-- One trigger per table. Drop-then-create keeps the file re-runnable.
do $$
declare
  t text;
  tables text[] := array[
    'admin_users','categories','products','bundles','accessories',
    'welcome_kits','customers','orders','inventory','settings','content'
  ];
begin
  foreach t in array tables loop
    execute format('drop trigger if exists set_updated_at on public.%I;', t);
    execute format(
      'create trigger set_updated_at before update on public.%I
         for each row execute function public.set_updated_at();', t);
  end loop;
end $$;


-- -----------------------------------------------------------------------------
-- 5. Row Level Security
-- -----------------------------------------------------------------------------
-- Enable RLS on every table. With RLS enabled and no matching policy, the anon
-- role can read/write NOTHING by default — exactly what we want for sensitive
-- tables. The service-role key used by server code bypasses RLS entirely, which
-- is how booking submissions and admin writes happen in V1.

alter table public.admin_users  enable row level security;
alter table public.categories   enable row level security;
alter table public.products     enable row level security;
alter table public.bundles      enable row level security;
alter table public.accessories  enable row level security;
alter table public.welcome_kits enable row level security;
alter table public.customers    enable row level security;
alter table public.orders       enable row level security;
alter table public.inventory    enable row level security;
alter table public.settings     enable row level security;
alter table public.content      enable row level security;

-- 5.1 Public read policies (anon + authenticated) -----------------------------
-- Public visitors may read ACTIVE catalogue rows only. Products/bundles that
-- are hidden via availability_mode are additionally excluded.

drop policy if exists categories_public_read on public.categories;
create policy categories_public_read on public.categories
  for select to anon, authenticated
  using (active = true);

drop policy if exists products_public_read on public.products;
create policy products_public_read on public.products
  for select to anon, authenticated
  using (active = true and availability_mode <> 'hidden');

drop policy if exists bundles_public_read on public.bundles;
create policy bundles_public_read on public.bundles
  for select to anon, authenticated
  using (active = true and availability_mode <> 'hidden');

drop policy if exists accessories_public_read on public.accessories;
create policy accessories_public_read on public.accessories
  for select to anon, authenticated
  using (active = true);

drop policy if exists welcome_kits_public_read on public.welcome_kits;
create policy welcome_kits_public_read on public.welcome_kits
  for select to anon, authenticated
  using (active = true);

-- Public copy is meant to be public; the whole content table is readable.
drop policy if exists content_public_read on public.content;
create policy content_public_read on public.content
  for select to anon, authenticated
  using (true);

-- NOTE: there is intentionally NO public policy on settings. With RLS enabled
-- and no anon policy, the browser cannot read it at all. Public-facing settings
-- are served later by server-side Next.js code (service role) that returns only
-- a whitelisted, public-safe subset — never the raw row, and never fields like
-- minimum_order_value_mad, fx rates, or pricing multipliers. No database view
-- is used for this in V1.

-- NOTE: there is intentionally NO public policy on customers, orders,
-- inventory, or admin_users. They are unreadable to anon/authenticated unless
-- the user is an admin (policies below). Booking inserts happen server-side
-- with the service role, which bypasses RLS.

-- 5.2 Admin policies (authenticated admins manage all business data) -----------
-- These let an authenticated owner/admin operate directly under RLS. They are a
-- safety net: in V1 the admin panel actually writes via the service role.
-- One "for all" policy per table keeps it simple.

do $$
declare
  t text;
  business_tables text[] := array[
    'admin_users','categories','products','bundles','accessories',
    'welcome_kits','customers','orders','inventory','settings','content'
  ];
begin
  foreach t in array business_tables loop
    execute format('drop policy if exists %I on public.%I;', t || '_admin_all', t);
    execute format(
      'create policy %I on public.%I
         for all to authenticated
         using (public.is_admin())
         with check (public.is_admin());',
      t || '_admin_all', t);
  end loop;
end $$;


-- -----------------------------------------------------------------------------
-- 6. Default settings row (the only data this file inserts)
-- -----------------------------------------------------------------------------
-- Creates exactly one settings row reflecting the V1 launch defaults:
--   * base currency MAD
--   * MAD cash/transfer + EUR/USD cash enabled, card disabled
--   * same-day disabled, urgent fees 0, 24h minimum notice
--   * no FX rates set yet (owner sets them later)
--   * empty delivery_zones (owner fills these before launch)
-- Guarded so re-running the file does not create a second row.
insert into public.settings (base_currency)
select 'MAD'
where not exists (select 1 from public.settings);

-- =============================================================================
-- End of 001_initial_schema.sql
-- =============================================================================
