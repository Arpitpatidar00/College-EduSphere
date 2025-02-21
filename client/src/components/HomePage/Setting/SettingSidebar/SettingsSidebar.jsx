import { Box, Typography, TextField } from "@mui/material";
import { Search, Person, Apps, Key, History, Security, Build, Logout } from "@mui/icons-material";
import { APP_COLORS } from '../../../../enums/Colors';

const SettingsSidebar = ({ selectedSection, setSelectedSection }) => {
    const menuItems = [
        { icon: <Person />, text: "Account" },
        { icon: <Apps />, text: "Apps and website" },
        { icon: <Key />, text: "Change Password" },
        { icon: <History />, text: "Activity log" },
        { icon: <Security />, text: "Privacy and Security" },
        { icon: <Build />, text: "Others" },
        { icon: <Logout />, text: "Log Out" },
    ];

    return (
        <Box
            sx={{
                height: "90vh",
                borderRight: `1px solid ${APP_COLORS.common.white}20`,
                p: 2,
                bgcolor: APP_COLORS.common.black,
                borderRadius: 4
            }}
        >
            {/* Search Bar */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: APP_COLORS.common.black,
                    borderRadius: 2,
                    mb: 4,
                    border: `1px solid ${APP_COLORS.common.white}30`,
                    p: 1,
                }}
            >
                <Search sx={{ color: APP_COLORS.common.white, mr: 1 }} />
                <TextField
                    fullWidth
                    placeholder="Search settings"
                    variant="standard"
                    InputProps={{
                        disableUnderline: true,
                        sx: { color: APP_COLORS.common.white },
                    }}
                />
            </Box>

            {/* Navigation Items */}
            {menuItems.map((item, index) => (
                <Box
                    key={index}
                    onClick={() => setSelectedSection(item.text)}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        borderRadius: 2,
                        cursor: "pointer",
                        mb: 1,
                        bgcolor: selectedSection === item.text ? "#ffeb3b" : "transparent",
                        color: selectedSection === item.text ? APP_COLORS.common.black : APP_COLORS.common.white,
                        "&:hover": {
                            bgcolor: selectedSection === item.text ? "#ffeb3b" : `${APP_COLORS.common.white}10`,
                        },
                    }}
                >
                    {item.icon}
                    <Typography sx={{ ml: 2, fontWeight: selectedSection === item.text ? "bold" : "normal" }}>
                        {item.text}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default SettingsSidebar;
