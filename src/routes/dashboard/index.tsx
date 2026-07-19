import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
  staticData: {
    pageHeaderData: {
      title: "Dashboard",
      subtitle: "Welcome to the dashboard",
    },
    search: {
      isSearchable: true,
      searchBarPlaceholder: "Search In Dashboards...",
    },
  },
});

function RouteComponent() {
  return <div>Hello "/dash/"!</div>;
}
