"use server";

import { revalidatePath } from "next/cache";
import { settingsUpdateSchema, type SettingsUpdateInput } from "@/lib/validation/settingsUpdateSchema";
import { updateAdminSettings } from "@/lib/supabase/adminQueries";

export type SettingsUpdateActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

function formValue(formData: FormData, key: keyof SettingsUpdateInput) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function updateSettingsAction(
  _prevState: SettingsUpdateActionState,
  formData: FormData
): Promise<SettingsUpdateActionState> {
  const parsed = settingsUpdateSchema.safeParse({
    id: formValue(formData, "id"),
    whatsapp_number: formValue(formData, "whatsapp_number"),
    public_fx_note: formValue(formData, "public_fx_note"),
    eur_rate: formValue(formData, "eur_rate"),
    usd_rate: formValue(formData, "usd_rate"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted settings fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const result = await updateAdminSettings(parsed.data);

  if (!result.ok) {
    return {
      status: "error",
      message: result.message,
    };
  }

  revalidatePath("/admin/settings");

  return {
    status: "success",
    message: "Settings saved for future operational use. These values are not live-wired yet.",
  };
}
