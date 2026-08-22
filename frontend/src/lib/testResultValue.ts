export const TEST_RESULT_NUMERIC_MIN = "-999999999999.999999";

export const TEST_RESULT_NUMERIC_MAX = "999999999999.999999";

export function parseOptionalNumericValue(value: string): number | null {
  const normalized = value.trim();

  if (!normalized) {
    return null;
  }

  const parsed = Number(normalized);

  if (!Number.isFinite(parsed)) {
    throw new Error("Geçerli bir sayısal değer girin.");
  }

  return parsed;
}
