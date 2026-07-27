import { operonApiClient } from "#/libs/apiClient";
import { queryOptions } from "@tanstack/react-query";

export type ContextVariable = {
  id: string;
  name: string;
  type: string;
};

export const getContextsOptions = queryOptions({
  queryKey: ["contexts"],
  queryFn: async () => {
    const res = await operonApiClient.get<ContextVariable[]>("/api/contexts");
    return res;
  },
});

export const createContextOptions = {
  mutationFn: async (data: { name: string; type: string }) => {
    return operonApiClient.post<ContextVariable>("/api/contexts", data);
  },
};

export const updateContextOptions = {
  mutationFn: async (data: { id: string; name: string; type: string }) => {
    return operonApiClient.put<ContextVariable>(`/api/contexts/${data.id}`, {
      name: data.name,
      type: data.type,
    });
  },
};

export const deleteContextOptions = {
  mutationFn: async (id: string) => {
    return operonApiClient.delete(`/api/contexts/${id}`);
  },
};
