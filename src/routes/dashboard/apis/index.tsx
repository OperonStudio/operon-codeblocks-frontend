import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/apis/")({
  component: RouteComponent,
  staticData: {
    pageHeaderData: {
      title: "APIs",
      subtitle: "Manage your APIs",
    },
  },
});

function RouteComponent() {
  return <div>Hello "/dashboard/apis/"!</div>;
}
