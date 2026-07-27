import { ConfirmModal } from "#/components/confirm-modal";
import { Check, Copy, RefreshCw } from "@operon/icons";
import { Box, Button, toast } from "@operon/ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getApiKeysOptions, regenerateApiKeyOptions } from "./api";
import * as classes from "./style";

export const ApiKeysPage = () => {
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [keyToRegenerate, setKeyToRegenerate] = useState<{ projectId: string; environment: string } | null>(null);

  const queryClient = useQueryClient();

  const { data: projectsWithKeys, isLoading } = useQuery(getApiKeysOptions);

  const { mutate: regenerateApiKey, isPending } = useMutation({
    ...regenerateApiKeyOptions,
    onSuccess: (data) => {
      toast.success(`Key for ${data.name} regenerated successfully!`);
      queryClient.invalidateQueries({ queryKey: getApiKeysOptions.queryKey });
    },
    onError: () => {
      toast.error("Failed to regenerate API key");
    },
  });

  const handleCopy = (keyId: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKeyId(keyId);
    toast.success("API key copied to clipboard");
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleRegenerateClick = (projectId: string, environment: string) => {
    setKeyToRegenerate({ projectId, environment });
  };

  const confirmRegenerate = () => {
    if (keyToRegenerate) {
      regenerateApiKey({ projectId: keyToRegenerate.projectId, req: { environment: keyToRegenerate.environment } });
      setKeyToRegenerate(null);
    }
  };

  if (isLoading) {
    return <Box {...classes.pageContainerStyle}>Loading API keys...</Box>;
  }

  return (
    <Box {...classes.pageContainerStyle}>
      <Box display="flex" direction="column" gap={32}>
        {projectsWithKeys?.map((project) => (
          <Box key={project.id} {...classes.projectSectionStyle}>
            <Box display="flex" justify="space-between" align="center">
              <Box {...classes.projectTitleStyle}>{project.name}</Box>
              <Button size="sm" variant="outline">
                Create New Key
              </Button>
            </Box>

            <Box display="flex" direction="column" gap={12}>
              {project.keys.map((apiKey) => (
                <Box key={apiKey.id} {...classes.keyContainerStyle}>
                  <Box {...classes.keyInfoStyle}>
                    <Box {...classes.keyNameStyle}>{apiKey.name}</Box>
                    <Box {...classes.keyDateStyle}>
                      Created on{" "}
                      {new Date(apiKey.createdAt).toLocaleDateString()}
                    </Box>
                  </Box>

                  <Box display="flex" align="center" gap={16}>
                    <Box {...classes.keyValueStyle}>
                      {apiKey.value.substring(0, 8)}...
                      {apiKey.value.substring(apiKey.value.length - 4)}
                    </Box>

                    <Box {...classes.actionsStyle}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(apiKey.id, apiKey.value)}
                        aria-label="Copy key"
                      >
                        {copiedKeyId === apiKey.id ? (
                          <Check
                            size={16}
                            color="var(--operon-color-success)"
                          />
                        ) : (
                          <Copy size={16} />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleRegenerateClick(project.id, apiKey.environment)
                        }
                        aria-label="Regenerate key"
                        disabled={isPending}
                      >
                        <RefreshCw size={16} />
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      <ConfirmModal
        isOpen={!!keyToRegenerate}
        onClose={() => setKeyToRegenerate(null)}
        onConfirm={confirmRegenerate}
        title="Regenerate API Key"
        message="Are you sure you want to regenerate this API key? Any applications using the old key will immediately lose access."
        confirmText="Regenerate"
        isDestructive={true}
      />
    </Box>
  );
};
