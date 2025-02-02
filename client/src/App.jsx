// App.jsx
import { Box, CssBaseline } from "@mui/material";
import AppRouter from "./components/Global/Routes/AppRouter";
import AppProvider from "./components/Global/AppProvider/AppProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeProvider, { ThemeContext } from "./themes/ThemeProvider";
import { useContext } from "react";
import { ThemeMode } from "./themes/themeConstants";

const App = () => {
  const { setThemeMode } = useContext(ThemeContext);

  const toggleTheme = () => {
    console.log("yas this is")

    setThemeMode((prevMode) =>
      prevMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT
    );

  };

  return (
    <ThemeProvider>
      <CssBaseline />
      <AppProvider>
        <Box component="main">
          <AppRouter toggleTheme={toggleTheme} />
        </Box>
        <ToastContainer />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;