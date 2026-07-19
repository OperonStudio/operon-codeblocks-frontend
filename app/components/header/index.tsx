import { Bell, ChevronDown, Search } from "@operon/icons";
import { Box, Breadcrumb, Button, Dropdown, Input } from "@operon/ui";
import { useLocation } from "@tanstack/react-router";
import * as classes from "./style";

export function Header() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbItems = [
    { label: "Operon", href: "/" },
    ...pathnames.map((path, index) => {
      const href = `/${pathnames.slice(0, index + 1).join("/")}`;
      const label = path.charAt(0).toUpperCase() + path.slice(1);
      return { label, href };
    }),
  ];

  return (
    <Box {...classes.topbarStyle}>
      <Breadcrumb items={breadcrumbItems} />

      <Box {...classes.searchContainerStyle}>
        <Input
          startIcon={<Search size={16} />}
          placeholder="Search experiences, policies, flags..."
          fullWidth
          variant="filled"
        />
      </Box>

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
    </Box>
  );
}
