import { axiosClient } from "@/api/axiosClient";

import type {
  MedicalDocument,
  MedicalDocumentFilters,
  UploadMedicalDocumentRequest,
} from "@/types/medicalDocument";

export async function getMedicalDocuments(
  filters?: MedicalDocumentFilters,
): Promise<MedicalDocument[]> {
  const response = await axiosClient.get<MedicalDocument[]>("/api/documents", {
    params: filters,
  });

  return response.data;
}

export async function getMedicalDocumentById(
  id: string,
): Promise<MedicalDocument> {
  const response = await axiosClient.get<MedicalDocument>(
    `/api/documents/${id}`,
  );

  return response.data;
}

export async function uploadMedicalDocument(
  payload: UploadMedicalDocumentRequest,
): Promise<MedicalDocument> {
  const formData = new FormData();

  formData.append("file", payload.file);

  formData.append("name", payload.name.trim());

  formData.append("documentType", payload.documentType);

  if (payload.diseaseId) {
    formData.append("diseaseId", payload.diseaseId);
  }

  if (payload.visitId) {
    formData.append("visitId", payload.visitId);
  }

  if (payload.medicalTestId) {
    formData.append("medicalTestId", payload.medicalTestId);
  }

  if (payload.imagingId) {
    formData.append("imagingId", payload.imagingId);
  }

  const response = await axiosClient.post<MedicalDocument>(
    "/api/documents",
    formData,
  );

  return response.data;
}

export async function downloadMedicalDocument(id: string): Promise<Blob> {
  const response = await axiosClient.get<Blob>(
    `/api/documents/${id}/download`,
    {
      responseType: "blob",
    },
  );

  return response.data;
}

export async function deleteMedicalDocument(id: string): Promise<void> {
  await axiosClient.delete(`/api/documents/${id}`);
}
