import { css } from "@morph-css/kit";

export const containerStyle = css({
  minHeight: "100vh",
  padding: "32px",
  backgroundColor: "var(--operon-color-background, #fff)",
  fontFamily: "var(--operon-typography-body, sans-serif)",
});

export const cardStyle = css({
  padding: "40px",
  maxWidth: "500px",
  textAlign: "center",
});

export const iconStyle = css({
  color: "var(--operon-color-warning, #f5a623)",
});

export const headingStyle = css({
  margin: 0,
  fontSize: "2rem",
  fontWeight: "bold",
  color: "var(--operon-color-text, #333)",
});

export const textStyle = css({
  margin: 0,
  fontSize: "1rem",
  color: "var(--operon-color-text-muted, #666)",
  lineHeight: "1.5",
});

export const buttonStyle = css({
  marginTop: "24px",
});
