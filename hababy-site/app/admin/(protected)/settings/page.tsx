import { SettingsEditForm } from "@/components/admin/SettingsEditForm";
import { getAdminSettings } from "@/lib/supabase/adminQueries";

export default async function AdminSettingsPage() {
  const settings = await getAdminSettings();

  return (
    <div className="grid gap-6">
      <div>
        <p className="badge">Tier A settings</p>
        <h1 className="mt-4 font-heading text-4xl text-ink">Settings foundation</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/72">
          Store the owner&apos;s WhatsApp number, public FX note, and manual EUR/USD rates for
          future operational use. These values are admin-only and not exposed publicly.
        </p>
      </div>
      <SettingsEditForm settings={settings} />
    </div>
  );
}
