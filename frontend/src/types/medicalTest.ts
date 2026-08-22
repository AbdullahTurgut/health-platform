export type TestCategory =
  | "BLOOD"
  | "URINE"
  | "HORMONE"
  | "BIOCHEMISTRY"
  | "GENETIC"
  | "PATHOLOGY"
  | "MICROBIOLOGY"
  | "OTHER";

export type MedicalTest = {
  id: string;

  diseaseId: string | null;
  diseaseName: string | null;

  visitId: string | null;
  visitDate: string | null;

  name: string;
  category: TestCategory;
  testDate: string;
  laboratory: string | null;
  notes: string | null;

  createdAt: string;
  updatedAt: string;
};

export type CreateMedicalTestRequest = {
  diseaseId: string | null;
  visitId: string | null;

  name: string;
  category: TestCategory;
  testDate: string;

  laboratory: string | null;
  notes: string | null;
};

export type UpdateMedicalTestRequest = {
  diseaseId: string | null;
  visitId: string | null;

  name: string;
  category: TestCategory;
  testDate: string;

  laboratory: string | null;
  notes: string | null;
};

export type MedicalTestFilters = {
  diseaseId?: string;
  visitId?: string;
  category?: TestCategory;
};

export type MedicalTestFilterOptions = {
  diseases: {
    id: string;
    name: string;
  }[];

  visits: {
    id: string;
    label: string;
  }[];
};

export type MedicalTestFormOptions = {
  diseases: {
    id: string;
    name: string;
  }[];

  visits: {
    id: string;
    label: string;
  }[];
};
