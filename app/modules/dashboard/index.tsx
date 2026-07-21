import { PageHeader } from "#/components/page-header";
import { HeaderActionProvider } from "#/contexts/header-actions";
import { Box } from "@operon/ui";
import { Outlet } from "@tanstack/react-router";
import { DashboardLayout } from "./dashboard-layout";
import * as classes from "./style";

export const Dashboard = () => {
  return (
    <HeaderActionProvider>
      <DashboardLayout>
        <PageHeader />
        <main
          className={classes.dashboardStyle.className}
          style={classes.dashboardStyle.style}
        >
          <Outlet />
        </main>
      </DashboardLayout>
    </HeaderActionProvider>
  );
};
