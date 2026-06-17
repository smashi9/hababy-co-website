export type InventoryStatus =
  | "available"
  | "reserved"
  | "out"
  | "cleaning"
  | "maintenance"
  | "retired";

export type InventoryCleaningStatus =
  | "clean"
  | "needs_cleaning"
  | "inspection_needed"
  | "maintenance_needed";

export type AdminInventoryUnit = {
  item_id: string;
  product_id: string | null;
  product_name: string;
  product_slug: string | null;
  brand: string | null;
  model: string | null;
  serial_number: string | null;
  purchase_date?: string | null;
  source: string | null;
  condition: string | null;
  status: InventoryStatus;
  cleaning_status: InventoryCleaningStatus;
  current_order_id: string | null;
  notes: string | null;
  usable_for_request: boolean;
};

export type AdminInventoryProductSummary = {
  product_id: string;
  product_name: string;
  product_slug: string;
  availability_mode: string;
  usable_stock_count: number;
  total_inventory_units: number;
  unavailable_count: number;
  needs_cleaning_count: number;
  maintenance_count: number;
  status_summary: string;
};

export type AdminInventoryOverview = {
  products: AdminInventoryProductSummary[];
  units: AdminInventoryUnit[];
};

export type AdminInventoryItemDetail = AdminInventoryUnit & {
  purchase_date: string | null;
};
