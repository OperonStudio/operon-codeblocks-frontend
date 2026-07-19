import { css } from "@morph-css/kit";

export const topbarStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 24px",
  borderBottom: "1px solid var(--operon-color-border, #eaeaea)",
  backgroundColor: "var(--operon-color-surface, #fff)",
  gap: "16px",
  position: "sticky",
  top: 0,
  zIndex: 5,
  width: "100%",
});

export const searchContainerStyle = css({
  flex: 1,
  maxWidth: "600px",
  display: "flex",
  alignItems: "center",
});

export const rightActionsStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

export const shortcutIconStyle = css({
  opacity: 0.5,
  fontSize: "12px",
});

export const envIndicatorStyle = css({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: "var(--operon-color-success)",
});

export const iconButtonStyle = css({
  padding: "8px",
});
