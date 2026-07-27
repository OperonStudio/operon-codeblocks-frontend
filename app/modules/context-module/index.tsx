import { ConfirmModal } from "#/components/confirm-modal";
import { useHeaderActions } from "#/contexts/header-actions";
import { ChevronDown, FileEdit, X } from "@operon/icons";
import { Box, Button, Chip, Dropdown, Input, Modal } from "@operon/ui";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { createContextOptions, deleteContextOptions, getContextsOptions, updateContextOptions, type ContextVariable } from "./api";
import * as classes from "./style";

const ContextModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, type: string) => void;
  initialData?: ContextVariable | null;
}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("string");

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name);
        setType(initialData.type);
      } else {
        setName("");
        setType("string");
      }
    }
  }, [isOpen, initialData]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit(name, type);
    setName("");
    setType("string");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Context Variable" : "Create Context Variable"}
      footer={
        <Box display="flex" justify="flex-end" gap={12}>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {initialData ? "Save" : "Create"}
          </Button>
        </Box>
      }
    >
      <Box display="flex" direction="column" gap={16}>
        <Box>
          <label
            style={{
              fontSize: "14px",
              fontWeight: 500,
              marginBottom: "4px",
              display: "block",
              color: "var(--operon-color-text)",
            }}
          >
            Name
          </label>
          <Input
            placeholder="e.g. x-page-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            autoFocus
          />
        </Box>
        <Box>
          <label
            style={{
              fontSize: "14px",
              fontWeight: 500,
              marginBottom: "4px",
              display: "block",
              color: "var(--operon-color-text)",
            }}
          >
            Type
          </label>
          <Dropdown
            containerStyle={{ width: "100%" }}
            onSelect={(val) => setType(val)}
            trigger={
              <Button
                variant="outline"
                style={{ width: "100%", justifyContent: "space-between" }}
              >
                <Box display="flex" align="center">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Box>
                <ChevronDown size={16} />
              </Button>
            }
            items={[
              { value: "string", label: "String" },
              { value: "number", label: "Number" },
              { value: "boolean", label: "Boolean" },
              { value: "array", label: "Array" },
            ]}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export const ContextPage = () => {
  const queryClient = useQueryClient();
  const { data: variables = [] } = useSuspenseQuery(getContextsOptions);

  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [editData, setEditData] = useState<ContextVariable | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const createMutation = useMutation({
    ...createContextOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contexts"] });
    },
  });

  const updateMutation = useMutation({
    ...updateContextOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contexts"] });
    },
  });

  const deleteMutation = useMutation({
    ...deleteContextOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contexts"] });
      setDeleteId(null);
    },
  });

  useHeaderActions({
    "add-context-button": () => {
      setEditData(null);
      setIsPromptOpen(true);
    },
  });

  const handleSubmit = (name: string, type: string) => {
    if (editData) {
      updateMutation.mutate({ id: editData.id, name, type });
    } else {
      createMutation.mutate({ name, type });
    }
  };

  return (
    <Box {...classes.contextListContainerStyle}>
      {variables.map((variable) => (
        <Box key={variable.id} {...classes.contextItemStyle}>
          <Box {...classes.contextNameStyle}>{variable.name}</Box>
          <Box {...classes.contextRightSectionStyle}>
            <Chip variant="subtle" color="primary">
              <Box style={{ fontWeight: 600 }}>{variable.type}</Box>
            </Chip>
            <Box {...classes.actionContainerStyle}>
              <Button
                variant="ghost"
                size="sm"
                title="Edit"
                style={{ padding: "8px", minWidth: 0 }}
                onClick={(e) => {
                  e.preventDefault();
                  setEditData(variable);
                  setIsPromptOpen(true);
                }}
              >
                <FileEdit size={18} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                title="Delete"
                style={{ padding: "8px", minWidth: 0 }}
                onClick={(e) => {
                  e.preventDefault();
                  setDeleteId(variable.id);
                }}
              >
                <X size={18} />
              </Button>
            </Box>
          </Box>
        </Box>
      ))}

      <ContextModal
        isOpen={isPromptOpen}
        onClose={() => {
          setIsPromptOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSubmit}
        initialData={editData}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="Delete Context Variable"
        message="Are you sure you want to delete this context variable? This action cannot be undone."
        confirmText="Delete"
        isDestructive
      />
    </Box>
  );
};
