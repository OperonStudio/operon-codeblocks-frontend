import { DashboardEndpoints, getEndpoint } from "#/common/endpoints";
import { operonApiClient } from "#/libs/apiClient";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import type { Project } from "./interface";

const PROJECTS_ENDPOINT = getEndpoint(DashboardEndpoints.PROJECTS);

export const getProjectsOptions = queryOptions({
  queryKey: ["projects"],
  queryFn: async () => await operonApiClient.get<Project[]>(PROJECTS_ENDPOINT),
});

export const createProjectOptions = mutationOptions({
  mutationFn: async (project: Project) =>
    await operonApiClient.post<Project>(PROJECTS_ENDPOINT, project),
});

export const updateProjectOptions = mutationOptions({
  mutationFn: async ({ id, project }: { id: string; project: Partial<Project> }) =>
    await operonApiClient.patch<Project>(`${PROJECTS_ENDPOINT}/${id}`, project),
});

export const deleteProjectOptions = mutationOptions({
  mutationFn: async (id: string) =>
    await operonApiClient.delete(`${PROJECTS_ENDPOINT}/${id}`),
});
