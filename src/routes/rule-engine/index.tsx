import { Box, Button } from "@operon/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/rule-engine/")({
  component: RuleEngineIndex,
  staticData: {
    pageHeaderData: {
      title: "Rule Engine",
      subtitle: "Select a project to manage rules",
    },
  },
});

function RuleEngineIndex() {
  return (
    <Box
      display="flex"
      direction="column"
      align="center"
      justify="center"
      style={{
        height: "100%",
        padding: "48px",
        color: "var(--operon-color-text-muted)",
      }}
    >
      <Box style={{ marginBottom: "16px" }}>
        Select a project from the sidebar to view its rule engine
        configurations.
      </Box>
      <Button variant="primary">Create Project</Button>
    </Box>
  );
}
