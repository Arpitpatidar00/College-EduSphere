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
import { ROUTES } from '../../Global/Routes/CommonRoutes';
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
        px: { xs: 1, sm: 2 },
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo */}
        <Box
          component="img"
          src={APP_IMAGES.EDU_SPHERE_LOGO}
          onClick={handleHomeClick}
          sx={{
            cursor: "pointer",
            width: { xs: "120px", sm: "160px" },
            height: "auto",
            objectFit: "contain",
          }}
        />

        {/* Mobile Menu Icon */}
        <IconButton sx={{ display: { sm: "none" } }} onClick={handleToggleMobileMenu}>
          <MenuIcon sx={{ color: APP_COLORS.common.white }} />
        </IconButton>

        <Box
          sx={{
            display: { xs: mobileOpen ? "flex" : "none", sm: "flex" },
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 2,
            position: { xs: "absolute", sm: "static" },
            top: 64,
            right: 0,
            width: { xs: "100%", sm: "auto" },
            backgroundColor: { xs: APP_COLORS.primary[900], sm: "transparent" },
            p: { xs: 2, sm: 0 },
          }}
        >
          {isAuthenticated ? (
            <>


              {/* User Actions */}
              <IconButton sx={{ color: APP_COLORS.common.white }}>
                <Badge badgeContent={2} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              <IconButton onClick={handleMessageClick} sx={{ color: APP_COLORS.common.white }}>
                <Badge badgeContent={2} color="error">
                  <Chat />
                </Badge>
              </IconButton>
              <Button
                onClick={handleAccountClick}
                sx={{ p: 0, minWidth: "auto", borderRadius: "50%" }}
              >
                <Avatar
                  src={userData?.profilePicture ? transformImagePath(userData.profilePicture) : "/assets/Student.login1.png"}
                  alt={userData?.firstName || userData.institutionName}
                />
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              sx={{ backgroundColor: APP_COLORS.secondary[500] }}
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