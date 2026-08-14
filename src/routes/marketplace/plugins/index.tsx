import { PluginsPage } from "#/modules/marketplace/plugins";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/marketplace/plugins/")({
  component: PluginsPage,
  staticData: {
    pageHeaderData: {
      title: "Plugins",
      subtitle: "Discover and install plugins to extend your workspace functionality.",
    },
    search: {
      isSearchable: true,
      searchBarPlaceholder: "Search Plugins...",
    },
  },
});
