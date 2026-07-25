import { ProjectIdPage } from "#/modules/project/projectId";
import { Plus } from "@operon/icons";
import { createFileRoute } from "@tanstack/react-router";

import { getProjectsOptions } from "#/modules/project/api";
import { getCollectionsOptions } from "#/modules/project/projectId/api";

export const Route = createFileRoute("/projects/$projectId/")({
  component: ProjectIdPage,
  staticData: {
    pageHeaderData: {
      title: "",
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
  loader: async ({ params, context }) => {
    try {
      context.queryClient.ensureQueryData(
        getCollectionsOptions(params.projectId),
      );

      // Instead of an extra API call, we can try to find the project from the list query cache
      const projects =
        await context.queryClient.ensureQueryData(getProjectsOptions);
      const project = projects.find(
        (p: any) => (p.id || p.name) === params.projectId,
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
