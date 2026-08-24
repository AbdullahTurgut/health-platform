export type ImagingType =
  | "MRI"
  | "CT"
  | "ULTRASOUND"
  | "XRAY"
  | "PET"
  | "MAMMOGRAPHY"
  | "OTHER";

export type Imaging = {
  id: string;

  diseaseId: string | null;
  diseaseName: string | null;

  visitId: string | null;
  visitDate: string | null;

  doctorId: string | null;
  doctorName: string | null;

  hospitalId: string | null;
  hospitalName: string | null;

  type: ImagingType;
  bodyPart: string | null;
  imagingDate: string;
  report: string | null;
  notes: string | null;

  createdAt: string;
  updatedAt: string;
};

export type CreateImagingRequest = {
  diseaseId: string | null;
  visitId: string | null;
  doctorId: string | null;
  hospitalId: string | null;

  type: ImagingType;
  bodyPart: string | null;
  imagingDate: string;
  report: string | null;
  notes: string | null;
};

export type UpdateImagingRequest = CreateImagingRequest;

export type ImagingFilters = {
  diseaseId?: string;
  visitId?: string;
  doctorId?: string;
  hospitalId?: string;
  type?: ImagingType;
  bodyPart?: string;
};

export type ImagingFilterOptions = {
  diseases: {
    id: string;
    name: string;
  }[];

  visits: {
    id: string;
    label: string;
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

export type ImagingFormOptions = {
  diseases: {
    id: string;
    name: string;
  }[];

  visits: {
    id: string;
    label: string;
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
