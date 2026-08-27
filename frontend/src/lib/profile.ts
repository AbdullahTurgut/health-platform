import type { ProfileFormValues, UpdateProfileRequest } from "@/types/user";

export function buildUpdateProfilePayload(
  values: ProfileFormValues,
): UpdateProfileRequest {
  return {
    firstName: values.firstName.trim(),

    lastName: values.lastName.trim(),

    dateOfBirth: values.dateOfBirth || null,
  };
}

export const PROFILE_NAME_MAX_LENGTH = 100;

export function isValidProfileName(value: string): boolean {
  const normalized = value.trim();

  return normalized.length > 0 && normalized.length <= PROFILE_NAME_MAX_LENGTH;
}

export function isFutureDate(value: string): boolean {
  if (!value) {
    return false;
  }

  const today = new Date();

  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");

  const day = String(today.getDate()).padStart(2, "0");

  const todayValue = `${year}-${month}-${day}`;

  return value > todayValue;
}

export function getTodayLocalDateValue(): string {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");

  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatProfileDate(value: string | null): string {
  if (!value) {
    return "Belirtilmemiş";
  }

  const [year, month, day] = value.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "long",
  }).format(date);
}

export function formatProfileTimestamp(value: string): string {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
