import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Box,
  IconButton,
  Typography,
  useTheme,
  Badge,
} from "@mui/material";
import {
  Home,
  Explore,
  VideoLibrary,
  Add,
  Chat,
  Favorite,
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
import { APP_COLORS } from "../../../enums/Colors.js";
import { logoutThunk } from "../../../store/thunk/auth.thunk.js";
import { ROUTES } from '@/components/Global/Routes/CommonRoutes';

const HomeSidebar = ({ toggleTheme }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate(ROUTES.AUTH.STUDENT);
  };


  const handleSettingClick = () => navigate("/setting");

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Navigation items for sidebar
  const navItems = [
    { label: "Home", icon: <Home />, path: ROUTES.HOME },
    { label: "Explore", icon: <Explore />, path: ROUTES.EXPLORE },
    { label: "Reels", icon: <VideoLibrary />, path: ROUTES.REELS },
    { label: "Add", icon: <Add />, path: ROUTES.CREATE_POST },
    { label: "Messages", icon: <Chat />, path: ROUTES.MESSAGES, badge: 7 },
  ];

  // Additional sidebar items
  const sidebarItems = [
    { label: "Favorites", icon: <Favorite />, path: ROUTES.FAVORITES },
    { label: "Friends", icon: <Group />, path: ROUTES.FRIENDS },
    { label: "Saved", icon: <Save />, path: ROUTES.SAVED },
    { label: "Collections", icon: <Archive />, path: ROUTES.COLLECTIONS },
    { label: "About", icon: <Info />, path: ROUTES.ABOUT },
  ];

  return (
    <Card
      sx={{
        height: "calc(100vh - 100px)",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        bgcolor: isDarkMode ? APP_COLORS.grey[800] : APP_COLORS.common.white,
        m: 1,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        position: "relative",
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
        <ProfileCard />
      </Box>

      <CardContent
        sx={{
          flex: 1,
          maxHeight: "calc(100vh - 200px)",
          overflowY: "auto",
          overflowX: "hidden",
          width: "100%",
          px: 1,
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: APP_COLORS.grey[400],
            borderRadius: "4px",
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {[...navItems, ...sidebarItems].map((item, index) => (
            <IconButton
              key={index}
              onClick={() => handleNavigation(item.path)}
              sx={{
                justifyContent: "flex-start",
                borderRadius: "12px",
                py: 1.5,
                px: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: APP_COLORS.primary[50],
                  transform: "translateX(5px)",
                },
              }}
            >
              {React.cloneElement(item.icon, {
                sx: { fontSize: 24, color: APP_COLORS.primary[500] },
              })}
              <Typography
                variant="body2"
                sx={{
                  ml: 2,
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: isDarkMode ? APP_COLORS.grey[200] : APP_COLORS.grey[800],
                }}
              >
                {item.label}
              </Typography>
              {item.badge && (
                <Badge
                  badgeContent={item.badge}
                  color="error"
                  sx={{ ml: "auto", mr: 1 }}
                />
              )}
            </IconButton>
          ))}

          {/* Settings */}
          <IconButton
            onClick={handleSettingClick}
            sx={{
              justifyContent: "flex-start",
              borderRadius: "12px",
              py: 1.5,
              px: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: APP_COLORS.primary[50],
                transform: "translateX(5px)",
              },
            }}
          >
            <Settings sx={{ fontSize: 24, color: APP_COLORS.primary[500] }} />
            <Typography
              variant="body2"
              sx={{
                ml: 2,
                fontFamily: "Roboto, sans-serif",
                fontSize: "1rem",
                fontWeight: 500,
                color: isDarkMode ? APP_COLORS.grey[200] : APP_COLORS.grey[800],
              }}
            >
              Settings
            </Typography>
          </IconButton>

          {/* Theme Toggle */}
          <IconButton
            onClick={toggleTheme}
            sx={{
              justifyContent: "flex-start",
              borderRadius: "12px",
              py: 1.5,
              px: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: APP_COLORS.primary[50],
                transform: "translateX(5px)",
              },
            }}
          >
            {isDarkMode ? (
              <Brightness7 sx={{ fontSize: 24, color: APP_COLORS.primary[500] }} />
            ) : (
              <Brightness4 sx={{ fontSize: 24, color: APP_COLORS.primary[500] }} />
            )}
            <Typography
              variant="body2"
              sx={{
                ml: 2,
                fontFamily: "Roboto, sans-serif",
                fontSize: "1rem",
                fontWeight: 500,
                color: isDarkMode ? APP_COLORS.grey[200] : APP_COLORS.grey[800],
              }}
            >
              Theme
            </Typography>
          </IconButton>

          {/* Logout */}
          <IconButton
            onClick={handleLogout}
            sx={{
              justifyContent: "flex-start",
              borderRadius: "12px",
              py: 1.5,
              px: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: APP_COLORS.error[50],
                transform: "translateX(5px)",
              },
            }}
          >
            <ExitToApp sx={{ fontSize: 24, color: APP_COLORS.error[500] }} />
            <Typography
              variant="body2"
              sx={{
                ml: 2,
                fontFamily: "Roboto, sans-serif",
                fontSize: "1rem",
                fontWeight: 500,
                color: isDarkMode ? APP_COLORS.grey[200] : APP_COLORS.grey[800],
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

export default HomeSidebar;