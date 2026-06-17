import { InventorySummary } from "@/components/admin/InventorySummary";
import { InventoryTable } from "@/components/admin/InventoryTable";
import { getAdminInventoryOverview } from "@/lib/supabase/adminQueries";

export default async function AdminInventoryPage() {
  const inventory = await getAdminInventoryOverview();

  return (
    <div className="grid gap-8">
      <div>
        <p className="badge">Operational state</p>
        <h1 className="mt-4 font-heading text-4xl text-ink">Inventory visibility</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/72">
          View product-level stock and physical inventory units. Existing units can be updated for
          operational state only; this page does not reserve items, create units, delete units, or
          edit product records.
        </p>
      </div>

      <InventorySummary products={inventory.products} />

      <section className="grid gap-4" aria-label="Inventory units">
        <div>
          <h2 className="font-heading text-3xl text-ink">Inventory units</h2>
          <p className="mt-2 text-sm leading-6 text-ink/70">
            A unit is usable for requests only when its item status is available, cleaning status is
            clean, and it is not linked to a current order.
          </p>
        </div>
        <InventoryTable units={inventory.units} />
      </section>
    </div>
  );
}
