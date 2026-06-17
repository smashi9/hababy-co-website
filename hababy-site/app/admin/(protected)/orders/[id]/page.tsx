import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderDetailView } from "@/components/admin/OrderDetailView";
import { getAdminOrderById } from "@/lib/supabase/adminQueries";

type AdminOrderDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminOrderDetailPage({ params }: AdminOrderDetailPageProps) {
  const { id } = await params;
  const order = await getAdminOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="grid gap-6">
      <Link className="text-sm font-black text-primary" href="/admin/orders">
        Back to orders
      </Link>
      <OrderDetailView order={order} />
    </div>
  );
}
