import { useHeaderActions } from "#/contexts/header-actions";
import { FileEdit, X } from "@operon/icons";
import { Box, Button, Chip } from "@operon/ui";
import { useState } from "react";
import * as classes from "./style";

const dummyVariables = [
  { id: "1", name: "x-page-name", type: "string" },
  { id: "2", name: "device-type", type: "string" },
  { id: "3", name: "is-logged-in", type: "boolean" },
  { id: "4", name: "user-id", type: "number" },
];

export const ContextPage = () => {
  const [variables, setVariables] = useState(dummyVariables);

  useHeaderActions({
    "add-context-button": () => {
      const newVar = {
        id: Date.now().toString(),
        name: `new-context-${variables.length + 1}`,
        type: "string",
      };
      setVariables([...variables, newVar]);
    },
  });

  return (
    <Box {...classes.contextListContainerStyle}>
      {variables.map((variable) => (
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
