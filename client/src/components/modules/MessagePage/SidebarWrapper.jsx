import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Draggable from "react-draggable";
const SidebarWrapper = ({ children, open, onToggle }) => {
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

    const handleDragStop = (e, data) => {
        setButtonPosition({ x: data.x, y: data.y });
    };

    const handleClick = (e) => {
        e.stopPropagation();
        onToggle();
    };

    const getInitialLeft = () => {
        if (open) {
            if (window.innerWidth < 600) return "calc(80% - 5px)"; // xs
            if (window.innerWidth < 900) return "calc(60% - 24px)"; // sm
            if (window.innerWidth < 1200) return 410; // md
            return 410; // lg
        }
        return 16;
    };

    return (
        <>
            <Draggable
                position={buttonPosition}
                onStop={handleDragStop}
                bounds="parent"
                onMouseDown={(e) => e.stopPropagation()} // Prevent drag from interfering with click
            >
                <IconButton
                    onClick={handleClick} // Use custom click handler
                    sx={{
                        position: "absolute",
                        top: 90,
                        left: getInitialLeft(), // Initial position based on screen size
                        zIndex: 1300,
                        boxShadow: 2,
                        "&:hover": { backgroundColor: "#f5f5f5" },
                        transition: "left 0.3s ease-in-out",
                        cursor: "move",
                    }}
                >
                    {open ? <CloseOutlinedIcon /> : <ManageSearchIcon />}
                </IconButton>
            </Draggable>

            {/* Sidebar Container */}
            <Box
                sx={{
                    position: { xs: "fixed", md: "relative" },
                    top: { xs: 64, md: 0 },
                    left: { xs: 0, md: 0 },
                    height: { xs: "calc(100vh - 64px)", md: "calc(100vh - 64px)" },
                    width: { xs: open ? "80%" : "0", md: open ? "400px" : "0" },
                    p: open ? 2 : 0,
                    zIndex: 1200,
                    overflowY: "auto",
                    transform: { xs: open ? "translateX(0)" : "translateX(-100%)", md: "none" },
                    transition: "width 0.3s ease-in-out, transform 0.3s ease-in-out",
                    visibility: open ? "visible" : "hidden",
                }}
            >
                {children}
            </Box>
        </>
    );
};

export default SidebarWrapper;