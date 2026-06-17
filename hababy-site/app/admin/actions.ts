"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerAuthClient } from "@/lib/supabase/serverAuth";

export async function signOutAdmin() {
  const supabase = await createSupabaseServerAuthClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
