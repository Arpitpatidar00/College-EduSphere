import { useState, useRef, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import Draggable from "react-draggable";

const SidebarWrapper = ({ children, open, onToggle }) => {
    const [buttonPosition, setButtonPosition] = useState({ x: 16, y: 90 });
    const dragState = useRef({ isDragging: false, startX: 0, startY: 0 });
    const sidebarRef = useRef(null);
    const iconButtonRef = useRef(null);

    // ✅ Update bounds on resize
    useEffect(() => {
        const handleResize = () => {
            const { innerWidth, innerHeight } = window;
            const maxX = innerWidth - 64; // Icon size + padding
            const maxY = innerHeight - 64;

            setButtonPosition((pos) => ({
                x: Math.min(pos.x, maxX),
                y: Math.min(pos.y, maxY),
            }));
        };

        handleResize(); // initial check
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // ✅ Close sidebar on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                open &&
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                onToggle();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open, onToggle]);

    const handleDragStart = (e, data) => {
        dragState.current = { isDragging: false, startX: data.x, startY: data.y };
    };

    const handleDrag = (e, data) => {
        const distance = Math.hypot(data.x - dragState.current.startX, data.y - dragState.current.startY);
        if (distance > 5) dragState.current.isDragging = true;
    };

    const handleDragStop = (e, data) => {
        if (!dragState.current.isDragging) {
            onToggle(); // click
        } else {
            setButtonPosition({ x: data.x, y: data.y }); // drag
        }
    };

    return (
        <>
            {/* 🔘 Draggable Toggle Button */}
            <Draggable
                bounds={{
                    left: 8,
                    top: 64,
                    right: window.innerWidth - 64,
                    bottom: window.innerHeight - 64,
                }}
                position={buttonPosition}
                onStart={handleDragStart}
                onDrag={handleDrag}
                onStop={handleDragStop}
            >
                <Box
                    sx={{
                        position: "fixed",
                        zIndex: 2000,
                        width: 56,
                        height: 56,
                        pointerEvents: "none", // Allow IconButton to be clickable
                    }}
                >
                    <IconButton
                        ref={iconButtonRef}
                        sx={{
                            width: 56,
                            height: 56,
                            boxShadow: 3,
                            backgroundColor: "#fff",
                            "&:hover": { backgroundColor: "#f5f5f5" },
                            pointerEvents: "auto",
                            touchAction: "none", // prevent iOS zoom
                        }}
                    >
                        <ManageSearchIcon />
                    </IconButton>
                </Box>
            </Draggable>

            {/* 📂 Sidebar */}
            <Box
                ref={sidebarRef}
                sx={{
                    position: { xs: "fixed", md: "relative" },
                    top: { xs: 64, md: 0 },
                    left: 0,
                    height: "calc(100vh - 64px)",
                    width: { xs: open ? "80%" : "0", md: open ? "400px" : "0" },
                    p: open ? 2 : 0,
                    zIndex: 1500,
                    overflowY: "auto",
                    transform: {
                        xs: open ? "translateX(0)" : "translateX(-100%)",
                        md: "none",
                    },
                    transition: "width 0.3s ease, transform 0.3s ease",
                    visibility: open ? "visible" : "hidden",
                }}
            >
                {children}
            </Box>
        </>
    );
};

export default SidebarWrapper;
