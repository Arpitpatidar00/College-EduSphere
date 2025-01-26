import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Button,
  InputBase,
  Badge,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleAccountClick = () => {
    navigate("/profile");
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, fontFamily: 'Courier New, monospace' }}>
          EduShere
        </Typography>

        {/* Search Box */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #3f51b5', // Unified border
            borderRadius: '4px',
            mr: 2,
          }}
        >
          <InputBase
            placeholder="Search..."
            sx={{
              ml: 1,
              mr: 1,
              flex: 1, // Takes full width
              backgroundColor: 'transparent', // Ensure no background
              '&:focus': {
                outline: 'none', // Remove default outline on focus
              },
            }}
          />
          <IconButton
            sx={{
              color: '#3f51b5',
              '&:hover': {
                backgroundColor: 'rgba(63, 81, 181, 0.1)', // Hover effect
              },
            }}
            aria-label="search button"
          >
            <SearchIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton>
          <Badge
              badgeContent={2} // Number of notifications
              color="error" // Use error color for the badge
              overlap="circular"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <NotificationsIcon />
            </Badge>            
          </IconButton>
          <IconButton>
          <Badge
              badgeContent={2} // Number of messages
              color="error" // Use error color for the badge
              overlap="circular"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <ChatIcon />
            </Badge>            
          </IconButton>
          <Button onClick={handleAccountClick}>
            <Avatar src="https://randomuser.me/api/portraits/women/19.jpg" />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
