import { useHeaderActions } from "#/contexts/header-actions";
import { Box, Button } from "@operon/ui";
import { useLoaderData } from "@tanstack/react-router";
import { useState } from "react";
import { CreateProjectModal } from "./partials/create-project-modal";
import { ProjectCard } from "./partials/project-card";
import * as classes from "./style";

interface Project {
  name: string;
  description: string;
}

export const ProjectPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { projects } = useLoaderData({ from: "/projects/" }) as {
    projects: Project[];
  };

  useHeaderActions({
    create: () => {
      setIsModalOpen(true);
    },
  });

  const handleCreateProject = async ({ name, description }: Project) => {
    setIsModalOpen(false);
  };

  const handleOnClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box {...classes.projectGridStyle}>
        {projects.length === 0 ? (
          <Box {...classes.emptyStateStyle}>
            <Box {...classes.noProjectFoundStyle}>No projects found</Box>
            <Box>Click "Create Project" to get started.</Box>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(true)}
            >
              Create Project
            </Button>
          </Box>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.name}
              title={project.name}
              description={project.description}
              apiCount={0}
              environments={["development", "production"]}
            />
          ))
        )}
      </Box>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={handleOnClose}
        onCreate={handleCreateProject}
      />
    </>
  );
};
