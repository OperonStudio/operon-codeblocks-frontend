import { Bell } from "@operonstudio/icons";
import { Box, Button } from "@operonstudio/ui";
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
