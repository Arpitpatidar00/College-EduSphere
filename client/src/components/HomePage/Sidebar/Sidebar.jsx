import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, CardContent, Box, IconButton, Typography } from "@mui/material";
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
import ProfileCard from "./ProfileCard.jsx";
import { APP_COLORS } from "../../../enums/Colors";
import { useContext } from "react";
import { ThemeContext } from "../../../themes/ThemeProvider";
import { ThemeMode } from "../../../themes/themeConstants";
import { ROUTES } from "../../Global/Routes/CommonRoutes.js";
import { logoutThunk } from "../../../store/thunk/auth.thunk";

const Sidebar = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate(ROUTES.AUTH.STUDENT);
  };

  const { setThemeMode } = useContext(ThemeContext);

  const toggleTheme = () => {
    setThemeMode((prevMode) =>
      prevMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT
    );
  };

  const handleSettingClick = () => navigate("/setting");

  return (
    <Card
      sx={{
        height: "calc(100vh - 100px)",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: APP_COLORS.secondary[200],
        m: 1,

      }}
    >
      <Box
        sx={{
          mb: 2,
          mt: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <ProfileCard /> */}
      </Box>

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
            { label: "About", icon: <Info /> },
          ].map((item, index) => (
            <IconButton
              key={index}
              sx={{
                justifyContent: "flex-start",
                borderRadius: "8px",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: APP_COLORS.primary[50], // Light hover effect
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
          <IconButton
            onClick={handleSettingClick}
            sx={{
              justifyContent: "flex-start",
              borderRadius: "8px",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: APP_COLORS.secondary[50],
              },
            }}
          >
            <Settings sx={{ ml: 1, color: APP_COLORS.primary[500] }} />
            <Typography
              variant="body2"
              sx={{
                ml: 2,
                fontFamily: "Arial, sans-serif",
                fontSize: "1.2rem",
                color: APP_COLORS.primary[500],
              }}
            >
              Setting
            </Typography>
          </IconButton>

          {/* Theme Toggle */}
          <IconButton
            onClick={toggleTheme}
            sx={{
              justifyContent: "flex-start",
              borderRadius: "8px",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: APP_COLORS.primary[50],
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
                backgroundColor: APP_COLORS.error[50], // Slight red tint on hover
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
