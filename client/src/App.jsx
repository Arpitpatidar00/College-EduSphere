// App.jsx
import { Box, CssBaseline } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./services/queryClient";

import AppRouter from "./components/Global/Routes/AppRouter";
import AppProvider from "./components/Global/AppProvider/AppProvider";
import AppToastContainer from "./utils/toastify.utils";
import "react-toastify/dist/ReactToastify.css";
import ThemeProvider from "./themes/ThemeProvider";
import './styles/global.css'

const App = () => {
  return (
    <ThemeProvider  >
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <Box component="main">
            <AppRouter />
          </Box>
        </QueryClientProvider>
        <AppToastContainer />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
