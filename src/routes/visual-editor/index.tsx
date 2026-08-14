import { WebsiteEditor } from "@operon/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/visual-editor/")({
  component: () => {
    const handleSaveConfig = (config: any) => {
      console.log("Saving Analytics configuration for:", config.operonId);
      console.log("Payload:", config);
      
      try {
        const existingRaw = localStorage.getItem("operon_analytics_configs");
        const existing = existingRaw ? JSON.parse(existingRaw) : {};
        existing[config.operonId] = config;
        localStorage.setItem("operon_analytics_configs", JSON.stringify(existing));
        alert("Configuration saved locally!");
      } catch (err) {
        console.error("Failed to save config", err);
        alert("Failed to save configuration.");
      }
    };

    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <WebsiteEditor
          initialUrl="http://localhost:8085/test.html"
          onSaveConfig={handleSaveConfig}
        />
      </div>
    );
  },
  staticData: {
    pageHeaderData: {
      title: "Visual Editor",
      subtitle: "Visually tag elements on your website using the Operon SDK.",
    },
  },
});
