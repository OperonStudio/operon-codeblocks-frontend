import { css } from "@morph-css/kit";

export const pageContainerStyle = css({
  padding: "48px",
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  height: "100%",
});

export const projectSectionStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  backgroundColor: "var(--operon-color-surface)",
  border: "1px solid var(--operon-color-border)",
  borderRadius: "12px",
  padding: "24px",
});

export const projectTitleStyle = css({
  fontSize: "18px",
  fontWeight: "600",
  color: "var(--operon-color-text)",
});

export const keyContainerStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px",
  backgroundColor: "var(--operon-color-background)",
  border: "1px solid var(--operon-color-border)",
  borderRadius: "8px",
});

export const keyInfoStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const keyNameStyle = css({
  fontSize: "14px",
  fontWeight: "500",
  color: "var(--operon-color-text)",
});

export const keyDateStyle = css({
  fontSize: "12px",
  color: "var(--operon-color-text-muted)",
});

export const keyValueStyle = css({
  fontSize: "14px",
  fontFamily: "monospace",
  color: "var(--operon-color-text)",
  backgroundColor: "var(--operon-color-surface-raised)",
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid var(--operon-color-border)",
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

export const actionsStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});
