import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";

type NormalizePhoneResult =
  | { ok: true; phone: string }
  | { ok: false; message: string };

function hasOnlyPhoneCharacters(value: string) {
  return /^[+()\d\s.-]+$/.test(value);
}

function normalizeInternationalInput(value: string) {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "");

  if (trimmed.startsWith("+")) {
    return `+${digits}`;
  }

  if (digits.startsWith("00")) {
    return `+${digits.slice(2)}`;
  }

  return null;
}

function isValidInternationalPhone(value: string) {
  return /^\+\d{8,15}$/.test(value);
}

export function normalizePhoneNumber({
  phone,
}: {
  phone: string;
}): NormalizePhoneResult {
  const rawPhone = phone.trim();

  if (!rawPhone) {
    return { ok: false, message: "Enter a phone number." };
  }

  if (!hasOnlyPhoneCharacters(rawPhone)) {
    return { ok: false, message: "Enter a valid phone number using digits, spaces, or +." };
  }

  const digits = rawPhone.replace(/\D/g, "");
  let candidate = normalizeInternationalInput(rawPhone);

  if (!candidate && /^0[67]\d{8}$/.test(digits)) {
    candidate = `+212${digits.slice(1)}`;
  }

  if (!candidate && /^[67]\d{8}$/.test(digits)) {
    candidate = `+212${digits}`;
  }

  if (!candidate) {
    return { ok: false, message: "Enter a full international phone number." };
  }

  if (!isValidInternationalPhone(candidate) || !isValidPhoneNumber(candidate)) {
    return { ok: false, message: "Enter a valid phone number." };
  }

  const parsedPhone = parsePhoneNumber(candidate);

  return parsedPhone?.number
    ? { ok: true, phone: parsedPhone.number }
    : { ok: false, message: "Enter a valid phone number." };
}

export function phoneToWhatsAppDigits(phone: string | null | undefined) {
  if (!phone) {
    return null;
  }

  const normalized = normalizePhoneNumber({
    phone,
  });

  if (!normalized.ok) {
    return null;
  }

  return normalized.phone.replace(/\D/g, "");
}
