import { Box, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"; // Keeping MUI icons for these
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing from react-icons
import { useState } from "react";
import { APP_COLORS } from "../../../enums/Colors";

const Sidebar = ({ activeView, onChangeView }) => {
    const [isOpen, setIsOpen] = useState(false);

    const iconButtonStyles = {
        transition: "all 0.3s ease",
        "&:hover": {
            backgroundColor: APP_COLORS.primary[50],
            color: APP_COLORS.common.black,
        },
        mb: 2,
    };

    return (
        <>
            {/* Toggle Button (Always Visible) */}
            <IconButton
                onClick={() => setIsOpen(prev => !prev)}
                sx={{
                    position: "fixed",
                    bottom: 70,
                    left: isOpen ? "110px" : "20px",
                    zIndex: 1301,
                    backgroundColor: APP_COLORS.primary[600],
                    color: APP_COLORS.common.white,
                    "&:hover": {
                        backgroundColor: APP_COLORS.primary[700],
                    },
                    transition: "left 0.3s ease",
                }}
            >
                {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
            </IconButton>

            {/* Sidebar */}
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: isOpen ? 0 : "-120px", // Hidden off-screen
                    height: "100vh",
                    width: "100px",
                    backgroundColor: APP_COLORS.primary[600],
                    borderRadius: "0 20px 20px 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "16px",
                    color: APP_COLORS.common.white,
                    transition: "left 0.3s ease",
                    zIndex: 1300,
                }}
            >
                <IconButton
                    onClick={() => onChangeView("home")}
                    sx={{
                        ...iconButtonStyles,
                        color: activeView === "home" ? "yellow" : "white",
                    }}
                >
                    <HomeIcon fontSize="large" />
                </IconButton>

                <IconButton
                    onClick={() => onChangeView("message")}
                    sx={{
                        ...iconButtonStyles,
                        color: activeView === "message" ? "yellow" : "white",
                    }}
                >
                    <MessageIcon fontSize="large" />
                </IconButton>

                <IconButton
                    onClick={() => onChangeView("person")}
                    sx={{
                        ...iconButtonStyles,
                        color: activeView === "person" ? "yellow" : "white",
                    }}
                >
                    <PersonIcon fontSize="large" />
                </IconButton>
            </Box>
        </>
    );
};

export default Sidebar;