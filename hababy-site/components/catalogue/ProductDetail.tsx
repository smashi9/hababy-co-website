import Link from "next/link";
import type { ProductDetail as ProductDetailType } from "@/lib/supabase/queries";

const availabilityLabels: Record<string, string> = {
  request: "Request to book",
  confirm: "Personally confirmed",
  on_request: "Available on request",
  hidden: "Hidden",
};

function cleanText(value: string | null | undefined) {
  return value?.replace(/^PLACEHOLDER:\s*/i, "") ?? null;
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
  const availabilityLabel =
    availabilityLabels[product.availability_mode] ?? "Request to book";
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
              <span className="badge">{availabilityLabel}</span>
              {product.requires_child_details ? (
                <span className="badge badge-soft">Child details required</span>
              ) : null}
            </div>
            <h1 className="mt-5 max-w-3xl font-heading text-4xl leading-tight text-ink sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/76">
              {description ??
                "Clean, checked baby gear prepared for your Rabat stay and personally confirmed before handover."}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link href="/#request" className="btn btn-primary">
                Request a booking
              </Link>
              <Link href="/#contact" className="btn btn-secondary">
                Chat on WhatsApp
              </Link>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-ink/70">
              This is not an instant booking. We confirm availability, delivery timing, and payment/deposit details before handover.
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
              Availability is personally confirmed after you send a request. We do not promise instant confirmation.
            </p>
          </section>
          <section className="card">
            <h2 className="text-xl font-extrabold text-ink">Safety notes</h2>
            <p className="mt-4 text-sm leading-6 text-ink/72">
              {cleanText(product.safety_notes) ??
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
            <h2 className="font-heading text-3xl text-ink">For car seats, we need child details first.</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-ink/74">
              Please include child age, approximate weight, height if relevant, and number of children when you request. Hababy & Co checks suitability before confirming the item.
            </p>
            <Link href="/#request" className="btn btn-primary mt-6">
              Request a booking
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}
