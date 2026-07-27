import { ApiKeysPage } from "#/modules/api-keys";
import { getApiKeysOptions } from "#/modules/api-keys/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api-keys/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(getApiKeysOptions),
  component: ApiKeysPage,
  staticData: {
    pageHeaderData: {
      title: "API Keys",
      subtitle:
        "Manage your API keys to authenticate external applications and scripts.",
    },
  },
});
