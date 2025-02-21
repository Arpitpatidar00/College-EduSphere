import { Box, Avatar, Typography } from "@mui/material";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

const PostComments = ({ post }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", p: 2, borderBottom: "1px solid gray" }}>
                <Avatar src={post.user.avatar} />
                <Typography sx={{ ml: 2, fontWeight: "bold" }}>{post.user.username}</Typography>
            </Box>

            <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
                {post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </Box>

            {/* Comment Input */}
            <CommentInput />
        </Box>
    );
};

export default PostComments;
