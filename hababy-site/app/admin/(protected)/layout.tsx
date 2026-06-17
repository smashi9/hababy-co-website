import { AdminShell } from "@/components/admin/AdminShell";
import { requireVerifiedAdminSession } from "@/lib/supabase/adminQueries";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireVerifiedAdminSession();

  return <AdminShell userEmail={user.email ?? "Admin"}>{children}</AdminShell>;
}
