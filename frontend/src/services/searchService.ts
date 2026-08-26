import { axiosClient } from "@/api/axiosClient";

import type {
  SearchPageResponse,
  SearchQuery,
} from "@/types/search";

export async function searchGlobal(
  query: SearchQuery,
): Promise<SearchPageResponse> {
  const response =
    await axiosClient.get<SearchPageResponse>(
      "/api/search",
      {
        params: query,
      },
    );

  return response.data;
}