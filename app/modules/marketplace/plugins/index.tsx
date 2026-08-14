import { Blocks } from "@operon/icons";
import { Box, Button } from "@operon/ui";

export const PluginsPage = () => {
  return (
    <Box
      style={{
        padding: "40px 60px",
        maxWidth: "1280px",
        margin: "0 auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        minHeight: "100%",
        backgroundColor: "var(--operon-color-background, #fafafa)",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 48px",
          backgroundColor: "#ffffff",
          border: "1px solid rgba(0,0,0,0.04)",
          borderRadius: "16px",
          boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Box style={{ color: "var(--operon-color-border)", marginBottom: "20px" }}>
          <Blocks size={48} />
        </Box>
        <Box style={{ fontSize: "18px", fontWeight: "600", color: "var(--operon-color-text)", marginBottom: "8px" }}>
          Marketplace Plugins
        </Box>
        <Box style={{ fontSize: "14px", color: "var(--operon-color-text-muted)", marginBottom: "24px", textAlign: "center", maxWidth: "400px" }}>
          Browse and install plugins to extend the capabilities of your Operon workspace.
        </Box>
        <Button variant="primary">Browse Plugins</Button>
      </Box>
    </Box>
  );
};
