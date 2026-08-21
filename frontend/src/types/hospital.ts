export type Hospital = {
  id: string;
  name: string;
  city: string | null;
  address: string | null;
  phone: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateHospitalRequest = {
  name: string;
  city: string | null;
  address: string | null;
  phone: string | null;
  notes: string | null;
};

export type UpdateHospitalRequest = {
  name: string;
  city: string | null;
  address: string | null;
  phone: string | null;
  notes: string | null;
};
