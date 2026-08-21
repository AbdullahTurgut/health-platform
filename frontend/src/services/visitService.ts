import { axiosClient } from "@/api/axiosClient";

import type {
  CreateVisitRequest,
  UpdateVisitRequest,
  Visit,
  VisitFilters,
} from "@/types/visit";

export async function getVisits(filters?: VisitFilters): Promise<Visit[]> {
  const response = await axiosClient.get<Visit[]>("/api/visits", {
    params: filters,
  });

  return response.data;
}

export async function getVisit(id: string): Promise<Visit> {
  const response = await axiosClient.get<Visit>(`/api/visits/${id}`);

  return response.data;
}

export async function createVisit(payload: CreateVisitRequest): Promise<Visit> {
  const response = await axiosClient.post<Visit>("/api/visits", payload);

  return response.data;
}

export async function updateVisit(
  id: string,
  payload: UpdateVisitRequest,
): Promise<Visit> {
  const response = await axiosClient.put<Visit>(`/api/visits/${id}`, payload);

  return response.data;
}

export async function deleteVisit(id: string): Promise<void> {
  await axiosClient.delete(`/api/visits/${id}`);
}
