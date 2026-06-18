import { ProductTable } from "@/components/admin/ProductTable";
import { getAdminProducts } from "@/lib/supabase/adminQueries";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="grid gap-6">
      <div>
        <p className="badge">Copy and pricing</p>
        <h1 className="mt-4 font-heading text-4xl text-ink">Product editing</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/72">
          Edit existing product copy and pricing. This milestone does not create products, delete
          products, upload images, or change public visibility controls.
        </p>
      </div>
      <ProductTable products={products} />
    </div>
  );
}
