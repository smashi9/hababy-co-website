-- =============================================================================
-- Hababy & Co - Seed inventory data (Version 1 pilot)
-- =============================================================================
-- Draft file. REVIEW BEFORE RUN. Do NOT run in Supabase until the product owner
-- has reviewed the starter units below.
--
-- Apply order:
--   1. 001_initial_schema.sql
--   2. 002_seed_catalogue.sql
--   3. 003_seed_inventory.sql
--
-- Purpose:
--   Development/testing inventory rows so the public catalogue can distinguish
--   products that have usable stock from products that are currently unavailable.
--
-- What this file deliberately does NOT do:
--   * No customer data.
--   * No order data.
--   * No admin_users rows.
--   * No settings changes.
--   * No real serial numbers or operational stock records.
--
-- Usable inventory rule used by the app:
--   status = 'available'
--   and cleaning_status = 'clean'
--   and current_order_id is null
--
-- All rows below are DEVELOPMENT STARTER UNITS only. Replace with real inventory
-- records before launch.
-- =============================================================================


-- Travel cot: 2 usable units.
insert into public.inventory (
  product_id, brand, model, serial_number, source, condition,
  status, cleaning_status, notes
)
select
  p.id,
  'DEV PLACEHOLDER',
  'Travel cot starter unit 1',
  'DEV-TRAVEL-COT-001',
  'development seed',
  'development placeholder',
  'available',
  'clean',
  'DEV-SEED travel-cot-001'
from public.products p
where p.slug = 'travel-cot'
  and not exists (
    select 1 from public.inventory i
    where i.product_id = p.id and i.notes = 'DEV-SEED travel-cot-001'
  );

insert into public.inventory (
  product_id, brand, model, serial_number, source, condition,
  status, cleaning_status, notes
)
select
  p.id,
  'DEV PLACEHOLDER',
  'Travel cot starter unit 2',
  'DEV-TRAVEL-COT-002',
  'development seed',
  'development placeholder',
  'available',
  'clean',
  'DEV-SEED travel-cot-002'
from public.products p
where p.slug = 'travel-cot'
  and not exists (
    select 1 from public.inventory i
    where i.product_id = p.id and i.notes = 'DEV-SEED travel-cot-002'
  );


-- Compact stroller: 1 usable unit.
insert into public.inventory (
  product_id, brand, model, serial_number, source, condition,
  status, cleaning_status, notes
)
select
  p.id,
  'DEV PLACEHOLDER',
  'Compact stroller starter unit',
  'DEV-COMPACT-STROLLER-001',
  'development seed',
  'development placeholder',
  'available',
  'clean',
  'DEV-SEED compact-stroller-001'
from public.products p
where p.slug = 'compact-stroller'
  and not exists (
    select 1 from public.inventory i
    where i.product_id = p.id and i.notes = 'DEV-SEED compact-stroller-001'
  );


-- Full-size stroller: present but not usable, to test unavailable UI.
insert into public.inventory (
  product_id, brand, model, serial_number, source, condition,
  status, cleaning_status, notes
)
select
  p.id,
  'DEV PLACEHOLDER',
  'Full-size stroller starter unit',
  'DEV-FULL-STROLLER-001',
  'development seed',
  'development placeholder',
  'cleaning',
  'needs_cleaning',
  'DEV-SEED full-size-stroller-001'
from public.products p
where p.slug = 'full-size-stroller'
  and not exists (
    select 1 from public.inventory i
    where i.product_id = p.id and i.notes = 'DEV-SEED full-size-stroller-001'
  );


-- Infant car seat: 1 usable unit. Parent selects the appropriate group from specs.
insert into public.inventory (
  product_id, brand, model, serial_number, source, condition,
  status, cleaning_status, notes
)
select
  p.id,
  'DEV PLACEHOLDER',
  'Infant car seat starter unit',
  'DEV-INFANT-CAR-SEAT-001',
  'development seed',
  'development placeholder',
  'available',
  'clean',
  'DEV-SEED infant-car-seat-001'
from public.products p
where p.slug = 'infant-car-seat'
  and not exists (
    select 1 from public.inventory i
    where i.product_id = p.id and i.notes = 'DEV-SEED infant-car-seat-001'
  );


-- Toddler car seat: present but not usable, to test unavailable UI.
insert into public.inventory (
  product_id, brand, model, serial_number, source, condition,
  status, cleaning_status, notes
)
select
  p.id,
  'DEV PLACEHOLDER',
  'Toddler car seat starter unit',
  'DEV-TODDLER-CAR-SEAT-001',
  'development seed',
  'development placeholder',
  'maintenance',
  'maintenance_needed',
  'DEV-SEED toddler-car-seat-001'
from public.products p
where p.slug = 'toddler-car-seat'
  and not exists (
    select 1 from public.inventory i
    where i.product_id = p.id and i.notes = 'DEV-SEED toddler-car-seat-001'
  );


-- High chair: 1 usable unit.
insert into public.inventory (
  product_id, brand, model, serial_number, source, condition,
  status, cleaning_status, notes
)
select
  p.id,
  'DEV PLACEHOLDER',
  'High chair starter unit',
  'DEV-HIGH-CHAIR-001',
  'development seed',
  'development placeholder',
  'available',
  'clean',
  'DEV-SEED high-chair-001'
from public.products p
where p.slug = 'high-chair'
  and not exists (
    select 1 from public.inventory i
    where i.product_id = p.id and i.notes = 'DEV-SEED high-chair-001'
  );


-- Baby bath: 1 usable unit.
insert into public.inventory (
  product_id, brand, model, serial_number, source, condition,
  status, cleaning_status, notes
)
select
  p.id,
  'DEV PLACEHOLDER',
  'Baby bath starter unit',
  'DEV-BABY-BATH-001',
  'development seed',
  'development placeholder',
  'available',
  'clean',
  'DEV-SEED baby-bath-001'
from public.products p
where p.slug = 'baby-bath'
  and not exists (
    select 1 from public.inventory i
    where i.product_id = p.id and i.notes = 'DEV-SEED baby-bath-001'
  );


-- Changing mat intentionally has no starter inventory row, so it should appear
-- currently unavailable until a clean available unit is added.

-- =============================================================================
-- End of 003_seed_inventory.sql
-- =============================================================================
