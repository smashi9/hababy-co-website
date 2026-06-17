import { z } from "zod";
import { normalizePhoneNumber } from "@/lib/contact/phone";

export const deliveryTypeValues = [
  "home",
  "hotel",
  "airbnb",
  "family_home",
  "airport",
  "other",
] as const;

export const deliveryWindowValues = ["morning_9_12", "afternoon_14_17", "evening_17_20"] as const;

export const deliveryZoneValues = [
  "rabat",
  "agdal",
  "hay_riad",
  "souissi",
  "hassan",
  "lorangeraie",
  "temara",
  "harhoura",
  "rabat_sale_airport",
] as const;

export const preferredLanguageValues = ["en", "fr"] as const;

export const offlinePaymentMethodValues = [
  "mad_cash",
  "mad_bank_transfer",
  "eur_cash",
  "usd_cash",
] as const;

const dateString = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date.");

function parseLocalDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isAtLeast24HoursAhead(value: string) {
  const start = parseLocalDate(value);

  if (!start) {
    return false;
  }

  return start.getTime() - Date.now() >= 24 * 60 * 60 * 1000;
}

export const requestFormSchema = z
  .object({
    selectedProductSlug: z.string().trim().min(1, "Choose an available product."),
    rentalStartDate: dateString,
    rentalEndDate: dateString,
    deliveryType: z.enum(deliveryTypeValues, "Choose a valid delivery type."),
    deliveryZone: z.enum(deliveryZoneValues, "Choose a valid delivery zone."),
    deliveryWindow: z.enum(deliveryWindowValues, "Choose a valid delivery window."),
    pickupWindow: z.enum(deliveryWindowValues, "Choose a valid pickup window."),
    customerName: z.string().trim().min(1, "Enter your name."),
    phone: z.string().trim().min(1, "Enter a phone number."),
    email: z
      .string()
      .trim()
      .optional()
      .transform((value) => value || null)
      .pipe(z.email("Enter a valid email.").nullable()),
    preferredLanguage: z.enum(preferredLanguageValues, "Choose a valid language."),
    paymentPreference: z
      .string()
      .refine((value) => value !== "card", "Card payment is not available during the pilot.")
      .pipe(z.enum(offlinePaymentMethodValues, "Choose an offline payment preference.")),
    notes: z
      .string()
      .trim()
      .max(2000, "Keep notes under 2000 characters.")
      .optional()
      .transform((value) => value || null),
  })
  .refine((data) => {
    const start = parseLocalDate(data.rentalStartDate);
    const end = parseLocalDate(data.rentalEndDate);
    return Boolean(start && end && end >= start);
  }, {
    path: ["rentalEndDate"],
    message: "Rental end date must be on or after the start date.",
  })
  .refine((data) => isAtLeast24HoursAhead(data.rentalStartDate), {
    path: ["rentalStartDate"],
    message: "Same-day requests are not available during the pilot. Please request at least 24 hours ahead.",
  })
  .transform((data, ctx) => {
    const normalizedPhone = normalizePhoneNumber({
      phone: data.phone,
    });

    if (!normalizedPhone.ok) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: normalizedPhone.message,
      });
      return z.NEVER;
    }

    return {
      ...data,
      phone: normalizedPhone.phone,
    };
  });

export type RequestFormInput = z.infer<typeof requestFormSchema>;
