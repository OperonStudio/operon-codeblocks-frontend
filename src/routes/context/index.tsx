import { ContextPage } from "#/modules/context-module";
import { Plus } from "@operon/icons";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/context/")({
  component: ContextPage,
  staticData: {
    pageHeaderData: {
      title: "Context",
      subtitle: "Runtime variables available to apis",
      actions: [
        {
          id: "add-context-button",
          label: "Add Context",
          icon: Plus,
          variant: "primary",
        },
      ],
    },
    search: {
      isSearchable: true,
      searchBarPlaceholder: "Search In Context...",
    },
  },
});
