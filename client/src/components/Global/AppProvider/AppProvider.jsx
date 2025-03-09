import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Provider } from "react-redux";
import { makeStore } from "../../../store/store";

function AppProvider({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={makeStore()}>

        <CssBaseline />
        {children}

      </Provider>
    </LocalizationProvider>
  );
}

export default AppProvider;
