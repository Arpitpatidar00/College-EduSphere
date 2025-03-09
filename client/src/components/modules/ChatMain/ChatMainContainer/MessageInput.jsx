// MessageInput.jsx
import { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import { Send, EmojiEmotions } from "@mui/icons-material";
import EmojiPicker from "emoji-picker-react";

const MessageInput = ({ input, setInput, handleSendMessage }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    return (
        <Box sx={{ display: "flex", alignItems: "center", borderTop: "1px solid lightgray", paddingTop: 1 }}>
            <IconButton onClick={() => setShowEmojiPicker((prev) => !prev)}>
                <EmojiEmotions />
            </IconButton>
            {showEmojiPicker && (
                <Box sx={{ position: "absolute", bottom: "70px", right: "20px", zIndex: 1000 }}>
                    <EmojiPicker onEmojiClick={(emoji) => setInput((prev) => prev + emoji.emoji)} />
                </Box>
            )}
            <TextField
                variant="outlined"
                fullWidth
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <IconButton onClick={handleSendMessage}><Send /></IconButton>
        </Box>
    );
};

export default MessageInput;