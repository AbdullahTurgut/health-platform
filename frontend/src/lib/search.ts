import type { SearchQuery, SearchResultType } from "@/types/search";

type BuildSearchQueryInput = {
  query: string;
  type?: SearchResultType;
  diseaseId?: string;
  page: number;
  size: number;
};

export const searchResultTypes: SearchResultType[] = [
  "DISEASE",
  "DOCTOR",
  "HOSPITAL",
  "VISIT",
  "MEDICAL_TEST",
  "TEST_RESULT",
  "IMAGING",
  "DOCUMENT",
  "MEDICATION",
];

export const searchResultTypeLabels: Record<SearchResultType, string> = {
  DISEASE: "Hastalık",
  DOCTOR: "Doktor",
  HOSPITAL: "Hastane",
  VISIT: "Ziyaret",
  MEDICAL_TEST: "Tıbbi Test",
  TEST_RESULT: "Test Sonucu",
  IMAGING: "Görüntüleme",
  DOCUMENT: "Belge",
  MEDICATION: "İlaç",
};

export function normalizeSearchQuery(value: string): string {
  return value.trim();
}

export function isValidSearchQuery(value: string): boolean {
  const normalized = normalizeSearchQuery(value);

  return (
    normalized.length >= SEARCH_MIN_QUERY_LENGTH &&
    normalized.length <= SEARCH_MAX_QUERY_LENGTH
  );
}

export function buildSearchQuery({
  query,
  type,
  diseaseId,
  page,
  size,
}: BuildSearchQueryInput): SearchQuery {
  return {
    q: normalizeSearchQuery(query),

    ...(type ? { type } : {}),

    ...(diseaseId ? { diseaseId } : {}),

    page,
    size,
  };
}

export const SEARCH_MIN_QUERY_LENGTH = 2;

export const SEARCH_MAX_QUERY_LENGTH = 200;

export const SEARCH_DEFAULT_PAGE_SIZE = 20;

export const SEARCH_MAX_PAGE_SIZE = 100;
