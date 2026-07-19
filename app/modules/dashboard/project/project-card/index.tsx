import { usePhone } from "#/libs/utils";
import { Box, Card, Chip } from "@operon/ui";
import { Link } from "@tanstack/react-router";
import * as classes from "./style";

export interface ProjectCardProps {
  title: string;
  description: string;
  apiCount?: number;
  environments?: string[];
}

export const ProjectCard = ({
  title,
  description,
  apiCount = 0,
  environments = [],
}: ProjectCardProps) => {
  const isPhone = usePhone();

  return (
    <Link to="." {...classes.linkStyle}>
      <Card variant="outline" shadow="sm">
        <Box
          display="flex"
          direction={isPhone ? "column" : "row"}
          align={isPhone ? "flex-start" : "center"}
          justify="space-between"
          gap={16}
          style={{ padding: "24px" }}
        >
          <Box {...classes.textGroupStyle}>
            <h3 {...classes.titleStyle}>{title}</h3>
            <p {...classes.descriptionStyle}>{description}</p>
          </Box>

          <Box {...classes.chipsRowStyle}>
            <Chip variant="outline" color="secondary">
              {apiCount} APIs
            </Chip>
            {environments.map((env) => (
              <Chip key={env} variant="outline" color="secondary">
                {env}
              </Chip>
            ))}
          </Box>
        </Box>
      </Card>
    </Link>
  );
};
