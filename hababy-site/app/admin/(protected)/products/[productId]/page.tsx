import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductEditForm } from "@/components/admin/ProductEditForm";
import { formatDateTime, formatLabel } from "@/components/admin/orderFormat";
import { getAdminProductById } from "@/lib/supabase/adminQueries";

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await getAdminProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="grid gap-6">
      <div>
        <Link href="/admin/products" className="text-sm font-black text-primary">
          Back to products
        </Link>
        <p className="mt-5 badge">Public copy and pricing</p>
        <h1 className="mt-4 font-heading text-4xl text-ink">{product.name}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/72">
          Product copy and pricing changes are public after saving. Visibility controls are
          intentionally read-only here.
        </p>
      </div>

      <section className="card">
        <h2 className="text-xl font-black text-ink">Read-only product context</h2>
        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="font-bold text-ink/62">Product ID</dt>
            <dd className="mt-1 break-all font-black text-ink">{product.id}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink/62">Slug</dt>
            <dd className="mt-1 font-black text-ink">{product.slug}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink/62">Category</dt>
            <dd className="mt-1 font-black text-ink">{product.category_name ?? "-"}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink/62">Active</dt>
            <dd className="mt-1 font-black text-ink">{product.active ? "Active" : "Inactive"}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink/62">Availability mode</dt>
            <dd className="mt-1 font-black text-ink">{formatLabel(product.availability_mode)}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink/62">Requires child details</dt>
            <dd className="mt-1 font-black text-ink">
              {product.requires_child_details ? "Yes" : "No"}
            </dd>
          </div>
          <div>
            <dt className="font-bold text-ink/62">Model image note</dt>
            <dd className="mt-1 font-black text-ink">
              {product.model_image_note ? "Enabled" : "Disabled"}
            </dd>
          </div>
          <div>
            <dt className="font-bold text-ink/62">Created</dt>
            <dd className="mt-1 font-black text-ink">{formatDateTime(product.created_at)}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink/62">Updated</dt>
            <dd className="mt-1 font-black text-ink">{formatDateTime(product.updated_at)}</dd>
          </div>
        </dl>
      </section>

      <ProductEditForm product={product} />
    </div>
  );
}
