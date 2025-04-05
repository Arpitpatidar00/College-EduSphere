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
                bgcolor: APP_COLORS.accent[50],
                maxWidth: 700,
                m: "auto",
                mb: 3,
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 6px 25px rgba(0, 0, 0, 0.15)",
                }
            }}
            onClick={() => onOpenModal(index)}
        >
            {/* Header Section */}
            <Box
                sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    bgcolor: APP_COLORS.accent[50],

                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                        src={transformImagePath(post?.user?.profilePicture)}
                        sx={{ width: 60, height: 60, borderRadius: "20%", objectPosition: "top center" }}
                    />
                    <Box>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                color: APP_COLORS.grey[900],
                                fontSize: 16,
                            }}
                        >
                            {post?.user?.firstName || post?.user?.institutionName} {post?.user?.lastName}
                        </Typography>
                        <Typography
                            sx={{
                                color: APP_COLORS.grey[600],
                                fontSize: 12,
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5
                            }}
                        >
                            {post?.user?.position}
                            {timeAgo(post?.createdAt)}
                        </Typography>
                    </Box>
                </Box>
                <IconButton
                    sx={{
                        color: APP_COLORS.grey[600],
                        "&:hover": { bgcolor: APP_COLORS.grey[100] }
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <MoreVert />
                </IconButton>
            </Box>

            {/* Media Section */}
            {(post.media?.length > 0 || post.coverImage) && (
                <Box sx={{ position: "relative" }}>
                    <ImageCarousel
                        images={(post.coverImage ? [post.coverImage] : []).concat(post.media || [])}
                        objectFit="cover"
                        width="100%"
                        height="450px"
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            bgcolor: "rgba(0, 0, 0, 0.6)",
                            borderRadius: 10,
                            px: 1,
                            py: 0.5,
                            color: "white",
                            fontSize: 12,
                        }}
                    >
                        {post.media?.length || 1} media
                    </Box>
                </Box>
            )}

            {/* Content Section */}
            <CardContent sx={{ py: 2, px: 3 }}>
                <Typography
                    sx={{
                        color: APP_COLORS.grey[800],
                        fontSize: 15,
                        lineHeight: 1.6,
                        wordBreak: "break-word",
                    }}
                >
                    {post.projectDetails}
                </Typography>
            </CardContent>

            {/* Actions Section */}

            <CardActions sx={{ p: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-around",
                        gap: 1,
                    }}
                >
                    <Button
                        startIcon={
                            isLiked ? (
                                <Favorite sx={{ color: APP_COLORS.error }} />
                            ) : (
                                <FavoriteBorder sx={{ color: APP_COLORS.grey[600] }} />
                            )
                        }
                        sx={{
                            flex: 1,
                            textTransform: "none",
                            color: APP_COLORS.grey[700],
                            "&:hover": { bgcolor: APP_COLORS.grey[100] },
                            borderRadius: 2,
                            py: 1,
                        }}
                        onClick={(e) => handleLikeClick(post._id, e)}
                    >
                        {likeCount}
                    </Button>

                    <Button
                        startIcon={<ChatBubbleOutline sx={{ color: APP_COLORS.grey[600] }} />}
                        sx={{
                            flex: 1,
                            textTransform: "none",
                            color: APP_COLORS.grey[700],
                            "&:hover": { bgcolor: APP_COLORS.grey[100] },
                            borderRadius: 2,
                            py: 1,
                        }}
                    >
                        {commentCount}
                    </Button>

                    <Button
                        startIcon={<Share sx={{ color: APP_COLORS.grey[600] }} />}
                        sx={{
                            flex: 1,
                            textTransform: "none",
                            color: APP_COLORS.grey[700],
                            "&:hover": { bgcolor: APP_COLORS.grey[100] },
                            borderRadius: 2,
                            py: 1,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {post?.shareCount || 0}
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
};

export default PostCard;