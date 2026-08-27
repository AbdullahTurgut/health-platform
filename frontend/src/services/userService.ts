import { axiosClient } from "@/api/axiosClient";

import type { ProfileUser, UpdateProfileRequest } from "@/types/user";

export async function getCurrentUserProfile(): Promise<ProfileUser> {
  const response = await axiosClient.get<ProfileUser>("/api/users/me");

  return response.data;
}

export async function updateCurrentUserProfile(
  payload: UpdateProfileRequest,
): Promise<ProfileUser> {
  const response = await axiosClient.put<ProfileUser>("/api/users/me", payload);

  return response.data;
}
