import { css } from "@morph-css/kit";

export const projectGridStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "24px 32px",
});

export const emptyStateStyle = css({
  padding: "48px",
  textAlign: "center",
  color: "var(--operon-color-text-muted)",
  backgroundColor: "var(--operon-color-surface)",
  borderRadius: "8px",
  border: "1px dashed var(--operon-color-border)",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  alignItems: "center",
});

export const noProjectFoundStyle = css({ fontSize: "16px", fontWeight: 500 });
