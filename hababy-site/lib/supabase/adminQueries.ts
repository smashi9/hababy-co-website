import "server-only";

import { redirect } from "next/navigation";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { createSupabaseServerAuthClient } from "./serverAuth";
import { isEmailAllowedForAdmin } from "./authConfig";
import type {
  AdminOrderDetail,
  AdminOrderListItem,
  SelectedProductSnapshot,
} from "@/types/order";
import type { AdminProductDetail, AdminProductListItem } from "@/types/product";
import type { AdminSettings } from "@/types/settings";
import type {
  AdminInventoryOverview,
  AdminInventoryItemDetail,
  AdminInventoryProductSummary,
  AdminInventoryUnit,
  InventoryCleaningStatus,
  InventoryStatus,
} from "@/types/inventory";
import type { OrderStatusUpdateInput } from "@/lib/validation/orderStatusSchema";
import type { InventoryUpdateInput } from "@/lib/validation/inventoryUpdateSchema";
import type { ProductUpdateInput } from "@/lib/validation/productUpdateSchema";
import type { SettingsUpdateInput } from "@/lib/validation/settingsUpdateSchema";

type AdminAccessResult = {
  supabase: SupabaseClient;
  user: User;
};

type AdminOrderRow = Omit<AdminOrderDetail, "selected_products" | "customer"> & {
  selected_products: unknown;
  customer: AdminOrderDetail["customer"] | AdminOrderDetail["customer"][];
};

type AdminInventoryProductRow = {
  id: string;
  name: string;
  slug: string;
  availability_mode: string;
  inventory: AdminInventoryUnitRow[] | null;
};

type AdminInventoryUnitRow = {
  item_id: string;
  product_id: string | null;
  brand: string | null;
  model: string | null;
  serial_number: string | null;
  purchase_date: string | null;
  source: string | null;
  condition: string | null;
  status: InventoryStatus;
  cleaning_status: InventoryCleaningStatus;
  current_order_id: string | null;
  notes: string | null;
};

type AdminInventoryItemRow = AdminInventoryUnitRow & {
  product:
    | {
    id: string;
    name: string;
    slug: string;
      }
    | {
        id: string;
        name: string;
        slug: string;
      }[]
    | null;
};

type AdminProductRow = AdminProductDetail & {
  category:
    | {
        name: string;
      }
    | {
        name: string;
      }[]
    | null;
};

type AdminSettingsRow = Omit<AdminSettings, "eur_rate" | "usd_rate" | "discount_3_6_days_pct" | "multiplier_14d" | "multiplier_30d"> & {
  eur_rate: number | string | null;
  usd_rate: number | string | null;
  discount_3_6_days_pct: number | string;
  multiplier_14d: number | string;
  multiplier_30d: number | string;
};

export async function hasAdminUserAccess(supabase: SupabaseClient, user: User) {
  if (!isEmailAllowedForAdmin(user.email)) {
    return false;
  }

  const { data, error } = await supabase
    .from("admin_users")
    .select("id")
    .eq("user_id", user.id)
    .eq("active", true)
    .limit(1);

  if (error) {
    return false;
  }

  return Boolean(data?.[0]?.id);
}

export async function getVerifiedAdminSession(): Promise<AdminAccessResult | null> {
  const supabase = await createSupabaseServerAuthClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const isAdmin = await hasAdminUserAccess(supabase, user);

  if (!isAdmin) {
    return null;
  }

  return { supabase, user };
}

export async function requireVerifiedAdminSession() {
  const adminSession = await getVerifiedAdminSession();

  if (!adminSession) {
    redirect("/admin/login");
  }

  return adminSession;
}

function normalizeNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function normalizeText(value: unknown) {
  return typeof value === "string" && value.trim() ? value : null;
}

function normalizeNullableDecimal(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : null;
  }

  return null;
}

function normalizeRequiredDecimal(value: unknown) {
  return normalizeNullableDecimal(value) ?? 0;
}

export function getShortOrderReference(orderId: string) {
  return orderId.slice(0, 8).toUpperCase();
}

export function parseSelectedProducts(value: unknown): SelectedProductSnapshot[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const product = item as Record<string, unknown>;
      const name = normalizeText(product.name);

      if (!name) {
        return null;
      }

      return {
        name,
        slug: normalizeText(product.slug),
        quantity: normalizeNumber(product.quantity),
        subtotalMad:
          normalizeNumber(product.subtotal_mad) ??
          normalizeNumber(product.estimated_rental_subtotal_mad),
        depositMad: normalizeNumber(product.deposit_mad),
      };
    })
    .filter((item): item is SelectedProductSnapshot => Boolean(item));
}

function mapOrderRow<T extends AdminOrderRow>(row: T) {
  const customer = Array.isArray(row.customer) ? row.customer[0] ?? null : row.customer;

  return {
    ...row,
    customer,
    selected_products: parseSelectedProducts(row.selected_products),
  };
}

function isInventoryUnitUsable(unit: AdminInventoryUnitRow) {
  return (
    unit.status === "available" &&
    unit.cleaning_status === "clean" &&
    unit.current_order_id === null
  );
}

function getInventoryStatusSummary({
  usableStockCount,
  needsCleaningCount,
  maintenanceCount,
}: {
  usableStockCount: number;
  needsCleaningCount: number;
  maintenanceCount: number;
}) {
  if (usableStockCount > 0) {
    return "Available to request";
  }

  if (maintenanceCount > 0) {
    return "Maintenance";
  }

  if (needsCleaningCount > 0) {
    return "Needs cleaning";
  }

  return "Currently unavailable";
}

function mapInventoryProductRow(row: AdminInventoryProductRow) {
  const inventory = row.inventory ?? [];
  const units: AdminInventoryUnit[] = inventory.map((unit) => ({
    ...unit,
    product_name: row.name,
    product_slug: row.slug,
    usable_for_request: isInventoryUnitUsable(unit),
  }));
  const usableStockCount = units.filter((unit) => unit.usable_for_request).length;
  const needsCleaningCount = units.filter(
    (unit) =>
      unit.cleaning_status === "needs_cleaning" || unit.cleaning_status === "inspection_needed"
  ).length;
  const maintenanceCount = units.filter(
    (unit) => unit.status === "maintenance" || unit.cleaning_status === "maintenance_needed"
  ).length;
  const unavailableCount = units.length - usableStockCount;
  const summary: AdminInventoryProductSummary = {
    product_id: row.id,
    product_name: row.name,
    product_slug: row.slug,
    availability_mode: row.availability_mode,
    usable_stock_count: usableStockCount,
    total_inventory_units: units.length,
    unavailable_count: unavailableCount,
    needs_cleaning_count: needsCleaningCount,
    maintenance_count: maintenanceCount,
    status_summary: getInventoryStatusSummary({
      usableStockCount,
      needsCleaningCount,
      maintenanceCount,
    }),
  };

  return { summary, units };
}

export async function getAdminOrders(): Promise<AdminOrderListItem[]> {
  const { supabase } = await requireVerifiedAdminSession();
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
        id,
        created_at,
        status,
        rental_start,
        rental_end,
        delivery_zone,
        delivery_type,
        selected_products,
        rental_subtotal_mad,
        deposit_mad,
        total_due_mad,
        payment_method,
        currency,
        customer:customers (
          id,
          name,
          phone
        )
      `
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Could not load admin orders.");
  }

  return ((data ?? []) as AdminOrderRow[]).map(mapOrderRow);
}

function mapAdminProductRow(row: AdminProductRow): AdminProductDetail {
  const category = Array.isArray(row.category) ? row.category[0] ?? null : row.category;

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category_name: category?.name ?? null,
    description: row.description,
    safety_notes: row.safety_notes,
    cleaning_notes: row.cleaning_notes,
    age_guidance: row.age_guidance,
    weight_guidance: row.weight_guidance,
    height_guidance: row.height_guidance,
    daily_price_mad: row.daily_price_mad,
    weekly_price_mad: row.weekly_price_mad,
    monthly_price_mad: row.monthly_price_mad,
    deposit_mad: row.deposit_mad,
    featured: row.featured,
    display_order: row.display_order,
    active: row.active,
    availability_mode: row.availability_mode,
    requires_child_details: row.requires_child_details,
    model_image_note: row.model_image_note,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function getAdminProducts(): Promise<AdminProductListItem[]> {
  const { supabase } = await requireVerifiedAdminSession();
  const { data, error } = await supabase
    .from("products")
    .select(
      `
        id,
        name,
        slug,
        daily_price_mad,
        weekly_price_mad,
        monthly_price_mad,
        deposit_mad,
        featured,
        display_order,
        active,
        availability_mode
      `
    )
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error("Could not load admin products.");
  }

  return (data ?? []) as AdminProductListItem[];
}

function mapAdminSettingsRow(row: AdminSettingsRow): AdminSettings {
  return {
    ...row,
    eur_rate: normalizeNullableDecimal(row.eur_rate),
    usd_rate: normalizeNullableDecimal(row.usd_rate),
    discount_3_6_days_pct: normalizeRequiredDecimal(row.discount_3_6_days_pct),
    multiplier_14d: normalizeRequiredDecimal(row.multiplier_14d),
    multiplier_30d: normalizeRequiredDecimal(row.multiplier_30d),
  };
}

export async function getAdminSettings(): Promise<AdminSettings> {
  const { supabase } = await requireVerifiedAdminSession();
  const { data, error } = await supabase
    .from("settings")
    .select(
      `
        id,
        base_currency,
        whatsapp_number,
        public_fx_note,
        eur_rate,
        usd_rate,
        fx_rate_updated_at,
        card_enabled,
        same_day_enabled,
        urgent_min_notice_hours,
        urgent_fee_48_72,
        urgent_fee_24_48,
        minimum_order_value_mad,
        discount_3_6_days_pct,
        multiplier_14d,
        multiplier_30d,
        created_at,
        updated_at
      `
    )
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error("Could not load admin settings.");
  }

  if (!data) {
    throw new Error("Settings row is missing. Ask for Claude/SQL policy review before continuing.");
  }

  return mapAdminSettingsRow(data as AdminSettingsRow);
}

export async function updateAdminSettings(
  input: SettingsUpdateInput
): Promise<{ ok: true } | { ok: false; message: string }> {
  const { supabase } = await requireVerifiedAdminSession();
  const { data: currentData, error: currentError } = await supabase
    .from("settings")
    .select("id, eur_rate, usd_rate, fx_rate_updated_at")
    .eq("id", input.id)
    .maybeSingle();

  if (currentError) {
    return {
      ok: false,
      message: "Could not load the existing settings row. Please refresh and try again.",
    };
  }

  if (!currentData?.id) {
    return {
      ok: false,
      message: "Settings were not updated because the singleton settings row was not found.",
    };
  }

  const currentEurRate = normalizeNullableDecimal(currentData.eur_rate);
  const currentUsdRate = normalizeNullableDecimal(currentData.usd_rate);
  const fxRateChanged = currentEurRate !== input.eur_rate || currentUsdRate !== input.usd_rate;
  const updatePayload: {
    whatsapp_number: string | null;
    public_fx_note: string | null;
    eur_rate: number | null;
    usd_rate: number | null;
    fx_rate_updated_at?: string;
  } = {
    whatsapp_number: input.whatsapp_number,
    public_fx_note: input.public_fx_note,
    eur_rate: input.eur_rate,
    usd_rate: input.usd_rate,
  };

  if (fxRateChanged) {
    updatePayload.fx_rate_updated_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("settings")
    .update(updatePayload)
    .eq("id", input.id)
    .select("id")
    .maybeSingle();

  if (error) {
    return {
      ok: false,
      message: "Could not update settings. Please refresh and try again.",
    };
  }

  if (!data?.id) {
    return {
      ok: false,
      message: "Settings were not updated because the existing settings row was not found.",
    };
  }

  return { ok: true };
}

export async function getAdminProductById(id: string): Promise<AdminProductDetail | null> {
  const { supabase } = await requireVerifiedAdminSession();
  const { data, error } = await supabase
    .from("products")
    .select(
      `
        id,
        name,
        slug,
        description,
        safety_notes,
        cleaning_notes,
        age_guidance,
        weight_guidance,
        height_guidance,
        daily_price_mad,
        weekly_price_mad,
        monthly_price_mad,
        deposit_mad,
        featured,
        display_order,
        active,
        availability_mode,
        requires_child_details,
        model_image_note,
        created_at,
        updated_at,
        category:categories (
          name
        )
      `
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error("Could not load this product.");
  }

  return data ? mapAdminProductRow(data as unknown as AdminProductRow) : null;
}

export async function updateAdminProduct(
  input: ProductUpdateInput
): Promise<{ ok: true } | { ok: false; message: string }> {
  const { supabase } = await requireVerifiedAdminSession();
  const { data, error } = await supabase
    .from("products")
    .update({
      name: input.name,
      description: input.description,
      safety_notes: input.safety_notes,
      cleaning_notes: input.cleaning_notes,
      age_guidance: input.age_guidance,
      weight_guidance: input.weight_guidance,
      height_guidance: input.height_guidance,
      daily_price_mad: input.daily_price_mad,
      weekly_price_mad: input.weekly_price_mad,
      monthly_price_mad: input.monthly_price_mad,
      deposit_mad: input.deposit_mad,
      featured: input.featured,
      display_order: input.display_order,
    })
    .eq("id", input.id)
    .select("id")
    .maybeSingle();

  if (error) {
    return {
      ok: false,
      message: "Could not update this product. Please refresh and try again.",
    };
  }

  if (!data?.id) {
    return {
      ok: false,
      message: "This product was not updated because it could not be found.",
    };
  }

  return { ok: true };
}

export async function getAdminInventoryOverview(): Promise<AdminInventoryOverview> {
  const { supabase } = await requireVerifiedAdminSession();
  const { data, error } = await supabase
    .from("products")
    .select(
      `
        id,
        name,
        slug,
        availability_mode,
        inventory (
          item_id,
          product_id,
          brand,
          model,
          serial_number,
          purchase_date,
          source,
          condition,
          status,
          cleaning_status,
          current_order_id,
          notes
        )
      `
    )
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error("Could not load admin inventory.");
  }

  const mapped = ((data ?? []) as AdminInventoryProductRow[]).map(mapInventoryProductRow);

  return {
    products: mapped.map((item) => item.summary),
    units: mapped.flatMap((item) => item.units),
  };
}

function mapInventoryItemRow(row: AdminInventoryItemRow): AdminInventoryItemDetail {
  const product = Array.isArray(row.product) ? row.product[0] ?? null : row.product;

  return {
    item_id: row.item_id,
    product_id: row.product_id,
    product_name: product?.name ?? "Unlinked product",
    product_slug: product?.slug ?? null,
    brand: row.brand,
    model: row.model,
    serial_number: row.serial_number,
    purchase_date: row.purchase_date,
    source: row.source,
    condition: row.condition,
    status: row.status,
    cleaning_status: row.cleaning_status,
    current_order_id: row.current_order_id,
    notes: row.notes,
    usable_for_request: isInventoryUnitUsable(row),
  };
}

export async function getAdminInventoryItemById(
  itemId: string
): Promise<AdminInventoryItemDetail | null> {
  const { supabase } = await requireVerifiedAdminSession();
  const { data, error } = await supabase
    .from("inventory")
    .select(
      `
        item_id,
        product_id,
        brand,
        model,
        serial_number,
        purchase_date,
        source,
        condition,
        status,
        cleaning_status,
        current_order_id,
        notes,
        product:products (
          id,
          name,
          slug
        )
      `
    )
    .eq("item_id", itemId)
    .maybeSingle();

  if (error) {
    throw new Error("Could not load this inventory item.");
  }

  return data ? mapInventoryItemRow(data as unknown as AdminInventoryItemRow) : null;
}

export async function updateAdminInventoryItem(
  input: InventoryUpdateInput
): Promise<{ ok: true } | { ok: false; message: string }> {
  const { supabase } = await requireVerifiedAdminSession();
  const { data, error } = await supabase
    .from("inventory")
    .update({
      status: input.status,
      cleaning_status: input.cleaning_status,
      condition: input.condition,
      notes: input.notes,
      source: input.source,
    })
    .eq("item_id", input.itemId)
    .is("current_order_id", null)
    .select("item_id")
    .maybeSingle();

  if (error) {
    return {
      ok: false,
      message: "Could not update this inventory item. Please refresh and try again.",
    };
  }

  if (!data?.item_id) {
    return {
      ok: false,
      message:
        "This inventory item was not updated because it is missing or linked to an order.",
    };
  }

  return { ok: true };
}

export async function getAdminOrderById(id: string): Promise<AdminOrderDetail | null> {
  const { supabase } = await requireVerifiedAdminSession();
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
        id,
        created_at,
        status,
        rental_start,
        rental_end,
        delivery_zone,
        delivery_type,
        delivery_window,
        pickup_window,
        selected_products,
        rental_subtotal_mad,
        addons_total_mad,
        welcome_kit_total_mad,
        delivery_fee_mad,
        urgent_fee_mad,
        deposit_mad,
        total_due_mad,
        payment_method,
        currency,
        payment_notes,
        internal_notes,
        customer:customers (
          id,
          name,
          phone,
          email,
          preferred_language,
          notes
        )
      `
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error("Could not load admin order.");
  }

  return data ? mapOrderRow(data as AdminOrderRow) : null;
}

export async function updateAdminOrderStatus({
  orderId,
  targetStatus,
}: OrderStatusUpdateInput): Promise<{ ok: true } | { ok: false; message: string }> {
  const { supabase } = await requireVerifiedAdminSession();
  const { data, error } = await supabase
    .from("orders")
    .update({
      status: targetStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId)
    .eq("status", "new")
    .select("id")
    .maybeSingle();

  if (error) {
    return {
      ok: false,
      message: "Could not update this request status. Please refresh and try again.",
    };
  }

  if (!data?.id) {
    return {
      ok: false,
      message: "This request can no longer be changed here because it is not new.",
    };
  }

  return { ok: true };
}
