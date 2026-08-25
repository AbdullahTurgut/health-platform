import type { MedicationRoute, MedicationStatus } from "@/types/medication";

export const medicationStatuses: MedicationStatus[] = [
  "ACTIVE",
  "COMPLETED",
  "DISCONTINUED",
  "PAUSED",
];

export const medicationStatusLabels: Record<MedicationStatus, string> = {
  ACTIVE: "Aktif",
  COMPLETED: "Tamamlandı",
  DISCONTINUED: "Bırakıldı",
  PAUSED: "Ara Verildi",
};

export const medicationRoutes: MedicationRoute[] = [
  "ORAL",
  "TOPICAL",
  "INJECTION",
  "INHALATION",
  "SUBLINGUAL",
  "OTHER",
];

export const medicationRouteLabels: Record<MedicationRoute, string> = {
  ORAL: "Ağızdan",
  TOPICAL: "Topikal",
  INJECTION: "Enjeksiyon",
  INHALATION: "İnhalasyon",
  SUBLINGUAL: "Dil Altı",
  OTHER: "Diğer",
};
