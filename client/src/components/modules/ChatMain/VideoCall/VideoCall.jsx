import { Box, IconButton } from "@mui/material";
import { CallEnd } from "@mui/icons-material";

const VideoCall = ({ localStreamRef, remoteStream, onEndCall }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
                position: "relative",
            }}
        >
            {/* Remote Video */}
            <video
                ref={remoteStream}
                autoPlay
                playsInline
                style={{
                    width: "100%",
                    maxHeight: "60vh",
                    background: "black",
                }}
            />

            {/* Local Video */}
            <video
                ref={localStreamRef}
                autoPlay
                playsInline
                muted
                style={{
                    width: "200px",
                    height: "150px",
                    position: "absolute",
                    bottom: 20,
                    right: 20,
                    borderRadius: "10px",
                    background: "black",
                }}
            />

            <IconButton onClick={onEndCall} sx={{ marginTop: 2, backgroundColor: "red", color: "white" }}>
                <CallEnd />
            </IconButton>
        </Box>
    );
};

export default VideoCall;
