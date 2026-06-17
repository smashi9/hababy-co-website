import type { AdminInventoryUnit } from "@/types/inventory";
import { formatLabel } from "./orderFormat";

function textOrDash(value: string | null) {
  return value?.trim() ? value : "-";
}

export function InventoryTable({ units }: { units: AdminInventoryUnit[] }) {
  if (units.length === 0) {
    return (
      <div className="card">
        <h2 className="text-xl font-black text-ink">No inventory units found</h2>
        <p className="mt-3 text-sm leading-6 text-ink/70">
          Add or maintain inventory in Supabase for now. This admin page is read-only and does not
          create, edit, reserve, or retire inventory.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-taupe/25 bg-white">
      <table className="min-w-[1180px] w-full border-collapse text-left text-sm">
        <thead className="bg-sand/45 text-xs font-black uppercase tracking-wide text-ink/70">
          <tr>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Brand / model</th>
            <th className="px-4 py-3">Item status</th>
            <th className="px-4 py-3">Cleaning</th>
            <th className="px-4 py-3">Usable</th>
            <th className="px-4 py-3">Serial</th>
            <th className="px-4 py-3">Condition</th>
            <th className="px-4 py-3">Source / notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-taupe/20">
          {units.map((unit) => (
            <tr key={unit.item_id} className="align-top">
              <td className="px-4 py-4">
                <p className="font-black text-ink">{unit.product_name}</p>
                <p className="mt-1 font-bold text-ink/60">{textOrDash(unit.product_slug)}</p>
              </td>
              <td className="px-4 py-4 font-bold text-ink/72">
                {textOrDash([unit.brand, unit.model].filter(Boolean).join(" / ") || null)}
              </td>
              <td className="px-4 py-4">
                <span className="badge badge-soft">{formatLabel(unit.status)}</span>
              </td>
              <td className="px-4 py-4 font-bold text-ink/72">
                {formatLabel(unit.cleaning_status)}
              </td>
              <td className="px-4 py-4">
                <span className={unit.usable_for_request ? "badge" : "badge badge-soft"}>
                  {unit.usable_for_request ? "Yes" : "No"}
                </span>
              </td>
              <td className="px-4 py-4 font-bold text-ink/72">
                {textOrDash(unit.serial_number)}
              </td>
              <td className="px-4 py-4 font-bold text-ink/72">{textOrDash(unit.condition)}</td>
              <td className="px-4 py-4 font-bold text-ink/72">
                <p>{textOrDash(unit.source)}</p>
                {unit.notes ? <p className="mt-2 text-ink/58">{unit.notes}</p> : null}
                {unit.current_order_id ? (
                  <p className="mt-2 text-primary">Linked order: {unit.current_order_id}</p>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
