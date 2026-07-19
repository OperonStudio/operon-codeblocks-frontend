import type { IconProps } from "@operon/icons";

export interface SidebarItem {
  label: string;
  icon: React.ComponentType<IconProps>;
  href: string;
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}
