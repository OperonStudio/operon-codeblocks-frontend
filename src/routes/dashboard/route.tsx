import { Dashboard } from "#/modules/dashboard";
import {
  CheckCircle2,
  FileEdit,
  FolderKanban,
  GitBranch,
  KeyRound,
  Layers,
  LayoutDashboard,
  Plug,
  Rocket,
  ScrollText,
  ShieldCheck,
  ToggleLeft,
  Undo2,
  Variable,
} from "@operon/icons";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  staticData: {
    sidebarGroups: [
      {
        title: "WORKSPACE",
        items: [
          { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
          {
            label: "Projects",
            icon: FolderKanban,
            href: "/dashboard/projects",
          },
        ],
      },
      {
        title: "APIs",
        items: [{ label: "APIs", icon: Plug, href: "/dashboard/apis" }],
      },
      {
        title: "RUNTIME",
        items: [
          {
            label: "Rule Engine",
            icon: GitBranch,
            href: "/dashboard/rule-engine",
          },
          { label: "Context", icon: Variable, href: "/dashboard/context" },
          {
            label: "Feature Flags",
            icon: ToggleLeft,
            href: "/dashboard/feature-flags",
          },
        ],
      },
      {
        title: "DELIVERY",
        items: [
          {
            label: "Environments",
            icon: Layers,
            href: "/dashboard/environments",
          },
          { label: "Drafts", icon: FileEdit, href: "/dashboard/drafts" },
          {
            label: "Approvals",
            icon: CheckCircle2,
            href: "/dashboard/approvals",
          },
          { label: "Publishes", icon: Rocket, href: "/dashboard/publishes" },
          { label: "Restores", icon: Undo2, href: "/dashboard/restores" },
        ],
      },
      {
        title: "GOVERNANCE",
        items: [
          {
            label: "Audit Logs",
            icon: ScrollText,
            href: "/dashboard/audit-logs",
          },
          {
            label: "Access Control",
            icon: ShieldCheck,
            href: "/dashboard/access-control",
          },
          { label: "API Keys", icon: KeyRound, href: "/dashboard/api-keys" },
        ],
      },
    ],
  },
  component: Dashboard,
});
