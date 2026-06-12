import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/catalogue/ProductDetail";
import { fallbackProductDetails } from "@/components/catalogue/fallbackProducts";
import type { ProductDetail as ProductDetailType } from "@/lib/supabase/queries";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function loadProduct(slug: string): Promise<{
  product: ProductDetailType | null;
  isFallback: boolean;
}> {
  try {
    const { getProductBySlug } = await import("@/lib/supabase/queries");
    const product = await getProductBySlug(slug);

    if (product) {
      return { product, isFallback: false };
    }
  } catch (error) {
    console.warn(`Product detail fell back to local preview data for "${slug}":`, error);
  }

  return {
    product: fallbackProductDetails.find((item) => item.slug === slug) ?? null,
    isFallback: true,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const { product, isFallback } = await loadProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      {isFallback ? (
        <div className="bg-page px-4 py-3 text-center text-sm font-bold text-ink/70">
          Showing development preview details because Supabase product data is unavailable.
        </div>
      ) : null}
      <ProductDetail product={product} />
    </>
  );
}
