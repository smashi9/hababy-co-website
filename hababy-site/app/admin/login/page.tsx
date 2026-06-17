import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getVerifiedAdminSession } from "@/lib/supabase/adminQueries";

export default async function AdminLoginPage() {
  const adminSession = await getVerifiedAdminSession();

  if (adminSession) {
    redirect("/admin/orders");
  }

  return (
    <main className="bg-page px-4 py-16 sm:px-6 lg:px-8">
      <AdminLoginForm />
    </main>
  );
}
