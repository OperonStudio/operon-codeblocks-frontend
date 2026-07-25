import { useHeaderActions } from "#/contexts/header-actions";
import { Box, Button } from "@operon/ui";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import { createProjectOptions, getProjectsOptions } from "./api";
import { CreateProjectModal } from "./partials/create-project-modal";
import { ProjectCard } from "./partials/project-card";
import * as classes from "./style";

interface Project {
  name: string;
  description: string;
}

export const ProjectPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: projects } = useSuspenseQuery(getProjectsOptions);
  const createProject = useMutation({
    ...createProjectOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
  useHeaderActions({
    create: () => {
      setIsModalOpen(true);
    },
  });

  const handleCreateProject = async ({ name, description }: Project) => {
    setIsModalOpen(false);
    await createProject.mutateAsync({ name, description });
    createProject.reset();
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
