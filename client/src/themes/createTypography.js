export function createTypography() {
  return {
    fontFamily: [
      "var(--font-heading)",
      "var(--font-body)",
      "Inter",
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
    fontSize: 14,
    button: { fontWeight: 600 },
    h1: {
      fontFamily: "'var(--font-heading)', serif",
      fontSize: "3.5rem",
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h2: {
      fontFamily: "'var(--font-heading)', serif",
      fontSize: "3rem",
      fontWeight: 700,
      lineHeight: 1.3,
    },
    // ... add other typography variants (h3, h4, body, caption, etc.)
  };
}
