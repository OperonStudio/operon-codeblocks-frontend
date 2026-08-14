import { UsagePage } from "#/modules/usage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: UsagePage,
  staticData: {
    pageHeaderData: {
      title: "Dashboard",
      subtitle:
        "Welcome to the dashboard. Monitor your workspace usage and billing.",
    },
    search: {
      isSearchable: true,
      searchBarPlaceholder: "Search In Dashboards...",
    },
  },
});
