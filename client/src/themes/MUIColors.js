import { mapColorsToMui } from "../enums/mapColorsToMui";
import { APP_COLORS } from "../enums/Colors";
import { ThemeVariants } from "../themes/themeConstants";

export const MUI_COLORS = {
  [ThemeVariants.THEME1_LIGHT]: {
    mode: "light",
    primary: {
      ...mapColorsToMui(APP_COLORS.primary),
      contrastText: APP_COLORS.secondary[200],
    },
    secondary: {
      ...mapColorsToMui(APP_COLORS.secondary),
    },
    accent: {
      ...mapColorsToMui(APP_COLORS.accent),
    },
    success: {
      ...mapColorsToMui(APP_COLORS.success),
    },
    warning: {
      ...mapColorsToMui(APP_COLORS.warning),
    },
    error: {
      ...mapColorsToMui(APP_COLORS.error),
    },
    grey: {
      ...mapColorsToMui(APP_COLORS.grey),
    },
    common: {
      black: APP_COLORS.common.black,
      white: APP_COLORS.common.white,
    },
    text: {
      primary: APP_COLORS.primary[500],
      secondary: APP_COLORS.grey[800],
      disabled: APP_COLORS.grey[500],
    },
    background: {
      default: APP_COLORS.secondary[400],
    },
  },
  [ThemeVariants.THEME1_DARK]: {
    mode: "light",
    primary: {
      ...mapColorsToMui(APP_COLORS.primary),
      contrastText: APP_COLORS.secondary[200],
    },
    secondary: {
      ...mapColorsToMui(APP_COLORS.secondary),
    },
    accent: {
      ...mapColorsToMui(APP_COLORS.accent),
    },
    success: {
      ...mapColorsToMui(APP_COLORS.success),
    },
    warning: {
      ...mapColorsToMui(APP_COLORS.warning),
    },
    error: {
      ...mapColorsToMui(APP_COLORS.error),
    },
    grey: {
      ...mapColorsToMui(APP_COLORS.grey),
    },
    common: {
      black: APP_COLORS.common.black,
      white: APP_COLORS.common.white,
    },
    text: {
      primary: APP_COLORS.primary[200],
      secondary: APP_COLORS.grey[100],
      disabled: APP_COLORS.grey[200],
    },
    background: {
      default: APP_COLORS.grey[50],
    },
  },
};
