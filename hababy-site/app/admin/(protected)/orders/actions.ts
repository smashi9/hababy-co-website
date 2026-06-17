"use server";

import { revalidatePath } from "next/cache";
import { updateAdminOrderStatus } from "@/lib/supabase/adminQueries";
import { orderStatusUpdateSchema } from "@/lib/validation/orderStatusSchema";

export type OrderStatusActionState = {
  status: "idle" | "success" | "error";
  message: string;
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
