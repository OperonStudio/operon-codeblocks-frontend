import { css } from "@morph-css/kit";

export const cardContainerStyle = css({
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const topSectionStyle = css({
  display: "flex",
  gap: "16px",
  alignItems: "center",
});

export const iconWrapperStyle = css({
  width: "56px",
  height: "56px",
  borderRadius: "12px",
  backgroundColor: "var(--operon-color-primary)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  flexShrink: 0,
});

export const textGroupStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const titleStyle = css({
  fontSize: "18px",
  fontWeight: "600",
  color: "var(--operon-color-text)",
  margin: 0,
});

export const descriptionStyle = css({
  fontSize: "14px",
  color: "var(--operon-color-text-muted)",
  margin: 0,
});

export const chipsRowStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
});

export const linkStyle = css({
  textDecoration: "none",
  color: "inherit",
  display: "block",
});
