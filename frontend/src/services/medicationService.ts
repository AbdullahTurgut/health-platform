import { axiosClient } from "@/api/axiosClient";

import type {
  CreateMedicationRequest,
  Medication,
  MedicationFilters,
  UpdateMedicationRequest,
} from "@/types/medication";

export async function getMedications(
  filters?: MedicationFilters,
): Promise<Medication[]> {
  const response = await axiosClient.get<Medication[]>("/api/medications", {
    params: filters,
  });

  return response.data;
}

export async function getMedicationById(id: string): Promise<Medication> {
  const response = await axiosClient.get<Medication>(`/api/medications/${id}`);

  return response.data;
}

export async function createMedication(
  payload: CreateMedicationRequest,
): Promise<Medication> {
  const response = await axiosClient.post<Medication>(
    "/api/medications",
    payload,
  );

  return response.data;
}

export async function updateMedication(
  id: string,
  payload: UpdateMedicationRequest,
): Promise<Medication> {
  const response = await axiosClient.put<Medication>(
    `/api/medications/${id}`,
    payload,
  );

  return response.data;
}

export async function deleteMedication(id: string): Promise<void> {
  await axiosClient.delete(`/api/medications/${id}`);
}
