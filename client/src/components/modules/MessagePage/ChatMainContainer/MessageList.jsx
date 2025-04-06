import { Box, Typography } from "@mui/material";
import { APP_COLORS } from "../../../../enums/Colors";

const MessageList = ({ messages, chatContainerRef, userId, typingIndicator, conversationUser }) => {
    return (
        <Box
            ref={chatContainerRef}
            sx={{
                flex: 1,
                overflowY: "auto",
                padding: 2,
                backgroundColor: "#f5f5f5",
                display: "flex",
                flexDirection: "column",
                gap: 1,
            }}
        >
            {messages.map((msg) => {
                const isSelf = msg.senderId === userId;
                return (
                    <Box
                        key={msg._id}
                        sx={{
                            display: "flex",
                            justifyContent: isSelf ? "flex-end" : "flex-start",
                        }}
                    >
                        <Typography
                            sx={{
                                padding: "10px 15px",
                                borderRadius: "20px",
                                fontSize: "0.9rem",
                                fontWeight: "bold",
                                backgroundColor: isSelf
                                    ? APP_COLORS.primary[500]
                                    : APP_COLORS.accent[300],
                                color: isSelf ? "white" : "inherit",
                                margin: "5px",
                                maxWidth: "70%",
                                wordWrap: "break-word",
                                boxShadow: 1,
                            }}
                        >
                            {msg.content}
                        </Typography>
                    </Box>
                );
            })}
            {typingIndicator && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        margin: "5px 10px",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "0.85rem",
                            fontStyle: "italic",
                            color: "#666",
                        }}
                    >
                        {conversationUser.username || "User"} is typing...
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default MessageList;
