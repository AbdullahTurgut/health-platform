import type { TimelineEventType } from "@/types/timeline";

export const timelineEventTypes: TimelineEventType[] = [
  "VISIT",
  "MEDICAL_TEST",
  "IMAGING",
  "DOCUMENT",
  "MEDICATION",
];

export const timelineEventTypeLabels: Record<TimelineEventType, string> = {
  VISIT: "Ziyaret",
  MEDICAL_TEST: "Tıbbi Test",
  IMAGING: "Görüntüleme",
  DOCUMENT: "Belge",
  MEDICATION: "İlaç",
};

export const TIMELINE_DEFAULT_PAGE_SIZE = 20;

export const TIMELINE_MAX_PAGE_SIZE = 100;
