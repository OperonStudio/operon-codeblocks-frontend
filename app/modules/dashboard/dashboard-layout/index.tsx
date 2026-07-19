import { APP_NAME, ORG_NAME } from "#/common/constants";
import { Header } from "#/components/header";
import { HeaderItems } from "#/components/header/header-items";
import { useAppTheme } from "#/contexts/theme";
import { usePhone } from "#/libs/utils";
import { cx } from "@morph-css/kit";
import { Menu, Moon, Sun } from "@operon/icons";
import { Box, Button, Sidebar, Toggle } from "@operon/ui";
import { Link, useLocation, useMatches } from "@tanstack/react-router";
import React from "react";
import * as classes from "./style";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const matches = useMatches();
  const matchWithSidebar = matches.find((m) => m.staticData?.sidebarGroups);
  const { sidebarGroups = [] } = matchWithSidebar?.staticData || {};
  const { isDark, toggleTheme } = useAppTheme();
  const isPhone = usePhone();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Box {...classes.layoutContainerStyle}>
      {isPhone && (
        <Box {...classes.mobileHeaderStyle}>
          <Button
            variant="ghost"
            onClick={() => setIsMenuOpen(true)}
            {...classes.menuButtonStyle}
          >
            <Box display="flex" align="center" justify="center">
              <Menu size={24} />
            </Box>
          </Button>
          <Box {...classes.logoBoxStyle}>
            <Box {...classes.logoIconStyle}>OC</Box>
            <Box>
              <h2 {...classes.titleStyle}>{ORG_NAME}</h2>
            </Box>
          </Box>
          <HeaderItems />
        </Box>
      )}

      <Sidebar
        variant={isPhone ? "drawer" : "permanent"}
        placement="left"
        isOpen={isPhone ? isMenuOpen : true}
        onClose={() => setIsMenuOpen(false)}
        {...classes.sidebarStyle}
      >
        <Box {...classes.headerStyle}>
          <Box {...classes.logoIconStyle}>OC</Box>
          <Box>
            <h2 {...classes.titleStyle}>{ORG_NAME}</h2>
            <p {...classes.subtitleStyle}>{APP_NAME}</p>
          </Box>
          <Box display="flex" align="center" gap={8}>
            <Sun
              size={14}
              color={
                !isDark
                  ? "var(--operon-color-primary)"
                  : "var(--operon-color-text-muted)"
              }
            />
            <Toggle size="sm" checked={isDark} onChange={toggleTheme} />
            <Moon
              size={14}
              color={
                isDark
                  ? "var(--operon-color-primary)"
                  : "var(--operon-color-text-muted)"
              }
            />
          </Box>
        </Box>

        <Box {...classes.scrollAreaStyle}>
          {sidebarGroups?.map((group, i) => (
            <Box key={i} {...classes.groupContainerStyle}>
              <Box {...classes.groupTitleStyle}>{group.title}</Box>
              {group.items.map((item, j) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={j}
                    to={item.href}
                    onClick={() => isPhone && setIsMenuOpen(false)}
                    className={cx(
                      classes.itemStyle.className,
                      isActive && classes.activeItemStyle.className,
                    )}
                    style={{
                      ...classes.itemStyle.style,
                      ...(isActive ? classes.activeItemStyle.style : {}),
                    }}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </Box>
          ))}
        </Box>
      </Sidebar>

      <Box {...classes.mainContentAreaStyle}>
        <Header />
        {children}
      </Box>
    </Box>
  );
};
