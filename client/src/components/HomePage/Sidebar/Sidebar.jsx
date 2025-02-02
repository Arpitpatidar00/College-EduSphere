import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Feed,
  Group,
  Archive,
  Save,
  Settings,
  Brightness4,
  Brightness7,
  Info,
  ExitToApp,
} from "@mui/icons-material";
import { logout } from "../../../store/slices/auth.slice.jsx";
import { toast } from "react-toastify";
import ProfileCard from "./ProfileCard.jsx";
import { APP_COLORS } from "../../../enums/Colors";

const Sidebar = ({ toggleTheme, isDarkMode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("state");
    sessionStorage.clear();
    dispatch(logout());
    navigate("/login");
    toast("User logged out successfully");
  };

  return (
    <Card
      sx={{
        height: "calc(100vh - 100px)",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        p: 2,
        bgcolor: APP_COLORS.common.white, // Use global common white as background
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Centered Profile Card */}
      <Box
        sx={{
          mb: 2,
          mt: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ProfileCard />
      </Box>

      {/* Navigation Links with scrollable content */}
      <CardContent
        sx={{
          flex: 1,
          maxHeight: "calc(100vh - 200px)",
          overflowY: "auto",
          overflowX: "hidden",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {[
            { label: "Favorites", icon: <Feed /> },
            { label: "Likes", icon: <Group /> },
            { label: "Saved", icon: <Save /> },
            { label: "Collections", icon: <Archive /> },
            { label: "Settings", icon: <Settings /> },
            { label: "About", icon: <Info /> },
          ].map((item, index) => (
            <IconButton
              key={index}
              sx={{
                justifyContent: "flex-start",
                borderRadius: "8px",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)", // Light hover effect
                },
              }}
            >
              {React.cloneElement(item.icon, {
                sx: { ml: 1, color: APP_COLORS.primary[500] },
              })}
              <Typography
                variant="body2"
                sx={{
                  ml: 2,
                  fontFamily: "Arial, sans-serif",
                  fontSize: "1.2rem",
                  color: APP_COLORS.primary[500],
                }}
              >
                {item.label}
              </Typography>
            </IconButton>
          ))}

          {/* Theme Toggle */}
          <IconButton
            onClick={toggleTheme}
            sx={{
              justifyContent: "flex-start",
              borderRadius: "8px",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            {isDarkMode ? (
              <Brightness7 sx={{ ml: 1, color: APP_COLORS.primary[500] }} />
            ) : (
              <Brightness4 sx={{ ml: 1, color: APP_COLORS.primary[500] }} />
            )}
            <Typography
              variant="body2"
              sx={{
                ml: 2,
                fontFamily: "Arial, sans-serif",
                fontSize: "1.2rem",
                color: APP_COLORS.primary[500],
              }}
            >
              Theme
            </Typography>
          </IconButton>

          {/* Logout Button */}
          <IconButton
            onClick={handleLogout}
            sx={{
              justifyContent: "flex-start",
              borderRadius: "8px",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.1)", // Slight red tint on hover
              },
            }}
          >
            <ExitToApp sx={{ ml: 1, color: APP_COLORS.primary[500] }} />
            <Typography
              variant="body2"
              sx={{
                ml: 2,
                fontFamily: "Arial, sans-serif",
                fontSize: "1.2rem",
                color: APP_COLORS.primary[500],
              }}
            >
              Logout
            </Typography>
          </IconButton>
        </Box>
      </CardContent>

    </Card>
  );
};

export default Sidebar;
