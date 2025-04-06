import { Box, IconButton } from "@mui/material";
import { CallEnd } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable"; // Ensure this is installed: npm install react-draggable

const VideoCall = ({ localStreamRef, remoteStreamRef, onEndCall }) => {
    // State for local video position
    const [localPosition, setLocalPosition] = useState({ x: 0, y: 0 });
    const localVideoRef = useRef(null);

    // Ensure video elements are loaded and streams are applied
    useEffect(() => {
        if (remoteStreamRef.current && remoteStreamRef.current.srcObject) {
            remoteStreamRef.current.play().catch((error) => console.error("Error playing remote video:", error));
        }
        if (localStreamRef.current && localStreamRef.current.srcObject) {
            localStreamRef.current.play().catch((error) => console.error("Error playing local video:", error));
        }
    }, [remoteStreamRef, localStreamRef]);

    // Handle drag stop to update local video position
    const handleDragStop = (e, data) => {
        setLocalPosition({ x: data.x, y: data.y });
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                position: "relative",
                height: "100%", // Ensure full height
                overflow: "hidden",
                backgroundColor: "#000", // Consistent black background
            }}
        >
            {/* Remote Video (Fixed) */}
            <Box
                sx={{
                    width: { xs: "100%", md: "80%", lg: "60%" }, // Responsive width
                    maxHeight: { xs: "100%" }, // Responsive height
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 3,
                    margin: "auto", // Center the video
                }}
            >
                <video
                    ref={remoteStreamRef}
                    autoPlay
                    playsInline
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", // Ensure video fills container
                        backgroundColor: "#000",
                    }}
                />
            </Box>

            {/* Local Video (Draggable) */}
            <Draggable
                position={localPosition}
                onStop={handleDragStop}
                bounds="parent" // Restrict movement within parent
                handle=".drag-handle" // Define drag handle
            >
                <Box
                    ref={localVideoRef}
                    sx={{
                        position: "absolute",
                        width: { xs: "100px", md: "150px", lg: "200px" }, // Responsive width
                        height: { xs: "75px", md: "112.5px", lg: "150px" }, // Proportional height
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: 2,
                        backgroundColor: "#000",
                        zIndex: 10, // Ensure it stays above remote video
                        cursor: "move", // Indicate draggable
                        "&:hover": { boxShadow: 4 }, // Enhance feedback on hover
                    }}
                >
                    <Box className="drag-handle" sx={{ width: "100%", height: "100%" }}>
                        <video
                            ref={localStreamRef}
                            autoPlay
                            playsInline
                            muted
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </Box>
                </Box>
            </Draggable>

            {/* End Call Button */}
            <IconButton
                onClick={onEndCall}
                sx={{
                    position: "absolute",
                    bottom: { xs: 10, md: 20 },
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "red",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "#cc0000",
                    },
                    padding: 1.5,
                    zIndex: 10,
                }}
            >
                <CallEnd sx={{ fontSize: { xs: 24, md: 32 } }} />
            </IconButton>
        </Box>
    );
};

export default VideoCall;