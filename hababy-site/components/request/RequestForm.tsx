"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import PhoneInput, { getCountries, type Country, type Value } from "react-phone-number-input";
import labels from "react-phone-number-input/locale/en";
import { submitBookingRequest } from "@/app/request/actions";
import { calculateRentalEstimate, getRentalDays } from "@/lib/pricing/estimate";
import type { RequestActionState } from "@/app/request/actions";
import type { ProductSummary } from "@/lib/supabase/queries";

const countryOptions = getCountries().sort((firstCountry, secondCountry) =>
  (labels[firstCountry] ?? firstCountry).localeCompare(labels[secondCountry] ?? secondCountry)
) as Country[];

const deliveryTypes = [
  { label: "Home", value: "home" },
  { label: "Hotel", value: "hotel" },
  { label: "Airbnb", value: "airbnb" },
  { label: "Family home", value: "family_home" },
  { label: "Airport", value: "airport" },
  { label: "Other", value: "other" },
];
const deliveryZones = [
  { label: "Rabat", value: "rabat" },
  { label: "Agdal", value: "agdal" },
  { label: "Hay Riad", value: "hay_riad" },
  { label: "Souissi", value: "souissi" },
  { label: "Hassan", value: "hassan" },
  { label: "L'Orangeraie", value: "lorangeraie" },
  { label: "Temara", value: "temara" },
  { label: "Harhoura", value: "harhoura" },
  { label: "Rabat-Sale Airport", value: "rabat_sale_airport" },
];
const deliveryWindows = [
  { label: "Morning 9-12", value: "morning_9_12" },
  { label: "Afternoon 14-17", value: "afternoon_14_17" },
  { label: "Evening 17-20", value: "evening_17_20" },
];
const pickupWindows = [
  { label: "Morning 9-12", value: "morning_9_12" },
  { label: "Afternoon 14-17", value: "afternoon_14_17" },
  { label: "Evening 17-20", value: "evening_17_20" },
];
const languageOptions = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
];
const paymentPreferences = [
  { label: "MAD cash", value: "mad_cash" },
  { label: "MAD bank transfer", value: "mad_bank_transfer" },
  { label: "EUR cash", value: "eur_cash" },
  { label: "USD cash", value: "usd_cash" },
];

const initialRequestActionState: RequestActionState = {
  status: "idle",
  message: "",
};

type RequestFormProps = {
  products: ProductSummary[];
  initialProductSlug: string | null;
};

function getFirstValue(value: string | null | undefined) {
  return value ?? "";
}

function parseStartDate(value: string) {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getNoticeBlockMessage(startDate: string) {
  const start = parseStartDate(startDate);

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

function FieldError({ errors }: { errors: string[] | undefined }) {
  if (!errors?.length) {
    return null;
  }

  return <p className="text-sm font-bold leading-6 text-primary">{errors[0]}</p>;
}

export function RequestForm({ products, initialProductSlug }: RequestFormProps) {
  const [actionState, formAction, pending] = useActionState(
    submitBookingRequest,
    initialRequestActionState
  );
  const [selectedSlug, setSelectedSlug] = useState(getFirstValue(initialProductSlug));
  const [rentalStartDate, setRentalStartDate] = useState("");
  const [rentalEndDate, setRentalEndDate] = useState("");
  const [phone, setPhone] = useState<Value | undefined>();

  const selectedProduct = products.find((product) => product.slug === selectedSlug);
  const availableProducts = products.filter(
    (product) => product.inventory_availability.has_usable_inventory
  );
  const selectedProductIsUnavailable =
    Boolean(selectedProduct) && !selectedProduct?.inventory_availability.has_usable_inventory;
  const selectedProductMissing = Boolean(selectedSlug) && !selectedProduct;
  const rentalDays = getRentalDays(rentalStartDate, rentalEndDate);
  const noticeBlockMessage = getNoticeBlockMessage(rentalStartDate);
  const estimate = selectedProduct
    ? calculateRentalEstimate(selectedProduct, rentalStartDate, rentalEndDate)
    : {
        rentalDays: 0,
        rentalSubtotalMad: 0,
        depositMad: 0,
        deliveryFeeMad: 0,
        urgentFeeMad: 0,
        totalDueMad: 0,
      };
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
        estimate.rentalSubtotalMad > 0 ? `${estimate.rentalSubtotalMad} MAD rental estimate` : null,
        `${selectedProduct.deposit_mad} MAD refundable deposit estimate`,
      ]
        .filter(Boolean)
        .join(" | ")
    : null;

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
              <dd className="font-black text-ink">{estimate.rentalSubtotalMad} MAD</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-bold text-ink/68">Refundable deposit</dt>
              <dd className="font-black text-ink">{estimate.depositMad} MAD</dd>
            </div>
            <div className="flex justify-between gap-4 rounded-2xl bg-sand/60 px-4 py-3">
              <dt className="font-black text-ink">Estimated total</dt>
              <dd className="font-black text-ink">{estimate.totalDueMad} MAD</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs font-bold leading-5 text-ink/64">
            This is an estimate only, not a final confirmed total. Delivery fees, payment/deposit,
            and handover details are confirmed by Hababy & Co before approval.
          </p>
        </div>
      </aside>

      <form action={formAction} className="card grid gap-6">
        <div>
          <h2 className="font-heading text-3xl text-ink">Request details</h2>
          <p className="mt-3 text-sm leading-6 text-ink/72">
            This form sends your request for review. It does not create a confirmed booking and no
            online payment is taken.
          </p>
        </div>

        <label className="grid gap-2 text-sm font-black text-ink">
          Selected product
          <select
            name="selectedProductSlug"
            value={selectedSlug}
            onChange={(event) => {
              setSelectedSlug(event.target.value);
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
          <FieldError errors={actionState.fieldErrors?.selectedProductSlug} />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-black text-ink">
            Rental start date
            <input
              name="rentalStartDate"
              type="date"
              value={rentalStartDate}
              onChange={(event) => {
                setRentalStartDate(event.target.value);
              }}
              className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
              required
            />
            <FieldError errors={actionState.fieldErrors?.rentalStartDate} />
          </label>
          <label className="grid gap-2 text-sm font-black text-ink">
            Rental end date
            <input
              name="rentalEndDate"
              type="date"
              value={rentalEndDate}
              min={rentalStartDate || undefined}
              onChange={(event) => {
                setRentalEndDate(event.target.value);
              }}
              className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
              required
            />
            <FieldError errors={actionState.fieldErrors?.rentalEndDate} />
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
            <select
              name="deliveryType"
              className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
              required
            >
              {deliveryTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <FieldError errors={actionState.fieldErrors?.deliveryType} />
          </label>
          <label className="grid gap-2 text-sm font-black text-ink">
            Delivery zone
            <select
              name="deliveryZone"
              className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
              required
            >
              {deliveryZones.map((zone) => (
                <option key={zone.value} value={zone.value}>
                  {zone.label}
                </option>
              ))}
            </select>
            <FieldError errors={actionState.fieldErrors?.deliveryZone} />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-black text-ink">
            Preferred delivery window
            <select
              name="deliveryWindow"
              className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
              required
            >
              {deliveryWindows.map((window) => (
                <option key={window.value} value={window.value}>
                  {window.label}
                </option>
              ))}
            </select>
            <FieldError errors={actionState.fieldErrors?.deliveryWindow} />
          </label>
          <label className="grid gap-2 text-sm font-black text-ink">
            Preferred pickup window
            <select
              name="pickupWindow"
              className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
              required
            >
              {pickupWindows.map((window) => (
                <option key={window.value} value={window.value}>
                  {window.label}
                </option>
              ))}
            </select>
            <FieldError errors={actionState.fieldErrors?.pickupWindow} />
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <label className="grid gap-2 text-sm font-black text-ink">
            Customer name
            <input
              name="customerName"
              type="text"
              className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
              required
            />
            <FieldError errors={actionState.fieldErrors?.customerName} />
          </label>
          <fieldset className="grid gap-2 border-0 p-0 text-sm font-black text-ink">
            <legend>Phone</legend>
            <PhoneInput
              id="phoneDisplay"
              className="request-phone-input"
              countries={countryOptions}
              countryOptionsOrder={countryOptions}
              defaultCountry="MA"
              international
              labels={labels}
              limitMaxLength
              value={phone}
              onChange={setPhone}
              numberInputProps={{
                autoComplete: "tel",
                id: "phoneDisplay",
                inputMode: "tel",
                required: true,
              }}
            />
            <input name="phone" type="hidden" value={phone ?? ""} />
            <p className="text-xs font-bold leading-5 text-ink/60">
              Hababy & Co uses this for manual phone or WhatsApp follow-up after review.
            </p>
            <FieldError errors={actionState.fieldErrors?.phone} />
          </fieldset>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-black text-ink">
            Optional email
            <input
              name="email"
              type="email"
              className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
            />
            <FieldError errors={actionState.fieldErrors?.email} />
          </label>
          <label className="grid gap-2 text-sm font-black text-ink">
            Preferred language
            <select
              name="preferredLanguage"
              className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
              required
            >
              {languageOptions.map((language) => (
                <option key={language.value} value={language.value}>
                  {language.label}
                </option>
              ))}
            </select>
            <FieldError errors={actionState.fieldErrors?.preferredLanguage} />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-black text-ink">
          Payment preference
          <select
            name="paymentPreference"
            className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
            required
          >
            {paymentPreferences.map((preference) => (
              <option key={preference.value} value={preference.value}>
                {preference.label}
              </option>
            ))}
          </select>
          <FieldError errors={actionState.fieldErrors?.paymentPreference} />
        </label>

        <label className="grid gap-2 text-sm font-black text-ink">
          Notes
          <textarea
            name="notes"
            rows={4}
            className="rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
            placeholder="Arrival details, hotel name, family-home notes, or anything Hababy & Co should review."
          />
          <FieldError errors={actionState.fieldErrors?.notes} />
        </label>

        <button type="submit" className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60" disabled={!canSubmit || pending}>
          {pending ? "Sending request..." : "Send request for review"}
        </button>

        {!canSubmit ? (
          <p className="text-sm font-bold leading-6 text-ink/65">
            Choose an available product, valid future dates, and at least 24 hours notice before
            sending the request.
          </p>
        ) : null}

        {actionState.status === "error" ? (
          <div className="rounded-[1.25rem] border border-primary/30 bg-primary/10 p-5">
            <h3 className="text-lg font-black text-primary">Please check this request.</h3>
            <p className="mt-3 text-sm leading-6 text-ink/74">
              {actionState.message}
            </p>
          </div>
        ) : null}

        {actionState.status === "success" ? (
          <div className="rounded-[1.25rem] border border-sage/35 bg-sage/15 p-5">
            <h3 className="text-lg font-black text-ink">Thanks - request received.</h3>
            <p className="mt-3 text-sm leading-6 text-ink/74">{actionState.message}</p>
            {actionState.orderReference ? (
              <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-6 text-ink/70">
                Request reference: {actionState.orderReference}
              </p>
            ) : null}
            {selectedSummary ? (
              <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-6 text-ink/70">
                {selectedSummary}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="rounded-[1.25rem] bg-page p-5 text-sm leading-6 text-ink/72">
          Requests are saved for Hababy & Co review with status new. The booking is not confirmed
          until availability, delivery, payment/deposit, and handover are reviewed.
          <Link href="/products" className="ml-1 font-black text-primary">
            Browse products
          </Link>
        </div>
      </form>
    </div>
  );
}
