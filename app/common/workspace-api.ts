import { DashboardEndpoints, getEndpoint } from "#/common/endpoints";
import { operonApiClient } from "#/libs/apiClient";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

export interface Workspace {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWorkspaceReq {
  name: string;
}

export interface UpdateWorkspaceReq {
  name?: string;
}

const WORKSPACES_ENDPOINT = getEndpoint(DashboardEndpoints.WORKSPACES);

export const getWorkspacesOptions = queryOptions({
  queryKey: ["workspaces"],
  queryFn: async () => await operonApiClient.get<Workspace[]>(WORKSPACES_ENDPOINT),
});

export const createWorkspaceOptions = mutationOptions({
  mutationFn: async (req: CreateWorkspaceReq) =>
    await operonApiClient.post<Workspace>(WORKSPACES_ENDPOINT, req),
});

export const updateWorkspaceOptions = mutationOptions({
  mutationFn: async ({ id, req }: { id: string; req: UpdateWorkspaceReq }) =>
    await operonApiClient.patch<Workspace>(`${WORKSPACES_ENDPOINT}/${id}`, req),
});

export const deleteWorkspaceOptions = mutationOptions({
  mutationFn: async (id: string) =>
    await operonApiClient.delete(`${WORKSPACES_ENDPOINT}/${id}`),
});
