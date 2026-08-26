export type SearchResultType =
  | "DISEASE"
  | "DOCTOR"
  | "HOSPITAL"
  | "VISIT"
  | "MEDICAL_TEST"
  | "TEST_RESULT"
  | "IMAGING"
  | "DOCUMENT"
  | "MEDICATION";

export type SearchResultItem = {
  id: string;

  type: SearchResultType;

  title: string;
  subtitle: string | null;
  description: string | null;

  eventDate: string | null;

  diseaseId: string | null;
  diseaseName: string | null;

  relevanceScore: number;
};

export type SearchPageResponse = {
  query: string;

  content: SearchResultItem[];

  page: number;
  size: number;

  totalElements: number;
  totalPages: number;

  first: boolean;
  last: boolean;
};

export type SearchQuery = {
  q: string;

  type?: SearchResultType;
  diseaseId?: string;

  page?: number;
  size?: number;
};

export type SearchFilterOptions = {
  diseases: {
    id: string;
    name: string;
  }[];
};
