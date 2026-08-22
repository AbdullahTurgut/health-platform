export type ResultFlag =
  | "NORMAL"
  | "LOW"
  | "HIGH"
  | "CRITICAL"
  | "ABNORMAL"
  | "POSITIVE"
  | "NEGATIVE"
  | "UNKNOWN";

export type TestResult = {
  id: string;

  medicalTestId: string;
  medicalTestName: string;
  testDate: string;

  parameterName: string;
  valueText: string;
  numericValue: number | null;
  unit: string | null;
  referenceRange: string | null;
  flag: ResultFlag | null;
  notes: string | null;

  createdAt: string;
  updatedAt: string;
};

export type CreateTestResultRequest = {
  parameterName: string;
  valueText: string;
  numericValue: number | null;
  unit: string | null;
  referenceRange: string | null;
  flag: ResultFlag | null;
  notes: string | null;
};

export type UpdateTestResultRequest = {
  parameterName: string;
  valueText: string;
  numericValue: number | null;
  unit: string | null;
  referenceRange: string | null;
  flag: ResultFlag | null;
  notes: string | null;
};
