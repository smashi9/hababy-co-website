import type { Metadata } from "next";
import { ProductGrid } from "@/components/catalogue/ProductGrid";
import { fallbackProductSummaries } from "@/components/catalogue/fallbackProducts";
import type { ProductSummary } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Rent baby gear in Rabat | Hababy & Co",
  description:
    "Browse clean, checked baby gear for Rabat stays. Request products first and Hababy & Co confirms availability, delivery, and offline payment details.",
};

async function loadProducts(): Promise<{
  products: ProductSummary[];
  isFallback: boolean;
}> {
  try {
    const { getProductSummaries } = await import("@/lib/supabase/queries");
    const products = await getProductSummaries();

    return {
      products: products.length > 0 ? products : fallbackProductSummaries,
      isFallback: products.length === 0,
    };
  } catch (error) {
    console.warn("Catalogue fell back to local preview data:", error);
    return { products: fallbackProductSummaries, isFallback: true };
  }
}

export default async function ProductsPage() {
  const { products, isFallback } = await loadProducts();

  return (
    <main>
      <section className="bg-sand/60 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold text-primary">Rent baby gear</p>
            <h1 className="mt-4 font-heading text-4xl leading-tight text-ink sm:text-5xl">
              Browse the first Hababy & Co rental catalogue.
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink/76">
              Choose what your family needs for Rabat, then send a request when
              usable stock exists. Hababy & Co still confirms item condition,
              cleanliness, requested dates, delivery feasibility, and payment/deposit
              details before handover.
            </p>
          </div>

          <div className="mt-8 grid gap-4 rounded-[1.5rem] border border-taupe/25 bg-white p-5 text-sm leading-6 text-ink/72 md:grid-cols-3">
            <p>
              <strong className="text-ink">Availability check:</strong> products with no clean available units cannot be requested.
            </p>
            <p>
              <strong className="text-ink">Request-first:</strong> submitting interest does not instantly confirm a booking.
            </p>
            <p>
              <strong className="text-ink">Personally checked:</strong> condition, cleaning, dates, delivery, and payment/deposit are confirmed before handover.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-page">
        <div>
          {isFallback ? (
            <div className="mb-6 rounded-[1.25rem] border border-taupe/25 bg-white px-5 py-4 text-sm leading-6 text-ink/72">
              Showing development preview products because Supabase catalogue data is unavailable or empty.
            </div>
          ) : null}
          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  );
}
