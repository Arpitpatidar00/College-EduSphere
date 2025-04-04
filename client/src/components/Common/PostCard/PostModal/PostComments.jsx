import { useState } from "react";
import { Box, Avatar, Typography, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { APP_COLORS } from "../../../../enums/Colors";
import { useCreateComment } from "../../../../services/api/main/likeAndComment.service";
import Comment from "./Comment";
import { transformImagePath } from '../../../../utils/image.utils';
import PostActions from "./PostActions";
import { useSelector } from "react-redux";
import { selectUserData } from '@/store/slices/auth.slice'

const PostComments = ({ post }) => {
    const currentUser = useSelector(selectUserData);

    const [newComment, setNewComment] = useState("");

    const { mutateAsync: createComment, isLoading: submittingComment } = useCreateComment(post._id);

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            createComment({ postId: post._id, comment: newComment });
            setNewComment("");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                backgroundColor: APP_COLORS.primary[600],
                color: APP_COLORS.secondary[100],
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    borderBottom: "1px solid gray",
                }}
            >
                <Avatar src={transformImagePath(post?.user?.profilePicture)} />
                <Typography sx={{ ml: 2, fontWeight: "bold" }}>
                    {post?.user?.firstName || post?.user?.institutionName} {post?.user?.lastName}
                </Typography>
            </Box>

            <Box sx={{ p: 2, borderBottom: "1px solid gray" }}>
                <Typography variant="body1">{post?.description}</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1 }}>
                    {post?.tags?.map((tag, index) => (
                        <Typography
                            key={index}
                            sx={{ color: APP_COLORS.secondary[100], mr: 1 }}
                        >
                            #{tag}
                        </Typography>
                    ))}
                </Box>
            </Box>

            <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
                {Array.isArray(post?.comments) ? (
                    post.comments.length > 0 ? (
                        post.comments.map((comment) => (
                            <Comment key={comment._id} comment={comment} />
                        ))
                    ) : (
                        <Typography>No comments yet</Typography>
                    )
                ) : (
                    <Typography>Loading comments...</Typography>
                )}
            </Box>

            {/* Comment Input with Send Icon */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",

                    borderTop: "1px solid gray",
                }}
            >
                <PostActions post={post} />


            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    borderTop: "1px solid gray",
                }}
            >
                <Avatar src={transformImagePath(currentUser?.profilePicture)} sx={{ width: 30, height: 30 }} />
                <TextField
                    variant="standard"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{
                        ml: 2,
                        flex: 1,
                        input: { color: APP_COLORS.secondary[100] },
                    }}
                />
                <IconButton
                    onClick={handleCommentSubmit}
                    disabled={submittingComment || !newComment.trim()}
                    sx={{ color: APP_COLORS.secondary[100] }}
                >
                    <SendIcon
                        sx={{ color: APP_COLORS.secondary[100] }}
                    />
                </IconButton>
            </Box>
        </Box>
    );
};

export default PostComments;
