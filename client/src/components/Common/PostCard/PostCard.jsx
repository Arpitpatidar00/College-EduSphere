import { useState } from "react";
import {
    Card,
    CardContent,
    Avatar,
    IconButton,
    Typography,
    CardActions,
    Button,
    Box,
} from "@mui/material";
import {
    MoreVert,
    FavoriteBorder,
    Favorite,
    ChatBubbleOutline,
    Share,
} from "@mui/icons-material";
import { useToggleLike } from "@services/api/main/likeAndComment.service";
import { useSelector } from "react-redux";
import { APP_COLORS } from '@/enums/Colors';
import ImageCarousel from '../ImageCarousel/index';
import { transformImagePath } from '../../../utils/image.utils';
import { timeAgo } from '../../../utils/time.utils';
import { selectUserData } from '@/store/slices/auth.slice';

const PostCard = ({ post, index, onOpenModal }) => {
    const userData = useSelector(selectUserData);
    const [likedPosts, setLikedPosts] = useState({});

    const { mutateAsync: toggleLike } = useToggleLike();

    const isPostLikedByUser = () =>
        Array.isArray(post.likes?.user) && post.likes.user.includes(userData._id);

    const handleLikeClick = async (postId, e) => {
        e.stopPropagation();
        const isLiked = likedPosts[postId] ?? isPostLikedByUser();
        await toggleLike({ postId, like: !isLiked });
        setLikedPosts((prev) => ({ ...prev, [postId]: !isLiked }));
    };

    const isLiked = likedPosts[post._id] ?? isPostLikedByUser();
    const likeCount = Array.isArray(post.likes?.user) ? post.likes.user.length : 0;
    const commentCount = post?.comments?.length || 0;

    return (
        <Card
            sx={{
                m: 1,
                borderRadius: 5,
                boxShadow: 3,
                bgcolor: APP_COLORS.secondary[200],
                border: `4px solid ${APP_COLORS.accent[50]}`
            }}
            onClick={() => onOpenModal(index)}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,

                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                        src={transformImagePath(post?.user?.profilePicture)}
                        sx={{ width: 60, height: 60, borderRadius: "20%", objectPosition: "top center" }}
                    />
                    <Box>
                        <Typography sx={{ fontWeight: "bold", color: "grey.900" }}>
                            {post?.user?.firstName || post?.user?.institutionName} {post?.user?.lastName}
                        </Typography>
                        <Typography sx={{ color: "grey.600", fontSize: 14 }}>
                            {post?.user?.position} • {timeAgo(post?.createdAt)}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button
                        startIcon={<Share sx={{ fontSize: 28 }} />}
                        sx={{
                            textTransform: "none",
                            color: APP_COLORS.primary,
                            fontSize: 18,
                            padding: "10px 16px",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {post?.shareCount || 0}
                    </Button>
                    <IconButton sx={{ color: APP_COLORS.common.white }}>
                        <MoreVert />
                    </IconButton>
                </Box>
            </Box>

            {(post.media?.length > 0 || post.coverImage) && (
                <Box sx={{ cursor: "pointer", bgcolor: APP_COLORS.common.white }}>
                    <ImageCarousel
                        images={(post.coverImage ? [post.coverImage] : []).concat(post.media || [])}
                        objectFit="contain"
                        width="100%"
                        height="400px"
                    />
                </Box>
            )}

            <CardContent>
                <Typography sx={{ color: "grey.800" }}>{post.projectDetails}</Typography>
            </CardContent>

            <CardActions disableSpacing>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Button
                        startIcon={isLiked ? <Favorite sx={{ fontSize: 28 }} /> : <FavoriteBorder sx={{ fontSize: 28 }} />}
                        sx={{
                            textTransform: "none",
                            color: isLiked ? APP_COLORS.error : APP_COLORS.primary,
                            fontSize: 18,
                            padding: "10px 16px",
                        }}
                        onClick={(e) => handleLikeClick(post._id, e)}
                    >
                        {likeCount} Likes
                    </Button>

                    <Button
                        startIcon={<ChatBubbleOutline sx={{ fontSize: 28 }} />}
                        sx={{
                            textTransform: "none",
                            color: APP_COLORS.primary,
                            fontSize: 18,
                            padding: "10px 16px",
                        }}
                    >
                        {commentCount} Comments
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
};

export default PostCard;
