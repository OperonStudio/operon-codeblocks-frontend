import TanStackQueryDevtools from "@/integrations/tanstack-query/devtools";
import { Button, ThemeProvider, darkTheme, lightTheme } from "@operon/ui";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useState } from "react";

export const RootDocument = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <Button
            variant="primary"
            onClick={() => setIsDark((prev) => !prev)}
            style={{
              position: "fixed",
              bottom: "16px",
              left: "16px",
              zIndex: 9999,
              borderRadius: "20px",
              boxShadow: "var(--operon-shadow-md)",
            }}
          >
            Toggle {isDark ? "Light" : "Dark"} Theme
          </Button>
          {children}
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
};
