// src/utils/theme.js
import { createTheme } from '@mui/material/styles';

// Define color palette for dark and light themes
const colors = {
  // Light theme colors
  light: {
    background: '#f5f5f5',
    paper: '#fff',
    primary: '#64b5f6',
    secondary: '#f50057',
    accent: '#ff4081',
    textPrimary: '#000000',
    textSecondary: '#252424',
    success: '#4caf50',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',
  },
  // Dark theme colors
  dark: {
    background: '#121212',
    paper: '#1e1e1e',
    primary: '#1976d2',
    secondary: '#f8bbd0',
    accent: '#ff80ab',
    textPrimary: '#ffffff',
    textSecondary: '#b0bec5',
    success: '#81c784',
    error: '#ef5350',
    warning: '#ffb74d',
    info: '#64b5f6',
  },
};

// Create Light Theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.light.primary,
      contrastText: colors.light.textPrimary,
    },
    secondary: {
      main: colors.light.secondary,
      contrastText: colors.light.textPrimary,
    },
    background: {
      default: colors.light.background,
      paper: colors.light.paper,
    },
    text: {
      primary: colors.light.textPrimary,
      secondary: colors.light.textSecondary,
    },
    success: {
      main: colors.light.success,
      contrastText: colors.light.textPrimary,
    },
    error: {
      main: colors.light.error,
      contrastText: colors.light.textPrimary,
    },
    warning: {
      main: colors.light.warning,
      contrastText: colors.light.textPrimary,
    },
    info: {
      main: colors.light.info,
      contrastText: colors.light.textPrimary,
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
});

// Create Dark Theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.dark.primary,
      contrastText: colors.dark.textPrimary,
    },
    secondary: {
      main: colors.dark.secondary,
      contrastText: colors.dark.textPrimary,
    },
    background: {
      default: colors.dark.background,
      paper: colors.dark.paper,
    },
    text: {
      primary: colors.dark.textPrimary,
      secondary: colors.dark.textSecondary,
    },
    success: {
      main: colors.dark.success,
      contrastText: colors.dark.textPrimary,
    },
    error: {
      main: colors.dark.error,
      contrastText: colors.dark.textPrimary,
    },
    warning: {
      main: colors.dark.warning,
      contrastText: colors.dark.textPrimary,
    },
    info: {
      main: colors.dark.info,
      contrastText: colors.dark.textPrimary,
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
});
