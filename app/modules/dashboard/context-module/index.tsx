import { FileEdit, X } from "@operon/icons";
import { Box, Button, Chip } from "@operon/ui";
import * as classes from "./style";

const dummyVariables = [
  { id: "1", name: "x-page-name", type: "string" },
  { id: "2", name: "device-type", type: "string" },
  { id: "3", name: "is-logged-in", type: "boolean" },
  { id: "4", name: "user-id", type: "number" },
];

export const ContextPage = () => {
  return (
    <Box {...classes.contextListContainerStyle}>
      {dummyVariables.map((variable) => (
        <Box key={variable.id} {...classes.contextItemStyle}>
          <Box {...classes.contextNameStyle}>{variable.name}</Box>
          <Box {...classes.contextRightSectionStyle}>
            <Chip variant="subtle" color="primary">
              <Box style={{ fontWeight: 600 }}>{variable.type}</Box>
            </Chip>
            <Box {...classes.actionContainerStyle}>
              <Button
                variant="ghost"
                size="sm"
                title="Edit"
                style={{ padding: "8px", minWidth: 0 }}
              >
                <FileEdit size={18} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                title="Delete"
                style={{ padding: "8px", minWidth: 0 }}
              >
                <X size={18} />
              </Button>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
