import type { Metadata } from "next";
import { RequestForm } from "@/components/request/RequestForm";
import { fallbackProductSummaries } from "@/components/catalogue/fallbackProducts";
import type { ProductSummary } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Request baby gear | Hababy & Co",
  description:
    "Send a request for available baby gear in Rabat. Hababy & Co reviews availability, delivery, payment/deposit, and handover before approval.",
};

type RequestPageProps = {
  searchParams: Promise<{
    product?: string | string[];
  }>;
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
    console.warn("Request flow fell back to local preview data:", error);
    return { products: fallbackProductSummaries, isFallback: true };
  }
}

function getProductParam(product: string | string[] | undefined) {
  if (Array.isArray(product)) {
    return product[0] ?? null;
  }

  return product ?? null;
}

export default async function RequestPage({ searchParams }: RequestPageProps) {
  const { product } = await searchParams;
  const { products, isFallback } = await loadProducts();
  const selectedProductSlug = getProductParam(product);

  return (
    <main>
      <section className="bg-sand/60 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold text-primary">Request baby gear</p>
            <h1 className="mt-4 font-heading text-4xl leading-tight text-ink sm:text-5xl">
              Send a request for available Hababy & Co gear.
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink/76">
              Choose your rental dates, delivery details, contact information, and offline payment
              preference. This is a request for review, not an instant confirmed booking.
            </p>
          </div>

          <div className="mt-8 grid gap-4 rounded-[1.5rem] border border-taupe/25 bg-white p-5 text-sm leading-6 text-ink/72 md:grid-cols-3">
            <p>
              <strong className="text-ink">Availability first:</strong> only products with clean
              available stock can be requested.
            </p>
            <p>
              <strong className="text-ink">Pilot notice:</strong> same-day requests are blocked for
              now.
            </p>
            <p>
              <strong className="text-ink">No online payment:</strong> payment and deposit are
              arranged before handover.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-page">
        <div>
          {isFallback ? (
            <div className="mb-6 rounded-[1.25rem] border border-taupe/25 bg-white px-5 py-4 text-sm leading-6 text-ink/72">
              Showing development preview products because Supabase catalogue data is unavailable or
              empty. Preview products may be unavailable until inventory is seeded.
            </div>
          ) : null}
          <RequestForm products={products} initialProductSlug={selectedProductSlug} />
        </div>
      </section>
    </main>
  );
}
