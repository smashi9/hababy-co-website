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
