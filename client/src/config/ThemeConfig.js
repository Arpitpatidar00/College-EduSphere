import {
  HeaderType,
  LayoutType,
  NavStyle,
  RouteTransition,
  ThemeMode,
  ThemeStyle,
  ThemeStyleRadius,
} from "../enums/common";
import { APP_COLORS } from "../constants/colors/AppColors";

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

export const backgroundDark = {
  paper: APP_COLORS.primary[300],
  default: APP_COLORS.primary[500],
};

export const backgroundLight = {
  paper: APP_COLORS.secondary[50],
  default: APP_COLORS.grey[50],
};

export const cardRadius = ThemeStyleRadius.STANDARD;

export const DarkSidebar = {
  sidebarBgColor: "#313541",
  sidebarTextColor: "#fff",
  sidebarHeaderColor: "#313541",
  sidebarMenuSelectedBgColor: "#F4F7FE",
  sidebarMenuSelectedTextColor: "rgba(0, 0, 0, 0.87)",
  mode: ThemeMode.DARK,
};

export const LightSidebar = {
  sidebarBgColor: APP_COLORS.secondary[400],
  sidebarTextColor: APP_COLORS.primary[500],
  sidebarHeaderColor: "#fff",
  sidebarMenuSelectedBgColor: APP_COLORS.primary[500],
  sidebarMenuSelectedTextColor: APP_COLORS.accent[500],
  mode: ThemeMode.LIGHT,
};

export const appDefaultConfig = {
  sidebar: {
    borderColor: APP_COLORS.grey["700"],
    colorSet: LightSidebar,
  },
  themeStyle: ThemeStyle.STANDARD,
  themeMode: ThemeMode.LIGHT,
  navStyle: NavStyle.DEFAULT,
  layoutType: LayoutType.FULL_WIDTH,
  headerType: HeaderType.FIXED,
  rtAnim: RouteTransition.SLIDE_LEFT,
};
