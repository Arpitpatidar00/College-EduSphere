import { createTheme as muiTheme } from "@mui/material";
import { cardRadius } from "./constants";

export function createComponents({ palette }) {
  return {
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media (min-width: 0px)": { maxWidth: "100%" },
          "@media (min-width: 576px)": { maxWidth: "540px" },
          "@media (min-width: 768px)": { maxWidth: "720px" },
          "@media (min-width: 992px)": { maxWidth: "960px" },
          "@media (min-width: 1200px)": { maxWidth: "1140px" },
          "@media (min-width: 1400px)": { maxWidth: "1320px" },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: cardRadius / 2,
          boxShadow: "0px 5px 6px rgba(0, 0, 0, 0.04)",
          textTransform: "capitalize",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
          fontFamily: '"var(--font-body)", "Inter", sans-serif',
        },
        html: {
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        body: {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        "#root": {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        },
      },
    },
    // ... add further component customizations as needed
  };
}
