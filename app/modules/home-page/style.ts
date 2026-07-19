import { css } from "@morph-css/kit";

export const homeBoxStyle = css({
  minHeight: "100vh",
  padding: "32px",
  backgroundColor: "var(--operon-color-background, #fff)",
  fontFamily: "var(--operon-typography-body, sans-serif)",
});

export const cardStyle = css({
  padding: "40px",
  maxWidth: "600px",
  textAlign: "center",
});

export const rocketStyle = css({
  color: "var(--operon-color-primary, #0070f3)",
});

export const headingStyle = css({
  margin: 0,
  fontSize: "2rem",
  fontWeight: "bold",
  color: "var(--operon-color-text, #333)",
});

export const subHeadingStyle = css({
  margin: 0,
  fontSize: "1rem",
  color: "var(--operon-color-text-muted, #666)",
});

export const buttonStyle = css({
  marginTop: "16px",
});
