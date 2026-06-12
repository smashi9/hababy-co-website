import Link from "next/link";
import type { ProductSummary } from "@/lib/supabase/queries";

const availabilityLabels: Record<string, string> = {
  request: "Available to request",
  confirm: "Available to request",
  on_request: "Available on request",
  hidden: "Hidden",
};

function cleanCatalogueText(value: string | null) {
  return value
    ?.replace(/^PLACEHOLDER:\s*/i, "")
    .replace(
      /Personally\s+confirmed for safety before delivery\.?/gi,
      "Stock, item condition, cleanliness, requested dates, and delivery feasibility are confirmed before handover."
    )
    .replace(
      /Fitting and suitability personally\s+confirmed before handover\.?/gi,
      "Parents select the appropriate car seat group from the listed specifications."
    );
}

export function ProductCard({ product }: { product: ProductSummary }) {
  const description = cleanCatalogueText(product.description);
  const hasUsableInventory = product.inventory_availability.has_usable_inventory;
  const availabilityLabel = hasUsableInventory
    ? availabilityLabels[product.availability_mode] ?? "Available to request"
    : "Currently unavailable";

  return (
    <article className="card flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <span className={hasUsableInventory ? "badge" : "badge badge-soft"}>
          {availabilityLabel}
        </span>
        <span className="rounded-full bg-sand/60 px-3 py-1 text-xs font-black text-ink/70">
          MAD
        </span>
      </div>

      <div className="mt-5 flex-1">
        <h2 className="text-xl font-extrabold text-ink">{product.name}</h2>
        {description ? (
          <p className="mt-3 text-sm leading-6 text-ink/72">{description}</p>
        ) : (
          <p className="mt-3 text-sm leading-6 text-ink/72">
            Clean, checked baby gear prepared for a Rabat stay.
          </p>
        )}
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-page px-3 py-3">
          <dt className="font-bold text-ink/62">Daily</dt>
          <dd className="mt-1 font-black text-ink">{product.daily_price_mad} MAD</dd>
        </div>
        <div className="rounded-2xl bg-page px-3 py-3">
          <dt className="font-bold text-ink/62">Weekly</dt>
          <dd className="mt-1 font-black text-ink">{product.weekly_price_mad} MAD</dd>
        </div>
        <div className="col-span-2 rounded-2xl bg-page px-3 py-3">
          <dt className="font-bold text-ink/62">Refundable deposit estimate</dt>
          <dd className="mt-1 font-black text-ink">{product.deposit_mad} MAD</dd>
        </div>
        <div className="col-span-2 rounded-2xl bg-page px-3 py-3">
          <dt className="font-bold text-ink/62">Availability status</dt>
          <dd className="mt-1 font-black text-ink">
            {hasUsableInventory
              ? `${product.inventory_availability.usable_inventory_count} available unit${
                  product.inventory_availability.usable_inventory_count === 1 ? "" : "s"
                }`
              : "No available units"}
          </dd>
        </div>
      </dl>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link href={`/products/${product.slug}`} className="btn btn-secondary">
          View details
        </Link>
        {hasUsableInventory ? (
          <Link href="/#request" className="btn btn-primary">
            Request a booking
          </Link>
        ) : (
          <span className="btn border border-taupe/35 bg-page text-ink/55">
            Currently unavailable
          </span>
        )}
      </div>
    </article>
  );
}
