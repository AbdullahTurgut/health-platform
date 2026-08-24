import type { ImagingType } from "@/types/imaging";

export const imagingTypes: ImagingType[] = [
  "MRI",
  "CT",
  "ULTRASOUND",
  "XRAY",
  "PET",
  "MAMMOGRAPHY",
  "OTHER",
];

export const imagingTypeLabels: Record<ImagingType, string> = {
  MRI: "MR",
  CT: "BT",
  ULTRASOUND: "Ultrason",
  XRAY: "Röntgen",
  PET: "PET",
  MAMMOGRAPHY: "Mamografi",
  OTHER: "Diğer",
};
