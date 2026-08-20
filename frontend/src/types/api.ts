export type ApiValidationErrors = Record<string, string>;

export type ApiErrorResponse = {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  validationErrors: ApiValidationErrors | null;
};
