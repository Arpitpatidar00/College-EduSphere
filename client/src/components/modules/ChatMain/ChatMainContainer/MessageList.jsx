// MessageList.jsx
import { Box, Typography } from "@mui/material";
import { APP_COLORS } from '../../../../enums/Colors';

const MessageList = ({ messages, chatContainerRef }) => (
    <Box ref={chatContainerRef} sx={{ flex: 1, overflowY: "auto", padding: 2 }}>
        {messages.map((msg) => (
            <Box key={msg.id} sx={{ display: "flex", justifyContent: msg.sender === "self" ? "flex-end" : "flex-start" }}>
                <Typography sx={{
                    padding: "10px 15px",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    backgroundColor: msg.sender === "self" ? APP_COLORS.primary[500] : APP_COLORS.accent[300],
                    color: msg.sender === "self" ? "white" : "inherit",
                    margin: "5px",
                    maxWidth: "70%",
                    wordWrap: "break-word",
                }}>
                    {msg.content}
                </Typography>
            </Box>
        ))}
    </Box>
);

export default MessageList;