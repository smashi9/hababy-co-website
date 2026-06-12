import type { ProductSummary } from "@/lib/supabase/queries";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products }: { products: ProductSummary[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-taupe/25 bg-white px-5 py-8 text-center">
        <h2 className="text-xl font-extrabold text-ink">Catalogue is being prepared</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-ink/72">
          Product data is not available yet. Hababy & Co will add active rental gear before
          public launch.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
