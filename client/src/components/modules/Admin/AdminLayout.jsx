import { useState } from "react";
import {
    Box,
    Drawer,
    IconButton,
    useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import Sidebar from '../Admin/AdminSidebar/Sidebar';

const DRAWER_WIDTH = 260;
const COLLAPSED_WIDTH = 80;

const AdminLayout = () => {
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSidebarToggle = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    return (
        <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        width: DRAWER_WIDTH,
                        boxSizing: "border-box",
                    },
                }}
            >
                <Sidebar collapsed={false} onToggle={handleSidebarToggle} />
            </Drawer>

            {/* Desktop Sidebar */}
            <Box
                sx={{
                    display: { xs: "none", sm: "block" },
                    width: sidebarCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
                    flexShrink: 0,
                    height: "calc(100vh - 64px)",
                    transition: theme.transitions.create("width", {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                }}
            >
                <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
            </Box>

            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: {
                        xs: "100%",
                        sm: `calc(100% - ${sidebarCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH}px)`,
                    },
                    height: "calc(100vh - 64px)",
                    bgcolor: theme.palette.background.default,
                    transition: theme.transitions.create(["width"], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                }}
            >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{
                        display: { sm: "none" },
                        position: "fixed",
                        top: 16,
                        left: 16,
                        zIndex: 1300,
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Outlet /> {/* Render nested admin routes here */}
            </Box>
        </Box>
    );
};

export default AdminLayout;