import { axiosClient } from "@/api/axiosClient";

import type {
  CreateMedicalTestRequest,
  MedicalTest,
  MedicalTestFilters,
  UpdateMedicalTestRequest,
} from "@/types/medicalTest";

export async function getMedicalTests(
  filters?: MedicalTestFilters,
): Promise<MedicalTest[]> {
  const response = await axiosClient.get<MedicalTest[]>("/api/medical-tests", {
    params: filters,
  });

  return response.data;
}

export async function getMedicalTest(id: string): Promise<MedicalTest> {
  const response = await axiosClient.get<MedicalTest>(
    `/api/medical-tests/${id}`,
  );

  return response.data;
}

export async function createMedicalTest(
  payload: CreateMedicalTestRequest,
): Promise<MedicalTest> {
  const response = await axiosClient.post<MedicalTest>(
    "/api/medical-tests",
    payload,
  );

  return response.data;
}

export async function updateMedicalTest(
  id: string,
  payload: UpdateMedicalTestRequest,
): Promise<MedicalTest> {
  const response = await axiosClient.put<MedicalTest>(
    `/api/medical-tests/${id}`,
    payload,
  );

  return response.data;
}

export async function deleteMedicalTest(id: string): Promise<void> {
  await axiosClient.delete(`/api/medical-tests/${id}`);
}
