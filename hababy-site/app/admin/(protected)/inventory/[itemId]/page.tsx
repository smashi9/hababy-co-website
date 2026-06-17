import Link from "next/link";
import { notFound } from "next/navigation";
import { InventoryEditForm } from "@/components/admin/InventoryEditForm";
import { formatDate, formatLabel } from "@/components/admin/orderFormat";
import { getAdminInventoryItemById } from "@/lib/supabase/adminQueries";

function textOrDash(value: string | null) {
  return value?.trim() ? value : "-";
}

export default async function AdminInventoryItemPage({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const { itemId } = await params;
  const item = await getAdminInventoryItemById(itemId);

  if (!item) {
    notFound();
  }

  const isLinked = Boolean(item.current_order_id);

  return (
    <div className="grid gap-6">
      <div>
        <Link href="/admin/inventory" className="text-sm font-black text-primary">
          Back to inventory
        </Link>
        <p className="mt-5 badge">{isLinked ? "Read-only while linked" : "Editable state"}</p>
        <h1 className="mt-4 font-heading text-4xl text-ink">Inventory item</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/72">
          Edit only the operational state fields for an existing inventory unit. Product identity,
          serial data, purchase data, and order links are read-only.
        </p>
      </div>

      <section className="card">
        <h2 className="text-xl font-black text-ink">Item context</h2>
        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="font-bold text-ink/62">Product</dt>
            <dd className="mt-1 font-black text-ink">{item.product_name}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink/62">Product slug</dt>
            <dd className="mt-1 font-black text-ink">{textOrDash(item.product_slug)}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink/62">Item ID</dt>
            <dd className="mt-1 break-all font-black text-ink">{item.item_id}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink/62">Brand / model</dt>
            <dd className="mt-1 font-black text-ink">
              {textOrDash([item.brand, item.model].filter(Boolean).join(" / ") || null)}
            </dd>
          </div>
          <div>
            <dt className="font-bold text-ink/62">Serial number</dt>
            <dd className="mt-1 font-black text-ink">{textOrDash(item.serial_number)}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink/62">Purchase date</dt>
            <dd className="mt-1 font-black text-ink">{formatDate(item.purchase_date)}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink/62">Current status</dt>
            <dd className="mt-1 font-black text-ink">{formatLabel(item.status)}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink/62">Current cleaning status</dt>
            <dd className="mt-1 font-black text-ink">{formatLabel(item.cleaning_status)}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink/62">Linked order</dt>
            <dd className="mt-1 break-all font-black text-ink">
              {textOrDash(item.current_order_id)}
            </dd>
          </div>
        </dl>
      </section>

      {isLinked ? (
        <div className="card border-primary/30 bg-primary/10">
          <h2 className="text-xl font-black text-primary">Linked item cannot be edited here.</h2>
          <p className="mt-3 text-sm font-bold leading-6 text-ink/74">
            This inventory item is linked to an order. The admin edit action blocks linked items and
            never changes current_order_id or reservation state.
          </p>
        </div>
      ) : (
        <InventoryEditForm item={item} />
      )}
    </div>
  );
}
