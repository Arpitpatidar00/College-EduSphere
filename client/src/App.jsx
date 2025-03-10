import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./services/queryClient";

import AppRouter from "./components/Global/Routes/AppRouter";
import AppProvider from "./components/Global/AppProvider/AppProvider";
import AppToastContainer from "./utils/toastify.utils";
import "react-toastify/dist/ReactToastify.css";
import ThemeProvider from "./themes/ThemeProvider";
import "./styles/global.css";
import GlobalLoader from './common/GlobalLoader';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to show the loader (optional)
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <ThemeProvider>
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          {isLoading ? (
            <GlobalLoader />
          ) : (
            <Box component="main">
              <AppRouter />
            </Box>
          )}
        </QueryClientProvider>
        <AppToastContainer />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
