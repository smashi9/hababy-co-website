import { HomePage, type HomeProductSummary } from "@/components/home/HomePage";

async function loadProductSummaries(): Promise<HomeProductSummary[]> {
  try {
    const { getProductSummaries } = await import("@/lib/supabase/queries");
    return await getProductSummaries();
  } catch (error) {
    console.warn("Product preview fell back to local placeholders:", error);
    return [];
  }
}

export default async function Home() {
  const products = await loadProductSummaries();

  return <HomePage products={products} />;
}
