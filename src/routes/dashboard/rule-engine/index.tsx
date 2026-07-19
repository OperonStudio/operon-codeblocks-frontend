import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/rule-engine/")({
  component: RouteComponent,
  staticData: {
    pageHeaderData: {
      title: "Rule Engine",
      subtitle: "Runtime rule engine for behavior and targeting",
    },
  },
});

function RouteComponent() {
  return <div>Hello "/dashboard/rule-engine/"!</div>;
}
