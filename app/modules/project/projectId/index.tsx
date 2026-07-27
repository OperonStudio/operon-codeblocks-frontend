import { PromptModal } from "#/components/prompt-modal";
import { useHeaderActions } from "#/contexts/header-actions";
import { ChevronDown, Copy } from "@operon/icons";
import { Box, Button, Dropdown, Sidebar, Textarea, toast } from "@operon/ui";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  type Collection,
  createCollectionOptions,
  getCollectionsOptions,
  updateCollectionOptions,
} from "./api";
import * as classes from "./style";

export const ProjectIdPage = () => {
  const { projectId } = useParams({ from: "/projects/$projectId/" });
  const queryClient = useQueryClient();

  const { data: collections = [] } = useSuspenseQuery(
    getCollectionsOptions(projectId),
  );

  const [activeCollection, setActiveCollection] = useState<Collection | null>(
    collections[0] || null,
  );
  const [schemaText, setSchemaText] = useState("");
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  const createCollection = useMutation({
    ...createCollectionOptions(projectId),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["projects", projectId, "collections"],
      });
      setActiveCollection(data);
    },
  });

  const updateCollection = useMutation({
    ...updateCollectionOptions(projectId, activeCollection?._id || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", projectId, "collections"],
      });
      toast.success("Collection saved!");
    },
  });

  useHeaderActions({
    "add-new-collection": () => {
      setIsPromptOpen(true);
    },
  });

  const handleCreateCollection = (name: string) => {
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    (createCollection.mutate as any)({ id, name, meta_data: {} });
  };

  useEffect(() => {
    if (activeCollection && activeCollection.meta_data) {
      setSchemaText(JSON.stringify(activeCollection.meta_data, null, 2));
    } else {
      setSchemaText("{}");
    }
  }, [activeCollection]);

  const handleSave = () => {
    if (!activeCollection) return;
    try {
      const schema = JSON.parse(schemaText);
      updateCollection.mutate(schema);
    } catch (e) {
      toast.error("Invalid JSON format");
    }
  };

  const handleCopyApiUrl = (env: string) => {
    if (!activeCollection) return;
    const url = `http://localhost:8080/api/content/${projectId}/${activeCollection._id}?env=${env}`; //have to change this
    navigator.clipboard.writeText(url);
    toast.success(`Copied ${env} API endpoint!`);
  };

  return (
    <Box {...classes.pageContainerStyle}>
      <Sidebar
        variant="permanent"
        placement="left"
        isOpen={true}
        onClose={() => {}}
        {...classes.sidebarStyle}
      >
        <Box
          display="flex"
          align="center"
          justify="space-between"
          style={{ marginBottom: "16px", padding: "0 8px" }}
        >
          <Box {...classes.sidebarTitleStyle}>Collections</Box>
        </Box>

        <Box {...classes.collectionListStyle}>
          {collections.map((col) => (
            <Box
              key={col._id}
              {...classes.collectionItemStyle}
              style={{
                backgroundColor:
                  activeCollection?._id === col._id
                    ? "var(--operon-color-surface-raised, #f0f0f0)"
                    : undefined,
                color:
                  activeCollection?._id === col._id
                    ? "var(--operon-color-primary)"
                    : undefined,
                fontWeight: activeCollection?._id === col._id ? "500" : "normal",
              }}
              onClick={() => setActiveCollection(col)}
            >
              <Box display="flex" align="center" gap={8}>
                {col.name}
              </Box>
            </Box>
          ))}
        </Box>
      </Sidebar>

      <Box {...classes.contentAreaStyle}>
        {activeCollection ? (
          <Box
            display="flex"
            direction="column"
            style={{ height: "100%", gap: "24px" }}
          >
            <Box display="flex" justify="space-between" align="center">
              <Box {...classes.titleStyle}>{activeCollection.name}</Box>
              <Box display="flex" align="center" gap={12}>
                <Dropdown
                  onSelect={handleCopyApiUrl}
                  placement="bottom-end"
                  trigger={
                    <Button variant="outline">
                      <Box display="flex" align="center" gap={8}>
                        <Copy size={16} />
                        Copy API URL
                        <ChevronDown size={16} />
                      </Box>
                    </Button>
                  }
                  items={[
                    { value: "development", label: "Development" },
                    { value: "staging", label: "Staging" },
                    { value: "production", label: "Production" },
                  ]}
                />
                <Button
                  onClick={handleSave}
                  disabled={updateCollection.isPending}
                >
                  {updateCollection.isPending ? "Saving..." : "Save Schema"}
                </Button>
              </Box>
            </Box>
            <Box style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <Textarea
                placeholder="Enter raw JSON schema, notes, or configuration details here..."
                style={{
                  flex: 1,
                  resize: "none",
                  minHeight: "300px",
                  fontFamily: "monospace",
                }}
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
            Select a collection from the sidebar or click "Add New Collection".
          </Box>
        )}
      </Box>

      <PromptModal
        isOpen={isPromptOpen}
        onClose={() => setIsPromptOpen(false)}
        onSubmit={handleCreateCollection}
        title="Add New Collection"
        message="Enter a name for the new collection:"
        placeholder="Collection Name"
      />
    </Box>
  );
};
