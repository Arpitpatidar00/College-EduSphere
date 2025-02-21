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
import { APP_COLORS } from "../../../enums/Colors";
import { APP_IMAGES } from '../../Common/Images/index';

const Navbar = () => {
  const navigate = useNavigate();

  const handleAccountClick = () => navigate("/profile");
  const handleMessageClick = () => navigate("/message");
  const handleHomeClick = () => navigate("/");



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
        <Box
          component="img"
          src={APP_IMAGES.EDU_SPHERE_LOGO}
          onClick={handleHomeClick}
          sx={{
            cursor: 'pointer',
            width: "160px",
            height: "auto",
            maxHeight: "80px",
            objectFit: "contain",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
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

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton sx={{ color: APP_COLORS.common.white }}>
            <Badge badgeContent={2} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton
            onClick={handleMessageClick}
            sx={{ color: APP_COLORS.common.white }}
          >
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
            <Avatar src="https://randomuser.me/api/portraits/women/19.jpg" />
          </Button>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
