import type { DocumentType } from "@/types/medicalDocument";

export const documentTypes: DocumentType[] = [
  "LAB_REPORT",
  "IMAGING_REPORT",
  "PRESCRIPTION",
  "EPICRISIS",
  "DOCTOR_NOTE",
  "DISCHARGE_SUMMARY",
  "PATHOLOGY_REPORT",
  "OTHER",
];

export const documentTypeLabels: Record<DocumentType, string> = {
  LAB_REPORT: "Laboratuvar Raporu",
  IMAGING_REPORT: "Görüntüleme Raporu",
  PRESCRIPTION: "Reçete",
  EPICRISIS: "Epikriz",
  DOCTOR_NOTE: "Doktor Notu",
  DISCHARGE_SUMMARY: "Taburculuk Özeti",
  PATHOLOGY_REPORT: "Patoloji Raporu",
  OTHER: "Diğer",
};
