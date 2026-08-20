import { axiosClient } from "@/api/axiosClient";

import type {
  CreateDiseaseRequest,
  Disease,
  DiseaseStatus,
  UpdateDiseaseRequest,
} from "@/types/disease";

export async function getDiseases(): Promise<Disease[]> {
  const response = await axiosClient.get<Disease[]>("/api/diseases");

  return response.data;
}

export async function getDiseasesByStatus(
  status: DiseaseStatus,
): Promise<Disease[]> {
  const response = await axiosClient.get<Disease[]>("/api/diseases", {
    params: {
      status,
    },
  });

  return response.data;
}

export async function createDisease(
  payload: CreateDiseaseRequest,
): Promise<Disease> {
  const response = await axiosClient.post<Disease>("/api/diseases", payload);

  return response.data;
}

export async function updateDisease(
  id: string,
  payload: UpdateDiseaseRequest,
): Promise<Disease> {
  const response = await axiosClient.put<Disease>(
    `/api/diseases/${id}`,
    payload,
  );

  return response.data;
}

export async function deleteDisease(id: string): Promise<void> {
  await axiosClient.delete(`/api/diseases/${id}`);
}
