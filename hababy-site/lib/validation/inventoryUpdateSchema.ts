import { z } from "zod";

export const inventoryStatusValues = [
  "available",
  "reserved",
  "out",
  "cleaning",
  "maintenance",
  "retired",
] as const;

export const inventoryCleaningStatusValues = [
  "clean",
  "needs_cleaning",
  "inspection_needed",
  "maintenance_needed",
] as const;

const optionalText = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength)
    .optional()
    .transform((value) => value || null);

export const inventoryUpdateSchema = z.object({
  itemId: z.uuid("Inventory item id must be valid."),
  status: z.enum(inventoryStatusValues, "Choose a valid item status."),
  cleaning_status: z.enum(inventoryCleaningStatusValues, "Choose a valid cleaning status."),
  condition: optionalText(500),
  source: optionalText(500),
  notes: optionalText(1500),
});

export type InventoryUpdateInput = z.infer<typeof inventoryUpdateSchema>;
