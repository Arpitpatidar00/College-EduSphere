import { Box, Typography, Avatar, Stack } from "@mui/material";
import { APP_COLORS } from "../../../enums/Colors";

const MessageList = ({ sx, ...props }) => {
    // Dummy messages data
    const messages = [
        {
            id: 1,
            avatar: "/images/user1.jpg", // Replace with your actual image path
            username: "Alice",
            message: "Hello there!",
        },
        {
            id: 2,
            avatar: "/images/user2.jpg", // Replace with your actual image path
            username: "Bob",
            message: "How are you?",
        },
        {
            id: 3,
            avatar: "/images/user3.jpg", // Replace with your actual image path
            username: "Charlie",
            message: "Let's meet soon.",
        },
        {
            id: 4,
            avatar: "/images/user1.jpg", // Replace with your actual image path
            username: "Alice",
            message: "Hello there!",
        },
        {
            id: 5,
            avatar: "/images/user2.jpg", // Replace with your actual image path
            username: "Bob",
            message: "How are you?",
        },
        {
            id: 6,
            avatar: "/images/user3.jpg", // Replace with your actual image path
            username: "Charlie",
            message: "Let's meet soon.",
        },
        {
            id: 7,
            avatar: "/images/user1.jpg", // Replace with your actual image path
            username: "Alice",
            message: "Hello there!",
        },
        {
            id: 8,
            avatar: "/images/user2.jpg",
            username: "Bob",
            message: "How are you?",
        },
        {
            id: 9,
            avatar: "/images/user3.jpg",
            username: "Charlie",
            message: "Let's meet soon.",
        },
        {
            id: 10,
            avatar: "/images/user1.jpg",
            username: "Alice",
            message: "Hello there!",
        },
        {
            id: 11,
            avatar: "/images/user2.jpg",
            username: "Bob",
            message: "How are you?",
        },
        {
            id: 12,
            avatar: "/images/user3.jpg",
            username: "Charlie",
            message: "Let's meet soon.",
        },
    ];

    return (
        <Box
            sx={{
                p: 3,
                height: "calc(100vh - 200px)",

                backgroundColor: APP_COLORS.common.white,
                borderRadius: "12px",
                boxShadow: `0px 2px 5px ${APP_COLORS.primary[100]}`,
                ...sx,
            }}
            {...props}
        >
            <Typography variant="h6" sx={{ mb: 1 }}>
                Messages
            </Typography>
            {messages.map((msg) => (
                <Stack
                    key={msg.id}
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ p: 1, borderBottom: `1px solid ${APP_COLORS.common.white}` }}
                >
                    <Avatar src={msg.avatar} alt={msg.username} />
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {msg.username}
                        </Typography>
                        <Typography variant="body2">{msg.message}</Typography>
                    </Box>
                </Stack>
            ))}
        </Box>
    );
};

export default MessageList;
