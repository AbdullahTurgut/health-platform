import { axiosClient } from "@/api/axiosClient";

import type { TimelinePageResponse, TimelineQuery } from "@/types/timeline";

export async function getTimeline(
  query?: TimelineQuery,
): Promise<TimelinePageResponse> {
  const response = await axiosClient.get<TimelinePageResponse>(
    "/api/timeline",
    {
      params: query,
    },
  );

  return response.data;
}
