import { css } from "@morph-css/kit";

export const layoutContainerStyle = css({
  display: "flex",
  height: "100vh",
  width: "100%",
  backgroundColor: "var(--operon-color-surface-raised, #f5f5f5)",
  "@media (max-width: 1024px)": {
    flexDirection: "column",
    height: "auto",
    minHeight: "100vh",
  },
});

export const sidebarStyle = css({
  width: "260px",
  borderRight: "1px solid var(--operon-color-border, #eaeaea)",
  backgroundColor: "var(--operon-color-surface, #fff)",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  minHeight: "100vh",
  "@media (min-width: 1025px)": {
    position: "sticky",
    top: "0",
    zIndex: 10,
  },
});

export const mobileHeaderStyle = css({
  display: "none",
  "@media (max-width: 1024px)": {
    display: "flex",
    alignItems: "center",
    padding: "16px 20px",
    borderBottom: "1px solid var(--operon-color-border, #eaeaea)",
    backgroundColor: "var(--operon-color-surface, #fff)",
    gap: "16px",
    position: "sticky",
    top: "0",
    zIndex: 10,
  },
});

export const headerStyle = css({
  padding: "16px 20px",
  borderBottom: "1px solid var(--operon-color-border, #eaeaea)",
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

export const logoBoxStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

export const logoIconStyle = css({
  backgroundColor: "var(--operon-color-primary, #0070f3)",
  color: "var(--operon-color-text-inverse, #fff)",
  fontWeight: "bold",
  borderRadius: "6px",
  width: "36px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
});

export const titleStyle = css({
  fontWeight: "600",
  fontSize: "16px",
  margin: 0,
  color: "var(--operon-color-text, #000)",
});

export const subtitleStyle = css({
  fontSize: "13px",
  color: "var(--operon-color-text-muted, #666)",
  margin: 0,
});

export const scrollAreaStyle = css({
  flex: 1,
  overflowY: "auto",
  padding: "16px 12px",
});

export const groupContainerStyle = css({
  marginBottom: "24px",
});

export const groupTitleStyle = css({
  fontSize: "12px",
  fontWeight: "600",
  color: "var(--operon-color-text-muted, #666)",
  marginBottom: "8px",
  padding: "0 12px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
});

export const itemStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "10px 12px",
  borderRadius: "6px",
  color: "var(--operon-color-text, #333)",
  textDecoration: "none",
  cursor: "pointer",
  transition: "background-color 0.2s, color 0.2s",
  "&:hover": {
    backgroundColor: "var(--operon-color-surface-raised, #f5f5f5)",
  },
});

export const activeItemStyle = css({
  backgroundColor: "var(--operon-color-surface-raised, #f5f5f5)",
  color: "var(--operon-color-primary, #0070f3)",
  fontWeight: "500",
  "&:hover": {
    backgroundColor: "var(--operon-color-surface-raised, #f5f5f5)",
  },
});

export const mainContentAreaStyle = css({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  minWidth: 0,
  height: "100%",
  "@media (min-width: 1025px)": {
    width: "calc(100vw - 260px)",
  },
});

export const menuButtonStyle = css({
  padding: "8px",
  minWidth: "auto",
  height: "auto",
});
