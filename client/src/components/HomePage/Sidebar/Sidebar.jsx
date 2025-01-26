import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Card,
  CardContent,
  Avatar,
  Box,
  Typography,
  IconButton,
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
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 2, mt: 2 }}>
        <Avatar
          src="https://randomuser.me/api/portraits/women/19.jpg"
          sx={{ margin: "0 auto" }}
        />
        <Typography variant="h6" sx={{ fontFamily: "Georgia, serif" }}>
          Sam Lanson
        </Typography>
      </Box>

      {/* Navigation Links */}
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <IconButton
            onClick={() => console.log("Favorites clicked")}
            sx={{ justifyContent: "flex-start" }}
          >
            <Feed sx={{ ml: 1 }} />
            <Typography
              variant="body2"
              sx={{
                ml: 2,
                fontFamily: "Arial, sans-serif",
                fontSize: "1.2rem",
              }}
            >
              Favorites
            </Typography>
          </IconButton>
          <IconButton
            onClick={() => console.log("Likes clicked")}
            sx={{ justifyContent: "flex-start" }}
          >
            <Group sx={{ ml: 1 }} />
            <Typography
              variant="body2"
              sx={{
                ml: 2,
                fontFamily: "Arial, sans-serif",
                fontSize: "1.2rem",
              }}
            >
              Likes
            </Typography>
          </IconButton>
          <IconButton
            onClick={() => console.log("Saved clicked")}
            sx={{ justifyContent: "flex-start" }}
          >
            <Save sx={{ ml: 1 }} />
            <Typography
              variant="body2"
              sx={{
                ml: 2,
                fontFamily: "Arial, sans-serif",
                fontSize: "1.2rem",
              }}
            >
              Saved
            </Typography>
          </IconButton>
          <IconButton
            onClick={() => console.log("Collections clicked")}
            sx={{ justifyContent: "flex-start" }}
          >
            <Archive sx={{ ml: 1 }} />
            <Typography
              variant="body2"
              sx={{
                ml: 2,
                fontFamily: "Arial, sans-serif",
                fontSize: "1.2rem",
              }}
            >
              Collections
            </Typography>
          </IconButton>
          <IconButton
            onClick={() => console.log("Settings clicked")}
            sx={{ justifyContent: "flex-start" }}
          >
            <Settings sx={{ ml: 1 }} />
            <Typography
              variant="body2"
              sx={{
                ml: 2,
                fontFamily: "Arial, sans-serif",
                fontSize: "1.2rem",
              }}
            >
              Settings
            </Typography>
          </IconButton>
          <IconButton
            onClick={toggleTheme}
            fullWidth
            sx={{ justifyContent: "flex-start" }}
          >
            {isDarkMode ? (
              <Brightness7 sx={{ ml: 1 }} />
            ) : (
              <Brightness4 sx={{ ml: 1 }} />
            )}{" "}
            {/* Change icon based on theme */}
            <Typography
              variant="body2"
              sx={{
                ml: 2,
                fontFamily: "Arial, sans-serif",
                fontSize: "1.2rem",
              }}
            >
              Theme
            </Typography>
          </IconButton>
          <IconButton
            onClick={() => console.log("About clicked")}
            fullWidth
            sx={{ justifyContent: "flex-start" }}
          >
            <Info sx={{ ml: 1 }} />
            <Typography
              variant="body2"
              sx={{
                ml: 2,
                fontFamily: "Arial, sans-serif",
                fontSize: "1.2rem",
              }}
            >
              About
            </Typography>
          </IconButton>
          <IconButton
            onClick={handleLogout}
            fullWidth
            sx={{ justifyContent: "flex-start" }}
          >
            <ExitToApp sx={{ ml: 1 }} />
            <Typography
              variant="body2"
              sx={{
                ml: 2,
                fontFamily: "Arial, sans-serif",
                fontSize: "1.2rem",
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
