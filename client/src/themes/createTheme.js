import { createTheme as createMuiTheme } from "@mui/material";
import { cardRadius } from "./constants";
import { createPalette } from "./createPalette";
import { createComponents } from "./createComponents";
import { createShadows } from "./createShadows";
import { createTypography } from "./createTypography";

export function createTheme({ theme }) {
  const palette = createPalette(theme);
  const components = createComponents({ palette });
  const shadows = createShadows();
  const typography = createTypography();

  return createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400,
      },
    },
    spacing: 4,
    cardRadius,
    components,
    palette,
    shadows,
    typography,
  });
}
