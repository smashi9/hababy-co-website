"use server";

import { requestFormSchema } from "@/lib/validation/requestSchema";
import { saveBookingRequest } from "@/lib/supabase/orders";

export type RequestActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
  orderReference?: string;
};

function formValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function submitBookingRequest(
  _prevState: RequestActionState,
  formData: FormData
): Promise<RequestActionState> {
  const parsed = requestFormSchema.safeParse({
    selectedProductSlug: formValue(formData, "selectedProductSlug"),
    rentalStartDate: formValue(formData, "rentalStartDate"),
    rentalEndDate: formValue(formData, "rentalEndDate"),
    deliveryType: formValue(formData, "deliveryType"),
    deliveryZone: formValue(formData, "deliveryZone"),
    deliveryWindow: formValue(formData, "deliveryWindow"),
    pickupWindow: formValue(formData, "pickupWindow"),
    customerName: formValue(formData, "customerName"),
    phone: formValue(formData, "phone"),
    email: formValue(formData, "email"),
    preferredLanguage: formValue(formData, "preferredLanguage"),
    paymentPreference: formValue(formData, "paymentPreference"),
    notes: formValue(formData, "notes"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await saveBookingRequest(parsed.data);

    if (!result.ok) {
      return {
        status: "error",
        message: result.message,
      };
    }

    return {
      status: "success",
      message:
        "Thanks - we've received your request. Hababy & Co will confirm availability, delivery, payment/deposit, and handover before approval.",
      orderReference: result.orderReference,
    };
  } catch (error) {
    console.error("Booking request action failed:", error);
    return {
      status: "error",
      message: "We could not save your request. Please try again or contact Hababy & Co on WhatsApp.",
    };
  }
}
