import { createServerSupabaseClient } from "./server";

export type ProductSummary = {
  id: string;
  name: string;
  slug: string;
  daily_price_mad: number;
  weekly_price_mad: number;
  deposit_mad: number;
  availability_mode: string;
  display_order: number;
};

export async function getProductSummaries(): Promise<ProductSummary[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, slug, daily_price_mad, weekly_price_mad, deposit_mad, availability_mode, display_order"
    )
    .eq("active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching product summaries:", error);
    throw new Error("Could not fetch product summaries.");
  }

  return data ?? [];
}