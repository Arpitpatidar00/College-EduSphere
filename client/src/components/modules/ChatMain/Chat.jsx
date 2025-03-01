// src/components/Chat.jsx
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, TextField, IconButton, Avatar } from "@mui/material";
import { Send, AttachFile, EmojiEmotions, VideoCall, Call } from "@mui/icons-material";
import { APP_COLORS } from "../../../enums/Colors";
import EmojiPicker from "emoji-picker-react";
import { socketService } from "../../../services/socket";
import { selectUserData } from "../../../store/slices/auth.slice";
import { useGetMessages, useSendMessage } from '../../../services/api/main/chat.service';


const Chat = ({ conversationId }) => {
    const user = useSelector(selectUserData);
    const userId = user?._id;

    const [input, setInput] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const fileInputRef = useRef(null);
    const chatContainerRef = useRef(null);

    // Fetch messages using useGetMessages
    const { data: messagesData, isLoading } = useGetMessages(conversationId, []);
    const [messages, setMessages] = useState([]);

    // Send message mutation
    const { mutate: sendMessage } = useSendMessage();

    // Initialize Socket.IO and update messages
    useEffect(() => {
        if (!userId || !conversationId) return;

        const socket = socketService.connect(userId);
        socket.emit("joinChat", { userId, conversationIds: [conversationId] });

        socket.on("newMessage", (data) => {
            setMessages((prev) => [
                ...prev,
                {
                    id: data.message._id,
                    type: data.message.messageType,
                    content: data.message.content,
                    sender: data.message.sender === userId ? "self" : "other",
                },
            ]);
            scrollToBottom();
        });

        socket.on("messageStatusUpdate", ({ messageId, status, seenBy }) => {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === messageId ? { ...msg, status, seenBy } : msg
                )
            );
        });

        socket.on("userTyping", ({ userId: typingUserId }) => {
            console.log(`${typingUserId} is typing...`);
        });

        return () => {
            socketService.disconnect();
        };
    }, [userId, conversationId]);

    // Update messages when data changes
    useEffect(() => {
        if (messagesData) {
            setMessages(
                messagesData.map((msg) => ({
                    id: msg._id,
                    type: msg.messageType,
                    content: msg.content,
                    sender: msg.sender === userId ? "self" : "other",
                }))
            );
            scrollToBottom();
        }
    }, [messagesData, userId]);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const handleSendMessage = () => {
        if (input.trim()) {
            const messageData = {
                conversationId,
                content: input,
                messageType: "text",
            };

            sendMessage(messageData, {
                onSuccess: () => {
                    setInput("");
                    // Socket event will update messages in real-time
                },
                onError: (error) => {
                    console.error("Error sending message:", error);
                },
            });
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
        socketService.socket.emit("typing", { conversationId, userId });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleAttachFile = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const fileUrl = URL.createObjectURL(file);
            setMessages((prev) => [
                ...prev,
                { id: Date.now(), type: "image", content: fileUrl, sender: "self" },
            ]);
            scrollToBottom();
            // TODO: Add file upload logic if needed
        }
    };

    const handleFileButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker((prev) => !prev);
    };

    const onEmojiClick = (emojiData) => {
        setInput((prev) => prev + emojiData.emoji);
    };

    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: 2,
                position: "relative",
            }}
        >
            {/* Chat Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid lightgray",
                    paddingBottom: 1,
                }}
            >
                <Box display="flex" alignItems="center">
                    <Avatar sx={{ width: 40, height: 40, mr: 1 }} src="/user.jpg" />
                    <Typography variant="h6">Anil</Typography>
                </Box>
                <Box>
                    <IconButton>
                        <Call />
                    </IconButton>
                    <IconButton>
                        <VideoCall />
                    </IconButton>
                </Box>
            </Box>

            {/* Chat Messages */}
            <Box
                ref={chatContainerRef}
                sx={{ flex: 1, overflowY: "auto", padding: 2 }}
            >
                {isLoading ? (
                    <Typography>Loading messages...</Typography>
                ) : (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {messages.map((msg) => (
                            <Box
                                key={msg.id}
                                sx={{
                                    alignSelf: msg.sender === "self" ? "flex-end" : "flex-start",
                                    maxWidth: "70%",
                                }}
                            >
                                {msg.type === "text" && (
                                    <Typography
                                        sx={{
                                            padding: "10px 15px",
                                            borderRadius: "20px 20px 40px 5px",
                                            fontSize: "0.9rem",
                                            fontWeight: "bold",
                                            position: "relative",
                                            wordBreak: "break-word",
                                            backgroundColor:
                                                msg.sender === "self"
                                                    ? APP_COLORS.primary[500]
                                                    : APP_COLORS.accent[300],
                                            color: msg.sender === "self" ? "white" : "inherit",
                                        }}
                                    >
                                        {msg.content}
                                    </Typography>
                                )}
                                {msg.type === "image" && (
                                    <Box
                                        component="img"
                                        src={msg.content}
                                        alt="attachment"
                                        sx={{
                                            maxWidth: "200px",
                                            borderRadius: 2,
                                        }}
                                    />
                                )}
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>

            {/* Emoji Picker */}
            {showEmojiPicker && (
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "70px",
                        right: "20px",
                        zIndex: 1000,
                    }}
                >
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                </Box>
            )}

            {/* Chat Input */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    borderTop: "1px solid lightgray",
                    paddingTop: 1,
                    borderRadius: 5,
                }}
            >
                <IconButton onClick={handleFileButtonClick}>
                    <AttachFile />
                </IconButton>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleAttachFile}
                    accept="image/*"
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Type your message..."
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    sx={{
                        mx: 1,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 5,
                            "& fieldset": {
                                borderRadius: 5,
                            },
                        },
                    }}
                />
                <IconButton onClick={toggleEmojiPicker}>
                    <EmojiEmotions />
                </IconButton>
                <IconButton color="primary" onClick={handleSendMessage}>
                    <Send />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Chat;