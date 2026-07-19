import { useHeaderActions } from "#/contexts/header-actions";
import { Box, Button } from "@operon/ui";
import { useEffect, useState } from "react";
import { CreateProjectModal } from "./partials/create-project-modal";
import { ProjectCard } from "./partials/project-card";
import * as classes from "./style";

interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

const STORAGE_KEY = "operon_projects";

export const ProjectPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProjects(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse stored projects", e);
    }
  }, []);

  useHeaderActions({
    create: () => {
      setIsModalOpen(true);
    },
  });

  const handleCreateProject = ({
    name,
    description,
  }: {
    name: string;
    description: string;
  }) => {
    const project: Project = {
      id: crypto.randomUUID(),
      name,
      description,
      createdAt: new Date().toISOString(),
    };

    const updated = [...projects, project];

    setProjects(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

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
              key={project.id}
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
