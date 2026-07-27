import { getProjectsOptions } from "#/modules/project/api";
import { getCollectionsOptions } from "#/modules/project/projectId/api";
import { ChevronDown, ChevronRight } from "@operon/icons";
import { Box } from "@operon/ui";
import { useQuery } from "@tanstack/react-query";
import { Link, Outlet, useParams } from "@tanstack/react-router";
import { useState } from "react";
import * as classes from "./style";

const ProjectSidebarItem = ({
  project,
  activeProjectId,
  activeCollectionId,
}: {
  project: any;
  activeProjectId: string;
  activeCollectionId?: string;
}) => {
  const id = project.id || project.name;
  const isProjectActive = activeProjectId === id && !activeCollectionId;
  const [isExpanded, setIsExpanded] = useState(activeProjectId === id);

  const { data: collections, isLoading } = useQuery({
    ...getCollectionsOptions(id),
    enabled: isExpanded,
  });

  return (
    <Box>
      <Box display="flex" align="center">
        <Box
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            cursor: "pointer",
            padding: "8px 4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {isExpanded ? (
            <ChevronDown size={14} color="var(--operon-color-text-muted)" />
          ) : (
            <ChevronRight size={14} color="var(--operon-color-text-muted)" />
          )}
        </Box>
        <Link
          to="/rule-engine/$projectId"
          params={{ projectId: id }}
          style={{ textDecoration: "none", flex: 1 }}
        >
          <Box
            {...classes.listItemStyle}
            style={{
              backgroundColor: isProjectActive
                ? "var(--operon-color-surface-raised, #f0f0f0)"
                : undefined,
              color: isProjectActive ? "var(--operon-color-primary)" : undefined,
              fontWeight: isProjectActive ? "500" : "normal",
            }}
          >
            {project.name}
          </Box>
        </Link>
      </Box>

      {isExpanded && (
        <Box style={{ paddingLeft: "24px" }}>
          {isLoading && (
            <Box
              style={{
                padding: "4px 8px",
                fontSize: "12px",
                color: "var(--operon-color-text-muted)",
              }}
            >
              Loading...
            </Box>
          )}
          {collections?.map((col: any) => {
            const isColActive = activeCollectionId === col._id;
            return (
              <Link
                key={col._id}
                to="/rule-engine/$projectId/$collectionId"
                params={{ projectId: id, collectionId: col._id }}
                style={{ textDecoration: "none" }}
              >
                <Box
                  {...classes.listItemStyle}
                  style={{
                    backgroundColor: isColActive
                      ? "var(--operon-color-surface-raised, #f0f0f0)"
                      : undefined,
                    color: isColActive
                      ? "var(--operon-color-primary)"
                      : undefined,
                    fontWeight: isColActive ? "500" : "normal",
                    fontSize: "13px",
                  }}
                >
                  {col.name}
                </Box>
              </Link>
            );
          })}
          {collections?.length === 0 && !isLoading && (
            <Box
              style={{
                padding: "4px 8px",
                fontSize: "12px",
                color: "var(--operon-color-text-muted)",
              }}
            >
              No collections
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export const RuleEngineLayout = () => {
  const { data: projects, isLoading } = useQuery(getProjectsOptions);
  const { projectId, collectionId } = useParams({ strict: false }) as any;

  return (
    <Box {...classes.pageContainerStyle}>
      <Box {...classes.sidebarStyle}>
        <Box
          display="flex"
          align="center"
          justify="space-between"
          style={{ marginBottom: "16px", padding: "0 8px" }}
        >
          <Box {...classes.sidebarTitleStyle}>Projects & Collections</Box>
        </Box>

        <Box {...classes.listStyle}>
          {isLoading && <Box style={{ padding: "0 8px" }}>Loading...</Box>}
          {projects?.map((project) => (
            <ProjectSidebarItem
              key={project.id || project.name}
              project={project}
              activeProjectId={projectId}
              activeCollectionId={collectionId}
            />
          ))}
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
