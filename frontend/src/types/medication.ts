export type MedicationStatus =
  | "ACTIVE"
  | "COMPLETED"
  | "DISCONTINUED"
  | "PAUSED";

export type MedicationRoute =
  | "ORAL"
  | "TOPICAL"
  | "INJECTION"
  | "INHALATION"
  | "SUBLINGUAL"
  | "OTHER";

export type Medication = {
  id: string;

  diseaseId: string | null;
  diseaseName: string | null;

  name: string;
  dosage: string | null;
  frequency: string | null;
  route: MedicationRoute | null;

  startDate: string | null;
  endDate: string | null;

  status: MedicationStatus;

  prescribedBy: string | null;
  notes: string | null;

  createdAt: string;
  updatedAt: string;
};

export type MedicationFilters = {
  diseaseId?: string;
  status?: MedicationStatus;
  name?: string;
};

export type CreateMedicationRequest = {
  diseaseId: string | null;

  name: string;
  dosage: string | null;
  frequency: string | null;
  route: MedicationRoute | null;

  startDate: string | null;
  endDate: string | null;

  status: MedicationStatus | null;

  prescribedBy: string | null;
  notes: string | null;
};

export type UpdateMedicationRequest = {
  diseaseId: string | null;

  name: string;
  dosage: string | null;
  frequency: string | null;
  route: MedicationRoute | null;

  startDate: string | null;
  endDate: string | null;

  status: MedicationStatus;

  prescribedBy: string | null;
  notes: string | null;
};

export type MedicationFormOptions = {
  diseases: {
    id: string;
    name: string;
  }[];
};
