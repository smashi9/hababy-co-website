import { getShortOrderReference } from "@/lib/supabase/adminQueries";

const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
});

export function formatDate(value: string | null) {
  if (!value) {
    return "-";
  }

  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date);
}

export function formatDateTime(value: string | null) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : dateTimeFormatter.format(date);
}

export function formatMoney(value: number | null, currency = "MAD") {
  if (typeof value !== "number") {
    return "-";
  }

  return `${value.toLocaleString("en-GB")} ${currency}`;
}

export function formatLabel(value: string | null) {
  if (!value) {
    return "-";
  }

  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function orderReference(orderId: string) {
  return `#${getShortOrderReference(orderId)}`;
}
