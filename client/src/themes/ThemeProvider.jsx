import { createContext, useState, useMemo } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { MUITheme } from "./MUITheme";
import { ThemeMode, ThemeVariants } from "./themeConstants";

// Create context
export const ThemeContext = createContext({
  themeMode: ThemeMode.LIGHT,
  setThemeMode: () => { },
});

const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(ThemeMode.LIGHT);

  const theme = useMemo(() => {
    return themeMode === ThemeMode.LIGHT
      ? MUITheme[ThemeVariants.THEME1_LIGHT]
      : MUITheme[ThemeVariants.THEME1_DARK];
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <MuiThemeProvider key={themeMode} theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
