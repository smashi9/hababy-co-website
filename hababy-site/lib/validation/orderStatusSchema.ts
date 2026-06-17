import { z } from "zod";

export const orderStatusUpdateSchema = z.object({
  orderId: z.uuid(),
  targetStatus: z.enum(["confirmed", "cancelled"]),
});

export type OrderStatusUpdateInput = z.infer<typeof orderStatusUpdateSchema>;
