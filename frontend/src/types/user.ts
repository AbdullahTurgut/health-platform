export type ProfileUser = {
  id: string;

  firstName: string;
  lastName: string;
  email: string;

  dateOfBirth: string | null;

  enabled: boolean;

  createdAt: string;
  updatedAt: string;
};

export type UpdateProfileRequest = {
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
};

export type ProfileFormValues = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};
