import { FileEdit, Settings, X } from "@operon/icons";
import { Box, Button, Input, Modal, Radio } from "@operon/ui";
import type { Decision } from "../types";

import { useEffect, useState } from "react";

interface DefineDecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  decision?: Decision | null;
}

export const DefineDecisionModal = ({
  isOpen,
  onClose,
  decision,
}: DefineDecisionModalProps) => {
  const [outcome, setOutcome] = useState<"Visible" | "Invisible">(
    decision?.outcome || "Visible",
  );

  useEffect(() => {
    if (decision) {
      setOutcome(decision.outcome);
    } else {
      setOutcome("Visible");
    }
  }, [decision]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title="Define Decision"
      footer={
        <Box
          display="flex"
          justify="flex-end"
          gap="12px"
          style={{ width: "100%" }}
        >
          <Button
            variant="outline"
            onClick={onClose}
            style={{ fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onClose}
            style={{ fontWeight: 600 }}
          >
            Save Decision
          </Button>
        </Box>
      }
    >
      <Box display="flex" direction="column" gap="24px">
        {/* Identification */}
        <Box
          style={{
            background: "var(--operon-color-surface)",
            border: "1px solid var(--operon-color-border)",
            borderRadius: "var(--operon-radius-lg, 8px)",
            padding: "24px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
          }}
        >
          <Box
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--operon-color-text-muted)",
              letterSpacing: "1.2px",
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            Identification
          </Box>
          <Box display="flex" gap="20px">
            <Box style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--operon-color-text)",
                  marginBottom: "8px",
                }}
              >
                Logic Label
              </label>
              <Input
                defaultValue={decision?.label || ""}
                placeholder="Enter a descriptive label..."
              />
            </Box>
            <Box style={{ width: "140px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--operon-color-text)",
                  marginBottom: "8px",
                }}
              >
                Priority Level
              </label>
              <Input
                type="number"
                defaultValue={decision?.priority || 1}
                min={1}
              />
            </Box>
          </Box>
        </Box>

        {/* Conditions */}
        <Box
          style={{
            background: "var(--operon-color-surface)",
            border: "1px solid var(--operon-color-border)",
            borderRadius: "var(--operon-radius-lg, 8px)",
            padding: "24px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
          }}
        >
          <Box
            display="flex"
            justify="space-between"
            align="center"
            style={{ marginBottom: "28px" }}
          >
            <Box
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--operon-color-text-muted)",
                letterSpacing: "1.2px",
                textTransform: "uppercase",
              }}
            >
              Conditions
            </Box>
            <Button
              variant="outline"
              size="sm"
              style={{
                color: "#ea580c",
                borderColor: "#fed7aa",
                background: "#fff7ed",
                fontWeight: 600,
              }}
            >
              + Add Condition
            </Button>
          </Box>

          <Box
            display="flex"
            direction="column"
            gap="20px"
            style={{ position: "relative" }}
          >
            {/* Visual connecting line */}
            <Box
              style={{
                position: "absolute",
                left: "50%",
                top: "20px",
                bottom: "20px",
                width: "2px",
                background: "var(--operon-color-border)",
                zIndex: 0,
                transform: "translateX(-50%)",
              }}
            />

            {(decision?.conditions || []).map((cond, index) => (
              <Box
                key={cond.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <Box
                  style={{
                    border: "1px solid var(--operon-color-border)",
                    borderRadius: "8px",
                    padding: "20px",
                    display: "flex",
                    gap: "20px",
                    background: "#fff",
                    zIndex: 1,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                  }}
                >
                  <Box
                    style={{
                      width: "36px",
                      height: "36px",
                      background: "var(--operon-color-surface-raised, #f3f4f6)",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Settings
                      size={18}
                      color="var(--operon-color-text-muted)"
                    />
                  </Box>
                  <Box style={{ flex: 1 }}>
                    <Box
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--operon-color-primary)",
                        marginBottom: "6px",
                      }}
                    >
                      {cond.attribute}
                    </Box>
                    <Box
                      style={{
                        fontSize: "14px",
                        color: "var(--operon-color-text)",
                        marginBottom: "12px",
                        fontWeight: 500,
                      }}
                    >
                      {cond.operator}
                    </Box>
                    <Button
                      variant="primary"
                      size="sm"
                      style={{
                        padding: "6px 14px",
                        fontSize: "12px",
                        fontWeight: 600,
                        height: "auto",
                      }}
                    >
                      See Values
                    </Button>
                  </Box>
                  <Box display="flex" gap="4px" align="flex-start">
                    <Button
                      variant="ghost"
                      size="sm"
                      style={{
                        padding: "8px",
                        minWidth: 0,
                        color: "var(--operon-color-text-muted)",
                      }}
                    >
                      <FileEdit size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      style={{
                        padding: "8px",
                        minWidth: 0,
                        color: "var(--operon-color-text-muted)",
                      }}
                    >
                      <X size={18} />
                    </Button>
                  </Box>
                </Box>

                {index < (decision?.conditions?.length || 0) - 1 && (
                  <Box
                    style={{
                      alignSelf: "center",
                      background: "var(--operon-color-primary)",
                      color: "#fff",
                      borderRadius: "16px",
                      padding: "6px 20px",
                      fontSize: "12px",
                      fontWeight: 700,
                      zIndex: 1,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {decision?.matchType || "ANY"}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Outcome */}
        <Box
          style={{
            background: "var(--operon-color-surface)",
            border: "1px solid var(--operon-color-border)",
            borderRadius: "var(--operon-radius-lg, 8px)",
            padding: "24px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
          }}
        >
          <Box
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--operon-color-text-muted)",
              letterSpacing: "1.2px",
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            Outcome
          </Box>
          <Box display="flex" gap="32px">
            <Radio
              name="outcome"
              value="Visible"
              label="Visible"
              checked={outcome === "Visible"}
              onChange={() => setOutcome("Visible")}
            />
            <Radio
              name="outcome"
              value="Invisible"
              label="Invisible"
              checked={outcome === "Invisible"}
              onChange={() => setOutcome("Invisible")}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
