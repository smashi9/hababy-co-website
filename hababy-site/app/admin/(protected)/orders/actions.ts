"use server";

import { revalidatePath } from "next/cache";
import {
  updateAdminOrderInternalNotes,
  updateAdminOrderStatus,
} from "@/lib/supabase/adminQueries";
import { orderInternalNotesSchema } from "@/lib/validation/orderInternalNotesSchema";
import { orderStatusUpdateSchema } from "@/lib/validation/orderStatusSchema";

export type OrderStatusActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export type OrderInternalNotesActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

function formValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function updateOrderStatus(
  _prevState: OrderStatusActionState,
  formData: FormData
): Promise<OrderStatusActionState> {
  const parsed = orderStatusUpdateSchema.safeParse({
    orderId: formValue(formData, "orderId"),
    targetStatus: formValue(formData, "targetStatus"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Choose a valid status update for this request.",
    };
  }

  const result = await updateAdminOrderStatus(parsed.data);

  if (!result.ok) {
    return {
      status: "error",
      message: result.message,
    };
  }

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${parsed.data.orderId}`);

  const label = parsed.data.targetStatus === "confirmed" ? "confirmed" : "cancelled";

  return {
    status: "success",
    message: `Request marked ${label}.`,
  };
}

export async function updateOrderInternalNotes(
  _prevState: OrderInternalNotesActionState,
  formData: FormData
): Promise<OrderInternalNotesActionState> {
  const parsed = orderInternalNotesSchema.safeParse({
    orderId: formValue(formData, "orderId"),
    internal_notes: formValue(formData, "internal_notes"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the internal notes field and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const result = await updateAdminOrderInternalNotes(parsed.data);

  if (!result.ok) {
    return {
      status: "error",
      message: result.message,
    };
  }

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${parsed.data.orderId}`);

  return {
    status: "success",
    message: "Internal notes saved. They remain private to admin.",
  };
}
