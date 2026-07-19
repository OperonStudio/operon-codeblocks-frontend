import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/feature-flags/")({
  component: RouteComponent,
  staticData: {
    pageHeaderData: {
      title: "Feature Flags",
      subtitle: "Progressive delivery, targeting, and rollout control",
    },
  },
});

function RouteComponent() {
  return <div>Hello "/dashboard/feature-flags/"!</div>;
}
