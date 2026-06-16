"use client";

import { useState } from "react";
import Link from "next/link";
import type { ProductSummary } from "@/lib/supabase/queries";

const deliveryTypes = ["Home", "Hotel", "Airbnb", "Family home", "Airport", "Other"];
const deliveryZones = [
  "Rabat",
  "Agdal",
  "Hay Riad",
  "Souissi",
  "Hassan",
  "L'Orangeraie",
  "Temara",
  "Harhoura",
  "Rabat-Sale Airport",
];
const deliveryWindows = ["Morning 9-12", "Afternoon 14-17", "Evening 17-20"];
const pickupWindows = ["Morning 9-12", "Afternoon 14-17", "Evening 17-20"];
const languageOptions = ["English", "French"];
const paymentPreferences = ["MAD cash", "MAD bank transfer", "EUR cash", "USD cash"];

type RequestFormProps = {
  products: ProductSummary[];
  initialProductSlug: string | null;
};

function getFirstValue(value: string | null | undefined) {
  return value ?? "";
}

function parseDate(value: string) {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getRentalDays(startDate: string, endDate: string) {
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  if (!start || !end || end < start) {
    return 0;
  }

  const dayMs = 24 * 60 * 60 * 1000;
  return Math.floor((end.getTime() - start.getTime()) / dayMs) + 1;
}

function getNoticeBlockMessage(startDate: string) {
  const start = parseDate(startDate);

  if (!start) {
    return null;
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const isSameDay = start.getTime() === today.getTime();
  const isLessThan24Hours = start.getTime() - now.getTime() < 24 * 60 * 60 * 1000;

  if (isSameDay || isLessThan24Hours) {
    return "Same-day requests are not available during the pilot. Please request at least 24 hours ahead.";
  }

  return null;
}

function calculateEstimate(product: ProductSummary | undefined, days: number) {
  if (!product || days <= 0) {
    return {
      rentalSubtotal: 0,
      deposit: product?.deposit_mad ?? 0,
      estimatedTotal: product?.deposit_mad ?? 0,
    };
  }

  const weeklyBlocks = Math.floor(days / 7);
  const extraDays = days % 7;
  const weeklySubtotal =
    weeklyBlocks > 0
      ? weeklyBlocks * product.weekly_price_mad + extraDays * product.daily_price_mad
      : days * product.daily_price_mad;
  const rentalSubtotal = Math.max(weeklySubtotal, product.daily_price_mad);
  const deposit = product.deposit_mad;

  return {
    rentalSubtotal,
    deposit,
    estimatedTotal: rentalSubtotal + deposit,
  };
}

export function RequestForm({ products, initialProductSlug }: RequestFormProps) {
  const [selectedSlug, setSelectedSlug] = useState(getFirstValue(initialProductSlug));
  const [rentalStartDate, setRentalStartDate] = useState("");
  const [rentalEndDate, setRentalEndDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedProduct = products.find((product) => product.slug === selectedSlug);
  const availableProducts = products.filter(
    (product) => product.inventory_availability.has_usable_inventory
  );
  const selectedProductIsUnavailable =
    Boolean(selectedProduct) && !selectedProduct?.inventory_availability.has_usable_inventory;
  const selectedProductMissing = Boolean(selectedSlug) && !selectedProduct;
  const rentalDays = getRentalDays(rentalStartDate, rentalEndDate);
  const noticeBlockMessage = getNoticeBlockMessage(rentalStartDate);
  const estimate = calculateEstimate(selectedProduct, rentalDays);
  const canSubmit =
    Boolean(selectedProduct) &&
    !selectedProductIsUnavailable &&
    !noticeBlockMessage &&
    rentalDays > 0;

  const selectedSummary = selectedProduct
    ? [
        `${selectedProduct.name}`,
        rentalDays > 0 ? `${rentalDays} rental day${rentalDays === 1 ? "" : "s"}` : null,
        rentalStartDate && rentalEndDate ? `${rentalStartDate} to ${rentalEndDate}` : null,
        estimate.rentalSubtotal > 0 ? `${estimate.rentalSubtotal} MAD rental estimate` : null,
        `${selectedProduct.deposit_mad} MAD refundable deposit estimate`,
      ]
        .filter(Boolean)
        .join(" | ")
    : null;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <aside className="card h-fit">
        <h2 className="font-heading text-3xl text-ink">Your selected item</h2>
        {selectedProduct ? (
          <div className="mt-5 rounded-[1.25rem] bg-page p-5">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={
                  selectedProduct.inventory_availability.has_usable_inventory
                    ? "badge"
                    : "badge badge-soft"
                }
              >
                {selectedProduct.inventory_availability.has_usable_inventory
                  ? "Available to request"
                  : "Currently unavailable"}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-ink/70">
                {selectedProduct.deposit_mad} MAD deposit estimate
              </span>
            </div>
            <h3 className="mt-4 text-xl font-black text-ink">{selectedProduct.name}</h3>
            <p className="mt-3 text-sm leading-6 text-ink/72">
              Daily estimate {selectedProduct.daily_price_mad} MAD. Weekly estimate{" "}
              {selectedProduct.weekly_price_mad} MAD. Final availability, delivery, payment/deposit,
              and handover are confirmed by Hababy & Co before approval.
            </p>
          </div>
        ) : (
          <div className="mt-5 rounded-[1.25rem] bg-page p-5 text-sm leading-6 text-ink/72">
            Choose an available product to start the request.
          </div>
        )}

        {selectedProductMissing ? (
          <p className="mt-4 rounded-[1rem] border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-bold leading-6 text-primary">
            We could not find that product. Please choose an available product below.
          </p>
        ) : null}

        {selectedProductIsUnavailable ? (
          <p className="mt-4 rounded-[1rem] border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-bold leading-6 text-primary">
            This product is currently unavailable, so the request form is paused for this item.
          </p>
        ) : null}

        <div className="mt-5 rounded-[1.25rem] border border-taupe/25 bg-white p-5">
          <h3 className="text-sm font-black uppercase tracking-wide text-ink">Estimate</h3>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="font-bold text-ink/68">Rental days</dt>
              <dd className="font-black text-ink">{rentalDays || "-"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-bold text-ink/68">Rental subtotal</dt>
              <dd className="font-black text-ink">{estimate.rentalSubtotal} MAD</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-bold text-ink/68">Refundable deposit</dt>
              <dd className="font-black text-ink">{estimate.deposit} MAD</dd>
            </div>
            <div className="flex justify-between gap-4 rounded-2xl bg-sand/60 px-4 py-3">
              <dt className="font-black text-ink">Estimated total</dt>
              <dd className="font-black text-ink">{estimate.estimatedTotal} MAD</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs font-bold leading-5 text-ink/64">
            This is an estimate only, not a final confirmed total. Delivery fees, payment/deposit,
            and handover details are confirmed by Hababy & Co before approval.
          </p>
        </div>
      </aside>

      <form onSubmit={handleSubmit} className="card grid gap-6">
        <div>
          <h2 className="font-heading text-3xl text-ink">Request details</h2>
          <p className="mt-3 text-sm leading-6 text-ink/72">
            This form prepares your request only. It does not create a confirmed booking and no
            online payment is taken.
          </p>
        </div>

        <label className="grid gap-2 text-sm font-black text-ink">
          Selected product
          <select
            value={selectedSlug}
            onChange={(event) => {
              setSelectedSlug(event.target.value);
              setSubmitted(false);
            }}
            className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
            required
          >
            <option value="">Choose an available product</option>
            {availableProducts.map((product) => (
              <option key={product.id} value={product.slug}>
                {product.name}
              </option>
            ))}
            {selectedProductIsUnavailable && selectedProduct ? (
              <option value={selectedProduct.slug}>{selectedProduct.name} - unavailable</option>
            ) : null}
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-black text-ink">
            Rental start date
            <input
              type="date"
              value={rentalStartDate}
              onChange={(event) => {
                setRentalStartDate(event.target.value);
                setSubmitted(false);
              }}
              className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-black text-ink">
            Rental end date
            <input
              type="date"
              value={rentalEndDate}
              min={rentalStartDate || undefined}
              onChange={(event) => {
                setRentalEndDate(event.target.value);
                setSubmitted(false);
              }}
              className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
              required
            />
          </label>
        </div>

        {noticeBlockMessage ? (
          <p className="rounded-[1rem] border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-bold leading-6 text-primary">
            {noticeBlockMessage}
          </p>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-black text-ink">
            Delivery type
            <select className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary" required>
              {deliveryTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-black text-ink">
            Delivery zone
            <select className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary" required>
              {deliveryZones.map((zone) => (
                <option key={zone}>{zone}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-black text-ink">
            Preferred delivery window
            <select className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary" required>
              {deliveryWindows.map((window) => (
                <option key={window}>{window}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-black text-ink">
            Preferred pickup window
            <select className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary" required>
              {pickupWindows.map((window) => (
                <option key={window}>{window}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-black text-ink">
            Customer name
            <input
              type="text"
              className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-black text-ink">
            Phone
            <input
              type="tel"
              className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
              required
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-black text-ink">
            Optional email
            <input
              type="email"
              className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
            />
          </label>
          <label className="grid gap-2 text-sm font-black text-ink">
            Preferred language
            <select className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary" required>
              {languageOptions.map((language) => (
                <option key={language}>{language}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="grid gap-2 text-sm font-black text-ink">
          Payment preference
          <select className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary" required>
            {paymentPreferences.map((preference) => (
              <option key={preference}>{preference}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-black text-ink">
          Notes
          <textarea
            rows={4}
            className="rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
            placeholder="Arrival details, hotel name, family-home notes, or anything Hababy & Co should review."
          />
        </label>

        <button type="submit" className="btn btn-primary" disabled={!canSubmit}>
          Send request for review
        </button>

        {!canSubmit ? (
          <p className="text-sm font-bold leading-6 text-ink/65">
            Choose an available product, valid future dates, and at least 24 hours notice before
            sending the request.
          </p>
        ) : null}

        {submitted ? (
          <div className="rounded-[1.25rem] border border-sage/35 bg-sage/15 p-5">
            <h3 className="text-lg font-black text-ink">Thanks - request prepared for review.</h3>
            <p className="mt-3 text-sm leading-6 text-ink/74">
              Thanks - this request will be reviewed by Hababy & Co. We&apos;ll confirm availability,
              delivery details, payment/deposit, and handover before approval.
            </p>
            {selectedSummary ? (
              <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-6 text-ink/70">
                {selectedSummary}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="rounded-[1.25rem] bg-page p-5 text-sm leading-6 text-ink/72">
          Requests are not saved to Supabase in this foundation milestone. The next backend
          milestone should add validated order saving after schema and security review.
          <Link href="/products" className="ml-1 font-black text-primary">
            Browse products
          </Link>
        </div>
      </form>
    </div>
  );
}
