export type DashboardCounts = {
  activeDiseases: number;
  activeMedications: number;
  totalVisits: number;
  totalMedicalTests: number;
  totalImaging: number;
  totalDocuments: number;
};

export type DashboardRecentItem = {
  id: string;
  type: string;
  title: string;
  subtitle: string | null;
  eventDate: string | null;
};

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

export type DashboardSummaryResponse = {
  counts: DashboardCounts;
  recentVisits: DashboardRecentItem[];
  recentMedicalTests: DashboardRecentItem[];
  recentImaging: DashboardRecentItem[];
  recentTimeline: TimelineEvent[];
};
