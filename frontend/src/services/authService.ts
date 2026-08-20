import { axiosClient } from "@/api/axiosClient";

import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth";

export async function login(payload: LoginRequest): Promise<AuthResponse> {
  const response = await axiosClient.post<AuthResponse>(
    "/api/auth/login",
    payload,
  );

  return response.data;
}

export async function register(payload: RegisterRequest): Promise<void> {
  await axiosClient.post("/api/auth/register", payload);
}
