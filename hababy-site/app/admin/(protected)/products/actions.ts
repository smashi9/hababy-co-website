"use server";

import { revalidatePath } from "next/cache";
import { getAdminProductById, updateAdminProduct } from "@/lib/supabase/adminQueries";
import { productUpdateSchema, type ProductUpdateInput } from "@/lib/validation/productUpdateSchema";

export type ProductUpdateActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

function formValue(formData: FormData, key: keyof ProductUpdateInput) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function updateProductAction(
  _prevState: ProductUpdateActionState,
  formData: FormData
): Promise<ProductUpdateActionState> {
  const parsed = productUpdateSchema.safeParse({
    id: formValue(formData, "id"),
    name: formValue(formData, "name"),
    description: formValue(formData, "description"),
    safety_notes: formValue(formData, "safety_notes"),
    cleaning_notes: formValue(formData, "cleaning_notes"),
    age_guidance: formValue(formData, "age_guidance"),
    weight_guidance: formValue(formData, "weight_guidance"),
    height_guidance: formValue(formData, "height_guidance"),
    daily_price_mad: formValue(formData, "daily_price_mad"),
    weekly_price_mad: formValue(formData, "weekly_price_mad"),
    monthly_price_mad: formValue(formData, "monthly_price_mad"),
    deposit_mad: formValue(formData, "deposit_mad"),
    featured: formData.get("featured") === "on",
    display_order: formValue(formData, "display_order"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted product fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const currentProduct = await getAdminProductById(parsed.data.id);
  const result = await updateAdminProduct(parsed.data);

  if (!result.ok) {
    return {
      status: "error",
      message: result.message,
    };
  }

  revalidatePath("/products");
  revalidatePath("/request");
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${parsed.data.id}`);

  if (currentProduct?.slug) {
    revalidatePath(`/products/${currentProduct.slug}`);
  }

  return {
    status: "success",
    message: "Product copy and pricing updated. Public catalogue pages may now show these changes.",
  };
}
