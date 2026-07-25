import { operonApiClient } from "#/libs/apiClient";
import { Box } from "@operon/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/rule-engine/$projectId/")({
  component: RuleEngineProjectPage,
  loader: async ({ params }) => {
    try {
      const project = await operonApiClient.get<any>(
        `/api/projects/${params.projectId}`,
      );
      return {
        pageHeaderData: {
          title: `${project?.name || params.projectId} Rules`,
          subtitle: `Configure rules for the ${project?.name || params.projectId} project`,
        },
      };
    } catch (e) {
      return {
        pageHeaderData: {
          title: "Project (Not Found)",
          subtitle: "Cannot find the specified project.",
        },
      };
    }
  },
});

function RuleEngineProjectPage() {
  const { projectId } = Route.useParams();

  return (
    <Box
      display="flex"
      direction="column"
      style={{ padding: "48px", height: "100%", gap: "24px" }}
    >
      <Box
        style={{
          border: "1px dashed var(--operon-color-border)",
          borderRadius: "8px",
          padding: "24px",
          textAlign: "center",
          color: "var(--operon-color-text-muted)",
        }}
      >
        Rule builder interface for project <strong>{projectId}</strong> will go
        here.
      </Box>
    </Box>
  );
}
