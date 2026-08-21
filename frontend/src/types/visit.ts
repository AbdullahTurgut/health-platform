export type Visit = {
  id: string;

  diseaseId: string | null;
  diseaseName: string | null;

  doctorId: string | null;
  doctorName: string | null;

  hospitalId: string | null;
  hospitalName: string | null;

  visitDate: string;

  department: string | null;
  reason: string | null;
  diagnosisNote: string | null;
  notes: string | null;

  createdAt: string;
  updatedAt: string;
};

export type CreateVisitRequest = {
  diseaseId: string | null;
  doctorId: string | null;
  hospitalId: string | null;

  visitDate: string;

  department: string | null;
  reason: string | null;
  diagnosisNote: string | null;
  notes: string | null;
};

export type UpdateVisitRequest = {
  diseaseId: string | null;
  doctorId: string | null;
  hospitalId: string | null;

  visitDate: string;

  department: string | null;
  reason: string | null;
  diagnosisNote: string | null;
  notes: string | null;
};

export type VisitFilters = {
  diseaseId?: string;
  doctorId?: string;
  hospitalId?: string;
};

export type VisitFormOptions = {
  diseases: {
    id: string;
    name: string;
  }[];

  doctors: {
    id: string;
    name: string;
  }[];

  hospitals: {
    id: string;
    name: string;
  }[];
};
