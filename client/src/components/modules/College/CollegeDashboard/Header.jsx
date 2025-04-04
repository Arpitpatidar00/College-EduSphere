import React from "react";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import { CalendarToday, Chat, ArrowDropDown } from "@mui/icons-material";

const Header = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
            }}
        >
            <Typography variant="h4">Good morning, EduSphere College!</Typography>
            <Box>
                <IconButton>
                    <CalendarToday />
                </IconButton>
                <IconButton>
                    <Chat />
                </IconButton>
                <IconButton>
                    <Avatar alt="College" src="/path/to/college-logo.jpg" />
                    <ArrowDropDown />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Header;