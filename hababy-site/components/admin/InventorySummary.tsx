import type { AdminInventoryProductSummary } from "@/types/inventory";
import { formatLabel } from "./orderFormat";

function statusBadge(summary: AdminInventoryProductSummary) {
  if (summary.usable_stock_count > 0) {
    return "Available to request";
  }

  if (summary.maintenance_count > 0) {
    return "Maintenance";
  }

  if (summary.needs_cleaning_count > 0) {
    return "Needs cleaning";
  }

  return "Currently unavailable";
}

export function InventorySummary({
  products,
}: {
  products: AdminInventoryProductSummary[];
}) {
  if (products.length === 0) {
    return (
      <div className="card">
        <h2 className="text-xl font-black text-ink">No products found</h2>
        <p className="mt-3 text-sm leading-6 text-ink/70">
          Inventory visibility will appear here after catalogue products are available to the admin
          user.
        </p>
      </div>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="Inventory summary">
      {products.map((product) => (
        <article key={product.product_id} className="card">
          <div className="flex flex-wrap items-center gap-2">
            <span className={product.usable_stock_count > 0 ? "badge" : "badge badge-soft"}>
              {statusBadge(product)}
            </span>
            <span className="rounded-full bg-page px-3 py-1 text-xs font-black text-ink/65">
              {formatLabel(product.availability_mode)}
            </span>
          </div>
          <h2 className="mt-4 text-xl font-black text-ink">{product.product_name}</h2>
          <p className="mt-1 text-sm font-bold text-ink/60">{product.product_slug}</p>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-sage/15 px-4 py-3">
              <dt className="font-bold text-ink/65">Usable</dt>
              <dd className="mt-1 text-2xl font-black text-ink">{product.usable_stock_count}</dd>
            </div>
            <div className="rounded-2xl bg-page px-4 py-3">
              <dt className="font-bold text-ink/65">Total units</dt>
              <dd className="mt-1 text-2xl font-black text-ink">
                {product.total_inventory_units}
              </dd>
            </div>
            <div className="rounded-2xl bg-page px-4 py-3">
              <dt className="font-bold text-ink/65">Unavailable</dt>
              <dd className="mt-1 text-xl font-black text-ink">{product.unavailable_count}</dd>
            </div>
            <div className="rounded-2xl bg-page px-4 py-3">
              <dt className="font-bold text-ink/65">Cleaning</dt>
              <dd className="mt-1 text-xl font-black text-ink">{product.needs_cleaning_count}</dd>
            </div>
          </dl>
          {product.maintenance_count > 0 ? (
            <p className="mt-4 rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm font-bold text-primary">
              {product.maintenance_count} unit{product.maintenance_count === 1 ? "" : "s"} need
              maintenance attention.
            </p>
          ) : null}
        </article>
      ))}
    </section>
  );
}
