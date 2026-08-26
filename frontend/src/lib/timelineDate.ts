export function localDateStartToInstant(value: string): string {
  const [year, month, day] = value.split("-").map(Number);

  const date = new Date(year, month - 1, day, 0, 0, 0, 0);

  return date.toISOString();
}

export function localDateEndToInstant(value: string): string {
  const [year, month, day] = value.split("-").map(Number);

  const date = new Date(year, month - 1, day, 23, 59, 59, 999);

  return date.toISOString();
}

export function isValidTimelineDateRange(from: string, to: string): boolean {
  if (!from || !to) {
    return true;
  }

  return from <= to;
}
