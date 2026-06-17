"use client";

import { useActionState } from "react";
import {
  updateOrderStatus,
  type OrderStatusActionState,
} from "@/app/admin/(protected)/orders/actions";

const initialState: OrderStatusActionState = {
  status: "idle",
  message: "",
};

export function OrderStatusActions({ orderId }: { orderId: string }) {
  const [state, formAction, pending] = useActionState(updateOrderStatus, initialState);

  return (
    <form action={formAction} className="rounded-2xl border border-taupe/25 bg-white p-4">
      <input type="hidden" name="orderId" value={orderId} />
      <p className="text-xs font-black uppercase tracking-wide text-ink/58">Status actions</p>
      <p className="mt-2 text-sm font-bold leading-6 text-ink/70">
        New requests can be confirmed or cancelled. This does not reserve inventory or trigger
        customer messages.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          name="targetStatus"
          value="confirmed"
          disabled={pending}
        >
          {pending ? "Updating..." : "Confirm request"}
        </button>
        <button
          className="btn btn-secondary disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          name="targetStatus"
          value="cancelled"
          disabled={pending}
        >
          {pending ? "Updating..." : "Cancel request"}
        </button>
      </div>
      {state.status !== "idle" ? (
        <p
          className={
            state.status === "success"
              ? "mt-4 rounded-[1rem] border border-sage/35 bg-sage/15 px-4 py-3 text-sm font-bold leading-6 text-ink"
              : "mt-4 rounded-[1rem] border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-bold leading-6 text-primary"
          }
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
