import { Box, List, ListItem, IconButton, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group"; // For Student Engagement (Community Hub)
import CampaignIcon from "@mui/icons-material/Campaign"; // For Promotions & Advertisements
import HubIcon from "@mui/icons-material/Hub"; // For Collaboration & Networking
import SchoolIcon from "@mui/icons-material/School"; // For Student Management
import SettingsIcon from "@mui/icons-material/Settings";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ROUTES from "@/components/Global/Routes/CommonRoutes";
import { APP_COLORS } from "@/enums/Colors";

// Sidebar Container
const SidebarContainer = styled(Box)({
  width: 80,
  height: "100vh",
  backgroundColor: APP_COLORS.primary[950],
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "20px",
  position: "fixed",
  justifyContent: "space-between",
  borderTopRightRadius: 40,
  paddingBottom: "20px",
});

// Styled List Item
const StyledListItem = styled(ListItem)(({ active }) => ({
  marginTop: 15,
  justifyContent: "center",
  py: 1.5,
  borderTopLeftRadius: "1000px",
  borderBottomLeftRadius: "1000px",
  backgroundColor: active ? APP_COLORS.accent[50] : "transparent",
  transition: "all 0.2s ease-in-out",
  "& .MuiIconButton-root": {
    color: active ? APP_COLORS.accent[400] : APP_COLORS.grey[100],
  },
  "&:hover": {
    backgroundColor: APP_COLORS.primary[600],
    "& .MuiIconButton-root": {
      color: APP_COLORS.accent[300],
    },
  },
  minHeight: 48,
}));

// Updated navigation items based on EduSphere features
const navigationItems = [
  { label: "Dashboard", path: ROUTES.COLLEGE.DASHBOARD, icon: <HomeIcon fontSize="large" /> },
  {
    label: "Community Hub", path: ROUTES.COLLEGE.STUDENT, icon: <GroupIcon fontSize="large" />
  }, // Student Engagement
  { label: "Events & Promotions", path: "/events-promotions", icon: <CampaignIcon fontSize="large" /> }, // Promotions & Advertisements
  { label: "Networking", path: ROUTES.COLLEGE.POST, icon: <HubIcon fontSize="large" /> }, // Collaboration & Networking
  { label: "Student Management", path: "/student-management", icon: <SchoolIcon fontSize="large" /> }, // Student Management
  { label: "Settings", path: "/settings", icon: <SettingsIcon fontSize="large" /> },
  { label: "Support", path: "/support", icon: <HeadsetMicIcon fontSize="large" /> },
];

const CollegeSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <SidebarContainer>
      <Box>
        <List>
          {navigationItems.map((item) => (
            <StyledListItem
              key={item.path}
              active={location.pathname === item.path ? 1 : 0}
              onClick={() => navigate(item.path)}
              sx={{ cursor: "pointer" }}
            >
              <IconButton>{item.icon}</IconButton>
            </StyledListItem>
          ))}
        </List>

        {/* Divider */}
        <Divider sx={{ width: "80%", backgroundColor: "white", marginY: "5px" }} />

        {/* Logout */}
        <StyledListItem>
          <IconButton sx={{ color: APP_COLORS.grey[100] }}>
            <ExitToAppIcon fontSize="large" />
          </IconButton>
        </StyledListItem>
      </Box>
    </SidebarContainer>
  );
};

export default CollegeSidebar;