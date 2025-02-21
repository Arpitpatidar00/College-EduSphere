import { APP_COLORS } from "../enums/Colors";
import {
  RouteTransition,
  NavStyle,
  LayoutType,
  ThemeStyle,
  ThemeMode,
} from "./themeConstants";

export const textLight = {
  primary: APP_COLORS.primary[500],
  secondary: APP_COLORS.grey[800],
  disabled: APP_COLORS.grey[500],
};

export const textDark = {
  primary: "rgb(255,255,255)",
  secondary: "rgb(229, 231, 235)",
  disabled: "rgb(156, 163, 175)",
};

export const appDefaultConfig = {
  themeStyle: ThemeStyle.STANDARD,
  themeMode: ThemeMode.LIGHT,
  navStyle: NavStyle.DEFAULT,
  layoutType: LayoutType.FULL_WIDTH,
  rtAnim: RouteTransition.SLIDE_LEFT,
};
