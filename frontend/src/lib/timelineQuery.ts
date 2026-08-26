import {
  localDateEndToInstant,
  localDateStartToInstant,
} from "@/lib/timelineDate";

import type { TimelineEventType, TimelineQuery } from "@/types/timeline";

type BuildTimelineQueryInput = {
  type?: TimelineEventType;
  diseaseId?: string;

  fromDate?: string;
  toDate?: string;

  page: number;
  size: number;
};

export function buildTimelineQuery({
  type,
  diseaseId,
  fromDate,
  toDate,
  page,
  size,
}: BuildTimelineQueryInput): TimelineQuery {
  return {
    ...(type ? { type } : {}),

    ...(diseaseId ? { diseaseId } : {}),

    ...(fromDate
      ? {
          from: localDateStartToInstant(fromDate),
        }
      : {}),

    ...(toDate
      ? {
          to: localDateEndToInstant(toDate),
        }
      : {}),

    page,
    size,
  };
}
