import "server-only";

import { createAdminSupabaseClient } from "./admin";
import { calculateRentalEstimate } from "@/lib/pricing/estimate";
import type { RequestFormInput } from "@/lib/validation/requestSchema";

type ProductForOrder = {
  id: string;
  name: string;
  slug: string;
  daily_price_mad: number;
  weekly_price_mad: number;
  monthly_price_mad: number;
  deposit_mad: number;
  availability_mode: string;
  active: boolean;
};

type SaveBookingRequestResult =
  | {
      ok: true;
      orderReference: string;
    }
  | {
      ok: false;
      message: string;
    };

function getOrderReference(orderId: string) {
  return orderId.slice(0, 8).toUpperCase();
}

async function getUsableInventoryCount(productId: string) {
  const supabase = createAdminSupabaseClient();
  const { count, error } = await supabase
    .from("inventory")
    .select("item_id", { count: "exact", head: true })
    .eq("product_id", productId)
    .eq("status", "available")
    .eq("cleaning_status", "clean")
    .is("current_order_id", null);

  if (error) {
    console.error("Could not re-check usable inventory:", error);
    return 0;
  }

  return count ?? 0;
}

async function getProductForOrder(slug: string) {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, slug, daily_price_mad, weekly_price_mad, monthly_price_mad, deposit_mad, availability_mode, active"
    )
    .eq("slug", slug)
    .eq("active", true)
    .neq("availability_mode", "hidden")
    .maybeSingle();

  if (error) {
    console.error("Could not fetch product for order:", error);
    return null;
  }

  return data as ProductForOrder | null;
}

async function findOrCreateCustomer(input: RequestFormInput) {
  const supabase = createAdminSupabaseClient();
  const { data: existingCustomers, error: lookupError } = await supabase
    .from("customers")
    .select("id")
    .eq("phone", input.phone)
    .order("created_at", { ascending: true })
    .limit(1);

  if (lookupError) {
    console.error("Could not look up customer by phone:", lookupError);
    throw new Error("customer_lookup_failed");
  }

  const existingCustomer = existingCustomers?.[0];

  if (existingCustomer?.id) {
    const customerUpdates: {
      name: string;
      preferred_language: string;
      email?: string;
      notes?: string;
    } = {
      name: input.customerName,
      preferred_language: input.preferredLanguage,
    };

    if (input.email) {
      customerUpdates.email = input.email;
    }

    if (input.notes) {
      customerUpdates.notes = input.notes;
    }

    const { error: updateError } = await supabase
      .from("customers")
      .update(customerUpdates)
      .eq("id", existingCustomer.id);

    if (updateError) {
      console.error("Could not update existing customer:", updateError);
      throw new Error("customer_update_failed");
    }

    return existingCustomer.id as string;
  }

  const { data: newCustomer, error: createError } = await supabase
    .from("customers")
    .insert({
      name: input.customerName,
      phone: input.phone,
      email: input.email,
      preferred_language: input.preferredLanguage,
      notes: input.notes,
    })
    .select("id")
    .single();

  if (createError || !newCustomer?.id) {
    console.error("Could not create customer:", createError);
    throw new Error("customer_create_failed");
  }

  return newCustomer.id as string;
}

export async function saveBookingRequest(input: RequestFormInput): Promise<SaveBookingRequestResult> {
  const product = await getProductForOrder(input.selectedProductSlug);

  if (!product) {
    return {
      ok: false,
      message: "This product is not available to request.",
    };
  }

  const usableInventoryCount = await getUsableInventoryCount(product.id);

  if (usableInventoryCount < 1) {
    return {
      ok: false,
      message: "This product is currently unavailable, so it cannot be requested.",
    };
  }

  const estimate = calculateRentalEstimate(product, input.rentalStartDate, input.rentalEndDate);

  if (estimate.rentalDays < 1) {
    return {
      ok: false,
      message: "Choose a valid rental date range.",
    };
  }

  const customerId = await findOrCreateCustomer(input);
  const supabase = createAdminSupabaseClient();
  const selectedProducts = [
    {
      product_id: product.id,
      name: product.name,
      slug: product.slug,
      quantity: 1,
      daily_price_mad: product.daily_price_mad,
      weekly_price_mad: product.weekly_price_mad,
      monthly_price_mad: product.monthly_price_mad,
      deposit_mad: product.deposit_mad,
      estimated_rental_days: estimate.rentalDays,
      estimated_rental_subtotal_mad: estimate.rentalSubtotalMad,
    },
  ];

  // TODO: Revisit per-order customer notes when the admin order detail flow is built.
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_id: customerId,
      status: "new",
      rental_start: input.rentalStartDate,
      rental_end: input.rentalEndDate,
      delivery_zone: input.deliveryZone,
      delivery_type: input.deliveryType,
      delivery_window: input.deliveryWindow,
      pickup_window: input.pickupWindow,
      baby_details: {},
      selected_products: selectedProducts,
      add_ons: [],
      welcome_kit_ids: [],
      rental_subtotal_mad: estimate.rentalSubtotalMad,
      addons_total_mad: 0,
      welcome_kit_total_mad: 0,
      delivery_fee_mad: estimate.deliveryFeeMad,
      urgent_fee_mad: estimate.urgentFeeMad,
      deposit_mad: estimate.depositMad,
      total_due_mad: estimate.totalDueMad,
      payment_method: input.paymentPreference,
      currency: "MAD",
    })
    .select("id")
    .single();

  if (orderError || !order?.id) {
    console.error("Could not create order:", orderError);
    return {
      ok: false,
      message: "We could not save your request. Please try again or contact Hababy & Co on WhatsApp.",
    };
  }

  return {
    ok: true,
    orderReference: getOrderReference(order.id as string),
  };
}
