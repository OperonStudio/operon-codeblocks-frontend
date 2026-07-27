import { ChevronRight, FileEdit, X } from "@operon/icons";
import { Box, Button, Chip } from "@operon/ui";
import type { Decision } from "../types";

interface DecisionListProps {
  decisions: Decision[];
  onEditDecision: (decision: Decision) => void;
  onDeleteDecision: (id: string) => void;
}

export const DecisionList = ({
  decisions,
  onEditDecision,
  onDeleteDecision,
}: DecisionListProps) => {
  return (
    <Box>
      <Box
        display="flex"
        align="center"
        gap="12px"
        style={{ marginBottom: "20px" }}
      >
        <Box
          style={{
            width: "12px",
            height: "12px",
            background: "var(--operon-color-primary)",
            borderRadius: "50%",
            boxShadow: "0 0 0 4px var(--operon-color-surface-raised)",
            position: "relative",
            zIndex: 2,
          }}
        />
        <Box
          style={{
            fontWeight: 600,
            fontSize: "18px",
            color: "var(--operon-color-text)",
          }}
        >
          Decisions
        </Box>
        <Chip
          variant="subtle"
          color="primary"
          style={{
            height: "26px",
            minWidth: "26px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "13px",
            padding: "0 10px",
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          {decisions.length}
        </Chip>
      </Box>

      <Box
        display="flex"
        direction="column"
        gap="16px"
        style={{
          position: "relative",
          paddingLeft: "32px",
          paddingTop: "8px",
          marginLeft: "6px",
        }}
      >
        <Box
          style={{
            position: "absolute",
            top: "-12px",
            bottom: "20px",
            left: "0",
            width: "2px",
            background: "var(--operon-color-border)",
            zIndex: 1,
          }}
        />
        {decisions.map((decision) => (
          <Box
            key={decision.id}
            display="flex"
            align="center"
            gap="16px"
            style={{ position: "relative", width: "100%", zIndex: 2 }}
          >
            <Box
              style={{
                position: "absolute",
                left: "-32px",
                top: "50%",
                width: "16px",
                height: "2px",
                background: "var(--operon-color-border)",
              }}
            />
            <Box
              style={{
                width: "28px",
                height: "28px",
                background: "var(--operon-color-surface)",
                border: "1px solid var(--operon-color-border)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background =
                  "var(--operon-color-surface-raised)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background =
                  "var(--operon-color-surface)")
              }
            >
              <ChevronRight size={16} color="var(--operon-color-text-muted)" />
            </Box>

            <Box
              style={{
                flex: 1,
                border: "1px solid var(--operon-color-border)",
                borderRadius: "var(--operon-radius-lg, 8px)",
                padding: "20px 24px",
                background: "var(--operon-color-surface)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                transition: "box-shadow 0.2s, border-color 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
                e.currentTarget.style.borderColor =
                  "var(--operon-color-border-hover, #ccc)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)";
                e.currentTarget.style.borderColor =
                  "var(--operon-color-border)";
              }}
            >
              <Box
                style={{
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "var(--operon-color-text)",
                }}
              >
                {decision.label}
              </Box>
              <Box display="flex" gap="12px" align="center">
                <Chip
                  variant="subtle"
                  color="warning"
                  style={{
                    color: "#d97706",
                    background: "#fef3c7",
                    fontWeight: 700,
                    fontSize: "12px",
                  }}
                >
                  {decision.matchType}
                </Chip>
                <Chip
                  variant="subtle"
                  color="primary"
                  style={{
                    background: "#e0e7ff",
                    color: "#4f46e5",
                    fontWeight: 700,
                    fontSize: "12px",
                  }}
                >
                  P {decision.priority}
                </Chip>
                <Chip
                  variant="subtle"
                  color="primary"
                  style={{
                    background: "#e0e7ff",
                    color: "#4f46e5",
                    fontWeight: 700,
                    fontSize: "12px",
                  }}
                >
                  {decision.conditions.length} cond.
                </Chip>

                <Box
                  display="flex"
                  gap="4px"
                  style={{
                    marginLeft: "8px",
                    paddingLeft: "16px",
                    borderLeft: "1px solid var(--operon-color-border)",
                  }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    title="Edit"
                    style={{
                      padding: "8px",
                      minWidth: 0,
                      color: "var(--operon-color-text-muted)",
                    }}
                    onClick={() => onEditDecision(decision)}
                  >
                    <FileEdit size={18} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    title="Delete"
                    style={{
                      padding: "8px",
                      minWidth: 0,
                      color: "var(--operon-color-text-muted)",
                    }}
                    onClick={() => onDeleteDecision(decision.id)}
                  >
                    <X size={18} />
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
