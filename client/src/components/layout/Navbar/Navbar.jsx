import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Button,
  InputBase,
  Badge,
} from "@mui/material";
import {
  Search as SearchIcon,
  Notifications,
  Chat,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { APP_COLORS } from "../../../enums/Colors";
import { APP_IMAGES } from "../../Common/Images/index";
import { transformImagePath } from "../../../utils/commonFn";
import { selectUserData, selectIsAuthenticated } from "../../../store/slices/auth.slice";
import { ROUTES } from '../../Global/Routes/CommonRoutes';

const Navbar = () => {
  const navigate = useNavigate();
  const userData = useSelector(selectUserData);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleAccountClick = () => navigate(ROUTES.HOME.PROFILE);
  const handleMessageClick = () => navigate(ROUTES.HOME.MESSAGE);
  const handleHomeClick = () => navigate(ROUTES.HOME.INDEX);
  const handleLoginClick = () => navigate(ROUTES.AUTH.STUDENT);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: APP_COLORS.primary[500],
        boxShadow: 3,
        px: 2,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src={APP_IMAGES.EDU_SPHERE_LOGO}
          onClick={handleHomeClick}
          sx={{
            cursor: "pointer",
            width: "160px",
            height: "auto",
            maxHeight: "80px",
            objectFit: "contain",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />

        {/* Conditionally Render Navbar Based on Authentication */}
        {isAuthenticated ? (
          <>
            {/* Search Bar */}
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 2,
                  bgcolor: APP_COLORS.grey[800],
                  px: 1,
                  py: 0.5,
                  width: "250px",
                  border: `1px solid ${APP_COLORS.grey[500]}`,
                }}
              >
                <InputBase
                  placeholder="Search..."
                  sx={{
                    flex: 1,
                    fontSize: 14,
                    px: 1,
                    color: APP_COLORS.common.white,
                  }}
                />
                <IconButton sx={{ color: APP_COLORS.common.white }}>
                  <SearchIcon />
                </IconButton>
              </Box>
            </Box>

            {/* User Actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                sx={{
                  p: 0,
                  minWidth: "auto",
                  borderRadius: "50%",
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              >
                <Avatar
                  src={userData?.profilePicture ? transformImagePath(userData.profilePicture) : "/assets/Student.login1.png"}
                  alt={userData?.firstName ?? "User"}
                />
              </Button>
            </Box>
          </>
        ) : (
          <>
            {/* If Not Authenticated, Show Login & Signup Buttons */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                sx={{ color: APP_COLORS.common.white, borderColor: APP_COLORS.common.white }}
                onClick={handleLoginClick}
              >
                Login
              </Button>

            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
