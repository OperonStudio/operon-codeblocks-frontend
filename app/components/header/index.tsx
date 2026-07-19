import { usePhone } from "#/libs/utils";
import { Search } from "@operon/icons";
import { Box, Breadcrumb, Input } from "@operon/ui";
import { useLocation, useMatches } from "@tanstack/react-router";
import { HeaderItems } from "./header-items";
import * as classes from "./style";

export function Header() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const isPhone = usePhone();
  const breadcrumbItems = [
    { label: "Operon", href: "/" },
    ...pathnames.map((path, index) => {
      const href = `/${pathnames.slice(0, index + 1).join("/")}`;
      const label = path.charAt(0).toUpperCase() + path.slice(1);
      return { label, href };
    }),
  ];
  const matches = useMatches();
  const matchWithSearch = matches.find((m) => m.staticData?.search);
  const { isSearchable = false, searchBarPlaceholder = "" } =
    matchWithSearch?.staticData?.search || {};
  return (
    <Box {...classes.topbarStyle}>
      <Breadcrumb items={breadcrumbItems} />

      {isSearchable && !isPhone && (
        <Box {...classes.searchContainerStyle}>
          <Input
            startIcon={<Search size={16} />}
            placeholder={searchBarPlaceholder}
            fullWidth
            variant="filled"
          />
        </Box>
      )}

      {!isPhone && <HeaderItems />}
    </Box>
  );
}
