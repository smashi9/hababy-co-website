import { z } from "zod";

const optionalText = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength)
    .optional()
    .transform((value) => value || null);

const madInteger = z.preprocess(
  (value) => {
    if (value === null || value === undefined) {
      return undefined;
    }

    if (typeof value === "string") {
      const trimmedValue = value.trim();
      return trimmedValue === "" ? undefined : Number(trimmedValue);
    }

    return value;
  },
  z
    .number({ error: "Enter an amount." })
    .int("Enter a whole MAD amount.")
    .min(0, "Amount cannot be negative.")
    .max(1_000_000, "Amount is too high.")
);

export const productUpdateSchema = z
  .object({
    id: z.uuid("Product id must be valid."),
    name: z.string().trim().min(1, "Enter a product name.").max(160),
    description: optionalText(3000),
    safety_notes: optionalText(2000),
    cleaning_notes: optionalText(2000),
    age_guidance: optionalText(500),
    weight_guidance: optionalText(500),
    height_guidance: optionalText(500),
    daily_price_mad: madInteger,
    weekly_price_mad: madInteger,
    monthly_price_mad: madInteger,
    deposit_mad: madInteger,
    featured: z.boolean(),
    display_order: z.coerce.number().int("Display order must be a whole number.").min(-1000).max(1000),
  })
  .strict();

export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
