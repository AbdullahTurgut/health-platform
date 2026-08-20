import { axiosClient } from "@/api/axiosClient";

export async function getApiHealth() {
  const response = await axiosClient.get<string>("/api/health");

  return response.data;
}
