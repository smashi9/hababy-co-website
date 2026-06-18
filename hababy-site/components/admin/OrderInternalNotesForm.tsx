"use client";

import { useActionState } from "react";
import {
  updateOrderInternalNotes,
  type OrderInternalNotesActionState,
} from "@/app/admin/(protected)/orders/actions";

const initialActionState: OrderInternalNotesActionState = {
  status: "idle",
  message: "",
};

function FieldError({ errors }: { errors: string[] | undefined }) {
  if (!errors?.length) {
    return null;
  }

  return <p className="text-sm font-bold leading-6 text-primary">{errors[0]}</p>;
}

export function OrderInternalNotesForm({
  orderId,
  internalNotes,
}: {
  orderId: string;
  internalNotes: string | null;
}) {
  const [actionState, formAction, pending] = useActionState(
    updateOrderInternalNotes,
    initialActionState
  );

  return (
    <form action={formAction} className="card grid gap-4">
      <input type="hidden" name="orderId" value={orderId} />

      <div>
        <p className="badge badge-soft">Private admin notes</p>
        <h2 className="mt-4 text-xl font-black text-ink">Internal notes</h2>
        <p className="mt-3 text-sm font-bold leading-6 text-ink/70">
          These notes are admin-only. They are not sent to the customer and are not included in
          WhatsApp handoff messages.
        </p>
      </div>

      <label className="grid gap-2 text-sm font-black text-ink">
        Internal notes
        <textarea
          name="internal_notes"
          rows={6}
          defaultValue={internalNotes ?? ""}
          className="rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold leading-6 text-ink outline-primary"
          placeholder="Add private operational notes for this order."
        />
        <span className="text-xs font-bold leading-5 text-ink/60">
          Private to admin. Leave blank to clear saved internal notes.
        </span>
        <FieldError errors={actionState.fieldErrors?.internal_notes} />
      </label>

      <button
        type="submit"
        className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending}
      >
        {pending ? "Saving..." : "Save internal notes"}
      </button>

      {actionState.status === "error" ? (
        <div className="rounded-2xl border border-primary/25 bg-primary/10 p-4">
          <h3 className="font-black text-primary">Internal notes were not saved.</h3>
          <p className="mt-2 text-sm font-bold leading-6 text-ink/72">{actionState.message}</p>
        </div>
      ) : null}

      {actionState.status === "success" ? (
        <div className="rounded-2xl border border-sage/35 bg-sage/15 p-4">
          <h3 className="font-black text-ink">Internal notes saved.</h3>
          <p className="mt-2 text-sm font-bold leading-6 text-ink/72">{actionState.message}</p>
        </div>
      ) : null}
    </form>
  );
}
