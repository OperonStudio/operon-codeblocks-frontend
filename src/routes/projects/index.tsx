import { ProjectPage } from "#/modules/project";
import { getProjectsOptions } from "#/modules/project/api";
import { Plus } from "@operon/icons";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/")({
  component: ProjectPage,
  loader: async ({ context }) => {
    const projects =
      await context.queryClient.ensureQueryData(getProjectsOptions);
    console.log({ projects });
    return {
      projects,
    };
  },
  staticData: {
    pageHeaderData: {
      title: "Projects",
      subtitle: "Manage all projects",
      actions: [
        {
          id: "create",
          label: "Create Project",
          icon: Plus,
          variant: "primary",
        },
      ],
    },
  },
});
