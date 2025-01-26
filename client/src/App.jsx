import { Box, CssBaseline } from "@mui/material";
import AppRouter from "./components/Global/Routes/AppRouter";
import AppProvider from "./components/Global/AppProvider/AppProvider";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "../public/utils/theme/Theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
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
