import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const CommentInput = () => {
    const [text, setText] = useState("");

    return (
        <Box sx={{ display: "flex", alignItems: "center", p: 2, borderTop: "1px solid gray" }}>
            <TextField
                fullWidth
                variant="standard"
                placeholder="Add a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                sx={{ input: { color: "white" } }}
            />
            <IconButton color="primary">
                <SendIcon />
            </IconButton>
        </Box>
    );
};

export default CommentInput;
