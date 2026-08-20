import { axiosClient } from "@/api/axiosClient";

import type { DashboardSummaryResponse } from "@/types/dashboard";

export async function getDashboardSummary(): Promise<DashboardSummaryResponse> {
  const response = await axiosClient.get<DashboardSummaryResponse>(
    "/api/dashboard/summary",
  );

  return response.data;
}
