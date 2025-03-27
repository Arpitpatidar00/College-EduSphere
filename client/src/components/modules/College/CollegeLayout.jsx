import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import CollegeSidebar from "./CollegeSidebar/index";

const navigationItems = [
    { label: "Dashboard", icon: "Home", path: "/" },
    { label: "Analytics", icon: "Analytics", path: "/analytics" },
    { label: "Email", icon: "Email", path: "/email" },
    { label: "People", icon: "People", path: "/people" },
    { label: "Money", icon: "Money", path: "/money" },
    { label: "Settings", icon: "Settings", path: "/settings" },
];

const CollegeLayout = () => {
    return (
        <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
            {/* Sidebar with fixed width */}
            <Box sx={{ width: 40, flexShrink: 0 }}>
                <CollegeSidebar navigationItems={navigationItems} />
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 4, backgroundColor: "#E8ECEF", height: "calc(100vh - 64px)" }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default CollegeLayout;
