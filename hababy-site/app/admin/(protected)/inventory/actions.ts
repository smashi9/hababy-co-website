"use server";

import { revalidatePath } from "next/cache";
import {
  inventoryUpdateSchema,
  type InventoryUpdateInput,
} from "@/lib/validation/inventoryUpdateSchema";
import { updateAdminInventoryItem } from "@/lib/supabase/adminQueries";

export type InventoryUpdateActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

function formValue(formData: FormData, key: keyof InventoryUpdateInput) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function updateInventoryItemAction(
  _prevState: InventoryUpdateActionState,
  formData: FormData
): Promise<InventoryUpdateActionState> {
  const parsed = inventoryUpdateSchema.safeParse({
    itemId: formValue(formData, "itemId"),
    status: formValue(formData, "status"),
    cleaning_status: formValue(formData, "cleaning_status"),
    condition: formValue(formData, "condition"),
    source: formValue(formData, "source"),
    notes: formValue(formData, "notes"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted inventory fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const result = await updateAdminInventoryItem(parsed.data);

  if (!result.ok) {
    return {
      status: "error",
      message: result.message,
    };
  }

  revalidatePath("/admin/inventory");
  revalidatePath(`/admin/inventory/${parsed.data.itemId}`);
  revalidatePath("/products");
  revalidatePath("/request");

  return {
    status: "success",
    message: "Inventory item updated. Availability counts may now reflect this item state.",
  };
}
