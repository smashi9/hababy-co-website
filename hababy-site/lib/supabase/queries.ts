import { createServerSupabaseClient } from "./server";

export type InventoryAvailability = {
  total_inventory_count: number;
  usable_inventory_count: number;
  has_usable_inventory: boolean;
};

export type ProductSummary = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  daily_price_mad: number;
  weekly_price_mad: number;
  deposit_mad: number;
  availability_mode: string;
  display_order: number;
  inventory_availability: InventoryAvailability;
};

export type ProductDetail = ProductSummary & {
  image_gallery: string[];
  monthly_price_mad: number;
  included_items: string[];
  optional_accessories: unknown[];
  safety_notes: string | null;
  cleaning_notes: string | null;
  age_guidance: string | null;
  weight_guidance: string | null;
  height_guidance: string | null;
  requires_child_details: boolean;
  model_image_note: boolean;
};

type ProductSummaryRow = Omit<ProductSummary, "inventory_availability">;
type ProductDetailRow = Omit<ProductDetail, "inventory_availability">;

const unavailableInventory: InventoryAvailability = {
  total_inventory_count: 0,
  usable_inventory_count: 0,
  has_usable_inventory: false,
};

async function getInventoryAvailabilityByProductId(
  productIds: string[]
): Promise<Map<string, InventoryAvailability>> {
  const inventoryByProductId = new Map<string, InventoryAvailability>();

  for (const productId of productIds) {
    inventoryByProductId.set(productId, { ...unavailableInventory });
  }

  if (productIds.length === 0) {
    return inventoryByProductId;
  }

  try {
    const { createAdminSupabaseClient } = await import("./admin");
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase
      .from("inventory")
      .select("product_id, status, cleaning_status, current_order_id")
      .in("product_id", productIds);

    if (error) {
      console.error("Error fetching inventory availability:", error);
      return inventoryByProductId;
    }

    for (const item of data ?? []) {
      if (!item.product_id) {
        continue;
      }

      const current = inventoryByProductId.get(item.product_id) ?? {
        ...unavailableInventory,
      };
      const isUsable =
        item.status === "available" &&
        item.cleaning_status === "clean" &&
        item.current_order_id === null;

      inventoryByProductId.set(item.product_id, {
        total_inventory_count: current.total_inventory_count + 1,
        usable_inventory_count: current.usable_inventory_count + (isUsable ? 1 : 0),
        has_usable_inventory: current.has_usable_inventory || isUsable,
      });
    }
  } catch (error) {
    console.error("Inventory availability could not be loaded:", error);
  }

  return inventoryByProductId;
}

async function attachInventoryAvailability<T extends ProductSummaryRow>(
  products: T[]
): Promise<(T & { inventory_availability: InventoryAvailability })[]> {
  const inventoryByProductId = await getInventoryAvailabilityByProductId(
    products.map((product) => product.id)
  );

  return products.map((product) => ({
    ...product,
    inventory_availability:
      inventoryByProductId.get(product.id) ?? { ...unavailableInventory },
  }));
}

export async function getProductSummaries(): Promise<ProductSummary[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, slug, description, daily_price_mad, weekly_price_mad, deposit_mad, availability_mode, display_order"
    )
    .eq("active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching product summaries:", error);
    throw new Error("Could not fetch product summaries.");
  }

  return attachInventoryAvailability((data ?? []) as ProductSummaryRow[]);
}

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
        id,
        name,
        slug,
        description,
        image_gallery,
        daily_price_mad,
        weekly_price_mad,
        monthly_price_mad,
        deposit_mad,
        included_items,
        optional_accessories,
        safety_notes,
        cleaning_notes,
        age_guidance,
        weight_guidance,
        height_guidance,
        requires_child_details,
        availability_mode,
        model_image_note,
        display_order
      `
    )
    .eq("active", true)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching product by slug "${slug}":`, error);
    throw new Error("Could not fetch product details.");
  }

  if (!data) {
    return null;
  }

  const [product] = await attachInventoryAvailability([data as ProductDetailRow]);

  return product;
}
