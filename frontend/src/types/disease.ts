export type DiseaseStatus = "ACTIVE" | "RESOLVED" | "CHRONIC";

export type Disease = {
  id: string;
  name: string;
  diagnosisDate: string | null;
  status: DiseaseStatus;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateDiseaseRequest = {
  name: string;
  diagnosisDate: string | null;
  status: DiseaseStatus | null;
  description: string | null;
};

export type UpdateDiseaseRequest = {
  name: string;
  diagnosisDate: string | null;
  status: DiseaseStatus;
  description: string | null;
};
