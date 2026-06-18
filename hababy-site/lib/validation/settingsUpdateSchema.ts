import { z } from "zod";
import { normalizePhoneNumber } from "@/lib/contact/phone";

const optionalText = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength)
    .optional()
    .transform((value) => value || null);

const optionalFxRate = z.preprocess(
  (value) => {
    if (value === null || value === undefined) {
      return null;
    }

    if (typeof value === "string") {
      const trimmedValue = value.trim();
      return trimmedValue === "" ? null : Number(trimmedValue);
    }

    return value;
  },
  z
    .number({ error: "Enter a valid exchange rate." })
    .positive("Exchange rate must be greater than 0.")
    .max(100, "Exchange rate is too high.")
    .nullable()
);

export const settingsUpdateSchema = z
  .object({
    id: z.uuid("Settings id must be valid."),
    whatsapp_number: z
      .string()
      .trim()
      .optional()
      .transform((value, ctx) => {
        if (!value) {
          return null;
        }

        const normalizedPhone = normalizePhoneNumber({ phone: value });

        if (!normalizedPhone.ok) {
          ctx.addIssue({
            code: "custom",
            message: "Enter a valid WhatsApp phone number.",
          });
          return z.NEVER;
        }

        return normalizedPhone.phone;
      }),
    public_fx_note: optionalText(500),
    eur_rate: optionalFxRate,
    usd_rate: optionalFxRate,
  })
  .strict();

export type SettingsUpdateInput = z.infer<typeof settingsUpdateSchema>;
