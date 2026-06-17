"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerAuthClient } from "@/lib/supabase/serverAuth";
import { hasAdminUserAccess } from "@/lib/supabase/adminQueries";

export type AdminLoginState = {
  status: "idle" | "error";
  message: string;
};

function formValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function loginAdmin(
  _prevState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const email = formValue(formData, "email");
  const password = formValue(formData, "password");

  if (!email || !password) {
    return {
      status: "error",
      message: "Enter the admin email and password.",
    };
  }

  const supabase = await createSupabaseServerAuthClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      status: "error",
      message: "Those admin login details did not work.",
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !(await hasAdminUserAccess(supabase, user))) {
    await supabase.auth.signOut();
    return {
      status: "error",
      message: "This account is not approved for Hababy admin access.",
    };
  }

  redirect("/admin/orders");
}
