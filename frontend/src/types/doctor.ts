export type Doctor = {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string | null;
  phone: string | null;
  email: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateDoctorRequest = {
  firstName: string;
  lastName: string;
  specialization: string | null;
  phone: string | null;
  email: string | null;
  notes: string | null;
};

export type UpdateDoctorRequest = {
  firstName: string;
  lastName: string;
  specialization: string | null;
  phone: string | null;
  email: string | null;
  notes: string | null;
};
