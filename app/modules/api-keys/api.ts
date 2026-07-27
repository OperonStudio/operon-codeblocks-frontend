import { DashboardEndpoints, getEndpoint } from "#/common/endpoints";
import { operonApiClient } from "#/libs/apiClient";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

export interface ApiKey {
  id: string;
  name: string;
  environment: string;
  value: string;
  createdAt: string;
}

export interface ProjectWithKeys {
  id: string;
  name: string;
  keys: ApiKey[];
}

export interface RegenerateAPIKeyReq {
  environment: string;
}

const API_KEYS_ENDPOINT = getEndpoint(DashboardEndpoints.API_KEYS);

export const getApiKeysOptions = queryOptions({
  queryKey: ["api-keys"],
  queryFn: async () =>
    await operonApiClient.get<ProjectWithKeys[]>(API_KEYS_ENDPOINT),
});

export const regenerateApiKeyOptions = mutationOptions({
  mutationFn: async ({
    projectId,
    req,
  }: {
    projectId: string;
    req: RegenerateAPIKeyReq;
  }) =>
    await operonApiClient.post<ApiKey>(
      `${API_KEYS_ENDPOINT}/${projectId}`,
      req,
    ),
});
