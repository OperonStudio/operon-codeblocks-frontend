import { ProjectPage } from "#/modules/dashboard/project";
import { Plus } from "@operon/icons";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/projects/")({
  component: ProjectPage,
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
