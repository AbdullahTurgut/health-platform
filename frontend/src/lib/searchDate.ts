import type { SearchResultItem } from "@/types/search";

export function formatSearchResultDate(
  result: SearchResultItem,
): string | null {
  if (!result.eventDate) {
    return null;
  }

  if (result.type === "MEDICATION") {
    return new Intl.DateTimeFormat("tr-TR", {
      dateStyle: "medium",
      timeZone: "UTC",
    }).format(new Date(result.eventDate));
  }

  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(result.eventDate));
}
