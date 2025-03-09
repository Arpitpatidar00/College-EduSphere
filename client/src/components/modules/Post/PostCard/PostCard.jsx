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
import { APP_COLORS } from "../../../../enums/Colors";
import PostModal from "../PostModal/PostModal";
import ImageCarousel from "../../../Common/ImageCarousel/index";
import { useGetAllPosts } from "../../../../services/api/main/post.service";
import { timeAgo } from "../../../../utils/time.utils";
import { useToggleLike } from "../../../../services/api/main/likeAndComment.service";
import { transformImagePath } from "../../../../utils/image.utils";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../../store/slices/auth.slice";

const PostCard = () => {
  const userData = useSelector(selectUserData);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState({});

  const { mutateAsync: toggleLike } = useToggleLike();
  const { data: postData } = useGetAllPosts(
    { page: 0, limit: 20 },
    { data: [], totalCount: 0 }
  );

  const isPostLikedByUser = (post) => {
    return (
      Array.isArray(post.likes?.user) && post.likes.user.includes(userData._id)
    );
  };

  const handleOpenModal = (postIndex) => {
    if (!postData?.data?.length) return;
    setCurrentIndex(postIndex);
    setSelectedPost(postData.data[postIndex]);
    setModalOpen(true);
  };
  const handleNext = () => {
    if (!postData?.data || postData.data.length === 0) return;
    const nextIndex = (currentIndex + 1) % postData.data.length;
    setCurrentIndex(nextIndex);
    setSelectedPost(postData.data[nextIndex]);
  };

  const handlePrevious = () => {
    if (!postData?.data || postData.data.length === 0) return;
    const prevIndex =
      (currentIndex - 1 + postData.data.length) % postData.data.length;
    setCurrentIndex(prevIndex);
    setSelectedPost(postData.data[prevIndex]);
  };

  // const handleDoubleTap = (postId) => {
  //   const isLiked =
  //     likedPosts[postId] !== undefined ? likedPosts[postId] : false;
  //   if (!isLiked) {
  //     toggleLike({ postId, like: true });
  //   }
  // };

  const handleLikeClick = async (postId, e) => {
    e.stopPropagation();
    const isLiked =
      likedPosts[postId] ??
      isPostLikedByUser(postData.data.find((p) => p._id === postId));
    await toggleLike({ postId, like: !isLiked });
    setLikedPosts((prev) => ({ ...prev, [postId]: !isLiked }));
  };

  return (
    <>
      {postData?.data?.length > 0 ? (
        postData.data.map((post, index) => {
          const isLiked = likedPosts[post._id] ?? isPostLikedByUser(post);
          const likeCount = Array.isArray(post.likes?.user)
            ? post.likes.user.length
            : 0;
          const commentCount = post?.comments?.length || 0;
          return (
            <Card
              key={post._id}
              sx={{
                m: 1,
                borderRadius: 5,
                boxShadow: 3,
                bgcolor: APP_COLORS.secondary[200],
              }}
              onClick={() => handleOpenModal(index)}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  bgcolor: APP_COLORS.accent[50]
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    src={transformImagePath(post?.user?.profilePicture)}


                    sx={{ width: 60, height: 60, borderRadius: "20%", objectPosition: "top center", }}
                  />
                  <Box>
                    <Typography sx={{ fontWeight: "bold", color: "grey.900" }}>
                      {post?.user?.firstName} {post?.user?.lastName}
                    </Typography>
                    <Typography sx={{ color: "grey.600", fontSize: 14 }}>
                      {post?.user?.position} • {timeAgo(post?.createdAt)}
                    </Typography>
                  </Box>
                </Box>

                {/* Right: Actions */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Button
                    startIcon={<Share sx={{ fontSize: 28 }} />}
                    sx={{
                      textTransform: "none",
                      color: APP_COLORS.primary,
                      fontSize: 18, // Fixed font size
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
                <Box sx={{
                  cursor: "pointer", bgcolor: APP_COLORS.common.white
                }}>
                  <ImageCarousel
                    images={(post.coverImage ? [post.coverImage] : []).concat(
                      post.media || []
                    )}
                    objectFit="contain"
                    width="100%"
                    height="400px"
                  />
                </Box>
              )}
              <CardContent>
                <Typography sx={{ color: "grey.800" }}>
                  {post.projectDetails}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Button
                    startIcon={
                      isLiked ? (
                        <Favorite sx={{ fontSize: 28 }} />
                      ) : (
                        <FavoriteBorder sx={{ fontSize: 28 }} />
                      )
                    }
                    sx={{
                      textTransform: "none",
                      color: isLiked ? APP_COLORS.error : APP_COLORS.primary,
                      fontSize: 18, // Increase text size
                      padding: "10px 16px", // Increase button padding
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
        })
      ) : (
        <Typography sx={{ textAlign: "center", color: "grey.600" }}>
          No posts available
        </Typography>
      )}
      {isModalOpen && selectedPost && (
        <PostModal
          post={selectedPost}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </>
  );
};

export default PostCard;
