import { DashboardLayout } from "#/modules/dashboard-layout";
import {
  Boxes,
  CheckCircle2,
  FileCode2,
  FileEdit,
  FlaskConical,
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
import { createFileRoute, Outlet } from "@tanstack/react-router";

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
        title: "EXPERIENCES",
        items: [
          { label: "Experiences", icon: Boxes, href: "/dashboard/experiences" },
          { label: "Schemas", icon: FileCode2, href: "/dashboard/schemas" },
          { label: "APIs", icon: Plug, href: "/dashboard/apis" },
        ],
      },
      {
        title: "RUNTIME",
        items: [
          { label: "Policies", icon: GitBranch, href: "/dashboard/policies" },
          { label: "Context", icon: Variable, href: "/dashboard/context" },
          {
            label: "Feature Flags",
            icon: ToggleLeft,
            href: "/dashboard/feature-flags",
          },
          {
            label: "Experiments",
            icon: FlaskConical,
            href: "/dashboard/experiments",
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
          { label: "Drlafts", icon: FileEdit, href: "/dashboard/drafts" },
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
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
