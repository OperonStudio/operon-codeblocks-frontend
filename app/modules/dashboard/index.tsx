import { PageHeader } from "#/components/page-header";
import { HeaderActionProvider } from "#/contexts/header-actions";
import { Outlet } from "@tanstack/react-router";
import { DashboardLayout } from "./dashboard-layout";
import * as classes from "./style";

export const Dashboard = ({ children }: { children?: React.ReactNode }) => {
  return (
    <HeaderActionProvider>
      <DashboardLayout>
        <PageHeader />
        <main
          className={classes.dashboardStyle.className}
          style={classes.dashboardStyle.style}
        >
          {children || <Outlet />}
        </main>
      </DashboardLayout>
    </HeaderActionProvider>
  );
};
