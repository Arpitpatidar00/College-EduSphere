import { useState } from "react";
import { Box, TextField, IconButton, styled } from "@mui/material";
import { Send, EmojiEmotions } from "@mui/icons-material";
import EmojiPicker from "emoji-picker-react";

const StyledInputBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
    minHeight: "60px",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    boxShadow: theme.shadows[1],
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
        boxShadow: theme.shadows[3],
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: theme.palette.grey[300],
        },
        "&:hover fieldset": {
            borderColor: theme.palette.primary.main,
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
        },
        borderRadius: theme.shape.borderRadius, // Default border radius from theme
    },
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 2),
        fontSize: { xs: "14px", md: "16px" },
    },
}));

const MessageInput = ({ input, setInput, handleSendMessage, handleTyping }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiClick = (emojiObject) => {
        setInput((prev) => prev + emojiObject.emoji);
        if (typeof handleTyping === "function") handleTyping({ target: { value: input + emojiObject.emoji } }); // Simulate event
    };

    return (
        <StyledInputBox>
            <IconButton
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                sx={{
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                    transition: "color 0.3s ease-in-out",
                    p: { xs: 0.5, md: 1 },
                }}
            >
                <EmojiEmotions sx={{ fontSize: { xs: 20, md: 24 } }} />
            </IconButton>

            {showEmojiPicker && (
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "100%",
                        right: { xs: 0, md: 10 },
                        zIndex: 1000,
                        mb: 1,
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: 3,
                        "& .epr-emoji-category-label": {
                            fontSize: { xs: "12px", md: "14px" },
                        },
                    }}
                >
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </Box>
            )}

            <StyledTextField
                variant="outlined"
                fullWidth
                placeholder="Type your message..."
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                    if (typeof handleTyping === "function") handleTyping(e); // Pass event to handleTyping
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                sx={{
                    mx: { xs: 0.5, md: 1 }, // Correctly separate margin
                    "& .MuiOutlinedInput-root": {
                        borderRadius: { xs: 2, md: 5 }, // Responsive border radius
                    },
                }}
            />

            <IconButton
                onClick={handleSendMessage}
                disabled={!input.trim()}
                sx={{
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                    "&:disabled": { color: "text.disabled" },
                    transition: "color 0.3s ease-in-out",
                    p: { xs: 0.5, md: 1 },
                }}
            >
                <Send sx={{ fontSize: { xs: 20, md: 24 } }} />
            </IconButton>
        </StyledInputBox>
    );
};

export default MessageInput;