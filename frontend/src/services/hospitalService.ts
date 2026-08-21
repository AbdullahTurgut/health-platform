import { axiosClient } from "@/api/axiosClient";

import type {
  CreateHospitalRequest,
  Hospital,
  UpdateHospitalRequest,
} from "@/types/hospital";

export async function getHospitals(): Promise<Hospital[]> {
  const response = await axiosClient.get<Hospital[]>("/api/hospitals");

  return response.data;
}

export async function getHospitalsByCity(city: string): Promise<Hospital[]> {
  const response = await axiosClient.get<Hospital[]>("/api/hospitals", {
    params: {
      city,
    },
  });

  return response.data;
}

export async function getHospital(id: string): Promise<Hospital> {
  const response = await axiosClient.get<Hospital>(`/api/hospitals/${id}`);

  return response.data;
}

export async function createHospital(
  payload: CreateHospitalRequest,
): Promise<Hospital> {
  const response = await axiosClient.post<Hospital>("/api/hospitals", payload);

  return response.data;
}

export async function updateHospital(
  id: string,
  payload: UpdateHospitalRequest,
): Promise<Hospital> {
  const response = await axiosClient.put<Hospital>(
    `/api/hospitals/${id}`,
    payload,
  );

  return response.data;
}

export async function deleteHospital(id: string): Promise<void> {
  await axiosClient.delete(`/api/hospitals/${id}`);
}
