import type { AdminCustomerSummary } from "./customer";

export type SelectedProductSnapshot = {
  name: string;
  slug: string | null;
  quantity: number | null;
  subtotalMad: number | null;
  depositMad: number | null;
};

export type AdminOrderListItem = {
  id: string;
  created_at: string;
  status: string | null;
  rental_start: string | null;
  rental_end: string | null;
  delivery_zone: string | null;
  delivery_type: string | null;
  selected_products: SelectedProductSnapshot[];
  rental_subtotal_mad: number | null;
  deposit_mad: number | null;
  total_due_mad: number | null;
  payment_method: string | null;
  currency: string | null;
  customer: AdminCustomerSummary | null;
};

export type AdminOrderDetail = AdminOrderListItem & {
  delivery_window: string | null;
  pickup_window: string | null;
  addons_total_mad: number | null;
  welcome_kit_total_mad: number | null;
  delivery_fee_mad: number | null;
  urgent_fee_mad: number | null;
  payment_notes: string | null;
  internal_notes: string | null;
};
