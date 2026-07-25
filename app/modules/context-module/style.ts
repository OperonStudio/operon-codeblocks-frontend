import { css } from "@morph-css/kit";

export const contextListContainerStyle = css({
  padding: "24px 32px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const contextItemStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 24px",
  backgroundColor: "var(--operon-color-surface)",
  border: "1px solid var(--operon-color-border)",
  borderRadius: "12px",
});

export const contextNameStyle = css({
  fontSize: "16px",
  fontWeight: "700",
  color: "var(--operon-color-text)",
});

export const contextRightSectionStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "24px",
});

export const actionContainerStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const iconButtonStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--operon-color-text-muted)",
  cursor: "pointer",
  background: "transparent",
  border: "none",
  padding: "6px",
  borderRadius: "6px",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    color: "var(--operon-color-text)",
    backgroundColor: "var(--operon-color-surface-raised)",
  },
});
