import { ProjectIdPage } from "#/modules/project/projectId";
import { Plus } from "@operon/icons";
import { createFileRoute } from "@tanstack/react-router";

import { operonApiClient } from "#/libs/apiClient";

export const Route = createFileRoute("/projects/$projectId/")({
  component: ProjectIdPage,
  staticData: {
    pageHeaderData: {
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
  loader: async ({ params }) => {
    try {
      const project = await operonApiClient.get<any>(
        `/api/projects/${params.projectId}`,
      );
      return {
        pageHeaderData: {
          title: project?.name || "Project Details",
        },
      };
    } catch (e) {
      return {
        pageHeaderData: {
          title: "Project (Not Found)",
        },
      };
    }
  },
});
