import Link from "next/link";
import type { AdminProductListItem } from "@/types/product";
import { formatLabel, formatMoney } from "./orderFormat";

export function ProductTable({ products }: { products: AdminProductListItem[] }) {
  if (products.length === 0) {
    return (
      <div className="card">
        <h2 className="text-xl font-black text-ink">No products found</h2>
        <p className="mt-3 text-sm leading-6 text-ink/70">
          Existing catalogue products will appear here when the admin RLS user can read them.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-taupe/25 bg-white">
      <table className="min-w-[1080px] w-full border-collapse text-left text-sm">
        <thead className="bg-sand/45 text-xs font-black uppercase tracking-wide text-ink/70">
          <tr>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Daily</th>
            <th className="px-4 py-3">Weekly</th>
            <th className="px-4 py-3">Monthly</th>
            <th className="px-4 py-3">Deposit</th>
            <th className="px-4 py-3">Featured</th>
            <th className="px-4 py-3">Order</th>
            <th className="px-4 py-3">Visibility</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-taupe/20">
          {products.map((product) => (
            <tr key={product.id} className="align-top">
              <td className="px-4 py-4">
                <p className="font-black text-ink">{product.name}</p>
                <p className="mt-1 font-bold text-ink/60">{product.slug}</p>
              </td>
              <td className="px-4 py-4 font-bold text-ink/72">
                {formatMoney(product.daily_price_mad)}
              </td>
              <td className="px-4 py-4 font-bold text-ink/72">
                {formatMoney(product.weekly_price_mad)}
              </td>
              <td className="px-4 py-4 font-bold text-ink/72">
                {formatMoney(product.monthly_price_mad)}
              </td>
              <td className="px-4 py-4 font-bold text-ink/72">
                {formatMoney(product.deposit_mad)}
              </td>
              <td className="px-4 py-4">
                <span className={product.featured ? "badge" : "badge badge-soft"}>
                  {product.featured ? "Featured" : "Standard"}
                </span>
              </td>
              <td className="px-4 py-4 font-black text-ink">{product.display_order}</td>
              <td className="px-4 py-4 font-bold text-ink/72">
                {product.active ? "Active" : "Inactive"} / {formatLabel(product.availability_mode)}
              </td>
              <td className="px-4 py-4">
                <Link className="btn btn-secondary" href={`/admin/products/${product.id}`}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
