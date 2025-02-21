import { MUI_COLORS, THEME1_LIGHT } from "./MUIColors";

export function createPalette(theme) {
  return MUI_COLORS[theme] || MUI_COLORS[THEME1_LIGHT];
}
