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
  ChatBubbleOutline,
  Share,

} from "@mui/icons-material";

// import { APP_COLORS } from "../../../../enums/Colors";
import PostModal from "../PostModal/PostModal";
import CloseIcon from "@mui/icons-material/Close";
import postData from './PostDummyData';
import ImageCarousel from '../../../Common/ImageCarousel/index';

const PostCard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);



  const handleOpenModal = (postIndex) => {
    setCurrentIndex(postIndex);
    setSelectedPost(postData[postIndex]);
    setModalOpen(true);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % postData.length;
    setCurrentIndex(nextIndex);
    setSelectedPost(postData[nextIndex]);
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + postData.length) % postData.length;
    setCurrentIndex(prevIndex);
    setSelectedPost(postData[prevIndex]);
  };

  return (
    <>
      {postData.map((post, index) => (
        <Card
          key={post.id}
          sx={{
            mb: 2,
            borderRadius: 4,
            boxShadow: 3,
            bgcolor: 'white',
          }}
          onClick={() => handleOpenModal(index)}
        >
          <CardHeader
            avatar={<Avatar src={post.user.avatar} sx={{ width: 44, height: 44 }} />}
            action={
              <IconButton sx={{ color: 'grey.600' }}>
                <MoreVert />
              </IconButton>
            }
            title={
              <Typography sx={{ fontWeight: 'bold', color: 'grey.900' }}>
                {post.user.username}
              </Typography>
            }
            subheader={
              <Typography sx={{ color: 'grey.600' }}>
                {post.user.position} • {post.time}
              </Typography>
            }
          />
          {post.images && post.images.length > 0 && (
            <ImageCarousel images={post.images} width="100%" height="400px" />

          )}
          <CardContent>
            <Typography sx={{ color: 'grey.800' }}>{post.content}</Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Button
                startIcon={<FavoriteBorder />}
                sx={{ textTransform: 'none', color: 'primary.main' }}
              >
                {post.likes} Likes
              </Button>
              <Button
                startIcon={<ChatBubbleOutline />}
                sx={{ textTransform: 'none', color: 'secondary.main' }}
              >
                {post.comments.length} Comments
              </Button>
              <Button
                startIcon={<Share />}
                sx={{ textTransform: 'none', color: 'grey.700' }}
              >
                {post.shares} Shares
              </Button>
            </Box>
          </CardActions>
        </Card>
      ))}
      {isModalOpen && selectedPost && (
        <PostModal
          post={selectedPost}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />

      )}
      <IconButton
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "white",
          zIndex: 10,
          backgroundColor: "rgba(0,0,0,0.5)",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
        }}
        onClose={() => setModalOpen(false)}
      >
        <CloseIcon />
      </IconButton>
    </>
  );
};

export default PostCard;
