import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APP_COLORS } from "../enums/Colors";

const AppToastContainer = () => {
  return (
    <Box
      sx={{
        "& .Toastify__toast-container": {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          zIndex: 9999,
          pointerEvents: "none",
        },
        "& .Toastify__toast-container--top-right": {
          top: 16,
          right: 16,
        },
        "& .Toastify__toast": {
          backgroundColor: APP_COLORS.grey[700], // using grey from APP_COLORS
          color: APP_COLORS.common.white,
          borderRadius: 2,
          p: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          pointerEvents: "auto",
        },
        // Toast body text styling
        "& .Toastify__toast-body": {
          fontSize: "14px",
        },
        // Success Toast
        "& .Toastify__toast--success": {
          backgroundColor: APP_COLORS.success[500],
        },
        // Error Toast
        "& .Toastify__toast--error": {
          backgroundColor: APP_COLORS.error[500],
        },
        // Info Toast (you may adjust this color as desired)
        "& .Toastify__toast--info": {
          backgroundColor: APP_COLORS.accent[500],
        },
        // Warning Toast
        "& .Toastify__toast--warning": {
          backgroundColor: APP_COLORS.warning[500],
          color: APP_COLORS.common.black,
        },
      }}
    >
      <ToastContainer />
    </Box>
  );
};

export default AppToastContainer;
