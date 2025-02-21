import React, { createContext, useContext, useCallback, useState } from 'react';
import { createTheme } from '../theme/createTheme';
import { appDefaultConfig } from '../themes/';
import { THEME1_LIGHT } from '../';

const initialTheme = createTheme({ theme: THEME1_LIGHT });

export const ThemeContext = createContext({
    theme: initialTheme,
    themeMode: appDefaultConfig.themeMode,
    themeStyle: appDefaultConfig.themeStyle,
});

const ThemeActionsContext = createContext({
    updateTheme: () => { },
    updateThemeMode: () => { },
    updateThemeStyle: () => { },
});

export const useThemeContext = () => useContext(ThemeContext);
export const useThemeActionsContext = () => useContext(ThemeActionsContext);

export default function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState(initialTheme);
    const [themeMode, setThemeMode] = useState(appDefaultConfig.themeMode);
    const [themeStyle, setThemeStyle] = useState(appDefaultConfig.themeStyle);

    const updateTheme = useCallback((newTheme) => {
        setTheme(newTheme);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, themeMode, themeStyle }}>
            <ThemeActionsContext.Provider
                value={{
                    updateTheme,
                    updateThemeMode: setThemeMode,
                    updateThemeStyle: setThemeStyle,
                }}
            >
                {children}
            </ThemeActionsContext.Provider>
        </ThemeContext.Provider>
    );
}
