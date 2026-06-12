import { createServerSupabaseClient } from "./server";

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

  return data ?? [];
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

  return data;
}
