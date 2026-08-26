import type { DiseaseStatus } from "@/types/disease";

export const diseaseStatusLabels: Record<DiseaseStatus, string> = {
  ACTIVE: "Aktif",
  RESOLVED: "Çözüldü",
  CHRONIC: "Kronik",
};
