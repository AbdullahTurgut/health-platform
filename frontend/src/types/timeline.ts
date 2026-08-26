export type TimelineEventType =
  | "VISIT"
  | "MEDICAL_TEST"
  | "IMAGING"
  | "DOCUMENT"
  | "MEDICATION";

export type TimelineEvent = {
  id: string;
  type: TimelineEventType;

  eventDate: string;

  title: string;
  subtitle: string | null;
  description: string | null;

  diseaseId: string | null;
  diseaseName: string | null;
};

export type TimelineFilters = {
  type?: TimelineEventType;
  diseaseId?: string;
  from?: string;
  to?: string;
};

export type TimelineQuery = TimelineFilters & {
  page?: number;
  size?: number;
};

export type TimelinePageResponse = {
  content: TimelineEvent[];

  page: number;
  size: number;

  totalElements: number;
  totalPages: number;

  first: boolean;
  last: boolean;
};

export type TimelineFilterOptions = {
  diseases: {
    id: string;
    name: string;
  }[];
};
