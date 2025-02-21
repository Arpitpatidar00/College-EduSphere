
import { Box, Typography, Avatar, IconButton, TextField } from "@mui/material";
import { Call, Videocam, ErrorOutline, Send, EmojiEmotions } from "@mui/icons-material";
import AttachFileIcon from '@mui/icons-material/AttachFile';

import { APP_COLORS } from "../../../enums/Colors";

const MessageContainer = () => {
    return (
        <Box
            sx={{
                bgcolor: APP_COLORS.common.white,

                display: "flex",
                flexDirection: "column",
                height: "100vh",
                color: "white",
                padding: 2,
                borderRadius: 4,
                border: `1px solid ${APP_COLORS.common.black}`,


            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: APP_COLORS.common.black,
                    padding: 2,
                    borderRadius: 3,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar src="https://imgv3.fotor.com/images/slider-image/A-blurry-image-of-a-woman-wearing-red.jpg" />
                    <Box>
                        <Typography sx={{ fontWeight: "bold" }}>Aman 💖</Typography>
                        <Typography sx={{ fontSize: "0.8rem", color: "#aaa" }}>Active 1 min ago.</Typography>
                    </Box>
                </Box>
                <Box>
                    <IconButton sx={{ color: APP_COLORS.common.white }}>
                        <Call />
                    </IconButton>
                    <IconButton sx={{ color: APP_COLORS.common.white }}>
                        <Videocam />
                    </IconButton>
                    <IconButton sx={{ color: APP_COLORS.common.white }}>
                        <ErrorOutline />
                    </IconButton>
                </Box>
            </Box>

            {/* Chat Messages */}
            <Box sx={{ flex: 1, padding: 2, overflowY: "auto" }}>
                {/* Incoming Message */}
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 2 }}>
                    <Avatar src="https://imgv3.fotor.com/images/slider-image/A-blurry-image-of-a-woman-wearing-red.jpg" />
                    <Box
                        sx={{
                            backgroundColor: APP_COLORS.common.black,
                            padding: "10px 15px",
                            borderRadius: "20px 20px 40px 5px",
                            fontSize: "0.9rem",
                            maxWidth: "60%",
                            color: APP_COLORS.common.white,
                            fontWeight: "bold",
                            position: "relative",
                            wordBreak: "break-word",

                        }}
                    >
                        Hi, how are you? 😁 This is a longer message to test the wrapping and see how it looks. It should wrap nicely without breaking words unnecessarily.
                    </Box>
                </Box>

                {/* Outgoing Message */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                    <Box
                        sx={{
                            backgroundColor: APP_COLORS.background,
                            padding: "10px 15px",
                            borderRadius: "20px 20px 40px 5px",
                            fontSize: "0.9rem",
                            maxWidth: "60%",
                            color: "black",
                            fontWeight: "bold",
                            position: "relative",
                            wordBreak: "break-word",

                        }}
                    >
                        I’m doing well.. 😎 This is an example of a reply message that is also quite long to demonstrate text wrapping.
                    </Box>
                </Box>

                {/* Image Message */}
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 2 }}>
                    <Avatar src="https://imgv3.fotor.com/images/slider-image/A-blurry-image-of-a-woman-wearing-red.jpg" />
                    <img
                        src="https://imgv3.fotor.com/images/slider-image/A-blurry-image-of-a-woman-wearing-red.jpg"
                        alt="Sent"
                        style={{ borderRadius: 10, width: "150px", height: "150px" }}
                    />
                </Box>

                {/* Another Incoming Message */}
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                    <Avatar src="https://imgv3.fotor.com/images/slider-image/A-blurry-image-of-a-woman-wearing-red.jpg" /> {/* Use consistent avatar */}
                    <Box
                        sx={{
                            backgroundColor: APP_COLORS.common.black,
                            padding: "10px 15px",
                            borderRadius: "20px 20px 40px 5px",
                            fontSize: "0.9rem",
                            maxWidth: "60%",
                            color: APP_COLORS.common.white,
                            fontWeight: "bold",
                            position: "relative",
                            wordBreak: "break-word",

                        }}
                    >
                        How is This? Here's some more text to see how it wraps within the message bubble.
                    </Box>
                </Box>

            </Box>

            {/* Message Input */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: 1.2,
                    backgroundColor: APP_COLORS.common.black,
                    borderRadius: 3,
                }}
            >
                <IconButton sx={{
                    color: APP_COLORS.common.white
                }}>
                    <EmojiEmotions />
                </IconButton>
                <IconButton sx={{ color: APP_COLORS.common.white }}>
                    <AttachFileIcon />
                </IconButton>
                <TextField
                    fullWidth
                    placeholder="Type your message....."
                    sx={{
                        backgroundColor: APP_COLORS.common.black,
                        borderRadius: 6,
                        input: { color: APP_COLORS.common.white },
                        border: "1px solid", color: APP_COLORS.common.white,

                    }}
                />
                <IconButton sx={{ color: APP_COLORS.common.white }}>
                    <Send />
                </IconButton>
            </Box>
        </Box>
    );
};

export default MessageContainer;
