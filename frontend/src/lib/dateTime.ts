export function instantToDateTimeLocal(value: string): string {
  const date = new Date(value);

  const offset = date.getTimezoneOffset();

  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 16);
}
