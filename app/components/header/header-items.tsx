import { Bell, ChevronDown } from "@operon/icons";
import { Box, Button, Dropdown } from "@operon/ui";
import * as classes from "./style";

export const HeaderItems = () => {
  return (
    <Box {...classes.rightActionsStyle}>
      <Dropdown
        trigger={
          <Button variant="outline" size="sm">
            <Box display="flex" align="center" gap={8}>
              <Box {...classes.envIndicatorStyle} />
              Development
              <ChevronDown size={14} />
            </Box>
          </Button>
        }
        items={[
          { value: "development", label: "Development" },
          { value: "staging", label: "Staging" },
          { value: "production", label: "Production" },
        ]}
      />

      <Button variant="outline" size="sm" {...classes.iconButtonStyle}>
        <Bell size={16} color="var(--operon-color-text-muted)" />
      </Button>
    </Box>
  );
};
