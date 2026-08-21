import { axiosClient } from "@/api/axiosClient";

import type {
  CreateDoctorRequest,
  Doctor,
  UpdateDoctorRequest,
} from "@/types/doctor";

export async function getDoctors(): Promise<Doctor[]> {
  const response = await axiosClient.get<Doctor[]>("/api/doctors");

  return response.data;
}

export async function getDoctorsBySpecialization(
  specialization: string,
): Promise<Doctor[]> {
  const response = await axiosClient.get<Doctor[]>("/api/doctors", {
    params: {
      specialization,
    },
  });

  return response.data;
}

export async function getDoctor(id: string): Promise<Doctor> {
  const response = await axiosClient.get<Doctor>(`/api/doctors/${id}`);

  return response.data;
}

export async function createDoctor(
  payload: CreateDoctorRequest,
): Promise<Doctor> {
  const response = await axiosClient.post<Doctor>("/api/doctors", payload);

  return response.data;
}

export async function updateDoctor(
  id: string,
  payload: UpdateDoctorRequest,
): Promise<Doctor> {
  const response = await axiosClient.put<Doctor>(`/api/doctors/${id}`, payload);

  return response.data;
}

export async function deleteDoctor(id: string): Promise<void> {
  await axiosClient.delete(`/api/doctors/${id}`);
}
