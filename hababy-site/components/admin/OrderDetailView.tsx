import type { AdminOrderDetail } from "@/types/order";
import { OrderInternalNotesForm } from "./OrderInternalNotesForm";
import { OrderStatusActions } from "./OrderStatusActions";
import { WhatsAppHandoff } from "./WhatsAppHandoff";
import { formatDate, formatDateTime, formatLabel, formatMoney, orderReference } from "./orderFormat";

function DetailField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-taupe/25 bg-white p-4">
      <dt className="text-xs font-black uppercase tracking-wide text-ink/58">{label}</dt>
      <dd className="mt-2 text-sm font-bold leading-6 text-ink">{value || "-"}</dd>
    </div>
  );
}

export function OrderDetailView({ order }: { order: AdminOrderDetail }) {
  const currency = order.currency ?? "MAD";

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="badge badge-soft">{formatLabel(order.status)}</p>
          <h1 className="mt-4 font-heading text-4xl text-ink">
            Request {orderReference(order.id)}
          </h1>
          <p className="mt-3 text-sm font-bold text-ink/65">
            Created {formatDateTime(order.created_at)}
          </p>
        </div>
        <div className="w-full sm:max-w-sm">
          {order.status === "new" ? (
            <OrderStatusActions orderId={order.id} />
          ) : (
            <div className="rounded-2xl border border-taupe/25 bg-white p-4">
              <p className="text-xs font-black uppercase tracking-wide text-ink/58">
                Status actions
              </p>
              <p className="mt-2 text-sm font-bold leading-6 text-ink/70">
                This request is {formatLabel(order.status)}. Status changes are only available for
                new requests in this milestone.
              </p>
            </div>
          )}
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <DetailField label="Customer" value={order.customer?.name} />
        <DetailField label="Phone" value={order.customer?.phone} />
        <DetailField label="Email" value={order.customer?.email ?? "-"} />
        <DetailField label="Preferred language" value={formatLabel(order.customer?.preferred_language ?? null)} />
        <DetailField label="Rental dates" value={`${formatDate(order.rental_start)} to ${formatDate(order.rental_end)}`} />
        <DetailField label="Payment preference" value={formatLabel(order.payment_method)} />
      </section>

      <section className="card">
        <h2 className="text-xl font-black text-ink">Selected products</h2>
        {order.selected_products.length > 0 ? (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-[720px] w-full border-collapse text-left text-sm">
              <thead className="bg-sand/45 text-xs font-black uppercase tracking-wide text-ink/70">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Qty</th>
                  <th className="px-4 py-3">Subtotal</th>
                  <th className="px-4 py-3">Deposit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-taupe/20">
                {order.selected_products.map((product, index) => (
                  <tr key={`${product.slug ?? product.name}-${index}`}>
                    <td className="px-4 py-3 font-black text-ink">{product.name}</td>
                    <td className="px-4 py-3 font-bold text-ink/70">{product.slug ?? "-"}</td>
                    <td className="px-4 py-3 font-bold text-ink/70">{product.quantity ?? "-"}</td>
                    <td className="px-4 py-3 font-bold text-ink/70">
                      {formatMoney(product.subtotalMad, currency)}
                    </td>
                    <td className="px-4 py-3 font-bold text-ink/70">
                      {formatMoney(product.depositMad, currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-3 text-sm font-bold leading-6 text-ink/70">
            This order does not contain a readable selected product snapshot.
          </p>
        )}
      </section>

      <WhatsAppHandoff order={order} />

      <OrderInternalNotesForm orderId={order.id} internalNotes={order.internal_notes} />

      <section className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <h2 className="text-xl font-black text-ink">Estimate breakdown</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="font-bold text-ink/68">Rental subtotal</dt>
              <dd className="font-black text-ink">{formatMoney(order.rental_subtotal_mad, currency)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-bold text-ink/68">Add-ons</dt>
              <dd className="font-black text-ink">{formatMoney(order.addons_total_mad, currency)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-bold text-ink/68">Welcome Kits</dt>
              <dd className="font-black text-ink">{formatMoney(order.welcome_kit_total_mad, currency)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-bold text-ink/68">Delivery fee</dt>
              <dd className="font-black text-ink">{formatMoney(order.delivery_fee_mad, currency)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-bold text-ink/68">Urgent fee</dt>
              <dd className="font-black text-ink">{formatMoney(order.urgent_fee_mad, currency)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-bold text-ink/68">Refundable deposit</dt>
              <dd className="font-black text-ink">{formatMoney(order.deposit_mad, currency)}</dd>
            </div>
            <div className="flex justify-between gap-4 rounded-2xl bg-sand/60 px-4 py-3">
              <dt className="font-black text-ink">Estimated total</dt>
              <dd className="font-black text-ink">{formatMoney(order.total_due_mad, currency)}</dd>
            </div>
          </dl>
        </div>

        <div className="card">
          <h2 className="text-xl font-black text-ink">Delivery and notes</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <DetailField label="Delivery zone" value={formatLabel(order.delivery_zone)} />
            <DetailField label="Delivery type" value={formatLabel(order.delivery_type)} />
            <DetailField label="Delivery window" value={formatLabel(order.delivery_window)} />
            <DetailField label="Pickup window" value={formatLabel(order.pickup_window)} />
          </dl>
        </div>
      </section>

      {(order.payment_notes || order.customer?.notes) ? (
        <section className="card">
          <h2 className="text-xl font-black text-ink">Customer and payment notes</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <DetailField label="Customer notes" value={order.customer?.notes} />
            <DetailField label="Payment notes" value={order.payment_notes} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
