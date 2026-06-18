"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  updateProductAction,
  type ProductUpdateActionState,
} from "@/app/admin/(protected)/products/actions";
import type { AdminProductDetail } from "@/types/product";

const initialActionState: ProductUpdateActionState = {
  status: "idle",
  message: "",
};

function FieldError({ errors }: { errors: string[] | undefined }) {
  if (!errors?.length) {
    return null;
  }

  return <p className="text-sm font-bold leading-6 text-primary">{errors[0]}</p>;
}

function MoneyInput({
  label,
  name,
  value,
  errors,
}: {
  label: string;
  name: string;
  value: number;
  errors: string[] | undefined;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-ink">
      {label}
      <input
        name={name}
        type="number"
        min="0"
        step="1"
        defaultValue={value}
        className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
        required
      />
      <FieldError errors={errors} />
    </label>
  );
}

function TextArea({
  label,
  name,
  value,
  rows = 4,
  errors,
}: {
  label: string;
  name: string;
  value: string | null;
  rows?: number;
  errors: string[] | undefined;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-ink">
      {label}
      <textarea
        name={name}
        rows={rows}
        defaultValue={value ?? ""}
        className="rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
      />
      <FieldError errors={errors} />
    </label>
  );
}

export function ProductEditForm({ product }: { product: AdminProductDetail }) {
  const [actionState, formAction, pending] = useActionState(
    updateProductAction,
    initialActionState
  );

  return (
    <form action={formAction} className="card grid gap-5">
      <input type="hidden" name="id" value={product.id} />

      <div className="rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm font-bold leading-6 text-primary">
        Product copy and pricing changes are public after saving. Visibility controls such as
        active status, availability mode, slug, category, and images are intentionally read-only in
        this milestone.
      </div>

      <label className="grid gap-2 text-sm font-black text-ink">
        Product name
        <input
          name="name"
          type="text"
          defaultValue={product.name}
          className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
          required
        />
        <FieldError errors={actionState.fieldErrors?.name} />
      </label>

      <TextArea
        label="Description"
        name="description"
        value={product.description}
        rows={5}
        errors={actionState.fieldErrors?.description}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MoneyInput
          label="Daily price MAD"
          name="daily_price_mad"
          value={product.daily_price_mad}
          errors={actionState.fieldErrors?.daily_price_mad}
        />
        <MoneyInput
          label="Weekly price MAD"
          name="weekly_price_mad"
          value={product.weekly_price_mad}
          errors={actionState.fieldErrors?.weekly_price_mad}
        />
        <MoneyInput
          label="Monthly price MAD"
          name="monthly_price_mad"
          value={product.monthly_price_mad}
          errors={actionState.fieldErrors?.monthly_price_mad}
        />
        <MoneyInput
          label="Deposit MAD"
          name="deposit_mad"
          value={product.deposit_mad}
          errors={actionState.fieldErrors?.deposit_mad}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-black text-ink">
          Display order
          <input
            name="display_order"
            type="number"
            step="1"
            defaultValue={product.display_order}
            className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
            required
          />
          <FieldError errors={actionState.fieldErrors?.display_order} />
        </label>

        <label className="flex min-h-12 items-center gap-3 rounded-xl border border-taupe/35 bg-white px-4 py-3 text-sm font-black text-ink">
          <input
            name="featured"
            type="checkbox"
            defaultChecked={product.featured}
            className="h-5 w-5 accent-primary"
          />
          Featured product
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextArea
          label="Safety notes"
          name="safety_notes"
          value={product.safety_notes}
          errors={actionState.fieldErrors?.safety_notes}
        />
        <TextArea
          label="Cleaning notes"
          name="cleaning_notes"
          value={product.cleaning_notes}
          errors={actionState.fieldErrors?.cleaning_notes}
        />
        <TextArea
          label="Age guidance"
          name="age_guidance"
          value={product.age_guidance}
          errors={actionState.fieldErrors?.age_guidance}
        />
        <TextArea
          label="Weight guidance"
          name="weight_guidance"
          value={product.weight_guidance}
          errors={actionState.fieldErrors?.weight_guidance}
        />
        <TextArea
          label="Height guidance"
          name="height_guidance"
          value={product.height_guidance}
          errors={actionState.fieldErrors?.height_guidance}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          disabled={pending}
        >
          {pending ? "Saving..." : "Save product"}
        </button>
        <Link href="/admin/products" className="btn btn-secondary">
          Back to products
        </Link>
      </div>

      {actionState.status === "error" ? (
        <div className="rounded-2xl border border-primary/25 bg-primary/10 p-4">
          <h3 className="font-black text-primary">Product update was not saved.</h3>
          <p className="mt-2 text-sm font-bold leading-6 text-ink/72">{actionState.message}</p>
        </div>
      ) : null}

      {actionState.status === "success" ? (
        <div className="rounded-2xl border border-sage/35 bg-sage/15 p-4">
          <h3 className="font-black text-ink">Product saved.</h3>
          <p className="mt-2 text-sm font-bold leading-6 text-ink/72">{actionState.message}</p>
        </div>
      ) : null}
    </form>
  );
}
