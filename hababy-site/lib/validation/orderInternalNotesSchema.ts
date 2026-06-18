import { z } from "zod";

export const orderInternalNotesSchema = z
  .object({
    orderId: z.uuid("Order id must be valid."),
    internal_notes: z
      .string()
      .trim()
      .max(3000, "Internal notes must be 3000 characters or fewer.")
      .optional()
      .transform((value) => value || null),
  })
  .strict();

export type OrderInternalNotesInput = z.infer<typeof orderInternalNotesSchema>;
