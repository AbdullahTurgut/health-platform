import type { TestCategory } from "@/types/medicalTest";

export const testCategoryLabels: Record<TestCategory, string> = {
  BLOOD: "Kan",
  URINE: "İdrar",
  HORMONE: "Hormon",
  BIOCHEMISTRY: "Biyokimya",
  GENETIC: "Genetik",
  PATHOLOGY: "Patoloji",
  MICROBIOLOGY: "Mikrobiyoloji",
  OTHER: "Diğer",
};

export const testCategories: TestCategory[] = [
  "BLOOD",
  "URINE",
  "HORMONE",
  "BIOCHEMISTRY",
  "GENETIC",
  "PATHOLOGY",
  "MICROBIOLOGY",
  "OTHER",
];
