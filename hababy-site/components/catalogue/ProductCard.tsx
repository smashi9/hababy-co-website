import Link from "next/link";
import type { ProductSummary } from "@/lib/supabase/queries";

const availabilityLabels: Record<string, string> = {
  request: "Request to book",
  confirm: "Personally confirmed",
  on_request: "Available on request",
  hidden: "Hidden",
};

export function ProductCard({ product }: { product: ProductSummary }) {
  const description = product.description?.replace(/^PLACEHOLDER:\s*/i, "");

  return (
    <article className="card flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <span className="badge">
          {availabilityLabels[product.availability_mode] ?? "Request to book"}
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
      </dl>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link href={`/products/${product.slug}`} className="btn btn-secondary">
          View details
        </Link>
        <Link href="/#request" className="btn btn-primary">
          Request a booking
        </Link>
      </div>
    </article>
  );
}
