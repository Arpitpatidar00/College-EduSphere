import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder, ChatBubbleOutline, Send, BookmarkBorder } from "@mui/icons-material";
import { timeAgo } from "../../../../utils/time.utils";
import { useToggleLike } from "../../../../services/api/main/likeAndComment.service";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../../store/slices/auth.slice";

const PostActions = ({ post }) => {
    const userData = useSelector(selectUserData);
    const [likedPosts, setLikedPosts] = useState({});
    const { mutateAsync: toggleLike } = useToggleLike();

    // Check if the current user has liked this post
    const isLikedByUser = Array.isArray(post.likes?.user) && post.likes.user.includes(userData._id);
    const isLiked = likedPosts[post._id] ?? isLikedByUser;
    const likeCount = Array.isArray(post.likes?.user) ? post.likes.user.length : 0;

    // Handle Like Click
    const handleLikeClick = async (e) => {
        e.stopPropagation();
        await toggleLike({ postId: post._id, like: !isLiked });
        setLikedPosts((prev) => ({ ...prev, [post._id]: !isLiked }));
    };

    return (
        <Box sx={{ p: 1.5, bgcolor: "black", color: "white" }}>
            {/* Icons Row */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <IconButton sx={{ color: "white" }} onClick={handleLikeClick}>
                        {isLiked ? <Favorite fontSize="large" sx={{ color: "red" }} /> : <FavoriteBorder fontSize="large" />}
                    </IconButton>
                    <IconButton sx={{ color: "white" }}>
                        <ChatBubbleOutline fontSize="large" />
                    </IconButton>
                    <IconButton sx={{ color: "white" }}>
                        <Send fontSize="large" />
                    </IconButton>
                </Box>
                <IconButton sx={{ color: "white" }}>
                    <BookmarkBorder fontSize="large" />
                </IconButton>
            </Box>

            {/* Likes Count */}
            <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>{likeCount} likes</Typography>

            {/* Post Date */}
            <Typography sx={{ fontSize: 14, color: "gray" }}>{timeAgo(post?.createdAt)}</Typography>
        </Box>
    );
};

export default PostActions;
