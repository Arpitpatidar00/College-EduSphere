import { useState } from "react";
import {
  Card,
  CardHeader,
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
import { useToggleLike } from '../../../../services/api/main/likeAndComment.service';
import { transformImagePath } from '../../../../utils/image.utils';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../../store/slices/auth.slice'

const PostCard = () => {


  const userDate = useSelector(selectUserData);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [postPagination, setStatePagination] = useState({
    page: 0,
    pageSize: 20,
  });
  const { mutate: toggleLike } = useToggleLike();

  const [likedPosts, setLikedPosts] = useState({});

  const { data: postData } = useGetAllPosts(
    { page: postPagination.page, limit: postPagination.pageSize },
    { data: [], totalCount: 0 }
  );

  // API Hook to toggle likes
  const isPostLikedByUser = (post) => {
    return Array.isArray(post?.user) && post.user.includes(userDate._id);
  };




  const handleOpenModal = (postIndex) => {
    if (!postData?.data || postData.data.length === 0) return;
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
    const prevIndex = (currentIndex - 1 + postData.data.length) % postData.data.length;
    setCurrentIndex(prevIndex);
    setSelectedPost(postData.data[prevIndex]);
  };

  const handleDoubleTap = (postId) => {
    const isLiked = likedPosts[postId] !== undefined ? likedPosts[postId] : false;
    if (!isLiked) {
      toggleLike(
        { postId, like: true },);
    }
  };

  const handleLikeClick = (postId, e) => {
    e.stopPropagation();
    const isLiked = likedPosts[postId] !== undefined ? likedPosts[postId] : false;
    toggleLike(
      { postId, like: !isLiked },
      {
        onSuccess: () => {
          setLikedPosts((prev) => ({ ...prev, [postId]: !isLiked }));
        },
        onError: (error) => console.error("Toggle like failed:", error),
      }
    );
  };

  const handleCommentClick = (postId, e) => {
    e.stopPropagation();
    handleOpenModal(postData.data.findIndex((p) => p._id === postId));
  };

  return (
    <>
      {postData?.data?.length > 0 ? (
        postData.data.map((post, index) => {

          const isLiked = likedPosts[post._id] !== undefined
            ? likedPosts[post._id]
            : isPostLikedByUser(post);

          const baseLikeCount = Array.isArray(post.likes) ? post.likes.length : 0;

          const userAlreadyLiked = (post.likes && Array.isArray(post.likes))
            ? post.likes.some(id => String(id).trim() === String(userDate._id).trim())
            : false;


          const displayLikeCount = baseLikeCount + (isLiked && !userAlreadyLiked ? 1 : 0);

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
              <CardHeader
                avatar={
                  <Avatar
                    src={transformImagePath(post?.user?.profilePicture)}
                    sx={{ width: 44, height: 44 }}
                  />
                }
                action={
                  <IconButton sx={{ color: APP_COLORS.common.white }}>
                    <MoreVert />
                  </IconButton>
                }
                title={
                  <Typography sx={{ fontWeight: "bold", color: "grey.900" }}>
                    {post?.user?.firstName} {post?.user?.lastName}
                  </Typography>
                }
                subheader={
                  <Typography sx={{ color: "grey.600" }}>
                    {post?.user?.position} {timeAgo(post?.createdAt)}
                  </Typography>
                }
              />

              {(post.media?.length > 0 || post.coverImage) && (
                <Box
                  onDoubleClick={() => handleDoubleTap(post._id)}
                  sx={{ cursor: "pointer" }}
                >
                  <ImageCarousel
                    images={
                      (post.coverImage ? [post.coverImage] : []).concat(post.media || [])
                    }
                    coverImage={post.coverImage || ""}
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
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                  <Button
                    startIcon={isLiked ? <Favorite /> : <FavoriteBorder />}
                    sx={{
                      textTransform: "none",
                      color: isLiked ? APP_COLORS.error : APP_COLORS.primary,
                    }}
                    onClick={(e) => handleLikeClick(post._id, e)}
                  >
                    {displayLikeCount} Likes
                  </Button>

                  <Button
                    startIcon={<ChatBubbleOutline />}
                    sx={{ textTransform: "none", color: APP_COLORS.primary }}
                    onClick={(e) => handleCommentClick(post._id, e)}
                  >
                    {commentCount} Comments
                  </Button>

                  <Button
                    startIcon={<Share />}
                    sx={{ textTransform: "none", color: APP_COLORS.primary }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {post?.shareCount || 0} Shares
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
