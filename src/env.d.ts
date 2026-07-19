/// <reference types="vite/client" />

import type { SidebarGroup } from "#/common/interfaces";

declare module "@morph-css/kit/css" {
  const content: string;
  export default content;
}

declare module "virtual:morphcss.css" {
  const content: string;
  export default content;
}

declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    sidebarGroups?: SidebarGroup[];
  }
}
