import React from "react";
import { Box, Avatar, Typography } from "@mui/material";

const Comment = ({ comment }) => {
    return (
        <Box sx={{ display: "flex", alignItems: "start", gap: 2, mb: 2 }}>
            <Avatar src={comment.user.avatar} sx={{ width: 32, height: 32 }} />
            <Box>
                <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>{comment.user.username}</Typography>
                <Typography sx={{ fontSize: "14px", color: "gray" }}>{comment.text}</Typography>
            </Box>
        </Box>
    );
};

export default Comment;
