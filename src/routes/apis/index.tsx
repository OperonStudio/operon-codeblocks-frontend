import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/apis/")({
  component: RouteComponent,
  staticData: {
    pageHeaderData: {
      title: "APIs",
      subtitle: "Auto-generated REST, GraphQL, and SDK endpoints",
    },
  },
});

function RouteComponent() {
  return <div>Hello "/dashboard/apis/"!</div>;
}
