import { getProjectsOptions } from "#/modules/project/api";
import { Box } from "@operon/ui";
import { useQuery } from "@tanstack/react-query";
import { Link, Outlet, useParams } from "@tanstack/react-router";
import * as classes from "./style";

export const RuleEngineLayout = () => {
  const { data: projects, isLoading } = useQuery(getProjectsOptions);
  const { projectId } = useParams({ strict: false }) as any;

  return (
    <Box {...classes.pageContainerStyle}>
      <Box {...classes.sidebarStyle}>
        <Box
          display="flex"
          align="center"
          justify="space-between"
          style={{ marginBottom: "16px", padding: "0 8px" }}
        >
          <Box {...classes.sidebarTitleStyle}>Projects</Box>
        </Box>

        <Box {...classes.listStyle}>
          {isLoading && <Box style={{ padding: "0 8px" }}>Loading...</Box>}
          {projects?.map((project) => {
            const id = project.id || project.name;
            const isActive = projectId === id;
            return (
              <Link
                key={id}
                to="/rule-engine/$projectId"
                params={{ projectId: id }}
                style={{ textDecoration: "none" }}
              >
                <Box
                  {...classes.listItemStyle}
                  style={{
                    backgroundColor: isActive
                      ? "var(--operon-color-primary-subtle)"
                      : undefined,
                    color: isActive ? "var(--operon-color-primary)" : undefined,
                  }}
                >
                  <Box display="flex" align="center" gap={8}>
                    {project.name}
                  </Box>
                </Box>
              </Link>
            );
          })}
          {projects?.length === 0 && !isLoading && (
            <Box
              style={{
                padding: "0 8px",
                color: "var(--operon-color-text-muted)",
              }}
            >
              No projects found.
            </Box>
          )}
        </Box>
      </Box>

      <Box {...classes.contentAreaStyle} style={{ padding: 0 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
