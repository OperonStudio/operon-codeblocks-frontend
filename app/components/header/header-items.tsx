import { Bell } from "@operon/icons";
import { Box, Button } from "@operon/ui";
import * as classes from "./style";

export const HeaderItems = () => {
  return (
    <Box {...classes.rightActionsStyle}>
      <Button variant="outline" size="sm" {...classes.iconButtonStyle}>
        <Bell size={16} />
      </Button>
    </Box>
  );
};
