import { RuleEngineLayout } from "#/modules/rule-engine";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/rule-engine")({
  component: RuleEngineLayout,
});
