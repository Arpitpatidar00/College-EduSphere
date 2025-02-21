// ThemeProvider.js
import { createContext, useState, useMemo } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { MUITheme } from "./MUITheme";
import { ThemeMode, ThemeVariants } from "./themeConstants";
import { appDefaultConfig } from "./ThemeConfig";

// Create context
export const ThemeContext = createContext({
  themeMode: ThemeMode.LIGHT, // Default to light
  setThemeMode: () => { },
});

const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(appDefaultConfig.themeMode);

  // Memoized theme selection
  const theme = useMemo(() => {
    return themeMode === ThemeMode.LIGHT
      ? MUITheme[ThemeVariants.THEME1_LIGHT]
      : MUITheme[ThemeVariants.THEME1_DARK];
  }, [themeMode]);


  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
