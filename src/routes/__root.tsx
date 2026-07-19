import { createRootRouteWithContext } from "@tanstack/react-router";

import { RootDocument } from "#/modules/root-document";
import "@morph-css/kit/css";
import operonMorphCss from "@operon/ui/dist/morphcss.css?url";
import operonCss from "@operon/ui/dist/style.css?url";
import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Operon Compose",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: operonCss,
      },
      {
        rel: "stylesheet",
        href: operonMorphCss,
      },
    ],
  }),
  shellComponent: RootDocument,
});
