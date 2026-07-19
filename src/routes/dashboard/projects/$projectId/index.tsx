import { ProjectIdPage } from "#/modules/dashboard/project/projectId";
import { Plus } from "@operon/icons";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/projects/$projectId/")({
  component: ProjectIdPage,
  staticData: {
    pageHeaderData: {
      title: "Project Name (have to fix this)",
      subtitle: "Add your Collections Here",
      actions: [
        {
          id: "add-new-collection",
          label: "Add New Collection",
          icon: Plus,
          variant: "primary",
        },
      ],
    },
  },
});
