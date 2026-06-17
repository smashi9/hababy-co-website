"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  updateInventoryItemAction,
  type InventoryUpdateActionState,
} from "@/app/admin/(protected)/inventory/actions";
import {
  inventoryCleaningStatusValues,
  inventoryStatusValues,
} from "@/lib/validation/inventoryUpdateSchema";
import type { AdminInventoryItemDetail } from "@/types/inventory";

const initialActionState: InventoryUpdateActionState = {
  status: "idle",
  message: "",
};

function FieldError({ errors }: { errors: string[] | undefined }) {
  if (!errors?.length) {
    return null;
  }

  return <p className="text-sm font-bold leading-6 text-primary">{errors[0]}</p>;
}

function formatLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function InventoryEditForm({ item }: { item: AdminInventoryItemDetail }) {
  const [actionState, formAction, pending] = useActionState(
    updateInventoryItemAction,
    initialActionState
  );

  return (
    <form action={formAction} className="card grid gap-5">
      <input type="hidden" name="itemId" value={item.item_id} />

      <div className="rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm font-bold leading-6 text-primary">
        Setting this item to available and clean can make the related product available to request
        if no order is linked. Hababy still manually confirms every request before approval.
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-black text-ink">
          Item status
          <select
            name="status"
            defaultValue={item.status}
            className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
            required
          >
            {inventoryStatusValues.map((status) => (
              <option key={status} value={status}>
                {formatLabel(status)}
              </option>
            ))}
          </select>
          <FieldError errors={actionState.fieldErrors?.status} />
        </label>

        <label className="grid gap-2 text-sm font-black text-ink">
          Cleaning status
          <select
            name="cleaning_status"
            defaultValue={item.cleaning_status}
            className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
            required
          >
            {inventoryCleaningStatusValues.map((status) => (
              <option key={status} value={status}>
                {formatLabel(status)}
              </option>
            ))}
          </select>
          <FieldError errors={actionState.fieldErrors?.cleaning_status} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-black text-ink">
          Condition
          <input
            name="condition"
            type="text"
            defaultValue={item.condition ?? ""}
            className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
          />
          <FieldError errors={actionState.fieldErrors?.condition} />
        </label>

        <label className="grid gap-2 text-sm font-black text-ink">
          Source
          <input
            name="source"
            type="text"
            defaultValue={item.source ?? ""}
            className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
          />
          <FieldError errors={actionState.fieldErrors?.source} />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-black text-ink">
        Notes
        <textarea
          name="notes"
          rows={5}
          defaultValue={item.notes ?? ""}
          className="rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
        />
        <FieldError errors={actionState.fieldErrors?.notes} />
      </label>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          disabled={pending}
        >
          {pending ? "Saving..." : "Save inventory state"}
        </button>
        <Link href="/admin/inventory" className="btn btn-secondary">
          Back to inventory
        </Link>
      </div>

      {actionState.status === "error" ? (
        <div className="rounded-2xl border border-primary/25 bg-primary/10 p-4">
          <h3 className="font-black text-primary">Inventory update was not saved.</h3>
          <p className="mt-2 text-sm font-bold leading-6 text-ink/72">{actionState.message}</p>
        </div>
      ) : null}

      {actionState.status === "success" ? (
        <div className="rounded-2xl border border-sage/35 bg-sage/15 p-4">
          <h3 className="font-black text-ink">Inventory item saved.</h3>
          <p className="mt-2 text-sm font-bold leading-6 text-ink/72">{actionState.message}</p>
        </div>
      ) : null}
    </form>
  );
}
