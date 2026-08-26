import type { TestCategory } from "@/types/medicalTest";

export const medicalTestCategoryLabels: Record<TestCategory, string> = {
  BLOOD: "Kan",
  URINE: "İdrar",
  HORMONE: "Hormon",
  BIOCHEMISTRY: "Biyokimya",
  GENETIC: "Genetik",
  PATHOLOGY: "Patoloji",
  MICROBIOLOGY: "Mikrobiyoloji",
  OTHER: "Diğer",
};
