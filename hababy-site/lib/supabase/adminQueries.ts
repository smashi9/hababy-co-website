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

type AdminAccessResult = {
  supabase: SupabaseClient;
  user: User;
};

type AdminOrderRow = Omit<AdminOrderDetail, "selected_products" | "customer"> & {
  selected_products: unknown;
  customer: AdminOrderDetail["customer"] | AdminOrderDetail["customer"][];
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
