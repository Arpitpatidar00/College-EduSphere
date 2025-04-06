import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Button,
  Badge,
} from "@mui/material";
import {
  Notifications,
  Chat,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { APP_COLORS } from "../../../enums/Colors";
import { APP_IMAGES } from "../../Common/Images/index";
import { transformImagePath } from "../../../utils/commonFn";
import { selectUserData, selectIsAuthenticated } from "../../../store/slices/auth.slice";
import { ROUTES } from "../../Global/Routes/CommonRoutes";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const userData = useSelector(selectUserData);

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleMobileMenu = () => setMobileOpen(!mobileOpen);
  const handleAccountClick = () => navigate(ROUTES.HOME.PROFILE);
  const handleMessageClick = () => navigate(ROUTES.HOME.MESSAGE);
  const handleHomeClick = () => navigate(ROUTES.HOME.INDEX);
  const handleLoginClick = () => navigate(ROUTES.AUTH.STUDENT);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: APP_COLORS.primary[700],
        boxShadow: 3,
        px: { xs: 1, sm: 2, md: 3 },
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: { xs: 56, sm: 64 }, // Adjust height for mobile
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src={APP_IMAGES.EDU_SPHERE_LOGO}
          onClick={handleHomeClick}
          sx={{
            cursor: "pointer",
            width: { xs: "100px", sm: "120px", md: "160px" },
            height: "auto",
            objectFit: "contain",
            maxHeight: { xs: 40, sm: 50 }, // Cap height on small screens
          }}
        />

        {/* Mobile Menu Icon */}
        <IconButton
          sx={{ display: { sm: "none" }, color: APP_COLORS.common.white }}
          onClick={handleToggleMobileMenu}
        >
          <MenuIcon />
        </IconButton>

        {/* Desktop and Mobile Menu */}
        <Box
          sx={{
            display: { xs: mobileOpen ? "flex" : "none", sm: "flex" },
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: { xs: 1.5, sm: 2 },
            position: { xs: "fixed", sm: "static" },
            top: { xs: 0, sm: "auto" },
            left: { xs: 0, sm: "auto" },
            right: { xs: 0, sm: "auto" },
            bottom: { xs: 0, sm: "auto" },
            width: { xs: "100%", sm: "auto" },
            height: { xs: "100vh", sm: "auto" },
            backgroundColor: {
              xs: APP_COLORS.primary[900],
              sm: "transparent",
            },
            p: { xs: 2, sm: 0 },
            boxShadow: { xs: 5, sm: 0 }, // Add shadow on mobile menu
            zIndex: 1200,
            overflowY: { xs: "auto", sm: "visible" }, // Allow scrolling if content overflows
            "&::-webkit-scrollbar": {
              display: "none", // Hide scrollbar on mobile
            },
            "scrollbar-width": "none", // Firefox
            "-ms-overflow-style": "none", // IE and Edge
          }}
        >
          {isAuthenticated ? (
            <>
              {/* User Actions */}
              <IconButton sx={{ color: APP_COLORS.common.white }}>
                <Badge badgeContent={2} color="error">
                  <Notifications sx={{ fontSize: { xs: 20, sm: 24 } }} />
                </Badge>
              </IconButton>
              <IconButton
                onClick={handleMessageClick}
                sx={{ color: APP_COLORS.common.white }}
              >
                <Badge badgeContent={2} color="error">
                  <Chat sx={{ fontSize: { xs: 20, sm: 24 } }} />
                </Badge>
              </IconButton>
              <Button
                onClick={handleAccountClick}
                sx={{
                  p: 0,
                  minWidth: "auto",
                  borderRadius: "50%",
                }}
              >
                <Avatar
                  sx={{ width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 } }}
                  src={
                    transformImagePath(userData.profilePicture
                    )
                      ? transformImagePath(userData.profilePicture)
                      : "/assets/Student.login1.png"
                  }
                  alt={userData?.firstName || userData.institutionName}
                />
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              sx={{
                backgroundColor: APP_COLORS.primary[500],
                color: APP_COLORS.common.white,
                "&:hover": {
                  backgroundColor: APP_COLORS.primary[700],
                },
                fontSize: { xs: 12, sm: 14 },
                px: { xs: 1.5, sm: 2 },
              }}
              onClick={handleLoginClick}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;