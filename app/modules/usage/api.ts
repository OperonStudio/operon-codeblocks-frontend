import { operonApiClient } from "#/libs/apiClient";
import { queryOptions } from "@tanstack/react-query";
import type { Usage } from "./types";

export const getUsageOptions = (workspaceId: string) =>
  queryOptions({
    queryKey: ["usage", workspaceId],
    queryFn: async () => {
      // Current API endpoints structure likely requires the workspaceId manually
      // Assuming GET /api/workspaces/:workspaceId/usage as per the backend route
      return await operonApiClient.get<Usage>(
        `/api/workspaces/${workspaceId}/usage`,
      );
    },
    enabled: !!workspaceId,
  });
