import { Rocket } from "@operon/icons";
import { Box, Button, Card } from "@operon/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <Box
      display="flex"
      direction="column"
      align="center"
      justify="center"
      style={{
        minHeight: "100vh",
        padding: "32px",
        backgroundColor: "var(--operon-color-background, #fff)",
        fontFamily: "var(--operon-typography-body, sans-serif)",
      }}
    >
      <Card style={{ padding: "40px", maxWidth: "600px", textAlign: "center" }}>
        <Box display="flex" direction="column" align="center" gap="16px">
          <Rocket
            size={48}
            style={{ color: "var(--operon-color-primary, #0070f3)" }}
          />
          <h1
            style={{
              margin: 0,
              fontSize: "2rem",
              fontWeight: "bold",
              color: "var(--operon-color-text, #333)",
            }}
          >
            Hello Compose
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "1rem",
              color: "var(--operon-color-text-muted, #666)",
            }}
          >
            Welcome to the new Operon Compose frontend, powered by TanStack
            Start, MorphCSS, and Operon UI!
          </p>
          <Button style={{ marginTop: "16px" }}>Get Started</Button>
        </Box>
      </Card>
    </Box>
  );
}
