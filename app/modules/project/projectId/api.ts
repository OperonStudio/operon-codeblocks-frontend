import { DashboardEndpoints, getEndpoint } from "#/common/endpoints";
import { operonApiClient } from "#/libs/apiClient";
import { queryOptions } from "@tanstack/react-query";

export interface Collection {
  _id?: string;
  project_id: string;
  name: string;
  meta_data: any;
}

export interface CreateCollectionDTO {
  id: string;
  name: string;
  meta_data: any;
}

export const getCollectionsOptions = (projectId: string) =>
  queryOptions({
    queryKey: ["projects", projectId, "collections"],
    queryFn: async () =>
      await operonApiClient.get<Collection[]>(
        getEndpoint(DashboardEndpoints.PROJECTS) + `/${projectId}/collections`,
      ),
  });

export const getCollectionOptions = (projectId: string, collectionId: string) =>
  queryOptions({
    queryKey: ["projects", projectId, "collections", collectionId],
    queryFn: async () =>
      await operonApiClient.get<Collection>(
        getEndpoint(DashboardEndpoints.PROJECTS) +
          `/${projectId}/collections/${collectionId}`,
      ),
  });

export const createCollectionOptions = (projectId: string) => ({
  mutationFn: async (dto: CreateCollectionDTO) =>
    await operonApiClient.post<Collection>(
      getEndpoint(DashboardEndpoints.PROJECTS) + `/${projectId}/collections`,
      dto,
    ),
});

export const updateCollectionOptions = (
  projectId: string,
  collectionId: string,
) => ({
  mutationFn: async (schema: any) =>
    await operonApiClient.patch<Collection>(
      getEndpoint(DashboardEndpoints.PROJECTS) +
        `/${projectId}/collections/${collectionId}`,
      schema,
    ),
});
