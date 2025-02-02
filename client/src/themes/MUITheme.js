import { createTheme } from "@mui/material/styles";
import { APP_COLORS } from "../enums/Colors";
import { ThemeVariants } from "../themes/themeConstants";

const mapColorsToMui = (colors) => ({
  main: colors[500],
  light: colors[300],
  dark: colors[600],
  50: colors[50],
  100: colors[100],
  200: colors[200],
  300: colors[300],
  400: colors[400],
  500: colors[500],
  600: colors[600],
  700: colors[700],
  800: colors[800],
  900: colors[900],
});

export const MUITheme = {
  [ThemeVariants.THEME1_LIGHT]: createTheme({
    palette: {
      mode: "light",
      primary: mapColorsToMui(APP_COLORS.primary),
      secondary: mapColorsToMui(APP_COLORS.secondary),
      background: {
        default: APP_COLORS.secondary[400],
      },
      text: {
        primary: APP_COLORS.primary[500],
        secondary: APP_COLORS.grey[800],
        disabled: APP_COLORS.grey[500],
      },
    },
  }),

  [ThemeVariants.THEME1_DARK]: createTheme({
    palette: {
      mode: "dark",
      primary: mapColorsToMui(APP_COLORS.primary),
      secondary: mapColorsToMui(APP_COLORS.secondary),
      background: {
        default: APP_COLORS.grey[50],
      },
      text: {
        primary: APP_COLORS.primary[500],
        secondary: APP_COLORS.grey[800],
        disabled: APP_COLORS.grey[500],
      },
    },
  }),
};
