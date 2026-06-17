import Link from "next/link";
import { signOutAdmin } from "@/app/admin/actions";

export function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  return (
    <div className="min-h-screen bg-page">
      <header className="border-b border-taupe/25 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-primary">Hababy admin</p>
            <p className="mt-1 text-sm font-bold text-ink/65">{userEmail}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link className="btn btn-secondary" href="/admin/orders">
              Orders
            </Link>
            <form action={signOutAdmin}>
              <button className="btn btn-primary" type="submit">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
