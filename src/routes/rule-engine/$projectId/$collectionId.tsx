import { operonApiClient } from "#/libs/apiClient";
import { createFileRoute } from "@tanstack/react-router";

import { RuleEngineCollectionPage } from "#/modules/rule-engine/collection";

export const Route = createFileRoute("/rule-engine/$projectId/$collectionId")({
  component: () => {
    const { projectId, collectionId } = Route.useParams();
    return (
      <RuleEngineCollectionPage
        projectId={projectId}
        collectionId={collectionId}
      />
    );
  },
  loader: async ({ params }) => {
    try {
      const collection = await operonApiClient.get<any>(
        `/api/projects/${params.projectId}/collections/${params.collectionId}`,
      );
      return {
        pageHeaderData: {
          title: `${collection?.name || params.collectionId} Rules`,
          subtitle: `Configure rules for the ${collection?.name || params.collectionId} collection`,
        },
      };
    } catch (e) {
      return {
        pageHeaderData: {
          title: "Collection (Not Found)",
          subtitle: "Cannot find the specified collection.",
        },
      };
    }
  },
});
