import { Box, Button, Tabs } from "@operon/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getContextsOptions } from "../../context-module/api";

import { AttributesModal } from "./components/AttributesModal";
import { AttributesSection } from "./components/AttributesSection";
import { DecisionList } from "./components/DecisionList";
import { DefineDecisionModal } from "./components/DefineDecisionModal";
import type { Decision } from "./types";

export const RuleEngineCollectionPage = ({
  projectId: _projectId,
  collectionId: _collectionId,
}: {
  projectId: string;
  collectionId: string;
}) => {
  const { data: allContextVariables = [] } =
    useSuspenseQuery(getContextsOptions);

  const [selectedAttributeIds, setSelectedAttributeIds] = useState<string[]>(
    [],
  );
  const [isAttributesModalOpen, setIsAttributesModalOpen] = useState(false);
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const [editingDecision, setEditingDecision] = useState<Decision | null>(null);

  // Dummy decisions to show the UI
  const [decisions, _setDecisions] = useState<Decision[]>([
    {
      id: "1",
      label: "PWC,Services, and product cod hide",
      priority: 1,
      matchType: "ANY",
      conditions: [
        {
          id: "c1",
          attribute: "sourceName",
          operator: "contains",
          values: ["something"],
        },
        {
          id: "c2",
          attribute: "productCode",
          operator: "contains",
          values: ["something"],
        },
      ],
      outcome: "Invisible",
    },
  ]);

  const selectedAttributes = allContextVariables.filter((v) =>
    selectedAttributeIds.includes(v.id),
  );

  const handleToggleAttribute = (id: string) => {
    setSelectedAttributeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleEditDecision = (decision: Decision) => {
    setEditingDecision(decision);
    setIsDecisionModalOpen(true);
  };

  const handleNewDecision = () => {
    setEditingDecision(null);
    setIsDecisionModalOpen(true);
  };

  const handleDeleteDecision = (id: string) => {
    console.log("Delete decision", id);
  };

  return (
    <Box
      display="flex"
      direction="column"
      style={{
        padding: "40px",
        gap: "32px",
        maxWidth: "1280px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <Tabs
        style={{ width: "100%" }}
        tabs={[
          {
            label: "Attributes",
            content: (
              <Box style={{ paddingTop: "24px" }}>
                <AttributesSection
                  selectedAttributes={selectedAttributes}
                  onRemoveAttribute={handleToggleAttribute}
                  onAddClick={() => setIsAttributesModalOpen(true)}
                />
              </Box>
            ),
          },
          {
            label: "Decisions",
            content: (
              <Box
                style={{
                  paddingTop: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                <DecisionList
                  decisions={decisions}
                  onEditDecision={handleEditDecision}
                  onDeleteDecision={handleDeleteDecision}
                />
              </Box>
            ),
          },
        ]}
      />

      {/* Footer Actions */}
      <Box
        display="flex"
        justify="flex-end"
        gap="16px"
        style={{
          marginTop: "32px",
          padding: "32px 0",
          borderTop: "1px solid var(--operon-color-border)",
        }}
      >
        <Button
          variant="outline"
          onClick={handleNewDecision}
          style={{ fontWeight: 600, padding: "10px 20px" }}
        >
          Define Decision +
        </Button>
        <Button
          variant="primary"
          style={{ fontWeight: 600, padding: "10px 24px" }}
        >
          Close
        </Button>
      </Box>

      {/* Modals */}
      <AttributesModal
        isOpen={isAttributesModalOpen}
        onClose={() => setIsAttributesModalOpen(false)}
        allAttributes={allContextVariables}
        selectedAttributeIds={selectedAttributeIds}
        onToggleAttribute={handleToggleAttribute}
      />

      <DefineDecisionModal
        isOpen={isDecisionModalOpen}
        onClose={() => {
          setIsDecisionModalOpen(false);
          setEditingDecision(null);
        }}
        decision={editingDecision}
      />
    </Box>
  );
};
