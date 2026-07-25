import { Box, Textarea } from "@operon/ui";
import { useState } from "react";
import * as classes from "./style";

const dummyCollections = [
  { id: "1", name: "Users API" },
  { id: "2", name: "Billing Webhooks" },
  { id: "3", name: "Authentication" },
];

export const ProjectIdPage = () => {
  const [activeCollection, setActiveCollection] = useState(dummyCollections[0]);
  const [schemaText, setSchemaText] = useState("");

  return (
    <Box {...classes.pageContainerStyle}>
      <Box {...classes.sidebarStyle}>
        <Box
          display="flex"
          align="center"
          justify="space-between"
          style={{ marginBottom: "16px", padding: "0 8px" }}
        >
          <Box {...classes.sidebarTitleStyle}>Collections</Box>
        </Box>

        <Box {...classes.collectionListStyle}>
          {dummyCollections.map((col) => (
            <Box
              key={col.id}
              {...classes.collectionItemStyle}
              style={{
                backgroundColor:
                  activeCollection.id === col.id
                    ? "var(--operon-color-primary-subtle)"
                    : undefined,
                color:
                  activeCollection.id === col.id
                    ? "var(--operon-color-primary)"
                    : undefined,
              }}
              onClick={() => setActiveCollection(col)}
            >
              <Box display="flex" align="center" gap={8}>
                {col.name}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box {...classes.contentAreaStyle}>
        {activeCollection ? (
          <Box
            display="flex"
            direction="column"
            style={{ height: "100%", gap: "24px" }}
          >
            <Box>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                {activeCollection.name}
              </h2>
              <p style={{ color: "var(--operon-color-text-muted)" }}>
                Manage endpoints and configurations for {activeCollection.name}.
              </p>
            </Box>

            <Box style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <Textarea
                placeholder="Enter raw JSON schema, notes, or configuration details here..."

                style={{ flex: 1, resize: "none", minHeight: "300px" }}
                value={schemaText}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setSchemaText(e.target.value)
                }
              />
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            direction="column"
            align="center"
            justify="center"
            style={{ height: "100%", color: "var(--operon-color-text-muted)" }}
          >
            Select a collection from the sidebar to view details.
          </Box>
        )}
      </Box>
    </Box>
  );
};
