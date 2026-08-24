export type DocumentType =
  | "LAB_REPORT"
  | "IMAGING_REPORT"
  | "PRESCRIPTION"
  | "EPICRISIS"
  | "DOCTOR_NOTE"
  | "DISCHARGE_SUMMARY"
  | "PATHOLOGY_REPORT"
  | "OTHER";

export type MedicalDocument = {
  id: string;

  diseaseId: string | null;
  diseaseName: string | null;

  visitId: string | null;
  visitDate: string | null;

  medicalTestId: string | null;
  medicalTestName: string | null;

  imagingId: string | null;
  imagingType: string | null;

  name: string;
  documentType: DocumentType;

  fileName: string;
  mimeType: string;
  fileSize: number;

  uploadedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type MedicalDocumentFilters = {
  diseaseId?: string;
  visitId?: string;
  medicalTestId?: string;
  imagingId?: string;
  documentType?: DocumentType;
  name?: string;
};

export type UploadMedicalDocumentRequest = {
  file: File;

  name: string;
  documentType: DocumentType;

  diseaseId: string | null;
  visitId: string | null;
  medicalTestId: string | null;
  imagingId: string | null;
};

export type MedicalDocumentFormOptions = {
  diseases: {
    id: string;
    name: string;
  }[];

  visits: {
    id: string;
    label: string;
  }[];

  medicalTests: {
    id: string;
    name: string;
  }[];

  imaging: {
    id: string;
    label: string;
  }[];
};
