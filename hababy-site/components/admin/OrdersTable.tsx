import Link from "next/link";
import type { AdminOrderListItem } from "@/types/order";
import { formatDate, formatDateTime, formatLabel, formatMoney, orderReference } from "./orderFormat";

function productNames(order: AdminOrderListItem) {
  if (order.selected_products.length === 0) {
    return "No readable product snapshot";
  }

  return order.selected_products
    .map((product) => {
      const quantity = product.quantity && product.quantity > 1 ? ` x${product.quantity}` : "";
      return `${product.name}${quantity}`;
    })
    .join(", ");
}

export function OrdersTable({ orders }: { orders: AdminOrderListItem[] }) {
  if (orders.length === 0) {
    return (
      <div className="card">
        <h2 className="text-xl font-black text-ink">No requests yet</h2>
        <p className="mt-3 text-sm leading-6 text-ink/70">
          New saved customer requests will appear here after the public request form is submitted.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-taupe/25 bg-white">
      <table className="min-w-[1120px] w-full border-collapse text-left text-sm">
        <thead className="bg-sand/45 text-xs font-black uppercase tracking-wide text-ink/70">
          <tr>
            <th className="px-4 py-3">Ref</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Products</th>
            <th className="px-4 py-3">Dates</th>
            <th className="px-4 py-3">Delivery</th>
            <th className="px-4 py-3">Estimate</th>
            <th className="px-4 py-3">Deposit</th>
            <th className="px-4 py-3">Payment</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-taupe/20">
          {orders.map((order) => (
            <tr key={order.id} className="align-top">
              <td className="px-4 py-4 font-black text-primary">
                <Link href={`/admin/orders/${order.id}`}>{orderReference(order.id)}</Link>
              </td>
              <td className="px-4 py-4 font-bold text-ink/70">{formatDateTime(order.created_at)}</td>
              <td className="px-4 py-4">
                <span className="badge badge-soft">{formatLabel(order.status)}</span>
              </td>
              <td className="px-4 py-4">
                <p className="font-black text-ink">{order.customer?.name ?? "-"}</p>
                <p className="mt-1 font-bold text-ink/65">{order.customer?.phone ?? "-"}</p>
              </td>
              <td className="px-4 py-4 font-bold text-ink/75">{productNames(order)}</td>
              <td className="px-4 py-4 font-bold text-ink/70">
                {formatDate(order.rental_start)} to {formatDate(order.rental_end)}
              </td>
              <td className="px-4 py-4 font-bold text-ink/70">
                {formatLabel(order.delivery_zone)} / {formatLabel(order.delivery_type)}
              </td>
              <td className="px-4 py-4 font-black text-ink">
                {formatMoney(order.total_due_mad, order.currency ?? "MAD")}
              </td>
              <td className="px-4 py-4 font-bold text-ink/70">
                {formatMoney(order.deposit_mad, order.currency ?? "MAD")}
              </td>
              <td className="px-4 py-4 font-bold text-ink/70">
                {formatLabel(order.payment_method)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
