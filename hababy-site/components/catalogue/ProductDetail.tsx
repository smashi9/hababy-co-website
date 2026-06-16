import Link from "next/link";
import type { ProductDetail as ProductDetailType } from "@/lib/supabase/queries";

const availabilityLabels: Record<string, string> = {
  request: "Available to request",
  confirm: "Available to request",
  on_request: "Available on request",
  hidden: "Hidden",
};

function cleanText(value: string | null | undefined) {
  return (
    value
      ?.replace(/^PLACEHOLDER:\s*/i, "")
      .replace(
        /Personally\s+confirmed for safety before delivery\.?/gi,
        "Stock, item condition, cleanliness, requested dates, and delivery feasibility are confirmed before handover."
      )
      .replace(
        /Fitting and suitability personally\s+confirmed before handover\.?/gi,
        "Parents select the appropriate car seat group from the listed specifications."
      ) ?? null
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="card">
      <h2 className="text-xl font-extrabold text-ink">{title}</h2>
      <ul className="mt-4 grid gap-3 text-sm leading-6 text-ink/74">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>{cleanText(item) ?? item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProductDetail({ product }: { product: ProductDetailType }) {
  const description = cleanText(product.description);
  const safetyNotes = product.requires_child_details
    ? "Parents are responsible for choosing the appropriate car seat group based on the listed specifications. Hababy & Co confirms stock, item condition, cleanliness, requested dates, and delivery feasibility before handover."
    : cleanText(product.safety_notes);
  const hasUsableInventory = product.inventory_availability.has_usable_inventory;
  const availabilityLabel = hasUsableInventory
    ? availabilityLabels[product.availability_mode] ?? "Available to request"
    : "Currently unavailable";
  const guidance = [
    product.age_guidance ? `Age: ${cleanText(product.age_guidance)}` : null,
    product.weight_guidance ? `Weight: ${cleanText(product.weight_guidance)}` : null,
    product.height_guidance ? `Height: ${cleanText(product.height_guidance)}` : null,
  ].filter(Boolean) as string[];

  return (
    <main>
      <section className="bg-sand/60 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-white/70 bg-page p-5 shadow-soft">
            <div className="flex aspect-[4/3] items-center justify-center rounded-[1.5rem] border border-taupe/20 bg-white p-8 text-center">
              <div>
                <p className="font-heading text-3xl text-ink">{product.name}</p>
                <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-ink/70">
                  Product photography will be added later. Exact item and model are confirmed before delivery.
                </p>
              </div>
            </div>
            {product.model_image_note ? (
              <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-ink/70">
                Model image note: exact item confirmed before delivery.
              </p>
            ) : null}
          </div>

          <div className="self-center">
            <Link href="/products" className="text-sm font-extrabold text-primary">
              Back to all products
            </Link>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className={hasUsableInventory ? "badge" : "badge badge-soft"}>
                {availabilityLabel}
              </span>
              {product.requires_child_details ? (
                <span className="badge badge-soft">Car seat specifications</span>
              ) : null}
            </div>
            <h1 className="mt-5 max-w-3xl font-heading text-4xl leading-tight text-ink sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/76">
              {description ??
                "Clean, checked baby gear prepared for your Rabat stay and reviewed before handover."}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {hasUsableInventory ? (
                <Link href={`/request?product=${product.slug}`} className="btn btn-primary">
                  Request a booking
                </Link>
              ) : (
                <span className="btn border border-taupe/35 bg-page text-ink/55">
                  Currently unavailable
                </span>
              )}
              <Link href="/#contact" className="btn btn-secondary">
                Chat on WhatsApp
              </Link>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-ink/70">
              This is not an instant booking. If inventory is available to request,
              Hababy & Co still confirms item condition, cleanliness, requested
              dates, delivery feasibility, and payment/deposit details before handover.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-page">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="card">
            <h2 className="text-xl font-extrabold text-ink">Pricing estimate</h2>
            <dl className="mt-5 grid gap-3 text-sm">
              <div className="flex items-center justify-between rounded-2xl bg-page px-4 py-3">
                <dt className="font-bold text-ink/65">Daily</dt>
                <dd className="font-black text-ink">{product.daily_price_mad} MAD</dd>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-page px-4 py-3">
                <dt className="font-bold text-ink/65">Weekly</dt>
                <dd className="font-black text-ink">{product.weekly_price_mad} MAD</dd>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-page px-4 py-3">
                <dt className="font-bold text-ink/65">Monthly</dt>
                <dd className="font-black text-ink">{product.monthly_price_mad} MAD</dd>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-sand/60 px-4 py-3">
                <dt className="font-bold text-ink/70">Refundable deposit</dt>
                <dd className="font-black text-ink">{product.deposit_mad} MAD</dd>
              </div>
            </dl>
            <p className="mt-5 text-sm leading-6 text-ink/70">
              MAD is the base currency. EUR/USD may be arranged offline by prior agreement and confirmed before delivery.
            </p>
          </section>

          <div className="grid gap-5">
            <DetailList title="Included items" items={product.included_items} />
            {guidance.length > 0 ? <DetailList title="Age, weight, and height guidance" items={guidance} /> : null}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="grid gap-5 lg:grid-cols-3">
          <section className="card">
            <h2 className="text-xl font-extrabold text-ink">Availability</h2>
            <p className="mt-4 text-sm leading-6 text-ink/72">
              {hasUsableInventory
                ? "This product is available to request. The request still stays pending until Hababy & Co confirms stock, condition, cleaning, dates, delivery feasibility, and handover details."
                : "This product is currently unavailable, so requests are paused until a clean available unit is added."}
            </p>
            <p className="mt-4 rounded-2xl bg-page px-4 py-3 text-sm font-bold text-ink/72">
              {hasUsableInventory
                ? `${product.inventory_availability.usable_inventory_count} available unit${
                    product.inventory_availability.usable_inventory_count === 1 ? "" : "s"
                  }`
                : "No available units"}
            </p>
          </section>
          <section className="card">
            <h2 className="text-xl font-extrabold text-ink">Safety notes</h2>
            <p className="mt-4 text-sm leading-6 text-ink/72">
              {safetyNotes ??
                "The item is checked before delivery and prepared according to its care requirements."}
            </p>
          </section>
          <section className="card">
            <h2 className="text-xl font-extrabold text-ink">Cleaning notes</h2>
            <p className="mt-4 text-sm leading-6 text-ink/72">
              {cleanText(product.cleaning_notes) ??
                "Cleaned and inspected before it reaches another family."}
            </p>
          </section>
        </div>
      </section>

      {product.requires_child_details ? (
        <section className="section bg-sand/55">
          <div className="rounded-[1.5rem] border border-taupe/25 bg-white p-6 sm:p-8">
            <h2 className="font-heading text-3xl text-ink">For car seats, choose the right group carefully.</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-ink/74">
              Parents are responsible for selecting the appropriate car seat group
              based on the listed age, weight, height, and manufacturer guidance.
              Hababy & Co confirms stock, item condition, cleanliness, requested
              dates, and delivery feasibility before handover.
            </p>
            {hasUsableInventory ? (
              <Link href={`/request?product=${product.slug}`} className="btn btn-primary mt-6">
                Request a booking
              </Link>
            ) : (
              <span className="btn mt-6 border border-taupe/35 bg-page text-ink/55">
                Currently unavailable
              </span>
            )}
          </div>
        </section>
      ) : null}
    </main>
  );
}
