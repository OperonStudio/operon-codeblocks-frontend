import { RootDocument } from "#/modules/root-document";
import "@morph-css/kit/css";
import {
  CheckCircle2,
  FileEdit,
  FolderKanban,
  GitBranch,
  KeyRound,
  Layers,
  LayoutDashboard,
  Rocket,
  ScrollText,
  ShieldCheck,
  ToggleLeft,
  Undo2,
  Variable,
} from "@operon/icons";
import operonMorphCss from "@operon/ui/dist/morphcss.css?url";
import operonCss from "@operon/ui/dist/style.css?url";
import { createRootRouteWithContext } from "@tanstack/react-router";

import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Operon Compose",
      },
    ],
    links: [
      {
        rel: "preload",
        as: "style",
        href: operonCss,
      },
      {
        rel: "preload",
        as: "style",
        href: operonMorphCss,
      },
      {
        rel: "stylesheet",
        href: operonCss,
      },
      {
        rel: "stylesheet",
        href: operonMorphCss,
      },
    ],
  }),
  staticData: {
    sidebarGroups: [
      {
        title: "WORKSPACE",
        items: [
          { label: "Dashboard", icon: LayoutDashboard, href: "/" },
          {
            label: "Projects",
            icon: FolderKanban,
            href: "/projects",
          },
        ],
      },
      {
        title: "RUNTIME",
        items: [
          {
            label: "Rule Engine",
            icon: GitBranch,
            href: "/rule-engine",
          },
          { label: "Context", icon: Variable, href: "/context" },
          {
            label: "Feature Flags",
            icon: ToggleLeft,
            href: "/feature-flags",
          },
        ],
      },
      {
        title: "DELIVERY",
        items: [
          {
            label: "Environments",
            icon: Layers,
            href: "/environments",
          },
          { label: "Drafts", icon: FileEdit, href: "/drafts" },
          {
            label: "Approvals",
            icon: CheckCircle2,
            href: "/approvals",
          },
          { label: "Publishes", icon: Rocket, href: "/publishes" },
          { label: "Restores", icon: Undo2, href: "/restores" },
        ],
      },
      {
        title: "GOVERNANCE",
        items: [
          {
            label: "Audit Logs",
            icon: ScrollText,
            href: "/audit-logs",
          },
          {
            label: "Access Control",
            icon: ShieldCheck,
            href: "/access-control",
          },
          { label: "API Keys", icon: KeyRound, href: "/api-keys" },
        ],
      },
    ],
  },
  shellComponent: RootDocument,
});
