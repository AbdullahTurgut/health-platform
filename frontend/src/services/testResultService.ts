import { axiosClient } from "@/api/axiosClient";

import type {
  CreateTestResultRequest,
  TestResult,
  UpdateTestResultRequest,
} from "@/types/testResult";

export async function getTestResults(
  medicalTestId: string,
): Promise<TestResult[]> {
  const response = await axiosClient.get<TestResult[]>(
    `/api/medical-tests/${medicalTestId}/results`,
  );

  return response.data;
}

export async function createTestResult(
  medicalTestId: string,
  payload: CreateTestResultRequest,
): Promise<TestResult> {
  const response = await axiosClient.post<TestResult>(
    `/api/medical-tests/${medicalTestId}/results`,
    payload,
  );

  return response.data;
}

export async function getTestResult(id: string): Promise<TestResult> {
  const response = await axiosClient.get<TestResult>(`/api/test-results/${id}`);

  return response.data;
}

export async function updateTestResult(
  id: string,
  payload: UpdateTestResultRequest,
): Promise<TestResult> {
  const response = await axiosClient.put<TestResult>(
    `/api/test-results/${id}`,
    payload,
  );

  return response.data;
}

export async function deleteTestResult(id: string): Promise<void> {
  await axiosClient.delete(`/api/test-results/${id}`);
}

export async function getTestResultHistory(
  parameterName: string,
): Promise<TestResult[]> {
  const response = await axiosClient.get<TestResult[]>(
    "/api/test-results/history",
    {
      params: {
        parameterName,
      },
    },
  );

  return response.data;
}
