import { axiosClient } from "@/api/axiosClient";

import type {
  CreateImagingRequest,
  Imaging,
  ImagingFilters,
  UpdateImagingRequest,
} from "@/types/imaging";

export async function getImagingRecords(
  filters?: ImagingFilters,
): Promise<Imaging[]> {
  const response = await axiosClient.get<Imaging[]>("/api/imaging", {
    params: filters,
  });

  return response.data;
}

export async function getImagingById(id: string): Promise<Imaging> {
  const response = await axiosClient.get<Imaging>(`/api/imaging/${id}`);

  return response.data;
}

export async function createImaging(
  payload: CreateImagingRequest,
): Promise<Imaging> {
  const response = await axiosClient.post<Imaging>("/api/imaging", payload);

  return response.data;
}

export async function updateImaging(
  id: string,
  payload: UpdateImagingRequest,
): Promise<Imaging> {
  const response = await axiosClient.put<Imaging>(
    `/api/imaging/${id}`,
    payload,
  );

  return response.data;
}

export async function deleteImaging(id: string): Promise<void> {
  await axiosClient.delete(`/api/imaging/${id}`);
}
