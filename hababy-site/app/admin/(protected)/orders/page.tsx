import { OrdersTable } from "@/components/admin/OrdersTable";
import { getAdminOrders } from "@/lib/supabase/adminQueries";

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <div className="grid gap-6">
      <div>
        <p className="badge">Read-only</p>
        <h1 className="mt-4 font-heading text-4xl text-ink">Incoming requests</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/72">
          Review saved customer requests from the public form. This view does not change order
          status, reserve inventory, or send customer messages.
        </p>
      </div>
      <OrdersTable orders={orders} />
    </div>
  );
}
