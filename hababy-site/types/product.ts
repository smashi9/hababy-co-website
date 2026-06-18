export type AdminProductListItem = {
  id: string;
  name: string;
  slug: string;
  daily_price_mad: number;
  weekly_price_mad: number;
  monthly_price_mad: number;
  deposit_mad: number;
  featured: boolean;
  display_order: number;
  active: boolean;
  availability_mode: string;
};

export type AdminProductDetail = AdminProductListItem & {
  category_name: string | null;
  description: string | null;
  safety_notes: string | null;
  cleaning_notes: string | null;
  age_guidance: string | null;
  weight_guidance: string | null;
  height_guidance: string | null;
  requires_child_details: boolean;
  model_image_note: boolean;
  created_at: string | null;
  updated_at: string | null;
};
