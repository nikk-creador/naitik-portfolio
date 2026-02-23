export const COLORS = {
  primary: {
    600: "#5f5b53",
    800: "#1f1d1a",
    900: "#0b0b0b",
  },
  neutral: {
    50: "#f7f6f2",
    100: "#efefeb",
    200: "#e6e5dd",
    400: "#b3b0a3",
    500: "#8c887d",
    600: "#5f5b53",
    700: "#3b3833",
    800: "#1f1d1a",
    900: "#0b0b0b",
  },
};

export const TYPOGRAPHY = {
  fontFamily: [
    '"Sora"',
    '"Manrope"',
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  h1: {
    fontSize: "3rem",
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: "-0.025em",
  },
  h2: {
    fontSize: "2.25rem",
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: "-0.025em",
  },
  h3: {
    fontSize: "1.875rem",
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: "-0.025em",
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: "-0.025em",
  },
  h5: {
    fontSize: "1.25rem",
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: "-0.025em",
  },
  h6: {
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: 1.6,
    letterSpacing: "-0.025em",
  },
  body1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.6,
  },
  body2: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.6,
  },
  caption: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 1.5,
  },
};

export const GLOBAL_STYLES = {
  sectionPadding: "90px 24px",
  sectionPaddingMobile: "70px 20px",
  containerMaxWidth: "1240px",
  containerPadding: "0 24px",
  containerPaddingMobile: "0 20px",
  gradientBackground: `linear-gradient(135deg, ${COLORS.neutral[50]} 0%, ${COLORS.neutral[100]} 100%)`,
  transition: "all 0.25s ease",
  borderRadius: "24px",
};
