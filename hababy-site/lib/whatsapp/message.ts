import type { AdminOrderDetail, SelectedProductSnapshot } from "@/types/order";

type WhatsAppDraftType = "new" | "confirmed" | "cancelled";

export type WhatsAppHandoffDraft = {
  type: WhatsAppDraftType;
  label: string;
  message: string;
  whatsappUrl: string | null;
};

function formatDate(value: string | null) {
  if (!value) {
    return "not set";
  }

  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(date);
}

function formatMoney(value: number | null, currency: string | null) {
  if (typeof value !== "number") {
    return "not set";
  }

  return `${value.toLocaleString("en-GB")} ${currency ?? "MAD"}`;
}

function formatLabel(value: string | null) {
  if (!value) {
    return "not set";
  }

  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function productSummary(products: SelectedProductSnapshot[]) {
  if (products.length === 0) {
    return "selected item(s)";
  }

  return products
    .map((product) => {
      const quantity = product.quantity && product.quantity > 1 ? ` x${product.quantity}` : "";
      return `${product.name}${quantity}`;
    })
    .join(", ");
}

function hasCarSeat(products: SelectedProductSnapshot[]) {
  return products.some((product) => product.name.toLowerCase().includes("car seat"));
}

function getDraftType(status: string | null): WhatsAppDraftType {
  if (status === "confirmed") {
    return "confirmed";
  }

  if (status === "cancelled") {
    return "cancelled";
  }

  return "new";
}

export function normalizeWhatsAppPhone(phone: string | null | undefined) {
  if (!phone) {
    return null;
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  if (digits.startsWith("0") && digits.length === 10) {
    digits = `212${digits.slice(1)}`;
  }

  if (/^[567]\d{8}$/.test(digits)) {
    digits = `212${digits}`;
  }

  return /^\d{8,15}$/.test(digits) ? digits : null;
}

export function createWhatsAppHandoffDraft(order: AdminOrderDetail): WhatsAppHandoffDraft {
  const customerName = order.customer?.name ?? "there";
  const products = productSummary(order.selected_products);
  const dates = `${formatDate(order.rental_start)} to ${formatDate(order.rental_end)}`;
  const delivery = `${formatLabel(order.delivery_zone)} / ${formatLabel(order.delivery_window)}`;
  const total = formatMoney(order.total_due_mad, order.currency);
  const deposit = formatMoney(order.deposit_mad, order.currency);
  const carSeatNote = hasCarSeat(order.selected_products)
    ? "\n\nFor car seats, please choose the appropriate group based on the listed age, weight, height, and product specifications. Hababy & Co confirms stock, item condition, cleanliness, requested dates, and delivery feasibility, not child suitability."
    : "";
  const type = getDraftType(order.status);

  const messages: Record<WhatsAppDraftType, string> = {
    new: `Hi ${customerName}, thanks for your Hababy & Co request for ${products} (${dates}). We are reviewing availability and delivery details now. Payment and deposit will be arranged offline before handover. This is not a confirmed booking yet, and we will confirm the next step with you shortly.${carSeatNote}`,
    confirmed: `Hi ${customerName}, your Hababy & Co request is confirmed for ${products} (${dates}). Delivery: ${delivery}. Estimated total: ${total}. Deposit: ${deposit}. Payment/deposit will be arranged offline before handover; there is no online payment link.${carSeatNote}`,
    cancelled: `Hi ${customerName}, thank you for your Hababy & Co request for ${products} (${dates}). We are sorry, but we cannot fulfil this request as submitted. We can suggest alternatives manually if helpful.${carSeatNote}`,
  };
  const labels: Record<WhatsAppDraftType, string> = {
    new: "New request received",
    confirmed: "Confirmed request",
    cancelled: "Cancelled request",
  };
  const normalizedPhone = normalizeWhatsAppPhone(order.customer?.phone);
  const message = messages[type];

  return {
    type,
    label: labels[type],
    message,
    whatsappUrl: normalizedPhone
      ? `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`
      : null,
  };
}
