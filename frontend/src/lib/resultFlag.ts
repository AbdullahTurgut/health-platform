import type { ResultFlag } from "@/types/testResult";

export const resultFlags: ResultFlag[] = [
  "NORMAL",
  "LOW",
  "HIGH",
  "CRITICAL",
  "ABNORMAL",
  "POSITIVE",
  "NEGATIVE",
  "UNKNOWN",
];

export const resultFlagLabels: Record<ResultFlag, string> = {
  NORMAL: "Normal",
  LOW: "Düşük",
  HIGH: "Yüksek",
  CRITICAL: "Kritik",
  ABNORMAL: "Anormal",
  POSITIVE: "Pozitif",
  NEGATIVE: "Negatif",
  UNKNOWN: "Bilinmiyor",
};

export type ResultFlagTone =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info";

export const resultFlagTones: Record<ResultFlag, ResultFlagTone> = {
  NORMAL: "success",

  LOW: "warning",
  HIGH: "warning",

  CRITICAL: "danger",
  ABNORMAL: "danger",

  POSITIVE: "info",
  NEGATIVE: "info",

  UNKNOWN: "neutral",
};
